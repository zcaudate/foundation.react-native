import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import helper_theme from './helper-theme'

import physical_edit from './physical-edit'

import k from '../../xt/lang/base-lib'

import helper_theme_default from './helper-theme-default'

// js.react-native.ui-range/rangeTheme [17] 
function rangeTheme({theme,themePipeline,...rprops},forwardFn,side,layout,length){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let [fgStyleStatic,fgTransformFn] = helper_theme.prepThemeSingle({
    "theme":__theme,
    "themePipeline":__themePipeline,
    "transformations":{
      "fg":function (m){
        let {position = 0,lower = 0,upper = 0} = m;
        let limit = (side == "lower") ? Math.max(0,Math.min(position,upper)) : Math.min(length,Math.max(position,lower));
        return {
          "style":{
              "transform":[
                  (layout == "horizontal") ? {"translateX":limit} : {"translateY":limit}
                ]
            }
        };
      }
    },
    ...rprops
  },"fg",["backgroundColor"]);
  return {fgStyleStatic,fgTransformFn};
}

// js.react-native.ui-range/useKnob [53] 
function useKnob({
  theme,
  themePipeline,
  disabled,
  highlighted,
  outlined,
  indicators,
  chord,
  onChord,
  indicatorParams,
  onIndicators,
  position,
  forwardFn,
  value,
  layout,
  length = 0,
  side
}){
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
  let {pressing} = touchable;
  let {fgStyleStatic,fgTransformFn} = rangeTheme({theme,themePipeline},forwardFn,side,layout,length);
  React.useEffect(function (){
    if(!pressing){
      position.setValue(forwardFn(value));
    }
  },[value]);
  return Object.assign(touchable,{fgStyleStatic,fgTransformFn,panHandlers});
}

// js.react-native.ui-range/Range [103] 
function Range({
  disabled,
  highlighted,
  outlined,
  chord,
  onChord,
  indicators,
  indicatorParams = {},
  onIndicators,
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
  length,
  lower,
  setLower,
  upper,
  setUpper,
  size = 15,
  layout = "horizontal",
  ...rprops
}){
  let {forwardFn,positionLower,positionUpper,reverseFn} = a.useRange({length,lower,max,min,setLower,setUpper,step,upper});
  let touchableLower = useKnob({
    theme,
    themePipeline,
    transformations,
    disabled,
    highlighted,
    outlined,
    indicators,
    chord,
    onChord,
    indicatorParams,
    onIndicators,
    forwardFn,
    length,
    "side":"lower",
    "value":lower,
    "position":positionLower,
    layout
  });
  let touchableUpper = useKnob({
    theme,
    themePipeline,
    transformations,
    disabled,
    highlighted,
    outlined,
    indicators,
    chord,
    onChord,
    indicatorParams,
    onIndicators,
    forwardFn,
    length,
    "side":"upper",
    "value":upper,
    "position":positionUpper,
    layout
  });
  return (
    <physical_base.Box
      chord={{"lower":touchableLower.chord,"upper":touchableUpper.chord}}
      inner={[
        Object.assign({
            "component":ReactNative.View,
            "key":"axis",
            "style":[
                  (layout == "horizontal") ? {"height":size,"width":length + (2 * size)} : {"height":length + (2 * size),"width":size},
                  {"borderRadius":3},
                  ...(Array.isArray(axisStyle) ? axisStyle : ((null == axisStyle) ? [] : [axisStyle]))
                ]
          },axisProps),
        Object.assign({
            "component":ReactNative.View,
            "key":"knobLower",
            "style":[
                  (layout == "horizontal") ? {"top":-(0.5 * size),"height":2 * size,"width":2 * size} : {"left":-(0.5 * size),"height":2 * size,"width":2 * size},
                  {"position":"absolute","borderRadius":3},
                  ReactNative.Platform.select({
                      "web":(layout == "horizontal") ? {"cursor":"ew-resize"} : {"cursor":"ns-resize"}
                    }),
                  touchableLower.fgStyleStatic,
                  ...(Array.isArray(knobStyle) ? knobStyle : ((null == knobStyle) ? [] : [knobStyle]))
                ],
            "transformations":touchableLower.fgTransformFn
          },touchableLower.panHandlers,    (function (){
                let {indicators,chord,...rprops} = touchableLower;
                return Object.assign(rprops,{
                  "indicators":Object.assign(indicators,{"upper":touchableUpper.indicators.position})
                });
              })(),knobProps),
        Object.assign({
            "component":ReactNative.View,
            "key":"knobUpper",
            "style":[
                  (layout == "horizontal") ? {"top":-(0.5 * size),"height":2 * size,"width":2 * size} : {"left":-(0.5 * size),"height":2 * size,"width":2 * size},
                  {"position":"absolute","borderRadius":3},
                  ReactNative.Platform.select({
                      "web":(layout == "horizontal") ? {"cursor":"ew-resize"} : {"cursor":"ns-resize"}
                    }),
                  touchableUpper.fgStyleStatic,
                  ...(Array.isArray(knobStyle) ? knobStyle : ((null == knobStyle) ? [] : [knobStyle]))
                ],
            "transformations":touchableUpper.fgTransformFn
          },touchableUpper.panHandlers,    (function (){
                let {indicators,chord,...rprops} = touchableUpper;
                return Object.assign(rprops,{
                  "indicators":Object.assign(indicators,{"lower":touchableLower.indicators.position})
                });
              })(),knobProps),
        ...(Array.isArray(inner) ? inner : ((null == inner) ? [] : [inner]))
      ]}
      {...rprops}>
    </physical_base.Box>);
}

var MODULE = {"rangeTheme":rangeTheme,"useKnob":useKnob,"Range":Range};

export default MODULE