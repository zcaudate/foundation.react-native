import k from '../../xt/lang/base-lib'

import util from './base-util'

// js.cell.link-raw/link-listener-call [17] 
function link_listener_call(data,active){
  let {body,id,op,status} = data;
  let entry = active[id];
  if(null != entry){
    let {input,reject,resolve,time} = entry;
    input = (input || {});
    try{
      if(status == "ok"){
        if(op == "route"){
          delete active[id];
          return resolve(util.arg_decode(body));
        }
        else if(op == "eval"){
          delete active[id];
          let out = JSON.parse(body);
          let {type,value} = out;
          if(type == "data"){
            return resolve(out.value);
          }
          else{
            return resolve(out);
          }
        }
      }
      else{
        delete active[id];
        return reject(Object.assign({
          "route":input["route"],
          "input":input["body"],
          "start_time":time,
          "end_time":Date.now()
        },data));
      }
    }
    catch(err){
      return reject({
        "start_time":time,
        "end_time":Date.now(),
        "route":input["route"],
        "op":op,
        "status":"error",
        "id":id,
        "input":input["body"],
        "body":body,
        "message":"Format Invalid"
      });
    }
  }
}

// js.cell.link-raw/link-listener-event [58] 
function link_listener_event(data,callbacks){
  let {body,id,op,status,topic} = data;
  let out = [];
  for(let [p_id,callback] of Object.entries(callbacks)){
    let {handler,pred} = callback;
    if(util.check_event(pred,topic,data)){
      try{
        handler(data,topic);
        out.push(p_id);
      }
      catch(err){
        console.log(
          " js.cell.link-raw/link-listener-event",
          69,
          "\n\n",
          {"stack":err["stack"],"message":err["message"]}
        );
      }
    }
  };
  return out;
}

// js.cell.link-raw/link-listener [73] 
function link_listener(e,active,callbacks){
  let {data} = e;
  let {id,op} = data;
  if((op == "eval") || (op == "route")){
    return link_listener_call(data,active);
  }
  else if((op == "stream")){
    return link_listener_event(data,callbacks);
  }
}

// js.cell.link-raw/link-create-worker [86] 
function link_create_worker(worker_url,active,callbacks){
  if(("string" == (typeof worker_url)) || k.fnp(worker_url)){
    let worker = new Worker(worker_url);
    worker.addEventListener("message",function (e){
      return link_listener(e,active,callbacks);
    });
    return worker;
  }
  else{
    let {create_fn} = worker_url;
    return create_fn(function (data){
      link_listener({"data":data},active,callbacks);
    });
  }
}

// js.cell.link-raw/link-create [105] 
function link_create(worker_url){
  let active = {};
  let callbacks = {};
  let worker = link_create_worker(worker_url,active,callbacks);
  return {
    "::":"cell.link",
    "id":util.rand_id("",3),
    "worker":worker,
    "active":active,
    "callbacks":callbacks
  };
}

// js.cell.link-raw/link-active [118] 
function link_active(link){
  return link["active"];
}

// js.cell.link-raw/add-callback [124] 
function add_callback(link,key,pred,handler){
  let prev = link["callbacks"][key];
  link["callbacks"][key] = {"key":key,"pred":pred,"handler":handler};
  return [prev];
}

// js.cell.link-raw/list-callbacks [134] 
function list_callbacks(link){
  return Object.keys(link["callbacks"]);
}

// js.cell.link-raw/remove-callback [140] 
function remove_callback(link,key){
  let prev = link["callbacks"][key];
  delete link["callbacks"][key];
  return [prev];
}

// js.cell.link-raw/call-id [152] 
function call_id(link){
  let {active,id} = link;
  while(true){
    let cid = util.rand_id(id + "-",3);
    if(null == active[cid]){
      return cid;
    }
  }
}

// js.cell.link-raw/call [162] 
function call(link,event){
  let {active,worker} = link;
  let cid = event["id"] || call_id(link);
  event["id"] = cid;
  let input = util.arg_encode(event);
  let p = new Promise(function (resolve,reject){
    active[cid] = {
      "resolve":function (data){
            resolve(data);
          },
      "reject":function (data){
            reject(data);
          },
      "input":input,
      "time":Date.now()
    };
  });
  let {postRequest} = worker;
  if(postRequest){
    postRequest(input);
  }
  else{
    worker.postMessage(input);
  }
  return p;
}

var MODULE = {
  "link_listener_call":link_listener_call,
  "link_listener_event":link_listener_event,
  "link_listener":link_listener,
  "link_create_worker":link_create_worker,
  "link_create":link_create,
  "link_active":link_active,
  "add_callback":add_callback,
  "list_callbacks":list_callbacks,
  "remove_callback":remove_callback,
  "call_id":call_id,
  "call":call
};

export default MODULE