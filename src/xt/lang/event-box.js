import k from './base-lib'

import event_common from './event-common'

// xt.lang.event-box/make-box [10] 
function make_box(initial){
  return event_common.make_container(initial,"event.box",{});
}

// xt.lang.event-box/check-event [17] 
function check_event(event,path){
  let evpath = event["path"];
  if((path).length > (evpath).length){
    return false;
  }
  for(let i = 0; i < path.length; ++i){
    let v = path[i];
    if(v != evpath[i]){
      return false;
    }
  };
  return true;
}

// xt.lang.event-box/add-listener [29] 
function add_listener(box,listener_id,path,callback,meta){
  path = k.arrayify(path);
  return event_common.add_listener(box,listener_id,"box",callback,k.obj_assign({"box/path":path},meta),function (event){
    return check_event(event,path);
  });
}

// xt.lang.event-box/remove-listener [43] 
var remove_listener = event_common.remove_listener;

// xt.lang.event-box/list-listeners [47] 
var list_listeners = event_common.list_listeners;

// xt.lang.event-box/get-data [51] 
function get_data(box,path){
  let {data} = box;
  path = k.arrayify(path);
  return k.get_in(data,path);
}

// xt.lang.event-box/set-data-raw [59] 
function set_data_raw(box,path,value){
  let {data} = box;
  if(k.is_emptyp(path)){
    box["data"] = value;
  }
  else{
    return k.set_in(data,path,value);
  }
}

// xt.lang.event-box/set-data [70] 
function set_data(box,path,value){
  let {data} = box;
  path = k.arrayify(path);
  set_data_raw(box,path,value);
  return event_common.trigger_listeners(box,{"path":path,"value":value,"data":data});
}

// xt.lang.event-box/del-data-raw [84] 
function del_data_raw(box,path){
  let {data} = box;
  let ppath = k.arr_slice(path,0,(path).length - 1);
  let parent = k.get_in(data,ppath);
  if(parent){
    let val = parent[path[path.length + -1]];
    delete parent[path[path.length + -1]];
    return null != val;
  }
  return false;
}

// xt.lang.event-box/del-data [97] 
function del_data(box,path){
  let {data} = box;
  if(del_data_raw(box,path)){
    return event_common.trigger_listeners(box,{"path":path,"value":null,"data":data});
  }
}

// xt.lang.event-box/reset-data [110] 
function reset_data(box){
  let {initial} = box;
  return set_data(box,initial(),[]);
}

// xt.lang.event-box/merge-data [117] 
function merge_data(box,path,value){
  let prev = get_data(box,path);
  let merged = k.obj_assign(k.obj_clone(prev),value);
  return set_data(box,path,merged);
}

// xt.lang.event-box/append-data [126] 
function append_data(box,path,value){
  let arr = k.arr_clone(get_data(box,path));
  arr.push(value);
  return set_data(box,path,arr);
}

var MODULE = {
  "make_box":make_box,
  "check_event":check_event,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "get_data":get_data,
  "set_data_raw":set_data_raw,
  "set_data":set_data,
  "del_data_raw":del_data_raw,
  "del_data":del_data,
  "reset_data":reset_data,
  "merge_data":merge_data,
  "append_data":append_data
};

export default MODULE