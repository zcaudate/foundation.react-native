import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import a from './animate'

import k from '../../xt/lang/base-lib'

// js.react-native.ui-scrollview/ScrollViewImpl [19] 
function ScrollViewImpl({
  brand,
  children,
  isTransition,
  style,
  styleContainer,
  styleBackground,
  styleIndicator,
  ...rprops
}){
  let [contentHeight,setContentHeight] = React.useState(1);
  let [visibleHeight,setVisibleHeight] = React.useState(0);
  let showScroll = contentHeight > visibleHeight;
  let visibleRatio = visibleHeight / contentHeight;
  let visibleDiff = 1 - visibleRatio;
  let contentOffset = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let contentMargin = 1;
  let isMounted = r.useIsMounted();
  return (
    <ReactNative.View
      style={[
        {"flex":1,"flexDirection":"row-reverse"},
        ...(Array.isArray(styleContainer) ? styleContainer : ((null == styleContainer) ? [] : [styleContainer]))
      ]}>
      {!isTransition ? (
        <ReactNative.View
          style={[
            {
              "backgroundColor":"red",
              "flexDirection":"row-reverse",
              "height":"100%",
              "position":"absolute",
              "width":showScroll ? 7 : 0,
              "zIndex":10000
            },
            ...(Array.isArray(styleBackground) ? styleBackground : ((null == styleBackground) ? [] : [styleBackground]))
          ]}>
          {showScroll ? (
            <ReactNative.Animated.View
              key="indicator"
              style={[
                {
                  "backgroundColor":"blue",
                  "height":visibleRatio * visibleHeight,
                  "marginTop":2 * contentMargin,
                  "transform":[{"translateY":contentOffset}],
                  "width":6
                },
                ...(Array.isArray(styleIndicator) ? styleIndicator : ((null == styleIndicator) ? [] : [styleIndicator]))
              ]}>
            </ReactNative.Animated.View>) : null}
        </ReactNative.View>) : null}
      <ReactNative.ScrollView
        style={[
          {"flex":1},
          ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
        ]}
        onContentSizeChange={function (contentWidth,contentHeight){
          if(isMounted()){
            setContentHeight(contentHeight);
          }
        }}
        showsVerticalScrollIndicator={false}
        onLayout={function ({nativeEvent}){
          if(isMounted()){
            setVisibleHeight(nativeEvent.layout.height);
          }
        }}
        onScroll={function ({nativeEvent}){
          contentOffset.setValue(k.clamp(
            0,
            visibleDiff * visibleHeight,
            nativeEvent.contentOffset.y * visibleRatio
          ) - contentMargin);
        }}
        scrollEventThrottle={16}>{children}
      </ReactNative.ScrollView>
    </ReactNative.View>);
}

// js.react-native.ui-scrollview/ScrollView [89] 
function ScrollView({
  brand,
  children,
  style,
  styleContainer,
  styleBackground,
  styleIndicator,
  ...rprops
}){
  let {Consumer} = globalThis["js_react_native$$Global"];
  return (
    <Consumer>
      {function ({isTransition}){
        return (
          <ScrollViewImpl
            brand={brand}
            children={children}
            isTransition={isTransition}
            style={style}
            styleContainer={styleContainer}
            styleBackground={styleBackground}
            styleIndicator={styleIndicator}
            {...rprops}>
          </ScrollViewImpl>);
      }}
    </Consumer>);
}

var MODULE = {"ScrollViewImpl":ScrollViewImpl,"ScrollView":ScrollView};

export default MODULE