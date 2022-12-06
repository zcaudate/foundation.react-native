import k from './base-lib'

import event_common from './event-common'

// xt.lang.event-view/wrap-args [14] 
function wrap_args(handler){
  return function (context){
    return handler(...context["args"]);
  };
}

// xt.lang.event-view/check-disabled [21] 
function check_disabled(context){
  let {input} = context;
  return (null == input) || (null == input["data"]) || input["disabled"] || false;
}

// xt.lang.event-view/parse-args [31] 
function parse_args(context){
  let {input} = context;
  return input["data"];
}

// xt.lang.event-view/create-view [38] 
function create_view(main_handler,pipeline,default_args,default_output,default_process,options){
  let entry = {
    "pipeline":k.obj_assign_nested({
        "main":{"handler":main_handler,"wrapper":wrap_args},
        "remote":{"wrapper":wrap_args},
        "sync":{"wrapper":wrap_args},
        "check_args":parse_args,
        "check_disabled":check_disabled
      },pipeline),
    "options":options || {},
    "input":{
        "current":null,
        "updated":null,
        "default":k.fnp(default_args) ? default_args : function (){
            return default_args;
          }
      },
    "output":{
        "type":"output",
        "current":null,
        "updated":null,
        "elapsed":null,
        "process":default_process || k.identity,
        "default":k.fnp(default_output) ? default_output : function (){
            return default_output;
          }
      }
  };
  if(k.get_in(pipeline,["remote"])){
    entry["remote"] = {
      "type":"remote",
      "current":null,
      "updated":null,
      "elapsed":null,
      "process":default_process || k.identity,
      "default":k.fnp(default_output) ? default_output : function (){
            return default_output;
          }
    };
  }
  if(k.get_in(pipeline,["sync"])){
    entry["sync"] = {
      "type":"sync",
      "current":null,
      "updated":null,
      "elapsed":null,
      "process":default_process || k.identity,
      "default":k.fnp(default_output) ? default_output : function (){
            return default_output;
          }
    };
  }
  return event_common.blank_container("event.view",entry);
}

// xt.lang.event-view/view-context [86] 
function view_context(view){
  let {options,pipeline} = view;
  let {input} = view;
  let context = k.obj_assign({"view":view,"input":input["current"]},options["context"]);
  return context;
}

// xt.lang.event-view/add-listener [98] 
function add_listener(view,listener_id,callback,meta,pred){
  return event_common.add_listener(view,listener_id,"view",callback,meta,pred);
}

// xt.lang.event-view/remove-listener [109] 
var remove_listener = event_common.remove_listener;

// xt.lang.event-view/list-listeners [113] 
var list_listeners = event_common.list_listeners;

// xt.lang.event-view/trigger-listeners [117] 
function trigger_listeners(view,type_name,data){
  return event_common.trigger_listeners(view,{"type":type_name,"data":data});
}

// xt.lang.event-view/PIPELINE [126] 
var PIPELINE = {
  "pre":{"guard":null,"handler":null},
  "main":{"guard":null,"handler":null},
  "sync":{"guard":null,"handler":null},
  "remote":{"guard":null,"handler":null},
  "post":{"guard":null,"handler":null}
};

// xt.lang.event-view/get-input [138] 
function get_input(view){
  let {input} = view;
  return input;
}

// xt.lang.event-view/get-output [145] 
function get_output(view,dest_key){
  return view[dest_key || "output"];
}

// xt.lang.event-view/get-current [151] 
function get_current(view,dest_key){
  return k.get_in(view,[dest_key || "output","current"]);
}

// xt.lang.event-view/is-disabled [158] 
function is_disabled(view){
  let {pipeline} = view;
  let {check_disabled} = pipeline;
  let context = view_context(view);
  return check_disabled(context);
}

// xt.lang.event-view/is-errored [167] 
function is_errored(view,dest_key){
  return true == k.get_in(view,[dest_key || "output","errored"]);
}

// xt.lang.event-view/is-pending [174] 
function is_pending(view,dest_key){
  return true == k.get_in(view,[dest_key || "output","pending"]);
}

// xt.lang.event-view/get-time-elapsed [181] 
function get_time_elapsed(view,dest_key){
  return k.get_in(view,[dest_key || "output","elapsed"]);
}

// xt.lang.event-view/get-time-updated [188] 
function get_time_updated(view,dest_key){
  return k.get_in(view,[dest_key || "output","updated"]);
}

// xt.lang.event-view/get-success [195] 
function get_success(view,dest_key){
  let output = view[dest_key || "output"];
  let {process} = output;
  if(true == output["errored"]){
    return process(output["default"]());
  }
  else{
    return output["current"] || process(output["default"]());
  }
}

