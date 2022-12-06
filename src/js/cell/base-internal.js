import repl from '../../xt/lang/base-repl'

import k from '../../xt/lang/base-lib'

import util from './base-util'

import base_fn from './base-fn'

// js.cell.base-internal/worker-handle-async [13] 
function worker_handle_async(worker,f,op,id,body){
  return f(...body).then(function (ret){
    worker.postMessage({"op":op,"id":id,"status":"ok","body":util.arg_encode(ret)});
  }).catch(function (ret){
    if(ret["stack"]){
      k.trace_log_add(
        ret["stack"],
        "ERR",
        {"line":25,"column":25,"ns":"js.cell.base-internal"}
      );
    }
    worker.postMessage({"op":op,"id":id,"status":"error","body":ret});
  });
}

// js.cell.base-internal/worker-process [32] 
function worker_process(worker,input){
  let {body,id,op,route} = input;
  let post_fn = function (x){
    return worker.postMessage(x);
  };
  if(op == "eval"){
    if(false == base_fn.get_state(worker)["eval"]){
      worker.postMessage(
        {"op":op,"id":id,"status":"error","body":"Not enabled - EVAL"}
      );
    }
    let out = repl.return_eval(body);
    let f = input["async"] ? function (x){
      return x;
    } : post_fn;
    return f({"op":op,"id":id,"status":"ok","body":out});
  }
  else if(op == "route"){
    let route_entry = base_fn.get_routes(worker)[route];
    if(null == route_entry){
      return worker.postMessage({
        "op":op,
        "id":id,
        "status":"error",
        "body":"Route not found - " + route
      });
    }
    let route_async = route_entry["async"];
    let route_fn = route_entry["handler"];
    let f = route_async ? function (x){
      return x;
    } : post_fn;
    try{
      body = util.arg_decode(body || []);
      let out = route_async ? worker_handle_async(worker,route_fn,op,id,body) : route_fn(...body);
      return f({"op":op,"id":id,"status":"ok","body":util.arg_encode(out)});
    }
    catch(err){
      return f({"op":op,"id":id,"status":"error","body":err});
    }
  }
  else{
    post_fn({"op":op,"status":"error","body":input});
  }
}

// js.cell.base-internal/worker-init [90] 
function worker_init(worker,input_fn){
  input_fn = (input_fn || k.identity);
  worker.addEventListener("message",function (e){
    if("string" == (typeof e.data)){
      worker_process(worker,input_fn({"op":"eval","id":null,"body":e.data}));
    }
    else{
      worker_process(worker,input_fn(e.data));
    }
  },false);
  return true;
}

// js.cell.base-internal/worker-init-post [110] 
function worker_init_post(worker,body){
  return worker.postMessage(
    {"op":"stream","status":"ok","topic":"@/::INIT","body":body}
  );
}

// js.cell.base-internal/mock-send [124] 
function mock_send(mock,message){
  try{
    if("string" == (typeof message)){
      worker_process(mock,{"op":"eval","id":null,"body":message});
    }
    else{
      worker_process(mock,message);
    }
  }
  catch(e){
    k.trace_log_add(
      e["stack"],
      "SEND.ERROR",
      {"line":137,"column":14,"ns":"js.cell.base-internal"}
    );
  }
}

// js.cell.base-internal/new-mock [139] 
function new_mock(listener){
  let mock = {"::":"worker.mock","listeners":[listener]};
  let postMessage = function (event){
    let {listeners} = mock;
    for(let listener of listeners){
      listener(event);
    };
  };
  let postRequest = function (request){
    return new Promise(function (resolve,reject){
      try{
        resolve(        (function (){
                  mock_send(mock,request);
                })());
      }
      catch(e){
        reject(e);
      }
    });
  };
  Object.assign(mock,{postMessage,postRequest});
  return mock;
}

// js.cell.base-internal/mock-init [159] 
function mock_init(listener,routes,suppress){
  let mock = new_mock(listener);
  if(routes){
    base_fn.routes_init(routes);
  }
  if(!suppress){
    worker_init_post(mock,{"done":true});
  }
  return mock;
}

var MODULE = {
  "worker_handle_async":worker_handle_async,
  "worker_process":worker_process,
  "worker_init":worker_init,
  "worker_init_post":worker_init_post,
  "mock_send":mock_send,
  "new_mock":new_mock,
  "mock_init":mock_init
};

export default MODULE