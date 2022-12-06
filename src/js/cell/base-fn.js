import util from './base-util'

import rt from '../../xt/lang/base-runtime'

import k from '../../xt/lang/base-lib'

// js.cell.base-fn/CELL_STATE [13] 
function CELL_STATE(){
  return rt.xt_item_get("@","CELL_STATE",function (){
    return {"eval":true};
  });
}

// js.cell.base-fn/CELL_STATE-reset [13] 
function CELL_STATE_reset(val){
  return rt.xt_var_set("@/CELL_STATE",val);
}

// js.cell.base-fn/CELL_ROUTES [23] 
function CELL_ROUTES(){
  return rt.xt_item_get("@","CELL_ROUTES",function (){
    return {};
  });
}

// js.cell.base-fn/CELL_ROUTES-reset [23] 
function CELL_ROUTES_reset(val){
  return rt.xt_var_set("@/CELL_ROUTES",val);
}

// js.cell.base-fn/get-state [33] 
function get_state(worker){
  return CELL_STATE();
}

// js.cell.base-fn/get-routes [39] 
function get_routes(worker){
  return (worker && worker.routes) || CELL_ROUTES();
}

// js.cell.base-fn/fn-self [46] 
function fn_self(f){
  return function (...args){
    return f(self,...args);
  };
}

// js.cell.base-fn/fn-trigger [53] 
function fn_trigger(worker,op,topic,status,body){
  return worker.postMessage({"op":op,"topic":topic,"status":status,"body":body});
}

// js.cell.base-fn/fn-trigger-async [64] 
function fn_trigger_async(worker,op,topic,status,body,ms){
  return new Promise(function (resolve,reject){
    setTimeout(function (){
      try{
        resolve(        (function (){
                  return fn_trigger(worker,op,topic,status,body);
                })());
      }
      catch(e){
        reject(e);
      }
    },ms);
  });
}

// js.cell.base-fn/fn-set-state [74] 
function fn_set_state(worker,state,set_fn,suppress){
  if(state["final"]){
    throw "Worker State is Final.";
  }
  else{
    set_fn(state);
    if(!suppress){
      worker.postMessage(
        {"op":"stream","topic":"@/::STATE","status":"ok","body":state}
      );
    }
    return state;
  }
}

// js.cell.base-fn/fn-final-set [91] 
function fn_final_set(worker,suppress){
  return fn_set_state(worker,CELL_STATE(),function (state){
    state["final"] = true;
  },suppress);
}

// js.cell.base-fn/fn-final-status [103] 
function fn_final_status(worker){
  return CELL_STATE()["final"];
}

// js.cell.base-fn/fn-eval-enable [111] 
function fn_eval_enable(worker,suppress){
  return fn_set_state(worker,CELL_STATE(),function (state){
    state["eval"] = true;
  },suppress);
}

// js.cell.base-fn/fn-eval-disable [123] 
function fn_eval_disable(worker,suppress){
  return fn_set_state(worker,CELL_STATE(),function (state){
    state["eval"] = false;
  },suppress);
}

// js.cell.base-fn/fn-eval-status [135] 
function fn_eval_status(){
  return CELL_STATE()["eval"];
}

// js.cell.base-fn/fn-route-list [143] 
function fn_route_list(){
  return Object.keys(CELL_ROUTES());
}

// js.cell.base-fn/fn-route-entry [151] 
function fn_route_entry(name){
  return CELL_ROUTES()[name];
}

// js.cell.base-fn/fn-ping [160] 
function fn_ping(){
  return ["pong",Date.now()];
}

// js.cell.base-fn/fn-ping-async [168] 
function fn_ping_async(ms){
  return new Promise(function (resolve,reject){
    setTimeout(function (){
      try{
        resolve(        (function (){
                  return fn_ping();
                })());
      }
      catch(e){
        reject(e);
      }
    },ms);
  });
}

