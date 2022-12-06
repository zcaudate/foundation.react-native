import k from '../../xt/lang/base-lib'

// js.react-native.model-context/innerCoordinate [15] 
function innerCoordinate({position,parent,height,width,margin = 0}){
  height = (height || (parent.height - (2 * margin)));
  width = (width || (parent.width - (2 * margin)));
  let out = {height,width};
  if(position == "centered"){
    Object.assign(out,{
      "top":(parent.height - height) / 2,
      "left":(parent.width - width) / 2
    });
  }
  else if(position == "top"){
    Object.assign(out,{"top":margin,"left":(parent.width - width) / 2});
  }
  else if(position == "bottom"){
    Object.assign(out,{
      "top":parent.height - height - margin,
      "left":(parent.width - width) / 2
    });
  }
  else if(position == "left"){
    Object.assign(out,{"top":(parent.height - height) / 2,"left":margin});
  }
  else if(position == "right"){
    Object.assign(out,{
      "top":(parent.height - height) / 2,
      "left":parent.width - width - margin
    });
  }
  else if(position == "top_right"){
    Object.assign(out,{"top":margin,"left":parent.width - width - margin});
  }
  else if(position == "bottom_right"){
    Object.assign(out,{
      "top":parent.height - height - margin,
      "left":parent.width - width - margin
    });
  }
  else if(position == "bottom_left"){
    Object.assign(out,{"top":parent.height - height - margin,"left":margin});
  }
  else if(position == "top_left"){
    Object.assign(out,{"top":margin,"left":margin});
  }
  return out;
}

// js.react-native.model-context/contextCoordinateMain [67] 
function contextCoordinateMain({content,host,margin,position}){
  if(position == "top"){
    return {"top":0 - margin - content.height};
  }
  else if(position == "bottom"){
    return {"top":margin + host.height};
  }
  else if(position == "left"){
    return {"left":0 - margin - content.width};
  }
  else if(position == "left_edge"){
    return {"left":margin};
  }
  else if(position == "right"){
    return {"left":margin + host.width};
  }
  else if(position == "right_edge"){
    return {"left":host.width - margin - content.width};
  }
  else if(position == "centered"){
    return {"left":(host.width - content.width) / 2};
  }
}

// js.react-native.model-context/contextCoordinateCross [99] 
function contextCoordinateCross({alignment,content,host,marginCross,position}){
  if((position == "top") || (position == "bottom")){
    if(alignment == "start"){
      return {"left":marginCross};
    }
    else if(alignment == "center"){
      return {"left":(host.width - content.width) / 2};
    }
    else if(alignment == "end"){
      return {"left":host.width - content.width - marginCross};
    }
  }
  else{
    if(alignment == "start"){
      return {"top":marginCross};
    }
    else if(alignment == "center"){
      return {"top":(host.height - content.height) / 2};
    }
    else if(alignment == "end"){
      return {"top":host.height - content.height - marginCross};
    }
  }
}

// js.react-native.model-context/contextCoordinate [136] 
function contextCoordinate({position,alignment,margin = 0,marginCross = 0,host,content}){
  let e = {alignment,content,host,margin,marginCross,position};
  return Object.assign(contextCoordinateMain(e),contextCoordinateCross(e));
}

// js.react-native.model-context/getTranslationOffset [161] 
function getTranslationOffset({transition,position,height,width,margin = 0}){
  let [translateKey,magnitude] = (transition == "from_bottom") ? ["translateY",margin + margin + height] : ((transition == "from_left") ? ["translateX",0 - margin - margin - width] : ((transition == "from_right") ? ["translateX",margin + margin + width] : ((transition == "from_top") ? ["translateY",0 - margin - margin - height] : [])));
  return [translateKey,magnitude];
}

// js.react-native.model-context/getScalarFn [186] 
function getScalarFn(effect,key){
  let scalar = (effect || {})[key];
  if("number" == (typeof scalar)){
    return function (visible){
      return k.mix(scalar,1,visible);
    };
  }
}

// js.react-native.model-context/ANIMATE [199] 
var ANIMATE = {
  "from_top":{
    "aspect":"height",
    "transform":"translateY",
    "type":"negative",
    "counter":"from_bottom"
  },
  "from_bottom":{
    "aspect":"height",
    "transform":"translateY",
    "type":"positive",
    "counter":"from_top"
  },
  "from_left":{
    "aspect":"width",
    "transform":"translateX",
    "type":"negative",
    "counter":"from_right"
  },
  "from_right":{
    "aspect":"width",
    "transform":"translateX",
    "type":"positive",
    "counter":"from_left"
  },
  "flip_horizontal":{
    "transform":"rotateY",
    "out":function (progress){
      k.mix(0,Math.PI,progress) + "rad";
    },
    "in":function (progress){
      k.mix(-Math.PI,0,progress) + "rad";
    },
    "counter":"flip_vertical"
  },
  "flip_vertical":{
    "transform":"rotateX",
    "out":function (progress){
      k.mix(0,Math.PI,progress) + "rad";
    },
    "in":function (progress){
      k.mix(-Math.PI,0,progress) + "rad";
    },
    "counter":"flip_horizontal"
  }
};

// js.react-native.model-context/EFFECTS [233] 
var EFFECTS = {
  "zoom":{"default":0.3,"transform":"scale"},
  "fade":{"default":0.3,"aspect":"opacity"}
};

// js.react-native.model-context/animateOffset [239] 
function animateOffset({height,margin,width},entry){
  let {aspect,type} = entry;
  let offset = margin + margin + ((aspect == "width") ? width : height);
  if(type == "negative"){
    offset = (-offset);
  }
  return offset;
}

// js.react-native.model-context/animateIn [252] 
function animateIn({transition,height,width,margin = 0}){
  let entry = ANIMATE[transition];
  if(!entry){
    return function (){
      return null;
    };
  }
  let {transform} = entry;
  let createInFn = function (entry){
    let offset = animateOffset({height,margin,width},entry);
    return function (progress){
      return {[transform]:k.mix(offset,0,progress)};
    };
  };
  return entry["in"] || createInFn(entry);
}

// js.react-native.model-context/animateOut [276] 
function animateOut({transition,height,width,margin = 0}){
  let entry = ANIMATE[transition];
  if(!entry){
    return function (){
      return null;
    };
  }
  let {transform} = entry;
  let createInFn = function (entry){
    let offset = animateOffset({height,margin,width},entry);
    return function (progress){
      return {[transform]:k.mix(0,offset,progress)};
    };
  };
  return entry["out"] || createInFn(entry);
}

var MODULE = {
  "innerCoordinate":innerCoordinate,
  "contextCoordinateMain":contextCoordinateMain,
  "contextCoordinateCross":contextCoordinateCross,
  "contextCoordinate":contextCoordinate,
  "getTranslationOffset":getTranslationOffset,
  "getScalarFn":getScalarFn,
  "ANIMATE":ANIMATE,
  "EFFECTS":EFFECTS,
  "animateOffset":animateOffset,
  "animateIn":animateIn,
  "animateOut":animateOut
};

export default MODULE