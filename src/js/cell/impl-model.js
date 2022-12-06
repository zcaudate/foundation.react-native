import k from '../../xt/lang/base-lib'

import th from '../../xt/lang/util-throttle'

import event_view from '../../xt/lang/event-view'

import raw from './link-raw'

import util from './base-util'

import impl_common from './impl-common'

// js.cell.impl-model/wrap-cell-args [15] 
function wrap_cell_args(handler){
  return function (context){
    return handler(context["cell"]["link"],...context["args"]);
  };
}

// js.cell.impl-model/async-fn [23] 
var async_fn = function (handler_fn,context,{error,success}){
  return new Promise(function (resolve,reject){
    resolve(handler_fn(context));
  }).then(success).catch(error);
};

// js.cell.impl-model/prep-view [25] 
function prep_view(cell,model_id,view_id,opts){
  let path = [model_id,view_id];
  let [model,view] = impl_common.view_ensure(cell,model_id,view_id);
  let [context,disabled] = event_view.pipeline_prep(
    view,
    Object.assign({"path":path,"cell":cell,"model":model},opts)
  );
  return [path,context,disabled];
}

// js.cell.impl-model/get-view-dependents [38] 
function get_view_dependents(cell,model_id,view_id){
  let out = {};
  let {models} = cell;
  for(let [dmodel_id,dmodel] of Object.entries(models)){
    let {deps} = dmodel;
    let view_lu = k.get_in(deps,[model_id,view_id]);
    if(null != view_lu){
      out[dmodel_id] = k.obj_keys(view_lu);
    }
  };
  return out;
}

// js.cell.impl-model/get-model-dependents [51] 
function get_model_dependents(cell,model_id){
  let out = {};
  let {models} = cell;
  for(let [dmodel_id,dmodel] of Object.entries(models)){
    let {deps} = dmodel;
    let model_lu = deps[model_id];
    if(null != model_lu){
      out[dmodel_id] = true;
    }
  };
  return out;
}

// js.cell.impl-model/run-tail-call [64] 
function run_tail_call(context,refresh_deps_fn){
  let {acc,cell,path} = context;
  let [model_id,view_id] = path;
  if(acc && !acc["error"]){
    if(refresh_deps_fn){
      refresh_deps_fn(cell,model_id,view_id,refresh_deps_fn);
    }
  }
  return acc;
}

// js.cell.impl-model/run-remote [75] 
function run_remote(context,save_output,path,refresh_deps_fn){
  context["acc"]["path"] = path;
  return event_view.pipeline_run_remote(context,save_output,async_fn,null,k.identity).then(function (){
    return run_tail_call(context,refresh_deps_fn);
  });
}

// js.cell.impl-model/remote-call [90] 
function remote_call(cell,model_id,view_id,args,save_output){
  let [path,context,disabled] = prep_view(cell,model_id,view_id,{"args":args});
  return run_remote(context,save_output,path);
}

// js.cell.impl-model/run-refresh [98] 
function run_refresh(context,disabled,path,refresh_deps_fn){
  context["acc"]["path"] = path;
  return event_view.pipeline_run(context,disabled,async_fn,null,k.identity).then(function (){
    return run_tail_call(context,refresh_deps_fn);
  });
}

// js.cell.impl-model/refresh-view-dependents [112] 
function refresh_view_dependents(cell,model_id,view_id){
  let {models} = cell;
  let dependents = get_view_dependents(cell,model_id,view_id);
  for(let [dmodel_id,dview_ids] of Object.entries(dependents)){
    let {throttle} = models[dmodel_id];
    for(let dview_id of dview_ids){
      th.throttle_run(throttle,dview_id,[]);
    };
  };
  return dependents;
}

// js.cell.impl-model/refresh-view [124] 
function refresh_view(cell,model_id,view_id,event,refresh_deps_fn){
  let [path,context,disabled] = prep_view(cell,model_id,view_id,{"event":event});
  return run_refresh(context,disabled,path,refresh_deps_fn);
}

// js.cell.impl-model/refresh-view-remote [132] 
function refresh_view_remote(cell,model_id,view_id,refresh_deps_fn){
  let [path,context,disabled] = prep_view(cell,model_id,view_id,{});
  return run_remote(context,true,path,refresh_deps_fn);
}

// js.cell.impl-model/refresh-view-dependents-unthrottled [140] 
function refresh_view_dependents_unthrottled(cell,model_id,view_id,refresh_deps_fn){
  let {models} = cell;
  let dependents = get_view_dependents(cell,model_id,view_id);
  let out = [];
  for(let [dmodel_id,dview_ids] of Object.entries(dependents)){
    for(let dview_id of dview_ids){
      out.push(refresh_view(cell,dmodel_id,dview_id,{},refresh_deps_fn));
    };
  };
  return Promise.all(out);
}