// js.cell.base-fn/fn-echo [178] 
function fn_echo(arg){
  return [arg,Date.now()];
}

// js.cell.base-fn/fn-echo-async [186] 
function fn_echo_async(arg,ms){
  return new Promise(function (resolve,reject){
    setTimeout(function (){
      try{
        resolve(        (function (){
                  return fn_echo(arg);
                })());
      }
      catch(e){
        reject(e);
      }
    },ms);
  });
}

// js.cell.base-fn/fn-error [196] 
function fn_error(){
  throw ["error",Date.now()];
}

// js.cell.base-fn/fn-error-async [204] 
function fn_error_async(ms){
  return new Promise(function (resolve,reject){
    setTimeout(function (){
      try{
        resolve(        (function (){
                  fn_error();
                })());
      }
      catch(e){
        reject(e);
      }
    },ms);
  });
}

// js.cell.base-fn/routes-base [233] 
function routes_base(){
  return {
    "@/trigger":{
      "handler":fn_self(fn_trigger),
      "async":false,
      "args":["op","topic","status","body"]
    },
    "@/trigger-async":{
      "handler":fn_self(fn_trigger_async),
      "async":true,
      "args":["op","topic","status","body","ms"]
    },
    "@/final-set":{
      "handler":fn_self(fn_final_set),
      "async":false,
      "args":["suppress"]
    },
    "@/final-status":{"handler":fn_self(fn_final_status),"async":false,"args":[]},
    "@/eval-enable":{
      "handler":fn_self(fn_eval_enable),
      "async":false,
      "args":["suppress"]
    },
    "@/eval-disable":{
      "handler":fn_self(fn_eval_disable),
      "async":false,
      "args":["suppress"]
    },
    "@/eval-status":{"handler":fn_eval_status,"async":false,"args":[]},
    "@/route-list":{"handler":fn_route_list,"async":false,"args":[]},
    "@/route-entry":{"handler":fn_route_entry,"async":false,"args":["name"]},
    "@/ping":{"handler":fn_ping,"async":false,"args":[]},
    "@/ping-async":{"handler":fn_ping_async,"async":true,"args":["ms"]},
    "@/echo":{"handler":fn_echo,"async":false,"args":["arg"]},
    "@/echo-async":{"handler":fn_echo_async,"async":true,"args":["arg","ms"]},
    "@/error":{"handler":fn_error,"async":false,"args":[]},
    "@/error-async":{"handler":fn_error_async,"async":true,"args":["ms"]}
  };
}

// js.cell.base-fn/routes-init [239] 
function routes_init(routes,worker){
  if(worker){
    worker["routes"] = routes;
    return worker;
  }
  else{
    return CELL_ROUTES_reset(k.obj_assign(routes_base(),routes));
  }
}

var MODULE = {
  "CELL_STATE":CELL_STATE,
  "CELL_STATE_reset":CELL_STATE_reset,
  "CELL_ROUTES":CELL_ROUTES,
  "CELL_ROUTES_reset":CELL_ROUTES_reset,
  "get_state":get_state,
  "get_routes":get_routes,
  "fn_self":fn_self,
  "fn_trigger":fn_trigger,
  "fn_trigger_async":fn_trigger_async,
  "fn_set_state":fn_set_state,
  "fn_final_set":fn_final_set,
  "fn_final_status":fn_final_status,
  "fn_eval_enable":fn_eval_enable,
  "fn_eval_disable":fn_eval_disable,
  "fn_eval_status":fn_eval_status,
  "fn_route_list":fn_route_list,
  "fn_route_entry":fn_route_entry,
  "fn_ping":fn_ping,
  "fn_ping_async":fn_ping_async,
  "fn_echo":fn_echo,
  "fn_echo_async":fn_echo_async,
  "fn_error":fn_error,
  "fn_error_async":fn_error_async,
  "routes_base":routes_base,
  "routes_init":routes_init
};

export default MODULE