import React from 'react'

import * as ReactNative from 'react-native'

import n from './react-native'

import k from '../xt/lang/base-lib'

// js.react-native-test/nest-tree [19] 
function nest_tree(obj,prefix){
  return k.walk(obj,k.identity,function (x){
    if(k.objp(x)){
      let out = {};
      for(let [k,v] of Object.entries(x)){
        out[prefix + k] = v;
      };
      return out;
    }
    return x;
  });
}

// js.react-native-test/TREEDATA [31] 
var TREEDATA = {
  "a":{
    "aa":{"aaa":"1","aab":"2","aac":"3","aad":"4"},
    "ab":{"aba":"1","abb":"2","abc":"3","abd":"4"},
    "ac":{"aca":"1","acb":"2","acc":"3","acd":"4"},
    "ad":{"ada":"1","adb":"2","adc":"3","add":"4"}
  },
  "b":{
    "ba":{"baa":"1","bab":"2","bac":"3","bad":"4"},
    "bb":{"bba":"1","bbb":"2","bbc":"3","bbd":"4"},
    "bc":{"bca":"1","bcb":"2","bcc":"3","bcd":"4"},
    "bd":{"bda":"1","bdb":"2","bdc":"3","bdd":"4"}
  },
  "c":{
    "ca":{"caa":"1","cab":"2","cac":"3","cad":"4"},
    "cb":{"cba":"1","cbb":"2","cbc":"3","cbd":"4"},
    "cc":{"cca":"1","ccb":"2","ccc":"3","ccd":"4"},
    "cd":{"cda":"1","cdb":"2","cdc":"3","cdd":"4"}
  },
  "d":{
    "da":{"daa":"1","dab":"2","dac":"3","dad":"4"},
    "db":{"dba":"1","dbb":"2","dbc":"3","dbd":"4"},
    "dc":{"dca":"1","dcb":"2","dcc":"3","dcd":"4"},
    "dd":{"dda":"1","ddb":"2","ddc":"3","ddd":"4"}
  }
};

// js.react-native-test/EnclosedDemo [117] 
function EnclosedDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Enclosed"
      code={function (){
        return "(\n  <n.Row><ReactNative.Text>HELLO</ReactNative.Text></n.Row>);";
      }()}><n.Row><ReactNative.Text>HELLO</ReactNative.Text></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/EnclosedCodeContainerDemo [129] 
function EnclosedCodeContainerDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/EnclosedCodeContainer"
      code="HELLO THERE"><n.Row><ReactNative.Text>HELLO</ReactNative.Text></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/EnclosedCodeDemo [142] 
function EnclosedCodeDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/EnclosedCode"
      code={function (){
        return "(\n  <n.Row><ReactNative.Text>HELLO</ReactNative.Text></n.Row>);";
      }()}><n.Row><ReactNative.Text>HELLO</ReactNative.Text></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/RowDemo [155] 
function RowDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Row"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}>\n    <ReactNative.Text>HELLO</ReactNative.Text>\n    <ReactNative.Text>WORLD</ReactNative.Text>\n  </n.Row>);\n(\n  <n.Row style={{\"backgroundColor\":\"blue\"}}>\n    <ReactNative.Text>HELLO</ReactNative.Text>\n    <ReactNative.Text>WORLD</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}>
        <ReactNative.Text>HELLO</ReactNative.Text>
        <ReactNative.Text>WORLD</ReactNative.Text>
      </n.Row>
      <n.Row style={{"backgroundColor":"blue"}}>
        <ReactNative.Text>HELLO</ReactNative.Text>
        <ReactNative.Text>WORLD</ReactNative.Text>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/FillDemo [173] 
function FillDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Fill"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}>\n    <ReactNative.Text>HELLO</ReactNative.Text>\n    <n.Fill style={{\"backgroundColor\":\"red\"}}></n.Fill>\n    <ReactNative.Text>WORLD</ReactNative.Text>\n  </n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}>
        <ReactNative.Text>HELLO</ReactNative.Text>
        <n.Fill style={{"backgroundColor":"red"}}></n.Fill>
        <ReactNative.Text>WORLD</ReactNative.Text>
      </n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/H1Demo [188] 
