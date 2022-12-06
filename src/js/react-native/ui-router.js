import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

import model_context from './model-context'

import k from '../../xt/lang/base-lib'

// js.react-native.ui-router/useTransition [21] 
function useTransition({indicators,chord,indicatorParams = {},onComplete}){
  let isMountedWrap = r.useIsMountedWrap();
  let [changing,setChanging] = React.useState(function (){
    return false;
  });
  let [even,setEven] = React.useState(function (){
    return false;
  });
  let evenRef = r.useFollowRef(even);
  let changingRef = r.useFollowRef(changing);
  let cindicator = a.useBinaryIndicator(changing,indicatorParams["changing"] || {
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  React.useEffect(function (){
    cindicator.addListener(isMountedWrap(function (){
      if((cindicator._value == 1) && changingRef.current){
        setChanging(false);
        onComplete();
        setEven(!evenRef.current);
      }
    }));
  },[]);
  return {changing,even,setChanging,setEven,"indicators":Object.assign({"changing":cindicator},indicators),"chord":Object.assign({changing,even},chord)};
}

// js.react-native.ui-router/RouterImpl [55] 
function RouterImpl({
  routeKey,
  routeComponentFn = function (){
  return null;
},
  routePropsFn = function (){
  return {};
},
  transition,
  transitionMap = {},
  transitionDefault,
  style,
  debug,
  onComplete = function (){
  return null;
}
}){
  let isMountedWrap = r.useIsMountedWrap();
  let [dims,setDims] = React.useState({"height":0,"width":0});
  let {height,width} = dims;
  let [prevKey,setPrevKey] = React.useState(routeKey);
  transition = (transition || k.get_in(transitionMap,[prevKey,routeKey]) || transitionDefault);
  let {changing,chord,even,indicators,setChanging,setEven,setSettling,settling} = useTransition({"chord":{height,transition,width},"onComplete":onComplete});
  let oddKey = (changing && even) ? routeKey : prevKey;
  let OddComponent = routeComponentFn(oddKey) || ReactNative.View;
  let oddProps = routePropsFn(oddKey);
  let evenKey = (changing && !even) ? routeKey : prevKey;
  let EvenComponent = routeComponentFn(evenKey) || ReactNative.View;
  let evenProps = routePropsFn(evenKey);
  React.useEffect(function (){
    if(routeKey != prevKey){
      setChanging(true);
    }
  },[routeKey]);
  React.useEffect(function (){
    if(!changing){
      setPrevKey(routeKey);
    }
  },[changing]);
  let inFn = model_context.animateIn(chord);
  let outFn = model_context.animateOut(Object.assign({},chord,{
    "transition":k.get_in(model_context.ANIMATE,[transition,"counter"])
  }));
  let evenFn = function (progress,chord){
    let {changing,even} = chord;
    return changing ? {
      "style":even ? {
            "transform":Array.isArray(outFn(progress)) ? outFn(progress) : ((null == outFn(progress)) ? [] : [outFn(progress)])
          } : {
            "transform":Array.isArray(inFn(progress)) ? inFn(progress) : ((null == inFn(progress)) ? [] : [inFn(progress)])
          }
    } : null;
  };
  let oddFn = function (progress,chord){
    let {changing,even} = chord;
    let out = changing ? {
      "style":!even ? {
            "transform":Array.isArray(outFn(progress)) ? outFn(progress) : ((null == outFn(progress)) ? [] : [outFn(progress)])
          } : {
            "transform":Array.isArray(inFn(progress)) ? inFn(progress) : ((null == inFn(progress)) ? [] : [inFn(progress)])
          }
    } : null;
    return out;
  };
  let evenRef = r.useFollowRef(evenFn);
  let oddRef = r.useFollowRef(oddFn);
  let containerRef = React.useRef();
  React.useEffect(function (){
    n.measureRef(containerRef,function (e){
      if(k.not_emptyp(k.obj_diff(e,dims))){
        isMountedWrap(setDims)(e);
      }
    });
  });
  return (
    <>
      <ReactNative.View style={style} ref={containerRef}>
        <physical_base.Box
          indicators={indicators}
          style={{"overflow":"hidden","height":height,"width":width}}
          chord={chord}
          inner={[
            {
            "component":ReactNative.View,
            "key":"even",
            "style":[
              {
              "backfaceVisibility":"hidden",
              "position":"absolute",
              "overflow":"hidden",
              "height":height,
              "width":width,
              "opacity":1,
              "zIndex":even ? 100 : -100
            }
            ],
            "children":[
              (even || changing) ? (
              <n.GlobalProvider key="even" value={{"isTransition":changing}}><EvenComponent {...evenProps}></EvenComponent></n.GlobalProvider>) : null
            ],
            "transformations":{
              "changing":function (progress,chord){
                return {};
              }
            }
          },
            {
            "component":ReactNative.View,
            "key":"odd",
            "style":[
              {
              "backfaceVisibility":"hidden",
              "position":"absolute",
              "overflow":"hidden",
              "height":height,
              "width":width,
              "opacity":1,
              "zIndex":!even ? 100 : -100
            }
            ],
            "transformations":{
              "changing":function (progress,chord){
                return {};
              }
            },
            "children":[
              (!even || changing) ? (
              <n.GlobalProvider key="odd" value={{"isTransition":changing}}><OddComponent key="odd" {...oddProps}></OddComponent></n.GlobalProvider>) : null
            ]
          }
          ]}>
        </physical_base.Box>
      </ReactNative.View>
      {debug ? (
        <n.TextDisplay
          content={n.format_entry({changing,even,evenKey,oddKey,prevKey,routeKey,transition})}>
        </n.TextDisplay>) : null}
    </>);
}

// js.react-native.ui-router/Router [201] 
function Router(props){
  let {
    routeKey,
    routeComponentFn = function (){
    return null;
  },
    routePropsFn = function (){
    return {};
  },
    noTransition
  } = props;
  if(noTransition){
    let Component = routeComponentFn(routeKey) || ReactNative.View;
    let componentProps = routePropsFn(routeKey);
    return React.createElement(Component,componentProps);
  }
  return React.createElement(RouterImpl,props);
}

var MODULE = {
  "useTransition":useTransition,
  "RouterImpl":RouterImpl,
  "Router":Router
};

export default MODULE