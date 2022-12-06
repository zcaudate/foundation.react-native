import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import helper_theme from './helper-theme'

import helper_roller from './helper-roller'

import n from '../react-native'

import physical_edit from './physical-edit'

import k from '../../xt/lang/base-lib'

import helper_theme_default from './helper-theme-default'

// js.react-native.ui-picker/pickerTheme [18] 
function pickerTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-picker/usePickerPosition [35] 
function usePickerPosition(index,setIndex,indexRef){
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let prevRef = React.useRef(index);
  React.useEffect(function (){
    position.addListener(function (){
      let {_value} = position;
      let nIndex = indexRef.current + Math.round(_value / 10);
      if(nIndex != prevRef.current){
        setIndex(nIndex);
        prevRef.current = nIndex;
      }
    });
  },[]);
  return position;
}

// js.react-native.ui-picker/PickerValues [52] 
function PickerValues({
  theme,
  themePipeline,
  disabled,
  index,
  setIndex,
  style,
  styleText,
  chord,
  format = k.identity,
  divisions = 4,
  items = [],
  ...rprops
}){
  let [styleStatic] = pickerTheme({theme,themePipeline,...rprops});
  let indexRef = React.useRef(index);
  let position = usePickerPosition(index,setIndex,indexRef);
  let {labels,labelsLu,modelFn,offset} = helper_roller.useRoller({divisions,index,items});
  return (
    <physical_base.Box
      indicators={{"position":position}}
      chord={Object.assign({"index":index},chord)}
      style={[
        {"overflow":"hidden","width":120,"padding":5,"height":30},
        styleStatic,
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}>
      {k.arr_range(divisions).map(function (index,i){
        return (
          <physical_base.Text
            key={i}
            indicators={{"offset":offset,"value":labels[index]}}
            style={[
              {
                  "position":"absolute",
                  "padding":0,
                  "fontSize":18,
                  "fontWeight":"400"
                },
              ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
            ]}
            transformations={function ({offset,value}){
              let v = offset - index;
              let {scale,translate,visible} = modelFn(v);
              return {
                "text":format(items[value],value),
                "style":{
                        "opacity":visible ? k.mix(-2,1,scale) : 0,
                        "zIndex":10 * scale,
                        "transform":[{"translateY":-2 * translate}]
                      }
              };
            }}>
          </physical_base.Text>);
      })}
    </physical_base.Box>);
}

// js.react-native.ui-picker/PickerIndexed [112] 
function PickerIndexed({
  theme,
  themePipeline,
  disabled,
  index,
  setIndex,
  style,
  styleText,
  chord,
  onHoverIn,
  onHoverOut,
  format = k.identity,
  divisions = 4,
  items = [],
  ...rprops
}){
  let [styleStatic,transformFn] = pickerTheme({theme,themePipeline,...rprops});
  let indexRef = React.useRef(index);
  let position = usePickerPosition(index,setIndex,indexRef);
  let {labels,labelsLu,modelFn,offset} = helper_roller.useRoller({divisions,index,items});
  let {panHandlers,touchable} = physical_edit.usePanTouchable(
    {disabled,"chord":Object.assign({index},chord),...rprops},
    "vertical",
    position,
    false
  );
  let {hovering,pressing,setHovering,setPressing} = touchable;
  React.useEffect(function (){
    indexRef.current = index;
  },[pressing]);
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
      style={[
        {"overflow":"hidden","width":120,"padding":5,"height":30},
        styleStatic,
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      transformations={transformFn}
      {...Object.assign(touchable,panHandlers)}>
      {k.arr_range(divisions).map(function (index,i){
        return (
          <physical_base.Text
            key={i}
            indicators={{"offset":offset,"value":labels[index]}}
            style={[
              {
                  "position":"absolute",
                  "padding":0,
                  "fontSize":18,
                  "fontWeight":"400"
                },
              ReactNative.Platform.select({"web":{"cursor":"ns-resize","userSelect":"none"}}),
              ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
            ]}
            transformations={function ({offset,value}){
              let v = offset - index;
              let {scale,translate,visible} = modelFn(v);
              return {
                "text":format(items[value],value),
                "style":{
                        "opacity":visible ? k.mix(-2,1,scale) : 0,
                        "zIndex":10 * scale,
                        "transform":[{"translateY":-2 * translate}]
                      }
              };
            }}>
          </physical_base.Text>);
      })}
    </physical_base.Box>);
}

var MODULE = {
  "pickerTheme":pickerTheme,
  "usePickerPosition":usePickerPosition,
  "PickerValues":PickerValues,
  "PickerIndexed":PickerIndexed
};

export default MODULE