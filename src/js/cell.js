import rt from '../xt/lang/base-runtime'

import k from '../xt/lang/base-lib'

import event_view from '../xt/lang/event-view'

import raw from './cell/link-raw'

import impl_common from './cell/impl-common'

import impl_model from './cell/impl-model'

// js.cell/make-cell [15] 
function make_cell(worker_url){
  let cell = impl_common.new_cell(worker_url);
  impl_model.add_raw_callback(cell);
  return cell;
}

// js.cell/GD [28] 
function GD(){
  return rt.xt_item_get("js.cell","GD",function (){
    return null;
  });
}

// js.cell/GD-reset [28] 
function GD_reset(val){
  return rt.xt_var_set("js.cell/GD",val);
}

// js.cell/GX [34] 
function GX(){
  return rt.xt_item_get("js.cell","GX",function (){
    return {};
  });
}

// js.cell/GX-reset [34] 
function GX_reset(val){
  return rt.xt_var_set("js.cell/GX",val);
}

// js.cell/GX-val [40] 
function GX_val(key){
  return (GX())[key];
}

// js.cell/GX-set [46] 
function GX_set(key,val){
  GX()[key] = val;
  return val;
}

// js.cell/get-cell [57] 
function get_cell(ctx){
  if(null == ctx){
    return GD();
  }
  else if("string" == (typeof ctx)){
    return GX_val(ctx);
  }
  else if(k.objp(ctx)){
    if(ctx["::"] == "cell"){
      return ctx;
    }
    else{
      return ctx["cell"];
    }
  }
  else{
    throw "Type not Correct";
  }
}

// js.cell/fn-call-cell [79] 
function fn_call_cell(f,args,ctx){
  let cell = get_cell(ctx);
  return f(cell,...args);
}

// js.cell/fn-call-model [86] 
function fn_call_model(f,model_id,args,ctx){
  let cell = get_cell(ctx);
  return f(cell,model_id,...args);
}

// js.cell/fn-call-view [93] 
function fn_call_view(f,path,args,ctx){
  let cell = get_cell(ctx);
  let [model_id,view_id] = path;
  return f(cell,model_id,view_id,...args);
}

// js.cell/fn-access-cell [101] 
function fn_access_cell(f,ctx){
  let cell = get_cell(ctx);
  let {models} = cell;
  return k.obj_map(models,function (model){
    let {views} = model;
    return k.obj_map(views,f);
  });
}

// js.cell/fn-access-model [112] 
function fn_access_model(f,model_id,ctx){
  let cell = get_cell(ctx);
  let model = impl_common.model_get(cell,model_id);
  if(model){
    let {views} = model;
    return k.obj_map(views,f);
  }
}

// js.cell/fn-access-view [122] 
function fn_access_view(f,path,args,ctx){
  let cell = get_cell(ctx);
  let [model_id,view_id] = path;
  return impl_common.view_access(cell,model_id,view_id,f,args);
}

// js.cell/list-models [130] 
function list_models(ctx){
  return fn_call_cell(impl_common.list_models,[],ctx);
}

// js.cell/list-views [136] 
function list_views(model_id,ctx){
  return fn_call_cell(impl_common.list_views,[model_id],ctx);
}

// js.cell/get-model [142] 
function get_model(model_id,ctx){
  return fn_call_cell(impl_common.model_get,[model_id],ctx);
}

// js.cell/get-view [148] 
function get_view(path,ctx){
  return fn_access_view(k.identity,path,[],ctx);
}

// js.cell/cell-vals [158] 
function cell_vals(ctx){
  return fn_access_cell(event_view.get_current,ctx);
}

// js.cell/cell-outputs [164] 
function cell_outputs(ctx){
  return fn_access_cell(event_view.get_output,ctx);
}

// js.cell/cell-inputs [170] 
function cell_inputs(ctx){
  return fn_access_cell(event_view.get_input,ctx);
}

// js.cell/cell-trigger [176] 
function cell_trigger(topic,event,ctx){
  return fn_call_cell(impl_model.trigger_all,[topic,event],ctx);
}

// js.cell/model-outputs [186] 
function model_outputs(model_id,ctx){
  return fn_access_model(event_view.get_output,model_id,ctx);
}

// js.cell/model-vals [192] 
function model_vals(model_id,ctx){
  return fn_access_model(event_view.get_current,model_id,ctx);
}

// js.cell/model-is-errored [198] 
function model_is_errored(model_id,ctx){
  let cell = get_cell(ctx);
  let model = impl_common.model_get(cell,model_id);
  if(model){
    let {views} = model;
    return k.arr_some(k.obj_vals(views),event_view.is_errored);
  }
  return false;
}

