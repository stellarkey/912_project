define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
var i;
if(parent==window)i=window;else try{
{
parent.window.location.href;
}
i=parent.window;
}catch(n){
i=window;
}
var t=i.user_uin,r=Math.floor(i.user_uin/100)%20;
t||(r=-1);
var a=function(){
return r>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var e=i.mid,n=i.idx,r="";
r=e&&n?e+"_"+n:"";
var a=i.__webviewid,d=[t,r,a].join("_");
return d;
},o=function(i){
if(20>r)try{
var n=i.vid||"",t={};
t.__biz=parent.window.biz||"",t.vid=n,t.clienttime=+new Date;
var o=parent.window.mid,s=parent.window.idx,w="";
w=o&&s?o+"_"+s:n,t.type="undefined"!=typeof i.type?i.type:o&&s?1:2,t.id=w,t.hit_bizuin=i.hit_bizuin||"",
t.hit_vid=i.hit_vid||"",t.webviewid=d(),t.step=i.step||0,t.orderid=i.orderid||0,
t.ad_source=i.ad_source||0,t.traceid=i.traceid||0,t.ext1=i.ext1||"",t.ext2=i.ext2||"",
t.r=Math.random(),t.devicetype=parent.window.devicetype,t.version=parent.window.clientversion,
t.is_gray=a()?1:0,t.mid=o||"",t.idx=s||"",t.url=parent.window.location.href,t.screen_num=i.screen_num||0,
t.screen_height=i.screen_height||0,t.ori_status=i.ori_status||3,t.fromid=i.fromid||0,
t.sessionid=window.sessionid||"",t.appmsg_scene=window.source||(window.cgiData?window.cgiData.scene:0)||0,
!t.appmsg_scene&&t.fromid?t.appmsg_scene=t.fromid:!t.fromid&&t.appmsg_scene&&(t.fromid=t.appmsg_scene),
t.total_range=i.total_range||0,t.current_range=i.current_range||0,t.duration=i.duration||0;
var _=e("biz_wap/utils/ajax.js");
_({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:t
});
}catch(c){}
};
return{
report:o,
getWebviewid:d,
showAd:a
};
});define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js"],function(e){
"use strict";
var i=e("appmsg/appmsg_report.js"),o=e("biz_common/utils/emoji_data.js"),t=e("pages/version4video.js"),n=e("biz_wap/utils/mmversion.js"),a=e("biz_wap/jsapi/core.js"),r=e("biz_common/dom/event.js"),c={
inWechat:t.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,i=o.length;i>e;e++){
var t=o[e];
t.cn&&!c.emojiDataMap[t.cn]&&(c.emojiDataMap[t.cn]={
index:e
}),t.hk&&!c.emojiDataMap[t.hk]&&(c.emojiDataMap[t.hk]={
index:e
}),t.us&&!c.emojiDataMap[t.us]&&(c.emojiDataMap[t.us]={
index:e
});
}
}();
var s=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(c.emojiDataMap[e]&&o[c.emojiDataMap[e].index]){
var i=o[c.emojiDataMap[e].index];
return c.emojiImg.replace("#name#",e).replace("#style#",i.style);
}
return e;
}):e;
},m=function(e,i){
c.inWechat?c.windowWechat||c.macWechat?i===!0?window.parent.open(e):window.parent.location.href=e:a.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(i===!0?window.parent.open(e):window.parent.location.href=e);
}):i===!0?window.open(e):location.href=e;
},p=function(){
!c.inWechat||c.windowWechat||c.macWechat?window.close():a.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},l=function(e){
return document.getElementById(e);
},u=function(e){
return e.replace(/^\s+|\s+$/g,"");
},d=function(e,i){
return(i||document).querySelector(e);
},f=function(e,i){
return(i||document).querySelectorAll(e);
},w=function(e){
var o=e.$container;
o&&!n.isInMiniProgram&&r.on(o,"tap",".js_go_profile",function(o){
var t=o.delegatedTarget;
if(t){
var n=t.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(t),1==window.isprofileblock)a.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect");
});else{
var r=t.getAttribute("data-scene")||e.profile_scene||"";
i.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),a.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:r
},function(){});
}
}
});
};
return{
jumpUrl:m,
closeWin:p,
trim:u,
getId:l,
qs:d,
qsAll:f,
inWechat:c.inWechat,
windowWechat:c.windowWechat,
macWechat:c.macWechat,
emojiFormat:s,
go2ProfileEvent:w
};
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=-1!=navigator.userAgent.indexOf("WindowsWechat"),i=function(e,i){
if(n)return location.href=e,!1;
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=window.user_uin||0,s=0!==t&&Math.floor(t/100)%1e3<o;
return s?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1,
scene:i.scene||"",
bizUsername:i.user_name||""
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_common/utils/monitor.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=c.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],d=0;d<l.length;d++){
var w=[l[d].bizuin||window.biz||"",l[d].mid||"",l[d].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var h=r[n.index].getBoundingClientRect(),p="fans_read_cnt="+l[n.index].fans_read_cnt,g={
act:n.action||0,
bizuin:window.biz||"",
msgid:window.mid||"",
idx:window.idx||"",
scene:window.source||"",
sub_scene:window.subscene||"",
get_a8_key_scene:window.ascene||"",
screen_height:i,
screen_width:e,
screen_num:Math.ceil(t/i),
action_screen_num:Math.ceil((h.top+h.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:p,
session_id:u
};
o({
url:"/mp/appmsgreport?action=more_read",
type:"POST",
data:g,
timeout:2e3,
async:!1,
mayAbort:!0
});
var b=1===n.action?4:5;
a.setSum(110809,b,1).send();
}
function e(){
if(l){
for(var n=0,t=c.getInnerHeight(),o=0;o<r.length;o++)if(r[o].dataset.show)n++;else{
var s=r[o].getBoundingClientRect();
s.top+s.height<t&&(r[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=r.length&&d.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),d=n("biz_common/dom/event.js"),a=n("biz_common/utils/monitor.js"),c=n("common/utils.js"),l=null,r=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return d.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
}),r=n.getElementsByClassName("more_read_link");
for(var o=0;o<r.length;o++)d.on(r[o],"click",function(n){
return function(){
window.__second_open__?m.openUrlWithExtraWebview(l[n].link.htmlDecode()):window.location.href=l[n].link.htmlDecode(),
i({
action:2,
index:n
});
};
}(o));
n.style.display="";
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js","appmsg/i18n.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,t){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:t||"success"
});
}
function initLikeEvent(opt){
function show(e){
e.style.display="";
}
function hide(e){
e.style.display="none";
}
function vShow(e){
e.style.visibility="visible";
}
function vHide(e){
e.style.visibility="hidden";
}
function clear(e){
e.value="";
}
function showLoading(){
commonUtils.isNativePage()?showAppToast("发送中","loading"):show(qs("js_loading"));
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):hide(qs("js_loading"));
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function failAlert(e){
return e&&e.length>maxLikeCommentWord?void alert("想法不可以超过字"+maxLikeCommentWord+"字"):void alert("网络异常，请稍后重试");
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,allPage=document.getElementsByTagName("html")[0],el_likeEducate=qs("js_like_educate"),el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_acknowledge=qs("js_acknowledge"),el_toastMsg=qs("js_toast_msg"),el_educateConfirm=qs("js_educate_like_confirm"),el_alikeComment=qs("js_a_like_comment"),el_alikeCommentConfirm=qs("js_a_like_confirm"),el_alikeCommentText=qs("js_a_like_comment_text"),el_acommentLenSpan=qs("like_a_comment_len_span"),el_acommentLen=qs("like_a_comment_len"),el_acommentErrorMsg=qs("js_a_like_comment_msg"),el_acommentCurrentCount=qs("js_a_like_current_cnt"),el_alikeCommentShare=qs("js_a_like_comment_share"),el_bcommentPanel=qs("js_b_comment_panel"),el_blikeConfirm=qs("js_b_like_confirm"),el_blikeCommentTextFirst=qs("js_b_comment_text_first"),el_blikeCommentTextSecond=qs("js_b_comment_text_second"),el_bcommentCancel=qs("js_b_comment_cancel"),el_bcommentConfirm=qs("js_b_comment_confirm"),el_bcommentErrorMsg=qs("js_b_like_comment_msg"),el_bcommentCurrentCount=qs("js_b_like_current_cnt"),el_bcommentPanel2=qs("js_b_comment_final"),haokanLock=!1,startY;
if(el_like&&el_likeNum){
var img=new Image;
window.appmsg_like_type&&2===window.appmsg_like_type?img.src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=114217_0_1":window.appmsg_like_type&&1===window.appmsg_like_type&&(img.src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=114217_1_1"),
JSAPI.on("menu:haokan",function(e){
var t=0===parseInt(e.recommend)?0:1;
if(0===t)sendRecommendAjax(t,"",2,clientShowType);else{
var o="";
o=e.comment;
var i=1===e.scene?4:5;
sendRecommendAjax(t,o,i,clientShowType);
}
}),2===showType&&(el_bcommentConfirm.setAttribute("disabled","disabled"),el_bcommentConfirm.innerHTML="发送");
var like_report=function(){
log("[Appmsg] click like");
var e=el_like.getAttribute("like"),t=el_likeNum.innerHTML,o=parseInt(e)?parseInt(e):0,i=o?0:1,n=parseInt(t)?parseInt(t):0,s=opt.appmsgid||opt.mid,l=opt.itemidx||opt.idx;
if(o){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),n>0&&"100000+"!==t&&(el_likeNum.innerHTML=n-1==0?"赞":n-1);
}else if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==t&&(el_likeNum.innerHTML=n+1);else if(2===appmsg_like_type)return void initRecommendPanel();
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+i+"&f=json&appmsgid="+s+"&itemidx="+l,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
action_type:i?1:2,
device_type:window.devicetype
},
type:"POST"
});
},initRecommendPanel=function(){
if(1!==showType&&2!==showType||1!==prompted)if(1!==showType&&2!==showType||0!==prompted){
if(3===showType)if(isShow(el_bcommentPanel)||isShow(el_bcommentPanel2))!isShow(el_bcommentPanel)&&isShow(el_bcommentPanel2)?hide(el_bcommentPanel2):isShow(el_bcommentPanel)&&!isShow(el_bcommentPanel2)&&hide(el_bcommentPanel);else{
var e=qs("like3").offsetTop-document.body.scrollTop;
show(el_bcommentPanel),qs("js_b_wrp").clientHeight+e+50>document.documentElement.clientHeight?Class.addClass(qs("js_b_wrp"),"like_comment_primary_pos_top"):Class.removeClass(qs("js_b_wrp"),"like_comment_primary_pos_top");
}
}else{
var t=qs("like3").offsetTop-document.body.scrollTop,o=document.documentElement.clientHeight-t-qs("like3").clientHeight;
t>o?Class.addClass(qs("js_like_educate_wrapper"),"like_comment_primary_pos_top"):Class.removeClass(qs("js_like_educate_wrapper"),"like_comment_primary_pos_top"),
show(el_likeEducate);
}else sendRecommendAjax(1,"",1);
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},connectWithApp=function(e,t,o){
var i={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:t?t:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(i)
},function(e){
console.log("handleHaokanAction",e);
}),setTimeout(function(){
(3===showType&&1===e||o)&&(i={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:""
},JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(i)
},function(e){
console.log("handleHaokanAction",e);
}));
},500),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
});
},isBeenUnvisible=function(e){
return e.offsetTop-document.body.scrollTop>=commonUtils.getInnerHeight()-60?!0:!1;
},likeClickReport=function(){
ajax({
url:"/mp/appmsgreport?action=appmsglikeclickcomment&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
});
},likeExpose=function e(){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,o=qs("like3").offsetTop,i=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
t+commonUtils.getInnerHeight()>o&&o>=t&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+i+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
};
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
}),DomEvent.on(el_blikeConfirm,"click",function(){
sendRecommendAjax(1,"",1);
}),DomEvent.on(el_educateConfirm,"click",function(){
sendRecommendAjax(1,"",1),hide(el_likeEducate);
}),DomEvent.on(qs("js_mask_1"),"click",function(){
hide(el_bcommentPanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),vHide(el_bcommentErrorMsg),
enableMove();
}),DomEvent.on(qs("js_mask_3"),"click",function(){
hide(el_likeEducate);
}),DomEvent.on(el_blikeCommentTextFirst,"click",function(){
scrollTop=document.body.scrollTop||document.documentElement.scrollTop||0,hide(el_bcommentPanel),
show(el_bcommentPanel2),el_blikeCommentTextSecond.focus(),disableMove();
}),DomEvent.on(el_bcommentConfirm,"mousedown",function(){
var e;
2===showType?e=4:3===showType&&(e=5),validataComment(el_blikeCommentTextSecond,e);
}),DomEvent.on(el_bcommentCancel,"mousedown",function(){
hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),vHide(el_bcommentErrorMsg),
enableMove();
}),DomEvent.on(el_acknowledge,"click",function(){
hide(el_likeEducate);
}),DomEvent.on(qs("js_cancel"),"click",function(){
hide(el_likeEducate);
}),DomEvent.on(qs("js_confirm"),"click",function(){
sendRecommendAjax(1,"",1);
}),DomEvent.on(el_alikeCommentShare,"click",function(){
return commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:"8"===item_show_type||"5"===item_show_type?"black":"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,show(el_bcommentPanel2),
el_blikeCommentTextSecond.focus(),el_bcommentConfirm.setAttribute("disabled","disabled"),
disableMove(),void likeClickReport());
}),DomEvent.on(el_blikeCommentTextSecond,"focus",function(){}),DomEvent.on(el_blikeCommentTextSecond,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose);
var disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_blikeCommentTextSecond.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_blikeCommentTextSecond.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_blikeCommentTextSecond.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_blikeCommentTextSecond.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var t=e.target;
"TEXTAREA"!==t.tagName&&"BUTTON"!==t.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var t=e.targetTouches||[];
if(t.length>0){
var o=t[0]||{};
startY=o.clientY;
}
},preventText=function(e){
var t=!1,o=e.changedTouches,i=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(o.length>0){
var l=o[0]||{},m=l.clientY;
t=m>startY&&0>=i?!1:startY>m&&i+n>=s?!1:!0,t||e.preventDefault();
}
},unsetLike2Status=function(e){
1===e?setTimeout(function(){
alert(" 已取消，想法已同步删除");
},20):showToast("已取消"),2===showType&&isShow(el_alikeComment)&&(hide(el_alikeComment),
vHide(el_acommentErrorMsg));
var t=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_alikeComment&&hide(el_alikeComment),
realLikeNum-=1,realLikeNum>=0&&"10万+"!==t&&(el_likeNum.innerHTML=dealLikeReadShow(realLikeNum));
},setLike2Status=function(e){
var t="在看";
switch(showType){
case 1:
switch(prompted){
case 0:
hide(el_likeEducate),prompted=1;
break;

case 1:
showToast(t);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),prompted){
case 0:
hide(el_likeEducate),prompted=1;
break;

case 1:
(4===e||5===e)&&showToast(4===e?"已发送":t);
}
5!==e&&(4===e?hide(el_alikeComment):show(el_alikeComment),isBeenUnvisible(el_alikeComment)&&scrollToShow(el_alikeComment)),
4!==e&&setBtnLike();
break;

case 3:
switch(hide(el_bcommentPanel2),hide(el_bcommentPanel),clear(el_blikeCommentTextSecond),
prompted){
case 0:
qs("educate_title").innerHTML="已发送到看一看",show(el_likeEducate),show(educate_btn2),
prompted=1;
break;

case 1:
showToast(t);
}
setBtnLike();
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
});
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"10万+"!==e&&(el_likeNum.innerHTML=dealLikeReadShow(realLikeNum));
},scrollToShow=function(e){
window.scrollTo(0,e.offsetHeight+window.scrollY);
};
DomEvent.on(el_blikeCommentTextSecond,"input",function(){
var e=el_blikeCommentTextSecond.value.replace(/^\s+|\s+$/g,"");
e.length>maxLikeCommentWord?(el_bcommentCurrentCount.innerHTML=e.length,vShow(el_bcommentErrorMsg)):vHide(el_bcommentErrorMsg),
e.length>0&&e.length<=maxLikeCommentWord?el_bcommentConfirm.removeAttribute("disabled"):0===e.length&&3===showType?el_bcommentConfirm.removeAttribute("disabled"):el_bcommentConfirm.setAttribute("disabled","disabled");
});
var validataComment=function(e,t){
var o=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,o,t);
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType){
if(!haokanLock){
showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
action_type=like?type:2,ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
comment:comment?comment:"",
prompted:1,
style:clientType||showType,
action_type:action_type,
passparam:window.passparam,
request_id:(new Date).getTime(),
device_type:window.devicetype
},
type:"POST",
success:function success(res){
haokanLock=!1;
var data=eval("("+res+")");
hideLoading(),0==data.base_resp.ret?(like?setLike2Status(type):unsetLike2Status(data.has_comment),
connectWithApp(like,comment,clientType)):failAlert(comment);
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
};
}
}
function showLikeNum(e){
var t=e||{};
if(t.show){
var o=t.likeAreaDom,i=t.likeNumDom,n=document.getElementById("js_like_btn");
o&&(o.style.display=t.likeAreaDisplayValue,t.liked&&(1===appmsg_like_type?Class.addClass(o,t.className):Class.addClass(n,t.className)),
o.setAttribute("like",t.liked?"1":"0"));
var s=1===appmsg_like_type?"赞":"";
realLikeNum=t.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
i&&(i.innerHTML=realLikeNum)):2===appmsg_like_type&&(i.innerHTML=dealLikeReadShow(realLikeNum));
}
}
function dealLikeReadShow(e){
if("en"==LANG)return i18n.dealLikeReadShow_en(e);
var t="";
if(parseInt(e)>1e5)t="10万+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var o=""+parseInt(e)/1e4,i=o.indexOf(".");
t=-1===i?o+"万":o.substr(0,i)+"."+o.charAt(i+1)+"万";
}else t=0===parseInt(e)?"":e;
return t;
}
function showReadNum(e){
var t=e||{};
if(t.show){
var o=t.readAreaDom,i=t.readNumDom;
o&&(o.style.display=t.readAreaDisplayValue);
var n=t.readNum||1;
1===appmsg_like_type?(parseInt(n)>1e5?n="100000+":"",i&&(i.innerHTML=n)):2===appmsg_like_type&&(i.innerHTML=dealLikeReadShow(n));
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),realLikeNum,clientShowType=5,i18n=require("appmsg/i18n.js"),maxLikeCommentWord=200;
return i18n.setLikeRead_en(document.getElementById("readTxt")),{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
function t(e){
for(var t=window.location.href,s=t.indexOf("?"),i=t.substr(s+1),n=i.split("&"),a=0;a<n.length;a++){
var _=n[a].split("=");
if(_[0].toUpperCase()==e.toUpperCase())return _[1];
}
return"";
}
var a={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
more_read_type:0,
rtId:"",
rtKey:"",
appmsg_like_type:1,
onSuccess:function(){},
onError:function(){}
};
for(var _ in e)e.hasOwnProperty(_)&&(a[_]=e[_]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),i({
url:"/mp/getappmsgext?f=json&mock="+t("mock"),
data:{
r:Math.random(),
__biz:a.biz,
appmsg_type:a.appmsg_type,
mid:a.mid,
sn:a.sn,
idx:a.idx,
scene:a.scene,
title:encodeURIComponent(a.title.htmlDecode()),
ct:a.ct,
abtest_cookie:a.abtest_cookie,
devicetype:a.devicetype.htmlDecode(),
version:a.version.htmlDecode(),
is_need_ticket:a.is_need_ticket,
is_need_ad:a.is_need_ad,
comment_id:a.comment_id,
is_need_reward:a.is_need_reward,
both_ad:a.both_ad,
reward_uin_count:a.is_need_reward?a.reward_uin_count:0,
send_time:a.send_time,
msg_daily_idx:a.msg_daily_idx,
is_original:a.is_original,
is_only_read:a.is_only_read,
req_id:a.req_id,
pass_ticket:a.pass_ticket,
is_temp_url:a.is_temp_url,
item_show_type:a.item_show_type,
tmp_version:1,
more_read_type:a.more_read_type,
appmsg_like_type:a.appmsg_like_type
},
type:"POST",
dataType:"json",
rtId:a.rtId,
rtKey:a.rtKey,
rtDesc:n,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),s("[Appmsg] success get async data"),
"function"==typeof a.onSuccess&&a.onSuccess(e),e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+a.biz+", mid="+a.mid),"function"==typeof a.onError&&a.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),n=e("rt/appmsg/getappmsgext.rt.js");
return{
getData:t
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function n(n){
n=n||window;
var i=n.cgiData;
return i&&2==i.ori_status&&1==i.is_mp_video&&(i.nick_name||i.hit_username)?!0:!1;
}
function i(n){
return n=n||window,!1;
}
function e(){
return-1!=r.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var n;
if(parent==window)n=window;else try{
{
parent.window.__videoDefaultRatio;
}
n=parent.window;
}catch(i){
n=window;
}
var e=n.__videoDefaultRatio||16/9;
return"54"==n.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:i,
showReprint:n,
getRatio:o
};
});define("pages/create_txv.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function n(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
o(e);
});
}
function o(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError),
r.Load({
url:c.jsUrl,
version:c.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,a=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(a=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1),
i.send())):(a=!1,0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1),
i.send())),a){
var d=t({
win:u,
options:e
});
o({
player:d
});
}else r.ClearCache({
win:u,
version:c.jsVersion,
url:c.jsUrl
}),n();
},
onError:function(n){
0==n.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==n.code?i.setSum("64728","119",1):52==n.code?i.setSum("64728","120",1):53==n.code&&i.setSum("64728","121",1),
i.send()),s(e);
}
});
}
function t(e){
var n=e.win||window,o=e.options,t=new n.Txp.Player({
containerId:o.containerId,
vid:o.vid,
width:o.width,
height:o.height,
autoplay:o.autoplay===!0?!0:!1,
allowFullScreen:o.allowFullScreen===!0?!0:!1
});
return t;
}
function s(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError);
var s=c.jsUrl;
s+=-1==s.indexOf("?")?"?"+c.customerParam+"="+c.jsVersion:"&"+c.customerParam+"="+c.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1),i.send();
var r=t({
win:e.win,
options:e
});
o({
player:r
});
}else i.setSum("64728","123",1),i.send(),n();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
c.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
c.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
c.jsLoadState=6,i.setSum("64728","127",1);
}
i.send(),n();
}
});
}
var i=e("biz_common/utils/monitor.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),c={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return{
createTxVideo:o,
createGlobalFunc:n
};
});define("appmsg/comment_utils.js",["appmsg/comment.js"],function(n){
"use strict";
function m(m){
1==m.comment_enabled&&(window.can_fans_comment_only=m.only_fans_can_comment,window.comment_count=m.comment_count,
window._is_fans=m.is_fans,window._logo_url=m.logo_url,window._nick_name=m.nick_name,
window.friend_comment_enabled=m.friend_comment_enabled,n("appmsg/comment.js"));
}
return{
initCommentByExtData:m
};
});define("appmsg/reward_utils.js",["appmsg/reward_entry.js","biz_wap/utils/mmversion.js","biz_common/dom/class.js","biz_common/dom/event.js"],function(e,r,n,a){
"use strict";
var i=e("appmsg/reward_entry.js"),t=e("biz_wap/utils/mmversion.js"),d=e("biz_common/dom/class.js"),s=e("biz_common/dom/event.js"),o=window.navigator.userAgent,_={
perLine:0,
hasBindResize:!1,
hasInit:!1,
pageContainerId:"img-content",
rewardInnerId:"js_reward_inner"
},w=function(e){
return document.getElementById(e);
},m=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.pageContainerId||_.pageContainerId,n=e.rewardInnerId||_.rewardInnerId,a=window.innerWidth||document.documentElement.clientWidth;
try{
var i=w(r).getBoundingClientRect();
i.width&&(a=i.width);
}catch(t){}
var d=36;
_.perLine=Math.floor(.8*a/d);
var s=w(n);
return s&&(s.style.width=_.perLine*d+"px"),_.perLine;
},u=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.pageContainerId||_.pageContainerId,n=e.rewardInnerId||_.rewardInnerId;
return e.can_reward&&w(r)&&w(n)?(_.hasBindResize||(_.hasBindResize=!0,s.on(window,"resize",function(){
m(e),_.hasInit&&i.render(_.perLine);
})),_.perLine||m(e),_.perLine):0;
},p=function(e,r){
_.hasInit=!0;
var n=e.author_id||window.author_id;
e.reward_head_imgs=e.reward_head_imgs||[];
var m=w("js_author_name");
if(r.reward_entrance_enable_for_preview)if(t.isInMiniProgram)t.isInMiniProgram&&m&&d.removeClass(m,"rich_media_meta_link");else{
if(n||t.isAndroid){
var p=w("js_preview_reward_author");
p&&(p.style.display="block");
var c=w("js_preview_reward_author_wording");
r.reward_wording&&c&&(c.innerText=r.reward_wording,c.style.display="block");
var l=w("js_preview_reward_author_link");
l&&s.on(l,"tap",function(e){
e.preventDefault(),a("预览状态下无法操作");
});
}
if(n){
var h=w("js_preview_reward_author_avatar"),g=w("js_preview_reward_author_head");
r.reward_author_head&&h&&g&&(g.setAttribute("src",r.reward_author_head),h.style.display="block");
var v=w("js_preview_reward_link_text");
v&&(v.innerText="喜欢作者");
}else t.isAndroid&&(w("js_preview_reward_author_name").style.display="none");
}else-1!=o.indexOf("WindowsWechat")||-1==o.indexOf("MicroMessenger")||t.isInMiniProgram?t.isInMiniProgram&&m&&d.removeClass(m,"rich_media_meta_link"):(i.handle(e,u({
pageContainerId:r.pageContainerId,
rewardInnerId:r.rewardInnerId,
can_reward:1==e.can_reward?!0:!1
})),m&&e.rewardsn&&e.timestamp&&(m.setAttribute("data-rewardsn",e.rewardsn),m.setAttribute("data-timestamp",e.timestamp),
m.setAttribute("data-canreward",e.can_reward)),m&&!e.can_reward&&d.removeClass(m,"rich_media_meta_link"));
};
return{
init:p,
getCountPerLine:u
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+d.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return window.__second_open__?!0:-1!=p.indexOf("&_newvideoplayer=0")?!1:-1!=p.indexOf("&_newvideoplayer=1")?!0:1!=d.is_login?!1:d.use_tx_video_player?!1:c.canSupportVideo&&m.inWechat?m.is_ios||m.is_android?!0:!1:(d._hasReportCanSupportVideo||c.canSupportVideo||!m.inWechat||(d._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function s(){
console.log("isUseAd: "+x.isInMiniProgram);
{
var e=p,i=window.location.href;
d.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=d.sn&&"f62e1cb98630008303667f77c17c43d7"!=d.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=d.sn?x.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1===e.indexOf("mp.weixin.qq.com/s")&&-1===e.indexOf("mp.weixin.qq.com/mp/appmsg/show")&&-1===e.indexOf("mp.weixin.qq.com/mp/authreadtemplate")?!1:"54"==d.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:d.__appmsgCgiData&&d.__appmsgCgiData.can_use_page&&(m.is_ios||m.is_android)?!0:u.showAd()?!0:!1:!1;
}
function o(){
var e=p,i=t(),n=(new Date).getHours(),s=!1;
return d.user_uin?-1!=e.indexOf("&_proxy=0")?!1:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:n>=9&&14>=n?!1:(-1!=e.indexOf("&_proxy=1")&&(s=!0),
m.inWechat&&m.is_android&&m.is_x5&&m.wechatVer>="6.2.2"&&(s=!0),m.inWechat&&m.is_android&&m.is_xweb&&m.xweb_version>=16&&(s=!0),
m.inWechat&&m.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||m.wechatVer>="6.2.4")&&(s=!0),
s&&i&&i.isUseProxy?!0:!1):!1;
}
function r(){
return l.networkType;
}
function t(){
var e={
isUseProxy:0,
isUsePreload:0,
experSet:0
},i=!1;
if(parseInt(window.user_uin)==parseInt(2930301160)?(e.experSet=1,i=!0):parseInt(window.user_uin)==parseInt(3190019565)?(e.experSet=2,
i=!0):parseInt(window.user_uin)==parseInt(3193024205)?(e.experSet=3,i=!0):(parseInt(window.user_uin)==parseInt(3194023964)||parseInt(window.user_uin)==parseInt(3193170635)||2756892560==parseInt(window.user_uin))&&(e.experSet=4,
i=!0),!i){
if(!(window.user_uin&&window.user_uin%100<=4))return e=!1;
e.experSet=window.user_uin%4+1;
}
if(e)switch(e.experSet){
case 1:
e.isUseProxy=0,e.isUsePreload=0;
break;

case 2:
e.isUseProxy=0,e.isUsePreload=1;
break;

case 3:
e.isUseProxy=1,e.isUsePreload=0;
break;

case 4:
e.isUseProxy=1,e.isUsePreload=1;
break;

default:
e=!1;
}
return h||(e.isUseProxy=0),y||(e.isUsePreload=0),0==e.isUseProxy&&0==e.isUsePreload?e.experSet=1:0==e.isUseProxy&&1==e.isUsePreload?e.experSet=2:1==e.isUseProxy&&0==e.isUsePreload?e.experSet=3:1==e.isUseProxy&&1==e.isUsePreload&&(e.experSet=4),
console.log("[视频代理实验]",e),e;
}
function a(e,i){
h=e,y=i;
}
var d,p,w=e("biz_common/dom/event.js"),_=e("biz_wap/jsapi/core.js"),c=e("biz_wap/utils/device.js"),u=e("new_video/ctl.js"),x=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,l={
networkType:""
},m={},h=!0,y=!0;
if(parent==window)d=window,p=window.location.href;else try{
p=parent.window.location.href,d=parent.window;
}catch(g){
p=window.location.href,d=window;
}
return function(e){
var i=c.os;
m.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),m.is_android=!!i.android,m.is_wp=!!i.phone,
m.is_pc=!(i.phone||!i.Mac&&!i.windows),m.inWechat=/MicroMessenger/.test(e),m.inWindowWechat=/WindowsWechat/i.test(e),
m.inMacWechat=/wechat.*mac os/i.test(e),m.is_android_phone=m.is_android&&/Mobile/i.test(e),
m.is_android_tablet=m.is_android&&!/Mobile/i.test(e),m.ipad=/iPad/i.test(e),m.iphone=!m.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
m.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,s=/XWEB\/([\d\.]+)/i,o=e.match(s);
o&&o[1]&&(n=parseInt(o[1])),m.is_xweb=!!o,m.xweb_version=n;
var r=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
m.wechatVer=r&&r[1]||0,w.on(window,"load",function(){
if(""==l.networkType&&m.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
_.invoke("getNetworkType",{},function(i){
l.networkType=e[i.err_msg]||"fail","network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(l.networkType="4g");
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof d._hasReportCanSupportVideo&&(d._hasReportCanSupportVideo=!1),
{
device:m,
isShowMpVideo:n,
isUseProxy:o,
isUseAd:s,
getNetworkType:r,
proxyPreloadExper:t,
modifyExper:a
};
});