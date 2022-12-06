// js.react-native.helper-theme-default/FontSize [9] 
var FontSize = {
  "xxl":{"fontSize":40},
  "xl":{"fontSize":32},
  "lg":{"fontSize":24},
  "md":{"fontSize":18},
  "sm":{"fontSize":14},
  "xs":{"fontSize":12},
  "xxs":{"fontSize":10}
};

// js.react-native.helper-theme-default/defaultPressing [18] 
var defaultPressing = function (pressing,{disabled}){
  return Math.max(pressing,disabled);
};

// js.react-native.helper-theme-default/defaultHovering [22] 
var defaultHovering = function (hovering,{focusing}){
  return Math.max(hovering,focusing);
};

// js.react-native.helper-theme-default/PressDefaultPipeline [26] 
var PressDefaultPipeline = {
  "fg":{
    "initial":"default",
    "stages":["highlighted","hovering","pressing","disabled"],
    "values":{"pressing":defaultPressing}
  },
  "bg":{
    "initial":"default",
    "stages":["highlighted","hovering","pressing","disabled"],
    "values":{"pressing":defaultPressing}
  }
};

// js.react-native.helper-theme-default/BinaryDefaultPipeline [40] 
var BinaryDefaultPipeline = {
  "fg":{
    "initial":"default",
    "stages":["active","highlighted","hovering","pressing","disabled"],
    "values":{"pressing":defaultPressing}
  },
  "bg":{
    "initial":"default",
    "stages":["active","highlighted","hovering","pressing","disabled"],
    "values":{"pressing":defaultPressing}
  }
};

// js.react-native.helper-theme-default/InputDefaultPipeline [56] 
var InputDefaultPipeline = {
  "fg":{
    "initial":"default",
    "stages":["highlighted","focusing","disabled"],
    "values":{"hovering":defaultHovering}
  },
  "bg":{
    "initial":"default",
    "stages":["highlighted","focusing","disabled"],
    "values":{"hovering":defaultHovering}
  }
};

// js.react-native.helper-theme-default/centerFn [74] 
var centerFn = function (n){
  return function (x){
    if(x < 50){
      return x + n;
    }
    else{
      return x - n;
    }
  };
};

// js.react-native.helper-theme-default/BaseBg [81] 
var BaseBg = {
  "bgNormal":"#f4f4f4",
  "bgHovered":centerFn(10),
  "bgPressed":"#333",
  "bgDisabled":"#ccc",
  "bgHighlighted":"yellow",
  "bgActive":"#555"
};

// js.react-native.helper-theme-default/BaseFg [89] 
var BaseFg = {
  "fgNormal":"#333",
  "fgHovered":centerFn(20),
  "fgPressed":"#ccc",
  "fgDisabled":"#888",
  "fgHighlighted":"black",
  "fgActive":"white"
};

// js.react-native.helper-theme-default/BaseTheme [97] 
var BaseTheme = Object.assign({},BaseBg,BaseFg);

// js.react-native.helper-theme-default/InputDefaultFgTheme [106] 
var InputDefaultFgTheme = Object.assign({},BaseFg,{"fgActive":"white","bgActive":"#333"});

// js.react-native.helper-theme-default/InputDefaultBgTheme [112] 
var InputDefaultBgTheme = Object.assign({},BaseBg,{"bgActive":"#333"});

// js.react-native.helper-theme-default/InputDefaultTheme [117] 
var InputDefaultTheme = Object.assign({},InputDefaultBgTheme,InputDefaultFgTheme);

// js.react-native.helper-theme-default/InputDefaultStyle [122] 
var InputDefaultStyle = {"padding":6,"margin":2,"borderRadius":2};

// js.react-native.helper-theme-default/ButtonDefaultTheme [131] 
var ButtonDefaultTheme = Object.assign({},BaseTheme);

// js.react-native.helper-theme-default/ButtonDefaultStyle [135] 
var ButtonDefaultStyle = {
  "padding":6,
  "fontWeight":"500",
  "fontSize":16,
  "paddingHorizontal":10
};

// js.react-native.helper-theme-default/CheckBoxDefaultTheme [145] 
var CheckBoxDefaultTheme = Object.assign({},BaseTheme);

// js.react-native.helper-theme-default/CheckBoxDefaultStyle [148] 
var CheckBoxDefaultStyle = {
  "padding":0,
  "borderRadius":2,
  "fontSize":16,
  "borderStyle":"solid",
  "borderWidth":2
};

// js.react-native.helper-theme-default/RadioBoxDefaultTheme [156] 
var RadioBoxDefaultTheme = Object.assign({},BaseTheme);

// js.react-native.helper-theme-default/ToggleSwitchDefaultTheme [160] 
var ToggleSwitchDefaultTheme = Object.assign({},BaseTheme);

var MODULE = {
  "FontSize":FontSize,
  "defaultPressing":defaultPressing,
  "defaultHovering":defaultHovering,
  "PressDefaultPipeline":PressDefaultPipeline,
  "BinaryDefaultPipeline":BinaryDefaultPipeline,
  "InputDefaultPipeline":InputDefaultPipeline,
  "centerFn":centerFn,
  "BaseBg":BaseBg,
  "BaseFg":BaseFg,
  "BaseTheme":BaseTheme,
  "InputDefaultFgTheme":InputDefaultFgTheme,
  "InputDefaultBgTheme":InputDefaultBgTheme,
  "InputDefaultTheme":InputDefaultTheme,
  "InputDefaultStyle":InputDefaultStyle,
  "ButtonDefaultTheme":ButtonDefaultTheme,
  "ButtonDefaultStyle":ButtonDefaultStyle,
  "CheckBoxDefaultTheme":CheckBoxDefaultTheme,
  "CheckBoxDefaultStyle":CheckBoxDefaultStyle,
  "RadioBoxDefaultTheme":RadioBoxDefaultTheme,
  "ToggleSwitchDefaultTheme":ToggleSwitchDefaultTheme
};

export default MODULE