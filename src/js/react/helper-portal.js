import k from '../../xt/lang/base-lib'

// js.react.helper-portal/newRegistry [10] 
function newRegistry(){
  return {
    "id":Math.random().toString(36).substr(2,6 || 4),
    "sinks":{},
    "sources":{},
    "initial":{}
  };
}

// js.react.helper-portal/captureSink [32] 
function captureSink(reg,name,portalId,onSink){
  let {initial} = reg;
  let entry = k.get_in(reg,["sinks",name]);
  if(entry){
    let {sinkRef} = entry;
    onSink(sinkRef);
    return sinkRef;
  }
  else{
    k.set_in(initial,[name,portalId],onSink);
    return null;
  }
}

// js.react.helper-portal/triggerSink [49] 
function triggerSink(reg,name){
  let {sinks,sources} = reg;
  let entry = sinks[name];
  if(entry){
    let {setSource} = entry;
    setSource(Object.values(sources[name] || {}));
  }
}

// js.react.helper-portal/addSink [61] 
function addSink(reg,name,entry){
  let {initial,sinks} = reg;
  sinks[name] = entry;
  let callbacks = initial[name];
  if(callbacks){
    let {sinkRef} = entry;
    for(let [id,callback] of Object.entries(callbacks)){
      callback(sinkRef);
    };
  }
  delete initial[name];
  return triggerSink(reg,name);
}

// js.react.helper-portal/removeSink [75] 
function removeSink(reg,name){
  let {sinks} = reg;
  let curr = sinks[name];
  delete sinks[name];
  return curr;
}

// js.react.helper-portal/addSource [94] 
function addSource(reg,name,portalId,child){
  let {sources} = reg;
  let entries = sources[name];
  if(!entries){
    entries = {};
    sources[name] = entries;
  }
  entries[portalId] = child;
  return triggerSink(reg,name);
}

// js.react.helper-portal/removeSource [108] 
function removeSource(reg,name,portalId){
  let {sources} = reg;
  let entries = sources[name];
  if(entries){
    let curr = entries[portalId];
    delete entries[portalId];
    if(k.is_emptyp(entries)){
      delete sources[name];
    }
    return triggerSink(reg,name);
  }
}

var MODULE = {
  "newRegistry":newRegistry,
  "captureSink":captureSink,
  "triggerSink":triggerSink,
  "addSink":addSink,
  "removeSink":removeSink,
  "addSource":addSource,
  "removeSource":removeSource
};

export default MODULE