import React from 'react'

import * as ReactNative from 'react-native'

import RNIcon from 'react-native-vector-icons/Entypo'

import r from '../react'

import n from '../react-native'

import ui_tooltip from './ui-tooltip'

import ext_view from '../react/ext-view'

import k from '../../xt/lang/base-lib'

// js.react-native.ui-autocomplete/AutocompleteModal [15] 
function AutocompleteModal({
  hostRef,
  visible,
  setVisible,
  isBusy,
  styleContainer,
  entries,
  componentBusy = ReactNative.View,
  componentEmpty = ReactNative.View,
  component,
  ...rprops
}){
  let [dims,setDims] = React.useState({});
  React.useEffect(function (){
    n.measureRef(hostRef,setDims);
  },[visible]);
  return (
    <ui_tooltip.Tooltip
      hostRef={hostRef}
      visible={visible}
      setVisible={setVisible}
      position="bottom"
      alignment="start"
      arrow={{"placement":"none"}}>
      <ReactNative.View
        style={[{"width":dims.width},...k.arrayify(styleContainer)]}>
        {isBusy ? React.createElement(componentBusy,rprops) : (k.is_emptyp(entries) ? React.createElement(componentEmpty,rprops) : entries.map(function (entry,i){
          return React.createElement(component,Object.assign({entry,"key":i},rprops));
        }))}
      </ReactNative.View>
    </ui_tooltip.Tooltip>);
}

// js.react-native.ui-autocomplete/Autocomplete [55] 
function Autocomplete({sourceView,sourceInput,...rprops}){
  let entries = ext_view.listenView(sourceView,"success");
  let isBusy = ext_view.listenView(sourceView,"pending");
  let refInput = React.useRef();
  React.useEffect(function (){
    if(!isBusy && !k.eq_nested(sourceInput,refInput.current)){
      ext_view.refresh_args(sourceView,sourceInput);
      refInput.current = sourceInput;
    }
  },[sourceInput,isBusy]);
  return React.createElement(AutocompleteModal,Object.assign({entries,isBusy},rprops));
}

var MODULE = {
  "AutocompleteModal":AutocompleteModal,
  "Autocomplete":Autocomplete
};

export default MODULE