function H1Demo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/H1"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.H1 text=\"HELLO WORLD\"></n.H1></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.H1 text="HELLO WORLD"></n.H1></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/H2Demo [201] 
function H2Demo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/H2"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.H2 text=\"HELLO WORLD\"></n.H2></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.H2 text="HELLO WORLD"></n.H2></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/H3Demo [214] 
function H3Demo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/H3"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.H3 text=\"HELLO WORLD\"></n.H3></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.H3 text="HELLO WORLD"></n.H3></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/H4Demo [227] 
function H4Demo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/H4"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.H4 text=\"HELLO WORLD\"></n.H4></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.H4 text="HELLO WORLD"></n.H4></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/H5Demo [240] 
function H5Demo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/H5"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.H5 text=\"HELLO WORLD\"></n.H5></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.H5 text="HELLO WORLD"></n.H5></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/CaptionDemo [253] 
function CaptionDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Caption"
      code={function (){
        return "(\n  <n.Row style={{\"backgroundColor\":\"orange\"}}><n.Caption text=\"HELLO WORLD\"></n.Caption></n.Row>);";
      }()}>
      <n.Row style={{"backgroundColor":"orange"}}><n.Caption text="HELLO WORLD"></n.Caption></n.Row>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TabsIndexedDemo [269] 
