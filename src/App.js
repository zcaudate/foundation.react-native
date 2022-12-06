import * as Expo from 'expo'

import React from 'react'

import * as ReactNative from 'react-native'

import n from './js/react-native'

import client from './xt/lang/base-client'

import k from './xt/lang/base-lib'

import base_box from './xt/lang/event-box'

import ext_box from './js/react/ext-box'

import web_native from './web-native'

// component.web-native-index/__import__ [20] 
import RNIcon from 'react-native-vector-icons/Entypo'
Object.defineProperty((globalThis),"React",{"value":React,"writeable":true});
Object.defineProperty(
  (globalThis),
  "ReactNative",
  {"value":ReactNative,"writeable":true}
);
Object.defineProperty((globalThis),"RNIcon",{"value":RNIcon,"writeable":true});
Object.defineProperty((globalThis),"Expo",{"value":Expo,"writeable":true});

// component.web-native-index/Global [24] 
globalThis["component_web_native_index$$Global"] = base_box.make_box({"l0":"00a-native-text"});

// component.web-native-index/Screens [27] 
globalThis["component_web_native_index$$Screens"] = base_box.make_box({});

// component.web-native-index/__screen__ [30] 
base_box.set_data(
  globalThis["component_web_native_index$$Screens"],
  [],
  web_native.raw_controls()
);

// component.web-native-index/AppMain [37] 
function AppMain(){
  let [l0,setL0] = ext_box.useBox(globalThis["component_web_native_index$$Global"],["l0"]);
  let tree = ext_box.listenBox(globalThis["component_web_native_index$$Screens"],[]);
  return (
    <ReactNative.View
      style={{"position":"absolute","top":0,"bottom":0,"width":"100%"}}>
      <n.TreePane
        tree={tree}
        levels={[
          {
          "type":"list",
          "initial":l0,
          "setInitial":setL0,
          "listWidth":120,
          "displayFn":n.displayTarget
        }
        ]}>
      </n.TreePane>
    </ReactNative.View>);
}

// component.web-native-index/__main__ [56] 
base_box.set_data(
  globalThis["component_web_native_index$$Global"],
  ["Main"],
  AppMain
);

// component.web-native-index/clearScratch [60] 
function clearScratch(){
  base_box.del_data(globalThis["component_web_native_index$$Global"],["Scratch"]);
}

// component.web-native-index/App [64] 
function App(){
  let {Main} = ext_box.listenBox(globalThis["component_web_native_index$$Global"],[]);
  return (
    <Main></Main>);
}

var MODULE = Expo.registerRootComponent(App);

export default MODULE