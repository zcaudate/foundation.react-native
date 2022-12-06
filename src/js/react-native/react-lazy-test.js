import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import k from '../../xt/lang/base-lib'

const ui_button = new Proxy(import("./ui-button"),{
  "get":function (esm,key){
    return esm.then(function (m){
      return {"__esMODULE":true,"default":m.default[key]};
    });
  }
})

// js.react-native.react-lazy-test/LazyView [24] 
function LazyView(){
  return (
    <ReactNative.Text>LAZY VIEW LOADED</ReactNative.Text>);
}

// js.react-native.react-lazy-test/UseLazyDemo [31] 
function UseLazyDemo(){
  let LazyButton = r.useLazy(ui_button.Button);
  let refresh = r.useRefresh();
  let getCount = r.useGetCount();
  let module = new Proxy(new Promise(function (resolve,reject){
    setTimeout(function (){
      try{
        resolve(        (function (){
                  return {"__esMODULE":true,"default":{"lazyView":LazyView}};
                })());
      }
      catch(e){
        reject(e);
      }
    },100);
  }),{
    "get":function (esm,key){
        return esm.then(function (esm){
          return {"__esMODULE":true,"default":esm.default[key]};
        });
      }
  });
  let LazyComponent = React.lazy(function (){
    return new Promise(function (resolve,reject){
      try{
        resolve(        (function (){
                  return {"__esMODULE":true,"default":LazyView};
                })());
      }
      catch(e){
        reject(e);
      }
    });
  });
  React.useEffect(function (){
    new Promise(function (resolve,reject){
      setTimeout(function (){
        try{
          resolve(          (function (){
                      refresh();
                    })());
        }
        catch(e){
          reject(e);
        }
      },500);
    });
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react/useLazy"
      code={function (){
        return "(\n  <React.Suspense\n    fallback={(\n      <ReactNative.Text>LOADING</ReactNative.Text>)}>\n    <LazyComponent></LazyComponent>\n    <LazyButton text=\"HELLO\"></LazyButton>\n    {React.createElement(React.lazy(function (){\n      return module.lazyView;\n    }))}\n  </React.Suspense>);\n(\n  <n.TextDisplay count={getCount()}></n.TextDisplay>);";
      }()}>
      <React.Suspense
        fallback={(
          <ReactNative.Text>LOADING</ReactNative.Text>)}>
        <LazyComponent></LazyComponent>
        <LazyButton text="HELLO"></LazyButton>
        {React.createElement(React.lazy(function (){
          return module.lazyView;
        }))}
      </React.Suspense>
      <n.TextDisplay count={getCount()}></n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"LazyView":LazyView,"UseLazyDemo":UseLazyDemo};

export default MODULE