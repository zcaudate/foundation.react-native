import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import ext_log from '../react/ext-log'

import event_log from '../../xt/lang/event-log'

import k from '../../xt/lang/base-lib'

// js.react-native.ext-log-test/ListenLogLatestDemo [25] 
function ListenLogLatestDemo(){
  let log = ext_log.makeLog({});
  let latest = ext_log.listenLogLatest(log);
  React.useEffect(function (){
    event_log.queue_entry(
      log,
      {"id":Math.random().toString(36).substr(2,6 || 4)},
      k.id_fn,
      k.identity
    );
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react.ext-log/listenLogLatest"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"QUEUE\"\n      onPress={function (){\n        return event_log.queue_entry(\n          log,\n          {\"id\":Math.random().toString(36).substr(2,6 || 4)},\n          k.id_fn,\n          k.identity\n        );\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.TextDisplay\n    content={n.format_entry({\n      \"latest\":latest,\n      \"count\":event_log.get_count(log),\n      \"tail\":event_log.get_tail(log,5)\n    })}>\n  </n.TextDisplay>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="QUEUE"
          onPress={function (){
            return event_log.queue_entry(
              log,
              {"id":Math.random().toString(36).substr(2,6 || 4)},
              k.id_fn,
              k.identity
            );
          }}>
        </ReactNative.Button>
      </n.Row>
      <n.TextDisplay
        content={n.format_entry({
          "latest":latest,
          "count":event_log.get_count(log),
          "tail":event_log.get_tail(log,5)
        })}>
      </n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

var MODULE = {"ListenLogLatestDemo":ListenLogLatestDemo};

export default MODULE