import React from 'react'

import k from '../../xt/lang/base-lib'

import event_form from '../../xt/lang/event-form'

import r from '../react'

// js.react.ext-form/makeFree [16] 
function makeFree(initial,keys){
  let initialRef = r.useFollowRef(initial);
  return React.useCallback(event_form.make_form(function (){
    return k.obj_pick(initialRef.current(),keys);
  },k.arr_juxt(keys,k.identity,function (){
    return [];
  })),[]);
}

// js.react.ext-form/makeFreeEdit [28] 
function makeFreeEdit(dataFn,dataKeys,dataArgs){
  let getData = function (){
    let data = dataFn(...dataArgs);
    let out = {};
    for(let k of dataKeys){
      out[k] = data[k];
    };
    return out;
  };
  let form = makeFree(getData,dataKeys);
  let isChanged = function (){
    return k.not_emptyp(k.obj_diff(event_form.get_data(form),getData()));
  };
  return {form,isChanged};
}

// js.react.ext-form/checkPrint [48] 
function checkPrint(meta){
  let print = meta["debug/print"];
  if(true == print){
    return true;
  }
  else if(k.objp(print)){
    for(let [key,v] of Object.entries(print)){
      let term = meta[key];
      if(k.is_emptyp(k.arr_intersection(
        Array.isArray(v) ? v : ((null == v) ? [] : [v]),
        Array.isArray(term) ? term : ((null == term) ? [] : [term])
      ))){
        return false;
      }
    };
    return true;
  }
  return false;
}

// js.react.ext-form/makeForm [65] 
function makeForm(initial,validators){
  let initialRef = r.useFollowRef(initial);
  return React.useCallback(event_form.make_form(function (){
    return initialRef.current();
  },validators),[]);
}

// js.react.ext-form/useListener [74] 
function useListener(form,fields,{dataField,getData,getPassed,getResult,getStatus},meta){
  dataField = (dataField || "data");
  let [data,setData] = React.useState(getData);
  let [result,setResult] = React.useState(getResult);
  let passedRef = React.useRef();
  let statusRef = React.useRef();
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    event_form.add_listener(form,listener_id,fields,function (m){
      let {meta,type} = m;
      if(checkPrint(meta)){
        console.log("PRINTFORM",getData(),meta);
      }
      if((type == "form.data") && getData){
        setData(getData);
      }
      else if(type == "form.validation"){
        if(getResult){
          let nresult = getResult();
          if(meta["validation/all"]){
            setResult(nresult);
          }
          else if(meta["validation/passed"]){
            let npassed = getPassed(nresult);
            if(npassed != passedRef.current){
              setResult(nresult);
              passedRef.current = npassed;
            }
          }
          else{
            let nstatus = getStatus(nresult);
            if(!k.eq_nested(nstatus,statusRef.current)){
              setResult(nresult);
              statusRef.current = nstatus;
            }
          }
        }
      }
    },meta);
    return function (){
      event_form.remove_listener(form,listener_id);
    };
  },[]);
  return {[dataField]:data,"result":result};
}

// js.react.ext-form/getFieldPassed [128] 
function getFieldPassed(field){
  return "ok" == field["status"];
}

// js.react.ext-form/getFieldStatus [134] 
function getFieldStatus(field){
  let {id,status} = field;
  return {id,status};
}

// js.react.ext-form/listenFields [141] 
function listenFields(form,fields,meta){
  let getData = function (){
    return k.arr_juxt(fields,k.identity,function (field){
      return event_form.get_field(form,field);
    });
  };
  let getResult = function (){
    return k.arr_juxt(fields,k.identity,function (field){
      return event_form.get_field_result(form,field);
    });
  };
  let getStatus = function (result){
    return k.obj_map(result,getFieldStatus);
  };
  let getPassed = function (result){
    return k.arr_every(k.obj_vals(result),getFieldPassed);
  };
  return useListener(
    form,
    fields,
    {getData,getPassed,getResult,getStatus,"dataField":"data"},
    Object.assign({"fn/fields":fields},meta)
  );
}

// js.react.ext-form/listenFieldsData [164] 
function listenFieldsData(form,fields,meta){
  let getData = function (){
    return k.arr_juxt(fields,k.identity,function (field){
      return event_form.get_field(form,field);
    });
  };
  return useListener(
    form,
    fields,
    {getData,"dataField":"data"},
    Object.assign({"fn/fields":fields},meta)
  );
}

// js.react.ext-form/listenField [177] 
function listenField(form,field,meta){
  let getValue = function (){
    return event_form.get_field(form,field);
  };
  let getResult = function (){
    return Object.assign({},event_form.get_field_result(form,field));
  };
  return useListener(
    form,
    [field],
    {getResult,"getData":getValue,"getStatus":getFieldStatus,"getPassed":getFieldPassed,"dataField":"value"},
    Object.assign({"fn/fields":[field]},meta)
  );
}

// js.react.ext-form/listenFieldValue [193] 
function listenFieldValue(form,field,meta){
  let getValue = function (){
    return event_form.get_field(form,field);
  };
  let {value} = useListener(
    form,
    [field],
    {"getData":getValue,"dataField":"value"},
    Object.assign({"fn/fields":[field]},meta)
  );
  return value;
}

// js.react.ext-form/listenFieldResult [205] 
function listenFieldResult(form,field,meta){
  let getResult = function (){
    return Object.assign({},event_form.get_field_result(form,field));
  };
  let {result} = useListener(
    form,
    [field],
    {getResult,"getStatus":getFieldStatus,"getPassed":getFieldPassed,"dataField":"value"},
    Object.assign({"fn/fields":[field]},meta)
  );
  return result;
}

