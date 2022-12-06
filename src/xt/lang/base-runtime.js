import k from './base-lib'

// xt.lang.base-runtime/xt-exists? [10] 
function xt_existsp(){
  return !(null == globalThis["XT"]);
}

// xt.lang.base-runtime/xt-create [16] 
function xt_create(){
  return {
    "::":"xt",
    "config":{},
    "spaces":{},
    "hash":{"lookup":new WeakMap(),"counter":0x011c9dc5}
  };
}

// xt.lang.base-runtime/xt [26] 
function xt(){
  if(!(null == globalThis["XT"])){
    return globalThis["XT"];
  }
  else{
    globalThis["XT"] = xt_create();
    return globalThis["XT"];
  }
}

// xt.lang.base-runtime/xt-current [36] 
function xt_current(){
  if(!(null == globalThis["XT"])){
    return globalThis["XT"];
  }
  else{
    return null;
  }
}

// xt.lang.base-runtime/xt-purge [45] 
function xt_purge(){
  if(!(null == globalThis["XT"])){
    let out = globalThis["XT"];
    globalThis["XT"] = null;
    return out;
  }
  else{
    return null;
  }
}

// xt.lang.base-runtime/xt-purge-config [55] 
function xt_purge_config(){
  let g = xt();
  let prev = g["config"];
  g["config"] = {};
  return [true,prev];
}

// xt.lang.base-runtime/xt-purge-spaces [64] 
function xt_purge_spaces(){
  let g = xt();
  let prev = g["spaces"];
  g["spaces"] = {};
  return [true,prev];
}

// xt.lang.base-runtime/xt-lookup-id [73] 
function xt_lookup_id(obj){
  if(k.fnp(obj) || k.objp(obj) || k.arrp(obj)){
    let {hash} = xt();
    let {counter,lookup} = hash;
    let hash_id = lookup.get(obj);
    if(null == hash_id){
      hash["counter"] = (1 + counter);
      lookup.set(obj,counter);
      return counter;
    }
    return hash_id;
  }
}

// xt.lang.base-runtime/xt-config-list [94] 
function xt_config_list(){
  let g = xt();
  let {config} = g;
  return k.obj_keys(config);
}

// xt.lang.base-runtime/xt-config-set [102] 
function xt_config_set(module,m){
  let g = xt();
  let {config} = g;
  let prev = config[module];
  config[module] = m;
  return [true,prev];
}

// xt.lang.base-runtime/xt-config-del [112] 
function xt_config_del(module){
  let g = xt();
  let {config} = g;
  let prev = config[module];
  delete config[module];
  return [true,prev];
}

// xt.lang.base-runtime/xt-config [122] 
function xt_config(module){
  let g = xt();
  let {config} = g;
  return config[module];
}

// xt.lang.base-runtime/xt-space-list [134] 
function xt_space_list(){
  let g = xt();
  let {spaces} = g;
  return k.obj_keys(spaces);
}

// xt.lang.base-runtime/xt-space-del [142] 
function xt_space_del(module){
  let g = xt();
  let {spaces} = g;
  let prev = spaces[module];
  delete g[module];
  return [true,prev];
}

// xt.lang.base-runtime/xt-space [152] 
function xt_space(module){
  let g = xt();
  let {spaces} = g;
  let curr = spaces[module];
  if(null == curr){
    curr = {};
    spaces[module] = curr;
  }
  return curr;
}

// xt.lang.base-runtime/xt-space-clear [164] 
function xt_space_clear(module){
  let g = xt();
  let {spaces} = g;
  let prev = spaces[module];
  spaces[module] = {};
  return [true,prev];
}

// xt.lang.base-runtime/xt-item-del [178] 
function xt_item_del(module,key){
  let space = xt_space(module);
  let prev = space[key];
  delete space[key];
  return [true,prev];
}

