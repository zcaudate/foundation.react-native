import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_base from './physical-base'

import helper_theme_default from './helper-theme-default'

import helper_theme from './helper-theme'

// js.react-native.ui-toggle-button/toggleButtonTheme [20] 
function toggleButtonTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.BinaryDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-toggle-button/ToggleButton [37] 
function ToggleButton({
  selected,
  text,
  textProps,
  style,
  styleContainer,
  theme,
  themePipeline,
  inner = [],
  ...rprops
}){
  let [styleStatic,transformFn] = toggleButtonTheme({theme,themePipeline,...rprops});
  return (
    <physical_base.TouchableBinary
      active={selected}
      style={styleContainer}
      inner={[
        Object.assign({
            "component":ReactNative.Text,
            "children":Array.isArray(text) ? text : ((null == text) ? [] : [text]),
            "style":[
                  helper_theme_default.ButtonDefaultStyle,
                  ...(Array.isArray(style) ? style : ((null == style) ? [] : [style])),
                  styleStatic
                ],
            "transformations":transformFn
          },textProps),
        ...inner
      ]}
      {...rprops}>
    </physical_base.TouchableBinary>);
}

var MODULE = {
  "toggleButtonTheme":toggleButtonTheme,
  "ToggleButton":ToggleButton
};

export default MODULE