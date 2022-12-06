import React from 'react'

import k from '../../xt/lang/base-lib'

import event_box from '../../xt/lang/event-box'

// js.react.ext-box/makeBox [12] 
function makeBox(initial){
  return React.useCallback(event_box.make_box(initial),[]);
}

// js.react.ext-box/listenBox [18] 
function listenBox(box,path,meta){
  let getFn = function (){
    return k.clone_shallow(event_box.get_data(box,path));
  };
  let [data,changeData] = React.useState(getFn);
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    event_box.add_listener(box,listener_id,path,function (m){
      changeData(getFn);
    },meta);
    changeData(getFn);
    return function (){
      event_box.remove_listener(box,listener_id);
    };
  },[JSON.stringify(path)]);
  return data;
}

// js.react.ext-box/useBox [35] 
function useBox(box,path,meta){
  let data = listenBox(box,path,meta);
  let setData = React.useCallback(function (value){
    event_box.set_data(box,path,value);
  },[]);
  return [data,setData];
}

var MODULE = {"makeBox":makeBox,"listenBox":listenBox,"useBox":useBox};

export default MODULE