// xt.lang.event-view/set-input [206] 
function set_input(view,current){
  let {callback,input} = view;
  k.obj_assign(input,{"current":current,"updated":Date.now()});
  trigger_listeners(view,"view.input",input);
  return input;
}

// xt.lang.event-view/set-output [217] 
function set_output(view,current,errored,tag,dest_key,meta){
  let output = view[dest_key || "output"];
  let {callback,options} = view;
  let {accumulate} = options;
  if(errored){
    output["errored"] = true;
  }
  else{
    delete output["errored"];
  }
  output["updated"] = Date.now();
  output["tag"] = tag;
  if(accumulate){
    let prev = k.arrayify(output["current"]);
    let next = k.arr_append(k.arr_clone(prev),k.arrayify(current));
    output["current"] = next;
  }
  else{
    output["current"] = current;
  }
  trigger_listeners(view,"view.output",output);
  return current;
}

// xt.lang.event-view/set-output-disabled [243] 
function set_output_disabled(view,value,dest_key){
  let output = view[dest_key || "output"];
  let {callback} = view;
  if(value){
    output["disabled"] = value;
  }
  else{
    delete output["disabled"];
  }
  trigger_listeners(view,"view.disabled",value);
  return output;
}

// xt.lang.event-view/set-pending [255] 
function set_pending(view,value,dest_key){
  let output = view[dest_key || "output"];
  if(value){
    output["pending"] = value;
  }
  else{
    delete output["pending"];
  }
  trigger_listeners(view,"view.pending",value);
  return output;
}

// xt.lang.event-view/set-elapsed [266] 
function set_elapsed(view,value,dest_key){
  let output = view[dest_key || "output"];
  if("number" == (typeof value)){
    output["elapsed"] = value;
  }
  else{
    delete output["elapsed"];
  }
  trigger_listeners(view,"view.elapsed",value);
  return output;
}

// xt.lang.event-view/init-view [277] 
function init_view(view){
  let {input,options} = view;
  let {init} = options;
  let data = input["default"]();
  return set_input(view,k.obj_assign({"data":data},init));
}

// xt.lang.event-view/pipeline-prep [291] 
function pipeline_prep(view,opts){
  let {pipeline} = view;
  let {check_args,check_disabled} = pipeline;
  let context = k.obj_assign(view_context(view),opts);
  let disabled = check_disabled(context);
  let args = context["args"] || (!disabled ? check_args(context) : null);
  if(null == args){
    disabled = true;
  }
  context["args"] = k.arrayify(args);
  context["acc"] = {"::":"view.run"};
  return [context,disabled];
}

// xt.lang.event-view/pipeline-set [316] 
function pipeline_set(context,tag,acc,dest_key){
  let {cell,view} = context;
  let process = k.get_in(view,[dest_key || "output","process"]);
  let [updatep,current,errored] = acc[tag];
  if(null == current){
    current = k.get_in(view,[dest_key || "output","default"])();
  }
  if(updatep){
    let output = errored ? current : process(current);
    set_output(view,output,errored,tag,dest_key,context.meta);
  }
  return acc;
}

// xt.lang.event-view/pipeline-call [341] 
function pipeline_call(context,tag,disabled,async_fn,hook_fn,skip_guard){
  skip_guard = (skip_guard || {});
  hook_fn = (hook_fn || k.identity);
  let {acc,args,cell,model,view} = context;
  let {pipeline} = view;
  let stage = pipeline[tag] || {};
  let {guard,handler,wrapper} = stage;
  wrapper = (wrapper || k.identity);
  let error_fn = function (err){
    acc[tag] = [true,err,true];
    acc["error"] = true;
    return hook_fn(acc,tag);
  };
  let skipped_fn = function (res){
    acc[tag] = [false];
    return hook_fn(acc,tag);
  };
  let result_fn = function (res){
    acc[tag] = [true,res];
    return hook_fn(acc,tag);
  };
  let [handler_fn,success_fn] = (!disabled && k.fnp(handler) && ((null == guard) || skip_guard[tag] || guard(context,acc))) ? [wrapper(handler),result_fn] : [
    function (){
      return null;
    },
    skipped_fn
  ];
  return async_fn(handler_fn,context,{"success":success_fn,"error":error_fn});
}

// xt.lang.event-view/pipeline-run-impl [374] 
function pipeline_run_impl(context,stages,index,async_fn,hook_fn,complete_fn,skip_guard){
  if(index < (stages).length){
    return pipeline_call(context,stages[index],false,async_fn,function (acc,tag){
      if(hook_fn){
        hook_fn(acc,tag);
      }
      return pipeline_run_impl(context,stages,index + 1,async_fn,hook_fn,complete_fn,skip_guard);
    },skip_guard);
  }
  else{
    return complete_fn(context);
  }
}

