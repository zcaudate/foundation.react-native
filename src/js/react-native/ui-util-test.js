import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import a from './animate'

import ui_util from './ui-util'

// js.react-native.ui-util-test/PageDemo [22] 
function PageDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-util/Page"
      style={{"height":200}}
      code={function (){
        return "(\n  <ui_util.Page\n    headerComponent={function (){\n      return (\n        <ReactNative.View style={{\"height\":30,\"backgroundColor\":\"red\"}}></ReactNative.View>);\n    }}\n    footerComponent={function (){\n      return (\n        <ReactNative.View style={{\"height\":30,\"backgroundColor\":\"orange\"}}></ReactNative.View>);\n    }}\n    styleMenu={{\"height\":60}}\n    titleComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"yellow\"}}></ReactNative.View>);\n    }}\n    leftComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"green\"}}></ReactNative.View>);\n    }}\n    rightComponent={function (){\n      return (\n        <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"blue\"}}></ReactNative.View>);\n    }}>\n    <ReactNative.View style={{\"flex\":1,\"backgroundColor\":\"black\"}}></ReactNative.View>\n  </ui_util.Page>);";
      }()}>
      <ui_util.Page
        headerComponent={function (){
          return (
            <ReactNative.View style={{"height":30,"backgroundColor":"red"}}></ReactNative.View>);
        }}
        footerComponent={function (){
          return (
            <ReactNative.View style={{"height":30,"backgroundColor":"orange"}}></ReactNative.View>);
        }}
        styleMenu={{"height":60}}
        titleComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"yellow"}}></ReactNative.View>);
        }}
        leftComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"green"}}></ReactNative.View>);
        }}
        rightComponent={function (){
          return (
            <ReactNative.View style={{"flex":1,"backgroundColor":"blue"}}></ReactNative.View>);
        }}>
        <ReactNative.View style={{"flex":1,"backgroundColor":"black"}}></ReactNative.View>
      </ui_util.Page>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-util-test/FadeDemo [50] 
function FadeDemo(){
  let [visible,setVisible] = React.useState(true);
  let [size,setSize] = React.useState(100);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-util/Fade"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"V\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <ui_util.Fade visible={visible}>\n    <ReactNative.View style={{\"height\":size,\"width\":100,\"backgroundColor\":\"red\"}}></ReactNative.View>\n  </ui_util.Fade>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="V"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
      </n.Row>
      <ui_util.Fade visible={visible}>
        <ReactNative.View style={{"height":size,"width":100,"backgroundColor":"red"}}></ReactNative.View>
      </ui_util.Fade>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-util-test/FoldInnerDemo [75] 
function FoldInnerDemo(){
  let [visible,setVisible] = React.useState(true);
  let [size,setSize] = React.useState(100);
  let vindicator = a.useBinaryIndicator(visible);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-util/FoldInner"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"V\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n    <n.Tabs value={size} setValue={setSize} data={[100,200]}></n.Tabs>\n  </n.Row>);\n(\n  <n.Row style={{\"height\":100}}>\n    <ui_util.FoldInner\n      aspect=\"width\"\n      visible={visible}\n      chord={{\"visible\":visible}}\n      indicators={{\"visible\":vindicator}}>\n      <ReactNative.View style={{\"height\":100,\"width\":size,\"backgroundColor\":\"red\"}}></ReactNative.View>\n    </ui_util.FoldInner>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="V"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
        <n.Tabs value={size} setValue={setSize} data={[100,200]}></n.Tabs>
      </n.Row>
      <n.Row style={{"height":100}}>
        <ui_util.FoldInner
          aspect="width"
          visible={visible}
          chord={{"visible":visible}}
          indicators={{"visible":vindicator}}>
          <ReactNative.View style={{"height":100,"width":size,"backgroundColor":"red"}}></ReactNative.View>
        </ui_util.FoldInner>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-util-test/FoldDemo [110] 
function FoldDemo(){
  let [visible,setVisible] = React.useState(true);
  let [size,setSize] = React.useState(100);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-util/Fold"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"V\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n    <n.Tabs value={size} setValue={setSize} data={[100,200]}></n.Tabs>\n  </n.Row>);\n(\n  <n.Row style={{\"height\":100}}>\n    <ui_util.Fold visible={visible}>\n      <ReactNative.View\n        style={{\"height\":size,\"width\":100,\"backgroundColor\":\"green\"}}>\n      </ReactNative.View>\n    </ui_util.Fold>\n    <ui_util.Fold visible={visible} aspect=\"width\">\n      <ReactNative.View\n        style={{\"height\":100,\"width\":size,\"backgroundColor\":\"blue\"}}>\n      </ReactNative.View>\n    </ui_util.Fold>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="V"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
        <n.Tabs value={size} setValue={setSize} data={[100,200]}></n.Tabs>
      </n.Row>
      <n.Row style={{"height":100}}>
        <ui_util.Fold visible={visible}>
          <ReactNative.View
            style={{"height":size,"width":100,"backgroundColor":"green"}}>
          </ReactNative.View>
        </ui_util.Fold>
        <ui_util.Fold visible={visible} aspect="width">
          <ReactNative.View
            style={{"height":100,"width":size,"backgroundColor":"blue"}}>
          </ReactNative.View>
        </ui_util.Fold>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "PageDemo":PageDemo,
  "FadeDemo":FadeDemo,
  "FoldInnerDemo":FoldInnerDemo,
  "FoldDemo":FoldDemo
};

export default MODULE