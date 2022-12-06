import React from 'react'

import * as ReactNative from 'react-native'

import c from './helper-color'

import n from '../react-native'

import a from './animate'

import ui from './physical-base'

// js.react-native.physical-base-test/TagDemo [24] 
function TagDemo(){
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
      label="js.react-native.physical-base/Tag"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ui.Tag indicator={ind}></ui.Tag>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ui.Tag indicator={ind}></ui.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-base-test/BoxDemo [56] 
function BoxDemo(){
  let [val0,setVal0] = React.useState(true);
  let ind0 = a.useBinaryIndicator(val0,{
    "default":{
        "type":"timing",
        "duration":500,
        "easing":ReactNative.Easing.linear
      }
  });
  let [val1,setVal1] = React.useState();
  let ind1 = a.useBinaryIndicator(val1,{
    "default":{
        "type":"timing",
        "duration":500,
        "easing":ReactNative.Easing.linear
      }
  });
  let [val2,setVal2] = React.useState(true);
  let ind2 = a.useBinaryIndicator(val2,{
    "default":{
        "type":"timing",
        "duration":500,
        "easing":ReactNative.Easing.linear
      }
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-base/Box"
      code={function (){
        return "(\n  <n.Row>\n    <n.Row style={{\"flex\":1}}>\n      <ReactNative.Button\n        title=\"Ind0\"\n        onPress={function (){\n          setVal0(!val0);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n      <ui.Tag indicator={ind0}></ui.Tag>\n    </n.Row>\n    <n.Row style={{\"flex\":1}}>\n      <ReactNative.Button\n        title=\"Ind1\"\n        onPress={function (){\n          setVal1(!val1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n      <ui.Tag indicator={ind1}></ui.Tag>\n    </n.Row>\n    <n.Row style={{\"flex\":1}}>\n      <ReactNative.Button\n        title=\"Ind2\"\n        onPress={function (){\n          setVal2(!val2);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n      <ui.Tag indicator={ind2}></ui.Tag>\n    </n.Row>\n  </n.Row>);\n(\n  <ui.Box\n    style={{\"height\":200,\"backgroundColor\":\"hsl(12,100.00%,47.51%)\"}}\n    indicators={{ind0,ind1,ind2}}\n    transformations={{\n      \"ind0\":function (v){\n          return {\"style\":{\"backgroundColor\":c.mix([\"red\",\"green\"],v)}};\n        }\n    }}\n    inner={[\n      {\n        \"component\":ReactNative.View,\n        \"style\":{\"height\":20,\"width\":20},\n        \"transformations\":{\n            \"ind0\":function (v){\n                return {\"style\":{\"backgroundColor\":c.mix([\"green\",\"red\"],v)}};\n              }\n          }\n      },\n      {\n        \"component\":ReactNative.View,\n        \"style\":{\"margin\":20,\"height\":20,\"width\":20},\n        \"transformations\":{\n            \"ind1\":function (v){\n                return {\n                  \"style\":{\n                        \"transform\":[{\"scale\":1 + v}],\n                        \"backgroundColor\":c.mix([\"blue\",\"yellow\"],v)\n                      }\n                };\n              }\n          }\n      },\n      {\n        \"component\":ReactNative.View,\n        \"style\":{\"margin\":40,\"height\":20,\"width\":20},\n        \"transformations\":{\n            \"ind2\":function (v){\n                return {\n                  \"style\":{\n                        \"transform\":[{\"scale\":1 + v}],\n                        \"backgroundColor\":c.mix([\"orange\",\"purple\"],v)\n                      }\n                };\n              }\n          }\n      }\n    ]}>\n  </ui.Box>);";
      }()}>
      <n.Row>
        <n.Row style={{"flex":1}}>
          <ReactNative.Button
            title="Ind0"
            onPress={function (){
              setVal0(!val0);
            }}>
          </ReactNative.Button>
          <ReactNative.View style={{"width":10}}></ReactNative.View>
          <ui.Tag indicator={ind0}></ui.Tag>
        </n.Row>
        <n.Row style={{"flex":1}}>
          <ReactNative.Button
            title="Ind1"
            onPress={function (){
              setVal1(!val1);
            }}>
          </ReactNative.Button>
          <ReactNative.View style={{"width":10}}></ReactNative.View>
          <ui.Tag indicator={ind1}></ui.Tag>
        </n.Row>
        <n.Row style={{"flex":1}}>
          <ReactNative.Button
            title="Ind2"
            onPress={function (){
              setVal2(!val2);
            }}>
          </ReactNative.Button>
          <ReactNative.View style={{"width":10}}></ReactNative.View>
          <ui.Tag indicator={ind2}></ui.Tag>
        </n.Row>
      </n.Row>
      <ui.Box
        style={{"height":200,"backgroundColor":"hsl(12,100.00%,47.51%)"}}
        indicators={{ind0,ind1,ind2}}
        transformations={{
          "ind0":function (v){
            return {"style":{"backgroundColor":c.mix(["red","green"],v)}};
          }
        }}
        inner={[
          {
          "component":ReactNative.View,
          "style":{"height":20,"width":20},
          "transformations":{
            "ind0":function (v){
              return {"style":{"backgroundColor":c.mix(["green","red"],v)}};
            }
          }
        },
          {
          "component":ReactNative.View,
          "style":{"margin":20,"height":20,"width":20},
          "transformations":{
            "ind1":function (v){
              return {
                "style":{
                    "transform":[{"scale":1 + v}],
                    "backgroundColor":c.mix(["blue","yellow"],v)
                  }
              };
            }
          }
        },
          {
          "component":ReactNative.View,
          "style":{"margin":40,"height":20,"width":20},
          "transformations":{
            "ind2":function (v){
              return {
                "style":{
                    "transform":[{"scale":1 + v}],
                    "backgroundColor":c.mix(["orange","purple"],v)
                  }
              };
            }
          }
        }
        ]}>
      </ui.Box>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-base-test/TextDemo [147] 
function TextDemo(){
  let [val0,setVal0] = React.useState(true);
  let ind0 = a.useBinaryIndicator(val0,{
    "default":{
        "type":"timing",
        "duration":500,
        "easing":ReactNative.Easing.linear
      }
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-base/Text"
      code={function (){
        return "(\n  <n.Row style={{\"height\":50}}>\n    <ui.Text\n      indicators={{\"ind0\":ind0}}\n      value=\"HELLO\"\n      transformations={{\n        \"ind0\":function (v){\n          return {\"style\":{\"fontSize\":20 + (20 * v)}};\n        }\n      }}>\n    </ui.Text>\n  </n.Row>);\n(\n  <n.Row style={{\"flex\":1}}>\n    <ReactNative.Button\n      title=\"Ind0\"\n      onPress={function (){\n        setVal0(!val0);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui.Tag indicator={ind0}></ui.Tag>\n  </n.Row>);";
      }()}>
      <n.Row style={{"height":50}}>
        <ui.Text
          indicators={{"ind0":ind0}}
          value="HELLO"
          transformations={{
            "ind0":function (v){
              return {"style":{"fontSize":20 + (20 * v)}};
            }
          }}>
        </ui.Text>
      </n.Row>
      <n.Row style={{"flex":1}}>
        <ReactNative.Button
          title="Ind0"
          onPress={function (){
            setVal0(!val0);
          }}>
        </ReactNative.Button>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui.Tag indicator={ind0}></ui.Tag>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-base-test/TouchableBasePressingDemo [237] 
function TouchableBasePressingDemo(){
  let [active,setActive] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-base/TouchableBasePressing"
      code={function (){
        return "(\n  <ui.TouchableBasePressing\n    style={{\"justifyContent\":\"center\",\"alignItems\":\"center\",\"width\":100}}\n    inner={[\n      {\n        \"component\":ReactNative.Text,\n        \"children\":[\"HELLO\"],\n        \"style\":{\"backgroundColor\":\"blue\",\"color\":\"white\",\"padding\":10},\n        \"transformations\":function ({hovering,pressing}){\n            return {\n              \"style\":{\n                    \"opacity\":1 - (pressing * 0.4),\n                    \"borderRadius\":Math.floor(pressing * 10),\n                    \"transform\":[\n                          {\"translateX\":pressing * 140},\n                          {\"scale\":1 + (Math.max(pressing,hovering) * 0.4)}\n                        ]\n                  }\n            };\n          }\n      }\n    ]}\n    addons={[\n      {\n        \"component\":ReactNative.TextInput,\n        \"size\":11,\n        \"editable\":false,\n        \"multiline\":true,\n        \"style\":{\"backgroundColor\":\"#eee\",\"marginTop\":10,\"height\":110},\n        \"transformations\":function (data,chord){\n            return {\"text\":n.format_obj({chord,data})};\n          }\n      }\n    ]}>\n  </ui.TouchableBasePressing>);";
      }()}>
      <ui.TouchableBasePressing
        style={{"justifyContent":"center","alignItems":"center","width":100}}
        inner={[
          {
          "component":ReactNative.Text,
          "children":["HELLO"],
          "style":{"backgroundColor":"blue","color":"white","padding":10},
          "transformations":function ({hovering,pressing}){
            return {
              "style":{
                  "opacity":1 - (pressing * 0.4),
                  "borderRadius":Math.floor(pressing * 10),
                  "transform":[
                      {"translateX":pressing * 140},
                      {"scale":1 + (Math.max(pressing,hovering) * 0.4)}
                    ]
                }
            };
          }
        }
        ]}
        addons={[
          {
          "component":ReactNative.TextInput,
          "size":11,
          "editable":false,
          "multiline":true,
          "style":{"backgroundColor":"#eee","marginTop":10,"height":110},
          "transformations":function (data,chord){
            return {"text":n.format_obj({chord,data})};
          }
        }
        ]}>
      </ui.TouchableBasePressing>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-base-test/TouchableBinaryDemo [275] 
function TouchableBinaryDemo(){
  let [active,setActive] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-base/TouchableBinary"
      code={function (){
        return "(\n  <ui.TouchableBinary\n    style={{\"justifyContent\":\"center\",\"alignItems\":\"center\",\"width\":100}}\n    active={active}\n    onPress={function (){\n      setActive(!active);\n    }}\n    inner={[\n      {\n        \"component\":ReactNative.Text,\n        \"style\":{\"color\":\"white\",\"width\":80,\"padding\":10},\n        \"children\":[\"PRESS\"],\n        \"transformations\":function ({active,hovering,pressing}){\n            let transform = [\n              {\n                  \"scale\":1 + (Math.max(pressing,hovering) * 0.1) + (pressing * 0.3)\n                }\n            ];\n            let backgroundColor = \"rgb(\" + (100 * (1 - active)) + \",\" + (100 * active) + \", 0)\";\n            if(active < 0.5){\n              return {\n                \"style\":{\n                        \"opacity\":1 - (0.3 * active),\n                        \"backgroundColor\":backgroundColor,\n                        \"transform\":transform\n                      }\n              };\n            }\n            else{\n              return {\n                \"style\":{\n                        \"opacity\":0.7 + (0.3 * active),\n                        \"backgroundColor\":backgroundColor,\n                        \"transform\":transform\n                      }\n              };\n            }\n          }\n      }\n    ]}\n    addons={[\n      {\n        \"component\":ReactNative.TextInput,\n        \"size\":11,\n        \"editable\":false,\n        \"multiline\":true,\n        \"style\":{\"backgroundColor\":\"#eee\",\"marginTop\":10,\"height\":130},\n        \"transformations\":function (data,chord){\n            return {\"text\":n.format_obj({chord,data})};\n          }\n      }\n    ]}>\n  </ui.TouchableBinary>);";
      }()}>
      <ui.TouchableBinary
        style={{"justifyContent":"center","alignItems":"center","width":100}}
        active={active}
        onPress={function (){
          setActive(!active);
        }}
        inner={[
          {
          "component":ReactNative.Text,
          "style":{"color":"white","width":80,"padding":10},
          "children":["PRESS"],
          "transformations":function ({active,hovering,pressing}){
            let transform = [
              {
                "scale":1 + (Math.max(pressing,hovering) * 0.1) + (pressing * 0.3)
              }
            ];
            let backgroundColor = "rgb(" + (100 * (1 - active)) + "," + (100 * active) + ", 0)";
            if(active < 0.5){
              return {
                "style":{
                      "opacity":1 - (0.3 * active),
                      "backgroundColor":backgroundColor,
                      "transform":transform
                    }
              };
            }
            else{
              return {
                "style":{
                      "opacity":0.7 + (0.3 * active),
                      "backgroundColor":backgroundColor,
                      "transform":transform
                    }
              };
            }
          }
        }
        ]}
        addons={[
          {
          "component":ReactNative.TextInput,
          "size":11,
          "editable":false,
          "multiline":true,
          "style":{"backgroundColor":"#eee","marginTop":10,"height":130},
          "transformations":function (data,chord){
            return {"text":n.format_obj({chord,data})};
          }
        }
        ]}>
      </ui.TouchableBinary>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-base-test/TouchableInputDemo [329] 
function TouchableInputDemo(){
  let [active,setActive] = React.useState(true);
  let [value,setValue] = React.useState("");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-base/TouchableInput"
      code={function (){
        return "(\n  <ui.TouchableInput\n    style={{\n      \"justifyContent\":\"center\",\n      \"alignItems\":\"center\",\n      \"backgroundColor\":\"black\",\n      \"color\":\"white\",\n      \"height\":60,\n      \"width\":200\n    }}\n    value={value}\n    onChangeText={setValue}\n    styleContainer={{\"width\":200}}\n    onPress={function (){\n      setActive(!active);\n    }}\n    indicatorParams={{\"focusing\":{\"type\":\"timing\",\"default\":{\"duration\":300}}}}\n    addons={[\n      {\n        \"component\":ReactNative.TextInput,\n        \"size\":11,\n        \"editable\":false,\n        \"multiline\":true,\n        \"style\":{\"backgroundColor\":\"#eee\",\"marginTop\":10,\"height\":120},\n        \"transformations\":function (data,chord){\n            return {\"text\":n.format_obj({chord,data})};\n          }\n      }\n    ]}>\n  </ui.TouchableInput>);";
      }()}>
      <ui.TouchableInput
        style={{
          "justifyContent":"center",
          "alignItems":"center",
          "backgroundColor":"black",
          "color":"white",
          "height":60,
          "width":200
        }}
        value={value}
        onChangeText={setValue}
        styleContainer={{"width":200}}
        onPress={function (){
          setActive(!active);
        }}
        indicatorParams={{"focusing":{"type":"timing","default":{"duration":300}}}}
        addons={[
          {
          "component":ReactNative.TextInput,
          "size":11,
          "editable":false,
          "multiline":true,
          "style":{"backgroundColor":"#eee","marginTop":10,"height":120},
          "transformations":function (data,chord){
            return {"text":n.format_obj({chord,data})};
          }
        }
        ]}>
      </ui.TouchableInput>
    </n.EnclosedCodeContainer>);
}

var MODULE = // 05ec8c03-bc6b-4dab-8e65-d96aca6da12b
{
  "TagDemo":TagDemo,
  "BoxDemo":BoxDemo,
  "TextDemo":TextDemo,
  "TouchableBasePressingDemo":TouchableBasePressingDemo,
  "TouchableBinaryDemo":TouchableBinaryDemo,
  "TouchableInputDemo":TouchableInputDemo
};;

export default MODULE