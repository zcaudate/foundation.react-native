import React from 'react'

import * as ReactNative from 'react-native'

import physical_base from './physical-base'

import a from './animate'

import r from '../react'

import helper_theme from './helper-theme'

import n from '../react-native'

import physical_edit from './physical-edit'

import helper_theme_default from './helper-theme-default'

// js.react-native.ui-swiper/swiperTransform [16] 
function swiperTransform({negEnabled,negFull,negThreshold,negThresholdInit,posEnabled,posFull,posThreshold,posThresholdInit}){
  return function ({position = 0}){
    if((!posEnabled && (0 < position)) || (!negEnabled && (0 > position)) || ((position < posThresholdInit) && (position > negThresholdInit))){
      return {"style":{"transform":[{"translateX":0}]}};
    }
    else{
      return {
        "style":{
                "transform":[{"translateX":Math.max(negFull,Math.min(position,posFull))}]
              }
      };
    }
  };
}

// js.react-native.ui-swiper/swiperTheme [41] 
function swiperTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-swiper/useSwiperPosition [58] 
function useSwiperPosition({direction,fixedRef,negEnabled,negFull,negThreshold,negThresholdInit,onClosed,onOpened,opened,posEnabled,posFull,posThreshold,posThresholdInit,setDirection,setOpened}){
  let directionRef = r.useFollowRef(direction);
  let openedRef = r.useFollowRef(opened);
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  React.useEffect(function (){
    position.addListener(function (){
      let {_value} = position;
      let _direction = "none";
      let _opened = false;
      if(_value < negThresholdInit){
        _direction = "negative";
      }
      else if(_value > posThresholdInit){
        _direction = "positive";
      }
      if((_value < negThreshold) && negEnabled){
        _opened = true;
        fixedRef.current = negFull;
      }
      else if((_value > posThreshold) && posEnabled){
        _opened = true;
        fixedRef.current = posFull;
      }
      else{
        fixedRef.current = 0;
      }
      if(openedRef.current != _opened){
        setOpened(_opened);
        openedRef.current = _opened;
      }
      if(directionRef.current != _direction){
        setDirection(_direction);
        directionRef.current = _direction;
      }
    });
  },[]);
  return position;
}

// js.react-native.ui-swiper/Swiper [111] 
function Swiper({
  theme,
  themePipeline,
  disabled,
  posView,
  posEnabled,
  posFull = 150,
  posThresholdInit = 10,
  posThreshold = 100,
  negView,
  negEnabled,
  negFull = -150,
  negThresholdInit = -10,
  negThreshold = -100,
  style,
  styleContainer,
  chord,
  onHoverIn,
  onHoverOut,
  addons,
  onOpened,
  onClosed,
  ...rprops
}){
  let [opened,setOpened] = React.useState();
  let [direction,setDirection] = React.useState("none");
  let fixedRef = React.useRef(0);
  let position = useSwiperPosition(
    {direction,fixedRef,negEnabled,negFull,negThreshold,negThresholdInit,onClosed,onOpened,opened,posEnabled,posFull,posThreshold,posThresholdInit,setDirection,setOpened}
  );
  let {panHandlers,touchable} = physical_edit.usePanTouchable({
    disabled,
    "chord":Object.assign({direction,opened},chord),
    "onPressOut":function (){
      let v = fixedRef.current;
      ReactNative.Animated.spring(
        position,
        {"toValue":v,"duration":300,"useNativeDriver":false}
      ).start(function (){
        if((v == 0) && onClosed){
          onClosed();
        }
        else if((v != 0) && onOpened){
          onOpened();
        }
      });
    },
    ...rprops
  },"horizontal",position,true);
  let [styleStatic,transformFn] = swiperTheme({
    theme,
    themePipeline,
    "transformations":{
      "bg":React.useCallback(swiperTransform(
        {negEnabled,negFull,negThreshold,negThresholdInit,posEnabled,posFull,posThreshold,posThresholdInit}
      ),[])
    },
    ...rprops
  },{negFull,negThreshold,negThresholdInit,posFull,posThreshold,posThresholdInit});
  let {hovering,pressing,setHovering,setPressing} = touchable;
  return (
    <ReactNative.View
      style={[
        ...(Array.isArray(styleContainer) ? styleContainer : ((null == styleContainer) ? [] : [styleContainer]))
      ]}>
      <physical_base.Box
        transformations={transformFn}
        chord={touchable.chord}
        indicators={touchable.indicators}
        onMouseEnter={function (e){
          setHovering(true);
          if(onHoverIn){
            onHoverIn(e);
          }
        }}
        style={[
          styleStatic,
          ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
        ]}
        addons={[
          {
          "component":ReactNative.View,
          "key":"neg",
          "style":{
            "position":"absolute",
            "overflow":"hidden",
            "right":0,
            "zIndex":-10,
            "height":(direction == "negative") ? "100%" : 0,
            "width":(direction == "negative") ? (-negFull) : 0
          },
          "children":[negView]
        },
          {
          "component":ReactNative.View,
          "key":"pos",
          "style":{
            "position":"absolute",
            "overflow":"hidden",
            "left":0,
            "zIndex":-10,
            "height":(direction == "positive") ? "100%" : 0,
            "width":(direction == "positive") ? posFull : 0
          },
          "children":[posView]
        },
          ...(Array.isArray(addons) ? addons : ((null == addons) ? [] : [addons]))
        ]}
        onMouseLeave={function (e){
          setHovering(false);
          if(onHoverOut){
            onHoverOut(e);
          }
        }}
        theme={theme}
        themePipeline={themePipeline}
        onMouseUp={function (){
          setPressing(false);
        }}
        {...Object.assign(touchable,panHandlers)}>
      </physical_base.Box>
    </ReactNative.View>);
}

var MODULE = {
  "swiperTransform":swiperTransform,
  "swiperTheme":swiperTheme,
  "useSwiperPosition":useSwiperPosition,
  "Swiper":Swiper
};

export default MODULE