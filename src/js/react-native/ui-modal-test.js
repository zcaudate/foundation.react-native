import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import ui_modal from './ui-modal'

// js.react-native.ui-modal-test/ModalDemo [33] 
function ModalDemo(){
  let [visible,setVisible] = React.useState();
  let [position,setPosition] = React.useState("centered");
  let [transition,setTransition] = React.useState("from_top");
  React.useEffect(function (){
    if(false == visible){
      setVisible(true);
    }
  },[transition]);
  React.useEffect(function (){
    setVisible(false);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-modal/Modal"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"T\"\n      onPress={function (){\n        return setVisible(true);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Tabs\n    data={[\n      \"centered\",\n      \"top\",\n      \"left\",\n      \"bottom\",\n      \"right\",\n      \"top_right\",\n      \"top_left\",\n      \"bottom_right\",\n      \"bottom_left\"\n    ]}\n    value={position}\n    setValue={setPosition}>\n  </n.Tabs>);\n(\n  <n.Tabs\n    data={[\"from_top\",\"from_bottom\",\"from_left\",\"from_right\"]}\n    value={transition}\n    setValue={setTransition}>\n  </n.Tabs>);\n(\n  <ui_modal.Modal\n    visible={visible}\n    position={position}\n    transition={transition}\n    onClose={function (){\n      return setVisible(false);\n    }}\n    styleBackdrop={{\"backgroundColor\":\"#222\"}}>\n    <ReactNative.View style={{\"width\":420,\"height\":200}}>\n      <ReactNative.Text style={{\"flex\":1,\"backgroundColor\":\"yellow\"}}>HELLO</ReactNative.Text>\n    </ReactNative.View>\n  </ui_modal.Modal>);\n(\n  <n.Caption text={n.format_obj({visible})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="T"
          onPress={function (){
            return setVisible(true);
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
      <ui_modal.Modal
        visible={visible}
        position={position}
        transition={transition}
        onClose={function (){
          return setVisible(false);
        }}
        styleBackdrop={{"backgroundColor":"#222"}}>
        <ReactNative.View style={{"width":420,"height":200}}>
          <ReactNative.Text style={{"flex":1,"backgroundColor":"yellow"}}>HELLO</ReactNative.Text>
        </ReactNative.View>
      </ui_modal.Modal>
      <n.Caption text={n.format_obj({visible})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"ModalDemo":ModalDemo};

export default MODULE