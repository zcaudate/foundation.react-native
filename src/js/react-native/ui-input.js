import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_base from './physical-base'

import helper_theme_default from './helper-theme-default'

import helper_theme from './helper-theme'

import k from '../../xt/lang/base-lib'

// js.react-native.ui-input/inputTheme [20] 
function inputTheme({theme,themePipeline,...rprops}){
  let __theme = Object.assign({},helper_theme_default.InputDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.InputDefaultPipeline,themePipeline);
  let [fgStyleStatic,fgTransformFn] = helper_theme.prepThemeSingle(
    {"theme":__theme,"themePipeline":__themePipeline,...rprops},
    "fg",
    ["color"]
  );
  let [bgStyleStatic,bgTransformFn] = helper_theme.prepThemeCombined({"theme":__theme,"themePipeline":__themePipeline,...rprops});
  return {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn};
}

// js.react-native.ui-input/Input [43] 
function Input({
  theme,
  themePipeline,
  style,
  onChangeText,
  styleContainer,
  containerProps,
  ...rprops
}){
  let {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn} = inputTheme({theme,themePipeline,...rprops});
  return (
    <physical_base.TouchableInput
      styleContainer={[
        helper_theme_default.InputDefaultStyle,
        ...bgStyleStatic,
        ...(Array.isArray(styleContainer) ? styleContainer : ((null == styleContainer) ? [] : [styleContainer]))
      ]}
      containerProps={Object.assign({"transformations":bgTransformFn},containerProps)}
      transformations={fgTransformFn}
      onChangeText={function (v){
        return k.arrayify(onChangeText).map(function (f){
          return f(v);
        });
      }}
      size="sm"
      style={[
        {"flex":1},
        ...fgStyleStatic,
        ReactNative.Platform.select({"web":{"outlineWidth":0,"outline":"none"}}),
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>
    </physical_base.TouchableInput>);
}

var MODULE = {"inputTheme":inputTheme,"Input":Input};

export default MODULE