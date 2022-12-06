import k from './base-lib'

// xt.lang.event-animate/new-derived [9] 
function new_derived(impl,f,arr){
  let {add_listener,create_val,get_value,set_value} = impl;
  let thunk_fn = function (){
    return f(...k.arr_map(arr,get_value));
  };
  let derived = create_val(thunk_fn());
  for(let v of arr){
    add_listener(v,function (v){
      let nval = thunk_fn();
      if(nval != get_value(derived)){
        set_value(derived,nval);
      }
    });
  };
  return derived;
}

// xt.lang.event-animate/listen-single [28] 
function listen_single(impl,ref,ind,f){
  f = (f || function (){
    return {};
  });
  let {add_listener,get_value,set_props} = impl;
  let trigger_fn = function (){
    let props = f(get_value(ind));
    if(ref && ref["current"]){
      set_props(ref["current"],props);
    }
    return props;
  };
  add_listener(ind,trigger_fn);
  return trigger_fn();
}

// xt.lang.event-animate/listen-array [48] 
function listen_array(impl,ref,arr,f){
  f = (f || function (){
    return {};
  });
  let {add_listener,get_value,set_props} = impl;
  let trigger_fn = function (){
    let props = f(...k.arr_map(arr,get_value));
    if(ref && ref["current"]){
      set_props(ref["current"],props);
    }
    return props;
  };
  for(let ind of arr){
    add_listener(ind,trigger_fn);
  };
  return trigger_fn();
}

// xt.lang.event-animate/get-map-paths [69] 
function get_map_paths(impl,m,parent,all){
  parent = (parent || []);
  all = (all || []);
  let {is_animated} = impl;
  for(let [k,x] of Object.entries(m)){
    if(is_animated(x)){
      all.push([[...parent],k,x]);
    }
    else if(k.objp(x)){
      all.push([[...parent],k,false]);
      let nparent = [...parent];
      nparent.push(k);
      get_map_paths(impl,x,nparent,all);
    }
  };
  return all;
}

// xt.lang.event-animate/get-map-input [90] 
function get_map_input(impl,paths){
  let {get_value} = impl;
  let out = {};
  for(let e of paths){
    let [path,key,v] = e;
    let val = !v ? {} : get_value(v);
    if(k.is_emptyp(path)){
      out[key] = val;
    }
    else{
      k.get_in(out,path)[key] = val;
    }
  };
  return out;
}

// xt.lang.event-animate/listen-map [107] 
function listen_map(impl,ref,m,f){
  f = (f || function (){
    return {};
  });
  let {add_listener,set_props} = impl;
  let paths = get_map_paths(impl,m);
  let animated = k.arr_keepf(paths,function (arr){
    return arr[arr.length + -1];
  },function (arr){
    return arr[arr.length + -1];
  });
  let trigger_fn = function (){
    let input = get_map_input(impl,paths);
    let props = f(input);
    if(ref && ref["current"]){
      set_props(ref["current"],props);
    }
    return props;
  };
  for(let ind of animated){
    add_listener(ind,trigger_fn);
  };
  return trigger_fn();
}

// xt.lang.event-animate/listen-transformations [129] 
function listen_transformations(impl,ref,indicators,transformations,get_chord){
  let {is_animated,set_props} = impl;
  if(null == transformations){
    return {};
  }
  else if(k.fnp(transformations)){
    if(null == indicators){
      return;
    }
    else if(is_animated(indicators)){
      return listen_single(impl,ref,indicators,function (v){
        return transformations(v,get_chord());
      });
    }
    else{
      return listen_map(impl,ref,indicators,function (m){
        return transformations(m,get_chord());
      });
    }
  }
  else{
    let out = {};
    for(let [key,subtransformations] of Object.entries(transformations)){
      let subindicators = indicators[key];
      let subout = listen_transformations(impl,ref,subindicators,subtransformations,get_chord);
      out[key] = subout;
    };
    return out;
  }
}

// xt.lang.event-animate/new-progressing [159] 
function new_progressing(){
  return {"running":false,"animation":null,"queued":[]};
}

// xt.lang.event-animate/run-with-cancel [168] 
function run_with_cancel(impl,animate_fn,progressing,progress_fn){
  let {animation,running} = progressing;
  let {stop_transition} = impl;
  if(running && animation){
    stop_transition(animation);
    k.obj_assign(progressing,{"running":false,"animation":null});
  }
  let anim = animate_fn(function (finished){
    k.obj_assign(progressing,{"running":false,"animation":null});
    if(progress_fn){
      progress_fn({"status":"stopped","finished":finished});
    }
  });
  k.obj_assign(progressing,{"animation":anim});
  if(progress_fn){
    progress_fn({"status":"running"});
  }
  return progressing;
}

// xt.lang.event-animate/animate-chained-cleanup [195] 
function animate_chained_cleanup(impl,progressing,progress_fn){
  let out = k.obj_assign(progressing,new_progressing());
  if(progress_fn){
    progress_fn({"status":"cleanup"});
  }
  return out;
}

// xt.lang.event-animate/animate-chained-one [204] 
function animate_chained_one(impl,progressing,progress_fn){
  let {queued} = progressing;
  let queued_fn = queued[0];
  if(!queued_fn){
    return animate_chained_cleanup(impl,progressing,progress_fn);
  }
  let anim = queued_fn(function (){
    return animate_chained_cleanup(impl,progressing,progress_fn);
  });
  k.obj_assign(progressing,{"running":true,"animation":anim});
  if(progress_fn){
    progress_fn({"status":"running"});
  }
  return progressing;
}

