import * as ReactNative from 'react-native'

import n from '../react-native'

import ui_scrollview from './ui-scrollview'

// js.react-native.ui-scrollview-test/ScrollViewDemo [23] 
function ScrollViewDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-scrollview/ScrollView"
      code={function (){
        return "(\n  <ui_scrollview.ScrollView style={{\"height\":300,\"width\":400}}>\n    <ReactNative.View style={{\"height\":500,\"backgroundColor\":\"yellow\"}}></ReactNative.View>\n  </ui_scrollview.ScrollView>);";
      }()}>
      <ui_scrollview.ScrollView style={{"height":300,"width":400}}>
        <ReactNative.View style={{"height":500,"backgroundColor":"yellow"}}></ReactNative.View>
      </ui_scrollview.ScrollView>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"ScrollViewDemo":ScrollViewDemo};

export default MODULE