// js.cell/model-is-pending [210] 
function model_is_pending(model_id,ctx){
  let cell = get_cell(ctx);
  let model = impl_common.model_get(cell,model_id);
  if(model){
    let {views} = model;
    return k.arr_some(k.obj_vals(views),event_view.is_pending);
  }
  return false;
}

// js.cell/add-model-attach [222] 
function add_model_attach(model_id,model_input,ctx){
  return fn_call_model(impl_model.add_model_attach,model_id,[model_input],ctx);
}

// js.cell/add-model [228] 
function add_model(model_id,model_input,ctx){
  return fn_call_model(impl_model.add_model,model_id,[model_input],ctx);
}

// js.cell/remove-model [234] 
function remove_model(model_id,ctx){
  return fn_call_model(impl_model.remove_model,model_id,[],ctx);
}

// js.cell/model-update [240] 
function model_update(model_id,ctx){
  return fn_call_model(impl_model.model_update,model_id,[],ctx);
}

// js.cell/model-trigger [246] 
function model_trigger(model_id,topic,event,ctx){
  return fn_call_model(impl_model.trigger_model,model_id,[topic,event],ctx);
}

// js.cell/view-success [257] 
function view_success(path,ctx){
  return fn_access_view(event_view.get_success,path,[],ctx);
}

// js.cell/view-val [266] 
function view_val(path,ctx){
  return fn_access_view(event_view.get_current,path,[],ctx);
}

// js.cell/view-get-input [275] 
function view_get_input(path,ctx){
  return fn_access_view(event_view.get_input,path,[],ctx);
}

// js.cell/view-get-output [284] 
function view_get_output(path,ctx){
  return fn_access_view(event_view.get_output,path,[],ctx);
}

// js.cell/view-set-val [293] 
function view_set_val(path,val,errored,ctx){
  return fn_access_view(event_view.set_output,path,[val,errored],ctx);
}

// js.cell/view-get-time-updated [302] 
function view_get_time_updated(path,ctx){
  return fn_access_view(event_view.get_time_updated,path,[],ctx);
}

// js.cell/view-is-errored [311] 
function view_is_errored(path,ctx){
  return fn_access_view(event_view.is_errored,path,[],ctx);
}

// js.cell/view-is-pending [320] 
function view_is_pending(path,ctx){
  return fn_access_view(event_view.is_pending,path,[],ctx);
}

// js.cell/view-get-time-elapsed [329] 
function view_get_time_elapsed(path,ctx){
  return fn_access_view(event_view.get_time_elapsed,path,[],ctx);
}

// js.cell/view-set-input [338] 
function view_set_input(path,current,ctx){
  return fn_call_view(impl_model.view_set_input,path,[current],ctx);
}

// js.cell/view-refresh [347] 
function view_refresh(path,ctx){
  return fn_call_view(function (cell,model_id,view_id){
    return impl_model.refresh_view(cell,model_id,view_id,{},impl_model.refresh_view_dependents);
  },path,[],ctx);
}

// js.cell/view-update [358] 
function view_update(path,ctx){
  return fn_call_view(impl_model.view_update,path,[],ctx);
}

// js.cell/view-ensure [364] 
function view_ensure(path,ctx){
  return fn_call_view(impl_common.view_ensure,path,[],ctx);
}

// js.cell/view-call-remote [370] 
function view_call_remote(path,args,save_output,ctx){
  return fn_call_view(function (cell,model_id,view_id){
    return impl_model.remote_call(
      cell,
      model_id,
      view_id,
      args,
      save_output,
      impl_model.refresh_view_dependents
    );
  },path,[args,save_output],ctx);
}

// js.cell/view-refresh-remote [381] 
function view_refresh_remote(path,ctx){
  return fn_call_view(function (cell,model_id,view_id){
    return impl_model.refresh_view_remote(cell,model_id,view_id,impl_model.refresh_view_dependents);
  },path,[],ctx);
}

// js.cell/view-trigger [391] 
function view_trigger(path,topic,event,ctx){
  return fn_call_view(impl_model.trigger_view,path,[topic,event],ctx);
}

// js.cell/view-for [401] 
function view_for(path,ctx){
  return (view_update(path,ctx))[0].then(function (){
    return view_val(path,ctx);
  });
}

// js.cell/view-for-input [409] 
function view_for_input(path,input,ctx){
  return (view_set_input(path,input,ctx))[0].then(function (){
    return view_val(path,ctx);
  });
}

