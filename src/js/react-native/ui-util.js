import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

import k from '../../xt/lang/base-lib'

// js.react-native.ui-util/Page [20] 
function Page({
  style,
  styleContainer,
  styleBody,
  styleMenu,
  styleTitle,
  styleLeft,
  styleRight,
  headerComponent,
  headerProps,
  footerComponent,
  footerProps,
  titleComponent,
  titleProps,
  leftComponent,
  leftProps,
  rightComponent,
  rightProps,
  children
}){
  return (
    <ReactNative.View
      style={[
        {"flex":1},
        ...(Array.isArray(styleContainer) ? styleContainer : ((null == styleContainer) ? [] : [styleContainer]))
      ]}>
      {headerComponent ? React.createElement(headerComponent,headerProps) : null}
      <ReactNative.View
        style={[
          {"flex":1},
          ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
        ]}>
        <n.Row style={styleMenu}>
          <ReactNative.View
            style={[
              {"flex":1},
              ...(Array.isArray(styleLeft) ? styleLeft : ((null == styleLeft) ? [] : [styleLeft]))
            ]}>
            {leftComponent ? React.createElement(leftComponent,leftProps) : null}
          </ReactNative.View>
          <ReactNative.View
            style={[
              {"flex":4},
              ...(Array.isArray(styleTitle) ? styleTitle : ((null == styleTitle) ? [] : [styleTitle]))
            ]}>
            {titleComponent ? React.createElement(titleComponent,titleProps) : null}
          </ReactNative.View>
          <ReactNative.View
            style={[
              {"flex":1},
              ...(Array.isArray(styleRight) ? styleRight : ((null == styleRight) ? [] : [styleRight]))
            ]}>
            {rightComponent ? React.createElement(rightComponent,rightProps) : null}
          </ReactNative.View>
        </n.Row>
        <ReactNative.View
          style={[
            {"flex":1},
            ...(Array.isArray(styleBody) ? styleBody : ((null == styleBody) ? [] : [styleBody]))
          ]}>{children}
        </ReactNative.View>
      </ReactNative.View>
      {footerComponent ? React.createElement(footerComponent,footerProps) : null}
    </ReactNative.View>);
}

// js.react-native.ui-util/Fade [79] 
function Fade({
  visible,
  children,
  indicatorParams = {
  "default":{
    "type":"timing",
    "duration":250,
    "easing":ReactNative.Easing.linear
  }
},
  ...rprops
}){
  let isMounted = r.useIsMounted();
  let [showing,vindicator] = a.useShowing(visible,indicatorParams,isMounted);
  return (
    <physical_base.Box
      chord={{visible}}
      indicators={{"visible":vindicator}}
      transformations={{
        "visible":function (visible){
              return {"style":{"opacity":visible}};
            }
      }}
      children={(showing || visible) ? children : null}
      {...rprops}>
    </physical_base.Box>);
}

// js.react-native.ui-util/useFoldContent [107] 
function useFoldContent({children,indicators,visible}){
  let contentRef = React.useRef();
  let layoutRef = React.useRef({"height":0,"width":0});
  let vindicator = indicators["visible"];
  React.useEffect(function (){
    let contentElem = k.get_in(contentRef,["current","children",0]) || k.get_in(contentRef,["current","_children",0]);
    n.measure(contentElem).then(function (layout){
      layoutRef.current = layout;
    }).then(function (){
      setTimeout(function (){
        new Promise(function (){
          let curr = vindicator._value;
          if(curr == 1){
            vindicator.setValue(1);
          }
        });
      },100);
    });
  },[visible,children]);
  return {contentRef,layoutRef};
}

// js.react-native.ui-util/FoldInner [137] 
function FoldInner({style,visible,chord,indicators,fade,children,aspect = "height"}){
  let {contentRef,layoutRef} = useFoldContent({children,indicators,visible});
  return (
    <physical_base.Box
      chord={chord}
      indicators={indicators}
      style={[
        {[aspect]:0,"overflow":"hidden"},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      transformations={{
        "visible":function (visible){
              return {
                "style":{
                        "opacity":fade ? visible : 1,
                        [aspect]:visible * layoutRef.current[aspect]
                      }
              };
            }
      }}
      children={[
        (
            <ReactNative.View key="content" ref={contentRef}>{children}</ReactNative.View>)
      ]}>
    </physical_base.Box>);
}

// js.react-native.ui-util/FoldImpl [170] 
function FoldImpl({
  visible,
  chord,
  onComplete,
  indicators,
  indicatorParams = {
  "default":{
    "type":"timing",
    "duration":200,
    "easing":ReactNative.Easing.linear
  }
},
  ...rprops
}){
  let isMounted = r.useIsMounted();
  let [showing,vindicator] = a.useShowing(visible,indicatorParams,isMounted,onComplete);
  return showing ? (
    <FoldInner
      chord={Object.assign({"visible":visible},chord)}
      indicators={Object.assign({"visible":vindicator},indicators)}
      visible={visible}
      {...rprops}>
    </FoldInner>) : null;
}

// js.react-native.ui-util/Fold [195] 
function Fold(props){
  let {children,noTransition,visible} = props;
  if(noTransition){
    if(visible){
      return children;
    }
    else{
      return (
        <ReactNative.View></ReactNative.View>);
    }
  }
  return React.createElement(FoldImpl,props);
}

var MODULE = {
  "Page":Page,
  "Fade":Fade,
  "useFoldContent":useFoldContent,
  "FoldInner":FoldInner,
  "FoldImpl":FoldImpl,
  "Fold":Fold
};

export default MODULE