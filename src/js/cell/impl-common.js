import k from '../../xt/lang/base-lib'

import event_common from '../../xt/lang/event-common'

import raw from './link-raw'

import util from './base-util'

// js.cell.impl-common/new-cell-init [13] 
function new_cell_init(){
  let init = {};
  let init_state = new Promise(function (resolve,reject){
    k.obj_assign(init,{"resolve":resolve,"reject":reject});
  });
  init["current"] = init_state;
  return init;
}

// js.cell.impl-common/new-cell [25] 
function new_cell(worker_url){
  let link = (k.objp(worker_url) && !worker_url["create_fn"]) ? worker_url : raw.link_create(worker_url);
  let init = new_cell_init();
  let models = {};
  raw.add_callback(link,"@/::INIT",function (topic){
    return "@/::INIT" == topic;
  },function (data){
    raw.remove_callback(link,"@/::INIT");
    init.resolve(true);
  });
  return event_common.blank_container(
    "cell",
    {"id":link["id"],"link":link,"models":{},"init":init["current"]}
  );
}

// js.cell.impl-common/list-models [49] 
function list_models(cell){
  let {models} = cell;
  return k.obj_keys(models);
}

// js.cell.impl-common/call [56] 
function call(client,event){
  let t = client["::"];
  if(t == "cell.link"){
    return raw.call(client,event);
  }
  else if(t == "cell"){
    return raw.call(client["link"],event);
  }
}

// js.cell.impl-common/model-get [71] 
function model_get(cell,model_id){
  let {models} = cell;
  return models[model_id];
}

// js.cell.impl-common/model-ensure [78] 
function model_ensure(cell,model_id){
  let model = model_get(cell,model_id);
  if(null == model){
    throw "ERR - Page not found - " + model_id;
  }
  return model;
}

// js.cell.impl-common/list-views [87] 
function list_views(cell,model_id){
  let model = model_ensure(cell,model_id);
  let {views} = model;
  return k.obj_keys(views);
}

// js.cell.impl-common/view-ensure [95] 
function view_ensure(cell,model_id,view_id){
  let model = model_ensure(cell,model_id);
  let {views} = model;
  let view = views[view_id];
  if(null == view){
    throw "ERR - Model not found - " + view_id;
  }
  return [model,view];
}

// js.cell.impl-common/view-access [106] 
function view_access(cell,model_id,view_id,f,args){
  let model = model_get(cell,model_id);
  if(null == model){
    return null;
  }
  let {views} = model;
  let view = views[view_id];
  if(null == view){
    return null;
  }
  return f(view,...args);
}

// js.cell.impl-common/clear-listeners [124] 
var clear_listeners = event_common.clear_listeners;

// js.cell.impl-common/add-listener [128] 
function add_listener(cell,path,listener_id,f,meta,pred){
  let view_key = JSON.stringify(path);
  return event_common.add_keyed_listener(cell,view_key,listener_id,"cell",f,meta,pred);
}

// js.cell.impl-common/remove-listener [137] 
function remove_listener(cell,path,listener_id){
  let view_key = JSON.stringify(path);
  return event_common.remove_keyed_listener(cell,view_key,listener_id);
}

// js.cell.impl-common/list-listeners [146] 
function list_listeners(cell,path){
  let view_key = JSON.stringify(path);
  return event_common.list_keyed_listeners(cell,view_key);
}

// js.cell.impl-common/list-all-listeners [154] 
function list_all_listeners(cell){
  let {listeners} = cell;
  let out = {};
  for(let [view_key,callbacks] of Object.entries(listeners)){
    k.set_in(out,JSON.parse(view_key),k.obj_keys(callbacks));
  };
  return out;
}

// js.cell.impl-common/trigger-listeners [166] 
function trigger_listeners(cell,path,event){
  let view_key = JSON.stringify(path);
  return event_common.trigger_keyed_listeners(cell,view_key,Object.assign({"path":path},event));
}

var MODULE = {
  "new_cell_init":new_cell_init,
  "new_cell":new_cell,
  "list_models":list_models,
  "call":call,
  "model_get":model_get,
  "model_ensure":model_ensure,
  "list_views":list_views,
  "view_ensure":view_ensure,
  "view_access":view_access,
  "clear_listeners":clear_listeners,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "list_all_listeners":list_all_listeners,
  "trigger_listeners":trigger_listeners
};

export default MODULE