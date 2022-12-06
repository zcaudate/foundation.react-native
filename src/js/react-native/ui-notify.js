import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import helper_transition from './helper-transition'

import r from '../react'

import n from '../react-native'

import k from '../../xt/lang/base-lib'

import model_context from './model-context'

// js.react-native.ui-notify/NotifyInner [22] 
function NotifyInner({position,margin,indicators,chord,transition,children}){
  let dims = ReactNative.useWindowDimensions();
  let [layouts,setLayouts] = React.useState({});
  let {contentRef,getLayouts,setSinkRef,sinkRef} = n.usePortalLayouts(null,setLayouts);
  let transitionFn = helper_transition.absoluteAnimateFn(Object.assign({margin,position,transition},layouts.content));
  let transitionRef = r.useFollowRef(transitionFn);
  let absStyle = layouts.content ? model_context.innerCoordinate(
    Object.assign({margin,position,"parent":layouts.sink},layouts.content)
  ) : null;
  React.useEffect(function (){
    getLayouts();
  },[dims,children]);
  return (
    <n.Portal onSink={setSinkRef}>
      <ReactNative.View style={[{"position":"absolute"},absStyle]}>
        <physical_base.Box
          indicators={indicators}
          chord={chord}
          style={{"position":"absolute","opacity":0}}
          transformations={{
            "visible":React.useCallback(function (progress,chord){
              return transitionRef.current(progress,chord);
            },[])
          }}
          children={[
            (
            <ReactNative.View
              ref={contentRef}
              key="content"
              style={{"opacity":layouts.content ? 1 : 0}}>{children}
            </ReactNative.View>)
          ]}>
        </physical_base.Box>
      </ReactNative.View>
    </n.Portal>);
}

// js.react-native.ui-notify/Notify [77] 
function Notify({
  position = "centered",
  transition,
  transitionFn,
  margin,
  visible,
  children
}){
  let isMounted = r.useIsMounted();
  let dimensions = ReactNative.useWindowDimensions();
  let [showing,vindicator] = a.useShowing(visible,{
    "default":{
        "type":"timing",
        "duration":300,
        "easing":ReactNative.Easing.linear
      }
  },isMounted);
  return showing ? (
    <NotifyInner
      chord={{"visible":visible}}
      indicators={{"visible":vindicator}}
      margin={margin}
      transition={transition}
      position={position}>{children}
    </NotifyInner>) : null;
}

var MODULE = {"NotifyInner":NotifyInner,"Notify":Notify};

export default MODULE