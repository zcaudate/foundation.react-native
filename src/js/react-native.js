import * as ReactNative from 'react-native'

import React from 'react'

import r from './react'

import helper_portal from './react/helper-portal'

import k from '../xt/lang/base-lib'

// js.react-native/format-obj [458] 
function format_obj(e){
  let s = JSON.stringify(e,null,2) || "";
  let arr = s.split("\n");
  return k.arr_join(k.arr_map(k.arr_slice(arr,1,(arr).length - 1),function (l){
    return l.substring(2);
  }),"\n");
}

// js.react-native/format-entry [469] 
function format_entry(e){
  let out = format_obj(e);
  return out.replace(new RegExp("\"","g"),"").replace(new RegExp(",","g"),"");
}

// js.react-native/measure [478] 
function measure(elem,f){
  f = (f || function (){
    return null;
  });
  return new Promise(function (resolve,reject){
    if(elem && elem.measure){
      elem.measure(function (fx,fy,width,height,px,py){
        let out = {fx,fy,height,px,py,width};
        f(out);
        resolve(out);
      });
    }
    else{
      console.log(" js.react-native/measure",493,"\n\n","NOT MEASURED",elem);
      resolve({"fx":0,"fy":0,"width":0,"height":0,"px":0,"py":0});
    }
  });
}

// js.react-native/measureRef [496] 
function measureRef(ref,f){
  return ref.current ? measure(ref.current,f) : null;
}

