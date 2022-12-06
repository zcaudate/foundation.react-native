import React from 'react'

import * as ReactNative from 'react-native'

import k from '../../xt/lang/base-lib'

import a from './animate'

import model_roller from './model-roller'

// js.react-native.helper-roller/useRoller [12] 
function useRoller({index = 0,radius = 10,items,divisions}){
  let labels = React.useCallback(k.arr_map(k.arr_range(divisions),function (i){
    return new ReactNative.Animated.Value(i);
  }),[]);
  let labelsLu = React.useCallback(k.arr_juxt(labels,function (v){
    return "i" + v._value;
  },k.identity),[]);
  let indexRef = React.useRef(index);
  React.useEffect(function (){
    indexRef.current = index;
  },[index]);
  let offset = a.useIndexIndicator(index,{"default":{"duration":150}},function (progress,{status}){
    if(status == "stopped"){
      model_roller.roller_set_values(labels,divisions,indexRef.current,(items).length);
    }
  });
  let modelFn = React.useCallback(model_roller.roller_model(divisions,radius),[]);
  React.useEffect(function (){
    model_roller.roller_set_values(labels,divisions,index,(items).length);
  },[]);
  return {labels,labelsLu,modelFn,offset};
}

var MODULE = {"useRoller":useRoller};

export default MODULE