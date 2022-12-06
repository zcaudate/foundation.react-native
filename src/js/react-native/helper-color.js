import c from '../../xt/lang/util-color'

import k from '../../xt/lang/base-lib'

// js.react-native.helper-color/toHSL [21] 
function toHSL(x){
  if("string" == (typeof x)){
    return x;
  }
  else if(k.arrp(x)){
    let [h,s,l] = x;
    return "hsl(" + Math.floor(h) + "," + s.toFixed(2) + "%," + l.toFixed(2) + "%" + ")";
  }
}

// js.react-native.helper-color/hsl-parse-raw [35] 
function hsl_parse_raw(s,n,parseFn){
  let curr = s.substring(n);
  let arr = curr.split(/[,\(\)\%\s]/);
  return arr.filter(function (s){
    return (s).length > 0;
  }).splice(0,3).map(function (s){
    return parseFn(s);
  });
}

// js.react-native.helper-color/hsl-parse [45] 
function hsl_parse(s){
  let parse_rgb = function (str,n){
    return c.rgb__gthsl(hsl_parse_raw(str,n,Number.parseInt));
  };
  if(s.startsWith("#")){
    return c.hex__gthsl(s);
  }
  else if(s.startsWith("rgb(")){
    return parse_rgb(s,3);
  }
  else if(s.startsWith("rgba(")){
    return parse_rgb(s,4);
  }
  else if(s.startsWith("hsl(")){
    return hsl_parse_raw(s,3,Number.parseFloat);
  }
  else if(s.startsWith("hsla(")){
    return hsl_parse_raw(s,4,Number.parseFloat);
  }
  else{
    try{
      return c.named__gthsl(s);
    }
    catch(e){
      return [0,0,0];
    }
  }
}

// js.react-native.helper-color/hsl [73] 
function hsl(s){
  if(k.arrp(s)){
    return s;
  }
  else if("string" == (typeof s)){
    return hsl_parse(s);
  }
  else{
    return s;
  }
}

// js.react-native.helper-color/interpolateScalar [90] 
function interpolateScalar(from,to,fraction){
  return (from || 0) + (fraction * ((to || 0) - (from || 0)));
}

// js.react-native.helper-color/interpolateValue [97] 
function interpolateValue(from,to,fraction){
  if(k.fnp(from)){
    return interpolateScalar(from(to),to,fraction);
  }
  else if(k.fnp(to)){
    return interpolateScalar(from,to(from),fraction);
  }
  else{
    return interpolateScalar(from,to,fraction);
  }
}

// js.react-native.helper-color/interpolateNum [110] 
function interpolateNum(v,num){
  if((num < 1) && (num > 0)){
    return num * v;
  }
  else if((num > -1) && (num < 0)){
    return 100 + ((100 - v) * num);
  }
  else{
    return num + v;
  }
}

// js.react-native.helper-color/interpolateColorArray [125] 
function interpolateColorArray(from,to){
  if("number" == (typeof to)){
    return [from,[from[0],from[1],interpolateNum(from[2],to)]];
  }
  else if("number" == (typeof from)){
    return [[to[0],to[1],interpolateNum(to[2],from)],to];
  }
  else if(k.fnp(to)){
    return [from,[from[0],from[1],to]];
  }
  else if(k.fnp(from)){
    return [[to[0],to[1],from],to];
  }
  else if(null == to){
    return [from,from];
  }
  else if(null == from){
    return [to,to];
  }
  else if(to[1] == 0){
    return [from,[from[0],to[1],to[2]]];
  }
  else if(from[1] == 0){
    return [[to[0],from[1],from[2]],to];
  }
  else{
    return [from,to];
  }
}

// js.react-native.helper-color/interpolateColor [174] 
function interpolateColor(from,to,fraction){
  let [fromArr,toArr] = interpolateColorArray(hsl(from),hsl(to));
  if(fromArr){
    return fromArr.map(function (v,i){
      return interpolateValue(v,toArr[i],fraction);
    });
  }
  return toArr || [0,0,0];
}

// js.react-native.helper-color/interpolate [191] 
function interpolate(arr,num){
  let i = Math.max(0,Math.ceil(num - 1));
  let fraction = num - i;
  let from = arr[i];
  let to = arr[i + 1];
  return interpolateColor(from,to,fraction);
}

// js.react-native.helper-color/rotateHue [203] 
function rotateHue(color,fraction){
  let [h,s,l] = hsl(color);
  return toHSL([(h + (360 * fraction)) % 360,s,l]);
}

// js.react-native.helper-color/saturate [212] 
function saturate(color,fraction){
  let [h,s,l] = hsl(color);
  return toHSL([h,interpolateNum(s,fraction),l]);
}

// js.react-native.helper-color/lighten [219] 
function lighten(color,fraction){
  let [h,s,l] = hsl(color);
  return toHSL([h,s,interpolateNum(l,fraction)]);
}

// js.react-native.helper-color/transform [226] 
function transform(color,[hf,sf,lf]){
  let [h,s,l] = hsl(color);
  return toHSL([
    (h + (360 * hf)) % 360,
    interpolateNum(s,sf),
    interpolateNum(l,lf)
  ]);
}

// js.react-native.helper-color/mix [240] 
function mix(arr,num){
  return toHSL(interpolate(arr,num));
}

// js.react-native.helper-color/toRGB [246] 
function toRGB(s){
  let arr = c.hsl__gtrgb(hsl_parse(s));
  return arr, "#" + arr.map(function (x){
    return x.toString(16).padStart("0",2);
  }).join("");
}

var MODULE = {
  "toHSL":toHSL,
  "hsl_parse_raw":hsl_parse_raw,
  "hsl_parse":hsl_parse,
  "hsl":hsl,
  "interpolateScalar":interpolateScalar,
  "interpolateValue":interpolateValue,
  "interpolateNum":interpolateNum,
  "interpolateColorArray":interpolateColorArray,
  "interpolateColor":interpolateColor,
  "interpolate":interpolate,
  "rotateHue":rotateHue,
  "saturate":saturate,
  "lighten":lighten,
  "transform":transform,
  "mix":mix,
  "toRGB":toRGB
};

export default MODULE