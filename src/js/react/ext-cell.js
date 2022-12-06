import React from 'react'

import k from '../../xt/lang/base-lib'

import r from '../react'

import cl from '../cell'

import ext_view from './ext-view'

// js.react.ext-cell/TYPES [13] 
var TYPES = {
  "input":[cl.view_get_input,"current"],
  "output":[cl.view_get_output,"current"],
  "pending":[cl.view_get_output],
  "elapsed":[cl.view_get_output],
  "disabled":[cl.view_get_output],
  "success":[cl.view_success,null,"output"]
};

// js.react.ext-cell/initCellBase [21] 
function initCellBase({context,getResult,meta,path,pred,resultRef,setResult}){
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    cl.add_listener(path,listener_id,function (){
      let nresult = getResult();
      if(!(resultRef.current == nresult)){
        setResult(nresult);
      }
    },meta,pred,context);
    return function (){
      cl.remove_listener(path,listener_id,context);
    };
  },[]);
}

// js.react.ext-cell/listenCell [47] 
function listenCell(path,type,meta,context){
  let [tfn,tkey,tevent] = TYPES[type];
  tevent = (tevent || type);
  let getResult = function (){
    let out = tfn(path,context);
    return k.clone_shallow(tkey ? out[tkey] : out);
  };
  let [result,setResult] = React.useState(getResult);
  let resultRef = r.useFollowRef(result);
  initCellBase({context,getResult,meta,path,resultRef,setResult,"pred":function (event){
      return event["type"] == ("view." + tevent);
    }});
  return result;
}

// js.react.ext-cell/listenCellOutput [68] 
function listenCellOutput(path,types,meta,context){
  let getOutput = function (){
    return k.obj_clone(cl.view_get_output(path,context) || {});
  };
  let [output,setOutput] = React.useState(getOutput);
  let outputRef = r.useFollowRef(output);
  let pred = function (event){
    return k.arr_some(types,function (type){
      return event["type"] == ("view." + type);
    });
  };
  initCellBase(
    {context,meta,path,pred,"setResult":setOutput,"getResult":getOutput,"resultRef":outputRef}
  );
  return output;
}

// js.react.ext-cell/listenCellThrottled [92] 
function listenCellThrottled(path,delay,meta,context){
  let getResult = function (){
    return k.clone_shallow(cl.view_success(path,context));
  };
  let [result,setResult] = React.useState(getResult);
  let resultRef = r.useFollowRef(result);
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    let [setThrottled,throttle] = ext_view.throttled_setter(setResult,delay);
    let nresult = getResult();
    cl.add_listener(path,listener_id,function (){
      let nresult = getResult();
      if(!(resultRef.current == nresult)){
        setThrottled(nresult);
      }
    },meta,function (event){
      return "view.output" == event["type"];
    },context);
    return function (){
      throttle["mounted"] = false;
      cl.remove_listener(path,listener_id,context);
    };
  },[]);
  return result;
}

// js.react.ext-cell/listenRawEvents [122] 
function listenRawEvents(pred,handler,context){
  let listener_id = r.id();
  React.useEffect(function (){
    cl.add_raw_callback(listener_id,pred,handler,context);
    return function (){
      return cl.remove_raw_callback(listener_id,context);
    };
  },[]);
  return listener_id;
}

var MODULE = {
  "TYPES":TYPES,
  "initCellBase":initCellBase,
  "listenCell":listenCell,
  "listenCellOutput":listenCellOutput,
  "listenCellThrottled":listenCellThrottled,
  "listenRawEvents":listenRawEvents
};

export default MODULE