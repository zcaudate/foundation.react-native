import k from '../../xt/lang/base-lib'

// js.react-native.model-roller/roller-model [48] 
function roller_model(divisions,radius){
  let UNIT = 2 * (Math.PI / divisions);
  let HALF_PI = Math.PI / 2;
  return function (offset){
    let raw = k.mod_pos(offset,divisions);
    let theta = raw * UNIT;
    let visible = (Math.abs(theta) < HALF_PI) || (Math.abs(theta) > (3 * HALF_PI));
    return {
      "raw":raw,
      "visible":visible,
      "offset":offset,
      "theta":theta,
      "translate":radius * Math.sin(theta),
      "scale":Math.abs(Math.cos(theta))
    };
  };
}

// js.react-native.model-roller/roller-shifted-norm [67] 
function roller_shifted_norm(divisions,roller_index,center){
  let shifted = roller_index - center;
  let shifted_mod = k.mod_pos(shifted,divisions);
  let shifted_norm = (shifted_mod < (divisions / 2)) ? shifted_mod : (shifted_mod - divisions);
  return shifted_norm;
}

// js.react-native.model-roller/roller-shifted-index [80] 
function roller_shifted_index(divisions,roller_index,input_raw,input_total){
  let input_index = k.mod_pos(input_raw,input_total);
  let center = k.mod_pos(input_raw,divisions);
  let shifted_norm = roller_shifted_norm(divisions,roller_index,center);
  let shifted_index = k.mod_pos(input_index + shifted_norm,input_total);
  return shifted_index;
}

// js.react-native.model-roller/roller-set-values [102] 
function roller_set_values(ind_array,divisions,input_raw,input_total){
  for(let i = 0; i < ind_array.length; ++i){
    let ind = ind_array[i];
    let shifted = roller_shifted_index(divisions,i,input_raw,input_total);
    if(shifted != ind._value){
      ind.setValue(shifted);
    }
  };
  return true;
}

var MODULE = {
  "roller_model":roller_model,
  "roller_shifted_norm":roller_shifted_norm,
  "roller_shifted_index":roller_shifted_index,
  "roller_set_values":roller_set_values
};

export default MODULE