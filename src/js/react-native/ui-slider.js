import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import helper_theme from './helper-theme'

import physical_edit from './physical-edit'

import k from '../../xt/lang/base-lib'

import helper_theme_default from './helper-theme-default'

// js.react-native.ui-slider/sliderTheme [17] 
function sliderTheme({theme,themePipeline,transformations,...rprops},layout,length){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let {axis,knob} = transformations;
  let [bgStyleStatic,bgTransformFn] = helper_theme.prepThemeCombined({
    "theme":__theme,
    "themePipeline":__themePipeline,
    "transformations":axis || {},
    ...rprops
  });
  let [fgStyleStatic,fgTransformFn] = helper_theme.prepThemeSingle({
    "theme":__theme,
    "themePipeline":__themePipeline,
    "transformations":Object.assign({
      "fg":function ({position = 0}){
        return {
          "style":{
              "transform":[
                  (layout == "horizontal") ? {"translateX":Math.max(0,Math.min(length,position))} : {"translateY":Math.max(0,Math.min(length,position))}
                ]
            }
        };
      }
    },knob),
    ...rprops
  },"fg",["backgroundColor"]);
  return {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn};
}

// js.react-native.ui-slider/Slider [54] 
function Slider({
  disabled,
  highlighted,
  outlined,
  chord,
  onChord,
  indicators,
  onIndicators,
  indicatorParams = {},
  knobProps,
  knobStyle,
  axisProps,
  axisStyle,
  onHoverIn,
  onHoverOut,
  theme,
  themePipeline,
  transformations = {},
  inner,
  max,
  min,
  step,
  length = 0,
  value = 0,
  setValue,
  size = 15,
  layout = "horizontal",
  ...rprops
}){
  let {forwardFn,position,reverseFn} = a.usePosition(
    {length,max,min,setValue,step,value,"flip":layout == "vertical"}
  );
  let {panHandlers,touchable} = physical_edit.usePanTouchable({
    disabled,
    highlighted,
    outlined,
    "chord":Object.assign({value},chord),
    indicators,
    onChord,
    indicatorParams,
    onIndicators
  },layout,position,true);
  let {hovering,pressing,setHovering,setPressing} = touchable;
  let {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn} = sliderTheme({theme,themePipeline,transformations},layout,length);
  React.useEffect(function (){
    if(!pressing){
      position.setValue(forwardFn(value));
    }
  },[value]);
  return (
    <physical_base.Box
      indicators={touchable.indicators}
      chord={touchable.chord}
      onMouseEnter={function (e){
        setHovering(true);
        if(onHoverIn){
          onHoverIn(e);
        }
      }}
      onMouseLeave={function (e){
        setHovering(false);
        if(onHoverOut){
          onHoverOut(e);
        }
      }}
      onMouseUp={function (){
        setPressing(false);
      }}
      onMouseDown={function (e){
        e.preventDefault;
      }}
      inner={[
        Object.assign({
            "component":ReactNative.View,
            "key":"axis",
            "style":[
                  (layout == "horizontal") ? {"height":size,"width":length + (2 * size)} : {"height":length + (2 * size),"width":size},
                  {"borderRadius":3},
                  bgStyleStatic,
                  ...(Array.isArray(axisStyle) ? axisStyle : ((null == axisStyle) ? [] : [axisStyle]))
                ],
            "transformations":bgTransformFn
          },axisProps),
        Object.assign({
            "component":ReactNative.View,
            "key":"knob",
            "style":[
                  (layout == "horizontal") ? {"top":-(0.5 * size),"height":2 * size,"width":2 * size} : {"left":-(0.5 * size),"height":2 * size,"width":2 * size},
                  {"position":"absolute","borderRadius":3},
                  ReactNative.Platform.select({
                      "web":(layout == "horizontal") ? {"cursor":"ew-resize"} : {"cursor":"ns-resize"}
                    }),
                  fgStyleStatic,
                  ...(Array.isArray(knobStyle) ? knobStyle : ((null == knobStyle) ? [] : [knobStyle]))
                ],
            "transformations":fgTransformFn
          },panHandlers,knobProps),
        ...(Array.isArray(inner) ? inner : ((null == inner) ? [] : [inner]))
      ]}
      {...rprops}>
    </physical_base.Box>);
}

var MODULE = {"sliderTheme":sliderTheme,"Slider":Slider};

export default MODULE