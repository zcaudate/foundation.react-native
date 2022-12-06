import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_range from './ui-range'

// js.react-native.ui-range-test/RangeHDemo [28] 
function RangeHDemo(){
  let [lower,setLower] = React.useState(2);
  let [upper,setUpper] = React.useState(8);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-range/Range"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\",\"justifyContent\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>RangeH\n    </ReactNative.Text>\n    <ui_range.Range\n      min={0}\n      upper={upper}\n      knobStyle={{\"borderRadius\":3}}\n      disabled={disabled}\n      theme={{\n        \"bgNormal\":\"red\",\n        \"fgNormal\":\"blue\",\n        \"bgHovered\":0.7,\n        \"fgHovered\":0.7,\n        \"bgPressed\":-0.2,\n        \"fgPressed\":0.1\n      }}\n      setLower={setLower}\n      axisStyle={{\"borderRadius\":3}}\n      max={10}\n      addons={[\n        physical_addon.tagAll({\n        \"style\":{\"paddingHorizontal\":20,\"height\":250,\"width\":300,\"flex\":1}\n      })\n      ]}\n      highlighted={highlighted}\n      length={200}\n      step={2}\n      lower={lower}\n      setUpper={setUpper}>\n    </ui_range.Range>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text>{n.format_entry({lower,upper})}</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center","justifyContent":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>RangeH
        </ReactNative.Text>
        <ui_range.Range
          min={0}
          upper={upper}
          knobStyle={{"borderRadius":3}}
          disabled={disabled}
          theme={{
            "bgNormal":"red",
            "fgNormal":"blue",
            "bgHovered":0.7,
            "fgHovered":0.7,
            "bgPressed":-0.2,
            "fgPressed":0.1
          }}
          setLower={setLower}
          axisStyle={{"borderRadius":3}}
          max={10}
          addons={[
            physical_addon.tagAll({
            "style":{"paddingHorizontal":20,"height":250,"width":300,"flex":1}
          })
          ]}
          highlighted={highlighted}
          length={200}
          step={2}
          lower={lower}
          setUpper={setUpper}>
        </ui_range.Range>
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
        <ReactNative.Text>{n.format_entry({lower,upper})}</ReactNative.Text>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-range-test/RangeVDemo [82] 
function RangeVDemo(){
  let [lower,setLower] = React.useState(10);
  let [upper,setUpper] = React.useState(10);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-range/RangeV"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\",\"justifyContent\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>RangeV\n    </ReactNative.Text>\n    <ui_range.Range\n      min={0}\n      layout=\"vertical\"\n      upper={upper}\n      knobStyle={{\"borderRadius\":3}}\n      disabled={disabled}\n      theme={{\n        \"bgNormal\":\"red\",\n        \"fgNormal\":\"blue\",\n        \"bgHovered\":0.7,\n        \"fgHovered\":0.7,\n        \"bgPressed\":-0.2,\n        \"fgPressed\":0.1\n      }}\n      setLower={setLower}\n      axisStyle={{\"borderRadius\":3}}\n      max={10}\n      addons={[\n        physical_addon.tagAll({\n        \"style\":{\"paddingHorizontal\":20,\"height\":250,\"width\":300,\"flex\":1}\n      })\n      ]}\n      highlighted={highlighted}\n      length={200}\n      step={2}\n      lower={lower}\n      setUpper={setUpper}>\n    </ui_range.Range>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text>{n.format_entry({lower,upper})}</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row style={{"alignItems":"center","justifyContent":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>RangeV
        </ReactNative.Text>
        <ui_range.Range
          min={0}
          layout="vertical"
          upper={upper}
          knobStyle={{"borderRadius":3}}
          disabled={disabled}
          theme={{
            "bgNormal":"red",
            "fgNormal":"blue",
            "bgHovered":0.7,
            "fgHovered":0.7,
            "bgPressed":-0.2,
            "fgPressed":0.1
          }}
          setLower={setLower}
          axisStyle={{"borderRadius":3}}
          max={10}
          addons={[
            physical_addon.tagAll({
            "style":{"paddingHorizontal":20,"height":250,"width":300,"flex":1}
          })
          ]}
          highlighted={highlighted}
          length={200}
          step={2}
          lower={lower}
          setUpper={setUpper}>
        </ui_range.Range>
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
        <ReactNative.Text>{n.format_entry({lower,upper})}</ReactNative.Text>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"RangeHDemo":RangeHDemo,"RangeVDemo":RangeVDemo};

export default MODULE