// js.cell/get-val [417] 
function get_val(path,subpath,ctx){
  let out = view_val(path,ctx);
  if((null == out) || k.is_emptyp(subpath)){
    return out;
  }
  return k.get_in(out,subpath);
}

// js.cell/get-for [426] 
function get_for(path,subpath,ctx){
  return (view_update(path,ctx))[0].then(function (){
    return get_val(path,subpath,ctx);
  });
}

// js.cell/nil-view [434] 
function nil_view(path,ctx){
  return view_for_input(path,null,ctx);
}

// js.cell/nil-model [440] 
function nil_model(model_id,ctx){
  return Promise.all(k.arr_map(list_views(model_id,ctx),function (k){
    return nil_view([model_id,k],ctx);
  }));
}

// js.cell/clear-listeners [452] 
function clear_listeners(ctx){
  let cell = get_cell(ctx);
  return impl_common.clear_listeners(cell);
}

// js.cell/add-listener [459] 
function add_listener(path,listener_id,f,meta,pred,ctx){
  let cell = get_cell(ctx);
  return impl_common.add_listener(cell,path,listener_id,f,meta,pred);
}

// js.cell/remove-listener [466] 
function remove_listener(path,listener_id,ctx){
  let cell = get_cell(ctx);
  return impl_common.remove_listener(cell,path,listener_id);
}

// js.cell/list-listeners [473] 
function list_listeners(path,ctx){
  let cell = get_cell(ctx);
  return impl_common.list_listeners(cell,path);
}

// js.cell/list-all-listeners [480] 
function list_all_listeners(path,ctx){
  let cell = get_cell(ctx);
  return impl_common.list_all_listeners(cell);
}

// js.cell/add-raw-callback [491] 
function add_raw_callback(key,pred,handler,ctx){
  let cell = get_cell(ctx);
  let {link} = cell;
  return raw.add_callback(link,key,pred,handler);
}

// js.cell/remove-raw-callback [499] 
function remove_raw_callback(key,ctx){
  let cell = get_cell(ctx);
  let {link} = cell;
  return raw.remove_callback(link,key);
}

// js.cell/list-raw-callbacks [507] 
function list_raw_callbacks(ctx){
  let cell = get_cell(ctx);
  let {link} = cell;
  return raw.list_callbacks(link);
}

var MODULE = {
  "make_cell":make_cell,
  "GD":GD,
  "GD_reset":GD_reset,
  "GX":GX,
  "GX_reset":GX_reset,
  "GX_val":GX_val,
  "GX_set":GX_set,
  "get_cell":get_cell,
  "fn_call_cell":fn_call_cell,
  "fn_call_model":fn_call_model,
  "fn_call_view":fn_call_view,
  "fn_access_cell":fn_access_cell,
  "fn_access_model":fn_access_model,
  "fn_access_view":fn_access_view,
  "list_models":list_models,
  "list_views":list_views,
  "get_model":get_model,
  "get_view":get_view,
  "cell_vals":cell_vals,
  "cell_outputs":cell_outputs,
  "cell_inputs":cell_inputs,
  "cell_trigger":cell_trigger,
  "model_outputs":model_outputs,
  "model_vals":model_vals,
  "model_is_errored":model_is_errored,
  "model_is_pending":model_is_pending,
  "add_model_attach":add_model_attach,
  "add_model":add_model,
  "remove_model":remove_model,
  "model_update":model_update,
  "model_trigger":model_trigger,
  "view_success":view_success,
  "view_val":view_val,
  "view_get_input":view_get_input,
  "view_get_output":view_get_output,
  "view_set_val":view_set_val,
  "view_get_time_updated":view_get_time_updated,
  "view_is_errored":view_is_errored,
  "view_is_pending":view_is_pending,
  "view_get_time_elapsed":view_get_time_elapsed,
  "view_set_input":view_set_input,
  "view_refresh":view_refresh,
  "view_update":view_update,
  "view_ensure":view_ensure,
  "view_call_remote":view_call_remote,
  "view_refresh_remote":view_refresh_remote,
  "view_trigger":view_trigger,
  "view_for":view_for,
  "view_for_input":view_for_input,
  "get_val":get_val,
  "get_for":get_for,
  "nil_view":nil_view,
  "nil_model":nil_model,
  "clear_listeners":clear_listeners,
  "add_listener":add_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "list_all_listeners":list_all_listeners,
  "add_raw_callback":add_raw_callback,
  "remove_raw_callback":remove_raw_callback,
  "list_raw_callbacks":list_raw_callbacks
};

export default MODULE