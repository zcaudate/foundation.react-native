import React from 'react'

import k from '../../xt/lang/base-lib'

import event_route from '../../xt/lang/event-route'

import r from '../react'

// js.react.ext-route/makeRoute [12] 
function makeRoute(initial){
  return React.useCallback(event_route.make_route(initial),[]);
}

// js.react.ext-route/listenRouteTree [18] 
function listenRouteTree(route){
  let getFn = React.useCallback(function (){
    return k.clone_nested(route["tree"]);
  },[]);
  let [tree,changeTree] = React.useState(getFn);
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    event_route.add_url_listener(route,listener_id,function (){
      return changeTree(getFn);
    });
    return function (){
      return event_route.remove_listener(route,listener_id);
    };
  },[]);
  return tree;
}

// js.react.ext-route/listenRouteUrl [31] 
function listenRouteUrl(route){
  let getFn = React.useCallback(function (){
    return event_route.get_url(route);
  },[]);
  let [url,changeUrl] = React.useState(getFn);
  React.useEffect(function (){
    let listener_id = Math.random().toString(36).substr(2,4 || 4);
    event_route.add_url_listener(route,listener_id,function (){
      return changeUrl(getFn);
    });
    return function (){
      return event_route.remove_listener(route,listener_id);
    };
  },[]);
  return url;
}

// js.react.ext-route/useRouteUrl [44] 
function useRouteUrl(route){
  let url = listenRouteUrl(route);
  let setUrl = React.useCallback(function (url,terminate){
    return event_route.set_url(route,url,terminate);
  },[]);
  return [url,setUrl];
}

// js.react.ext-route/listenRouteSegment [54] 
function listenRouteSegment(route,path,defaultSegment){
  let listener_id = React.useCallback(Math.random().toString(36).substr(2,4 || 4),[]);
  let [segment,changeSegment] = React.useState(event_route.get_segment(route,path) || defaultSegment);
  React.useEffect(function (){
    event_route.add_path_listener(route,path,listener_id,function (){
      return changeSegment(event_route.get_segment(route,path) || defaultSegment);
    });
    return function (){
      return event_route.remove_listener(route,listener_id);
    };
  },[path]);
  return segment;
}

// js.react.ext-route/useRouteSegment [70] 
function useRouteSegment(route,path,defaultSegment){
  let pathRef = r.useFollowRef(path);
  let segment = listenRouteSegment(route,pathRef.current);
  let setSegment = React.useCallback(function (segment){
    return event_route.set_segment(route,pathRef.current,segment);
  },[]);
  React.useEffect(function (){
    if((null == segment) && defaultSegment){
      setSegment(defaultSegment);
    }
  },[]);
  return [segment || defaultSegment,setSegment];
}

// js.react.ext-route/listenRouteParam [86] 
function listenRouteParam(route,param,defaultVal){
  let listener_id = React.useCallback(Math.random().toString(36).substr(2,4 || 4),[]);
  let [value,changeValue] = React.useState(event_route.get_param(route,param) || defaultVal);
  React.useEffect(function (){
    event_route.add_param_listener(route,param,listener_id,function (){
      return changeValue(event_route.get_param(route,param) || defaultVal);
    });
    return function (){
      return event_route.remove_listener(route,listener_id);
    };
  },[param]);
  return value;
}

// js.react.ext-route/useRouteParam [101] 
function useRouteParam(route,param,defaultVal,defaultFn){
  defaultFn = (defaultFn || k.identity);
  let paramRef = r.useFollowRef(param);
  let value = defaultFn(listenRouteParam(route,param));
  let setValue = React.useCallback(function (value){
    return event_route.set_param(route,paramRef.current,value);
  },[]);
  React.useEffect(function (){
    if((null == value) && defaultVal){
      setValue(defaultVal);
    }
  },[]);
  return [value || defaultVal,setValue];
}

// js.react.ext-route/useRouteParamFlag [119] 
function useRouteParamFlag(route,param,flagVal,defaultVal){
  let [value,setValue] = useRouteParam(route,param,defaultVal);
  let [flag,setFlag] = [
    value == flagVal,
    function (flag){
      flag ? setValue(flagVal) : setValue(null);
    }
  ];
  return [flag,setFlag];
}

var MODULE = {
  "makeRoute":makeRoute,
  "listenRouteTree":listenRouteTree,
  "listenRouteUrl":listenRouteUrl,
  "useRouteUrl":useRouteUrl,
  "listenRouteSegment":listenRouteSegment,
  "useRouteSegment":useRouteSegment,
  "listenRouteParam":listenRouteParam,
  "useRouteParam":useRouteParam,
  "useRouteParamFlag":useRouteParamFlag
};

export default MODULE