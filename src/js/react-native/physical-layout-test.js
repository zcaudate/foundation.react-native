import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import a from './animate'

import physical_base from './physical-base'

// js.react-native.physical-layout-test/GridDemo [25] 
function GridDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-layout/Grid"
      code={function (){
        return "(\n  <ReactNative.View\n    style={{\n      \"flexDirection\":\"row\",\n      \"flexWrap\":\"wrap\",\n      \"align_content\":\"space-between\"\n    }}>\n    {[1,2,3,4,5,6,7,8,9].map(function (i){\n      return (\n        <ReactNative.View\n          key={i}\n          style={{\n            \"flex\":1,\n            \"margin\":5,\n            \"height\":80,\n            \"backgroundColor\":\"blue\",\n            \"minWidth\":150,\n            \"maxWidth\":180\n          }}>\n        </ReactNative.View>);\n    })}\n    {[1,2,3,4,5,6].map(function (i){\n      return (\n        <ReactNative.View\n          key={i}\n          style={{\"flex\":1,\"marginHorizontal\":5,\"minWidth\":150,\"maxWidth\":180}}>\n        </ReactNative.View>);\n    })}\n  </ReactNative.View>);";
      }()}>
      <ReactNative.View
        style={{
          "flexDirection":"row",
          "flexWrap":"wrap",
          "align_content":"space-between"
        }}>
        {[1,2,3,4,5,6,7,8,9].map(function (i){
          return (
            <ReactNative.View
              key={i}
              style={{
                "flex":1,
                "margin":5,
                "height":80,
                "backgroundColor":"blue",
                "minWidth":150,
                "maxWidth":180
              }}>
            </ReactNative.View>);
        })}
        {[1,2,3,4,5,6].map(function (i){
          return (
            <ReactNative.View
              key={i}
              style={{"flex":1,"marginHorizontal":5,"minWidth":150,"maxWidth":180}}>
            </ReactNative.View>);
        })}
      </ReactNative.View>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-layout-test/FlexWrapDemo [61] 
function FlexWrapDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-layout/FlexWrap"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <physical_base.Tag indicator={ind}></physical_base.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <physical_base.Tag indicator={ind}></physical_base.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"GridDemo":GridDemo,"FlexWrapDemo":FlexWrapDemo};

export default MODULE