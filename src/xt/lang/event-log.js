import k from './base-lib'

import event_common from './event-common'

// xt.lang.event-log/new-log [10] 
function new_log(m){
  return event_common.blank_container("event.log",k.obj_assign({
    "last":null,
    "processed":[],
    "cache":{},
    "interval":30000,
    "maximum":100,
    "callback":null,
    "listeners":{}
  },m));
}

// xt.lang.event-log/get-count [27] 
function get_count(log){
  let {processed} = log;
  return (processed).length;
}

// xt.lang.event-log/get-last [34] 
function get_last(log){
  let {processed} = log;
  return processed[processed.length + -1];
}

// xt.lang.event-log/get-head [41] 
function get_head(log,n){
  let {processed} = log;
  let total = (processed).length;
  return k.arr_slice(processed,0,Math.min(n,total));
}

// xt.lang.event-log/get-filtered [50] 
function get_filtered(log,pred){
  let {processed} = log;
  return k.arr_filter(processed,pred);
}

// xt.lang.event-log/get-tail [57] 
function get_tail(log,n){
  let {processed} = log;
  let total = (processed).length;
  return k.arr_rslice(processed,Math.max(0,total - n),total);
}

// xt.lang.event-log/get-slice [67] 
function get_slice(log,start,finish){
  let {processed} = log;
  let total = (processed).length;
  return k.arr_slice(
    processed,
    Math.min(Math.max(0,start),total),
    Math.min(Math.max(0,finish),total)
  );
}

// xt.lang.event-log/clear [77] 
function clear(log){
  let {processed} = log;
  log["processed"] = [];
  return processed;
}

// xt.lang.event-log/clear-cache [85] 
function clear_cache(log,t){
  t = (t || Date.now());
  let {cache,interval,last} = log;
  let out = [];
  if(last && (interval >= (t - last))){
    return out;
  }
  log["last"] = t;
  for(let [k,kt] of Object.entries(cache)){
    if(interval < (t - kt)){
      delete cache[k];
      out.push(k);
    }
  };
  return out;
}

// xt.lang.event-log/METHODS [104] 
var METHODS = {
  "count":{"handler":get_count,"input":[]},
  "last":{"handler":get_last,"input":[]},
  "tail":{"handler":get_tail,"input":[{"symbol":"n","type":"integer"}]},
  "head":{"handler":get_head,"input":[{"symbol":"n","type":"integer"}]},
  "slice":{
    "handler":get_slice,
    "input":[
      {"symbol":"start","type":"integer"},
      {"symbol":"finish","type":"integer"}
    ]
  },
  "clear":{"handler":clear,"input":[]},
  "clear_cache":{
    "handler":clear_cache,
    "input":[{"symbol":"t","type":"integer"}]
  }
};

// xt.lang.event-log/queue-entry [130] 
function queue_entry(log,input,key_fn,data_fn,t){
  t = (t || Date.now());
  let {cache,callback,listeners,maximum,processed} = log;
  let key = key_fn ? key_fn(input,t) : t;
  let data = data_fn(input);
  clear_cache(log,t);
  if((null == key) || cache[key]){
    return null;
  }
  else{
    cache[key] = t;
    k.arr_pushl(processed,k.clone_nested(data),maximum);
    if(callback){
      callback(data,t);
    }
    for(let [id,entry] of Object.entries(listeners)){
      let {callback,meta} = entry;
      callback(id,data,t,meta);
    };
    return data;
  }
}

// xt.lang.event-log/add-listener [157] 
function add_listener(log,listener_id,callback,meta){
  return event_common.add_listener(log,listener_id,"log",callback,meta,null);
}

// xt.lang.event-log/remove-listener [167] 
var remove_listener = event_common.remove_listener;

// xt.lang.event-log/list-listeners [171] 
var list_listeners = event_common.list_listeners;

var MODULE = {
  "new_log":new_log,
  "get_count":get_count,
  "get_last":get_last,
  "get_head":get_head,
  "get_filtered":get_filtered,
  "get_tail":get_tail,
  "get_slice":get_slice,
  "clear":clear,
  "clear_cache":clear_cache,
  "METHODS":METHODS,
  "queue_entry":queue_entry,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners
};

export default MODULE