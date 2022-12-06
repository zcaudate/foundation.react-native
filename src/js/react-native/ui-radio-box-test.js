import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_radio_box from './ui-radio-box'

// js.react-native.ui-radio-box-test/RadioBoxSimpleDemo [24] 
function RadioBoxSimpleDemo(){
  let [first,setFirst] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-radio-box/RadioBoxSimple"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>RADIO\n    </ReactNative.Text>\n    <ui_radio_box.RadioBox\n      selected={first}\n      disabled={disabled}\n      highlighted={highlighted}\n      setSelected={setFirst}\n      size={30}\n      style={{\"flex\":1}}\n      theme={{\n        \"fgActive\":\"limegreen\",\n        \"fgNormal\":\"#666\",\n        \"bgActive\":\"green\",\n        \"bgNormal\":\"#444\"\n      }}\n      styleContainer={{\"flex\":1}}\n      addons={[\n        physical_addon.tagAll({\"style\":{\"paddingHorizontal\":20,\"height\":80,\"flex\":1}})\n      ]}\n      outlined={true}\n      outsideStyle={{\"borderWidth\":4}}>\n    </ui_radio_box.RadioBox>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>RADIO
        </ReactNative.Text>
        <ui_radio_box.RadioBox
          selected={first}
          disabled={disabled}
          highlighted={highlighted}
          setSelected={setFirst}
          size={30}
          style={{"flex":1}}
          theme={{
            "fgActive":"limegreen",
            "fgNormal":"#666",
            "bgActive":"green",
            "bgNormal":"#444"
          }}
          styleContainer={{"flex":1}}
          addons={[
            physical_addon.tagAll({"style":{"paddingHorizontal":20,"height":80,"flex":1}})
          ]}
          outlined={true}
          outsideStyle={{"borderWidth":4}}>
        </ui_radio_box.RadioBox>
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

// js.react-native.ui-radio-box-test/RadioBoxDemo [74] 
function RadioBoxDemo(){
  let [first,setFirst] = React.useState(true);
  let [second,setSecond] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState(true);
  let [errored,setErrored] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-radio-box/RadioBox"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>RADIO\n    </ReactNative.Text>\n    <ui_radio_box.RadioBox\n      theme={{\"fgActive\":\"limegreen\"}}\n      selected={first}\n      setSelected={setFirst}\n      style={{\"flex\":1}}\n      styleContainer={{\"flex\":1}}>\n    </ui_radio_box.RadioBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_radio_box.RadioBox\n      theme={{\n        \"fgActive\":\"black\",\n        \"fgNormal\":\"#333\",\n        \"bgNormal\":\"white\",\n        \"bgHovered\":\"#555\",\n        \"bgPressed\":\"black\"\n      }}\n      outerStyle={{\"borderWidth\":5,\"borderStyle\":\"solid\"}}\n      outlined={true}\n      selected={second}\n      setSelected={setSecond}>\n    </ui_radio_box.RadioBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_radio_box.RadioBox disabled={true} selected={true}></ui_radio_box.RadioBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_radio_box.RadioBox\n      highlighted={highlighted}\n      setSelected={setHighlighted}\n      selected={highlighted}>\n    </ui_radio_box.RadioBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_radio_box.RadioBox\n      highlighted={errored}\n      setSelected={setErrored}\n      selected={errored}\n      theme={{\"fgHighlighted\":\"white\",\"bgHighlighted\":\"red\"}}>\n    </ui_radio_box.RadioBox>\n  </n.Row>);\n(\n  <ReactNative.View style={{\"height\":10}}></ReactNative.View>);\n(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>RADIO\n    </ReactNative.Text>\n    <ui_radio_box.RadioBox\n      theme={{\"fgActive\":\"darkred\"}}\n      selected={first}\n      outlined={true}\n      setSelected={setFirst}\n      size={32}\n      sizeInner={18}>\n    </ui_radio_box.RadioBox>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ui_radio_box.RadioBox\n      theme={{\n        \"fgActive\":\"limegreen\",\n        \"fgNormal\":\"#888\",\n        \"bgNormal\":\"#aaa\",\n        \"bgPressed\":\"limegreen\",\n        \"bgHovered\":0.5,\n        \"fgHovered\":0\n      }}\n      selected={second}\n      outlined={true}\n      setSelected={setSecond}\n      size={32}\n      outerStyle={{\"borderWidth\":4,\"borderStyle\":\"solid\",\"borderRadius\":3}}\n      innerStyle={{\"borderRadius\":0}}\n      sizeInner={12}>\n    </ui_radio_box.RadioBox>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>RADIO
        </ReactNative.Text>
        <ui_radio_box.RadioBox
          theme={{"fgActive":"limegreen"}}
          selected={first}
          setSelected={setFirst}
          style={{"flex":1}}
          styleContainer={{"flex":1}}>
        </ui_radio_box.RadioBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_radio_box.RadioBox
          theme={{
            "fgActive":"black",
            "fgNormal":"#333",
            "bgNormal":"white",
            "bgHovered":"#555",
            "bgPressed":"black"
          }}
          outerStyle={{"borderWidth":5,"borderStyle":"solid"}}
          outlined={true}
          selected={second}
          setSelected={setSecond}>
        </ui_radio_box.RadioBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_radio_box.RadioBox disabled={true} selected={true}></ui_radio_box.RadioBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_radio_box.RadioBox
          highlighted={highlighted}
          setSelected={setHighlighted}
          selected={highlighted}>
        </ui_radio_box.RadioBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_radio_box.RadioBox
          highlighted={errored}
          setSelected={setErrored}
          selected={errored}
          theme={{"fgHighlighted":"white","bgHighlighted":"red"}}>
        </ui_radio_box.RadioBox>
      </n.Row>
      <ReactNative.View style={{"height":10}}></ReactNative.View>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>RADIO
        </ReactNative.Text>
        <ui_radio_box.RadioBox
          theme={{"fgActive":"darkred"}}
          selected={first}
          outlined={true}
          setSelected={setFirst}
          size={32}
          sizeInner={18}>
        </ui_radio_box.RadioBox>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ui_radio_box.RadioBox
          theme={{
            "fgActive":"limegreen",
            "fgNormal":"#888",
            "bgNormal":"#aaa",
            "bgPressed":"limegreen",
            "bgHovered":0.5,
            "fgHovered":0
          }}
          selected={second}
          outlined={true}
          setSelected={setSecond}
          size={32}
          outerStyle={{"borderWidth":4,"borderStyle":"solid","borderRadius":3}}
          innerStyle={{"borderRadius":0}}
          sizeInner={12}>
        </ui_radio_box.RadioBox>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "RadioBoxSimpleDemo":RadioBoxSimpleDemo,
  "RadioBoxDemo":RadioBoxDemo
};

export default MODULE