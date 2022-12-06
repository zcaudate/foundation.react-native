import k from './base-lib'

import event_common from './event-common'

// xt.lang.event-route/interim-from-url [10] 
function interim_from_url(url){
  let arr = ("/" + url).split("?");
  let body = arr[0];
  let search = null;
  if(1 < (arr).length){
    search = arr[1];
  }
  let path = k.arr_filter(body.split("/"),k.not_emptyp);
  let params = {};
  if(search){
    for(let pair of search.split("&")){
      let [key,val] = pair.split("=");
      params[key] = val;
    };
  }
  if(k.is_emptyp(params)){
    return {"path":path,"params":{}};
  }
  else{
    return {"path":path,"params":{[JSON.stringify(path)]:params}};
  }
}

// xt.lang.event-route/interim-to-url [32] 
function interim_to_url(interim){
  let {params,path} = interim;
  let param_arr = [];
  for(let [key,val] of Object.entries(params[JSON.stringify(path)] || {})){
    if(val){
      param_arr.push(key + "=" + val);
    }
  };
  return k.arr_join(path,"/") + (k.not_emptyp(param_arr) ? ("?" + k.arr_join(param_arr,"&")) : "");
}

// xt.lang.event-route/path-to-tree [48] 
function path_to_tree(path,terminate){
  let out = {};
  let arr = [];
  for(let i = 0; i < path.length; ++i){
    let v = path[i];
    out[JSON.stringify(arr)] = v;
    arr.push(v);
  };
  if(terminate){
    out[JSON.stringify(arr)] = null;
  }
  return out;
}

// xt.lang.event-route/interim-to-tree [61] 
function interim_to_tree(interim,terminate){
  let {params,path} = interim;
  let tree = path_to_tree(path,terminate);
  tree["params"] = params;
  return tree;
}

// xt.lang.event-route/path-from-tree [70] 
function path_from_tree(tree){
  let path = [];
  let v = tree[JSON.stringify(path)];
  while(k.not_emptyp(v)){
    path.push(v);
    v = tree[JSON.stringify(path)];
  }
  return path;
}

// xt.lang.event-route/path-params-from-tree [81] 
function path_params_from_tree(tree,path){
  return (tree["params"])[JSON.stringify(path)] || {};
}

// xt.lang.event-route/interim-from-tree [91] 
function interim_from_tree(tree){
  let {params} = tree;
  let path = path_from_tree(tree);
  return {"path":path,"params":params};
}

// xt.lang.event-route/changed-params-raw [100] 
function changed_params_raw(pparams,nparams){
  pparams = (pparams || {});
  nparams = (nparams || {});
  let diff_fn = function (m,other){
    let out = {};
    for(let [k,v] of Object.entries(m)){
      if(v != other[k]){
        out[k] = true;
      }
    };
    return out;
  };
  return k.obj_assign(diff_fn(pparams,nparams),diff_fn(nparams,pparams));
}

// xt.lang.event-route/changed-params [117] 
function changed_params(ptree,ntree,path){
  let pparams = path_params_from_tree(ptree,path || []);
  let nparams = path_params_from_tree(ntree,path || []);
  return changed_params_raw(pparams,nparams);
}

// xt.lang.event-route/changed-path-raw [125] 
function changed_path_raw(ppath,npath){
  let all = {};
  let arr = [];
  let changed = false;
  for(let i = 0; i < npath.length; ++i){
    let v = npath[i];
    let pv = ppath[i];
    if(pv != v){
      changed = true;
    }
    if(changed){
      all[JSON.stringify(arr)] = true;
    }
    arr.push(v);
  };
  return all;
}

// xt.lang.event-route/changed-path [142] 
function changed_path(ptree,ntree){
  let ppath = path_from_tree(ptree);
  let npath = path_from_tree(ntree);
  return changed_path_raw(ppath,npath);
}

// xt.lang.event-route/get-url [150] 
function get_url(route){
  let {tree} = route;
  return interim_to_url(interim_from_tree(tree));
}

// xt.lang.event-route/get-segment [157] 
function get_segment(route,path){
  let {tree} = route;
  let pkey = JSON.stringify(path);
  return tree[pkey];
}

// xt.lang.event-route/get-param [165] 
function get_param(route,param,path){
  let {tree} = route;
  path = (path || path_from_tree(tree));
  return (path_params_from_tree(tree,path))[param];
}

// xt.lang.event-route/get-all-params [174] 
function get_all_params(route,path){
  let {tree} = route;
  path = (path || path_from_tree(tree));
  return path_params_from_tree(tree,path);
}

// xt.lang.event-route/make-route [187] 
function make_route(initial){
  let input = k.fnp(initial) ? initial() : initial;
  let interim = interim_from_url(input);
  let tree = interim_to_tree(interim,false);
  return event_common.blank_container("event.route",{"tree":tree,"history":[]});
}

// xt.lang.event-route/add-url-listener [200] 
function add_url_listener(route,listener_id,callback,meta){
  return event_common.add_listener(route,listener_id,"route.url",callback,meta,function (){
    return true;
  });
}

// xt.lang.event-route/add-path-listener [211] 
function add_path_listener(route,path,listener_id,callback,meta){
  let pkey = JSON.stringify(path);
  return event_common.add_listener(route,listener_id,"route.path",callback,k.obj_assign({"route/path":path},meta),function (event){
    return (event["path"])[pkey];
  });
}