// js.react.ext-form/listenForm [219] 
function listenForm(form,meta){
  let {validators} = form;
  let fields = Object.keys(validators);
  let getData = function (){
    return Object.assign({},event_form.get_data(form));
  };
  let getResult = function (){
    return Object.assign({},event_form.get_result(form));
  };
  let getStatus = function (result){
    let {fields} = result;
    return k.obj_map(fields,getFieldStatus);
  };
  let getPassed = function (result){
    return event_form.check_all_passed({"result":result});
  };
  return useListener(
    form,
    fields,
    {getData,getPassed,getResult,getStatus,"dataField":"data"},
    Object.assign({"fn/fields":fields},meta)
  );
}

// js.react.ext-form/listenFormData [240] 
function listenFormData(form,meta){
  let {validators} = form;
  let fields = Object.keys(validators);
  let getData = function (){
    return Object.assign({},event_form.get_data(form));
  };
  return useListener(
    form,
    fields,
    {getData,"dataField":"data"},
    Object.assign({"fn/fields":fields},meta)
  )["data"];
}

// js.react.ext-form/listenFormResult [254] 
function listenFormResult(form,meta){
  let {validators} = form;
  let fields = Object.keys(validators);
  let getResult = function (){
    return Object.assign({},event_form.get_result(form));
  };
  let getStatus = function (result){
    let {fields} = result;
    return k.obj_map(fields,getFieldStatus);
  };
  let getPassed = function (result){
    return event_form.check_all_passed({"result":result});
  };
  return useListener(
    form,
    fields,
    {getPassed,getResult,getStatus,"dataField":"data"},
    Object.assign({"fn/fields":fields},meta)
  )["result"];
}

// js.react.ext-form/useSubmitField [274] 
function useSubmitField({
  form,
  field,
  setResult,
  explicit,
  keep,
  meta,
  onCheck = function (){
  return true;
},
  isMounted = function (){
  return true;
}
}){
  let fields = Array.isArray(field) ? field : ((null == field) ? [] : [field]);
  let [clearing,setClearing] = React.useState(function (){
    return false;
  });
  let {data} = listenFields(form,fields,meta);
  let validateFields = function (){
    for(let field of fields){
      let fdata = event_form.get_field(form,field);
      if(explicit || ("boolean" == (typeof fdata)) || ("number" == (typeof fdata)) || k.not_emptyp(fdata)){
        event_form.validate_field(form,field);
      }
    };
  };
  let onActionReset = function (){
    setResult(null);
    if(!keep){
      for(let field of fields){
        event_form.reset_field_data(form,field);
      };
    }
    new Promise(function (resolve,reject){
      setTimeout(function (){
        try{
          resolve(          (function (){
                      for(let field of fields){
                        event_form.reset_field_validator(form,field);
                      };
                      if(isMounted()){
                        setClearing(true);
                      }
                    })());
        }
        catch(e){
          reject(e);
        }
      },100);
    });
  };
  let onActionCheck = function (){
    return onCheck() && fields.every(function (field){
      return event_form.check_field_passed(form,field);
    });
  };
  React.useEffect(function (){
    validateFields();
  },[]);
  React.useEffect(function (){
    if(clearing){
      setTimeout(function (){
        new Promise(function (){
          if(isMounted()){
            validateFields();
          }
        });
      },100);
      setClearing(false);
    }
  },[clearing]);
  return {onActionCheck,onActionReset};
}

// js.react.ext-form/useSubmitForm [323] 
function useSubmitForm({
  form,
  setResult,
  explicit,
  keep,
  meta,
  onCheck = function (){
  return true;
},
  isMounted = function (){
  return true;
}
}){
  let [clearing,setClearing] = React.useState(function (){
    return false;
  });
  let {data} = listenForm(form,meta);
  let onActionReset = function (){
    setResult(null);
    if(!keep){
      event_form.reset_all_data(form);
    }
    new Promise(function (resolve,reject){
      setTimeout(function (){
        try{
          resolve(          (function (){
                      event_form.reset_all_validators(form);
                      if(isMounted()){
                        setClearing(true);
                      }
                    })());
        }
        catch(e){
          reject(e);
        }
      },100);
    });
  };
  let onActionCheck = function (){
    return onCheck() && event_form.check_all_passed(form);
  };
  let validateFilled = function (){
    for(let vkey of k.obj_keys(form.validators)){
      let v = data[vkey];
      if(!("boolean" == (typeof v)) && !("number" == (typeof v)) && k.not_emptyp(v)){
        event_form.validate_all(form);
        return;
      }
    };
  };
  React.useEffect(function (){
    if(explicit){
      event_form.validate_all(form);
    }
    else{
      validateFilled();
    }
  },[]);
  React.useEffect(function (){
    if(clearing){
      setTimeout(function (){
        new Promise(function (){
          if(explicit){
            event_form.validate_all(form);
          }
          else{
            validateFilled();
          }
        });
      },100);
      setClearing(false);
    }
  },[clearing]);
  return {onActionCheck,onActionReset};
}

var MODULE = {
  "makeFree":makeFree,
  "makeFreeEdit":makeFreeEdit,
  "checkPrint":checkPrint,
  "makeForm":makeForm,
  "useListener":useListener,
  "getFieldPassed":getFieldPassed,
  "getFieldStatus":getFieldStatus,
  "listenFields":listenFields,
  "listenFieldsData":listenFieldsData,
  "listenField":listenField,
  "listenFieldValue":listenFieldValue,
  "listenFieldResult":listenFieldResult,
  "listenForm":listenForm,
  "listenFormData":listenFormData,
  "listenFormResult":listenFormResult,
  "useSubmitField":useSubmitField,
  "useSubmitForm":useSubmitForm
};

export default MODULE