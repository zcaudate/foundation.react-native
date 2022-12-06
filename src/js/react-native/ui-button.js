import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_base from './physical-base'

import helper_theme_default from './helper-theme-default'

import helper_theme from './helper-theme'

// js.react-native.ui-button/buttonTheme [19] 
function buttonTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.ButtonDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.PressDefaultPipeline,themePipeline);
  let [styleStatic,transformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return [styleStatic,transformFn];
}

// js.react-native.ui-button/Button [36] 
function Button({
  text,
  textProps,
  style,
  styleContainer,
  theme,
  themePipeline,
  inner = [],
  ...rprops
}){
  let [styleStatic,transformFn] = buttonTheme({theme,themePipeline,...rprops});
  return (
    <physical_base.TouchableBasePressing
      inner={[
        Object.assign({
            "component":ReactNative.Text,
            "key":"text",
            "numberOfLines":1,
            "children":Array.isArray(text) ? text : ((null == text) ? [] : [text]),
            "style":[
                  helper_theme_default.ButtonDefaultStyle,
                  ...styleStatic,
                  ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
                ],
            "transformations":transformFn
          },textProps),
        ...inner
      ]}
      style={styleContainer}
      {...rprops}>
    </physical_base.TouchableBasePressing>);
}

var MODULE = {"buttonTheme":buttonTheme,"Button":Button};

export default MODULE