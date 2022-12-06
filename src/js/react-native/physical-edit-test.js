import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

import physical_edit from './physical-edit'

// js.react-native.physical-edit-test/CreatePanDemo [24] 
function CreatePanDemo(){
  let axis = "horizontal";
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let size = 40;
  let responder = physical_edit.createPan({
    "pan":{"dx":position},
    "onPressOut":function (){
        ReactNative.Animated.spring(position,{"toValue":0,"useNativeDriver":false}).start();
      }
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-edit/createPan"
      code={function (){
        return "(\n  <n.Row>\n    <physical_base.Box\n      indicators={{position}}\n      style={[\n        {\n        \"justifyContent\":\"center\",\n        \"alignItems\":\"center\",\n        \"height\":50,\n        \"flex\":1\n      }\n      ]}\n      inner={[\n        Object.assign({\n        \"component\":ReactNative.View,\n        \"style\":[\n          (axis == \"horizontal\") ? {\"left\":-(size / 2)} : {\"top\":-(size / 2)},\n          {\n          \"cursor\":\"grab\",\n          \"height\":size,\n          \"width\":size,\n          \"borderRadius\":size / 2,\n          \"backgroundColor\":\"red\"\n        }\n        ],\n        \"transformations\":{\n          \"position\":function (v){\n            return {\n              \"style\":{\n                  \"transform\":[{[(axis == \"horizontal\") ? \"translateX\" : \"translateY\"]:v}]\n                }\n            };\n          }\n        }\n      },responder.panHandlers)\n      ]}>\n    </physical_base.Box>\n    <physical_base.Tag indicator={position}></physical_base.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <physical_base.Box
          indicators={{position}}
          style={[
            {
            "justifyContent":"center",
            "alignItems":"center",
            "height":50,
            "flex":1
          }
          ]}
          inner={[
            Object.assign({
            "component":ReactNative.View,
            "style":[
              (axis == "horizontal") ? {"left":-(size / 2)} : {"top":-(size / 2)},
              {
              "cursor":"grab",
              "height":size,
              "width":size,
              "borderRadius":size / 2,
              "backgroundColor":"red"
            }
            ],
            "transformations":{
              "position":function (v){
                return {
                  "style":{
                      "transform":[{[(axis == "horizontal") ? "translateX" : "translateY"]:v}]
                    }
                };
              }
            }
          },responder.panHandlers)
          ]}>
        </physical_base.Box>
        <physical_base.Tag indicator={position}></physical_base.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-edit-test/CreatePanVelocityDemo [74] 
function CreatePanVelocityDemo(){
  let axis = "horizontal";
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let rotation = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let speed = React.useRef(0);
  let size = 40;
  let responder = physical_edit.createPan({
    "pan":{"dx":position},
    "onPressOut":function (){
        ReactNative.Animated.spring(position,{"toValue":0,"useNativeDriver":false}).start();
      }
  });
  React.useEffect(function (){
    let interval = setInterval(function (){
      if(0.1 < Math.abs(speed.current)){
        rotation.setValue(rotation._value + (0.1 * speed.current));
      }
    },20);
    position.addListener(function ({value}){
      speed.current = value;
    });
    return function (){
      clearInterval(interval);
    };
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-edit/createPanVelocity"
      code={function (){
        return "(\n  <n.Row>\n    <physical_base.Box\n      indicators={{rotation}}\n      style={{\n        \"height\":40,\n        \"width\":40,\n        \"borderBottom\":\"5px solid black\",\n        \"backgroundColor\":\"blue\"\n      }}\n      transformations={{\n        \"rotation\":function (v){\n          return {\"style\":{\"transform\":[{\"rotateZ\":v + \"deg\"}]}};\n        }\n      }}>\n    </physical_base.Box>\n    <physical_base.Box\n      indicators={{position}}\n      style={[\n        {\n        \"justifyContent\":\"center\",\n        \"alignItems\":\"center\",\n        \"height\":50,\n        \"flex\":1\n      }\n      ]}\n      inner={[\n        Object.assign({\n        \"component\":ReactNative.View,\n        \"style\":[\n          (axis == \"horizontal\") ? {\"left\":-(size / 2)} : {\"top\":-(size / 2)},\n          {\n          \"cursor\":\"grab\",\n          \"height\":size,\n          \"width\":size,\n          \"borderRadius\":size / 2,\n          \"backgroundColor\":\"red\"\n        }\n        ],\n        \"transformations\":{\n          \"position\":function (v){\n            return {\n              \"style\":{\n                  \"transform\":[{[(axis == \"horizontal\") ? \"translateX\" : \"translateY\"]:v}]\n                }\n            };\n          }\n        }\n      },responder.panHandlers)\n      ]}>\n    </physical_base.Box>\n    <physical_base.Tag indicator={position}></physical_base.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <physical_base.Box
          indicators={{rotation}}
          style={{
            "height":40,
            "width":40,
            "borderBottom":"5px solid black",
            "backgroundColor":"blue"
          }}
          transformations={{
            "rotation":function (v){
              return {"style":{"transform":[{"rotateZ":v + "deg"}]}};
            }
          }}>
        </physical_base.Box>
        <physical_base.Box
          indicators={{position}}
          style={[
            {
            "justifyContent":"center",
            "alignItems":"center",
            "height":50,
            "flex":1
          }
          ]}
          inner={[
            Object.assign({
            "component":ReactNative.View,
            "style":[
              (axis == "horizontal") ? {"left":-(size / 2)} : {"top":-(size / 2)},
              {
              "cursor":"grab",
              "height":size,
              "width":size,
              "borderRadius":size / 2,
              "backgroundColor":"red"
            }
            ],
            "transformations":{
              "position":function (v){
                return {
                  "style":{
                      "transform":[{[(axis == "horizontal") ? "translateX" : "translateY"]:v}]
                    }
                };
              }
            }
          },responder.panHandlers)
          ]}>
        </physical_base.Box>
        <physical_base.Tag indicator={position}></physical_base.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-edit-test/ProgressDemo [150] 
function ProgressDemo(){
  let position = React.useCallback(new ReactNative.Animated.Value(100),[]);
  let percentage = a.derive(function (p){
    return Math.max(0,Math.min(100,Math.floor(p / 2)));
  },[position]);
  let responder = React.useCallback(
    physical_edit.createPan({"pan":{"dx":position},"absolute":true}),
    []
  );
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-edit/ProgressDemo"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.View>\n      <physical_base.Box\n        indicators={{percentage,position}}\n        style={[{\"height\":20,\"backgroundColor\":\"blue\",\"width\":220}]}\n        addons={[]}\n        inner={[\n          Object.assign({\n          \"component\":ReactNative.View,\n          \"style\":[\n            {\"cursor\":\"grab\",\"height\":20,\"width\":20,\"backgroundColor\":\"red\"}\n          ],\n          \"transformations\":{\n            \"position\":function (v){\n              return {\n                \"style\":{\"transform\":[{\"translateX\":Math.max(0,Math.min(200,v))}]}\n              };\n            }\n          }\n        },responder.panHandlers),\n          {\n          \"component\":ReactNative.View,\n          \"style\":{\"alignItems\":\"end\"},\n          \"inner\":[\n            {\n            \"component\":ReactNative.View,\n            \"style\":[{\"height\":20,\"width\":20,\"backgroundColor\":\"green\"}],\n            \"transformations\":{\n              \"percentage\":function (v){\n                return {\"style\":{\"width\":2.2 * v}};\n              }\n            }\n          }\n          ]\n        }\n        ]}>\n      </physical_base.Box>\n    </ReactNative.View>\n    <n.Fill></n.Fill>\n    <physical_base.Tag indicator={percentage}></physical_base.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.View>
          <physical_base.Box
            indicators={{percentage,position}}
            style={[{"height":20,"backgroundColor":"blue","width":220}]}
            addons={[]}
            inner={[
              Object.assign({
              "component":ReactNative.View,
              "style":[
                {"cursor":"grab","height":20,"width":20,"backgroundColor":"red"}
              ],
              "transformations":{
                "position":function (v){
                  return {
                    "style":{"transform":[{"translateX":Math.max(0,Math.min(200,v))}]}
                  };
                }
              }
            },responder.panHandlers),
              {
              "component":ReactNative.View,
              "style":{"alignItems":"end"},
              "inner":[
                {
                "component":ReactNative.View,
                "style":[{"height":20,"width":20,"backgroundColor":"green"}],
                "transformations":{
                  "percentage":function (v){
                    return {"style":{"width":2.2 * v}};
                  }
                }
              }
              ]
            }
            ]}>
          </physical_base.Box>
        </ReactNative.View>
        <n.Fill></n.Fill>
        <physical_base.Tag indicator={percentage}></physical_base.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "CreatePanDemo":CreatePanDemo,
  "CreatePanVelocityDemo":CreatePanVelocityDemo,
  "ProgressDemo":ProgressDemo
};

export default MODULE