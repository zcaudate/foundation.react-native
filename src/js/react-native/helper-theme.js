import c from './helper-color'

import k from '../../xt/lang/base-lib'

// js.react-native.helper-theme/ThemeLookup [21] 
var ThemeLookup = {
  "bg":{
    "default":"bgNormal",
    "normal":"bgNormal",
    "pressing":"bgPressed",
    "hovering":"bgHovered",
    "active":"bgActive",
    "focusing":"bgActive",
    "disabled":"bgDisabled",
    "highlighted":"bgHighlighted"
  },
  "fg":{
    "default":"fgNormal",
    "normal":"fgNormal",
    "pressing":"fgPressed",
    "hovering":"fgHovered",
    "active":"fgActive",
    "focusing":"fgActive",
    "disabled":"fgDisabled",
    "highlighted":"fgHighlighted"
  }
};

// js.react-native.helper-theme/StageMap [39] 
var StageMap = {
  "pressing":k.identity,
  "focusing":k.identity,
  "active":k.identity,
  "hovering":function (hovering,{pressing}){
    return Math.max(hovering,pressing);
  },
  "disabled":k.identity,
  "highlighted":k.identity
};

// js.react-native.helper-theme/StageStatics [48] 
var StageStatics = {
  "pressing":false,
  "focusing":false,
  "hovering":false,
  "active":false
};

// js.react-native.helper-theme/transformColor [55] 
function transformColor(indValues,theme,type,initial,stages,stageMap){
  initial = (initial || "default");
  let __fns = (null == stageMap) ? StageMap : Object.assign({},StageMap,stageMap);
  let lu = ThemeLookup[type];
  let colorInit = theme[lu[initial]];
  return k.arr_foldl(stages,function (colorOut,stageKey){
    let tf = __fns[stageKey];
    let val = indValues[stageKey];
    let colorStage = theme[lu[stageKey]];
    return c.interpolate([colorOut,colorStage],tf(val,indValues));
  },colorInit);
}

// js.react-native.helper-theme/mergeProps [81] 
function mergeProps(arr){
  let out = {"style":[]};
  for(let e of arr){
    let {style,...rprops} = e || {};
    for(let s of Array.isArray(style) ? style : ((null == style) ? [] : [style])){
      out.style.push(s);
    };
    Object.assign(out,rprops);
  };
  return out;
}

// js.react-native.helper-theme/createCombinedTransformations [94] 
function createCombinedTransformations({theme,themePipeline,transformations = {}}){
  let bgCustom = transformations["bg"] || function (){
    return null;
  };
  let fgCustom = transformations["fg"] || function (){
    return null;
  };
  if(!(k.fnp(bgCustom) && k.fnp(fgCustom))){
    throw "Themed transformations require functions.";
  }
  let {bg,fg} = themePipeline;
  let bgInitial = bg["initial"];
  let bgStages = bg["stages"];
  let bgStageMap = bg["values"];
  let fgInitial = fg["initial"];
  let fgStages = fg["stages"];
  let fgStageMap = fg["values"];
  return function (indValues,chord){
    let bgProps = bgCustom(indValues,chord);
    let fgProps = fgCustom(indValues,chord);
    let bgColor = c.toHSL(
      transformColor(indValues,theme,"bg",bgInitial,bgStages,bgStageMap)
    );
    let fgColor = c.toHSL(
      transformColor(indValues,theme,"fg",fgInitial,fgStages,fgStageMap)
    );
    let styleProps = {
      "style":{
            "backgroundColor":bgColor,
            "color":fgColor,
            "borderColor":chord["outlined"] ? fgColor : bgColor
          }
    };
    return mergeProps([bgProps,fgProps,styleProps]);
  };
}

// js.react-native.helper-theme/createSingleTransformations [128] 
function createSingleTransformations({theme,themePipeline,transformations = {}},type,colorKeys){
  let custom = transformations[type] || function (){
    return null;
  };
  if(!k.fnp(custom)){
    throw "Themed transformations require functions.";
  }
  let pipe = themePipeline[type];
  let initial = pipe["initial"];
  let stages = pipe["stages"];
  let stageMap = pipe["values"];
  return function (indValues,chord){
    let customProps = custom(indValues,chord);
    let color = c.toHSL(
      transformColor(indValues,theme,type,initial,stages,stageMap)
    );
    let style = {};
    for(let key of colorKeys){
      style[key] = color;
    };
    return mergeProps([customProps,{"style":style}]);
  };
}

// js.react-native.helper-theme/combinedStatic [153] 
function combinedStatic({disabled,highlighted,...rprops},more,transformFn){
  let indFn = function (flag){
    return flag ? 1 : 0;
  };
  let chord = Object.assign({},StageStatics,{disabled,highlighted},more);
  let indValues = k.obj_map(chord,indFn);
  return transformFn(indValues,chord)["style"];
}

// js.react-native.helper-theme/prepThemeCombined [171] 
function prepThemeCombined(props){
  let transformFn = createCombinedTransformations(props);
  let styleStatic = combinedStatic(props,{},transformFn);
  return [styleStatic,transformFn];
}

// js.react-native.helper-theme/prepThemeSingle [179] 
function prepThemeSingle(props,type,colorKeys){
  let transformFn = createSingleTransformations(props,type,colorKeys);
  let styleStatic = combinedStatic(props,{},transformFn);
  return [styleStatic,transformFn];
}

var MODULE = {
  "ThemeLookup":ThemeLookup,
  "StageMap":StageMap,
  "StageStatics":StageStatics,
  "transformColor":transformColor,
  "mergeProps":mergeProps,
  "createCombinedTransformations":createCombinedTransformations,
  "createSingleTransformations":createSingleTransformations,
  "combinedStatic":combinedStatic,
  "prepThemeCombined":prepThemeCombined,
  "prepThemeSingle":prepThemeSingle
};

export default MODULE