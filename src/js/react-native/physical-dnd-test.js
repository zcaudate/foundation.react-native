import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

import physical_edit from './physical-edit'

// js.react-native.physical-dnd-test/DragAndDropDemo [26] 
function DragAndDropDemo(){
  let axis = "horizontal";
  let position = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let size = 40;
  let [dragging,setDragging] = React.useState();
  let idragging = a.useBinaryIndicator(dragging,{});
  let responder = physical_edit.createPan({
    "pan":{"dx":position},
    "onPressIn":function (){
        setDragging(true);
      },
    "onPressOut":function (){
        setDragging(false);
        ReactNative.Animated.spring(position,{"toValue":0,"useNativeDriver":false}).start();
      }
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-dnd/DragAndDropDemo"
      code={function (){
        return "(\n  <n.Row>\n    <physical_base.HoverableTarget\n      indicators={{\"dragging\":idragging}}\n      style={[\n        {\n        \"justifyContent\":\"center\",\n        \"alignItems\":\"center\",\n        \"height\":50,\n        \"backgroundColor\":\"blue\",\n        \"flex\":1\n      }\n      ]}\n      transformations={function (m){\n        return {\n          \"style\":{\n              \"backgroundColor\":((m.dragging > 0.5) && (m.hovering > 0.5)) ? [\"yellow\",\"blue\"] : null\n            }\n        };\n      }}>\n    </physical_base.HoverableTarget>\n    <physical_base.Box\n      indicators={{\"dragging\":idragging,\"position\":position}}\n      style={[\n        {\n        \"justifyContent\":\"center\",\n        \"alignItems\":\"center\",\n        \"height\":50,\n        \"flex\":1\n      }\n      ]}\n      inner={[\n        {\n        \"component\":ReactNative.View,\n        \"inner\":[\n          Object.assign({\n          \"component\":ReactNative.View,\n          \"style\":[\n            (axis == \"horizontal\") ? {\"left\":-(size / 2)} : {\"top\":-(size / 2)},\n            {\n            \"position\":\"absolute\",\n            \"cursor\":\"grab\",\n            \"height\":size,\n            \"width\":size,\n            \"borderRadius\":size / 2,\n            \"backgroundColor\":\"red\",\n            \"zIndex\":100\n          }\n          ],\n          \"transformations\":function (m){\n            return {\n              \"style\":{\n                  \"backgroundColor\":(m.dragging > 0.5) ? [\"black\",\"red\"] : null\n                }\n            };\n          }\n        },responder.panHandlers),\n          Object.assign({\n          \"component\":ReactNative.View,\n          \"style\":[\n            (axis == \"horizontal\") ? {\"left\":-(size / 2)} : {\"top\":-20},\n            {\n            \"position\":\"absolute\",\n            \"cursor\":\"grab\",\n            \"height\":size,\n            \"width\":size,\n            \"borderRadius\":size / 2,\n            \"backgroundColor\":\"grey\"\n          }\n          ],\n          \"transformations\":{\n            \"position\":function (v){\n              return {\n                \"style\":{\n                    \"transform\":[{[(axis == \"horizontal\") ? \"translateX\" : \"translateY\"]:v}]\n                  }\n              };\n            }\n          }\n        },responder.panHandlers)\n        ]\n      }\n      ]}>\n    </physical_base.Box>\n    <physical_base.Tag indicator={position}></physical_base.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <physical_base.HoverableTarget
          indicators={{"dragging":idragging}}
          style={[
            {
            "justifyContent":"center",
            "alignItems":"center",
            "height":50,
            "backgroundColor":"blue",
            "flex":1
          }
          ]}
          transformations={function (m){
            return {
              "style":{
                  "backgroundColor":((m.dragging > 0.5) && (m.hovering > 0.5)) ? ["yellow","blue"] : null
                }
            };
          }}>
        </physical_base.HoverableTarget>
        <physical_base.Box
          indicators={{"dragging":idragging,"position":position}}
          style={[
            {
            "justifyContent":"center",
            "alignItems":"center",
            "height":50,
            "flex":1
          }
          ]}
          inner={[
            {
            "component":ReactNative.View,
            "inner":[
              Object.assign({
              "component":ReactNative.View,
              "style":[
                (axis == "horizontal") ? {"left":-(size / 2)} : {"top":-(size / 2)},
                {
                "position":"absolute",
                "cursor":"grab",
                "height":size,
                "width":size,
                "borderRadius":size / 2,
                "backgroundColor":"red",
                "zIndex":100
              }
              ],
              "transformations":function (m){
                return {
                  "style":{
                      "backgroundColor":(m.dragging > 0.5) ? ["black","red"] : null
                    }
                };
              }
            },responder.panHandlers),
              Object.assign({
              "component":ReactNative.View,
              "style":[
                (axis == "horizontal") ? {"left":-(size / 2)} : {"top":-20},
                {
                "position":"absolute",
                "cursor":"grab",
                "height":size,
                "width":size,
                "borderRadius":size / 2,
                "backgroundColor":"grey"
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
            ]
          }
          ]}>
        </physical_base.Box>
        <physical_base.Tag indicator={position}></physical_base.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"DragAndDropDemo":DragAndDropDemo};

export default MODULE