// xt.lang.event-animate/animate-chained-all [224] 
function animate_chained_all(impl,progressing,progress_fn){
  let {queued} = progressing;
  if(0 == (queued).length){
    return animate_chained_cleanup(impl,progressing,progress_fn);
  }
  let queued_fn = queued[0];
  queued.shift();
  if(queued_fn){
    let anim = queued_fn(function (res){
      return animate_chained_all(impl,progressing,progress_fn);
    });
    if(anim){
      k.obj_assign(progressing,{"running":true,"animation":anim});
      if(progress_fn){
        progress_fn({"status":"running"});
      }
    }
  }
  return progressing;
}

// xt.lang.event-animate/run-with-chained [244] 
function run_with_chained(impl,type,animate_fn,progressing,progress_fn){
  let callback_fn = (type == "chained-one") ? function (){
    return animate_chained_one(impl,progressing,progress_fn);
  } : function (){
    return animate_chained_all(impl,progressing,progress_fn);
  };
  let {queued,running} = progressing;
  if(!running){
    let anim = animate_fn(callback_fn);
    if(anim){
      k.obj_assign(progressing,{"running":true,"animation":anim});
    }
  }
  else if((type == "chained-one") && queued[0]){
    
  }
  else{
    queued.push(animate_fn);
  }
  return progressing;
}

// xt.lang.event-animate/run-with [271] 
function run_with(impl,type,animate_fn,progressing,progress_fn){
  if(type == "cancel"){
    return run_with_cancel(impl,animate_fn,progressing,progress_fn);
  }
  else if((type == "chained-one") || (type == "chained-all")){
    return run_with_chained(impl,type,animate_fn,progressing,progress_fn);
  }
  else{
    throw "Not a valid type: " + type;
  }
}

// xt.lang.event-animate/make-binary-transitions [289] 
function make_binary_transitions(impl,initial,tparams){
  tparams = (tparams || {});
  let {create_transition,create_val} = impl;
  let indicator = create_val(initial ? 1 : 0);
  let zero_fn = create_transition(indicator,tparams,[1,0],k.identity);
  let one_fn = create_transition(indicator,tparams,[0,1],k.identity);
  let {check} = tparams;
  return {
    "indicator":indicator,
    "zero_fn":zero_fn,
    "one_fn":one_fn,
    "check_fn":check || k.identity
  };
}

// xt.lang.event-animate/make-binary-indicator [313] 
function make_binary_indicator(impl,initial,tparams,type,progressing,progress_fn){
  tparams = (tparams || {});
  let {check_fn,indicator,one_fn,zero_fn} = make_binary_transitions(impl,initial,tparams);
  return {
    "indicator":indicator,
    "trigger_fn":function (flag){
        if(progress_fn){
          progress_fn({"status":"started"});
        }
        if(check_fn(flag)){
          return run_with(impl,type,one_fn,progressing,progress_fn);
        }
        else{
          return run_with(impl,type,zero_fn,progressing,progress_fn);
        }
      }
  };
}

// xt.lang.event-animate/make-linear-indicator [340] 
function make_linear_indicator(impl,initial,get_prev,set_prev,tparams,type,progressing,progress_fn,check_fn){
  let {create_transition,create_val} = impl;
  let indicator = create_val(initial);
  return {
    "indicator":indicator,
    "trigger_fn":function (value){
        if((null == check_fn) || check_fn(value)){
          let t_fn = create_transition(indicator,tparams,[get_prev(),value],k.identity);
          if(progress_fn){
            progress_fn({"status":"started"});
          }
          let out = run_with(impl,type,t_fn,progressing,progress_fn);
          set_prev(value);
          return out;
        }
      }
  };
}

// xt.lang.event-animate/make-circular-indicator [371] 
function make_circular_indicator(impl,initial,get_prev,set_prev,tparams,type,modulo,progressing,progress_fn,check_fn){
  let {create_transition,create_val} = impl;
  let indicator = create_val(initial);
  return {
    "indicator":indicator,
    "trigger_fn":function (value){
        if((null == check_fn) || check_fn(value)){
          let pval = get_prev();
          let offset = k.mod_offset(pval,value,modulo || 360);
          let nval = pval + offset;
          let t_fn = create_transition(indicator,tparams,[pval,nval],k.identity);
          if(progress_fn){
            progress_fn({"status":"started"});
          }
          let out = run_with(impl,type,t_fn,progressing,progress_fn);
          set_prev(value);
          return out;
        }
      }
  };
}

var MODULE = {
  "new_derived":new_derived,
  "listen_single":listen_single,
  "listen_array":listen_array,
  "get_map_paths":get_map_paths,
  "get_map_input":get_map_input,
  "listen_map":listen_map,
  "listen_transformations":listen_transformations,
  "new_progressing":new_progressing,
  "run_with_cancel":run_with_cancel,
  "animate_chained_cleanup":animate_chained_cleanup,
  "animate_chained_one":animate_chained_one,
  "animate_chained_all":animate_chained_all,
  "run_with_chained":run_with_chained,
  "run_with":run_with,
  "make_binary_transitions":make_binary_transitions,
  "make_binary_indicator":make_binary_indicator,
  "make_linear_indicator":make_linear_indicator,
  "make_circular_indicator":make_circular_indicator
};

export default MODULE