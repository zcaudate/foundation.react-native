import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_toggle_button from './ui-toggle-button'

// js.react-native.ui-toggle-button-test/ToggleButtonSimpleDemo [27] 
function ToggleButtonSimpleDemo(){
  let [selected,setSelected] = React.useState(true);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label=" js.react-native.ui-toggle-button/ToggleButtonSimple"
      code={function (){
        return "(\n  <n.Row style={{\"alignItems\":\"center\"}}>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>SIMPLE\n    </ReactNative.Text>\n    <ui_toggle_button.ToggleButton\n      selected={selected}\n      onPress={function (){\n        setSelected(!selected);\n      }}\n      disabled={disabled}\n      highlighted={highlighted}\n      size=\"lg\"\n      style={{\"borderRadius\":3}}\n      theme={{\n        \"bgNormal\":\"blue\",\n        \"fgNormal\":\"#fefefe\",\n        \"bgActive\":\"red\",\n        \"bgPressed\":-0.4,\n        \"bgHovered\":0.8\n      }}\n      inner={[\n        {\n        \"component\":ReactNative.View,\n        \"style\":{\"height\":2,\"top\":-6,\"backgroundColor\":\"purple\"},\n        \"transformations\":function ({active,pressing}){\n          return {\"style\":{\"width\":(100 * Math.abs(pressing - active)) + \"%\"}};\n        }\n      },\n        {\n        \"component\":ReactNative.View,\n        \"style\":{\"height\":2,\"top\":-4,\"backgroundColor\":\"orange\"},\n        \"transformations\":{\n          \"pressing\":function (v){\n            return {\"style\":{\"width\":(100 * v) + \"%\"}};\n          }\n        }\n      },\n        {\n        \"component\":ReactNative.View,\n        \"style\":{\"height\":2,\"top\":-2,\"backgroundColor\":\"green\"},\n        \"transformations\":function ({hovering,pressing}){\n          return {\"style\":{\"width\":(100 * (hovering - pressing)) + \"%\"}};\n        }\n      }\n      ]}\n      styleContainer={{\"flexDirection\":\"row-reverse\"}}\n      addons={[\n        physical_addon.tagAll({\"style\":{\"paddingHorizontal\":20,\"height\":80,\"flex\":1}})\n      ]}\n      text=\"PUSH\">\n    </ui_toggle_button.ToggleButton>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Caption text={n.format_obj({selected})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Row style={{"alignItems":"center"}}>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>SIMPLE
        </ReactNative.Text>
        <ui_toggle_button.ToggleButton
          selected={selected}
          onPress={function (){
            setSelected(!selected);
          }}
          disabled={disabled}
          highlighted={highlighted}
          size="lg"
          style={{"borderRadius":3}}
          theme={{
            "bgNormal":"blue",
            "fgNormal":"#fefefe",
            "bgActive":"red",
            "bgPressed":-0.4,
            "bgHovered":0.8
          }}
          inner={[
            {
            "component":ReactNative.View,
            "style":{"height":2,"top":-6,"backgroundColor":"purple"},
            "transformations":function ({active,pressing}){
              return {"style":{"width":(100 * Math.abs(pressing - active)) + "%"}};
            }
          },
            {
            "component":ReactNative.View,
            "style":{"height":2,"top":-4,"backgroundColor":"orange"},
            "transformations":{
              "pressing":function (v){
                return {"style":{"width":(100 * v) + "%"}};
              }
            }
          },
            {
            "component":ReactNative.View,
            "style":{"height":2,"top":-2,"backgroundColor":"green"},
            "transformations":function ({hovering,pressing}){
              return {"style":{"width":(100 * (hovering - pressing)) + "%"}};
            }
          }
          ]}
          styleContainer={{"flexDirection":"row-reverse"}}
          addons={[
            physical_addon.tagAll({"style":{"paddingHorizontal":20,"height":80,"flex":1}})
          ]}
          text="PUSH">
        </ui_toggle_button.ToggleButton>
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
      <n.Caption text={n.format_obj({selected})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"ToggleButtonSimpleDemo":ToggleButtonSimpleDemo};

export default MODULE