import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import cl from '../cell'

import link_fn from '../cell/link-fn'

import base_internal from '../cell/base-internal'

import n from '../react-native'

import impl_common from '../cell/impl-common'

import cr from '../react/ext-cell'

import k from '../../xt/lang/base-lib'

// js.react-native.ext-cell-test/SimpleCellDemo [37] 
function SimpleCellDemo(){
  let cell = React.useCallback(impl_common.new_cell({
    "create_fn":function (listener){
        return base_internal.mock_init(listener,{});
      }
  }),[]);
  cr.listenCellOutput(["basic","ping"],["pending","disabled"],{},cell);
  let getCount = r.useGetCount();
  React.useEffect(function (){
    cl.add_model("basic",{
      "ping":{
            "handler":link_fn.ping,
            "defaultArgs":[],
            "defaultOutput":{"output":"NOT AVAILABLE"}
          }
    },cell);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ext-cell-test/SimpleCell"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"Print\"\n      onPress={function (){\n        return console.log(cell);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"Trigger\"\n      onPress={function (){\n        return cl.view_refresh([\"basic\",\"ping\"],cell);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Caption\n    text={JSON.stringify({\n      \"count\":getCount(),\n      \"data\":cl.get_val([\"basic\",\"ping\"],[],cell)\n    })}\n    style={{\"marginTop\":10}}>\n  </n.Caption>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="Print"
          onPress={function (){
            return console.log(cell);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="Trigger"
          onPress={function (){
            return cl.view_refresh(["basic","ping"],cell);
          }}>
        </ReactNative.Button>
      </n.Row>
      <n.Caption
        text={JSON.stringify({
          "count":getCount(),
          "data":cl.get_val(["basic","ping"],[],cell)
        })}
        style={{"marginTop":10}}>
      </n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ext-cell-test/SimpleCellViewsDemo [75] 
function SimpleCellViewsDemo(){
  let [l0,setL0] = React.useState("basic0");
  let [l1,setL1] = React.useState("ping1");
  let getCount = r.useGetCount();
  let cell = React.useCallback(impl_common.new_cell({
    "create_fn":function (listener){
        return base_internal.mock_init(listener,{});
      }
  }),[]);
  cr.listenCellOutput(["basic0","ping0"],["output"],{},cell);
  cr.listenCellOutput(["basic1","ping1"],["output"],{},cell);
  cr.listenCellOutput(["basic2","ping2"],["output"],{},cell);
  cr.listenCellOutput(["basic3","ping3"],["output"],{},cell);
  React.useEffect(function (){
    cl.add_model("basic0",{
      "ping0":{
            "handler":link_fn.ping,
            "defaultArgs":[],
            "defaultOutput":{"output":"NOT AVAILABLE0"}
          },
      "ping1":{
            "handler":link_fn.ping,
            "defaultArgs":[],
            "defaultOutput":{"output":"NOT AVAILABLE1"}
          }
    },cell);
    setTimeout(function (){
      new Promise(function (){
        cl.add_model("basic1",{
          "ping2":{
                    "handler":link_fn.ping,
                    "defaultArgs":[],
                    "defaultOutput":{"output":"NOT AVAILABLE2"}
                  },
          "ping3":{
                    "handler":link_fn.ping,
                    "defaultArgs":[],
                    "defaultOutput":{"output":"NOT AVAILABLE3"}
                  }
        },cell);
      });
    },100);
  },[]);
  r.useInterval(function (){
    setTimeout(function (){
      new Promise(function (){
        cl.view_refresh(["basic0","ping0"],cell);
      });
    },1000 + (1000 * Math.random()));
    setTimeout(function (){
      new Promise(function (){
        cl.view_refresh(["basic0","ping1"],cell);
      });
    },1000 + (1000 * Math.random()));
    setTimeout(function (){
      new Promise(function (){
        cl.view_refresh(["basic1","ping2"],cell);
      });
    },1000 + (1000 * Math.random()));
    setTimeout(function (){
      new Promise(function (){
        cl.view_refresh(["basic1","ping3"],cell);
      });
    },1000 + (1000 * Math.random()));
  },600);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ext-cell-test/SimpleCellViews"
      code={function (){
        return "(\n  <n.TreePane\n    tree={cell}\n    levels={[\n      {\n        \"type\":\"list\",\n        \"initial\":l0,\n        \"setInitial\":setL0,\n        \"listWidth\":100,\n        \"listFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          },\n        \"branchesFn\":function (cell){\n            return k.sort(cl.list_models(cell));\n          },\n        \"targetFn\":function (cell,model){\n            return cl.get_model(model,cell);\n          }\n      },\n      {\n        \"type\":\"tabs\",\n        \"initial\":l1,\n        \"setInitial\":setL1,\n        \"listWidth\":100,\n        \"listFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          },\n        \"branchesFn\":function (model,parents,cell){\n            if(parents[0] && cl.get_model(parents[0],cell)){\n              return cl.list_views(parents[0],cell);\n            }\n            return [];\n          },\n        \"targetFn\":function (model,modelKey,parents,cell){\n            return cl.get_val([\n              ...(Array.isArray(parents) ? parents : ((null == parents) ? [] : [parents])),\n              modelKey\n            ],[],cell);\n          }\n      }\n    ]}>\n  </n.TreePane>);\n(\n  <n.Caption\n    text={n.format_entry({\"count\":getCount(),\"data\":cl.cell_vals(cell),l1,l0})}\n    style={{\"marginTop\":10}}>\n  </n.Caption>);";
      }()}>
      <n.TreePane
        tree={cell}
        levels={[
          {
          "type":"list",
          "initial":l0,
          "setInitial":setL0,
          "listWidth":100,
          "listFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          },
          "branchesFn":function (cell){
            return k.sort(cl.list_models(cell));
          },
          "targetFn":function (cell,model){
            return cl.get_model(model,cell);
          }
        },
          {
          "type":"tabs",
          "initial":l1,
          "setInitial":setL1,
          "listWidth":100,
          "listFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          },
          "branchesFn":function (model,parents,cell){
            if(parents[0] && cl.get_model(parents[0],cell)){
              return cl.list_views(parents[0],cell);
            }
            return [];
          },
          "targetFn":function (model,modelKey,parents,cell){
            return cl.get_val([
              ...(Array.isArray(parents) ? parents : ((null == parents) ? [] : [parents])),
              modelKey
            ],[],cell);
          }
        }
        ]}>
      </n.TreePane>
      <n.Caption
        text={n.format_entry({"count":getCount(),"data":cl.cell_vals(cell),l1,l0})}
        style={{"marginTop":10}}>
      </n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ext-cell-test/ListenCurrentDemo [179] 
function ListenCurrentDemo(){
  let [initial,setInitial] = React.useState("a");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ext-cell-test/listen-current"
      code={function (){
        return "(\n  <n.TreePane tree={{}} levels={[]}></n.TreePane>);\n(\n  <n.Caption text={JSON.stringify({initial})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.TreePane tree={{}} levels={[]}></n.TreePane>
      <n.Caption text={JSON.stringify({initial})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "SimpleCellDemo":SimpleCellDemo,
  "SimpleCellViewsDemo":SimpleCellViewsDemo,
  "ListenCurrentDemo":ListenCurrentDemo
};

export default MODULE