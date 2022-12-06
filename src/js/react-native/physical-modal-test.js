import React from 'react'

import * as ReactNative from 'react-native'

import n from '../react-native'

// js.react-native.physical-modal-test/GetPositionDemo [22] 
function GetPositionDemo(){
  let boxRef = React.useRef();
  let [display,setDisplay] = React.useState();
  let [width,setWidth] = React.useState(100);
  let [height,setHeight] = React.useState(50);
  React.useEffect(function (){
    n.measureRef(boxRef,setDisplay);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-modal-test/GetPositionDemo"
      code={function (){
        return "(\n  <n.Row style={{\"marginBottom\":10}}>\n    <ReactNative.Button\n      title=\"RAND\"\n      onPress={function (){\n        setWidth(Math.floor(100 * Math.random()));\n        setHeight(Math.floor(50 * Math.random()));\n        new Promise(function (resolve,reject){\n          setTimeout(function (){\n            try{\n              resolve(        (function (){\n                        n.measureRef(boxRef,setDisplay);\n                      })());\n            }\n            catch(e){\n              reject(e);\n            }\n          },100);\n        });\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"MEASURE\"\n      onPress={function (){\n        return n.measureRef(boxRef,setDisplay);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <n.Row style={{\"height\":height,\"backgroundColor\":\"green\"}}></n.Row>);\n(\n  <n.Row>\n    <ReactNative.View style={{\"width\":width,\"backgroundColor\":\"green\"}}></ReactNative.View>\n    <ReactNative.View\n      ref={boxRef}\n      style={{\"height\":100,\"width\":100,\"backgroundColor\":\"red\"}}>\n    </ReactNative.View>\n    <n.TextDisplay content={n.format_obj(display)}></n.TextDisplay>\n  </n.Row>);";
      }()}>
      <n.Row style={{"marginBottom":10}}>
        <ReactNative.Button
          title="RAND"
          onPress={function (){
            setWidth(Math.floor(100 * Math.random()));
            setHeight(Math.floor(50 * Math.random()));
            new Promise(function (resolve,reject){
              setTimeout(function (){
                try{
                  resolve(        (function (){
                            n.measureRef(boxRef,setDisplay);
                          })());
                }
                catch(e){
                  reject(e);
                }
              },100);
            });
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="MEASURE"
          onPress={function (){
            return n.measureRef(boxRef,setDisplay);
          }}>
        </ReactNative.Button>
      </n.Row>
      <n.Row style={{"height":height,"backgroundColor":"green"}}></n.Row>
      <n.Row>
        <ReactNative.View style={{"width":width,"backgroundColor":"green"}}></ReactNative.View>
        <ReactNative.View
          ref={boxRef}
          style={{"height":100,"width":100,"backgroundColor":"red"}}>
        </ReactNative.View>
        <n.TextDisplay content={n.format_obj(display)}></n.TextDisplay>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.physical-modal-test/DisplayModalDemo [69] 
function DisplayModalDemo(){
  let boxRef = React.useRef();
  let [showModal,setShowModal] = React.useState();
  let [display,setDisplay] = React.useState({"width":100,"height":100,"px":0,"py":0});
  React.useEffect(function (){
    n.measureRef(boxRef,setDisplay);
    setShowModal(false);
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.physical-modal-test/displayModalDemo"
      code={function (){
        return "(\n  <n.Row style={{\"marginBottom\":10}}>\n    <ReactNative.Button\n      title=\"DISPLAY\"\n      onPress={function (){\n        n.measureRef(boxRef,setDisplay);\n        setShowModal(true);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"MEASURE\"\n      onPress={function (){\n        return n.measureRef(boxRef,setDisplay);\n      }}>\n    </ReactNative.Button>\n  </n.Row>);\n(\n  <ReactNative.View\n    ref={boxRef}\n    style={{\"height\":100,\"width\":100,\"backgroundColor\":\"red\"}}>\n  </ReactNative.View>);\n(\n  <n.TextDisplay content={n.format_obj(display)}></n.TextDisplay>);\n(\n  <ReactNative.Modal\n    visible={showModal}\n    animationType=\"fade\"\n    transparent={true}\n    onRequestClose={function (){\n      return setShowModal(false);\n    }}>\n    <ReactNative.TouchableWithoutFeedback\n      style={{\"flex\":1}}\n      onPress={function (){\n        return setShowModal(false);\n      }}>\n      <ReactNative.View style={{\"flex\":1}}>\n        <ReactNative.View\n          style={{\n            \"position\":\"absolute\",\n            \"top\":display.py,\n            \"left\":display.px + display.width\n          }}>\n          <ReactNative.Button\n            title=\"MODAL\"\n            onPress={function (){\n              return null;\n            }}>\n          </ReactNative.Button>\n        </ReactNative.View>\n      </ReactNative.View>\n    </ReactNative.TouchableWithoutFeedback>\n  </ReactNative.Modal>);";
      }()}>
      <n.Row style={{"marginBottom":10}}>
        <ReactNative.Button
          title="DISPLAY"
          onPress={function (){
            n.measureRef(boxRef,setDisplay);
            setShowModal(true);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="MEASURE"
          onPress={function (){
            return n.measureRef(boxRef,setDisplay);
          }}>
        </ReactNative.Button>
      </n.Row>
      <ReactNative.View
        ref={boxRef}
        style={{"height":100,"width":100,"backgroundColor":"red"}}>
      </ReactNative.View>
      <n.TextDisplay content={n.format_obj(display)}></n.TextDisplay>
      <ReactNative.Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={function (){
          return setShowModal(false);
        }}>
        <ReactNative.TouchableWithoutFeedback
          style={{"flex":1}}
          onPress={function (){
            return setShowModal(false);
          }}>
          <ReactNative.View style={{"flex":1}}>
            <ReactNative.View
              style={{
                "position":"absolute",
                "top":display.py,
                "left":display.px + display.width
              }}>
              <ReactNative.Button
                title="MODAL"
                onPress={function (){
                  return null;
                }}>
              </ReactNative.Button>
            </ReactNative.View>
          </ReactNative.View>
        </ReactNative.TouchableWithoutFeedback>
      </ReactNative.Modal>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "GetPositionDemo":GetPositionDemo,
  "DisplayModalDemo":DisplayModalDemo
};

export default MODULE