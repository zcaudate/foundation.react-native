import k from './base-lib'

// xt.lang.util-throttle/throttle-create [9] 
function throttle_create(handler,now_fn){
  return {
    "now_fn":now_fn || function (){
        return Date.now();
      },
    "handler":handler,
    "active":{},
    "queued":{}
  };
}

// xt.lang.util-throttle/throttle-run-async [18] 
function throttle_run_async(throttle,id,args){
  let {active,handler,now_fn,queued} = throttle;
  args = (args || []);
  return new Promise(function (resolve,reject){
    resolve(handler(id,...args));
  }).finally(function (){
    delete active[id];
    let qentry = queued[id];
    if(qentry){
      active[id] = qentry;
      delete queued[id];
      return throttle_run_async(throttle,id,args);
    };
  });
}

// xt.lang.util-throttle/throttle-run [32] 
function throttle_run(throttle,id,args){
  let {active,handler,now_fn,queued} = throttle;
  let qentry = queued[id];
  if(qentry){
    return qentry;
  }
  let aentry = active[id];
  if(aentry){
    qentry = [aentry[0],now_fn()];
    queued[id] = qentry;
    return qentry;
  }
  let thread = throttle_run_async(throttle,id,args);
  aentry = [thread,now_fn()];
  active[id] = aentry;
  return aentry;
}

// xt.lang.util-throttle/throttle-waiting [52] 
function throttle_waiting(throttle){
  let {active,queued} = throttle;
  return k.arr_union(k.obj_keys(active),k.obj_keys(queued));
}

// xt.lang.util-throttle/throttle-active [60] 
function throttle_active(throttle){
  let {active} = throttle;
  return k.obj_keys(active);
}

// xt.lang.util-throttle/throttle-queued [67] 
function throttle_queued(throttle){
  let {queued} = throttle;
  return k.obj_keys(queued);
}

var MODULE = {
  "throttle_create":throttle_create,
  "throttle_run_async":throttle_run_async,
  "throttle_run":throttle_run,
  "throttle_waiting":throttle_waiting,
  "throttle_active":throttle_active,
  "throttle_queued":throttle_queued
};

export default MODULE