import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_toggle_switch from './ui-toggle-switch'

// js.react-native.ui-toggle-switch-test/ToggleSwitchSimpleDemo [24] 
function ToggleSwitchSimpleDemo(){
  let [first,setFirst] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-toggle-switch/ToggleSwitchSimple"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>SWITCH\n    </ReactNative.Text>\n    <ui_toggle_switch.ToggleSwitch\n      selected={first}\n      setSelected={setFirst}\n      highlighted={highlighted}\n      disabled={disabled}\n      theme={{\"bgActive\":\"gray\",\"fgActive\":\"green\",\"bgNormal\":\"gray\"}}\n      style={{\"flex\":1}}\n      styleContainer={{\"flex\":1}}\n      addons={[\n        physical_addon.tagAll({\"style\":{\"paddingHorizontal\":20,\"height\":80,\"flex\":1}})\n      ]}>\n    </ui_toggle_switch.ToggleSwitch>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Caption text={n.format_obj({first})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>SWITCH
        </ReactNative.Text>
        <ui_toggle_switch.ToggleSwitch
          selected={first}
          setSelected={setFirst}
          highlighted={highlighted}
          disabled={disabled}
          theme={{"bgActive":"gray","fgActive":"green","bgNormal":"gray"}}
          style={{"flex":1}}
          styleContainer={{"flex":1}}
          addons={[
            physical_addon.tagAll({"style":{"paddingHorizontal":20,"height":80,"flex":1}})
          ]}>
        </ui_toggle_switch.ToggleSwitch>
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
      <n.Caption text={n.format_obj({first})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-toggle-switch-test/ToggleSwitchSquareDemo [72] 
function ToggleSwitchSquareDemo(){
  let [first,setFirst] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-toggle-switch/ToggleSwitchSquare"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>SWITCH\n    </ReactNative.Text>\n    <ui_toggle_switch.ToggleSwitch\n      selected={first}\n      disabled={disabled}\n      transformations={{\n        \"knob\":{\n          \"fg\":function ({active}){\n            return {\n              \"style\":{\n                  \"transform\":[{\"translateX\":active * 40},{\"rotateZ\":(active * 90) + \"deg\"}]\n                }\n            };\n          }\n        }\n      }}\n      knobStyle={{\"borderRadius\":0}}\n      highlighted={highlighted}\n      setSelected={setFirst}\n      size={40}\n      style={{\"flex\":1}}\n      theme={{\n        \"bgActive\":\"gray\",\n        \"fgActive\":\"darkgreen\",\n        \"fgPressed\":\"black\",\n        \"fgNormal\":\"red\",\n        \"bgNormal\":\"gray\"\n      }}\n      styleContainer={{\"flex\":1}}\n      axisStyle={{\"borderRadius\":0}}\n      addons={[\n        physical_addon.tagAll({\"style\":{\"paddingHorizontal\":20,\"height\":80,\"flex\":1}})\n      ]}>\n    </ui_toggle_switch.ToggleSwitch>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Caption text={n.format_obj({first})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>SWITCH
        </ReactNative.Text>
        <ui_toggle_switch.ToggleSwitch
          selected={first}
          disabled={disabled}
          transformations={{
            "knob":{
              "fg":function ({active}){
                return {
                  "style":{
                      "transform":[{"translateX":active * 40},{"rotateZ":(active * 90) + "deg"}]
                    }
                };
              }
            }
          }}
          knobStyle={{"borderRadius":0}}
          highlighted={highlighted}
          setSelected={setFirst}
          size={40}
          style={{"flex":1}}
          theme={{
            "bgActive":"gray",
            "fgActive":"darkgreen",
            "fgPressed":"black",
            "fgNormal":"red",
            "bgNormal":"gray"
          }}
          styleContainer={{"flex":1}}
          axisStyle={{"borderRadius":0}}
          addons={[
            physical_addon.tagAll({"style":{"paddingHorizontal":20,"height":80,"flex":1}})
          ]}>
        </ui_toggle_switch.ToggleSwitch>
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
      <n.Caption text={n.format_obj({first})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-toggle-switch-test/SwitchBoxDemo [131] 
function SwitchBoxDemo(){
  let [first,setFirst] = React.useState(true);
  let [second,setSecond] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState(true);
  let [errored,setErrored] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-toggle-switch/ToggleSwitch"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>SWITCH\n    </ReactNative.Text>\n    <ui_toggle_switch.ToggleSwitch\n      selected={first}\n      setSelected={setFirst}\n      style={{\"flex\":1}}\n      styleContainer={{\"flex\":1}}>\n    </ui_toggle_switch.ToggleSwitch>\n    <ReactNative.View style={{\"width\":20}}></ReactNative.View>\n    <ui_toggle_switch.ToggleSwitch\n      selected={second}\n      setSelected={setSecond}\n      theme={{\"fgSelected\":\"black\"}}>\n    </ui_toggle_switch.ToggleSwitch>\n    <ReactNative.View style={{\"width\":20}}></ReactNative.View>\n    <ui_toggle_switch.ToggleSwitch\n      highlighted={highlighted}\n      setSelected={setHighlighted}\n      selected={highlighted}>\n    </ui_toggle_switch.ToggleSwitch>\n    <ReactNative.View style={{\"width\":20}}></ReactNative.View>\n    <ui_toggle_switch.ToggleSwitch\n      disabled={true}\n      highlighted={highlighted}\n      setSelected={setHighlighted}\n      selected={highlighted}>\n    </ui_toggle_switch.ToggleSwitch>\n  </n.Row>);\n(\n  <ReactNative.View style={{\"height\":20}}></ReactNative.View>);\n(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>SWITCH\n    </ReactNative.Text>\n    <ui_toggle_switch.ToggleSwitch\n      selected={first}\n      setSelected={setFirst}\n      theme={{\"fgSelected\":\"darkgreen\",\"fgNormal\":\"darkred\"}}\n      knobProps={{\n        \"children\":[\n          (\n          <ReactNative.Text style={{\"fontWeight\":\"800\",\"color\":\"white\"}}>{first ? \"ON\" : \"OFF\"}</ReactNative.Text>)\n        ]\n      }}\n      knobStyle={{\n        \"width\":40,\n        \"height\":40,\n        \"justifyContent\":\"center\",\n        \"alignItems\":\"center\"\n      }}\n      lineStyle={{\"height\":40,\"width\":64,\"marginVertical\":0}}>\n    </ui_toggle_switch.ToggleSwitch>\n    <ReactNative.View style={{\"width\":20}}></ReactNative.View>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>SWITCH
        </ReactNative.Text>
        <ui_toggle_switch.ToggleSwitch
          selected={first}
          setSelected={setFirst}
          style={{"flex":1}}
          styleContainer={{"flex":1}}>
        </ui_toggle_switch.ToggleSwitch>
        <ReactNative.View style={{"width":20}}></ReactNative.View>
        <ui_toggle_switch.ToggleSwitch
          selected={second}
          setSelected={setSecond}
          theme={{"fgSelected":"black"}}>
        </ui_toggle_switch.ToggleSwitch>
        <ReactNative.View style={{"width":20}}></ReactNative.View>
        <ui_toggle_switch.ToggleSwitch
          highlighted={highlighted}
          setSelected={setHighlighted}
          selected={highlighted}>
        </ui_toggle_switch.ToggleSwitch>
        <ReactNative.View style={{"width":20}}></ReactNative.View>
        <ui_toggle_switch.ToggleSwitch
          disabled={true}
          highlighted={highlighted}
          setSelected={setHighlighted}
          selected={highlighted}>
        </ui_toggle_switch.ToggleSwitch>
      </n.Row>
      <ReactNative.View style={{"height":20}}></ReactNative.View>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>SWITCH
        </ReactNative.Text>
        <ui_toggle_switch.ToggleSwitch
          selected={first}
          setSelected={setFirst}
          theme={{"fgSelected":"darkgreen","fgNormal":"darkred"}}
          knobProps={{
            "children":[
              (
              <ReactNative.Text style={{"fontWeight":"800","color":"white"}}>{first ? "ON" : "OFF"}</ReactNative.Text>)
            ]
          }}
          knobStyle={{
            "width":40,
            "height":40,
            "justifyContent":"center",
            "alignItems":"center"
          }}
          lineStyle={{"height":40,"width":64,"marginVertical":0}}>
        </ui_toggle_switch.ToggleSwitch>
        <ReactNative.View style={{"width":20}}></ReactNative.View>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "ToggleSwitchSimpleDemo":ToggleSwitchSimpleDemo,
  "ToggleSwitchSquareDemo":ToggleSwitchSquareDemo,
  "SwitchBoxDemo":SwitchBoxDemo
};

export default MODULE