// xt.lang.event-route/add-param-listener [227] 
function add_param_listener(route,param,listener_id,callback,meta){
  return event_common.add_listener(route,listener_id,"route.param",callback,k.obj_assign({"route/param":param},meta),function (event){
    return (event["params"])[param];
  });
}

// xt.lang.event-route/add-full-listener [242] 
function add_full_listener(route,path,param,listener_id,callback,meta){
  let pkey = JSON.stringify(path);
  return event_common.add_listener(route,listener_id,"route.full",callback,k.obj_assign({"route/path":path,"route/param":param},meta),function (event){
    return (event["path"])[pkey] && (event["params"])[param];
  });
}

// xt.lang.event-route/remove-listener [261] 
var remove_listener = event_common.remove_listener;

// xt.lang.event-route/list-listeners [265] 
var list_listeners = event_common.list_listeners;

// xt.lang.event-route/set-url [269] 
function set_url(route,url,terminate){
  let {listeners,tree} = route;
  let ninterim = interim_from_url(url);
  let ninterim_params = ninterim["params"];
  let all_params = tree["params"];
  let ppath = path_from_tree(tree);
  let npath = ninterim["path"];
  let pkey = JSON.stringify(npath);
  let pparams = all_params[pkey];
  let nparams = ninterim_params[pkey];
  let dpath = changed_path_raw(ppath,npath);
  let dparams = changed_params_raw(pparams,nparams);
  k.obj_assign(tree,path_to_tree(npath,terminate));
  if(k.is_emptyp(nparams)){
    delete all_params[pkey];
  }
  else{
    all_params[pkey] = nparams;
  }
  let {history} = route;
  k.arr_pushl(history,url,50);
  return event_common.trigger_listeners(route,{"type":"route.url","params":dparams,"path":dpath});
}

// xt.lang.event-route/set-path [306] 
function set_path(route,path,params){
  let {tree} = route;
  let all_params = tree["params"];
  let ppath = path_from_tree(tree);
  let npath = path || ppath;
  let pkey = JSON.stringify(npath);
  let pparams = all_params[pkey];
  let nparams = params || pparams;
  let dpath = changed_path_raw(ppath,npath);
  let dparams = changed_params_raw(pparams,nparams);
  k.obj_assign(tree,path_to_tree(npath,true));
  if(k.is_emptyp(nparams)){
    delete all_params[pkey];
  }
  else{
    all_params[pkey] = nparams;
  }
  let {history} = route;
  k.arr_pushl(history,get_url(route),50);
  return event_common.trigger_listeners(route,{"type":"route.path","params":dparams,"path":dpath});
}

// xt.lang.event-route/set-segment [341] 
function set_segment(route,path,value){
  let {tree} = route;
  let pkey = JSON.stringify(path);
  let pvalue = tree[pkey];
  tree[pkey] = value;
  let {history} = route;
  k.arr_pushl(history,get_url(route),50);
  return event_common.trigger_listeners(route,{"type":"route.path","params":{},"path":{[pkey]:true}});
}

// xt.lang.event-route/set-param [359] 
function set_param(route,param,value,path){
  let {tree} = route;
  path = (path || path_from_tree(tree));
  let pkey = JSON.stringify(path);
  let all_params = tree["params"];
  let pparams = all_params[pkey] || {};
  let pvalue = pparams[param];
  if(pvalue != value){
    if(null == value){
      delete pparams[param];
    }
    else{
      pparams[param] = value;
    }
    if(k.is_emptyp(pparams)){
      delete all_params[pkey];
    }
    else{
      all_params[pkey] = pparams;
    }
    let {history} = route;
    k.arr_pushl(history,get_url(route),50);
    return event_common.trigger_listeners(
      route,
      {"type":"route.params","params":{[param]:true},"path":{}}
    );
  }
  else{
    return [];
  }
}

// xt.lang.event-route/reset-route [394] 
function reset_route(route,url){
  route["history"] = [];
  route["tree"] = interim_to_tree(interim_from_url(url || ""),true);
  set_url(route,url || "",true);
}

var MODULE = {
  "interim_from_url":interim_from_url,
  "interim_to_url":interim_to_url,
  "path_to_tree":path_to_tree,
  "interim_to_tree":interim_to_tree,
  "path_from_tree":path_from_tree,
  "path_params_from_tree":path_params_from_tree,
  "interim_from_tree":interim_from_tree,
  "changed_params_raw":changed_params_raw,
  "changed_params":changed_params,
  "changed_path_raw":changed_path_raw,
  "changed_path":changed_path,
  "get_url":get_url,
  "get_segment":get_segment,
  "get_param":get_param,
  "get_all_params":get_all_params,
  "make_route":make_route,
  "add_url_listener":add_url_listener,
  "add_path_listener":add_path_listener,
  "add_param_listener":add_param_listener,
  "add_full_listener":add_full_listener,
  "remove_listener":remove_listener,
  "list_listeners":list_listeners,
  "set_url":set_url,
  "set_path":set_path,
  "set_segment":set_segment,
  "set_param":set_param,
  "reset_route":reset_route
};

export default MODULE