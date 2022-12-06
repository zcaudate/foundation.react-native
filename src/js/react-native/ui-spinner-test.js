import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

import ui_spinner from './ui-spinner'

// js.react-native.ui-spinner-test/SpinnerStaticDemo [24] 
function SpinnerStaticDemo(){
  let [text,setText] = React.useState(".");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-spinner/SpinnerStatic"
      code={function (){
        return "(\n  <n.Row>\n    <n.Row style={{\"backgroundColor\":\"#eee\",\"flex\":1,\"padding\":10}}>\n      <ui_spinner.SpinnerStatic text={text}></ui_spinner.SpinnerStatic>\n    </n.Row>\n  </n.Row>);";
      }()}>
      <n.Row>
        <n.Row style={{"backgroundColor":"#eee","flex":1,"padding":10}}>
          <ui_spinner.SpinnerStatic text={text}></ui_spinner.SpinnerStatic>
        </n.Row>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-spinner-test/SpinnerDigitDemo [42] 
function SpinnerDigitDemo(){
  let [index,setIndex] = React.useState(5);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-spinner/SpinnerDigit"
      code={function (){
        return "(\n  <n.Row>\n    <n.Row style={{\"backgroundColor\":\"#eee\",\"flex\":1,\"padding\":10}}>\n      <ui_spinner.SpinnerDigit index={index}></ui_spinner.SpinnerDigit>\n    </n.Row>\n    <n.Row>\n      <ReactNative.Button\n        title=\"+1\"\n        onPress={function (){\n          return setIndex(index + 1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Button\n        title=\"-1\"\n        onPress={function (){\n          return setIndex(index - 1);\n        }}>\n      </ReactNative.Button>\n    </n.Row>\n  </n.Row>);";
      }()}>
      <n.Row>
        <n.Row style={{"backgroundColor":"#eee","flex":1,"padding":10}}>
          <ui_spinner.SpinnerDigit index={index}></ui_spinner.SpinnerDigit>
        </n.Row>
        <n.Row>
          <ReactNative.Button
            title="+1"
            onPress={function (){
              return setIndex(index + 1);
            }}>
          </ReactNative.Button>
          <ReactNative.Button
            title="-1"
            onPress={function (){
              return setIndex(index - 1);
            }}>
          </ReactNative.Button>
        </n.Row>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-spinner-test/SpinnerValuesDemo [67] 
function SpinnerValuesDemo(){
  let [value,setValue] = React.useState(155);
  let [max,min,step,decimal] = [100,0,1,2];
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-spinner/SpinnerValues"
      code={function (){
        return "(\n  <n.Row>\n    <n.Row style={{\"backgroundColor\":\"#eee\",\"flex\":1,\"padding\":10}}>\n      <ui_spinner.SpinnerValues step={step} min={min} value={value} max={max} decimal={decimal}></ui_spinner.SpinnerValues>\n    </n.Row>\n    <n.Row>\n      <ReactNative.Button\n        title=\"+1\"\n        onPress={function (){\n          return setValue(value + 1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Button\n        title=\"-1\"\n        onPress={function (){\n          return setValue(value - 1);\n        }}>\n      </ReactNative.Button>\n    </n.Row>\n  </n.Row>);";
      }()}>
      <n.Row>
        <n.Row style={{"backgroundColor":"#eee","flex":1,"padding":10}}>
          <ui_spinner.SpinnerValues step={step} min={min} value={value} max={max} decimal={decimal}></ui_spinner.SpinnerValues>
        </n.Row>
        <n.Row>
          <ReactNative.Button
            title="+1"
            onPress={function (){
              return setValue(value + 1);
            }}>
          </ReactNative.Button>
          <ReactNative.Button
            title="-1"
            onPress={function (){
              return setValue(value - 1);
            }}>
          </ReactNative.Button>
        </n.Row>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.ui-spinner-test/SpinnerDemo [96] 
function SpinnerDemo(){
  let [value,setValue] = React.useState(155);
  let [max,min,step,decimal] = [100,0,1,2];
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.ui-spinner/Spinner"
      code={function (){
        return "(\n  <n.Row>\n    <n.Row style={{\"backgroundColor\":\"#eee\",\"flex\":1,\"padding\":10}}>\n      <ui_spinner.Spinner\n        step={step}\n        min={min}\n        value={value}\n        setValue={setValue}\n        max={max}\n        decimal={decimal}>\n      </ui_spinner.Spinner>\n    </n.Row>\n    <n.Row>\n      <ReactNative.Button\n        title=\"+1\"\n        onPress={function (){\n          return setValue(value + 1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Button\n        title=\"-1\"\n        onPress={function (){\n          return setValue(value - 1);\n        }}>\n      </ReactNative.Button>\n    </n.Row>\n  </n.Row>);";
      }()}>
      <n.Row>
        <n.Row style={{"backgroundColor":"#eee","flex":1,"padding":10}}>
          <ui_spinner.Spinner
            step={step}
            min={min}
            value={value}
            setValue={setValue}
            max={max}
            decimal={decimal}>
          </ui_spinner.Spinner>
        </n.Row>
        <n.Row>
          <ReactNative.Button
            title="+1"
            onPress={function (){
              return setValue(value + 1);
            }}>
          </ReactNative.Button>
          <ReactNative.Button
            title="-1"
            onPress={function (){
              return setValue(value - 1);
            }}>
          </ReactNative.Button>
        </n.Row>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "SpinnerStaticDemo":SpinnerStaticDemo,
  "SpinnerDigitDemo":SpinnerDigitDemo,
  "SpinnerValuesDemo":SpinnerValuesDemo,
  "SpinnerDemo":SpinnerDemo
};

export default MODULE