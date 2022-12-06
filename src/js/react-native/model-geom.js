import k from '../../xt/lang/base-lib'

// js.react-native.model-geom/POSITION [15] 
var POSITION = {
  "top":{"opposite":"bottom","sides":["left","right"]},
  "bottom":{"opposite":"top","sides":["right","left"]},
  "left":{"opposite":"right","sides":["bottom","top"]},
  "right":{"opposite":"left","sides":["top","bottom"]}
};

// js.react-native.model-geom/oppositePosition [25] 
function oppositePosition(position){
  return k.get_in(POSITION,[position,"opposite"]);
}

// js.react-native.model-geom/triangleBaseStyle [31] 
function triangleBaseStyle(color,point,baseLength,baseHeight){
  let {opposite,sides} = POSITION[point];
  let [s0,s1] = sides;
  let Point = k.capitalize(point);
  let Opposite = k.capitalize(opposite);
  let S0 = k.capitalize(s0);
  let S1 = k.capitalize(s1);
  return {
    ["border" + Point + "Width"]:0,
    ["border" + Opposite + "Width"]:baseHeight,
    ["border" + S0 + "Width"]:baseLength * 0.5,
    ["border" + S1 + "Width"]:baseLength * 0.5,
    ["border" + Point + "Color"]:"transparent",
    ["border" + Opposite + "Color"]:color,
    ["border" + S0 + "Color"]:"transparent",
    ["border" + S1 + "Color"]:"transparent"
  };
}

var MODULE = {
  "POSITION":POSITION,
  "oppositePosition":oppositePosition,
  "triangleBaseStyle":triangleBaseStyle
};

export default MODULE