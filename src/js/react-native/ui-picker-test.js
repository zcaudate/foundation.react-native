import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_picker from './ui-picker'

// js.react-native.ui-picker-test/PickerIndexedDemo [31] 
function PickerIndexedDemo(){
  let [first,setFirst] = React.useState(5);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-picker/PickerIndexed"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>Picker\n    </ReactNative.Text>\n    <ui_picker.PickerIndexed\n      highlighted={highlighted}\n      disabled={disabled}\n      theme={{\n        \"bgNormal\":\"red\",\n        \"fgNormal\":\"blue\",\n        \"bgHovered\":0.7,\n        \"fgHovered\":0.7,\n        \"bgPressed\":-0.2,\n        \"fgPressed\":0.1\n      }}\n      index={first}\n      setIndex={setFirst}\n      items={[\"A-1\",\"A-2\",\"A-3\",\"A-4\",\"A-5\",\"A-6\"]}\n      addons={[\n        physical_addon.tagAll({\n        \"style\":{\"paddingHorizontal\":20,\"height\":80,\"width\":100,\"flex\":1}\n      })\n      ]}>\n    </ui_picker.PickerIndexed>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"+1\"\n      onPress={function (){\n        return setFirst(first + 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"-1\"\n      onPress={function (){\n        return setFirst(first - 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text>{n.format_entry({disabled,first,highlighted})}</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>Picker
        </ReactNative.Text>
        <ui_picker.PickerIndexed
          highlighted={highlighted}
          disabled={disabled}
          theme={{
            "bgNormal":"red",
            "fgNormal":"blue",
            "bgHovered":0.7,
            "fgHovered":0.7,
            "bgPressed":-0.2,
            "fgPressed":0.1
          }}
          index={first}
          setIndex={setFirst}
          items={["A-1","A-2","A-3","A-4","A-5","A-6"]}
          addons={[
            physical_addon.tagAll({
            "style":{"paddingHorizontal":20,"height":80,"width":100,"flex":1}
          })
          ]}>
        </ui_picker.PickerIndexed>
      </n.Row>
      <n.Row>
        <ReactNative.Button
          title="+1"
          onPress={function (){
            return setFirst(first + 1);
          }}>
        </ReactNative.Button>
        <ReactNative.Button
          title="-1"
          onPress={function (){
            return setFirst(first - 1);
          }}>
        </ReactNative.Button>
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
        <ReactNative.Text>{n.format_entry({disabled,first,highlighted})}</ReactNative.Text>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"PickerIndexedDemo":PickerIndexedDemo};

export default MODULE