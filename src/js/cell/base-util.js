import k from '../../xt/lang/base-lib'

// js.cell.base-util/rand-id [14] 
function rand_id(prefix,n){
  return (prefix || "") + Math.random().toString(36).substr(2,n || 4);
}

// js.cell.base-util/check-event [21] 
function check_event(pred,topic,event,ctx){
  let check = false;
  try{
    let t = (null == pred) ? true : (("boolean" == (typeof pred)) ? pred : (k.fnp(pred) ? pred(topic,ctx) : (k.objp(pred) ? pred[topic] : (topic == pred))));
    check = ((true == t) || (k.fnp(t) && t(event,ctx)) || false);
  }
  catch(err){
    console.log(
      " js.cell.base-util/check-event",
      44,
      "\n\n",
      {"stack":err["stack"],"message":err["message"]}
    );
  }
  return check;
}

// js.cell.base-util/arg-encode [48] 
function arg_encode(arg){
  return k.walk(arg,function (x){
    if(k.fnp(x)){
      return ["fn",String(x)];
    }
    else{
      return x;
    }
  },k.identity);
}

// js.cell.base-util/arg-decode [59] 
function arg_decode(arg){
  return k.walk(arg,function (x){
    if(k.arrp(x) && (2 == (x).length) && ("fn" == x[0])){
      return eval("(" + x[1] + ")");
    }
    else{
      return x;
    }
  },k.identity);
}

var MODULE = {
  "rand_id":rand_id,
  "check_event":check_event,
  "arg_encode":arg_encode,
  "arg_decode":arg_decode
};

export default MODULE