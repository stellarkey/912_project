define("appmsg/wxtopic.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","appmsg/topic_tpl.html.js"],function(t){
"use strict";
function e(t){
t.parentNode.removeChild(t);
}
function i(t,e){
var i=c;
e.img_url||(e.img_url=topic_default_img);
for(var o in e){
var a=new RegExp("{"+o+"}","g");
i=i.replace(a,e[o]);
}
var p=document.createElement("span");
p.className="db topic_area",p.innerHTML=i,t.parentNode.insertBefore(p,t),t.parentNode.removeChild(t),
r.tap(p,function(){
var e=location.protocol+"//mp.weixin.qq.com/mp/topic?action=topic_detail_page&topic_id="+t.getAttribute("data-topic-id")+"&topic_type="+t.getAttribute("data-topic-type")+"&sn="+t.getAttribute("data-topic-sn")+"&scene=101#wechat_redirect";
n.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t&&-1!==t.err_msg.indexOf(":ok")||(location.href=e);
});
});
}
function o(t){
var o={
topic_id:t.getAttribute("data-topic-id"),
topic_type:t.getAttribute("data-topic-type"),
sn:t.getAttribute("data-topic-sn"),
biz:biz
};
p({
url:"/mp/topic?action=get_topic_info",
type:"post",
data:o,
success:function(o){
if(console.log(o),o=JSON.parse(o),0!=o.base_resp.ret)return void e(t);
var a={
title:o.title,
author:o.author||(o.leading_actor?o.leading_actor.replace(/\$\$/g," / "):"-"),
img_url:o.img_url,
msg_num:o.msg_num
};
i(t,a);
},
error:function(){
e(t);
}
});
}
function a(){
var t=document.getElementsByTagName("wxtopic");
t[0]&&o(t[0]);
}
var p=t("biz_wap/utils/ajax.js"),n=t("biz_wap/jsapi/core.js"),r=t("biz_common/dom/event.js"),c=t("appmsg/topic_tpl.html.js");
a();
});define("question_answer/appmsg.js",["biz_common/utils/string/html.js","question_answer/appmsg_tpl.html.js","biz_wap/utils/ajax.js","question_answer/utils.js","biz_common/dom/event.js","biz_common/tmpl.js","pages/utils.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var a=t("question_answer/appmsg_tpl.html.js"),e=t("biz_wap/utils/ajax.js"),n=t("question_answer/utils.js"),i=t("biz_common/dom/event.js"),s=t("biz_common/tmpl.js"),r=t("pages/utils.js"),o={
data:{},
batchGetQuestionParam:null,
retry:1
},l=function(t){
return document.getElementById(t);
},u=function(){
var t=l("js_content");
if(!t)return!1;
for(var a=t.getElementsByTagName("mp-question")||[],e=0,n=a.length;n>e;e++){
var i=a[e],s=i.getAttribute("data-mid"),r=i.getAttribute("data-idx"),u=window.biz+"_"+s+"_"+r;
o.data[u]?o.data[u].invisibleElems.push(i):o.data[u]={
invisibleElems:[i],
dataStatus:1
};
}
return 0===a.length?!1:!0;
},m=function(){
if(o.batchGetQuestionParam)return o.batchGetQuestionParam;
var t={
num:0,
__biz:window.biz
};
for(var a in o.data)if(Object.prototype.hasOwnProperty.call(o.data,a)){
var e=a.split("_");
t["mid"+t.num]=e[1],t["idx"+t.num]=e[2],t.num++;
}
return o.batchGetQuestionParam=t,o.batchGetQuestionParam;
},d=function(t){
n.bindReviewImageEvent({
container:t.dom,
filterClass:n.classPrefix+"preview_js",
imgsSrc:t.imgsSrc
});
},c=function(t){
var a="."+n.classPrefix;
t.allQuestionImg&&t.allQuestionImg.length>0&&i.on(t.dom,"tap",a+"showimg_js",function(){
return n.reviewImage({
curUrl:t.allQuestionImg[0],
imgsSrc:t.allQuestionImg
}),!1;
}),t.allAnswerImg&&t.allAnswerImg.length>0&&d({
dom:t.dom,
imgsSrc:t.allAnswerImg
}),i.on(t.dom,"tap",a+"show_detail_js",function(t){
var a=t.delegatedTarget,e=a.getAttribute("data-key");
r.jumpUrl(o.data[e].question_page_url,!0);
});
},g=function(t){
o.data[t.key]&&o.data[t.key].invisibleElems&&1*o.data[t.key].dataStatus!==1&&!function(){
var e=t.data||{};
e.dataStatus=o.data[t.key].dataStatus;
var n=o.data[t.key].invisibleElems.map(function(t){
var n=document.createElement("div");
return n.innerHTML=s.tmpl(a,e,!0),t.parentNode.insertBefore(n.firstChild,t.nextsibling);
});
o.data[t.key].invisibleElems=null,n.length>0&&1*o.data[t.key].dataStatus===2&&n.forEach(function(a){
c({
dom:a,
allQuestionImg:t.data.allQuestionImg,
allAnswerImg:t.data.allAnswerImg
});
});
}();
},_=function(){},p=function f(){
e({
url:"/mp/qa?action=batch_get_question&__biz="+window.biz,
type:"POST",
dataType:"json",
data:m(),
async:!0,
success:function(t){
t&&t.base_resp&&1*t.base_resp.ret===0&&"[object Array]"===Object.prototype.toString.call(t.question_list)?(t.question_list.forEach(function(t){
var a=window.biz+"_"+t.appmsgid+"_"+t.idx;
if(o.data[a]&&o.data[a].invisibleElems){
var e=n.formatQuestionInfo(t);
e.dataKey=a,o.data[a].qa_id=e.qa_id,o.data[a].allImg=e.allImg,o.data[a].question_page_url=e.question_page_url,
o.data[a].dataStatus=2,g({
data:e,
key:a
});
}
}),_(4)):_(3);
},
error:function(){
o.retry?(o.retry--,f()):_(3);
}
});
},b=function(){
u()&&p();
};
b();
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js","common/utils.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024);
}
function n(e,t,n,o,i,a,p){
_({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:o||0,
weapp_nickname:n||0,
type:i||0,
scene:window.source||-1,
weapp_type:a,
is_confirm:p||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function o(){
var e=s("js_content");
if(!e)return!1;
b=e.getElementsByTagName("mp-weapp")||[],I=e.getElementsByTagName("mp-miniprogram")||[],
j=[];
for(var t=e.getElementsByTagName("a"),n=0,o=t.length;o>n;n++){
var i=t[n],a=i.getAttribute("data-miniprogram-appid");
a&&j.push(i);
}
return b.length<=0&&I.length<=0&&0==j.length?!1:E&&0!=E.length?!0:!1;
}
function i(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function a(e,t,o,i,a){
n(e,t,o,i,4,a),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function p(e,t,o,i,a){
n(e,t,o,i,5,a);
}
function r(){
function e(e){
e&&(d=setTimeout(function(){
e.style.display="none",s=-1;
},100));
}
window.reportWeappid=[];
for(var o=0;o<E.length;o++)window.reportWeappid.push(E[o].appid);
var r=function(){};
g.on(document.getElementById("js_minipro_dialog_ok"),"click",function(){
r&&r(),document.getElementById("js_minipro_dialog").style.display="none";
}),g.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(){
var e=document.getElementById("js_minipro_dialog");
e.style.display="none",n(e._appid,e._i,e._nickname,e._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116);
});
var d,s,_=!y.canJumpOnTap||y.isNonWechat,b=document.getElementById("js_pc_weapp_code"),I=document.getElementById("js_pc_weapp_code_img"),j=document.getElementById("js_pc_weapp_code_des");
_&&(g.on(b,"mouseenter",function(){
clearTimeout(d);
}),g.on(b,"mouseleave",function(){
e(b);
})),y.getAppidInfo({
onSuccess:function(k){
console.log("WeappCommon.getAppidInfo onsuccess");
var E=k.data.infoMap;
if(E){
for(o=0;o<C.length;o++)(function(o){
window.__addIdKeyReport("111535",1);
var v=C[o].appid,k=C[o].path,x=C[o].imageUrl,R=C[o].title,T=C[o].elem,B=E[v];
if(B){
var K=T.tagName.toLowerCase(),z=T.firstChild&&1==T.firstChild.nodeType&&"IMG"===T.firstChild.tagName;
if(z=z||T.firstElementChild&&"IMG"===T.firstElementChild.tagName,"a"!=K)T.innerHTML=w.tmpl(f,{
imageUrl:i(x),
title:i(R),
nickname:i(B.nickname),
avatar:i(B.logo_url)
});else{
if(z){
var A=T.firstChild;
A&&h.addClass(T,"weapp_image_link");
}else h.addClass(T,"weapp_text_link");
T.setAttribute("href","");
}
g.on(T,"tap",function(){
if(r=function(){
var e=z?1:"a"==K?2:0;
return y.jumpUrl({
sceneNote:encodeURIComponent(location.href),
appid:v,
path:k,
scene:1058,
beforeNonWechatWarn:function(){
p(v,o,B.nickname,R,e);
},
beforeJumpBackupPage:function(){
a(v,o,B.nickname,R,e);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(v,o,B.nickname,R,3,e,z?2:0),
z&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},z&&wxa_img_alert){
document.getElementById("js_minipro_dialog_name").innerText=B.nickname;
var e=document.getElementById("js_minipro_dialog");
return r(),e._appid=v,e._i=o,e._nickname=B.nickname,e._title=R,n(v,o,B.nickname,R,3,1,0),
y.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),!1;
}
return r();
},"a"==K),_&&(g.on(T,"mouseenter",function(){
function e(e){
function t(){
if(!g&&s===o){
b.style.display="block",g=!0;
var e=b.offsetHeight,t=b.offsetWidth;
"a"!=K||z?n>t?(c(b,"right-center"),b.style.left=n-t-_+"px",b.style.top=i+"px"):(c(b),
b.style.top=i+f-e-_+"px",b.style.left=n+d-t-_+"px"):(b.style.left=a>n+d/2-t/2?a+"px":n+d/2+t/2>a+p?a+p-t+"px":n+d/2-t/2+"px",
r>e?(c(b,"down-center"),b.style.top=i-e-_+"px"):(c(b,"up-center"),b.style.top=i+f-_+"px"));
}
}
if(e){
var n=l(T),i=m(z?T.firstElementChild:T),a=l(T.parentNode),p=T.parentNode.offsetWidth,r=T.getBoundingClientRect().top,d=z?T.firstElementChild.offsetWidth:T.offsetWidth,f=z?T.firstElementChild.offsetHeight:T.offsetHeight,_=8,g=!1;
j.innerText=u(B.nickname,48),I.onload=t,I.src=e,(I.complete||I.width)&&t();
}
}
clearTimeout(d),s!==o&&(b.style.display="none",s=o,y.getAppidCode({
appid:v,
path:k
},e));
}),g.on(T,"mouseleave",function(){
e(b);
}));
}
})(o);
var R=null,T=function(){
R=null;
for(var e=0;e<x.length;e++){
var t=x[e].elem,o=t.tagName.toLowerCase(),i=t.firstChild&&1==t.firstChild.nodeType,a=i?1:"a"==o?2:0,p=x[e].elem.getBoundingClientRect();
p.top<v.getInnerHeight()&&p.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),n(x[e].appid,e,E[x[e].appid].nickname,x[e].title,2,a),x.splice(e--,1));
}
};
T(),g.on(window,"scroll",function(){
R||(R=setTimeout(T,100));
});
}
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function d(){
for(var e=0;e<I.length+b.length;e++){
var t=e<I.length,n=t?I[e]:b[e-I.length],o=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",i=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",a=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",p=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",r=document.createElement("span");
n.setAttribute("class",""),r.setAttribute("class","weapp_display_element js_weapp_display_element"),
C.push({
appid:o,
path:i,
imageUrl:a,
title:p,
elem:r
}),x.push({
appid:o,
elem:r,
title:p
}),n.parentNode.insertBefore(r,n.nextSibling);
}
for(var e=0;e<j.length;e++){
var d=j[e];
C.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function s(e){
return document.getElementById(e);
}
function l(e){
for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;
return t;
}
function m(e){
for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function c(e,t){
for(var n=0;3>n;n++)h.removeClass(e,"weui-desktop-popover_pos-up-"+R[n]),h.removeClass(e,"weui-desktop-popover_pos-down-"+R[n]),
h.removeClass(e,"weui-desktop-popover_pos-left-"+T[n]),h.removeClass(e,"weui-desktop-popover_pos-right-"+T[n]);
h.removeClass(e,"weui-desktop-popover_hide-arrow"),t?h.addClass(e,"weui-desktop-popover_pos-"+t):h.addClass(e,"weui-desktop-popover_hide-arrow");
}
function u(e,t){
var n=/[^\x00-\xff]/g;
if(e.replace(n,"**").length>t)for(var o=Math.floor(t/2),i=o,a=e.length;a>i;i++)if(e.substring(0,i).replace(n,"**").length>=t)return e.substring(0,i)+"...";
return e;
}
e("biz_common/utils/string/html.js");
var f=e("pages/weapp_tpl.html.js"),_=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/event.js"),w=e("biz_common/tmpl.js"),h=e("biz_common/dom/class.js"),y=e("appmsg/weapp_common.js"),v=e("common/utils.js"),b=null,I=null,j=null,k={},C=[],E=y.appidSnInfo,x=[];
if(o()){
d(),r();
var R=["left","center","right"],T=["top","center","bottom"];
return k;
}
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js","common/utils.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),d.getAppidInfo({
onSuccess:function(e){
g.data=e.data,o(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var o=t[e];
if(o.className.indexOf("js_list_container")>=0){
var i=o.querySelector("img.js_cover");
if(i){
var r=i.parentNode.getBoundingClientRect();
i.style.setProperty("width",r.width+"px","important"),i.style.setProperty("height",r.height+"px","important"),
i.style.setProperty("background-size","unset","important"),"0"==i.getAttribute("data-fail")?n.call(i):i.getAttribute("data-fail")||(i.lazyLoadOnload=i.lazyLoadOnload||[],
i.lazyLoadOnload.push(n));
}
}
}
}catch(p){}
}
function n(){
var t=this.parentNode;
if(t){
var e=document.createElement("span");
e.className=this.className,e.style.background='url("'+this.src+'") no-repeat center',
t.insertBefore(e,this),t.removeChild(this);
}
}
function o(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
c.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),o=a.getAttribute("data-wxapath"),i=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return d.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:o,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(i),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&i){
var o=a.getAttribute("data-pidtype"),r=2;
2==o&&(r=4),p([{
wxa_appid:n,
pid:i,
type:r,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
}]);
}
}
}),!1;
});
}(t[e],e);
var n=document.getElementsByClassName("js_product_loop_content");
if(n&&n.length>0&&m.getInnerHeight()){
for(var e=0;e<n.length;e++)g.pvele.push(n[e]);
i(),c.on(window,"scroll",i);
}
}
function i(){
g.checkInScreenId&&clearTimeout(g.checkInScreenId),g.checkInScreenId=setTimeout(function(){
g.checkInScreenId=null;
for(var t=[],e=0;e<g.pvele.length;e++){
var a=g.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.getInnerHeight()&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var d=a.getAttribute("data-pidtype"),s=1;
2==d&&(s=3),t.push({
wxa_appid:a.getAttribute("data-wxaappid"),
pid:r,
type:s,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
});
}
g.pvele.splice(e--,1);
}
}
p(t),0==g.pvele.length&&(c.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e),u.send();
},0);
}
function p(t){
if(t&&0!=t.length){
for(var e={
batch_no:l.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:t.length
},a=0;a<t.length;a++){
var n=t[a],o=a+1;
for(var i in n)n.hasOwnProperty(i)&&(e[i+""+o]=n[i]);
}
s({
url:"/mp/productreport?",
type:"POST",
data:e,
dataType:"json",
async:!0
});
}
}
var d=t("appmsg/weapp_common.js"),c=t("biz_common/dom/event.js"),s=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_common/utils/monitor.js"),m=t("common/utils.js"),g={
pvele:[],
checkInScreenId:null,
reportRandom:Math.random()
};
e();
});define("appmsg/voicemsg.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
return document.getElementById(e);
}
function i(){
"1"==window.show_msg_voice&&(s.invoke("getBackgroundAudioState",{},function(e){
console.log("voicemsg getBackgroundAudioState res",e);
var i="waiting"==e.playState||"seeked"==e.playState||"seeking"==e.playState||"play"==e.playState;
e.paused=1*e.paused,e&&!e.paused&&i&&e.src&&e.src.indexOf("/mp/msgvoice?action=get_voice")>=0?a||(o("js_msgvoice_reading").style.display="",
o("js_msgvoice_reading_title").innerHTML=e.title,console.log("hello msgvoice reading"),
n.on(o("js_msgvoice_reading"),"click",function(){
location.href=e.musicbar_url||"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),c.addClass(o("page-content"),"voice"),console.log("add class voice in page-content"),
a=!0):(a=!1,o("js_msgvoice_reading").style.display="none",c.removeClass(o("page-content"),"voice"),
console.log("removeClass done"));
}),console.log("begin to getBackgroundAudioState in show_msg_voice"),setTimeout(function(){
i(),4>=d&&(d++,t+=1e3);
},t)),console.log("show_msg_voice is",window.show_msg_voice);
}
var s=e("biz_wap/jsapi/core.js"),n=e("biz_common/dom/event.js"),c=e("biz_common/dom/class.js"),t=1e3,a=!1,d=0;
i();
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(u,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),u=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},c=o.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(a){}
n.voiceid=r.encodeStr(c),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(t(o,n,e),
e++);
}
}
function t(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(t){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),c(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],t=window.biz||"",c=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(t=n.bizuin,c=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",t).replace("#mid#",c).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(p._oElements=e.getElementsByTagName("qqmusic")||[],p._oElements.length<=0?!1:!0):!1;
}
function i(){
p.musicLen=p._oElements.length;
}
function s(){
for(var e=0,t=0;t<p.musicLen;t++){
var i=p._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(a.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
p.adapter[t.musictype]&&"function"==typeof p.adapter[t.musictype].initData&&(t=p.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e),n(t),p.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("biz_common/utils/url/parse.js"),c=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),p={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),p.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","pages/video_communicate_adaptor.js","biz_wap/utils/ajax_wx.js","common/utils.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,n=e+d.getInnerHeight(),r=0,m=0;t>m;m++){
var a=c.video_top[m];
a.reported?r++:n>=a.start&&n<=a.end&&(a.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="",r="",c=3;
n[e]&&(n[e].hit_bizuin&&(d=n[e].hit_bizuin),n[e].hit_vid&&(r=n[e].hit_vid),n[e].ori_status&&(c=n[e].ori_status)),
s.report({
step:1,
hit_vid:r,
hit_bizuin:d,
ori_status:c,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(a.vid,n,d.getInnerHeight()),1e4));
}
r==t&&(p.off(window,"scroll",i),c.video_top=c.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/ajax_wx.js"),d=e("common/utils.js"),r=e("biz_common/utils/url/parse.js"),s=e("new_video/ctl.js"),c={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},m=e("pages/version4video.js"),a=e("biz_common/dom/attr.js"),p=(a.setProperty,e("biz_common/dom/event.js")),_=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var u=Math.ceil(1e4*Math.random()),w=0,f=_.length;f>w;++w)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",d=e.getAttribute("src")||i;
if(!i||"#"==i){
var s=e.getAttribute("data-display-src");
if(s&&(0==s.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==s.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
s=s.replace(/&amp;/g,"&");
for(var a=s.split("&"),p=["/mp/newappmsgvote?action=show"],_=0;_<a.length;_++)(0==a[_].indexOf("__biz=")||0==a[_].indexOf("supervoteid="))&&p.push(a[_]);
p.length>1&&(i=p.join("&")+"#wechat_redirect");
}
}
if(d&&(c.txVideoReg.test(d)||c.mpVideoReg.test(d))){
if(m.isShowMpVideo()||c.mpVideoReg.test(d)){
var w=r.getQuery("vid",i);
if(!w)return;
var f=e.getAttribute("data-vw"),v=e.getAttribute("data-vh"),g=document.domain;
"qq.com"==g&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(w),c.video_iframe.push({
dom:e,
vid:w
}),d=["/mp/videoplayer?video_h=",v,"&video_w=",f,"&scene=",window.source,"&random_num=",u,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",w,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?n({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("src",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e;
}
}):t.setAttribute("src",e);
},0,d,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&o.indexOf("js_editor_vote_card")>=0||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&o.indexOf("card_iframe")>=0||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void l.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0){
var h=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(h+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var x=i.indexOf("#wechat_redirect")>-1,b=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):o.indexOf("vote_iframe")>=0&&(b+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var h=x?i.replace("#wechat_redirect",b):i+b;
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=n,e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=_;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&f>0){
var y=f,j=3*y/4;
e.width=y,e.height=j,e.style.setProperty&&(e.style.setProperty("width",y+"px","important"),
e.style.setProperty("height",j+"px","important"));
}
}(_[w]);
for(var v=0;v<l.length;v++){
var g=l[v];
g.parentNode.removeChild(g);
}
if(window.iframe_reload=function(){
for(var e=0,i=_.length;i>e;++e){
var o=_[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var h,x=document.getElementsByClassName("video_iframe"),w=0;h=x.item(w++);)h.setAttribute("scrolling","no"),
h.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var r=e[o];
if(!r||!r.dom)return;
for(var s=r.dom,m=s.offsetHeight,a=0;s&&t!==s;)a+=s.offsetTop,s=s.offsetParent;
c.video_top.push({
start:a+m/2,
end:a+m/2+d.getInnerHeight(),
reported:!1,
vid:r.vid
});
}
i(),p.on(window,"scroll",i);
});
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("question_answer/utils.js",["biz_common/utils/string/html.js","pages/utils.js","biz_wap/jsapi/core.js","appmsg/log.js","biz_wap/utils/mmversion.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("pages/utils.js"),r=e("biz_wap/jsapi/core.js"),i=e("appmsg/log.js"),o=e("biz_wap/utils/mmversion.js"),n=e("biz_common/dom/event.js"),a={
classPrefix:"qa__",
previewFlag:!1
},s=function(e,t){
var r=new Date(1e3*e),i=e-t,o=r.getFullYear(),n=1*t,a=new Date(1e3*n);
r.setHours(0),r.setMinutes(0),r.setSeconds(0);
var s=r.getTime()/1e3;
return n>=s?3600>i?Math.ceil(i/60)+"分钟前":"今天":n>=s-86400?"昨天":n>=s-172800?"前天":a.getFullYear()===o?a.getMonth()+1+"月"+a.getDate()+"日":a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日";
},l=function(e,r){
r=r||Math.ceil((new Date).getTime()/1e3),e.elected_comment_num=e.elected_comment_num||0,
e.like_num=e.like_num||0,1*e.is_anoymous&&1*!e.is_self_question&&(e.questioner_nickname="匿名",
e.questioner_headimg="",e.question_info.questioner_useruin=""),e.questioner_headimg||(e.questioner_headimg="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0");
var i=e.question_info;
e.question_page_url=c(e.question_page_url.html(!1)),e.questioner_useruin=i.questioner_useruin,
e.qa_id=e.question_info.qa_id,i.answer&&(i.answer.answer_time_str=s(r,i.answer.answer_timestamp)),
i.question&&(i.question.ask_time_str=s(r,i.question.ask_timestamp),i.question.title=i.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
i.question.title=t.emojiFormat(i.question.title));
for(var o=[],n=[],a=[],l=[i.question?i.question.desc:[],i.answer?i.answer.answer:[]],u=function(e){
l[e]=l[e].map(function(r){
return"TEXT"===r.type&&r.content?(r.content=r.content.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
r.content=t.emojiFormat(r.content)):"PIC_CDN_URL"===r.type&&(o.push(r.content),0===e?n.push(r.content):1===e&&a.push(r.content)),
r;
});
},p=0,m=l.length;m>p;p++)u(p,m);
return e.allImg=o,e.allQuestionImg=n,e.allAnswerImg=a,e;
},u=function(e){
if(!a.previewFlag){
a.previewFlag=!0,"undefined"==typeof window.getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var t={
current:e.curUrl,
urls:e.imgsSrc,
currentInfo:{
url:e.curUrl,
data:""
}
},n=e.dataUrlDom,s="";
if(n){
var l=window.getComputedStyle(n),u=document.createElement("canvas");
u.style.width=l.width,u.style.height=l.height,u.width=parseFloat(l.width),u.height=parseFloat(l.height);
var p=u.getContext("2d");
if(!o.isAndroid)try{
p.drawImage(n,0,0,parseFloat(l.width),parseFloat(l.height)),s=u.toDataURL();
}catch(c){
s="";
}
s&&(t.currentInfo.data=s);
}
var m=null;
if(e.posDom){
var d=window.getComputedStyle(e.posDom),g=e.posDom.getBoundingClientRect();
m={
x:g.left-parseFloat(d.paddingLeft)-parseFloat(d.borderLeftWidth),
y:g.top-parseFloat(d.paddingTop)-parseFloat(d.borderTopWidth),
width:g.width-parseFloat(d.paddingLeft)-parseFloat(d.paddingRight)-parseFloat(d.borderLeftWidth)-parseFloat(d.borderRightWidth),
height:g.height-parseFloat(d.paddingTop)-parseFloat(d.paddingBottom)-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)
},t.currentInfo.pos=m;
}
r.invoke("imagePreview",t,function(t){
console.log("imagePreview response",t),window.__addIdKeyReport&&e.reportId&&e.reportKey&&window.__addIdKeyReport(e.reportId,e.reportKey);
}),setTimeout(function(){
a.previewFlag=!1;
},500),i("[questionAnswer] click image, src: "+e.curUrl);
}
},p=function(e){
var t="."+a.classPrefix+"preview_js";
e.container.querySelectorAll(t).forEach(function(t){
!function(r){
n.on(r,"click",function(){
var i=null;
i="img"===r.nodeName.toLocaleLowerCase()&&r.className.indexOf("qa__preview_base64_js")>=0?r:r.querySelector("img.qa__preview_base64_js"),
u({
curUrl:r.getAttribute("data-src"),
dataUrlDom:i,
imgsSrc:e.imgsSrc,
posDom:t,
reportId:e.jsapiReportId,
reportKey:e.jsapiReportKey
});
});
}(t);
});
},c=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
};
return{
formatQuestionInfo:l,
formatCreateTime:s,
classPrefix:a.classPrefix,
bindReviewImageEvent:p,
formatPageUrl:c,
reviewImage:u
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t,o,a){
var i={
current:e,
urls:t,
currentInfo:{
url:e,
data:o,
pos:a
}
};
console.log("imagePreview request",i),console.log("previewFlag",g),g||(g=!0,r.invoke("imagePreview",i,function(e){
console.log("imagePreview response",e),window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),setTimeout(function(){
g=!1;
},500),d("[Appmsg] click image, src: "+e));
}
function o(e,t){
s({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:t||"",
cdn_url:e||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function a(e){
var a=[],r=e.container,d=e.imgs||[];
if(r)for(var s=r.getElementsByTagName("img")||[],g=0,l=s.length;l>g;g++)d.push(s.item(g));
for(var c=p.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,m=0,g=0,l=d.length;l>g;g++){
var w=d[g],u=w.getAttribute("data-src")||w.getAttribute("src"),h=w.getAttribute("data-type");
if(u&&!u.isGif()&&0!=u.indexOf("data:")){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
w.dataset&&w.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=n.addParam(u,"wxfrom","3",!0)),u=e.is_https_res?u.http2https():u.https2http(),
h&&(u=n.addParam(u,"wxtype",h,!0)),a.push(u),"1"!=w.getAttribute("data-nopreviewclick")&&!function(e){
i.on(w,"click",function(i){
if(!(i&&i.target&&i.target.className&&i.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var r=i.target,n=r.getBoundingClientRect(),d=.15*n.width,s=.15*n.height,g=!0;r&&"body"!=r.nodeName.toLowerCase();){
var l=window.getComputedStyle(r,null),w=parseInt(l.getPropertyValue("opacity")),u=l.getPropertyValue("filter"),h=l.getPropertyValue("visibility"),f=l.mixBlendMode;
if(1!=w||"visible"!=h||u.indexOf("opacity")>=0||u.indexOf("blur")>=0||f&&"normal"!=f){
g=!1;
break;
}
var b=r.getBoundingClientRect();
if(("hidden"==l.overflow||"hidden"==l.overflowX||"hidden"==l.overflowY)&&(b.left-n.left>d||b.right-n.right<-1*d||b.top-n.top>s||b.bottom-n.bottom<-1*s)){
g=!1;
break;
}
r=r.parentElement;
}
if(!g){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var y=new Image,_="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
y.src=_.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var v=i.target,j=window.getComputedStyle(v),F=v.getBoundingClientRect(),x=document.createElement("canvas");
x.style.width=j.width,x.style.height=j.height,x.width=parseFloat(j.width),x.height=parseFloat(j.height);
var C=x.getContext("2d"),I="";
C.drawImage(v,0,0,parseFloat(j.width),parseFloat(j.height));
try{
I=x.toDataURL();
}catch(i){}
p.isAndroid&&(I=""),t(e,a,I,{
x:F.left-parseFloat(j.paddingLeft)-parseFloat(j.borderLeftWidth),
y:F.top-parseFloat(j.paddingTop)-parseFloat(j.borderTopWidth),
width:F.width-parseFloat(j.paddingLeft)-parseFloat(j.paddingRight)-parseFloat(j.borderLeftWidth)-parseFloat(j.borderRightWidth),
height:F.height-parseFloat(j.paddingTop)-parseFloat(j.paddingBottom)-parseFloat(j.borderTopWidth)-parseFloat(j.borderBottomWidth)
}),c&&0==m&&o(i.target.src,2);
}
});
}(u),w.removeAttribute("data-nopreviewclick");
}
}
if(c){
var f=document.getElementById("js_content"),b=0,y=0;
i.on(f,"touchstart",function(e){
return e&&e.target&&e.target.tagName&&"string"==typeof e.target.tagName&&"IMG"==e.target.tagName.toString().toUpperCase()?(m=+new Date,
b=e.touches[0].pageX,void(y=e.touches[0].pageY)):void(m=0);
}),i.on(f,"touchmove",function(e){
var t=e.touches[0].pageX,o=e.touches[0].pageY;
Math.abs(t-b)>10&&Math.abs(o-y)>10&&(m=0);
}),i.on(f,"touchend",function(e){
0!=m&&(+new Date-m>800&&+new Date-m<6e3?o(e.target.src,1):m=0);
});
}
}
var i=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/url/parse.js"),d=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),g=!1;
return e("appmsg/cdn_img_lib.js"),a;
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function t(e){
var t=e.container;
if(!t)return!1;
for(var s=t.getElementsByTagName("a")||[],a=0,c=s.length;c>a;++a)!function(t){
var a=s[t],c=a.getAttribute("href");
if(!c)return!1;
var m=0,p=a.innerHTML;
/^[^<>]+$/.test(p)?m=1:/^<img[^>]*>$/.test(p)&&(m=2),!!e.changeHref&&!/^https?:\/\/mp\.weixin\.qq\.com\/cgi-bin\//.test(c)&&(c=e.changeHref(c,m)),
i.on(a,"tap",function(){
return null!==a.getAttribute("data-itemshowtype")&&c.indexOf("mp.weixin.qq.com")>-1&&(r.isIOS||r.isAndroid)&&!r.isInMiniProgram?1==a.getAttribute("clicked")?!1:(o.invoke("openWebViewUseFastLoad",{
url:c,
item_show_type:a.getAttribute("data-itemshowtype"),
openType:0,
scene:1
},function(e){
console.log("openWebViewUseFastLoad res: ",e),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")?o.invoke("openUrlWithExtraWebview",{
url:c,
openType:1
},function(e){
a.setAttribute("clicked",0),e&&e.err_msg&&-1==e.err_msg.indexOf("ok")&&(window.location.href=url);
}):(a.setAttribute("clicked",0),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28839_37_1");
}),!1):(window.__second_open__?n(c,{
sample:1,
reject:function(){
location.href=c;
}
}):location.href=c,!1);
},!0);
}(a);
}
var i=e("biz_common/dom/event.js"),n=e("appmsg/open_url_with_webview.js"),o=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/mmversion.js");
return t;
});define("appmsg/copyright_report.js",["common/utils.js","biz_common/dom/event.js"],function(o){
"use strict";
function t(o){
var t=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",o.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(t+="&from=sougou");
var e=new Image;
e.src=t.substr(0,1024);
}
function e(){
var o=__appmsgCgiData;
if("2"==o.copyright_stat){
for(var t=r("copyright_info"),e=r("js_article");t&&e!==t;)s.copyright_top+=t.offsetTop,
t=t.offsetParent;
c.on(window,"scroll",n);
}
}
function n(){
var o=window.pageYOffset||document.documentElement.scrollTop;
o+i.getInnerHeight()>s.copyright_top&&(t({
scene:"1",
card_pos:"0"
}),c.off(window,"scroll",n),n=s.copyright_top=null);
}
function r(o){
return document.getElementById(o);
}
var i=o("common/utils.js"),c=o("biz_common/dom/event.js"),s={
copyright_top:0
};
return{
card_click_report:t,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/reward_utils.js","appmsg/comment_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","complain/localstorage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a_utils.js","pages/version4video.js","appmsg/like.js","appmsg/iframe.js","appmsg/more_read.js"],function(e,t,i,r){
"use strict";
function n(){
for(var t=document.getElementsByTagName("iframe"),i=[],r=0,n=t.length;n>r;++r)i.push(t[r]);
t=null;
var o=document.getElementById("js_content"),s=o.offsetWidth,d=s/w.getRatio();
window.logs.video_cnt=0;
for(var r=0,n=i.length;n>r;++r){
var _=i[r],m=_.getAttribute("data-src")||"",c=_.getAttribute("src")||m;
if(c){
var l=e("pages/version4video.js");
if(0==c.indexOf("http://z.weishi.com/weixin/player.html"))c=c.replace(/width=\d+/g,"width="+s),
c=c.replace(/height=\d+/g,"height="+d),_.width=s,_.height=d,_.style.setProperty&&(_.style.setProperty("width",s+"px","important"),
_.style.setProperty("height",d+"px","important")),_.setAttribute("src",c),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(c)){
if(!l.isShowMpVideo()){
var p;
p=a(f?_:_),p&&A.push(p),"function"==typeof window.__addIdKeyReport&&(window.__addIdKeyReport("28307",10),
l.device.inWechat&&l.device.inWindowWechat?window.__addIdKeyReport("110644",0):l.device.inWechat&&l.device.inMacWechat&&window.__addIdKeyReport("110644",1));
}
window.logs.video_cnt++;
continue;
}
}
}
A.length>0&&"function"==typeof window.__getVideoWh&&b.on(window,"resize",function(){
try{
for(var e=0,t=A.length;t>e;e++){
var i=A[e],r=i.playerObj;
if(r){
var n=window.__getVideoWh(i);
i.style.width=n.w+"px",i.style.height=n.h+"px",r.resize({
width:n.vw,
height:n.vh
});
}
}
}catch(a){}
},!1);
}
function a(e){
var t=e.getAttribute("data-src")||e.getAttribute("src"),i=u.getQuery("vid",t),r=e.getAttribute("data-vw"),n=e.getAttribute("data-vh"),a=e.getAttribute("data-ratio"),s=document.createElement("span");
s.setAttribute("data-ratio",a),s.id="js_tx_video_container_"+Math.random(),s.className="js_tx_video_container",
s.style.cssText=e.style.cssText,s.style.display="none";
var d=e.parentNode;
return d?(d.lastChild===e?d.appendChild(s):d.insertBefore(s,e.nextSibling),p.createTxVideo({
containerId:s.id,
vid:i,
width:r,
height:n,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
s.playerObj=e.player,o(s,i),s.style.display="block";
},
onError:function(){}
}),d.removeChild(e),s):void 0;
}
function o(e,t){
if(t&&e){
var i=e.parentNode;
if(i){
for(var r=[],n=0,a=i.children.length;a>n;n++){
var o=i.children[n];
o.className.indexOf("img_loading")>=0&&o.getAttribute("data-vid")==t&&r.push(o);
}
for(var n=0,a=r.length;a>n;n++)i.removeChild(r[n]);
e.style.display="block";
}
}
}
function s(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,n=window.__appmsgCgiData.source_biz,a=0,o=i.length;o>a;a++){
var s=i[a];
if(2==s.type){
if(2==r&&n==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var d=document.getElementsByTagName("img"),a=0,o=d.length;o>a;a++){
var s=d[a],_=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=j.tmpl(g,t[_]);
{
var c=m.children[0],l=s.parentNode,p=l.insertBefore(c,s),w=p.children[0];
(function(e,t){
b.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(k.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],w);
}
p.insertBefore(s,w);
}
}
}
}
function d(t){
var i=t.appmsgstat||{};
if(window.appmsgstat||(window.appmsgstat=i),i.show){
{
var n=document.getElementById("js_read_area3"),a=document.getElementById("like3"),o=document.getElementById("like_old"),s=document.getElementById("likeNum3"),d=document.getElementById("likeNum_old"),_=document.getElementById("readNum3");
document.getElementById("js_like_title");
}
if(!(n&&a&&s&&_))return;
var m,p,w=e("appmsg/like.js");
1==appmsg_like_type?(m=o,p=d):(m=a,p=s),i.liked=window.is_temp_url?window.liked:i.liked,
w.showReadNum({
show:!0,
readAreaDom:n,
readNumDom:_,
readAreaDisplayValue:"block",
readNum:window.is_temp_url?window.read_num:i.read_num
}),k.invoke("handleHaokanAction",{
imgUrl:ori_head_img_url?ori_head_img_url:"",
link:msg_link.html(!1),
desc:msg_desc?msg_desc:"",
title:msg_title?msg_title.htmlDecode():"",
action:"update_recommend_status",
permission:i.like_disabled||2!==appmsg_like_type?0:1,
recommend:i.liked?1:0
},function(){}),i.like_disabled||(w.showLikeNum({
show:!0,
likeAreaDom:m,
likeNumDom:p,
liked:i.liked,
className:1===appmsg_like_type?"praised":"like_btn_liked",
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:i.like_num
}),w.initLikeEvent({
likeAreaDom:m,
likeNumDom:p,
className:1===appmsg_like_type?"praised":"like_btn_liked",
prompted:i.prompted,
biz:window.biz,
mid:window.mid,
idx:window.idx,
appmsgid:window.appmsgid,
itemidx:window.itemidx,
is_temp_url:window.is_temp_url,
showType:i.style
}));
}
var u=document.getElementById("js_share_appmsg");
t.share_redirect_url&&u&&(window._share_redirect_url=t.share_redirect_url,u.innerHTML=j.tmpl(y,{
url:t.share_redirect_url
})),l.initCommentByExtData(t),I.setBackgroundClass(),c.init(t.reward,{
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
reward_author_head:t.reward_author_head
});
var g=document.getElementById("js_cmt_container");
1==t.comment_entrance_enable_for_preview&&window.is_temp_url&&g&&(g.style.display="block"),
t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
b.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作");
})),t.comment_enabled&&g&&(g.style.display="block");
}
function _(e){
k.invoke("currentMpInfo",{
userName:window.user_name,
brandName:window.title,
brandIcon:window.hd_head_img.replace(/\/0$/,"/132"),
desc:e
});
}
function m(){
var t=0,i="27613",r="50";
h.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
abtest_cookie:abtest_cookie,
devicetype:devicetype,
version:window.clientversion,
is_need_ticket:A&&A.length>0?1:0,
is_need_ad:0,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:0,
reward_uin_count:is_need_reward?3*c.getCountPerLine({
can_reward:!0
}):0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
item_show_type:window.item_show_type,
is_original:t,
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0,
more_read_type:more_read_type||0,
rtId:i,
rtKey:r,
appmsg_like_type:window.appmsg_like_type,
onSuccess:function(t){
if(t)try{
var n="";
if(t.friend_subscribe_count>0?(n=t.friend_subscribe_count+"位朋友关注",_(n),x.set("currentMpInfoDesc"+biz,n)):t.original_article_count>0&&(n=t.original_article_count+"篇原创文章",
_(n),x.set("currentMpInfoDesc"+biz,n)),t&&t.base_resp&&t.base_resp.wxtoken&&(window.wxtoken=t.base_resp.wxtoken),
window.fromWeixinCached&&e("appmsg/iframe.js"),s(t),t.ret)return;
var a=document.getElementById("js_more_read_area");
a&&t&&t.more_read_list&&t.more_read_list.length&&e("appmsg/more_read.js")(a,t.more_read_list),
d({
appmsgstat:t.appmsgstat,
comment_enabled:t.comment_enabled,
comment_count:t.comment_count,
friend_comment_enabled:t.friend_comment_enabled,
only_fans_can_comment:t.only_fans_can_comment,
reward:{
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
user_can_reward:t.user_can_reward,
reward_qrcode_ticket:t.reward_qrcode_ticket,
timestamp:t.timestamp,
reward_author_head:t.reward_author_head,
rewardsn:t.rewardsn,
scene:source,
is_need_reward:is_need_reward,
title:msg_title,
author_id:author_id,
appmsgextRtId:i,
appmsgextRtKey:r
},
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
reward_author_head:t.reward_author_head,
comment_entrance_enable_for_preview:t.comment_entrance_enable_for_preview,
share_redirect_url:t.share_redirect_url||"",
logo_url:t.logo_url,
nick_name:t.nick_name,
is_fans:t.is_fans
});
}catch(o){
z("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var m=new Image;
return m.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(o.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(o));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
e("biz_common/utils/string/html.js");
var c=e("appmsg/reward_utils.js"),l=e("appmsg/comment_utils.js"),p=e("pages/create_txv.js"),w=e("pages/video_ctrl.js"),u=e("biz_common/utils/url/parse.js"),g=e("appmsg/img_copyright_tpl.html.js"),h=e("appmsg/appmsgext.js"),y=e("appmsg/share_tpl.html.js"),v=navigator.userAgent,f=-1!=v.indexOf("MicroMessenger"),b=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),k=(e("biz_wap/utils/ajax.js"),e("biz_wap/jsapi/core.js")),j=e("biz_common/tmpl.js"),x=e("complain/localstorage.js"),z=e("appmsg/log.js"),I=(e("rt/appmsg/getappmsgext.rt.js"),
e("a/a_utils.js")),A=[];
n(),m();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=this.offset||60,n=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),o=Math.max(s.bottom*e,o),
n=Math.max(s.top*e,n);
}
for(var r=+new Date,c=[],d=this.sw,f=this,g=-1,u=0,p=t.length;p>u;u++)!function(t,i){
var s=t.el.getBoundingClientRect(),r=t.src;
if(r){
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&g++;
var f=n,u=o;
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&l&&(f=0,
u=60),!t.show&&(s.top<=0&&s.top+s.height+f>=0||s.top>0&&s.top<e+u)&&(i.inImgRead&&(s.top<=0&&s.top+s.height>=0||s.top>0&&s.top<e)&&i.inImgRead(r,networkType),
i.changeSrc&&(r=i.changeSrc(t.el,r,g)),t.el.onerror=function(){
var e=this;
!!i.onerror&&i.onerror(t.el.src,e);
},t.el.onload=function(){
var e=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=e.src){
var o=e.getAttribute("data-forceheight");
o?(e.removeAttribute("data-forceheight"),h(e,"height",o,"important")):h(e,"height","auto","important"),
e.getAttribute("_width")?h(e,"width",e.getAttribute("_width"),"important"):h(e,"width","auto","important"),
!!i.onload&&i.onload(t.el.src,e);
}
},m(t.el,"src",r),c.push(r),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>d&&(t.el.width=d);
}
}(t[u],f);
c.length>0&&this.detect&&this.detect({
time:r,
loadList:c,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,s=0,r=this.imgOccupied||!1,l=this.crossOrigin||!1;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var d=0,f=t.length;f>d;d++){
var g=t.item(d),u=m(g,n),p=m(g,"src");
if(u&&!(p&&p.indexOf("data:image/gif;base64")<0)){
var w=100;
if(g.dataset&&g.dataset.ratio){
var A=1*g.dataset.ratio,b=1*g.dataset.w||a;
"number"==typeof A&&A>0?(b=a>=b?b:a,w=b*A,r||(g.style.width&&g.setAttribute("_width",g.style.width),
h(g,"width",b+"px","important"),h(g,"visibility","visible","important"),g.setAttribute("src",c))):h(g,"visibility","hidden","important");
}else h(g,"visibility","hidden","important");
r||h(g,"height",w+"px","important"),l&&-1==u.indexOf("mmsns.qpic.cn")&&!(u.match(/\:\/\/[^\/]+\/mmbiz\//)&&u.indexOf("wx_fmt=gif")>-1||u.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&(g.crossOrigin="anonymous"),
e.push({
el:g,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
if(this.__called_first_time)i.call(this,t),this.__called_first_time=!1;else if(!this.debounce){
this.debounce=!0;
var e=this;
setTimeout(function(){
i.call(e,t),e.debounce=!1;
},500);
}
}
function n(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),r=t("biz_common/dom/attr.js"),m=r.attr,h=r.setProperty,c=t("biz_common/ui/imgonepx.js"),l=!0;
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});