import k from './base-lib'

import event_common from './event-common'

import validate from './util-validate'

// xt.lang.event-form/make-form [11] 
function make_form(initial,validators){
  let result = validate.create_result(validators);
  return event_common.make_container(
    initial,
    "event.form",
    {"result":result,"validators":validators}
  );
}

// xt.lang.event-form/check-event [22] 
function check_event(event,fields){
  for(let field of fields){
    for(let evfield of event["fields"]){
      if(evfield == field){
        return true;
      }
    };
  };
  return false;
}

// xt.lang.event-form/add-listener [32] 
function add_listener(form,listener_id,fields,callback,meta){
  fields = k.arrayify(fields);
  return event_common.add_listener(form,listener_id,"form",callback,k.obj_assign({"form/fields":fields},meta),function (event){
    return check_event(event,fields);
  });
}

// xt.lang.event-form/remove-listener [46] 
var remove_listener = event_common.remove_listener;

// xt.lang.event-form/list-listeners [50] 
var list_listeners = event_common.list_listeners;

// xt.lang.event-form/trigger-all [54] 
function trigger_all(form,event_type){
  let {validators} = form;
  let fields = k.obj_keys(validators);
  return event_common.trigger_listeners(form,{"type":event_type,"fields":fields});
}

// xt.lang.event-form/trigger-field [66] 
function trigger_field(form,fields,event_type){
  return event_common.trigger_listeners(form,{"type":event_type,"fields":k.arrayify(fields)});
}

// xt.lang.event-form/set-field [76] 
function set_field(form,field,value){
  let {data} = form;
  data[field] = value;
  return trigger_field(form,field,"form.data");
}

// xt.lang.event-form/get-field [84] 
function get_field(form,field){
  let {data} = form;
  return data[field];
}

// xt.lang.event-form/toggle-field [91] 
function toggle_field(form,field){
  return set_field(form,field,!get_field(form,field));
}

// xt.lang.event-form/field-fn [100] 
function field_fn(form,field){
  return function (value){
    return set_field(form,field,value);
  };
}

// xt.lang.event-form/get-result [108] 
function get_result(form){
  return form["result"];
}

// xt.lang.event-form/get-field-result [114] 
function get_field_result(form,field){
  let {result} = form;
  let {fields} = result;
  return fields[field];
}

// xt.lang.event-form/get-data [122] 
function get_data(form){
  return form["data"];
}

// xt.lang.event-form/set-data [128] 
function set_data(form,m){
  let {data} = form;
  k.obj_assign(data,m);
  let fields = k.obj_keys(m);
  return trigger_field(form,fields,"form.data");
}

// xt.lang.event-form/reset-all-data [137] 
function reset_all_data(form){
  let {initial} = form;
  let data = initial();
  form["data"] = data;
  return trigger_all(form,"form.data");
}

// xt.lang.event-form/reset-field-data [146] 
function reset_field_data(form,field){
  let {data,initial} = form;
  let value = (initial())[field];
  data[field] = value;
  return trigger_field(form,field,"form.data");
}

// xt.lang.event-form/validate-all [155] 
function validate_all(form,hook_fn,complete_fn){
  let {data,result,validators} = form;
  return validate.validate_all(data,validators,result,function (field,status){
    if(hook_fn){
      hook_fn(field,status);
    }
  },function (res){
    trigger_all(form,"form.validation");
    if(complete_fn){
      complete_fn(res);
    }
  });
}

// xt.lang.event-form/validate-field [174] 
function validate_field(form,field,hook_fn,complete_fn){
  let {data,result,validators} = form;
  return validate.validate_field(data,field,validators,result,hook_fn,function (passed,status){
    trigger_field(form,field,"form.validation");
    if(complete_fn){
      complete_fn(passed,status);
    }
  });
}

// xt.lang.event-form/reset-field-validator [192] 
function reset_field_validator(form,field){
  let {result} = form;
  result[field] = {"status":"pending"};
  trigger_field(form,field,"form.validation");
  return result;
}

// xt.lang.event-form/reset-all-validators [201] 
function reset_all_validators(form){
  let {result,validators} = form;
  form["result"] = validate.create_result(validators);
  trigger_all(form,"form.validation");
  return result;
}

// xt.lang.event-form/reset-all [210] 
function reset_all(form){
  reset_all_data(form);
  reset_all_validators(form);
}

// xt.lang.event-form/check-field-passed [217] 
function check_field_passed(form,field){
  let {result} = form;
  let {fields} = result;
  return "ok" == k.get_in(fields,[field,"status"]);
}

// xt.lang.event-form/check-field-errored [225] 
function check_field_errored(form,field){
  let {result} = form;
  let {fields} = result;
  return "errored" == k.get_in(fields,[field,"status"]);
}

// xt.lang.event-form/check-all-passed [233] 
function check_all_passed(form){
  let {result} = form;
  let {fields} = result;
  for(let v of Object.values(fields)){
    if("ok" != v["status"]){
      return false;
    }
  };
  return true;
}

// xt.lang.event-form/check-any-errored [244] 
function check_any_errored(form){
  let {result} = form;
  let {fields} = result;
  for(let v of Object.values(fields)){
    if("errored" == v["status"]){
      return true;
    }
  };
  return false;
}

var MODULE = {
  "make_form":make_form,
  "check_event":check_event,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "trigger_all":trigger_all,
  "trigger_field":trigger_field,
  "set_field":set_field,
  "get_field":get_field,
  "toggle_field":toggle_field,
  "field_fn":field_fn,
  "get_result":get_result,
  "get_field_result":get_field_result,
  "get_data":get_data,
  "set_data":set_data,
  "reset_all_data":reset_all_data,
  "reset_field_data":reset_field_data,
  "validate_all":validate_all,
  "validate_field":validate_field,
  "reset_field_validator":reset_field_validator,
  "reset_all_validators":reset_all_validators,
  "reset_all":reset_all,
  "check_field_passed":check_field_passed,
  "check_field_errored":check_field_errored,
  "check_all_passed":check_all_passed,
  "check_any_errored":check_any_errored
};

export default MODULE