// js.cell.impl-model/refresh-model [152] 
function refresh_model(cell,model_id,event,refresh_deps_fn){
  let model = impl_common.model_ensure(cell,model_id);
  let running = [];
  for(let [view_id,view] of Object.entries(model["views"])){
    let [path,context,disabled] = prep_view(cell,model_id,view_id,{"event":event});
    running.push(run_refresh(context,disabled,path,refresh_deps_fn));
  };
  return Promise.all(running);
}

// js.cell.impl-model/get-model-deps [165] 
function get_model_deps(model_id,views){
  let all_deps = {};
  for(let [view_id,view_entry] of Object.entries(views)){
    let {deps} = view_entry;
    for(let path of deps || []){
      path = (k.arrp(path) ? path : [model_id,path]);
      k.set_in(all_deps,[path[0],path[1],view_id],true);
    };
  };
  return all_deps;
}

// js.cell.impl-model/get-unknown-deps [181] 
function get_unknown_deps(model_id,views,model_deps,cell){
  let out = [];
  for(let [linked_model_id,linked_views] of Object.entries(model_deps)){
    if(model_id == linked_model_id){
      for(let linked_view_id of Object.keys(linked_views)){
        if(null == views[linked_view_id]){
          out.push([linked_model_id,linked_view_id]);
        }
      };
    }
    else{
      let linked_model = impl_common.model_get(cell,linked_model_id);
      for(let linked_view_id of Object.keys(linked_views)){
        if((null == linked_model) || (null == linked_model["views"][linked_view_id])){
          out.push([linked_model_id,linked_view_id]);
        }
      };
    }
  };
  return out;
}

// js.cell.impl-model/create-throttle [200] 
function create_throttle(cell,model_id,refresh_deps_fn){
  return th.throttle_create(function (view_id,event){
    return refresh_view(cell,model_id,view_id,event,refresh_deps_fn).catch(function (err){
      console.log(
        " js.cell.impl-model/create-throttle",
        209,
        "\n\n",
        {"stack":err["stack"],"message":err["message"]}
      );
      return err;
    });
  },function (){
    return Date.now();
  });
}

// js.cell.impl-model/create-view [214] 
function create_view(cell,model_id,view_id,{defaultArgs,defaultInit,defaultOutput,defaultProcess,handler,options,pipeline,remoteHandler,trigger}){
  let view = event_view.create_view(null,k.obj_assign_nested({
    "main":{"handler":handler,"wrapper":wrap_cell_args},
    "remote":{"handler":remoteHandler,"wrapper":wrap_cell_args}
  },pipeline),defaultArgs,defaultOutput,defaultProcess,Object.assign({"trigger":trigger,"init":defaultInit},options));
  event_view.init_view(view);
  event_view.add_listener(view,"@/cell",function (event){
    return impl_common.trigger_listeners(cell,[model_id,view_id],event);
  });
  return view;
}

// js.cell.impl-model/add-model-attach [249] 
function add_model_attach(cell,model_id,views){
  let {models} = cell;
  let model_throttle = create_throttle(cell,model_id,refresh_view_dependents);
  let model_deps = get_model_deps(model_id,views);
  let unknown_deps = get_unknown_deps(model_id,views,model_deps,cell);
  if(k.not_emptyp(unknown_deps)){
    console.log(
      "ERR - deps not found - " + JSON.stringify(unknown_deps),
      model_deps
    );
  }
  let model_views = {};
  for(let [view_id,view] of Object.entries(views)){
    model_views[view_id] = create_view(cell,model_id,view_id,view);
  };
  let model = {
    "name":model_id,
    "views":model_views,
    "throttle":model_throttle,
    "deps":model_deps
  };
  models[model_id] = model;
  return model;
}

// js.cell.impl-model/add-model [270] 
function add_model(cell,model_id,views){
  let {models} = cell;
  let model = add_model_attach(cell,model_id,views);
  model["init"] = refresh_model(cell,model_id,{});
  return model;
}

// js.cell.impl-model/remove-model [279] 
function remove_model(cell,model_id){
  let {models} = cell;
  let dependents = get_model_dependents(cell,models);
  if(k.not_emptyp(dependents)){
    throw "ERR - existing model dependents - " + JSON.stringify(dependents);
  }
  let curr = models[model_id];
  delete models[model_id];
  return curr;
}

