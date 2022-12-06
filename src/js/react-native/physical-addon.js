import * as ReactNative from 'react-native'

import n from '../react-native'

import k from '../../xt/lang/base-lib'

// js.react-native.physical-addon/tagBase [17] 
function tagBase({style,...rprops}){
  return {
    "component":ReactNative.TextInput,
    "editable":false,
    "style":[
      {"cursor":"default","width":50,"fontSize":12},
      ReactNative.Platform.select({
      "ios":{"fontFamily":"Courier"},
      "default":{"fontFamily":"monospace"}
    }),
      ReactNative.Platform.select({"web":{"userSelect":"none"}}),
      ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
    ],
    ...rprops
  };
}

// js.react-native.physical-addon/tagSingle [34] 
function tagSingle({indicator,transformations,...rprops}){
  return Object.assign(tagBase(rprops),{
    "transformations":Object.assign({
        [indicator]:function (v){
            return {"value":v.toFixed(4)};
          }
      },transformations)
  });
}

// js.react-native.physical-addon/tagAll [46] 
function tagAll(props){
  let {transformations,keys,...rprops} = props || {};
  return Object.assign(tagBase(rprops),{
    "multiline":true,
    "transformations":function (m){
        let display = keys ? k.obj_pick(m,keys) : m;
        return {"value":n.format_entry(display)};
      }
  });
}

var MODULE = {"tagBase":tagBase,"tagSingle":tagSingle,"tagAll":tagAll};

export default MODULE