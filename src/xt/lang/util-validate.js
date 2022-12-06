import k from './base-lib'

// xt.lang.util-validate/validate-step [9] 
function validate_step(form,field,guards,index,result,hook_fn,complete_fn){
  guards = (guards || []);
  if(index < (guards).length){
    let guard = guards[index];
    let [id,m] = guard;
    let {check,message} = m;
    let error_fn = function (){
      k.obj_assign(result["fields"][field],{
        "status":"errored",
        "id":id,
        "data":form[field],
        "message":message
      });
      if(hook_fn){
        hook_fn(id,false);
      }
      if(complete_fn){
        complete_fn(false,result);
      }
    };
    return new Promise(function (resolve,reject){
      resolve(check(form[field],form));
    }).then(function (ok){
      if(ok == false){
        return error_fn();
      }
      else{
        if(hook_fn){
          hook_fn(id,true);
        }
        return validate_step(form,field,guards,index + 1,result,hook_fn,complete_fn);
      }
    }).catch(function (err){
      error_fn();
    });
  }
  else{
    let entry = result["fields"][field];
    if(entry){
      delete entry["id"];
      delete entry["data"];
      delete entry["message"];
      k.obj_assign(entry,{"status":"ok"});
    }
    if(complete_fn){
      complete_fn(true,result);
    }
    return result;
  }
}

// xt.lang.util-validate/validate-field [51] 
function validate_field(form,field,validators,result,hook_fn,complete_fn){
  let guards = validators[field];
  let index = 0;
  return validate_step(form,field,guards,index,result,hook_fn,function (passed,status){
    if(!passed){
      result["status"] = "errored";
    }
    if(complete_fn){
      complete_fn(passed,status);
    }
  });
}

// xt.lang.util-validate/validate-all [65] 
function validate_all(form,validators,result,hook_fn,complete_fn){
  let fields = k.obj_keys(validators);
  let complete_check_fn = function (success){
    if(!success){
      result["status"] = "errored";
    }
    if("errored" == result["status"]){
      if(complete_fn){
        complete_fn(false,result);
      }
      return;
    }
    if(k.arr_every(k.obj_vals(result["fields"]),function (e){
      return e["status"] == "ok";
    })){
      result["status"] = "ok";
      if(complete_fn){
        complete_fn(true,result);
      }
      return;
    }
  };
  return k.arr_map(fields,function (field){
    return validate_field(form,field,validators,result,hook_fn,complete_check_fn);
  });
}

// xt.lang.util-validate/create-result [88] 
function create_result(validators){
  let result = {
    "::":"validation.result",
    "status":"pending",
    "fields":k.obj_map(validators,function (_){
        return {"status":"pending"};
      })
  };
  return result;
}

var MODULE = {
  "validate_step":validate_step,
  "validate_field":validate_field,
  "validate_all":validate_all,
  "create_result":create_result
};

export default MODULE