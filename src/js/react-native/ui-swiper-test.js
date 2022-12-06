import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_addon from './physical-addon'

import ui_swiper from './ui-swiper'

// js.react-native.ui-swiper-test/SwiperDemo [31] 
function SwiperDemo(){
  let [first,setFirst] = React.useState(5);
  let [highlighted,setHighlighted] = React.useState();
  let [disabled,setDisabled] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-swiper/Swiper"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text\n      style={{\"width\":80,\"fontSize\":12,\"color\":\"#333\",\"fontWeight\":\"700\"}}>Swiper\n    </ReactNative.Text>\n    <ui_swiper.Swiper\n      negView={(\n        <ReactNative.View\n          key=\"neg\"\n          style={{\"backgroundColor\":\"blue\",\"height\":100,\"width\":200}}>\n        </ReactNative.View>)}\n      disabled={disabled}\n      highlighted={highlighted}\n      style={{\"width\":300,\"height\":100,\"cursor\":\"grab\"}}\n      theme={{\n        \"bgNormal\":\"red\",\n        \"fgNormal\":\"blue\",\n        \"bgHovered\":0.7,\n        \"fgHovered\":0.7,\n        \"bgPressed\":-0.2,\n        \"fgPressed\":0.1\n      }}\n      posEnabled={true}\n      styleContainer={{\"height\":300,\"overflow\":\"hidden\"}}\n      negEnabled={true}\n      addons={[\n        physical_addon.tagAll({\n        \"style\":{\"paddingHorizontal\":20,\"height\":300,\"width\":200,\"flex\":1}\n      })\n      ]}\n      posView={(\n        <ReactNative.View\n          key=\"pos\"\n          style={{\"backgroundColor\":\"green\",\"height\":100,\"width\":200}}>\n        </ReactNative.View>)}>\n    </ui_swiper.Swiper>\n  </n.Row>);\n(\n  <n.Row>\n    <ReactNative.Button\n      title=\"+1\"\n      onPress={function (){\n        return setFirst(first + 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"-1\"\n      onPress={function (){\n        return setFirst(first - 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Button\n      title=\"H\"\n      onPress={function (){\n        return setHighlighted(!highlighted);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"D\"\n      onPress={function (){\n        return setDisabled(!disabled);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text>{n.format_entry({disabled,first,highlighted})}</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text
          style={{"width":80,"fontSize":12,"color":"#333","fontWeight":"700"}}>Swiper
        </ReactNative.Text>
        <ui_swiper.Swiper
          negView={(
            <ReactNative.View
              key="neg"
              style={{"backgroundColor":"blue","height":100,"width":200}}>
            </ReactNative.View>)}
          disabled={disabled}
          highlighted={highlighted}
          style={{"width":300,"height":100,"cursor":"grab"}}
          theme={{
            "bgNormal":"red",
            "fgNormal":"blue",
            "bgHovered":0.7,
            "fgHovered":0.7,
            "bgPressed":-0.2,
            "fgPressed":0.1
          }}
          posEnabled={true}
          styleContainer={{"height":300,"overflow":"hidden"}}
          negEnabled={true}
          addons={[
            physical_addon.tagAll({
            "style":{"paddingHorizontal":20,"height":300,"width":200,"flex":1}
          })
          ]}
          posView={(
            <ReactNative.View
              key="pos"
              style={{"backgroundColor":"green","height":100,"width":200}}>
            </ReactNative.View>)}>
        </ui_swiper.Swiper>
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

var MODULE = {"SwiperDemo":SwiperDemo};

export default MODULE