// xt.lang.event-view/pipeline-run [396] 
function pipeline_run(context,disabled,async_fn,hook_fn,complete_fn,dest_key){
  let {acc,view} = context;
  dest_key = (dest_key || "output");
  let dest_tag = (dest_key == "output") ? "main" : dest_key;
  let output = view[dest_key];
  let started = Date.now();
  delete output["elapsed"];
  if(disabled){
    set_output_disabled(view,true,dest_key);
    return pipeline_call(context,dest_tag,true,async_fn,function (acc,tag){
      if(hook_fn){
        hook_fn(acc,tag);
      }
      if(complete_fn){
        complete_fn(acc);
      }
    });
  }
  else{
    if(output["disabled"]){
      set_output_disabled(view,false,dest_key);
    }
    set_pending(view,true,dest_key);
    return pipeline_run_impl(context,["pre",dest_tag,"post"],0,async_fn,function (acc,tag){
      if(hook_fn){
        hook_fn(acc,tag);
      }
      if(tag == dest_tag){
        pipeline_set(context,tag,acc,dest_key);
      }
    },function (acc){
      if(complete_fn){
        complete_fn(acc);
      }
      set_elapsed(view,Date.now() - started,dest_key);
      set_pending(view,false,dest_key);
    });
  }
}

// xt.lang.event-view/pipeline-run-force [441] 
function pipeline_run_force(context,save_output,async_fn,hook_fn,complete_fn,dest_key){
  let {acc,view} = context;
  let started = Date.now();
  set_pending(view,true,dest_key);
  return pipeline_run_impl(context,["pre",dest_key,"post"],0,async_fn,function (acc,tag){
    if(hook_fn){
      hook_fn(acc,tag);
    }
    if(tag == dest_key){
      pipeline_set(context,tag,acc,dest_key);
      if(save_output){
        pipeline_set(context,tag,acc,"output");
      }
    }
  },function (acc){
    if(complete_fn){
      complete_fn(acc);
    }
    set_elapsed(view,Date.now() - started,dest_key);
    set_pending(view,false,dest_key);
  });
}

// xt.lang.event-view/pipeline-run-remote [467] 
function pipeline_run_remote(context,save_output,async_fn,hook_fn,complete_fn){
  return pipeline_run_force(context,save_output,async_fn,hook_fn,complete_fn,"remote");
}

// xt.lang.event-view/pipeline-run-sync [473] 
function pipeline_run_sync(context,save_output,async_fn,hook_fn,complete_fn){
  return pipeline_run_force(context,save_output,async_fn,hook_fn,complete_fn,"sync");
}

// xt.lang.event-view/get-with-lookup [485] 
function get_with_lookup(results,opts){
  opts = (opts || {});
  let {key_fn,sort_fn,val_fn} = opts;
  return {
    "results":sort_fn ? sort_fn(results) : results,
    "lookup":k.arr_juxt(results || [],key_fn || k.id_fn,val_fn || k.identity)
  };
}

// xt.lang.event-view/sorted-lookup [498] 
function sorted_lookup(key){
  return function (results){
    return get_with_lookup(results,{
      "sort_fn":function (arr){
            return k.arr_sort(arr,k.key_fn(key || "name"),function (a,b){
              return a < b;
            });
          }
    });
  };
}

// xt.lang.event-view/group-by-lookup [512] 
function group_by_lookup(key){
  return function (results){
    return {
      "results":results,
      "lookup":k.arr_group_by(results,k.key_fn(key),k.identity)
    };
  };
}

var MODULE = {
  "wrap_args":wrap_args,
  "check_disabled":check_disabled,
  "parse_args":parse_args,
  "create_view":create_view,
  "view_context":view_context,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "trigger_listeners":trigger_listeners,
  "PIPELINE":PIPELINE,
  "get_input":get_input,
  "get_output":get_output,
  "get_current":get_current,
  "is_disabled":is_disabled,
  "is_errored":is_errored,
  "is_pending":is_pending,
  "get_time_elapsed":get_time_elapsed,
  "get_time_updated":get_time_updated,
  "get_success":get_success,
  "set_input":set_input,
  "set_output":set_output,
  "set_output_disabled":set_output_disabled,
  "set_pending":set_pending,
  "set_elapsed":set_elapsed,
  "init_view":init_view,
  "pipeline_prep":pipeline_prep,
  "pipeline_set":pipeline_set,
  "pipeline_call":pipeline_call,
  "pipeline_run_impl":pipeline_run_impl,
  "pipeline_run":pipeline_run,
  "pipeline_run_force":pipeline_run_force,
  "pipeline_run_remote":pipeline_run_remote,
  "pipeline_run_sync":pipeline_run_sync,
  "get_with_lookup":get_with_lookup,
  "sorted_lookup":sorted_lookup,
  "group_by_lookup":group_by_lookup
};

export default MODULE