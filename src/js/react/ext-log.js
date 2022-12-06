import React from 'react'

import event_log from '../../xt/lang/event-log'

// js.react.ext-log/makeLog [12] 
function makeLog(m){
  return React.useCallback(event_log.new_log(m),[]);
}

// js.react.ext-log/listenLogLatest [18] 
function listenLogLatest(log,meta){
  let [latest,setLatest] = React.useState(event_log.get_last(log));
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    event_log.add_listener(log,listener_id,function (id,data,t,meta){
      setLatest({data,id,meta,t});
    },meta);
    return function (){
      event_log.remove_listener(log,listener_id);
    };
  },[log]);
  return latest;
}

var MODULE = {"makeLog":makeLog,"listenLogLatest":listenLogLatest};

export default MODULE