// xt.lang.base-runtime/xt-item-trigger [187] 
function xt_item_trigger(module,key){
  let space = xt_space(module);
  let prev = space[key];
  if(null != prev){
    let {value,watch} = prev;
    for(let [watch_key,watch_fn] of Object.entries(watch)){
      watch_fn(value,module + "/" + key);
    };
    return k.obj_keys(watch);
  }
}

// xt.lang.base-runtime/xt-item-set [199] 
function xt_item_set(module,key,value){
  let space = xt_space(module);
  let prev = space[key];
  if(null == prev){
    prev = {"watch":{}};
    space[key] = prev;
  }
  prev["value"] = value;
  let {watch} = prev;
  for(let [watch_key,watch_fn] of Object.entries(watch)){
    watch_fn(value,module + "/" + key);
  };
  return [true,prev];
}

// xt.lang.base-runtime/xt-item [215] 
function xt_item(module,key){
  let space = xt_space(module);
  let curr = space[key];
  if(curr){
    return curr["value"];
  }
  return null;
}

// xt.lang.base-runtime/xt-item-get [225] 
function xt_item_get(module,key,init_fn){
  let space = xt_space(module);
  let curr = space[key];
  if(curr){
    return curr["value"];
  }
  else{
    let value = init_fn();
    space[key] = {"value":value,"watch":{}};
    return value;
  }
}

// xt.lang.base-runtime/xt-var-entry [240] 
function xt_var_entry(sym){
  let [module,key] = k.sym_pair(sym);
  let space = xt_space(module);
  return space[key];
}

// xt.lang.base-runtime/xt-var [248] 
function xt_var(sym){
  let [module,key] = k.sym_pair(sym);
  return xt_item(module,key);
}

// xt.lang.base-runtime/xt-var-set [258] 
function xt_var_set(sym,value){
  let [module,key] = k.sym_pair(sym);
  if(null == value){
    return xt_item_del(module,key);
  }
  else{
    return xt_item_set(module,key,value);
  }
}

// xt.lang.base-runtime/xt-var-trigger [267] 
function xt_var_trigger(sym){
  let [module,key] = k.sym_pair(sym);
  return xt_item_trigger(module,key);
}

// xt.lang.base-runtime/xt-add-watch [274] 
function xt_add_watch(sym,watch_key,watch_fn){
  let entry = xt_var_entry(sym);
  if(entry){
    let {watch} = entry;
    watch[watch_key] = watch_fn;
    return true;
  }
  return false;
}

// xt.lang.base-runtime/xt-remove-watch [285] 
function xt_remove_watch(sym,watch_key){
  let entry = xt_var_entry(sym);
  if(entry){
    let {watch} = entry;
    delete watch[watch_key];
    return true;
  }
  return false;
}

var MODULE = {
  "xt_existsp":xt_existsp,
  "xt_create":xt_create,
  "xt":xt,
  "xt_current":xt_current,
  "xt_purge":xt_purge,
  "xt_purge_config":xt_purge_config,
  "xt_purge_spaces":xt_purge_spaces,
  "xt_lookup_id":xt_lookup_id,
  "xt_config_list":xt_config_list,
  "xt_config_set":xt_config_set,
  "xt_config_del":xt_config_del,
  "xt_config":xt_config,
  "xt_space_list":xt_space_list,
  "xt_space_del":xt_space_del,
  "xt_space":xt_space,
  "xt_space_clear":xt_space_clear,
  "xt_item_del":xt_item_del,
  "xt_item_trigger":xt_item_trigger,
  "xt_item_set":xt_item_set,
  "xt_item":xt_item,
  "xt_item_get":xt_item_get,
  "xt_var_entry":xt_var_entry,
  "xt_var":xt_var,
  "xt_var_set":xt_var_set,
  "xt_var_trigger":xt_var_trigger,
  "xt_add_watch":xt_add_watch,
  "xt_remove_watch":xt_remove_watch
};

export default MODULE