(function(){
var G4=Object.create;var{getPrototypeOf:Z4,defineProperty:QZ,getOwnPropertyNames:l4}=Object;var C4=Object.prototype.hasOwnProperty;var ZW=(A,E,M)=>{M=A!=null?G4(Z4(A)):{};let W=E||!A||!A.__esModule?QZ(M,"default",{value:A,enumerable:!0}):M;for(let w of l4(A))if(!C4.call(W,w))QZ(W,w,{get:()=>A[w],enumerable:!0});return W};var jK=(A,E)=>()=>(E||A((E={exports:{}}).exports,E),E.exports);var F4=(A,E)=>{for(var M in E)QZ(A,M,{get:E[M],enumerable:!0,configurable:!0,set:(W)=>E[M]=()=>W})};var D4=(A,E)=>()=>(A&&(E=A(A=0)),E);var Fw=jK((k4)=>{var YU=Symbol.for("react.element"),I4=Symbol.for("react.portal"),O4=Symbol.for("react.fragment"),N4=Symbol.for("react.strict_mode"),J4=Symbol.for("react.profiler"),q4=Symbol.for("react.provider"),z4=Symbol.for("react.context"),Q4=Symbol.for("react.forward_ref"),X4=Symbol.for("react.suspense"),R4=Symbol.for("react.memo"),B4=Symbol.for("react.lazy"),iF=Symbol.iterator;function V4(A){if(A===null||typeof A!=="object")return null;return A=iF&&A[iF]||A["@@iterator"],typeof A==="function"?A:null}var rF={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},aF=Object.assign,tF={};function aw(A,E,M){this.props=A,this.context=E,this.refs=tF,this.updater=M||rF}aw.prototype.isReactComponent={};aw.prototype.setState=function(A,E){if(typeof A!=="object"&&typeof A!=="function"&&A!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,A,E,"setState")};aw.prototype.forceUpdate=function(A){this.updater.enqueueForceUpdate(this,A,"forceUpdate")};function $F(){}$F.prototype=aw.prototype;function RZ(A,E,M){this.props=A,this.context=E,this.refs=tF,this.updater=M||rF}var BZ=RZ.prototype=new $F;BZ.constructor=RZ;aF(BZ,aw.prototype);BZ.isPureReactComponent=!0;var sF=Array.isArray,_F=Object.prototype.hasOwnProperty,VZ={current:null},eF={key:!0,ref:!0,__self:!0,__source:!0};function A1(A,E,M){var W,w={},Y=null,U=null;if(E!=null)for(W in E.ref!==void 0&&(U=E.ref),E.key!==void 0&&(Y=""+E.key),E)_F.call(E,W)&&!eF.hasOwnProperty(W)&&(w[W]=E[W]);var K=arguments.length-2;if(K===1)w.children=M;else if(1<K){for(var L=Array(K),G=0;G<K;G++)L[G]=arguments[G+2];w.children=L}if(A&&A.defaultProps)for(W in K=A.defaultProps,K)w[W]===void 0&&(w[W]=K[W]);return{$$typeof:YU,type:A,key:Y,ref:U,props:w,_owner:VZ.current}}function H4(A,E){return{$$typeof:YU,type:A.type,key:E,ref:A.ref,props:A.props,_owner:A._owner}}function HZ(A){return typeof A==="object"&&A!==null&&A.$$typeof===YU}function y4(A){var E={"=":"=0",":":"=2"};return"$"+A.replace(/[=:]/g,function(M){return E[M]})}var oF=/\/+/g;function XZ(A,E){return typeof A==="object"&&A!==null&&A.key!=null?y4(""+A.key):E.toString(36)}function gK(A,E,M,W,w){var Y=typeof A;if(Y==="undefined"||Y==="boolean")A=null;var U=!1;if(A===null)U=!0;else switch(Y){case"string":case"number":U=!0;break;case"object":switch(A.$$typeof){case YU:case I4:U=!0}}if(U)return U=A,w=w(U),A=W===""?"."+XZ(U,0):W,sF(w)?(M="",A!=null&&(M=A.replace(oF,"$&/")+"/"),gK(w,E,M,"",function(G){return G})):w!=null&&(HZ(w)&&(w=H4(w,M+(!w.key||U&&U.key===w.key?"":(""+w.key).replace(oF,"$&/")+"/")+A)),E.push(w)),1;if(U=0,W=W===""?".":W+":",sF(A))for(var K=0;K<A.length;K++){Y=A[K];var L=W+XZ(Y,K);U+=gK(Y,E,M,L,w)}else if(L=V4(A),typeof L==="function")for(A=L.call(A),K=0;!(Y=A.next()).done;)Y=Y.value,L=W+XZ(Y,K++),U+=gK(Y,E,M,L,w);else if(Y==="object")throw E=String(A),Error("Objects are not valid as a React child (found: "+(E==="[object Object]"?"object with keys {"+Object.keys(A).join(", ")+"}":E)+"). If you meant to render a collection of children, use an array instead.");return U}function vK(A,E,M){if(A==null)return A;var W=[],w=0;return gK(A,W,"","",function(Y){return E.call(M,Y,w++)}),W}function T4(A){if(A._status===-1){var E=A._result;E=E(),E.then(function(M){if(A._status===0||A._status===-1)A._status=1,A._result=M},function(M){if(A._status===0||A._status===-1)A._status=2,A._result=M}),A._status===-1&&(A._status=0,A._result=E)}if(A._status===1)return A._result.default;throw A._result}var AM={current:null},pK={transition:null},S4={ReactCurrentDispatcher:AM,ReactCurrentBatchConfig:pK,ReactCurrentOwner:VZ};function E1(){throw Error("act(...) is not supported in production builds of React.")}k4.Children={map:vK,forEach:function(A,E,M){vK(A,function(){E.apply(this,arguments)},M)},count:function(A){var E=0;return vK(A,function(){E++}),E},toArray:function(A){return vK(A,function(E){return E})||[]},only:function(A){if(!HZ(A))throw Error("React.Children.only expected to receive a single React element child.");return A}};k4.Component=aw;k4.Fragment=O4;k4.Profiler=J4;k4.PureComponent=RZ;k4.StrictMode=N4;k4.Suspense=X4;k4.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=S4;k4.act=E1;k4.cloneElement=function(A,E,M){if(A===null||A===void 0)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+A+".");var W=aF({},A.props),w=A.key,Y=A.ref,U=A._owner;if(E!=null){if(E.ref!==void 0&&(Y=E.ref,U=VZ.current),E.key!==void 0&&(w=""+E.key),A.type&&A.type.defaultProps)var K=A.type.defaultProps;for(L in E)_F.call(E,L)&&!eF.hasOwnProperty(L)&&(W[L]=E[L]===void 0&&K!==void 0?K[L]:E[L])}var L=arguments.length-2;if(L===1)W.children=M;else if(1<L){K=Array(L);for(var G=0;G<L;G++)K[G]=arguments[G+2];W.children=K}return{$$typeof:YU,type:A.type,key:w,ref:Y,props:W,_owner:U}};k4.createContext=function(A){return A={$$typeof:z4,_currentValue:A,_currentValue2:A,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},A.Provider={$$typeof:q4,_context:A},A.Consumer=A};k4.createElement=A1;k4.createFactory=function(A){var E=A1.bind(null,A);return E.type=A,E};k4.createRef=function(){return{current:null}};k4.forwardRef=function(A){return{$$typeof:Q4,render:A}};k4.isValidElement=HZ;k4.lazy=function(A){return{$$typeof:B4,_payload:{_status:-1,_result:A},_init:T4}};k4.memo=function(A,E){return{$$typeof:R4,type:A,compare:E===void 0?null:E}};k4.startTransition=function(A){var E=pK.transition;pK.transition={};try{A()}finally{pK.transition=E}};k4.unstable_act=E1;k4.useCallback=function(A,E){return AM.current.useCallback(A,E)};k4.useContext=function(A){return AM.current.useContext(A)};k4.useDebugValue=function(){};k4.useDeferredValue=function(A){return AM.current.useDeferredValue(A)};k4.useEffect=function(A,E){return AM.current.useEffect(A,E)};k4.useId=function(){return AM.current.useId()};k4.useImperativeHandle=function(A,E,M){return AM.current.useImperativeHandle(A,E,M)};k4.useInsertionEffect=function(A,E){return AM.current.useInsertionEffect(A,E)};k4.useLayoutEffect=function(A,E){return AM.current.useLayoutEffect(A,E)};k4.useMemo=function(A,E){return AM.current.useMemo(A,E)};k4.useReducer=function(A,E,M){return AM.current.useReducer(A,E,M)};k4.useRef=function(A){return AM.current.useRef(A)};k4.useState=function(A){return AM.current.useState(A)};k4.useSyncExternalStore=function(A,E,M){return AM.current.useSyncExternalStore(A,E,M)};k4.useTransition=function(){return AM.current.useTransition()};k4.version="18.3.1"});var L1=jK((DJ)=>{function TZ(A,E){var M=A.length;A.push(E);A:for(;0<M;){var W=M-1>>>1,w=A[W];if(0<bK(w,E))A[W]=E,A[M]=w,M=W;else break A}}function vM(A){return A.length===0?null:A[0]}function dK(A){if(A.length===0)return null;var E=A[0],M=A.pop();if(M!==E){A[0]=M;A:for(var W=0,w=A.length,Y=w>>>1;W<Y;){var U=2*(W+1)-1,K=A[U],L=U+1,G=A[L];if(0>bK(K,M))L<w&&0>bK(G,K)?(A[W]=G,A[L]=M,W=L):(A[W]=K,A[U]=M,W=U);else if(L<w&&0>bK(G,M))A[W]=G,A[L]=M,W=L;else break A}}return E}function bK(A,E){var M=A.sortIndex-E.sortIndex;return M!==0?M:A.id-E.id}if(typeof performance==="object"&&typeof performance.now==="function")SZ=performance,DJ.unstable_now=function(){return SZ.now()};else cK=Date,kZ=cK.now(),DJ.unstable_now=function(){return cK.now()-kZ};var SZ,cK,kZ,_M=[],kW=[],FJ=1,HM=null,dE=3,iK=!1,Dw=!1,KU=!1,W1=typeof setTimeout==="function"?setTimeout:null,w1=typeof clearTimeout==="function"?clearTimeout:null,M1=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function xZ(A){for(var E=vM(kW);E!==null;){if(E.callback===null)dK(kW);else if(E.startTime<=A)dK(kW),E.sortIndex=E.expirationTime,TZ(_M,E);else break;E=vM(kW)}}function uZ(A){if(KU=!1,xZ(A),!Dw)if(vM(_M)!==null)Dw=!0,fZ(hZ);else{var E=vM(kW);E!==null&&jZ(uZ,E.startTime-A)}}function hZ(A,E){Dw=!1,KU&&(KU=!1,w1(LU),LU=-1),iK=!0;var M=dE;try{xZ(E);for(HM=vM(_M);HM!==null&&(!(HM.expirationTime>E)||A&&!K1());){var W=HM.callback;if(typeof W==="function"){HM.callback=null,dE=HM.priorityLevel;var w=W(HM.expirationTime<=E);E=DJ.unstable_now(),typeof w==="function"?HM.callback=w:HM===vM(_M)&&dK(_M),xZ(E)}else dK(_M);HM=vM(_M)}if(HM!==null)var Y=!0;else{var U=vM(kW);U!==null&&jZ(uZ,U.startTime-E),Y=!1}return Y}finally{HM=null,dE=M,iK=!1}}var sK=!1,nK=null,LU=-1,Y1=5,U1=-1;function K1(){return DJ.unstable_now()-U1<Y1?!1:!0}function yZ(){if(nK!==null){var A=DJ.unstable_now();U1=A;var E=!0;try{E=nK(!0,A)}finally{E?UU():(sK=!1,nK=null)}}else sK=!1}var UU;if(typeof M1==="function")UU=function(){M1(yZ)};else if(typeof MessageChannel<"u")mK=new MessageChannel,PZ=mK.port2,mK.port1.onmessage=yZ,UU=function(){PZ.postMessage(null)};else UU=function(){W1(yZ,0)};var mK,PZ;function fZ(A){nK=A,sK||(sK=!0,UU())}function jZ(A,E){LU=W1(function(){A(DJ.unstable_now())},E)}DJ.unstable_IdlePriority=5;DJ.unstable_ImmediatePriority=1;DJ.unstable_LowPriority=4;DJ.unstable_NormalPriority=3;DJ.unstable_Profiling=null;DJ.unstable_UserBlockingPriority=2;DJ.unstable_cancelCallback=function(A){A.callback=null};DJ.unstable_continueExecution=function(){Dw||iK||(Dw=!0,fZ(hZ))};DJ.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y1=0<A?Math.floor(1000/A):5};DJ.unstable_getCurrentPriorityLevel=function(){return dE};DJ.unstable_getFirstCallbackNode=function(){return vM(_M)};DJ.unstable_next=function(A){switch(dE){case 1:case 2:case 3:var E=3;break;default:E=dE}var M=dE;dE=E;try{return A()}finally{dE=M}};DJ.unstable_pauseExecution=function(){};DJ.unstable_requestPaint=function(){};DJ.unstable_runWithPriority=function(A,E){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var M=dE;dE=A;try{return E()}finally{dE=M}};DJ.unstable_scheduleCallback=function(A,E,M){var W=DJ.unstable_now();switch(typeof M==="object"&&M!==null?(M=M.delay,M=typeof M==="number"&&0<M?W+M:W):M=W,A){case 1:var w=-1;break;case 2:w=250;break;case 5:w=1073741823;break;case 4:w=1e4;break;default:w=5000}return w=M+w,A={id:FJ++,callback:E,priorityLevel:A,startTime:M,expirationTime:w,sortIndex:-1},M>W?(A.sortIndex=M,TZ(kW,A),vM(_M)===null&&A===vM(kW)&&(KU?(w1(LU),LU=-1):KU=!0,jZ(uZ,M-W))):(A.sortIndex=w,TZ(_M,A),Dw||iK||(Dw=!0,fZ(hZ))),A};DJ.unstable_shouldYield=K1;DJ.unstable_wrapCallback=function(A){var E=dE;return function(){var M=dE;dE=E;try{return A.apply(this,arguments)}finally{dE=M}}}});var n8={};F4(n8,{version:()=>X5,unstable_renderSubtreeIntoContainer:()=>Q5,unstable_batchedUpdates:()=>z5,unmountComponentAtNode:()=>q5,render:()=>J5,hydrateRoot:()=>N5,hydrate:()=>O5,flushSync:()=>I5,findDOMNode:()=>D5,createRoot:()=>F5,createPortal:()=>C5,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:()=>l5});function $(A){for(var E="https://reactjs.org/docs/error-decoder.html?invariant="+A,M=1;M<arguments.length;M++)E+="&args[]="+encodeURIComponent(arguments[M]);return"Minified React error #"+A+"; visit "+E+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Tw(A,E){NY(A,E),NY(A+"Capture",E)}function NY(A,E){uU[A]=E;for(A=0;A<E.length;A++)DD.add(E[A])}function hJ(A){if(wl.call(Z1,A))return!0;if(wl.call(G1,A))return!1;if(uJ.test(A))return Z1[A]=!0;return G1[A]=!0,!1}function fJ(A,E,M,W){if(M!==null&&M.type===0)return!1;switch(typeof E){case"function":case"symbol":return!0;case"boolean":if(W)return!1;if(M!==null)return!M.acceptsBooleans;return A=A.toLowerCase().slice(0,5),A!=="data-"&&A!=="aria-";default:return!1}}function jJ(A,E,M,W){if(E===null||typeof E>"u"||fJ(A,E,M,W))return!0;if(W)return!1;if(M!==null)switch(M.type){case 3:return!E;case 4:return E===!1;case 5:return isNaN(E);case 6:return isNaN(E)||1>E}return!1}function WM(A,E,M,W,w,Y,U){this.acceptsBooleans=E===2||E===3||E===4,this.attributeName=W,this.attributeNamespace=w,this.mustUseProperty=M,this.propertyName=A,this.type=E,this.sanitizeURL=Y,this.removeEmptyString=U}function el(A){return A[1].toUpperCase()}function A8(A,E,M,W){var w=mE.hasOwnProperty(E)?mE[E]:null;if(w!==null?w.type!==0:W||!(2<E.length)||E[0]!=="o"&&E[0]!=="O"||E[1]!=="n"&&E[1]!=="N")jJ(E,M,w,W)&&(M=null),W||w===null?hJ(E)&&(M===null?A.removeAttribute(E):A.setAttribute(E,""+M)):w.mustUseProperty?A[w.propertyName]=M===null?w.type===3?!1:"":M:(E=w.attributeName,W=w.attributeNamespace,M===null?A.removeAttribute(E):(w=w.type,M=w===3||w===4&&M===!0?"":""+M,W?A.setAttributeNS(W,E,M):A.setAttribute(E,M)))}function GU(A){if(A===null||typeof A!=="object")return null;return A=l1&&A[l1]||A["@@iterator"],typeof A==="function"?A:null}function OU(A){if(vZ===void 0)try{throw Error()}catch(M){var E=M.stack.trim().match(/\n( *(at )?)/);vZ=E&&E[1]||""}return`
`+vZ+A}function pZ(A,E){if(!A||gZ)return"";gZ=!0;var M=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(E)if(E=function(){throw Error()},Object.defineProperty(E.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==="object"&&Reflect.construct){try{Reflect.construct(E,[])}catch(G){var W=G}Reflect.construct(A,[],E)}else{try{E.call()}catch(G){W=G}A.call(E.prototype)}else{try{throw Error()}catch(G){W=G}A()}}catch(G){if(G&&W&&typeof G.stack==="string"){for(var w=G.stack.split(`
`),Y=W.stack.split(`
`),U=w.length-1,K=Y.length-1;1<=U&&0<=K&&w[U]!==Y[K];)K--;for(;1<=U&&0<=K;U--,K--)if(w[U]!==Y[K]){if(U!==1||K!==1)do if(U--,K--,0>K||w[U]!==Y[K]){var L=`
`+w[U].replace(" at new "," at ");return A.displayName&&L.includes("<anonymous>")&&(L=L.replace("<anonymous>",A.displayName)),L}while(1<=U&&0<=K);break}}}finally{gZ=!1,Error.prepareStackTrace=M}return(A=A?A.displayName||A.name:"")?OU(A):""}function vJ(A){switch(A.tag){case 5:return OU(A.type);case 16:return OU("Lazy");case 13:return OU("Suspense");case 19:return OU("SuspenseList");case 0:case 2:case 15:return A=pZ(A.type,!1),A;case 11:return A=pZ(A.type.render,!1),A;case 1:return A=pZ(A.type,!0),A;default:return""}}function Ll(A){if(A==null)return null;if(typeof A==="function")return A.displayName||A.name||null;if(typeof A==="string")return A;switch(A){case AY:return"Fragment";case ew:return"Portal";case Yl:return"Profiler";case E8:return"StrictMode";case Ul:return"Suspense";case Kl:return"SuspenseList"}if(typeof A==="object")switch(A.$$typeof){case OD:return(A.displayName||"Context")+".Consumer";case ID:return(A._context.displayName||"Context")+".Provider";case M8:var E=A.render;return A=A.displayName,A||(A=E.displayName||E.name||"",A=A!==""?"ForwardRef("+A+")":"ForwardRef"),A;case W8:return E=A.displayName||null,E!==null?E:Ll(A.type)||"Memo";case PW:E=A._payload,A=A._init;try{return Ll(A(E))}catch(M){}}return null}function gJ(A){var E=A.type;switch(A.tag){case 24:return"Cache";case 9:return(E.displayName||"Context")+".Consumer";case 10:return(E._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return A=E.render,A=A.displayName||A.name||"",E.displayName||(A!==""?"ForwardRef("+A+")":"ForwardRef");case 7:return"Fragment";case 5:return E;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ll(E);case 8:return E===E8?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof E==="function")return E.displayName||E.name||null;if(typeof E==="string")return E}return null}function sW(A){switch(typeof A){case"boolean":case"number":case"string":case"undefined":return A;case"object":return A;default:return""}}function JD(A){var E=A.type;return(A=A.nodeName)&&A.toLowerCase()==="input"&&(E==="checkbox"||E==="radio")}function pJ(A){var E=JD(A)?"checked":"value",M=Object.getOwnPropertyDescriptor(A.constructor.prototype,E),W=""+A[E];if(!A.hasOwnProperty(E)&&typeof M<"u"&&typeof M.get==="function"&&typeof M.set==="function"){var{get:w,set:Y}=M;return Object.defineProperty(A,E,{configurable:!0,get:function(){return w.call(this)},set:function(U){W=""+U,Y.call(this,U)}}),Object.defineProperty(A,E,{enumerable:M.enumerable}),{getValue:function(){return W},setValue:function(U){W=""+U},stopTracking:function(){A._valueTracker=null,delete A[E]}}}}function rK(A){A._valueTracker||(A._valueTracker=pJ(A))}function qD(A){if(!A)return!1;var E=A._valueTracker;if(!E)return!0;var M=E.getValue(),W="";return A&&(W=JD(A)?A.checked?"true":"false":A.value),A=W,A!==M?(E.setValue(A),!0):!1}function qL(A){if(A=A||(typeof document<"u"?document:void 0),typeof A>"u")return null;try{return A.activeElement||A.body}catch(E){return A.body}}function Gl(A,E){var M=E.checked;return OE({},E,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:M!=null?M:A._wrapperState.initialChecked})}function C1(A,E){var M=E.defaultValue==null?"":E.defaultValue,W=E.checked!=null?E.checked:E.defaultChecked;M=sW(E.value!=null?E.value:M),A._wrapperState={initialChecked:W,initialValue:M,controlled:E.type==="checkbox"||E.type==="radio"?E.checked!=null:E.value!=null}}function zD(A,E){E=E.checked,E!=null&&A8(A,"checked",E,!1)}function Zl(A,E){zD(A,E);var M=sW(E.value),W=E.type;if(M!=null)if(W==="number"){if(M===0&&A.value===""||A.value!=M)A.value=""+M}else A.value!==""+M&&(A.value=""+M);else if(W==="submit"||W==="reset"){A.removeAttribute("value");return}E.hasOwnProperty("value")?ll(A,E.type,M):E.hasOwnProperty("defaultValue")&&ll(A,E.type,sW(E.defaultValue)),E.checked==null&&E.defaultChecked!=null&&(A.defaultChecked=!!E.defaultChecked)}function F1(A,E,M){if(E.hasOwnProperty("value")||E.hasOwnProperty("defaultValue")){var W=E.type;if(!(W!=="submit"&&W!=="reset"||E.value!==void 0&&E.value!==null))return;E=""+A._wrapperState.initialValue,M||E===A.value||(A.value=E),A.defaultValue=E}M=A.name,M!==""&&(A.name=""),A.defaultChecked=!!A._wrapperState.initialChecked,M!==""&&(A.name=M)}function ll(A,E,M){if(E!=="number"||qL(A.ownerDocument)!==A)M==null?A.defaultValue=""+A._wrapperState.initialValue:A.defaultValue!==""+M&&(A.defaultValue=""+M)}function lY(A,E,M,W){if(A=A.options,E){E={};for(var w=0;w<M.length;w++)E["$"+M[w]]=!0;for(M=0;M<A.length;M++)w=E.hasOwnProperty("$"+A[M].value),A[M].selected!==w&&(A[M].selected=w),w&&W&&(A[M].defaultSelected=!0)}else{M=""+sW(M),E=null;for(w=0;w<A.length;w++){if(A[w].value===M){A[w].selected=!0,W&&(A[w].defaultSelected=!0);return}E!==null||A[w].disabled||(E=A[w])}E!==null&&(E.selected=!0)}}function Cl(A,E){if(E.dangerouslySetInnerHTML!=null)throw Error($(91));return OE({},E,{value:void 0,defaultValue:void 0,children:""+A._wrapperState.initialValue})}function D1(A,E){var M=E.value;if(M==null){if(M=E.children,E=E.defaultValue,M!=null){if(E!=null)throw Error($(92));if(NU(M)){if(1<M.length)throw Error($(93));M=M[0]}E=M}E==null&&(E=""),M=E}A._wrapperState={initialValue:sW(M)}}function QD(A,E){var M=sW(E.value),W=sW(E.defaultValue);M!=null&&(M=""+M,M!==A.value&&(A.value=M),E.defaultValue==null&&A.defaultValue!==M&&(A.defaultValue=M)),W!=null&&(A.defaultValue=""+W)}function I1(A){var E=A.textContent;E===A._wrapperState.initialValue&&E!==""&&E!==null&&(A.value=E)}function XD(A){switch(A){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fl(A,E){return A==null||A==="http://www.w3.org/1999/xhtml"?XD(E):A==="http://www.w3.org/2000/svg"&&E==="foreignObject"?"http://www.w3.org/1999/xhtml":A}function hU(A,E){if(E){var M=A.firstChild;if(M&&M===A.lastChild&&M.nodeType===3){M.nodeValue=E;return}}A.textContent=E}function BD(A,E,M){return E==null||typeof E==="boolean"||E===""?"":M||typeof E!=="number"||E===0||BU.hasOwnProperty(A)&&BU[A]?(""+E).trim():E+"px"}function VD(A,E){A=A.style;for(var M in E)if(E.hasOwnProperty(M)){var W=M.indexOf("--")===0,w=BD(M,E[M],W);M==="float"&&(M="cssFloat"),W?A.setProperty(M,w):A[M]=w}}function Dl(A,E){if(E){if(cJ[A]&&(E.children!=null||E.dangerouslySetInnerHTML!=null))throw Error($(137,A));if(E.dangerouslySetInnerHTML!=null){if(E.children!=null)throw Error($(60));if(typeof E.dangerouslySetInnerHTML!=="object"||!("__html"in E.dangerouslySetInnerHTML))throw Error($(61))}if(E.style!=null&&typeof E.style!=="object")throw Error($(62))}}function Il(A,E){if(A.indexOf("-")===-1)return typeof E.is==="string";switch(A){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function w8(A){return A=A.target||A.srcElement||window,A.correspondingUseElement&&(A=A.correspondingUseElement),A.nodeType===3?A.parentNode:A}function O1(A){if(A=_U(A)){if(typeof Nl!=="function")throw Error($(280));var E=A.stateNode;E&&(E=oL(E),Nl(A.stateNode,A.type,E))}}function HD(A){CY?FY?FY.push(A):FY=[A]:CY=A}function yD(){if(CY){var A=CY,E=FY;if(FY=CY=null,O1(A),E)for(A=0;A<E.length;A++)O1(E[A])}}function TD(A,E){return A(E)}function SD(){}function kD(A,E,M){if(bZ)return A(E,M);bZ=!0;try{return TD(A,E,M)}finally{if(bZ=!1,CY!==null||FY!==null)SD(),yD()}}function fU(A,E){var M=A.stateNode;if(M===null)return null;var W=oL(M);if(W===null)return null;M=W[E];A:switch(E){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(W=!W.disabled)||(A=A.type,W=!(A==="button"||A==="input"||A==="select"||A==="textarea")),A=!W;break A;default:A=!1}if(A)return null;if(M&&typeof M!=="function")throw Error($(231,E,typeof M));return M}function nJ(A,E,M,W,w,Y,U,K,L){var G=Array.prototype.slice.call(arguments,3);try{E.apply(M,G)}catch(l){this.onError(l)}}function dJ(A,E,M,W,w,Y,U,K,L){VU=!1,zL=null,nJ.apply(mJ,arguments)}function iJ(A,E,M,W,w,Y,U,K,L){if(dJ.apply(this,arguments),VU){if(VU){var G=zL;VU=!1,zL=null}else throw Error($(198));QL||(QL=!0,ql=G)}}function Sw(A){var E=A,M=A;if(A.alternate)for(;E.return;)E=E.return;else{A=E;do E=A,(E.flags&4098)!==0&&(M=E.return),A=E.return;while(A)}return E.tag===3?M:null}function xD(A){if(A.tag===13){var E=A.memoizedState;if(E===null&&(A=A.alternate,A!==null&&(E=A.memoizedState)),E!==null)return E.dehydrated}return null}function N1(A){if(Sw(A)!==A)throw Error($(188))}function sJ(A){var E=A.alternate;if(!E){if(E=Sw(A),E===null)throw Error($(188));return E!==A?null:A}for(var M=A,W=E;;){var w=M.return;if(w===null)break;var Y=w.alternate;if(Y===null){if(W=w.return,W!==null){M=W;continue}break}if(w.child===Y.child){for(Y=w.child;Y;){if(Y===M)return N1(w),A;if(Y===W)return N1(w),E;Y=Y.sibling}throw Error($(188))}if(M.return!==W.return)M=w,W=Y;else{for(var U=!1,K=w.child;K;){if(K===M){U=!0,M=w,W=Y;break}if(K===W){U=!0,W=w,M=Y;break}K=K.sibling}if(!U){for(K=Y.child;K;){if(K===M){U=!0,M=Y,W=w;break}if(K===W){U=!0,W=Y,M=w;break}K=K.sibling}if(!U)throw Error($(189))}}if(M.alternate!==W)throw Error($(190))}if(M.tag!==3)throw Error($(188));return M.stateNode.current===M?A:E}function PD(A){return A=sJ(A),A!==null?uD(A):null}function uD(A){if(A.tag===5||A.tag===6)return A;for(A=A.child;A!==null;){var E=uD(A);if(E!==null)return E;A=A.sibling}return null}function $J(A){if(MW&&typeof MW.onCommitFiberRoot==="function")try{MW.onCommitFiberRoot(mL,A,void 0,(A.current.flags&128)===128)}catch(E){}}function Aq(A){return A>>>=0,A===0?32:31-(_J(A)/eJ|0)|0}function JU(A){switch(A&-A){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return A&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return A&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return A}}function RL(A,E){var M=A.pendingLanes;if(M===0)return 0;var W=0,w=A.suspendedLanes,Y=A.pingedLanes,U=M&268435455;if(U!==0){var K=U&~w;K!==0?W=JU(K):(Y&=U,Y!==0&&(W=JU(Y)))}else U=M&~w,U!==0?W=JU(U):Y!==0&&(W=JU(Y));if(W===0)return 0;if(E!==0&&E!==W&&(E&w)===0&&(w=W&-W,Y=E&-E,w>=Y||w===16&&(Y&4194240)!==0))return E;if((W&4)!==0&&(W|=M&16),E=A.entangledLanes,E!==0)for(A=A.entanglements,E&=W;0<E;)M=31-nM(E),w=1<<M,W|=A[M],E&=~w;return W}function Eq(A,E){switch(A){case 1:case 2:case 4:return E+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return E+5000;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mq(A,E){for(var{suspendedLanes:M,pingedLanes:W,expirationTimes:w,pendingLanes:Y}=A;0<Y;){var U=31-nM(Y),K=1<<U,L=w[U];if(L===-1){if((K&M)===0||(K&W)!==0)w[U]=Eq(K,E)}else L<=E&&(A.expiredLanes|=K);Y&=~K}}function zl(A){return A=A.pendingLanes&-1073741825,A!==0?A:A&1073741824?1073741824:0}function vD(){var A=tK;return tK<<=1,(tK&4194240)===0&&(tK=64),A}function cZ(A){for(var E=[],M=0;31>M;M++)E.push(A);return E}function tU(A,E,M){A.pendingLanes|=E,E!==536870912&&(A.suspendedLanes=0,A.pingedLanes=0),A=A.eventTimes,E=31-nM(E),A[E]=M}function Wq(A,E){var M=A.pendingLanes&~E;A.pendingLanes=E,A.suspendedLanes=0,A.pingedLanes=0,A.expiredLanes&=E,A.mutableReadLanes&=E,A.entangledLanes&=E,E=A.entanglements;var W=A.eventTimes;for(A=A.expirationTimes;0<M;){var w=31-nM(M),Y=1<<w;E[w]=0,W[w]=-1,A[w]=-1,M&=~Y}}function U8(A,E){var M=A.entangledLanes|=E;for(A=A.entanglements;M;){var W=31-nM(M),w=1<<W;w&E|A[W]&E&&(A[W]|=E),M&=~w}}function gD(A){return A&=-A,1<A?4<A?(A&268435455)!==0?16:536870912:4:1}function q1(A,E){switch(A){case"focusin":case"focusout":gW=null;break;case"dragenter":case"dragleave":pW=null;break;case"mouseover":case"mouseout":bW=null;break;case"pointerover":case"pointerout":jU.delete(E.pointerId);break;case"gotpointercapture":case"lostpointercapture":vU.delete(E.pointerId)}}function ZU(A,E,M,W,w,Y){if(A===null||A.nativeEvent!==Y)return A={blockedOn:E,domEventName:M,eventSystemFlags:W,nativeEvent:Y,targetContainers:[w]},E!==null&&(E=_U(E),E!==null&&K8(E)),A;return A.eventSystemFlags|=W,E=A.targetContainers,w!==null&&E.indexOf(w)===-1&&E.push(w),A}function Yq(A,E,M,W,w){switch(E){case"focusin":return gW=ZU(gW,A,E,M,W,w),!0;case"dragenter":return pW=ZU(pW,A,E,M,W,w),!0;case"mouseover":return bW=ZU(bW,A,E,M,W,w),!0;case"pointerover":var Y=w.pointerId;return jU.set(Y,ZU(jU.get(Y)||null,A,E,M,W,w)),!0;case"gotpointercapture":return Y=w.pointerId,vU.set(Y,ZU(vU.get(Y)||null,A,E,M,W,w)),!0}return!1}function mD(A){var E=Jw(A.target);if(E!==null){var M=Sw(E);if(M!==null){if(E=M.tag,E===13){if(E=xD(M),E!==null){A.blockedOn=E,nD(A.priority,function(){bD(M)});return}}else if(E===3&&M.stateNode.current.memoizedState.isDehydrated){A.blockedOn=M.tag===3?M.stateNode.containerInfo:null;return}}}A.blockedOn=null}function LL(A){if(A.blockedOn!==null)return!1;for(var E=A.targetContainers;0<E.length;){var M=Xl(A.domEventName,A.eventSystemFlags,E[0],A.nativeEvent);if(M===null){M=A.nativeEvent;var W=new M.constructor(M.type,M);Ol=W,M.target.dispatchEvent(W),Ol=null}else return E=_U(M),E!==null&&K8(E),A.blockedOn=M,!1;E.shift()}return!0}function z1(A,E,M){LL(A)&&M.delete(E)}function Uq(){Ql=!1,gW!==null&&LL(gW)&&(gW=null),pW!==null&&LL(pW)&&(pW=null),bW!==null&&LL(bW)&&(bW=null),jU.forEach(z1),vU.forEach(z1)}function lU(A,E){A.blockedOn===E&&(A.blockedOn=null,Ql||(Ql=!0,CE.unstable_scheduleCallback(CE.unstable_NormalPriority,Uq)))}function gU(A){function E(w){return lU(w,A)}if(0<_K.length){lU(_K[0],A);for(var M=1;M<_K.length;M++){var W=_K[M];W.blockedOn===A&&(W.blockedOn=null)}}gW!==null&&lU(gW,A),pW!==null&&lU(pW,A),bW!==null&&lU(bW,A),jU.forEach(E),vU.forEach(E);for(M=0;M<hW.length;M++)W=hW[M],W.blockedOn===A&&(W.blockedOn=null);for(;0<hW.length&&(M=hW[0],M.blockedOn===null);)mD(M),M.blockedOn===null&&hW.shift()}function Kq(A,E,M,W){var w=EE,Y=DY.transition;DY.transition=null;try{EE=1,L8(A,E,M,W)}finally{EE=w,DY.transition=Y}}function Lq(A,E,M,W){var w=EE,Y=DY.transition;DY.transition=null;try{EE=4,L8(A,E,M,W)}finally{EE=w,DY.transition=Y}}function L8(A,E,M,W){if(BL){var w=Xl(A,E,M,W);if(w===null)oZ(A,E,W,VL,M),q1(A,W);else if(Yq(w,A,E,M,W))W.stopPropagation();else if(q1(A,W),E&4&&-1<wq.indexOf(A)){for(;w!==null;){var Y=_U(w);if(Y!==null&&pD(Y),Y=Xl(A,E,M,W),Y===null&&oZ(A,E,W,VL,M),Y===w)break;w=Y}w!==null&&W.stopPropagation()}else oZ(A,E,W,null,M)}}function Xl(A,E,M,W){if(VL=null,A=w8(W),A=Jw(A),A!==null)if(E=Sw(A),E===null)A=null;else if(M=E.tag,M===13){if(A=xD(E),A!==null)return A;A=null}else if(M===3){if(E.stateNode.current.memoizedState.isDehydrated)return E.tag===3?E.stateNode.containerInfo:null;A=null}else E!==A&&(A=null);return VL=A,null}function dD(A){switch(A){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(aJ()){case Y8:return 1;case fD:return 4;case XL:case tJ:return 16;case jD:return 536870912;default:return 16}default:return 16}}function iD(){if(GL)return GL;var A,E=G8,M=E.length,W,w="value"in jW?jW.value:jW.textContent,Y=w.length;for(A=0;A<M&&E[A]===w[A];A++);var U=M-A;for(W=1;W<=U&&E[M-W]===w[Y-W];W++);return GL=w.slice(A,1<W?1-W:void 0)}function ZL(A){var E=A.keyCode;return"charCode"in A?(A=A.charCode,A===0&&E===13&&(A=13)):A=E,A===10&&(A=13),32<=A||A===13?A:0}function eK(){return!0}function Q1(){return!1}function zM(A){function E(M,W,w,Y,U){this._reactName=M,this._targetInst=w,this.type=W,this.nativeEvent=Y,this.target=U,this.currentTarget=null;for(var K in A)A.hasOwnProperty(K)&&(M=A[K],this[K]=M?M(Y):Y[K]);return this.isDefaultPrevented=(Y.defaultPrevented!=null?Y.defaultPrevented:Y.returnValue===!1)?eK:Q1,this.isPropagationStopped=Q1,this}return OE(E.prototype,{preventDefault:function(){this.defaultPrevented=!0;var M=this.nativeEvent;M&&(M.preventDefault?M.preventDefault():typeof M.returnValue!=="unknown"&&(M.returnValue=!1),this.isDefaultPrevented=eK)},stopPropagation:function(){var M=this.nativeEvent;M&&(M.stopPropagation?M.stopPropagation():typeof M.cancelBubble!=="unknown"&&(M.cancelBubble=!0),this.isPropagationStopped=eK)},persist:function(){},isPersistent:eK}),E}function Qq(A){var E=this.nativeEvent;return E.getModifierState?E.getModifierState(A):(A=zq[A])?!!E[A]:!1}function l8(){return Qq}function oD(A,E){switch(A){case"keyup":return xq.indexOf(E.keyCode)!==-1;case"keydown":return E.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function rD(A){return A=A.detail,typeof A==="object"&&"data"in A?A.data:null}function uq(A,E){switch(A){case"compositionend":return rD(E);case"keypress":if(E.which!==32)return null;return H1=!0,V1;case"textInput":return A=E.data,A===V1&&H1?null:A;default:return null}}function hq(A,E){if(EY)return A==="compositionend"||!C8&&oD(A,E)?(A=iD(),GL=G8=jW=null,EY=!1,A):null;switch(A){case"paste":return null;case"keypress":if(!(E.ctrlKey||E.altKey||E.metaKey)||E.ctrlKey&&E.altKey){if(E.char&&1<E.char.length)return E.char;if(E.which)return String.fromCharCode(E.which)}return null;case"compositionend":return sD&&E.locale!=="ko"?null:E.data;default:return null}}function y1(A){var E=A&&A.nodeName&&A.nodeName.toLowerCase();return E==="input"?!!fq[A.type]:E==="textarea"?!0:!1}function aD(A,E,M,W){HD(W),E=HL(E,"onChange"),0<E.length&&(M=new Z8("onChange","change",null,M,W),A.push({event:M,listeners:E}))}function jq(A){UI(A,0)}function iL(A){var E=wY(A);if(qD(E))return A}function vq(A,E){if(A==="change")return E}function T1(){yU&&(yU.detachEvent("onpropertychange",$D),pU=yU=null)}function $D(A){if(A.propertyName==="value"&&iL(pU)){var E=[];aD(E,pU,A,w8(A)),kD(jq,E)}}function gq(A,E,M){A==="focusin"?(T1(),yU=E,pU=M,yU.attachEvent("onpropertychange",$D)):A==="focusout"&&T1()}function pq(A){if(A==="selectionchange"||A==="keyup"||A==="keydown")return iL(pU)}function bq(A,E){if(A==="click")return iL(E)}function cq(A,E){if(A==="input"||A==="change")return iL(E)}function nq(A,E){return A===E&&(A!==0||1/A===1/E)||A!==A&&E!==E}function bU(A,E){if(dM(A,E))return!0;if(typeof A!=="object"||A===null||typeof E!=="object"||E===null)return!1;var M=Object.keys(A),W=Object.keys(E);if(M.length!==W.length)return!1;for(W=0;W<M.length;W++){var w=M[W];if(!wl.call(E,w)||!dM(A[w],E[w]))return!1}return!0}function S1(A){for(;A&&A.firstChild;)A=A.firstChild;return A}function k1(A,E){var M=S1(A);A=0;for(var W;M;){if(M.nodeType===3){if(W=A+M.textContent.length,A<=E&&W>=E)return{node:M,offset:E-A};A=W}A:{for(;M;){if(M.nextSibling){M=M.nextSibling;break A}M=M.parentNode}M=void 0}M=S1(M)}}function _D(A,E){return A&&E?A===E?!0:A&&A.nodeType===3?!1:E&&E.nodeType===3?_D(A,E.parentNode):("contains"in A)?A.contains(E):A.compareDocumentPosition?!!(A.compareDocumentPosition(E)&16):!1:!1}function eD(){for(var A=window,E=qL();E instanceof A.HTMLIFrameElement;){try{var M=typeof E.contentWindow.location.href==="string"}catch(W){M=!1}if(M)A=E.contentWindow;else break;E=qL(A.document)}return E}function F8(A){var E=A&&A.nodeName&&A.nodeName.toLowerCase();return E&&(E==="input"&&(A.type==="text"||A.type==="search"||A.type==="tel"||A.type==="url"||A.type==="password")||E==="textarea"||A.contentEditable==="true")}function mq(A){var E=eD(),M=A.focusedElem,W=A.selectionRange;if(E!==M&&M&&M.ownerDocument&&_D(M.ownerDocument.documentElement,M)){if(W!==null&&F8(M)){if(E=W.start,A=W.end,A===void 0&&(A=E),"selectionStart"in M)M.selectionStart=E,M.selectionEnd=Math.min(A,M.value.length);else if(A=(E=M.ownerDocument||document)&&E.defaultView||window,A.getSelection){A=A.getSelection();var w=M.textContent.length,Y=Math.min(W.start,w);W=W.end===void 0?Y:Math.min(W.end,w),!A.extend&&Y>W&&(w=W,W=Y,Y=w),w=k1(M,Y);var U=k1(M,W);w&&U&&(A.rangeCount!==1||A.anchorNode!==w.node||A.anchorOffset!==w.offset||A.focusNode!==U.node||A.focusOffset!==U.offset)&&(E=E.createRange(),E.setStart(w.node,w.offset),A.removeAllRanges(),Y>W?(A.addRange(E),A.extend(U.node,U.offset)):(E.setEnd(U.node,U.offset),A.addRange(E)))}}E=[];for(A=M;A=A.parentNode;)A.nodeType===1&&E.push({element:A,left:A.scrollLeft,top:A.scrollTop});typeof M.focus==="function"&&M.focus();for(M=0;M<E.length;M++)A=E[M],A.element.scrollLeft=A.left,A.element.scrollTop=A.top}}function x1(A,E,M){var W=M.window===M?M.document:M.nodeType===9?M:M.ownerDocument;Bl||MY==null||MY!==qL(W)||(W=MY,("selectionStart"in W)&&F8(W)?W={start:W.selectionStart,end:W.selectionEnd}:(W=(W.ownerDocument&&W.ownerDocument.defaultView||window).getSelection(),W={anchorNode:W.anchorNode,anchorOffset:W.anchorOffset,focusNode:W.focusNode,focusOffset:W.focusOffset}),TU&&bU(TU,W)||(TU=W,W=HL(Rl,"onSelect"),0<W.length&&(E=new Z8("onSelect","select",null,E,M),A.push({event:E,listeners:W}),E.target=MY)))}function AL(A,E){var M={};return M[A.toLowerCase()]=E.toLowerCase(),M["Webkit"+A]="webkit"+E,M["Moz"+A]="moz"+E,M}function sL(A){if(iZ[A])return iZ[A];if(!WY[A])return A;var E=WY[A],M;for(M in E)if(E.hasOwnProperty(M)&&M in AI)return iZ[A]=E[M];return A}function rW(A,E){YI.set(A,E),Tw(E,[A])}function u1(A,E,M){var W=A.type||"unknown-event";A.currentTarget=M,iJ(W,E,void 0,A),A.currentTarget=null}function UI(A,E){E=(E&4)!==0;for(var M=0;M<A.length;M++){var W=A[M],w=W.event;W=W.listeners;A:{var Y=void 0;if(E)for(var U=W.length-1;0<=U;U--){var K=W[U],L=K.instance,G=K.currentTarget;if(K=K.listener,L!==Y&&w.isPropagationStopped())break A;u1(w,K,G),Y=L}else for(U=0;U<W.length;U++){if(K=W[U],L=K.instance,G=K.currentTarget,K=K.listener,L!==Y&&w.isPropagationStopped())break A;u1(w,K,G),Y=L}}}if(QL)throw A=ql,QL=!1,ql=null,A}function KE(A,E){var M=E[xl];M===void 0&&(M=E[xl]=new Set);var W=A+"__bubble";M.has(W)||(KI(E,A,2,!1),M.add(W))}function sZ(A,E,M){var W=0;E&&(W|=4),KI(M,A,W,E)}function cU(A){if(!A[EL]){A[EL]=!0,DD.forEach(function(M){M!=="selectionchange"&&(iq.has(M)||sZ(M,!1,A),sZ(M,!0,A))});var E=A.nodeType===9?A:A.ownerDocument;E===null||E[EL]||(E[EL]=!0,sZ("selectionchange",!1,E))}}function KI(A,E,M,W){switch(dD(E)){case 1:var w=Kq;break;case 4:w=Lq;break;default:w=L8}M=w.bind(null,E,M,A),w=void 0,!Jl||E!=="touchstart"&&E!=="touchmove"&&E!=="wheel"||(w=!0),W?w!==void 0?A.addEventListener(E,M,{capture:!0,passive:w}):A.addEventListener(E,M,!0):w!==void 0?A.addEventListener(E,M,{passive:w}):A.addEventListener(E,M,!1)}function oZ(A,E,M,W,w){var Y=W;if((E&1)===0&&(E&2)===0&&W!==null)A:for(;;){if(W===null)return;var U=W.tag;if(U===3||U===4){var K=W.stateNode.containerInfo;if(K===w||K.nodeType===8&&K.parentNode===w)break;if(U===4)for(U=W.return;U!==null;){var L=U.tag;if(L===3||L===4){if(L=U.stateNode.containerInfo,L===w||L.nodeType===8&&L.parentNode===w)return}U=U.return}for(;K!==null;){if(U=Jw(K),U===null)return;if(L=U.tag,L===5||L===6){W=Y=U;continue A}K=K.parentNode}}W=W.return}kD(function(){var G=Y,l=w8(M),C=[];A:{var F=YI.get(A);if(F!==void 0){var I=Z8,J=A;switch(A){case"keypress":if(ZL(M)===0)break A;case"keydown":case"keyup":I=Rq;break;case"focusin":J="focus",I=dZ;break;case"focusout":J="blur",I=dZ;break;case"beforeblur":case"afterblur":I=dZ;break;case"click":if(M.button===2)break A;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":I=X1;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":I=lq;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":I=Hq;break;case EI:case MI:case WI:I=Dq;break;case wI:I=Tq;break;case"scroll":I=Gq;break;case"wheel":I=kq;break;case"copy":case"cut":case"paste":I=Oq;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":I=B1}var q=(E&4)!==0,D=!q&&A==="scroll",Z=q?F!==null?F+"Capture":null:F;q=[];for(var N=G,O;N!==null;){O=N;var B=O.stateNode;if(O.tag===5&&B!==null&&(O=B,Z!==null&&(B=fU(N,Z),B!=null&&q.push(nU(N,B,O)))),D)break;N=N.return}0<q.length&&(F=new I(F,J,null,M,l),C.push({event:F,listeners:q}))}}if((E&7)===0){A:{if(F=A==="mouseover"||A==="pointerover",I=A==="mouseout"||A==="pointerout",F&&M!==Ol&&(J=M.relatedTarget||M.fromElement)&&(Jw(J)||J[NW]))break A;if(I||F){if(F=l.window===l?l:(F=l.ownerDocument)?F.defaultView||F.parentWindow:window,I){if(J=M.relatedTarget||M.toElement,I=G,J=J?Jw(J):null,J!==null&&(D=Sw(J),J!==D||J.tag!==5&&J.tag!==6))J=null}else I=null,J=G;if(I!==J){if(q=X1,B="onMouseLeave",Z="onMouseEnter",N="mouse",A==="pointerout"||A==="pointerover")q=B1,B="onPointerLeave",Z="onPointerEnter",N="pointer";if(D=I==null?F:wY(I),O=J==null?F:wY(J),F=new q(B,N+"leave",I,M,l),F.target=D,F.relatedTarget=O,B=null,Jw(l)===G&&(q=new q(Z,N+"enter",J,M,l),q.target=O,q.relatedTarget=D,B=q),D=B,I&&J)E:{q=I,Z=J,N=0;for(O=q;O;O=$w(O))N++;O=0;for(B=Z;B;B=$w(B))O++;for(;0<N-O;)q=$w(q),N--;for(;0<O-N;)Z=$w(Z),O--;for(;N--;){if(q===Z||Z!==null&&q===Z.alternate)break E;q=$w(q),Z=$w(Z)}q=null}else q=null;I!==null&&h1(C,F,I,q,!1),J!==null&&D!==null&&h1(C,D,J,q,!0)}}}A:{if(F=G?wY(G):window,I=F.nodeName&&F.nodeName.toLowerCase(),I==="select"||I==="input"&&F.type==="file")var T=vq;else if(y1(F))if(tD)T=cq;else{T=pq;var V=gq}else(I=F.nodeName)&&I.toLowerCase()==="input"&&(F.type==="checkbox"||F.type==="radio")&&(T=bq);if(T&&(T=T(A,G))){aD(C,T,M,l);break A}V&&V(A,F,G),A==="focusout"&&(V=F._wrapperState)&&V.controlled&&F.type==="number"&&ll(F,"number",F.value)}switch(V=G?wY(G):window,A){case"focusin":if(y1(V)||V.contentEditable==="true")MY=V,Rl=G,TU=null;break;case"focusout":TU=Rl=MY=null;break;case"mousedown":Bl=!0;break;case"contextmenu":case"mouseup":case"dragend":Bl=!1,x1(C,M,l);break;case"selectionchange":if(dq)break;case"keydown":case"keyup":x1(C,M,l)}var H;if(C8)A:{switch(A){case"compositionstart":var P="onCompositionStart";break A;case"compositionend":P="onCompositionEnd";break A;case"compositionupdate":P="onCompositionUpdate";break A}P=void 0}else EY?oD(A,M)&&(P="onCompositionEnd"):A==="keydown"&&M.keyCode===229&&(P="onCompositionStart");if(P&&(sD&&M.locale!=="ko"&&(EY||P!=="onCompositionStart"?P==="onCompositionEnd"&&EY&&(H=iD()):(jW=l,G8=("value"in jW)?jW.value:jW.textContent,EY=!0)),V=HL(G,P),0<V.length&&(P=new R1(P,A,null,M,l),C.push({event:P,listeners:V}),H?P.data=H:(H=rD(M),H!==null&&(P.data=H)))),H=Pq?uq(A,M):hq(A,M))G=HL(G,"onBeforeInput"),0<G.length&&(l=new R1("onBeforeInput","beforeinput",null,M,l),C.push({event:l,listeners:G}),l.data=H)}UI(C,E)})}function nU(A,E,M){return{instance:A,listener:E,currentTarget:M}}function HL(A,E){for(var M=E+"Capture",W=[];A!==null;){var w=A,Y=w.stateNode;w.tag===5&&Y!==null&&(w=Y,Y=fU(A,M),Y!=null&&W.unshift(nU(A,Y,w)),Y=fU(A,E),Y!=null&&W.push(nU(A,Y,w))),A=A.return}return W}function $w(A){if(A===null)return null;do A=A.return;while(A&&A.tag!==5);return A?A:null}function h1(A,E,M,W,w){for(var Y=E._reactName,U=[];M!==null&&M!==W;){var K=M,L=K.alternate,G=K.stateNode;if(L!==null&&L===W)break;K.tag===5&&G!==null&&(K=G,w?(L=fU(M,Y),L!=null&&U.unshift(nU(M,L,K))):w||(L=fU(M,Y),L!=null&&U.push(nU(M,L,K)))),M=M.return}U.length!==0&&A.push({event:E,listeners:U})}function f1(A){return(typeof A==="string"?A:""+A).replace(sq,`
`).replace(oq,"")}function ML(A,E,M){if(E=f1(E),f1(A)!==E&&M)throw Error($(425))}function yL(){}function Sl(A,E){return A==="textarea"||A==="noscript"||typeof E.children==="string"||typeof E.children==="number"||typeof E.dangerouslySetInnerHTML==="object"&&E.dangerouslySetInnerHTML!==null&&E.dangerouslySetInnerHTML.__html!=null}function tq(A){setTimeout(function(){throw A})}function rZ(A,E){var M=E,W=0;do{var w=M.nextSibling;if(A.removeChild(M),w&&w.nodeType===8)if(M=w.data,M==="/$"){if(W===0){A.removeChild(w),gU(E);return}W--}else M!=="$"&&M!=="$?"&&M!=="$!"||W++;M=w}while(M);gU(E)}function cW(A){for(;A!=null;A=A.nextSibling){var E=A.nodeType;if(E===1||E===3)break;if(E===8){if(E=A.data,E==="$"||E==="$!"||E==="$?")break;if(E==="/$")return null}}return A}function v1(A){A=A.previousSibling;for(var E=0;A;){if(A.nodeType===8){var M=A.data;if(M==="$"||M==="$!"||M==="$?"){if(E===0)return A;E--}else M==="/$"&&E++}A=A.previousSibling}return null}function Jw(A){var E=A[EW];if(E)return E;for(var M=A.parentNode;M;){if(E=M[NW]||M[EW]){if(M=E.alternate,E.child!==null||M!==null&&M.child!==null)for(A=v1(A);A!==null;){if(M=A[EW])return M;A=v1(A)}return E}A=M,M=A.parentNode}return null}function _U(A){return A=A[EW]||A[NW],!A||A.tag!==5&&A.tag!==6&&A.tag!==13&&A.tag!==3?null:A}function wY(A){if(A.tag===5||A.tag===6)return A.stateNode;throw Error($(33))}function oL(A){return A[mU]||null}function aW(A){return{current:A}}function LE(A){0>YY||(A.current=Pl[YY],Pl[YY]=null,YY--)}function wE(A,E){YY++,Pl[YY]=A.current,A.current=E}function JY(A,E){var M=A.type.contextTypes;if(!M)return oW;var W=A.stateNode;if(W&&W.__reactInternalMemoizedUnmaskedChildContext===E)return W.__reactInternalMemoizedMaskedChildContext;var w={},Y;for(Y in M)w[Y]=E[Y];return W&&(A=A.stateNode,A.__reactInternalMemoizedUnmaskedChildContext=E,A.__reactInternalMemoizedMaskedChildContext=w),w}function FM(A){return A=A.childContextTypes,A!==null&&A!==void 0}function TL(){LE(CM),LE(rE)}function g1(A,E,M){if(rE.current!==oW)throw Error($(168));wE(rE,E),wE(CM,M)}function LI(A,E,M){var W=A.stateNode;if(E=E.childContextTypes,typeof W.getChildContext!=="function")return M;W=W.getChildContext();for(var w in W)if(!(w in E))throw Error($(108,gJ(A)||"Unknown",w));return OE({},M,W)}function SL(A){return A=(A=A.stateNode)&&A.__reactInternalMemoizedMergedChildContext||oW,Rw=rE.current,wE(rE,A),wE(CM,CM.current),!0}function p1(A,E,M){var W=A.stateNode;if(!W)throw Error($(169));M?(A=LI(A,E,Rw),W.__reactInternalMemoizedMergedChildContext=A,LE(CM),LE(rE),wE(rE,A)):LE(CM),wE(CM,M)}function GI(A){CW===null?CW=[A]:CW.push(A)}function eq(A){rL=!0,GI(A)}function tW(){if(!aZ&&CW!==null){aZ=!0;var A=0,E=EE;try{var M=CW;for(EE=1;A<M.length;A++){var W=M[A];do W=W(!0);while(W!==null)}CW=null,rL=!1}catch(w){throw CW!==null&&(CW=CW.slice(A+1)),hD(Y8,tW),w}finally{EE=E,aZ=!1}}return null}function Ow(A,E){UY[KY++]=xL,UY[KY++]=kL,kL=A,xL=E}function ZI(A,E,M){yM[TM++]=FW,yM[TM++]=DW,yM[TM++]=Bw,Bw=A;var W=FW;A=DW;var w=32-nM(W)-1;W&=~(1<<w),M+=1;var Y=32-nM(E)+w;if(30<Y){var U=w-w%5;Y=(W&(1<<U)-1).toString(32),W>>=U,w-=U,FW=1<<32-nM(E)+w|M<<w|W,DW=Y+A}else FW=1<<Y|M<<w|W,DW=A}function D8(A){A.return!==null&&(Ow(A,1),ZI(A,1,0))}function I8(A){for(;A===kL;)kL=UY[--KY],UY[KY]=null,xL=UY[--KY],UY[KY]=null;for(;A===Bw;)Bw=yM[--TM],yM[TM]=null,DW=yM[--TM],yM[TM]=null,FW=yM[--TM],yM[TM]=null}function lI(A,E){var M=SM(5,null,null,0);M.elementType="DELETED",M.stateNode=E,M.return=A,E=A.deletions,E===null?(A.deletions=[M],A.flags|=16):E.push(M)}function b1(A,E){switch(A.tag){case 5:var M=A.type;return E=E.nodeType!==1||M.toLowerCase()!==E.nodeName.toLowerCase()?null:E,E!==null?(A.stateNode=E,qM=A,JM=cW(E.firstChild),!0):!1;case 6:return E=A.pendingProps===""||E.nodeType!==3?null:E,E!==null?(A.stateNode=E,qM=A,JM=null,!0):!1;case 13:return E=E.nodeType!==8?null:E,E!==null?(M=Bw!==null?{id:FW,overflow:DW}:null,A.memoizedState={dehydrated:E,treeContext:M,retryLane:1073741824},M=SM(18,null,null,0),M.stateNode=E,M.return=A,A.child=M,qM=A,JM=null,!0):!1;default:return!1}}function ul(A){return(A.mode&1)!==0&&(A.flags&128)===0}function hl(A){if(lE){var E=JM;if(E){var M=E;if(!b1(A,E)){if(ul(A))throw Error($(418));E=cW(M.nextSibling);var W=qM;E&&b1(A,E)?lI(W,M):(A.flags=A.flags&-4097|2,lE=!1,qM=A)}}else{if(ul(A))throw Error($(418));A.flags=A.flags&-4097|2,lE=!1,qM=A}}}function c1(A){for(A=A.return;A!==null&&A.tag!==5&&A.tag!==3&&A.tag!==13;)A=A.return;qM=A}function WL(A){if(A!==qM)return!1;if(!lE)return c1(A),lE=!0,!1;var E;if((E=A.tag!==3)&&!(E=A.tag!==5)&&(E=A.type,E=E!=="head"&&E!=="body"&&!Sl(A.type,A.memoizedProps)),E&&(E=JM)){if(ul(A))throw CI(),Error($(418));for(;E;)lI(A,E),E=cW(E.nextSibling)}if(c1(A),A.tag===13){if(A=A.memoizedState,A=A!==null?A.dehydrated:null,!A)throw Error($(317));A:{A=A.nextSibling;for(E=0;A;){if(A.nodeType===8){var M=A.data;if(M==="/$"){if(E===0){JM=cW(A.nextSibling);break A}E--}else M!=="$"&&M!=="$!"&&M!=="$?"||E++}A=A.nextSibling}JM=null}}else JM=qM?cW(A.stateNode.nextSibling):null;return!0}function CI(){for(var A=JM;A;)A=cW(A.nextSibling)}function qY(){JM=qM=null,lE=!1}function O8(A){cM===null?cM=[A]:cM.push(A)}function FU(A,E,M){if(A=M.ref,A!==null&&typeof A!=="function"&&typeof A!=="object"){if(M._owner){if(M=M._owner,M){if(M.tag!==1)throw Error($(309));var W=M.stateNode}if(!W)throw Error($(147,A));var w=W,Y=""+A;if(E!==null&&E.ref!==null&&typeof E.ref==="function"&&E.ref._stringRef===Y)return E.ref;return E=function(U){var K=w.refs;U===null?delete K[Y]:K[Y]=U},E._stringRef=Y,E}if(typeof A!=="string")throw Error($(284));if(!M._owner)throw Error($(290,A))}return A}function wL(A,E){throw A=Object.prototype.toString.call(E),Error($(31,A==="[object Object]"?"object with keys {"+Object.keys(E).join(", ")+"}":A))}function n1(A){var E=A._init;return E(A._payload)}function FI(A){function E(Z,N){if(A){var O=Z.deletions;O===null?(Z.deletions=[N],Z.flags|=16):O.push(N)}}function M(Z,N){if(!A)return null;for(;N!==null;)E(Z,N),N=N.sibling;return null}function W(Z,N){for(Z=new Map;N!==null;)N.key!==null?Z.set(N.key,N):Z.set(N.index,N),N=N.sibling;return Z}function w(Z,N){return Z=iW(Z,N),Z.index=0,Z.sibling=null,Z}function Y(Z,N,O){if(Z.index=O,!A)return Z.flags|=1048576,N;if(O=Z.alternate,O!==null)return O=O.index,O<N?(Z.flags|=2,N):O;return Z.flags|=2,N}function U(Z){return A&&Z.alternate===null&&(Z.flags|=2),Z}function K(Z,N,O,B){if(N===null||N.tag!==6)return N=Ml(O,Z.mode,B),N.return=Z,N;return N=w(N,O),N.return=Z,N}function L(Z,N,O,B){var T=O.type;if(T===AY)return l(Z,N,O.props.children,B,O.key);if(N!==null&&(N.elementType===T||typeof T==="object"&&T!==null&&T.$$typeof===PW&&n1(T)===N.type))return B=w(N,O.props),B.ref=FU(Z,N,O),B.return=Z,B;return B=JL(O.type,O.key,O.props,null,Z.mode,B),B.ref=FU(Z,N,O),B.return=Z,B}function G(Z,N,O,B){if(N===null||N.tag!==4||N.stateNode.containerInfo!==O.containerInfo||N.stateNode.implementation!==O.implementation)return N=Wl(O,Z.mode,B),N.return=Z,N;return N=w(N,O.children||[]),N.return=Z,N}function l(Z,N,O,B,T){if(N===null||N.tag!==7)return N=Xw(O,Z.mode,B,T),N.return=Z,N;return N=w(N,O),N.return=Z,N}function C(Z,N,O){if(typeof N==="string"&&N!==""||typeof N==="number")return N=Ml(""+N,Z.mode,O),N.return=Z,N;if(typeof N==="object"&&N!==null){switch(N.$$typeof){case oK:return O=JL(N.type,N.key,N.props,null,Z.mode,O),O.ref=FU(Z,null,N),O.return=Z,O;case ew:return N=Wl(N,Z.mode,O),N.return=Z,N;case PW:var B=N._init;return C(Z,B(N._payload),O)}if(NU(N)||GU(N))return N=Xw(N,Z.mode,O,null),N.return=Z,N;wL(Z,N)}return null}function F(Z,N,O,B){var T=N!==null?N.key:null;if(typeof O==="string"&&O!==""||typeof O==="number")return T!==null?null:K(Z,N,""+O,B);if(typeof O==="object"&&O!==null){switch(O.$$typeof){case oK:return O.key===T?L(Z,N,O,B):null;case ew:return O.key===T?G(Z,N,O,B):null;case PW:return T=O._init,F(Z,N,T(O._payload),B)}if(NU(O)||GU(O))return T!==null?null:l(Z,N,O,B,null);wL(Z,O)}return null}function I(Z,N,O,B,T){if(typeof B==="string"&&B!==""||typeof B==="number")return Z=Z.get(O)||null,K(N,Z,""+B,T);if(typeof B==="object"&&B!==null){switch(B.$$typeof){case oK:return Z=Z.get(B.key===null?O:B.key)||null,L(N,Z,B,T);case ew:return Z=Z.get(B.key===null?O:B.key)||null,G(N,Z,B,T);case PW:var V=B._init;return I(Z,N,O,V(B._payload),T)}if(NU(B)||GU(B))return Z=Z.get(O)||null,l(N,Z,B,T,null);wL(N,B)}return null}function J(Z,N,O,B){for(var T=null,V=null,H=N,P=N=0,Q=null;H!==null&&P<O.length;P++){H.index>P?(Q=H,H=null):Q=H.sibling;var X=F(Z,H,O[P],B);if(X===null){H===null&&(H=Q);break}A&&H&&X.alternate===null&&E(Z,H),N=Y(X,N,P),V===null?T=X:V.sibling=X,V=X,H=Q}if(P===O.length)return M(Z,H),lE&&Ow(Z,P),T;if(H===null){for(;P<O.length;P++)H=C(Z,O[P],B),H!==null&&(N=Y(H,N,P),V===null?T=H:V.sibling=H,V=H);return lE&&Ow(Z,P),T}for(H=W(Z,H);P<O.length;P++)Q=I(H,Z,P,O[P],B),Q!==null&&(A&&Q.alternate!==null&&H.delete(Q.key===null?P:Q.key),N=Y(Q,N,P),V===null?T=Q:V.sibling=Q,V=Q);return A&&H.forEach(function(S){return E(Z,S)}),lE&&Ow(Z,P),T}function q(Z,N,O,B){var T=GU(O);if(typeof T!=="function")throw Error($(150));if(O=T.call(O),O==null)throw Error($(151));for(var V=T=null,H=N,P=N=0,Q=null,X=O.next();H!==null&&!X.done;P++,X=O.next()){H.index>P?(Q=H,H=null):Q=H.sibling;var S=F(Z,H,X.value,B);if(S===null){H===null&&(H=Q);break}A&&H&&S.alternate===null&&E(Z,H),N=Y(S,N,P),V===null?T=S:V.sibling=S,V=S,H=Q}if(X.done)return M(Z,H),lE&&Ow(Z,P),T;if(H===null){for(;!X.done;P++,X=O.next())X=C(Z,X.value,B),X!==null&&(N=Y(X,N,P),V===null?T=X:V.sibling=X,V=X);return lE&&Ow(Z,P),T}for(H=W(Z,H);!X.done;P++,X=O.next())X=I(H,Z,P,X.value,B),X!==null&&(A&&X.alternate!==null&&H.delete(X.key===null?P:X.key),N=Y(X,N,P),V===null?T=X:V.sibling=X,V=X);return A&&H.forEach(function(v){return E(Z,v)}),lE&&Ow(Z,P),T}function D(Z,N,O,B){if(typeof O==="object"&&O!==null&&O.type===AY&&O.key===null&&(O=O.props.children),typeof O==="object"&&O!==null){switch(O.$$typeof){case oK:A:{for(var T=O.key,V=N;V!==null;){if(V.key===T){if(T=O.type,T===AY){if(V.tag===7){M(Z,V.sibling),N=w(V,O.props.children),N.return=Z,Z=N;break A}}else if(V.elementType===T||typeof T==="object"&&T!==null&&T.$$typeof===PW&&n1(T)===V.type){M(Z,V.sibling),N=w(V,O.props),N.ref=FU(Z,V,O),N.return=Z,Z=N;break A}M(Z,V);break}else E(Z,V);V=V.sibling}O.type===AY?(N=Xw(O.props.children,Z.mode,B,O.key),N.return=Z,Z=N):(B=JL(O.type,O.key,O.props,null,Z.mode,B),B.ref=FU(Z,N,O),B.return=Z,Z=B)}return U(Z);case ew:A:{for(V=O.key;N!==null;){if(N.key===V)if(N.tag===4&&N.stateNode.containerInfo===O.containerInfo&&N.stateNode.implementation===O.implementation){M(Z,N.sibling),N=w(N,O.children||[]),N.return=Z,Z=N;break A}else{M(Z,N);break}else E(Z,N);N=N.sibling}N=Wl(O,Z.mode,B),N.return=Z,Z=N}return U(Z);case PW:return V=O._init,D(Z,N,V(O._payload),B)}if(NU(O))return J(Z,N,O,B);if(GU(O))return q(Z,N,O,B);wL(Z,O)}return typeof O==="string"&&O!==""||typeof O==="number"?(O=""+O,N!==null&&N.tag===6?(M(Z,N.sibling),N=w(N,O),N.return=Z,Z=N):(M(Z,N),N=Ml(O,Z.mode,B),N.return=Z,Z=N),U(Z)):M(Z,N)}return D}function J8(){N8=LY=uL=null}function q8(A){var E=PL.current;LE(PL),A._currentValue=E}function fl(A,E,M){for(;A!==null;){var W=A.alternate;if((A.childLanes&E)!==E?(A.childLanes|=E,W!==null&&(W.childLanes|=E)):W!==null&&(W.childLanes&E)!==E&&(W.childLanes|=E),A===M)break;A=A.return}}function IY(A,E){uL=A,N8=LY=null,A=A.dependencies,A!==null&&A.firstContext!==null&&((A.lanes&E)!==0&&(lM=!0),A.firstContext=null)}function xM(A){var E=A._currentValue;if(N8!==A)if(A={context:A,memoizedValue:E,next:null},LY===null){if(uL===null)throw Error($(308));LY=A,uL.dependencies={lanes:0,firstContext:A}}else LY=LY.next=A;return E}function z8(A){qw===null?qw=[A]:qw.push(A)}function II(A,E,M,W){var w=E.interleaved;return w===null?(M.next=M,z8(E)):(M.next=w.next,w.next=M),E.interleaved=M,JW(A,W)}function JW(A,E){A.lanes|=E;var M=A.alternate;M!==null&&(M.lanes|=E),M=A;for(A=A.return;A!==null;)A.childLanes|=E,M=A.alternate,M!==null&&(M.childLanes|=E),M=A,A=A.return;return M.tag===3?M.stateNode:null}function Q8(A){A.updateQueue={baseState:A.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function OI(A,E){A=A.updateQueue,E.updateQueue===A&&(E.updateQueue={baseState:A.baseState,firstBaseUpdate:A.firstBaseUpdate,lastBaseUpdate:A.lastBaseUpdate,shared:A.shared,effects:A.effects})}function IW(A,E){return{eventTime:A,lane:E,tag:0,payload:null,callback:null,next:null}}function nW(A,E,M){var W=A.updateQueue;if(W===null)return null;if(W=W.shared,(sA&2)!==0){var w=W.pending;return w===null?E.next=E:(E.next=w.next,w.next=E),W.pending=E,JW(A,M)}return w=W.interleaved,w===null?(E.next=E,z8(W)):(E.next=w.next,w.next=E),W.interleaved=E,JW(A,M)}function CL(A,E,M){if(E=E.updateQueue,E!==null&&(E=E.shared,(M&4194240)!==0)){var W=E.lanes;W&=A.pendingLanes,M|=W,E.lanes=M,U8(A,M)}}function m1(A,E){var{updateQueue:M,alternate:W}=A;if(W!==null&&(W=W.updateQueue,M===W)){var w=null,Y=null;if(M=M.firstBaseUpdate,M!==null){do{var U={eventTime:M.eventTime,lane:M.lane,tag:M.tag,payload:M.payload,callback:M.callback,next:null};Y===null?w=Y=U:Y=Y.next=U,M=M.next}while(M!==null);Y===null?w=Y=E:Y=Y.next=E}else w=Y=E;M={baseState:W.baseState,firstBaseUpdate:w,lastBaseUpdate:Y,shared:W.shared,effects:W.effects},A.updateQueue=M;return}A=M.lastBaseUpdate,A===null?M.firstBaseUpdate=E:A.next=E,M.lastBaseUpdate=E}function hL(A,E,M,W){var w=A.updateQueue;uW=!1;var{firstBaseUpdate:Y,lastBaseUpdate:U}=w,K=w.shared.pending;if(K!==null){w.shared.pending=null;var L=K,G=L.next;L.next=null,U===null?Y=G:U.next=G,U=L;var l=A.alternate;l!==null&&(l=l.updateQueue,K=l.lastBaseUpdate,K!==U&&(K===null?l.firstBaseUpdate=G:K.next=G,l.lastBaseUpdate=L))}if(Y!==null){var C=w.baseState;U=0,l=G=L=null,K=Y;do{var{lane:F,eventTime:I}=K;if((W&F)===F){l!==null&&(l=l.next={eventTime:I,lane:0,tag:K.tag,payload:K.payload,callback:K.callback,next:null});A:{var J=A,q=K;switch(F=E,I=M,q.tag){case 1:if(J=q.payload,typeof J==="function"){C=J.call(I,C,F);break A}C=J;break A;case 3:J.flags=J.flags&-65537|128;case 0:if(J=q.payload,F=typeof J==="function"?J.call(I,C,F):J,F===null||F===void 0)break A;C=OE({},C,F);break A;case 2:uW=!0}}K.callback!==null&&K.lane!==0&&(A.flags|=64,F=w.effects,F===null?w.effects=[K]:F.push(K))}else I={eventTime:I,lane:F,tag:K.tag,payload:K.payload,callback:K.callback,next:null},l===null?(G=l=I,L=C):l=l.next=I,U|=F;if(K=K.next,K===null)if(K=w.shared.pending,K===null)break;else F=K,K=F.next,F.next=null,w.lastBaseUpdate=F,w.shared.pending=null}while(1);if(l===null&&(L=C),w.baseState=L,w.firstBaseUpdate=G,w.lastBaseUpdate=l,E=w.shared.interleaved,E!==null){w=E;do U|=w.lane,w=w.next;while(w!==E)}else Y===null&&(w.shared.lanes=0);Hw|=U,A.lanes=U,A.memoizedState=C}}function d1(A,E,M){if(A=E.effects,E.effects=null,A!==null)for(E=0;E<A.length;E++){var W=A[E],w=W.callback;if(w!==null){if(W.callback=null,W=M,typeof w!=="function")throw Error($(191,w));w.call(W)}}}function zw(A){if(A===eU)throw Error($(174));return A}function X8(A,E){switch(wE(iU,E),wE(dU,A),wE(WW,eU),A=E.nodeType,A){case 9:case 11:E=(E=E.documentElement)?E.namespaceURI:Fl(null,"");break;default:A=A===8?E.parentNode:E,E=A.namespaceURI||null,A=A.tagName,E=Fl(E,A)}LE(WW),wE(WW,E)}function QY(){LE(WW),LE(dU),LE(iU)}function NI(A){zw(iU.current);var E=zw(WW.current),M=Fl(E,A.type);E!==M&&(wE(dU,A),wE(WW,M))}function R8(A){dU.current===A&&(LE(WW),LE(dU))}function fL(A){for(var E=A;E!==null;){if(E.tag===13){var M=E.memoizedState;if(M!==null&&(M=M.dehydrated,M===null||M.data==="$?"||M.data==="$!"))return E}else if(E.tag===19&&E.memoizedProps.revealOrder!==void 0){if((E.flags&128)!==0)return E}else if(E.child!==null){E.child.return=E,E=E.child;continue}if(E===A)break;for(;E.sibling===null;){if(E.return===null||E.return===A)return null;E=E.return}E.sibling.return=E.return,E=E.sibling}return null}function B8(){for(var A=0;A<tZ.length;A++)tZ[A]._workInProgressVersionPrimary=null;tZ.length=0}function iE(){throw Error($(321))}function V8(A,E){if(E===null)return!1;for(var M=0;M<E.length&&M<A.length;M++)if(!dM(A[M],E[M]))return!1;return!0}function H8(A,E,M,W,w,Y){if(Vw=Y,IE=E,E.memoizedState=null,E.updateQueue=null,E.lanes=0,FL.current=A===null||A.memoizedState===null?Yz:Uz,A=M(W,w),SU){Y=0;do{if(SU=!1,sU=0,25<=Y)throw Error($(301));Y+=1,fE=TE=null,E.updateQueue=null,FL.current=Kz,A=M(W,w)}while(SU)}if(FL.current=vL,E=TE!==null&&TE.next!==null,Vw=0,fE=TE=IE=null,jL=!1,E)throw Error($(300));return A}function y8(){var A=sU!==0;return sU=0,A}function AW(){var A={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fE===null?IE.memoizedState=fE=A:fE=fE.next=A,fE}function PM(){if(TE===null){var A=IE.alternate;A=A!==null?A.memoizedState:null}else A=TE.next;var E=fE===null?IE.memoizedState:fE.next;if(E!==null)fE=E,TE=A;else{if(A===null)throw Error($(310));TE=A,A={memoizedState:TE.memoizedState,baseState:TE.baseState,baseQueue:TE.baseQueue,queue:TE.queue,next:null},fE===null?IE.memoizedState=fE=A:fE=fE.next=A}return fE}function oU(A,E){return typeof E==="function"?E(A):E}function _Z(A){var E=PM(),M=E.queue;if(M===null)throw Error($(311));M.lastRenderedReducer=A;var W=TE,w=W.baseQueue,Y=M.pending;if(Y!==null){if(w!==null){var U=w.next;w.next=Y.next,Y.next=U}W.baseQueue=w=Y,M.pending=null}if(w!==null){Y=w.next,W=W.baseState;var K=U=null,L=null,G=Y;do{var l=G.lane;if((Vw&l)===l)L!==null&&(L=L.next={lane:0,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null}),W=G.hasEagerState?G.eagerState:A(W,G.action);else{var C={lane:l,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null};L===null?(K=L=C,U=W):L=L.next=C,IE.lanes|=l,Hw|=l}G=G.next}while(G!==null&&G!==Y);L===null?U=W:L.next=K,dM(W,E.memoizedState)||(lM=!0),E.memoizedState=W,E.baseState=U,E.baseQueue=L,M.lastRenderedState=W}if(A=M.interleaved,A!==null){w=A;do Y=w.lane,IE.lanes|=Y,Hw|=Y,w=w.next;while(w!==A)}else w===null&&(M.lanes=0);return[E.memoizedState,M.dispatch]}function eZ(A){var E=PM(),M=E.queue;if(M===null)throw Error($(311));M.lastRenderedReducer=A;var{dispatch:W,pending:w}=M,Y=E.memoizedState;if(w!==null){M.pending=null;var U=w=w.next;do Y=A(Y,U.action),U=U.next;while(U!==w);dM(Y,E.memoizedState)||(lM=!0),E.memoizedState=Y,E.baseQueue===null&&(E.baseState=Y),M.lastRenderedState=Y}return[Y,W]}function JI(){}function qI(A,E){var M=IE,W=PM(),w=E(),Y=!dM(W.memoizedState,w);if(Y&&(W.memoizedState=w,lM=!0),W=W.queue,T8(XI.bind(null,M,W,A),[A]),W.getSnapshot!==E||Y||fE!==null&&fE.memoizedState.tag&1){if(M.flags|=2048,rU(9,QI.bind(null,M,W,w,E),void 0,null),jE===null)throw Error($(349));(Vw&30)!==0||zI(M,E,w)}return w}function zI(A,E,M){A.flags|=16384,A={getSnapshot:E,value:M},E=IE.updateQueue,E===null?(E={lastEffect:null,stores:null},IE.updateQueue=E,E.stores=[A]):(M=E.stores,M===null?E.stores=[A]:M.push(A))}function QI(A,E,M,W){E.value=M,E.getSnapshot=W,RI(E)&&BI(A)}function XI(A,E,M){return M(function(){RI(E)&&BI(A)})}function RI(A){var E=A.getSnapshot;A=A.value;try{var M=E();return!dM(A,M)}catch(W){return!0}}function BI(A){var E=JW(A,1);E!==null&&mM(E,A,1,-1)}function i1(A){var E=AW();return typeof A==="function"&&(A=A()),E.memoizedState=E.baseState=A,A={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:oU,lastRenderedState:A},E.queue=A,A=A.dispatch=wz.bind(null,IE,A),[E.memoizedState,A]}function rU(A,E,M,W){return A={tag:A,create:E,destroy:M,deps:W,next:null},E=IE.updateQueue,E===null?(E={lastEffect:null,stores:null},IE.updateQueue=E,E.lastEffect=A.next=A):(M=E.lastEffect,M===null?E.lastEffect=A.next=A:(W=M.next,M.next=A,A.next=W,E.lastEffect=A)),A}function VI(){return PM().memoizedState}function DL(A,E,M,W){var w=AW();IE.flags|=A,w.memoizedState=rU(1|E,M,void 0,W===void 0?null:W)}function aL(A,E,M,W){var w=PM();W=W===void 0?null:W;var Y=void 0;if(TE!==null){var U=TE.memoizedState;if(Y=U.destroy,W!==null&&V8(W,U.deps)){w.memoizedState=rU(E,M,Y,W);return}}IE.flags|=A,w.memoizedState=rU(1|E,M,Y,W)}function s1(A,E){return DL(8390656,8,A,E)}function T8(A,E){return aL(2048,8,A,E)}function HI(A,E){return aL(4,2,A,E)}function yI(A,E){return aL(4,4,A,E)}function TI(A,E){if(typeof E==="function")return A=A(),E(A),function(){E(null)};if(E!==null&&E!==void 0)return A=A(),E.current=A,function(){E.current=null}}function SI(A,E,M){return M=M!==null&&M!==void 0?M.concat([A]):null,aL(4,4,TI.bind(null,E,A),M)}function S8(){}function kI(A,E){var M=PM();E=E===void 0?null:E;var W=M.memoizedState;if(W!==null&&E!==null&&V8(E,W[1]))return W[0];return M.memoizedState=[A,E],A}function xI(A,E){var M=PM();E=E===void 0?null:E;var W=M.memoizedState;if(W!==null&&E!==null&&V8(E,W[1]))return W[0];return A=A(),M.memoizedState=[A,E],A}function PI(A,E,M){if((Vw&21)===0)return A.baseState&&(A.baseState=!1,lM=!0),A.memoizedState=M;return dM(M,E)||(M=vD(),IE.lanes|=M,Hw|=M,A.baseState=!0),E}function Mz(A,E){var M=EE;EE=M!==0&&4>M?M:4,A(!0);var W=$Z.transition;$Z.transition={};try{A(!1),E()}finally{EE=M,$Z.transition=W}}function uI(){return PM().memoizedState}function Wz(A,E,M){var W=dW(A);if(M={lane:W,action:M,hasEagerState:!1,eagerState:null,next:null},hI(A))fI(E,M);else if(M=II(A,E,M,W),M!==null){var w=MM();mM(M,A,W,w),jI(M,E,W)}}function wz(A,E,M){var W=dW(A),w={lane:W,action:M,hasEagerState:!1,eagerState:null,next:null};if(hI(A))fI(E,w);else{var Y=A.alternate;if(A.lanes===0&&(Y===null||Y.lanes===0)&&(Y=E.lastRenderedReducer,Y!==null))try{var U=E.lastRenderedState,K=Y(U,M);if(w.hasEagerState=!0,w.eagerState=K,dM(K,U)){var L=E.interleaved;L===null?(w.next=w,z8(E)):(w.next=L.next,L.next=w),E.interleaved=w;return}}catch(G){}finally{}M=II(A,E,w,W),M!==null&&(w=MM(),mM(M,A,W,w),jI(M,E,W))}}function hI(A){var E=A.alternate;return A===IE||E!==null&&E===IE}function fI(A,E){SU=jL=!0;var M=A.pending;M===null?E.next=E:(E.next=M.next,M.next=E),A.pending=E}function jI(A,E,M){if((M&4194240)!==0){var W=E.lanes;W&=A.pendingLanes,M|=W,E.lanes=M,U8(A,M)}}function pM(A,E){if(A&&A.defaultProps){E=OE({},E),A=A.defaultProps;for(var M in A)E[M]===void 0&&(E[M]=A[M]);return E}return E}function jl(A,E,M,W){E=A.memoizedState,M=M(W,E),M=M===null||M===void 0?E:OE({},E,M),A.memoizedState=M,A.lanes===0&&(A.updateQueue.baseState=M)}function o1(A,E,M,W,w,Y,U){return A=A.stateNode,typeof A.shouldComponentUpdate==="function"?A.shouldComponentUpdate(W,Y,U):E.prototype&&E.prototype.isPureReactComponent?!bU(M,W)||!bU(w,Y):!0}function vI(A,E,M){var W=!1,w=oW,Y=E.contextType;return typeof Y==="object"&&Y!==null?Y=xM(Y):(w=FM(E)?Rw:rE.current,W=E.contextTypes,Y=(W=W!==null&&W!==void 0)?JY(A,w):oW),E=new E(M,Y),A.memoizedState=E.state!==null&&E.state!==void 0?E.state:null,E.updater=tL,A.stateNode=E,E._reactInternals=A,W&&(A=A.stateNode,A.__reactInternalMemoizedUnmaskedChildContext=w,A.__reactInternalMemoizedMaskedChildContext=Y),E}function r1(A,E,M,W){A=E.state,typeof E.componentWillReceiveProps==="function"&&E.componentWillReceiveProps(M,W),typeof E.UNSAFE_componentWillReceiveProps==="function"&&E.UNSAFE_componentWillReceiveProps(M,W),E.state!==A&&tL.enqueueReplaceState(E,E.state,null)}function vl(A,E,M,W){var w=A.stateNode;w.props=M,w.state=A.memoizedState,w.refs={},Q8(A);var Y=E.contextType;typeof Y==="object"&&Y!==null?w.context=xM(Y):(Y=FM(E)?Rw:rE.current,w.context=JY(A,Y)),w.state=A.memoizedState,Y=E.getDerivedStateFromProps,typeof Y==="function"&&(jl(A,E,Y,M),w.state=A.memoizedState),typeof E.getDerivedStateFromProps==="function"||typeof w.getSnapshotBeforeUpdate==="function"||typeof w.UNSAFE_componentWillMount!=="function"&&typeof w.componentWillMount!=="function"||(E=w.state,typeof w.componentWillMount==="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount==="function"&&w.UNSAFE_componentWillMount(),E!==w.state&&tL.enqueueReplaceState(w,w.state,null),hL(A,M,w,W),w.state=A.memoizedState),typeof w.componentDidMount==="function"&&(A.flags|=4194308)}function XY(A,E){try{var M="",W=E;do M+=vJ(W),W=W.return;while(W);var w=M}catch(Y){w=`
Error generating stack: `+Y.message+`
`+Y.stack}return{value:A,source:E,stack:w,digest:null}}function Al(A,E,M){return{value:A,source:null,stack:M!=null?M:null,digest:E!=null?E:null}}function gl(A,E){try{console.error(E.value)}catch(M){setTimeout(function(){throw M})}}function gI(A,E,M){M=IW(-1,M),M.tag=3,M.payload={element:null};var W=E.value;return M.callback=function(){pL||(pL=!0,rl=W),gl(A,E)},M}function pI(A,E,M){M=IW(-1,M),M.tag=3;var W=A.type.getDerivedStateFromError;if(typeof W==="function"){var w=E.value;M.payload=function(){return W(w)},M.callback=function(){gl(A,E)}}var Y=A.stateNode;return Y!==null&&typeof Y.componentDidCatch==="function"&&(M.callback=function(){gl(A,E),typeof W!=="function"&&(mW===null?mW=new Set([this]):mW.add(this));var U=E.stack;this.componentDidCatch(E.value,{componentStack:U!==null?U:""})}),M}function a1(A,E,M){var W=A.pingCache;if(W===null){W=A.pingCache=new Lz;var w=new Set;W.set(E,w)}else w=W.get(E),w===void 0&&(w=new Set,W.set(E,w));w.has(M)||(w.add(M),A=Xz.bind(null,A,E,M),E.then(A,A))}function t1(A){do{var E;if(E=A.tag===13)E=A.memoizedState,E=E!==null?E.dehydrated!==null?!0:!1:!0;if(E)return A;A=A.return}while(A!==null);return null}function $1(A,E,M,W,w){if((A.mode&1)===0)return A===E?A.flags|=65536:(A.flags|=128,M.flags|=131072,M.flags&=-52805,M.tag===1&&(M.alternate===null?M.tag=17:(E=IW(-1,1),E.tag=2,nW(M,E,1))),M.lanes|=1),A;return A.flags|=65536,A.lanes=w,A}function EM(A,E,M,W){E.child=A===null?DI(E,null,M,W):zY(E,A.child,M,W)}function _1(A,E,M,W,w){M=M.render;var Y=E.ref;if(IY(E,w),W=H8(A,E,M,W,Y,w),M=y8(),A!==null&&!lM)return E.updateQueue=A.updateQueue,E.flags&=-2053,A.lanes&=~w,qW(A,E,w);return lE&&M&&D8(E),E.flags|=1,EM(A,E,W,w),E.child}function e1(A,E,M,W,w){if(A===null){var Y=M.type;if(typeof Y==="function"&&!v8(Y)&&Y.defaultProps===void 0&&M.compare===null&&M.defaultProps===void 0)return E.tag=15,E.type=Y,bI(A,E,Y,W,w);return A=JL(M.type,null,W,E,E.mode,w),A.ref=E.ref,A.return=E,E.child=A}if(Y=A.child,(A.lanes&w)===0){var U=Y.memoizedProps;if(M=M.compare,M=M!==null?M:bU,M(U,W)&&A.ref===E.ref)return qW(A,E,w)}return E.flags|=1,A=iW(Y,W),A.ref=E.ref,A.return=E,E.child=A}function bI(A,E,M,W,w){if(A!==null){var Y=A.memoizedProps;if(bU(Y,W)&&A.ref===E.ref)if(lM=!1,E.pendingProps=W=Y,(A.lanes&w)!==0)(A.flags&131072)!==0&&(lM=!0);else return E.lanes=A.lanes,qW(A,E,w)}return pl(A,E,M,W,w)}function cI(A,E,M){var W=E.pendingProps,w=W.children,Y=A!==null?A.memoizedState:null;if(W.mode==="hidden")if((E.mode&1)===0)E.memoizedState={baseLanes:0,cachePool:null,transitions:null},wE(ZY,NM),NM|=M;else{if((M&1073741824)===0)return A=Y!==null?Y.baseLanes|M:M,E.lanes=E.childLanes=1073741824,E.memoizedState={baseLanes:A,cachePool:null,transitions:null},E.updateQueue=null,wE(ZY,NM),NM|=A,null;E.memoizedState={baseLanes:0,cachePool:null,transitions:null},W=Y!==null?Y.baseLanes:M,wE(ZY,NM),NM|=W}else Y!==null?(W=Y.baseLanes|M,E.memoizedState=null):W=M,wE(ZY,NM),NM|=W;return EM(A,E,w,M),E.child}function nI(A,E){var M=E.ref;if(A===null&&M!==null||A!==null&&A.ref!==M)E.flags|=512,E.flags|=2097152}function pl(A,E,M,W,w){var Y=FM(M)?Rw:rE.current;if(Y=JY(E,Y),IY(E,w),M=H8(A,E,M,W,Y,w),W=y8(),A!==null&&!lM)return E.updateQueue=A.updateQueue,E.flags&=-2053,A.lanes&=~w,qW(A,E,w);return lE&&W&&D8(E),E.flags|=1,EM(A,E,M,w),E.child}function AD(A,E,M,W,w){if(FM(M)){var Y=!0;SL(E)}else Y=!1;if(IY(E,w),E.stateNode===null)IL(A,E),vI(E,M,W),vl(E,M,W,w),W=!0;else if(A===null){var{stateNode:U,memoizedProps:K}=E;U.props=K;var L=U.context,G=M.contextType;typeof G==="object"&&G!==null?G=xM(G):(G=FM(M)?Rw:rE.current,G=JY(E,G));var l=M.getDerivedStateFromProps,C=typeof l==="function"||typeof U.getSnapshotBeforeUpdate==="function";C||typeof U.UNSAFE_componentWillReceiveProps!=="function"&&typeof U.componentWillReceiveProps!=="function"||(K!==W||L!==G)&&r1(E,U,W,G),uW=!1;var F=E.memoizedState;U.state=F,hL(E,W,U,w),L=E.memoizedState,K!==W||F!==L||CM.current||uW?(typeof l==="function"&&(jl(E,M,l,W),L=E.memoizedState),(K=uW||o1(E,M,K,W,F,L,G))?(C||typeof U.UNSAFE_componentWillMount!=="function"&&typeof U.componentWillMount!=="function"||(typeof U.componentWillMount==="function"&&U.componentWillMount(),typeof U.UNSAFE_componentWillMount==="function"&&U.UNSAFE_componentWillMount()),typeof U.componentDidMount==="function"&&(E.flags|=4194308)):(typeof U.componentDidMount==="function"&&(E.flags|=4194308),E.memoizedProps=W,E.memoizedState=L),U.props=W,U.state=L,U.context=G,W=K):(typeof U.componentDidMount==="function"&&(E.flags|=4194308),W=!1)}else{U=E.stateNode,OI(A,E),K=E.memoizedProps,G=E.type===E.elementType?K:pM(E.type,K),U.props=G,C=E.pendingProps,F=U.context,L=M.contextType,typeof L==="object"&&L!==null?L=xM(L):(L=FM(M)?Rw:rE.current,L=JY(E,L));var I=M.getDerivedStateFromProps;(l=typeof I==="function"||typeof U.getSnapshotBeforeUpdate==="function")||typeof U.UNSAFE_componentWillReceiveProps!=="function"&&typeof U.componentWillReceiveProps!=="function"||(K!==C||F!==L)&&r1(E,U,W,L),uW=!1,F=E.memoizedState,U.state=F,hL(E,W,U,w);var J=E.memoizedState;K!==C||F!==J||CM.current||uW?(typeof I==="function"&&(jl(E,M,I,W),J=E.memoizedState),(G=uW||o1(E,M,G,W,F,J,L)||!1)?(l||typeof U.UNSAFE_componentWillUpdate!=="function"&&typeof U.componentWillUpdate!=="function"||(typeof U.componentWillUpdate==="function"&&U.componentWillUpdate(W,J,L),typeof U.UNSAFE_componentWillUpdate==="function"&&U.UNSAFE_componentWillUpdate(W,J,L)),typeof U.componentDidUpdate==="function"&&(E.flags|=4),typeof U.getSnapshotBeforeUpdate==="function"&&(E.flags|=1024)):(typeof U.componentDidUpdate!=="function"||K===A.memoizedProps&&F===A.memoizedState||(E.flags|=4),typeof U.getSnapshotBeforeUpdate!=="function"||K===A.memoizedProps&&F===A.memoizedState||(E.flags|=1024),E.memoizedProps=W,E.memoizedState=J),U.props=W,U.state=J,U.context=L,W=G):(typeof U.componentDidUpdate!=="function"||K===A.memoizedProps&&F===A.memoizedState||(E.flags|=4),typeof U.getSnapshotBeforeUpdate!=="function"||K===A.memoizedProps&&F===A.memoizedState||(E.flags|=1024),W=!1)}return bl(A,E,M,W,Y,w)}function bl(A,E,M,W,w,Y){nI(A,E);var U=(E.flags&128)!==0;if(!W&&!U)return w&&p1(E,M,!1),qW(A,E,Y);W=E.stateNode,Gz.current=E;var K=U&&typeof M.getDerivedStateFromError!=="function"?null:W.render();return E.flags|=1,A!==null&&U?(E.child=zY(E,A.child,null,Y),E.child=zY(E,null,K,Y)):EM(A,E,K,Y),E.memoizedState=W.state,w&&p1(E,M,!0),E.child}function mI(A){var E=A.stateNode;E.pendingContext?g1(A,E.pendingContext,E.pendingContext!==E.context):E.context&&g1(A,E.context,!1),X8(A,E.containerInfo)}function ED(A,E,M,W,w){return qY(),O8(w),E.flags|=256,EM(A,E,M,W),E.child}function nl(A){return{baseLanes:A,cachePool:null,transitions:null}}function dI(A,E,M){var W=E.pendingProps,w=DE.current,Y=!1,U=(E.flags&128)!==0,K;if((K=U)||(K=A!==null&&A.memoizedState===null?!1:(w&2)!==0),K)Y=!0,E.flags&=-129;else if(A===null||A.memoizedState!==null)w|=1;if(wE(DE,w&1),A===null){if(hl(E),A=E.memoizedState,A!==null&&(A=A.dehydrated,A!==null))return(E.mode&1)===0?E.lanes=1:A.data==="$!"?E.lanes=8:E.lanes=1073741824,null;return U=W.children,A=W.fallback,Y?(W=E.mode,Y=E.child,U={mode:"hidden",children:U},(W&1)===0&&Y!==null?(Y.childLanes=0,Y.pendingProps=U):Y=eL(U,W,0,null),A=Xw(A,W,M,null),Y.return=E,A.return=E,Y.sibling=A,E.child=Y,E.child.memoizedState=nl(M),E.memoizedState=cl,A):k8(E,U)}if(w=A.memoizedState,w!==null&&(K=w.dehydrated,K!==null))return Zz(A,E,U,W,K,w,M);if(Y){Y=W.fallback,U=E.mode,w=A.child,K=w.sibling;var L={mode:"hidden",children:W.children};return(U&1)===0&&E.child!==w?(W=E.child,W.childLanes=0,W.pendingProps=L,E.deletions=null):(W=iW(w,L),W.subtreeFlags=w.subtreeFlags&14680064),K!==null?Y=iW(K,Y):(Y=Xw(Y,U,M,null),Y.flags|=2),Y.return=E,W.return=E,W.sibling=Y,E.child=W,W=Y,Y=E.child,U=A.child.memoizedState,U=U===null?nl(M):{baseLanes:U.baseLanes|M,cachePool:null,transitions:U.transitions},Y.memoizedState=U,Y.childLanes=A.childLanes&~M,E.memoizedState=cl,W}return Y=A.child,A=Y.sibling,W=iW(Y,{mode:"visible",children:W.children}),(E.mode&1)===0&&(W.lanes=M),W.return=E,W.sibling=null,A!==null&&(M=E.deletions,M===null?(E.deletions=[A],E.flags|=16):M.push(A)),E.child=W,E.memoizedState=null,W}function k8(A,E){return E=eL({mode:"visible",children:E},A.mode,0,null),E.return=A,A.child=E}function YL(A,E,M,W){return W!==null&&O8(W),zY(E,A.child,null,M),A=k8(E,E.pendingProps.children),A.flags|=2,E.memoizedState=null,A}function Zz(A,E,M,W,w,Y,U){if(M){if(E.flags&256)return E.flags&=-257,W=Al(Error($(422))),YL(A,E,U,W);if(E.memoizedState!==null)return E.child=A.child,E.flags|=128,null;return Y=W.fallback,w=E.mode,W=eL({mode:"visible",children:W.children},w,0,null),Y=Xw(Y,w,U,null),Y.flags|=2,W.return=E,Y.return=E,W.sibling=Y,E.child=W,(E.mode&1)!==0&&zY(E,A.child,null,U),E.child.memoizedState=nl(U),E.memoizedState=cl,Y}if((E.mode&1)===0)return YL(A,E,U,null);if(w.data==="$!"){if(W=w.nextSibling&&w.nextSibling.dataset,W)var K=W.dgst;return W=K,Y=Error($(419)),W=Al(Y,W,void 0),YL(A,E,U,W)}if(K=(U&A.childLanes)!==0,lM||K){if(W=jE,W!==null){switch(U&-U){case 4:w=2;break;case 16:w=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:w=32;break;case 536870912:w=268435456;break;default:w=0}w=(w&(W.suspendedLanes|U))!==0?0:w,w!==0&&w!==Y.retryLane&&(Y.retryLane=w,JW(A,w),mM(W,A,w,-1))}return j8(),W=Al(Error($(421))),YL(A,E,U,W)}if(w.data==="$?")return E.flags|=128,E.child=A.child,E=Rz.bind(null,A),w._reactRetry=E,null;return A=Y.treeContext,JM=cW(w.nextSibling),qM=E,lE=!0,cM=null,A!==null&&(yM[TM++]=FW,yM[TM++]=DW,yM[TM++]=Bw,FW=A.id,DW=A.overflow,Bw=E),E=k8(E,W.children),E.flags|=4096,E}function MD(A,E,M){A.lanes|=E;var W=A.alternate;W!==null&&(W.lanes|=E),fl(A.return,E,M)}function El(A,E,M,W,w){var Y=A.memoizedState;Y===null?A.memoizedState={isBackwards:E,rendering:null,renderingStartTime:0,last:W,tail:M,tailMode:w}:(Y.isBackwards=E,Y.rendering=null,Y.renderingStartTime=0,Y.last=W,Y.tail=M,Y.tailMode=w)}function iI(A,E,M){var W=E.pendingProps,w=W.revealOrder,Y=W.tail;if(EM(A,E,W.children,M),W=DE.current,(W&2)!==0)W=W&1|2,E.flags|=128;else{if(A!==null&&(A.flags&128)!==0)A:for(A=E.child;A!==null;){if(A.tag===13)A.memoizedState!==null&&MD(A,M,E);else if(A.tag===19)MD(A,M,E);else if(A.child!==null){A.child.return=A,A=A.child;continue}if(A===E)break A;for(;A.sibling===null;){if(A.return===null||A.return===E)break A;A=A.return}A.sibling.return=A.return,A=A.sibling}W&=1}if(wE(DE,W),(E.mode&1)===0)E.memoizedState=null;else switch(w){case"forwards":M=E.child;for(w=null;M!==null;)A=M.alternate,A!==null&&fL(A)===null&&(w=M),M=M.sibling;M=w,M===null?(w=E.child,E.child=null):(w=M.sibling,M.sibling=null),El(E,!1,w,M,Y);break;case"backwards":M=null,w=E.child;for(E.child=null;w!==null;){if(A=w.alternate,A!==null&&fL(A)===null){E.child=w;break}A=w.sibling,w.sibling=M,M=w,w=A}El(E,!0,M,null,Y);break;case"together":El(E,!1,null,null,void 0);break;default:E.memoizedState=null}return E.child}function IL(A,E){(E.mode&1)===0&&A!==null&&(A.alternate=null,E.alternate=null,E.flags|=2)}function qW(A,E,M){if(A!==null&&(E.dependencies=A.dependencies),Hw|=E.lanes,(M&E.childLanes)===0)return null;if(A!==null&&E.child!==A.child)throw Error($(153));if(E.child!==null){A=E.child,M=iW(A,A.pendingProps),E.child=M;for(M.return=E;A.sibling!==null;)A=A.sibling,M=M.sibling=iW(A,A.pendingProps),M.return=E;M.sibling=null}return E.child}function lz(A,E,M){switch(E.tag){case 3:mI(E),qY();break;case 5:NI(E);break;case 1:FM(E.type)&&SL(E);break;case 4:X8(E,E.stateNode.containerInfo);break;case 10:var W=E.type._context,w=E.memoizedProps.value;wE(PL,W._currentValue),W._currentValue=w;break;case 13:if(W=E.memoizedState,W!==null){if(W.dehydrated!==null)return wE(DE,DE.current&1),E.flags|=128,null;if((M&E.child.childLanes)!==0)return dI(A,E,M);return wE(DE,DE.current&1),A=qW(A,E,M),A!==null?A.sibling:null}wE(DE,DE.current&1);break;case 19:if(W=(M&E.childLanes)!==0,(A.flags&128)!==0){if(W)return iI(A,E,M);E.flags|=128}if(w=E.memoizedState,w!==null&&(w.rendering=null,w.tail=null,w.lastEffect=null),wE(DE,DE.current),W)break;else return null;case 22:case 23:return E.lanes=0,cI(A,E,M)}return qW(A,E,M)}function DU(A,E){if(!lE)switch(A.tailMode){case"hidden":E=A.tail;for(var M=null;E!==null;)E.alternate!==null&&(M=E),E=E.sibling;M===null?A.tail=null:M.sibling=null;break;case"collapsed":M=A.tail;for(var W=null;M!==null;)M.alternate!==null&&(W=M),M=M.sibling;W===null?E||A.tail===null?A.tail=null:A.tail.sibling=null:W.sibling=null}}function sE(A){var E=A.alternate!==null&&A.alternate.child===A.child,M=0,W=0;if(E)for(var w=A.child;w!==null;)M|=w.lanes|w.childLanes,W|=w.subtreeFlags&14680064,W|=w.flags&14680064,w.return=A,w=w.sibling;else for(w=A.child;w!==null;)M|=w.lanes|w.childLanes,W|=w.subtreeFlags,W|=w.flags,w.return=A,w=w.sibling;return A.subtreeFlags|=W,A.childLanes=M,E}function Cz(A,E,M){var W=E.pendingProps;switch(I8(E),E.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sE(E),null;case 1:return FM(E.type)&&TL(),sE(E),null;case 3:if(W=E.stateNode,QY(),LE(CM),LE(rE),B8(),W.pendingContext&&(W.context=W.pendingContext,W.pendingContext=null),A===null||A.child===null)WL(E)?E.flags|=4:A===null||A.memoizedState.isDehydrated&&(E.flags&256)===0||(E.flags|=1024,cM!==null&&($l(cM),cM=null));return ml(A,E),sE(E),null;case 5:R8(E);var w=zw(iU.current);if(M=E.type,A!==null&&E.stateNode!=null)oI(A,E,M,W,w),A.ref!==E.ref&&(E.flags|=512,E.flags|=2097152);else{if(!W){if(E.stateNode===null)throw Error($(166));return sE(E),null}if(A=zw(WW.current),WL(E)){W=E.stateNode,M=E.type;var Y=E.memoizedProps;switch(W[EW]=E,W[mU]=Y,A=(E.mode&1)!==0,M){case"dialog":KE("cancel",W),KE("close",W);break;case"iframe":case"object":case"embed":KE("load",W);break;case"video":case"audio":for(w=0;w<RU.length;w++)KE(RU[w],W);break;case"source":KE("error",W);break;case"img":case"image":case"link":KE("error",W),KE("load",W);break;case"details":KE("toggle",W);break;case"input":C1(W,Y),KE("invalid",W);break;case"select":W._wrapperState={wasMultiple:!!Y.multiple},KE("invalid",W);break;case"textarea":D1(W,Y),KE("invalid",W)}Dl(M,Y),w=null;for(var U in Y)if(Y.hasOwnProperty(U)){var K=Y[U];U==="children"?typeof K==="string"?W.textContent!==K&&(Y.suppressHydrationWarning!==!0&&ML(W.textContent,K,A),w=["children",K]):typeof K==="number"&&W.textContent!==""+K&&(Y.suppressHydrationWarning!==!0&&ML(W.textContent,K,A),w=["children",""+K]):uU.hasOwnProperty(U)&&K!=null&&U==="onScroll"&&KE("scroll",W)}switch(M){case"input":rK(W),F1(W,Y,!0);break;case"textarea":rK(W),I1(W);break;case"select":case"option":break;default:typeof Y.onClick==="function"&&(W.onclick=yL)}W=w,E.updateQueue=W,W!==null&&(E.flags|=4)}else{U=w.nodeType===9?w:w.ownerDocument,A==="http://www.w3.org/1999/xhtml"&&(A=XD(M)),A==="http://www.w3.org/1999/xhtml"?M==="script"?(A=U.createElement("div"),A.innerHTML="<script><\/script>",A=A.removeChild(A.firstChild)):typeof W.is==="string"?A=U.createElement(M,{is:W.is}):(A=U.createElement(M),M==="select"&&(U=A,W.multiple?U.multiple=!0:W.size&&(U.size=W.size))):A=U.createElementNS(A,M),A[EW]=E,A[mU]=W,sI(A,E,!1,!1),E.stateNode=A;A:{switch(U=Il(M,W),M){case"dialog":KE("cancel",A),KE("close",A),w=W;break;case"iframe":case"object":case"embed":KE("load",A),w=W;break;case"video":case"audio":for(w=0;w<RU.length;w++)KE(RU[w],A);w=W;break;case"source":KE("error",A),w=W;break;case"img":case"image":case"link":KE("error",A),KE("load",A),w=W;break;case"details":KE("toggle",A),w=W;break;case"input":C1(A,W),w=Gl(A,W),KE("invalid",A);break;case"option":w=W;break;case"select":A._wrapperState={wasMultiple:!!W.multiple},w=OE({},W,{value:void 0}),KE("invalid",A);break;case"textarea":D1(A,W),w=Cl(A,W),KE("invalid",A);break;default:w=W}Dl(M,w),K=w;for(Y in K)if(K.hasOwnProperty(Y)){var L=K[Y];Y==="style"?VD(A,L):Y==="dangerouslySetInnerHTML"?(L=L?L.__html:void 0,L!=null&&RD(A,L)):Y==="children"?typeof L==="string"?(M!=="textarea"||L!=="")&&hU(A,L):typeof L==="number"&&hU(A,""+L):Y!=="suppressContentEditableWarning"&&Y!=="suppressHydrationWarning"&&Y!=="autoFocus"&&(uU.hasOwnProperty(Y)?L!=null&&Y==="onScroll"&&KE("scroll",A):L!=null&&A8(A,Y,L,U))}switch(M){case"input":rK(A),F1(A,W,!1);break;case"textarea":rK(A),I1(A);break;case"option":W.value!=null&&A.setAttribute("value",""+sW(W.value));break;case"select":A.multiple=!!W.multiple,Y=W.value,Y!=null?lY(A,!!W.multiple,Y,!1):W.defaultValue!=null&&lY(A,!!W.multiple,W.defaultValue,!0);break;default:typeof w.onClick==="function"&&(A.onclick=yL)}switch(M){case"button":case"input":case"select":case"textarea":W=!!W.autoFocus;break A;case"img":W=!0;break A;default:W=!1}}W&&(E.flags|=4)}E.ref!==null&&(E.flags|=512,E.flags|=2097152)}return sE(E),null;case 6:if(A&&E.stateNode!=null)rI(A,E,A.memoizedProps,W);else{if(typeof W!=="string"&&E.stateNode===null)throw Error($(166));if(M=zw(iU.current),zw(WW.current),WL(E)){if(W=E.stateNode,M=E.memoizedProps,W[EW]=E,Y=W.nodeValue!==M){if(A=qM,A!==null)switch(A.tag){case 3:ML(W.nodeValue,M,(A.mode&1)!==0);break;case 5:A.memoizedProps.suppressHydrationWarning!==!0&&ML(W.nodeValue,M,(A.mode&1)!==0)}}Y&&(E.flags|=4)}else W=(M.nodeType===9?M:M.ownerDocument).createTextNode(W),W[EW]=E,E.stateNode=W}return sE(E),null;case 13:if(LE(DE),W=E.memoizedState,A===null||A.memoizedState!==null&&A.memoizedState.dehydrated!==null){if(lE&&JM!==null&&(E.mode&1)!==0&&(E.flags&128)===0)CI(),qY(),E.flags|=98560,Y=!1;else if(Y=WL(E),W!==null&&W.dehydrated!==null){if(A===null){if(!Y)throw Error($(318));if(Y=E.memoizedState,Y=Y!==null?Y.dehydrated:null,!Y)throw Error($(317));Y[EW]=E}else qY(),(E.flags&128)===0&&(E.memoizedState=null),E.flags|=4;sE(E),Y=!1}else cM!==null&&($l(cM),cM=null),Y=!0;if(!Y)return E.flags&65536?E:null}if((E.flags&128)!==0)return E.lanes=M,E;return W=W!==null,W!==(A!==null&&A.memoizedState!==null)&&W&&(E.child.flags|=8192,(E.mode&1)!==0&&(A===null||(DE.current&1)!==0?SE===0&&(SE=3):j8())),E.updateQueue!==null&&(E.flags|=4),sE(E),null;case 4:return QY(),ml(A,E),A===null&&cU(E.stateNode.containerInfo),sE(E),null;case 10:return q8(E.type._context),sE(E),null;case 17:return FM(E.type)&&TL(),sE(E),null;case 19:if(LE(DE),Y=E.memoizedState,Y===null)return sE(E),null;if(W=(E.flags&128)!==0,U=Y.rendering,U===null)if(W)DU(Y,!1);else{if(SE!==0||A!==null&&(A.flags&128)!==0)for(A=E.child;A!==null;){if(U=fL(A),U!==null){E.flags|=128,DU(Y,!1),W=U.updateQueue,W!==null&&(E.updateQueue=W,E.flags|=4),E.subtreeFlags=0,W=M;for(M=E.child;M!==null;)Y=M,A=W,Y.flags&=14680066,U=Y.alternate,U===null?(Y.childLanes=0,Y.lanes=A,Y.child=null,Y.subtreeFlags=0,Y.memoizedProps=null,Y.memoizedState=null,Y.updateQueue=null,Y.dependencies=null,Y.stateNode=null):(Y.childLanes=U.childLanes,Y.lanes=U.lanes,Y.child=U.child,Y.subtreeFlags=0,Y.deletions=null,Y.memoizedProps=U.memoizedProps,Y.memoizedState=U.memoizedState,Y.updateQueue=U.updateQueue,Y.type=U.type,A=U.dependencies,Y.dependencies=A===null?null:{lanes:A.lanes,firstContext:A.firstContext}),M=M.sibling;return wE(DE,DE.current&1|2),E.child}A=A.sibling}Y.tail!==null&&QE()>RY&&(E.flags|=128,W=!0,DU(Y,!1),E.lanes=4194304)}else{if(!W)if(A=fL(U),A!==null){if(E.flags|=128,W=!0,M=A.updateQueue,M!==null&&(E.updateQueue=M,E.flags|=4),DU(Y,!0),Y.tail===null&&Y.tailMode==="hidden"&&!U.alternate&&!lE)return sE(E),null}else 2*QE()-Y.renderingStartTime>RY&&M!==1073741824&&(E.flags|=128,W=!0,DU(Y,!1),E.lanes=4194304);Y.isBackwards?(U.sibling=E.child,E.child=U):(M=Y.last,M!==null?M.sibling=U:E.child=U,Y.last=U)}if(Y.tail!==null)return E=Y.tail,Y.rendering=E,Y.tail=E.sibling,Y.renderingStartTime=QE(),E.sibling=null,M=DE.current,wE(DE,W?M&1|2:M&1),E;return sE(E),null;case 22:case 23:return f8(),W=E.memoizedState!==null,A!==null&&A.memoizedState!==null!==W&&(E.flags|=8192),W&&(E.mode&1)!==0?(NM&1073741824)!==0&&(sE(E),E.subtreeFlags&6&&(E.flags|=8192)):sE(E),null;case 24:return null;case 25:return null}throw Error($(156,E.tag))}function Fz(A,E){switch(I8(E),E.tag){case 1:return FM(E.type)&&TL(),A=E.flags,A&65536?(E.flags=A&-65537|128,E):null;case 3:return QY(),LE(CM),LE(rE),B8(),A=E.flags,(A&65536)!==0&&(A&128)===0?(E.flags=A&-65537|128,E):null;case 5:return R8(E),null;case 13:if(LE(DE),A=E.memoizedState,A!==null&&A.dehydrated!==null){if(E.alternate===null)throw Error($(340));qY()}return A=E.flags,A&65536?(E.flags=A&-65537|128,E):null;case 19:return LE(DE),null;case 4:return QY(),null;case 10:return q8(E.type._context),null;case 22:case 23:return f8(),null;case 24:return null;default:return null}}function GY(A,E){var M=A.ref;if(M!==null)if(typeof M==="function")try{M(null)}catch(W){zE(A,E,W)}else M.current=null}function dl(A,E,M){try{M()}catch(W){zE(A,E,W)}}function Iz(A,E){if(yl=BL,A=eD(),F8(A)){if("selectionStart"in A)var M={start:A.selectionStart,end:A.selectionEnd};else A:{M=(M=A.ownerDocument)&&M.defaultView||window;var W=M.getSelection&&M.getSelection();if(W&&W.rangeCount!==0){M=W.anchorNode;var{anchorOffset:w,focusNode:Y}=W;W=W.focusOffset;try{M.nodeType,Y.nodeType}catch(B){M=null;break A}var U=0,K=-1,L=-1,G=0,l=0,C=A,F=null;E:for(;;){for(var I;;){if(C!==M||w!==0&&C.nodeType!==3||(K=U+w),C!==Y||W!==0&&C.nodeType!==3||(L=U+W),C.nodeType===3&&(U+=C.nodeValue.length),(I=C.firstChild)===null)break;F=C,C=I}for(;;){if(C===A)break E;if(F===M&&++G===w&&(K=U),F===Y&&++l===W&&(L=U),(I=C.nextSibling)!==null)break;C=F,F=C.parentNode}C=I}M=K===-1||L===-1?null:{start:K,end:L}}else M=null}M=M||{start:0,end:0}}else M=null;Tl={focusedElem:A,selectionRange:M},BL=!1;for(OA=E;OA!==null;)if(E=OA,A=E.child,(E.subtreeFlags&1028)!==0&&A!==null)A.return=E,OA=A;else for(;OA!==null;){E=OA;try{var J=E.alternate;if((E.flags&1024)!==0)switch(E.tag){case 0:case 11:case 15:break;case 1:if(J!==null){var{memoizedProps:q,memoizedState:D}=J,Z=E.stateNode,N=Z.getSnapshotBeforeUpdate(E.elementType===E.type?q:pM(E.type,q),D);Z.__reactInternalSnapshotBeforeUpdate=N}break;case 3:var O=E.stateNode.containerInfo;O.nodeType===1?O.textContent="":O.nodeType===9&&O.documentElement&&O.removeChild(O.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error($(163))}}catch(B){zE(E,E.return,B)}if(A=E.sibling,A!==null){A.return=E.return,OA=A;break}OA=E.return}return J=WD,WD=!1,J}function kU(A,E,M){var W=E.updateQueue;if(W=W!==null?W.lastEffect:null,W!==null){var w=W=W.next;do{if((w.tag&A)===A){var Y=w.destroy;w.destroy=void 0,Y!==void 0&&dl(E,M,Y)}w=w.next}while(w!==W)}}function $L(A,E){if(E=E.updateQueue,E=E!==null?E.lastEffect:null,E!==null){var M=E=E.next;do{if((M.tag&A)===A){var W=M.create;M.destroy=W()}M=M.next}while(M!==E)}}function il(A){var E=A.ref;if(E!==null){var M=A.stateNode;switch(A.tag){case 5:A=M;break;default:A=M}typeof E==="function"?E(A):E.current=A}}function aI(A){var E=A.alternate;E!==null&&(A.alternate=null,aI(E)),A.child=null,A.deletions=null,A.sibling=null,A.tag===5&&(E=A.stateNode,E!==null&&(delete E[EW],delete E[mU],delete E[xl],delete E[$q],delete E[_q])),A.stateNode=null,A.return=null,A.dependencies=null,A.memoizedProps=null,A.memoizedState=null,A.pendingProps=null,A.stateNode=null,A.updateQueue=null}function tI(A){return A.tag===5||A.tag===3||A.tag===4}function wD(A){A:for(;;){for(;A.sibling===null;){if(A.return===null||tI(A.return))return null;A=A.return}A.sibling.return=A.return;for(A=A.sibling;A.tag!==5&&A.tag!==6&&A.tag!==18;){if(A.flags&2)continue A;if(A.child===null||A.tag===4)continue A;else A.child.return=A,A=A.child}if(!(A.flags&2))return A.stateNode}}function sl(A,E,M){var W=A.tag;if(W===5||W===6)A=A.stateNode,E?M.nodeType===8?M.parentNode.insertBefore(A,E):M.insertBefore(A,E):(M.nodeType===8?(E=M.parentNode,E.insertBefore(A,M)):(E=M,E.appendChild(A)),M=M._reactRootContainer,M!==null&&M!==void 0||E.onclick!==null||(E.onclick=yL));else if(W!==4&&(A=A.child,A!==null))for(sl(A,E,M),A=A.sibling;A!==null;)sl(A,E,M),A=A.sibling}function ol(A,E,M){var W=A.tag;if(W===5||W===6)A=A.stateNode,E?M.insertBefore(A,E):M.appendChild(A);else if(W!==4&&(A=A.child,A!==null))for(ol(A,E,M),A=A.sibling;A!==null;)ol(A,E,M),A=A.sibling}function xW(A,E,M){for(M=M.child;M!==null;)$I(A,E,M),M=M.sibling}function $I(A,E,M){if(MW&&typeof MW.onCommitFiberUnmount==="function")try{MW.onCommitFiberUnmount(mL,M)}catch(K){}switch(M.tag){case 5:oE||GY(M,E);case 6:var W=cE,w=bM;cE=null,xW(A,E,M),cE=W,bM=w,cE!==null&&(bM?(A=cE,M=M.stateNode,A.nodeType===8?A.parentNode.removeChild(M):A.removeChild(M)):cE.removeChild(M.stateNode));break;case 18:cE!==null&&(bM?(A=cE,M=M.stateNode,A.nodeType===8?rZ(A.parentNode,M):A.nodeType===1&&rZ(A,M),gU(A)):rZ(cE,M.stateNode));break;case 4:W=cE,w=bM,cE=M.stateNode.containerInfo,bM=!0,xW(A,E,M),cE=W,bM=w;break;case 0:case 11:case 14:case 15:if(!oE&&(W=M.updateQueue,W!==null&&(W=W.lastEffect,W!==null))){w=W=W.next;do{var Y=w,U=Y.destroy;Y=Y.tag,U!==void 0&&((Y&2)!==0?dl(M,E,U):(Y&4)!==0&&dl(M,E,U)),w=w.next}while(w!==W)}xW(A,E,M);break;case 1:if(!oE&&(GY(M,E),W=M.stateNode,typeof W.componentWillUnmount==="function"))try{W.props=M.memoizedProps,W.state=M.memoizedState,W.componentWillUnmount()}catch(K){zE(M,E,K)}xW(A,E,M);break;case 21:xW(A,E,M);break;case 22:M.mode&1?(oE=(W=oE)||M.memoizedState!==null,xW(A,E,M),oE=W):xW(A,E,M);break;default:xW(A,E,M)}}function YD(A){var E=A.updateQueue;if(E!==null){A.updateQueue=null;var M=A.stateNode;M===null&&(M=A.stateNode=new Dz),E.forEach(function(W){var w=Bz.bind(null,A,W);M.has(W)||(M.add(W),W.then(w,w))})}}function gM(A,E){var M=E.deletions;if(M!==null)for(var W=0;W<M.length;W++){var w=M[W];try{var Y=A,U=E,K=U;A:for(;K!==null;){switch(K.tag){case 5:cE=K.stateNode,bM=!1;break A;case 3:cE=K.stateNode.containerInfo,bM=!0;break A;case 4:cE=K.stateNode.containerInfo,bM=!0;break A}K=K.return}if(cE===null)throw Error($(160));$I(Y,U,w),cE=null,bM=!1;var L=w.alternate;L!==null&&(L.return=null),w.return=null}catch(G){zE(w,E,G)}}if(E.subtreeFlags&12854)for(E=E.child;E!==null;)_I(E,A),E=E.sibling}function _I(A,E){var{alternate:M,flags:W}=A;switch(A.tag){case 0:case 11:case 14:case 15:if(gM(E,A),eM(A),W&4){try{kU(3,A,A.return),$L(3,A)}catch(q){zE(A,A.return,q)}try{kU(5,A,A.return)}catch(q){zE(A,A.return,q)}}break;case 1:gM(E,A),eM(A),W&512&&M!==null&&GY(M,M.return);break;case 5:if(gM(E,A),eM(A),W&512&&M!==null&&GY(M,M.return),A.flags&32){var w=A.stateNode;try{hU(w,"")}catch(q){zE(A,A.return,q)}}if(W&4&&(w=A.stateNode,w!=null)){var Y=A.memoizedProps,U=M!==null?M.memoizedProps:Y,K=A.type,L=A.updateQueue;if(A.updateQueue=null,L!==null)try{K==="input"&&Y.type==="radio"&&Y.name!=null&&zD(w,Y),Il(K,U);var G=Il(K,Y);for(U=0;U<L.length;U+=2){var l=L[U],C=L[U+1];l==="style"?VD(w,C):l==="dangerouslySetInnerHTML"?RD(w,C):l==="children"?hU(w,C):A8(w,l,C,G)}switch(K){case"input":Zl(w,Y);break;case"textarea":QD(w,Y);break;case"select":var F=w._wrapperState.wasMultiple;w._wrapperState.wasMultiple=!!Y.multiple;var I=Y.value;I!=null?lY(w,!!Y.multiple,I,!1):F!==!!Y.multiple&&(Y.defaultValue!=null?lY(w,!!Y.multiple,Y.defaultValue,!0):lY(w,!!Y.multiple,Y.multiple?[]:"",!1))}w[mU]=Y}catch(q){zE(A,A.return,q)}}break;case 6:if(gM(E,A),eM(A),W&4){if(A.stateNode===null)throw Error($(162));w=A.stateNode,Y=A.memoizedProps;try{w.nodeValue=Y}catch(q){zE(A,A.return,q)}}break;case 3:if(gM(E,A),eM(A),W&4&&M!==null&&M.memoizedState.isDehydrated)try{gU(E.containerInfo)}catch(q){zE(A,A.return,q)}break;case 4:gM(E,A),eM(A);break;case 13:gM(E,A),eM(A),w=A.child,w.flags&8192&&(Y=w.memoizedState!==null,w.stateNode.isHidden=Y,!Y||w.alternate!==null&&w.alternate.memoizedState!==null||(u8=QE())),W&4&&YD(A);break;case 22:if(l=M!==null&&M.memoizedState!==null,A.mode&1?(oE=(G=oE)||l,gM(E,A),oE=G):gM(E,A),eM(A),W&8192){if(G=A.memoizedState!==null,(A.stateNode.isHidden=G)&&!l&&(A.mode&1)!==0)for(OA=A,l=A.child;l!==null;){for(C=OA=l;OA!==null;){switch(F=OA,I=F.child,F.tag){case 0:case 11:case 14:case 15:kU(4,F,F.return);break;case 1:GY(F,F.return);var J=F.stateNode;if(typeof J.componentWillUnmount==="function"){W=F,M=F.return;try{E=W,J.props=E.memoizedProps,J.state=E.memoizedState,J.componentWillUnmount()}catch(q){zE(W,M,q)}}break;case 5:GY(F,F.return);break;case 22:if(F.memoizedState!==null){KD(C);continue}}I!==null?(I.return=F,OA=I):KD(C)}l=l.sibling}A:for(l=null,C=A;;){if(C.tag===5){if(l===null){l=C;try{w=C.stateNode,G?(Y=w.style,typeof Y.setProperty==="function"?Y.setProperty("display","none","important"):Y.display="none"):(K=C.stateNode,L=C.memoizedProps.style,U=L!==void 0&&L!==null&&L.hasOwnProperty("display")?L.display:null,K.style.display=BD("display",U))}catch(q){zE(A,A.return,q)}}}else if(C.tag===6){if(l===null)try{C.stateNode.nodeValue=G?"":C.memoizedProps}catch(q){zE(A,A.return,q)}}else if((C.tag!==22&&C.tag!==23||C.memoizedState===null||C===A)&&C.child!==null){C.child.return=C,C=C.child;continue}if(C===A)break A;for(;C.sibling===null;){if(C.return===null||C.return===A)break A;l===C&&(l=null),C=C.return}l===C&&(l=null),C.sibling.return=C.return,C=C.sibling}}break;case 19:gM(E,A),eM(A),W&4&&YD(A);break;case 21:break;default:gM(E,A),eM(A)}}function eM(A){var E=A.flags;if(E&2){try{A:{for(var M=A.return;M!==null;){if(tI(M)){var W=M;break A}M=M.return}throw Error($(160))}switch(W.tag){case 5:var w=W.stateNode;W.flags&32&&(hU(w,""),W.flags&=-33);var Y=wD(A);ol(A,Y,w);break;case 3:case 4:var U=W.stateNode.containerInfo,K=wD(A);sl(A,K,U);break;default:throw Error($(161))}}catch(L){zE(A,A.return,L)}A.flags&=-3}E&4096&&(A.flags&=-4097)}function Oz(A,E,M){OA=A,eI(A,E,M)}function eI(A,E,M){for(var W=(A.mode&1)!==0;OA!==null;){var w=OA,Y=w.child;if(w.tag===22&&W){var U=w.memoizedState!==null||UL;if(!U){var K=w.alternate,L=K!==null&&K.memoizedState!==null||oE;K=UL;var G=oE;if(UL=U,(oE=L)&&!G)for(OA=w;OA!==null;)U=OA,L=U.child,U.tag===22&&U.memoizedState!==null?LD(w):L!==null?(L.return=U,OA=L):LD(w);for(;Y!==null;)OA=Y,eI(Y,E,M),Y=Y.sibling;OA=w,UL=K,oE=G}UD(A,E,M)}else(w.subtreeFlags&8772)!==0&&Y!==null?(Y.return=w,OA=Y):UD(A,E,M)}}function UD(A){for(;OA!==null;){var E=OA;if((E.flags&8772)!==0){var M=E.alternate;try{if((E.flags&8772)!==0)switch(E.tag){case 0:case 11:case 15:oE||$L(5,E);break;case 1:var W=E.stateNode;if(E.flags&4&&!oE)if(M===null)W.componentDidMount();else{var w=E.elementType===E.type?M.memoizedProps:pM(E.type,M.memoizedProps);W.componentDidUpdate(w,M.memoizedState,W.__reactInternalSnapshotBeforeUpdate)}var Y=E.updateQueue;Y!==null&&d1(E,Y,W);break;case 3:var U=E.updateQueue;if(U!==null){if(M=null,E.child!==null)switch(E.child.tag){case 5:M=E.child.stateNode;break;case 1:M=E.child.stateNode}d1(E,U,M)}break;case 5:var K=E.stateNode;if(M===null&&E.flags&4){M=K;var L=E.memoizedProps;switch(E.type){case"button":case"input":case"select":case"textarea":L.autoFocus&&M.focus();break;case"img":L.src&&(M.src=L.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(E.memoizedState===null){var G=E.alternate;if(G!==null){var l=G.memoizedState;if(l!==null){var C=l.dehydrated;C!==null&&gU(C)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error($(163))}oE||E.flags&512&&il(E)}catch(F){zE(E,E.return,F)}}if(E===A){OA=null;break}if(M=E.sibling,M!==null){M.return=E.return,OA=M;break}OA=E.return}}function KD(A){for(;OA!==null;){var E=OA;if(E===A){OA=null;break}var M=E.sibling;if(M!==null){M.return=E.return,OA=M;break}OA=E.return}}function LD(A){for(;OA!==null;){var E=OA;try{switch(E.tag){case 0:case 11:case 15:var M=E.return;try{$L(4,E)}catch(L){zE(E,M,L)}break;case 1:var W=E.stateNode;if(typeof W.componentDidMount==="function"){var w=E.return;try{W.componentDidMount()}catch(L){zE(E,w,L)}}var Y=E.return;try{il(E)}catch(L){zE(E,Y,L)}break;case 5:var U=E.return;try{il(E)}catch(L){zE(E,U,L)}}}catch(L){zE(E,E.return,L)}if(E===A){OA=null;break}var K=E.sibling;if(K!==null){K.return=E.return,OA=K;break}OA=E.return}}function MM(){return(sA&6)!==0?QE():OL!==-1?OL:OL=QE()}function dW(A){if((A.mode&1)===0)return 1;if((sA&2)!==0&&nE!==0)return nE&-nE;if(Az.transition!==null)return NL===0&&(NL=vD()),NL;if(A=EE,A!==0)return A;return A=window.event,A=A===void 0?16:dD(A.type),A}function mM(A,E,M,W){if(50<PU)throw PU=0,al=null,Error($(185));if(tU(A,M,W),(sA&2)===0||A!==jE)A===jE&&((sA&2)===0&&(_L|=M),SE===4&&fW(A,nE)),DM(A,W),M===1&&sA===0&&(E.mode&1)===0&&(RY=QE()+500,rL&&tW())}function DM(A,E){var M=A.callbackNode;Mq(A,E);var W=RL(A,A===jE?nE:0);if(W===0)M!==null&&J1(M),A.callbackNode=null,A.callbackPriority=0;else if(E=W&-W,A.callbackPriority!==E){if(M!=null&&J1(M),E===1)A.tag===0?eq(GD.bind(null,A)):GI(GD.bind(null,A)),aq(function(){(sA&6)===0&&tW()}),M=null;else{switch(gD(W)){case 1:M=Y8;break;case 4:M=fD;break;case 16:M=XL;break;case 536870912:M=jD;break;default:M=XL}M=K5(M,A5.bind(null,A))}A.callbackPriority=E,A.callbackNode=M}}function A5(A,E){if(OL=-1,NL=0,(sA&6)!==0)throw Error($(327));var M=A.callbackNode;if(OY()&&A.callbackNode!==M)return null;var W=RL(A,A===jE?nE:0);if(W===0)return null;if((W&30)!==0||(W&A.expiredLanes)!==0||E)E=cL(A,W);else{E=W;var w=sA;sA|=2;var Y=M5();if(jE!==A||nE!==E)lW=null,RY=QE()+500,Qw(A,E);do try{zz();break}catch(K){E5(A,K)}while(1);J8(),gL.current=Y,sA=w,VE!==null?E=0:(jE=null,nE=0,E=SE)}if(E!==0){if(E===2&&(w=zl(A),w!==0&&(W=w,E=tl(A,w))),E===1)throw M=aU,Qw(A,0),fW(A,W),DM(A,QE()),M;if(E===6)fW(A,W);else{if(w=A.current.alternate,(W&30)===0&&!Jz(w)&&(E=cL(A,W),E===2&&(Y=zl(A),Y!==0&&(W=Y,E=tl(A,Y))),E===1))throw M=aU,Qw(A,0),fW(A,W),DM(A,QE()),M;switch(A.finishedWork=w,A.finishedLanes=W,E){case 0:case 1:throw Error($(345));case 2:Nw(A,ZM,lW);break;case 3:if(fW(A,W),(W&130023424)===W&&(E=u8+500-QE(),10<E)){if(RL(A,0)!==0)break;if(w=A.suspendedLanes,(w&W)!==W){MM(),A.pingedLanes|=A.suspendedLanes&w;break}A.timeoutHandle=kl(Nw.bind(null,A,ZM,lW),E);break}Nw(A,ZM,lW);break;case 4:if(fW(A,W),(W&4194240)===W)break;E=A.eventTimes;for(w=-1;0<W;){var U=31-nM(W);Y=1<<U,U=E[U],U>w&&(w=U),W&=~Y}if(W=w,W=QE()-W,W=(120>W?120:480>W?480:1080>W?1080:1920>W?1920:3000>W?3000:4320>W?4320:1960*Nz(W/1960))-W,10<W){A.timeoutHandle=kl(Nw.bind(null,A,ZM,lW),W);break}Nw(A,ZM,lW);break;case 5:Nw(A,ZM,lW);break;default:throw Error($(329))}}}return DM(A,QE()),A.callbackNode===M?A5.bind(null,A):null}function tl(A,E){var M=xU;return A.current.memoizedState.isDehydrated&&(Qw(A,E).flags|=256),A=cL(A,E),A!==2&&(E=ZM,ZM=M,E!==null&&$l(E)),A}function $l(A){ZM===null?ZM=A:ZM.push.apply(ZM,A)}function Jz(A){for(var E=A;;){if(E.flags&16384){var M=E.updateQueue;if(M!==null&&(M=M.stores,M!==null))for(var W=0;W<M.length;W++){var w=M[W],Y=w.getSnapshot;w=w.value;try{if(!dM(Y(),w))return!1}catch(U){return!1}}}if(M=E.child,E.subtreeFlags&16384&&M!==null)M.return=E,E=M;else{if(E===A)break;for(;E.sibling===null;){if(E.return===null||E.return===A)return!0;E=E.return}E.sibling.return=E.return,E=E.sibling}}return!0}function fW(A,E){E&=~P8,E&=~_L,A.suspendedLanes|=E,A.pingedLanes&=~E;for(A=A.expirationTimes;0<E;){var M=31-nM(E),W=1<<M;A[M]=-1,E&=~W}}function GD(A){if((sA&6)!==0)throw Error($(327));OY();var E=RL(A,0);if((E&1)===0)return DM(A,QE()),null;var M=cL(A,E);if(A.tag!==0&&M===2){var W=zl(A);W!==0&&(E=W,M=tl(A,W))}if(M===1)throw M=aU,Qw(A,0),fW(A,E),DM(A,QE()),M;if(M===6)throw Error($(345));return A.finishedWork=A.current.alternate,A.finishedLanes=E,Nw(A,ZM,lW),DM(A,QE()),null}function h8(A,E){var M=sA;sA|=1;try{return A(E)}finally{sA=M,sA===0&&(RY=QE()+500,rL&&tW())}}function yw(A){vW!==null&&vW.tag===0&&(sA&6)===0&&OY();var E=sA;sA|=1;var M=kM.transition,W=EE;try{if(kM.transition=null,EE=1,A)return A()}finally{EE=W,kM.transition=M,sA=E,(sA&6)===0&&tW()}}function f8(){NM=ZY.current,LE(ZY)}function Qw(A,E){A.finishedWork=null,A.finishedLanes=0;var M=A.timeoutHandle;if(M!==-1&&(A.timeoutHandle=-1,rq(M)),VE!==null)for(M=VE.return;M!==null;){var W=M;switch(I8(W),W.tag){case 1:W=W.type.childContextTypes,W!==null&&W!==void 0&&TL();break;case 3:QY(),LE(CM),LE(rE),B8();break;case 5:R8(W);break;case 4:QY();break;case 13:LE(DE);break;case 19:LE(DE);break;case 10:q8(W.type._context);break;case 22:case 23:f8()}M=M.return}if(jE=A,VE=A=iW(A.current,null),nE=NM=E,SE=0,aU=null,P8=_L=Hw=0,ZM=xU=null,qw!==null){for(E=0;E<qw.length;E++)if(M=qw[E],W=M.interleaved,W!==null){M.interleaved=null;var w=W.next,Y=M.pending;if(Y!==null){var U=Y.next;Y.next=w,W.next=U}M.pending=W}qw=null}return A}function E5(A,E){do{var M=VE;try{if(J8(),FL.current=vL,jL){for(var W=IE.memoizedState;W!==null;){var w=W.queue;w!==null&&(w.pending=null),W=W.next}jL=!1}if(Vw=0,fE=TE=IE=null,SU=!1,sU=0,x8.current=null,M===null||M.return===null){SE=1,aU=E,VE=null;break}A:{var Y=A,U=M.return,K=M,L=E;if(E=nE,K.flags|=32768,L!==null&&typeof L==="object"&&typeof L.then==="function"){var G=L,l=K,C=l.tag;if((l.mode&1)===0&&(C===0||C===11||C===15)){var F=l.alternate;F?(l.updateQueue=F.updateQueue,l.memoizedState=F.memoizedState,l.lanes=F.lanes):(l.updateQueue=null,l.memoizedState=null)}var I=t1(U);if(I!==null){I.flags&=-257,$1(I,U,K,Y,E),I.mode&1&&a1(Y,G,E),E=I,L=G;var J=E.updateQueue;if(J===null){var q=new Set;q.add(L),E.updateQueue=q}else J.add(L);break A}else{if((E&1)===0){a1(Y,G,E),j8();break A}L=Error($(426))}}else if(lE&&K.mode&1){var D=t1(U);if(D!==null){(D.flags&65536)===0&&(D.flags|=256),$1(D,U,K,Y,E),O8(XY(L,K));break A}}Y=L=XY(L,K),SE!==4&&(SE=2),xU===null?xU=[Y]:xU.push(Y),Y=U;do{switch(Y.tag){case 3:Y.flags|=65536,E&=-E,Y.lanes|=E;var Z=gI(Y,L,E);m1(Y,Z);break A;case 1:K=L;var{type:N,stateNode:O}=Y;if((Y.flags&128)===0&&(typeof N.getDerivedStateFromError==="function"||O!==null&&typeof O.componentDidCatch==="function"&&(mW===null||!mW.has(O)))){Y.flags|=65536,E&=-E,Y.lanes|=E;var B=pI(Y,K,E);m1(Y,B);break A}}Y=Y.return}while(Y!==null)}w5(M)}catch(T){E=T,VE===M&&M!==null&&(VE=M=M.return);continue}break}while(1)}function M5(){var A=gL.current;return gL.current=vL,A===null?vL:A}function j8(){if(SE===0||SE===3||SE===2)SE=4;jE===null||(Hw&268435455)===0&&(_L&268435455)===0||fW(jE,nE)}function cL(A,E){var M=sA;sA|=2;var W=M5();if(jE!==A||nE!==E)lW=null,Qw(A,E);do try{qz();break}catch(w){E5(A,w)}while(1);if(J8(),sA=M,gL.current=W,VE!==null)throw Error($(261));return jE=null,nE=0,SE}function qz(){for(;VE!==null;)W5(VE)}function zz(){for(;VE!==null&&!oJ();)W5(VE)}function W5(A){var E=U5(A.alternate,A,NM);A.memoizedProps=A.pendingProps,E===null?w5(A):VE=E,x8.current=null}function w5(A){var E=A;do{var M=E.alternate;if(A=E.return,(E.flags&32768)===0){if(M=Cz(M,E,NM),M!==null){VE=M;return}}else{if(M=Fz(M,E),M!==null){M.flags&=32767,VE=M;return}if(A!==null)A.flags|=32768,A.subtreeFlags=0,A.deletions=null;else{SE=6,VE=null;return}}if(E=E.sibling,E!==null){VE=E;return}VE=E=A}while(E!==null);SE===0&&(SE=5)}function Nw(A,E,M){var W=EE,w=kM.transition;try{kM.transition=null,EE=1,Qz(A,E,M,W)}finally{kM.transition=w,EE=W}return null}function Qz(A,E,M,W){do OY();while(vW!==null);if((sA&6)!==0)throw Error($(327));M=A.finishedWork;var w=A.finishedLanes;if(M===null)return null;if(A.finishedWork=null,A.finishedLanes=0,M===A.current)throw Error($(177));A.callbackNode=null,A.callbackPriority=0;var Y=M.lanes|M.childLanes;if(Wq(A,Y),A===jE&&(VE=jE=null,nE=0),(M.subtreeFlags&2064)===0&&(M.flags&2064)===0||KL||(KL=!0,K5(XL,function(){return OY(),null})),Y=(M.flags&15990)!==0,(M.subtreeFlags&15990)!==0||Y){Y=kM.transition,kM.transition=null;var U=EE;EE=1;var K=sA;sA|=4,x8.current=null,Iz(A,M),_I(M,A),mq(Tl),BL=!!yl,Tl=yl=null,A.current=M,Oz(M,A,w),rJ(),sA=K,EE=U,kM.transition=Y}else A.current=M;if(KL&&(KL=!1,vW=A,bL=w),Y=A.pendingLanes,Y===0&&(mW=null),$J(M.stateNode,W),DM(A,QE()),E!==null)for(W=A.onRecoverableError,M=0;M<E.length;M++)w=E[M],W(w.value,{componentStack:w.stack,digest:w.digest});if(pL)throw pL=!1,A=rl,rl=null,A;return(bL&1)!==0&&A.tag!==0&&OY(),Y=A.pendingLanes,(Y&1)!==0?A===al?PU++:(PU=0,al=A):PU=0,tW(),null}function OY(){if(vW!==null){var A=gD(bL),E=kM.transition,M=EE;try{if(kM.transition=null,EE=16>A?16:A,vW===null)var W=!1;else{if(A=vW,vW=null,bL=0,(sA&6)!==0)throw Error($(331));var w=sA;sA|=4;for(OA=A.current;OA!==null;){var Y=OA,U=Y.child;if((OA.flags&16)!==0){var K=Y.deletions;if(K!==null){for(var L=0;L<K.length;L++){var G=K[L];for(OA=G;OA!==null;){var l=OA;switch(l.tag){case 0:case 11:case 15:kU(8,l,Y)}var C=l.child;if(C!==null)C.return=l,OA=C;else for(;OA!==null;){l=OA;var{sibling:F,return:I}=l;if(aI(l),l===G){OA=null;break}if(F!==null){F.return=I,OA=F;break}OA=I}}}var J=Y.alternate;if(J!==null){var q=J.child;if(q!==null){J.child=null;do{var D=q.sibling;q.sibling=null,q=D}while(q!==null)}}OA=Y}}if((Y.subtreeFlags&2064)!==0&&U!==null)U.return=Y,OA=U;else A:for(;OA!==null;){if(Y=OA,(Y.flags&2048)!==0)switch(Y.tag){case 0:case 11:case 15:kU(9,Y,Y.return)}var Z=Y.sibling;if(Z!==null){Z.return=Y.return,OA=Z;break A}OA=Y.return}}var N=A.current;for(OA=N;OA!==null;){U=OA;var O=U.child;if((U.subtreeFlags&2064)!==0&&O!==null)O.return=U,OA=O;else A:for(U=N;OA!==null;){if(K=OA,(K.flags&2048)!==0)try{switch(K.tag){case 0:case 11:case 15:$L(9,K)}}catch(T){zE(K,K.return,T)}if(K===U){OA=null;break A}var B=K.sibling;if(B!==null){B.return=K.return,OA=B;break A}OA=K.return}}if(sA=w,tW(),MW&&typeof MW.onPostCommitFiberRoot==="function")try{MW.onPostCommitFiberRoot(mL,A)}catch(T){}W=!0}return W}finally{EE=M,kM.transition=E}}return!1}function ZD(A,E,M){E=XY(M,E),E=gI(A,E,1),A=nW(A,E,1),E=MM(),A!==null&&(tU(A,1,E),DM(A,E))}function zE(A,E,M){if(A.tag===3)ZD(A,A,M);else for(;E!==null;){if(E.tag===3){ZD(E,A,M);break}else if(E.tag===1){var W=E.stateNode;if(typeof E.type.getDerivedStateFromError==="function"||typeof W.componentDidCatch==="function"&&(mW===null||!mW.has(W))){A=XY(M,A),A=pI(E,A,1),E=nW(E,A,1),A=MM(),E!==null&&(tU(E,1,A),DM(E,A));break}}E=E.return}}function Xz(A,E,M){var W=A.pingCache;W!==null&&W.delete(E),E=MM(),A.pingedLanes|=A.suspendedLanes&M,jE===A&&(nE&M)===M&&(SE===4||SE===3&&(nE&130023424)===nE&&500>QE()-u8?Qw(A,0):P8|=M),DM(A,E)}function Y5(A,E){E===0&&((A.mode&1)===0?E=1:(E=$K,$K<<=1,($K&130023424)===0&&($K=4194304)));var M=MM();A=JW(A,E),A!==null&&(tU(A,E,M),DM(A,M))}function Rz(A){var E=A.memoizedState,M=0;E!==null&&(M=E.retryLane),Y5(A,M)}function Bz(A,E){var M=0;switch(A.tag){case 13:var{stateNode:W,memoizedState:w}=A;w!==null&&(M=w.retryLane);break;case 19:W=A.stateNode;break;default:throw Error($(314))}W!==null&&W.delete(E),Y5(A,M)}function K5(A,E){return hD(A,E)}function Vz(A,E,M,W){this.tag=A,this.key=M,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=E,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=W,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function SM(A,E,M,W){return new Vz(A,E,M,W)}function v8(A){return A=A.prototype,!(!A||!A.isReactComponent)}function Hz(A){if(typeof A==="function")return v8(A)?1:0;if(A!==void 0&&A!==null){if(A=A.$$typeof,A===M8)return 11;if(A===W8)return 14}return 2}function iW(A,E){var M=A.alternate;return M===null?(M=SM(A.tag,E,A.key,A.mode),M.elementType=A.elementType,M.type=A.type,M.stateNode=A.stateNode,M.alternate=A,A.alternate=M):(M.pendingProps=E,M.type=A.type,M.flags=0,M.subtreeFlags=0,M.deletions=null),M.flags=A.flags&14680064,M.childLanes=A.childLanes,M.lanes=A.lanes,M.child=A.child,M.memoizedProps=A.memoizedProps,M.memoizedState=A.memoizedState,M.updateQueue=A.updateQueue,E=A.dependencies,M.dependencies=E===null?null:{lanes:E.lanes,firstContext:E.firstContext},M.sibling=A.sibling,M.index=A.index,M.ref=A.ref,M}function JL(A,E,M,W,w,Y){var U=2;if(W=A,typeof A==="function")v8(A)&&(U=1);else if(typeof A==="string")U=5;else A:switch(A){case AY:return Xw(M.children,w,Y,E);case E8:U=8,w|=8;break;case Yl:return A=SM(12,M,E,w|2),A.elementType=Yl,A.lanes=Y,A;case Ul:return A=SM(13,M,E,w),A.elementType=Ul,A.lanes=Y,A;case Kl:return A=SM(19,M,E,w),A.elementType=Kl,A.lanes=Y,A;case ND:return eL(M,w,Y,E);default:if(typeof A==="object"&&A!==null)switch(A.$$typeof){case ID:U=10;break A;case OD:U=9;break A;case M8:U=11;break A;case W8:U=14;break A;case PW:U=16,W=null;break A}throw Error($(130,A==null?A:typeof A,""))}return E=SM(U,M,E,w),E.elementType=A,E.type=W,E.lanes=Y,E}function Xw(A,E,M,W){return A=SM(7,A,W,E),A.lanes=M,A}function eL(A,E,M,W){return A=SM(22,A,W,E),A.elementType=ND,A.lanes=M,A.stateNode={isHidden:!1},A}function Ml(A,E,M){return A=SM(6,A,null,E),A.lanes=M,A}function Wl(A,E,M){return E=SM(4,A.children!==null?A.children:[],A.key,E),E.lanes=M,E.stateNode={containerInfo:A.containerInfo,pendingChildren:null,implementation:A.implementation},E}function yz(A,E,M,W,w){this.tag=E,this.containerInfo=A,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=cZ(0),this.expirationTimes=cZ(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cZ(0),this.identifierPrefix=W,this.onRecoverableError=w,this.mutableSourceEagerHydrationData=null}function g8(A,E,M,W,w,Y,U,K,L){return A=new yz(A,E,M,K,L),E===1?(E=1,Y===!0&&(E|=8)):E=0,Y=SM(3,null,null,E),A.current=Y,Y.stateNode=A,Y.memoizedState={element:W,isDehydrated:M,cache:null,transitions:null,pendingSuspenseBoundaries:null},Q8(Y),A}function Tz(A,E,M){var W=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ew,key:W==null?null:""+W,children:A,containerInfo:E,implementation:M}}function L5(A){if(!A)return oW;A=A._reactInternals;A:{if(Sw(A)!==A||A.tag!==1)throw Error($(170));var E=A;do{switch(E.tag){case 3:E=E.stateNode.context;break A;case 1:if(FM(E.type)){E=E.stateNode.__reactInternalMemoizedMergedChildContext;break A}}E=E.return}while(E!==null);throw Error($(171))}if(A.tag===1){var M=A.type;if(FM(M))return LI(A,M,E)}return E}function G5(A,E,M,W,w,Y,U,K,L){return A=g8(M,W,!0,A,w,Y,U,K,L),A.context=L5(null),M=A.current,W=MM(),w=dW(M),Y=IW(W,w),Y.callback=E!==void 0&&E!==null?E:null,nW(M,Y,w),A.current.lanes=w,tU(A,w,W),DM(A,W),A}function AG(A,E,M,W){var w=E.current,Y=MM(),U=dW(w);return M=L5(M),E.context===null?E.context=M:E.pendingContext=M,E=IW(Y,U),E.payload={element:A},W=W===void 0?null:W,W!==null&&(E.callback=W),A=nW(w,E,U),A!==null&&(mM(A,w,U,Y),CL(A,w,U)),U}function nL(A){if(A=A.current,!A.child)return null;switch(A.child.tag){case 5:return A.child.stateNode;default:return A.child.stateNode}}function lD(A,E){if(A=A.memoizedState,A!==null&&A.dehydrated!==null){var M=A.retryLane;A.retryLane=M!==0&&M<E?M:E}}function p8(A,E){lD(A,E),(A=A.alternate)&&lD(A,E)}function Sz(){return null}function b8(A){this._internalRoot=A}function EG(A){this._internalRoot=A}function c8(A){return!(!A||A.nodeType!==1&&A.nodeType!==9&&A.nodeType!==11)}function MG(A){return!(!A||A.nodeType!==1&&A.nodeType!==9&&A.nodeType!==11&&(A.nodeType!==8||A.nodeValue!==" react-mount-point-unstable "))}function CD(){}function kz(A,E,M,W,w){if(w){if(typeof W==="function"){var Y=W;W=function(){var G=nL(U);Y.call(G)}}var U=G5(E,W,A,0,null,!1,!1,"",CD);return A._reactRootContainer=U,A[NW]=U.current,cU(A.nodeType===8?A.parentNode:A),yw(),U}for(;w=A.lastChild;)A.removeChild(w);if(typeof W==="function"){var K=W;W=function(){var G=nL(L);K.call(G)}}var L=g8(A,0,!1,null,null,!1,!1,"",CD);return A._reactRootContainer=L,A[NW]=L.current,cU(A.nodeType===8?A.parentNode:A),yw(function(){AG(E,L,M,W)}),L}function WG(A,E,M,W,w){var Y=M._reactRootContainer;if(Y){var U=Y;if(typeof w==="function"){var K=w;w=function(){var L=nL(U);K.call(L)}}AG(E,U,A,w)}else U=kz(M,E,A,w,W);return nL(U)}var FD,CE,DD,uU,OW,wl,uJ,G1,Z1,mE,_l,zW,oK,ew,AY,E8,Yl,ID,OD,M8,Ul,Kl,W8,PW,ND,l1,OE,vZ,gZ=!1,NU,aK,RD,BU,bJ,cJ,Ol=null,Nl=null,CY=null,FY=null,bZ=!1,Jl=!1,Iw,VU=!1,zL=null,QL=!1,ql=null,mJ,hD,J1,oJ,rJ,QE,aJ,Y8,fD,XL,tJ,jD,mL=null,MW=null,nM,_J,eJ,tK=64,$K=4194304,EE=0,pD,K8,bD,cD,nD,Ql=!1,_K,gW=null,pW=null,bW=null,jU,vU,hW,wq,DY,BL=!0,VL=null,jW=null,G8=null,GL=null,BY,Z8,$U,Gq,nZ,mZ,CU,dL,X1,Zq,lq,Cq,dZ,Fq,Dq,Iq,Oq,Nq,R1,Jq,qq,zq,Xq,Rq,Bq,B1,Vq,Hq,yq,Tq,Sq,kq,xq,C8,HU=null,Pq,sD,V1,H1=!1,EY=!1,fq,yU=null,pU=null,tD=!1,qU,zU,lL,dM,dq,MY=null,Rl=null,TU=null,Bl=!1,WY,iZ,AI,EI,MI,WI,wI,YI,P1,XU,Vl,Hl,QU,RU,iq,EL,sq,oq,yl=null,Tl=null,kl,rq,j1,aq,VY,EW,mU,NW,xl,$q,_q,Pl,YY=-1,oW,rE,CM,Rw,CW=null,rL=!1,aZ=!1,UY,KY=0,kL=null,xL=0,yM,TM=0,Bw=null,FW=1,DW="",qM=null,JM=null,lE=!1,cM=null,Az,zY,DI,PL,uL=null,LY=null,N8=null,qw=null,uW=!1,eU,WW,dU,iU,DE,tZ,FL,$Z,Vw=0,IE=null,TE=null,fE=null,jL=!1,SU=!1,sU=0,Ez=0,vL,Yz,Uz,Kz,tL,Lz,Gz,lM=!1,cl,sI,ml,oI,rI,UL=!1,oE=!1,Dz,OA=null,WD=!1,cE=null,bM=!1,Nz,gL,x8,kM,sA=0,jE=null,VE=null,nE=0,NM=0,ZY,SE=0,aU=null,Hw=0,_L=0,P8=0,xU=null,ZM=null,u8=0,RY=1/0,lW=null,pL=!1,rl=null,mW=null,KL=!1,vW=null,bL=0,PU=0,al=null,OL=-1,NL=0,U5,Z5,xz,IU,Pz,_w,l5,C5=function(A,E){var M=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!c8(E))throw Error($(200));return Tz(A,E,null,M)},F5=function(A,E){if(!c8(A))throw Error($(299));var M=!1,W="",w=Z5;return E!==null&&E!==void 0&&(E.unstable_strictMode===!0&&(M=!0),E.identifierPrefix!==void 0&&(W=E.identifierPrefix),E.onRecoverableError!==void 0&&(w=E.onRecoverableError)),E=g8(A,1,!1,null,null,M,!1,W,w),A[NW]=E.current,cU(A.nodeType===8?A.parentNode:A),new b8(E)},D5=function(A){if(A==null)return null;if(A.nodeType===1)return A;var E=A._reactInternals;if(E===void 0){if(typeof A.render==="function")throw Error($(188));throw A=Object.keys(A).join(","),Error($(268,A))}return A=PD(E),A=A===null?null:A.stateNode,A},I5=function(A){return yw(A)},O5=function(A,E,M){if(!MG(E))throw Error($(200));return WG(null,A,E,!0,M)},N5=function(A,E,M){if(!c8(A))throw Error($(405));var W=M!=null&&M.hydratedSources||null,w=!1,Y="",U=Z5;if(M!==null&&M!==void 0&&(M.unstable_strictMode===!0&&(w=!0),M.identifierPrefix!==void 0&&(Y=M.identifierPrefix),M.onRecoverableError!==void 0&&(U=M.onRecoverableError)),E=G5(E,null,A,1,M!=null?M:null,w,!1,Y,U),A[NW]=E.current,cU(A),W)for(A=0;A<W.length;A++)M=W[A],w=M._getVersion,w=w(M._source),E.mutableSourceEagerHydrationData==null?E.mutableSourceEagerHydrationData=[M,w]:E.mutableSourceEagerHydrationData.push(M,w);return new EG(E)},J5=function(A,E,M){if(!MG(E))throw Error($(200));return WG(null,A,E,!1,M)},q5=function(A){if(!MG(A))throw Error($(40));return A._reactRootContainer?(yw(function(){WG(null,null,A,!1,function(){A._reactRootContainer=null,A[NW]=null})}),!0):!1},z5,Q5=function(A,E,M,W){if(!MG(M))throw Error($(200));if(A==null||A._reactInternals===void 0)throw Error($(38));return WG(A,E,M,!1,W)},X5="18.3.1-next-f1338f8080-20240426";var R5=D4(()=>{FD=ZW(Fw(),1),CE=ZW(L1(),1);DD=new Set,uU={};OW=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wl=Object.prototype.hasOwnProperty,uJ=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,G1={},Z1={};mE={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(A){mE[A]=new WM(A,0,!1,A,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(A){var E=A[0];mE[E]=new WM(E,1,!1,A[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(A){mE[A]=new WM(A,2,!1,A.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(A){mE[A]=new WM(A,2,!1,A,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(A){mE[A]=new WM(A,3,!1,A.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(A){mE[A]=new WM(A,3,!0,A,null,!1,!1)});["capture","download"].forEach(function(A){mE[A]=new WM(A,4,!1,A,null,!1,!1)});["cols","rows","size","span"].forEach(function(A){mE[A]=new WM(A,6,!1,A,null,!1,!1)});["rowSpan","start"].forEach(function(A){mE[A]=new WM(A,5,!1,A.toLowerCase(),null,!1,!1)});_l=/[\-:]([a-z])/g;"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(A){var E=A.replace(_l,el);mE[E]=new WM(E,1,!1,A,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(A){var E=A.replace(_l,el);mE[E]=new WM(E,1,!1,A,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(A){var E=A.replace(_l,el);mE[E]=new WM(E,1,!1,A,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(A){mE[A]=new WM(A,1,!1,A.toLowerCase(),null,!1,!1)});mE.xlinkHref=new WM("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(A){mE[A]=new WM(A,1,!1,A.toLowerCase(),null,!0,!0)});zW=FD.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,oK=Symbol.for("react.element"),ew=Symbol.for("react.portal"),AY=Symbol.for("react.fragment"),E8=Symbol.for("react.strict_mode"),Yl=Symbol.for("react.profiler"),ID=Symbol.for("react.provider"),OD=Symbol.for("react.context"),M8=Symbol.for("react.forward_ref"),Ul=Symbol.for("react.suspense"),Kl=Symbol.for("react.suspense_list"),W8=Symbol.for("react.memo"),PW=Symbol.for("react.lazy"),ND=Symbol.for("react.offscreen"),l1=Symbol.iterator;OE=Object.assign;NU=Array.isArray;RD=function(A){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(E,M,W,w){MSApp.execUnsafeLocalFunction(function(){return A(E,M,W,w)})}:A}(function(A,E){if(A.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in A)A.innerHTML=E;else{aK=aK||document.createElement("div"),aK.innerHTML="<svg>"+E.valueOf().toString()+"</svg>";for(E=aK.firstChild;A.firstChild;)A.removeChild(A.firstChild);for(;E.firstChild;)A.appendChild(E.firstChild)}});BU={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},bJ=["Webkit","ms","Moz","O"];Object.keys(BU).forEach(function(A){bJ.forEach(function(E){E=E+A.charAt(0).toUpperCase()+A.substring(1),BU[E]=BU[A]})});cJ=OE({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});if(OW)try{Iw={},Object.defineProperty(Iw,"passive",{get:function(){Jl=!0}}),window.addEventListener("test",Iw,Iw),window.removeEventListener("test",Iw,Iw)}catch(A){Jl=!1}mJ={onError:function(A){VU=!0,zL=A}};hD=CE.unstable_scheduleCallback,J1=CE.unstable_cancelCallback,oJ=CE.unstable_shouldYield,rJ=CE.unstable_requestPaint,QE=CE.unstable_now,aJ=CE.unstable_getCurrentPriorityLevel,Y8=CE.unstable_ImmediatePriority,fD=CE.unstable_UserBlockingPriority,XL=CE.unstable_NormalPriority,tJ=CE.unstable_LowPriority,jD=CE.unstable_IdlePriority;nM=Math.clz32?Math.clz32:Aq,_J=Math.log,eJ=Math.LN2;_K=[],jU=new Map,vU=new Map,hW=[],wq="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");DY=zW.ReactCurrentBatchConfig;BY={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(A){return A.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Z8=zM(BY),$U=OE({},BY,{view:0,detail:0}),Gq=zM($U),dL=OE({},$U,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:l8,button:0,buttons:0,relatedTarget:function(A){return A.relatedTarget===void 0?A.fromElement===A.srcElement?A.toElement:A.fromElement:A.relatedTarget},movementX:function(A){if("movementX"in A)return A.movementX;return A!==CU&&(CU&&A.type==="mousemove"?(nZ=A.screenX-CU.screenX,mZ=A.screenY-CU.screenY):mZ=nZ=0,CU=A),nZ},movementY:function(A){return"movementY"in A?A.movementY:mZ}}),X1=zM(dL),Zq=OE({},dL,{dataTransfer:0}),lq=zM(Zq),Cq=OE({},$U,{relatedTarget:0}),dZ=zM(Cq),Fq=OE({},BY,{animationName:0,elapsedTime:0,pseudoElement:0}),Dq=zM(Fq),Iq=OE({},BY,{clipboardData:function(A){return"clipboardData"in A?A.clipboardData:window.clipboardData}}),Oq=zM(Iq),Nq=OE({},BY,{data:0}),R1=zM(Nq),Jq={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qq={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zq={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};Xq=OE({},$U,{key:function(A){if(A.key){var E=Jq[A.key]||A.key;if(E!=="Unidentified")return E}return A.type==="keypress"?(A=ZL(A),A===13?"Enter":String.fromCharCode(A)):A.type==="keydown"||A.type==="keyup"?qq[A.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:l8,charCode:function(A){return A.type==="keypress"?ZL(A):0},keyCode:function(A){return A.type==="keydown"||A.type==="keyup"?A.keyCode:0},which:function(A){return A.type==="keypress"?ZL(A):A.type==="keydown"||A.type==="keyup"?A.keyCode:0}}),Rq=zM(Xq),Bq=OE({},dL,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),B1=zM(Bq),Vq=OE({},$U,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:l8}),Hq=zM(Vq),yq=OE({},BY,{propertyName:0,elapsedTime:0,pseudoElement:0}),Tq=zM(yq),Sq=OE({},dL,{deltaX:function(A){return"deltaX"in A?A.deltaX:("wheelDeltaX"in A)?-A.wheelDeltaX:0},deltaY:function(A){return"deltaY"in A?A.deltaY:("wheelDeltaY"in A)?-A.wheelDeltaY:("wheelDelta"in A)?-A.wheelDelta:0},deltaZ:0,deltaMode:0}),kq=zM(Sq),xq=[9,13,27,32],C8=OW&&"CompositionEvent"in window;OW&&"documentMode"in document&&(HU=document.documentMode);Pq=OW&&"TextEvent"in window&&!HU,sD=OW&&(!C8||HU&&8<HU&&11>=HU),V1=String.fromCharCode(32);fq={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};if(OW){if(OW){if(zU="oninput"in document,!zU)lL=document.createElement("div"),lL.setAttribute("oninput","return;"),zU=typeof lL.oninput==="function";qU=zU}else qU=!1;tD=qU&&(!document.documentMode||9<document.documentMode)}dM=typeof Object.is==="function"?Object.is:nq;dq=OW&&"documentMode"in document&&11>=document.documentMode;WY={animationend:AL("Animation","AnimationEnd"),animationiteration:AL("Animation","AnimationIteration"),animationstart:AL("Animation","AnimationStart"),transitionend:AL("Transition","TransitionEnd")},iZ={},AI={};OW&&(AI=document.createElement("div").style,("AnimationEvent"in window)||(delete WY.animationend.animation,delete WY.animationiteration.animation,delete WY.animationstart.animation),("TransitionEvent"in window)||delete WY.transitionend.transition);EI=sL("animationend"),MI=sL("animationiteration"),WI=sL("animationstart"),wI=sL("transitionend"),YI=new Map,P1="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");for(QU=0;QU<P1.length;QU++)XU=P1[QU],Vl=XU.toLowerCase(),Hl=XU[0].toUpperCase()+XU.slice(1),rW(Vl,"on"+Hl);rW(EI,"onAnimationEnd");rW(MI,"onAnimationIteration");rW(WI,"onAnimationStart");rW("dblclick","onDoubleClick");rW("focusin","onFocus");rW("focusout","onBlur");rW(wI,"onTransitionEnd");NY("onMouseEnter",["mouseout","mouseover"]);NY("onMouseLeave",["mouseout","mouseover"]);NY("onPointerEnter",["pointerout","pointerover"]);NY("onPointerLeave",["pointerout","pointerover"]);Tw("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Tw("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Tw("onBeforeInput",["compositionend","keypress","textInput","paste"]);Tw("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Tw("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Tw("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));RU="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),iq=new Set("cancel close invalid load scroll toggle".split(" ").concat(RU));EL="_reactListening"+Math.random().toString(36).slice(2);sq=/\r\n?/g,oq=/\u0000|\uFFFD/g;kl=typeof setTimeout==="function"?setTimeout:void 0,rq=typeof clearTimeout==="function"?clearTimeout:void 0,j1=typeof Promise==="function"?Promise:void 0,aq=typeof queueMicrotask==="function"?queueMicrotask:typeof j1<"u"?function(A){return j1.resolve(null).then(A).catch(tq)}:kl;VY=Math.random().toString(36).slice(2),EW="__reactFiber$"+VY,mU="__reactProps$"+VY,NW="__reactContainer$"+VY,xl="__reactEvents$"+VY,$q="__reactListeners$"+VY,_q="__reactHandles$"+VY;Pl=[];oW={},rE=aW(oW),CM=aW(!1),Rw=oW;UY=[],yM=[];Az=zW.ReactCurrentBatchConfig;zY=FI(!0),DI=FI(!1),PL=aW(null);eU={},WW=aW(eU),dU=aW(eU),iU=aW(eU);DE=aW(0);tZ=[];FL=zW.ReactCurrentDispatcher,$Z=zW.ReactCurrentBatchConfig;vL={readContext:xM,useCallback:iE,useContext:iE,useEffect:iE,useImperativeHandle:iE,useInsertionEffect:iE,useLayoutEffect:iE,useMemo:iE,useReducer:iE,useRef:iE,useState:iE,useDebugValue:iE,useDeferredValue:iE,useTransition:iE,useMutableSource:iE,useSyncExternalStore:iE,useId:iE,unstable_isNewReconciler:!1},Yz={readContext:xM,useCallback:function(A,E){return AW().memoizedState=[A,E===void 0?null:E],A},useContext:xM,useEffect:s1,useImperativeHandle:function(A,E,M){return M=M!==null&&M!==void 0?M.concat([A]):null,DL(4194308,4,TI.bind(null,E,A),M)},useLayoutEffect:function(A,E){return DL(4194308,4,A,E)},useInsertionEffect:function(A,E){return DL(4,2,A,E)},useMemo:function(A,E){var M=AW();return E=E===void 0?null:E,A=A(),M.memoizedState=[A,E],A},useReducer:function(A,E,M){var W=AW();return E=M!==void 0?M(E):E,W.memoizedState=W.baseState=E,A={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:A,lastRenderedState:E},W.queue=A,A=A.dispatch=Wz.bind(null,IE,A),[W.memoizedState,A]},useRef:function(A){var E=AW();return A={current:A},E.memoizedState=A},useState:i1,useDebugValue:S8,useDeferredValue:function(A){return AW().memoizedState=A},useTransition:function(){var A=i1(!1),E=A[0];return A=Mz.bind(null,A[1]),AW().memoizedState=A,[E,A]},useMutableSource:function(){},useSyncExternalStore:function(A,E,M){var W=IE,w=AW();if(lE){if(M===void 0)throw Error($(407));M=M()}else{if(M=E(),jE===null)throw Error($(349));(Vw&30)!==0||zI(W,E,M)}w.memoizedState=M;var Y={value:M,getSnapshot:E};return w.queue=Y,s1(XI.bind(null,W,Y,A),[A]),W.flags|=2048,rU(9,QI.bind(null,W,Y,M,E),void 0,null),M},useId:function(){var A=AW(),E=jE.identifierPrefix;if(lE){var M=DW,W=FW;M=(W&~(1<<32-nM(W)-1)).toString(32)+M,E=":"+E+"R"+M,M=sU++,0<M&&(E+="H"+M.toString(32)),E+=":"}else M=Ez++,E=":"+E+"r"+M.toString(32)+":";return A.memoizedState=E},unstable_isNewReconciler:!1},Uz={readContext:xM,useCallback:kI,useContext:xM,useEffect:T8,useImperativeHandle:SI,useInsertionEffect:HI,useLayoutEffect:yI,useMemo:xI,useReducer:_Z,useRef:VI,useState:function(){return _Z(oU)},useDebugValue:S8,useDeferredValue:function(A){var E=PM();return PI(E,TE.memoizedState,A)},useTransition:function(){var A=_Z(oU)[0],E=PM().memoizedState;return[A,E]},useMutableSource:JI,useSyncExternalStore:qI,useId:uI,unstable_isNewReconciler:!1},Kz={readContext:xM,useCallback:kI,useContext:xM,useEffect:T8,useImperativeHandle:SI,useInsertionEffect:HI,useLayoutEffect:yI,useMemo:xI,useReducer:eZ,useRef:VI,useState:function(){return eZ(oU)},useDebugValue:S8,useDeferredValue:function(A){var E=PM();return TE===null?E.memoizedState=A:PI(E,TE.memoizedState,A)},useTransition:function(){var A=eZ(oU)[0],E=PM().memoizedState;return[A,E]},useMutableSource:JI,useSyncExternalStore:qI,useId:uI,unstable_isNewReconciler:!1};tL={isMounted:function(A){return(A=A._reactInternals)?Sw(A)===A:!1},enqueueSetState:function(A,E,M){A=A._reactInternals;var W=MM(),w=dW(A),Y=IW(W,w);Y.payload=E,M!==void 0&&M!==null&&(Y.callback=M),E=nW(A,Y,w),E!==null&&(mM(E,A,w,W),CL(E,A,w))},enqueueReplaceState:function(A,E,M){A=A._reactInternals;var W=MM(),w=dW(A),Y=IW(W,w);Y.tag=1,Y.payload=E,M!==void 0&&M!==null&&(Y.callback=M),E=nW(A,Y,w),E!==null&&(mM(E,A,w,W),CL(E,A,w))},enqueueForceUpdate:function(A,E){A=A._reactInternals;var M=MM(),W=dW(A),w=IW(M,W);w.tag=2,E!==void 0&&E!==null&&(w.callback=E),E=nW(A,w,W),E!==null&&(mM(E,A,W,M),CL(E,A,W))}};Lz=typeof WeakMap==="function"?WeakMap:Map;Gz=zW.ReactCurrentOwner;cl={dehydrated:null,treeContext:null,retryLane:0};sI=function(A,E){for(var M=E.child;M!==null;){if(M.tag===5||M.tag===6)A.appendChild(M.stateNode);else if(M.tag!==4&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===E)break;for(;M.sibling===null;){if(M.return===null||M.return===E)return;M=M.return}M.sibling.return=M.return,M=M.sibling}};ml=function(){};oI=function(A,E,M,W){var w=A.memoizedProps;if(w!==W){A=E.stateNode,zw(WW.current);var Y=null;switch(M){case"input":w=Gl(A,w),W=Gl(A,W),Y=[];break;case"select":w=OE({},w,{value:void 0}),W=OE({},W,{value:void 0}),Y=[];break;case"textarea":w=Cl(A,w),W=Cl(A,W),Y=[];break;default:typeof w.onClick!=="function"&&typeof W.onClick==="function"&&(A.onclick=yL)}Dl(M,W);var U;M=null;for(G in w)if(!W.hasOwnProperty(G)&&w.hasOwnProperty(G)&&w[G]!=null)if(G==="style"){var K=w[G];for(U in K)K.hasOwnProperty(U)&&(M||(M={}),M[U]="")}else G!=="dangerouslySetInnerHTML"&&G!=="children"&&G!=="suppressContentEditableWarning"&&G!=="suppressHydrationWarning"&&G!=="autoFocus"&&(uU.hasOwnProperty(G)?Y||(Y=[]):(Y=Y||[]).push(G,null));for(G in W){var L=W[G];if(K=w!=null?w[G]:void 0,W.hasOwnProperty(G)&&L!==K&&(L!=null||K!=null))if(G==="style")if(K){for(U in K)!K.hasOwnProperty(U)||L&&L.hasOwnProperty(U)||(M||(M={}),M[U]="");for(U in L)L.hasOwnProperty(U)&&K[U]!==L[U]&&(M||(M={}),M[U]=L[U])}else M||(Y||(Y=[]),Y.push(G,M)),M=L;else G==="dangerouslySetInnerHTML"?(L=L?L.__html:void 0,K=K?K.__html:void 0,L!=null&&K!==L&&(Y=Y||[]).push(G,L)):G==="children"?typeof L!=="string"&&typeof L!=="number"||(Y=Y||[]).push(G,""+L):G!=="suppressContentEditableWarning"&&G!=="suppressHydrationWarning"&&(uU.hasOwnProperty(G)?(L!=null&&G==="onScroll"&&KE("scroll",A),Y||K===L||(Y=[])):(Y=Y||[]).push(G,L))}M&&(Y=Y||[]).push("style",M);var G=Y;if(E.updateQueue=G)E.flags|=4}};rI=function(A,E,M,W){M!==W&&(E.flags|=4)};Dz=typeof WeakSet==="function"?WeakSet:Set;Nz=Math.ceil,gL=zW.ReactCurrentDispatcher,x8=zW.ReactCurrentOwner,kM=zW.ReactCurrentBatchConfig,ZY=aW(0);U5=function(A,E,M){if(A!==null)if(A.memoizedProps!==E.pendingProps||CM.current)lM=!0;else{if((A.lanes&M)===0&&(E.flags&128)===0)return lM=!1,lz(A,E,M);lM=(A.flags&131072)!==0?!0:!1}else lM=!1,lE&&(E.flags&1048576)!==0&&ZI(E,xL,E.index);switch(E.lanes=0,E.tag){case 2:var W=E.type;IL(A,E),A=E.pendingProps;var w=JY(E,rE.current);IY(E,M),w=H8(null,E,W,A,w,M);var Y=y8();return E.flags|=1,typeof w==="object"&&w!==null&&typeof w.render==="function"&&w.$$typeof===void 0?(E.tag=1,E.memoizedState=null,E.updateQueue=null,FM(W)?(Y=!0,SL(E)):Y=!1,E.memoizedState=w.state!==null&&w.state!==void 0?w.state:null,Q8(E),w.updater=tL,E.stateNode=w,w._reactInternals=E,vl(E,W,A,M),E=bl(null,E,W,!0,Y,M)):(E.tag=0,lE&&Y&&D8(E),EM(null,E,w,M),E=E.child),E;case 16:W=E.elementType;A:{switch(IL(A,E),A=E.pendingProps,w=W._init,W=w(W._payload),E.type=W,w=E.tag=Hz(W),A=pM(W,A),w){case 0:E=pl(null,E,W,A,M);break A;case 1:E=AD(null,E,W,A,M);break A;case 11:E=_1(null,E,W,A,M);break A;case 14:E=e1(null,E,W,pM(W.type,A),M);break A}throw Error($(306,W,""))}return E;case 0:return W=E.type,w=E.pendingProps,w=E.elementType===W?w:pM(W,w),pl(A,E,W,w,M);case 1:return W=E.type,w=E.pendingProps,w=E.elementType===W?w:pM(W,w),AD(A,E,W,w,M);case 3:A:{if(mI(E),A===null)throw Error($(387));W=E.pendingProps,Y=E.memoizedState,w=Y.element,OI(A,E),hL(E,W,null,M);var U=E.memoizedState;if(W=U.element,Y.isDehydrated)if(Y={element:W,isDehydrated:!1,cache:U.cache,pendingSuspenseBoundaries:U.pendingSuspenseBoundaries,transitions:U.transitions},E.updateQueue.baseState=Y,E.memoizedState=Y,E.flags&256){w=XY(Error($(423)),E),E=ED(A,E,W,M,w);break A}else if(W!==w){w=XY(Error($(424)),E),E=ED(A,E,W,M,w);break A}else for(JM=cW(E.stateNode.containerInfo.firstChild),qM=E,lE=!0,cM=null,M=DI(E,null,W,M),E.child=M;M;)M.flags=M.flags&-3|4096,M=M.sibling;else{if(qY(),W===w){E=qW(A,E,M);break A}EM(A,E,W,M)}E=E.child}return E;case 5:return NI(E),A===null&&hl(E),W=E.type,w=E.pendingProps,Y=A!==null?A.memoizedProps:null,U=w.children,Sl(W,w)?U=null:Y!==null&&Sl(W,Y)&&(E.flags|=32),nI(A,E),EM(A,E,U,M),E.child;case 6:return A===null&&hl(E),null;case 13:return dI(A,E,M);case 4:return X8(E,E.stateNode.containerInfo),W=E.pendingProps,A===null?E.child=zY(E,null,W,M):EM(A,E,W,M),E.child;case 11:return W=E.type,w=E.pendingProps,w=E.elementType===W?w:pM(W,w),_1(A,E,W,w,M);case 7:return EM(A,E,E.pendingProps,M),E.child;case 8:return EM(A,E,E.pendingProps.children,M),E.child;case 12:return EM(A,E,E.pendingProps.children,M),E.child;case 10:A:{if(W=E.type._context,w=E.pendingProps,Y=E.memoizedProps,U=w.value,wE(PL,W._currentValue),W._currentValue=U,Y!==null)if(dM(Y.value,U)){if(Y.children===w.children&&!CM.current){E=qW(A,E,M);break A}}else for(Y=E.child,Y!==null&&(Y.return=E);Y!==null;){var K=Y.dependencies;if(K!==null){U=Y.child;for(var L=K.firstContext;L!==null;){if(L.context===W){if(Y.tag===1){L=IW(-1,M&-M),L.tag=2;var G=Y.updateQueue;if(G!==null){G=G.shared;var l=G.pending;l===null?L.next=L:(L.next=l.next,l.next=L),G.pending=L}}Y.lanes|=M,L=Y.alternate,L!==null&&(L.lanes|=M),fl(Y.return,M,E),K.lanes|=M;break}L=L.next}}else if(Y.tag===10)U=Y.type===E.type?null:Y.child;else if(Y.tag===18){if(U=Y.return,U===null)throw Error($(341));U.lanes|=M,K=U.alternate,K!==null&&(K.lanes|=M),fl(U,M,E),U=Y.sibling}else U=Y.child;if(U!==null)U.return=Y;else for(U=Y;U!==null;){if(U===E){U=null;break}if(Y=U.sibling,Y!==null){Y.return=U.return,U=Y;break}U=U.return}Y=U}EM(A,E,w.children,M),E=E.child}return E;case 9:return w=E.type,W=E.pendingProps.children,IY(E,M),w=xM(w),W=W(w),E.flags|=1,EM(A,E,W,M),E.child;case 14:return W=E.type,w=pM(W,E.pendingProps),w=pM(W.type,w),e1(A,E,W,w,M);case 15:return bI(A,E,E.type,E.pendingProps,M);case 17:return W=E.type,w=E.pendingProps,w=E.elementType===W?w:pM(W,w),IL(A,E),E.tag=1,FM(W)?(A=!0,SL(E)):A=!1,IY(E,M),vI(E,W,w),vl(E,W,w,M),bl(null,E,W,!0,A,M);case 19:return iI(A,E,M);case 22:return cI(A,E,M)}throw Error($(156,E.tag))};Z5=typeof reportError==="function"?reportError:function(A){console.error(A)};EG.prototype.render=b8.prototype.render=function(A){var E=this._internalRoot;if(E===null)throw Error($(409));AG(A,E,null,null)};EG.prototype.unmount=b8.prototype.unmount=function(){var A=this._internalRoot;if(A!==null){this._internalRoot=null;var E=A.containerInfo;yw(function(){AG(null,A,null,null)}),E[NW]=null}};EG.prototype.unstable_scheduleHydration=function(A){if(A){var E=cD();A={blockedOn:null,target:A,priority:E};for(var M=0;M<hW.length&&E!==0&&E<hW[M].priority;M++);hW.splice(M,0,A),M===0&&mD(A)}};pD=function(A){switch(A.tag){case 3:var E=A.stateNode;if(E.current.memoizedState.isDehydrated){var M=JU(E.pendingLanes);M!==0&&(U8(E,M|1),DM(E,QE()),(sA&6)===0&&(RY=QE()+500,tW()))}break;case 13:yw(function(){var W=JW(A,1);if(W!==null){var w=MM();mM(W,A,1,w)}}),p8(A,1)}};K8=function(A){if(A.tag===13){var E=JW(A,134217728);if(E!==null){var M=MM();mM(E,A,134217728,M)}p8(A,134217728)}};bD=function(A){if(A.tag===13){var E=dW(A),M=JW(A,E);if(M!==null){var W=MM();mM(M,A,E,W)}p8(A,E)}};cD=function(){return EE};nD=function(A,E){var M=EE;try{return EE=A,E()}finally{EE=M}};Nl=function(A,E,M){switch(E){case"input":if(Zl(A,M),E=M.name,M.type==="radio"&&E!=null){for(M=A;M.parentNode;)M=M.parentNode;M=M.querySelectorAll("input[name="+JSON.stringify(""+E)+'][type="radio"]');for(E=0;E<M.length;E++){var W=M[E];if(W!==A&&W.form===A.form){var w=oL(W);if(!w)throw Error($(90));qD(W),Zl(W,w)}}}break;case"textarea":QD(A,M);break;case"select":E=M.value,E!=null&&lY(A,!!M.multiple,E,!1)}};TD=h8;SD=yw;xz={usingClientEntryPoint:!1,Events:[_U,wY,oL,HD,yD,h8]},IU={findFiberByHostInstance:Jw,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Pz={bundleType:IU.bundleType,version:IU.version,rendererPackageName:IU.rendererPackageName,rendererConfig:IU.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zW.ReactCurrentDispatcher,findHostInstanceByFiber:function(A){return A=PD(A),A===null?null:A.stateNode},findFiberByHostInstance:IU.findFiberByHostInstance||Sz,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){if(_w=__REACT_DEVTOOLS_GLOBAL_HOOK__,!_w.isDisabled&&_w.supportsFiber)try{mL=_w.inject(Pz),MW=_w}catch(A){}}l5=xz,z5=h8});var H5=jK((Q0,V5)=>{R5();function B5(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=="function")return;try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(B5)}catch(A){console.error(A)}}B5(),V5.exports=n8});var y5=jK((hz)=>{var AK=ZW(H5(),1);hz.createRoot=AK.createRoot,hz.hydrateRoot=AK.hydrateRoot;var uz});var M4=ZW(Fw(),1),W4=ZW(y5(),1);var XE=ZW(Fw(),1);var _5="171",Ww={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ww={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},e5=0,FC=1,AO=2;var DC=1,EO=2,YW=3,nY=0,UM=1,UW=2,Yw=0,LK=1,IC=2,OC=3,NC=4,MO=5,mY=100,WO=101,wO=102,YO=103,UO=104,KO=200,LO=201,GO=202,ZO=203,lO=204,CO=205,FO=206,DO=207,IO=208,OO=209,NO=210,JO=211,qO=212,zO=213,QO=214,TG=0,SG=1,kG=2,GK=3,xG=4,PG=5,uG=6,hG=7,XO=0,RO=1,BO=2,yW=0,VO=1,HO=2,yO=3,fG=4,TO=5,SO=6,kO=7;var dY=301,hw=302,jG=303,vG=304,ZK=306,xO=1000,gG=1001,PO=1002,iY=1003,uO=1004;var lK=1005;var fw=1006,pG=1007;var sY=1008;var Uw=1009,hO=1010,fO=1011,CK=1012,JC=1013,oY=1014,Kw=1015,FK=1016,qC=1017,zC=1018,rY=1020,jO=35902,vO=1021,gO=1022,KW=1023,pO=1024,bO=1025,bG=1026,DK=1027,cO=1028,QC=1029,nO=1030,XC=1031;var RC=1033,cG=33776,nG=33777,mG=33778,dG=33779,BC=35840,VC=35841,HC=35842,yC=35843,TC=36196,SC=37492,kC=37496,xC=37808,PC=37809,uC=37810,hC=37811,fC=37812,jC=37813,vC=37814,gC=37815,pC=37816,bC=37817,cC=37818,nC=37819,mC=37820,dC=37821,iG=36492,iC=36494,sC=36495,mO=36283,oC=36284,rC=36285,aC=36286;var dO=3201;var iO=0,sO=1,jw="",IK="srgb",OK="srgb-linear",tC="linear",YE="srgb";var oO=512,rO=513,aO=514,$C=515,tO=516,$O=517,_O=518,eO=519;var _C="300 es",AN=2000;class TW{addEventListener(A,E){if(this._listeners===void 0)this._listeners={};let M=this._listeners;if(M[A]===void 0)M[A]=[];if(M[A].indexOf(E)===-1)M[A].push(E)}hasEventListener(A,E){if(this._listeners===void 0)return!1;let M=this._listeners;return M[A]!==void 0&&M[A].indexOf(E)!==-1}removeEventListener(A,E){if(this._listeners===void 0)return;let W=this._listeners[A];if(W!==void 0){let w=W.indexOf(E);if(w!==-1)W.splice(w,1)}}dispatchEvent(A){if(this._listeners===void 0)return;let M=this._listeners[A.type];if(M!==void 0){A.target=this;let W=M.slice(0);for(let w=0,Y=W.length;w<Y;w++)W[w].call(this,A);A.target=null}}}var aE=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],T5=1234567,UK=Math.PI/180,bY=180/Math.PI;function aY(){let A=Math.random()*4294967295|0,E=Math.random()*4294967295|0,M=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(aE[A&255]+aE[A>>8&255]+aE[A>>16&255]+aE[A>>24&255]+"-"+aE[E&255]+aE[E>>8&255]+"-"+aE[E>>16&15|64]+aE[E>>24&255]+"-"+aE[M&63|128]+aE[M>>8&255]+"-"+aE[M>>16&255]+aE[M>>24&255]+aE[W&255]+aE[W>>8&255]+aE[W>>16&255]+aE[W>>24&255]).toLowerCase()}function pA(A,E,M){return Math.max(E,Math.min(M,A))}function eC(A,E){return(A%E+E)%E}function fz(A,E,M,W,w){return W+(A-E)*(w-W)/(M-E)}function jz(A,E,M){if(A!==E)return(M-A)/(E-A);else return 0}function KK(A,E,M){return(1-M)*A+M*E}function vz(A,E,M,W){return KK(A,E,1-Math.exp(-M*W))}function gz(A,E=1){return E-Math.abs(eC(A,E*2)-E)}function pz(A,E,M){if(A<=E)return 0;if(A>=M)return 1;return A=(A-E)/(M-E),A*A*(3-2*A)}function bz(A,E,M){if(A<=E)return 0;if(A>=M)return 1;return A=(A-E)/(M-E),A*A*A*(A*(A*6-15)+10)}function cz(A,E){return A+Math.floor(Math.random()*(E-A+1))}function nz(A,E){return A+Math.random()*(E-A)}function mz(A){return A*(0.5-Math.random())}function dz(A){if(A!==void 0)T5=A;let E=T5+=1831565813;return E=Math.imul(E^E>>>15,E|1),E^=E+Math.imul(E^E>>>7,E|61),((E^E>>>14)>>>0)/4294967296}function iz(A){return A*UK}function sz(A){return A*bY}function oz(A){return(A&A-1)===0&&A!==0}function rz(A){return Math.pow(2,Math.ceil(Math.log(A)/Math.LN2))}function az(A){return Math.pow(2,Math.floor(Math.log(A)/Math.LN2))}function tz(A,E,M,W,w){let{cos:Y,sin:U}=Math,K=Y(M/2),L=U(M/2),G=Y((E+W)/2),l=U((E+W)/2),C=Y((E-W)/2),F=U((E-W)/2),I=Y((W-E)/2),J=U((W-E)/2);switch(w){case"XYX":A.set(K*l,L*C,L*F,K*G);break;case"YZY":A.set(L*F,K*l,L*C,K*G);break;case"ZXZ":A.set(L*C,L*F,K*l,K*G);break;case"XZX":A.set(K*l,L*J,L*I,K*G);break;case"YXY":A.set(L*I,K*l,L*J,K*G);break;case"ZYZ":A.set(L*J,L*I,K*l,K*G);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+w)}}function gY(A,E){switch(E.constructor){case Float32Array:return A;case Uint32Array:return A/4294967295;case Uint16Array:return A/65535;case Uint8Array:return A/255;case Int32Array:return Math.max(A/2147483647,-1);case Int16Array:return Math.max(A/32767,-1);case Int8Array:return Math.max(A/127,-1);default:throw Error("Invalid component type.")}}function wM(A,E){switch(E.constructor){case Float32Array:return A;case Uint32Array:return Math.round(A*4294967295);case Uint16Array:return Math.round(A*65535);case Uint8Array:return Math.round(A*255);case Int32Array:return Math.round(A*2147483647);case Int16Array:return Math.round(A*32767);case Int8Array:return Math.round(A*127);default:throw Error("Invalid component type.")}}var AF={DEG2RAD:UK,RAD2DEG:bY,generateUUID:aY,clamp:pA,euclideanModulo:eC,mapLinear:fz,inverseLerp:jz,lerp:KK,damp:vz,pingpong:gz,smoothstep:pz,smootherstep:bz,randInt:cz,randFloat:nz,randFloatSpread:mz,seededRandom:dz,degToRad:iz,radToDeg:sz,isPowerOfTwo:oz,ceilPowerOfTwo:rz,floorPowerOfTwo:az,setQuaternionFromProperEuler:tz,normalize:wM,denormalize:gY};class xA{constructor(A=0,E=0){xA.prototype.isVector2=!0,this.x=A,this.y=E}get width(){return this.x}set width(A){this.x=A}get height(){return this.y}set height(A){this.y=A}set(A,E){return this.x=A,this.y=E,this}setScalar(A){return this.x=A,this.y=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setComponent(A,E){switch(A){case 0:this.x=E;break;case 1:this.y=E;break;default:throw Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y)}copy(A){return this.x=A.x,this.y=A.y,this}add(A){return this.x+=A.x,this.y+=A.y,this}addScalar(A){return this.x+=A,this.y+=A,this}addVectors(A,E){return this.x=A.x+E.x,this.y=A.y+E.y,this}addScaledVector(A,E){return this.x+=A.x*E,this.y+=A.y*E,this}sub(A){return this.x-=A.x,this.y-=A.y,this}subScalar(A){return this.x-=A,this.y-=A,this}subVectors(A,E){return this.x=A.x-E.x,this.y=A.y-E.y,this}multiply(A){return this.x*=A.x,this.y*=A.y,this}multiplyScalar(A){return this.x*=A,this.y*=A,this}divide(A){return this.x/=A.x,this.y/=A.y,this}divideScalar(A){return this.multiplyScalar(1/A)}applyMatrix3(A){let E=this.x,M=this.y,W=A.elements;return this.x=W[0]*E+W[3]*M+W[6],this.y=W[1]*E+W[4]*M+W[7],this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this}clamp(A,E){return this.x=pA(this.x,A.x,E.x),this.y=pA(this.y,A.y,E.y),this}clampScalar(A,E){return this.x=pA(this.x,A,E),this.y=pA(this.y,A,E),this}clampLength(A,E){let M=this.length();return this.divideScalar(M||1).multiplyScalar(pA(M,A,E))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(A){return this.x*A.x+this.y*A.y}cross(A){return this.x*A.y-this.y*A.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(A){let E=Math.sqrt(this.lengthSq()*A.lengthSq());if(E===0)return Math.PI/2;let M=this.dot(A)/E;return Math.acos(pA(M,-1,1))}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){let E=this.x-A.x,M=this.y-A.y;return E*E+M*M}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,E){return this.x+=(A.x-this.x)*E,this.y+=(A.y-this.y)*E,this}lerpVectors(A,E,M){return this.x=A.x+(E.x-A.x)*M,this.y=A.y+(E.y-A.y)*M,this}equals(A){return A.x===this.x&&A.y===this.y}fromArray(A,E=0){return this.x=A[E],this.y=A[E+1],this}toArray(A=[],E=0){return A[E]=this.x,A[E+1]=this.y,A}fromBufferAttribute(A,E){return this.x=A.getX(E),this.y=A.getY(E),this}rotateAround(A,E){let M=Math.cos(E),W=Math.sin(E),w=this.x-A.x,Y=this.y-A.y;return this.x=w*M-Y*W+A.x,this.y=w*W+Y*M+A.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class PA{constructor(A,E,M,W,w,Y,U,K,L){if(PA.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],A!==void 0)this.set(A,E,M,W,w,Y,U,K,L)}set(A,E,M,W,w,Y,U,K,L){let G=this.elements;return G[0]=A,G[1]=W,G[2]=U,G[3]=E,G[4]=w,G[5]=K,G[6]=M,G[7]=Y,G[8]=L,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(A){let E=this.elements,M=A.elements;return E[0]=M[0],E[1]=M[1],E[2]=M[2],E[3]=M[3],E[4]=M[4],E[5]=M[5],E[6]=M[6],E[7]=M[7],E[8]=M[8],this}extractBasis(A,E,M){return A.setFromMatrix3Column(this,0),E.setFromMatrix3Column(this,1),M.setFromMatrix3Column(this,2),this}setFromMatrix4(A){let E=A.elements;return this.set(E[0],E[4],E[8],E[1],E[5],E[9],E[2],E[6],E[10]),this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,E){let M=A.elements,W=E.elements,w=this.elements,Y=M[0],U=M[3],K=M[6],L=M[1],G=M[4],l=M[7],C=M[2],F=M[5],I=M[8],J=W[0],q=W[3],D=W[6],Z=W[1],N=W[4],O=W[7],B=W[2],T=W[5],V=W[8];return w[0]=Y*J+U*Z+K*B,w[3]=Y*q+U*N+K*T,w[6]=Y*D+U*O+K*V,w[1]=L*J+G*Z+l*B,w[4]=L*q+G*N+l*T,w[7]=L*D+G*O+l*V,w[2]=C*J+F*Z+I*B,w[5]=C*q+F*N+I*T,w[8]=C*D+F*O+I*V,this}multiplyScalar(A){let E=this.elements;return E[0]*=A,E[3]*=A,E[6]*=A,E[1]*=A,E[4]*=A,E[7]*=A,E[2]*=A,E[5]*=A,E[8]*=A,this}determinant(){let A=this.elements,E=A[0],M=A[1],W=A[2],w=A[3],Y=A[4],U=A[5],K=A[6],L=A[7],G=A[8];return E*Y*G-E*U*L-M*w*G+M*U*K+W*w*L-W*Y*K}invert(){let A=this.elements,E=A[0],M=A[1],W=A[2],w=A[3],Y=A[4],U=A[5],K=A[6],L=A[7],G=A[8],l=G*Y-U*L,C=U*K-G*w,F=L*w-Y*K,I=E*l+M*C+W*F;if(I===0)return this.set(0,0,0,0,0,0,0,0,0);let J=1/I;return A[0]=l*J,A[1]=(W*L-G*M)*J,A[2]=(U*M-W*Y)*J,A[3]=C*J,A[4]=(G*E-W*K)*J,A[5]=(W*w-U*E)*J,A[6]=F*J,A[7]=(M*K-L*E)*J,A[8]=(Y*E-M*w)*J,this}transpose(){let A,E=this.elements;return A=E[1],E[1]=E[3],E[3]=A,A=E[2],E[2]=E[6],E[6]=A,A=E[5],E[5]=E[7],E[7]=A,this}getNormalMatrix(A){return this.setFromMatrix4(A).invert().transpose()}transposeIntoArray(A){let E=this.elements;return A[0]=E[0],A[1]=E[3],A[2]=E[6],A[3]=E[1],A[4]=E[4],A[5]=E[7],A[6]=E[2],A[7]=E[5],A[8]=E[8],this}setUvTransform(A,E,M,W,w,Y,U){let K=Math.cos(w),L=Math.sin(w);return this.set(M*K,M*L,-M*(K*Y+L*U)+Y+A,-W*L,W*K,-W*(-L*Y+K*U)+U+E,0,0,1),this}scale(A,E){return this.premultiply(m8.makeScale(A,E)),this}rotate(A){return this.premultiply(m8.makeRotation(-A)),this}translate(A,E){return this.premultiply(m8.makeTranslation(A,E)),this}makeTranslation(A,E){if(A.isVector2)this.set(1,0,A.x,0,1,A.y,0,0,1);else this.set(1,0,A,0,1,E,0,0,1);return this}makeRotation(A){let E=Math.cos(A),M=Math.sin(A);return this.set(E,-M,0,M,E,0,0,0,1),this}makeScale(A,E){return this.set(A,0,0,0,E,0,0,0,1),this}equals(A){let E=this.elements,M=A.elements;for(let W=0;W<9;W++)if(E[W]!==M[W])return!1;return!0}fromArray(A,E=0){for(let M=0;M<9;M++)this.elements[M]=A[M+E];return this}toArray(A=[],E=0){let M=this.elements;return A[E]=M[0],A[E+1]=M[1],A[E+2]=M[2],A[E+3]=M[3],A[E+4]=M[4],A[E+5]=M[5],A[E+6]=M[6],A[E+7]=M[7],A[E+8]=M[8],A}clone(){return new this.constructor().fromArray(this.elements)}}var m8=new PA;function EF(A){for(let E=A.length-1;E>=0;--E)if(A[E]>=65535)return!0;return!1}function cY(A){return document.createElementNS("http://www.w3.org/1999/xhtml",A)}function EN(){let A=cY("canvas");return A.style.display="block",A}var S5={};function vw(A){if(A in S5)return;S5[A]=!0,console.warn(A)}function MN(A,E,M){return new Promise(function(W,w){function Y(){switch(A.clientWaitSync(E,A.SYNC_FLUSH_COMMANDS_BIT,0)){case A.WAIT_FAILED:w();break;case A.TIMEOUT_EXPIRED:setTimeout(Y,M);break;default:W()}}setTimeout(Y,M)})}function WN(A){let E=A.elements;E[2]=0.5*E[2]+0.5*E[3],E[6]=0.5*E[6]+0.5*E[7],E[10]=0.5*E[10]+0.5*E[11],E[14]=0.5*E[14]+0.5*E[15]}function wN(A){let E=A.elements;if(E[11]===-1)E[10]=-E[10]-1,E[14]=-E[14];else E[10]=-E[10],E[14]=-E[14]+1}var k5=new PA().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),x5=new PA().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function $z(){let A={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(w,Y,U){if(this.enabled===!1||Y===U||!Y||!U)return w;if(this.spaces[Y].transfer==="srgb")w.r=HW(w.r),w.g=HW(w.g),w.b=HW(w.b);if(this.spaces[Y].primaries!==this.spaces[U].primaries)w.applyMatrix3(this.spaces[Y].toXYZ),w.applyMatrix3(this.spaces[U].fromXYZ);if(this.spaces[U].transfer==="srgb")w.r=pY(w.r),w.g=pY(w.g),w.b=pY(w.b);return w},fromWorkingColorSpace:function(w,Y){return this.convert(w,this.workingColorSpace,Y)},toWorkingColorSpace:function(w,Y){return this.convert(w,Y,this.workingColorSpace)},getPrimaries:function(w){return this.spaces[w].primaries},getTransfer:function(w){if(w==="")return"linear";return this.spaces[w].transfer},getLuminanceCoefficients:function(w,Y=this.workingColorSpace){return w.fromArray(this.spaces[Y].luminanceCoefficients)},define:function(w){Object.assign(this.spaces,w)},_getMatrix:function(w,Y,U){return w.copy(this.spaces[Y].toXYZ).multiply(this.spaces[U].fromXYZ)},_getDrawingBufferColorSpace:function(w){return this.spaces[w].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(w=this.workingColorSpace){return this.spaces[w].workingColorSpaceConfig.unpackColorSpace}},E=[0.64,0.33,0.3,0.6,0.15,0.06],M=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return A.define({["srgb-linear"]:{primaries:E,whitePoint:W,transfer:"linear",toXYZ:k5,fromXYZ:x5,luminanceCoefficients:M,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:E,whitePoint:W,transfer:"srgb",toXYZ:k5,fromXYZ:x5,luminanceCoefficients:M,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),A}var oA=$z();function HW(A){return A<0.04045?A*0.0773993808:Math.pow(A*0.9478672986+0.0521327014,2.4)}function pY(A){return A<0.0031308?A*12.92:1.055*Math.pow(A,0.41666)-0.055}var HY;class MF{static getDataURL(A){if(/^data:/i.test(A.src))return A.src;if(typeof HTMLCanvasElement>"u")return A.src;let E;if(A instanceof HTMLCanvasElement)E=A;else{if(HY===void 0)HY=cY("canvas");HY.width=A.width,HY.height=A.height;let M=HY.getContext("2d");if(A instanceof ImageData)M.putImageData(A,0,0);else M.drawImage(A,0,0,A.width,A.height);E=HY}if(E.width>2048||E.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",A),E.toDataURL("image/jpeg",0.6);else return E.toDataURL("image/png")}static sRGBToLinear(A){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){let E=cY("canvas");E.width=A.width,E.height=A.height;let M=E.getContext("2d");M.drawImage(A,0,0,A.width,A.height);let W=M.getImageData(0,0,A.width,A.height),w=W.data;for(let Y=0;Y<w.length;Y++)w[Y]=HW(w[Y]/255)*255;return M.putImageData(W,0,0),E}else if(A.data){let E=A.data.slice(0);for(let M=0;M<E.length;M++)if(E instanceof Uint8Array||E instanceof Uint8ClampedArray)E[M]=Math.floor(HW(E[M]/255)*255);else E[M]=HW(E[M]);return{data:E,width:A.width,height:A.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),A}}var _z=0;class sG{constructor(A=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_z++}),this.uuid=aY(),this.data=A,this.dataReady=!0,this.version=0}set needsUpdate(A){if(A===!0)this.version++}toJSON(A){let E=A===void 0||typeof A==="string";if(!E&&A.images[this.uuid]!==void 0)return A.images[this.uuid];let M={uuid:this.uuid,url:""},W=this.data;if(W!==null){let w;if(Array.isArray(W)){w=[];for(let Y=0,U=W.length;Y<U;Y++)if(W[Y].isDataTexture)w.push(d8(W[Y].image));else w.push(d8(W[Y]))}else w=d8(W);M.url=w}if(!E)A.images[this.uuid]=M;return M}}function d8(A){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap)return MF.getDataURL(A);else if(A.data)return{data:Array.from(A.data),width:A.width,height:A.height,type:A.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var ez=0;class $E extends TW{constructor(A=$E.DEFAULT_IMAGE,E=$E.DEFAULT_MAPPING,M=1001,W=1001,w=1006,Y=1008,U=1023,K=1009,L=$E.DEFAULT_ANISOTROPY,G=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:ez++}),this.uuid=aY(),this.name="",this.source=new sG(A),this.mipmaps=[],this.mapping=E,this.channel=0,this.wrapS=M,this.wrapT=W,this.magFilter=w,this.minFilter=Y,this.anisotropy=L,this.format=U,this.internalFormat=null,this.type=K,this.offset=new xA(0,0),this.repeat=new xA(1,1),this.center=new xA(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new PA,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=G,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(A=null){this.source.data=A}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(A){return this.name=A.name,this.source=A.source,this.mipmaps=A.mipmaps.slice(0),this.mapping=A.mapping,this.channel=A.channel,this.wrapS=A.wrapS,this.wrapT=A.wrapT,this.magFilter=A.magFilter,this.minFilter=A.minFilter,this.anisotropy=A.anisotropy,this.format=A.format,this.internalFormat=A.internalFormat,this.type=A.type,this.offset.copy(A.offset),this.repeat.copy(A.repeat),this.center.copy(A.center),this.rotation=A.rotation,this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrix.copy(A.matrix),this.generateMipmaps=A.generateMipmaps,this.premultiplyAlpha=A.premultiplyAlpha,this.flipY=A.flipY,this.unpackAlignment=A.unpackAlignment,this.colorSpace=A.colorSpace,this.userData=JSON.parse(JSON.stringify(A.userData)),this.needsUpdate=!0,this}toJSON(A){let E=A===void 0||typeof A==="string";if(!E&&A.textures[this.uuid]!==void 0)return A.textures[this.uuid];let M={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(A).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)M.userData=this.userData;if(!E)A.textures[this.uuid]=M;return M}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(A){if(this.mapping!==300)return A;if(A.applyMatrix3(this.matrix),A.x<0||A.x>1)switch(this.wrapS){case 1000:A.x=A.x-Math.floor(A.x);break;case 1001:A.x=A.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(A.x)%2)===1)A.x=Math.ceil(A.x)-A.x;else A.x=A.x-Math.floor(A.x);break}if(A.y<0||A.y>1)switch(this.wrapT){case 1000:A.y=A.y-Math.floor(A.y);break;case 1001:A.y=A.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(A.y)%2)===1)A.y=Math.ceil(A.y)-A.y;else A.y=A.y-Math.floor(A.y);break}if(this.flipY)A.y=1-A.y;return A}set needsUpdate(A){if(A===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(A){if(A===!0)this.pmremVersion++}}$E.DEFAULT_IMAGE=null;$E.DEFAULT_MAPPING=300;$E.DEFAULT_ANISOTROPY=1;class NE{constructor(A=0,E=0,M=0,W=1){NE.prototype.isVector4=!0,this.x=A,this.y=E,this.z=M,this.w=W}get width(){return this.z}set width(A){this.z=A}get height(){return this.w}set height(A){this.w=A}set(A,E,M,W){return this.x=A,this.y=E,this.z=M,this.w=W,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this.w=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setW(A){return this.w=A,this}setComponent(A,E){switch(A){case 0:this.x=E;break;case 1:this.y=E;break;case 2:this.z=E;break;case 3:this.w=E;break;default:throw Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this.w=A.w!==void 0?A.w:1,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this.w+=A.w,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this.w+=A,this}addVectors(A,E){return this.x=A.x+E.x,this.y=A.y+E.y,this.z=A.z+E.z,this.w=A.w+E.w,this}addScaledVector(A,E){return this.x+=A.x*E,this.y+=A.y*E,this.z+=A.z*E,this.w+=A.w*E,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this.w-=A.w,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this.w-=A,this}subVectors(A,E){return this.x=A.x-E.x,this.y=A.y-E.y,this.z=A.z-E.z,this.w=A.w-E.w,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this.w*=A.w,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this.w*=A,this}applyMatrix4(A){let E=this.x,M=this.y,W=this.z,w=this.w,Y=A.elements;return this.x=Y[0]*E+Y[4]*M+Y[8]*W+Y[12]*w,this.y=Y[1]*E+Y[5]*M+Y[9]*W+Y[13]*w,this.z=Y[2]*E+Y[6]*M+Y[10]*W+Y[14]*w,this.w=Y[3]*E+Y[7]*M+Y[11]*W+Y[15]*w,this}divide(A){return this.x/=A.x,this.y/=A.y,this.z/=A.z,this.w/=A.w,this}divideScalar(A){return this.multiplyScalar(1/A)}setAxisAngleFromQuaternion(A){this.w=2*Math.acos(A.w);let E=Math.sqrt(1-A.w*A.w);if(E<0.0001)this.x=1,this.y=0,this.z=0;else this.x=A.x/E,this.y=A.y/E,this.z=A.z/E;return this}setAxisAngleFromRotationMatrix(A){let E,M,W,w,Y=0.01,U=0.1,K=A.elements,L=K[0],G=K[4],l=K[8],C=K[1],F=K[5],I=K[9],J=K[2],q=K[6],D=K[10];if(Math.abs(G-C)<0.01&&Math.abs(l-J)<0.01&&Math.abs(I-q)<0.01){if(Math.abs(G+C)<0.1&&Math.abs(l+J)<0.1&&Math.abs(I+q)<0.1&&Math.abs(L+F+D-3)<0.1)return this.set(1,0,0,0),this;E=Math.PI;let N=(L+1)/2,O=(F+1)/2,B=(D+1)/2,T=(G+C)/4,V=(l+J)/4,H=(I+q)/4;if(N>O&&N>B)if(N<0.01)M=0,W=0.707106781,w=0.707106781;else M=Math.sqrt(N),W=T/M,w=V/M;else if(O>B)if(O<0.01)M=0.707106781,W=0,w=0.707106781;else W=Math.sqrt(O),M=T/W,w=H/W;else if(B<0.01)M=0.707106781,W=0.707106781,w=0;else w=Math.sqrt(B),M=V/w,W=H/w;return this.set(M,W,w,E),this}let Z=Math.sqrt((q-I)*(q-I)+(l-J)*(l-J)+(C-G)*(C-G));if(Math.abs(Z)<0.001)Z=1;return this.x=(q-I)/Z,this.y=(l-J)/Z,this.z=(C-G)/Z,this.w=Math.acos((L+F+D-1)/2),this}setFromMatrixPosition(A){let E=A.elements;return this.x=E[12],this.y=E[13],this.z=E[14],this.w=E[15],this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this.w=Math.min(this.w,A.w),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this.w=Math.max(this.w,A.w),this}clamp(A,E){return this.x=pA(this.x,A.x,E.x),this.y=pA(this.y,A.y,E.y),this.z=pA(this.z,A.z,E.z),this.w=pA(this.w,A.w,E.w),this}clampScalar(A,E){return this.x=pA(this.x,A,E),this.y=pA(this.y,A,E),this.z=pA(this.z,A,E),this.w=pA(this.w,A,E),this}clampLength(A,E){let M=this.length();return this.divideScalar(M||1).multiplyScalar(pA(M,A,E))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z+this.w*A.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,E){return this.x+=(A.x-this.x)*E,this.y+=(A.y-this.y)*E,this.z+=(A.z-this.z)*E,this.w+=(A.w-this.w)*E,this}lerpVectors(A,E,M){return this.x=A.x+(E.x-A.x)*M,this.y=A.y+(E.y-A.y)*M,this.z=A.z+(E.z-A.z)*M,this.w=A.w+(E.w-A.w)*M,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z&&A.w===this.w}fromArray(A,E=0){return this.x=A[E],this.y=A[E+1],this.z=A[E+2],this.w=A[E+3],this}toArray(A=[],E=0){return A[E]=this.x,A[E+1]=this.y,A[E+2]=this.z,A[E+3]=this.w,A}fromBufferAttribute(A,E){return this.x=A.getX(E),this.y=A.getY(E),this.z=A.getZ(E),this.w=A.getW(E),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class WF extends TW{constructor(A=1,E=1,M={}){super();this.isRenderTarget=!0,this.width=A,this.height=E,this.depth=1,this.scissor=new NE(0,0,A,E),this.scissorTest=!1,this.viewport=new NE(0,0,A,E);let W={width:A,height:E,depth:1};M=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},M);let w=new $E(W,M.mapping,M.wrapS,M.wrapT,M.magFilter,M.minFilter,M.format,M.type,M.anisotropy,M.colorSpace);w.flipY=!1,w.generateMipmaps=M.generateMipmaps,w.internalFormat=M.internalFormat,this.textures=[];let Y=M.count;for(let U=0;U<Y;U++)this.textures[U]=w.clone(),this.textures[U].isRenderTargetTexture=!0;this.depthBuffer=M.depthBuffer,this.stencilBuffer=M.stencilBuffer,this.resolveDepthBuffer=M.resolveDepthBuffer,this.resolveStencilBuffer=M.resolveStencilBuffer,this.depthTexture=M.depthTexture,this.samples=M.samples}get texture(){return this.textures[0]}set texture(A){this.textures[0]=A}setSize(A,E,M=1){if(this.width!==A||this.height!==E||this.depth!==M){this.width=A,this.height=E,this.depth=M;for(let W=0,w=this.textures.length;W<w;W++)this.textures[W].image.width=A,this.textures[W].image.height=E,this.textures[W].image.depth=M;this.dispose()}this.viewport.set(0,0,A,E),this.scissor.set(0,0,A,E)}clone(){return new this.constructor().copy(this)}copy(A){this.width=A.width,this.height=A.height,this.depth=A.depth,this.scissor.copy(A.scissor),this.scissorTest=A.scissorTest,this.viewport.copy(A.viewport),this.textures.length=0;for(let M=0,W=A.textures.length;M<W;M++)this.textures[M]=A.textures[M].clone(),this.textures[M].isRenderTargetTexture=!0;let E=Object.assign({},A.texture.image);if(this.texture.source=new sG(E),this.depthBuffer=A.depthBuffer,this.stencilBuffer=A.stencilBuffer,this.resolveDepthBuffer=A.resolveDepthBuffer,this.resolveStencilBuffer=A.resolveStencilBuffer,A.depthTexture!==null)this.depthTexture=A.depthTexture.clone();return this.samples=A.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class SW extends WF{constructor(A=1,E=1,M={}){super(A,E,M);this.isWebGLRenderTarget=!0}}class oG extends $E{constructor(A=null,E=1,M=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:A,width:E,height:M,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(A){this.layerUpdates.add(A)}clearLayerUpdates(){this.layerUpdates.clear()}}class wF extends $E{constructor(A=null,E=1,M=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:A,width:E,height:M,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class aM{constructor(A=0,E=0,M=0,W=1){this.isQuaternion=!0,this._x=A,this._y=E,this._z=M,this._w=W}static slerpFlat(A,E,M,W,w,Y,U){let K=M[W+0],L=M[W+1],G=M[W+2],l=M[W+3],C=w[Y+0],F=w[Y+1],I=w[Y+2],J=w[Y+3];if(U===0){A[E+0]=K,A[E+1]=L,A[E+2]=G,A[E+3]=l;return}if(U===1){A[E+0]=C,A[E+1]=F,A[E+2]=I,A[E+3]=J;return}if(l!==J||K!==C||L!==F||G!==I){let q=1-U,D=K*C+L*F+G*I+l*J,Z=D>=0?1:-1,N=1-D*D;if(N>Number.EPSILON){let B=Math.sqrt(N),T=Math.atan2(B,D*Z);q=Math.sin(q*T)/B,U=Math.sin(U*T)/B}let O=U*Z;if(K=K*q+C*O,L=L*q+F*O,G=G*q+I*O,l=l*q+J*O,q===1-U){let B=1/Math.sqrt(K*K+L*L+G*G+l*l);K*=B,L*=B,G*=B,l*=B}}A[E]=K,A[E+1]=L,A[E+2]=G,A[E+3]=l}static multiplyQuaternionsFlat(A,E,M,W,w,Y){let U=M[W],K=M[W+1],L=M[W+2],G=M[W+3],l=w[Y],C=w[Y+1],F=w[Y+2],I=w[Y+3];return A[E]=U*I+G*l+K*F-L*C,A[E+1]=K*I+G*C+L*l-U*F,A[E+2]=L*I+G*F+U*C-K*l,A[E+3]=G*I-U*l-K*C-L*F,A}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get w(){return this._w}set w(A){this._w=A,this._onChangeCallback()}set(A,E,M,W){return this._x=A,this._y=E,this._z=M,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(A){return this._x=A.x,this._y=A.y,this._z=A.z,this._w=A.w,this._onChangeCallback(),this}setFromEuler(A,E=!0){let{_x:M,_y:W,_z:w,_order:Y}=A,U=Math.cos,K=Math.sin,L=U(M/2),G=U(W/2),l=U(w/2),C=K(M/2),F=K(W/2),I=K(w/2);switch(Y){case"XYZ":this._x=C*G*l+L*F*I,this._y=L*F*l-C*G*I,this._z=L*G*I+C*F*l,this._w=L*G*l-C*F*I;break;case"YXZ":this._x=C*G*l+L*F*I,this._y=L*F*l-C*G*I,this._z=L*G*I-C*F*l,this._w=L*G*l+C*F*I;break;case"ZXY":this._x=C*G*l-L*F*I,this._y=L*F*l+C*G*I,this._z=L*G*I+C*F*l,this._w=L*G*l-C*F*I;break;case"ZYX":this._x=C*G*l-L*F*I,this._y=L*F*l+C*G*I,this._z=L*G*I-C*F*l,this._w=L*G*l+C*F*I;break;case"YZX":this._x=C*G*l+L*F*I,this._y=L*F*l+C*G*I,this._z=L*G*I-C*F*l,this._w=L*G*l-C*F*I;break;case"XZY":this._x=C*G*l-L*F*I,this._y=L*F*l-C*G*I,this._z=L*G*I+C*F*l,this._w=L*G*l+C*F*I;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+Y)}if(E===!0)this._onChangeCallback();return this}setFromAxisAngle(A,E){let M=E/2,W=Math.sin(M);return this._x=A.x*W,this._y=A.y*W,this._z=A.z*W,this._w=Math.cos(M),this._onChangeCallback(),this}setFromRotationMatrix(A){let E=A.elements,M=E[0],W=E[4],w=E[8],Y=E[1],U=E[5],K=E[9],L=E[2],G=E[6],l=E[10],C=M+U+l;if(C>0){let F=0.5/Math.sqrt(C+1);this._w=0.25/F,this._x=(G-K)*F,this._y=(w-L)*F,this._z=(Y-W)*F}else if(M>U&&M>l){let F=2*Math.sqrt(1+M-U-l);this._w=(G-K)/F,this._x=0.25*F,this._y=(W+Y)/F,this._z=(w+L)/F}else if(U>l){let F=2*Math.sqrt(1+U-M-l);this._w=(w-L)/F,this._x=(W+Y)/F,this._y=0.25*F,this._z=(K+G)/F}else{let F=2*Math.sqrt(1+l-M-U);this._w=(Y-W)/F,this._x=(w+L)/F,this._y=(K+G)/F,this._z=0.25*F}return this._onChangeCallback(),this}setFromUnitVectors(A,E){let M=A.dot(E)+1;if(M<Number.EPSILON)if(M=0,Math.abs(A.x)>Math.abs(A.z))this._x=-A.y,this._y=A.x,this._z=0,this._w=M;else this._x=0,this._y=-A.z,this._z=A.y,this._w=M;else this._x=A.y*E.z-A.z*E.y,this._y=A.z*E.x-A.x*E.z,this._z=A.x*E.y-A.y*E.x,this._w=M;return this.normalize()}angleTo(A){return 2*Math.acos(Math.abs(pA(this.dot(A),-1,1)))}rotateTowards(A,E){let M=this.angleTo(A);if(M===0)return this;let W=Math.min(1,E/M);return this.slerp(A,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(A){return this._x*A._x+this._y*A._y+this._z*A._z+this._w*A._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let A=this.length();if(A===0)this._x=0,this._y=0,this._z=0,this._w=1;else A=1/A,this._x=this._x*A,this._y=this._y*A,this._z=this._z*A,this._w=this._w*A;return this._onChangeCallback(),this}multiply(A){return this.multiplyQuaternions(this,A)}premultiply(A){return this.multiplyQuaternions(A,this)}multiplyQuaternions(A,E){let{_x:M,_y:W,_z:w,_w:Y}=A,U=E._x,K=E._y,L=E._z,G=E._w;return this._x=M*G+Y*U+W*L-w*K,this._y=W*G+Y*K+w*U-M*L,this._z=w*G+Y*L+M*K-W*U,this._w=Y*G-M*U-W*K-w*L,this._onChangeCallback(),this}slerp(A,E){if(E===0)return this;if(E===1)return this.copy(A);let M=this._x,W=this._y,w=this._z,Y=this._w,U=Y*A._w+M*A._x+W*A._y+w*A._z;if(U<0)this._w=-A._w,this._x=-A._x,this._y=-A._y,this._z=-A._z,U=-U;else this.copy(A);if(U>=1)return this._w=Y,this._x=M,this._y=W,this._z=w,this;let K=1-U*U;if(K<=Number.EPSILON){let F=1-E;return this._w=F*Y+E*this._w,this._x=F*M+E*this._x,this._y=F*W+E*this._y,this._z=F*w+E*this._z,this.normalize(),this}let L=Math.sqrt(K),G=Math.atan2(L,U),l=Math.sin((1-E)*G)/L,C=Math.sin(E*G)/L;return this._w=Y*l+this._w*C,this._x=M*l+this._x*C,this._y=W*l+this._y*C,this._z=w*l+this._z*C,this._onChangeCallback(),this}slerpQuaternions(A,E,M){return this.copy(A).slerp(E,M)}random(){let A=2*Math.PI*Math.random(),E=2*Math.PI*Math.random(),M=Math.random(),W=Math.sqrt(1-M),w=Math.sqrt(M);return this.set(W*Math.sin(A),W*Math.cos(A),w*Math.sin(E),w*Math.cos(E))}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._w===this._w}fromArray(A,E=0){return this._x=A[E],this._y=A[E+1],this._z=A[E+2],this._w=A[E+3],this._onChangeCallback(),this}toArray(A=[],E=0){return A[E]=this._x,A[E+1]=this._y,A[E+2]=this._z,A[E+3]=this._w,A}fromBufferAttribute(A,E){return this._x=A.getX(E),this._y=A.getY(E),this._z=A.getZ(E),this._w=A.getW(E),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class f{constructor(A=0,E=0,M=0){f.prototype.isVector3=!0,this.x=A,this.y=E,this.z=M}set(A,E,M){if(M===void 0)M=this.z;return this.x=A,this.y=E,this.z=M,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setComponent(A,E){switch(A){case 0:this.x=E;break;case 1:this.y=E;break;case 2:this.z=E;break;default:throw Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this}addVectors(A,E){return this.x=A.x+E.x,this.y=A.y+E.y,this.z=A.z+E.z,this}addScaledVector(A,E){return this.x+=A.x*E,this.y+=A.y*E,this.z+=A.z*E,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this}subVectors(A,E){return this.x=A.x-E.x,this.y=A.y-E.y,this.z=A.z-E.z,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this}multiplyVectors(A,E){return this.x=A.x*E.x,this.y=A.y*E.y,this.z=A.z*E.z,this}applyEuler(A){return this.applyQuaternion(P5.setFromEuler(A))}applyAxisAngle(A,E){return this.applyQuaternion(P5.setFromAxisAngle(A,E))}applyMatrix3(A){let E=this.x,M=this.y,W=this.z,w=A.elements;return this.x=w[0]*E+w[3]*M+w[6]*W,this.y=w[1]*E+w[4]*M+w[7]*W,this.z=w[2]*E+w[5]*M+w[8]*W,this}applyNormalMatrix(A){return this.applyMatrix3(A).normalize()}applyMatrix4(A){let E=this.x,M=this.y,W=this.z,w=A.elements,Y=1/(w[3]*E+w[7]*M+w[11]*W+w[15]);return this.x=(w[0]*E+w[4]*M+w[8]*W+w[12])*Y,this.y=(w[1]*E+w[5]*M+w[9]*W+w[13])*Y,this.z=(w[2]*E+w[6]*M+w[10]*W+w[14])*Y,this}applyQuaternion(A){let E=this.x,M=this.y,W=this.z,w=A.x,Y=A.y,U=A.z,K=A.w,L=2*(Y*W-U*M),G=2*(U*E-w*W),l=2*(w*M-Y*E);return this.x=E+K*L+Y*l-U*G,this.y=M+K*G+U*L-w*l,this.z=W+K*l+w*G-Y*L,this}project(A){return this.applyMatrix4(A.matrixWorldInverse).applyMatrix4(A.projectionMatrix)}unproject(A){return this.applyMatrix4(A.projectionMatrixInverse).applyMatrix4(A.matrixWorld)}transformDirection(A){let E=this.x,M=this.y,W=this.z,w=A.elements;return this.x=w[0]*E+w[4]*M+w[8]*W,this.y=w[1]*E+w[5]*M+w[9]*W,this.z=w[2]*E+w[6]*M+w[10]*W,this.normalize()}divide(A){return this.x/=A.x,this.y/=A.y,this.z/=A.z,this}divideScalar(A){return this.multiplyScalar(1/A)}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this}clamp(A,E){return this.x=pA(this.x,A.x,E.x),this.y=pA(this.y,A.y,E.y),this.z=pA(this.z,A.z,E.z),this}clampScalar(A,E){return this.x=pA(this.x,A,E),this.y=pA(this.y,A,E),this.z=pA(this.z,A,E),this}clampLength(A,E){let M=this.length();return this.divideScalar(M||1).multiplyScalar(pA(M,A,E))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,E){return this.x+=(A.x-this.x)*E,this.y+=(A.y-this.y)*E,this.z+=(A.z-this.z)*E,this}lerpVectors(A,E,M){return this.x=A.x+(E.x-A.x)*M,this.y=A.y+(E.y-A.y)*M,this.z=A.z+(E.z-A.z)*M,this}cross(A){return this.crossVectors(this,A)}crossVectors(A,E){let{x:M,y:W,z:w}=A,Y=E.x,U=E.y,K=E.z;return this.x=W*K-w*U,this.y=w*Y-M*K,this.z=M*U-W*Y,this}projectOnVector(A){let E=A.lengthSq();if(E===0)return this.set(0,0,0);let M=A.dot(this)/E;return this.copy(A).multiplyScalar(M)}projectOnPlane(A){return i8.copy(this).projectOnVector(A),this.sub(i8)}reflect(A){return this.sub(i8.copy(A).multiplyScalar(2*this.dot(A)))}angleTo(A){let E=Math.sqrt(this.lengthSq()*A.lengthSq());if(E===0)return Math.PI/2;let M=this.dot(A)/E;return Math.acos(pA(M,-1,1))}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){let E=this.x-A.x,M=this.y-A.y,W=this.z-A.z;return E*E+M*M+W*W}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)+Math.abs(this.z-A.z)}setFromSpherical(A){return this.setFromSphericalCoords(A.radius,A.phi,A.theta)}setFromSphericalCoords(A,E,M){let W=Math.sin(E)*A;return this.x=W*Math.sin(M),this.y=Math.cos(E)*A,this.z=W*Math.cos(M),this}setFromCylindrical(A){return this.setFromCylindricalCoords(A.radius,A.theta,A.y)}setFromCylindricalCoords(A,E,M){return this.x=A*Math.sin(E),this.y=M,this.z=A*Math.cos(E),this}setFromMatrixPosition(A){let E=A.elements;return this.x=E[12],this.y=E[13],this.z=E[14],this}setFromMatrixScale(A){let E=this.setFromMatrixColumn(A,0).length(),M=this.setFromMatrixColumn(A,1).length(),W=this.setFromMatrixColumn(A,2).length();return this.x=E,this.y=M,this.z=W,this}setFromMatrixColumn(A,E){return this.fromArray(A.elements,E*4)}setFromMatrix3Column(A,E){return this.fromArray(A.elements,E*3)}setFromEuler(A){return this.x=A._x,this.y=A._y,this.z=A._z,this}setFromColor(A){return this.x=A.r,this.y=A.g,this.z=A.b,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z}fromArray(A,E=0){return this.x=A[E],this.y=A[E+1],this.z=A[E+2],this}toArray(A=[],E=0){return A[E]=this.x,A[E+1]=this.y,A[E+2]=this.z,A}fromBufferAttribute(A,E){return this.x=A.getX(E),this.y=A.getY(E),this.z=A.getZ(E),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let A=Math.random()*Math.PI*2,E=Math.random()*2-1,M=Math.sqrt(1-E*E);return this.x=M*Math.cos(A),this.y=E,this.z=M*Math.sin(A),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var i8=new f,P5=new aM;class gw{constructor(A=new f(1/0,1/0,1/0),E=new f(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=A,this.max=E}set(A,E){return this.min.copy(A),this.max.copy(E),this}setFromArray(A){this.makeEmpty();for(let E=0,M=A.length;E<M;E+=3)this.expandByPoint(iM.fromArray(A,E));return this}setFromBufferAttribute(A){this.makeEmpty();for(let E=0,M=A.count;E<M;E++)this.expandByPoint(iM.fromBufferAttribute(A,E));return this}setFromPoints(A){this.makeEmpty();for(let E=0,M=A.length;E<M;E++)this.expandByPoint(A[E]);return this}setFromCenterAndSize(A,E){let M=iM.copy(E).multiplyScalar(0.5);return this.min.copy(A).sub(M),this.max.copy(A).add(M),this}setFromObject(A,E=!1){return this.makeEmpty(),this.expandByObject(A,E)}clone(){return new this.constructor().copy(this)}copy(A){return this.min.copy(A.min),this.max.copy(A.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(A){return this.isEmpty()?A.set(0,0,0):A.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(A){return this.isEmpty()?A.set(0,0,0):A.subVectors(this.max,this.min)}expandByPoint(A){return this.min.min(A),this.max.max(A),this}expandByVector(A){return this.min.sub(A),this.max.add(A),this}expandByScalar(A){return this.min.addScalar(-A),this.max.addScalar(A),this}expandByObject(A,E=!1){A.updateWorldMatrix(!1,!1);let M=A.geometry;if(M!==void 0){let w=M.getAttribute("position");if(E===!0&&w!==void 0&&A.isInstancedMesh!==!0)for(let Y=0,U=w.count;Y<U;Y++){if(A.isMesh===!0)A.getVertexPosition(Y,iM);else iM.fromBufferAttribute(w,Y);iM.applyMatrix4(A.matrixWorld),this.expandByPoint(iM)}else{if(A.boundingBox!==void 0){if(A.boundingBox===null)A.computeBoundingBox();wG.copy(A.boundingBox)}else{if(M.boundingBox===null)M.computeBoundingBox();wG.copy(M.boundingBox)}wG.applyMatrix4(A.matrixWorld),this.union(wG)}}let W=A.children;for(let w=0,Y=W.length;w<Y;w++)this.expandByObject(W[w],E);return this}containsPoint(A){return A.x>=this.min.x&&A.x<=this.max.x&&A.y>=this.min.y&&A.y<=this.max.y&&A.z>=this.min.z&&A.z<=this.max.z}containsBox(A){return this.min.x<=A.min.x&&A.max.x<=this.max.x&&this.min.y<=A.min.y&&A.max.y<=this.max.y&&this.min.z<=A.min.z&&A.max.z<=this.max.z}getParameter(A,E){return E.set((A.x-this.min.x)/(this.max.x-this.min.x),(A.y-this.min.y)/(this.max.y-this.min.y),(A.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(A){return A.max.x>=this.min.x&&A.min.x<=this.max.x&&A.max.y>=this.min.y&&A.min.y<=this.max.y&&A.max.z>=this.min.z&&A.min.z<=this.max.z}intersectsSphere(A){return this.clampPoint(A.center,iM),iM.distanceToSquared(A.center)<=A.radius*A.radius}intersectsPlane(A){let E,M;if(A.normal.x>0)E=A.normal.x*this.min.x,M=A.normal.x*this.max.x;else E=A.normal.x*this.max.x,M=A.normal.x*this.min.x;if(A.normal.y>0)E+=A.normal.y*this.min.y,M+=A.normal.y*this.max.y;else E+=A.normal.y*this.max.y,M+=A.normal.y*this.min.y;if(A.normal.z>0)E+=A.normal.z*this.min.z,M+=A.normal.z*this.max.z;else E+=A.normal.z*this.max.z,M+=A.normal.z*this.min.z;return E<=-A.constant&&M>=-A.constant}intersectsTriangle(A){if(this.isEmpty())return!1;this.getCenter(EK),YG.subVectors(this.max,EK),yY.subVectors(A.a,EK),TY.subVectors(A.b,EK),SY.subVectors(A.c,EK),$W.subVectors(TY,yY),_W.subVectors(SY,TY),kw.subVectors(yY,SY);let E=[0,-$W.z,$W.y,0,-_W.z,_W.y,0,-kw.z,kw.y,$W.z,0,-$W.x,_W.z,0,-_W.x,kw.z,0,-kw.x,-$W.y,$W.x,0,-_W.y,_W.x,0,-kw.y,kw.x,0];if(!s8(E,yY,TY,SY,YG))return!1;if(E=[1,0,0,0,1,0,0,0,1],!s8(E,yY,TY,SY,YG))return!1;return UG.crossVectors($W,_W),E=[UG.x,UG.y,UG.z],s8(E,yY,TY,SY,YG)}clampPoint(A,E){return E.copy(A).clamp(this.min,this.max)}distanceToPoint(A){return this.clampPoint(A,iM).distanceTo(A)}getBoundingSphere(A){if(this.isEmpty())A.makeEmpty();else this.getCenter(A.center),A.radius=this.getSize(iM).length()*0.5;return A}intersect(A){if(this.min.max(A.min),this.max.min(A.max),this.isEmpty())this.makeEmpty();return this}union(A){return this.min.min(A.min),this.max.max(A.max),this}applyMatrix4(A){if(this.isEmpty())return this;return QW[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(A),QW[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(A),QW[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(A),QW[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(A),QW[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(A),QW[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(A),QW[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(A),QW[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(A),this.setFromPoints(QW),this}translate(A){return this.min.add(A),this.max.add(A),this}equals(A){return A.min.equals(this.min)&&A.max.equals(this.max)}}var QW=[new f,new f,new f,new f,new f,new f,new f,new f],iM=new f,wG=new gw,yY=new f,TY=new f,SY=new f,$W=new f,_W=new f,kw=new f,EK=new f,YG=new f,UG=new f,xw=new f;function s8(A,E,M,W,w){for(let Y=0,U=A.length-3;Y<=U;Y+=3){xw.fromArray(A,Y);let K=w.x*Math.abs(xw.x)+w.y*Math.abs(xw.y)+w.z*Math.abs(xw.z),L=E.dot(xw),G=M.dot(xw),l=W.dot(xw);if(Math.max(-Math.max(L,G,l),Math.min(L,G,l))>K)return!1}return!0}var AQ=new gw,MK=new f,o8=new f;class pw{constructor(A=new f,E=-1){this.isSphere=!0,this.center=A,this.radius=E}set(A,E){return this.center.copy(A),this.radius=E,this}setFromPoints(A,E){let M=this.center;if(E!==void 0)M.copy(E);else AQ.setFromPoints(A).getCenter(M);let W=0;for(let w=0,Y=A.length;w<Y;w++)W=Math.max(W,M.distanceToSquared(A[w]));return this.radius=Math.sqrt(W),this}copy(A){return this.center.copy(A.center),this.radius=A.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(A){return A.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(A){return A.distanceTo(this.center)-this.radius}intersectsSphere(A){let E=this.radius+A.radius;return A.center.distanceToSquared(this.center)<=E*E}intersectsBox(A){return A.intersectsSphere(this)}intersectsPlane(A){return Math.abs(A.distanceToPoint(this.center))<=this.radius}clampPoint(A,E){let M=this.center.distanceToSquared(A);if(E.copy(A),M>this.radius*this.radius)E.sub(this.center).normalize(),E.multiplyScalar(this.radius).add(this.center);return E}getBoundingBox(A){if(this.isEmpty())return A.makeEmpty(),A;return A.set(this.center,this.center),A.expandByScalar(this.radius),A}applyMatrix4(A){return this.center.applyMatrix4(A),this.radius=this.radius*A.getMaxScaleOnAxis(),this}translate(A){return this.center.add(A),this}expandByPoint(A){if(this.isEmpty())return this.center.copy(A),this.radius=0,this;MK.subVectors(A,this.center);let E=MK.lengthSq();if(E>this.radius*this.radius){let M=Math.sqrt(E),W=(M-this.radius)*0.5;this.center.addScaledVector(MK,W/M),this.radius+=W}return this}union(A){if(A.isEmpty())return this;if(this.isEmpty())return this.copy(A),this;if(this.center.equals(A.center)===!0)this.radius=Math.max(this.radius,A.radius);else o8.subVectors(A.center,this.center).setLength(A.radius),this.expandByPoint(MK.copy(A.center).add(o8)),this.expandByPoint(MK.copy(A.center).sub(o8));return this}equals(A){return A.center.equals(this.center)&&A.radius===this.radius}clone(){return new this.constructor().copy(this)}}var XW=new f,r8=new f,KG=new f,eW=new f,a8=new f,LG=new f,t8=new f;class bw{constructor(A=new f,E=new f(0,0,-1)){this.origin=A,this.direction=E}set(A,E){return this.origin.copy(A),this.direction.copy(E),this}copy(A){return this.origin.copy(A.origin),this.direction.copy(A.direction),this}at(A,E){return E.copy(this.origin).addScaledVector(this.direction,A)}lookAt(A){return this.direction.copy(A).sub(this.origin).normalize(),this}recast(A){return this.origin.copy(this.at(A,XW)),this}closestPointToPoint(A,E){E.subVectors(A,this.origin);let M=E.dot(this.direction);if(M<0)return E.copy(this.origin);return E.copy(this.origin).addScaledVector(this.direction,M)}distanceToPoint(A){return Math.sqrt(this.distanceSqToPoint(A))}distanceSqToPoint(A){let E=XW.subVectors(A,this.origin).dot(this.direction);if(E<0)return this.origin.distanceToSquared(A);return XW.copy(this.origin).addScaledVector(this.direction,E),XW.distanceToSquared(A)}distanceSqToSegment(A,E,M,W){r8.copy(A).add(E).multiplyScalar(0.5),KG.copy(E).sub(A).normalize(),eW.copy(this.origin).sub(r8);let w=A.distanceTo(E)*0.5,Y=-this.direction.dot(KG),U=eW.dot(this.direction),K=-eW.dot(KG),L=eW.lengthSq(),G=Math.abs(1-Y*Y),l,C,F,I;if(G>0)if(l=Y*K-U,C=Y*U-K,I=w*G,l>=0)if(C>=-I)if(C<=I){let J=1/G;l*=J,C*=J,F=l*(l+Y*C+2*U)+C*(Y*l+C+2*K)+L}else C=w,l=Math.max(0,-(Y*C+U)),F=-l*l+C*(C+2*K)+L;else C=-w,l=Math.max(0,-(Y*C+U)),F=-l*l+C*(C+2*K)+L;else if(C<=-I)l=Math.max(0,-(-Y*w+U)),C=l>0?-w:Math.min(Math.max(-w,-K),w),F=-l*l+C*(C+2*K)+L;else if(C<=I)l=0,C=Math.min(Math.max(-w,-K),w),F=C*(C+2*K)+L;else l=Math.max(0,-(Y*w+U)),C=l>0?w:Math.min(Math.max(-w,-K),w),F=-l*l+C*(C+2*K)+L;else C=Y>0?-w:w,l=Math.max(0,-(Y*C+U)),F=-l*l+C*(C+2*K)+L;if(M)M.copy(this.origin).addScaledVector(this.direction,l);if(W)W.copy(r8).addScaledVector(KG,C);return F}intersectSphere(A,E){XW.subVectors(A.center,this.origin);let M=XW.dot(this.direction),W=XW.dot(XW)-M*M,w=A.radius*A.radius;if(W>w)return null;let Y=Math.sqrt(w-W),U=M-Y,K=M+Y;if(K<0)return null;if(U<0)return this.at(K,E);return this.at(U,E)}intersectsSphere(A){return this.distanceSqToPoint(A.center)<=A.radius*A.radius}distanceToPlane(A){let E=A.normal.dot(this.direction);if(E===0){if(A.distanceToPoint(this.origin)===0)return 0;return null}let M=-(this.origin.dot(A.normal)+A.constant)/E;return M>=0?M:null}intersectPlane(A,E){let M=this.distanceToPlane(A);if(M===null)return null;return this.at(M,E)}intersectsPlane(A){let E=A.distanceToPoint(this.origin);if(E===0)return!0;if(A.normal.dot(this.direction)*E<0)return!0;return!1}intersectBox(A,E){let M,W,w,Y,U,K,L=1/this.direction.x,G=1/this.direction.y,l=1/this.direction.z,C=this.origin;if(L>=0)M=(A.min.x-C.x)*L,W=(A.max.x-C.x)*L;else M=(A.max.x-C.x)*L,W=(A.min.x-C.x)*L;if(G>=0)w=(A.min.y-C.y)*G,Y=(A.max.y-C.y)*G;else w=(A.max.y-C.y)*G,Y=(A.min.y-C.y)*G;if(M>Y||w>W)return null;if(w>M||isNaN(M))M=w;if(Y<W||isNaN(W))W=Y;if(l>=0)U=(A.min.z-C.z)*l,K=(A.max.z-C.z)*l;else U=(A.max.z-C.z)*l,K=(A.min.z-C.z)*l;if(M>K||U>W)return null;if(U>M||M!==M)M=U;if(K<W||W!==W)W=K;if(W<0)return null;return this.at(M>=0?M:W,E)}intersectsBox(A){return this.intersectBox(A,XW)!==null}intersectTriangle(A,E,M,W,w){a8.subVectors(E,A),LG.subVectors(M,A),t8.crossVectors(a8,LG);let Y=this.direction.dot(t8),U;if(Y>0){if(W)return null;U=1}else if(Y<0)U=-1,Y=-Y;else return null;eW.subVectors(this.origin,A);let K=U*this.direction.dot(LG.crossVectors(eW,LG));if(K<0)return null;let L=U*this.direction.dot(a8.cross(eW));if(L<0)return null;if(K+L>Y)return null;let G=-U*eW.dot(t8);if(G<0)return null;return this.at(G/Y,w)}applyMatrix4(A){return this.origin.applyMatrix4(A),this.direction.transformDirection(A),this}equals(A){return A.origin.equals(this.origin)&&A.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class GE{constructor(A,E,M,W,w,Y,U,K,L,G,l,C,F,I,J,q){if(GE.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],A!==void 0)this.set(A,E,M,W,w,Y,U,K,L,G,l,C,F,I,J,q)}set(A,E,M,W,w,Y,U,K,L,G,l,C,F,I,J,q){let D=this.elements;return D[0]=A,D[4]=E,D[8]=M,D[12]=W,D[1]=w,D[5]=Y,D[9]=U,D[13]=K,D[2]=L,D[6]=G,D[10]=l,D[14]=C,D[3]=F,D[7]=I,D[11]=J,D[15]=q,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new GE().fromArray(this.elements)}copy(A){let E=this.elements,M=A.elements;return E[0]=M[0],E[1]=M[1],E[2]=M[2],E[3]=M[3],E[4]=M[4],E[5]=M[5],E[6]=M[6],E[7]=M[7],E[8]=M[8],E[9]=M[9],E[10]=M[10],E[11]=M[11],E[12]=M[12],E[13]=M[13],E[14]=M[14],E[15]=M[15],this}copyPosition(A){let E=this.elements,M=A.elements;return E[12]=M[12],E[13]=M[13],E[14]=M[14],this}setFromMatrix3(A){let E=A.elements;return this.set(E[0],E[3],E[6],0,E[1],E[4],E[7],0,E[2],E[5],E[8],0,0,0,0,1),this}extractBasis(A,E,M){return A.setFromMatrixColumn(this,0),E.setFromMatrixColumn(this,1),M.setFromMatrixColumn(this,2),this}makeBasis(A,E,M){return this.set(A.x,E.x,M.x,0,A.y,E.y,M.y,0,A.z,E.z,M.z,0,0,0,0,1),this}extractRotation(A){let E=this.elements,M=A.elements,W=1/kY.setFromMatrixColumn(A,0).length(),w=1/kY.setFromMatrixColumn(A,1).length(),Y=1/kY.setFromMatrixColumn(A,2).length();return E[0]=M[0]*W,E[1]=M[1]*W,E[2]=M[2]*W,E[3]=0,E[4]=M[4]*w,E[5]=M[5]*w,E[6]=M[6]*w,E[7]=0,E[8]=M[8]*Y,E[9]=M[9]*Y,E[10]=M[10]*Y,E[11]=0,E[12]=0,E[13]=0,E[14]=0,E[15]=1,this}makeRotationFromEuler(A){let E=this.elements,M=A.x,W=A.y,w=A.z,Y=Math.cos(M),U=Math.sin(M),K=Math.cos(W),L=Math.sin(W),G=Math.cos(w),l=Math.sin(w);if(A.order==="XYZ"){let C=Y*G,F=Y*l,I=U*G,J=U*l;E[0]=K*G,E[4]=-K*l,E[8]=L,E[1]=F+I*L,E[5]=C-J*L,E[9]=-U*K,E[2]=J-C*L,E[6]=I+F*L,E[10]=Y*K}else if(A.order==="YXZ"){let C=K*G,F=K*l,I=L*G,J=L*l;E[0]=C+J*U,E[4]=I*U-F,E[8]=Y*L,E[1]=Y*l,E[5]=Y*G,E[9]=-U,E[2]=F*U-I,E[6]=J+C*U,E[10]=Y*K}else if(A.order==="ZXY"){let C=K*G,F=K*l,I=L*G,J=L*l;E[0]=C-J*U,E[4]=-Y*l,E[8]=I+F*U,E[1]=F+I*U,E[5]=Y*G,E[9]=J-C*U,E[2]=-Y*L,E[6]=U,E[10]=Y*K}else if(A.order==="ZYX"){let C=Y*G,F=Y*l,I=U*G,J=U*l;E[0]=K*G,E[4]=I*L-F,E[8]=C*L+J,E[1]=K*l,E[5]=J*L+C,E[9]=F*L-I,E[2]=-L,E[6]=U*K,E[10]=Y*K}else if(A.order==="YZX"){let C=Y*K,F=Y*L,I=U*K,J=U*L;E[0]=K*G,E[4]=J-C*l,E[8]=I*l+F,E[1]=l,E[5]=Y*G,E[9]=-U*G,E[2]=-L*G,E[6]=F*l+I,E[10]=C-J*l}else if(A.order==="XZY"){let C=Y*K,F=Y*L,I=U*K,J=U*L;E[0]=K*G,E[4]=-l,E[8]=L*G,E[1]=C*l+J,E[5]=Y*G,E[9]=F*l-I,E[2]=I*l-F,E[6]=U*G,E[10]=J*l+C}return E[3]=0,E[7]=0,E[11]=0,E[12]=0,E[13]=0,E[14]=0,E[15]=1,this}makeRotationFromQuaternion(A){return this.compose(EQ,A,MQ)}lookAt(A,E,M){let W=this.elements;if(QM.subVectors(A,E),QM.lengthSq()===0)QM.z=1;if(QM.normalize(),Aw.crossVectors(M,QM),Aw.lengthSq()===0){if(Math.abs(M.z)===1)QM.x+=0.0001;else QM.z+=0.0001;QM.normalize(),Aw.crossVectors(M,QM)}return Aw.normalize(),GG.crossVectors(QM,Aw),W[0]=Aw.x,W[4]=GG.x,W[8]=QM.x,W[1]=Aw.y,W[5]=GG.y,W[9]=QM.y,W[2]=Aw.z,W[6]=GG.z,W[10]=QM.z,this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,E){let M=A.elements,W=E.elements,w=this.elements,Y=M[0],U=M[4],K=M[8],L=M[12],G=M[1],l=M[5],C=M[9],F=M[13],I=M[2],J=M[6],q=M[10],D=M[14],Z=M[3],N=M[7],O=M[11],B=M[15],T=W[0],V=W[4],H=W[8],P=W[12],Q=W[1],X=W[5],S=W[9],v=W[13],b=W[2],n=W[6],a=W[10],m=W[14],_=W[3],c=W[7],GA=W[11],ZA=W[15];return w[0]=Y*T+U*Q+K*b+L*_,w[4]=Y*V+U*X+K*n+L*c,w[8]=Y*H+U*S+K*a+L*GA,w[12]=Y*P+U*v+K*m+L*ZA,w[1]=G*T+l*Q+C*b+F*_,w[5]=G*V+l*X+C*n+F*c,w[9]=G*H+l*S+C*a+F*GA,w[13]=G*P+l*v+C*m+F*ZA,w[2]=I*T+J*Q+q*b+D*_,w[6]=I*V+J*X+q*n+D*c,w[10]=I*H+J*S+q*a+D*GA,w[14]=I*P+J*v+q*m+D*ZA,w[3]=Z*T+N*Q+O*b+B*_,w[7]=Z*V+N*X+O*n+B*c,w[11]=Z*H+N*S+O*a+B*GA,w[15]=Z*P+N*v+O*m+B*ZA,this}multiplyScalar(A){let E=this.elements;return E[0]*=A,E[4]*=A,E[8]*=A,E[12]*=A,E[1]*=A,E[5]*=A,E[9]*=A,E[13]*=A,E[2]*=A,E[6]*=A,E[10]*=A,E[14]*=A,E[3]*=A,E[7]*=A,E[11]*=A,E[15]*=A,this}determinant(){let A=this.elements,E=A[0],M=A[4],W=A[8],w=A[12],Y=A[1],U=A[5],K=A[9],L=A[13],G=A[2],l=A[6],C=A[10],F=A[14],I=A[3],J=A[7],q=A[11],D=A[15];return I*(+w*K*l-W*L*l-w*U*C+M*L*C+W*U*F-M*K*F)+J*(+E*K*F-E*L*C+w*Y*C-W*Y*F+W*L*G-w*K*G)+q*(+E*L*l-E*U*F-w*Y*l+M*Y*F+w*U*G-M*L*G)+D*(-W*U*G-E*K*l+E*U*C+W*Y*l-M*Y*C+M*K*G)}transpose(){let A=this.elements,E;return E=A[1],A[1]=A[4],A[4]=E,E=A[2],A[2]=A[8],A[8]=E,E=A[6],A[6]=A[9],A[9]=E,E=A[3],A[3]=A[12],A[12]=E,E=A[7],A[7]=A[13],A[13]=E,E=A[11],A[11]=A[14],A[14]=E,this}setPosition(A,E,M){let W=this.elements;if(A.isVector3)W[12]=A.x,W[13]=A.y,W[14]=A.z;else W[12]=A,W[13]=E,W[14]=M;return this}invert(){let A=this.elements,E=A[0],M=A[1],W=A[2],w=A[3],Y=A[4],U=A[5],K=A[6],L=A[7],G=A[8],l=A[9],C=A[10],F=A[11],I=A[12],J=A[13],q=A[14],D=A[15],Z=l*q*L-J*C*L+J*K*F-U*q*F-l*K*D+U*C*D,N=I*C*L-G*q*L-I*K*F+Y*q*F+G*K*D-Y*C*D,O=G*J*L-I*l*L+I*U*F-Y*J*F-G*U*D+Y*l*D,B=I*l*K-G*J*K-I*U*C+Y*J*C+G*U*q-Y*l*q,T=E*Z+M*N+W*O+w*B;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/T;return A[0]=Z*V,A[1]=(J*C*w-l*q*w-J*W*F+M*q*F+l*W*D-M*C*D)*V,A[2]=(U*q*w-J*K*w+J*W*L-M*q*L-U*W*D+M*K*D)*V,A[3]=(l*K*w-U*C*w-l*W*L+M*C*L+U*W*F-M*K*F)*V,A[4]=N*V,A[5]=(G*q*w-I*C*w+I*W*F-E*q*F-G*W*D+E*C*D)*V,A[6]=(I*K*w-Y*q*w-I*W*L+E*q*L+Y*W*D-E*K*D)*V,A[7]=(Y*C*w-G*K*w+G*W*L-E*C*L-Y*W*F+E*K*F)*V,A[8]=O*V,A[9]=(I*l*w-G*J*w-I*M*F+E*J*F+G*M*D-E*l*D)*V,A[10]=(Y*J*w-I*U*w+I*M*L-E*J*L-Y*M*D+E*U*D)*V,A[11]=(G*U*w-Y*l*w-G*M*L+E*l*L+Y*M*F-E*U*F)*V,A[12]=B*V,A[13]=(G*J*W-I*l*W+I*M*C-E*J*C-G*M*q+E*l*q)*V,A[14]=(I*U*W-Y*J*W-I*M*K+E*J*K+Y*M*q-E*U*q)*V,A[15]=(Y*l*W-G*U*W+G*M*K-E*l*K-Y*M*C+E*U*C)*V,this}scale(A){let E=this.elements,M=A.x,W=A.y,w=A.z;return E[0]*=M,E[4]*=W,E[8]*=w,E[1]*=M,E[5]*=W,E[9]*=w,E[2]*=M,E[6]*=W,E[10]*=w,E[3]*=M,E[7]*=W,E[11]*=w,this}getMaxScaleOnAxis(){let A=this.elements,E=A[0]*A[0]+A[1]*A[1]+A[2]*A[2],M=A[4]*A[4]+A[5]*A[5]+A[6]*A[6],W=A[8]*A[8]+A[9]*A[9]+A[10]*A[10];return Math.sqrt(Math.max(E,M,W))}makeTranslation(A,E,M){if(A.isVector3)this.set(1,0,0,A.x,0,1,0,A.y,0,0,1,A.z,0,0,0,1);else this.set(1,0,0,A,0,1,0,E,0,0,1,M,0,0,0,1);return this}makeRotationX(A){let E=Math.cos(A),M=Math.sin(A);return this.set(1,0,0,0,0,E,-M,0,0,M,E,0,0,0,0,1),this}makeRotationY(A){let E=Math.cos(A),M=Math.sin(A);return this.set(E,0,M,0,0,1,0,0,-M,0,E,0,0,0,0,1),this}makeRotationZ(A){let E=Math.cos(A),M=Math.sin(A);return this.set(E,-M,0,0,M,E,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(A,E){let M=Math.cos(E),W=Math.sin(E),w=1-M,Y=A.x,U=A.y,K=A.z,L=w*Y,G=w*U;return this.set(L*Y+M,L*U-W*K,L*K+W*U,0,L*U+W*K,G*U+M,G*K-W*Y,0,L*K-W*U,G*K+W*Y,w*K*K+M,0,0,0,0,1),this}makeScale(A,E,M){return this.set(A,0,0,0,0,E,0,0,0,0,M,0,0,0,0,1),this}makeShear(A,E,M,W,w,Y){return this.set(1,M,w,0,A,1,Y,0,E,W,1,0,0,0,0,1),this}compose(A,E,M){let W=this.elements,w=E._x,Y=E._y,U=E._z,K=E._w,L=w+w,G=Y+Y,l=U+U,C=w*L,F=w*G,I=w*l,J=Y*G,q=Y*l,D=U*l,Z=K*L,N=K*G,O=K*l,B=M.x,T=M.y,V=M.z;return W[0]=(1-(J+D))*B,W[1]=(F+O)*B,W[2]=(I-N)*B,W[3]=0,W[4]=(F-O)*T,W[5]=(1-(C+D))*T,W[6]=(q+Z)*T,W[7]=0,W[8]=(I+N)*V,W[9]=(q-Z)*V,W[10]=(1-(C+J))*V,W[11]=0,W[12]=A.x,W[13]=A.y,W[14]=A.z,W[15]=1,this}decompose(A,E,M){let W=this.elements,w=kY.set(W[0],W[1],W[2]).length(),Y=kY.set(W[4],W[5],W[6]).length(),U=kY.set(W[8],W[9],W[10]).length();if(this.determinant()<0)w=-w;A.x=W[12],A.y=W[13],A.z=W[14],sM.copy(this);let L=1/w,G=1/Y,l=1/U;return sM.elements[0]*=L,sM.elements[1]*=L,sM.elements[2]*=L,sM.elements[4]*=G,sM.elements[5]*=G,sM.elements[6]*=G,sM.elements[8]*=l,sM.elements[9]*=l,sM.elements[10]*=l,E.setFromRotationMatrix(sM),M.x=w,M.y=Y,M.z=U,this}makePerspective(A,E,M,W,w,Y,U=2000){let K=this.elements,L=2*w/(E-A),G=2*w/(M-W),l=(E+A)/(E-A),C=(M+W)/(M-W),F,I;if(U===2000)F=-(Y+w)/(Y-w),I=-2*Y*w/(Y-w);else if(U===2001)F=-Y/(Y-w),I=-Y*w/(Y-w);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+U);return K[0]=L,K[4]=0,K[8]=l,K[12]=0,K[1]=0,K[5]=G,K[9]=C,K[13]=0,K[2]=0,K[6]=0,K[10]=F,K[14]=I,K[3]=0,K[7]=0,K[11]=-1,K[15]=0,this}makeOrthographic(A,E,M,W,w,Y,U=2000){let K=this.elements,L=1/(E-A),G=1/(M-W),l=1/(Y-w),C=(E+A)*L,F=(M+W)*G,I,J;if(U===2000)I=(Y+w)*l,J=-2*l;else if(U===2001)I=w*l,J=-1*l;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+U);return K[0]=2*L,K[4]=0,K[8]=0,K[12]=-C,K[1]=0,K[5]=2*G,K[9]=0,K[13]=-F,K[2]=0,K[6]=0,K[10]=J,K[14]=-I,K[3]=0,K[7]=0,K[11]=0,K[15]=1,this}equals(A){let E=this.elements,M=A.elements;for(let W=0;W<16;W++)if(E[W]!==M[W])return!1;return!0}fromArray(A,E=0){for(let M=0;M<16;M++)this.elements[M]=A[M+E];return this}toArray(A=[],E=0){let M=this.elements;return A[E]=M[0],A[E+1]=M[1],A[E+2]=M[2],A[E+3]=M[3],A[E+4]=M[4],A[E+5]=M[5],A[E+6]=M[6],A[E+7]=M[7],A[E+8]=M[8],A[E+9]=M[9],A[E+10]=M[10],A[E+11]=M[11],A[E+12]=M[12],A[E+13]=M[13],A[E+14]=M[14],A[E+15]=M[15],A}}var kY=new f,sM=new GE,EQ=new f(0,0,0),MQ=new f(1,1,1),Aw=new f,GG=new f,QM=new f,u5=new GE,h5=new aM;class wW{constructor(A=0,E=0,M=0,W=wW.DEFAULT_ORDER){this.isEuler=!0,this._x=A,this._y=E,this._z=M,this._order=W}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get order(){return this._order}set order(A){this._order=A,this._onChangeCallback()}set(A,E,M,W=this._order){return this._x=A,this._y=E,this._z=M,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(A){return this._x=A._x,this._y=A._y,this._z=A._z,this._order=A._order,this._onChangeCallback(),this}setFromRotationMatrix(A,E=this._order,M=!0){let W=A.elements,w=W[0],Y=W[4],U=W[8],K=W[1],L=W[5],G=W[9],l=W[2],C=W[6],F=W[10];switch(E){case"XYZ":if(this._y=Math.asin(pA(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(-G,F),this._z=Math.atan2(-Y,w);else this._x=Math.atan2(C,L),this._z=0;break;case"YXZ":if(this._x=Math.asin(-pA(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(U,F),this._z=Math.atan2(K,L);else this._y=Math.atan2(-l,w),this._z=0;break;case"ZXY":if(this._x=Math.asin(pA(C,-1,1)),Math.abs(C)<0.9999999)this._y=Math.atan2(-l,F),this._z=Math.atan2(-Y,L);else this._y=0,this._z=Math.atan2(K,w);break;case"ZYX":if(this._y=Math.asin(-pA(l,-1,1)),Math.abs(l)<0.9999999)this._x=Math.atan2(C,F),this._z=Math.atan2(K,w);else this._x=0,this._z=Math.atan2(-Y,L);break;case"YZX":if(this._z=Math.asin(pA(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(-G,L),this._y=Math.atan2(-l,w);else this._x=0,this._y=Math.atan2(U,F);break;case"XZY":if(this._z=Math.asin(-pA(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(C,L),this._y=Math.atan2(U,w);else this._x=Math.atan2(-G,F),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+E)}if(this._order=E,M===!0)this._onChangeCallback();return this}setFromQuaternion(A,E,M){return u5.makeRotationFromQuaternion(A),this.setFromRotationMatrix(u5,E,M)}setFromVector3(A,E=this._order){return this.set(A.x,A.y,A.z,E)}reorder(A){return h5.setFromEuler(this),this.setFromQuaternion(h5,A)}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._order===this._order}fromArray(A){if(this._x=A[0],this._y=A[1],this._z=A[2],A[3]!==void 0)this._order=A[3];return this._onChangeCallback(),this}toArray(A=[],E=0){return A[E]=this._x,A[E+1]=this._y,A[E+2]=this._z,A[E+3]=this._order,A}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wW.DEFAULT_ORDER="XYZ";class rG{constructor(){this.mask=1}set(A){this.mask=(1<<A|0)>>>0}enable(A){this.mask|=1<<A|0}enableAll(){this.mask=-1}toggle(A){this.mask^=1<<A|0}disable(A){this.mask&=~(1<<A|0)}disableAll(){this.mask=0}test(A){return(this.mask&A.mask)!==0}isEnabled(A){return(this.mask&(1<<A|0))!==0}}var WQ=0,f5=new f,xY=new aM,RW=new GE,ZG=new f,WK=new f,wQ=new f,YQ=new aM,j5=new f(1,0,0),v5=new f(0,1,0),g5=new f(0,0,1),p5={type:"added"},UQ={type:"removed"},PY={type:"childadded",child:null},$8={type:"childremoved",child:null};class kE extends TW{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:WQ++}),this.uuid=aY(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kE.DEFAULT_UP.clone();let A=new f,E=new wW,M=new aM,W=new f(1,1,1);function w(){M.setFromEuler(E,!1)}function Y(){E.setFromQuaternion(M,void 0,!1)}E._onChange(w),M._onChange(Y),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:A},rotation:{configurable:!0,enumerable:!0,value:E},quaternion:{configurable:!0,enumerable:!0,value:M},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new GE},normalMatrix:{value:new PA}}),this.matrix=new GE,this.matrixWorld=new GE,this.matrixAutoUpdate=kE.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kE.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rG,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(A){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(A),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(A){return this.quaternion.premultiply(A),this}setRotationFromAxisAngle(A,E){this.quaternion.setFromAxisAngle(A,E)}setRotationFromEuler(A){this.quaternion.setFromEuler(A,!0)}setRotationFromMatrix(A){this.quaternion.setFromRotationMatrix(A)}setRotationFromQuaternion(A){this.quaternion.copy(A)}rotateOnAxis(A,E){return xY.setFromAxisAngle(A,E),this.quaternion.multiply(xY),this}rotateOnWorldAxis(A,E){return xY.setFromAxisAngle(A,E),this.quaternion.premultiply(xY),this}rotateX(A){return this.rotateOnAxis(j5,A)}rotateY(A){return this.rotateOnAxis(v5,A)}rotateZ(A){return this.rotateOnAxis(g5,A)}translateOnAxis(A,E){return f5.copy(A).applyQuaternion(this.quaternion),this.position.add(f5.multiplyScalar(E)),this}translateX(A){return this.translateOnAxis(j5,A)}translateY(A){return this.translateOnAxis(v5,A)}translateZ(A){return this.translateOnAxis(g5,A)}localToWorld(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(this.matrixWorld)}worldToLocal(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(RW.copy(this.matrixWorld).invert())}lookAt(A,E,M){if(A.isVector3)ZG.copy(A);else ZG.set(A,E,M);let W=this.parent;if(this.updateWorldMatrix(!0,!1),WK.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)RW.lookAt(WK,ZG,this.up);else RW.lookAt(ZG,WK,this.up);if(this.quaternion.setFromRotationMatrix(RW),W)RW.extractRotation(W.matrixWorld),xY.setFromRotationMatrix(RW),this.quaternion.premultiply(xY.invert())}add(A){if(arguments.length>1){for(let E=0;E<arguments.length;E++)this.add(arguments[E]);return this}if(A===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",A),this;if(A&&A.isObject3D)A.removeFromParent(),A.parent=this,this.children.push(A),A.dispatchEvent(p5),PY.child=A,this.dispatchEvent(PY),PY.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",A);return this}remove(A){if(arguments.length>1){for(let M=0;M<arguments.length;M++)this.remove(arguments[M]);return this}let E=this.children.indexOf(A);if(E!==-1)A.parent=null,this.children.splice(E,1),A.dispatchEvent(UQ),$8.child=A,this.dispatchEvent($8),$8.child=null;return this}removeFromParent(){let A=this.parent;if(A!==null)A.remove(this);return this}clear(){return this.remove(...this.children)}attach(A){if(this.updateWorldMatrix(!0,!1),RW.copy(this.matrixWorld).invert(),A.parent!==null)A.parent.updateWorldMatrix(!0,!1),RW.multiply(A.parent.matrixWorld);return A.applyMatrix4(RW),A.removeFromParent(),A.parent=this,this.children.push(A),A.updateWorldMatrix(!1,!0),A.dispatchEvent(p5),PY.child=A,this.dispatchEvent(PY),PY.child=null,this}getObjectById(A){return this.getObjectByProperty("id",A)}getObjectByName(A){return this.getObjectByProperty("name",A)}getObjectByProperty(A,E){if(this[A]===E)return this;for(let M=0,W=this.children.length;M<W;M++){let Y=this.children[M].getObjectByProperty(A,E);if(Y!==void 0)return Y}return}getObjectsByProperty(A,E,M=[]){if(this[A]===E)M.push(this);let W=this.children;for(let w=0,Y=W.length;w<Y;w++)W[w].getObjectsByProperty(A,E,M);return M}getWorldPosition(A){return this.updateWorldMatrix(!0,!1),A.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(WK,A,wQ),A}getWorldScale(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(WK,YQ,A),A}getWorldDirection(A){this.updateWorldMatrix(!0,!1);let E=this.matrixWorld.elements;return A.set(E[8],E[9],E[10]).normalize()}raycast(){}traverse(A){A(this);let E=this.children;for(let M=0,W=E.length;M<W;M++)E[M].traverse(A)}traverseVisible(A){if(this.visible===!1)return;A(this);let E=this.children;for(let M=0,W=E.length;M<W;M++)E[M].traverseVisible(A)}traverseAncestors(A){let E=this.parent;if(E!==null)A(E),E.traverseAncestors(A)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(A){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||A){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,A=!0}let E=this.children;for(let M=0,W=E.length;M<W;M++)E[M].updateMatrixWorld(A)}updateWorldMatrix(A,E){let M=this.parent;if(A===!0&&M!==null)M.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(E===!0){let W=this.children;for(let w=0,Y=W.length;w<Y;w++)W[w].updateWorldMatrix(!1,!0)}}toJSON(A){let E=A===void 0||typeof A==="string",M={};if(E)A={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},M.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,this.name!=="")W.name=this.name;if(this.castShadow===!0)W.castShadow=!0;if(this.receiveShadow===!0)W.receiveShadow=!0;if(this.visible===!1)W.visible=!1;if(this.frustumCulled===!1)W.frustumCulled=!1;if(this.renderOrder!==0)W.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.matrixAutoUpdate===!1)W.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.visibility=this._visibility,W.active=this._active,W.bounds=this._bounds.map((U)=>({boxInitialized:U.boxInitialized,boxMin:U.box.min.toArray(),boxMax:U.box.max.toArray(),sphereInitialized:U.sphereInitialized,sphereRadius:U.sphere.radius,sphereCenter:U.sphere.center.toArray()})),W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.geometryCount=this._geometryCount,W.matricesTexture=this._matricesTexture.toJSON(A),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(A);if(this.boundingSphere!==null)W.boundingSphere={center:W.boundingSphere.center.toArray(),radius:W.boundingSphere.radius};if(this.boundingBox!==null)W.boundingBox={min:W.boundingBox.min.toArray(),max:W.boundingBox.max.toArray()}}function w(U,K){if(U[K.uuid]===void 0)U[K.uuid]=K.toJSON(A);return K.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(A).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(A).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=w(A.geometries,this.geometry);let U=this.geometry.parameters;if(U!==void 0&&U.shapes!==void 0){let K=U.shapes;if(Array.isArray(K))for(let L=0,G=K.length;L<G;L++){let l=K[L];w(A.shapes,l)}else w(A.shapes,K)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)w(A.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let U=[];for(let K=0,L=this.material.length;K<L;K++)U.push(w(A.materials,this.material[K]));W.material=U}else W.material=w(A.materials,this.material);if(this.children.length>0){W.children=[];for(let U=0;U<this.children.length;U++)W.children.push(this.children[U].toJSON(A).object)}if(this.animations.length>0){W.animations=[];for(let U=0;U<this.animations.length;U++){let K=this.animations[U];W.animations.push(w(A.animations,K))}}if(E){let U=Y(A.geometries),K=Y(A.materials),L=Y(A.textures),G=Y(A.images),l=Y(A.shapes),C=Y(A.skeletons),F=Y(A.animations),I=Y(A.nodes);if(U.length>0)M.geometries=U;if(K.length>0)M.materials=K;if(L.length>0)M.textures=L;if(G.length>0)M.images=G;if(l.length>0)M.shapes=l;if(C.length>0)M.skeletons=C;if(F.length>0)M.animations=F;if(I.length>0)M.nodes=I}return M.object=W,M;function Y(U){let K=[];for(let L in U){let G=U[L];delete G.metadata,K.push(G)}return K}}clone(A){return new this.constructor().copy(this,A)}copy(A,E=!0){if(this.name=A.name,this.up.copy(A.up),this.position.copy(A.position),this.rotation.order=A.rotation.order,this.quaternion.copy(A.quaternion),this.scale.copy(A.scale),this.matrix.copy(A.matrix),this.matrixWorld.copy(A.matrixWorld),this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrixWorldAutoUpdate=A.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=A.matrixWorldNeedsUpdate,this.layers.mask=A.layers.mask,this.visible=A.visible,this.castShadow=A.castShadow,this.receiveShadow=A.receiveShadow,this.frustumCulled=A.frustumCulled,this.renderOrder=A.renderOrder,this.animations=A.animations.slice(),this.userData=JSON.parse(JSON.stringify(A.userData)),E===!0)for(let M=0;M<A.children.length;M++){let W=A.children[M];this.add(W.clone())}return this}}kE.DEFAULT_UP=new f(0,1,0);kE.DEFAULT_MATRIX_AUTO_UPDATE=!0;kE.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var oM=new f,BW=new f,_8=new f,VW=new f,uY=new f,hY=new f,b5=new f,e8=new f,AC=new f,EC=new f,MC=new NE,WC=new NE,wC=new NE;class hM{constructor(A=new f,E=new f,M=new f){this.a=A,this.b=E,this.c=M}static getNormal(A,E,M,W){W.subVectors(M,E),oM.subVectors(A,E),W.cross(oM);let w=W.lengthSq();if(w>0)return W.multiplyScalar(1/Math.sqrt(w));return W.set(0,0,0)}static getBarycoord(A,E,M,W,w){oM.subVectors(W,E),BW.subVectors(M,E),_8.subVectors(A,E);let Y=oM.dot(oM),U=oM.dot(BW),K=oM.dot(_8),L=BW.dot(BW),G=BW.dot(_8),l=Y*L-U*U;if(l===0)return w.set(0,0,0),null;let C=1/l,F=(L*K-U*G)*C,I=(Y*G-U*K)*C;return w.set(1-F-I,I,F)}static containsPoint(A,E,M,W){if(this.getBarycoord(A,E,M,W,VW)===null)return!1;return VW.x>=0&&VW.y>=0&&VW.x+VW.y<=1}static getInterpolation(A,E,M,W,w,Y,U,K){if(this.getBarycoord(A,E,M,W,VW)===null){if(K.x=0,K.y=0,"z"in K)K.z=0;if("w"in K)K.w=0;return null}return K.setScalar(0),K.addScaledVector(w,VW.x),K.addScaledVector(Y,VW.y),K.addScaledVector(U,VW.z),K}static getInterpolatedAttribute(A,E,M,W,w,Y){return MC.setScalar(0),WC.setScalar(0),wC.setScalar(0),MC.fromBufferAttribute(A,E),WC.fromBufferAttribute(A,M),wC.fromBufferAttribute(A,W),Y.setScalar(0),Y.addScaledVector(MC,w.x),Y.addScaledVector(WC,w.y),Y.addScaledVector(wC,w.z),Y}static isFrontFacing(A,E,M,W){return oM.subVectors(M,E),BW.subVectors(A,E),oM.cross(BW).dot(W)<0?!0:!1}set(A,E,M){return this.a.copy(A),this.b.copy(E),this.c.copy(M),this}setFromPointsAndIndices(A,E,M,W){return this.a.copy(A[E]),this.b.copy(A[M]),this.c.copy(A[W]),this}setFromAttributeAndIndices(A,E,M,W){return this.a.fromBufferAttribute(A,E),this.b.fromBufferAttribute(A,M),this.c.fromBufferAttribute(A,W),this}clone(){return new this.constructor().copy(this)}copy(A){return this.a.copy(A.a),this.b.copy(A.b),this.c.copy(A.c),this}getArea(){return oM.subVectors(this.c,this.b),BW.subVectors(this.a,this.b),oM.cross(BW).length()*0.5}getMidpoint(A){return A.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(A){return hM.getNormal(this.a,this.b,this.c,A)}getPlane(A){return A.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(A,E){return hM.getBarycoord(A,this.a,this.b,this.c,E)}getInterpolation(A,E,M,W,w){return hM.getInterpolation(A,this.a,this.b,this.c,E,M,W,w)}containsPoint(A){return hM.containsPoint(A,this.a,this.b,this.c)}isFrontFacing(A){return hM.isFrontFacing(this.a,this.b,this.c,A)}intersectsBox(A){return A.intersectsTriangle(this)}closestPointToPoint(A,E){let M=this.a,W=this.b,w=this.c,Y,U;uY.subVectors(W,M),hY.subVectors(w,M),e8.subVectors(A,M);let K=uY.dot(e8),L=hY.dot(e8);if(K<=0&&L<=0)return E.copy(M);AC.subVectors(A,W);let G=uY.dot(AC),l=hY.dot(AC);if(G>=0&&l<=G)return E.copy(W);let C=K*l-G*L;if(C<=0&&K>=0&&G<=0)return Y=K/(K-G),E.copy(M).addScaledVector(uY,Y);EC.subVectors(A,w);let F=uY.dot(EC),I=hY.dot(EC);if(I>=0&&F<=I)return E.copy(w);let J=F*L-K*I;if(J<=0&&L>=0&&I<=0)return U=L/(L-I),E.copy(M).addScaledVector(hY,U);let q=G*I-F*l;if(q<=0&&l-G>=0&&F-I>=0)return b5.subVectors(w,W),U=(l-G)/(l-G+(F-I)),E.copy(W).addScaledVector(b5,U);let D=1/(q+J+C);return Y=J*D,U=C*D,E.copy(M).addScaledVector(uY,Y).addScaledVector(hY,U)}equals(A){return A.a.equals(this.a)&&A.b.equals(this.b)&&A.c.equals(this.c)}}var YN={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ew={h:0,s:0,l:0},lG={h:0,s:0,l:0};function YC(A,E,M){if(M<0)M+=1;if(M>1)M-=1;if(M<0.16666666666666666)return A+(E-A)*6*M;if(M<0.5)return E;if(M<0.6666666666666666)return A+(E-A)*6*(0.6666666666666666-M);return A}class mA{constructor(A,E,M){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(A,E,M)}set(A,E,M){if(E===void 0&&M===void 0){let W=A;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(A,E,M);return this}setScalar(A){return this.r=A,this.g=A,this.b=A,this}setHex(A,E="srgb"){return A=Math.floor(A),this.r=(A>>16&255)/255,this.g=(A>>8&255)/255,this.b=(A&255)/255,oA.toWorkingColorSpace(this,E),this}setRGB(A,E,M,W=oA.workingColorSpace){return this.r=A,this.g=E,this.b=M,oA.toWorkingColorSpace(this,W),this}setHSL(A,E,M,W=oA.workingColorSpace){if(A=eC(A,1),E=pA(E,0,1),M=pA(M,0,1),E===0)this.r=this.g=this.b=M;else{let w=M<=0.5?M*(1+E):M+E-M*E,Y=2*M-w;this.r=YC(Y,w,A+0.3333333333333333),this.g=YC(Y,w,A),this.b=YC(Y,w,A-0.3333333333333333)}return oA.toWorkingColorSpace(this,W),this}setStyle(A,E="srgb"){function M(w){if(w===void 0)return;if(parseFloat(w)<1)console.warn("THREE.Color: Alpha component of "+A+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(A)){let w,Y=W[1],U=W[2];switch(Y){case"rgb":case"rgba":if(w=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(U))return M(w[4]),this.setRGB(Math.min(255,parseInt(w[1],10))/255,Math.min(255,parseInt(w[2],10))/255,Math.min(255,parseInt(w[3],10))/255,E);if(w=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(U))return M(w[4]),this.setRGB(Math.min(100,parseInt(w[1],10))/100,Math.min(100,parseInt(w[2],10))/100,Math.min(100,parseInt(w[3],10))/100,E);break;case"hsl":case"hsla":if(w=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(U))return M(w[4]),this.setHSL(parseFloat(w[1])/360,parseFloat(w[2])/100,parseFloat(w[3])/100,E);break;default:console.warn("THREE.Color: Unknown color model "+A)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(A)){let w=W[1],Y=w.length;if(Y===3)return this.setRGB(parseInt(w.charAt(0),16)/15,parseInt(w.charAt(1),16)/15,parseInt(w.charAt(2),16)/15,E);else if(Y===6)return this.setHex(parseInt(w,16),E);else console.warn("THREE.Color: Invalid hex color "+A)}else if(A&&A.length>0)return this.setColorName(A,E);return this}setColorName(A,E="srgb"){let M=YN[A.toLowerCase()];if(M!==void 0)this.setHex(M,E);else console.warn("THREE.Color: Unknown color "+A);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(A){return this.r=A.r,this.g=A.g,this.b=A.b,this}copySRGBToLinear(A){return this.r=HW(A.r),this.g=HW(A.g),this.b=HW(A.b),this}copyLinearToSRGB(A){return this.r=pY(A.r),this.g=pY(A.g),this.b=pY(A.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(A="srgb"){return oA.fromWorkingColorSpace(tE.copy(this),A),Math.round(pA(tE.r*255,0,255))*65536+Math.round(pA(tE.g*255,0,255))*256+Math.round(pA(tE.b*255,0,255))}getHexString(A="srgb"){return("000000"+this.getHex(A).toString(16)).slice(-6)}getHSL(A,E=oA.workingColorSpace){oA.fromWorkingColorSpace(tE.copy(this),E);let{r:M,g:W,b:w}=tE,Y=Math.max(M,W,w),U=Math.min(M,W,w),K,L,G=(U+Y)/2;if(U===Y)K=0,L=0;else{let l=Y-U;switch(L=G<=0.5?l/(Y+U):l/(2-Y-U),Y){case M:K=(W-w)/l+(W<w?6:0);break;case W:K=(w-M)/l+2;break;case w:K=(M-W)/l+4;break}K/=6}return A.h=K,A.s=L,A.l=G,A}getRGB(A,E=oA.workingColorSpace){return oA.fromWorkingColorSpace(tE.copy(this),E),A.r=tE.r,A.g=tE.g,A.b=tE.b,A}getStyle(A="srgb"){oA.fromWorkingColorSpace(tE.copy(this),A);let{r:E,g:M,b:W}=tE;if(A!=="srgb")return`color(${A} ${E.toFixed(3)} ${M.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(E*255)},${Math.round(M*255)},${Math.round(W*255)})`}offsetHSL(A,E,M){return this.getHSL(Ew),this.setHSL(Ew.h+A,Ew.s+E,Ew.l+M)}add(A){return this.r+=A.r,this.g+=A.g,this.b+=A.b,this}addColors(A,E){return this.r=A.r+E.r,this.g=A.g+E.g,this.b=A.b+E.b,this}addScalar(A){return this.r+=A,this.g+=A,this.b+=A,this}sub(A){return this.r=Math.max(0,this.r-A.r),this.g=Math.max(0,this.g-A.g),this.b=Math.max(0,this.b-A.b),this}multiply(A){return this.r*=A.r,this.g*=A.g,this.b*=A.b,this}multiplyScalar(A){return this.r*=A,this.g*=A,this.b*=A,this}lerp(A,E){return this.r+=(A.r-this.r)*E,this.g+=(A.g-this.g)*E,this.b+=(A.b-this.b)*E,this}lerpColors(A,E,M){return this.r=A.r+(E.r-A.r)*M,this.g=A.g+(E.g-A.g)*M,this.b=A.b+(E.b-A.b)*M,this}lerpHSL(A,E){this.getHSL(Ew),A.getHSL(lG);let M=KK(Ew.h,lG.h,E),W=KK(Ew.s,lG.s,E),w=KK(Ew.l,lG.l,E);return this.setHSL(M,W,w),this}setFromVector3(A){return this.r=A.x,this.g=A.y,this.b=A.z,this}applyMatrix3(A){let E=this.r,M=this.g,W=this.b,w=A.elements;return this.r=w[0]*E+w[3]*M+w[6]*W,this.g=w[1]*E+w[4]*M+w[7]*W,this.b=w[2]*E+w[5]*M+w[8]*W,this}equals(A){return A.r===this.r&&A.g===this.g&&A.b===this.b}fromArray(A,E=0){return this.r=A[E],this.g=A[E+1],this.b=A[E+2],this}toArray(A=[],E=0){return A[E]=this.r,A[E+1]=this.g,A[E+2]=this.b,A}fromBufferAttribute(A,E){return this.r=A.getX(E),this.g=A.getY(E),this.b=A.getZ(E),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var tE=new mA;mA.NAMES=YN;var KQ=0;class Lw extends TW{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:KQ++}),this.uuid=aY(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mA(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(A){if(this._alphaTest>0!==A>0)this.version++;this._alphaTest=A}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(A){if(A===void 0)return;for(let E in A){let M=A[E];if(M===void 0){console.warn(`THREE.Material: parameter '${E}' has value of undefined.`);continue}let W=this[E];if(W===void 0){console.warn(`THREE.Material: '${E}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set(M);else if(W&&W.isVector3&&(M&&M.isVector3))W.copy(M);else this[E]=M}}toJSON(A){let E=A===void 0||typeof A==="string";if(E)A={textures:{},images:{}};let M={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(M.uuid=this.uuid,M.type=this.type,this.name!=="")M.name=this.name;if(this.color&&this.color.isColor)M.color=this.color.getHex();if(this.roughness!==void 0)M.roughness=this.roughness;if(this.metalness!==void 0)M.metalness=this.metalness;if(this.sheen!==void 0)M.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)M.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)M.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)M.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)M.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)M.specular=this.specular.getHex();if(this.specularIntensity!==void 0)M.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)M.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)M.shininess=this.shininess;if(this.clearcoat!==void 0)M.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)M.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)M.clearcoatMap=this.clearcoatMap.toJSON(A).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)M.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(A).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)M.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(A).uuid,M.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.dispersion!==void 0)M.dispersion=this.dispersion;if(this.iridescence!==void 0)M.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)M.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)M.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)M.iridescenceMap=this.iridescenceMap.toJSON(A).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)M.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(A).uuid;if(this.anisotropy!==void 0)M.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)M.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)M.anisotropyMap=this.anisotropyMap.toJSON(A).uuid;if(this.map&&this.map.isTexture)M.map=this.map.toJSON(A).uuid;if(this.matcap&&this.matcap.isTexture)M.matcap=this.matcap.toJSON(A).uuid;if(this.alphaMap&&this.alphaMap.isTexture)M.alphaMap=this.alphaMap.toJSON(A).uuid;if(this.lightMap&&this.lightMap.isTexture)M.lightMap=this.lightMap.toJSON(A).uuid,M.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)M.aoMap=this.aoMap.toJSON(A).uuid,M.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)M.bumpMap=this.bumpMap.toJSON(A).uuid,M.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)M.normalMap=this.normalMap.toJSON(A).uuid,M.normalMapType=this.normalMapType,M.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)M.displacementMap=this.displacementMap.toJSON(A).uuid,M.displacementScale=this.displacementScale,M.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)M.roughnessMap=this.roughnessMap.toJSON(A).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)M.metalnessMap=this.metalnessMap.toJSON(A).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)M.emissiveMap=this.emissiveMap.toJSON(A).uuid;if(this.specularMap&&this.specularMap.isTexture)M.specularMap=this.specularMap.toJSON(A).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)M.specularIntensityMap=this.specularIntensityMap.toJSON(A).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)M.specularColorMap=this.specularColorMap.toJSON(A).uuid;if(this.envMap&&this.envMap.isTexture){if(M.envMap=this.envMap.toJSON(A).uuid,this.combine!==void 0)M.combine=this.combine}if(this.envMapRotation!==void 0)M.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)M.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)M.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)M.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)M.gradientMap=this.gradientMap.toJSON(A).uuid;if(this.transmission!==void 0)M.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)M.transmissionMap=this.transmissionMap.toJSON(A).uuid;if(this.thickness!==void 0)M.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)M.thicknessMap=this.thicknessMap.toJSON(A).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)M.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)M.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)M.size=this.size;if(this.shadowSide!==null)M.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)M.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)M.blending=this.blending;if(this.side!==0)M.side=this.side;if(this.vertexColors===!0)M.vertexColors=!0;if(this.opacity<1)M.opacity=this.opacity;if(this.transparent===!0)M.transparent=!0;if(this.blendSrc!==204)M.blendSrc=this.blendSrc;if(this.blendDst!==205)M.blendDst=this.blendDst;if(this.blendEquation!==100)M.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)M.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)M.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)M.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)M.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)M.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)M.depthFunc=this.depthFunc;if(this.depthTest===!1)M.depthTest=this.depthTest;if(this.depthWrite===!1)M.depthWrite=this.depthWrite;if(this.colorWrite===!1)M.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)M.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)M.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)M.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)M.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)M.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)M.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)M.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)M.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)M.rotation=this.rotation;if(this.polygonOffset===!0)M.polygonOffset=!0;if(this.polygonOffsetFactor!==0)M.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)M.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)M.linewidth=this.linewidth;if(this.dashSize!==void 0)M.dashSize=this.dashSize;if(this.gapSize!==void 0)M.gapSize=this.gapSize;if(this.scale!==void 0)M.scale=this.scale;if(this.dithering===!0)M.dithering=!0;if(this.alphaTest>0)M.alphaTest=this.alphaTest;if(this.alphaHash===!0)M.alphaHash=!0;if(this.alphaToCoverage===!0)M.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)M.premultipliedAlpha=!0;if(this.forceSinglePass===!0)M.forceSinglePass=!0;if(this.wireframe===!0)M.wireframe=!0;if(this.wireframeLinewidth>1)M.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")M.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")M.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)M.flatShading=!0;if(this.visible===!1)M.visible=!1;if(this.toneMapped===!1)M.toneMapped=!1;if(this.fog===!1)M.fog=!1;if(Object.keys(this.userData).length>0)M.userData=this.userData;function W(w){let Y=[];for(let U in w){let K=w[U];delete K.metadata,Y.push(K)}return Y}if(E){let w=W(A.textures),Y=W(A.images);if(w.length>0)M.textures=w;if(Y.length>0)M.images=Y}return M}clone(){return new this.constructor().copy(this)}copy(A){this.name=A.name,this.blending=A.blending,this.side=A.side,this.vertexColors=A.vertexColors,this.opacity=A.opacity,this.transparent=A.transparent,this.blendSrc=A.blendSrc,this.blendDst=A.blendDst,this.blendEquation=A.blendEquation,this.blendSrcAlpha=A.blendSrcAlpha,this.blendDstAlpha=A.blendDstAlpha,this.blendEquationAlpha=A.blendEquationAlpha,this.blendColor.copy(A.blendColor),this.blendAlpha=A.blendAlpha,this.depthFunc=A.depthFunc,this.depthTest=A.depthTest,this.depthWrite=A.depthWrite,this.stencilWriteMask=A.stencilWriteMask,this.stencilFunc=A.stencilFunc,this.stencilRef=A.stencilRef,this.stencilFuncMask=A.stencilFuncMask,this.stencilFail=A.stencilFail,this.stencilZFail=A.stencilZFail,this.stencilZPass=A.stencilZPass,this.stencilWrite=A.stencilWrite;let E=A.clippingPlanes,M=null;if(E!==null){let W=E.length;M=Array(W);for(let w=0;w!==W;++w)M[w]=E[w].clone()}return this.clippingPlanes=M,this.clipIntersection=A.clipIntersection,this.clipShadows=A.clipShadows,this.shadowSide=A.shadowSide,this.colorWrite=A.colorWrite,this.precision=A.precision,this.polygonOffset=A.polygonOffset,this.polygonOffsetFactor=A.polygonOffsetFactor,this.polygonOffsetUnits=A.polygonOffsetUnits,this.dithering=A.dithering,this.alphaTest=A.alphaTest,this.alphaHash=A.alphaHash,this.alphaToCoverage=A.alphaToCoverage,this.premultipliedAlpha=A.premultipliedAlpha,this.forceSinglePass=A.forceSinglePass,this.visible=A.visible,this.toneMapped=A.toneMapped,this.userData=JSON.parse(JSON.stringify(A.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(A){if(A===!0)this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class tY extends Lw{constructor(A){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mA(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wW,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.lightMap=A.lightMap,this.lightMapIntensity=A.lightMapIntensity,this.aoMap=A.aoMap,this.aoMapIntensity=A.aoMapIntensity,this.specularMap=A.specularMap,this.alphaMap=A.alphaMap,this.envMap=A.envMap,this.envMapRotation.copy(A.envMapRotation),this.combine=A.combine,this.reflectivity=A.reflectivity,this.refractionRatio=A.refractionRatio,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.wireframeLinecap=A.wireframeLinecap,this.wireframeLinejoin=A.wireframeLinejoin,this.fog=A.fog,this}}var HE=new f,CG=new xA;class fM{constructor(A,E,M=!1){if(Array.isArray(A))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=A,this.itemSize=E,this.count=A!==void 0?A.length/E:0,this.normalized=M,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(A){if(A===!0)this.version++}setUsage(A){return this.usage=A,this}addUpdateRange(A,E){this.updateRanges.push({start:A,count:E})}clearUpdateRanges(){this.updateRanges.length=0}copy(A){return this.name=A.name,this.array=new A.array.constructor(A.array),this.itemSize=A.itemSize,this.count=A.count,this.normalized=A.normalized,this.usage=A.usage,this.gpuType=A.gpuType,this}copyAt(A,E,M){A*=this.itemSize,M*=E.itemSize;for(let W=0,w=this.itemSize;W<w;W++)this.array[A+W]=E.array[M+W];return this}copyArray(A){return this.array.set(A),this}applyMatrix3(A){if(this.itemSize===2)for(let E=0,M=this.count;E<M;E++)CG.fromBufferAttribute(this,E),CG.applyMatrix3(A),this.setXY(E,CG.x,CG.y);else if(this.itemSize===3)for(let E=0,M=this.count;E<M;E++)HE.fromBufferAttribute(this,E),HE.applyMatrix3(A),this.setXYZ(E,HE.x,HE.y,HE.z);return this}applyMatrix4(A){for(let E=0,M=this.count;E<M;E++)HE.fromBufferAttribute(this,E),HE.applyMatrix4(A),this.setXYZ(E,HE.x,HE.y,HE.z);return this}applyNormalMatrix(A){for(let E=0,M=this.count;E<M;E++)HE.fromBufferAttribute(this,E),HE.applyNormalMatrix(A),this.setXYZ(E,HE.x,HE.y,HE.z);return this}transformDirection(A){for(let E=0,M=this.count;E<M;E++)HE.fromBufferAttribute(this,E),HE.transformDirection(A),this.setXYZ(E,HE.x,HE.y,HE.z);return this}set(A,E=0){return this.array.set(A,E),this}getComponent(A,E){let M=this.array[A*this.itemSize+E];if(this.normalized)M=gY(M,this.array);return M}setComponent(A,E,M){if(this.normalized)M=wM(M,this.array);return this.array[A*this.itemSize+E]=M,this}getX(A){let E=this.array[A*this.itemSize];if(this.normalized)E=gY(E,this.array);return E}setX(A,E){if(this.normalized)E=wM(E,this.array);return this.array[A*this.itemSize]=E,this}getY(A){let E=this.array[A*this.itemSize+1];if(this.normalized)E=gY(E,this.array);return E}setY(A,E){if(this.normalized)E=wM(E,this.array);return this.array[A*this.itemSize+1]=E,this}getZ(A){let E=this.array[A*this.itemSize+2];if(this.normalized)E=gY(E,this.array);return E}setZ(A,E){if(this.normalized)E=wM(E,this.array);return this.array[A*this.itemSize+2]=E,this}getW(A){let E=this.array[A*this.itemSize+3];if(this.normalized)E=gY(E,this.array);return E}setW(A,E){if(this.normalized)E=wM(E,this.array);return this.array[A*this.itemSize+3]=E,this}setXY(A,E,M){if(A*=this.itemSize,this.normalized)E=wM(E,this.array),M=wM(M,this.array);return this.array[A+0]=E,this.array[A+1]=M,this}setXYZ(A,E,M,W){if(A*=this.itemSize,this.normalized)E=wM(E,this.array),M=wM(M,this.array),W=wM(W,this.array);return this.array[A+0]=E,this.array[A+1]=M,this.array[A+2]=W,this}setXYZW(A,E,M,W,w){if(A*=this.itemSize,this.normalized)E=wM(E,this.array),M=wM(M,this.array),W=wM(W,this.array),w=wM(w,this.array);return this.array[A+0]=E,this.array[A+1]=M,this.array[A+2]=W,this.array[A+3]=w,this}onUpload(A){return this.onUploadCallback=A,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let A={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")A.name=this.name;if(this.usage!==35044)A.usage=this.usage;return A}}class aG extends fM{constructor(A,E,M){super(new Uint16Array(A),E,M)}}class tG extends fM{constructor(A,E,M){super(new Uint32Array(A),E,M)}}class xE extends fM{constructor(A,E,M){super(new Float32Array(A),E,M)}}var LQ=0,uM=new GE,UC=new kE,fY=new f,XM=new gw,wK=new gw,vE=new f;class KM extends TW{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:LQ++}),this.uuid=aY(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(A){if(Array.isArray(A))this.index=new((EF(A))?tG:aG)(A,1);else this.index=A;return this}setIndirect(A){return this.indirect=A,this}getIndirect(){return this.indirect}getAttribute(A){return this.attributes[A]}setAttribute(A,E){return this.attributes[A]=E,this}deleteAttribute(A){return delete this.attributes[A],this}hasAttribute(A){return this.attributes[A]!==void 0}addGroup(A,E,M=0){this.groups.push({start:A,count:E,materialIndex:M})}clearGroups(){this.groups=[]}setDrawRange(A,E){this.drawRange.start=A,this.drawRange.count=E}applyMatrix4(A){let E=this.attributes.position;if(E!==void 0)E.applyMatrix4(A),E.needsUpdate=!0;let M=this.attributes.normal;if(M!==void 0){let w=new PA().getNormalMatrix(A);M.applyNormalMatrix(w),M.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(A),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(A){return uM.makeRotationFromQuaternion(A),this.applyMatrix4(uM),this}rotateX(A){return uM.makeRotationX(A),this.applyMatrix4(uM),this}rotateY(A){return uM.makeRotationY(A),this.applyMatrix4(uM),this}rotateZ(A){return uM.makeRotationZ(A),this.applyMatrix4(uM),this}translate(A,E,M){return uM.makeTranslation(A,E,M),this.applyMatrix4(uM),this}scale(A,E,M){return uM.makeScale(A,E,M),this.applyMatrix4(uM),this}lookAt(A){return UC.lookAt(A),UC.updateMatrix(),this.applyMatrix4(UC.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fY).negate(),this.translate(fY.x,fY.y,fY.z),this}setFromPoints(A){let E=this.getAttribute("position");if(E===void 0){let M=[];for(let W=0,w=A.length;W<w;W++){let Y=A[W];M.push(Y.x,Y.y,Y.z||0)}this.setAttribute("position",new xE(M,3))}else{let M=Math.min(A.length,E.count);for(let W=0;W<M;W++){let w=A[W];E.setXYZ(W,w.x,w.y,w.z||0)}if(A.length>E.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");E.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new gw;let A=this.attributes.position,E=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new f(-1/0,-1/0,-1/0),new f(1/0,1/0,1/0));return}if(A!==void 0){if(this.boundingBox.setFromBufferAttribute(A),E)for(let M=0,W=E.length;M<W;M++){let w=E[M];if(XM.setFromBufferAttribute(w),this.morphTargetsRelative)vE.addVectors(this.boundingBox.min,XM.min),this.boundingBox.expandByPoint(vE),vE.addVectors(this.boundingBox.max,XM.max),this.boundingBox.expandByPoint(vE);else this.boundingBox.expandByPoint(XM.min),this.boundingBox.expandByPoint(XM.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new pw;let A=this.attributes.position,E=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new f,1/0);return}if(A){let M=this.boundingSphere.center;if(XM.setFromBufferAttribute(A),E)for(let w=0,Y=E.length;w<Y;w++){let U=E[w];if(wK.setFromBufferAttribute(U),this.morphTargetsRelative)vE.addVectors(XM.min,wK.min),XM.expandByPoint(vE),vE.addVectors(XM.max,wK.max),XM.expandByPoint(vE);else XM.expandByPoint(wK.min),XM.expandByPoint(wK.max)}XM.getCenter(M);let W=0;for(let w=0,Y=A.count;w<Y;w++)vE.fromBufferAttribute(A,w),W=Math.max(W,M.distanceToSquared(vE));if(E)for(let w=0,Y=E.length;w<Y;w++){let U=E[w],K=this.morphTargetsRelative;for(let L=0,G=U.count;L<G;L++){if(vE.fromBufferAttribute(U,L),K)fY.fromBufferAttribute(A,L),vE.add(fY);W=Math.max(W,M.distanceToSquared(vE))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let A=this.index,E=this.attributes;if(A===null||E.position===void 0||E.normal===void 0||E.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:M,normal:W,uv:w}=E;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new fM(new Float32Array(4*M.count),4));let Y=this.getAttribute("tangent"),U=[],K=[];for(let H=0;H<M.count;H++)U[H]=new f,K[H]=new f;let L=new f,G=new f,l=new f,C=new xA,F=new xA,I=new xA,J=new f,q=new f;function D(H,P,Q){L.fromBufferAttribute(M,H),G.fromBufferAttribute(M,P),l.fromBufferAttribute(M,Q),C.fromBufferAttribute(w,H),F.fromBufferAttribute(w,P),I.fromBufferAttribute(w,Q),G.sub(L),l.sub(L),F.sub(C),I.sub(C);let X=1/(F.x*I.y-I.x*F.y);if(!isFinite(X))return;J.copy(G).multiplyScalar(I.y).addScaledVector(l,-F.y).multiplyScalar(X),q.copy(l).multiplyScalar(F.x).addScaledVector(G,-I.x).multiplyScalar(X),U[H].add(J),U[P].add(J),U[Q].add(J),K[H].add(q),K[P].add(q),K[Q].add(q)}let Z=this.groups;if(Z.length===0)Z=[{start:0,count:A.count}];for(let H=0,P=Z.length;H<P;++H){let Q=Z[H],X=Q.start,S=Q.count;for(let v=X,b=X+S;v<b;v+=3)D(A.getX(v+0),A.getX(v+1),A.getX(v+2))}let N=new f,O=new f,B=new f,T=new f;function V(H){B.fromBufferAttribute(W,H),T.copy(B);let P=U[H];N.copy(P),N.sub(B.multiplyScalar(B.dot(P))).normalize(),O.crossVectors(T,P);let X=O.dot(K[H])<0?-1:1;Y.setXYZW(H,N.x,N.y,N.z,X)}for(let H=0,P=Z.length;H<P;++H){let Q=Z[H],X=Q.start,S=Q.count;for(let v=X,b=X+S;v<b;v+=3)V(A.getX(v+0)),V(A.getX(v+1)),V(A.getX(v+2))}}computeVertexNormals(){let A=this.index,E=this.getAttribute("position");if(E!==void 0){let M=this.getAttribute("normal");if(M===void 0)M=new fM(new Float32Array(E.count*3),3),this.setAttribute("normal",M);else for(let C=0,F=M.count;C<F;C++)M.setXYZ(C,0,0,0);let W=new f,w=new f,Y=new f,U=new f,K=new f,L=new f,G=new f,l=new f;if(A)for(let C=0,F=A.count;C<F;C+=3){let I=A.getX(C+0),J=A.getX(C+1),q=A.getX(C+2);W.fromBufferAttribute(E,I),w.fromBufferAttribute(E,J),Y.fromBufferAttribute(E,q),G.subVectors(Y,w),l.subVectors(W,w),G.cross(l),U.fromBufferAttribute(M,I),K.fromBufferAttribute(M,J),L.fromBufferAttribute(M,q),U.add(G),K.add(G),L.add(G),M.setXYZ(I,U.x,U.y,U.z),M.setXYZ(J,K.x,K.y,K.z),M.setXYZ(q,L.x,L.y,L.z)}else for(let C=0,F=E.count;C<F;C+=3)W.fromBufferAttribute(E,C+0),w.fromBufferAttribute(E,C+1),Y.fromBufferAttribute(E,C+2),G.subVectors(Y,w),l.subVectors(W,w),G.cross(l),M.setXYZ(C+0,G.x,G.y,G.z),M.setXYZ(C+1,G.x,G.y,G.z),M.setXYZ(C+2,G.x,G.y,G.z);this.normalizeNormals(),M.needsUpdate=!0}}normalizeNormals(){let A=this.attributes.normal;for(let E=0,M=A.count;E<M;E++)vE.fromBufferAttribute(A,E),vE.normalize(),A.setXYZ(E,vE.x,vE.y,vE.z)}toNonIndexed(){function A(U,K){let{array:L,itemSize:G,normalized:l}=U,C=new L.constructor(K.length*G),F=0,I=0;for(let J=0,q=K.length;J<q;J++){if(U.isInterleavedBufferAttribute)F=K[J]*U.data.stride+U.offset;else F=K[J]*G;for(let D=0;D<G;D++)C[I++]=L[F++]}return new fM(C,G,l)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let E=new KM,M=this.index.array,W=this.attributes;for(let U in W){let K=W[U],L=A(K,M);E.setAttribute(U,L)}let w=this.morphAttributes;for(let U in w){let K=[],L=w[U];for(let G=0,l=L.length;G<l;G++){let C=L[G],F=A(C,M);K.push(F)}E.morphAttributes[U]=K}E.morphTargetsRelative=this.morphTargetsRelative;let Y=this.groups;for(let U=0,K=Y.length;U<K;U++){let L=Y[U];E.addGroup(L.start,L.count,L.materialIndex)}return E}toJSON(){let A={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(A.uuid=this.uuid,A.type=this.type,this.name!=="")A.name=this.name;if(Object.keys(this.userData).length>0)A.userData=this.userData;if(this.parameters!==void 0){let K=this.parameters;for(let L in K)if(K[L]!==void 0)A[L]=K[L];return A}A.data={attributes:{}};let E=this.index;if(E!==null)A.data.index={type:E.array.constructor.name,array:Array.prototype.slice.call(E.array)};let M=this.attributes;for(let K in M){let L=M[K];A.data.attributes[K]=L.toJSON(A.data)}let W={},w=!1;for(let K in this.morphAttributes){let L=this.morphAttributes[K],G=[];for(let l=0,C=L.length;l<C;l++){let F=L[l];G.push(F.toJSON(A.data))}if(G.length>0)W[K]=G,w=!0}if(w)A.data.morphAttributes=W,A.data.morphTargetsRelative=this.morphTargetsRelative;let Y=this.groups;if(Y.length>0)A.data.groups=JSON.parse(JSON.stringify(Y));let U=this.boundingSphere;if(U!==null)A.data.boundingSphere={center:U.center.toArray(),radius:U.radius};return A}clone(){return new this.constructor().copy(this)}copy(A){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let E={};this.name=A.name;let M=A.index;if(M!==null)this.setIndex(M.clone(E));let W=A.attributes;for(let L in W){let G=W[L];this.setAttribute(L,G.clone(E))}let w=A.morphAttributes;for(let L in w){let G=[],l=w[L];for(let C=0,F=l.length;C<F;C++)G.push(l[C].clone(E));this.morphAttributes[L]=G}this.morphTargetsRelative=A.morphTargetsRelative;let Y=A.groups;for(let L=0,G=Y.length;L<G;L++){let l=Y[L];this.addGroup(l.start,l.count,l.materialIndex)}let U=A.boundingBox;if(U!==null)this.boundingBox=U.clone();let K=A.boundingSphere;if(K!==null)this.boundingSphere=K.clone();return this.drawRange.start=A.drawRange.start,this.drawRange.count=A.drawRange.count,this.userData=A.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var c5=new GE,Pw=new bw,FG=new pw,n5=new f,DG=new f,IG=new f,OG=new f,KC=new f,NG=new f,m5=new f,JG=new f;class LM extends kE{constructor(A=new KM,E=new tY){super();this.isMesh=!0,this.type="Mesh",this.geometry=A,this.material=E,this.updateMorphTargets()}copy(A,E){if(super.copy(A,E),A.morphTargetInfluences!==void 0)this.morphTargetInfluences=A.morphTargetInfluences.slice();if(A.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},A.morphTargetDictionary);return this.material=Array.isArray(A.material)?A.material.slice():A.material,this.geometry=A.geometry,this}updateMorphTargets(){let E=this.geometry.morphAttributes,M=Object.keys(E);if(M.length>0){let W=E[M[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let w=0,Y=W.length;w<Y;w++){let U=W[w].name||String(w);this.morphTargetInfluences.push(0),this.morphTargetDictionary[U]=w}}}}getVertexPosition(A,E){let M=this.geometry,W=M.attributes.position,w=M.morphAttributes.position,Y=M.morphTargetsRelative;E.fromBufferAttribute(W,A);let U=this.morphTargetInfluences;if(w&&U){NG.set(0,0,0);for(let K=0,L=w.length;K<L;K++){let G=U[K],l=w[K];if(G===0)continue;if(KC.fromBufferAttribute(l,A),Y)NG.addScaledVector(KC,G);else NG.addScaledVector(KC.sub(E),G)}E.add(NG)}return E}raycast(A,E){let M=this.geometry,W=this.material,w=this.matrixWorld;if(W===void 0)return;if(M.boundingSphere===null)M.computeBoundingSphere();if(FG.copy(M.boundingSphere),FG.applyMatrix4(w),Pw.copy(A.ray).recast(A.near),FG.containsPoint(Pw.origin)===!1){if(Pw.intersectSphere(FG,n5)===null)return;if(Pw.origin.distanceToSquared(n5)>(A.far-A.near)**2)return}if(c5.copy(w).invert(),Pw.copy(A.ray).applyMatrix4(c5),M.boundingBox!==null){if(Pw.intersectsBox(M.boundingBox)===!1)return}this._computeIntersections(A,E,Pw)}_computeIntersections(A,E,M){let W,w=this.geometry,Y=this.material,U=w.index,K=w.attributes.position,L=w.attributes.uv,G=w.attributes.uv1,l=w.attributes.normal,C=w.groups,F=w.drawRange;if(U!==null)if(Array.isArray(Y))for(let I=0,J=C.length;I<J;I++){let q=C[I],D=Y[q.materialIndex],Z=Math.max(q.start,F.start),N=Math.min(U.count,Math.min(q.start+q.count,F.start+F.count));for(let O=Z,B=N;O<B;O+=3){let T=U.getX(O),V=U.getX(O+1),H=U.getX(O+2);if(W=qG(this,D,A,M,L,G,l,T,V,H),W)W.faceIndex=Math.floor(O/3),W.face.materialIndex=q.materialIndex,E.push(W)}}else{let I=Math.max(0,F.start),J=Math.min(U.count,F.start+F.count);for(let q=I,D=J;q<D;q+=3){let Z=U.getX(q),N=U.getX(q+1),O=U.getX(q+2);if(W=qG(this,Y,A,M,L,G,l,Z,N,O),W)W.faceIndex=Math.floor(q/3),E.push(W)}}else if(K!==void 0)if(Array.isArray(Y))for(let I=0,J=C.length;I<J;I++){let q=C[I],D=Y[q.materialIndex],Z=Math.max(q.start,F.start),N=Math.min(K.count,Math.min(q.start+q.count,F.start+F.count));for(let O=Z,B=N;O<B;O+=3){let T=O,V=O+1,H=O+2;if(W=qG(this,D,A,M,L,G,l,T,V,H),W)W.faceIndex=Math.floor(O/3),W.face.materialIndex=q.materialIndex,E.push(W)}}else{let I=Math.max(0,F.start),J=Math.min(K.count,F.start+F.count);for(let q=I,D=J;q<D;q+=3){let Z=q,N=q+1,O=q+2;if(W=qG(this,Y,A,M,L,G,l,Z,N,O),W)W.faceIndex=Math.floor(q/3),E.push(W)}}}}function GQ(A,E,M,W,w,Y,U,K){let L;if(E.side===1)L=W.intersectTriangle(U,Y,w,!0,K);else L=W.intersectTriangle(w,Y,U,E.side===0,K);if(L===null)return null;JG.copy(K),JG.applyMatrix4(A.matrixWorld);let G=M.ray.origin.distanceTo(JG);if(G<M.near||G>M.far)return null;return{distance:G,point:JG.clone(),object:A}}function qG(A,E,M,W,w,Y,U,K,L,G){A.getVertexPosition(K,DG),A.getVertexPosition(L,IG),A.getVertexPosition(G,OG);let l=GQ(A,E,M,W,DG,IG,OG,m5);if(l){let C=new f;if(hM.getBarycoord(m5,DG,IG,OG,C),w)l.uv=hM.getInterpolatedAttribute(w,K,L,G,C,new xA);if(Y)l.uv1=hM.getInterpolatedAttribute(Y,K,L,G,C,new xA);if(U){if(l.normal=hM.getInterpolatedAttribute(U,K,L,G,C,new f),l.normal.dot(W.direction)>0)l.normal.multiplyScalar(-1)}let F={a:K,b:L,c:G,normal:new f,materialIndex:0};hM.getNormal(DG,IG,OG,F.normal),l.face=F,l.barycoord=C}return l}class $Y extends KM{constructor(A=1,E=1,M=1,W=1,w=1,Y=1){super();this.type="BoxGeometry",this.parameters={width:A,height:E,depth:M,widthSegments:W,heightSegments:w,depthSegments:Y};let U=this;W=Math.floor(W),w=Math.floor(w),Y=Math.floor(Y);let K=[],L=[],G=[],l=[],C=0,F=0;I("z","y","x",-1,-1,M,E,A,Y,w,0),I("z","y","x",1,-1,M,E,-A,Y,w,1),I("x","z","y",1,1,A,M,E,W,Y,2),I("x","z","y",1,-1,A,M,-E,W,Y,3),I("x","y","z",1,-1,A,E,M,W,w,4),I("x","y","z",-1,-1,A,E,-M,W,w,5),this.setIndex(K),this.setAttribute("position",new xE(L,3)),this.setAttribute("normal",new xE(G,3)),this.setAttribute("uv",new xE(l,2));function I(J,q,D,Z,N,O,B,T,V,H,P){let Q=O/V,X=B/H,S=O/2,v=B/2,b=T/2,n=V+1,a=H+1,m=0,_=0,c=new f;for(let GA=0;GA<a;GA++){let ZA=GA*X-v;for(let yA=0;yA<n;yA++){let vA=yA*Q-S;c[J]=vA*Z,c[q]=ZA*N,c[D]=b,L.push(c.x,c.y,c.z),c[J]=0,c[q]=0,c[D]=T>0?1:-1,G.push(c.x,c.y,c.z),l.push(yA/V),l.push(1-GA/H),m+=1}}for(let GA=0;GA<H;GA++)for(let ZA=0;ZA<V;ZA++){let yA=C+ZA+n*GA,vA=C+ZA+n*(GA+1),i=C+(ZA+1)+n*(GA+1),EA=C+(ZA+1)+n*GA;K.push(yA,vA,EA),K.push(vA,i,EA),_+=6}U.addGroup(F,_,P),F+=_,C+=m}}copy(A){return super.copy(A),this.parameters=Object.assign({},A.parameters),this}static fromJSON(A){return new $Y(A.width,A.height,A.depth,A.widthSegments,A.heightSegments,A.depthSegments)}}function cw(A){let E={};for(let M in A){E[M]={};for(let W in A[M]){let w=A[M][W];if(w&&(w.isColor||w.isMatrix3||w.isMatrix4||w.isVector2||w.isVector3||w.isVector4||w.isTexture||w.isQuaternion))if(w.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),E[M][W]=null;else E[M][W]=w.clone();else if(Array.isArray(w))E[M][W]=w.slice();else E[M][W]=w}}return E}function _E(A){let E={};for(let M=0;M<A.length;M++){let W=cw(A[M]);for(let w in W)E[w]=W[w]}return E}function ZQ(A){let E=[];for(let M=0;M<A.length;M++)E.push(A[M].clone());return E}function YF(A){let E=A.getRenderTarget();if(E===null)return A.outputColorSpace;if(E.isXRRenderTarget===!0)return E.texture.colorSpace;return oA.workingColorSpace}var UN={clone:cw,merge:_E},lQ=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,CQ=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class RM extends Lw{constructor(A){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lQ,this.fragmentShader=CQ,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,A!==void 0)this.setValues(A)}copy(A){return super.copy(A),this.fragmentShader=A.fragmentShader,this.vertexShader=A.vertexShader,this.uniforms=cw(A.uniforms),this.uniformsGroups=ZQ(A.uniformsGroups),this.defines=Object.assign({},A.defines),this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.fog=A.fog,this.lights=A.lights,this.clipping=A.clipping,this.extensions=Object.assign({},A.extensions),this.glslVersion=A.glslVersion,this}toJSON(A){let E=super.toJSON(A);E.glslVersion=this.glslVersion,E.uniforms={};for(let W in this.uniforms){let Y=this.uniforms[W].value;if(Y&&Y.isTexture)E.uniforms[W]={type:"t",value:Y.toJSON(A).uuid};else if(Y&&Y.isColor)E.uniforms[W]={type:"c",value:Y.getHex()};else if(Y&&Y.isVector2)E.uniforms[W]={type:"v2",value:Y.toArray()};else if(Y&&Y.isVector3)E.uniforms[W]={type:"v3",value:Y.toArray()};else if(Y&&Y.isVector4)E.uniforms[W]={type:"v4",value:Y.toArray()};else if(Y&&Y.isMatrix3)E.uniforms[W]={type:"m3",value:Y.toArray()};else if(Y&&Y.isMatrix4)E.uniforms[W]={type:"m4",value:Y.toArray()};else E.uniforms[W]={value:Y}}if(Object.keys(this.defines).length>0)E.defines=this.defines;E.vertexShader=this.vertexShader,E.fragmentShader=this.fragmentShader,E.lights=this.lights,E.clipping=this.clipping;let M={};for(let W in this.extensions)if(this.extensions[W]===!0)M[W]=!0;if(Object.keys(M).length>0)E.extensions=M;return E}}class $G extends kE{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new GE,this.projectionMatrix=new GE,this.projectionMatrixInverse=new GE,this.coordinateSystem=2000}copy(A,E){return super.copy(A,E),this.matrixWorldInverse.copy(A.matrixWorldInverse),this.projectionMatrix.copy(A.projectionMatrix),this.projectionMatrixInverse.copy(A.projectionMatrixInverse),this.coordinateSystem=A.coordinateSystem,this}getWorldDirection(A){return super.getWorldDirection(A).negate()}updateMatrixWorld(A){super.updateMatrixWorld(A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(A,E){super.updateWorldMatrix(A,E),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var Mw=new f,d5=new xA,i5=new xA;class YM extends $G{constructor(A=50,E=1,M=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=A,this.zoom=1,this.near=M,this.far=W,this.focus=10,this.aspect=E,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(A,E){return super.copy(A,E),this.fov=A.fov,this.zoom=A.zoom,this.near=A.near,this.far=A.far,this.focus=A.focus,this.aspect=A.aspect,this.view=A.view===null?null:Object.assign({},A.view),this.filmGauge=A.filmGauge,this.filmOffset=A.filmOffset,this}setFocalLength(A){let E=0.5*this.getFilmHeight()/A;this.fov=bY*2*Math.atan(E),this.updateProjectionMatrix()}getFocalLength(){let A=Math.tan(UK*0.5*this.fov);return 0.5*this.getFilmHeight()/A}getEffectiveFOV(){return bY*2*Math.atan(Math.tan(UK*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(A,E,M){Mw.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),E.set(Mw.x,Mw.y).multiplyScalar(-A/Mw.z),Mw.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),M.set(Mw.x,Mw.y).multiplyScalar(-A/Mw.z)}getViewSize(A,E){return this.getViewBounds(A,d5,i5),E.subVectors(i5,d5)}setViewOffset(A,E,M,W,w,Y){if(this.aspect=A/E,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=E,this.view.offsetX=M,this.view.offsetY=W,this.view.width=w,this.view.height=Y,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let A=this.near,E=A*Math.tan(UK*0.5*this.fov)/this.zoom,M=2*E,W=this.aspect*M,w=-0.5*W,Y=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:K,fullHeight:L}=Y;w+=Y.offsetX*W/K,E-=Y.offsetY*M/L,W*=Y.width/K,M*=Y.height/L}let U=this.filmOffset;if(U!==0)w+=A*U/this.getFilmWidth();this.projectionMatrix.makePerspective(w,w+W,E,E-M,A,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){let E=super.toJSON(A);if(E.object.fov=this.fov,E.object.zoom=this.zoom,E.object.near=this.near,E.object.far=this.far,E.object.focus=this.focus,E.object.aspect=this.aspect,this.view!==null)E.object.view=Object.assign({},this.view);return E.object.filmGauge=this.filmGauge,E.object.filmOffset=this.filmOffset,E}}var jY=-90,vY=1;class UF extends kE{constructor(A,E,M){super();this.type="CubeCamera",this.renderTarget=M,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new YM(jY,vY,A,E);W.layers=this.layers,this.add(W);let w=new YM(jY,vY,A,E);w.layers=this.layers,this.add(w);let Y=new YM(jY,vY,A,E);Y.layers=this.layers,this.add(Y);let U=new YM(jY,vY,A,E);U.layers=this.layers,this.add(U);let K=new YM(jY,vY,A,E);K.layers=this.layers,this.add(K);let L=new YM(jY,vY,A,E);L.layers=this.layers,this.add(L)}updateCoordinateSystem(){let A=this.coordinateSystem,E=this.children.concat(),[M,W,w,Y,U,K]=E;for(let L of E)this.remove(L);if(A===2000)M.up.set(0,1,0),M.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),w.up.set(0,0,-1),w.lookAt(0,1,0),Y.up.set(0,0,1),Y.lookAt(0,-1,0),U.up.set(0,1,0),U.lookAt(0,0,1),K.up.set(0,1,0),K.lookAt(0,0,-1);else if(A===2001)M.up.set(0,-1,0),M.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),w.up.set(0,0,1),w.lookAt(0,1,0),Y.up.set(0,0,-1),Y.lookAt(0,-1,0),U.up.set(0,-1,0),U.lookAt(0,0,1),K.up.set(0,-1,0),K.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+A);for(let L of E)this.add(L),L.updateMatrixWorld()}update(A,E){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:M,activeMipmapLevel:W}=this;if(this.coordinateSystem!==A.coordinateSystem)this.coordinateSystem=A.coordinateSystem,this.updateCoordinateSystem();let[w,Y,U,K,L,G]=this.children,l=A.getRenderTarget(),C=A.getActiveCubeFace(),F=A.getActiveMipmapLevel(),I=A.xr.enabled;A.xr.enabled=!1;let J=M.texture.generateMipmaps;M.texture.generateMipmaps=!1,A.setRenderTarget(M,0,W),A.render(E,w),A.setRenderTarget(M,1,W),A.render(E,Y),A.setRenderTarget(M,2,W),A.render(E,U),A.setRenderTarget(M,3,W),A.render(E,K),A.setRenderTarget(M,4,W),A.render(E,L),M.texture.generateMipmaps=J,A.setRenderTarget(M,5,W),A.render(E,G),A.setRenderTarget(l,C,F),A.xr.enabled=I,M.texture.needsPMREMUpdate=!0}}class _G extends $E{constructor(A,E,M,W,w,Y,U,K,L,G){A=A!==void 0?A:[],E=E!==void 0?E:301;super(A,E,M,W,w,Y,U,K,L,G);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(A){this.image=A}}class KF extends SW{constructor(A=1,E={}){super(A,A,E);this.isWebGLCubeRenderTarget=!0;let M={width:A,height:A,depth:1},W=[M,M,M,M,M,M];this.texture=new _G(W,E.mapping,E.wrapS,E.wrapT,E.magFilter,E.minFilter,E.format,E.type,E.anisotropy,E.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=E.generateMipmaps!==void 0?E.generateMipmaps:!1,this.texture.minFilter=E.minFilter!==void 0?E.minFilter:1006}fromEquirectangularTexture(A,E){this.texture.type=E.type,this.texture.colorSpace=E.colorSpace,this.texture.generateMipmaps=E.generateMipmaps,this.texture.minFilter=E.minFilter,this.texture.magFilter=E.magFilter;let M={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},W=new $Y(5,5,5),w=new RM({name:"CubemapFromEquirect",uniforms:cw(M.uniforms),vertexShader:M.vertexShader,fragmentShader:M.fragmentShader,side:1,blending:0});w.uniforms.tEquirect.value=E;let Y=new LM(W,w),U=E.minFilter;if(E.minFilter===1008)E.minFilter=1006;return new UF(1,10,this).update(A,Y),E.minFilter=U,Y.geometry.dispose(),Y.material.dispose(),this}clear(A,E,M,W){let w=A.getRenderTarget();for(let Y=0;Y<6;Y++)A.setRenderTarget(this,Y),A.clear(E,M,W);A.setRenderTarget(w)}}class eG extends kE{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wW,this.environmentIntensity=1,this.environmentRotation=new wW,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(A,E){if(super.copy(A,E),A.background!==null)this.background=A.background.clone();if(A.environment!==null)this.environment=A.environment.clone();if(A.fog!==null)this.fog=A.fog.clone();if(this.backgroundBlurriness=A.backgroundBlurriness,this.backgroundIntensity=A.backgroundIntensity,this.backgroundRotation.copy(A.backgroundRotation),this.environmentIntensity=A.environmentIntensity,this.environmentRotation.copy(A.environmentRotation),A.overrideMaterial!==null)this.overrideMaterial=A.overrideMaterial.clone();return this.matrixAutoUpdate=A.matrixAutoUpdate,this}toJSON(A){let E=super.toJSON(A);if(this.fog!==null)E.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)E.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)E.object.backgroundIntensity=this.backgroundIntensity;if(E.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)E.object.environmentIntensity=this.environmentIntensity;return E.object.environmentRotation=this.environmentRotation.toArray(),E}}var LC=new f,FQ=new f,DQ=new PA;class rM{constructor(A=new f(1,0,0),E=0){this.isPlane=!0,this.normal=A,this.constant=E}set(A,E){return this.normal.copy(A),this.constant=E,this}setComponents(A,E,M,W){return this.normal.set(A,E,M),this.constant=W,this}setFromNormalAndCoplanarPoint(A,E){return this.normal.copy(A),this.constant=-E.dot(this.normal),this}setFromCoplanarPoints(A,E,M){let W=LC.subVectors(M,E).cross(FQ.subVectors(A,E)).normalize();return this.setFromNormalAndCoplanarPoint(W,A),this}copy(A){return this.normal.copy(A.normal),this.constant=A.constant,this}normalize(){let A=1/this.normal.length();return this.normal.multiplyScalar(A),this.constant*=A,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(A){return this.normal.dot(A)+this.constant}distanceToSphere(A){return this.distanceToPoint(A.center)-A.radius}projectPoint(A,E){return E.copy(A).addScaledVector(this.normal,-this.distanceToPoint(A))}intersectLine(A,E){let M=A.delta(LC),W=this.normal.dot(M);if(W===0){if(this.distanceToPoint(A.start)===0)return E.copy(A.start);return null}let w=-(A.start.dot(this.normal)+this.constant)/W;if(w<0||w>1)return null;return E.copy(A.start).addScaledVector(M,w)}intersectsLine(A){let E=this.distanceToPoint(A.start),M=this.distanceToPoint(A.end);return E<0&&M>0||M<0&&E>0}intersectsBox(A){return A.intersectsPlane(this)}intersectsSphere(A){return A.intersectsPlane(this)}coplanarPoint(A){return A.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(A,E){let M=E||DQ.getNormalMatrix(A),W=this.coplanarPoint(LC).applyMatrix4(A),w=this.normal.applyMatrix3(M).normalize();return this.constant=-W.dot(w),this}translate(A){return this.constant-=A.dot(this.normal),this}equals(A){return A.normal.equals(this.normal)&&A.constant===this.constant}clone(){return new this.constructor().copy(this)}}var uw=new pw,zG=new f;class NK{constructor(A=new rM,E=new rM,M=new rM,W=new rM,w=new rM,Y=new rM){this.planes=[A,E,M,W,w,Y]}set(A,E,M,W,w,Y){let U=this.planes;return U[0].copy(A),U[1].copy(E),U[2].copy(M),U[3].copy(W),U[4].copy(w),U[5].copy(Y),this}copy(A){let E=this.planes;for(let M=0;M<6;M++)E[M].copy(A.planes[M]);return this}setFromProjectionMatrix(A,E=2000){let M=this.planes,W=A.elements,w=W[0],Y=W[1],U=W[2],K=W[3],L=W[4],G=W[5],l=W[6],C=W[7],F=W[8],I=W[9],J=W[10],q=W[11],D=W[12],Z=W[13],N=W[14],O=W[15];if(M[0].setComponents(K-w,C-L,q-F,O-D).normalize(),M[1].setComponents(K+w,C+L,q+F,O+D).normalize(),M[2].setComponents(K+Y,C+G,q+I,O+Z).normalize(),M[3].setComponents(K-Y,C-G,q-I,O-Z).normalize(),M[4].setComponents(K-U,C-l,q-J,O-N).normalize(),E===2000)M[5].setComponents(K+U,C+l,q+J,O+N).normalize();else if(E===2001)M[5].setComponents(U,l,J,N).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+E);return this}intersectsObject(A){if(A.boundingSphere!==void 0){if(A.boundingSphere===null)A.computeBoundingSphere();uw.copy(A.boundingSphere).applyMatrix4(A.matrixWorld)}else{let E=A.geometry;if(E.boundingSphere===null)E.computeBoundingSphere();uw.copy(E.boundingSphere).applyMatrix4(A.matrixWorld)}return this.intersectsSphere(uw)}intersectsSprite(A){return uw.center.set(0,0,0),uw.radius=0.7071067811865476,uw.applyMatrix4(A.matrixWorld),this.intersectsSphere(uw)}intersectsSphere(A){let E=this.planes,M=A.center,W=-A.radius;for(let w=0;w<6;w++)if(E[w].distanceToPoint(M)<W)return!1;return!0}intersectsBox(A){let E=this.planes;for(let M=0;M<6;M++){let W=E[M];if(zG.x=W.normal.x>0?A.max.x:A.min.x,zG.y=W.normal.y>0?A.max.y:A.min.y,zG.z=W.normal.z>0?A.max.z:A.min.z,W.distanceToPoint(zG)<0)return!1}return!0}containsPoint(A){let E=this.planes;for(let M=0;M<6;M++)if(E[M].distanceToPoint(A)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class JK extends Lw{constructor(A){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mA(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.linewidth=A.linewidth,this.linecap=A.linecap,this.linejoin=A.linejoin,this.fog=A.fog,this}}var HG=new f,yG=new f,s5=new GE,YK=new bw,QG=new pw,GC=new f,o5=new f;class AZ extends kE{constructor(A=new KM,E=new JK){super();this.isLine=!0,this.type="Line",this.geometry=A,this.material=E,this.updateMorphTargets()}copy(A,E){return super.copy(A,E),this.material=Array.isArray(A.material)?A.material.slice():A.material,this.geometry=A.geometry,this}computeLineDistances(){let A=this.geometry;if(A.index===null){let E=A.attributes.position,M=[0];for(let W=1,w=E.count;W<w;W++)HG.fromBufferAttribute(E,W-1),yG.fromBufferAttribute(E,W),M[W]=M[W-1],M[W]+=HG.distanceTo(yG);A.setAttribute("lineDistance",new xE(M,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(A,E){let M=this.geometry,W=this.matrixWorld,w=A.params.Line.threshold,Y=M.drawRange;if(M.boundingSphere===null)M.computeBoundingSphere();if(QG.copy(M.boundingSphere),QG.applyMatrix4(W),QG.radius+=w,A.ray.intersectsSphere(QG)===!1)return;s5.copy(W).invert(),YK.copy(A.ray).applyMatrix4(s5);let U=w/((this.scale.x+this.scale.y+this.scale.z)/3),K=U*U,L=this.isLineSegments?2:1,G=M.index,C=M.attributes.position;if(G!==null){let F=Math.max(0,Y.start),I=Math.min(G.count,Y.start+Y.count);for(let J=F,q=I-1;J<q;J+=L){let D=G.getX(J),Z=G.getX(J+1),N=XG(this,A,YK,K,D,Z);if(N)E.push(N)}if(this.isLineLoop){let J=G.getX(I-1),q=G.getX(F),D=XG(this,A,YK,K,J,q);if(D)E.push(D)}}else{let F=Math.max(0,Y.start),I=Math.min(C.count,Y.start+Y.count);for(let J=F,q=I-1;J<q;J+=L){let D=XG(this,A,YK,K,J,J+1);if(D)E.push(D)}if(this.isLineLoop){let J=XG(this,A,YK,K,I-1,F);if(J)E.push(J)}}}updateMorphTargets(){let E=this.geometry.morphAttributes,M=Object.keys(E);if(M.length>0){let W=E[M[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let w=0,Y=W.length;w<Y;w++){let U=W[w].name||String(w);this.morphTargetInfluences.push(0),this.morphTargetDictionary[U]=w}}}}}function XG(A,E,M,W,w,Y){let U=A.geometry.attributes.position;if(HG.fromBufferAttribute(U,w),yG.fromBufferAttribute(U,Y),M.distanceSqToSegment(HG,yG,GC,o5)>W)return;GC.applyMatrix4(A.matrixWorld);let L=E.ray.origin.distanceTo(GC);if(L<E.near||L>E.far)return;return{distance:L,point:o5.clone().applyMatrix4(A.matrixWorld),index:w,face:null,faceIndex:null,barycoord:null,object:A}}class qK extends Lw{constructor(A){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new mA(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.alphaMap=A.alphaMap,this.size=A.size,this.sizeAttenuation=A.sizeAttenuation,this.fog=A.fog,this}}var r5=new GE,lC=new bw,RG=new pw,BG=new f;class EZ extends kE{constructor(A=new KM,E=new qK){super();this.isPoints=!0,this.type="Points",this.geometry=A,this.material=E,this.updateMorphTargets()}copy(A,E){return super.copy(A,E),this.material=Array.isArray(A.material)?A.material.slice():A.material,this.geometry=A.geometry,this}raycast(A,E){let M=this.geometry,W=this.matrixWorld,w=A.params.Points.threshold,Y=M.drawRange;if(M.boundingSphere===null)M.computeBoundingSphere();if(RG.copy(M.boundingSphere),RG.applyMatrix4(W),RG.radius+=w,A.ray.intersectsSphere(RG)===!1)return;r5.copy(W).invert(),lC.copy(A.ray).applyMatrix4(r5);let U=w/((this.scale.x+this.scale.y+this.scale.z)/3),K=U*U,L=M.index,l=M.attributes.position;if(L!==null){let C=Math.max(0,Y.start),F=Math.min(L.count,Y.start+Y.count);for(let I=C,J=F;I<J;I++){let q=L.getX(I);BG.fromBufferAttribute(l,q),a5(BG,q,K,W,A,E,this)}}else{let C=Math.max(0,Y.start),F=Math.min(l.count,Y.start+Y.count);for(let I=C,J=F;I<J;I++)BG.fromBufferAttribute(l,I),a5(BG,I,K,W,A,E,this)}}updateMorphTargets(){let E=this.geometry.morphAttributes,M=Object.keys(E);if(M.length>0){let W=E[M[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let w=0,Y=W.length;w<Y;w++){let U=W[w].name||String(w);this.morphTargetInfluences.push(0),this.morphTargetDictionary[U]=w}}}}}function a5(A,E,M,W,w,Y,U){let K=lC.distanceSqToPoint(A);if(K<M){let L=new f;lC.closestPointToPoint(A,L),L.applyMatrix4(W);let G=w.ray.origin.distanceTo(L);if(G<w.near||G>w.far)return;Y.push({distance:G,distanceToRay:Math.sqrt(K),point:L,index:E,face:null,faceIndex:null,barycoord:null,object:U})}}class Gw extends kE{constructor(){super();this.isGroup=!0,this.type="Group"}}class MZ extends $E{constructor(A,E,M,W,w,Y,U,K,L,G=1026){if(G!==1026&&G!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(M===void 0&&G===1026)M=1014;if(M===void 0&&G===1027)M=1020;super(null,W,w,Y,U,K,G,M,L);this.isDepthTexture=!0,this.image={width:A,height:E},this.magFilter=U!==void 0?U:1003,this.minFilter=K!==void 0?K:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(A){return super.copy(A),this.compareFunction=A.compareFunction,this}toJSON(A){let E=super.toJSON(A);if(this.compareFunction!==null)E.compareFunction=this.compareFunction;return E}}class WZ extends KM{constructor(A=1,E=1,M=1,W=32,w=1,Y=!1,U=0,K=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:A,radiusBottom:E,height:M,radialSegments:W,heightSegments:w,openEnded:Y,thetaStart:U,thetaLength:K};let L=this;W=Math.floor(W),w=Math.floor(w);let G=[],l=[],C=[],F=[],I=0,J=[],q=M/2,D=0;if(Z(),Y===!1){if(A>0)N(!0);if(E>0)N(!1)}this.setIndex(G),this.setAttribute("position",new xE(l,3)),this.setAttribute("normal",new xE(C,3)),this.setAttribute("uv",new xE(F,2));function Z(){let O=new f,B=new f,T=0,V=(E-A)/M;for(let H=0;H<=w;H++){let P=[],Q=H/w,X=Q*(E-A)+A;for(let S=0;S<=W;S++){let v=S/W,b=v*K+U,n=Math.sin(b),a=Math.cos(b);B.x=X*n,B.y=-Q*M+q,B.z=X*a,l.push(B.x,B.y,B.z),O.set(n,V,a).normalize(),C.push(O.x,O.y,O.z),F.push(v,1-Q),P.push(I++)}J.push(P)}for(let H=0;H<W;H++)for(let P=0;P<w;P++){let Q=J[P][H],X=J[P+1][H],S=J[P+1][H+1],v=J[P][H+1];if(A>0||P!==0)G.push(Q,X,v),T+=3;if(E>0||P!==w-1)G.push(X,S,v),T+=3}L.addGroup(D,T,0),D+=T}function N(O){let B=I,T=new xA,V=new f,H=0,P=O===!0?A:E,Q=O===!0?1:-1;for(let S=1;S<=W;S++)l.push(0,q*Q,0),C.push(0,Q,0),F.push(0.5,0.5),I++;let X=I;for(let S=0;S<=W;S++){let b=S/W*K+U,n=Math.cos(b),a=Math.sin(b);V.x=P*a,V.y=q*Q,V.z=P*n,l.push(V.x,V.y,V.z),C.push(0,Q,0),T.x=n*0.5+0.5,T.y=a*0.5*Q+0.5,F.push(T.x,T.y),I++}for(let S=0;S<W;S++){let v=B+S,b=X+S;if(O===!0)G.push(b,b+1,v);else G.push(b+1,b,v);H+=3}L.addGroup(D,H,O===!0?1:2),D+=H}}copy(A){return super.copy(A),this.parameters=Object.assign({},A.parameters),this}static fromJSON(A){return new WZ(A.radiusTop,A.radiusBottom,A.height,A.radialSegments,A.heightSegments,A.openEnded,A.thetaStart,A.thetaLength)}}class zK extends WZ{constructor(A=1,E=1,M=32,W=1,w=!1,Y=0,U=Math.PI*2){super(0,A,E,M,W,w,Y,U);this.type="ConeGeometry",this.parameters={radius:A,height:E,radialSegments:M,heightSegments:W,openEnded:w,thetaStart:Y,thetaLength:U}}static fromJSON(A){return new zK(A.radius,A.height,A.radialSegments,A.heightSegments,A.openEnded,A.thetaStart,A.thetaLength)}}class QK extends KM{constructor(A=1,E=1,M=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:A,height:E,widthSegments:M,heightSegments:W};let w=A/2,Y=E/2,U=Math.floor(M),K=Math.floor(W),L=U+1,G=K+1,l=A/U,C=E/K,F=[],I=[],J=[],q=[];for(let D=0;D<G;D++){let Z=D*C-Y;for(let N=0;N<L;N++){let O=N*l-w;I.push(O,-Z,0),J.push(0,0,1),q.push(N/U),q.push(1-D/K)}}for(let D=0;D<K;D++)for(let Z=0;Z<U;Z++){let N=Z+L*D,O=Z+L*(D+1),B=Z+1+L*(D+1),T=Z+1+L*D;F.push(N,O,T),F.push(O,B,T)}this.setIndex(F),this.setAttribute("position",new xE(I,3)),this.setAttribute("normal",new xE(J,3)),this.setAttribute("uv",new xE(q,2))}copy(A){return super.copy(A),this.parameters=Object.assign({},A.parameters),this}static fromJSON(A){return new QK(A.width,A.height,A.widthSegments,A.heightSegments)}}class _Y extends KM{constructor(A=1,E=32,M=16,W=0,w=Math.PI*2,Y=0,U=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:A,widthSegments:E,heightSegments:M,phiStart:W,phiLength:w,thetaStart:Y,thetaLength:U},E=Math.max(3,Math.floor(E)),M=Math.max(2,Math.floor(M));let K=Math.min(Y+U,Math.PI),L=0,G=[],l=new f,C=new f,F=[],I=[],J=[],q=[];for(let D=0;D<=M;D++){let Z=[],N=D/M,O=0;if(D===0&&Y===0)O=0.5/E;else if(D===M&&K===Math.PI)O=-0.5/E;for(let B=0;B<=E;B++){let T=B/E;l.x=-A*Math.cos(W+T*w)*Math.sin(Y+N*U),l.y=A*Math.cos(Y+N*U),l.z=A*Math.sin(W+T*w)*Math.sin(Y+N*U),I.push(l.x,l.y,l.z),C.copy(l).normalize(),J.push(C.x,C.y,C.z),q.push(T+O,1-N),Z.push(L++)}G.push(Z)}for(let D=0;D<M;D++)for(let Z=0;Z<E;Z++){let N=G[D][Z+1],O=G[D][Z],B=G[D+1][Z],T=G[D+1][Z+1];if(D!==0||Y>0)F.push(N,O,T);if(D!==M-1||K<Math.PI)F.push(O,B,T)}this.setIndex(F),this.setAttribute("position",new xE(I,3)),this.setAttribute("normal",new xE(J,3)),this.setAttribute("uv",new xE(q,2))}copy(A){return super.copy(A),this.parameters=Object.assign({},A.parameters),this}static fromJSON(A){return new _Y(A.radius,A.widthSegments,A.heightSegments,A.phiStart,A.phiLength,A.thetaStart,A.thetaLength)}}class LF extends Lw{constructor(A){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(A)}copy(A){return super.copy(A),this.depthPacking=A.depthPacking,this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this}}class GF extends Lw{constructor(A){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(A)}copy(A){return super.copy(A),this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this}}function VG(A,E,M){if(!A||!M&&A.constructor===E)return A;if(typeof E.BYTES_PER_ELEMENT==="number")return new E(A);return Array.prototype.slice.call(A)}function IQ(A){return ArrayBuffer.isView(A)&&!(A instanceof DataView)}class eY{constructor(A,E,M,W){this.parameterPositions=A,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new E.constructor(M),this.sampleValues=E,this.valueSize=M,this.settings=null,this.DefaultSettings_={}}evaluate(A){let E=this.parameterPositions,M=this._cachedIndex,W=E[M],w=E[M-1];A:{E:{let Y;M:{W:if(!(A<W)){for(let U=M+2;;){if(W===void 0){if(A<w)break W;return M=E.length,this._cachedIndex=M,this.copySampleValue_(M-1)}if(M===U)break;if(w=W,W=E[++M],A<W)break E}Y=E.length;break M}if(!(A>=w)){let U=E[1];if(A<U)M=2,w=U;for(let K=M-2;;){if(w===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(M===K)break;if(W=w,w=E[--M-1],A>=w)break E}Y=M,M=0;break M}break A}while(M<Y){let U=M+Y>>>1;if(A<E[U])Y=U;else M=U+1}if(W=E[M],w=E[M-1],w===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return M=E.length,this._cachedIndex=M,this.copySampleValue_(M-1)}this._cachedIndex=M,this.intervalChanged_(M,w,W)}return this.interpolate_(M,w,A,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(A){let E=this.resultBuffer,M=this.sampleValues,W=this.valueSize,w=A*W;for(let Y=0;Y!==W;++Y)E[Y]=M[w+Y];return E}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class ZF extends eY{constructor(A,E,M,W){super(A,E,M,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(A,E,M){let W=this.parameterPositions,w=A-2,Y=A+1,U=W[w],K=W[Y];if(U===void 0)switch(this.getSettings_().endingStart){case 2401:w=A,U=2*E-M;break;case 2402:w=W.length-2,U=E+W[w]-W[w+1];break;default:w=A,U=M}if(K===void 0)switch(this.getSettings_().endingEnd){case 2401:Y=A,K=2*M-E;break;case 2402:Y=1,K=M+W[1]-W[0];break;default:Y=A-1,K=E}let L=(M-E)*0.5,G=this.valueSize;this._weightPrev=L/(E-U),this._weightNext=L/(K-M),this._offsetPrev=w*G,this._offsetNext=Y*G}interpolate_(A,E,M,W){let w=this.resultBuffer,Y=this.sampleValues,U=this.valueSize,K=A*U,L=K-U,G=this._offsetPrev,l=this._offsetNext,C=this._weightPrev,F=this._weightNext,I=(M-E)/(W-E),J=I*I,q=J*I,D=-C*q+2*C*J-C*I,Z=(1+C)*q+(-1.5-2*C)*J+(-0.5+C)*I+1,N=(-1-F)*q+(1.5+F)*J+0.5*I,O=F*q-F*J;for(let B=0;B!==U;++B)w[B]=D*Y[G+B]+Z*Y[L+B]+N*Y[K+B]+O*Y[l+B];return w}}class lF extends eY{constructor(A,E,M,W){super(A,E,M,W)}interpolate_(A,E,M,W){let w=this.resultBuffer,Y=this.sampleValues,U=this.valueSize,K=A*U,L=K-U,G=(M-E)/(W-E),l=1-G;for(let C=0;C!==U;++C)w[C]=Y[L+C]*l+Y[K+C]*G;return w}}class CF extends eY{constructor(A,E,M,W){super(A,E,M,W)}interpolate_(A){return this.copySampleValue_(A-1)}}class tM{constructor(A,E,M,W){if(A===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(E===void 0||E.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+A);this.name=A,this.times=VG(E,this.TimeBufferType),this.values=VG(M,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(A){let E=A.constructor,M;if(E.toJSON!==this.toJSON)M=E.toJSON(A);else{M={name:A.name,times:VG(A.times,Array),values:VG(A.values,Array)};let W=A.getInterpolation();if(W!==A.DefaultInterpolation)M.interpolation=W}return M.type=A.ValueTypeName,M}InterpolantFactoryMethodDiscrete(A){return new CF(this.times,this.values,this.getValueSize(),A)}InterpolantFactoryMethodLinear(A){return new lF(this.times,this.values,this.getValueSize(),A)}InterpolantFactoryMethodSmooth(A){return new ZF(this.times,this.values,this.getValueSize(),A)}setInterpolation(A){let E;switch(A){case 2300:E=this.InterpolantFactoryMethodDiscrete;break;case 2301:E=this.InterpolantFactoryMethodLinear;break;case 2302:E=this.InterpolantFactoryMethodSmooth;break}if(E===void 0){let M="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(A!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(M);return console.warn("THREE.KeyframeTrack:",M),this}return this.createInterpolant=E,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(A){if(A!==0){let E=this.times;for(let M=0,W=E.length;M!==W;++M)E[M]+=A}return this}scale(A){if(A!==1){let E=this.times;for(let M=0,W=E.length;M!==W;++M)E[M]*=A}return this}trim(A,E){let M=this.times,W=M.length,w=0,Y=W-1;while(w!==W&&M[w]<A)++w;while(Y!==-1&&M[Y]>E)--Y;if(++Y,w!==0||Y!==W){if(w>=Y)Y=Math.max(Y,1),w=Y-1;let U=this.getValueSize();this.times=M.slice(w,Y),this.values=this.values.slice(w*U,Y*U)}return this}validate(){let A=!0,E=this.getValueSize();if(E-Math.floor(E)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),A=!1;let M=this.times,W=this.values,w=M.length;if(w===0)console.error("THREE.KeyframeTrack: Track is empty.",this),A=!1;let Y=null;for(let U=0;U!==w;U++){let K=M[U];if(typeof K==="number"&&isNaN(K)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,U,K),A=!1;break}if(Y!==null&&Y>K){console.error("THREE.KeyframeTrack: Out of order keys.",this,U,K,Y),A=!1;break}Y=K}if(W!==void 0){if(IQ(W))for(let U=0,K=W.length;U!==K;++U){let L=W[U];if(isNaN(L)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,U,L),A=!1;break}}}return A}optimize(){let A=this.times.slice(),E=this.values.slice(),M=this.getValueSize(),W=this.getInterpolation()===2302,w=A.length-1,Y=1;for(let U=1;U<w;++U){let K=!1,L=A[U],G=A[U+1];if(L!==G&&(U!==1||L!==A[0]))if(!W){let l=U*M,C=l-M,F=l+M;for(let I=0;I!==M;++I){let J=E[l+I];if(J!==E[C+I]||J!==E[F+I]){K=!0;break}}}else K=!0;if(K){if(U!==Y){A[Y]=A[U];let l=U*M,C=Y*M;for(let F=0;F!==M;++F)E[C+F]=E[l+F]}++Y}}if(w>0){A[Y]=A[w];for(let U=w*M,K=Y*M,L=0;L!==M;++L)E[K+L]=E[U+L];++Y}if(Y!==A.length)this.times=A.slice(0,Y),this.values=E.slice(0,Y*M);else this.times=A,this.values=E;return this}clone(){let A=this.times.slice(),E=this.values.slice(),W=new this.constructor(this.name,A,E);return W.createInterpolant=this.createInterpolant,W}}tM.prototype.TimeBufferType=Float32Array;tM.prototype.ValueBufferType=Float32Array;tM.prototype.DefaultInterpolation=2301;class nw extends tM{constructor(A,E,M){super(A,E,M)}}nw.prototype.ValueTypeName="bool";nw.prototype.ValueBufferType=Array;nw.prototype.DefaultInterpolation=2300;nw.prototype.InterpolantFactoryMethodLinear=void 0;nw.prototype.InterpolantFactoryMethodSmooth=void 0;class FF extends tM{}FF.prototype.ValueTypeName="color";class DF extends tM{}DF.prototype.ValueTypeName="number";class IF extends eY{constructor(A,E,M,W){super(A,E,M,W)}interpolate_(A,E,M,W){let w=this.resultBuffer,Y=this.sampleValues,U=this.valueSize,K=(M-E)/(W-E),L=A*U;for(let G=L+U;L!==G;L+=4)aM.slerpFlat(w,0,Y,L-U,Y,L,K);return w}}class wZ extends tM{InterpolantFactoryMethodLinear(A){return new IF(this.times,this.values,this.getValueSize(),A)}}wZ.prototype.ValueTypeName="quaternion";wZ.prototype.InterpolantFactoryMethodSmooth=void 0;class mw extends tM{constructor(A,E,M){super(A,E,M)}}mw.prototype.ValueTypeName="string";mw.prototype.ValueBufferType=Array;mw.prototype.DefaultInterpolation=2300;mw.prototype.InterpolantFactoryMethodLinear=void 0;mw.prototype.InterpolantFactoryMethodSmooth=void 0;class OF extends tM{}OF.prototype.ValueTypeName="vector";var CC={enabled:!1,files:{},add:function(A,E){if(this.enabled===!1)return;this.files[A]=E},get:function(A){if(this.enabled===!1)return;return this.files[A]},remove:function(A){delete this.files[A]},clear:function(){this.files={}}};class NF{constructor(A,E,M){let W=this,w=!1,Y=0,U=0,K=void 0,L=[];this.onStart=void 0,this.onLoad=A,this.onProgress=E,this.onError=M,this.itemStart=function(G){if(U++,w===!1){if(W.onStart!==void 0)W.onStart(G,Y,U)}w=!0},this.itemEnd=function(G){if(Y++,W.onProgress!==void 0)W.onProgress(G,Y,U);if(Y===U){if(w=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(G){if(W.onError!==void 0)W.onError(G)},this.resolveURL=function(G){if(K)return K(G);return G},this.setURLModifier=function(G){return K=G,this},this.addHandler=function(G,l){return L.push(G,l),this},this.removeHandler=function(G){let l=L.indexOf(G);if(l!==-1)L.splice(l,2);return this},this.getHandler=function(G){for(let l=0,C=L.length;l<C;l+=2){let F=L[l],I=L[l+1];if(F.global)F.lastIndex=0;if(F.test(G))return I}return null}}}var KN=new NF;class XK{constructor(A){this.manager=A!==void 0?A:KN,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(A,E){let M=this;return new Promise(function(W,w){M.load(A,W,E,w)})}parse(){}setCrossOrigin(A){return this.crossOrigin=A,this}setWithCredentials(A){return this.withCredentials=A,this}setPath(A){return this.path=A,this}setResourcePath(A){return this.resourcePath=A,this}setRequestHeader(A){return this.requestHeader=A,this}}XK.DEFAULT_MATERIAL_NAME="__DEFAULT";class JF extends XK{constructor(A){super(A)}load(A,E,M,W){if(this.path!==void 0)A=this.path+A;A=this.manager.resolveURL(A);let w=this,Y=CC.get(A);if(Y!==void 0)return w.manager.itemStart(A),setTimeout(function(){if(E)E(Y);w.manager.itemEnd(A)},0),Y;let U=cY("img");function K(){if(G(),CC.add(A,this),E)E(this);w.manager.itemEnd(A)}function L(l){if(G(),W)W(l);w.manager.itemError(A),w.manager.itemEnd(A)}function G(){U.removeEventListener("load",K,!1),U.removeEventListener("error",L,!1)}if(U.addEventListener("load",K,!1),U.addEventListener("error",L,!1),A.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)U.crossOrigin=this.crossOrigin}return w.manager.itemStart(A),U.src=A,U}}class YZ extends XK{constructor(A){super(A)}load(A,E,M,W){let w=new $E,Y=new JF(this.manager);return Y.setCrossOrigin(this.crossOrigin),Y.setPath(this.path),Y.load(A,function(U){if(w.image=U,w.needsUpdate=!0,E!==void 0)E(w)},M,W),w}}class UZ extends kE{constructor(A,E=1){super();this.isLight=!0,this.type="Light",this.color=new mA(A),this.intensity=E}dispose(){}copy(A,E){return super.copy(A,E),this.color.copy(A.color),this.intensity=A.intensity,this}toJSON(A){let E=super.toJSON(A);if(E.object.color=this.color.getHex(),E.object.intensity=this.intensity,this.groundColor!==void 0)E.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)E.object.distance=this.distance;if(this.angle!==void 0)E.object.angle=this.angle;if(this.decay!==void 0)E.object.decay=this.decay;if(this.penumbra!==void 0)E.object.penumbra=this.penumbra;if(this.shadow!==void 0)E.object.shadow=this.shadow.toJSON();if(this.target!==void 0)E.object.target=this.target.uuid;return E}}var ZC=new GE,t5=new f,$5=new f;class LN{constructor(A){this.camera=A,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xA(512,512),this.map=null,this.mapPass=null,this.matrix=new GE,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new NK,this._frameExtents=new xA(1,1),this._viewportCount=1,this._viewports=[new NE(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(A){let E=this.camera,M=this.matrix;t5.setFromMatrixPosition(A.matrixWorld),E.position.copy(t5),$5.setFromMatrixPosition(A.target.matrixWorld),E.lookAt($5),E.updateMatrixWorld(),ZC.multiplyMatrices(E.projectionMatrix,E.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ZC),M.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),M.multiply(ZC)}getViewport(A){return this._viewports[A]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(A){return this.camera=A.camera.clone(),this.intensity=A.intensity,this.bias=A.bias,this.radius=A.radius,this.mapSize.copy(A.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let A={};if(this.intensity!==1)A.intensity=this.intensity;if(this.bias!==0)A.bias=this.bias;if(this.normalBias!==0)A.normalBias=this.normalBias;if(this.radius!==1)A.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)A.mapSize=this.mapSize.toArray();return A.camera=this.camera.toJSON(!1).object,delete A.camera.matrix,A}}class KZ extends $G{constructor(A=-1,E=1,M=1,W=-1,w=0.1,Y=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=A,this.right=E,this.top=M,this.bottom=W,this.near=w,this.far=Y,this.updateProjectionMatrix()}copy(A,E){return super.copy(A,E),this.left=A.left,this.right=A.right,this.top=A.top,this.bottom=A.bottom,this.near=A.near,this.far=A.far,this.zoom=A.zoom,this.view=A.view===null?null:Object.assign({},A.view),this}setViewOffset(A,E,M,W,w,Y){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=E,this.view.offsetX=M,this.view.offsetY=W,this.view.width=w,this.view.height=Y,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let A=(this.right-this.left)/(2*this.zoom),E=(this.top-this.bottom)/(2*this.zoom),M=(this.right+this.left)/2,W=(this.top+this.bottom)/2,w=M-A,Y=M+A,U=W+E,K=W-E;if(this.view!==null&&this.view.enabled){let L=(this.right-this.left)/this.view.fullWidth/this.zoom,G=(this.top-this.bottom)/this.view.fullHeight/this.zoom;w+=L*this.view.offsetX,Y=w+L*this.view.width,U-=G*this.view.offsetY,K=U-G*this.view.height}this.projectionMatrix.makeOrthographic(w,Y,U,K,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){let E=super.toJSON(A);if(E.object.zoom=this.zoom,E.object.left=this.left,E.object.right=this.right,E.object.top=this.top,E.object.bottom=this.bottom,E.object.near=this.near,E.object.far=this.far,this.view!==null)E.object.view=Object.assign({},this.view);return E}}class GN extends LN{constructor(){super(new KZ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class LZ extends UZ{constructor(A,E){super(A,E);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kE.DEFAULT_UP),this.updateMatrix(),this.target=new kE,this.shadow=new GN}dispose(){this.shadow.dispose()}copy(A){return super.copy(A),this.target=A.target.clone(),this.shadow=A.shadow.clone(),this}}class GZ extends UZ{constructor(A,E){super(A,E);this.isAmbientLight=!0,this.type="AmbientLight"}}class qF extends YM{constructor(A=[]){super();this.isArrayCamera=!0,this.cameras=A}}var zF="\\[\\]\\.:\\/",OQ=new RegExp("["+zF+"]","g"),QF="[^"+zF+"]",NQ="[^"+zF.replace("\\.","")+"]",JQ=/((?:WC+[\/:])*)/.source.replace("WC",QF),qQ=/(WCOD+)?/.source.replace("WCOD",NQ),zQ=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",QF),QQ=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",QF),XQ=new RegExp("^"+JQ+qQ+zQ+QQ+"$"),RQ=["material","materials","bones","map"];class ZN{constructor(A,E,M){let W=M||ME.parseTrackName(E);this._targetGroup=A,this._bindings=A.subscribe_(E,W)}getValue(A,E){this.bind();let M=this._targetGroup.nCachedObjects_,W=this._bindings[M];if(W!==void 0)W.getValue(A,E)}setValue(A,E){let M=this._bindings;for(let W=this._targetGroup.nCachedObjects_,w=M.length;W!==w;++W)M[W].setValue(A,E)}bind(){let A=this._bindings;for(let E=this._targetGroup.nCachedObjects_,M=A.length;E!==M;++E)A[E].bind()}unbind(){let A=this._bindings;for(let E=this._targetGroup.nCachedObjects_,M=A.length;E!==M;++E)A[E].unbind()}}class ME{constructor(A,E,M){this.path=E,this.parsedPath=M||ME.parseTrackName(E),this.node=ME.findNode(A,this.parsedPath.nodeName),this.rootNode=A,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(A,E,M){if(!(A&&A.isAnimationObjectGroup))return new ME(A,E,M);else return new ME.Composite(A,E,M)}static sanitizeNodeName(A){return A.replace(/\s/g,"_").replace(OQ,"")}static parseTrackName(A){let E=XQ.exec(A);if(E===null)throw Error("PropertyBinding: Cannot parse trackName: "+A);let M={nodeName:E[2],objectName:E[3],objectIndex:E[4],propertyName:E[5],propertyIndex:E[6]},W=M.nodeName&&M.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let w=M.nodeName.substring(W+1);if(RQ.indexOf(w)!==-1)M.nodeName=M.nodeName.substring(0,W),M.objectName=w}if(M.propertyName===null||M.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+A);return M}static findNode(A,E){if(E===void 0||E===""||E==="."||E===-1||E===A.name||E===A.uuid)return A;if(A.skeleton){let M=A.skeleton.getBoneByName(E);if(M!==void 0)return M}if(A.children){let M=function(w){for(let Y=0;Y<w.length;Y++){let U=w[Y];if(U.name===E||U.uuid===E)return U;let K=M(U.children);if(K)return K}return null},W=M(A.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(A,E){A[E]=this.targetObject[this.propertyName]}_getValue_array(A,E){let M=this.resolvedProperty;for(let W=0,w=M.length;W!==w;++W)A[E++]=M[W]}_getValue_arrayElement(A,E){A[E]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(A,E){this.resolvedProperty.toArray(A,E)}_setValue_direct(A,E){this.targetObject[this.propertyName]=A[E]}_setValue_direct_setNeedsUpdate(A,E){this.targetObject[this.propertyName]=A[E],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(A,E){this.targetObject[this.propertyName]=A[E],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(A,E){let M=this.resolvedProperty;for(let W=0,w=M.length;W!==w;++W)M[W]=A[E++]}_setValue_array_setNeedsUpdate(A,E){let M=this.resolvedProperty;for(let W=0,w=M.length;W!==w;++W)M[W]=A[E++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(A,E){let M=this.resolvedProperty;for(let W=0,w=M.length;W!==w;++W)M[W]=A[E++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(A,E){this.resolvedProperty[this.propertyIndex]=A[E]}_setValue_arrayElement_setNeedsUpdate(A,E){this.resolvedProperty[this.propertyIndex]=A[E],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(A,E){this.resolvedProperty[this.propertyIndex]=A[E],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(A,E){this.resolvedProperty.fromArray(A,E)}_setValue_fromArray_setNeedsUpdate(A,E){this.resolvedProperty.fromArray(A,E),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(A,E){this.resolvedProperty.fromArray(A,E),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(A,E){this.bind(),this.getValue(A,E)}_setValue_unbound(A,E){this.bind(),this.setValue(A,E)}bind(){let A=this.node,E=this.parsedPath,M=E.objectName,W=E.propertyName,w=E.propertyIndex;if(!A)A=ME.findNode(this.rootNode,E.nodeName),this.node=A;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!A){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(M){let L=E.objectIndex;switch(M){case"materials":if(!A.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!A.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}A=A.material.materials;break;case"bones":if(!A.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}A=A.skeleton.bones;for(let G=0;G<A.length;G++)if(A[G].name===L){L=G;break}break;case"map":if("map"in A){A=A.map;break}if(!A.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!A.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}A=A.material.map;break;default:if(A[M]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}A=A[M]}if(L!==void 0){if(A[L]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,A);return}A=A[L]}}let Y=A[W];if(Y===void 0){let L=E.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+L+"."+W+" but it wasn't found.",A);return}let U=this.Versioning.None;if(this.targetObject=A,A.needsUpdate!==void 0)U=this.Versioning.NeedsUpdate;else if(A.matrixWorldNeedsUpdate!==void 0)U=this.Versioning.MatrixWorldNeedsUpdate;let K=this.BindingType.Direct;if(w!==void 0){if(W==="morphTargetInfluences"){if(!A.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!A.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(A.morphTargetDictionary[w]!==void 0)w=A.morphTargetDictionary[w]}K=this.BindingType.ArrayElement,this.resolvedProperty=Y,this.propertyIndex=w}else if(Y.fromArray!==void 0&&Y.toArray!==void 0)K=this.BindingType.HasFromToArray,this.resolvedProperty=Y;else if(Array.isArray(Y))K=this.BindingType.EntireArray,this.resolvedProperty=Y;else this.propertyName=W;this.getValue=this.GetterByBindingType[K],this.setValue=this.SetterByBindingTypeAndVersioning[K][U]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ME.Composite=ZN;ME.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ME.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ME.prototype.GetterByBindingType=[ME.prototype._getValue_direct,ME.prototype._getValue_array,ME.prototype._getValue_arrayElement,ME.prototype._getValue_toArray];ME.prototype.SetterByBindingTypeAndVersioning=[[ME.prototype._setValue_direct,ME.prototype._setValue_direct_setNeedsUpdate,ME.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ME.prototype._setValue_array,ME.prototype._setValue_array_setNeedsUpdate,ME.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ME.prototype._setValue_arrayElement,ME.prototype._setValue_arrayElement_setNeedsUpdate,ME.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ME.prototype._setValue_fromArray,ME.prototype._setValue_fromArray_setNeedsUpdate,ME.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var V0=new Float32Array(1);class RK{constructor(A=1,E=0,M=0){return this.radius=A,this.phi=E,this.theta=M,this}set(A,E,M){return this.radius=A,this.phi=E,this.theta=M,this}copy(A){return this.radius=A.radius,this.phi=A.phi,this.theta=A.theta,this}makeSafe(){return this.phi=pA(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(A){return this.setFromCartesianCoords(A.x,A.y,A.z)}setFromCartesianCoords(A,E,M){if(this.radius=Math.sqrt(A*A+E*E+M*M),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(A,M),this.phi=Math.acos(pA(E/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class ZZ extends TW{constructor(A,E=null){super();this.object=A,this.domElement=E,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function XF(A,E,M,W){let w=BQ(W);switch(M){case 1021:return A*E;case 1024:return A*E;case 1025:return A*E*2;case 1028:return A*E/w.components*w.byteLength;case 1029:return A*E/w.components*w.byteLength;case 1030:return A*E*2/w.components*w.byteLength;case 1031:return A*E*2/w.components*w.byteLength;case 1022:return A*E*3/w.components*w.byteLength;case 1023:return A*E*4/w.components*w.byteLength;case 1033:return A*E*4/w.components*w.byteLength;case 33776:case 33777:return Math.floor((A+3)/4)*Math.floor((E+3)/4)*8;case 33778:case 33779:return Math.floor((A+3)/4)*Math.floor((E+3)/4)*16;case 35841:case 35843:return Math.max(A,16)*Math.max(E,8)/4;case 35840:case 35842:return Math.max(A,8)*Math.max(E,8)/2;case 36196:case 37492:return Math.floor((A+3)/4)*Math.floor((E+3)/4)*8;case 37496:return Math.floor((A+3)/4)*Math.floor((E+3)/4)*16;case 37808:return Math.floor((A+3)/4)*Math.floor((E+3)/4)*16;case 37809:return Math.floor((A+4)/5)*Math.floor((E+3)/4)*16;case 37810:return Math.floor((A+4)/5)*Math.floor((E+4)/5)*16;case 37811:return Math.floor((A+5)/6)*Math.floor((E+4)/5)*16;case 37812:return Math.floor((A+5)/6)*Math.floor((E+5)/6)*16;case 37813:return Math.floor((A+7)/8)*Math.floor((E+4)/5)*16;case 37814:return Math.floor((A+7)/8)*Math.floor((E+5)/6)*16;case 37815:return Math.floor((A+7)/8)*Math.floor((E+7)/8)*16;case 37816:return Math.floor((A+9)/10)*Math.floor((E+4)/5)*16;case 37817:return Math.floor((A+9)/10)*Math.floor((E+5)/6)*16;case 37818:return Math.floor((A+9)/10)*Math.floor((E+7)/8)*16;case 37819:return Math.floor((A+9)/10)*Math.floor((E+9)/10)*16;case 37820:return Math.floor((A+11)/12)*Math.floor((E+9)/10)*16;case 37821:return Math.floor((A+11)/12)*Math.floor((E+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(A/4)*Math.ceil(E/4)*16;case 36283:case 36284:return Math.ceil(A/4)*Math.ceil(E/4)*8;case 36285:case 36286:return Math.ceil(A/4)*Math.ceil(E/4)*16}throw Error(`Unable to determine texture byte length for ${M} format.`)}function BQ(A){switch(A){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${A}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"171"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="171";function hN(){let A=null,E=!1,M=null,W=null;function w(Y,U){M(Y,U),W=A.requestAnimationFrame(w)}return{start:function(){if(E===!0)return;if(M===null)return;W=A.requestAnimationFrame(w),E=!0},stop:function(){A.cancelAnimationFrame(W),E=!1},setAnimationLoop:function(Y){M=Y},setContext:function(Y){A=Y}}}function VQ(A){let E=new WeakMap;function M(K,L){let{array:G,usage:l}=K,C=G.byteLength,F=A.createBuffer();A.bindBuffer(L,F),A.bufferData(L,G,l),K.onUploadCallback();let I;if(G instanceof Float32Array)I=A.FLOAT;else if(G instanceof Uint16Array)if(K.isFloat16BufferAttribute)I=A.HALF_FLOAT;else I=A.UNSIGNED_SHORT;else if(G instanceof Int16Array)I=A.SHORT;else if(G instanceof Uint32Array)I=A.UNSIGNED_INT;else if(G instanceof Int32Array)I=A.INT;else if(G instanceof Int8Array)I=A.BYTE;else if(G instanceof Uint8Array)I=A.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)I=A.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:F,type:I,bytesPerElement:G.BYTES_PER_ELEMENT,version:K.version,size:C}}function W(K,L,G){let{array:l,updateRanges:C}=L;if(A.bindBuffer(G,K),C.length===0)A.bufferSubData(G,0,l);else{C.sort((I,J)=>I.start-J.start);let F=0;for(let I=1;I<C.length;I++){let J=C[F],q=C[I];if(q.start<=J.start+J.count+1)J.count=Math.max(J.count,q.start+q.count-J.start);else++F,C[F]=q}C.length=F+1;for(let I=0,J=C.length;I<J;I++){let q=C[I];A.bufferSubData(G,q.start*l.BYTES_PER_ELEMENT,l,q.start,q.count)}L.clearUpdateRanges()}L.onUploadCallback()}function w(K){if(K.isInterleavedBufferAttribute)K=K.data;return E.get(K)}function Y(K){if(K.isInterleavedBufferAttribute)K=K.data;let L=E.get(K);if(L)A.deleteBuffer(L.buffer),E.delete(K)}function U(K,L){if(K.isInterleavedBufferAttribute)K=K.data;if(K.isGLBufferAttribute){let l=E.get(K);if(!l||l.version<K.version)E.set(K,{buffer:K.buffer,type:K.type,bytesPerElement:K.elementSize,version:K.version});return}let G=E.get(K);if(G===void 0)E.set(K,M(K,L));else if(G.version<K.version){if(G.size!==K.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(G.buffer,K,L),G.version=K.version}}return{get:w,remove:Y,update:U}}var HQ=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yQ=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TQ=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SQ=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kQ=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xQ=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,PQ=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uQ=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hQ=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fQ=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jQ=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vQ=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gQ=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pQ=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bQ=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cQ=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nQ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mQ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dQ=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iQ=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sQ=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,oQ=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rQ=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,aQ=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tQ=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$Q=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_Q=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eQ=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,AX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,EX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,MX="gl_FragColor = linearToOutputTexel( gl_FragColor );",WX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,YX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,UX=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,KX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,GX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ZX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,CX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FX=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,DX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OX=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,NX=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,JX=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,qX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zX=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,XX=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,RX=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,BX=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,VX=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HX=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yX=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TX=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SX=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kX=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xX=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,PX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pX=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bX=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cX=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nX=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dX=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rX=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$X=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_X=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,AR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ER=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,MR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,YR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,UR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,KR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,LR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,GR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ZR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,CR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,FR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,DR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,IR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,OR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,NR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,JR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,QR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,RR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,BR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,VR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,PR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,uR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,oR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$R=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_R=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AB=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,EB=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MB=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,WB=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wB=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jA={alphahash_fragment:HQ,alphahash_pars_fragment:yQ,alphamap_fragment:TQ,alphamap_pars_fragment:SQ,alphatest_fragment:kQ,alphatest_pars_fragment:xQ,aomap_fragment:PQ,aomap_pars_fragment:uQ,batching_pars_vertex:hQ,batching_vertex:fQ,begin_vertex:jQ,beginnormal_vertex:vQ,bsdfs:gQ,iridescence_fragment:pQ,bumpmap_pars_fragment:bQ,clipping_planes_fragment:cQ,clipping_planes_pars_fragment:nQ,clipping_planes_pars_vertex:mQ,clipping_planes_vertex:dQ,color_fragment:iQ,color_pars_fragment:sQ,color_pars_vertex:oQ,color_vertex:rQ,common:aQ,cube_uv_reflection_fragment:tQ,defaultnormal_vertex:$Q,displacementmap_pars_vertex:_Q,displacementmap_vertex:eQ,emissivemap_fragment:AX,emissivemap_pars_fragment:EX,colorspace_fragment:MX,colorspace_pars_fragment:WX,envmap_fragment:wX,envmap_common_pars_fragment:YX,envmap_pars_fragment:UX,envmap_pars_vertex:KX,envmap_physical_pars_fragment:JX,envmap_vertex:LX,fog_vertex:GX,fog_pars_vertex:ZX,fog_fragment:lX,fog_pars_fragment:CX,gradientmap_pars_fragment:FX,lightmap_pars_fragment:DX,lights_lambert_fragment:IX,lights_lambert_pars_fragment:OX,lights_pars_begin:NX,lights_toon_fragment:qX,lights_toon_pars_fragment:zX,lights_phong_fragment:QX,lights_phong_pars_fragment:XX,lights_physical_fragment:RX,lights_physical_pars_fragment:BX,lights_fragment_begin:VX,lights_fragment_maps:HX,lights_fragment_end:yX,logdepthbuf_fragment:TX,logdepthbuf_pars_fragment:SX,logdepthbuf_pars_vertex:kX,logdepthbuf_vertex:xX,map_fragment:PX,map_pars_fragment:uX,map_particle_fragment:hX,map_particle_pars_fragment:fX,metalnessmap_fragment:jX,metalnessmap_pars_fragment:vX,morphinstance_vertex:gX,morphcolor_vertex:pX,morphnormal_vertex:bX,morphtarget_pars_vertex:cX,morphtarget_vertex:nX,normal_fragment_begin:mX,normal_fragment_maps:dX,normal_pars_fragment:iX,normal_pars_vertex:sX,normal_vertex:oX,normalmap_pars_fragment:rX,clearcoat_normal_fragment_begin:aX,clearcoat_normal_fragment_maps:tX,clearcoat_pars_fragment:$X,iridescence_pars_fragment:_X,opaque_fragment:eX,packing:AR,premultiplied_alpha_fragment:ER,project_vertex:MR,dithering_fragment:WR,dithering_pars_fragment:wR,roughnessmap_fragment:YR,roughnessmap_pars_fragment:UR,shadowmap_pars_fragment:KR,shadowmap_pars_vertex:LR,shadowmap_vertex:GR,shadowmask_pars_fragment:ZR,skinbase_vertex:lR,skinning_pars_vertex:CR,skinning_vertex:FR,skinnormal_vertex:DR,specularmap_fragment:IR,specularmap_pars_fragment:OR,tonemapping_fragment:NR,tonemapping_pars_fragment:JR,transmission_fragment:qR,transmission_pars_fragment:zR,uv_pars_fragment:QR,uv_pars_vertex:XR,uv_vertex:RR,worldpos_vertex:BR,background_vert:VR,background_frag:HR,backgroundCube_vert:yR,backgroundCube_frag:TR,cube_vert:SR,cube_frag:kR,depth_vert:xR,depth_frag:PR,distanceRGBA_vert:uR,distanceRGBA_frag:hR,equirect_vert:fR,equirect_frag:jR,linedashed_vert:vR,linedashed_frag:gR,meshbasic_vert:pR,meshbasic_frag:bR,meshlambert_vert:cR,meshlambert_frag:nR,meshmatcap_vert:mR,meshmatcap_frag:dR,meshnormal_vert:iR,meshnormal_frag:sR,meshphong_vert:oR,meshphong_frag:rR,meshphysical_vert:aR,meshphysical_frag:tR,meshtoon_vert:$R,meshtoon_frag:_R,points_vert:eR,points_frag:AB,shadow_vert:EB,shadow_frag:MB,sprite_vert:WB,sprite_frag:wB},UA={common:{diffuse:{value:new mA(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new PA},alphaMap:{value:null},alphaMapTransform:{value:new PA},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new PA}},envmap:{envMap:{value:null},envMapRotation:{value:new PA},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new PA}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new PA}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new PA},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new PA},normalScale:{value:new xA(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new PA},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new PA}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new PA}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new PA}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new mA(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new mA(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new PA},alphaTest:{value:0},uvTransform:{value:new PA}},sprite:{diffuse:{value:new mA(16777215)},opacity:{value:1},center:{value:new xA(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new PA},alphaMap:{value:null},alphaMapTransform:{value:new PA},alphaTest:{value:0}}},LW={basic:{uniforms:_E([UA.common,UA.specularmap,UA.envmap,UA.aomap,UA.lightmap,UA.fog]),vertexShader:jA.meshbasic_vert,fragmentShader:jA.meshbasic_frag},lambert:{uniforms:_E([UA.common,UA.specularmap,UA.envmap,UA.aomap,UA.lightmap,UA.emissivemap,UA.bumpmap,UA.normalmap,UA.displacementmap,UA.fog,UA.lights,{emissive:{value:new mA(0)}}]),vertexShader:jA.meshlambert_vert,fragmentShader:jA.meshlambert_frag},phong:{uniforms:_E([UA.common,UA.specularmap,UA.envmap,UA.aomap,UA.lightmap,UA.emissivemap,UA.bumpmap,UA.normalmap,UA.displacementmap,UA.fog,UA.lights,{emissive:{value:new mA(0)},specular:{value:new mA(1118481)},shininess:{value:30}}]),vertexShader:jA.meshphong_vert,fragmentShader:jA.meshphong_frag},standard:{uniforms:_E([UA.common,UA.envmap,UA.aomap,UA.lightmap,UA.emissivemap,UA.bumpmap,UA.normalmap,UA.displacementmap,UA.roughnessmap,UA.metalnessmap,UA.fog,UA.lights,{emissive:{value:new mA(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jA.meshphysical_vert,fragmentShader:jA.meshphysical_frag},toon:{uniforms:_E([UA.common,UA.aomap,UA.lightmap,UA.emissivemap,UA.bumpmap,UA.normalmap,UA.displacementmap,UA.gradientmap,UA.fog,UA.lights,{emissive:{value:new mA(0)}}]),vertexShader:jA.meshtoon_vert,fragmentShader:jA.meshtoon_frag},matcap:{uniforms:_E([UA.common,UA.bumpmap,UA.normalmap,UA.displacementmap,UA.fog,{matcap:{value:null}}]),vertexShader:jA.meshmatcap_vert,fragmentShader:jA.meshmatcap_frag},points:{uniforms:_E([UA.points,UA.fog]),vertexShader:jA.points_vert,fragmentShader:jA.points_frag},dashed:{uniforms:_E([UA.common,UA.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jA.linedashed_vert,fragmentShader:jA.linedashed_frag},depth:{uniforms:_E([UA.common,UA.displacementmap]),vertexShader:jA.depth_vert,fragmentShader:jA.depth_frag},normal:{uniforms:_E([UA.common,UA.bumpmap,UA.normalmap,UA.displacementmap,{opacity:{value:1}}]),vertexShader:jA.meshnormal_vert,fragmentShader:jA.meshnormal_frag},sprite:{uniforms:_E([UA.sprite,UA.fog]),vertexShader:jA.sprite_vert,fragmentShader:jA.sprite_frag},background:{uniforms:{uvTransform:{value:new PA},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jA.background_vert,fragmentShader:jA.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new PA}},vertexShader:jA.backgroundCube_vert,fragmentShader:jA.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jA.cube_vert,fragmentShader:jA.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jA.equirect_vert,fragmentShader:jA.equirect_frag},distanceRGBA:{uniforms:_E([UA.common,UA.displacementmap,{referencePosition:{value:new f},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:jA.distanceRGBA_vert,fragmentShader:jA.distanceRGBA_frag},shadow:{uniforms:_E([UA.lights,UA.fog,{color:{value:new mA(0)},opacity:{value:1}}]),vertexShader:jA.shadow_vert,fragmentShader:jA.shadow_frag}};LW.physical={uniforms:_E([LW.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new PA},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new PA},clearcoatNormalScale:{value:new xA(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new PA},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new PA},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new PA},sheen:{value:0},sheenColor:{value:new mA(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new PA},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new PA},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new PA},transmissionSamplerSize:{value:new xA},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new PA},attenuationDistance:{value:0},attenuationColor:{value:new mA(0)},specularColor:{value:new mA(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new PA},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new PA},anisotropyVector:{value:new xA},anisotropyMap:{value:null},anisotropyMapTransform:{value:new PA}}]),vertexShader:jA.meshphysical_vert,fragmentShader:jA.meshphysical_frag};var lZ={r:0,b:0,g:0},dw=new wW,YB=new GE;function UB(A,E,M,W,w,Y,U){let K=new mA(0),L=Y===!0?0:1,G,l,C=null,F=0,I=null;function J(O){let B=O.isScene===!0?O.background:null;if(B&&B.isTexture)B=(O.backgroundBlurriness>0?M:E).get(B);return B}function q(O){let B=!1,T=J(O);if(T===null)Z(K,L);else if(T&&T.isColor)Z(T,1),B=!0;let V=A.xr.getEnvironmentBlendMode();if(V==="additive")W.buffers.color.setClear(0,0,0,1,U);else if(V==="alpha-blend")W.buffers.color.setClear(0,0,0,0,U);if(A.autoClear||B)W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),A.clear(A.autoClearColor,A.autoClearDepth,A.autoClearStencil)}function D(O,B){let T=J(B);if(T&&(T.isCubeTexture||T.mapping===ZK)){if(l===void 0)l=new LM(new $Y(1,1,1),new RM({name:"BackgroundCubeMaterial",uniforms:cw(LW.backgroundCube.uniforms),vertexShader:LW.backgroundCube.vertexShader,fragmentShader:LW.backgroundCube.fragmentShader,side:UM,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(V,H,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),w.update(l);if(dw.copy(B.backgroundRotation),dw.x*=-1,dw.y*=-1,dw.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1)dw.y*=-1,dw.z*=-1;if(l.material.uniforms.envMap.value=T,l.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=B.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(YB.makeRotationFromEuler(dw)),l.material.toneMapped=oA.getTransfer(T.colorSpace)!==YE,C!==T||F!==T.version||I!==A.toneMapping)l.material.needsUpdate=!0,C=T,F=T.version,I=A.toneMapping;l.layers.enableAll(),O.unshift(l,l.geometry,l.material,0,0,null)}else if(T&&T.isTexture){if(G===void 0)G=new LM(new QK(2,2),new RM({name:"BackgroundMaterial",uniforms:cw(LW.background.uniforms),vertexShader:LW.background.vertexShader,fragmentShader:LW.background.fragmentShader,side:nY,depthTest:!1,depthWrite:!1,fog:!1})),G.geometry.deleteAttribute("normal"),Object.defineProperty(G.material,"map",{get:function(){return this.uniforms.t2D.value}}),w.update(G);if(G.material.uniforms.t2D.value=T,G.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,G.material.toneMapped=oA.getTransfer(T.colorSpace)!==YE,T.matrixAutoUpdate===!0)T.updateMatrix();if(G.material.uniforms.uvTransform.value.copy(T.matrix),C!==T||F!==T.version||I!==A.toneMapping)G.material.needsUpdate=!0,C=T,F=T.version,I=A.toneMapping;G.layers.enableAll(),O.unshift(G,G.geometry,G.material,0,0,null)}}function Z(O,B){O.getRGB(lZ,YF(A)),W.buffers.color.setClear(lZ.r,lZ.g,lZ.b,B,U)}function N(){if(l!==void 0)l.geometry.dispose(),l.material.dispose();if(G!==void 0)G.geometry.dispose(),G.material.dispose()}return{getClearColor:function(){return K},setClearColor:function(O,B=1){K.set(O),L=B,Z(K,L)},getClearAlpha:function(){return L},setClearAlpha:function(O){L=O,Z(K,L)},render:q,addToRenderList:D,dispose:N}}function KB(A,E){let M=A.getParameter(A.MAX_VERTEX_ATTRIBS),W={},w=F(null),Y=w,U=!1;function K(X,S,v,b,n){let a=!1,m=C(b,v,S);if(Y!==m)Y=m,G(Y.object);if(a=I(X,b,v,n),a)J(X,b,v,n);if(n!==null)E.update(n,A.ELEMENT_ARRAY_BUFFER);if(a||U){if(U=!1,B(X,S,v,b),n!==null)A.bindBuffer(A.ELEMENT_ARRAY_BUFFER,E.get(n).buffer)}}function L(){return A.createVertexArray()}function G(X){return A.bindVertexArray(X)}function l(X){return A.deleteVertexArray(X)}function C(X,S,v){let b=v.wireframe===!0,n=W[X.id];if(n===void 0)n={},W[X.id]=n;let a=n[S.id];if(a===void 0)a={},n[S.id]=a;let m=a[b];if(m===void 0)m=F(L()),a[b]=m;return m}function F(X){let S=[],v=[],b=[];for(let n=0;n<M;n++)S[n]=0,v[n]=0,b[n]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:v,attributeDivisors:b,object:X,attributes:{},index:null}}function I(X,S,v,b){let n=Y.attributes,a=S.attributes,m=0,_=v.getAttributes();for(let c in _)if(_[c].location>=0){let ZA=n[c],yA=a[c];if(yA===void 0){if(c==="instanceMatrix"&&X.instanceMatrix)yA=X.instanceMatrix;if(c==="instanceColor"&&X.instanceColor)yA=X.instanceColor}if(ZA===void 0)return!0;if(ZA.attribute!==yA)return!0;if(yA&&ZA.data!==yA.data)return!0;m++}if(Y.attributesNum!==m)return!0;if(Y.index!==b)return!0;return!1}function J(X,S,v,b){let n={},a=S.attributes,m=0,_=v.getAttributes();for(let c in _)if(_[c].location>=0){let ZA=a[c];if(ZA===void 0){if(c==="instanceMatrix"&&X.instanceMatrix)ZA=X.instanceMatrix;if(c==="instanceColor"&&X.instanceColor)ZA=X.instanceColor}let yA={};if(yA.attribute=ZA,ZA&&ZA.data)yA.data=ZA.data;n[c]=yA,m++}Y.attributes=n,Y.attributesNum=m,Y.index=b}function q(){let X=Y.newAttributes;for(let S=0,v=X.length;S<v;S++)X[S]=0}function D(X){Z(X,0)}function Z(X,S){let{newAttributes:v,enabledAttributes:b,attributeDivisors:n}=Y;if(v[X]=1,b[X]===0)A.enableVertexAttribArray(X),b[X]=1;if(n[X]!==S)A.vertexAttribDivisor(X,S),n[X]=S}function N(){let{newAttributes:X,enabledAttributes:S}=Y;for(let v=0,b=S.length;v<b;v++)if(S[v]!==X[v])A.disableVertexAttribArray(v),S[v]=0}function O(X,S,v,b,n,a,m){if(m===!0)A.vertexAttribIPointer(X,S,v,n,a);else A.vertexAttribPointer(X,S,v,b,n,a)}function B(X,S,v,b){q();let n=b.attributes,a=v.getAttributes(),m=S.defaultAttributeValues;for(let _ in a){let c=a[_];if(c.location>=0){let GA=n[_];if(GA===void 0){if(_==="instanceMatrix"&&X.instanceMatrix)GA=X.instanceMatrix;if(_==="instanceColor"&&X.instanceColor)GA=X.instanceColor}if(GA!==void 0){let{normalized:ZA,itemSize:yA}=GA,vA=E.get(GA);if(vA===void 0)continue;let{buffer:i,type:EA,bytesPerElement:QA}=vA,XA=EA===A.INT||EA===A.UNSIGNED_INT||GA.gpuType===JC;if(GA.isInterleavedBufferAttribute){let YA=GA.data,HA=YA.stride,aA=GA.offset;if(YA.isInstancedInterleavedBuffer){for(let bA=0;bA<c.locationSize;bA++)Z(c.location+bA,YA.meshPerAttribute);if(X.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=YA.meshPerAttribute*YA.count}else for(let bA=0;bA<c.locationSize;bA++)D(c.location+bA);A.bindBuffer(A.ARRAY_BUFFER,i);for(let bA=0;bA<c.locationSize;bA++)O(c.location+bA,yA/c.locationSize,EA,ZA,HA*QA,(aA+yA/c.locationSize*bA)*QA,XA)}else{if(GA.isInstancedBufferAttribute){for(let YA=0;YA<c.locationSize;YA++)Z(c.location+YA,GA.meshPerAttribute);if(X.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=GA.meshPerAttribute*GA.count}else for(let YA=0;YA<c.locationSize;YA++)D(c.location+YA);A.bindBuffer(A.ARRAY_BUFFER,i);for(let YA=0;YA<c.locationSize;YA++)O(c.location+YA,yA/c.locationSize,EA,ZA,yA*QA,yA/c.locationSize*YA*QA,XA)}}else if(m!==void 0){let ZA=m[_];if(ZA!==void 0)switch(ZA.length){case 2:A.vertexAttrib2fv(c.location,ZA);break;case 3:A.vertexAttrib3fv(c.location,ZA);break;case 4:A.vertexAttrib4fv(c.location,ZA);break;default:A.vertexAttrib1fv(c.location,ZA)}}}}N()}function T(){P();for(let X in W){let S=W[X];for(let v in S){let b=S[v];for(let n in b)l(b[n].object),delete b[n];delete S[v]}delete W[X]}}function V(X){if(W[X.id]===void 0)return;let S=W[X.id];for(let v in S){let b=S[v];for(let n in b)l(b[n].object),delete b[n];delete S[v]}delete W[X.id]}function H(X){for(let S in W){let v=W[S];if(v[X.id]===void 0)continue;let b=v[X.id];for(let n in b)l(b[n].object),delete b[n];delete v[X.id]}}function P(){if(Q(),U=!0,Y===w)return;Y=w,G(Y.object)}function Q(){w.geometry=null,w.program=null,w.wireframe=!1}return{setup:K,reset:P,resetDefaultState:Q,dispose:T,releaseStatesOfGeometry:V,releaseStatesOfProgram:H,initAttributes:q,enableAttribute:D,disableUnusedAttributes:N}}function LB(A,E,M){let W;function w(G){W=G}function Y(G,l){A.drawArrays(W,G,l),M.update(l,W,1)}function U(G,l,C){if(C===0)return;A.drawArraysInstanced(W,G,l,C),M.update(l,W,C)}function K(G,l,C){if(C===0)return;E.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,G,0,l,0,C);let I=0;for(let J=0;J<C;J++)I+=l[J];M.update(I,W,1)}function L(G,l,C,F){if(C===0)return;let I=E.get("WEBGL_multi_draw");if(I===null)for(let J=0;J<G.length;J++)U(G[J],l[J],F[J]);else{I.multiDrawArraysInstancedWEBGL(W,G,0,l,0,F,0,C);let J=0;for(let q=0;q<C;q++)J+=l[q]*F[q];M.update(J,W,1)}}this.setMode=w,this.render=Y,this.renderInstances=U,this.renderMultiDraw=K,this.renderMultiDrawInstances=L}function GB(A,E,M,W){let w;function Y(){if(w!==void 0)return w;if(E.has("EXT_texture_filter_anisotropic")===!0){let H=E.get("EXT_texture_filter_anisotropic");w=A.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else w=0;return w}function U(H){if(H!==KW&&W.convert(H)!==A.getParameter(A.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function K(H){let P=H===FK&&(E.has("EXT_color_buffer_half_float")||E.has("EXT_color_buffer_float"));if(H!==Uw&&W.convert(H)!==A.getParameter(A.IMPLEMENTATION_COLOR_READ_TYPE)&&H!==Kw&&!P)return!1;return!0}function L(H){if(H==="highp"){if(A.getShaderPrecisionFormat(A.VERTEX_SHADER,A.HIGH_FLOAT).precision>0&&A.getShaderPrecisionFormat(A.FRAGMENT_SHADER,A.HIGH_FLOAT).precision>0)return"highp";H="mediump"}if(H==="mediump"){if(A.getShaderPrecisionFormat(A.VERTEX_SHADER,A.MEDIUM_FLOAT).precision>0&&A.getShaderPrecisionFormat(A.FRAGMENT_SHADER,A.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let G=M.precision!==void 0?M.precision:"highp",l=L(G);if(l!==G)console.warn("THREE.WebGLRenderer:",G,"not supported, using",l,"instead."),G=l;let C=M.logarithmicDepthBuffer===!0,F=M.reverseDepthBuffer===!0&&E.has("EXT_clip_control"),I=A.getParameter(A.MAX_TEXTURE_IMAGE_UNITS),J=A.getParameter(A.MAX_VERTEX_TEXTURE_IMAGE_UNITS),q=A.getParameter(A.MAX_TEXTURE_SIZE),D=A.getParameter(A.MAX_CUBE_MAP_TEXTURE_SIZE),Z=A.getParameter(A.MAX_VERTEX_ATTRIBS),N=A.getParameter(A.MAX_VERTEX_UNIFORM_VECTORS),O=A.getParameter(A.MAX_VARYING_VECTORS),B=A.getParameter(A.MAX_FRAGMENT_UNIFORM_VECTORS),T=J>0,V=A.getParameter(A.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:Y,getMaxPrecision:L,textureFormatReadable:U,textureTypeReadable:K,precision:G,logarithmicDepthBuffer:C,reverseDepthBuffer:F,maxTextures:I,maxVertexTextures:J,maxTextureSize:q,maxCubemapSize:D,maxAttributes:Z,maxVertexUniforms:N,maxVaryings:O,maxFragmentUniforms:B,vertexTextures:T,maxSamples:V}}function ZB(A){let E=this,M=null,W=0,w=!1,Y=!1,U=new rM,K=new PA,L={value:null,needsUpdate:!1};this.uniform=L,this.numPlanes=0,this.numIntersection=0,this.init=function(C,F){let I=C.length!==0||F||W!==0||w;return w=F,W=C.length,I},this.beginShadows=function(){Y=!0,l(null)},this.endShadows=function(){Y=!1},this.setGlobalState=function(C,F){M=l(C,F,0)},this.setState=function(C,F,I){let{clippingPlanes:J,clipIntersection:q,clipShadows:D}=C,Z=A.get(C);if(!w||J===null||J.length===0||Y&&!D)if(Y)l(null);else G();else{let N=Y?0:W,O=N*4,B=Z.clippingState||null;L.value=B,B=l(J,F,O,I);for(let T=0;T!==O;++T)B[T]=M[T];Z.clippingState=B,this.numIntersection=q?this.numPlanes:0,this.numPlanes+=N}};function G(){if(L.value!==M)L.value=M,L.needsUpdate=W>0;E.numPlanes=W,E.numIntersection=0}function l(C,F,I,J){let q=C!==null?C.length:0,D=null;if(q!==0){if(D=L.value,J!==!0||D===null){let Z=I+q*4,N=F.matrixWorldInverse;if(K.getNormalMatrix(N),D===null||D.length<Z)D=new Float32Array(Z);for(let O=0,B=I;O!==q;++O,B+=4)U.copy(C[O]).applyMatrix4(N,K),U.normal.toArray(D,B),D[B+3]=U.constant}L.value=D,L.needsUpdate=!0}return E.numPlanes=q,E.numIntersection=0,D}}function lB(A){let E=new WeakMap;function M(U,K){if(K===jG)U.mapping=dY;else if(K===vG)U.mapping=hw;return U}function W(U){if(U&&U.isTexture){let K=U.mapping;if(K===jG||K===vG)if(E.has(U)){let L=E.get(U).texture;return M(L,U.mapping)}else{let L=U.image;if(L&&L.height>0){let G=new KF(L.height);return G.fromEquirectangularTexture(A,U),E.set(U,G),U.addEventListener("dispose",w),M(G.texture,U.mapping)}else return null}}return U}function w(U){let K=U.target;K.removeEventListener("dispose",w);let L=E.get(K);if(L!==void 0)E.delete(K),L.dispose()}function Y(){E=new WeakMap}return{get:W,dispose:Y}}var EU=4,lN=[0.125,0.215,0.35,0.446,0.526,0.582],ow=20,RF=new KZ,CN=new mA,BF=null,VF=0,HF=0,yF=!1,sw=(1+Math.sqrt(5))/2,AU=1/sw,FN=[new f(-sw,AU,0),new f(sw,AU,0),new f(-AU,0,sw),new f(AU,0,sw),new f(0,sw,-AU),new f(0,sw,AU),new f(-1,1,-1),new f(1,1,-1),new f(-1,1,1),new f(1,1,1)];class SF{constructor(A){this._renderer=A,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(A,E=0,M=0.1,W=100){BF=this._renderer.getRenderTarget(),VF=this._renderer.getActiveCubeFace(),HF=this._renderer.getActiveMipmapLevel(),yF=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let w=this._allocateTargets();if(w.depthBuffer=!0,this._sceneToCubeUV(A,M,W,w),E>0)this._blur(w,0,0,E);return this._applyPMREM(w),this._cleanup(w),w}fromEquirectangular(A,E=null){return this._fromTexture(A,E)}fromCubemap(A,E=null){return this._fromTexture(A,E)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=ON(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=IN(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(A){this._lodMax=Math.floor(Math.log2(A)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let A=0;A<this._lodPlanes.length;A++)this._lodPlanes[A].dispose()}_cleanup(A){this._renderer.setRenderTarget(BF,VF,HF),this._renderer.xr.enabled=yF,A.scissorTest=!1,CZ(A,0,0,A.width,A.height)}_fromTexture(A,E){if(A.mapping===dY||A.mapping===hw)this._setSize(A.image.length===0?16:A.image[0].width||A.image[0].image.width);else this._setSize(A.image.width/4);BF=this._renderer.getRenderTarget(),VF=this._renderer.getActiveCubeFace(),HF=this._renderer.getActiveMipmapLevel(),yF=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let M=E||this._allocateTargets();return this._textureToCubeUV(A,M),this._applyPMREM(M),this._cleanup(M),M}_allocateTargets(){let A=3*Math.max(this._cubeSize,112),E=4*this._cubeSize,M={magFilter:fw,minFilter:fw,generateMipmaps:!1,type:FK,format:KW,colorSpace:OK,depthBuffer:!1},W=DN(A,E,M);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==A||this._pingPongRenderTarget.height!==E){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=DN(A,E,M);let{_lodMax:w}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=CB(w)),this._blurMaterial=FB(w,A,E)}return W}_compileMaterial(A){let E=new LM(this._lodPlanes[0],A);this._renderer.compile(E,RF)}_sceneToCubeUV(A,E,M,W){let U=new YM(90,1,E,M),K=[1,-1,1,1,1,1],L=[1,1,1,-1,-1,-1],G=this._renderer,l=G.autoClear,C=G.toneMapping;G.getClearColor(CN),G.toneMapping=yW,G.autoClear=!1;let F=new tY({name:"PMREM.Background",side:UM,depthWrite:!1,depthTest:!1}),I=new LM(new $Y,F),J=!1,q=A.background;if(q){if(q.isColor)F.color.copy(q),A.background=null,J=!0}else F.color.copy(CN),J=!0;for(let D=0;D<6;D++){let Z=D%3;if(Z===0)U.up.set(0,K[D],0),U.lookAt(L[D],0,0);else if(Z===1)U.up.set(0,0,K[D]),U.lookAt(0,L[D],0);else U.up.set(0,K[D],0),U.lookAt(0,0,L[D]);let N=this._cubeSize;if(CZ(W,Z*N,D>2?N:0,N,N),G.setRenderTarget(W),J)G.render(I,U);G.render(A,U)}I.geometry.dispose(),I.material.dispose(),G.toneMapping=C,G.autoClear=l,A.background=q}_textureToCubeUV(A,E){let M=this._renderer,W=A.mapping===dY||A.mapping===hw;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=ON();this._cubemapMaterial.uniforms.flipEnvMap.value=A.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=IN();let w=W?this._cubemapMaterial:this._equirectMaterial,Y=new LM(this._lodPlanes[0],w),U=w.uniforms;U.envMap.value=A;let K=this._cubeSize;CZ(E,0,0,3*K,2*K),M.setRenderTarget(E),M.render(Y,RF)}_applyPMREM(A){let E=this._renderer,M=E.autoClear;E.autoClear=!1;let W=this._lodPlanes.length;for(let w=1;w<W;w++){let Y=Math.sqrt(this._sigmas[w]*this._sigmas[w]-this._sigmas[w-1]*this._sigmas[w-1]),U=FN[(W-w-1)%FN.length];this._blur(A,w-1,w,Y,U)}E.autoClear=M}_blur(A,E,M,W,w){let Y=this._pingPongRenderTarget;this._halfBlur(A,Y,E,M,W,"latitudinal",w),this._halfBlur(Y,A,M,M,W,"longitudinal",w)}_halfBlur(A,E,M,W,w,Y,U){let K=this._renderer,L=this._blurMaterial;if(Y!=="latitudinal"&&Y!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let G=3,l=new LM(this._lodPlanes[W],L),C=L.uniforms,F=this._sizeLods[M]-1,I=isFinite(w)?Math.PI/(2*F):2*Math.PI/(2*ow-1),J=w/I,q=isFinite(w)?1+Math.floor(G*J):ow;if(q>ow)console.warn(`sigmaRadians, ${w}, is too large and will clip, as it requested ${q} samples when the maximum is set to ${ow}`);let D=[],Z=0;for(let V=0;V<ow;++V){let H=V/J,P=Math.exp(-H*H/2);if(D.push(P),V===0)Z+=P;else if(V<q)Z+=2*P}for(let V=0;V<D.length;V++)D[V]=D[V]/Z;if(C.envMap.value=A.texture,C.samples.value=q,C.weights.value=D,C.latitudinal.value=Y==="latitudinal",U)C.poleAxis.value=U;let{_lodMax:N}=this;C.dTheta.value=I,C.mipInt.value=N-M;let O=this._sizeLods[W],B=3*O*(W>N-EU?W-N+EU:0),T=4*(this._cubeSize-O);CZ(E,B,T,3*O,2*O),K.setRenderTarget(E),K.render(l,RF)}}function CB(A){let E=[],M=[],W=[],w=A,Y=A-EU+1+lN.length;for(let U=0;U<Y;U++){let K=Math.pow(2,w);M.push(K);let L=1/K;if(U>A-EU)L=lN[U-A+EU-1];else if(U===0)L=0;W.push(L);let G=1/(K-2),l=-G,C=1+G,F=[l,l,C,l,C,C,l,l,C,C,l,C],I=6,J=6,q=3,D=2,Z=1,N=new Float32Array(q*J*I),O=new Float32Array(D*J*I),B=new Float32Array(Z*J*I);for(let V=0;V<I;V++){let H=V%3*2/3-1,P=V>2?0:-1,Q=[H,P,0,H+0.6666666666666666,P,0,H+0.6666666666666666,P+1,0,H,P,0,H+0.6666666666666666,P+1,0,H,P+1,0];N.set(Q,q*J*V),O.set(F,D*J*V);let X=[V,V,V,V,V,V];B.set(X,Z*J*V)}let T=new KM;if(T.setAttribute("position",new fM(N,q)),T.setAttribute("uv",new fM(O,D)),T.setAttribute("faceIndex",new fM(B,Z)),E.push(T),w>EU)w--}return{lodPlanes:E,sizeLods:M,sigmas:W}}function DN(A,E,M){let W=new SW(A,E,M);return W.texture.mapping=ZK,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function CZ(A,E,M,W,w){A.viewport.set(E,M,W,w),A.scissor.set(E,M,W,w)}function FB(A,E,M){let W=new Float32Array(ow),w=new f(0,1,0);return new RM({name:"SphericalGaussianBlur",defines:{n:ow,CUBEUV_TEXEL_WIDTH:1/E,CUBEUV_TEXEL_HEIGHT:1/M,CUBEUV_MAX_MIP:`${A}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:W},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:w}},vertexShader:xF(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yw,depthTest:!1,depthWrite:!1})}function IN(){return new RM({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xF(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yw,depthTest:!1,depthWrite:!1})}function ON(){return new RM({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xF(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yw,depthTest:!1,depthWrite:!1})}function xF(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function DB(A){let E=new WeakMap,M=null;function W(K){if(K&&K.isTexture){let L=K.mapping,G=L===jG||L===vG,l=L===dY||L===hw;if(G||l){let C=E.get(K),F=C!==void 0?C.texture.pmremVersion:0;if(K.isRenderTargetTexture&&K.pmremVersion!==F){if(M===null)M=new SF(A);return C=G?M.fromEquirectangular(K,C):M.fromCubemap(K,C),C.texture.pmremVersion=K.pmremVersion,E.set(K,C),C.texture}else if(C!==void 0)return C.texture;else{let I=K.image;if(G&&I&&I.height>0||l&&I&&w(I)){if(M===null)M=new SF(A);return C=G?M.fromEquirectangular(K):M.fromCubemap(K),C.texture.pmremVersion=K.pmremVersion,E.set(K,C),K.addEventListener("dispose",Y),C.texture}else return null}}}return K}function w(K){let L=0,G=6;for(let l=0;l<G;l++)if(K[l]!==void 0)L++;return L===G}function Y(K){let L=K.target;L.removeEventListener("dispose",Y);let G=E.get(L);if(G!==void 0)E.delete(L),G.dispose()}function U(){if(E=new WeakMap,M!==null)M.dispose(),M=null}return{get:W,dispose:U}}function IB(A){let E={};function M(W){if(E[W]!==void 0)return E[W];let w;switch(W){case"WEBGL_depth_texture":w=A.getExtension("WEBGL_depth_texture")||A.getExtension("MOZ_WEBGL_depth_texture")||A.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":w=A.getExtension("EXT_texture_filter_anisotropic")||A.getExtension("MOZ_EXT_texture_filter_anisotropic")||A.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":w=A.getExtension("WEBGL_compressed_texture_s3tc")||A.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||A.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":w=A.getExtension("WEBGL_compressed_texture_pvrtc")||A.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:w=A.getExtension(W)}return E[W]=w,w}return{has:function(W){return M(W)!==null},init:function(){M("EXT_color_buffer_float"),M("WEBGL_clip_cull_distance"),M("OES_texture_float_linear"),M("EXT_color_buffer_half_float"),M("WEBGL_multisampled_render_to_texture"),M("WEBGL_render_shared_exponent")},get:function(W){let w=M(W);if(w===null)vw("THREE.WebGLRenderer: "+W+" extension not supported.");return w}}}function OB(A,E,M,W){let w={},Y=new WeakMap;function U(C){let F=C.target;if(F.index!==null)E.remove(F.index);for(let J in F.attributes)E.remove(F.attributes[J]);F.removeEventListener("dispose",U),delete w[F.id];let I=Y.get(F);if(I)E.remove(I),Y.delete(F);if(W.releaseStatesOfGeometry(F),F.isInstancedBufferGeometry===!0)delete F._maxInstanceCount;M.memory.geometries--}function K(C,F){if(w[F.id]===!0)return F;return F.addEventListener("dispose",U),w[F.id]=!0,M.memory.geometries++,F}function L(C){let F=C.attributes;for(let I in F)E.update(F[I],A.ARRAY_BUFFER)}function G(C){let F=[],I=C.index,J=C.attributes.position,q=0;if(I!==null){let N=I.array;q=I.version;for(let O=0,B=N.length;O<B;O+=3){let T=N[O+0],V=N[O+1],H=N[O+2];F.push(T,V,V,H,H,T)}}else if(J!==void 0){let N=J.array;q=J.version;for(let O=0,B=N.length/3-1;O<B;O+=3){let T=O+0,V=O+1,H=O+2;F.push(T,V,V,H,H,T)}}else return;let D=new((EF(F))?tG:aG)(F,1);D.version=q;let Z=Y.get(C);if(Z)E.remove(Z);Y.set(C,D)}function l(C){let F=Y.get(C);if(F){let I=C.index;if(I!==null){if(F.version<I.version)G(C)}}else G(C);return Y.get(C)}return{get:K,update:L,getWireframeAttribute:l}}function NB(A,E,M){let W;function w(F){W=F}let Y,U;function K(F){Y=F.type,U=F.bytesPerElement}function L(F,I){A.drawElements(W,I,Y,F*U),M.update(I,W,1)}function G(F,I,J){if(J===0)return;A.drawElementsInstanced(W,I,Y,F*U,J),M.update(I,W,J)}function l(F,I,J){if(J===0)return;E.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,I,0,Y,F,0,J);let D=0;for(let Z=0;Z<J;Z++)D+=I[Z];M.update(D,W,1)}function C(F,I,J,q){if(J===0)return;let D=E.get("WEBGL_multi_draw");if(D===null)for(let Z=0;Z<F.length;Z++)G(F[Z]/U,I[Z],q[Z]);else{D.multiDrawElementsInstancedWEBGL(W,I,0,Y,F,0,q,0,J);let Z=0;for(let N=0;N<J;N++)Z+=I[N]*q[N];M.update(Z,W,1)}}this.setMode=w,this.setIndex=K,this.render=L,this.renderInstances=G,this.renderMultiDraw=l,this.renderMultiDrawInstances=C}function JB(A){let E={geometries:0,textures:0},M={frame:0,calls:0,triangles:0,points:0,lines:0};function W(Y,U,K){switch(M.calls++,U){case A.TRIANGLES:M.triangles+=K*(Y/3);break;case A.LINES:M.lines+=K*(Y/2);break;case A.LINE_STRIP:M.lines+=K*(Y-1);break;case A.LINE_LOOP:M.lines+=K*Y;break;case A.POINTS:M.points+=K*Y;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",U);break}}function w(){M.calls=0,M.triangles=0,M.points=0,M.lines=0}return{memory:E,render:M,programs:null,autoReset:!0,reset:w,update:W}}function qB(A,E,M){let W=new WeakMap,w=new NE;function Y(U,K,L){let G=U.morphTargetInfluences,l=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,C=l!==void 0?l.length:0,F=W.get(K);if(F===void 0||F.count!==C){let Q=function(){H.dispose(),W.delete(K),K.removeEventListener("dispose",Q)};if(F!==void 0)F.texture.dispose();let I=K.morphAttributes.position!==void 0,J=K.morphAttributes.normal!==void 0,q=K.morphAttributes.color!==void 0,D=K.morphAttributes.position||[],Z=K.morphAttributes.normal||[],N=K.morphAttributes.color||[],O=0;if(I===!0)O=1;if(J===!0)O=2;if(q===!0)O=3;let B=K.attributes.position.count*O,T=1;if(B>E.maxTextureSize)T=Math.ceil(B/E.maxTextureSize),B=E.maxTextureSize;let V=new Float32Array(B*T*4*C),H=new oG(V,B,T,C);H.type=Kw,H.needsUpdate=!0;let P=O*4;for(let X=0;X<C;X++){let S=D[X],v=Z[X],b=N[X],n=B*T*4*X;for(let a=0;a<S.count;a++){let m=a*P;if(I===!0)w.fromBufferAttribute(S,a),V[n+m+0]=w.x,V[n+m+1]=w.y,V[n+m+2]=w.z,V[n+m+3]=0;if(J===!0)w.fromBufferAttribute(v,a),V[n+m+4]=w.x,V[n+m+5]=w.y,V[n+m+6]=w.z,V[n+m+7]=0;if(q===!0)w.fromBufferAttribute(b,a),V[n+m+8]=w.x,V[n+m+9]=w.y,V[n+m+10]=w.z,V[n+m+11]=b.itemSize===4?w.w:1}}F={count:C,texture:H,size:new xA(B,T)},W.set(K,F),K.addEventListener("dispose",Q)}if(U.isInstancedMesh===!0&&U.morphTexture!==null)L.getUniforms().setValue(A,"morphTexture",U.morphTexture,M);else{let I=0;for(let q=0;q<G.length;q++)I+=G[q];let J=K.morphTargetsRelative?1:1-I;L.getUniforms().setValue(A,"morphTargetBaseInfluence",J),L.getUniforms().setValue(A,"morphTargetInfluences",G)}L.getUniforms().setValue(A,"morphTargetsTexture",F.texture,M),L.getUniforms().setValue(A,"morphTargetsTextureSize",F.size)}return{update:Y}}function zB(A,E,M,W){let w=new WeakMap;function Y(L){let G=W.render.frame,l=L.geometry,C=E.get(L,l);if(w.get(C)!==G)E.update(C),w.set(C,G);if(L.isInstancedMesh){if(L.hasEventListener("dispose",K)===!1)L.addEventListener("dispose",K);if(w.get(L)!==G){if(M.update(L.instanceMatrix,A.ARRAY_BUFFER),L.instanceColor!==null)M.update(L.instanceColor,A.ARRAY_BUFFER);w.set(L,G)}}if(L.isSkinnedMesh){let F=L.skeleton;if(w.get(F)!==G)F.update(),w.set(F,G)}return C}function U(){w=new WeakMap}function K(L){let G=L.target;if(G.removeEventListener("dispose",K),M.remove(G.instanceMatrix),G.instanceColor!==null)M.remove(G.instanceColor)}return{update:Y,dispose:U}}var fN=new $E,NN=new MZ(1,1),jN=new oG,vN=new wF,gN=new _G,JN=[],qN=[],zN=new Float32Array(16),QN=new Float32Array(9),XN=new Float32Array(4);function MU(A,E,M){let W=A[0];if(W<=0||W>0)return A;let w=E*M,Y=JN[w];if(Y===void 0)Y=new Float32Array(w),JN[w]=Y;if(E!==0){W.toArray(Y,0);for(let U=1,K=0;U!==E;++U)K+=M,A[U].toArray(Y,K)}return Y}function PE(A,E){if(A.length!==E.length)return!1;for(let M=0,W=A.length;M<W;M++)if(A[M]!==E[M])return!1;return!0}function uE(A,E){for(let M=0,W=E.length;M<W;M++)A[M]=E[M]}function IZ(A,E){let M=qN[E];if(M===void 0)M=new Int32Array(E),qN[E]=M;for(let W=0;W!==E;++W)M[W]=A.allocateTextureUnit();return M}function QB(A,E){let M=this.cache;if(M[0]===E)return;A.uniform1f(this.addr,E),M[0]=E}function XB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y)A.uniform2f(this.addr,E.x,E.y),M[0]=E.x,M[1]=E.y}else{if(PE(M,E))return;A.uniform2fv(this.addr,E),uE(M,E)}}function RB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z)A.uniform3f(this.addr,E.x,E.y,E.z),M[0]=E.x,M[1]=E.y,M[2]=E.z}else if(E.r!==void 0){if(M[0]!==E.r||M[1]!==E.g||M[2]!==E.b)A.uniform3f(this.addr,E.r,E.g,E.b),M[0]=E.r,M[1]=E.g,M[2]=E.b}else{if(PE(M,E))return;A.uniform3fv(this.addr,E),uE(M,E)}}function BB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z||M[3]!==E.w)A.uniform4f(this.addr,E.x,E.y,E.z,E.w),M[0]=E.x,M[1]=E.y,M[2]=E.z,M[3]=E.w}else{if(PE(M,E))return;A.uniform4fv(this.addr,E),uE(M,E)}}function VB(A,E){let M=this.cache,W=E.elements;if(W===void 0){if(PE(M,E))return;A.uniformMatrix2fv(this.addr,!1,E),uE(M,E)}else{if(PE(M,W))return;XN.set(W),A.uniformMatrix2fv(this.addr,!1,XN),uE(M,W)}}function HB(A,E){let M=this.cache,W=E.elements;if(W===void 0){if(PE(M,E))return;A.uniformMatrix3fv(this.addr,!1,E),uE(M,E)}else{if(PE(M,W))return;QN.set(W),A.uniformMatrix3fv(this.addr,!1,QN),uE(M,W)}}function yB(A,E){let M=this.cache,W=E.elements;if(W===void 0){if(PE(M,E))return;A.uniformMatrix4fv(this.addr,!1,E),uE(M,E)}else{if(PE(M,W))return;zN.set(W),A.uniformMatrix4fv(this.addr,!1,zN),uE(M,W)}}function TB(A,E){let M=this.cache;if(M[0]===E)return;A.uniform1i(this.addr,E),M[0]=E}function SB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y)A.uniform2i(this.addr,E.x,E.y),M[0]=E.x,M[1]=E.y}else{if(PE(M,E))return;A.uniform2iv(this.addr,E),uE(M,E)}}function kB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z)A.uniform3i(this.addr,E.x,E.y,E.z),M[0]=E.x,M[1]=E.y,M[2]=E.z}else{if(PE(M,E))return;A.uniform3iv(this.addr,E),uE(M,E)}}function xB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z||M[3]!==E.w)A.uniform4i(this.addr,E.x,E.y,E.z,E.w),M[0]=E.x,M[1]=E.y,M[2]=E.z,M[3]=E.w}else{if(PE(M,E))return;A.uniform4iv(this.addr,E),uE(M,E)}}function PB(A,E){let M=this.cache;if(M[0]===E)return;A.uniform1ui(this.addr,E),M[0]=E}function uB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y)A.uniform2ui(this.addr,E.x,E.y),M[0]=E.x,M[1]=E.y}else{if(PE(M,E))return;A.uniform2uiv(this.addr,E),uE(M,E)}}function hB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z)A.uniform3ui(this.addr,E.x,E.y,E.z),M[0]=E.x,M[1]=E.y,M[2]=E.z}else{if(PE(M,E))return;A.uniform3uiv(this.addr,E),uE(M,E)}}function fB(A,E){let M=this.cache;if(E.x!==void 0){if(M[0]!==E.x||M[1]!==E.y||M[2]!==E.z||M[3]!==E.w)A.uniform4ui(this.addr,E.x,E.y,E.z,E.w),M[0]=E.x,M[1]=E.y,M[2]=E.z,M[3]=E.w}else{if(PE(M,E))return;A.uniform4uiv(this.addr,E),uE(M,E)}}function jB(A,E,M){let W=this.cache,w=M.allocateTextureUnit();if(W[0]!==w)A.uniform1i(this.addr,w),W[0]=w;let Y;if(this.type===A.SAMPLER_2D_SHADOW)NN.compareFunction=$C,Y=NN;else Y=fN;M.setTexture2D(E||Y,w)}function vB(A,E,M){let W=this.cache,w=M.allocateTextureUnit();if(W[0]!==w)A.uniform1i(this.addr,w),W[0]=w;M.setTexture3D(E||vN,w)}function gB(A,E,M){let W=this.cache,w=M.allocateTextureUnit();if(W[0]!==w)A.uniform1i(this.addr,w),W[0]=w;M.setTextureCube(E||gN,w)}function pB(A,E,M){let W=this.cache,w=M.allocateTextureUnit();if(W[0]!==w)A.uniform1i(this.addr,w),W[0]=w;M.setTexture2DArray(E||jN,w)}function bB(A){switch(A){case 5126:return QB;case 35664:return XB;case 35665:return RB;case 35666:return BB;case 35674:return VB;case 35675:return HB;case 35676:return yB;case 5124:case 35670:return TB;case 35667:case 35671:return SB;case 35668:case 35672:return kB;case 35669:case 35673:return xB;case 5125:return PB;case 36294:return uB;case 36295:return hB;case 36296:return fB;case 35678:case 36198:case 36298:case 36306:case 35682:return jB;case 35679:case 36299:case 36307:return vB;case 35680:case 36300:case 36308:case 36293:return gB;case 36289:case 36303:case 36311:case 36292:return pB}}function cB(A,E){A.uniform1fv(this.addr,E)}function nB(A,E){let M=MU(E,this.size,2);A.uniform2fv(this.addr,M)}function mB(A,E){let M=MU(E,this.size,3);A.uniform3fv(this.addr,M)}function dB(A,E){let M=MU(E,this.size,4);A.uniform4fv(this.addr,M)}function iB(A,E){let M=MU(E,this.size,4);A.uniformMatrix2fv(this.addr,!1,M)}function sB(A,E){let M=MU(E,this.size,9);A.uniformMatrix3fv(this.addr,!1,M)}function oB(A,E){let M=MU(E,this.size,16);A.uniformMatrix4fv(this.addr,!1,M)}function rB(A,E){A.uniform1iv(this.addr,E)}function aB(A,E){A.uniform2iv(this.addr,E)}function tB(A,E){A.uniform3iv(this.addr,E)}function $B(A,E){A.uniform4iv(this.addr,E)}function _B(A,E){A.uniform1uiv(this.addr,E)}function eB(A,E){A.uniform2uiv(this.addr,E)}function AV(A,E){A.uniform3uiv(this.addr,E)}function EV(A,E){A.uniform4uiv(this.addr,E)}function MV(A,E,M){let W=this.cache,w=E.length,Y=IZ(M,w);if(!PE(W,Y))A.uniform1iv(this.addr,Y),uE(W,Y);for(let U=0;U!==w;++U)M.setTexture2D(E[U]||fN,Y[U])}function WV(A,E,M){let W=this.cache,w=E.length,Y=IZ(M,w);if(!PE(W,Y))A.uniform1iv(this.addr,Y),uE(W,Y);for(let U=0;U!==w;++U)M.setTexture3D(E[U]||vN,Y[U])}function wV(A,E,M){let W=this.cache,w=E.length,Y=IZ(M,w);if(!PE(W,Y))A.uniform1iv(this.addr,Y),uE(W,Y);for(let U=0;U!==w;++U)M.setTextureCube(E[U]||gN,Y[U])}function YV(A,E,M){let W=this.cache,w=E.length,Y=IZ(M,w);if(!PE(W,Y))A.uniform1iv(this.addr,Y),uE(W,Y);for(let U=0;U!==w;++U)M.setTexture2DArray(E[U]||jN,Y[U])}function UV(A){switch(A){case 5126:return cB;case 35664:return nB;case 35665:return mB;case 35666:return dB;case 35674:return iB;case 35675:return sB;case 35676:return oB;case 5124:case 35670:return rB;case 35667:case 35671:return aB;case 35668:case 35672:return tB;case 35669:case 35673:return $B;case 5125:return _B;case 36294:return eB;case 36295:return AV;case 36296:return EV;case 35678:case 36198:case 36298:case 36306:case 35682:return MV;case 35679:case 36299:case 36307:return WV;case 35680:case 36300:case 36308:case 36293:return wV;case 36289:case 36303:case 36311:case 36292:return YV}}class pN{constructor(A,E,M){this.id=A,this.addr=M,this.cache=[],this.type=E.type,this.setValue=bB(E.type)}}class bN{constructor(A,E,M){this.id=A,this.addr=M,this.cache=[],this.type=E.type,this.size=E.size,this.setValue=UV(E.type)}}class cN{constructor(A){this.id=A,this.seq=[],this.map={}}setValue(A,E,M){let W=this.seq;for(let w=0,Y=W.length;w!==Y;++w){let U=W[w];U.setValue(A,E[U.id],M)}}}var TF=/(\w+)(\])?(\[|\.)?/g;function RN(A,E){A.seq.push(E),A.map[E.id]=E}function KV(A,E,M){let W=A.name,w=W.length;TF.lastIndex=0;while(!0){let Y=TF.exec(W),U=TF.lastIndex,K=Y[1],L=Y[2]==="]",G=Y[3];if(L)K=K|0;if(G===void 0||G==="["&&U+2===w){RN(M,G===void 0?new pN(K,A,E):new bN(K,A,E));break}else{let C=M.map[K];if(C===void 0)C=new cN(K),RN(M,C);M=C}}}class VK{constructor(A,E){this.seq=[],this.map={};let M=A.getProgramParameter(E,A.ACTIVE_UNIFORMS);for(let W=0;W<M;++W){let w=A.getActiveUniform(E,W),Y=A.getUniformLocation(E,w.name);KV(w,Y,this)}}setValue(A,E,M,W){let w=this.map[E];if(w!==void 0)w.setValue(A,M,W)}setOptional(A,E,M){let W=E[M];if(W!==void 0)this.setValue(A,M,W)}static upload(A,E,M,W){for(let w=0,Y=E.length;w!==Y;++w){let U=E[w],K=M[U.id];if(K.needsUpdate!==!1)U.setValue(A,K.value,W)}}static seqWithValue(A,E){let M=[];for(let W=0,w=A.length;W!==w;++W){let Y=A[W];if(Y.id in E)M.push(Y)}return M}}function BN(A,E,M){let W=A.createShader(E);return A.shaderSource(W,M),A.compileShader(W),W}var LV=37297,GV=0;function ZV(A,E){let M=A.split(`
`),W=[],w=Math.max(E-6,0),Y=Math.min(E+6,M.length);for(let U=w;U<Y;U++){let K=U+1;W.push(`${K===E?">":" "} ${K}: ${M[U]}`)}return W.join(`
`)}var VN=new PA;function lV(A){oA._getMatrix(VN,oA.workingColorSpace,A);let E=`mat3( ${VN.elements.map((M)=>M.toFixed(4))} )`;switch(oA.getTransfer(A)){case tC:return[E,"LinearTransferOETF"];case YE:return[E,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",A),[E,"LinearTransferOETF"]}}function HN(A,E,M){let W=A.getShaderParameter(E,A.COMPILE_STATUS),w=A.getShaderInfoLog(E).trim();if(W&&w==="")return"";let Y=/ERROR: 0:(\d+)/.exec(w);if(Y){let U=parseInt(Y[1]);return M.toUpperCase()+`

`+w+`

`+ZV(A.getShaderSource(E),U)}else return w}function CV(A,E){let M=lV(E);return[`vec4 ${A}( vec4 value ) {`,`	return ${M[1]}( vec4( value.rgb * ${M[0]}, value.a ) );`,"}"].join(`
`)}function FV(A,E){let M;switch(E){case VO:M="Linear";break;case HO:M="Reinhard";break;case yO:M="Cineon";break;case fG:M="ACESFilmic";break;case SO:M="AgX";break;case kO:M="Neutral";break;case TO:M="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",E),M="Linear"}return"vec3 "+A+"( vec3 color ) { return "+M+"ToneMapping( color ); }"}var FZ=new f;function DV(){oA.getLuminanceCoefficients(FZ);let A=FZ.x.toFixed(4),E=FZ.y.toFixed(4),M=FZ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${A}, ${E}, ${M} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function IV(A){return[A.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",A.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(BK).join(`
`)}function OV(A){let E=[];for(let M in A){let W=A[M];if(W===!1)continue;E.push("#define "+M+" "+W)}return E.join(`
`)}function NV(A,E){let M={},W=A.getProgramParameter(E,A.ACTIVE_ATTRIBUTES);for(let w=0;w<W;w++){let Y=A.getActiveAttrib(E,w),U=Y.name,K=1;if(Y.type===A.FLOAT_MAT2)K=2;if(Y.type===A.FLOAT_MAT3)K=3;if(Y.type===A.FLOAT_MAT4)K=4;M[U]={type:Y.type,location:A.getAttribLocation(E,U),locationSize:K}}return M}function BK(A){return A!==""}function yN(A,E){let M=E.numSpotLightShadows+E.numSpotLightMaps-E.numSpotLightShadowsWithMaps;return A.replace(/NUM_DIR_LIGHTS/g,E.numDirLights).replace(/NUM_SPOT_LIGHTS/g,E.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,E.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,M).replace(/NUM_RECT_AREA_LIGHTS/g,E.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,E.numPointLights).replace(/NUM_HEMI_LIGHTS/g,E.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,E.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,E.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,E.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,E.numPointLightShadows)}function TN(A,E){return A.replace(/NUM_CLIPPING_PLANES/g,E.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,E.numClippingPlanes-E.numClipIntersection)}var JV=/^[ \t]*#include +<([\w\d./]+)>/gm;function kF(A){return A.replace(JV,zV)}var qV=new Map;function zV(A,E){let M=jA[E];if(M===void 0){let W=qV.get(E);if(W!==void 0)M=jA[W],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',E,W);else throw Error("Can not resolve #include <"+E+">")}return kF(M)}var QV=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function SN(A){return A.replace(QV,XV)}function XV(A,E,M,W){let w="";for(let Y=parseInt(E);Y<parseInt(M);Y++)w+=W.replace(/\[\s*i\s*\]/g,"[ "+Y+" ]").replace(/UNROLLED_LOOP_INDEX/g,Y);return w}function kN(A){let E=`precision ${A.precision} float;
	precision ${A.precision} int;
	precision ${A.precision} sampler2D;
	precision ${A.precision} samplerCube;
	precision ${A.precision} sampler3D;
	precision ${A.precision} sampler2DArray;
	precision ${A.precision} sampler2DShadow;
	precision ${A.precision} samplerCubeShadow;
	precision ${A.precision} sampler2DArrayShadow;
	precision ${A.precision} isampler2D;
	precision ${A.precision} isampler3D;
	precision ${A.precision} isamplerCube;
	precision ${A.precision} isampler2DArray;
	precision ${A.precision} usampler2D;
	precision ${A.precision} usampler3D;
	precision ${A.precision} usamplerCube;
	precision ${A.precision} usampler2DArray;
	`;if(A.precision==="highp")E+=`
#define HIGH_PRECISION`;else if(A.precision==="mediump")E+=`
#define MEDIUM_PRECISION`;else if(A.precision==="lowp")E+=`
#define LOW_PRECISION`;return E}function RV(A){let E="SHADOWMAP_TYPE_BASIC";if(A.shadowMapType===DC)E="SHADOWMAP_TYPE_PCF";else if(A.shadowMapType===EO)E="SHADOWMAP_TYPE_PCF_SOFT";else if(A.shadowMapType===YW)E="SHADOWMAP_TYPE_VSM";return E}function BV(A){let E="ENVMAP_TYPE_CUBE";if(A.envMap)switch(A.envMapMode){case dY:case hw:E="ENVMAP_TYPE_CUBE";break;case ZK:E="ENVMAP_TYPE_CUBE_UV";break}return E}function VV(A){let E="ENVMAP_MODE_REFLECTION";if(A.envMap)switch(A.envMapMode){case hw:E="ENVMAP_MODE_REFRACTION";break}return E}function HV(A){let E="ENVMAP_BLENDING_NONE";if(A.envMap)switch(A.combine){case XO:E="ENVMAP_BLENDING_MULTIPLY";break;case RO:E="ENVMAP_BLENDING_MIX";break;case BO:E="ENVMAP_BLENDING_ADD";break}return E}function yV(A){let E=A.envMapCubeUVHeight;if(E===null)return null;let M=Math.log2(E)-2,W=1/E;return{texelWidth:1/(3*Math.max(Math.pow(2,M),112)),texelHeight:W,maxMip:M}}function TV(A,E,M,W){let w=A.getContext(),Y=M.defines,U=M.vertexShader,K=M.fragmentShader,L=RV(M),G=BV(M),l=VV(M),C=HV(M),F=yV(M),I=IV(M),J=OV(Y),q=w.createProgram(),D,Z,N=M.glslVersion?"#version "+M.glslVersion+`
`:"";if(M.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+M.shaderType,"#define SHADER_NAME "+M.shaderName,J].filter(BK).join(`
`),D.length>0)D+=`
`;if(Z=["#define SHADER_TYPE "+M.shaderType,"#define SHADER_NAME "+M.shaderName,J].filter(BK).join(`
`),Z.length>0)Z+=`
`}else D=[kN(M),"#define SHADER_TYPE "+M.shaderType,"#define SHADER_NAME "+M.shaderName,J,M.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",M.batching?"#define USE_BATCHING":"",M.batchingColor?"#define USE_BATCHING_COLOR":"",M.instancing?"#define USE_INSTANCING":"",M.instancingColor?"#define USE_INSTANCING_COLOR":"",M.instancingMorph?"#define USE_INSTANCING_MORPH":"",M.useFog&&M.fog?"#define USE_FOG":"",M.useFog&&M.fogExp2?"#define FOG_EXP2":"",M.map?"#define USE_MAP":"",M.envMap?"#define USE_ENVMAP":"",M.envMap?"#define "+l:"",M.lightMap?"#define USE_LIGHTMAP":"",M.aoMap?"#define USE_AOMAP":"",M.bumpMap?"#define USE_BUMPMAP":"",M.normalMap?"#define USE_NORMALMAP":"",M.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",M.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",M.displacementMap?"#define USE_DISPLACEMENTMAP":"",M.emissiveMap?"#define USE_EMISSIVEMAP":"",M.anisotropy?"#define USE_ANISOTROPY":"",M.anisotropyMap?"#define USE_ANISOTROPYMAP":"",M.clearcoatMap?"#define USE_CLEARCOATMAP":"",M.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",M.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",M.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",M.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",M.specularMap?"#define USE_SPECULARMAP":"",M.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",M.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",M.roughnessMap?"#define USE_ROUGHNESSMAP":"",M.metalnessMap?"#define USE_METALNESSMAP":"",M.alphaMap?"#define USE_ALPHAMAP":"",M.alphaHash?"#define USE_ALPHAHASH":"",M.transmission?"#define USE_TRANSMISSION":"",M.transmissionMap?"#define USE_TRANSMISSIONMAP":"",M.thicknessMap?"#define USE_THICKNESSMAP":"",M.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",M.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",M.mapUv?"#define MAP_UV "+M.mapUv:"",M.alphaMapUv?"#define ALPHAMAP_UV "+M.alphaMapUv:"",M.lightMapUv?"#define LIGHTMAP_UV "+M.lightMapUv:"",M.aoMapUv?"#define AOMAP_UV "+M.aoMapUv:"",M.emissiveMapUv?"#define EMISSIVEMAP_UV "+M.emissiveMapUv:"",M.bumpMapUv?"#define BUMPMAP_UV "+M.bumpMapUv:"",M.normalMapUv?"#define NORMALMAP_UV "+M.normalMapUv:"",M.displacementMapUv?"#define DISPLACEMENTMAP_UV "+M.displacementMapUv:"",M.metalnessMapUv?"#define METALNESSMAP_UV "+M.metalnessMapUv:"",M.roughnessMapUv?"#define ROUGHNESSMAP_UV "+M.roughnessMapUv:"",M.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+M.anisotropyMapUv:"",M.clearcoatMapUv?"#define CLEARCOATMAP_UV "+M.clearcoatMapUv:"",M.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+M.clearcoatNormalMapUv:"",M.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+M.clearcoatRoughnessMapUv:"",M.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+M.iridescenceMapUv:"",M.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+M.iridescenceThicknessMapUv:"",M.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+M.sheenColorMapUv:"",M.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+M.sheenRoughnessMapUv:"",M.specularMapUv?"#define SPECULARMAP_UV "+M.specularMapUv:"",M.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+M.specularColorMapUv:"",M.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+M.specularIntensityMapUv:"",M.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+M.transmissionMapUv:"",M.thicknessMapUv?"#define THICKNESSMAP_UV "+M.thicknessMapUv:"",M.vertexTangents&&M.flatShading===!1?"#define USE_TANGENT":"",M.vertexColors?"#define USE_COLOR":"",M.vertexAlphas?"#define USE_COLOR_ALPHA":"",M.vertexUv1s?"#define USE_UV1":"",M.vertexUv2s?"#define USE_UV2":"",M.vertexUv3s?"#define USE_UV3":"",M.pointsUvs?"#define USE_POINTS_UV":"",M.flatShading?"#define FLAT_SHADED":"",M.skinning?"#define USE_SKINNING":"",M.morphTargets?"#define USE_MORPHTARGETS":"",M.morphNormals&&M.flatShading===!1?"#define USE_MORPHNORMALS":"",M.morphColors?"#define USE_MORPHCOLORS":"",M.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+M.morphTextureStride:"",M.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+M.morphTargetsCount:"",M.doubleSided?"#define DOUBLE_SIDED":"",M.flipSided?"#define FLIP_SIDED":"",M.shadowMapEnabled?"#define USE_SHADOWMAP":"",M.shadowMapEnabled?"#define "+L:"",M.sizeAttenuation?"#define USE_SIZEATTENUATION":"",M.numLightProbes>0?"#define USE_LIGHT_PROBES":"",M.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",M.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(BK).join(`
`),Z=[kN(M),"#define SHADER_TYPE "+M.shaderType,"#define SHADER_NAME "+M.shaderName,J,M.useFog&&M.fog?"#define USE_FOG":"",M.useFog&&M.fogExp2?"#define FOG_EXP2":"",M.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",M.map?"#define USE_MAP":"",M.matcap?"#define USE_MATCAP":"",M.envMap?"#define USE_ENVMAP":"",M.envMap?"#define "+G:"",M.envMap?"#define "+l:"",M.envMap?"#define "+C:"",F?"#define CUBEUV_TEXEL_WIDTH "+F.texelWidth:"",F?"#define CUBEUV_TEXEL_HEIGHT "+F.texelHeight:"",F?"#define CUBEUV_MAX_MIP "+F.maxMip+".0":"",M.lightMap?"#define USE_LIGHTMAP":"",M.aoMap?"#define USE_AOMAP":"",M.bumpMap?"#define USE_BUMPMAP":"",M.normalMap?"#define USE_NORMALMAP":"",M.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",M.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",M.emissiveMap?"#define USE_EMISSIVEMAP":"",M.anisotropy?"#define USE_ANISOTROPY":"",M.anisotropyMap?"#define USE_ANISOTROPYMAP":"",M.clearcoat?"#define USE_CLEARCOAT":"",M.clearcoatMap?"#define USE_CLEARCOATMAP":"",M.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",M.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",M.dispersion?"#define USE_DISPERSION":"",M.iridescence?"#define USE_IRIDESCENCE":"",M.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",M.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",M.specularMap?"#define USE_SPECULARMAP":"",M.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",M.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",M.roughnessMap?"#define USE_ROUGHNESSMAP":"",M.metalnessMap?"#define USE_METALNESSMAP":"",M.alphaMap?"#define USE_ALPHAMAP":"",M.alphaTest?"#define USE_ALPHATEST":"",M.alphaHash?"#define USE_ALPHAHASH":"",M.sheen?"#define USE_SHEEN":"",M.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",M.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",M.transmission?"#define USE_TRANSMISSION":"",M.transmissionMap?"#define USE_TRANSMISSIONMAP":"",M.thicknessMap?"#define USE_THICKNESSMAP":"",M.vertexTangents&&M.flatShading===!1?"#define USE_TANGENT":"",M.vertexColors||M.instancingColor||M.batchingColor?"#define USE_COLOR":"",M.vertexAlphas?"#define USE_COLOR_ALPHA":"",M.vertexUv1s?"#define USE_UV1":"",M.vertexUv2s?"#define USE_UV2":"",M.vertexUv3s?"#define USE_UV3":"",M.pointsUvs?"#define USE_POINTS_UV":"",M.gradientMap?"#define USE_GRADIENTMAP":"",M.flatShading?"#define FLAT_SHADED":"",M.doubleSided?"#define DOUBLE_SIDED":"",M.flipSided?"#define FLIP_SIDED":"",M.shadowMapEnabled?"#define USE_SHADOWMAP":"",M.shadowMapEnabled?"#define "+L:"",M.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",M.numLightProbes>0?"#define USE_LIGHT_PROBES":"",M.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",M.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",M.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",M.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",M.toneMapping!==yW?"#define TONE_MAPPING":"",M.toneMapping!==yW?jA.tonemapping_pars_fragment:"",M.toneMapping!==yW?FV("toneMapping",M.toneMapping):"",M.dithering?"#define DITHERING":"",M.opaque?"#define OPAQUE":"",jA.colorspace_pars_fragment,CV("linearToOutputTexel",M.outputColorSpace),DV(),M.useDepthPacking?"#define DEPTH_PACKING "+M.depthPacking:"",`
`].filter(BK).join(`
`);if(U=kF(U),U=yN(U,M),U=TN(U,M),K=kF(K),K=yN(K,M),K=TN(K,M),U=SN(U),K=SN(K),M.isRawShaderMaterial!==!0)N=`#version 300 es
`,D=[I,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,Z=["#define varying in",M.glslVersion===_C?"":"layout(location = 0) out highp vec4 pc_fragColor;",M.glslVersion===_C?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+Z;let O=N+D+U,B=N+Z+K,T=BN(w,w.VERTEX_SHADER,O),V=BN(w,w.FRAGMENT_SHADER,B);if(w.attachShader(q,T),w.attachShader(q,V),M.index0AttributeName!==void 0)w.bindAttribLocation(q,0,M.index0AttributeName);else if(M.morphTargets===!0)w.bindAttribLocation(q,0,"position");w.linkProgram(q);function H(S){if(A.debug.checkShaderErrors){let v=w.getProgramInfoLog(q).trim(),b=w.getShaderInfoLog(T).trim(),n=w.getShaderInfoLog(V).trim(),a=!0,m=!0;if(w.getProgramParameter(q,w.LINK_STATUS)===!1)if(a=!1,typeof A.debug.onShaderError==="function")A.debug.onShaderError(w,q,T,V);else{let _=HN(w,T,"vertex"),c=HN(w,V,"fragment");console.error("THREE.WebGLProgram: Shader Error "+w.getError()+" - VALIDATE_STATUS "+w.getProgramParameter(q,w.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+v+`
`+_+`
`+c)}else if(v!=="")console.warn("THREE.WebGLProgram: Program Info Log:",v);else if(b===""||n==="")m=!1;if(m)S.diagnostics={runnable:a,programLog:v,vertexShader:{log:b,prefix:D},fragmentShader:{log:n,prefix:Z}}}w.deleteShader(T),w.deleteShader(V),P=new VK(w,q),Q=NV(w,q)}let P;this.getUniforms=function(){if(P===void 0)H(this);return P};let Q;this.getAttributes=function(){if(Q===void 0)H(this);return Q};let X=M.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(X===!1)X=w.getProgramParameter(q,LV);return X},this.destroy=function(){W.releaseStatesOfProgram(this),w.deleteProgram(q),this.program=void 0},this.type=M.shaderType,this.name=M.shaderName,this.id=GV++,this.cacheKey=E,this.usedTimes=1,this.program=q,this.vertexShader=T,this.fragmentShader=V,this}var SV=0;class nN{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(A){let{vertexShader:E,fragmentShader:M}=A,W=this._getShaderStage(E),w=this._getShaderStage(M),Y=this._getShaderCacheForMaterial(A);if(Y.has(W)===!1)Y.add(W),W.usedTimes++;if(Y.has(w)===!1)Y.add(w),w.usedTimes++;return this}remove(A){let E=this.materialCache.get(A);for(let M of E)if(M.usedTimes--,M.usedTimes===0)this.shaderCache.delete(M.code);return this.materialCache.delete(A),this}getVertexShaderID(A){return this._getShaderStage(A.vertexShader).id}getFragmentShaderID(A){return this._getShaderStage(A.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(A){let E=this.materialCache,M=E.get(A);if(M===void 0)M=new Set,E.set(A,M);return M}_getShaderStage(A){let E=this.shaderCache,M=E.get(A);if(M===void 0)M=new mN(A),E.set(A,M);return M}}class mN{constructor(A){this.id=SV++,this.code=A,this.usedTimes=0}}function kV(A,E,M,W,w,Y,U){let K=new rG,L=new nN,G=new Set,l=[],C=w.logarithmicDepthBuffer,F=w.vertexTextures,I=w.precision,J={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function q(Q){if(G.add(Q),Q===0)return"uv";return`uv${Q}`}function D(Q,X,S,v,b){let n=v.fog,a=b.geometry,m=Q.isMeshStandardMaterial?v.environment:null,_=(Q.isMeshStandardMaterial?M:E).get(Q.envMap||m),c=!!_&&_.mapping===ZK?_.image.height:null,GA=J[Q.type];if(Q.precision!==null){if(I=w.getMaxPrecision(Q.precision),I!==Q.precision)console.warn("THREE.WebGLProgram.getParameters:",Q.precision,"not supported, using",I,"instead.")}let ZA=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,yA=ZA!==void 0?ZA.length:0,vA=0;if(a.morphAttributes.position!==void 0)vA=1;if(a.morphAttributes.normal!==void 0)vA=2;if(a.morphAttributes.color!==void 0)vA=3;let i,EA,QA,XA;if(GA){let _A=LW[GA];i=_A.vertexShader,EA=_A.fragmentShader}else i=Q.vertexShader,EA=Q.fragmentShader,L.update(Q),QA=L.getVertexShaderID(Q),XA=L.getFragmentShaderID(Q);let YA=A.getRenderTarget(),HA=A.state.buffers.depth.getReversed(),aA=b.isInstancedMesh===!0,bA=b.isBatchedMesh===!0,cA=!!Q.map,RE=!!Q.matcap,k=!!_,yE=!!Q.aoMap,tA=!!Q.lightMap,$A=!!Q.bumpMap,FA=!!Q.normalMap,UE=!!Q.displacementMap,MA=!!Q.emissiveMap,zA=!!Q.metalnessMap,y=!!Q.roughnessMap,z=Q.anisotropy>0,j=Q.clearcoat>0,r=Q.dispersion>0,t=Q.iridescence>0,d=Q.sheen>0,RA=Q.transmission>0,KA=z&&!!Q.anisotropyMap,DA=j&&!!Q.clearcoatMap,uA=j&&!!Q.clearcoatNormalMap,WA=j&&!!Q.clearcoatRoughnessMap,IA=t&&!!Q.iridescenceMap,nA=t&&!!Q.iridescenceThicknessMap,TA=d&&!!Q.sheenColorMap,JA=d&&!!Q.sheenRoughnessMap,hA=!!Q.specularMap,gA=!!Q.specularColorMap,FE=!!Q.specularIntensityMap,x=RA&&!!Q.transmissionMap,AA=RA&&!!Q.thicknessMap,s=!!Q.gradientMap,o=!!Q.alphaMap,CA=Q.alphaTest>0,lA=!!Q.alphaHash,fA=!!Q.extensions,JE=yW;if(Q.toneMapped){if(YA===null||YA.isXRRenderTarget===!0)JE=A.toneMapping}let pE={shaderID:GA,shaderType:Q.type,shaderName:Q.name,vertexShader:i,fragmentShader:EA,defines:Q.defines,customVertexShaderID:QA,customFragmentShaderID:XA,isRawShaderMaterial:Q.isRawShaderMaterial===!0,glslVersion:Q.glslVersion,precision:I,batching:bA,batchingColor:bA&&b._colorsTexture!==null,instancing:aA,instancingColor:aA&&b.instanceColor!==null,instancingMorph:aA&&b.morphTexture!==null,supportsVertexTextures:F,outputColorSpace:YA===null?A.outputColorSpace:YA.isXRRenderTarget===!0?YA.texture.colorSpace:OK,alphaToCoverage:!!Q.alphaToCoverage,map:cA,matcap:RE,envMap:k,envMapMode:k&&_.mapping,envMapCubeUVHeight:c,aoMap:yE,lightMap:tA,bumpMap:$A,normalMap:FA,displacementMap:F&&UE,emissiveMap:MA,normalMapObjectSpace:FA&&Q.normalMapType===sO,normalMapTangentSpace:FA&&Q.normalMapType===iO,metalnessMap:zA,roughnessMap:y,anisotropy:z,anisotropyMap:KA,clearcoat:j,clearcoatMap:DA,clearcoatNormalMap:uA,clearcoatRoughnessMap:WA,dispersion:r,iridescence:t,iridescenceMap:IA,iridescenceThicknessMap:nA,sheen:d,sheenColorMap:TA,sheenRoughnessMap:JA,specularMap:hA,specularColorMap:gA,specularIntensityMap:FE,transmission:RA,transmissionMap:x,thicknessMap:AA,gradientMap:s,opaque:Q.transparent===!1&&Q.blending===LK&&Q.alphaToCoverage===!1,alphaMap:o,alphaTest:CA,alphaHash:lA,combine:Q.combine,mapUv:cA&&q(Q.map.channel),aoMapUv:yE&&q(Q.aoMap.channel),lightMapUv:tA&&q(Q.lightMap.channel),bumpMapUv:$A&&q(Q.bumpMap.channel),normalMapUv:FA&&q(Q.normalMap.channel),displacementMapUv:UE&&q(Q.displacementMap.channel),emissiveMapUv:MA&&q(Q.emissiveMap.channel),metalnessMapUv:zA&&q(Q.metalnessMap.channel),roughnessMapUv:y&&q(Q.roughnessMap.channel),anisotropyMapUv:KA&&q(Q.anisotropyMap.channel),clearcoatMapUv:DA&&q(Q.clearcoatMap.channel),clearcoatNormalMapUv:uA&&q(Q.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:WA&&q(Q.clearcoatRoughnessMap.channel),iridescenceMapUv:IA&&q(Q.iridescenceMap.channel),iridescenceThicknessMapUv:nA&&q(Q.iridescenceThicknessMap.channel),sheenColorMapUv:TA&&q(Q.sheenColorMap.channel),sheenRoughnessMapUv:JA&&q(Q.sheenRoughnessMap.channel),specularMapUv:hA&&q(Q.specularMap.channel),specularColorMapUv:gA&&q(Q.specularColorMap.channel),specularIntensityMapUv:FE&&q(Q.specularIntensityMap.channel),transmissionMapUv:x&&q(Q.transmissionMap.channel),thicknessMapUv:AA&&q(Q.thicknessMap.channel),alphaMapUv:o&&q(Q.alphaMap.channel),vertexTangents:!!a.attributes.tangent&&(FA||z),vertexColors:Q.vertexColors,vertexAlphas:Q.vertexColors===!0&&!!a.attributes.color&&a.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!a.attributes.uv&&(cA||o),fog:!!n,useFog:Q.fog===!0,fogExp2:!!n&&n.isFogExp2,flatShading:Q.flatShading===!0,sizeAttenuation:Q.sizeAttenuation===!0,logarithmicDepthBuffer:C,reverseDepthBuffer:HA,skinning:b.isSkinnedMesh===!0,morphTargets:a.morphAttributes.position!==void 0,morphNormals:a.morphAttributes.normal!==void 0,morphColors:a.morphAttributes.color!==void 0,morphTargetsCount:yA,morphTextureStride:vA,numDirLights:X.directional.length,numPointLights:X.point.length,numSpotLights:X.spot.length,numSpotLightMaps:X.spotLightMap.length,numRectAreaLights:X.rectArea.length,numHemiLights:X.hemi.length,numDirLightShadows:X.directionalShadowMap.length,numPointLightShadows:X.pointShadowMap.length,numSpotLightShadows:X.spotShadowMap.length,numSpotLightShadowsWithMaps:X.numSpotLightShadowsWithMaps,numLightProbes:X.numLightProbes,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:Q.dithering,shadowMapEnabled:A.shadowMap.enabled&&S.length>0,shadowMapType:A.shadowMap.type,toneMapping:JE,decodeVideoTexture:cA&&Q.map.isVideoTexture===!0&&oA.getTransfer(Q.map.colorSpace)===YE,decodeVideoTextureEmissive:MA&&Q.emissiveMap.isVideoTexture===!0&&oA.getTransfer(Q.emissiveMap.colorSpace)===YE,premultipliedAlpha:Q.premultipliedAlpha,doubleSided:Q.side===UW,flipSided:Q.side===UM,useDepthPacking:Q.depthPacking>=0,depthPacking:Q.depthPacking||0,index0AttributeName:Q.index0AttributeName,extensionClipCullDistance:fA&&Q.extensions.clipCullDistance===!0&&W.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fA&&Q.extensions.multiDraw===!0||bA)&&W.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:W.has("KHR_parallel_shader_compile"),customProgramCacheKey:Q.customProgramCacheKey()};return pE.vertexUv1s=G.has(1),pE.vertexUv2s=G.has(2),pE.vertexUv3s=G.has(3),G.clear(),pE}function Z(Q){let X=[];if(Q.shaderID)X.push(Q.shaderID);else X.push(Q.customVertexShaderID),X.push(Q.customFragmentShaderID);if(Q.defines!==void 0)for(let S in Q.defines)X.push(S),X.push(Q.defines[S]);if(Q.isRawShaderMaterial===!1)N(X,Q),O(X,Q),X.push(A.outputColorSpace);return X.push(Q.customProgramCacheKey),X.join()}function N(Q,X){Q.push(X.precision),Q.push(X.outputColorSpace),Q.push(X.envMapMode),Q.push(X.envMapCubeUVHeight),Q.push(X.mapUv),Q.push(X.alphaMapUv),Q.push(X.lightMapUv),Q.push(X.aoMapUv),Q.push(X.bumpMapUv),Q.push(X.normalMapUv),Q.push(X.displacementMapUv),Q.push(X.emissiveMapUv),Q.push(X.metalnessMapUv),Q.push(X.roughnessMapUv),Q.push(X.anisotropyMapUv),Q.push(X.clearcoatMapUv),Q.push(X.clearcoatNormalMapUv),Q.push(X.clearcoatRoughnessMapUv),Q.push(X.iridescenceMapUv),Q.push(X.iridescenceThicknessMapUv),Q.push(X.sheenColorMapUv),Q.push(X.sheenRoughnessMapUv),Q.push(X.specularMapUv),Q.push(X.specularColorMapUv),Q.push(X.specularIntensityMapUv),Q.push(X.transmissionMapUv),Q.push(X.thicknessMapUv),Q.push(X.combine),Q.push(X.fogExp2),Q.push(X.sizeAttenuation),Q.push(X.morphTargetsCount),Q.push(X.morphAttributeCount),Q.push(X.numDirLights),Q.push(X.numPointLights),Q.push(X.numSpotLights),Q.push(X.numSpotLightMaps),Q.push(X.numHemiLights),Q.push(X.numRectAreaLights),Q.push(X.numDirLightShadows),Q.push(X.numPointLightShadows),Q.push(X.numSpotLightShadows),Q.push(X.numSpotLightShadowsWithMaps),Q.push(X.numLightProbes),Q.push(X.shadowMapType),Q.push(X.toneMapping),Q.push(X.numClippingPlanes),Q.push(X.numClipIntersection),Q.push(X.depthPacking)}function O(Q,X){if(K.disableAll(),X.supportsVertexTextures)K.enable(0);if(X.instancing)K.enable(1);if(X.instancingColor)K.enable(2);if(X.instancingMorph)K.enable(3);if(X.matcap)K.enable(4);if(X.envMap)K.enable(5);if(X.normalMapObjectSpace)K.enable(6);if(X.normalMapTangentSpace)K.enable(7);if(X.clearcoat)K.enable(8);if(X.iridescence)K.enable(9);if(X.alphaTest)K.enable(10);if(X.vertexColors)K.enable(11);if(X.vertexAlphas)K.enable(12);if(X.vertexUv1s)K.enable(13);if(X.vertexUv2s)K.enable(14);if(X.vertexUv3s)K.enable(15);if(X.vertexTangents)K.enable(16);if(X.anisotropy)K.enable(17);if(X.alphaHash)K.enable(18);if(X.batching)K.enable(19);if(X.dispersion)K.enable(20);if(X.batchingColor)K.enable(21);if(Q.push(K.mask),K.disableAll(),X.fog)K.enable(0);if(X.useFog)K.enable(1);if(X.flatShading)K.enable(2);if(X.logarithmicDepthBuffer)K.enable(3);if(X.reverseDepthBuffer)K.enable(4);if(X.skinning)K.enable(5);if(X.morphTargets)K.enable(6);if(X.morphNormals)K.enable(7);if(X.morphColors)K.enable(8);if(X.premultipliedAlpha)K.enable(9);if(X.shadowMapEnabled)K.enable(10);if(X.doubleSided)K.enable(11);if(X.flipSided)K.enable(12);if(X.useDepthPacking)K.enable(13);if(X.dithering)K.enable(14);if(X.transmission)K.enable(15);if(X.sheen)K.enable(16);if(X.opaque)K.enable(17);if(X.pointsUvs)K.enable(18);if(X.decodeVideoTexture)K.enable(19);if(X.decodeVideoTextureEmissive)K.enable(20);if(X.alphaToCoverage)K.enable(21);Q.push(K.mask)}function B(Q){let X=J[Q.type],S;if(X){let v=LW[X];S=UN.clone(v.uniforms)}else S=Q.uniforms;return S}function T(Q,X){let S;for(let v=0,b=l.length;v<b;v++){let n=l[v];if(n.cacheKey===X){S=n,++S.usedTimes;break}}if(S===void 0)S=new TV(A,X,Q,Y),l.push(S);return S}function V(Q){if(--Q.usedTimes===0){let X=l.indexOf(Q);l[X]=l[l.length-1],l.pop(),Q.destroy()}}function H(Q){L.remove(Q)}function P(){L.dispose()}return{getParameters:D,getProgramCacheKey:Z,getUniforms:B,acquireProgram:T,releaseProgram:V,releaseShaderCache:H,programs:l,dispose:P}}function xV(){let A=new WeakMap;function E(U){return A.has(U)}function M(U){let K=A.get(U);if(K===void 0)K={},A.set(U,K);return K}function W(U){A.delete(U)}function w(U,K,L){A.get(U)[K]=L}function Y(){A=new WeakMap}return{has:E,get:M,remove:W,update:w,dispose:Y}}function PV(A,E){if(A.groupOrder!==E.groupOrder)return A.groupOrder-E.groupOrder;else if(A.renderOrder!==E.renderOrder)return A.renderOrder-E.renderOrder;else if(A.material.id!==E.material.id)return A.material.id-E.material.id;else if(A.z!==E.z)return A.z-E.z;else return A.id-E.id}function xN(A,E){if(A.groupOrder!==E.groupOrder)return A.groupOrder-E.groupOrder;else if(A.renderOrder!==E.renderOrder)return A.renderOrder-E.renderOrder;else if(A.z!==E.z)return E.z-A.z;else return A.id-E.id}function PN(){let A=[],E=0,M=[],W=[],w=[];function Y(){E=0,M.length=0,W.length=0,w.length=0}function U(C,F,I,J,q,D){let Z=A[E];if(Z===void 0)Z={id:C.id,object:C,geometry:F,material:I,groupOrder:J,renderOrder:C.renderOrder,z:q,group:D},A[E]=Z;else Z.id=C.id,Z.object=C,Z.geometry=F,Z.material=I,Z.groupOrder=J,Z.renderOrder=C.renderOrder,Z.z=q,Z.group=D;return E++,Z}function K(C,F,I,J,q,D){let Z=U(C,F,I,J,q,D);if(I.transmission>0)W.push(Z);else if(I.transparent===!0)w.push(Z);else M.push(Z)}function L(C,F,I,J,q,D){let Z=U(C,F,I,J,q,D);if(I.transmission>0)W.unshift(Z);else if(I.transparent===!0)w.unshift(Z);else M.unshift(Z)}function G(C,F){if(M.length>1)M.sort(C||PV);if(W.length>1)W.sort(F||xN);if(w.length>1)w.sort(F||xN)}function l(){for(let C=E,F=A.length;C<F;C++){let I=A[C];if(I.id===null)break;I.id=null,I.object=null,I.geometry=null,I.material=null,I.group=null}}return{opaque:M,transmissive:W,transparent:w,init:Y,push:K,unshift:L,finish:l,sort:G}}function uV(){let A=new WeakMap;function E(W,w){let Y=A.get(W),U;if(Y===void 0)U=new PN,A.set(W,[U]);else if(w>=Y.length)U=new PN,Y.push(U);else U=Y[w];return U}function M(){A=new WeakMap}return{get:E,dispose:M}}function hV(){let A={};return{get:function(E){if(A[E.id]!==void 0)return A[E.id];let M;switch(E.type){case"DirectionalLight":M={direction:new f,color:new mA};break;case"SpotLight":M={position:new f,direction:new f,color:new mA,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":M={position:new f,color:new mA,distance:0,decay:0};break;case"HemisphereLight":M={direction:new f,skyColor:new mA,groundColor:new mA};break;case"RectAreaLight":M={color:new mA,position:new f,halfWidth:new f,halfHeight:new f};break}return A[E.id]=M,M}}}function fV(){let A={};return{get:function(E){if(A[E.id]!==void 0)return A[E.id];let M;switch(E.type){case"DirectionalLight":M={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xA};break;case"SpotLight":M={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xA};break;case"PointLight":M={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xA,shadowCameraNear:1,shadowCameraFar:1000};break}return A[E.id]=M,M}}}var jV=0;function vV(A,E){return(E.castShadow?2:0)-(A.castShadow?2:0)+(E.map?1:0)-(A.map?1:0)}function gV(A){let E=new hV,M=fV(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let G=0;G<9;G++)W.probe.push(new f);let w=new f,Y=new GE,U=new GE;function K(G){let l=0,C=0,F=0;for(let Q=0;Q<9;Q++)W.probe[Q].set(0,0,0);let I=0,J=0,q=0,D=0,Z=0,N=0,O=0,B=0,T=0,V=0,H=0;G.sort(vV);for(let Q=0,X=G.length;Q<X;Q++){let S=G[Q],v=S.color,b=S.intensity,n=S.distance,a=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)l+=v.r*b,C+=v.g*b,F+=v.b*b;else if(S.isLightProbe){for(let m=0;m<9;m++)W.probe[m].addScaledVector(S.sh.coefficients[m],b);H++}else if(S.isDirectionalLight){let m=E.get(S);if(m.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let _=S.shadow,c=M.get(S);c.shadowIntensity=_.intensity,c.shadowBias=_.bias,c.shadowNormalBias=_.normalBias,c.shadowRadius=_.radius,c.shadowMapSize=_.mapSize,W.directionalShadow[I]=c,W.directionalShadowMap[I]=a,W.directionalShadowMatrix[I]=S.shadow.matrix,N++}W.directional[I]=m,I++}else if(S.isSpotLight){let m=E.get(S);m.position.setFromMatrixPosition(S.matrixWorld),m.color.copy(v).multiplyScalar(b),m.distance=n,m.coneCos=Math.cos(S.angle),m.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),m.decay=S.decay,W.spot[q]=m;let _=S.shadow;if(S.map){if(W.spotLightMap[T]=S.map,T++,_.updateMatrices(S),S.castShadow)V++}if(W.spotLightMatrix[q]=_.matrix,S.castShadow){let c=M.get(S);c.shadowIntensity=_.intensity,c.shadowBias=_.bias,c.shadowNormalBias=_.normalBias,c.shadowRadius=_.radius,c.shadowMapSize=_.mapSize,W.spotShadow[q]=c,W.spotShadowMap[q]=a,B++}q++}else if(S.isRectAreaLight){let m=E.get(S);m.color.copy(v).multiplyScalar(b),m.halfWidth.set(S.width*0.5,0,0),m.halfHeight.set(0,S.height*0.5,0),W.rectArea[D]=m,D++}else if(S.isPointLight){let m=E.get(S);if(m.color.copy(S.color).multiplyScalar(S.intensity),m.distance=S.distance,m.decay=S.decay,S.castShadow){let _=S.shadow,c=M.get(S);c.shadowIntensity=_.intensity,c.shadowBias=_.bias,c.shadowNormalBias=_.normalBias,c.shadowRadius=_.radius,c.shadowMapSize=_.mapSize,c.shadowCameraNear=_.camera.near,c.shadowCameraFar=_.camera.far,W.pointShadow[J]=c,W.pointShadowMap[J]=a,W.pointShadowMatrix[J]=S.shadow.matrix,O++}W.point[J]=m,J++}else if(S.isHemisphereLight){let m=E.get(S);m.skyColor.copy(S.color).multiplyScalar(b),m.groundColor.copy(S.groundColor).multiplyScalar(b),W.hemi[Z]=m,Z++}}if(D>0)if(A.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=UA.LTC_FLOAT_1,W.rectAreaLTC2=UA.LTC_FLOAT_2;else W.rectAreaLTC1=UA.LTC_HALF_1,W.rectAreaLTC2=UA.LTC_HALF_2;W.ambient[0]=l,W.ambient[1]=C,W.ambient[2]=F;let P=W.hash;if(P.directionalLength!==I||P.pointLength!==J||P.spotLength!==q||P.rectAreaLength!==D||P.hemiLength!==Z||P.numDirectionalShadows!==N||P.numPointShadows!==O||P.numSpotShadows!==B||P.numSpotMaps!==T||P.numLightProbes!==H)W.directional.length=I,W.spot.length=q,W.rectArea.length=D,W.point.length=J,W.hemi.length=Z,W.directionalShadow.length=N,W.directionalShadowMap.length=N,W.pointShadow.length=O,W.pointShadowMap.length=O,W.spotShadow.length=B,W.spotShadowMap.length=B,W.directionalShadowMatrix.length=N,W.pointShadowMatrix.length=O,W.spotLightMatrix.length=B+T-V,W.spotLightMap.length=T,W.numSpotLightShadowsWithMaps=V,W.numLightProbes=H,P.directionalLength=I,P.pointLength=J,P.spotLength=q,P.rectAreaLength=D,P.hemiLength=Z,P.numDirectionalShadows=N,P.numPointShadows=O,P.numSpotShadows=B,P.numSpotMaps=T,P.numLightProbes=H,W.version=jV++}function L(G,l){let C=0,F=0,I=0,J=0,q=0,D=l.matrixWorldInverse;for(let Z=0,N=G.length;Z<N;Z++){let O=G[Z];if(O.isDirectionalLight){let B=W.directional[C];B.direction.setFromMatrixPosition(O.matrixWorld),w.setFromMatrixPosition(O.target.matrixWorld),B.direction.sub(w),B.direction.transformDirection(D),C++}else if(O.isSpotLight){let B=W.spot[I];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(D),B.direction.setFromMatrixPosition(O.matrixWorld),w.setFromMatrixPosition(O.target.matrixWorld),B.direction.sub(w),B.direction.transformDirection(D),I++}else if(O.isRectAreaLight){let B=W.rectArea[J];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(D),U.identity(),Y.copy(O.matrixWorld),Y.premultiply(D),U.extractRotation(Y),B.halfWidth.set(O.width*0.5,0,0),B.halfHeight.set(0,O.height*0.5,0),B.halfWidth.applyMatrix4(U),B.halfHeight.applyMatrix4(U),J++}else if(O.isPointLight){let B=W.point[F];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(D),F++}else if(O.isHemisphereLight){let B=W.hemi[q];B.direction.setFromMatrixPosition(O.matrixWorld),B.direction.transformDirection(D),q++}}}return{setup:K,setupView:L,state:W}}function uN(A){let E=new gV(A),M=[],W=[];function w(l){G.camera=l,M.length=0,W.length=0}function Y(l){M.push(l)}function U(l){W.push(l)}function K(){E.setup(M)}function L(l){E.setupView(M,l)}let G={lightsArray:M,shadowsArray:W,camera:null,lights:E,transmissionRenderTarget:{}};return{init:w,state:G,setupLights:K,setupLightsView:L,pushLight:Y,pushShadow:U}}function pV(A){let E=new WeakMap;function M(w,Y=0){let U=E.get(w),K;if(U===void 0)K=new uN(A),E.set(w,[K]);else if(Y>=U.length)K=new uN(A),U.push(K);else K=U[Y];return K}function W(){E=new WeakMap}return{get:M,dispose:W}}var bV=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cV=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nV(A,E,M){let W=new NK,w=new xA,Y=new xA,U=new NE,K=new LF({depthPacking:dO}),L=new GF,G={},l=M.maxTextureSize,C={[nY]:UM,[UM]:nY,[UW]:UW},F=new RM({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xA},radius:{value:4}},vertexShader:bV,fragmentShader:cV}),I=F.clone();I.defines.HORIZONTAL_PASS=1;let J=new KM;J.setAttribute("position",new fM(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let q=new LM(J,F),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=DC;let Z=this.type;this.render=function(V,H,P){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(V.length===0)return;let Q=A.getRenderTarget(),X=A.getActiveCubeFace(),S=A.getActiveMipmapLevel(),v=A.state;v.setBlending(Yw),v.buffers.color.setClear(1,1,1,1),v.buffers.depth.setTest(!0),v.setScissorTest(!1);let b=Z!==YW&&this.type===YW,n=Z===YW&&this.type!==YW;for(let a=0,m=V.length;a<m;a++){let _=V[a],c=_.shadow;if(c===void 0){console.warn("THREE.WebGLShadowMap:",_,"has no shadow.");continue}if(c.autoUpdate===!1&&c.needsUpdate===!1)continue;w.copy(c.mapSize);let GA=c.getFrameExtents();if(w.multiply(GA),Y.copy(c.mapSize),w.x>l||w.y>l){if(w.x>l)Y.x=Math.floor(l/GA.x),w.x=Y.x*GA.x,c.mapSize.x=Y.x;if(w.y>l)Y.y=Math.floor(l/GA.y),w.y=Y.y*GA.y,c.mapSize.y=Y.y}if(c.map===null||b===!0||n===!0){let yA=this.type!==YW?{minFilter:iY,magFilter:iY}:{};if(c.map!==null)c.map.dispose();c.map=new SW(w.x,w.y,yA),c.map.texture.name=_.name+".shadowMap",c.camera.updateProjectionMatrix()}A.setRenderTarget(c.map),A.clear();let ZA=c.getViewportCount();for(let yA=0;yA<ZA;yA++){let vA=c.getViewport(yA);U.set(Y.x*vA.x,Y.y*vA.y,Y.x*vA.z,Y.y*vA.w),v.viewport(U),c.updateMatrices(_,yA),W=c.getFrustum(),B(H,P,c.camera,_,this.type)}if(c.isPointLightShadow!==!0&&this.type===YW)N(c,P);c.needsUpdate=!1}Z=this.type,D.needsUpdate=!1,A.setRenderTarget(Q,X,S)};function N(V,H){let P=E.update(q);if(F.defines.VSM_SAMPLES!==V.blurSamples)F.defines.VSM_SAMPLES=V.blurSamples,I.defines.VSM_SAMPLES=V.blurSamples,F.needsUpdate=!0,I.needsUpdate=!0;if(V.mapPass===null)V.mapPass=new SW(w.x,w.y);F.uniforms.shadow_pass.value=V.map.texture,F.uniforms.resolution.value=V.mapSize,F.uniforms.radius.value=V.radius,A.setRenderTarget(V.mapPass),A.clear(),A.renderBufferDirect(H,null,P,F,q,null),I.uniforms.shadow_pass.value=V.mapPass.texture,I.uniforms.resolution.value=V.mapSize,I.uniforms.radius.value=V.radius,A.setRenderTarget(V.map),A.clear(),A.renderBufferDirect(H,null,P,I,q,null)}function O(V,H,P,Q){let X=null,S=P.isPointLight===!0?V.customDistanceMaterial:V.customDepthMaterial;if(S!==void 0)X=S;else if(X=P.isPointLight===!0?L:K,A.localClippingEnabled&&H.clipShadows===!0&&Array.isArray(H.clippingPlanes)&&H.clippingPlanes.length!==0||H.displacementMap&&H.displacementScale!==0||H.alphaMap&&H.alphaTest>0||H.map&&H.alphaTest>0){let v=X.uuid,b=H.uuid,n=G[v];if(n===void 0)n={},G[v]=n;let a=n[b];if(a===void 0)a=X.clone(),n[b]=a,H.addEventListener("dispose",T);X=a}if(X.visible=H.visible,X.wireframe=H.wireframe,Q===YW)X.side=H.shadowSide!==null?H.shadowSide:H.side;else X.side=H.shadowSide!==null?H.shadowSide:C[H.side];if(X.alphaMap=H.alphaMap,X.alphaTest=H.alphaTest,X.map=H.map,X.clipShadows=H.clipShadows,X.clippingPlanes=H.clippingPlanes,X.clipIntersection=H.clipIntersection,X.displacementMap=H.displacementMap,X.displacementScale=H.displacementScale,X.displacementBias=H.displacementBias,X.wireframeLinewidth=H.wireframeLinewidth,X.linewidth=H.linewidth,P.isPointLight===!0&&X.isMeshDistanceMaterial===!0){let v=A.properties.get(X);v.light=P}return X}function B(V,H,P,Q,X){if(V.visible===!1)return;if(V.layers.test(H.layers)&&(V.isMesh||V.isLine||V.isPoints)){if((V.castShadow||V.receiveShadow&&X===YW)&&(!V.frustumCulled||W.intersectsObject(V))){V.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,V.matrixWorld);let b=E.update(V),n=V.material;if(Array.isArray(n)){let a=b.groups;for(let m=0,_=a.length;m<_;m++){let c=a[m],GA=n[c.materialIndex];if(GA&&GA.visible){let ZA=O(V,GA,Q,X);V.onBeforeShadow(A,V,H,P,b,ZA,c),A.renderBufferDirect(P,null,b,ZA,V,c),V.onAfterShadow(A,V,H,P,b,ZA,c)}}}else if(n.visible){let a=O(V,n,Q,X);V.onBeforeShadow(A,V,H,P,b,a,null),A.renderBufferDirect(P,null,b,a,V,null),V.onAfterShadow(A,V,H,P,b,a,null)}}}let v=V.children;for(let b=0,n=v.length;b<n;b++)B(v[b],H,P,Q,X)}function T(V){V.target.removeEventListener("dispose",T);for(let P in G){let Q=G[P],X=V.target.uuid;if(X in Q)Q[X].dispose(),delete Q[X]}}}var mV={[TG]:SG,[kG]:uG,[xG]:hG,[GK]:PG,[SG]:TG,[uG]:kG,[hG]:xG,[PG]:GK};function dV(A,E){function M(){let x=!1,AA=new NE,s=null,o=new NE(0,0,0,0);return{setMask:function(CA){if(s!==CA&&!x)A.colorMask(CA,CA,CA,CA),s=CA},setLocked:function(CA){x=CA},setClear:function(CA,lA,fA,JE,pE){if(pE===!0)CA*=JE,lA*=JE,fA*=JE;if(AA.set(CA,lA,fA,JE),o.equals(AA)===!1)A.clearColor(CA,lA,fA,JE),o.copy(AA)},reset:function(){x=!1,s=null,o.set(-1,0,0,0)}}}function W(){let x=!1,AA=!1,s=null,o=null,CA=null;return{setReversed:function(lA){if(AA!==lA){let fA=E.get("EXT_clip_control");if(AA)fA.clipControlEXT(fA.LOWER_LEFT_EXT,fA.ZERO_TO_ONE_EXT);else fA.clipControlEXT(fA.LOWER_LEFT_EXT,fA.NEGATIVE_ONE_TO_ONE_EXT);let JE=CA;CA=null,this.setClear(JE)}AA=lA},getReversed:function(){return AA},setTest:function(lA){if(lA)YA(A.DEPTH_TEST);else HA(A.DEPTH_TEST)},setMask:function(lA){if(s!==lA&&!x)A.depthMask(lA),s=lA},setFunc:function(lA){if(AA)lA=mV[lA];if(o!==lA){switch(lA){case TG:A.depthFunc(A.NEVER);break;case SG:A.depthFunc(A.ALWAYS);break;case kG:A.depthFunc(A.LESS);break;case GK:A.depthFunc(A.LEQUAL);break;case xG:A.depthFunc(A.EQUAL);break;case PG:A.depthFunc(A.GEQUAL);break;case uG:A.depthFunc(A.GREATER);break;case hG:A.depthFunc(A.NOTEQUAL);break;default:A.depthFunc(A.LEQUAL)}o=lA}},setLocked:function(lA){x=lA},setClear:function(lA){if(CA!==lA){if(AA)lA=1-lA;A.clearDepth(lA),CA=lA}},reset:function(){x=!1,s=null,o=null,CA=null,AA=!1}}}function w(){let x=!1,AA=null,s=null,o=null,CA=null,lA=null,fA=null,JE=null,pE=null;return{setTest:function(_A){if(!x)if(_A)YA(A.STENCIL_TEST);else HA(A.STENCIL_TEST)},setMask:function(_A){if(AA!==_A&&!x)A.stencilMask(_A),AA=_A},setFunc:function(_A,GW,$M){if(s!==_A||o!==GW||CA!==$M)A.stencilFunc(_A,GW,$M),s=_A,o=GW,CA=$M},setOp:function(_A,GW,$M){if(lA!==_A||fA!==GW||JE!==$M)A.stencilOp(_A,GW,$M),lA=_A,fA=GW,JE=$M},setLocked:function(_A){x=_A},setClear:function(_A){if(pE!==_A)A.clearStencil(_A),pE=_A},reset:function(){x=!1,AA=null,s=null,o=null,CA=null,lA=null,fA=null,JE=null,pE=null}}}let Y=new M,U=new W,K=new w,L=new WeakMap,G=new WeakMap,l={},C={},F=new WeakMap,I=[],J=null,q=!1,D=null,Z=null,N=null,O=null,B=null,T=null,V=null,H=new mA(0,0,0),P=0,Q=!1,X=null,S=null,v=null,b=null,n=null,a=A.getParameter(A.MAX_COMBINED_TEXTURE_IMAGE_UNITS),m=!1,_=0,c=A.getParameter(A.VERSION);if(c.indexOf("WebGL")!==-1)_=parseFloat(/^WebGL (\d)/.exec(c)[1]),m=_>=1;else if(c.indexOf("OpenGL ES")!==-1)_=parseFloat(/^OpenGL ES (\d)/.exec(c)[1]),m=_>=2;let GA=null,ZA={},yA=A.getParameter(A.SCISSOR_BOX),vA=A.getParameter(A.VIEWPORT),i=new NE().fromArray(yA),EA=new NE().fromArray(vA);function QA(x,AA,s,o){let CA=new Uint8Array(4),lA=A.createTexture();A.bindTexture(x,lA),A.texParameteri(x,A.TEXTURE_MIN_FILTER,A.NEAREST),A.texParameteri(x,A.TEXTURE_MAG_FILTER,A.NEAREST);for(let fA=0;fA<s;fA++)if(x===A.TEXTURE_3D||x===A.TEXTURE_2D_ARRAY)A.texImage3D(AA,0,A.RGBA,1,1,o,0,A.RGBA,A.UNSIGNED_BYTE,CA);else A.texImage2D(AA+fA,0,A.RGBA,1,1,0,A.RGBA,A.UNSIGNED_BYTE,CA);return lA}let XA={};XA[A.TEXTURE_2D]=QA(A.TEXTURE_2D,A.TEXTURE_2D,1),XA[A.TEXTURE_CUBE_MAP]=QA(A.TEXTURE_CUBE_MAP,A.TEXTURE_CUBE_MAP_POSITIVE_X,6),XA[A.TEXTURE_2D_ARRAY]=QA(A.TEXTURE_2D_ARRAY,A.TEXTURE_2D_ARRAY,1,1),XA[A.TEXTURE_3D]=QA(A.TEXTURE_3D,A.TEXTURE_3D,1,1),Y.setClear(0,0,0,1),U.setClear(1),K.setClear(0),YA(A.DEPTH_TEST),U.setFunc(GK),$A(!1),FA(FC),YA(A.CULL_FACE),yE(Yw);function YA(x){if(l[x]!==!0)A.enable(x),l[x]=!0}function HA(x){if(l[x]!==!1)A.disable(x),l[x]=!1}function aA(x,AA){if(C[x]!==AA){if(A.bindFramebuffer(x,AA),C[x]=AA,x===A.DRAW_FRAMEBUFFER)C[A.FRAMEBUFFER]=AA;if(x===A.FRAMEBUFFER)C[A.DRAW_FRAMEBUFFER]=AA;return!0}return!1}function bA(x,AA){let s=I,o=!1;if(x){if(s=F.get(AA),s===void 0)s=[],F.set(AA,s);let CA=x.textures;if(s.length!==CA.length||s[0]!==A.COLOR_ATTACHMENT0){for(let lA=0,fA=CA.length;lA<fA;lA++)s[lA]=A.COLOR_ATTACHMENT0+lA;s.length=CA.length,o=!0}}else if(s[0]!==A.BACK)s[0]=A.BACK,o=!0;if(o)A.drawBuffers(s)}function cA(x){if(J!==x)return A.useProgram(x),J=x,!0;return!1}let RE={[mY]:A.FUNC_ADD,[WO]:A.FUNC_SUBTRACT,[wO]:A.FUNC_REVERSE_SUBTRACT};RE[YO]=A.MIN,RE[UO]=A.MAX;let k={[KO]:A.ZERO,[LO]:A.ONE,[GO]:A.SRC_COLOR,[lO]:A.SRC_ALPHA,[NO]:A.SRC_ALPHA_SATURATE,[IO]:A.DST_COLOR,[FO]:A.DST_ALPHA,[ZO]:A.ONE_MINUS_SRC_COLOR,[CO]:A.ONE_MINUS_SRC_ALPHA,[OO]:A.ONE_MINUS_DST_COLOR,[DO]:A.ONE_MINUS_DST_ALPHA,[JO]:A.CONSTANT_COLOR,[qO]:A.ONE_MINUS_CONSTANT_COLOR,[zO]:A.CONSTANT_ALPHA,[QO]:A.ONE_MINUS_CONSTANT_ALPHA};function yE(x,AA,s,o,CA,lA,fA,JE,pE,_A){if(x===Yw){if(q===!0)HA(A.BLEND),q=!1;return}if(q===!1)YA(A.BLEND),q=!0;if(x!==MO){if(x!==D||_A!==Q){if(Z!==mY||B!==mY)A.blendEquation(A.FUNC_ADD),Z=mY,B=mY;if(_A)switch(x){case LK:A.blendFuncSeparate(A.ONE,A.ONE_MINUS_SRC_ALPHA,A.ONE,A.ONE_MINUS_SRC_ALPHA);break;case IC:A.blendFunc(A.ONE,A.ONE);break;case OC:A.blendFuncSeparate(A.ZERO,A.ONE_MINUS_SRC_COLOR,A.ZERO,A.ONE);break;case NC:A.blendFuncSeparate(A.ZERO,A.SRC_COLOR,A.ZERO,A.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",x);break}else switch(x){case LK:A.blendFuncSeparate(A.SRC_ALPHA,A.ONE_MINUS_SRC_ALPHA,A.ONE,A.ONE_MINUS_SRC_ALPHA);break;case IC:A.blendFunc(A.SRC_ALPHA,A.ONE);break;case OC:A.blendFuncSeparate(A.ZERO,A.ONE_MINUS_SRC_COLOR,A.ZERO,A.ONE);break;case NC:A.blendFunc(A.ZERO,A.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",x);break}N=null,O=null,T=null,V=null,H.set(0,0,0),P=0,D=x,Q=_A}return}if(CA=CA||AA,lA=lA||s,fA=fA||o,AA!==Z||CA!==B)A.blendEquationSeparate(RE[AA],RE[CA]),Z=AA,B=CA;if(s!==N||o!==O||lA!==T||fA!==V)A.blendFuncSeparate(k[s],k[o],k[lA],k[fA]),N=s,O=o,T=lA,V=fA;if(JE.equals(H)===!1||pE!==P)A.blendColor(JE.r,JE.g,JE.b,pE),H.copy(JE),P=pE;D=x,Q=!1}function tA(x,AA){x.side===UW?HA(A.CULL_FACE):YA(A.CULL_FACE);let s=x.side===UM;if(AA)s=!s;$A(s),x.blending===LK&&x.transparent===!1?yE(Yw):yE(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),U.setFunc(x.depthFunc),U.setTest(x.depthTest),U.setMask(x.depthWrite),Y.setMask(x.colorWrite);let o=x.stencilWrite;if(K.setTest(o),o)K.setMask(x.stencilWriteMask),K.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),K.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass);MA(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?YA(A.SAMPLE_ALPHA_TO_COVERAGE):HA(A.SAMPLE_ALPHA_TO_COVERAGE)}function $A(x){if(X!==x){if(x)A.frontFace(A.CW);else A.frontFace(A.CCW);X=x}}function FA(x){if(x!==e5){if(YA(A.CULL_FACE),x!==S)if(x===FC)A.cullFace(A.BACK);else if(x===AO)A.cullFace(A.FRONT);else A.cullFace(A.FRONT_AND_BACK)}else HA(A.CULL_FACE);S=x}function UE(x){if(x!==v){if(m)A.lineWidth(x);v=x}}function MA(x,AA,s){if(x){if(YA(A.POLYGON_OFFSET_FILL),b!==AA||n!==s)A.polygonOffset(AA,s),b=AA,n=s}else HA(A.POLYGON_OFFSET_FILL)}function zA(x){if(x)YA(A.SCISSOR_TEST);else HA(A.SCISSOR_TEST)}function y(x){if(x===void 0)x=A.TEXTURE0+a-1;if(GA!==x)A.activeTexture(x),GA=x}function z(x,AA,s){if(s===void 0)if(GA===null)s=A.TEXTURE0+a-1;else s=GA;let o=ZA[s];if(o===void 0)o={type:void 0,texture:void 0},ZA[s]=o;if(o.type!==x||o.texture!==AA){if(GA!==s)A.activeTexture(s),GA=s;A.bindTexture(x,AA||XA[x]),o.type=x,o.texture=AA}}function j(){let x=ZA[GA];if(x!==void 0&&x.type!==void 0)A.bindTexture(x.type,null),x.type=void 0,x.texture=void 0}function r(){try{A.compressedTexImage2D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function t(){try{A.compressedTexImage3D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function d(){try{A.texSubImage2D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function RA(){try{A.texSubImage3D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function KA(){try{A.compressedTexSubImage2D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function DA(){try{A.compressedTexSubImage3D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function uA(){try{A.texStorage2D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function WA(){try{A.texStorage3D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function IA(){try{A.texImage2D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function nA(){try{A.texImage3D.apply(A,arguments)}catch(x){console.error("THREE.WebGLState:",x)}}function TA(x){if(i.equals(x)===!1)A.scissor(x.x,x.y,x.z,x.w),i.copy(x)}function JA(x){if(EA.equals(x)===!1)A.viewport(x.x,x.y,x.z,x.w),EA.copy(x)}function hA(x,AA){let s=G.get(AA);if(s===void 0)s=new WeakMap,G.set(AA,s);let o=s.get(x);if(o===void 0)o=A.getUniformBlockIndex(AA,x.name),s.set(x,o)}function gA(x,AA){let o=G.get(AA).get(x);if(L.get(AA)!==o)A.uniformBlockBinding(AA,o,x.__bindingPointIndex),L.set(AA,o)}function FE(){A.disable(A.BLEND),A.disable(A.CULL_FACE),A.disable(A.DEPTH_TEST),A.disable(A.POLYGON_OFFSET_FILL),A.disable(A.SCISSOR_TEST),A.disable(A.STENCIL_TEST),A.disable(A.SAMPLE_ALPHA_TO_COVERAGE),A.blendEquation(A.FUNC_ADD),A.blendFunc(A.ONE,A.ZERO),A.blendFuncSeparate(A.ONE,A.ZERO,A.ONE,A.ZERO),A.blendColor(0,0,0,0),A.colorMask(!0,!0,!0,!0),A.clearColor(0,0,0,0),A.depthMask(!0),A.depthFunc(A.LESS),U.setReversed(!1),A.clearDepth(1),A.stencilMask(4294967295),A.stencilFunc(A.ALWAYS,0,4294967295),A.stencilOp(A.KEEP,A.KEEP,A.KEEP),A.clearStencil(0),A.cullFace(A.BACK),A.frontFace(A.CCW),A.polygonOffset(0,0),A.activeTexture(A.TEXTURE0),A.bindFramebuffer(A.FRAMEBUFFER,null),A.bindFramebuffer(A.DRAW_FRAMEBUFFER,null),A.bindFramebuffer(A.READ_FRAMEBUFFER,null),A.useProgram(null),A.lineWidth(1),A.scissor(0,0,A.canvas.width,A.canvas.height),A.viewport(0,0,A.canvas.width,A.canvas.height),l={},GA=null,ZA={},C={},F=new WeakMap,I=[],J=null,q=!1,D=null,Z=null,N=null,O=null,B=null,T=null,V=null,H=new mA(0,0,0),P=0,Q=!1,X=null,S=null,v=null,b=null,n=null,i.set(0,0,A.canvas.width,A.canvas.height),EA.set(0,0,A.canvas.width,A.canvas.height),Y.reset(),U.reset(),K.reset()}return{buffers:{color:Y,depth:U,stencil:K},enable:YA,disable:HA,bindFramebuffer:aA,drawBuffers:bA,useProgram:cA,setBlending:yE,setMaterial:tA,setFlipSided:$A,setCullFace:FA,setLineWidth:UE,setPolygonOffset:MA,setScissorTest:zA,activeTexture:y,bindTexture:z,unbindTexture:j,compressedTexImage2D:r,compressedTexImage3D:t,texImage2D:IA,texImage3D:nA,updateUBOMapping:hA,uniformBlockBinding:gA,texStorage2D:uA,texStorage3D:WA,texSubImage2D:d,texSubImage3D:RA,compressedTexSubImage2D:KA,compressedTexSubImage3D:DA,scissor:TA,viewport:JA,reset:FE}}function iV(A,E,M,W,w,Y,U){let K=E.has("WEBGL_multisampled_render_to_texture")?E.get("WEBGL_multisampled_render_to_texture"):null,L=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),G=new xA,l=new WeakMap,C,F=new WeakMap,I=!1;try{I=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(y){}function J(y,z){return I?new OffscreenCanvas(y,z):cY("canvas")}function q(y,z,j){let r=1,t=zA(y);if(t.width>j||t.height>j)r=j/Math.max(t.width,t.height);if(r<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){let d=Math.floor(r*t.width),RA=Math.floor(r*t.height);if(C===void 0)C=J(d,RA);let KA=z?J(d,RA):C;return KA.width=d,KA.height=RA,KA.getContext("2d").drawImage(y,0,0,d,RA),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+d+"x"+RA+")."),KA}else{if("data"in y)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return y}return y}function D(y){return y.generateMipmaps}function Z(y){A.generateMipmap(y)}function N(y){if(y.isWebGLCubeRenderTarget)return A.TEXTURE_CUBE_MAP;if(y.isWebGL3DRenderTarget)return A.TEXTURE_3D;if(y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture)return A.TEXTURE_2D_ARRAY;return A.TEXTURE_2D}function O(y,z,j,r,t=!1){if(y!==null){if(A[y]!==void 0)return A[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let d=z;if(z===A.RED){if(j===A.FLOAT)d=A.R32F;if(j===A.HALF_FLOAT)d=A.R16F;if(j===A.UNSIGNED_BYTE)d=A.R8}if(z===A.RED_INTEGER){if(j===A.UNSIGNED_BYTE)d=A.R8UI;if(j===A.UNSIGNED_SHORT)d=A.R16UI;if(j===A.UNSIGNED_INT)d=A.R32UI;if(j===A.BYTE)d=A.R8I;if(j===A.SHORT)d=A.R16I;if(j===A.INT)d=A.R32I}if(z===A.RG){if(j===A.FLOAT)d=A.RG32F;if(j===A.HALF_FLOAT)d=A.RG16F;if(j===A.UNSIGNED_BYTE)d=A.RG8}if(z===A.RG_INTEGER){if(j===A.UNSIGNED_BYTE)d=A.RG8UI;if(j===A.UNSIGNED_SHORT)d=A.RG16UI;if(j===A.UNSIGNED_INT)d=A.RG32UI;if(j===A.BYTE)d=A.RG8I;if(j===A.SHORT)d=A.RG16I;if(j===A.INT)d=A.RG32I}if(z===A.RGB_INTEGER){if(j===A.UNSIGNED_BYTE)d=A.RGB8UI;if(j===A.UNSIGNED_SHORT)d=A.RGB16UI;if(j===A.UNSIGNED_INT)d=A.RGB32UI;if(j===A.BYTE)d=A.RGB8I;if(j===A.SHORT)d=A.RGB16I;if(j===A.INT)d=A.RGB32I}if(z===A.RGBA_INTEGER){if(j===A.UNSIGNED_BYTE)d=A.RGBA8UI;if(j===A.UNSIGNED_SHORT)d=A.RGBA16UI;if(j===A.UNSIGNED_INT)d=A.RGBA32UI;if(j===A.BYTE)d=A.RGBA8I;if(j===A.SHORT)d=A.RGBA16I;if(j===A.INT)d=A.RGBA32I}if(z===A.RGB){if(j===A.UNSIGNED_INT_5_9_9_9_REV)d=A.RGB9_E5}if(z===A.RGBA){let RA=t?tC:oA.getTransfer(r);if(j===A.FLOAT)d=A.RGBA32F;if(j===A.HALF_FLOAT)d=A.RGBA16F;if(j===A.UNSIGNED_BYTE)d=RA===YE?A.SRGB8_ALPHA8:A.RGBA8;if(j===A.UNSIGNED_SHORT_4_4_4_4)d=A.RGBA4;if(j===A.UNSIGNED_SHORT_5_5_5_1)d=A.RGB5_A1}if(d===A.R16F||d===A.R32F||d===A.RG16F||d===A.RG32F||d===A.RGBA16F||d===A.RGBA32F)E.get("EXT_color_buffer_float");return d}function B(y,z){let j;if(y){if(z===null||z===oY||z===rY)j=A.DEPTH24_STENCIL8;else if(z===Kw)j=A.DEPTH32F_STENCIL8;else if(z===CK)j=A.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(z===null||z===oY||z===rY)j=A.DEPTH_COMPONENT24;else if(z===Kw)j=A.DEPTH_COMPONENT32F;else if(z===CK)j=A.DEPTH_COMPONENT16;return j}function T(y,z){if(D(y)===!0||y.isFramebufferTexture&&y.minFilter!==iY&&y.minFilter!==fw)return Math.log2(Math.max(z.width,z.height))+1;else if(y.mipmaps!==void 0&&y.mipmaps.length>0)return y.mipmaps.length;else if(y.isCompressedTexture&&Array.isArray(y.image))return z.mipmaps.length;else return 1}function V(y){let z=y.target;if(z.removeEventListener("dispose",V),P(z),z.isVideoTexture)l.delete(z)}function H(y){let z=y.target;z.removeEventListener("dispose",H),X(z)}function P(y){let z=W.get(y);if(z.__webglInit===void 0)return;let j=y.source,r=F.get(j);if(r){let t=r[z.__cacheKey];if(t.usedTimes--,t.usedTimes===0)Q(y);if(Object.keys(r).length===0)F.delete(j)}W.remove(y)}function Q(y){let z=W.get(y);A.deleteTexture(z.__webglTexture);let j=y.source,r=F.get(j);delete r[z.__cacheKey],U.memory.textures--}function X(y){let z=W.get(y);if(y.depthTexture)y.depthTexture.dispose(),W.remove(y.depthTexture);if(y.isWebGLCubeRenderTarget)for(let r=0;r<6;r++){if(Array.isArray(z.__webglFramebuffer[r]))for(let t=0;t<z.__webglFramebuffer[r].length;t++)A.deleteFramebuffer(z.__webglFramebuffer[r][t]);else A.deleteFramebuffer(z.__webglFramebuffer[r]);if(z.__webglDepthbuffer)A.deleteRenderbuffer(z.__webglDepthbuffer[r])}else{if(Array.isArray(z.__webglFramebuffer))for(let r=0;r<z.__webglFramebuffer.length;r++)A.deleteFramebuffer(z.__webglFramebuffer[r]);else A.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer)A.deleteRenderbuffer(z.__webglDepthbuffer);if(z.__webglMultisampledFramebuffer)A.deleteFramebuffer(z.__webglMultisampledFramebuffer);if(z.__webglColorRenderbuffer){for(let r=0;r<z.__webglColorRenderbuffer.length;r++)if(z.__webglColorRenderbuffer[r])A.deleteRenderbuffer(z.__webglColorRenderbuffer[r])}if(z.__webglDepthRenderbuffer)A.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let j=y.textures;for(let r=0,t=j.length;r<t;r++){let d=W.get(j[r]);if(d.__webglTexture)A.deleteTexture(d.__webglTexture),U.memory.textures--;W.remove(j[r])}W.remove(y)}let S=0;function v(){S=0}function b(){let y=S;if(y>=w.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+w.maxTextures);return S+=1,y}function n(y){let z=[];return z.push(y.wrapS),z.push(y.wrapT),z.push(y.wrapR||0),z.push(y.magFilter),z.push(y.minFilter),z.push(y.anisotropy),z.push(y.internalFormat),z.push(y.format),z.push(y.type),z.push(y.generateMipmaps),z.push(y.premultiplyAlpha),z.push(y.flipY),z.push(y.unpackAlignment),z.push(y.colorSpace),z.join()}function a(y,z){let j=W.get(y);if(y.isVideoTexture)UE(y);if(y.isRenderTargetTexture===!1&&y.version>0&&j.__version!==y.version){let r=y.image;if(r===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(r.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{EA(j,y,z);return}}M.bindTexture(A.TEXTURE_2D,j.__webglTexture,A.TEXTURE0+z)}function m(y,z){let j=W.get(y);if(y.version>0&&j.__version!==y.version){EA(j,y,z);return}M.bindTexture(A.TEXTURE_2D_ARRAY,j.__webglTexture,A.TEXTURE0+z)}function _(y,z){let j=W.get(y);if(y.version>0&&j.__version!==y.version){EA(j,y,z);return}M.bindTexture(A.TEXTURE_3D,j.__webglTexture,A.TEXTURE0+z)}function c(y,z){let j=W.get(y);if(y.version>0&&j.__version!==y.version){QA(j,y,z);return}M.bindTexture(A.TEXTURE_CUBE_MAP,j.__webglTexture,A.TEXTURE0+z)}let GA={[xO]:A.REPEAT,[gG]:A.CLAMP_TO_EDGE,[PO]:A.MIRRORED_REPEAT},ZA={[iY]:A.NEAREST,[uO]:A.NEAREST_MIPMAP_NEAREST,[lK]:A.NEAREST_MIPMAP_LINEAR,[fw]:A.LINEAR,[pG]:A.LINEAR_MIPMAP_NEAREST,[sY]:A.LINEAR_MIPMAP_LINEAR},yA={[oO]:A.NEVER,[eO]:A.ALWAYS,[rO]:A.LESS,[$C]:A.LEQUAL,[aO]:A.EQUAL,[_O]:A.GEQUAL,[tO]:A.GREATER,[$O]:A.NOTEQUAL};function vA(y,z){if(z.type===Kw&&E.has("OES_texture_float_linear")===!1&&(z.magFilter===fw||z.magFilter===pG||z.magFilter===lK||z.magFilter===sY||z.minFilter===fw||z.minFilter===pG||z.minFilter===lK||z.minFilter===sY))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(A.texParameteri(y,A.TEXTURE_WRAP_S,GA[z.wrapS]),A.texParameteri(y,A.TEXTURE_WRAP_T,GA[z.wrapT]),y===A.TEXTURE_3D||y===A.TEXTURE_2D_ARRAY)A.texParameteri(y,A.TEXTURE_WRAP_R,GA[z.wrapR]);if(A.texParameteri(y,A.TEXTURE_MAG_FILTER,ZA[z.magFilter]),A.texParameteri(y,A.TEXTURE_MIN_FILTER,ZA[z.minFilter]),z.compareFunction)A.texParameteri(y,A.TEXTURE_COMPARE_MODE,A.COMPARE_REF_TO_TEXTURE),A.texParameteri(y,A.TEXTURE_COMPARE_FUNC,yA[z.compareFunction]);if(E.has("EXT_texture_filter_anisotropic")===!0){if(z.magFilter===iY)return;if(z.minFilter!==lK&&z.minFilter!==sY)return;if(z.type===Kw&&E.has("OES_texture_float_linear")===!1)return;if(z.anisotropy>1||W.get(z).__currentAnisotropy){let j=E.get("EXT_texture_filter_anisotropic");A.texParameterf(y,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(z.anisotropy,w.getMaxAnisotropy())),W.get(z).__currentAnisotropy=z.anisotropy}}}function i(y,z){let j=!1;if(y.__webglInit===void 0)y.__webglInit=!0,z.addEventListener("dispose",V);let r=z.source,t=F.get(r);if(t===void 0)t={},F.set(r,t);let d=n(z);if(d!==y.__cacheKey){if(t[d]===void 0)t[d]={texture:A.createTexture(),usedTimes:0},U.memory.textures++,j=!0;t[d].usedTimes++;let RA=t[y.__cacheKey];if(RA!==void 0){if(t[y.__cacheKey].usedTimes--,RA.usedTimes===0)Q(z)}y.__cacheKey=d,y.__webglTexture=t[d].texture}return j}function EA(y,z,j){let r=A.TEXTURE_2D;if(z.isDataArrayTexture||z.isCompressedArrayTexture)r=A.TEXTURE_2D_ARRAY;if(z.isData3DTexture)r=A.TEXTURE_3D;let t=i(y,z),d=z.source;M.bindTexture(r,y.__webglTexture,A.TEXTURE0+j);let RA=W.get(d);if(d.version!==RA.__version||t===!0){M.activeTexture(A.TEXTURE0+j);let KA=oA.getPrimaries(oA.workingColorSpace),DA=z.colorSpace===jw?null:oA.getPrimaries(z.colorSpace),uA=z.colorSpace===jw||KA===DA?A.NONE:A.BROWSER_DEFAULT_WEBGL;A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,z.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,z.unpackAlignment),A.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL,uA);let WA=q(z.image,!1,w.maxTextureSize);WA=MA(z,WA);let IA=Y.convert(z.format,z.colorSpace),nA=Y.convert(z.type),TA=O(z.internalFormat,IA,nA,z.colorSpace,z.isVideoTexture);vA(r,z);let JA,hA=z.mipmaps,gA=z.isVideoTexture!==!0,FE=RA.__version===void 0||t===!0,x=d.dataReady,AA=T(z,WA);if(z.isDepthTexture){if(TA=B(z.format===DK,z.type),FE)if(gA)M.texStorage2D(A.TEXTURE_2D,1,TA,WA.width,WA.height);else M.texImage2D(A.TEXTURE_2D,0,TA,WA.width,WA.height,0,IA,nA,null)}else if(z.isDataTexture)if(hA.length>0){if(gA&&FE)M.texStorage2D(A.TEXTURE_2D,AA,TA,hA[0].width,hA[0].height);for(let s=0,o=hA.length;s<o;s++)if(JA=hA[s],gA){if(x)M.texSubImage2D(A.TEXTURE_2D,s,0,0,JA.width,JA.height,IA,nA,JA.data)}else M.texImage2D(A.TEXTURE_2D,s,TA,JA.width,JA.height,0,IA,nA,JA.data);z.generateMipmaps=!1}else if(gA){if(FE)M.texStorage2D(A.TEXTURE_2D,AA,TA,WA.width,WA.height);if(x)M.texSubImage2D(A.TEXTURE_2D,0,0,0,WA.width,WA.height,IA,nA,WA.data)}else M.texImage2D(A.TEXTURE_2D,0,TA,WA.width,WA.height,0,IA,nA,WA.data);else if(z.isCompressedTexture)if(z.isCompressedArrayTexture){if(gA&&FE)M.texStorage3D(A.TEXTURE_2D_ARRAY,AA,TA,hA[0].width,hA[0].height,WA.depth);for(let s=0,o=hA.length;s<o;s++)if(JA=hA[s],z.format!==KW)if(IA!==null)if(gA){if(x)if(z.layerUpdates.size>0){let CA=XF(JA.width,JA.height,z.format,z.type);for(let lA of z.layerUpdates){let fA=JA.data.subarray(lA*CA/JA.data.BYTES_PER_ELEMENT,(lA+1)*CA/JA.data.BYTES_PER_ELEMENT);M.compressedTexSubImage3D(A.TEXTURE_2D_ARRAY,s,0,0,lA,JA.width,JA.height,1,IA,fA)}z.clearLayerUpdates()}else M.compressedTexSubImage3D(A.TEXTURE_2D_ARRAY,s,0,0,0,JA.width,JA.height,WA.depth,IA,JA.data)}else M.compressedTexImage3D(A.TEXTURE_2D_ARRAY,s,TA,JA.width,JA.height,WA.depth,0,JA.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(gA){if(x)M.texSubImage3D(A.TEXTURE_2D_ARRAY,s,0,0,0,JA.width,JA.height,WA.depth,IA,nA,JA.data)}else M.texImage3D(A.TEXTURE_2D_ARRAY,s,TA,JA.width,JA.height,WA.depth,0,IA,nA,JA.data)}else{if(gA&&FE)M.texStorage2D(A.TEXTURE_2D,AA,TA,hA[0].width,hA[0].height);for(let s=0,o=hA.length;s<o;s++)if(JA=hA[s],z.format!==KW)if(IA!==null)if(gA){if(x)M.compressedTexSubImage2D(A.TEXTURE_2D,s,0,0,JA.width,JA.height,IA,JA.data)}else M.compressedTexImage2D(A.TEXTURE_2D,s,TA,JA.width,JA.height,0,JA.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(gA){if(x)M.texSubImage2D(A.TEXTURE_2D,s,0,0,JA.width,JA.height,IA,nA,JA.data)}else M.texImage2D(A.TEXTURE_2D,s,TA,JA.width,JA.height,0,IA,nA,JA.data)}else if(z.isDataArrayTexture)if(gA){if(FE)M.texStorage3D(A.TEXTURE_2D_ARRAY,AA,TA,WA.width,WA.height,WA.depth);if(x)if(z.layerUpdates.size>0){let s=XF(WA.width,WA.height,z.format,z.type);for(let o of z.layerUpdates){let CA=WA.data.subarray(o*s/WA.data.BYTES_PER_ELEMENT,(o+1)*s/WA.data.BYTES_PER_ELEMENT);M.texSubImage3D(A.TEXTURE_2D_ARRAY,0,0,0,o,WA.width,WA.height,1,IA,nA,CA)}z.clearLayerUpdates()}else M.texSubImage3D(A.TEXTURE_2D_ARRAY,0,0,0,0,WA.width,WA.height,WA.depth,IA,nA,WA.data)}else M.texImage3D(A.TEXTURE_2D_ARRAY,0,TA,WA.width,WA.height,WA.depth,0,IA,nA,WA.data);else if(z.isData3DTexture)if(gA){if(FE)M.texStorage3D(A.TEXTURE_3D,AA,TA,WA.width,WA.height,WA.depth);if(x)M.texSubImage3D(A.TEXTURE_3D,0,0,0,0,WA.width,WA.height,WA.depth,IA,nA,WA.data)}else M.texImage3D(A.TEXTURE_3D,0,TA,WA.width,WA.height,WA.depth,0,IA,nA,WA.data);else if(z.isFramebufferTexture){if(FE)if(gA)M.texStorage2D(A.TEXTURE_2D,AA,TA,WA.width,WA.height);else{let{width:s,height:o}=WA;for(let CA=0;CA<AA;CA++)M.texImage2D(A.TEXTURE_2D,CA,TA,s,o,0,IA,nA,null),s>>=1,o>>=1}}else if(hA.length>0){if(gA&&FE){let s=zA(hA[0]);M.texStorage2D(A.TEXTURE_2D,AA,TA,s.width,s.height)}for(let s=0,o=hA.length;s<o;s++)if(JA=hA[s],gA){if(x)M.texSubImage2D(A.TEXTURE_2D,s,0,0,IA,nA,JA)}else M.texImage2D(A.TEXTURE_2D,s,TA,IA,nA,JA);z.generateMipmaps=!1}else if(gA){if(FE){let s=zA(WA);M.texStorage2D(A.TEXTURE_2D,AA,TA,s.width,s.height)}if(x)M.texSubImage2D(A.TEXTURE_2D,0,0,0,IA,nA,WA)}else M.texImage2D(A.TEXTURE_2D,0,TA,IA,nA,WA);if(D(z))Z(r);if(RA.__version=d.version,z.onUpdate)z.onUpdate(z)}y.__version=z.version}function QA(y,z,j){if(z.image.length!==6)return;let r=i(y,z),t=z.source;M.bindTexture(A.TEXTURE_CUBE_MAP,y.__webglTexture,A.TEXTURE0+j);let d=W.get(t);if(t.version!==d.__version||r===!0){M.activeTexture(A.TEXTURE0+j);let RA=oA.getPrimaries(oA.workingColorSpace),KA=z.colorSpace===jw?null:oA.getPrimaries(z.colorSpace),DA=z.colorSpace===jw||RA===KA?A.NONE:A.BROWSER_DEFAULT_WEBGL;A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,z.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,z.unpackAlignment),A.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL,DA);let uA=z.isCompressedTexture||z.image[0].isCompressedTexture,WA=z.image[0]&&z.image[0].isDataTexture,IA=[];for(let o=0;o<6;o++){if(!uA&&!WA)IA[o]=q(z.image[o],!0,w.maxCubemapSize);else IA[o]=WA?z.image[o].image:z.image[o];IA[o]=MA(z,IA[o])}let nA=IA[0],TA=Y.convert(z.format,z.colorSpace),JA=Y.convert(z.type),hA=O(z.internalFormat,TA,JA,z.colorSpace),gA=z.isVideoTexture!==!0,FE=d.__version===void 0||r===!0,x=t.dataReady,AA=T(z,nA);vA(A.TEXTURE_CUBE_MAP,z);let s;if(uA){if(gA&&FE)M.texStorage2D(A.TEXTURE_CUBE_MAP,AA,hA,nA.width,nA.height);for(let o=0;o<6;o++){s=IA[o].mipmaps;for(let CA=0;CA<s.length;CA++){let lA=s[CA];if(z.format!==KW)if(TA!==null)if(gA){if(x)M.compressedTexSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA,0,0,lA.width,lA.height,TA,lA.data)}else M.compressedTexImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA,hA,lA.width,lA.height,0,lA.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(gA){if(x)M.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA,0,0,lA.width,lA.height,TA,JA,lA.data)}else M.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA,hA,lA.width,lA.height,0,TA,JA,lA.data)}}}else{if(s=z.mipmaps,gA&&FE){if(s.length>0)AA++;let o=zA(IA[0]);M.texStorage2D(A.TEXTURE_CUBE_MAP,AA,hA,o.width,o.height)}for(let o=0;o<6;o++)if(WA){if(gA){if(x)M.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,0,0,IA[o].width,IA[o].height,TA,JA,IA[o].data)}else M.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,hA,IA[o].width,IA[o].height,0,TA,JA,IA[o].data);for(let CA=0;CA<s.length;CA++){let fA=s[CA].image[o].image;if(gA){if(x)M.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA+1,0,0,fA.width,fA.height,TA,JA,fA.data)}else M.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA+1,hA,fA.width,fA.height,0,TA,JA,fA.data)}}else{if(gA){if(x)M.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,0,0,TA,JA,IA[o])}else M.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,0,hA,TA,JA,IA[o]);for(let CA=0;CA<s.length;CA++){let lA=s[CA];if(gA){if(x)M.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA+1,0,0,TA,JA,lA.image[o])}else M.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X+o,CA+1,hA,TA,JA,lA.image[o])}}}if(D(z))Z(A.TEXTURE_CUBE_MAP);if(d.__version=t.version,z.onUpdate)z.onUpdate(z)}y.__version=z.version}function XA(y,z,j,r,t,d){let RA=Y.convert(j.format,j.colorSpace),KA=Y.convert(j.type),DA=O(j.internalFormat,RA,KA,j.colorSpace),uA=W.get(z),WA=W.get(j);if(WA.__renderTarget=z,!uA.__hasExternalTextures){let IA=Math.max(1,z.width>>d),nA=Math.max(1,z.height>>d);if(t===A.TEXTURE_3D||t===A.TEXTURE_2D_ARRAY)M.texImage3D(t,d,DA,IA,nA,z.depth,0,RA,KA,null);else M.texImage2D(t,d,DA,IA,nA,0,RA,KA,null)}if(M.bindFramebuffer(A.FRAMEBUFFER,y),FA(z))K.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER,r,t,WA.__webglTexture,0,$A(z));else if(t===A.TEXTURE_2D||t>=A.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=A.TEXTURE_CUBE_MAP_NEGATIVE_Z)A.framebufferTexture2D(A.FRAMEBUFFER,r,t,WA.__webglTexture,d);M.bindFramebuffer(A.FRAMEBUFFER,null)}function YA(y,z,j){if(A.bindRenderbuffer(A.RENDERBUFFER,y),z.depthBuffer){let r=z.depthTexture,t=r&&r.isDepthTexture?r.type:null,d=B(z.stencilBuffer,t),RA=z.stencilBuffer?A.DEPTH_STENCIL_ATTACHMENT:A.DEPTH_ATTACHMENT,KA=$A(z);if(FA(z))K.renderbufferStorageMultisampleEXT(A.RENDERBUFFER,KA,d,z.width,z.height);else if(j)A.renderbufferStorageMultisample(A.RENDERBUFFER,KA,d,z.width,z.height);else A.renderbufferStorage(A.RENDERBUFFER,d,z.width,z.height);A.framebufferRenderbuffer(A.FRAMEBUFFER,RA,A.RENDERBUFFER,y)}else{let r=z.textures;for(let t=0;t<r.length;t++){let d=r[t],RA=Y.convert(d.format,d.colorSpace),KA=Y.convert(d.type),DA=O(d.internalFormat,RA,KA,d.colorSpace),uA=$A(z);if(j&&FA(z)===!1)A.renderbufferStorageMultisample(A.RENDERBUFFER,uA,DA,z.width,z.height);else if(FA(z))K.renderbufferStorageMultisampleEXT(A.RENDERBUFFER,uA,DA,z.width,z.height);else A.renderbufferStorage(A.RENDERBUFFER,DA,z.width,z.height)}}A.bindRenderbuffer(A.RENDERBUFFER,null)}function HA(y,z){if(z&&z.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(M.bindFramebuffer(A.FRAMEBUFFER,y),!(z.depthTexture&&z.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let r=W.get(z.depthTexture);if(r.__renderTarget=z,!r.__webglTexture||z.depthTexture.image.width!==z.width||z.depthTexture.image.height!==z.height)z.depthTexture.image.width=z.width,z.depthTexture.image.height=z.height,z.depthTexture.needsUpdate=!0;a(z.depthTexture,0);let t=r.__webglTexture,d=$A(z);if(z.depthTexture.format===bG)if(FA(z))K.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER,A.DEPTH_ATTACHMENT,A.TEXTURE_2D,t,0,d);else A.framebufferTexture2D(A.FRAMEBUFFER,A.DEPTH_ATTACHMENT,A.TEXTURE_2D,t,0);else if(z.depthTexture.format===DK)if(FA(z))K.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER,A.DEPTH_STENCIL_ATTACHMENT,A.TEXTURE_2D,t,0,d);else A.framebufferTexture2D(A.FRAMEBUFFER,A.DEPTH_STENCIL_ATTACHMENT,A.TEXTURE_2D,t,0);else throw Error("Unknown depthTexture format")}function aA(y){let z=W.get(y),j=y.isWebGLCubeRenderTarget===!0;if(z.__boundDepthTexture!==y.depthTexture){let r=y.depthTexture;if(z.__depthDisposeCallback)z.__depthDisposeCallback();if(r){let t=()=>{delete z.__boundDepthTexture,delete z.__depthDisposeCallback,r.removeEventListener("dispose",t)};r.addEventListener("dispose",t),z.__depthDisposeCallback=t}z.__boundDepthTexture=r}if(y.depthTexture&&!z.__autoAllocateDepthBuffer){if(j)throw Error("target.depthTexture not supported in Cube render targets");HA(z.__webglFramebuffer,y)}else if(j){z.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(M.bindFramebuffer(A.FRAMEBUFFER,z.__webglFramebuffer[r]),z.__webglDepthbuffer[r]===void 0)z.__webglDepthbuffer[r]=A.createRenderbuffer(),YA(z.__webglDepthbuffer[r],y,!1);else{let t=y.stencilBuffer?A.DEPTH_STENCIL_ATTACHMENT:A.DEPTH_ATTACHMENT,d=z.__webglDepthbuffer[r];A.bindRenderbuffer(A.RENDERBUFFER,d),A.framebufferRenderbuffer(A.FRAMEBUFFER,t,A.RENDERBUFFER,d)}}else if(M.bindFramebuffer(A.FRAMEBUFFER,z.__webglFramebuffer),z.__webglDepthbuffer===void 0)z.__webglDepthbuffer=A.createRenderbuffer(),YA(z.__webglDepthbuffer,y,!1);else{let r=y.stencilBuffer?A.DEPTH_STENCIL_ATTACHMENT:A.DEPTH_ATTACHMENT,t=z.__webglDepthbuffer;A.bindRenderbuffer(A.RENDERBUFFER,t),A.framebufferRenderbuffer(A.FRAMEBUFFER,r,A.RENDERBUFFER,t)}M.bindFramebuffer(A.FRAMEBUFFER,null)}function bA(y,z,j){let r=W.get(y);if(z!==void 0)XA(r.__webglFramebuffer,y,y.texture,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,0);if(j!==void 0)aA(y)}function cA(y){let z=y.texture,j=W.get(y),r=W.get(z);y.addEventListener("dispose",H);let t=y.textures,d=y.isWebGLCubeRenderTarget===!0,RA=t.length>1;if(!RA){if(r.__webglTexture===void 0)r.__webglTexture=A.createTexture();r.__version=z.version,U.memory.textures++}if(d){j.__webglFramebuffer=[];for(let KA=0;KA<6;KA++)if(z.mipmaps&&z.mipmaps.length>0){j.__webglFramebuffer[KA]=[];for(let DA=0;DA<z.mipmaps.length;DA++)j.__webglFramebuffer[KA][DA]=A.createFramebuffer()}else j.__webglFramebuffer[KA]=A.createFramebuffer()}else{if(z.mipmaps&&z.mipmaps.length>0){j.__webglFramebuffer=[];for(let KA=0;KA<z.mipmaps.length;KA++)j.__webglFramebuffer[KA]=A.createFramebuffer()}else j.__webglFramebuffer=A.createFramebuffer();if(RA)for(let KA=0,DA=t.length;KA<DA;KA++){let uA=W.get(t[KA]);if(uA.__webglTexture===void 0)uA.__webglTexture=A.createTexture(),U.memory.textures++}if(y.samples>0&&FA(y)===!1){j.__webglMultisampledFramebuffer=A.createFramebuffer(),j.__webglColorRenderbuffer=[],M.bindFramebuffer(A.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let KA=0;KA<t.length;KA++){let DA=t[KA];j.__webglColorRenderbuffer[KA]=A.createRenderbuffer(),A.bindRenderbuffer(A.RENDERBUFFER,j.__webglColorRenderbuffer[KA]);let uA=Y.convert(DA.format,DA.colorSpace),WA=Y.convert(DA.type),IA=O(DA.internalFormat,uA,WA,DA.colorSpace,y.isXRRenderTarget===!0),nA=$A(y);A.renderbufferStorageMultisample(A.RENDERBUFFER,nA,IA,y.width,y.height),A.framebufferRenderbuffer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+KA,A.RENDERBUFFER,j.__webglColorRenderbuffer[KA])}if(A.bindRenderbuffer(A.RENDERBUFFER,null),y.depthBuffer)j.__webglDepthRenderbuffer=A.createRenderbuffer(),YA(j.__webglDepthRenderbuffer,y,!0);M.bindFramebuffer(A.FRAMEBUFFER,null)}}if(d){M.bindTexture(A.TEXTURE_CUBE_MAP,r.__webglTexture),vA(A.TEXTURE_CUBE_MAP,z);for(let KA=0;KA<6;KA++)if(z.mipmaps&&z.mipmaps.length>0)for(let DA=0;DA<z.mipmaps.length;DA++)XA(j.__webglFramebuffer[KA][DA],y,z,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+KA,DA);else XA(j.__webglFramebuffer[KA],y,z,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+KA,0);if(D(z))Z(A.TEXTURE_CUBE_MAP);M.unbindTexture()}else if(RA){for(let KA=0,DA=t.length;KA<DA;KA++){let uA=t[KA],WA=W.get(uA);if(M.bindTexture(A.TEXTURE_2D,WA.__webglTexture),vA(A.TEXTURE_2D,uA),XA(j.__webglFramebuffer,y,uA,A.COLOR_ATTACHMENT0+KA,A.TEXTURE_2D,0),D(uA))Z(A.TEXTURE_2D)}M.unbindTexture()}else{let KA=A.TEXTURE_2D;if(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)KA=y.isWebGL3DRenderTarget?A.TEXTURE_3D:A.TEXTURE_2D_ARRAY;if(M.bindTexture(KA,r.__webglTexture),vA(KA,z),z.mipmaps&&z.mipmaps.length>0)for(let DA=0;DA<z.mipmaps.length;DA++)XA(j.__webglFramebuffer[DA],y,z,A.COLOR_ATTACHMENT0,KA,DA);else XA(j.__webglFramebuffer,y,z,A.COLOR_ATTACHMENT0,KA,0);if(D(z))Z(KA);M.unbindTexture()}if(y.depthBuffer)aA(y)}function RE(y){let z=y.textures;for(let j=0,r=z.length;j<r;j++){let t=z[j];if(D(t)){let d=N(y),RA=W.get(t).__webglTexture;M.bindTexture(d,RA),Z(d),M.unbindTexture()}}}let k=[],yE=[];function tA(y){if(y.samples>0){if(FA(y)===!1){let{textures:z,width:j,height:r}=y,t=A.COLOR_BUFFER_BIT,d=y.stencilBuffer?A.DEPTH_STENCIL_ATTACHMENT:A.DEPTH_ATTACHMENT,RA=W.get(y),KA=z.length>1;if(KA)for(let DA=0;DA<z.length;DA++)M.bindFramebuffer(A.FRAMEBUFFER,RA.__webglMultisampledFramebuffer),A.framebufferRenderbuffer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+DA,A.RENDERBUFFER,null),M.bindFramebuffer(A.FRAMEBUFFER,RA.__webglFramebuffer),A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0+DA,A.TEXTURE_2D,null,0);M.bindFramebuffer(A.READ_FRAMEBUFFER,RA.__webglMultisampledFramebuffer),M.bindFramebuffer(A.DRAW_FRAMEBUFFER,RA.__webglFramebuffer);for(let DA=0;DA<z.length;DA++){if(y.resolveDepthBuffer){if(y.depthBuffer)t|=A.DEPTH_BUFFER_BIT;if(y.stencilBuffer&&y.resolveStencilBuffer)t|=A.STENCIL_BUFFER_BIT}if(KA){A.framebufferRenderbuffer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.RENDERBUFFER,RA.__webglColorRenderbuffer[DA]);let uA=W.get(z[DA]).__webglTexture;A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,uA,0)}if(A.blitFramebuffer(0,0,j,r,0,0,j,r,t,A.NEAREST),L===!0){if(k.length=0,yE.length=0,k.push(A.COLOR_ATTACHMENT0+DA),y.depthBuffer&&y.resolveDepthBuffer===!1)k.push(d),yE.push(d),A.invalidateFramebuffer(A.DRAW_FRAMEBUFFER,yE);A.invalidateFramebuffer(A.READ_FRAMEBUFFER,k)}}if(M.bindFramebuffer(A.READ_FRAMEBUFFER,null),M.bindFramebuffer(A.DRAW_FRAMEBUFFER,null),KA)for(let DA=0;DA<z.length;DA++){M.bindFramebuffer(A.FRAMEBUFFER,RA.__webglMultisampledFramebuffer),A.framebufferRenderbuffer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+DA,A.RENDERBUFFER,RA.__webglColorRenderbuffer[DA]);let uA=W.get(z[DA]).__webglTexture;M.bindFramebuffer(A.FRAMEBUFFER,RA.__webglFramebuffer),A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0+DA,A.TEXTURE_2D,uA,0)}M.bindFramebuffer(A.DRAW_FRAMEBUFFER,RA.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&L){let z=y.stencilBuffer?A.DEPTH_STENCIL_ATTACHMENT:A.DEPTH_ATTACHMENT;A.invalidateFramebuffer(A.DRAW_FRAMEBUFFER,[z])}}}function $A(y){return Math.min(w.maxSamples,y.samples)}function FA(y){let z=W.get(y);return y.samples>0&&E.has("WEBGL_multisampled_render_to_texture")===!0&&z.__useRenderToTexture!==!1}function UE(y){let z=U.render.frame;if(l.get(y)!==z)l.set(y,z),y.update()}function MA(y,z){let{colorSpace:j,format:r,type:t}=y;if(y.isCompressedTexture===!0||y.isVideoTexture===!0)return z;if(j!==OK&&j!==jw)if(oA.getTransfer(j)===YE){if(r!==KW||t!==Uw)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",j);return z}function zA(y){if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement)G.width=y.naturalWidth||y.width,G.height=y.naturalHeight||y.height;else if(typeof VideoFrame<"u"&&y instanceof VideoFrame)G.width=y.displayWidth,G.height=y.displayHeight;else G.width=y.width,G.height=y.height;return G}this.allocateTextureUnit=b,this.resetTextureUnits=v,this.setTexture2D=a,this.setTexture2DArray=m,this.setTexture3D=_,this.setTextureCube=c,this.rebindTextures=bA,this.setupRenderTarget=cA,this.updateRenderTargetMipmap=RE,this.updateMultisampleRenderTarget=tA,this.setupDepthRenderbuffer=aA,this.setupFrameBufferTexture=XA,this.useMultisampledRTT=FA}function sV(A,E){function M(W,w=jw){let Y,U=oA.getTransfer(w);if(W===Uw)return A.UNSIGNED_BYTE;if(W===qC)return A.UNSIGNED_SHORT_4_4_4_4;if(W===zC)return A.UNSIGNED_SHORT_5_5_5_1;if(W===jO)return A.UNSIGNED_INT_5_9_9_9_REV;if(W===hO)return A.BYTE;if(W===fO)return A.SHORT;if(W===CK)return A.UNSIGNED_SHORT;if(W===JC)return A.INT;if(W===oY)return A.UNSIGNED_INT;if(W===Kw)return A.FLOAT;if(W===FK)return A.HALF_FLOAT;if(W===vO)return A.ALPHA;if(W===gO)return A.RGB;if(W===KW)return A.RGBA;if(W===pO)return A.LUMINANCE;if(W===bO)return A.LUMINANCE_ALPHA;if(W===bG)return A.DEPTH_COMPONENT;if(W===DK)return A.DEPTH_STENCIL;if(W===cO)return A.RED;if(W===QC)return A.RED_INTEGER;if(W===nO)return A.RG;if(W===XC)return A.RG_INTEGER;if(W===RC)return A.RGBA_INTEGER;if(W===cG||W===nG||W===mG||W===dG)if(U===YE)if(Y=E.get("WEBGL_compressed_texture_s3tc_srgb"),Y!==null){if(W===cG)return Y.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===nG)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===mG)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===dG)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Y=E.get("WEBGL_compressed_texture_s3tc"),Y!==null){if(W===cG)return Y.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===nG)return Y.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===mG)return Y.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===dG)return Y.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===BC||W===VC||W===HC||W===yC)if(Y=E.get("WEBGL_compressed_texture_pvrtc"),Y!==null){if(W===BC)return Y.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===VC)return Y.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===HC)return Y.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===yC)return Y.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===TC||W===SC||W===kC)if(Y=E.get("WEBGL_compressed_texture_etc"),Y!==null){if(W===TC||W===SC)return U===YE?Y.COMPRESSED_SRGB8_ETC2:Y.COMPRESSED_RGB8_ETC2;if(W===kC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Y.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(W===xC||W===PC||W===uC||W===hC||W===fC||W===jC||W===vC||W===gC||W===pC||W===bC||W===cC||W===nC||W===mC||W===dC)if(Y=E.get("WEBGL_compressed_texture_astc"),Y!==null){if(W===xC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Y.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===PC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Y.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===uC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Y.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===hC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Y.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===fC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Y.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===jC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Y.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===vC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Y.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===gC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Y.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===pC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Y.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===bC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Y.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===cC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Y.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===nC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Y.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===mC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Y.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===dC)return U===YE?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Y.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===iG||W===iC||W===sC)if(Y=E.get("EXT_texture_compression_bptc"),Y!==null){if(W===iG)return U===YE?Y.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Y.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===iC)return Y.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===sC)return Y.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===mO||W===oC||W===rC||W===aC)if(Y=E.get("EXT_texture_compression_rgtc"),Y!==null){if(W===iG)return Y.COMPRESSED_RED_RGTC1_EXT;if(W===oC)return Y.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===rC)return Y.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===aC)return Y.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===rY)return A.UNSIGNED_INT_24_8;return A[W]!==void 0?A[W]:null}return{convert:M}}var oV={type:"move"};class DZ{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new Gw,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new Gw,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new f,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new f;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new Gw,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new f,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new f;return this._grip}dispatchEvent(A){if(this._targetRay!==null)this._targetRay.dispatchEvent(A);if(this._grip!==null)this._grip.dispatchEvent(A);if(this._hand!==null)this._hand.dispatchEvent(A);return this}connect(A){if(A&&A.hand){let E=this._hand;if(E)for(let M of A.hand.values())this._getHandJoint(E,M)}return this.dispatchEvent({type:"connected",data:A}),this}disconnect(A){if(this.dispatchEvent({type:"disconnected",data:A}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(A,E,M){let W=null,w=null,Y=null,U=this._targetRay,K=this._grip,L=this._hand;if(A&&E.session.visibilityState!=="visible-blurred"){if(L&&A.hand){Y=!0;for(let J of A.hand.values()){let q=E.getJointPose(J,M),D=this._getHandJoint(L,J);if(q!==null)D.matrix.fromArray(q.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=q.radius;D.visible=q!==null}let G=L.joints["index-finger-tip"],l=L.joints["thumb-tip"],C=G.position.distanceTo(l.position),F=0.02,I=0.005;if(L.inputState.pinching&&C>F+I)L.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:A.handedness,target:this});else if(!L.inputState.pinching&&C<=F-I)L.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:A.handedness,target:this})}else if(K!==null&&A.gripSpace){if(w=E.getPose(A.gripSpace,M),w!==null){if(K.matrix.fromArray(w.transform.matrix),K.matrix.decompose(K.position,K.rotation,K.scale),K.matrixWorldNeedsUpdate=!0,w.linearVelocity)K.hasLinearVelocity=!0,K.linearVelocity.copy(w.linearVelocity);else K.hasLinearVelocity=!1;if(w.angularVelocity)K.hasAngularVelocity=!0,K.angularVelocity.copy(w.angularVelocity);else K.hasAngularVelocity=!1}}if(U!==null){if(W=E.getPose(A.targetRaySpace,M),W===null&&w!==null)W=w;if(W!==null){if(U.matrix.fromArray(W.transform.matrix),U.matrix.decompose(U.position,U.rotation,U.scale),U.matrixWorldNeedsUpdate=!0,W.linearVelocity)U.hasLinearVelocity=!0,U.linearVelocity.copy(W.linearVelocity);else U.hasLinearVelocity=!1;if(W.angularVelocity)U.hasAngularVelocity=!0,U.angularVelocity.copy(W.angularVelocity);else U.hasAngularVelocity=!1;this.dispatchEvent(oV)}}}if(U!==null)U.visible=W!==null;if(K!==null)K.visible=w!==null;if(L!==null)L.visible=Y!==null;return this}_getHandJoint(A,E){if(A.joints[E.jointName]===void 0){let M=new Gw;M.matrixAutoUpdate=!1,M.visible=!1,A.joints[E.jointName]=M,A.add(M)}return A.joints[E.jointName]}}var rV=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aV=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dN{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(A,E,M){if(this.texture===null){let W=new $E,w=A.properties.get(W);if(w.__webglTexture=E.texture,E.depthNear!=M.depthNear||E.depthFar!=M.depthFar)this.depthNear=E.depthNear,this.depthFar=E.depthFar;this.texture=W}}getMesh(A){if(this.texture!==null){if(this.mesh===null){let E=A.cameras[0].viewport,M=new RM({vertexShader:rV,fragmentShader:aV,uniforms:{depthColor:{value:this.texture},depthWidth:{value:E.z},depthHeight:{value:E.w}}});this.mesh=new LM(new QK(20,20),M)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class iN extends TW{constructor(A,E){super();let M=this,W=null,w=1,Y=null,U="local-floor",K=1,L=null,G=null,l=null,C=null,F=null,I=null,J=new dN,q=E.getContextAttributes(),D=null,Z=null,N=[],O=[],B=new xA,T=null,V=new YM;V.viewport=new NE;let H=new YM;H.viewport=new NE;let P=[V,H],Q=new qF,X=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let EA=N[i];if(EA===void 0)EA=new DZ,N[i]=EA;return EA.getTargetRaySpace()},this.getControllerGrip=function(i){let EA=N[i];if(EA===void 0)EA=new DZ,N[i]=EA;return EA.getGripSpace()},this.getHand=function(i){let EA=N[i];if(EA===void 0)EA=new DZ,N[i]=EA;return EA.getHandSpace()};function v(i){let EA=O.indexOf(i.inputSource);if(EA===-1)return;let QA=N[EA];if(QA!==void 0)QA.update(i.inputSource,i.frame,L||Y),QA.dispatchEvent({type:i.type,data:i.inputSource})}function b(){W.removeEventListener("select",v),W.removeEventListener("selectstart",v),W.removeEventListener("selectend",v),W.removeEventListener("squeeze",v),W.removeEventListener("squeezestart",v),W.removeEventListener("squeezeend",v),W.removeEventListener("end",b),W.removeEventListener("inputsourceschange",n);for(let i=0;i<N.length;i++){let EA=O[i];if(EA===null)continue;O[i]=null,N[i].disconnect(EA)}X=null,S=null,J.reset(),A.setRenderTarget(D),F=null,C=null,l=null,W=null,Z=null,vA.stop(),M.isPresenting=!1,A.setPixelRatio(T),A.setSize(B.width,B.height,!1),M.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(w=i,M.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(U=i,M.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return L||Y},this.setReferenceSpace=function(i){L=i},this.getBaseLayer=function(){return C!==null?C:F},this.getBinding=function(){return l},this.getFrame=function(){return I},this.getSession=function(){return W},this.setSession=async function(i){if(W=i,W!==null){if(D=A.getRenderTarget(),W.addEventListener("select",v),W.addEventListener("selectstart",v),W.addEventListener("selectend",v),W.addEventListener("squeeze",v),W.addEventListener("squeezestart",v),W.addEventListener("squeezeend",v),W.addEventListener("end",b),W.addEventListener("inputsourceschange",n),q.xrCompatible!==!0)await E.makeXRCompatible();if(T=A.getPixelRatio(),A.getSize(B),W.renderState.layers===void 0){let EA={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:w};F=new XRWebGLLayer(W,E,EA),W.updateRenderState({baseLayer:F}),A.setPixelRatio(1),A.setSize(F.framebufferWidth,F.framebufferHeight,!1),Z=new SW(F.framebufferWidth,F.framebufferHeight,{format:KW,type:Uw,colorSpace:A.outputColorSpace,stencilBuffer:q.stencil})}else{let EA=null,QA=null,XA=null;if(q.depth)XA=q.stencil?E.DEPTH24_STENCIL8:E.DEPTH_COMPONENT24,EA=q.stencil?DK:bG,QA=q.stencil?rY:oY;let YA={colorFormat:E.RGBA8,depthFormat:XA,scaleFactor:w};l=new XRWebGLBinding(W,E),C=l.createProjectionLayer(YA),W.updateRenderState({layers:[C]}),A.setPixelRatio(1),A.setSize(C.textureWidth,C.textureHeight,!1),Z=new SW(C.textureWidth,C.textureHeight,{format:KW,type:Uw,depthTexture:new MZ(C.textureWidth,C.textureHeight,QA,void 0,void 0,void 0,void 0,void 0,void 0,EA),stencilBuffer:q.stencil,colorSpace:A.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:C.ignoreDepthValues===!1})}Z.isXRRenderTarget=!0,this.setFoveation(K),L=null,Y=await W.requestReferenceSpace(U),vA.setContext(W),vA.start(),M.isPresenting=!0,M.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return J.getDepthTexture()};function n(i){for(let EA=0;EA<i.removed.length;EA++){let QA=i.removed[EA],XA=O.indexOf(QA);if(XA>=0)O[XA]=null,N[XA].disconnect(QA)}for(let EA=0;EA<i.added.length;EA++){let QA=i.added[EA],XA=O.indexOf(QA);if(XA===-1){for(let HA=0;HA<N.length;HA++)if(HA>=O.length){O.push(QA),XA=HA;break}else if(O[HA]===null){O[HA]=QA,XA=HA;break}if(XA===-1)break}let YA=N[XA];if(YA)YA.connect(QA)}}let a=new f,m=new f;function _(i,EA,QA){a.setFromMatrixPosition(EA.matrixWorld),m.setFromMatrixPosition(QA.matrixWorld);let XA=a.distanceTo(m),YA=EA.projectionMatrix.elements,HA=QA.projectionMatrix.elements,aA=YA[14]/(YA[10]-1),bA=YA[14]/(YA[10]+1),cA=(YA[9]+1)/YA[5],RE=(YA[9]-1)/YA[5],k=(YA[8]-1)/YA[0],yE=(HA[8]+1)/HA[0],tA=aA*k,$A=aA*yE,FA=XA/(-k+yE),UE=FA*-k;if(EA.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(UE),i.translateZ(FA),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),YA[10]===-1)i.projectionMatrix.copy(EA.projectionMatrix),i.projectionMatrixInverse.copy(EA.projectionMatrixInverse);else{let MA=aA+FA,zA=bA+FA,y=tA-UE,z=$A+(XA-UE),j=cA*bA/zA*MA,r=RE*bA/zA*MA;i.projectionMatrix.makePerspective(y,z,j,r,MA,zA),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function c(i,EA){if(EA===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(EA.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(W===null)return;let{near:EA,far:QA}=i;if(J.texture!==null){if(J.depthNear>0)EA=J.depthNear;if(J.depthFar>0)QA=J.depthFar}if(Q.near=H.near=V.near=EA,Q.far=H.far=V.far=QA,X!==Q.near||S!==Q.far)W.updateRenderState({depthNear:Q.near,depthFar:Q.far}),X=Q.near,S=Q.far;V.layers.mask=i.layers.mask|2,H.layers.mask=i.layers.mask|4,Q.layers.mask=V.layers.mask|H.layers.mask;let XA=i.parent,YA=Q.cameras;c(Q,XA);for(let HA=0;HA<YA.length;HA++)c(YA[HA],XA);if(YA.length===2)_(Q,V,H);else Q.projectionMatrix.copy(V.projectionMatrix);GA(i,Q,XA)};function GA(i,EA,QA){if(QA===null)i.matrix.copy(EA.matrixWorld);else i.matrix.copy(QA.matrixWorld),i.matrix.invert(),i.matrix.multiply(EA.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(EA.projectionMatrix),i.projectionMatrixInverse.copy(EA.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=bY*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return Q},this.getFoveation=function(){if(C===null&&F===null)return;return K},this.setFoveation=function(i){if(K=i,C!==null)C.fixedFoveation=i;if(F!==null&&F.fixedFoveation!==void 0)F.fixedFoveation=i},this.hasDepthSensing=function(){return J.texture!==null},this.getDepthSensingMesh=function(){return J.getMesh(Q)};let ZA=null;function yA(i,EA){if(G=EA.getViewerPose(L||Y),I=EA,G!==null){let QA=G.views;if(F!==null)A.setRenderTargetFramebuffer(Z,F.framebuffer),A.setRenderTarget(Z);let XA=!1;if(QA.length!==Q.cameras.length)Q.cameras.length=0,XA=!0;for(let HA=0;HA<QA.length;HA++){let aA=QA[HA],bA=null;if(F!==null)bA=F.getViewport(aA);else{let RE=l.getViewSubImage(C,aA);if(bA=RE.viewport,HA===0)A.setRenderTargetTextures(Z,RE.colorTexture,C.ignoreDepthValues?void 0:RE.depthStencilTexture),A.setRenderTarget(Z)}let cA=P[HA];if(cA===void 0)cA=new YM,cA.layers.enable(HA),cA.viewport=new NE,P[HA]=cA;if(cA.matrix.fromArray(aA.transform.matrix),cA.matrix.decompose(cA.position,cA.quaternion,cA.scale),cA.projectionMatrix.fromArray(aA.projectionMatrix),cA.projectionMatrixInverse.copy(cA.projectionMatrix).invert(),cA.viewport.set(bA.x,bA.y,bA.width,bA.height),HA===0)Q.matrix.copy(cA.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale);if(XA===!0)Q.cameras.push(cA)}let YA=W.enabledFeatures;if(YA&&YA.includes("depth-sensing")){let HA=l.getDepthInformation(QA[0]);if(HA&&HA.isValid&&HA.texture)J.init(A,HA,W.renderState)}}for(let QA=0;QA<N.length;QA++){let XA=O[QA],YA=N[QA];if(XA!==null&&YA!==void 0)YA.update(XA,EA,L||Y)}if(ZA)ZA(i,EA);if(EA.detectedPlanes)M.dispatchEvent({type:"planesdetected",data:EA});I=null}let vA=new hN;vA.setAnimationLoop(yA),this.setAnimationLoop=function(i){ZA=i},this.dispose=function(){}}}var iw=new wW,tV=new GE;function $V(A,E){function M(D,Z){if(D.matrixAutoUpdate===!0)D.updateMatrix();Z.value.copy(D.matrix)}function W(D,Z){if(Z.color.getRGB(D.fogColor.value,YF(A)),Z.isFog)D.fogNear.value=Z.near,D.fogFar.value=Z.far;else if(Z.isFogExp2)D.fogDensity.value=Z.density}function w(D,Z,N,O,B){if(Z.isMeshBasicMaterial)Y(D,Z);else if(Z.isMeshLambertMaterial)Y(D,Z);else if(Z.isMeshToonMaterial)Y(D,Z),C(D,Z);else if(Z.isMeshPhongMaterial)Y(D,Z),l(D,Z);else if(Z.isMeshStandardMaterial){if(Y(D,Z),F(D,Z),Z.isMeshPhysicalMaterial)I(D,Z,B)}else if(Z.isMeshMatcapMaterial)Y(D,Z),J(D,Z);else if(Z.isMeshDepthMaterial)Y(D,Z);else if(Z.isMeshDistanceMaterial)Y(D,Z),q(D,Z);else if(Z.isMeshNormalMaterial)Y(D,Z);else if(Z.isLineBasicMaterial){if(U(D,Z),Z.isLineDashedMaterial)K(D,Z)}else if(Z.isPointsMaterial)L(D,Z,N,O);else if(Z.isSpriteMaterial)G(D,Z);else if(Z.isShadowMaterial)D.color.value.copy(Z.color),D.opacity.value=Z.opacity;else if(Z.isShaderMaterial)Z.uniformsNeedUpdate=!1}function Y(D,Z){if(D.opacity.value=Z.opacity,Z.color)D.diffuse.value.copy(Z.color);if(Z.emissive)D.emissive.value.copy(Z.emissive).multiplyScalar(Z.emissiveIntensity);if(Z.map)D.map.value=Z.map,M(Z.map,D.mapTransform);if(Z.alphaMap)D.alphaMap.value=Z.alphaMap,M(Z.alphaMap,D.alphaMapTransform);if(Z.bumpMap){if(D.bumpMap.value=Z.bumpMap,M(Z.bumpMap,D.bumpMapTransform),D.bumpScale.value=Z.bumpScale,Z.side===UM)D.bumpScale.value*=-1}if(Z.normalMap){if(D.normalMap.value=Z.normalMap,M(Z.normalMap,D.normalMapTransform),D.normalScale.value.copy(Z.normalScale),Z.side===UM)D.normalScale.value.negate()}if(Z.displacementMap)D.displacementMap.value=Z.displacementMap,M(Z.displacementMap,D.displacementMapTransform),D.displacementScale.value=Z.displacementScale,D.displacementBias.value=Z.displacementBias;if(Z.emissiveMap)D.emissiveMap.value=Z.emissiveMap,M(Z.emissiveMap,D.emissiveMapTransform);if(Z.specularMap)D.specularMap.value=Z.specularMap,M(Z.specularMap,D.specularMapTransform);if(Z.alphaTest>0)D.alphaTest.value=Z.alphaTest;let N=E.get(Z),O=N.envMap,B=N.envMapRotation;if(O){if(D.envMap.value=O,iw.copy(B),iw.x*=-1,iw.y*=-1,iw.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1)iw.y*=-1,iw.z*=-1;D.envMapRotation.value.setFromMatrix4(tV.makeRotationFromEuler(iw)),D.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,D.reflectivity.value=Z.reflectivity,D.ior.value=Z.ior,D.refractionRatio.value=Z.refractionRatio}if(Z.lightMap)D.lightMap.value=Z.lightMap,D.lightMapIntensity.value=Z.lightMapIntensity,M(Z.lightMap,D.lightMapTransform);if(Z.aoMap)D.aoMap.value=Z.aoMap,D.aoMapIntensity.value=Z.aoMapIntensity,M(Z.aoMap,D.aoMapTransform)}function U(D,Z){if(D.diffuse.value.copy(Z.color),D.opacity.value=Z.opacity,Z.map)D.map.value=Z.map,M(Z.map,D.mapTransform)}function K(D,Z){D.dashSize.value=Z.dashSize,D.totalSize.value=Z.dashSize+Z.gapSize,D.scale.value=Z.scale}function L(D,Z,N,O){if(D.diffuse.value.copy(Z.color),D.opacity.value=Z.opacity,D.size.value=Z.size*N,D.scale.value=O*0.5,Z.map)D.map.value=Z.map,M(Z.map,D.uvTransform);if(Z.alphaMap)D.alphaMap.value=Z.alphaMap,M(Z.alphaMap,D.alphaMapTransform);if(Z.alphaTest>0)D.alphaTest.value=Z.alphaTest}function G(D,Z){if(D.diffuse.value.copy(Z.color),D.opacity.value=Z.opacity,D.rotation.value=Z.rotation,Z.map)D.map.value=Z.map,M(Z.map,D.mapTransform);if(Z.alphaMap)D.alphaMap.value=Z.alphaMap,M(Z.alphaMap,D.alphaMapTransform);if(Z.alphaTest>0)D.alphaTest.value=Z.alphaTest}function l(D,Z){D.specular.value.copy(Z.specular),D.shininess.value=Math.max(Z.shininess,0.0001)}function C(D,Z){if(Z.gradientMap)D.gradientMap.value=Z.gradientMap}function F(D,Z){if(D.metalness.value=Z.metalness,Z.metalnessMap)D.metalnessMap.value=Z.metalnessMap,M(Z.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=Z.roughness,Z.roughnessMap)D.roughnessMap.value=Z.roughnessMap,M(Z.roughnessMap,D.roughnessMapTransform);if(Z.envMap)D.envMapIntensity.value=Z.envMapIntensity}function I(D,Z,N){if(D.ior.value=Z.ior,Z.sheen>0){if(D.sheenColor.value.copy(Z.sheenColor).multiplyScalar(Z.sheen),D.sheenRoughness.value=Z.sheenRoughness,Z.sheenColorMap)D.sheenColorMap.value=Z.sheenColorMap,M(Z.sheenColorMap,D.sheenColorMapTransform);if(Z.sheenRoughnessMap)D.sheenRoughnessMap.value=Z.sheenRoughnessMap,M(Z.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(Z.clearcoat>0){if(D.clearcoat.value=Z.clearcoat,D.clearcoatRoughness.value=Z.clearcoatRoughness,Z.clearcoatMap)D.clearcoatMap.value=Z.clearcoatMap,M(Z.clearcoatMap,D.clearcoatMapTransform);if(Z.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=Z.clearcoatRoughnessMap,M(Z.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(Z.clearcoatNormalMap){if(D.clearcoatNormalMap.value=Z.clearcoatNormalMap,M(Z.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(Z.clearcoatNormalScale),Z.side===UM)D.clearcoatNormalScale.value.negate()}}if(Z.dispersion>0)D.dispersion.value=Z.dispersion;if(Z.iridescence>0){if(D.iridescence.value=Z.iridescence,D.iridescenceIOR.value=Z.iridescenceIOR,D.iridescenceThicknessMinimum.value=Z.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=Z.iridescenceThicknessRange[1],Z.iridescenceMap)D.iridescenceMap.value=Z.iridescenceMap,M(Z.iridescenceMap,D.iridescenceMapTransform);if(Z.iridescenceThicknessMap)D.iridescenceThicknessMap.value=Z.iridescenceThicknessMap,M(Z.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(Z.transmission>0){if(D.transmission.value=Z.transmission,D.transmissionSamplerMap.value=N.texture,D.transmissionSamplerSize.value.set(N.width,N.height),Z.transmissionMap)D.transmissionMap.value=Z.transmissionMap,M(Z.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=Z.thickness,Z.thicknessMap)D.thicknessMap.value=Z.thicknessMap,M(Z.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=Z.attenuationDistance,D.attenuationColor.value.copy(Z.attenuationColor)}if(Z.anisotropy>0){if(D.anisotropyVector.value.set(Z.anisotropy*Math.cos(Z.anisotropyRotation),Z.anisotropy*Math.sin(Z.anisotropyRotation)),Z.anisotropyMap)D.anisotropyMap.value=Z.anisotropyMap,M(Z.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=Z.specularIntensity,D.specularColor.value.copy(Z.specularColor),Z.specularColorMap)D.specularColorMap.value=Z.specularColorMap,M(Z.specularColorMap,D.specularColorMapTransform);if(Z.specularIntensityMap)D.specularIntensityMap.value=Z.specularIntensityMap,M(Z.specularIntensityMap,D.specularIntensityMapTransform)}function J(D,Z){if(Z.matcap)D.matcap.value=Z.matcap}function q(D,Z){let N=E.get(Z).light;D.referencePosition.value.setFromMatrixPosition(N.matrixWorld),D.nearDistance.value=N.shadow.camera.near,D.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:w}}function _V(A,E,M,W){let w={},Y={},U=[],K=A.getParameter(A.MAX_UNIFORM_BUFFER_BINDINGS);function L(N,O){let B=O.program;W.uniformBlockBinding(N,B)}function G(N,O){let B=w[N.id];if(B===void 0)J(N),B=l(N),w[N.id]=B,N.addEventListener("dispose",D);let T=O.program;W.updateUBOMapping(N,T);let V=E.render.frame;if(Y[N.id]!==V)F(N),Y[N.id]=V}function l(N){let O=C();N.__bindingPointIndex=O;let B=A.createBuffer(),T=N.__size,V=N.usage;return A.bindBuffer(A.UNIFORM_BUFFER,B),A.bufferData(A.UNIFORM_BUFFER,T,V),A.bindBuffer(A.UNIFORM_BUFFER,null),A.bindBufferBase(A.UNIFORM_BUFFER,O,B),B}function C(){for(let N=0;N<K;N++)if(U.indexOf(N)===-1)return U.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function F(N){let O=w[N.id],B=N.uniforms,T=N.__cache;A.bindBuffer(A.UNIFORM_BUFFER,O);for(let V=0,H=B.length;V<H;V++){let P=Array.isArray(B[V])?B[V]:[B[V]];for(let Q=0,X=P.length;Q<X;Q++){let S=P[Q];if(I(S,V,Q,T)===!0){let v=S.__offset,b=Array.isArray(S.value)?S.value:[S.value],n=0;for(let a=0;a<b.length;a++){let m=b[a],_=q(m);if(typeof m==="number"||typeof m==="boolean")S.__data[0]=m,A.bufferSubData(A.UNIFORM_BUFFER,v+n,S.__data);else if(m.isMatrix3)S.__data[0]=m.elements[0],S.__data[1]=m.elements[1],S.__data[2]=m.elements[2],S.__data[3]=0,S.__data[4]=m.elements[3],S.__data[5]=m.elements[4],S.__data[6]=m.elements[5],S.__data[7]=0,S.__data[8]=m.elements[6],S.__data[9]=m.elements[7],S.__data[10]=m.elements[8],S.__data[11]=0;else m.toArray(S.__data,n),n+=_.storage/Float32Array.BYTES_PER_ELEMENT}A.bufferSubData(A.UNIFORM_BUFFER,v,S.__data)}}}A.bindBuffer(A.UNIFORM_BUFFER,null)}function I(N,O,B,T){let V=N.value,H=O+"_"+B;if(T[H]===void 0){if(typeof V==="number"||typeof V==="boolean")T[H]=V;else T[H]=V.clone();return!0}else{let P=T[H];if(typeof V==="number"||typeof V==="boolean"){if(P!==V)return T[H]=V,!0}else if(P.equals(V)===!1)return P.copy(V),!0}return!1}function J(N){let O=N.uniforms,B=0,T=16;for(let H=0,P=O.length;H<P;H++){let Q=Array.isArray(O[H])?O[H]:[O[H]];for(let X=0,S=Q.length;X<S;X++){let v=Q[X],b=Array.isArray(v.value)?v.value:[v.value];for(let n=0,a=b.length;n<a;n++){let m=b[n],_=q(m),c=B%T,GA=c%_.boundary,ZA=c+GA;if(B+=GA,ZA!==0&&T-ZA<_.storage)B+=T-ZA;v.__data=new Float32Array(_.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=B,B+=_.storage}}}let V=B%T;if(V>0)B+=T-V;return N.__size=B,N.__cache={},this}function q(N){let O={boundary:0,storage:0};if(typeof N==="number"||typeof N==="boolean")O.boundary=4,O.storage=4;else if(N.isVector2)O.boundary=8,O.storage=8;else if(N.isVector3||N.isColor)O.boundary=16,O.storage=12;else if(N.isVector4)O.boundary=16,O.storage=16;else if(N.isMatrix3)O.boundary=48,O.storage=48;else if(N.isMatrix4)O.boundary=64,O.storage=64;else if(N.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N);return O}function D(N){let O=N.target;O.removeEventListener("dispose",D);let B=U.indexOf(O.__bindingPointIndex);U.splice(B,1),A.deleteBuffer(w[O.id]),delete w[O.id],delete Y[O.id]}function Z(){for(let N in w)A.deleteBuffer(w[N]);U=[],w={},Y={}}return{bind:L,update:G,dispose:Z}}class PF{constructor(A={}){let{canvas:E=EN(),context:M=null,depth:W=!0,stencil:w=!1,alpha:Y=!1,antialias:U=!1,premultipliedAlpha:K=!0,preserveDrawingBuffer:L=!1,powerPreference:G="default",failIfMajorPerformanceCaveat:l=!1,reverseDepthBuffer:C=!1}=A;this.isWebGLRenderer=!0;let F;if(M!==null){if(typeof WebGLRenderingContext<"u"&&M instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=M.getContextAttributes().alpha}else F=Y;let I=new Uint32Array(4),J=new Int32Array(4),q=null,D=null,Z=[],N=[];this.domElement=E,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=IK,this.toneMapping=yW,this.toneMappingExposure=1;let O=this,B=!1,T=0,V=0,H=null,P=-1,Q=null,X=new NE,S=new NE,v=null,b=new mA(0),n=0,a=E.width,m=E.height,_=1,c=null,GA=null,ZA=new NE(0,0,a,m),yA=new NE(0,0,a,m),vA=!1,i=new NK,EA=!1,QA=!1,XA=new GE,YA=new GE,HA=new f,aA=new NE,bA={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},cA=!1;function RE(){return H===null?_:1}let k=M;function yE(R,u){return E.getContext(R,u)}try{let R={alpha:!0,depth:W,stencil:w,antialias:U,premultipliedAlpha:K,preserveDrawingBuffer:L,powerPreference:G,failIfMajorPerformanceCaveat:l};if("setAttribute"in E)E.setAttribute("data-engine",`three.js r${_5}`);if(E.addEventListener("webglcontextlost",s,!1),E.addEventListener("webglcontextrestored",o,!1),E.addEventListener("webglcontextcreationerror",CA,!1),k===null){if(k=yE("webgl2",R),k===null)if(yE("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let tA,$A,FA,UE,MA,zA,y,z,j,r,t,d,RA,KA,DA,uA,WA,IA,nA,TA,JA,hA,gA,FE;function x(){if(tA=new IB(k),tA.init(),hA=new sV(k,tA),$A=new GB(k,tA,A,hA),FA=new dV(k,tA),$A.reverseDepthBuffer&&C)FA.buffers.depth.setReversed(!0);UE=new JB(k),MA=new xV,zA=new iV(k,tA,FA,MA,$A,hA,UE),y=new lB(O),z=new DB(O),j=new VQ(k),gA=new KB(k,j),r=new OB(k,j,UE,gA),t=new zB(k,r,j,UE),nA=new qB(k,$A,zA),uA=new ZB(MA),d=new kV(O,y,z,tA,$A,gA,uA),RA=new $V(O,MA),KA=new uV,DA=new pV(tA),IA=new UB(O,y,z,FA,t,F,K),WA=new nV(O,t,$A),FE=new _V(k,UE,$A,FA),TA=new LB(k,tA,UE),JA=new NB(k,tA,UE),UE.programs=d.programs,O.capabilities=$A,O.extensions=tA,O.properties=MA,O.renderLists=KA,O.shadowMap=WA,O.state=FA,O.info=UE}x();let AA=new iN(O,k);this.xr=AA,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let R=tA.get("WEBGL_lose_context");if(R)R.loseContext()},this.forceContextRestore=function(){let R=tA.get("WEBGL_lose_context");if(R)R.restoreContext()},this.getPixelRatio=function(){return _},this.setPixelRatio=function(R){if(R===void 0)return;_=R,this.setSize(a,m,!1)},this.getSize=function(R){return R.set(a,m)},this.setSize=function(R,u,g=!0){if(AA.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(a=R,m=u,E.width=Math.floor(R*_),E.height=Math.floor(u*_),g===!0)E.style.width=R+"px",E.style.height=u+"px";this.setViewport(0,0,R,u)},this.getDrawingBufferSize=function(R){return R.set(a*_,m*_).floor()},this.setDrawingBufferSize=function(R,u,g){a=R,m=u,_=g,E.width=Math.floor(R*g),E.height=Math.floor(u*g),this.setViewport(0,0,R,u)},this.getCurrentViewport=function(R){return R.copy(X)},this.getViewport=function(R){return R.copy(ZA)},this.setViewport=function(R,u,g,p){if(R.isVector4)ZA.set(R.x,R.y,R.z,R.w);else ZA.set(R,u,g,p);FA.viewport(X.copy(ZA).multiplyScalar(_).round())},this.getScissor=function(R){return R.copy(yA)},this.setScissor=function(R,u,g,p){if(R.isVector4)yA.set(R.x,R.y,R.z,R.w);else yA.set(R,u,g,p);FA.scissor(S.copy(yA).multiplyScalar(_).round())},this.getScissorTest=function(){return vA},this.setScissorTest=function(R){FA.setScissorTest(vA=R)},this.setOpaqueSort=function(R){c=R},this.setTransparentSort=function(R){GA=R},this.getClearColor=function(R){return R.copy(IA.getClearColor())},this.setClearColor=function(){IA.setClearColor.apply(IA,arguments)},this.getClearAlpha=function(){return IA.getClearAlpha()},this.setClearAlpha=function(){IA.setClearAlpha.apply(IA,arguments)},this.clear=function(R=!0,u=!0,g=!0){let p=0;if(R){let h=!1;if(H!==null){let e=H.texture.format;h=e===RC||e===XC||e===QC}if(h){let e=H.texture.type,LA=e===Uw||e===oY||e===CK||e===rY||e===qC||e===zC,NA=IA.getClearColor(),qA=IA.getClearAlpha(),SA=NA.r,kA=NA.g,BA=NA.b;if(LA)I[0]=SA,I[1]=kA,I[2]=BA,I[3]=qA,k.clearBufferuiv(k.COLOR,0,I);else J[0]=SA,J[1]=kA,J[2]=BA,J[3]=qA,k.clearBufferiv(k.COLOR,0,J)}else p|=k.COLOR_BUFFER_BIT}if(u)p|=k.DEPTH_BUFFER_BIT;if(g)p|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);k.clear(p)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){E.removeEventListener("webglcontextlost",s,!1),E.removeEventListener("webglcontextrestored",o,!1),E.removeEventListener("webglcontextcreationerror",CA,!1),IA.dispose(),KA.dispose(),DA.dispose(),MA.dispose(),y.dispose(),z.dispose(),t.dispose(),gA.dispose(),FE.dispose(),d.dispose(),AA.dispose(),AA.removeEventListener("sessionstart",$M),AA.removeEventListener("sessionend",pF),lw.stop()};function s(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function o(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let R=UE.autoReset,u=WA.enabled,g=WA.autoUpdate,p=WA.needsUpdate,h=WA.type;x(),UE.autoReset=R,WA.enabled=u,WA.autoUpdate=g,WA.needsUpdate=p,WA.type=h}function CA(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function lA(R){let u=R.target;u.removeEventListener("dispose",lA),fA(u)}function fA(R){JE(R),MA.remove(R)}function JE(R){let u=MA.get(R).programs;if(u!==void 0){if(u.forEach(function(g){d.releaseProgram(g)}),R.isShaderMaterial)d.releaseShaderCache(R)}}this.renderBufferDirect=function(R,u,g,p,h,e){if(u===null)u=bA;let LA=h.isMesh&&h.matrixWorld.determinant()<0,NA=w4(R,u,g,p,h);FA.setMaterial(p,LA);let qA=g.index,SA=1;if(p.wireframe===!0){if(qA=r.getWireframeAttribute(g),qA===void 0)return;SA=2}let kA=g.drawRange,BA=g.attributes.position,iA=kA.start*SA,eA=(kA.start+kA.count)*SA;if(e!==null)iA=Math.max(iA,e.start*SA),eA=Math.min(eA,(e.start+e.count)*SA);if(qA!==null)iA=Math.max(iA,0),eA=Math.min(eA,qA.count);else if(BA!==void 0&&BA!==null)iA=Math.max(iA,0),eA=Math.min(eA,BA.count);let BE=eA-iA;if(BE<0||BE===1/0)return;gA.setup(h,p,NA,g,qA);let qE,rA=TA;if(qA!==null)qE=j.get(qA),rA=JA,rA.setIndex(qE);if(h.isMesh)if(p.wireframe===!0)FA.setLineWidth(p.wireframeLinewidth*RE()),rA.setMode(k.LINES);else rA.setMode(k.TRIANGLES);else if(h.isLine){let VA=p.linewidth;if(VA===void 0)VA=1;if(FA.setLineWidth(VA*RE()),h.isLineSegments)rA.setMode(k.LINES);else if(h.isLineLoop)rA.setMode(k.LINE_LOOP);else rA.setMode(k.LINE_STRIP)}else if(h.isPoints)rA.setMode(k.POINTS);else if(h.isSprite)rA.setMode(k.TRIANGLES);if(h.isBatchedMesh)if(h._multiDrawInstances!==null)rA.renderMultiDrawInstances(h._multiDrawStarts,h._multiDrawCounts,h._multiDrawCount,h._multiDrawInstances);else if(!tA.get("WEBGL_multi_draw")){let{_multiDrawStarts:VA,_multiDrawCounts:bE,_multiDrawCount:AE}=h,jM=qA?j.get(qA).bytesPerElement:1,rw=MA.get(p).currentProgram.getUniforms();for(let OM=0;OM<AE;OM++)rw.setValue(k,"_gl_DrawID",OM),rA.render(VA[OM]/jM,bE[OM])}else rA.renderMultiDraw(h._multiDrawStarts,h._multiDrawCounts,h._multiDrawCount);else if(h.isInstancedMesh)rA.renderInstances(iA,BE,h.count);else if(g.isInstancedBufferGeometry){let VA=g._maxInstanceCount!==void 0?g._maxInstanceCount:1/0,bE=Math.min(g.instanceCount,VA);rA.renderInstances(iA,BE,bE)}else rA.render(iA,BE)};function pE(R,u,g){if(R.transparent===!0&&R.side===UW&&R.forceSinglePass===!1)R.side=UM,R.needsUpdate=!0,fK(R,u,g),R.side=nY,R.needsUpdate=!0,fK(R,u,g),R.side=UW;else fK(R,u,g)}this.compile=function(R,u,g=null){if(g===null)g=R;if(D=DA.get(g),D.init(u),N.push(D),g.traverseVisible(function(h){if(h.isLight&&h.layers.test(u.layers)){if(D.pushLight(h),h.castShadow)D.pushShadow(h)}}),R!==g)R.traverseVisible(function(h){if(h.isLight&&h.layers.test(u.layers)){if(D.pushLight(h),h.castShadow)D.pushShadow(h)}});D.setupLights();let p=new Set;return R.traverse(function(h){if(!(h.isMesh||h.isPoints||h.isLine||h.isSprite))return;let e=h.material;if(e)if(Array.isArray(e))for(let LA=0;LA<e.length;LA++){let NA=e[LA];pE(NA,g,h),p.add(NA)}else pE(e,g,h),p.add(e)}),N.pop(),D=null,p},this.compileAsync=function(R,u,g=null){let p=this.compile(R,u,g);return new Promise((h)=>{function e(){if(p.forEach(function(LA){if(MA.get(LA).currentProgram.isReady())p.delete(LA)}),p.size===0){h(R);return}setTimeout(e,10)}if(tA.get("KHR_parallel_shader_compile")!==null)e();else setTimeout(e,10)})};let _A=null;function GW(R){if(_A)_A(R)}function $M(){lw.stop()}function pF(){lw.start()}let lw=new hN;if(lw.setAnimationLoop(GW),typeof self<"u")lw.setContext(self);this.setAnimationLoop=function(R){_A=R,AA.setAnimationLoop(R),R===null?lw.stop():lw.start()},AA.addEventListener("sessionstart",$M),AA.addEventListener("sessionend",pF),this.render=function(R,u){if(u!==void 0&&u.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(R.matrixWorldAutoUpdate===!0)R.updateMatrixWorld();if(u.parent===null&&u.matrixWorldAutoUpdate===!0)u.updateMatrixWorld();if(AA.enabled===!0&&AA.isPresenting===!0){if(AA.cameraAutoUpdate===!0)AA.updateCamera(u);u=AA.getCamera()}if(R.isScene===!0)R.onBeforeRender(O,R,u,H);if(D=DA.get(R,N.length),D.init(u),N.push(D),YA.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),i.setFromProjectionMatrix(YA),QA=this.localClippingEnabled,EA=uA.init(this.clippingPlanes,QA),q=KA.get(R,Z.length),q.init(),Z.push(q),AA.enabled===!0&&AA.isPresenting===!0){let e=O.xr.getDepthSensingMesh();if(e!==null)qZ(e,u,-1/0,O.sortObjects)}if(qZ(R,u,0,O.sortObjects),q.finish(),O.sortObjects===!0)q.sort(c,GA);if(cA=AA.enabled===!1||AA.isPresenting===!1||AA.hasDepthSensing()===!1,cA)IA.addToRenderList(q,R);if(this.info.render.frame++,EA===!0)uA.beginShadows();let g=D.state.shadowsArray;if(WA.render(g,R,u),EA===!0)uA.endShadows();if(this.info.autoReset===!0)this.info.reset();let{opaque:p,transmissive:h}=q;if(D.setupLights(),u.isArrayCamera){let e=u.cameras;if(h.length>0)for(let LA=0,NA=e.length;LA<NA;LA++){let qA=e[LA];cF(p,h,R,qA)}if(cA)IA.render(R);for(let LA=0,NA=e.length;LA<NA;LA++){let qA=e[LA];bF(q,R,qA,qA.viewport)}}else{if(h.length>0)cF(p,h,R,u);if(cA)IA.render(R);bF(q,R,u)}if(H!==null)zA.updateMultisampleRenderTarget(H),zA.updateRenderTargetMipmap(H);if(R.isScene===!0)R.onAfterRender(O,R,u);if(gA.resetDefaultState(),P=-1,Q=null,N.pop(),N.length>0){if(D=N[N.length-1],EA===!0)uA.setGlobalState(O.clippingPlanes,D.state.camera)}else D=null;if(Z.pop(),Z.length>0)q=Z[Z.length-1];else q=null};function qZ(R,u,g,p){if(R.visible===!1)return;if(R.layers.test(u.layers)){if(R.isGroup)g=R.renderOrder;else if(R.isLOD){if(R.autoUpdate===!0)R.update(u)}else if(R.isLight){if(D.pushLight(R),R.castShadow)D.pushShadow(R)}else if(R.isSprite){if(!R.frustumCulled||i.intersectsSprite(R)){if(p)aA.setFromMatrixPosition(R.matrixWorld).applyMatrix4(YA);let LA=t.update(R),NA=R.material;if(NA.visible)q.push(R,LA,NA,g,aA.z,null)}}else if(R.isMesh||R.isLine||R.isPoints){if(!R.frustumCulled||i.intersectsObject(R)){let LA=t.update(R),NA=R.material;if(p){if(R.boundingSphere!==void 0){if(R.boundingSphere===null)R.computeBoundingSphere();aA.copy(R.boundingSphere.center)}else{if(LA.boundingSphere===null)LA.computeBoundingSphere();aA.copy(LA.boundingSphere.center)}aA.applyMatrix4(R.matrixWorld).applyMatrix4(YA)}if(Array.isArray(NA)){let qA=LA.groups;for(let SA=0,kA=qA.length;SA<kA;SA++){let BA=qA[SA],iA=NA[BA.materialIndex];if(iA&&iA.visible)q.push(R,LA,iA,g,aA.z,BA)}}else if(NA.visible)q.push(R,LA,NA,g,aA.z,null)}}}let e=R.children;for(let LA=0,NA=e.length;LA<NA;LA++)qZ(e[LA],u,g,p)}function bF(R,u,g,p){let{opaque:h,transmissive:e,transparent:LA}=R;if(D.setupLightsView(g),EA===!0)uA.setGlobalState(O.clippingPlanes,g);if(p)FA.viewport(X.copy(p));if(h.length>0)hK(h,u,g);if(e.length>0)hK(e,u,g);if(LA.length>0)hK(LA,u,g);FA.buffers.depth.setTest(!0),FA.buffers.depth.setMask(!0),FA.buffers.color.setMask(!0),FA.setPolygonOffset(!1)}function cF(R,u,g,p){if((g.isScene===!0?g.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[p.id]===void 0)D.state.transmissionRenderTarget[p.id]=new SW(1,1,{generateMipmaps:!0,type:tA.has("EXT_color_buffer_half_float")||tA.has("EXT_color_buffer_float")?FK:Uw,minFilter:sY,samples:4,stencilBuffer:w,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oA.workingColorSpace});let e=D.state.transmissionRenderTarget[p.id],LA=p.viewport||X;e.setSize(LA.z,LA.w);let NA=O.getRenderTarget();if(O.setRenderTarget(e),O.getClearColor(b),n=O.getClearAlpha(),n<1)O.setClearColor(16777215,0.5);if(O.clear(),cA)IA.render(g);let qA=O.toneMapping;O.toneMapping=yW;let SA=p.viewport;if(p.viewport!==void 0)p.viewport=void 0;if(D.setupLightsView(p),EA===!0)uA.setGlobalState(O.clippingPlanes,p);if(hK(R,g,p),zA.updateMultisampleRenderTarget(e),zA.updateRenderTargetMipmap(e),tA.has("WEBGL_multisampled_render_to_texture")===!1){let kA=!1;for(let BA=0,iA=u.length;BA<iA;BA++){let eA=u[BA],BE=eA.object,qE=eA.geometry,rA=eA.material,VA=eA.group;if(rA.side===UW&&BE.layers.test(p.layers)){let bE=rA.side;rA.side=UM,rA.needsUpdate=!0,nF(BE,g,p,qE,rA,VA),rA.side=bE,rA.needsUpdate=!0,kA=!0}}if(kA===!0)zA.updateMultisampleRenderTarget(e),zA.updateRenderTargetMipmap(e)}if(O.setRenderTarget(NA),O.setClearColor(b,n),SA!==void 0)p.viewport=SA;O.toneMapping=qA}function hK(R,u,g){let p=u.isScene===!0?u.overrideMaterial:null;for(let h=0,e=R.length;h<e;h++){let LA=R[h],NA=LA.object,qA=LA.geometry,SA=p===null?LA.material:p,kA=LA.group;if(NA.layers.test(g.layers))nF(NA,u,g,qA,SA,kA)}}function nF(R,u,g,p,h,e){if(R.onBeforeRender(O,u,g,p,h,e),R.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),h.onBeforeRender(O,u,g,p,R,e),h.transparent===!0&&h.side===UW&&h.forceSinglePass===!1)h.side=UM,h.needsUpdate=!0,O.renderBufferDirect(g,u,p,h,R,e),h.side=nY,h.needsUpdate=!0,O.renderBufferDirect(g,u,p,h,R,e),h.side=UW;else O.renderBufferDirect(g,u,p,h,R,e);R.onAfterRender(O,u,g,p,h,e)}function fK(R,u,g){if(u.isScene!==!0)u=bA;let p=MA.get(R),h=D.state.lights,e=D.state.shadowsArray,LA=h.state.version,NA=d.getParameters(R,h.state,e,u,g),qA=d.getProgramCacheKey(NA),SA=p.programs;if(p.environment=R.isMeshStandardMaterial?u.environment:null,p.fog=u.fog,p.envMap=(R.isMeshStandardMaterial?z:y).get(R.envMap||p.environment),p.envMapRotation=p.environment!==null&&R.envMap===null?u.environmentRotation:R.envMapRotation,SA===void 0)R.addEventListener("dispose",lA),SA=new Map,p.programs=SA;let kA=SA.get(qA);if(kA!==void 0){if(p.currentProgram===kA&&p.lightsStateVersion===LA)return dF(R,NA),kA}else NA.uniforms=d.getUniforms(R),R.onBeforeCompile(NA,O),kA=d.acquireProgram(NA,qA),SA.set(qA,kA),p.uniforms=NA.uniforms;let BA=p.uniforms;if(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)BA.clippingPlanes=uA.uniform;if(dF(R,NA),p.needsLights=U4(R),p.lightsStateVersion=LA,p.needsLights)BA.ambientLightColor.value=h.state.ambient,BA.lightProbe.value=h.state.probe,BA.directionalLights.value=h.state.directional,BA.directionalLightShadows.value=h.state.directionalShadow,BA.spotLights.value=h.state.spot,BA.spotLightShadows.value=h.state.spotShadow,BA.rectAreaLights.value=h.state.rectArea,BA.ltc_1.value=h.state.rectAreaLTC1,BA.ltc_2.value=h.state.rectAreaLTC2,BA.pointLights.value=h.state.point,BA.pointLightShadows.value=h.state.pointShadow,BA.hemisphereLights.value=h.state.hemi,BA.directionalShadowMap.value=h.state.directionalShadowMap,BA.directionalShadowMatrix.value=h.state.directionalShadowMatrix,BA.spotShadowMap.value=h.state.spotShadowMap,BA.spotLightMatrix.value=h.state.spotLightMatrix,BA.spotLightMap.value=h.state.spotLightMap,BA.pointShadowMap.value=h.state.pointShadowMap,BA.pointShadowMatrix.value=h.state.pointShadowMatrix;return p.currentProgram=kA,p.uniformsList=null,kA}function mF(R){if(R.uniformsList===null){let u=R.currentProgram.getUniforms();R.uniformsList=VK.seqWithValue(u.seq,R.uniforms)}return R.uniformsList}function dF(R,u){let g=MA.get(R);g.outputColorSpace=u.outputColorSpace,g.batching=u.batching,g.batchingColor=u.batchingColor,g.instancing=u.instancing,g.instancingColor=u.instancingColor,g.instancingMorph=u.instancingMorph,g.skinning=u.skinning,g.morphTargets=u.morphTargets,g.morphNormals=u.morphNormals,g.morphColors=u.morphColors,g.morphTargetsCount=u.morphTargetsCount,g.numClippingPlanes=u.numClippingPlanes,g.numIntersection=u.numClipIntersection,g.vertexAlphas=u.vertexAlphas,g.vertexTangents=u.vertexTangents,g.toneMapping=u.toneMapping}function w4(R,u,g,p,h){if(u.isScene!==!0)u=bA;zA.resetTextureUnits();let e=u.fog,LA=p.isMeshStandardMaterial?u.environment:null,NA=H===null?O.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:OK,qA=(p.isMeshStandardMaterial?z:y).get(p.envMap||LA),SA=p.vertexColors===!0&&!!g.attributes.color&&g.attributes.color.itemSize===4,kA=!!g.attributes.tangent&&(!!p.normalMap||p.anisotropy>0),BA=!!g.morphAttributes.position,iA=!!g.morphAttributes.normal,eA=!!g.morphAttributes.color,BE=yW;if(p.toneMapped){if(H===null||H.isXRRenderTarget===!0)BE=O.toneMapping}let qE=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,rA=qE!==void 0?qE.length:0,VA=MA.get(p),bE=D.state.lights;if(EA===!0){if(QA===!0||R!==Q){let eE=R===Q&&p.id===P;uA.setState(p,R,eE)}}let AE=!1;if(p.version===VA.__version){if(VA.needsLights&&VA.lightsStateVersion!==bE.state.version)AE=!0;else if(VA.outputColorSpace!==NA)AE=!0;else if(h.isBatchedMesh&&VA.batching===!1)AE=!0;else if(!h.isBatchedMesh&&VA.batching===!0)AE=!0;else if(h.isBatchedMesh&&VA.batchingColor===!0&&h.colorTexture===null)AE=!0;else if(h.isBatchedMesh&&VA.batchingColor===!1&&h.colorTexture!==null)AE=!0;else if(h.isInstancedMesh&&VA.instancing===!1)AE=!0;else if(!h.isInstancedMesh&&VA.instancing===!0)AE=!0;else if(h.isSkinnedMesh&&VA.skinning===!1)AE=!0;else if(!h.isSkinnedMesh&&VA.skinning===!0)AE=!0;else if(h.isInstancedMesh&&VA.instancingColor===!0&&h.instanceColor===null)AE=!0;else if(h.isInstancedMesh&&VA.instancingColor===!1&&h.instanceColor!==null)AE=!0;else if(h.isInstancedMesh&&VA.instancingMorph===!0&&h.morphTexture===null)AE=!0;else if(h.isInstancedMesh&&VA.instancingMorph===!1&&h.morphTexture!==null)AE=!0;else if(VA.envMap!==qA)AE=!0;else if(p.fog===!0&&VA.fog!==e)AE=!0;else if(VA.numClippingPlanes!==void 0&&(VA.numClippingPlanes!==uA.numPlanes||VA.numIntersection!==uA.numIntersection))AE=!0;else if(VA.vertexAlphas!==SA)AE=!0;else if(VA.vertexTangents!==kA)AE=!0;else if(VA.morphTargets!==BA)AE=!0;else if(VA.morphNormals!==iA)AE=!0;else if(VA.morphColors!==eA)AE=!0;else if(VA.toneMapping!==BE)AE=!0;else if(VA.morphTargetsCount!==rA)AE=!0}else AE=!0,VA.__version=p.version;let jM=VA.currentProgram;if(AE===!0)jM=fK(p,u,h);let rw=!1,OM=!1,wU=!1,ZE=jM.getUniforms(),BM=VA.uniforms;if(FA.useProgram(jM.program))rw=!0,OM=!0,wU=!0;if(p.id!==P)P=p.id,OM=!0;if(rw||Q!==R){if(FA.buffers.depth.getReversed())XA.copy(R.projectionMatrix),WN(XA),wN(XA),ZE.setValue(k,"projectionMatrix",XA);else ZE.setValue(k,"projectionMatrix",R.projectionMatrix);ZE.setValue(k,"viewMatrix",R.matrixWorldInverse);let GM=ZE.map.cameraPosition;if(GM!==void 0)GM.setValue(k,HA.setFromMatrixPosition(R.matrixWorld));if($A.logarithmicDepthBuffer)ZE.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2));if(p.isMeshPhongMaterial||p.isMeshToonMaterial||p.isMeshLambertMaterial||p.isMeshBasicMaterial||p.isMeshStandardMaterial||p.isShaderMaterial)ZE.setValue(k,"isOrthographic",R.isOrthographicCamera===!0);if(Q!==R)Q=R,OM=!0,wU=!0}if(h.isSkinnedMesh){ZE.setOptional(k,h,"bindMatrix"),ZE.setOptional(k,h,"bindMatrixInverse");let eE=h.skeleton;if(eE){if(eE.boneTexture===null)eE.computeBoneTexture();ZE.setValue(k,"boneTexture",eE.boneTexture,zA)}}if(h.isBatchedMesh){if(ZE.setOptional(k,h,"batchingTexture"),ZE.setValue(k,"batchingTexture",h._matricesTexture,zA),ZE.setOptional(k,h,"batchingIdTexture"),ZE.setValue(k,"batchingIdTexture",h._indirectTexture,zA),ZE.setOptional(k,h,"batchingColorTexture"),h._colorsTexture!==null)ZE.setValue(k,"batchingColorTexture",h._colorsTexture,zA)}let VM=g.morphAttributes;if(VM.position!==void 0||VM.normal!==void 0||VM.color!==void 0)nA.update(h,g,jM);if(OM||VA.receiveShadow!==h.receiveShadow)VA.receiveShadow=h.receiveShadow,ZE.setValue(k,"receiveShadow",h.receiveShadow);if(p.isMeshGouraudMaterial&&p.envMap!==null)BM.envMap.value=qA,BM.flipEnvMap.value=qA.isCubeTexture&&qA.isRenderTargetTexture===!1?-1:1;if(p.isMeshStandardMaterial&&p.envMap===null&&u.environment!==null)BM.envMapIntensity.value=u.environmentIntensity;if(OM){if(ZE.setValue(k,"toneMappingExposure",O.toneMappingExposure),VA.needsLights)Y4(BM,wU);if(e&&p.fog===!0)RA.refreshFogUniforms(BM,e);RA.refreshMaterialUniforms(BM,p,_,m,D.state.transmissionRenderTarget[R.id]),VK.upload(k,mF(VA),BM,zA)}if(p.isShaderMaterial&&p.uniformsNeedUpdate===!0)VK.upload(k,mF(VA),BM,zA),p.uniformsNeedUpdate=!1;if(p.isSpriteMaterial)ZE.setValue(k,"center",h.center);if(ZE.setValue(k,"modelViewMatrix",h.modelViewMatrix),ZE.setValue(k,"normalMatrix",h.normalMatrix),ZE.setValue(k,"modelMatrix",h.matrixWorld),p.isShaderMaterial||p.isRawShaderMaterial){let eE=p.uniformsGroups;for(let GM=0,zZ=eE.length;GM<zZ;GM++){let Cw=eE[GM];FE.update(Cw,jM),FE.bind(Cw,jM)}}return jM}function Y4(R,u){R.ambientLightColor.needsUpdate=u,R.lightProbe.needsUpdate=u,R.directionalLights.needsUpdate=u,R.directionalLightShadows.needsUpdate=u,R.pointLights.needsUpdate=u,R.pointLightShadows.needsUpdate=u,R.spotLights.needsUpdate=u,R.spotLightShadows.needsUpdate=u,R.rectAreaLights.needsUpdate=u,R.hemisphereLights.needsUpdate=u}function U4(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(R,u,g){MA.get(R.texture).__webglTexture=u,MA.get(R.depthTexture).__webglTexture=g;let p=MA.get(R);if(p.__hasExternalTextures=!0,p.__autoAllocateDepthBuffer=g===void 0,!p.__autoAllocateDepthBuffer){if(tA.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),p.__useRenderToTexture=!1}},this.setRenderTargetFramebuffer=function(R,u){let g=MA.get(R);g.__webglFramebuffer=u,g.__useDefaultFramebuffer=u===void 0},this.setRenderTarget=function(R,u=0,g=0){H=R,T=u,V=g;let p=!0,h=null,e=!1,LA=!1;if(R){let qA=MA.get(R);if(qA.__useDefaultFramebuffer!==void 0)FA.bindFramebuffer(k.FRAMEBUFFER,null),p=!1;else if(qA.__webglFramebuffer===void 0)zA.setupRenderTarget(R);else if(qA.__hasExternalTextures)zA.rebindTextures(R,MA.get(R.texture).__webglTexture,MA.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let BA=R.depthTexture;if(qA.__boundDepthTexture!==BA){if(BA!==null&&MA.has(BA)&&(R.width!==BA.image.width||R.height!==BA.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");zA.setupDepthRenderbuffer(R)}}let SA=R.texture;if(SA.isData3DTexture||SA.isDataArrayTexture||SA.isCompressedArrayTexture)LA=!0;let kA=MA.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget){if(Array.isArray(kA[u]))h=kA[u][g];else h=kA[u];e=!0}else if(R.samples>0&&zA.useMultisampledRTT(R)===!1)h=MA.get(R).__webglMultisampledFramebuffer;else if(Array.isArray(kA))h=kA[g];else h=kA;X.copy(R.viewport),S.copy(R.scissor),v=R.scissorTest}else X.copy(ZA).multiplyScalar(_).floor(),S.copy(yA).multiplyScalar(_).floor(),v=vA;if(FA.bindFramebuffer(k.FRAMEBUFFER,h)&&p)FA.drawBuffers(R,h);if(FA.viewport(X),FA.scissor(S),FA.setScissorTest(v),e){let qA=MA.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+u,qA.__webglTexture,g)}else if(LA){let qA=MA.get(R.texture),SA=u||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,qA.__webglTexture,g||0,SA)}P=-1},this.readRenderTargetPixels=function(R,u,g,p,h,e,LA){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let NA=MA.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&LA!==void 0)NA=NA[LA];if(NA){FA.bindFramebuffer(k.FRAMEBUFFER,NA);try{let qA=R.texture,SA=qA.format,kA=qA.type;if(!$A.textureFormatReadable(SA)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$A.textureTypeReadable(kA)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(u>=0&&u<=R.width-p&&(g>=0&&g<=R.height-h))k.readPixels(u,g,p,h,hA.convert(SA),hA.convert(kA),e)}finally{let qA=H!==null?MA.get(H).__webglFramebuffer:null;FA.bindFramebuffer(k.FRAMEBUFFER,qA)}}},this.readRenderTargetPixelsAsync=async function(R,u,g,p,h,e,LA){if(!(R&&R.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let NA=MA.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&LA!==void 0)NA=NA[LA];if(NA){let qA=R.texture,SA=qA.format,kA=qA.type;if(!$A.textureFormatReadable(SA))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$A.textureTypeReadable(kA))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(u>=0&&u<=R.width-p&&(g>=0&&g<=R.height-h)){FA.bindFramebuffer(k.FRAMEBUFFER,NA);let BA=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,BA),k.bufferData(k.PIXEL_PACK_BUFFER,e.byteLength,k.STREAM_READ),k.readPixels(u,g,p,h,hA.convert(SA),hA.convert(kA),0);let iA=H!==null?MA.get(H).__webglFramebuffer:null;FA.bindFramebuffer(k.FRAMEBUFFER,iA);let eA=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await MN(k,eA,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,BA),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,e),k.deleteBuffer(BA),k.deleteSync(eA),e}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,u=null,g=0){if(R.isTexture!==!0)vw("WebGLRenderer: copyFramebufferToTexture function signature has changed."),u=arguments[0]||null,R=arguments[1];let p=Math.pow(2,-g),h=Math.floor(R.image.width*p),e=Math.floor(R.image.height*p),LA=u!==null?u.x:0,NA=u!==null?u.y:0;zA.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,g,0,0,LA,NA,h,e),FA.unbindTexture()};let K4=k.createFramebuffer(),L4=k.createFramebuffer();if(this.copyTextureToTexture=function(R,u,g=null,p=null,h=0,e=null){if(R.isTexture!==!0)vw("WebGLRenderer: copyTextureToTexture function signature has changed."),p=arguments[0]||null,R=arguments[1],u=arguments[2],e=arguments[3]||0,g=null;if(e===null)if(h!==0)vw("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),e=h,h=0;else e=0;let LA,NA,qA,SA,kA,BA,iA,eA,BE,qE=R.isCompressedTexture?R.mipmaps[e]:R.image;if(g!==null)LA=g.max.x-g.min.x,NA=g.max.y-g.min.y,qA=g.isBox3?g.max.z-g.min.z:1,SA=g.min.x,kA=g.min.y,BA=g.isBox3?g.min.z:0;else{let VM=Math.pow(2,-h);if(LA=Math.floor(qE.width*VM),NA=Math.floor(qE.height*VM),R.isDataArrayTexture)qA=qE.depth;else if(R.isData3DTexture)qA=Math.floor(qE.depth*VM);else qA=1;SA=0,kA=0,BA=0}if(p!==null)iA=p.x,eA=p.y,BE=p.z;else iA=0,eA=0,BE=0;let rA=hA.convert(u.format),VA=hA.convert(u.type),bE;if(u.isData3DTexture)zA.setTexture3D(u,0),bE=k.TEXTURE_3D;else if(u.isDataArrayTexture||u.isCompressedArrayTexture)zA.setTexture2DArray(u,0),bE=k.TEXTURE_2D_ARRAY;else zA.setTexture2D(u,0),bE=k.TEXTURE_2D;k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,u.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,u.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,u.unpackAlignment);let AE=k.getParameter(k.UNPACK_ROW_LENGTH),jM=k.getParameter(k.UNPACK_IMAGE_HEIGHT),rw=k.getParameter(k.UNPACK_SKIP_PIXELS),OM=k.getParameter(k.UNPACK_SKIP_ROWS),wU=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,qE.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,qE.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,SA),k.pixelStorei(k.UNPACK_SKIP_ROWS,kA),k.pixelStorei(k.UNPACK_SKIP_IMAGES,BA);let ZE=R.isDataArrayTexture||R.isData3DTexture,BM=u.isDataArrayTexture||u.isData3DTexture;if(R.isDepthTexture){let VM=MA.get(R),eE=MA.get(u),GM=MA.get(VM.__renderTarget),zZ=MA.get(eE.__renderTarget);FA.bindFramebuffer(k.READ_FRAMEBUFFER,GM.__webglFramebuffer),FA.bindFramebuffer(k.DRAW_FRAMEBUFFER,zZ.__webglFramebuffer);for(let Cw=0;Cw<qA;Cw++){if(ZE)k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,MA.get(R).__webglTexture,h,BA+Cw),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,MA.get(u).__webglTexture,e,BE+Cw);k.blitFramebuffer(SA,kA,LA,NA,iA,eA,LA,NA,k.DEPTH_BUFFER_BIT,k.NEAREST)}FA.bindFramebuffer(k.READ_FRAMEBUFFER,null),FA.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(h!==0||R.isRenderTargetTexture||MA.has(R)){let VM=MA.get(R),eE=MA.get(u);FA.bindFramebuffer(k.READ_FRAMEBUFFER,K4),FA.bindFramebuffer(k.DRAW_FRAMEBUFFER,L4);for(let GM=0;GM<qA;GM++){if(ZE)k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,VM.__webglTexture,h,BA+GM);else k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,VM.__webglTexture,h);if(BM)k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,eE.__webglTexture,e,BE+GM);else k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,eE.__webglTexture,e);if(h!==0)k.blitFramebuffer(SA,kA,LA,NA,iA,eA,LA,NA,k.COLOR_BUFFER_BIT,k.NEAREST);else if(BM)k.copyTexSubImage3D(bE,e,iA,eA,BE+GM,SA,kA,LA,NA);else k.copyTexSubImage2D(bE,e,iA,eA,SA,kA,LA,NA)}FA.bindFramebuffer(k.READ_FRAMEBUFFER,null),FA.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(BM)if(R.isDataTexture||R.isData3DTexture)k.texSubImage3D(bE,e,iA,eA,BE,LA,NA,qA,rA,VA,qE.data);else if(u.isCompressedArrayTexture)k.compressedTexSubImage3D(bE,e,iA,eA,BE,LA,NA,qA,rA,qE.data);else k.texSubImage3D(bE,e,iA,eA,BE,LA,NA,qA,rA,VA,qE);else if(R.isDataTexture)k.texSubImage2D(k.TEXTURE_2D,e,iA,eA,LA,NA,rA,VA,qE.data);else if(R.isCompressedTexture)k.compressedTexSubImage2D(k.TEXTURE_2D,e,iA,eA,qE.width,qE.height,rA,qE.data);else k.texSubImage2D(k.TEXTURE_2D,e,iA,eA,LA,NA,rA,VA,qE);if(k.pixelStorei(k.UNPACK_ROW_LENGTH,AE),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,jM),k.pixelStorei(k.UNPACK_SKIP_PIXELS,rw),k.pixelStorei(k.UNPACK_SKIP_ROWS,OM),k.pixelStorei(k.UNPACK_SKIP_IMAGES,wU),e===0&&u.generateMipmaps)k.generateMipmap(bE);FA.unbindTexture()},this.copyTextureToTexture3D=function(R,u,g=null,p=null,h=0){if(R.isTexture!==!0)vw("WebGLRenderer: copyTextureToTexture3D function signature has changed."),g=arguments[0]||null,p=arguments[1]||null,R=arguments[2],u=arguments[3],h=arguments[4]||0;return vw('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,u,g,p,h)},this.initRenderTarget=function(R){if(MA.get(R).__webglFramebuffer===void 0)zA.setupRenderTarget(R)},this.initTexture=function(R){if(R.isCubeTexture)zA.setTextureCube(R,0);else if(R.isData3DTexture)zA.setTexture3D(R,0);else if(R.isDataArrayTexture||R.isCompressedArrayTexture)zA.setTexture2DArray(R,0);else zA.setTexture2D(R,0);FA.unbindTexture()},this.resetState=function(){T=0,V=0,H=null,FA.reset(),gA.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return AN}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(A){this._outputColorSpace=A;let E=this.getContext();E.drawingBufferColorspace=oA._getDrawingBufferColorSpace(A),E.unpackColorSpace=oA._getUnpackColorSpace()}}var sN={type:"change"},hF={type:"start"},rN={type:"end"},OZ=new bw,oN=new rM,A0=Math.cos(70*AF.DEG2RAD),hE=new f,IM=2*Math.PI,WE={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uF=0.000001;class fF extends ZZ{constructor(A,E=null){super(A,E);if(this.state=WE.NONE,this.enabled=!0,this.target=new f,this.cursor=new f,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ww.ROTATE,MIDDLE:Ww.DOLLY,RIGHT:Ww.PAN},this.touches={ONE:ww.ROTATE,TWO:ww.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new f,this._lastQuaternion=new aM,this._lastTargetPosition=new f,this._quat=new aM().setFromUnitVectors(A.up,new f(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new RK,this._sphericalDelta=new RK,this._scale=1,this._panOffset=new f,this._rotateStart=new xA,this._rotateEnd=new xA,this._rotateDelta=new xA,this._panStart=new xA,this._panEnd=new xA,this._panDelta=new xA,this._dollyStart=new xA,this._dollyEnd=new xA,this._dollyDelta=new xA,this._dollyDirection=new f,this._mouse=new xA,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=M0.bind(this),this._onPointerDown=E0.bind(this),this._onPointerUp=W0.bind(this),this._onContextMenu=Z0.bind(this),this._onMouseWheel=U0.bind(this),this._onKeyDown=K0.bind(this),this._onTouchStart=L0.bind(this),this._onTouchMove=G0.bind(this),this._onMouseDown=w0.bind(this),this._onMouseMove=Y0.bind(this),this._interceptControlDown=l0.bind(this),this._interceptControlUp=C0.bind(this),this.domElement!==null)this.connect();this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(A){A.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=A}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sN),this.update(),this.state=WE.NONE}update(A=null){let E=this.object.position;if(hE.copy(E).sub(this.target),hE.applyQuaternion(this._quat),this._spherical.setFromVector3(hE),this.autoRotate&&this.state===WE.NONE)this._rotateLeft(this._getAutoRotationAngle(A));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let M=this.minAzimuthAngle,W=this.maxAzimuthAngle;if(isFinite(M)&&isFinite(W)){if(M<-Math.PI)M+=IM;else if(M>Math.PI)M-=IM;if(W<-Math.PI)W+=IM;else if(W>Math.PI)W-=IM;if(M<=W)this._spherical.theta=Math.max(M,Math.min(W,this._spherical.theta));else this._spherical.theta=this._spherical.theta>(M+W)/2?Math.max(M,this._spherical.theta):Math.min(W,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let w=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let Y=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),w=Y!=this._spherical.radius}if(hE.setFromSpherical(this._spherical),hE.applyQuaternion(this._quatInverse),E.copy(this.target).add(hE),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let Y=null;if(this.object.isPerspectiveCamera){let U=hE.length();Y=this._clampDistance(U*this._scale);let K=U-Y;this.object.position.addScaledVector(this._dollyDirection,K),this.object.updateMatrixWorld(),w=!!K}else if(this.object.isOrthographicCamera){let U=new f(this._mouse.x,this._mouse.y,0);U.unproject(this.object);let K=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),w=K!==this.object.zoom;let L=new f(this._mouse.x,this._mouse.y,0);L.unproject(this.object),this.object.position.sub(L).add(U),this.object.updateMatrixWorld(),Y=hE.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(Y!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(Y).add(this.object.position);else if(OZ.origin.copy(this.object.position),OZ.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(OZ.direction))<A0)this.object.lookAt(this.target);else oN.setFromNormalAndCoplanarPoint(this.object.up,this.target),OZ.intersectPlane(oN,this.target)}else if(this.object.isOrthographicCamera){let Y=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),Y!==this.object.zoom)this.object.updateProjectionMatrix(),w=!0}if(this._scale=1,this._performCursorZoom=!1,w||this._lastPosition.distanceToSquared(this.object.position)>uF||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uF||this._lastTargetPosition.distanceToSquared(this.target)>uF)return this.dispatchEvent(sN),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(A){if(A!==null)return IM/60*this.autoRotateSpeed*A;else return IM/60/60*this.autoRotateSpeed}_getZoomScale(A){let E=Math.abs(A*0.01);return Math.pow(0.95,this.zoomSpeed*E)}_rotateLeft(A){this._sphericalDelta.theta-=A}_rotateUp(A){this._sphericalDelta.phi-=A}_panLeft(A,E){hE.setFromMatrixColumn(E,0),hE.multiplyScalar(-A),this._panOffset.add(hE)}_panUp(A,E){if(this.screenSpacePanning===!0)hE.setFromMatrixColumn(E,1);else hE.setFromMatrixColumn(E,0),hE.crossVectors(this.object.up,hE);hE.multiplyScalar(A),this._panOffset.add(hE)}_pan(A,E){let M=this.domElement;if(this.object.isPerspectiveCamera){let W=this.object.position;hE.copy(W).sub(this.target);let w=hE.length();w*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*A*w/M.clientHeight,this.object.matrix),this._panUp(2*E*w/M.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(A*(this.object.right-this.object.left)/this.object.zoom/M.clientWidth,this.object.matrix),this._panUp(E*(this.object.top-this.object.bottom)/this.object.zoom/M.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(A){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=A;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(A){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=A;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(A,E){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let M=this.domElement.getBoundingClientRect(),W=A-M.left,w=E-M.top,Y=M.width,U=M.height;this._mouse.x=W/Y*2-1,this._mouse.y=-(w/U)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(A){return Math.max(this.minDistance,Math.min(this.maxDistance,A))}_handleMouseDownRotate(A){this._rotateStart.set(A.clientX,A.clientY)}_handleMouseDownDolly(A){this._updateZoomParameters(A.clientX,A.clientX),this._dollyStart.set(A.clientX,A.clientY)}_handleMouseDownPan(A){this._panStart.set(A.clientX,A.clientY)}_handleMouseMoveRotate(A){this._rotateEnd.set(A.clientX,A.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let E=this.domElement;this._rotateLeft(IM*this._rotateDelta.x/E.clientHeight),this._rotateUp(IM*this._rotateDelta.y/E.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(A){if(this._dollyEnd.set(A.clientX,A.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(A){this._panEnd.set(A.clientX,A.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(A){if(this._updateZoomParameters(A.clientX,A.clientY),A.deltaY<0)this._dollyIn(this._getZoomScale(A.deltaY));else if(A.deltaY>0)this._dollyOut(this._getZoomScale(A.deltaY));this.update()}_handleKeyDown(A){let E=!1;switch(A.code){case this.keys.UP:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enableRotate)this._rotateUp(IM*this.rotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);E=!0;break;case this.keys.BOTTOM:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enableRotate)this._rotateUp(-IM*this.rotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);E=!0;break;case this.keys.LEFT:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enableRotate)this._rotateLeft(IM*this.rotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);E=!0;break;case this.keys.RIGHT:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enableRotate)this._rotateLeft(-IM*this.rotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);E=!0;break}if(E)A.preventDefault(),this.update()}_handleTouchStartRotate(A){if(this._pointers.length===1)this._rotateStart.set(A.pageX,A.pageY);else{let E=this._getSecondPointerPosition(A),M=0.5*(A.pageX+E.x),W=0.5*(A.pageY+E.y);this._rotateStart.set(M,W)}}_handleTouchStartPan(A){if(this._pointers.length===1)this._panStart.set(A.pageX,A.pageY);else{let E=this._getSecondPointerPosition(A),M=0.5*(A.pageX+E.x),W=0.5*(A.pageY+E.y);this._panStart.set(M,W)}}_handleTouchStartDolly(A){let E=this._getSecondPointerPosition(A),M=A.pageX-E.x,W=A.pageY-E.y,w=Math.sqrt(M*M+W*W);this._dollyStart.set(0,w)}_handleTouchStartDollyPan(A){if(this.enableZoom)this._handleTouchStartDolly(A);if(this.enablePan)this._handleTouchStartPan(A)}_handleTouchStartDollyRotate(A){if(this.enableZoom)this._handleTouchStartDolly(A);if(this.enableRotate)this._handleTouchStartRotate(A)}_handleTouchMoveRotate(A){if(this._pointers.length==1)this._rotateEnd.set(A.pageX,A.pageY);else{let M=this._getSecondPointerPosition(A),W=0.5*(A.pageX+M.x),w=0.5*(A.pageY+M.y);this._rotateEnd.set(W,w)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let E=this.domElement;this._rotateLeft(IM*this._rotateDelta.x/E.clientHeight),this._rotateUp(IM*this._rotateDelta.y/E.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(A){if(this._pointers.length===1)this._panEnd.set(A.pageX,A.pageY);else{let E=this._getSecondPointerPosition(A),M=0.5*(A.pageX+E.x),W=0.5*(A.pageY+E.y);this._panEnd.set(M,W)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(A){let E=this._getSecondPointerPosition(A),M=A.pageX-E.x,W=A.pageY-E.y,w=Math.sqrt(M*M+W*W);this._dollyEnd.set(0,w),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let Y=(A.pageX+E.x)*0.5,U=(A.pageY+E.y)*0.5;this._updateZoomParameters(Y,U)}_handleTouchMoveDollyPan(A){if(this.enableZoom)this._handleTouchMoveDolly(A);if(this.enablePan)this._handleTouchMovePan(A)}_handleTouchMoveDollyRotate(A){if(this.enableZoom)this._handleTouchMoveDolly(A);if(this.enableRotate)this._handleTouchMoveRotate(A)}_addPointer(A){this._pointers.push(A.pointerId)}_removePointer(A){delete this._pointerPositions[A.pointerId];for(let E=0;E<this._pointers.length;E++)if(this._pointers[E]==A.pointerId){this._pointers.splice(E,1);return}}_isTrackingPointer(A){for(let E=0;E<this._pointers.length;E++)if(this._pointers[E]==A.pointerId)return!0;return!1}_trackPointer(A){let E=this._pointerPositions[A.pointerId];if(E===void 0)E=new xA,this._pointerPositions[A.pointerId]=E;E.set(A.pageX,A.pageY)}_getSecondPointerPosition(A){let E=A.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[E]}_customWheelEvent(A){let E=A.deltaMode,M={clientX:A.clientX,clientY:A.clientY,deltaY:A.deltaY};switch(E){case 1:M.deltaY*=16;break;case 2:M.deltaY*=100;break}if(A.ctrlKey&&!this._controlActive)M.deltaY*=10;return M}}function E0(A){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(A.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(A))return;if(this._addPointer(A),A.pointerType==="touch")this._onTouchStart(A);else this._onMouseDown(A)}function M0(A){if(this.enabled===!1)return;if(A.pointerType==="touch")this._onTouchMove(A);else this._onMouseMove(A)}function W0(A){switch(this._removePointer(A),this._pointers.length){case 0:this.domElement.releasePointerCapture(A.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rN),this.state=WE.NONE;break;case 1:let E=this._pointers[0],M=this._pointerPositions[E];this._onTouchStart({pointerId:E,pageX:M.x,pageY:M.y});break}}function w0(A){let E;switch(A.button){case 0:E=this.mouseButtons.LEFT;break;case 1:E=this.mouseButtons.MIDDLE;break;case 2:E=this.mouseButtons.RIGHT;break;default:E=-1}switch(E){case Ww.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(A),this.state=WE.DOLLY;break;case Ww.ROTATE:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(A),this.state=WE.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(A),this.state=WE.ROTATE}break;case Ww.PAN:if(A.ctrlKey||A.metaKey||A.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(A),this.state=WE.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(A),this.state=WE.PAN}break;default:this.state=WE.NONE}if(this.state!==WE.NONE)this.dispatchEvent(hF)}function Y0(A){switch(this.state){case WE.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(A);break;case WE.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(A);break;case WE.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(A);break}}function U0(A){if(this.enabled===!1||this.enableZoom===!1||this.state!==WE.NONE)return;A.preventDefault(),this.dispatchEvent(hF),this._handleMouseWheel(this._customWheelEvent(A)),this.dispatchEvent(rN)}function K0(A){if(this.enabled===!1)return;this._handleKeyDown(A)}function L0(A){switch(this._trackPointer(A),this._pointers.length){case 1:switch(this.touches.ONE){case ww.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(A),this.state=WE.TOUCH_ROTATE;break;case ww.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(A),this.state=WE.TOUCH_PAN;break;default:this.state=WE.NONE}break;case 2:switch(this.touches.TWO){case ww.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(A),this.state=WE.TOUCH_DOLLY_PAN;break;case ww.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(A),this.state=WE.TOUCH_DOLLY_ROTATE;break;default:this.state=WE.NONE}break;default:this.state=WE.NONE}if(this.state!==WE.NONE)this.dispatchEvent(hF)}function G0(A){switch(this._trackPointer(A),this.state){case WE.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(A),this.update();break;case WE.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(A),this.update();break;case WE.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(A),this.update();break;case WE.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(A),this.update();break;default:this.state=WE.NONE}}function Z0(A){if(this.enabled===!1)return;A.preventDefault()}function l0(A){if(A.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function C0(A){if(A.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}var JZ=ZW(Fw(),1);var aN=(A)=>A.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),NZ=(...A)=>A.filter((E,M,W)=>{return Boolean(E)&&E.trim()!==""&&W.indexOf(E)===M}).join(" ").trim();var HK=ZW(Fw(),1);var tN={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var $N=HK.forwardRef(({color:A="currentColor",size:E=24,strokeWidth:M=2,absoluteStrokeWidth:W,className:w="",children:Y,iconNode:U,...K},L)=>{return HK.createElement("svg",{ref:L,...tN,width:E,height:E,stroke:A,strokeWidth:W?Number(M)*24/Number(E):M,className:NZ("lucide",w),...K},[...U.map(([G,l])=>HK.createElement(G,l)),...Array.isArray(Y)?Y:[Y]])});var gE=(A,E)=>{let M=JZ.forwardRef(({className:W,...w},Y)=>JZ.createElement($N,{ref:Y,iconNode:E,className:NZ(`lucide-${aN(A)}`,W),...w}));return M.displayName=`${A}`,M};var yK=gE("Crosshair",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]);var Zw=gE("Layers",[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]]);var TK=gE("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);var SK=gE("Plane",[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]]);var kK=gE("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var xK=gE("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);var PK=gE("Satellite",[["path",{d:"M13 7 9 3 5 7l4 4",key:"vyckw6"}],["path",{d:"m17 11 4 4-4 4-4-4",key:"rchckc"}],["path",{d:"m8 12 4 4 6-6-4-4Z",key:"1sshf7"}],["path",{d:"m16 8 3-3",key:"x428zp"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}]]);var uK=gE("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);var WU=gE("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var _N="";var eN="";
/*
 * God's Eye View // ORB-7 — application layer (readable source).
 *
 * This file is concatenated after src/vendor.js (bundled React 18 + three.js r171 +
 * lucide icons + textures, recovered from the original artifact; minified identifiers
 * like `eG`, `PF`, `XE` below are those bundle exports). Run `node build.mjs` to
 * regenerate assets/app.bundle.js.
 */
(function () {
  "use strict";

  /* ---- aliases for the minified vendor exports ------------------------------ */
  var React = XE;                     // React (hooks)
  var createRoot = W4.createRoot;     // react-dom/client
  var T = {
    Vector3: f, Scene: eG, Color: mA, WebGLRenderer: PF, PerspectiveCamera: YM, OrbitControls: fF,
    AmbientLight: GZ, DirectionalLight: LZ, TextureLoader: YZ, SphereGeometry: _Y, ShaderMaterial: RM,
    Mesh: LM, Group: Gw, ConeGeometry: zK, MeshBasicMaterial: tY, BufferGeometry: KM,
    Float32BufferAttribute: xE, LineBasicMaterial: JK, Line: AZ, PointsMaterial: qK, Points: EZ,
    BackSide: UM, SRGB: IK, ACES: fG, Repeat: gG,
  };
  var TEX = window.GODS_EYE_TEXTURES || {};
  var DAY_TEX = TEX.day, NIGHT_TEX = TEX.night; // NASA Blue Marble / Black Marble (assets/textures/*.jpg), inlined by build.mjs
  var ICON = { Plane: SK, Satellite: PK, Plus: kK, Minus: TK, Search: uK, Radio: xK };

  var Data = window.GodsEyeData;
  var R_KM = 6371;
  var DEG = Math.PI / 180;

  /* ---- tiny JSX-less helper -------------------------------------------------- */
  function h(type, props) {
    var kids = [];
    for (var i = 2; i < arguments.length; i++) kids.push(arguments[i]);
    kids = kids.flat(Infinity).filter(function (k) { return k !== null && k !== undefined && k !== false; });
    var p = Object.assign({}, props || {});
    if (kids.length) p.children = kids.length === 1 ? kids[0] : kids;
    return React.createElement(type, p);
  }
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  /* ---- geometry helpers ------------------------------------------------------ */
  function latLonToVec(lat, lon, r) { // same lat/lon -> xyz mapping as the original artifact (matches the globe textures)
    var phi = ((90 - lat) * Math.PI) / 180, lam = ((lon + 180) * Math.PI) / 180;
    return new T.Vector3(-r * Math.sin(phi) * Math.cos(lam), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(lam));
  }
  function vecToLatLon(v) {
    var n = v.clone().normalize();
    var lat = Math.asin(Math.max(-1, Math.min(1, n.y))) / DEG;
    var lon = Math.atan2(n.z, -n.x) / DEG - 180;
    if (lon < -180) lon += 360;
    return { lat: lat, lon: lon };
  }
  function deadReckon(fl, nowMs) {
    var dt = Math.min(Math.max((nowMs - fl.t) / 1000, 0), 180);
    var hdg = fl.hdg * DEG, d = (fl.vMs * dt) / (R_KM * 1000); // angular distance
    var lat = fl.lat + (d * Math.cos(hdg)) / DEG;
    var lon = fl.lon + (d * Math.sin(hdg)) / DEG / Math.max(Math.cos(fl.lat * DEG), 0.05);
    if (lon > 180) lon -= 360; if (lon < -180) lon += 360;
    return { lat: Math.max(-89.5, Math.min(89.5, lat)), lon: lon };
  }
  function sunDirection(date) {
    // Low-precision subsolar point (good to ~1 degree) for a real day/night terminator.
    var start = Date.UTC(date.getUTCFullYear(), 0, 0);
    var doy = (date.getTime() - start) / 86400000;
    var decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));
    var utcH = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    var B = ((2 * Math.PI) / 365) * (doy - 81);
    var eqt = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // minutes
    var lon = -15 * (utcH - 12 + eqt / 60);
    return latLonToVec(decl, lon, 1).normalize();
  }
  function fmtN(n) { return n == null || !isFinite(n) ? "--" : Math.round(n).toLocaleString("en-US"); }
  function fmtLL(lat, lon) {
    return Math.abs(lat).toFixed(2) + (lat >= 0 ? "N " : "S ") + Math.abs(lon).toFixed(2) + (lon >= 0 ? "E" : "W");
  }
  function ago(ms) { if (!ms) return "--"; var s = Math.round((Date.now() - ms) / 1000); return s < 60 ? s + "s" : Math.round(s / 60) + "m"; }

  var PLACES = {
    taiwan: { lat: 23.7, lon: 121.0, narrow: 3.0, wide: 2.1, label: "台灣上空" },
    t101: { lat: 25.0339, lon: 121.5645, narrow: 1.12, wide: 1.1, label: "台北101" },
    tpe: { lat: 25.0777, lon: 121.2328, narrow: 1.12, wide: 1.1, label: "桃園機場" },
  };

  /* ---- small inline icons (lucide has no ship/bell/crosshair in this bundle) ---- */
  function svgIcon(path, size) {
    return h("svg", { width: size || 18, height: size || 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, path);
  }
  var ShipIcon = function (p) { return svgIcon([h("path", { key: 1, d: "M3 17l2 3h14l2-3-9-3-9 3z" }), h("path", { key: 2, d: "M12 14V4l5 6" }), h("path", { key: 3, d: "M12 4L7 10" })], p.size); };

  /* ---- ship marker colours by class (distinct from the white aircraft cones) ---- */
  var SHIP_COLORS = { cargo: 0x2ee6ff, tanker: 0xff9f1c, pax: 0xd18bff, fish: 0x6dff8a, other: 0x9aa7b0, ccg: 0xff3b30 };
  var SHIP_CSS = { cargo: "#2ee6ff", tanker: "#ff9f1c", pax: "#d18bff", fish: "#6dff8a", other: "#9aa7b0", ccg: "#ff3b30" };

  /* ---- local-time helpers ---- */
  function hm(d) { return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }); }
  function dayHm(d) {
    var today = new Date(), same = d.toDateString() === today.toDateString();
    return (same ? "" : d.toLocaleDateString([], { weekday: "short" }) + " ") + hm(d);
  }
  function fmtDur(sec) { return Math.floor(sec / 60) + "m" + String(sec % 60).padStart(2, "0") + "s"; }
  function inMin(ms) { var m = Math.round(ms / 60000); return m < 60 ? m + " min" : Math.floor(m / 60) + "h" + String(m % 60).padStart(2, "0"); }

  /* ---- satellite passes (SGP4 via satellite.js, see assets/passes.js) ---- */
  var DEFAULT_OBSERVER = { lat: 25.033, lon: 121.565, src: "default", label: "TAIPEI (DEFAULT)" };
  var WATCH = ["ISS (ZARYA)", "CSS (TIANHE)", "HST", "AJISAI (EGS)", "TERRA", "AQUA", "ENVISAT", "ALOS (DAICHI)"]; // ISS, Tiangong, Hubble + big bright-list satellites
  var ALWAYS_LIST = { "ISS (ZARYA)": 1, "CSS (TIANHE)": 1 };
  function shortName(n) { return n === "CSS (TIANHE)" ? "CSS / TIANGONG" : n === "ISS (ZARYA)" ? "ISS" : n.replace(/ \(.*\)$/, ""); }
  var recsByName = {};

  function loadObserver() {
    try { var o = JSON.parse(localStorage.getItem("gods-eye:observer")); if (o && isFinite(o.lat) && isFinite(o.lon)) return o; } catch (e) { /* none */ }
    return DEFAULT_OBSERVER;
  }
  function computePasses(obs) {
    var P = window.GodsEyePasses;
    if (!P || typeof satellite === "undefined") return Promise.reject(new Error("satellite.js not loaded"));
    return Promise.all(["stations", "visual"].map(function (g) { return Data.loadTleEntries(g).catch(function () { return null; }); })).then(function (groups) {
      var found = {}, age = null;
      groups.forEach(function (g) {
        if (!g) return; age = Math.max(age == null ? 0 : age, g.ageMin);
        g.entries.forEach(function (e) { if (WATCH.indexOf(e[0]) >= 0 && !found[e[0]]) found[e[0]] = e; });
      });
      var names = Object.keys(found);
      if (!names.length) throw new Error("CelesTrak TLE unavailable (network / CORS / rate limit)");
      var now = new Date(), o = { lat: obs.lat, lon: obs.lon, heightKm: 0.02 }, all = [];
      names.forEach(function (nm) {
        var rec; try { rec = satellite.twoline2satrec(found[nm][1], found[nm][2]); } catch (e) { return; }
        if (!rec || rec.error) return; recsByName[nm] = rec;
        P.findPasses(rec, o, now, 72, { minEl: 10 }).forEach(function (p) {
          if (!ALWAYS_LIST[nm] && !p.visible) return; // only list bright-list satellites when they are actually likely visible
          var la = P.lookAngles(rec, o, p.peak), why = "";
          if (!p.visible && la) why = !la.sunlit ? "IN SHADOW" : la.sunEl > -6 ? "SKY BRIGHT" : "TOO LOW";
          all.push(Object.assign({ name: nm, key: nm + "@" + p.start.getTime(), why: why }, p));
        });
      });
      all.sort(function (a, b) { return a.start - b.start; });
      return { list: all.slice(0, 60), ageMin: age, computedAt: Date.now(), sats: names.length };
    });
  }

  /* ===========================================================================
   *  Component
   * ========================================================================= */
  function App() {
    var canvasRef = React.useRef(null);
    var rootRef = React.useRef(null);
    var reticleRef = React.useRef(null);
    var api = React.useRef({}); // imperative scene handle

    var _mode = React.useState("DAY"), mode = _mode[0], setMode = _mode[1];
    var _tick = React.useState(0), setTick = _tick[1];
    var _sel = React.useState(null), selId = _sel[0], setSelId = _sel[1];
    var _follow = React.useState(false), follow = _follow[0], setFollow = _follow[1];
    var _layers = React.useState({ sats: true, flights: true, ships: true }), layers = _layers[0], setLayers = _layers[1];
    var _tab = React.useState(function () { return window.innerHeight >= 760 ? "hud" : null; }) /* short screens start collapsed */, tab = _tab[0], setTab = _tab[1];
    var _ss = React.useState(null), selShipId = _ss[0], setSelShipId = _ss[1];
    var _sf = React.useState(false), sFollow = _sf[0], setSFollow = _sf[1];
    var _inv = React.useState(0), inView = _inv[0], setInView = _inv[1];
    var _obs = React.useState(loadObserver), observer = _obs[0], setObserver = _obs[1];
    var _ps = React.useState({ status: "loading", list: [], error: "", ageMin: null }), passes = _ps[0], setPasses = _ps[1];
    var _sp = React.useState(null), selPassKey = _sp[0], setSelPassKey = _sp[1];
    var _look = React.useState(null), look = _look[0], setLook = _look[1];
    var _eo = React.useState(false), editObs = _eo[0], setEditObs = _eo[1];
    var _li = React.useState(""), manual = _li[0], setManual = _li[1];
    var _nt = React.useState(function () { try { return localStorage.getItem("gods-eye:notify") === "1"; } catch (e) { return false; } }), notifyOn = _nt[0], setNotifyOn = _nt[1];
    var _ph = React.useState(null), heading = _ph[0], setHeading = _ph[1];
    var _pi = React.useState(null), pushInfo = _pi[0], setPushInfo = _pi[1];
    var _pp = React.useState({ quake: true, ccg: false, iss: true }), pushPrefs = _pp[0], setPushPrefs = _pp[1];
    var _pm = React.useState(""), pushMsg = _pm[0], setPushMsg = _pm[1];
    var _pb = React.useState(false), pushBusy = _pb[0], setPushBusy = _pb[1];
    var _q = React.useState(""), query = _q[0], setQuery = _q[1];
    var _place = React.useState("taiwan"), place = _place[0], setPlace = _place[1];
    var _toast = React.useState(""), toast = _toast[0], setToast = _toast[1];
    var _view = React.useState({ lat: 23.7, lon: 121, altKm: 0 }), view = _view[0], setView = _view[1];

    var modeRef = React.useRef(mode); modeRef.current = mode;
    var selRef = React.useRef(selId); selRef.current = selId;
    var followRef = React.useRef(follow); followRef.current = follow;
    var layersRef = React.useRef(layers); layersRef.current = layers;
    var focusRef = React.useRef(null);
    var selShipRef = React.useRef(selShipId); selShipRef.current = selShipId;
    var observerRef = React.useRef(observer); observerRef.current = observer;
    var passMarkRef = React.useRef(null);
    var inViewRef = React.useRef(0);
    var actionsRef = React.useRef({});
    var compassStopRef = React.useRef(null);
    var reticle2Ref = React.useRef(null);

    /* ---- data subscription (throttled re-render) ---- */
    React.useEffect(function () {
      var pending = 0;
      var unsub = Data.subscribe(function () {
        if (pending) return;
        pending = setTimeout(function () { pending = 0; setTick(function (t) { return t + 1; }); }, 250);
      });
      Data.start();
      var iv = setInterval(function () { setTick(function (t) { return t + 1; }); }, 5000); // refresh "age" labels
      return function () { unsub(); clearInterval(iv); clearTimeout(pending); };
    }, []);

    var flights = Data.state.flights, sats = Data.state.sats, ships = Data.state.ships;
    var list = flights.list;
    var selIdx = Math.max(0, list.findIndex(function (x) { return x.id === selId; }));
    var selected = list.length ? list[selIdx] : null;
    React.useEffect(function () { // keep a valid selection when the list changes
      if (!list.length) { if (selId !== null) setSelId(null); return; }
      if (!list.some(function (x) { return x.id === selId; })) setSelId(list[0].id);
    }, [flights.rev]);

    var sList = ships.list;
    var selShip = selShipId ? sList.find(function (x) { return x.id === selShipId; }) || null : null;
    var ccgList = sList.filter(function (x) { return x.ccg; });
    var selPass = selPassKey ? passes.list.find(function (x) { return x.key === selPassKey; }) || null : null;
    var pushIssActive = !!(pushInfo && pushInfo.subscribed && pushInfo.prefs && pushInfo.prefs.iss);

    function showToast(msg) { setToast(msg); clearTimeout(showToast.t); showToast.t = setTimeout(function () { setToast(""); }, 2600); }

    function flyTo(lat, lon, dist, persistent) {
      focusRef.current = { kind: "point", lat: lat, lon: lon, dist: dist, persistent: !!persistent };
    }
    function isNarrow() { var r = rootRef.current; return !r || r.clientWidth < 700; }
    function goPlace(key) {
      var p = PLACES[key]; setPlace(key); setFollow(false); setSFollow(false);
      flyTo(p.lat, p.lon, isNarrow() ? p.narrow : p.wide);
    }
    function selectFlight(id, doFollow) {
      setSelId(id); setTab("hud"); setSFollow(false);
      if (doFollow) { setFollow(true); focusRef.current = { kind: "flight", id: id }; }
    }
    function selectShip(id, doFollow) {
      setSelShipId(id); setTab("ships"); setFollow(false);
      if (doFollow) { setSFollow(true); focusRef.current = { kind: "ship", id: id }; }
    }
    function cycleShip(dir, onlyCcg) {
      var pool = onlyCcg ? ccgList : sList; if (!pool.length) return;
      var i = pool.findIndex(function (x) { return x.id === selShipId; });
      var n = i < 0 ? (dir > 0 ? 0 : pool.length - 1) : (i + dir + pool.length) % pool.length;
      setSelShipId(pool[n].id);
      if (sFollow || onlyCcg) { setSFollow(true); setFollow(false); focusRef.current = { kind: "ship", id: pool[n].id }; }
    }
    function toggleShipFollow() {
      if (!selShip) return;
      if (sFollow) { setSFollow(false); focusRef.current = null; }
      else { setSFollow(true); setFollow(false); focusRef.current = { kind: "ship", id: selShip.id }; }
    }
    actionsRef.current = { selectFlight: selectFlight, selectShip: selectShip };
    function cycle(dir) {
      if (!list.length) return;
      var n = (selIdx + dir + list.length) % list.length;
      setSelId(list[n].id);
      if (followRef.current) focusRef.current = { kind: "flight", id: list[n].id };
    }
    function toggleFollow() {
      if (!selected) return;
      if (follow) { setFollow(false); focusRef.current = null; }
      else { setFollow(true); setSFollow(false); focusRef.current = { kind: "flight", id: selected.id }; }
    }
    function trackIss() {
      var iss = sats.iss; if (!iss) { showToast("ISS NOT AVAILABLE"); return; }
      setFollow(false); setSFollow(false); focusRef.current = { kind: "iss" }; setPlace("");
    }
    function zoom(dir) {
      var a = api.current; if (!a.camera) return;
      var len = a.camera.position.length();
      var next = Math.max(a.controls.minDistance, Math.min(a.controls.maxDistance, len * (dir > 0 ? 0.75 : 1.33)));
      a.camera.position.multiplyScalar(next / len);
      if (focusRef.current && focusRef.current.kind === "point") focusRef.current = null;
    }
    function runSearch(e) {
      e.preventDefault();
      var q = query.trim(); if (!q) return;
      var up = q.toUpperCase().replace(/\s+/g, "");
      var m = q.match(/^(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)$/);
      if (m) {
        var lat = parseFloat(m[1]), lon = parseFloat(m[2]);
        if (Math.abs(lat) <= 90 && Math.abs(lon) <= 180) { setPlace(""); setFollow(false); flyTo(lat, lon, 1.6); showToast("FLY TO " + fmtLL(lat, lon)); return; }
      }
      var fl = list.find(function (x) { return x.callsign.replace(/\s+/g, "") === up; }) ||
        list.find(function (x) { return x.callsign.replace(/\s+/g, "").indexOf(up) === 0; }) ||
        list.find(function (x) { return x.callsign.replace(/\s+/g, "").indexOf(up) >= 0 || x.id === q.toLowerCase(); });
      if (fl) { selectFlight(fl.id, true); setPlace(""); showToast("TRACKING " + fl.callsign); return; }
      if (/^ISS/.test(up)) { trackIss(); return; }
      var sh = /^\d{9}$/.test(up) ? sList.find(function (x) { return x.mmsi === up; }) :
        (sList.find(function (x) { return x.hasName && x.name.replace(/\s+/g, "") === up; }) ||
         (up.length >= 3 ? sList.find(function (x) { return x.hasName && x.name.replace(/\s+/g, "").indexOf(up) >= 0; }) : null));
      if (sh) { selectShip(sh.id, true); setPlace(""); showToast("TRACKING " + sh.name); return; }
      var si = sats.names.findIndex(function (nm) { return nm.toUpperCase().indexOf(q.toUpperCase()) >= 0; });
      if (si >= 0 && sats.pos[si * 3 + 2] > 0) {
        setPlace(""); setFollow(false);
        flyTo(sats.pos[si * 3], sats.pos[si * 3 + 1], 1.7);
        showToast(sats.names[si]); return;
      }
      showToast("NO MATCH: " + q);
    }

    /* ---- pass predictions: recompute when the observer changes, then every 30 min ---- */
    function recomputePasses() {
      setPasses(function (o) { return Object.assign({}, o, { status: "loading", error: "" }); });
      computePasses(observerRef.current).then(function (r) {
        setPasses({ status: "ready", list: r.list, error: "", ageMin: r.ageMin, computedAt: r.computedAt, sats: r.sats });
      }).catch(function (err) {
        setPasses({ status: "error", list: [], error: (err && err.message) || String(err), ageMin: null });
      });
    }
    React.useEffect(function () {
      var t = setTimeout(recomputePasses, 400); // let the first paint happen before the (cheap) SGP4 scan
      var iv = setInterval(recomputePasses, 30 * 60 * 1000);
      return function () { clearTimeout(t); clearInterval(iv); };
    }, [observer.lat, observer.lon]);

    /* ---- "look here": live az / el of the selected pass satellite, 1 Hz ---- */
    React.useEffect(function () {
      passMarkRef.current = null;
      if (!selPass) { setLook(null); return; }
      var P = window.GodsEyePasses, rec = recsByName[selPass.name]; if (!P || !rec) { setLook(null); return; }
      function tick() {
        var now = new Date(), o = { lat: observerRef.current.lat, lon: observerRef.current.lon, heightKm: 0.02 }, la = P.lookAngles(rec, o, now);
        if (!la) return;
        var pv = satellite.propagate(rec, now), gd = pv && pv.position ? satellite.eciToGeodetic(pv.position, satellite.gstime(now)) : null;
        if (gd) passMarkRef.current = { lat: satellite.degreesLat(gd.latitude), lon: satellite.degreesLong(gd.longitude), altKm: gd.height };
        setLook({ az: la.az, el: la.el, rangeKm: la.rangeKm, sunlit: la.sunlit, sunEl: la.sunEl });
      }
      tick(); var iv = setInterval(tick, 1000);
      return function () { clearInterval(iv); passMarkRef.current = null; };
    }, [selPassKey, passes.computedAt, observer.lat, observer.lon]);

    /* ---- optional compass: rotate the dial relative to where the phone points ---- */
    var compassOn = heading !== null;
    function toggleCompass() {
      if (compassOn) { setHeading(null); return; }
      function start() {
        var absEv = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
        var h = function (e) {
          var v = typeof e.webkitCompassHeading === "number" ? e.webkitCompassHeading : (e.absolute || absEv === "deviceorientationabsolute") && e.alpha != null ? (360 - e.alpha) % 360 : null;
          if (v != null) setHeading(v);
        };
        window.addEventListener(absEv, h, true); compassStopRef.current = function () { window.removeEventListener(absEv, h, true); };
        setHeading(0);
      }
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function")
        DeviceOrientationEvent.requestPermission().then(function (r) { if (r === "granted") start(); else showToast("COMPASS DENIED"); }).catch(function () { showToast("COMPASS UNAVAILABLE"); });
      else if (typeof DeviceOrientationEvent !== "undefined") start(); else showToast("NO COMPASS SENSOR");
    }
    React.useEffect(function () { if (heading === null && compassStopRef.current) { compassStopRef.current(); compassStopRef.current = null; } }, [heading === null]);

    function notifyNow(title, body, tag) {
      try {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) navigator.serviceWorker.ready.then(function (reg) { reg.showNotification(title, { body: body, tag: tag, icon: "icons/icon-192.png", badge: "icons/icon-192.png" }); }).catch(function () { new Notification(title, { body: body, tag: tag }); });
        else new Notification(title, { body: body, tag: tag });
      } catch (e) { /* unsupported */ }
    }
    function setNotify(on) {
      if (!on) { setNotifyOn(false); try { localStorage.setItem("gods-eye:notify", "0"); } catch (e) { /* ignore */ } return; }
      if (!("Notification" in window)) { showToast("NOTIFICATIONS NOT SUPPORTED HERE"); return; }
      Notification.requestPermission().then(function (perm) {
        if (perm === "granted") { setNotifyOn(true); try { localStorage.setItem("gods-eye:notify", "1"); } catch (e) { /* ignore */ } showToast("NOTIFY ON · KEEP THIS PAGE/APP OPEN"); }
        else showToast("NOTIFICATIONS " + perm.toUpperCase());
      });
    }
    var notifiedRef = React.useRef({});
    React.useEffect(function () { // page-open reminders ~5 min before a pass (skipped when Web Push already covers ISS)
      if (!notifyOn || pushIssActive) return;
      function check() {
        var now = Date.now();
        passes.list.forEach(function (p) {
          var d = p.start.getTime() - now;
          if (d > 0 && d <= 5.5 * 60000 && !notifiedRef.current[p.key] && "Notification" in window && Notification.permission === "granted") {
            notifiedRef.current[p.key] = 1;
            notifyNow(shortName(p.name) + " in " + inMin(d), hm(p.start) + " · " + p.startDir + " → " + p.endDir + " · max " + Math.round(p.maxEl) + "°" + (p.visible ? " · likely visible" : ""), "pass-" + p.key);
          }
        });
      }
      check(); var iv = setInterval(check, 15000);
      return function () { clearInterval(iv); };
    }, [notifyOn, pushIssActive, passes.computedAt]);

    /* ---- Web Push state ---- */
    function refreshPush() {
      if (!window.GodsEyePush) return;
      window.GodsEyePush.info().then(function (i) { setPushInfo(i); setPushPrefs(i.prefs); });
    }
    React.useEffect(refreshPush, []);
    function pushAction(kind) {
      var Push = window.GodsEyePush; if (!Push || pushBusy) return;
      setPushBusy(true); setPushMsg("");
      var loc = { lat: Math.round(observer.lat * 100) / 100, lon: Math.round(observer.lon * 100) / 100 };
      var job = kind === "off" ? Push.unsubscribe().then(function () { return "ALERTS OFF"; })
        : kind === "test" ? Push.test().then(function (r) { return r.ok ? "TEST SENT — CHECK YOUR NOTIFICATIONS" : "TEST FAILED: " + (r.result || "?"); })
        : Push.subscribe(pushPrefs, loc).then(function () { return "ALERTS ON ✓"; });
      job.then(function (m) { setPushMsg(m); }).catch(function (e) { setPushMsg("ERROR: " + ((e && e.message) || e)); }).then(function () { setPushBusy(false); refreshPush(); });
    }
    function togglePref(k) {
      var next = Object.assign({}, pushPrefs); next[k] = !next[k]; setPushPrefs(next);
      if (window.GodsEyePush) window.GodsEyePush.savePrefs(next);
      if (pushInfo && pushInfo.subscribed && window.GodsEyePush) {
        window.GodsEyePush.update(next, { lat: Math.round(observer.lat * 100) / 100, lon: Math.round(observer.lon * 100) / 100 }).then(function () { setPushMsg("PREFERENCES SAVED"); refreshPush(); }).catch(function (e) { setPushMsg("ERROR: " + ((e && e.message) || e)); });
      }
    }

    /* ---- observer location ---- */
    function saveObserver(o) {
      setObserver(o); setSelPassKey(null); notifiedRef.current = {};
      try { localStorage.setItem("gods-eye:observer", JSON.stringify(o)); } catch (e) { /* ignore */ }
    }
    function useMyLocation() {
      if (!navigator.geolocation) { showToast("GEOLOCATION NOT AVAILABLE"); return; }
      showToast("LOCATING…");
      navigator.geolocation.getCurrentPosition(function (pos) {
        saveObserver({ lat: pos.coords.latitude, lon: pos.coords.longitude, src: "gps", label: "MY LOCATION" }); showToast("LOCATION SET");
      }, function (err) { showToast("LOCATION " + (err && err.code === 1 ? "DENIED — USING " : "FAILED — USING ") + observerRef.current.label); }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
    }
    function submitManual(e) {
      e.preventDefault();
      var m = manual.trim().match(/^(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)$/);
      if (!m || Math.abs(+m[1]) > 90 || Math.abs(+m[2]) > 180) { showToast("ENTER LAT,LON  e.g. 25.03,121.56"); return; }
      saveObserver({ lat: +m[1], lon: +m[2], src: "manual", label: "MANUAL" }); setEditObs(false); showToast("LOCATION SET");
    }
    function resetObserver() { saveObserver(DEFAULT_OBSERVER); setEditObs(false); }

    /* ---- deep links: ?ship=<MMSI> (push alert) and ?pass=iss ---- */
    var deepRef = React.useRef({ ship: new URLSearchParams(location.search).get("ship"), pass: new URLSearchParams(location.search).get("pass") });
    React.useEffect(function () {
      var d = deepRef.current;
      if (d.pass) { setTab("passes"); d.pass = null; }
      if (d.ship) {
        var sh = sList.find(function (x) { return x.mmsi === d.ship; });
        if (sh) { selectShip(sh.id, true); d.ship = null; }
        else if (ships.status !== "loading") d.ship = null;
      }
    }, [ships.rev]);

    /* ---- three.js scene (created once) ---- */
    React.useEffect(function () {
      var canvas = canvasRef.current, root = rootRef.current;
      if (!canvas) return;
      var scene = new T.Scene();
      scene.background = new T.Color(0x02060a);
      var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = T.SRGB;
      renderer.toneMapping = T.ACES;
      var camera = new T.PerspectiveCamera(28, 1, 0.05, 100);
      var controls = new T.OrbitControls(camera, renderer.domElement);
      controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.08;
      controls.minDistance = 1.06; controls.maxDistance = 8; controls.zoomSpeed = 1.2; controls.rotateSpeed = 0.6;
      controls.target.set(0, 0, 0);
      // Smaller rotate/zoom speed when zoomed in close.
      controls.addEventListener("start", function () {
        var fk = focusRef.current;
        if (fk) { if (fk.kind !== "point" || fk.persistent) { setFollow(false); setSFollow(false); } focusRef.current = null; }
      });

      var ambient = new T.AmbientLight(0xffffff, 0.85); scene.add(ambient);
      var sun = new T.DirectionalLight(0xffffff, 2.2); sun.position.set(5, 2, 3); scene.add(sun);

      var loader = new T.TextureLoader();
      var dayMap = loader.load(DAY_TEX), nightMap = loader.load(NIGHT_TEX);
      [dayMap, nightMap].forEach(function (t) { t.colorSpace = T.SRGB; t.anisotropy = 8; t.wrapS = t.wrapT = T.Repeat; });
      var earthMat = new T.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap }, nightMap: { value: nightMap }, sunDir: { value: sunDirection(new Date()) },
          brightness: { value: 1.25 }, mode: { value: 0 }, opacityNight: { value: 0.85 },
        },
        vertexShader: "varying vec2 vUv; varying vec3 vNormal; void main(){ vUv = uv; vNormal = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: [
          "uniform sampler2D dayMap; uniform sampler2D nightMap; uniform vec3 sunDir; uniform float brightness; uniform float mode;",
          "varying vec2 vUv; varying vec3 vNormal;",
          "void main(){",
          "  float sun = dot(normalize(vNormal), normalize(sunDir));", // world-space normal vs world-space sun
          "  float dayMix = smoothstep(-0.25, 0.45, sun);",
          "  vec3 dayC = texture2D(dayMap, vUv).rgb;",
          "  float dl = dot(dayC, vec3(0.299,0.587,0.114));",
          "  dayC = (dayC + vec3(0.025,0.07,0.17) * (1.0 - smoothstep(0.0, 0.22, dl))) * brightness;", // lift the near-black deep-ocean pixels
          "  vec3 nightC = texture2D(nightMap, vUv).rgb;",
          "  vec3 color = mix(nightC * 0.9, dayC, dayMix);",
          "  if(mode > 0.5 && mode < 1.5){ float lum = dot(color, vec3(0.299,0.587,0.114)); color = vec3(lum*0.2, lum*1.1, lum*0.3); }",
          "  if(mode > 1.5){ float lum = dot(dayC, vec3(0.3,0.59,0.11)); color = vec3(1.0 - lum) * vec3(1.0,0.6,0.2); color += nightC * 0.5; }",
          "  gl_FragColor = vec4(color, 1.0);",
          "}",
        ].join("\n"),
      });
      var earth = new T.Mesh(new T.SphereGeometry(1, 128, 128), earthMat); scene.add(earth);

      var glowMat = new T.ShaderMaterial({
        transparent: true, side: T.BackSide, uniforms: { mode: { value: 0 } },
        vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: "varying vec3 vN; uniform float mode; void main(){ float f = pow(1.0 - abs(dot(vN, vec3(0.0,0.0,1.0))), 4.0); vec3 col = mode < 0.5 ? vec3(0.15,0.45,1.0) : vec3(0.2,1.0,0.3); gl_FragColor = vec4(col, f * 0.5); }",
      });
      scene.add(new T.Mesh(new T.SphereGeometry(1.05, 64, 64), glowMat));

      // background stars
      var starGeo = new T.BufferGeometry(), sp = [];
      for (var i = 0; i < 2000; i++) {
        var rr = 20 + Math.random() * 30, a1 = Math.random() * Math.PI * 2, a2 = Math.acos(2 * Math.random() - 1);
        sp.push(rr * Math.sin(a2) * Math.cos(a1), rr * Math.sin(a2) * Math.sin(a1), rr * Math.cos(a2));
      }
      starGeo.setAttribute("position", new T.Float32BufferAttribute(sp, 3));
      scene.add(new T.Points(starGeo, new T.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: false })));

      // fixed place markers (Taipei 101, Taoyuan airport)
      var mk = [PLACES.t101, PLACES.tpe].map(function (p) { var v = latLonToVec(p.lat, p.lon, 1.003); return [v.x, v.y, v.z]; }).flat();
      var markerGeo = new T.BufferGeometry(); markerGeo.setAttribute("position", new T.Float32BufferAttribute(mk, 3));
      scene.add(new T.Points(markerGeo, new T.PointsMaterial({ color: 0x00e5ff, size: 7, sizeAttenuation: false })));

      // satellites
      var satGroup = new T.Group(); scene.add(satGroup);
      var satMat = new T.PointsMaterial({ color: 0x9fe8ff, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0.6 });
      var twMat = new T.PointsMaterial({ color: 0xc8ff00, size: 6, sizeAttenuation: false });
      var issMat = new T.PointsMaterial({ color: 0xff3b30, size: 10, sizeAttenuation: false });
      var satPts = new T.Points(new T.BufferGeometry(), satMat), twPts = new T.Points(new T.BufferGeometry(), twMat), issPts = new T.Points(new T.BufferGeometry(), issMat);
      satPts.frustumCulled = twPts.frustumCulled = issPts.frustumCulled = false;
      satGroup.add(satPts); satGroup.add(twPts); satGroup.add(issPts);

      // flights
      var flightGroup = new T.Group(); scene.add(flightGroup);
      var coneGeo = new T.ConeGeometry(0.006, 0.018, 3); coneGeo.rotateX(Math.PI / 2);
      var flMat = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      var selMat = new T.MeshBasicMaterial({ color: 0xffe600 });
      var meshes = {}; // id -> {mesh, fl}
      var trailGeo = new T.BufferGeometry();
      var trailLine = new T.Line(trailGeo, new T.LineBasicMaterial({ color: 0xffe63b, transparent: true, opacity: 0.9 }));
      scene.add(trailLine);

      // ships: flat hull-shaped markers (bow = +Z), coloured by class — visually distinct from the white aircraft cones
      var shipGroup = new T.Group(); scene.add(shipGroup);
      var hullGeo = new T.BufferGeometry();
      (function () {
        var V = [[0, 0, 0.55], [0.3, 0, 0.12], [0.3, 0, -0.5], [-0.3, 0, -0.5], [-0.3, 0, 0.12]], tri = [[0, 1, 4], [1, 2, 3], [1, 3, 4]], a = [];
        tri.forEach(function (t) { t.forEach(function (i) { a.push(V[i][0] * 0.02, V[i][1], V[i][2] * 0.02); }); t.slice().reverse().forEach(function (i) { a.push(V[i][0] * 0.02, V[i][1], V[i][2] * 0.02); }); }); // both windings = visible from either side
        hullGeo.setAttribute("position", new T.Float32BufferAttribute(a, 3));
      })();
      var shipMats = {}; Object.keys(SHIP_COLORS).forEach(function (k) { shipMats[k] = new T.MeshBasicMaterial({ color: SHIP_COLORS[k], transparent: true, opacity: 0.95 }); });
      var shipSelMat = new T.MeshBasicMaterial({ color: 0xffffff });
      var shipMeshes = {}; // id -> {mesh, sh}
      var obsPts = new T.Points(new T.BufferGeometry(), new T.PointsMaterial({ color: 0xff2fd0, size: 9, sizeAttenuation: false })); obsPts.frustumCulled = false; scene.add(obsPts);
      var passPts = new T.Points(new T.BufferGeometry(), new T.PointsMaterial({ color: 0xff2fd0, size: 12, sizeAttenuation: false })); passPts.frustumCulled = false; scene.add(passPts);
      var lastObsKey = "", lastShipRev = -1, lastCountAt = 0;

      var lastFlightRev = -1, lastSatRev = -1, lastSelTrail = "", lastSunAt = 0, lastViewAt = 0;
      var tmpUp = new T.Vector3(), tmpDir = new T.Vector3(), tmpNorth = new T.Vector3(), tmpEast = new T.Vector3(), tmpTarget = new T.Vector3();

      function resize() {
        var w = root.clientWidth || window.innerWidth, hgt = root.clientHeight || window.innerHeight;
        var aspect = w / hgt;
        camera.aspect = aspect;
        camera.fov = aspect < 1 ? Math.min(62, (2 * Math.atan(Math.tan(14 * DEG) / aspect)) / DEG) : 28; // keep horizontal FOV on portrait phones
        applyViewOffset();
        renderer.setSize(w, hgt, false);
      }
      // Centre the globe in the part of the screen that is NOT covered by the HUD panels.
      var lastShift = null;
      function applyViewOffset() {
        var w = root.clientWidth || window.innerWidth, hgt = root.clientHeight || window.innerHeight, shift = 0;
        var bar = root.querySelector(".ge-bar"), dock = root.querySelector(".ge-dock"), chips = root.querySelector(".ge-chips");
        if (bar && chips) {
          var rr = root.getBoundingClientRect(), top = bar.getBoundingClientRect().bottom - rr.top;
          var bottom = (w < 700 && dock ? dock.getBoundingClientRect().top : chips.getBoundingClientRect().top) - rr.top;
          if (bottom - top > 120) shift = (top + bottom) / 2 - hgt / 2;
        }
        shift = Math.round(shift);
        if (shift === lastShift && camera.view && camera.view.enabled) return;
        lastShift = shift;
        if (shift) camera.setViewOffset(w, hgt, 0, -shift, w, hgt); else camera.clearViewOffset();
        camera.updateProjectionMatrix();
      }
      resize();
      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
      if (ro) ro.observe(root); else window.addEventListener("resize", resize);

      // initial camera: look at Taiwan
      (function () {
        var p = PLACES.taiwan, d = root.clientWidth < 700 ? p.narrow : p.wide;
        camera.position.copy(latLonToVec(p.lat, p.lon, 1).normalize().multiplyScalar(d));
        controls.update();
      })();

      function syncFlights() {
        var st = Data.state.flights, seen = {};
        st.list.forEach(function (fl) {
          seen[fl.id] = 1;
          var e = meshes[fl.id];
          if (!e) { var m = new T.Mesh(coneGeo, flMat); flightGroup.add(m); e = meshes[fl.id] = { mesh: m, fl: fl }; }
          e.fl = fl;
        });
        Object.keys(meshes).forEach(function (id) { if (!seen[id]) { flightGroup.remove(meshes[id].mesh); delete meshes[id]; } });
      }

      function syncShips() {
        var st = Data.state.ships, seen = {};
        st.list.forEach(function (sh) {
          seen[sh.id] = 1;
          var e = shipMeshes[sh.id];
          if (!e) { var m = new T.Mesh(hullGeo, shipMats[sh.cls]); shipGroup.add(m); e = shipMeshes[sh.id] = { mesh: m, sh: sh }; }
          e.sh = sh; e.cls = sh.cls;
        });
        Object.keys(shipMeshes).forEach(function (id) { if (!seen[id]) { shipGroup.remove(shipMeshes[id].mesh); delete shipMeshes[id]; } });
      }

      function syncSats() {
        var st = Data.state.sats, pos = st.pos, n = pos.length / 3;
        var all = new Float32Array(n * 3), tw = [], overSet = {};
        st.over.forEach(function (o) { overSet[o.i] = 1; });
        for (var i = 0; i < n; i++) {
          var alt = pos[i * 3 + 2];
          if (alt < 0) continue;
          var r = 1 + Math.min(alt / R_KM, 1.2);
          var v = latLonToVec(pos[i * 3], pos[i * 3 + 1], r);
          all[i * 3] = v.x; all[i * 3 + 1] = v.y; all[i * 3 + 2] = v.z;
          if (overSet[i]) tw.push(v.x, v.y, v.z);
        }
        function setGeo(obj, arr) {
          var g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(arr, 3));
          obj.geometry.dispose(); obj.geometry = g;
        }
        setGeo(satPts, all); setGeo(twPts, tw);
        var iss = st.iss, iv = iss ? latLonToVec(iss.lat, iss.lon, 1 + Math.min(iss.altKm / R_KM, 1.2)) : null;
        setGeo(issPts, iv ? [iv.x, iv.y, iv.z] : []);
      }

      function updateTrail(selFl, nowMs) {
        var key = selFl ? selFl.id + ":" + selFl.t : "";
        if (key === lastSelTrail && !selFl) return;
        lastSelTrail = key;
        if (!selFl) { trailGeo.setAttribute("position", new T.Float32BufferAttribute([], 3)); return; }
        // short backwards great-circle-ish trail along the reverse heading (~500 km)
        var pts = [], cur = deadReckon(selFl, nowMs), back = ((selFl.hdg + 180) % 360) * DEG;
        for (var k = 0; k < 40; k++) {
          var d = (k * 500) / 40 / R_KM;
          var la = cur.lat + (d * Math.cos(back)) / DEG, lo = cur.lon + (d * Math.sin(back)) / DEG / Math.max(Math.cos(cur.lat * DEG), 0.05);
          var v = latLonToVec(la, lo, 1.012); pts.push(v.x, v.y, v.z);
        }
        trailGeo.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
      }

      var raf = 0, lastTrailAt = 0, lastOffsetAt = 0;
      function frame() {
        raf = requestAnimationFrame(frame);
        var nowMs = Date.now(), m = modeRef.current, lay = layersRef.current;
        var fst = Data.state.flights, sst = Data.state.sats;
        if (fst.rev !== lastFlightRev) { lastFlightRev = fst.rev; syncFlights(); }
        if (sst.rev !== lastSatRev) { lastSatRev = sst.rev; syncSats(); }
        if (Data.state.ships.rev !== lastShipRev) { lastShipRev = Data.state.ships.rev; syncShips(); }
        var oo = observerRef.current, oKey = oo.lat + "," + oo.lon;
        if (oKey !== lastObsKey) { lastObsKey = oKey; var ov = latLonToVec(oo.lat, oo.lon, 1.004); obsPts.geometry.dispose(); obsPts.geometry = new T.BufferGeometry(); obsPts.geometry.setAttribute("position", new T.Float32BufferAttribute([ov.x, ov.y, ov.z], 3)); }
        var pm = passMarkRef.current;
        if (pm && nowMs - (frame.lastPm || 0) > 500) { frame.lastPm = nowMs; var pv0 = latLonToVec(pm.lat, pm.lon, 1 + Math.min(pm.altKm / R_KM, 1.2)), pg = new T.BufferGeometry(); pg.setAttribute("position", new T.Float32BufferAttribute([pv0.x, pv0.y, pv0.z], 3)); passPts.geometry.dispose(); passPts.geometry = pg; }
        else if (!pm && frame.lastPm) { frame.lastPm = 0; passPts.geometry.dispose(); passPts.geometry = new T.BufferGeometry(); }
        if (nowMs - lastSunAt > 60000) { lastSunAt = nowMs; earthMat.uniforms.sunDir.value = sunDirection(new Date()); }

        // mode look
        var day = m === "DAY";
        renderer.toneMappingExposure = day ? 1.35 : m === "NVG" ? 1.1 : 0.95;
        ambient.intensity = day ? 0.85 : 0.35; sun.intensity = day ? 2.2 : 0.6;
        earthMat.uniforms.mode.value = day ? 0 : m === "NVG" ? 1 : 2;
        earthMat.uniforms.brightness.value = day ? 1.25 : 1;
        earthMat.uniforms.opacityNight.value = day ? 0.85 : 0.25;
        glowMat.uniforms.mode.value = m === "NVG" ? 1 : 0;
        var tint = m === "NVG" ? 0x4dff6a : m === "THERM" ? 0xffa040 : 0x9fe8ff;
        satMat.color.setHex(tint);

        satGroup.visible = lay.sats; flightGroup.visible = lay.flights; trailLine.visible = lay.flights; shipGroup.visible = lay.ships;

        // flights: dead-reckon, orient, scale
        var camLen = camera.position.length();
        var k = Math.max(0.08, Math.min(1.0, 0.08 + (camLen - 1) * 0.5)); // aircraft markers shrink as you zoom in
        var selFl = null, selPos = null;
        for (var id in meshes) {
          var e = meshes[id], fl = e.fl, p = deadReckon(fl, nowMs);
          var v = latLonToVec(p.lat, p.lon, 1.012);
          e.mesh.position.copy(v);
          tmpUp.copy(v).normalize();
          tmpEast.set(0, 1, 0).cross(tmpUp).normalize();
          tmpNorth.copy(tmpUp).cross(tmpEast).normalize();
          var hr = fl.hdg * DEG;
          tmpDir.set(0, 0, 0).addScaledVector(tmpEast, Math.sin(hr)).addScaledVector(tmpNorth, Math.cos(hr)).normalize();
          tmpTarget.copy(v).add(tmpDir);
          e.mesh.up.copy(tmpUp); e.mesh.lookAt(tmpTarget);
          var isSel = id === selRef.current;
          e.mesh.material = isSel ? selMat : flMat;
          var s = isSel ? k * 2.2 : k;
          e.mesh.scale.set(s, s, s);
          if (isSel) { selFl = fl; selPos = { lat: p.lat, lon: p.lon, v: v }; }
        }
        // ships: dead-reckon, orient, scale; remember the on-screen ones
        var selSh = null, selShPos = null, camN = camera.position.clone().normalize(), onScreen = 0, doCount = nowMs - lastCountAt > 500;
        var ks = Math.max(0.1, Math.min(1.0, 0.1 + (camLen - 1) * 0.5));
        if (lay.ships) for (var sid in shipMeshes) {
          var se = shipMeshes[sid], sh = se.sh, sp = deadReckon(sh, nowMs), sv = latLonToVec(sp.lat, sp.lon, 1.008);
          se.mesh.position.copy(sv);
          tmpUp.copy(sv).normalize(); tmpEast.set(0, 1, 0).cross(tmpUp).normalize(); tmpNorth.copy(tmpUp).cross(tmpEast).normalize();
          var shr = sh.hdg * DEG;
          tmpDir.set(0, 0, 0).addScaledVector(tmpEast, Math.sin(shr)).addScaledVector(tmpNorth, Math.cos(shr)).normalize();
          tmpTarget.copy(sv).add(tmpDir); se.mesh.up.copy(tmpUp); se.mesh.lookAt(tmpTarget);
          var isSelS = sid === selShipRef.current;
          se.mesh.material = isSelS ? shipSelMat : shipMats[se.cls];
          var ss2 = isSelS ? ks * 2.4 : ks; se.mesh.scale.set(ss2, ss2, ss2);
          if (isSelS) { selSh = sh; selShPos = { lat: sp.lat, lon: sp.lon, v: sv }; }
          if (doCount && tmpUp.dot(camN) > 1 / camLen - 0.02) { var q = sv.clone().project(camera); if (q.z < 1 && Math.abs(q.x) <= 1 && Math.abs(q.y) <= 1) onScreen++; }
        }
        if (doCount) { lastCountAt = nowMs; if (onScreen !== inViewRef.current) { inViewRef.current = onScreen; setInView(onScreen); } }
        if (nowMs - lastOffsetAt > 400) { lastOffsetAt = nowMs; applyViewOffset(); }
        if (nowMs - lastTrailAt > 1000) { lastTrailAt = nowMs; lastSelTrail = ""; updateTrail(selFl, nowMs); }

        // camera focus / follow
        var fk = focusRef.current;
        if (fk) {
          var tl = null, tdist = camLen;
          if (fk.kind === "point") { tl = fk; tdist = fk.dist; }
          else if (fk.kind === "flight") {
            var ee = meshes[fk.id]; if (ee) tl = deadReckon(ee.fl, nowMs);
          } else if (fk.kind === "ship") {
            var se2 = shipMeshes[fk.id]; if (se2) { tl = deadReckon(se2.sh, nowMs); tdist = Math.max(1.2, Math.min(camLen, 1.7)); }
          } else if (fk.kind === "iss" && sst.iss) { tl = sst.iss; tdist = Math.max(1.6, Math.min(camLen, 2.6)); }
          if (tl) {
            var dir = latLonToVec(tl.lat, tl.lon, 1).normalize(), cur = camera.position.clone().normalize();
            cur.lerp(dir, 0.1).normalize();
            var nd = camLen + (tdist - camLen) * 0.1;
            camera.position.copy(cur.multiplyScalar(nd));
            if (fk.kind === "point" && Math.abs(nd - tdist) < 0.01 && camera.position.clone().normalize().distanceTo(dir) < 0.004) focusRef.current = null;
          }
        }
        controls.update();

        // selected-aircraft reticle (screen space)
        var ret = reticleRef.current;
        if (ret) {
          if (selPos && lay.flights) {
            var pr = selPos.v.clone().project(camera);
            var facing = selPos.v.clone().normalize().dot(camera.position.clone().normalize()) > 1 / camera.position.length() - 0.02;
            if (facing && pr.z < 1) {
              ret.style.display = "block";
              ret.style.transform = "translate(" + ((pr.x * 0.5 + 0.5) * root.clientWidth) + "px," + ((-pr.y * 0.5 + 0.5) * root.clientHeight) + "px)";
            } else ret.style.display = "none";
          } else ret.style.display = "none";
        }

        var ret2 = reticle2Ref.current;
        if (ret2) {
          if (selShPos && lay.ships) {
            var pr2 = selShPos.v.clone().project(camera);
            var facing2 = selShPos.v.clone().normalize().dot(camera.position.clone().normalize()) > 1 / camera.position.length() - 0.02;
            if (facing2 && pr2.z < 1) { ret2.style.display = "block"; ret2.style.transform = "translate(" + ((pr2.x * 0.5 + 0.5) * root.clientWidth) + "px," + ((-pr2.y * 0.5 + 0.5) * root.clientHeight) + "px)"; }
            else ret2.style.display = "none";
          } else ret2.style.display = "none";
        }

        // view readout ~4 Hz
        if (nowMs - lastViewAt > 400) {
          lastViewAt = nowMs;
          var ll = vecToLatLon(camera.position);
          setView(function (o) { return Math.abs(o.lat - ll.lat) < 0.01 && Math.abs(o.lon - ll.lon) < 0.01 && Math.abs(o.altKm - (camLen - 1) * R_KM) < 5 ? o : { lat: ll.lat, lon: ll.lon, altKm: (camLen - 1) * R_KM }; });
        }
        renderer.render(scene, camera);
      }
      frame();

      // tap / click an aircraft or ship to select it (ignores drags)
      var downAt = null;
      function onDown(e) { downAt = { x: e.clientX, y: e.clientY, t: Date.now() }; }
      function onUp(e) {
        if (!downAt) return; var d = downAt; downAt = null;
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8 || Date.now() - d.t > 500) return;
        var rect = canvas.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top, best = null, bestD = 28;
        var camN2 = camera.position.clone().normalize(), cl = camera.position.length(), nowMs2 = Date.now(), lay2 = layersRef.current;
        function consider(kind, id, lat, lon, r) {
          var v = latLonToVec(lat, lon, r); if (v.clone().normalize().dot(camN2) <= 1 / cl - 0.02) return;
          var q = v.project(camera); if (q.z >= 1) return;
          var dd = Math.hypot((q.x * 0.5 + 0.5) * rect.width - mx, (-q.y * 0.5 + 0.5) * rect.height - my);
          if (dd < bestD) { bestD = dd; best = { kind: kind, id: id }; }
        }
        if (lay2.flights) for (var fid in meshes) { var pf = deadReckon(meshes[fid].fl, nowMs2); consider("flight", fid, pf.lat, pf.lon, 1.012); }
        if (lay2.ships) for (var sid2 in shipMeshes) { var ps = deadReckon(shipMeshes[sid2].sh, nowMs2); consider("ship", sid2, ps.lat, ps.lon, 1.008); }
        if (best) { if (best.kind === "ship") actionsRef.current.selectShip(best.id, false); else actionsRef.current.selectFlight(best.id, false); }
      }
      canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointerup", onUp);

      api.current = { camera: camera, controls: controls, renderer: renderer };
      return function () {
        cancelAnimationFrame(raf);
        canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointerup", onUp);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
        controls.dispose(); renderer.dispose();
      };
    }, []);

    /* ---- render ---- */
    function badge(label, feed) {
      var st = feed.status;
      var txt = st === "live" ? "LIVE" : st === "demo" ? "DEMO DATA" : "LOADING";
      return h("span", { className: cx("ge-badge", "ge-badge-" + st), title: label + ": " + (feed.error || (st === "live" ? "live" : "loading")) },
        h("i", { className: "ge-dot" }), h("b", null, label), " ", txt);
    }
    var over = sats.over;
    var iss = sats.iss;
    /* ---- dock panels (one open at a time; tab strip at the bottom, next to the thumb) ---- */
    function row(k, v) { return h("div", { key: k }, h("dt", null, k), h("dd", null, v)); }
    function toggleBtn(label, on, onClick, key) {
      return h("button", { key: key || label, type: "button", className: cx("ge-btn", "ge-wide", on && "is-on"), "aria-pressed": !!on, onClick: onClick }, label);
    }

    function flightsBody() {
      return [
        flights.status === "demo" && h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — OpenSky unreachable (" + (flights.error || "?") + "). Retrying…"),
        selected ? [
          h("div", { className: "ge-pick", key: "pick" },
            h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous aircraft", onClick: function () { cycle(-1); } }, "‹"),
            h("div", { className: "ge-pick-mid" },
              h("b", { className: "ge-cs" }, selected.callsign),
              h("small", null, (selIdx + 1) + " / " + list.length + (selected.country ? " · " + selected.country : ""))),
            h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next aircraft", onClick: function () { cycle(1); } }, "›")),
          h("dl", { className: "ge-grid", key: "grid" },
            [["ALT", selected.altFt != null ? fmtN(selected.altFt) + " ft" : "--"],
             ["SPD", selected.speedKt != null ? fmtN(selected.speedKt) + " kt" : "--"],
             ["HDG", Math.round(selected.hdg) + "°"],
             ["V/S", selected.vrFpm != null ? fmtN(selected.vrFpm) + " fpm" : "--"]].map(function (kv) { return row(kv[0], kv[1]); })),
          h("button", { key: "follow", type: "button", className: cx("ge-btn", "ge-wide", follow && "is-on"), "aria-pressed": follow, onClick: toggleFollow }, follow ? "● FOLLOWING" : "FOLLOW AIRCRAFT"),
        ] : h("p", { key: "n", className: "ge-note" }, flights.status === "loading" ? "Contacting OpenSky…" : "NO AIRCRAFT IN RANGE"),
        h("p", { key: "s", className: "ge-src" }, "OpenSky Network · updated " + ago(flights.updated) + " ago"),
      ];
    }

    function shipsBody() {
      var bits = [];
      if (ships.status === "demo") bits.push(h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — no live AIS (" + (ships.error || "?") + "). Demo ships follow real shipping lanes; retrying…"));
      if (ships.status === "loading") bits.push(h("p", { key: "l", className: "ge-note" }, ships.note || "Contacting AIS relay…"));
      bits.push(h("div", { key: "cnt", className: "ge-iss" },
        h("div", null, h("b", null, fmtN(inView) + " IN VIEW"), h("small", null, fmtN(ships.count) + " TRACKED AROUND TAIWAN" + (ships.note ? " · " + ships.note : ""))),
        ccgList.length ? h("button", { type: "button", className: "ge-btn ge-small ge-ccg", onClick: function () { cycleShip(1, true); } }, "⚠ CCG " + ccgList.length) : null));
      if (selShip) {
        bits.push(h("div", { className: "ge-pick", key: "pick" },
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous ship", onClick: function () { cycleShip(-1); } }, "‹"),
          h("div", { className: "ge-pick-mid" },
            h("b", { className: "ge-cs", style: { color: SHIP_CSS[selShip.cls] } }, selShip.name),
            h("small", null, "MMSI " + selShip.mmsi + " · " + selShip.typeLabel)),
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next ship", onClick: function () { cycleShip(1); } }, "›")));
        bits.push(h("dl", { className: "ge-grid", key: "grid" },
          [["SPD", selShip.sogKt != null ? selShip.sogKt.toFixed(1) + " kn" : "--"],
           ["CRS", selShip.cog != null ? Math.round(selShip.cog) + "°" : selShip.hdg ? Math.round(selShip.hdg) + "°" : "--"],
           ["DEST", selShip.dest || "--"],
           ["AGE", ago(selShip.t)]].map(function (kv) { return row(kv[0], kv[1]); })));
        bits.push(h("p", { key: "pos", className: "ge-note" }, fmtLL(selShip.lat, selShip.lon) + (selShip.ccg ? " · China Coast Guard guess from AIS name/type/MMSI — not an official identification" : "")));
        bits.push(h("button", { key: "follow", type: "button", className: cx("ge-btn", "ge-wide", sFollow && "is-on"), "aria-pressed": sFollow, onClick: toggleShipFollow }, sFollow ? "● FOLLOWING" : "FOLLOW SHIP"));
      } else {
        bits.push(h("div", { className: "ge-pick", key: "pick0" },
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Previous ship", onClick: function () { cycleShip(-1); } }, "‹"),
          h("div", { className: "ge-pick-mid" }, h("small", { className: "ge-hint" }, sList.length ? "TAP A SHIP ON THE GLOBE, USE ‹ ›, OR SEARCH NAME / MMSI" : ships.status === "loading" ? "WAITING FOR AIS…" : "NO VESSELS RECEIVED YET")),
          h("button", { type: "button", className: "ge-btn ge-sq", "aria-label": "Next ship", onClick: function () { cycleShip(1); } }, "›")));
      }
      bits.push(h("div", { key: "legend", className: "ge-legend" }, [["cargo", "CARGO"], ["tanker", "TANKER"], ["pax", "PAX"], ["fish", "FISHING"], ["other", "OTHER"], ["ccg", "CCG?"]].map(function (c) {
        return h("span", { key: c[0] }, h("i", { style: { background: SHIP_CSS[c[0]] } }), c[1]);
      })));
      bits.push(h("p", { key: "src", className: "ge-src" }, "AIS: aisstream.io, relayed by own Cloudflare Worker · updated " + ago(ships.updated) + " ago · not for navigation"));
      return bits;
    }

    function satsBody() {
      return [
        sats.status === "demo" && h("p", { key: "w", className: "ge-note ge-warn" }, "DEMO DATA — CelesTrak unreachable (" + (sats.error || "?") + ")."),
        iss && h("div", { key: "iss", className: "ge-iss" },
          h("div", null, h("b", { className: "ge-red" }, iss.name), h("small", null, fmtLL(iss.lat, iss.lon) + " · " + fmtN(iss.altKm) + " km" + (iss.velKmS ? " · " + iss.velKmS.toFixed(2) + " km/s" : ""))),
          h("button", { type: "button", className: "ge-btn ge-small", onClick: trackIss }, "TRACK ISS")),
        h("ul", { key: "ul", className: "ge-list" },
          over.length ? over.slice(0, 40).map(function (o) {
            return h("li", { key: o.i }, h("button", { type: "button", className: "ge-li", onClick: function () { setPlace(""); setFollow(false); flyTo(o.lat, o.lon, 1.7); } },
              h("span", null, o.name), h("small", null, fmtN(o.altKm) + " km")));
          }) : h("li", { className: "ge-note" }, "none overhead right now")),
        h("p", { key: "s", className: "ge-src" }, "CelesTrak " + (sats.group || "") + " TLE · satellite.js SGP4" + (sats.tleAgeMin != null ? " · TLE age " + sats.tleAgeMin + "m" : "")),
      ];
    }

    function passesBody() {
      var bits = [];
      var nowD = new Date();
      bits.push(h("div", { key: "obs", className: "ge-iss" },
        h("div", null, h("b", { className: "ge-lime" }, "📍 " + observer.label), h("small", null, fmtLL(observer.lat, observer.lon) + " · next 72 h")),
        h("button", { type: "button", className: "ge-btn ge-small", onClick: useMyLocation }, "MY LOCATION")));
      bits.push(h("div", { key: "obsbtns", className: "ge-two" },
        h("button", { type: "button", className: cx("ge-btn", editObs && "is-on"), onClick: function () { setEditObs(!editObs); } }, "SET LAT,LON"),
        h("button", { type: "button", className: "ge-btn", onClick: resetObserver, disabled: observer.src === "default" }, "RESET: TAIPEI")));
      if (editObs) bits.push(h("form", { key: "man", className: "ge-search ge-manual", onSubmit: submitManual },
        h("input", { type: "text", inputMode: "decimal", autoComplete: "off", value: manual, onChange: function (e) { setManual(e.target.value); }, placeholder: "25.03,121.56", "aria-label": "Observer latitude, longitude" }),
        h("button", { type: "submit", className: "ge-btn ge-go" }, "SET")));
      if (passes.status === "loading" && !passes.list.length) bits.push(h("p", { key: "ld", className: "ge-note" }, "Computing passes (SGP4)…"));
      if (passes.status === "error") bits.push(h("div", { key: "er", className: "ge-iss" }, h("p", { className: "ge-note ge-warn" }, "PASS PREDICTION UNAVAILABLE — " + passes.error), h("button", { type: "button", className: "ge-btn ge-small", onClick: recomputePasses }, "RETRY")));

      if (selPass && look) {
        var above = look.el > 0, rot = look.az - (heading || 0);
        bits.push(h("div", { key: "look", className: "ge-look" },
          h("div", { className: "ge-dial", "aria-hidden": true },
            h("i", { className: "ge-dial-n", style: { transform: "rotate(" + (-(heading || 0)) + "deg)" } }, "N"),
            h("i", { className: cx("ge-dial-arrow", !above && "is-below"), style: { transform: "rotate(" + rot + "deg)" } })),
          h("div", { className: "ge-look-txt" },
            h("b", { className: above ? "ge-lime" : "ge-dim" }, above ? "LOOK " + window.GodsEyePasses.compass(look.az) + " · " + Math.round(look.az) + "°" : "BELOW HORIZON"),
            h("span", null, "ELEV " + Math.round(look.el) + "° · " + fmtN(look.rangeKm) + " km"),
            h("small", null, above ? (look.sunlit ? "sunlit" : "in Earth's shadow") + " · sky sun " + Math.round(look.sunEl) + "°" : "rises " + hm(selPass.start) + " " + selPass.startDir + " (in " + inMin(Math.max(0, selPass.start - nowD)) + ")")),
          h("div", { className: "ge-look-btns" },
            h("button", { type: "button", className: cx("ge-btn", "ge-small", compassOn && "is-on"), onClick: toggleCompass }, "COMPASS"),
            h("button", { type: "button", className: "ge-btn ge-small", onClick: function () { setSelPassKey(null); } }, "CLEAR"))));
      }

      if (passes.list.length) bits.push(h("ul", { key: "pl", className: "ge-list ge-passes" }, passes.list.map(function (p) {
        var on = selPassKey === p.key, live = p.start <= nowD && p.end >= nowD;
        return h("li", { key: p.key }, h("button", { type: "button", className: cx("ge-li", "ge-pass", on && "is-on"), "aria-pressed": on, onClick: function () { setSelPassKey(on ? null : p.key); } },
          h("span", { className: "ge-pass-main" },
            h("b", null, shortName(p.name)), " ", dayHm(p.start) + "–" + hm(p.end) + (live ? " · NOW" : ""),
            h("small", null, "peak " + hm(p.peak) + " " + Math.round(p.maxEl) + "° · " + p.startDir + " → " + p.endDir + " · " + fmtDur(p.durSec))),
          h("em", { className: p.visible ? "ge-vis" : "ge-novis" }, p.visible ? "VISIBLE" : p.why || "—")));
      })));
      else if (passes.status === "ready") bits.push(h("p", { key: "none", className: "ge-note" }, "No passes in the next 72 h for this location."));

      bits.push(pushIssActive
        ? h("p", { key: "ntf", className: "ge-note" }, "🔔 ISS pass alerts are delivered by Web Push (Alerts tab) even when this page is closed.")
        : h("button", { key: "ntf", type: "button", className: cx("ge-btn", "ge-wide", notifyOn && "is-on"), "aria-pressed": notifyOn, onClick: function () { setNotify(!notifyOn); } }, notifyOn ? "🔔 NOTIFY 5 MIN BEFORE: ON (KEEP PAGE OPEN)" : "🔔 NOTIFY ME 5 MIN BEFORE A PASS"));
      bits.push(h("p", { key: "src", className: "ge-src" }, "CelesTrak TLE (stations + visual groups" + (passes.ageMin != null ? ", age " + passes.ageMin + "m" : "") + ") · satellite.js SGP4 · VISIBLE = max ≥10°, sunlit, observer sun ≤ −6°. ISS & Tiangong always listed; HST/AJISAI/TERRA/AQUA/ENVISAT/ALOS only when visible. Predictions, not guarantees."));
      return bits;
    }

    function alertsBody() {
      var bits = [], pi = pushInfo, srv = pi && pi.server, enabled = srv && srv.enabled;
      var sub = !!(pi && pi.subscribed);
      if (!pi) return [h("p", { key: "l", className: "ge-note" }, "Checking push support…")];
      if (!pi.supported) bits.push(h("p", { key: "u", className: "ge-note ge-warn" }, pi.ios ? "iPhone / iPad: Web Push works only after Share → “Add to Home Screen” (iOS/iPadOS 16.4+), then open God's Eye from the Home Screen icon." : "This browser does not support Web Push."));
      else if (pi.ios && !pi.standalone) bits.push(h("p", { key: "i", className: "ge-note ge-warn" }, "On iPhone, open this app from its Home Screen icon (Share → Add to Home Screen, iOS 16.4+) — push is not available in a normal Safari tab."));
      if (!enabled) bits.push(h("p", { key: "c", className: "ge-note ge-warn" }, "PUSH NOT ACTIVE ON THE SERVER YET — " + ((srv && srv.reason) || "the Worker has no VAPID keys / KV configured") + ". The toggles below work once it is deployed."));
      if (pi.permission === "denied") bits.push(h("p", { key: "d", className: "ge-note ge-warn" }, "Notifications are blocked for this site in your browser settings."));
      bits.push(h("p", { key: "h", className: "ge-note" }, "Get notified even when the page is closed:"));
      bits.push(toggleBtn("🌏 EARTHQUAKE M4.5+ NEAR TAIWAN (USGS)", pushPrefs.quake, function () { togglePref("quake"); }, "q"));
      bits.push(toggleBtn("⚓ CHINA COAST GUARD VESSEL IN LIVE AIS (HEURISTIC)", pushPrefs.ccg, function () { togglePref("ccg"); }, "c2"));
      bits.push(toggleBtn("🛰️ ISS PASS ~5 MIN BEFORE (" + observer.label + ")", pushPrefs.iss, function () { togglePref("iss"); }, "i2"));
      bits.push(h("div", { key: "act", className: "ge-two" },
        !sub ? h("button", { type: "button", className: "ge-btn is-on", disabled: pushBusy || !pi.supported, onClick: function () { pushAction("on"); } }, pushBusy ? "…" : "ENABLE ALERTS")
             : h("button", { type: "button", className: "ge-btn", disabled: pushBusy, onClick: function () { pushAction("test"); } }, "SEND TEST"),
        sub ? h("button", { type: "button", className: "ge-btn", disabled: pushBusy, onClick: function () { pushAction("off"); } }, "TURN OFF") : h("button", { type: "button", className: "ge-btn", disabled: true }, "NOT SUBSCRIBED")));
      if (pushMsg) bits.push(h("p", { key: "m", className: "ge-note ge-lime", role: "status" }, pushMsg));
      bits.push(h("p", { key: "p", className: "ge-src" }, "Privacy: ISS alerts store your location rounded to ~1 km on the Worker (Cloudflare KV) — only if the ISS toggle is on; the push endpoint is deleted when you turn alerts off. CCG detection is a name/type/MMSI heuristic on public AIS, not an official identification. Alerts are best-effort, not safety-critical."));
      return bits;
    }

    var TABS = [
      { id: "hud", label: "FLIGHTS", sum: fmtN(flights.count), body: flightsBody },
      { id: "ships", label: "SHIPS", sum: fmtN(ships.count), body: shipsBody },
      { id: "sats", label: "SATS", sum: String(over.length), body: satsBody },
      { id: "passes", label: "PASSES", sum: (function () { var n = passes.list.find(function (p) { return p.end > Date.now(); }); return n ? hm(n.start) : "—"; })(), body: passesBody },
      { id: "alerts", label: "ALERTS", sum: pushInfo && pushInfo.subscribed ? "ON" : "OFF", body: alertsBody },
    ];
    var curTab = TABS.find(function (t) { return t.id === tab; });

    var demoAny = flights.status === "demo" || sats.status === "demo" || ships.status === "demo";

    return h("div", { className: "ge-root", ref: rootRef },
      h("canvas", { className: "ge-canvas", ref: canvasRef, "aria-label": "3D globe" }),
      h("div", { className: "ge-vignette" }),
      h("div", { className: "ge-reticle", ref: reticleRef }, h("i", null), h("i", null), h("i", null), h("i", null)),
      h("div", { className: "ge-reticle ge-reticle-ship", ref: reticle2Ref }, h("i", null), h("i", null), h("i", null), h("i", null)),

      h("div", { className: "ge-ui" },
        h("header", { className: "ge-top" },
          h("div", { className: "ge-tag" },
            h("b", { className: "ge-lime" }, "OPEN DATA"), h("span", { className: "ge-dim" }, "//"),
            h("span", null, "PUBLIC FEEDS"), h("span", { className: "ge-dim" }, "//"),
            h("b", { className: "ge-cyan" }, "DEMO UI")),
          h("div", { className: "ge-title" }, "GOD'S EYE VIEW // ORB-7")),

        h("div", { className: "ge-bar" },
          h("div", { className: "ge-stats", "aria-live": "polite" },
            h("span", null, h("i", { className: "ge-dot ge-lime-bg" }), "SATS ", h("b", null, fmtN(sats.total))),
            h("span", null, "OVER TW ", h("b", null, fmtN(over.length))),
            h("span", null, "FLIGHTS ", h("b", null, fmtN(flights.count))),
            h("span", null, "SHIPS ", h("b", null, fmtN(ships.count)))),
          h("div", { className: "ge-badges" }, badge("FLT", flights), badge("AIS", ships), badge("SAT", sats)),
          h("div", { className: "ge-modes", role: "group", "aria-label": "Display mode" },
            ["DAY", "NVG", "THERM"].map(function (q) {
              return h("button", {
                key: q, type: "button", "data-mode": q, "data-active": mode === q, "aria-pressed": mode === q,
                className: cx("ge-btn", "ge-mode", mode === q && "is-on"),
                onClick: function () { setMode(q); },
              }, q);
            }))),

        h("div", { className: "ge-mid" },
          h("div", { className: "ge-tools" },
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.sats && "is-on"), "aria-pressed": layers.sats, "aria-label": "Toggle satellites", title: "Satellites", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { sats: !l.sats }); }); } }, h(ICON.Satellite, { size: 18 })),
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.ships && "is-on"), "aria-pressed": layers.ships, "aria-label": "Toggle ships", title: "Ships", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { ships: !l.ships }); }); } }, h(ShipIcon, { size: 18 })),
            h("button", { type: "button", className: cx("ge-btn", "ge-tool", layers.flights && "is-on"), "aria-pressed": layers.flights, "aria-label": "Toggle flights", title: "Flights", onClick: function () { setLayers(function (l) { return Object.assign({}, l, { flights: !l.flights }); }); } }, h(ICON.Plane, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom in", onClick: function () { zoom(1); } }, h(ICON.Plus, { size: 18 })),
            h("button", { type: "button", className: "ge-btn ge-tool", "aria-label": "Zoom out", onClick: function () { zoom(-1); } }, h(ICON.Minus, { size: 18 }))),
          h("div", { className: "ge-view" }, "VIEW " + fmtLL(view.lat, view.lon) + " // ALT " + fmtN(view.altKm) + " km"),

          h("div", { className: "ge-dock" },
            h("section", { className: cx("ge-panel", curTab && "is-open") },
              curTab && h("div", { className: "ge-panel-body", role: "tabpanel", id: "ge-tabpanel" }, curTab.body()),
              h("div", { className: "ge-tabs", role: "tablist", "aria-label": "Panels" },
                TABS.map(function (t) {
                  return h("button", { key: t.id, type: "button", role: "tab", "aria-selected": tab === t.id, "aria-controls": "ge-tabpanel", className: cx("ge-tab", tab === t.id && "is-on"), onClick: function () { setTab(tab === t.id ? null : t.id); } },
                    h("b", null, t.label), h("small", null, t.sum));
                }))))
        ),

        h("nav", { className: "ge-chips", "aria-label": "Locations" },
          ["t101", "tpe", "taiwan"].map(function (k) {
            return h("button", { key: k, type: "button", className: cx("ge-btn", "ge-chip", place === k && "is-on"), onClick: function () { goPlace(k); } }, PLACES[k].label);
          })),
        h("form", { className: "ge-search", onSubmit: runSearch, role: "search" },
          h("span", { className: "ge-search-ico", "aria-hidden": true }, h(ICON.Search, { size: 14 })),
          h("input", { type: "search", enterKeyHint: "search", autoComplete: "off", autoCapitalize: "characters", spellCheck: false, value: query, onChange: function (e) { setQuery(e.target.value); }, placeholder: "FLIGHT / SHIP / SAT / LAT,LON", "aria-label": "Search flight, ship name or MMSI, satellite or coordinates" }),
          h("button", { type: "submit", className: "ge-btn ge-go" }, "GO")),
        h("footer", { className: "ge-credit" },
          "DATA: ", h("a", { href: "https://opensky-network.org", target: "_blank", rel: "noopener noreferrer" }, "OpenSky Network"), " · ",
          h("a", { href: "https://aisstream.io", target: "_blank", rel: "noopener noreferrer" }, "aisstream.io"), " · ",
          h("a", { href: "https://celestrak.org", target: "_blank", rel: "noopener noreferrer" }, "CelesTrak"), " · ",
          h("a", { href: "https://earthquake.usgs.gov", target: "_blank", rel: "noopener noreferrer" }, "USGS"), " · ",
          h("a", { href: "https://github.com/shashwatak/satellite-js", target: "_blank", rel: "noopener noreferrer" }, "satellite.js"),
          demoAny && h("b", { className: "ge-amber" }, " · DEMO DATA ACTIVE"))),
      toast && h("div", { className: "ge-toast", role: "status" }, toast));
  }

  createRoot(document.getElementById("root")).render(h(React.StrictMode, null, h(App)));
})();

})();