// js.cell.impl-model/remove-view [291] 
function remove_view(cell,model_id,view_id){
  let {models} = cell;
  let dependents = get_view_dependents(cell,model_id,view_id);
  if(k.not_emptyp(dependents)){
    throw "ERR - existing view dependents - " + JSON.stringify(dependents);
  }
  let model = models[model_id];
  if(model){
    let {views} = model;
    let curr = views[view_id];
    delete views[view_id];
    return curr;
  }
}

// js.cell.impl-model/model-update [306] 
function model_update(cell,model_id,pevent){
  let model = impl_common.model_ensure(cell,model_id);
  let {throttle,views} = model;
  let out = [];
  for(let view_id of Object.keys(views)){
    out.push([
      view_id,
      (th.throttle_run(throttle,view_id,[pevent || {}]))[0]
    ]);
  };
  return Promise.all(k.arr_map(out,function (arr){
    return arr[1];
  })).then(function (arr){
    return k.arr_zip(k.arr_map(out,function (arr){
      return arr[0];
    }),arr);
  });
}

// js.cell.impl-model/view-update [320] 
function view_update(cell,model_id,view_id,pevent){
  let [model,view] = impl_common.view_ensure(cell,model_id,view_id);
  let {throttle} = model;
  return th.throttle_run(throttle,view_id,[pevent || {}]);
}

// js.cell.impl-model/view-set-input [328] 
function view_set_input(cell,model_id,view_id,current,pevent){
  let [model,view] = impl_common.view_ensure(cell,model_id,view_id);
  event_view.set_input(view,current);
  return view_update(cell,model_id,view_id,pevent || {});
}

// js.cell.impl-model/trigger-model-raw [340] 
function trigger_model_raw(cell,model,topic,event){
  let {throttle,views} = model;
  let out = [];
  for(let [view_id,view] of Object.entries(views)){
    let {options} = view;
    let {trigger} = options;
    let check = util.check_event(trigger,topic,event,{"view":view,"model":model,"cell":cell});
    if(check){
      th.throttle_run(model["throttle"],view_id,[event]);
      out.push(view_id);
    }
  };
  return out;
}

// js.cell.impl-model/trigger-model [359] 
function trigger_model(cell,model_id,topic,event){
  let model = impl_common.model_ensure(cell,model_id);
  return trigger_model_raw(cell,model,topic,event);
}

// js.cell.impl-model/trigger-view [366] 
function trigger_view(cell,model_id,view_id,topic,event){
  let {link} = cell;
  let [model,view] = impl_common.view_ensure(cell,model_id,view_id);
  let {options} = view;
  let {trigger} = options;
  if(util.check_event(trigger,topic,event,{"view":view,"model":model,"cell":cell})){
    return th.throttle_run(model["throttle"],view_id,[event]);
  }
  return null;
}

// js.cell.impl-model/trigger-all [382] 
function trigger_all(cell,topic,event){
  let {models} = cell;
  let out = {};
  for(let [model_id,model] of Object.entries(models)){
    let model_out = trigger_model_raw(cell,model,topic,event);
    out[model_id] = model_out;
  };
  return out;
}

// js.cell.impl-model/add-raw-callback [393] 
function add_raw_callback(cell){
  let {link} = cell;
  return raw.add_callback(link,"@/raw",function (){
    return true;
  },function (event,topic){
    return trigger_all(cell,topic,event);
  });
}

// js.cell.impl-model/remove-raw-callback [405] 
function remove_raw_callback(cell){
  let {link} = cell;
  return raw.remove_callback(link,"@/raw");
}

var MODULE = {
  "wrap_cell_args":wrap_cell_args,
  "async_fn":async_fn,
  "prep_view":prep_view,
  "get_view_dependents":get_view_dependents,
  "get_model_dependents":get_model_dependents,
  "run_tail_call":run_tail_call,
  "run_remote":run_remote,
  "remote_call":remote_call,
  "run_refresh":run_refresh,
  "refresh_view_dependents":refresh_view_dependents,
  "refresh_view":refresh_view,
  "refresh_view_remote":refresh_view_remote,
  "refresh_view_dependents_unthrottled":refresh_view_dependents_unthrottled,
  "refresh_model":refresh_model,
  "get_model_deps":get_model_deps,
  "get_unknown_deps":get_unknown_deps,
  "create_throttle":create_throttle,
  "create_view":create_view,
  "add_model_attach":add_model_attach,
  "add_model":add_model,
  "remove_model":remove_model,
  "remove_view":remove_view,
  "model_update":model_update,
  "view_update":view_update,
  "view_set_input":view_set_input,
  "trigger_model_raw":trigger_model_raw,
  "trigger_model":trigger_model,
  "trigger_view":trigger_view,
  "trigger_all":trigger_all,
  "add_raw_callback":add_raw_callback,
  "remove_raw_callback":remove_raw_callback
};

export default MODULE