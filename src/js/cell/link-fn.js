import link_raw from './link-raw'

// js.cell.link-fn/trigger [33] 
function trigger(link,op,topic,status,body){
  return link_raw.call(link,{
    "op":"route",
    "route":"@/trigger",
    "body":[op,topic,status,body]
  });
}

// js.cell.link-fn/trigger-async [33] 
function trigger_async(link,op,topic,status,body,ms){
  return link_raw.call(link,{
    "op":"route",
    "route":"@/trigger-async",
    "body":[op,topic,status,body,ms]
  });
}

// js.cell.link-fn/final-set [33] 
function final_set(link,suppress){
  return link_raw.call(link,{"op":"route","route":"@/final-set","body":[suppress]});
}

// js.cell.link-fn/final-status [33] 
function final_status(link){
  return link_raw.call(link,{"op":"route","route":"@/final-status","body":[]});
}

// js.cell.link-fn/eval-enable [33] 
function eval_enable(link,suppress){
  return link_raw.call(
    link,
    {"op":"route","route":"@/eval-enable","body":[suppress]}
  );
}

// js.cell.link-fn/eval-disable [33] 
function eval_disable(link,suppress){
  return link_raw.call(
    link,
    {"op":"route","route":"@/eval-disable","body":[suppress]}
  );
}

// js.cell.link-fn/eval-status [33] 
function eval_status(link){
  return link_raw.call(link,{"op":"route","route":"@/eval-status","body":[]});
}

// js.cell.link-fn/route-list [33] 
function route_list(link){
  return link_raw.call(link,{"op":"route","route":"@/route-list","body":[]});
}

// js.cell.link-fn/route-entry [33] 
function route_entry(link,name){
  return link_raw.call(link,{"op":"route","route":"@/route-entry","body":[name]});
}

// js.cell.link-fn/ping [33] 
function ping(link){
  return link_raw.call(link,{"op":"route","route":"@/ping","body":[]});
}

// js.cell.link-fn/ping-async [33] 
function ping_async(link,ms){
  return link_raw.call(link,{"op":"route","route":"@/ping-async","body":[ms]});
}

// js.cell.link-fn/echo [33] 
function echo(link,arg){
  return link_raw.call(link,{"op":"route","route":"@/echo","body":[arg]});
}

// js.cell.link-fn/echo-async [33] 
function echo_async(link,arg,ms){
  return link_raw.call(link,{"op":"route","route":"@/echo-async","body":[arg,ms]});
}

// js.cell.link-fn/error [33] 
function error(link){
  return link_raw.call(link,{"op":"route","route":"@/error","body":[]});
}

// js.cell.link-fn/error-async [33] 
function error_async(link,ms){
  return link_raw.call(link,{"op":"route","route":"@/error-async","body":[ms]});
}

var MODULE = {
  "trigger":trigger,
  "trigger_async":trigger_async,
  "final_set":final_set,
  "final_status":final_status,
  "eval_enable":eval_enable,
  "eval_disable":eval_disable,
  "eval_status":eval_status,
  "route_list":route_list,
  "route_entry":route_entry,
  "ping":ping,
  "ping_async":ping_async,
  "echo":echo,
  "echo_async":echo_async,
  "error":error,
  "error_async":error_async
};

export default MODULE