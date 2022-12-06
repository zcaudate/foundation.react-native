import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import ext_view from '../react/ext-view'

import event_view from '../../xt/lang/event-view'

import k from '../../xt/lang/base-lib'

// js.react-native.ext-view-test/ListenViewPane [24] 
function ListenViewPane({type,view}){
  let output = ext_view.listenView(view,type,{});
  let getCount = r.useGetCount();
  return (
    <n.TextDisplay
      content={n.format_entry({
        "type":type,
        "result":output,
        "count":getCount(),
        "view":k.obj_pick(view,["input","output"])
      })}>
    </n.TextDisplay>);
}

// js.react-native.ext-view-test/ListenViewDemo [37] 
function ListenViewDemo(){
  let view = ext_view.makeView({
    "handler":function (x,y,z){
        return new Promise(function (resolve,reject){
          setTimeout(function (){
            try{
              resolve(          (function (){
                          return x + y + z;
                        })());
            }
            catch(e){
              reject(e);
            }
          },500);
        });
      },
    "defaultArgs":[1,2,3],
    "options":{"init":false}
  });
  let [type,setType] = React.useState("success");
  React.useEffect(function (){
    ext_view.refresh_view(view);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react.ext-view/listenView"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"R\"\n      onPress={function (){\n        return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        event_view.set_input(view,{});\n        ext_view.refresh_view(view);\n      }}>\n    </ReactNative.Button>\n    <n.Tabs\n      data={[\"input\",\"output\",\"pending\",\"elapsed\",\"disabled\",\"success\"]}\n      value={type}\n      setValue={setType}>\n    </n.Tabs>\n  </n.Row>);\n(\n  <ListenViewPane key={type} view={view} type={type}></ListenViewPane>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="R"
          onPress={function (){
            return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="D"
          onPress={function (){
            event_view.set_input(view,{});
            ext_view.refresh_view(view);
          }}>
        </ReactNative.Button>
        <n.Tabs
          data={["input","output","pending","elapsed","disabled","success"]}
          value={type}
          setValue={setType}>
        </n.Tabs>
      </n.Row>
      <ListenViewPane key={type} view={view} type={type}></ListenViewPane>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ext-view-test/ListenViewOutputPane [77] 
function ListenViewOutputPane({types,view}){
  let output = ext_view.listenViewOutput(view,types,{});
  let getCount = r.useGetCount();
  return (
    <n.TextDisplay
      content={n.format_entry({
        "types":types,
        "result":output,
        "count":getCount(),
        "view":k.obj_pick(view,["input","output"])
      })}>
    </n.TextDisplay>);
}

// js.react-native.ext-view-test/ListenViewOutputDemo [91] 
function ListenViewOutputDemo(){
  let view = ext_view.makeView({
    "handler":function (x,y,z){
        return new Promise(function (resolve,reject){
          setTimeout(function (){
            try{
              resolve(          (function (){
                          return x + y + z;
                        })());
            }
            catch(e){
              reject(e);
            }
          },500);
        });
      },
    "defaultArgs":[1,2,3],
    "options":{"init":false}
  });
  let [types,setTypes] = React.useState(["pending","disabled"]);
  React.useEffect(function (){
    ext_view.refresh_view(view);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react.ext-view/listenViewOutput"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"R\"\n      onPress={function (){\n        return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        event_view.set_input(view,{});\n        ext_view.refresh_view(view);\n      }}>\n    </ReactNative.Button>\n    <n.TabsMulti\n      data={[\"input\",\"output\",\"pending\",\"elapsed\",\"disabled\"]}\n      values={types}\n      setValues={setTypes}>\n    </n.TabsMulti>\n  </n.Row>);\n(\n  <ListenViewOutputPane key={types} view={view} types={types}></ListenViewOutputPane>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="R"
          onPress={function (){
            return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="D"
          onPress={function (){
            event_view.set_input(view,{});
            ext_view.refresh_view(view);
          }}>
        </ReactNative.Button>
        <n.TabsMulti
          data={["input","output","pending","elapsed","disabled"]}
          values={types}
          setValues={setTypes}>
        </n.TabsMulti>
      </n.Row>
      <ListenViewOutputPane key={types} view={view} types={types}></ListenViewOutputPane>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ext-view-test/ListenViewOutputMultiPane [131] 
function ListenViewOutputMultiPane({types,view}){
  let remoteOutput = ext_view.listenViewOutput(view,types,{},"remote");
  let mainOutput = ext_view.listenViewOutput(view,types,{});
  let syncOutput = ext_view.listenViewOutput(view,types,{},"sync");
  let getCount = r.useGetCount();
  return (
    <n.TextDisplay
      content={n.format_entry({
        "types":types,
        "result":{"main":mainOutput,"remote":remoteOutput,"sync":syncOutput},
        "count":getCount(),
        "view":k.obj_pick(view,["input","output","sync","remote"])
      })}>
    </n.TextDisplay>);
}

// js.react-native.ext-view-test/ListenViewOutputMultiDemo [151] 
function ListenViewOutputMultiDemo(){
  let view = ext_view.makeView({
    "handler":function (x,y,z){
        return new Promise(function (resolve,reject){
          setTimeout(function (){
            try{
              resolve(          (function (){
                          return x + y + z;
                        })());
            }
            catch(e){
              reject(e);
            }
          },500);
        });
      },
    "pipeline":{
        "sync":{
            "handler":function (x,y,z){
                return new Promise(function (resolve,reject){
                  setTimeout(function (){
                    try{
                      resolve(          (function (){
                                  return x + y + z;
                                })());
                    }
                    catch(e){
                      reject(e);
                    }
                  },500);
                });
              }
          },
        "remote":{
            "handler":function (x,y,z){
                return new Promise(function (resolve,reject){
                  setTimeout(function (){
                    try{
                      resolve(          (function (){
                                  return x + y + z;
                                })());
                    }
                    catch(e){
                      reject(e);
                    }
                  },500);
                });
              }
          }
      },
    "defaultArgs":[1,2,3],
    "options":{"init":false}
  });
  let [types,setTypes] = React.useState(["pending","disabled"]);
  React.useEffect(function (){
    ext_view.refresh_view(view);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react.ext-view/listenViewOutput.SYNC"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"M\"\n      onPress={function (){\n        return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"R\"\n      onPress={function (){\n        return ext_view.refresh_args_remote(view,[Math.random(),Math.random(),Math.random()],true);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"S\"\n      onPress={function (){\n        return ext_view.refresh_args_sync(view,[Math.random(),Math.random(),Math.random()],true);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        event_view.set_input(view,{});\n        ext_view.refresh_view(view);\n      }}>\n    </ReactNative.Button>\n    <n.TabsMulti\n      data={[\"input\",\"output\",\"pending\",\"elapsed\",\"disabled\"]}\n      values={types}\n      setValues={setTypes}>\n    </n.TabsMulti>\n  </n.Row>);\n(\n  <ListenViewOutputMultiPane key={types} view={view} types={types}></ListenViewOutputMultiPane>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="M"
          onPress={function (){
            return ext_view.refresh_args(view,[Math.random(),Math.random(),Math.random()]);
          }}>
        </ReactNative.Button>
        <ReactNative.Button
          title="R"
          onPress={function (){
            return ext_view.refresh_args_remote(view,[Math.random(),Math.random(),Math.random()],true);
          }}>
        </ReactNative.Button>
        <ReactNative.Button
          title="S"
          onPress={function (){
            return ext_view.refresh_args_sync(view,[Math.random(),Math.random(),Math.random()],true);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="D"
          onPress={function (){
            event_view.set_input(view,{});
            ext_view.refresh_view(view);
          }}>
        </ReactNative.Button>
        <n.TabsMulti
          data={["input","output","pending","elapsed","disabled"]}
          values={types}
          setValues={setTypes}>
        </n.TabsMulti>
      </n.Row>
      <ListenViewOutputMultiPane key={types} view={view} types={types}></ListenViewOutputMultiPane>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "ListenViewPane":ListenViewPane,
  "ListenViewDemo":ListenViewDemo,
  "ListenViewOutputPane":ListenViewOutputPane,
  "ListenViewOutputDemo":ListenViewOutputDemo,
  "ListenViewOutputMultiPane":ListenViewOutputMultiPane,
  "ListenViewOutputMultiDemo":ListenViewOutputMultiDemo
};

export default MODULE