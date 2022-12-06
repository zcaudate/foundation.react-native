import * as ReactNative from 'react-native'

import n from '../react-native'

import physical_base from './physical-base'

import helper_theme_default from './helper-theme-default'

import helper_theme from './helper-theme'

// js.react-native.ui-radio-box/radioBoxTheme [20] 
function radioBoxTheme({theme,themePipeline,transformations,...rprops}){
  let __theme = Object.assign({},helper_theme_default.RadioBoxDefaultTheme,theme);
  let __themePipeline = Object.assign({},helper_theme_default.BinaryDefaultPipeline,themePipeline);
  let {inside,outside} = transformations;
  let [bgStyleStatic,bgTransformFn] = helper_theme.prepThemeCombined({
    "theme":__theme,
    "themePipeline":__themePipeline,
    "transformations":outside,
    ...rprops
  });
  let [fgStyleStatic,fgTransformFn] = helper_theme.prepThemeSingle({
    "theme":__theme,
    "themePipeline":__themePipeline,
    "transformations":Object.assign({
      "fg":function ({active}){
        return {
          "style":{
              "opacity":active,
              "transform":[{"scale":0.2 + (0.8 * active)}]
            }
        };
      }
    },inside),
    ...rprops
  },"fg",["backgroundColor"]);
  return {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn};
}

// js.react-native.ui-radio-box/RadioBox [51] 
function RadioBox({
  selected,
  setSelected,
  theme,
  themePipeline,
  insideProps,
  insideStyle,
  outsideProps,
  outsideStyle,
  transformations = {},
  size = 24,
  sizeInside = 10,
  inner = [],
  ...rprops
}){
  let {bgStyleStatic,bgTransformFn,fgStyleStatic,fgTransformFn} = radioBoxTheme({theme,themePipeline,transformations,...rprops});
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
            "component":ReactNative.View,
            "key":"outside",
            "style":[
                  {
                      "borderRadius":size / 2,
                      "height":size,
                      "width":size,
                      "borderStyle":"solid",
                      "borderWidth":2
                    },
                  bgStyleStatic,
                  ...(Array.isArray(outsideStyle) ? outsideStyle : ((null == outsideStyle) ? [] : [outsideStyle]))
                ],
            "transformations":bgTransformFn
          },outsideProps),
        Object.assign({
            "component":ReactNative.View,
            "key":"inside",
            "style":[
                  {
                      "position":"absolute",
                      "borderRadius":sizeInside / 2,
                      "top":(size - sizeInside) / 2,
                      "left":(size - sizeInside) / 2,
                      "height":sizeInside,
                      "width":sizeInside
                    },
                  fgStyleStatic,
                  ...(Array.isArray(insideStyle) ? insideStyle : ((null == insideStyle) ? [] : [insideStyle]))
                ],
            "transformations":fgTransformFn
          },insideProps),
        ...inner
      ]}
      {...rprops}>
    </physical_base.TouchableBinary>);
}

var MODULE = {"radioBoxTheme":radioBoxTheme,"RadioBox":RadioBox};

export default MODULE