function TabsIndexedDemo(){
  let [index,setIndex] = React.useState(3);
  let styleNormal = {"padding":2};
  let styleSelected = {
    "backgroundColor":"#666",
    "borderRadius":3,
    "color":"white",
    "padding":2
  };
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TabsIndexed"
      code={function (){
        return "(\n  <n.TabsIndexed\n    items={[\"A\",\"B\",\"C\",\"D\"]}\n    checkIndex={function (){\n      return true;\n    }}\n    setIndex={setIndex}\n    styleNormal={styleNormal}\n    styleSelected={styleSelected}\n    index={index}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.TabsIndexed>);\n(\n  <n.Caption text={JSON.stringify({index})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.TabsIndexed
        items={["A","B","C","D"]}
        checkIndex={function (){
          return true;
        }}
        setIndex={setIndex}
        styleNormal={styleNormal}
        styleSelected={styleSelected}
        index={index}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.TabsIndexed>
      <n.Caption text={JSON.stringify({index})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TabsDemo [296] 
function TabsDemo(){
  let [value,setValue] = React.useState("A");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Tabs"
      code={function (){
        return "(\n  <n.Tabs\n    data={[\"A\",\"B\",\"C\",\"D\"]}\n    value={value}\n    setValue={setValue}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.Tabs>);\n(\n  <n.Caption text={JSON.stringify({value})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.Tabs
        data={["A","B","C","D"]}
        value={value}
        setValue={setValue}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.Tabs>
      <n.Caption text={JSON.stringify({value})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TabsPaneDemo [315] 
function TabsPaneDemo(){
  let [initial,setInitial] = React.useState("a");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TabsPane"
      code={function (){
        return "(\n  <n.TabsPane\n    tree={{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\",\"d\":\"4\"}}\n    initial={initial}\n    setInitial={setInitial}\n    tabsFormat={function (s){\n      return \" \" + s.toUpperCase() + \" \";\n    }}\n    formatFn={k.identity}>\n  </n.TabsPane>);\n(\n  <n.Caption text={JSON.stringify({initial})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.TabsPane
        tree={{"a":"1","b":"2","c":"3","d":"4"}}
        initial={initial}
        setInitial={setInitial}
        tabsFormat={function (s){
          return " " + s.toUpperCase() + " ";
        }}
        formatFn={k.identity}>
      </n.TabsPane>
      <n.Caption text={JSON.stringify({initial})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/ListIndexedDemo [338] 
function ListIndexedDemo(){
  let [index,setIndex] = React.useState(3);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/ListIndexed"
      code={function (){
        return "(\n  <n.ListIndexed\n    items={[\"A\",\"B\",\"C\",\"D\"]}\n    checkIndex={function (){\n      return true;\n    }}\n    setIndex={setIndex}\n    index={index}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.ListIndexed>);\n(\n  <n.Caption text={JSON.stringify({index})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.ListIndexed
        items={["A","B","C","D"]}
        checkIndex={function (){
          return true;
        }}
        setIndex={setIndex}
        index={index}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.ListIndexed>
      <n.Caption text={JSON.stringify({index})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/ListDemo [358] 
function ListDemo(){
  let [value,setValue] = React.useState("A");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/List"
      code={function (){
        return "(\n  <n.List\n    data={[\"A\",\"B\",\"C\",\"D\"]}\n    value={value}\n    setValue={setValue}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.List>);\n(\n  <n.Caption text={JSON.stringify({value})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.List
        data={["A","B","C","D"]}
        value={value}
        setValue={setValue}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.List>
      <n.Caption text={JSON.stringify({value})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/ListPaneDemo [377] 
function ListPaneDemo(){
  let [initial,setInitial] = React.useState("a");
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/ListPane"
      code={function (){
        return "(\n  <n.ListPane\n    tree={{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\",\"d\":\"4\"}}\n    initial={initial}\n    setInitial={setInitial}\n    listWidth={30}\n    listFormat={function (s){\n      return s.toUpperCase();\n    }}\n    formatFn={k.identity}>\n  </n.ListPane>);\n(\n  <n.Caption text={JSON.stringify({initial})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.ListPane
        tree={{"a":"1","b":"2","c":"3","d":"4"}}
        initial={initial}
        setInitial={setInitial}
        listWidth={30}
        listFormat={function (s){
          return s.toUpperCase();
        }}
        formatFn={k.identity}>
      </n.ListPane>
      <n.Caption text={JSON.stringify({initial})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TabsMultiIndexedDemo [401] 
function TabsMultiIndexedDemo(){
  let [indices,setIndices] = React.useState([true,false,false,true]);
  let styleNormal = {"padding":2};
  let styleSelected = {
    "backgroundColor":"#666",
    "borderRadius":3,
    "color":"white",
    "padding":2
  };
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TabsMultiIndexed"
      code={function (){
        return "(\n  <n.TabsMultiIndexed\n    items={[\"A\",\"B\",\"C\",\"D\"]}\n    setIndices={setIndices}\n    styleNormal={styleNormal}\n    styleSelected={styleSelected}\n    indices={indices}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.TabsMultiIndexed>);\n(\n  <n.Caption text={JSON.stringify({indices})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.TabsMultiIndexed
        items={["A","B","C","D"]}
        setIndices={setIndices}
        styleNormal={styleNormal}
        styleSelected={styleSelected}
        indices={indices}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.TabsMultiIndexed>
      <n.Caption text={JSON.stringify({indices})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TabsMultiDemo [428] 
function TabsMultiDemo(){
  let [values,setValues] = React.useState(["A","C"]);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TabsMulti"
      code={function (){
        return "(\n  <n.TabsMulti\n    data={[\"A\",\"B\",\"C\",\"D\"]}\n    values={values}\n    setValues={setValues}\n    format={function (s){\n      return \" \" + s + \" \";\n    }}>\n  </n.TabsMulti>);\n(\n  <n.Caption text={JSON.stringify({values})} style={{\"marginTop\":10}}></n.Caption>);";
      }()}>
      <n.TabsMulti
        data={["A","B","C","D"]}
        values={values}
        setValues={setValues}
        format={function (s){
          return " " + s + " ";
        }}>
      </n.TabsMulti>
      <n.Caption text={JSON.stringify({values})} style={{"marginTop":10}}></n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TreePaneDemo [445] 
function TreePaneDemo(){
  let [initial,setInitial] = React.useState("a");
  let [l1,setL1] = React.useState();
  let [l2,setL2] = React.useState();
  let [l3,setL3] = React.useState();
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TreePane"
      code={function (){
        return "(\n  <n.TreePane\n    tree={{\n      \"x\":nest_tree(TREEDATA,\"x\"),\n      \"y\":nest_tree(TREEDATA,\"y\"),\n      \"z\":nest_tree(TREEDATA,\"z\"),\n      \"w\":nest_tree(TREEDATA,\"w\")\n    }}\n    levels={[\n      {\n        \"type\":\"list\",\n        \"initial\":initial,\n        \"setInitial\":setInitial,\n        \"listWidth\":30,\n        \"listFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          }\n      },\n      {\n        \"type\":\"tabs\",\n        \"initial\":l1,\n        \"setInitial\":setL1,\n        \"listWidth\":30,\n        \"tabsFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          }\n      },\n      {\n        \"type\":\"list\",\n        \"listWidth\":30,\n        \"initial\":l2,\n        \"setInitial\":setL2,\n        \"listFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          }\n      },\n      {\n        \"type\":\"tabs\",\n        \"listWidth\":30,\n        \"initial\":l3,\n        \"setInitial\":setL3,\n        \"tabsFormat\":function (s){\n            return s.toUpperCase();\n          },\n        \"formatFn\":function (obj){\n            return JSON.stringify(obj);\n          }\n      }\n    ]}>\n  </n.TreePane>);\n(\n  <n.Caption\n    text={JSON.stringify({initial,l1,l2,l3})}\n    style={{\"marginTop\":10}}>\n  </n.Caption>);";
      }()}>
      <n.TreePane
        tree={{
          "x":nest_tree(TREEDATA,"x"),
          "y":nest_tree(TREEDATA,"y"),
          "z":nest_tree(TREEDATA,"z"),
          "w":nest_tree(TREEDATA,"w")
        }}
        levels={[
          {
          "type":"list",
          "initial":initial,
          "setInitial":setInitial,
          "listWidth":30,
          "listFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          }
        },
          {
          "type":"tabs",
          "initial":l1,
          "setInitial":setL1,
          "listWidth":30,
          "tabsFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          }
        },
          {
          "type":"list",
          "listWidth":30,
          "initial":l2,
          "setInitial":setL2,
          "listFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          }
        },
          {
          "type":"tabs",
          "listWidth":30,
          "initial":l3,
          "setInitial":setL3,
          "tabsFormat":function (s){
            return s.toUpperCase();
          },
          "formatFn":function (obj){
            return JSON.stringify(obj);
          }
        }
        ]}>
      </n.TreePane>
      <n.Caption
        text={JSON.stringify({initial,l1,l2,l3})}
        style={{"marginTop":10}}>
      </n.Caption>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/BaseIndicatorDemo [494] 
function BaseIndicatorDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/BaseIndicator"
      code={function (){
        return "(\n  <n.BaseIndicator color=\"black\" label=\"TEST\" content=\"Hello World\"></n.BaseIndicator>);";
      }()}>
      <n.BaseIndicator color="black" label="TEST" content="Hello World"></n.BaseIndicator>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/ToggleIndicatorDemo [508] 
function ToggleIndicatorDemo(){
  let [active,setActive] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/ToggleIndicator"
      code={function (){
        return "(\n  <n.ToggleIndicator\n    active={active}\n    onPress={function (){\n      return setActive(!active);\n    }}\n    label=\"TEST\">\n  </n.ToggleIndicator>);";
      }()}>
      <n.ToggleIndicator
        active={active}
        onPress={function (){
          return setActive(!active);
        }}
        label="TEST">
      </n.ToggleIndicator>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/RecordListDemo [523] 
function RecordListDemo(){
  let [active,setActive] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/RecordList"
      code={function (){
        return "(\n  <n.RecordList\n    entry={{\"first\":\"John\",\"last\":\"Smith\"}}\n    columns={[[\"First Name\",\"first\"],[\"Last Name\",\"last\"]]}>\n  </n.RecordList>);";
      }()}>
      <n.RecordList
        entry={{"first":"John","last":"Smith"}}
        columns={[["First Name","first"],["Last Name","last"]]}>
      </n.RecordList>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/TextDisplayDemo [539] 
function TextDisplayDemo(){
  let [active,setActive] = React.useState(true);
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/TextDisplay"
      code={function (){
        return "(\n  <n.TextDisplay content=\"ABC\"></n.TextDisplay>);";
      }()}><n.TextDisplay content="ABC"></n.TextDisplay>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/PortalView [573] 
function PortalView(){
  let [code,setCode] = React.useState(Math.random().toString(36).substr(2,5 || 4));
  return (
    <ReactNative.View style={{"marginTop":10}}>
      <n.Row>
        <ReactNative.Button
          title="CHANGE"
          onPress={function (){
            return setCode(Math.random().toString(36).substr(2,5 || 4));
          }}>
        </ReactNative.Button>
      </n.Row>
      <n.Row>
        <n.Portal>
          <ReactNative.Text style={{"color":"green"}}>{"HELLO - " + code}</ReactNative.Text>
        </n.Portal>
        <n.Portal target="world">
          <ReactNative.Text style={{"color":"white"}}>{"HELLO - " + code}</ReactNative.Text>
        </n.Portal>
      </n.Row>
    </ReactNative.View>);
}

// js.react-native-test/PortalDemo [597] 
function PortalDemo(){
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/Portal"
      code={function (){
        return "(\n  <n.PortalProvider>\n    <n.Row>\n      <ReactNative.View style={{\"backgroundColor\":\"red\",\"height\":50,\"width\":200}}><n.PortalSink></n.PortalSink></ReactNative.View>\n      <ReactNative.View style={{\"flex\":1}}></ReactNative.View>\n      <ReactNative.View\n        style={{\n          \"backgroundColor\":\"blue\",\n          \"color\":\"white\",\n          \"height\":50,\n          \"width\":200\n        }}><n.PortalSink name=\"world\"></n.PortalSink>\n      </ReactNative.View>\n    </n.Row>\n    <PortalView></PortalView>\n    <n.Portal target=\"world\">\n      <ReactNative.Text style={{\"color\":\"yellow\"}}>{\"WORLD\"}</ReactNative.Text>\n    </n.Portal>\n    <n.Portal>\n      <ReactNative.Text style={{\"color\":\"yellow\"}}>{\"DEFAULT\"}</ReactNative.Text>\n    </n.Portal>\n  </n.PortalProvider>);";
      }()}>
      <n.PortalProvider>
        <n.Row>
          <ReactNative.View style={{"backgroundColor":"red","height":50,"width":200}}><n.PortalSink></n.PortalSink></ReactNative.View>
          <ReactNative.View style={{"flex":1}}></ReactNative.View>
          <ReactNative.View
            style={{
              "backgroundColor":"blue",
              "color":"white",
              "height":50,
              "width":200
            }}><n.PortalSink name="world"></n.PortalSink>
          </ReactNative.View>
        </n.Row>
        <PortalView></PortalView>
        <n.Portal target="world">
          <ReactNative.Text style={{"color":"yellow"}}>{"WORLD"}</ReactNative.Text>
        </n.Portal>
        <n.Portal>
          <ReactNative.Text style={{"color":"yellow"}}>{"DEFAULT"}</ReactNative.Text>
        </n.Portal>
      </n.PortalProvider>
    </n.EnclosedCodeContainer>);
}

// js.react-native-test/UsePortalLayoutsView [632] 
function UsePortalLayoutsView({layouts,offset,setLayouts,setOffset}){
  let hostRef = React.useRef();
  let {contentRef,getLayouts,setSinkRef,sinkRef} = n.usePortalLayouts(hostRef,setLayouts);
  React.useEffect(function (){
    getLayouts();
  },[offset]);
  return (
    <ReactNative.View style={{"marginTop":10}}>
      <ReactNative.View ref={hostRef}></ReactNative.View>
      <n.Row>
        <n.Portal onSink={setSinkRef}>
          <ReactNative.View ref={contentRef}>
            <ReactNative.Text style={{"color":"green"}}>{n.format_entry({offset})}</ReactNative.Text>
          </ReactNative.View>
        </n.Portal>
      </n.Row>
    </ReactNative.View>);
}

// js.react-native-test/UsePortalLayoutsDemo [660] 
function UsePortalLayoutsDemo(){
  let [offset,setOffset] = React.useState(Math.floor(100 * Math.random(100)));
  let [layouts,setLayouts] = React.useState({});
  return (
    <n.EnclosedCodeContainer
      label="js.react-native/usePortalLayouts"
      code={function (){
        return "(\n  <n.PortalProvider>\n    <n.Row>\n      <n.Row style={{\"backgroundColor\":\"red\",\"height\":300,\"width\":300}}>\n        <ReactNative.View\n          style={{\n            \"position\":\"absolute\",\n            \"backgroundColor\":\"blue\",\n            \"height\":200,\n            \"width\":200,\n            \"transform\":[{\"translateX\":offset},{\"translateY\":offset}]\n          }}>\n          <n.PortalSink>\n            <ReactNative.Button\n              title=\"CHANGE\"\n              onPress={function (){\n                return setOffset(Math.floor(100 * Math.random()));\n              }}>\n            </ReactNative.Button>\n            <UsePortalLayoutsView\n              setOffset={setOffset}\n              offset={offset}\n              layouts={layouts}\n              setLayouts={setLayouts}>\n            </UsePortalLayoutsView>\n          </n.PortalSink>\n        </ReactNative.View>\n      </n.Row>\n      <n.TextDisplay content={n.format_entry({layouts,offset})}></n.TextDisplay>\n    </n.Row>\n  </n.PortalProvider>);";
      }()}>
      <n.PortalProvider>
        <n.Row>
          <n.Row style={{"backgroundColor":"red","height":300,"width":300}}>
            <ReactNative.View
              style={{
                "position":"absolute",
                "backgroundColor":"blue",
                "height":200,
                "width":200,
                "transform":[{"translateX":offset},{"translateY":offset}]
              }}>
              <n.PortalSink>
                <ReactNative.Button
                  title="CHANGE"
                  onPress={function (){
                    return setOffset(Math.floor(100 * Math.random()));
                  }}>
                </ReactNative.Button>
                <UsePortalLayoutsView
                  setOffset={setOffset}
                  offset={offset}
                  layouts={layouts}
                  setLayouts={setLayouts}>
                </UsePortalLayoutsView>
              </n.PortalSink>
            </ReactNative.View>
          </n.Row>
          <n.TextDisplay content={n.format_entry({layouts,offset})}></n.TextDisplay>
        </n.Row>
      </n.PortalProvider>
    </n.EnclosedCodeContainer>);
}

var MODULE = // 50460c70-8d37-4a52-acca-4b27e13d9883
{
  "nest_tree":nest_tree,
  "TREEDATA":TREEDATA,
  "EnclosedDemo":EnclosedDemo,
  "EnclosedCodeContainerDemo":EnclosedCodeContainerDemo,
  "EnclosedCodeDemo":EnclosedCodeDemo,
  "RowDemo":RowDemo,
  "FillDemo":FillDemo,
  "H1Demo":H1Demo,
  "H2Demo":H2Demo,
  "H3Demo":H3Demo,
  "H4Demo":H4Demo,
  "H5Demo":H5Demo,
  "CaptionDemo":CaptionDemo,
  "TabsIndexedDemo":TabsIndexedDemo,
  "TabsDemo":TabsDemo,
  "TabsPaneDemo":TabsPaneDemo,
  "ListIndexedDemo":ListIndexedDemo,
  "ListDemo":ListDemo,
  "ListPaneDemo":ListPaneDemo,
  "TabsMultiIndexedDemo":TabsMultiIndexedDemo,
  "TabsMultiDemo":TabsMultiDemo,
  "TreePaneDemo":TreePaneDemo,
  "BaseIndicatorDemo":BaseIndicatorDemo,
  "ToggleIndicatorDemo":ToggleIndicatorDemo,
  "RecordListDemo":RecordListDemo,
  "TextDisplayDemo":TextDisplayDemo,
  "PortalView":PortalView,
  "PortalDemo":PortalDemo,
  "UsePortalLayoutsView":UsePortalLayoutsView,
  "UsePortalLayoutsDemo":UsePortalLayoutsDemo
};;

export default MODULE