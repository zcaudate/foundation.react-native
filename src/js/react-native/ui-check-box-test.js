import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_check_box from './ui-check-box'

// js.react-native.ui-check-box-test/CheckBoxSimpleDemo [25] 
function CheckBoxSimpleDemo(){
  let [first,setFirst] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState(true);
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-check-box/CheckBoxSimple"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>CHECKBOX\n    </ReactNative.Text>\n    <ui_check_box.CheckBox\n      highlighted={highlighted}\n      disabled={disabled}\n      theme={{\n        \"fgActive\":\"limegreen\",\n        \"fgHovered\":0.9,\n        \"bgActive\":\"green\",\n        \"bgPressed\":\"palegreen\",\n        \"bgNormal\":\"black\"\n      }}\n      selected={first}\n      setSelected={setFirst}\n      outlined={true}\n      addons={[\n        physical_addon.tagAll({\"style\":{\"paddingHorizontal\":20,\"height\":80,\"flex\":1}})\n      ]}>\n    </ui_check_box.CheckBox>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>CHECKBOX
        </ReactNative.Text>
        <ui_check_box.CheckBox
          highlighted={highlighted}
          disabled={disabled}
          theme={{
            "fgActive":"limegreen",
            "fgHovered":0.9,
            "bgActive":"green",
            "bgPressed":"palegreen",
            "bgNormal":"black"
          }}
          selected={first}
          setSelected={setFirst}
          outlined={true}
          addons={[
            physical_addon.tagAll({"style":{"paddingHorizontal":20,"height":80,"flex":1}})
          ]}>
        </ui_check_box.CheckBox>
      </n.Row>
      <n.Row>
        <ReactNative.Button
          title="H"
          onPress={function (){
            return setHighlighted(!highlighted);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="D"
          onPress={function (){
            return setDisabled(!disabled);
          }}>
        </ReactNative.Button>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-check-box-test/CheckBoxDemo [74] 
function CheckBoxDemo(){
  let [first,setFirst] = React.useState(true);
  let [second,setSecond] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState(true);
  let [errored,setErrored] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-check-box/CheckBox"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>CHECKBOX\n    </ReactNative.Text>\n    <ui_check_box.CheckBox\n      theme={{\"fgSelected\":\"limegreen\"}}\n      selected={first}\n      setSelected={setFirst}\n      outlined={true}>\n    </ui_check_box.CheckBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_check_box.CheckBox\n      theme={{\n        \"fgSelected\":\"white\",\n        \"fgNormal\":\"white\",\n        \"bgNormal\":\"darkblue\",\n        \"bgHovered\":\"blue\",\n        \"bgPressed\":\"purple\"\n      }}\n      selected={second}\n      setSelected={setSecond}\n      outlined={true}>\n    </ui_check_box.CheckBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_check_box.CheckBox disabled={true} selected={false} outlined={true}></ui_check_box.CheckBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_check_box.CheckBox\n      highlighted={highlighted}\n      setSelected={setHighlighted}\n      selected={highlighted}\n      outlined={true}>\n    </ui_check_box.CheckBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_check_box.CheckBox\n      highlighted={errored}\n      setSelected={setErrored}\n      selected={errored}\n      theme={{\"fgHighlighted\":\"white\",\"bgHighlighted\":\"red\"}}\n      outlined={true}>\n    </ui_check_box.CheckBox>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>CHECKBOX
        </ReactNative.Text>
        <ui_check_box.CheckBox
          theme={{"fgSelected":"limegreen"}}
          selected={first}
          setSelected={setFirst}
          outlined={true}>
        </ui_check_box.CheckBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_check_box.CheckBox
          theme={{
            "fgSelected":"white",
            "fgNormal":"white",
            "bgNormal":"darkblue",
            "bgHovered":"blue",
            "bgPressed":"purple"
          }}
          selected={second}
          setSelected={setSecond}
          outlined={true}>
        </ui_check_box.CheckBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_check_box.CheckBox disabled={true} selected={false} outlined={true}></ui_check_box.CheckBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_check_box.CheckBox
          highlighted={highlighted}
          setSelected={setHighlighted}
          selected={highlighted}
          outlined={true}>
        </ui_check_box.CheckBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_check_box.CheckBox
          highlighted={errored}
          setSelected={setErrored}
          selected={errored}
          theme={{"fgHighlighted":"white","bgHighlighted":"red"}}
          outlined={true}>
        </ui_check_box.CheckBox>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "CheckBoxSimpleDemo":CheckBoxSimpleDemo,
  "CheckBoxDemo":CheckBoxDemo
};

export default MODULE