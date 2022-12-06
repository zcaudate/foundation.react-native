import * as ReactNative from 'react-native'

import RNIcon from 'react-native-vector-icons/Entypo'

import n from '../react-native'

import physical_base from './physical-base'

import helper_theme_default from './helper-theme-default'

import helper_theme from './helper-theme'

// js.react-native.ui-check-box/checkBoxTheme [19] 
function checkBoxTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.CheckBoxDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.BinaryDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-check-box/CheckBox [34] 
function CheckBox({
  selected,
  setSelected,
  style,
  icon,
  iconProps,
  styleContainer,
  theme,
  themePipeline,
  inner = [],
  ...rprops
}){
  let [styleStatic,transformFn] = checkBoxTheme({theme,themePipeline,...rprops});
  return (
    <physical_base.TouchableBinary
      active={selected}
      onPress={function (){
        if(setSelected){
          setSelected(!selected);
        }
      }}
      inner={[
        Object.assign({
            "component":RNIcon,
            "allowRef":true,
            "name":icon || "check",
            "style":[
                  helper_theme_default.CheckBoxDefaultStyle,
                  ...styleStatic,
                  ReactNative.Platform.select({"web":{"outlineWidth":0}}),
                  ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
                ],
            "transformations":transformFn
          },iconProps),
        ...inner
      ]}
      {...rprops}>
    </physical_base.TouchableBinary>);
}

var MODULE = {"checkBoxTheme":checkBoxTheme,"CheckBox":CheckBox};

export default MODULE