// js.react-native/Enclosed [509] 
function Enclosed({label,styleLabel,children,style,...rprops}){
  return (
    <ReactNative.View
      style={[
        {
            "margin":10,
            "padding":10,
            "borderStyle":"solid",
            "borderWidth":1,
            "borderColor":"#aaa",
            "maxWidth":600
          },
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>
      <ReactNative.Text
        style={[
          {
          "position":"absolute",
          "top":-12,
          "fontSize":10,
          "padding":5,
          "color":"#666",
          "backgroundColor":"#fff"
        },
          ReactNative.Platform.select({"web":{"userSelect":"none"}}),
          ...(Array.isArray(styleLabel) ? styleLabel : ((null == styleLabel) ? [] : [styleLabel]))
        ]}>{label}
      </ReactNative.Text>
      {children}
    </ReactNative.View>);
}

// js.react-native/EnclosedCodeContainer [540] 
function EnclosedCodeContainer({code,label,children}){
  let [showCode,setShowCode] = React.useState();
  return (
    <Enclosed label={label}>
      <ReactNative.View
        style={{
          "position":"absolute",
          "right":-10,
          "top":-20,
          "transform":[{"scale":0.6}],
          "zIndex":10
        }}>
        <ReactNative.Button
          title={showCode ? "DEMO" : "CODE"}
          onPress={function (){
            setShowCode(!showCode);
          }}>
        </ReactNative.Button>
      </ReactNative.View>
      {showCode ? (
        <ReactNative.Text>{code}</ReactNative.Text>) : children}
    </Enclosed>);
}

// js.react-native/Row [571] 
function Row({refLink,style,...rprops}){
  return React.createElement(ReactNative.View,Object.assign({
    "ref":refLink,
    "style":[
        {"flexDirection":"row"},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]
  },rprops));
}

// js.react-native/Fill [584] 
function Fill({style,...rprops}){
  return (
    <ReactNative.View
      style={[
        {"flex":1,"zIndex":-10000},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>
    </ReactNative.View>);
}

// js.react-native/H1 [595] 
function H1({text,style,...rprops}){
  return (
    <ReactNative.Text
      style={[
        {
            "color":"#555",
            "marginTop":20,
            "margin":10,
            "fontSize":28,
            "fontWeight":"800"
          },
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>{text}
    </ReactNative.Text>);
}

// js.react-native/H2 [611] 
function H2({text,style,...rprops}){
  return (
    <ReactNative.Text
      style={[
        {
            "color":"#555",
            "marginTop":20,
            "margin":10,
            "fontSize":24,
            "fontWeight":"800"
          },
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>{text}
    </ReactNative.Text>);
}

// js.react-native/H3 [627] 
function H3({text,style,...rprops}){
  return (
    <ReactNative.Text
      style={[
        {"color":"#555","fontSize":20,"fontWeight":"800"},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>{text}
    </ReactNative.Text>);
}

// js.react-native/H4 [641] 
function H4({text,style,...rprops}){
  return (
    <ReactNative.Text
      style={[
        {"color":"#555","fontSize":16,"fontWeight":"400"},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>{text}
    </ReactNative.Text>);
}

// js.react-native/H5 [655] 
function H5({text,style,...rprops}){
  return (
    <ReactNative.Text
      style={[
        {"color":"#555","fontSize":12},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>{text}
    </ReactNative.Text>);
}

// js.react-native/Caption [668] 
function Caption({text,styleText,textProps,style,...rprops}){
  return (
    <ReactNative.View
      style={[
        {"backgroundColor":"#ddd"},
        ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
      ]}
      {...rprops}>
      <ReactNative.Text
        style={[
          {"fontSize":11,"padding":5,"color":"#666"},
          ReactNative.Platform.select({
          "ios":{"fontFamily":"Courier"},
          "default":{"fontFamily":"monospace"}
        }),
          ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
        ]}
        {...textProps}>{text}
      </ReactNative.Text>
    </ReactNative.View>);
}

// js.react-native/useTree [695] 
function useTree({branchesFn,displayFn,formatFn,initial,parents,root,setInitial,targetFn,tree}){
  formatFn = (formatFn || format_entry);
  displayFn = (displayFn || function (target,_branch,_parents,_root){
    return (
      <Caption text={formatFn(target)} style={{"flex":1}}></Caption>);
  });
  return r.useTree(
    {branchesFn,displayFn,formatFn,initial,parents,root,setInitial,targetFn,tree}
  );
}

// js.react-native/TabsIndexed [723] 
function TabsIndexed({
  items,
  onChange,
  checkIndex,
  setIndex,
  index,
  styleText,
  styleSelected,
  format = k.identity
}){
  let [internal,setInternal] = React.useState(index || 0);
  React.useEffect(function (){
    if(("number" == (typeof index)) && (internal != index)){
      setInternal(index);
    }
  });
  return (
    <ReactNative.View style={{"flexDirection":"row","flexWrap":"wrap"}}>
      {items.map(function (item,i){
        let text = format(item);
        let selected = i == internal;
        return (
          <ReactNative.TouchableOpacity
            key={item}
            style={{"transform":[{"scale":0.8}]}}
            onPress={function (){
              setInternal(i);
              if(setIndex){
                setIndex(i);
              }
              if(onChange){
                onChange(items[i]);
              }
            }}>
            <ReactNative.Text
              key={item}
              style={[
                Object.assign({"color":"#888","padding":2},styleText),
                selected ? Object.assign({
                "backgroundColor":"#888",
                "borderRadius":3,
                "color":"white",
                "padding":2
              },styleSelected) : null
              ]}>{text}
            </ReactNative.Text>
          </ReactNative.TouchableOpacity>);
      })}
    </ReactNative.View>);
}

// js.react-native/Tabs [767] 
function Tabs({data,valueFn,value,setValue,...rprops}){
  let {index,items,setIndex} = r.convertIndex({data,setValue,value,valueFn});
  return (
    <TabsIndexed setIndex={setIndex} items={items} index={index} {...rprops}></TabsIndexed>);
}

// js.react-native/TabsPane [787] 
function TabsPane({
  listWidth,
  tabsFormat,
  styleTabs,
  styleTabsText,
  styleTabsSelected,
  scroll,
  tree,
  parents,
  root,
  initial,
  setInitial,
  branchesFn,
  targetFn,
  formatFn,
  displayFn
}){
  let {branch,branches,setBranch,view} = useTree(
    {branchesFn,displayFn,formatFn,initial,parents,root,setInitial,targetFn,tree}
  );
  return (
    <ReactNative.View style={{"flex":1}}>
      <Tabs
        value={branch}
        setValue={function (k){
          setBranch(k);
        }}
        data={branches}
        format={tabsFormat}
        style={styleTabs}
        styleText={styleTabsText}
        styleSelected={styleTabsSelected}>
      </Tabs>
      {scroll ? (
        <ReactNative.ScrollView>{view}</ReactNative.ScrollView>) : view}
    </ReactNative.View>);
}

// js.react-native/ListIndexed [838] 
function ListIndexed({
  items,
  onChange,
  index,
  setIndex,
  initial,
  style,
  styleText,
  styleSelected,
  format = k.identity
}){
  if(!initial){
    initial = index;
  }
  let [internal,setInternal] = React.useState(initial || 0);
  React.useEffect(function (){
    if(internal != index){
      if(onChange){
        onChange(index);
      }
      setInternal(index);
    }
  },[index]);
  return (
    <ReactNative.FlatList
      data={k.arr_map(items,format)}
      keyExtractor={k.identity}
      renderItem={function (e){
        let {item} = e;
        let selected = e["index"] == internal;
        return (
          <ReactNative.TouchableOpacity
            key={e["index"]}
            onPress={function (){
              setInternal(e["index"]);
              setIndex(e["index"]);
            }}>
            <ReactNative.Text
              style={[
                ReactNative.Platform.select({
                "ios":{"fontFamily":"Courier"},
                "default":{"fontFamily":"monospace"}
              }),
                Object.assign({"fontSize":10,"padding":2,"color":"#888"},styleText),
                selected ? Object.assign({"backgroundColor":"#888","color":"white"},styleSelected) : null
              ]}>{format(item)}
            </ReactNative.Text>
          </ReactNative.TouchableOpacity>);
      }}>
    </ReactNative.FlatList>);
}

// js.react-native/List [882] 
function List({data,valueFn,value,setValue,...rprops}){
  let {index,items,setIndex} = r.convertIndex({data,setValue,value,valueFn});
  return (
    <ListIndexed setIndex={setIndex} items={items} index={index} {...rprops}></ListIndexed>);
}

// js.react-native/ListPane [902] 
function ListPane({
  listWidth,
  listFormat,
  styleList,
  styleListText,
  styleListSelected,
  direction = "row",
  scroll,
  tree,
  parents,
  root,
  initial,
  setInitial,
  branchesFn,
  targetFn,
  formatFn,
  displayFn
}){
  let {branch,branches,setBranch,view} = useTree(
    {branchesFn,displayFn,formatFn,initial,parents,root,setInitial,targetFn,tree}
  );
  return (
    <ReactNative.View style={{"flexDirection":direction,"flex":1}}>
      <ReactNative.View
        style={{"width":listWidth || 200,"height":"100%","overflow":"auto"}}>
        <List
          value={branch}
          setValue={function (k){
            setBranch(k);
          }}
          format={listFormat}
          data={branches}
          style={styleList}
          styleText={styleListText}
          styleSelected={styleListSelected}>
        </List>
      </ReactNative.View>
      {scroll ? (
        <ReactNative.ScrollView>{view}</ReactNative.ScrollView>) : (
        <ReactNative.View style={{"flex":1}}>{view}</ReactNative.View>)}
    </ReactNative.View>);
}

// js.react-native/TabsMultiIndexed [962] 
function TabsMultiIndexed({
  items,
  setIndices,
  indices,
  style,
  onChange,
  styleText,
  styleSelected,
  format = k.identity
}){
  let itemFn = function (item,i){
    let text = format(item);
    let selected = indices[i];
    return (
      <ReactNative.TouchableOpacity
        key={item}
        style={{"transform":[{"scale":0.8}]}}
        onPress={function (){
          let changed = indices.map(function (e,ei){
            return (ei == i) ? !e : e;
          });
          setIndices(changed);
          if(onChange){
            onChange(changed);
          }
        }}>
        <ReactNative.Text
          key={item}
          style={[
            Object.assign({"color":"#888","padding":2},styleText),
            selected ? Object.assign({
            "backgroundColor":"#888",
            "borderRadius":3,
            "color":"white",
            "padding":2
          },styleSelected) : null
          ]}>{text}
        </ReactNative.Text>
      </ReactNative.TouchableOpacity>);
  };
  return (
    <ReactNative.View style={{"flexDirection":"row","flexWrap":"wrap"}}>{items.map(itemFn)}</ReactNative.View>);
}

// js.react-native/TabsMulti [1004] 
function TabsMulti({data,valueFn,values,setValues,...rprops}){
  let {indices,items,setIndices} = r.convertIndices({data,setValues,valueFn,values});
  return (
    <TabsMultiIndexed
      setIndices={setIndices}
      items={items}
      indices={indices}
      {...rprops}>
    </TabsMultiIndexed>);
}

// js.react-native/TreePane [1042] 
function TreePane({tree,root = tree,parents = [],levels}){
  if(k.is_emptyp(levels)){
    return (
      <ReactNative.Text>NO DATA</ReactNative.Text>);
  }
  let [level,...more] = levels;
  let {type} = level;
  let Pane = (type == "list") ? ListPane : TabsPane;
  let isFinal = 1 == (levels).length;
  if(isFinal){
    return (
      <Pane tree={tree} root={root} parents={parents} {...level}></Pane>);
  }
  let formatFn = k.identity;
  let displayFn = function (newTree,branch,parents,root){
    return (
      <TreePane
        key={branch}
        tree={newTree}
        root={root}
        parents={[...parents,branch]}
        levels={more}>
      </TreePane>);
  };
  return (
    <Pane
      tree={tree}
      root={root}
      parents={parents}
      displayFn={displayFn}
      {...level}>
    </Pane>);
}

// js.react-native/displayTarget [1076] 
function displayTarget(Target){
  if(null == Target){
    return (
      <ReactNative.View></ReactNative.View>);
  }
  else{
    return (
      <ReactNative.View style={{"flex":1,"padding":10,"overflow":"auto"}}><Target></Target></ReactNative.View>);
  }
}

// js.react-native/BaseIndicator [1088] 
function BaseIndicator({cardStyle,color,content,label,onPress,styleText,waiting}){
  return (
    <ReactNative.TouchableOpacity onPress={onPress} disabled={waiting}>
      <ReactNative.View style={{"flexDirection":"row","alignItems":"center"}}>
        <ReactNative.Text
          style={{"fontSize":11,"padding":10,"fontWeight":"900","color":"#555"}}>{label}
        </ReactNative.Text>
        <ReactNative.View style={{"flex":1}}></ReactNative.View>
        <ReactNative.Text
          style={[
            {
            "color":"white",
            "borderRadius":5,
            "paddingRight":8,
            "width":70,
            "paddingLeft":8,
            "padding":3,
            "fontWeight":"900",
            "fontSize":11,
            "backgroundColor":"rgb(112, 168, 195)",
            "marginRight":10
          },
            ...(Array.isArray(styleText || []) ? (styleText || []) : ((null == (styleText || [])) ? [] : [styleText || []])),
            waiting ? {"textAlign":"center"} : null
          ]}>
          {waiting ? (
            <ReactNative.ActivityIndicator
              animating={waiting}
              color="#aaa"
              style={{"height":5,"top":5,"transform":[{"scale":0.7}]}}>
            </ReactNative.ActivityIndicator>) : content}
        </ReactNative.Text>
      </ReactNative.View>
    </ReactNative.TouchableOpacity>);
}

// js.react-native/ToggleIndicator [1129] 
function ToggleIndicator({active,label,onPress,waiting}){
  return (
    <BaseIndicator
      content={active ? "ON" : "OFF"}
      label={label}
      styleText={active ? {"textAlign":"left","backgroundColor":"rgb(134, 215, 134)"} : {"textAlign":"right","backgroundColor":"rgb(144, 55, 55)"}}
      waiting={waiting}
      onPress={onPress}>
    </BaseIndicator>);
}

// js.react-native/RecordList [1149] 
function RecordList({columns,entry}){
  return (
    <>
      {columns.map(function ([label,key,f]){
        f = (f || k.identity);
        let val = entry[key];
        let output = f(val,entry);
        return (
          <ReactNative.View key={key} style={{"flexDirection":"row"}}>
            <ReactNative.Text style={{"fontSize":11,"fontWeight":"700","color":"#777"}}>{label}</ReactNative.Text>
            <ReactNative.View style={{"flex":1}}></ReactNative.View>
            <ReactNative.Text style={{"fontSize":11,"color":"#777","fontWeight":"500"}}>{"" + output}</ReactNative.Text>
          </ReactNative.View>);
      })}
    </>);
}

// js.react-native/TextDisplay [1178] 
function TextDisplay({content,style,styleText,...rprops}){
  let text = content || format_entry(rprops);
  let clipboard = globalThis["navigator"] && globalThis["navigator"].clipboard;
  return (
    <>
      <ReactNative.View
        style={[
          {
          "flex":1,
          "padding":10,
          "backgroundColor":"#bbb",
          "overflow":"auto"
        },
          ...(Array.isArray(style) ? style : ((null == style) ? [] : [style]))
        ]}>
        <ReactNative.Text
          style={[
            ReactNative.Platform.select({
            "ios":{"fontFamily":"Courier"},
            "default":{"fontFamily":"monospace"}
          }),
            {"color":"#333","fontSize":10},
            ...(Array.isArray(styleText) ? styleText : ((null == styleText) ? [] : [styleText]))
          ]}>{text}
        </ReactNative.Text>
      </ReactNative.View>
      {clipboard ? (
        <ReactNative.View style={{"position":"absolute","top":10,"right":10}}>
          <ReactNative.Button
            title="Copy"
            onPress={function (){
              clipboard.writeText(format_obj(rprops));
            }}>
          </ReactNative.Button>
        </ReactNative.View>) : null}
    </>);
}

// js.react-native/defaultGlobal [1220] 
function defaultGlobal(){
  return {"isDev":true,"isTransition":false};
}

// js.react-native/Global [1228] 
globalThis["js_react_native$$Global"] = React.createContext(defaultGlobal());

// js.react-native/GlobalProvider [1231] 
function GlobalProvider({children,value}){
  let {Provider} = globalThis["js_react_native$$Global"];
  return (
    <Provider value={Object.assign(defaultGlobal(),value)}>{children}</Provider>);
}

// js.react-native/PortalRegistery [1247] 
globalThis["js_react_native$$PortalRegistery"] = React.createContext(helper_portal.newRegistry());

// js.react-native/PortalProvider [1250] 
function PortalProvider({children,registry}){
  let {Provider} = globalThis["js_react_native$$PortalRegistery"];
  let value = React.useCallback(registry || helper_portal.newRegistry(),[]);
  return (
    <Provider value={value}>{children}</Provider>);
}

// js.react-native/PortalSinkImpl [1263] 
function PortalSinkImpl({name,registry,children,onSource,...rprops}){
  let [source,setSource] = React.useState();
  let sinkRef = React.useRef();
  React.useEffect(function (){
    helper_portal.addSink(registry,name,{setSource,sinkRef});
    return function (){
      helper_portal.removeSink(registry,name);
    };
  },[]);
  React.useEffect(function (){
    if(onSource){
      onSource(source);
    }
  },[source]);
  return (
    <ReactNative.View ref={sinkRef} {...rprops}>{children}{source}</ReactNative.View>);
}

// js.react-native/PortalSink [1288] 
function PortalSink({name = "default",children,...rprops}){
  let {Consumer} = globalThis["js_react_native$$PortalRegistery"];
  return (
    <Consumer>
      {function (registry){
        return React.createElement(PortalSinkImpl,{name,registry,children,...rprops});
      }}
    </Consumer>);
}

// js.react-native/Isolation [1301] 
function Isolation(props){
  return (
    <PortalProvider><PortalSink {...props}></PortalSink></PortalProvider>);
}

// js.react-native/PortalImpl [1310] 
function PortalImpl({
  target,
  registry,
  children,
  onSink = function (){
  return null;
}
}){
  let portalId = r.id();
  React.useEffect(function (){
    helper_portal.addSource(registry,target,portalId,children);
  });
  React.useEffect(function (){
    helper_portal.captureSink(registry,target,portalId,onSink);
    return function (){
      helper_portal.removeSource(registry,target,portalId);
      onSink(null);
    };
  },[]);
  return (
    <ReactNative.View></ReactNative.View>);
}

// js.react-native/Portal [1330] 
function Portal({target = "default",...rprops}){
  let {Consumer} = globalThis["js_react_native$$PortalRegistery"];
  return (
    <Consumer>
      {function (registry){
        return (
          <PortalImpl target={target} registry={registry} {...rprops}></PortalImpl>);
      }}
    </Consumer>);
}

// js.react-native/usePortalLayouts [1343] 
function usePortalLayouts(hostRef,setLayouts){
  let [sinkRef,setSinkRef] = React.useState();
  let contentRef = React.useRef();
  let getLayouts = function (){
    let contentElem = k.get_in(contentRef,["current","children",0]) || k.get_in(contentRef,["current","_children",0]);
    if(contentElem && sinkRef){
      Promise.all([
        measureRef(sinkRef),
        hostRef ? measureRef(hostRef) : new Promise(function (resolve){
              return resolve();
            }),
        measure(contentElem)
      ]).then(function ([sinkLayout,hostLayout,contentLayout]){
        setLayouts(
          {"sink":sinkLayout,"host":hostLayout,"content":contentLayout}
        );
      });
    }
  };
  React.useEffect(function (){
    if(sinkRef){
      getLayouts();
    }
  },[sinkRef]);
  return {contentRef,getLayouts,setSinkRef,sinkRef};
}

var MODULE = {
  "format_obj":format_obj,
  "format_entry":format_entry,
  "measure":measure,
  "measureRef":measureRef,
  "Enclosed":Enclosed,
  "EnclosedCodeContainer":EnclosedCodeContainer,
  "Row":Row,
  "Fill":Fill,
  "H1":H1,
  "H2":H2,
  "H3":H3,
  "H4":H4,
  "H5":H5,
  "Caption":Caption,
  "useTree":useTree,
  "TabsIndexed":TabsIndexed,
  "Tabs":Tabs,
  "TabsPane":TabsPane,
  "ListIndexed":ListIndexed,
  "List":List,
  "ListPane":ListPane,
  "TabsMultiIndexed":TabsMultiIndexed,
  "TabsMulti":TabsMulti,
  "TreePane":TreePane,
  "displayTarget":displayTarget,
  "BaseIndicator":BaseIndicator,
  "ToggleIndicator":ToggleIndicator,
  "RecordList":RecordList,
  "TextDisplay":TextDisplay,
  "defaultGlobal":defaultGlobal,
  "GlobalProvider":GlobalProvider,
  "PortalProvider":PortalProvider,
  "PortalSinkImpl":PortalSinkImpl,
  "PortalSink":PortalSink,
  "Isolation":Isolation,
  "PortalImpl":PortalImpl,
  "Portal":Portal,
  "usePortalLayouts":usePortalLayouts
};

export default MODULE