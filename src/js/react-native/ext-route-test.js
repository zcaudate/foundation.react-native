import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import ext_route from '../react/ext-route'

import event_route from '../../xt/lang/event-route'

// js.react-native.ext-route-test/UseRouteSegmentDemo [22] 
function UseRouteSegmentDemo(){
  let route = ext_route.makeRoute("account/user");
  let url = ext_route.listenRouteUrl(route);
  let tree = ext_route.listenRouteTree(route);
  let [value,setValue] = ext_route.useRouteSegment(route,["account"]);
  let getCount = r.useGetCount();
  return (
    <n.EnclosedCodeContainer
      label="js.react.ext-route/useRouteSegment"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.TextInput value={value} onChangeText={setValue}></ReactNative.TextInput>\n    <ReactNative.Button\n      title=\"User\"\n      onPress={function (){\n        return setValue(\"user\");\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"Settings\"\n      onPress={function (){\n        return setValue(\"settings\");\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"GUEST\"\n      onPress={function (){\n        return event_route.set_path(route,[\"guest\"]);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"ACCOUNT\"\n      onPress={function (){\n        return event_route.set_path(route,[\"account\"]);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n  </n.Row>);\n(\n  <n.TextDisplay\n    content={n.format_entry({\"url\":url,\"tree\":tree,\"value\":value,\"count\":getCount()})}>\n  </n.TextDisplay>);";
      }()}>
      <n.Row>
        <ReactNative.TextInput value={value} onChangeText={setValue}></ReactNative.TextInput>
        <ReactNative.Button
          title="User"
          onPress={function (){
            return setValue("user");
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="Settings"
          onPress={function (){
            return setValue("settings");
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="GUEST"
          onPress={function (){
            return event_route.set_path(route,["guest"]);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="ACCOUNT"
          onPress={function (){
            return event_route.set_path(route,["account"]);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
      </n.Row>
      <n.TextDisplay
        content={n.format_entry({"url":url,"tree":tree,"value":value,"count":getCount()})}>
      </n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"UseRouteSegmentDemo":UseRouteSegmentDemo};

export default MODULE