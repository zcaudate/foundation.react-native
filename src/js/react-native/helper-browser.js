import React from 'react'

import * as ReactNative from 'react-native'

import k from '../../xt/lang/base-lib'

import event_route from '../../xt/lang/event-route'

import ext_route from '../react/ext-route'

// js.react-native.helper-browser/getHash [13] 
function getHash(){
  if(window && window.location){
    return window.location.hash;
  }
}

// js.react-native.helper-browser/getHashRoute [19] 
function getHashRoute(){
  let hash = getHash();
  return hash ? hash.substring(2) : "";
}

// js.react-native.helper-browser/useHashRoute [29] 
function useHashRoute(route){
  let [routeUrl,setRouteUrl] = ext_route.useRouteUrl(route);
  React.useEffect(function (){
    let listener = function (){
      let hash = getHash();
      if((null != hash) && (hash != ("#/" + event_route.get_url(route)))){
        setRouteUrl(getHashRoute(),true);
      }
    };
    if("web" == ReactNative.Platform.OS){
      window.addEventListener("popstate",listener);
      return function (){
        return window.removeEventListener("popstate",listener);
      };
    }
  },[]);
  React.useEffect(function (){
    if((null != routeUrl) && ("web" == ReactNative.Platform.OS)){
      window.location.hash = ("/" + routeUrl);
    }
  },[routeUrl]);
}

// js.react-native.helper-browser/setHashParam [52] 
function setHashParam(key,value,path){
  console.log(
    " js.react-native.helper-browser/setHashParam",
    54,
    "\n\n",
    getHashRoute()
  );
  let route = event_route.make_route(getHashRoute());
  event_route.set_param(route,key,value,path);
  window.location.hash = ("/" + event_route.get_url(route));
}

var MODULE = {
  "getHash":getHash,
  "getHashRoute":getHashRoute,
  "useHashRoute":useHashRoute,
  "setHashParam":setHashParam
};

export default MODULE