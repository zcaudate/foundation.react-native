import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import a from './animate'

import ui_frame from './ui-frame'

// js.react-native.ui-frame-test/FramePaneDemo [25] 
function FramePaneDemo(){
  let [visible,setVisible] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-frame/FramePane"
      code={function (){
        return "(\n  <n.Row style={{\"paddingBottom\":10}}>\n    <ReactNative.Button\n      title=\"T\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n    <ui_frame.FramePane location=\"top\" visible={visible} fade={false}>\n      <ReactNative.Text style={{\"backgroundColor\":\"red\",\"width\":100}}>HELLO</ReactNative.Text>\n    </ui_frame.FramePane>\n  </n.Row>);\n(\n  <n.Caption text={n.format_obj({visible})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Row style={{"paddingBottom":10}}>
        <ReactNative.Button
          title="T"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
        <ui_frame.FramePane location="top" visible={visible} fade={false}>
          <ReactNative.Text style={{"backgroundColor":"red","width":100}}>HELLO</ReactNative.Text>
        </ui_frame.FramePane>
      </n.Row>
      <n.Caption text={n.format_obj({visible})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-frame-test/FrameDemo [51] 
function FrameDemo(){
  let [topVisible,setTopVisible] = React.useState(true);
  let [bottomVisible,setBottomVisible] = React.useState(true);
  let [rightVisible,setRightVisible] = React.useState(true);
  let [leftVisible,setLeftVisible] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-frame/Frame"
      style={{"height":350}}
      code={function (){
        return "(\n  <n.Row style={{\"paddingBottom\":10}}>\n    <ReactNative.Button\n      title=\"T\"\n      onPress={function (){\n        return setTopVisible(!topVisible);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"B\"\n      onPress={function (){\n        return setBottomVisible(!bottomVisible);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"L\"\n      onPress={function (){\n        return setLeftVisible(!leftVisible);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"R\"\n      onPress={function (){\n        return setRightVisible(!rightVisible);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <ui_frame.Frame\n    rightSize={200}\n    topVisible={topVisible}\n    topComponent={ReactNative.View}\n    topProps={{\n      \"style\":{\"flex\":1,\"backgroundColor\":\"yellow\"},\n      \"children\":[\n          (\n            <ReactNative.Text key=\"text\">TOP</ReactNative.Text>)\n        ]\n    }}\n    bottomVisible={bottomVisible}\n    rightVisible={rightVisible}\n    rightIndicatorParams={{\n      \"default\":{\n          \"type\":\"timing\",\n          \"duration\":1000,\n          \"easing\":ReactNative.Easing.linear\n        }\n    }}\n    brand={{\"type\":\"dark\"}}\n    leftSize={100}\n    rightComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"lightgreen\"}}><ReactNative.Text>RIGHT</ReactNative.Text></ReactNative.View>);\n    }}\n    bottomComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"magenta\"}}><ReactNative.Text>BOTTOM</ReactNative.Text></ReactNative.View>);\n    }}\n    leftComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"cyan\"}}><ReactNative.Text>LEFT</ReactNative.Text></ReactNative.View>);\n    }}\n    bottomSize={30}\n    topSize={50}\n    leftVisible={leftVisible}>\n    <ReactNative.View style={{\"padding\":10}}><ReactNative.Text>BODY</ReactNative.Text></ReactNative.View>\n  </ui_frame.Frame>);\n(\n  <n.TextDisplay\n    style={{\"flex\":null,\"height\":80}}\n    content={n.format_entry({bottomVisible,leftVisible,rightVisible,topVisible})}>\n  </n.TextDisplay>);";
      }()}>
      <n.Row style={{"paddingBottom":10}}>
        <ReactNative.Button
          title="T"
          onPress={function (){
            return setTopVisible(!topVisible);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="B"
          onPress={function (){
            return setBottomVisible(!bottomVisible);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="L"
          onPress={function (){
            return setLeftVisible(!leftVisible);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="R"
          onPress={function (){
            return setRightVisible(!rightVisible);
          }}>
        </ReactNative.Button>
      </n.Row>
      <ui_frame.Frame
        rightSize={200}
        topVisible={topVisible}
        topComponent={ReactNative.View}
        topProps={{
          "style":{"flex":1,"backgroundColor":"yellow"},
          "children":[
            (
            <ReactNative.Text key="text">TOP</ReactNative.Text>)
          ]
        }}
        bottomVisible={bottomVisible}
        rightVisible={rightVisible}
        rightIndicatorParams={{
          "default":{
            "type":"timing",
            "duration":1000,
            "easing":ReactNative.Easing.linear
          }
        }}
        brand={{"type":"dark"}}
        leftSize={100}
        rightComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"lightgreen"}}><ReactNative.Text>RIGHT</ReactNative.Text></ReactNative.View>);
        }}
        bottomComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"magenta"}}><ReactNative.Text>BOTTOM</ReactNative.Text></ReactNative.View>);
        }}
        leftComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"cyan"}}><ReactNative.Text>LEFT</ReactNative.Text></ReactNative.View>);
        }}
        bottomSize={30}
        topSize={50}
        leftVisible={leftVisible}>
        <ReactNative.View style={{"padding":10}}><ReactNative.Text>BODY</ReactNative.Text></ReactNative.View>
      </ui_frame.Frame>
      <n.TextDisplay
        style={{"flex":null,"height":80}}
        content={n.format_entry({bottomVisible,leftVisible,rightVisible,topVisible})}>
      </n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"FramePaneDemo":FramePaneDemo,"FrameDemo":FrameDemo};

export default MODULE