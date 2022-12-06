import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import helper_transition from './helper-transition'

import r from '../react'

import n from '../react-native'

import k from '../../xt/lang/base-lib'

import model_context from './model-context'

// js.react-native.ui-modal/ModalBackdrop [22] 
function ModalBackdrop({children,chord,indicators,onClose,opacityBackdrop,permanent,styleBackdrop}){
  return (
    <ReactNative.View style={{"flex":1,"zIndex":-10}}>
      <ReactNative.TouchableWithoutFeedback
        style={{"flex":1}}
        onPress={function (e){
          if(!permanent){
            onClose();
          }
        }}>
        <ReactNative.View style={{"flex":1}}>
          <physical_base.Box
            indicators={indicators}
            chord={chord}
            style={[
              {"flex":1},
              ...(Array.isArray(styleBackdrop) ? styleBackdrop : ((null == styleBackdrop) ? [] : [styleBackdrop]))
            ]}
            transformations={{
              "visible":function (visible){
                return {"style":{"opacity":opacityBackdrop * visible}};
              }
            }}>
          </physical_base.Box>
          {children}
        </ReactNative.View>
      </ReactNative.TouchableWithoutFeedback>
    </ReactNative.View>);
}

// js.react-native.ui-modal/useMeasureContent [54] 
function useMeasureContent(children,visible,dimensions,setLayout){
  let contentRef = React.useRef();
  let getLayout = function (){
    if(contentRef.current){
      let contentElem = k.get_in(contentRef,["current","children",0]) || k.get_in(contentRef,["current","_children",0]);
      n.measure(contentElem,setLayout);
    }
  };
  React.useEffect(function (){
    getLayout();
  },[children,visible,dimensions]);
  return {contentRef,getLayout};
}

// js.react-native.ui-modal/ModalElementAbsolute [77] 
function ModalElementAbsolute({children,chord,dimensions,effect,indicators,margin,position,transition,visible}){
  let [layout,setLayout] = React.useState({"height":0,"width":0});
  let {height,width} = layout;
  let layoutRef = r.useFollowRef(layout);
  let absStyle = model_context.innerCoordinate({height,margin,position,width,"parent":dimensions});
  let {contentRef,getLayout} = useMeasureContent(children,visible,dimensions,setLayout);
  return (
    <physical_base.Box
      style={Object.assign({"position":"absolute","opacity":0},absStyle)}
      onLayout={getLayout}
      transformations={{
        "visible":function (visible){
              return helper_transition.absoluteAnimateProgress({
                transition,
                position,
                margin,
                effect,
                "height":layoutRef.current.height,
                "width":layoutRef.current.width
              },visible);
            }
      }}
      indicators={indicators}
      chord={chord}>
      <ReactNative.View ref={contentRef}>{children}</ReactNative.View>
    </physical_base.Box>);
}

// js.react-native.ui-modal/ModalElementHost [125] 
function ModalElementHost({children,chord,dimensions,effect,hostRef,indicators,margin,position,transition,visible}){
  let [layout,setLayout] = React.useState({"height":0,"width":0,"px":0,"py":0});
  let [hostLayout,setHostLayout] = React.useState({"height":0,"width":0,"px":0,"py":0});
  console.log(
    " js.react-native.ui-modal/ModalElementHost",
    146,
    "\n\n",
    layout,
    hostLayout
  );
  let layoutRef = r.useFollowRef(layout);
  let hostLayoutRef = r.useFollowRef(hostLayout);
  let contentRef = useMeasureContent(children,visible,dimensions,setLayout);
  let absStyle = model_context.innerCoordinate(Object.assign({margin,position,"parent":dimensions},layout));
  let absStyleRef = r.useFollowRef(absStyle);
  React.useEffect(function (){
    if(hostRef.current){
      n.measureRef(hostRef,setHostLayout);
    }
  },[layout]);
  return (
    <physical_base.Box
      style={Object.assign({"position":"absolute"},absStyle)}
      transformations={{
        "visible":function (progress,{visible}){
              return helper_transition.relativeAnimateProgress({
                transition,
                position,
                margin,
                effect,
                "xOffset":hostLayoutRef.current.px - absStyleRef.current.left,
                "yOffset":hostLayoutRef.current.py - absStyleRef.current.top,
                "height":layoutRef.current.height,
                "width":layoutRef.current.width
              },progress);
            }
      }}
      indicators={indicators}
      chord={chord}>
      <ReactNative.View ref={contentRef}>{children}</ReactNative.View>
    </physical_base.Box>);
}

// js.react-native.ui-modal/Modal [186] 
function Modal({
  visible,
  position = "centered",
  margin = 20,
  transition,
  hostRef,
  effect,
  onClose,
  permanent,
  styleBackdrop,
  opacityBackdrop = 0.85,
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
  if(!showing){
    return (
      <ReactNative.View></ReactNative.View>);
  }
  let indicators = {"visible":vindicator};
  let chord = {visible};
  return (
    <ReactNative.Modal visible={showing} transparent={true} onRequestClose={onClose}>
      {hostRef ? (
        <ModalElementHost
          effect={effect}
          visible={visible}
          margin={margin}
          children={children}
          transition={transition}
          chord={chord}
          indicators={indicators}
          hostRef={hostRef}
          dimensions={dimensions}
          position={position}>
        </ModalElementHost>) : (
        <ModalElementAbsolute
          effect={effect}
          visible={visible}
          margin={margin}
          children={children}
          transition={transition}
          chord={chord}
          indicators={indicators}
          dimensions={dimensions}
          position={position}>
        </ModalElementAbsolute>)}
      <ModalBackdrop
        styleBackdrop={styleBackdrop}
        opacityBackdrop={opacityBackdrop}
        onClose={onClose}
        chord={chord}
        indicators={indicators}
        permanent={permanent}>
      </ModalBackdrop>
    </ReactNative.Modal>);
}

var MODULE = {
  "ModalBackdrop":ModalBackdrop,
  "useMeasureContent":useMeasureContent,
  "ModalElementAbsolute":ModalElementAbsolute,
  "ModalElementHost":ModalElementHost,
  "Modal":Modal
};

export default MODULE