import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

// js.react-native.ui-frame/translationOffset [13] 
function translationOffset(location,visible,size){
  if(location == "left"){
    return {"translateX":(visible - 1) * size};
  }
  else if(location == "right"){
    return {"translateX":(1 - visible) * size};
  }
  else if(location == "top"){
    return {"translateY":(visible - 1) * size};
  }
  else if(location == "bottom"){
    return {"translateY":(1 - visible) * size};
  }
}

// js.react-native.ui-frame/FramePane [29] 
function FramePane({
  style,
  aspect = "width",
  size = 60,
  location,
  visible,
  fade,
  children,
  indicatorParams = {
  "default":{
    "type":"timing",
    "duration":200,
    "easing":ReactNative.Easing.linear
  }
}
}){
  let isMounted = r.useIsMounted();
  let [showing,vindicator] = a.useShowing(visible,indicatorParams,isMounted);
  return (
    <physical_base.Box
      chord={{visible}}
      indicators={{"visible":vindicator}}
      style={[
        {[aspect]:0},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      transformations={{
        "visible":function (visible){
              return {
                "style":{
                        "overflow":(visible < 0.95) ? "hidden" : "default",
                        [aspect]:visible * size
                      }
              };
            }
      }}
      inner={[
        {
            "component":ReactNative.View,
            "key":"pane",
            "style":{"flex":1},
            "children":(showing || visible) ? children : null,
            "transformations":{
                  "visible":function (visible){
                        return {
                          "style":{
                                  "opacity":fade ? visible : 1,
                                  "transform":[translationOffset(location,visible,size)]
                                }
                        };
                      }
                }
          }
      ]}>
    </physical_base.Box>);
}

// js.react-native.ui-frame/Frame [69] 
function Frame({
  topComponent,
  topProps,
  topVisible,
  topFade,
  topSize,
  topStyle,
  topIndicatorParams,
  bottomComponent,
  bottomProps,
  bottomVisible,
  bottomFade,
  bottomSize,
  bottomStyle,
  bottomIndicatorParams,
  leftComponent,
  leftProps,
  leftVisible,
  leftFade,
  leftSize,
  leftStyle,
  leftIndicatorParams,
  rightComponent,
  rightProps,
  rightVisible,
  rightFade,
  rightSize,
  rightStyle,
  rightIndicatorParams,
  children
}){
  return (
    <ReactNative.View style={{"flex":1}}>
      {topComponent ? (
        <FramePane
          aspect="height"
          fade={topFade}
          indicatorParams={topIndicatorParams}
          key={topSize}
          location="top"
          size={topSize}
          style={topStyle}
          visible={topVisible}>{React.createElement(topComponent,topProps)}
        </FramePane>) : null}
      <ReactNative.View style={{"flexDirection":"row-reverse","flex":1}}>
        {rightComponent ? (
          <FramePane
            aspect="width"
            fade={rightFade}
            indicatorParams={rightIndicatorParams}
            key={rightSize}
            location="right"
            size={rightSize}
            style={rightStyle}
            visible={rightVisible}>{React.createElement(rightComponent,rightProps)}
          </FramePane>) : null}
        <ReactNative.View style={{"flex":1}}>
          <ReactNative.View
            style={{
              "position":"absolute",
              "top":0,
              "bottom":0,
              "left":0,
              "right":0,
              "overflow":"auto"
            }}>{children}
          </ReactNative.View>
        </ReactNative.View>
        {leftComponent ? (
          <FramePane
            aspect="width"
            fade={leftFade}
            indicatorParams={leftIndicatorParams}
            key={leftSize}
            location="left"
            size={leftSize}
            style={leftStyle}
            visible={leftVisible}>{React.createElement(leftComponent,leftProps)}
          </FramePane>) : null}
      </ReactNative.View>
      {bottomComponent ? (
        <FramePane
          aspect="height"
          fade={bottomFade}
          indicatorParams={bottomIndicatorParams}
          key={bottomSize}
          location="bottom"
          size={bottomSize}
          style={bottomStyle}
          visible={bottomVisible}>{React.createElement(bottomComponent,bottomProps)}
        </FramePane>) : null}
    </ReactNative.View>);
}

var MODULE = {
  "translationOffset":translationOffset,
  "FramePane":FramePane,
  "Frame":Frame
};

export default MODULE