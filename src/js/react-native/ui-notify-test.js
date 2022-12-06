import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import ui_notify from './ui-notify'

// js.react-native.ui-notify-test/NotifyPane [24] 
function NotifyPane({position,setVisible,transition,visible}){
  return (
    <ui_notify.Notify
      visible={visible}
      margin={20}
      position={position}
      transition={transition}>
      <ReactNative.View>
        <ReactNative.Text style={{"backgroundColor":"yellow"}}>HELLO</ReactNative.Text>
      </ReactNative.View>
    </ui_notify.Notify>);
}

// js.react-native.ui-notify-test/NotifyDemo [42] 
function NotifyDemo(){
  let [visible,setVisible] = React.useState(true);
  let [position,setPosition] = React.useState("centered");
  let [transition,setTransition] = React.useState("from_top");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-notify/Notify"
      style={{}}
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"T\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Tabs\n    data={[\n      \"centered\",\n      \"top\",\n      \"left\",\n      \"bottom\",\n      \"right\",\n      \"top_right\",\n      \"top_left\",\n      \"bottom_right\",\n      \"bottom_left\"\n    ]}\n    value={position}\n    setValue={setPosition}>\n  </n.Tabs>);\n(\n  <n.Tabs\n    data={[\"from_top\",\"from_bottom\",\"from_left\",\"from_right\"]}\n    value={transition}\n    setValue={setTransition}>\n  </n.Tabs>);\n(\n  <n.Row style={{\"backgroundColor\":\"#eee\"}}>\n    <n.PortalProvider>\n      <n.PortalSink\n        style={{\"height\":400,\"width\":400,\"backgroundColor\":\"black\"}}>\n        <NotifyPane\n          visible={visible}\n          setVisible={setVisible}\n          transition={transition}\n          position={position}>\n        </NotifyPane>\n      </n.PortalSink>\n    </n.PortalProvider>\n  </n.Row>);\n(\n  <n.TextDisplay content={n.format_entry({position,transition,visible})}></n.TextDisplay>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="T"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
      </n.Row>
      <n.Tabs
        data={[
          "centered",
          "top",
          "left",
          "bottom",
          "right",
          "top_right",
          "top_left",
          "bottom_right",
          "bottom_left"
        ]}
        value={position}
        setValue={setPosition}>
      </n.Tabs>
      <n.Tabs
        data={["from_top","from_bottom","from_left","from_right"]}
        value={transition}
        setValue={setTransition}>
      </n.Tabs>
      <n.Row style={{"backgroundColor":"#eee"}}>
        <n.PortalProvider>
          <n.PortalSink
            style={{"height":400,"width":400,"backgroundColor":"black"}}>
            <NotifyPane
              visible={visible}
              setVisible={setVisible}
              transition={transition}
              position={position}>
            </NotifyPane>
          </n.PortalSink>
        </n.PortalProvider>
      </n.Row>
      <n.TextDisplay content={n.format_entry({position,transition,visible})}></n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

var MODULE = // 3e963d2f-3967-4711-ae39-621370097369
{"NotifyPane":NotifyPane,"NotifyDemo":NotifyDemo};;

export default MODULE