import React from 'react'

import * as ReactNative from 'react-native'

import r from '../react'

import n from '../react-native'

import a from './animate'

import event_animate from '../../xt/lang/event-animate'

import k from '../../xt/lang/base-lib'

// js.react-native.animate-test/ValDemo [29] 
function ValDemo(){
  let ind = React.useCallback(new ReactNative.Animated.Value(1),[]);
  let textRef = a.useListenSingle(ind,function (v){
    return {"text":"ind: " + v.toFixed(2)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/val"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"-1\"\n      onPress={function (){\n        ind.setValue(ind._value - 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ReactNative.Button\n      title=\"+1\"\n      onPress={function (){\n        ind.setValue(ind._value + 1);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="-1"
          onPress={function (){
            ind.setValue(ind._value - 1);
          }}>
        </ReactNative.Button>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ReactNative.Button
          title="+1"
          onPress={function (){
            ind.setValue(ind._value + 1);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/CreateTransitionDemo [90] 
function CreateTransitionDemo(){
  let ind = React.useCallback(new ReactNative.Animated.Value(0),[]);
  let offFn = React.useCallback(a.createTransition(ind,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  },[30,0],k.identity),[]);
  let onFn = React.useCallback(a.createTransition(ind,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  },[0,30],k.identity),[]);
  let textRef = a.useListenSingle(ind,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/createTransition"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        if(ind._value < 15){\n          onFn();\n        }\n        else{\n          offFn();\n        }\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            if(ind._value < 15){
              onFn();
            }
            else{
              offFn();
            }
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/DeriveDemo [133] 
function DeriveDemo(){
  let ind = React.useCallback(new ReactNative.Animated.Value(1),[]);
  let ind2 = a.derive(function (v){
    return 2 * v;
  },[ind]);
  let textRef = a.useListenArray([ind,ind2],function (v,v2){
    return {
      "text":(" ind: " + v.toFixed(2)) + (", ind2: " + v2.toFixed(2))
    };
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/val"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"-1\"\n      onPress={function (){\n        ind.setValue(ind._value - 1);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View style={{\"width\":10}}></ReactNative.View>\n    <ReactNative.Button\n      title=\"+1\"\n      onPress={function (){\n        ind.setValue(ind._value + 1);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":200,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="-1"
          onPress={function (){
            ind.setValue(ind._value - 1);
          }}>
        </ReactNative.Button>
        <ReactNative.View style={{"width":10}}></ReactNative.View>
        <ReactNative.Button
          title="+1"
          onPress={function (){
            ind.setValue(ind._value + 1);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":200,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/ListenSingleDemo [168] 
function ListenSingleDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = React.useRef();
  React.useEffect(function (){
    a.listenSingle(textRef,ind,function (ind){
      return {"text":ind.toFixed(2)};
    });
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/listenSingle"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseListenSingleDemo [202] 
function UseListenSingleDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = a.useListenSingle(ind,function (ind){
    return {"text":ind.toFixed(2)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useListenSingle"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/ListenArrayDemo [233] 
function ListenArrayDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let ind2 = a.derive(function (v){
    return -(2 * v);
  },[ind]);
  let textRef = React.useRef();
  React.useEffect(function (){
    a.listenArray(textRef,[ind,ind2],function (v,v2){
      return {"text":"[" + v.toFixed(2) + ", " + v2.toFixed(2) + "]"};
    });
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/listenArray"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n      }}>\n    </ReactNative.Button>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
          }}>
        </ReactNative.Button>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseListenArrayDemo [273] 
function UseListenArrayDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let [index,setIndex] = React.useState(1);
  let ind2 = a.useIndexIndicator(index,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = a.useListenArray([ind,ind2],function (v,v2){
    return {"text":"[" + v.toFixed(2) + ", " + v2.toFixed(2) + "]"};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useListenArray"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text style={{\"width\":300}}>\n      <ReactNative.Button\n        title=\"P\"\n        color=\"red\"\n        onPress={function (){\n          setActive(!active);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"1\"\n        color={(index == 1) ? \"black\" : null}\n        onPress={function (){\n          setIndex(1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"2\"\n        color={(index == 2) ? \"black\" : null}\n        onPress={function (){\n          setIndex(2);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text style={{"width":300}}>
          <ReactNative.Button
            title="P"
            color="red"
            onPress={function (){
              setActive(!active);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="1"
            color={(index == 1) ? "black" : null}
            onPress={function (){
              setIndex(1);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="2"
            color={(index == 2) ? "black" : null}
            onPress={function (){
              setIndex(2);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/ListenMapDemo [328] 
function ListenMapDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let [index,setIndex] = React.useState(1);
  let ind2 = a.useIndexIndicator(index,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = React.useRef();
  React.useEffect(function (){
    a.listenMap(textRef,{"ind":ind,"ind2":ind2},function ({ind,ind2}){
      return {"text":"[" + ind.toFixed(2) + ", " + ind2.toFixed(2) + "]"};
    });
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/listenMap"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text style={{\"width\":300}}>\n      <ReactNative.Button\n        title=\"P\"\n        color=\"red\"\n        onPress={function (){\n          setActive(!active);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"1\"\n        color={(index == 1) ? \"black\" : null}\n        onPress={function (){\n          setIndex(1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"2\"\n        color={(index == 2) ? \"black\" : null}\n        onPress={function (){\n          setIndex(2);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text style={{"width":300}}>
          <ReactNative.Button
            title="P"
            color="red"
            onPress={function (){
              setActive(!active);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="1"
            color={(index == 1) ? "black" : null}
            onPress={function (){
              setIndex(1);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="2"
            color={(index == 2) ? "black" : null}
            onPress={function (){
              setIndex(2);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/ListenTransformationsDemo [387] 
function ListenTransformationsDemo(){
  let [active,setActive] = React.useState(1);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let [index,setIndex] = React.useState(1);
  let ind2 = a.useIndexIndicator(index,{
    "default":{
        "type":"timing",
        "duration":200,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = React.useRef();
  React.useEffect(function (){
    a.listenTransformations(textRef,{"ind":ind,"ind2":ind2},function ({ind,ind2}){
      return {"text":"[" + ind.toFixed(2) + ", " + ind2.toFixed(2) + "]"};
    },function (){
      return {};
    });
  },[]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/listenTransformations"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text style={{\"width\":300}}>\n      <ReactNative.Button\n        title=\"P\"\n        color=\"red\"\n        onPress={function (){\n          setActive(!active);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"1\"\n        color={(index == 1) ? \"black\" : null}\n        onPress={function (){\n          setIndex(1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"2\"\n        color={(index == 2) ? \"black\" : null}\n        onPress={function (){\n          setIndex(2);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <n.Fill></n.Fill>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text style={{"width":300}}>
          <ReactNative.Button
            title="P"
            color="red"
            onPress={function (){
              setActive(!active);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="1"
            color={(index == 1) ? "black" : null}
            onPress={function (){
              setIndex(1);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="2"
            color={(index == 2) ? "black" : null}
            onPress={function (){
              setIndex(2);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <n.Fill></n.Fill>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/RunWithCancelDemo [447] 
function RunWithCancelDemo(){
  let [active,setActive] = React.useState(true);
  let {check_fn,indicator,one_fn,zero_fn} = React.useCallback(event_animate.make_binary_transitions(a.IMPL,active,{
    "default":{
        "type":"timing",
        "duration":1000,
        "easing":ReactNative.Easing.linear
      }
  }),[]);
  let progressing = React.useCallback(event_animate.new_progressing(),[]);
  let boxRef = a.useListenSingle(indicator,function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenSingle(indicator,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/runWithCancel"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n        if(active){\n          a.runWithCancel(zero_fn,progressing);\n        }\n        else{\n          a.runWithCancel(one_fn,progressing);\n        }\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"red\"}]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
            if(active){
              a.runWithCancel(zero_fn,progressing);
            }
            else{
              a.runWithCancel(one_fn,progressing);
            }
          }}>
        </ReactNative.Button>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[{"width":1.2,"height":20,"backgroundColor":"red"}]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/RunWithOneDemo [499] 
function RunWithOneDemo(){
  let [active,setActive] = React.useState(true);
  let progressing = React.useCallback(event_animate.new_progressing(),[]);
  let [progressView,setProgressView] = React.useState(progressing);
  let {check_fn,indicator,one_fn,zero_fn} = React.useCallback(event_animate.make_binary_transitions(a.IMPL,active,{
    "default":{
        "type":"timing",
        "duration":1000,
        "easing":ReactNative.Easing.linear
      }
  }),[]);
  let boxRef = a.useListenSingle(indicator,function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenSingle(indicator,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/runWithOne"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n        if(active){\n          a.runWith(\"chained-one\",zero_fn,progressing,function (){\n            setProgressView({...progressing});\n          });\n        }\n        else{\n          a.runWith(\"chained-one\",one_fn,progressing,function (){\n            setProgressView({...progressing});\n          });\n        }\n        setProgressView(progressing);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"red\"}]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{n.format_entry({progressView})}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
            if(active){
              a.runWith("chained-one",zero_fn,progressing,function (){
                setProgressView({...progressing});
              });
            }
            else{
              a.runWith("chained-one",one_fn,progressing,function (){
                setProgressView({...progressing});
              });
            }
            setProgressView(progressing);
          }}>
        </ReactNative.Button>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[{"width":1.2,"height":20,"backgroundColor":"red"}]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{n.format_entry({progressView})}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/RunWithAllDemo [560] 
function RunWithAllDemo(){
  let [active,setActive] = React.useState(true);
  let progressing = React.useCallback(event_animate.new_progressing(),[]);
  let [progressView,setProgressView] = React.useState(progressing);
  let {check_fn,indicator,one_fn,zero_fn} = React.useCallback(event_animate.make_binary_transitions(a.IMPL,active,{
    "default":{
        "type":"timing",
        "duration":1000,
        "easing":ReactNative.Easing.linear
      }
  }),[]);
  let boxRef = a.useListenSingle(indicator,function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenSingle(indicator,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/runWithAll"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"PUSH\"\n      onPress={function (){\n        setActive(!active);\n        if(active){\n          a.runWith(\"chained-all\",zero_fn,progressing,function (){\n            setProgressView({...progressing});\n          });\n        }\n        else{\n          a.runWith(\"chained-all\",one_fn,progressing,function (){\n            setProgressView({...progressing});\n          });\n        }\n        setProgressView(progressing);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"red\"}]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{n.format_entry({progressView})}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="PUSH"
          onPress={function (){
            setActive(!active);
            if(active){
              a.runWith("chained-all",zero_fn,progressing,function (){
                setProgressView({...progressing});
              });
            }
            else{
              a.runWith("chained-all",one_fn,progressing,function (){
                setProgressView({...progressing});
              });
            }
            setProgressView(progressing);
          }}>
        </ReactNative.Button>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[{"width":1.2,"height":20,"backgroundColor":"red"}]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{n.format_entry({progressView})}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseBinaryIndicatorDemo [624] 
function UseBinaryIndicatorDemo(){
  let [active,setActive] = React.useState(true);
  let ind = a.useBinaryIndicator(active,{
    "default":{
        "type":"timing",
        "duration":200,
        "width":100,
        "easing":ReactNative.Easing.linear
      }
  });
  let textRef = a.useListenArray([ind],function (v){
    return {"text":v.toFixed(3)};
  });
  let boxRef = a.useListenArray([ind],function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useBinaryIndicator"
      code={function (){
        return "(\n  <ReactNative.View>\n    <n.Row>\n      <ReactNative.Button\n        title={active ? \"ON\" : \"OFF\"}\n        onPress={function (){\n          setActive(!active);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.View\n        style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n        <ReactNative.View\n          ref={boxRef}\n          style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"red\"}]}>\n        </ReactNative.View>\n      </ReactNative.View>\n      <ReactNative.TextInput\n        ref={textRef}\n        editable={false}\n        style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n      </ReactNative.TextInput>\n    </n.Row>\n  </ReactNative.View>);";
      }()}>
      <ReactNative.View>
        <n.Row>
          <ReactNative.Button
            title={active ? "ON" : "OFF"}
            onPress={function (){
              setActive(!active);
            }}>
          </ReactNative.Button>
          <ReactNative.View
            style={{"alignItems":"center","justifyContent":"center","flex":1}}>
            <ReactNative.View
              ref={boxRef}
              style={[{"width":1.2,"height":20,"backgroundColor":"red"}]}>
            </ReactNative.View>
          </ReactNative.View>
          <ReactNative.TextInput
            ref={textRef}
            editable={false}
            style={{"padding":5,"width":100,"textAlign":"right"}}>
          </ReactNative.TextInput>
        </n.Row>
      </ReactNative.View>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UsePressIndicatorDemo [673] 
function UsePressIndicatorDemo(){
  let [active,setActive] = React.useState();
  let [progress,setProgress] = React.useState();
  let ind = a.usePressIndicator(active,{
    "default":{
        "type":"timing",
        "duration":1000,
        "width":100,
        "easing":ReactNative.Easing.linear
      }
  },function (progress){
    setProgress({...progress});
  });
  let textRef = a.useListenArray([ind],function (v){
    return {"text":v.toFixed(3)};
  });
  let boxRef = a.useListenArray([ind],function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/usePressIndicator"
      code={function (){
        return "(\n  <ReactNative.View>\n    <n.Row>\n      <ReactNative.Pressable\n        onPressIn={function (){\n          setActive(true);\n        }}\n        onPressOut={function (){\n          setActive(false);\n        }}>\n        <ReactNative.Text\n          style={{\n            \"padding\":10,\n            \"backgroundColor\":active ? [\"green\",\"black\"] : null,\n            \"color\":\"white\"\n          }}>PRESS\n        </ReactNative.Text>\n      </ReactNative.Pressable>\n      <ReactNative.View\n        style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n        <ReactNative.View\n          ref={boxRef}\n          style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"red\"}]}>\n        </ReactNative.View>\n      </ReactNative.View>\n      <ReactNative.TextInput\n        ref={textRef}\n        editable={false}\n        style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n      </ReactNative.TextInput>\n    </n.Row>\n  </ReactNative.View>);\n(\n  <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>);";
      }()}>
      <ReactNative.View>
        <n.Row>
          <ReactNative.Pressable
            onPressIn={function (){
              setActive(true);
            }}
            onPressOut={function (){
              setActive(false);
            }}>
            <ReactNative.Text
              style={{
                "padding":10,
                "backgroundColor":active ? ["green","black"] : null,
                "color":"white"
              }}>PRESS
            </ReactNative.Text>
          </ReactNative.Pressable>
          <ReactNative.View
            style={{"alignItems":"center","justifyContent":"center","flex":1}}>
            <ReactNative.View
              ref={boxRef}
              style={[{"width":1.2,"height":20,"backgroundColor":"red"}]}>
            </ReactNative.View>
          </ReactNative.View>
          <ReactNative.TextInput
            ref={textRef}
            editable={false}
            style={{"padding":5,"width":100,"textAlign":"right"}}>
          </ReactNative.TextInput>
        </n.Row>
      </ReactNative.View>
      <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseLinearIndicatorDemo [729] 
function UseLinearIndicatorDemo(){
  let [index,setIndex] = React.useState(1);
  let [progress,setProgress] = React.useState();
  let ind = a.useLinearIndicator(index,{
    "default":{
        "type":"timing",
        "duration":1000,
        "width":100,
        "easing":ReactNative.Easing.linear
      }
  },function (progress){
    setProgress({...progress});
  },"chained-all");
  let boxRef = a.useListenArray([ind],function (v){
    return {"style":{"transform":[{"scaleX":20 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenArray([ind],function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useLinearIndicator"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text>\n      <ReactNative.Button\n        title=\"1\"\n        color={(index == 1) ? \"black\" : null}\n        onPress={function (){\n          setIndex(1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"2\"\n        color={(index == 2) ? \"black\" : null}\n        onPress={function (){\n          setIndex(2);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"3\"\n        color={(index == 3) ? \"black\" : null}\n        onPress={function (){\n          setIndex(3);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"green\"}]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Text>
          <ReactNative.Button
            title="1"
            color={(index == 1) ? "black" : null}
            onPress={function (){
              setIndex(1);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="2"
            color={(index == 2) ? "black" : null}
            onPress={function (){
              setIndex(2);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="3"
            color={(index == 3) ? "black" : null}
            onPress={function (){
              setIndex(3);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[{"width":1.2,"height":20,"backgroundColor":"green"}]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseIndexIndicatorDemo [794] 
function UseIndexIndicatorDemo(){
  let [index,setIndex] = React.useState(1);
  let ind = a.useIndexIndicator(index,{
    "default":{
        "type":"timing",
        "duration":500,
        "width":100,
        "easing":ReactNative.Easing.linear
      }
  });
  let boxRef = a.useListenArray([ind],function (v){
    return {"style":{"transform":[{"scaleX":20 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenArray([ind],function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useIndexIndicator"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text>\n      <ReactNative.Button\n        title=\"1\"\n        color={(index == 1) ? \"black\" : null}\n        onPress={function (){\n          setIndex(1);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"2\"\n        color={(index == 2) ? \"black\" : null}\n        onPress={function (){\n          setIndex(2);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"3\"\n        color={(index == 3) ? \"black\" : null}\n        onPress={function (){\n          setIndex(3);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[{\"width\":1.2,\"height\":20,\"backgroundColor\":\"green\"}]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);";
      }()}>
      <n.Row>
        <ReactNative.Text>
          <ReactNative.Button
            title="1"
            color={(index == 1) ? "black" : null}
            onPress={function (){
              setIndex(1);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="2"
            color={(index == 2) ? "black" : null}
            onPress={function (){
              setIndex(2);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="3"
            color={(index == 3) ? "black" : null}
            onPress={function (){
              setIndex(3);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[{"width":1.2,"height":20,"backgroundColor":"green"}]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseCircularIndicatorDemo [854] 
function UseCircularIndicatorDemo(){
  let [index,setIndex] = React.useState(10);
  let [progress,setProgress] = React.useState();
  let ind = a.useCircularIndicator(index,{
    "default":{
        "type":"timing",
        "duration":2000,
        "easing":ReactNative.Easing.linear
      }
  },function (progress){
    setProgress({...progress});
  },"chained-all");
  let boxRef = a.useListenArray([ind],function (v){
    return {"style":{"transform":[{"rotateZ":v + "deg"}]}};
  });
  let textRef = a.useListenArray([ind],function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useCircularIndicator"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Text>\n      <ReactNative.Button\n        title=\"60\"\n        color={(index == 60) ? \"black\" : null}\n        onPress={function (){\n          setIndex(60);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"120\"\n        color={(index == 120) ? \"black\" : null}\n        onPress={function (){\n          setIndex(120);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"180\"\n        color={(index == 180) ? \"black\" : null}\n        onPress={function (){\n          setIndex(180);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"240\"\n        color={(index == 240) ? \"black\" : null}\n        onPress={function (){\n          setIndex(240);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"300\"\n        color={(index == 300) ? \"black\" : null}\n        onPress={function (){\n          setIndex(300);\n        }}>\n      </ReactNative.Button>\n      <ReactNative.Text>  </ReactNative.Text>\n      <ReactNative.Button\n        title=\"360\"\n        color={(index == 360) ? \"black\" : null}\n        onPress={function (){\n          setIndex(360);\n        }}>\n      </ReactNative.Button>\n    </ReactNative.Text>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        ref={boxRef}\n        style={[\n          {\n          \"width\":40,\n          \"height\":40,\n          \"backgroundColor\":\"green\",\n          \"borderBottom\":\"3px solid black\"\n        }\n        ]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Text>
          <ReactNative.Button
            title="60"
            color={(index == 60) ? "black" : null}
            onPress={function (){
              setIndex(60);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="120"
            color={(index == 120) ? "black" : null}
            onPress={function (){
              setIndex(120);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="180"
            color={(index == 180) ? "black" : null}
            onPress={function (){
              setIndex(180);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="240"
            color={(index == 240) ? "black" : null}
            onPress={function (){
              setIndex(240);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="300"
            color={(index == 300) ? "black" : null}
            onPress={function (){
              setIndex(300);
            }}>
          </ReactNative.Button>
          <ReactNative.Text>  </ReactNative.Text>
          <ReactNative.Button
            title="360"
            color={(index == 360) ? "black" : null}
            onPress={function (){
              setIndex(360);
            }}>
          </ReactNative.Button>
        </ReactNative.Text>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            ref={boxRef}
            style={[
              {
              "width":40,
              "height":40,
              "backgroundColor":"green",
              "borderBottom":"3px solid black"
            }
            ]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{JSON.stringify(progress)}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UsePositionDemo [941] 
function UsePositionDemo(){
  let [value,setValue] = React.useState(function (){
    return 5;
  });
  let {forwardFn,position,reverseFn} = a.usePosition({
    "length":100,
    "max":10,
    "min":0,
    "step":0.01,
    "value":value,
    "setValue":setValue
  });
  let boxRef = a.useListenSingle(position,function (v){
    return {"style":{"transform":[{"translateX":v}]}};
  });
  let textRef = a.useListenSingle(position,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/usePosition"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"+1\"\n      onPress={function (){\n        return position.setValue(position._value + 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"-1\"\n      onPress={function (){\n        return position.setValue(position._value - 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        style={[\n          {\n          \"width\":1,\n          \"height\":20,\n          \"backgroundColor\":\"green\",\n          \"transform\":[{\"scaleX\":10 * value}]\n        }\n        ]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{JSON.stringify({position,value})}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="+1"
          onPress={function (){
            return position.setValue(position._value + 5);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="-1"
          onPress={function (){
            return position.setValue(position._value - 5);
          }}>
        </ReactNative.Button>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          <ReactNative.View
            style={[
              {
              "width":1,
              "height":20,
              "backgroundColor":"green",
              "transform":[{"scaleX":10 * value}]
            }
            ]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{JSON.stringify({position,value})}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseRangeDemo [997] 
function UseRangeDemo(){
  let [upper,setUpper] = React.useState(function (){
    return 7;
  });
  let [lower,setLower] = React.useState(function (){
    return 2;
  });
  let {forwardFn,positionLower,positionUpper,reverseFn} = a.useRange({
    "length":100,
    "max":10,
    "min":0,
    "step":0.01,
    "lower":lower,
    "setLower":setLower,
    "upper":upper,
    "setUpper":setUpper
  });
  let boxLowerRef = a.useListenSingle(positionLower,function (v){
    return {"style":{"transform":[{"translateX":v}]}};
  });
  let textLowerRef = a.useListenSingle(positionLower,function (v){
    return {"text":v.toFixed(3)};
  });
  let boxUpperRef = a.useListenSingle(positionUpper,function (v){
    return {"style":{"transform":[{"translateX":v}]}};
  });
  let textUpperRef = a.useListenSingle(positionUpper,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useRange"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"-l\"\n      onPress={function (){\n        return positionLower.setValue(positionLower._value - 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"+l\"\n      onPress={function (){\n        return positionLower.setValue(positionLower._value + 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"-h\"\n      onPress={function (){\n        return positionUpper.setValue(positionUpper._value - 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.Text> </ReactNative.Text>\n    <ReactNative.Button\n      title=\"+h\"\n      onPress={function (){\n        return positionUpper.setValue(positionUpper._value + 5);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View style={{\"justifyContent\":\"center\",\"flex\":1}}>\n      <ReactNative.View\n        style={[\n          {\n          \"width\":10 * (upper - lower),\n          \"height\":20,\n          \"backgroundColor\":\"green\",\n          \"transform\":[{\"translateX\":100 + (10 * lower)}]\n        }\n        ]}>\n      </ReactNative.View>\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textLowerRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n    <ReactNative.TextInput\n      ref={textUpperRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{JSON.stringify({lower,upper})}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="-l"
          onPress={function (){
            return positionLower.setValue(positionLower._value - 5);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="+l"
          onPress={function (){
            return positionLower.setValue(positionLower._value + 5);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="-h"
          onPress={function (){
            return positionUpper.setValue(positionUpper._value - 5);
          }}>
        </ReactNative.Button>
        <ReactNative.Text> </ReactNative.Text>
        <ReactNative.Button
          title="+h"
          onPress={function (){
            return positionUpper.setValue(positionUpper._value + 5);
          }}>
        </ReactNative.Button>
        <ReactNative.View style={{"justifyContent":"center","flex":1}}>
          <ReactNative.View
            style={[
              {
              "width":10 * (upper - lower),
              "height":20,
              "backgroundColor":"green",
              "transform":[{"translateX":100 + (10 * lower)}]
            }
            ]}>
          </ReactNative.View>
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textLowerRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
        <ReactNative.TextInput
          ref={textUpperRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{JSON.stringify({lower,upper})}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

// js.react-native.animate-test/UseShowingDemo [1087] 
function UseShowingDemo(){
  let isMounted = r.useIsMounted();
  let [visible,setVisible] = React.useState(function (){
    return true;
  });
  let [showing,vindicator] = a.useShowing(visible,{
    "default":{
        "type":"timing",
        "duration":500,
        "easing":ReactNative.Easing.linear
      }
  },isMounted);
  let boxRef = a.useListenSingle(vindicator,function (v){
    return {"style":{"transform":[{"scaleX":100 * Math.max(0.1,v)}]}};
  });
  let textRef = a.useListenSingle(vindicator,function (v){
    return {"text":v.toFixed(3)};
  });
  return (
    <n.EnclosedCodeContainer
      label="js.react-native.animate/useShowing"
      code={function (){
        return "(\n  <n.Row>\n    <ReactNative.Button\n      title=\"Toggle\"\n      onPress={function (){\n        return setVisible(!visible);\n      }}>\n    </ReactNative.Button>\n    <ReactNative.View\n      style={{\"alignItems\":\"center\",\"justifyContent\":\"center\",\"flex\":1}}>\n      {showing ? [\n        (\n        <ReactNative.View\n          ref={boxRef}\n          key=\"showing\"\n          style={[{\"width\":1,\"height\":20,\"backgroundColor\":\"green\"}]}>\n        </ReactNative.View>)\n      ] : null}\n    </ReactNative.View>\n    <ReactNative.TextInput\n      ref={textRef}\n      editable={false}\n      style={{\"padding\":5,\"width\":100,\"textAlign\":\"right\"}}>\n    </ReactNative.TextInput>\n  </n.Row>);\n(\n  <ReactNative.Text>{JSON.stringify({showing,visible})}</ReactNative.Text>);";
      }()}>
      <n.Row>
        <ReactNative.Button
          title="Toggle"
          onPress={function (){
            return setVisible(!visible);
          }}>
        </ReactNative.Button>
        <ReactNative.View
          style={{"alignItems":"center","justifyContent":"center","flex":1}}>
          {showing ? [
            (
            <ReactNative.View
              ref={boxRef}
              key="showing"
              style={[{"width":1,"height":20,"backgroundColor":"green"}]}>
            </ReactNative.View>)
          ] : null}
        </ReactNative.View>
        <ReactNative.TextInput
          ref={textRef}
          editable={false}
          style={{"padding":5,"width":100,"textAlign":"right"}}>
        </ReactNative.TextInput>
      </n.Row>
      <ReactNative.Text>{JSON.stringify({showing,visible})}</ReactNative.Text>
    </n.EnclosedCodeContainer>);
}

var MODULE = {
  "ValDemo":ValDemo,
  "CreateTransitionDemo":CreateTransitionDemo,
  "DeriveDemo":DeriveDemo,
  "ListenSingleDemo":ListenSingleDemo,
  "UseListenSingleDemo":UseListenSingleDemo,
  "ListenArrayDemo":ListenArrayDemo,
  "UseListenArrayDemo":UseListenArrayDemo,
  "ListenMapDemo":ListenMapDemo,
  "ListenTransformationsDemo":ListenTransformationsDemo,
  "RunWithCancelDemo":RunWithCancelDemo,
  "RunWithOneDemo":RunWithOneDemo,
  "RunWithAllDemo":RunWithAllDemo,
  "UseBinaryIndicatorDemo":UseBinaryIndicatorDemo,
  "UsePressIndicatorDemo":UsePressIndicatorDemo,
  "UseLinearIndicatorDemo":UseLinearIndicatorDemo,
  "UseIndexIndicatorDemo":UseIndexIndicatorDemo,
  "UseCircularIndicatorDemo":UseCircularIndicatorDemo,
  "UsePositionDemo":UsePositionDemo,
  "UseRangeDemo":UseRangeDemo,
  "UseShowingDemo":UseShowingDemo
};

export default MODULE