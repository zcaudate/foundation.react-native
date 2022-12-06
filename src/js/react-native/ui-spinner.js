import React from 'react'

import * as ReactNative from 'react-native'

import RNIcon from 'react-native-vector-icons/Entypo'

import physical_base from './physical-base'

import a from './animate'

import helper_theme from './helper-theme'

import helper_roller from './helper-roller'

import n from '../react-native'

import physical_edit from './physical-edit'

import k from '../../xt/lang/base-lib'

import helper_theme_default from './helper-theme-default'

// js.react-native.ui-spinner/ITEMS [18] 
var ITEMS = ["0","1","2","3","4","5","6","7","8","9"];

// js.react-native.ui-spinner/styleDigit [21] 
var styleDigit = {
  "height":25,
  "width":10,
  "overflow":"hidden",
  "backgroundColor":"blue"
};

// js.react-native.ui-spinner/styleDigitText [27] 
var styleDigitText = {
  "height":25,
  "position":"absolute",
  "width":10,
  "fontSize":16,
  "fontWeight":"400",
  "backgroundColor":"red",
  "color":"#333"
};

// js.react-native.ui-spinner/spinnerTheme [36] 
function spinnerTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-spinner/SpinnerStatic [53] 
function SpinnerStatic({text,styleText,style,editable}){
  return (
    <ReactNative.View
      style={[
        styleDigit,
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}>
      <ReactNative.Text
        style={[
          styleDigitText,
          ReactNative.Platform.select({
          "web":{
            "userSelect":"none",
            "cursor":editable ? "ns-resize" : "default"
          }
        }),
          ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
        ]}>{text}
      </ReactNative.Text>
    </ReactNative.View>);
}

// js.react-native.ui-spinner/SpinnerDigit [74] 
function SpinnerDigit({
  index,
  style,
  styleText,
  brand = {},
  items = ITEMS,
  divisions = 5,
  editable
}){
  let {labels,labelsLu,modelFn,offset} = helper_roller.useRoller({divisions,index,items});
  return (
    <ReactNative.View
      style={[
        styleDigit,
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}>
      {k.arr_range(divisions).map(function (index,i){
        return (
          <physical_base.Text
            key={i}
            indicators={{"offset":offset,"value":labels[index]}}
            style={[
              styleDigitText,
              ReactNative.Platform.select({
                  "web":{
                        "userSelect":"none",
                        "cursor":editable ? "ns-resize" : "default"
                      }
                }),
              ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
            ]}
            transformations={function ({offset,value}){
              let v = offset - index;
              let {scale,translate,visible} = modelFn(v);
              return {
                "text":items[value],
                "style":{
                        "opacity":visible ? k.mix(-2,1,scale) : 0,
                        "zIndex":10 * scale,
                        "transform":[{"translateY":-2 * translate}]
                      }
              };
            }}>
          </physical_base.Text>);
      })}
    </ReactNative.View>);
}

// js.react-native.ui-spinner/SpinnerValues [119] 
function SpinnerValues({
  max,
  min,
  onChange,
  value,
  editable,
  setValue,
  styleDigit,
  styleDigitText,
  styleDecimal,
  styleDecimalText,
  decimal = 0
}){
  let arrDigits = [];
  let arrTotal = Math.ceil(Math.log10(max + 1.0E-4));
  for(let i = 0; i < Math.max(arrTotal,1 + decimal); i = (i + 1)){
    if((i == decimal) && (0 < i)){
      arrDigits.unshift({"type":"decimal"});
    }
    arrDigits.unshift({"type":"digit","order":i});
  };
  let digitFn = function ({order,type},i){
    let limit = Math.pow(10,order);
    let hideDigit = (0 == decimal) ? (value < limit) : false;
    if(type == "digit"){
      return (
        <ReactNative.View key={"digit" + i} style={hideDigit ? {"opacity":0} : null}>
          <SpinnerDigit
            index={Math.floor(value / Math.round(Math.pow(10,order)))}
            style={styleDigit}
            styleText={styleDigitText}
            editable={editable}>
          </SpinnerDigit>
        </ReactNative.View>);
    }
    else if(type == "decimal"){
      return (
        <SpinnerStatic
          key={"decimal" + i}
          text="."
          style={[{"width":5},styleDecimal]}
          styleText={styleDecimalText}
          editable={editable}>
        </SpinnerStatic>);
    }
  };
  return (
    <>{arrDigits.map(digitFn)}</>);
}

// js.react-native.ui-spinner/useSpinnerPosition [174] 
function useSpinnerPosition(value,setValue,valueRef,min,max,stride){
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let prevRef = React.useRef(value);
  React.useEffect(function (){
    position.addListener(function (){
      let {_offset,_value} = position;
      let nValue = k.clamp(min,max,valueRef.current - Math.round(_value / (stride || 8)));
      if(nValue != prevRef.current){
        setValue(nValue);
        prevRef.current = nValue;
      }
    });
  },[]);
  return position;
}

// js.react-native.ui-spinner/Spinner [194] 
function Spinner({
  theme,
  themePipeline,
  disabled,
  min,
  max,
  panDirection,
  panStride,
  value,
  setValue,
  style,
  styleText,
  chord,
  onHoverIn,
  onHoverOut,
  ...rprops
}){
  let [__value,__setValue] = React.useState(value);
  let __valueRef = React.useRef(__value);
  let [styleStatic,transformFn] = spinnerTheme({theme,themePipeline,...rprops});
  let position = useSpinnerPosition(__value,__setValue,__valueRef,min,max,panStride);
  let {panHandlers,touchable} = physical_edit.usePanTouchable({
    disabled,
    "chord":Object.assign({"value":__value},chord),
    ...rprops
  },panDirection || "vertical",position,false);
  let {hovering,pressing,setHovering,setPressing} = touchable;
  React.useEffect(function (){
    __valueRef.current = __value;
  },[pressing]);
  React.useEffect(function (){
    if(!pressing){
      setValue(__value);
    }
  },[pressing,__value]);
  React.useEffect(function (){
    if(value != __value){
      __setValue(value);
    }
  },[value]);
  let iconElem = (
    <ReactNative.View
      style={{
        "zIndex":-10,
        "transform":[
              {
                  "rotateZ":(panDirection == "horizontal") ? "45deg" : "-45deg"
                }
            ]
      }}>
      <RNIcon
        name="resize-full-screen"
        style={[styleStatic,{"paddingLeft":5}]}
        size={15}>
      </RNIcon>
    </ReactNative.View>);
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
        {
            "overflow":"hidden",
            "flexDirection":"row",
            "alignItems":"center",
            "padding":5
          },
        styleStatic,
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      transformations={transformFn}
      children={[
        (
            <SpinnerValues
              key="values"
              editable={true}
              value={__value}
              setValue={__setValue}
              min={min}
              max={max}
              {...rprops}>
            </SpinnerValues>),
        iconElem,
        (
            <ReactNative.View
              key="background"
              style={{"position":"absolute","height":"100%","width":"100%"}}>
            </ReactNative.View>)
      ]}
      {...Object.assign(touchable,panHandlers)}>
    </physical_base.Box>);
}

var MODULE = {
  "ITEMS":ITEMS,
  "styleDigit":styleDigit,
  "styleDigitText":styleDigitText,
  "spinnerTheme":spinnerTheme,
  "SpinnerStatic":SpinnerStatic,
  "SpinnerDigit":SpinnerDigit,
  "SpinnerValues":SpinnerValues,
  "useSpinnerPosition":useSpinnerPosition,
  "Spinner":Spinner
};

export default MODULE