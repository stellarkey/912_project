define("appmsg/emotion/selection.js",[],function(e,n){
"use strict";
function t(e,n,t){
if(!t&&e===n)return!1;
if(e.compareDocumentPosition){
var o=e.compareDocumentPosition(n);
if(20===o||0===o)return!0;
}else if(e.contains(n))return!0;
return!1;
}
function o(e,n){
var o=n.commonAncestorContainer||n.parentElement&&n.parentElement()||null;
return o?t(e,o,!0):!1;
}
n.getSelection=function(){
return document.selection?document.selection:(window.getSelection||document.getSelection)();
},n.getRange=function(e){
var n=getSelection();
if(!n)return null;
var t=void 0;
return n.getRangeAt&&n.rangeCount?t=n.getRangeAt(0):n.getRangeAt||(t=n.createRange()),
t?e&&o(e,t)?t:e?null:t:null;
},n.setCursorToEnd=function(e){
if(e){
var n=getSelection();
n.extend&&(n.extend(e,e.length),n.collapseToEnd&&n.collapseToEnd());
}
},n.contains=t;
});define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js","common/utils.js","biz_common/dom/offset.js"],function(e){
"use strict";
function t(){
if(!m){
m=!0,setTimeout(function(){
m=!1;
},20);
var e=d.getInnerHeight(),t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,i=p.querySelectorAll(".js_comment_item"),s=r.querySelectorAll(".js_comment_item");
if(o=_.getOffset(p).offsetTop,n||(n=_.getOffset(r).offsetTop),s.length)for(var a=0;a<s.length&&n+s[a].offsetTop<t+e;a++)1!=s[a].getAttribute("data-hasreport")&&(s[a].setAttribute("data-hasreport",1),
f.data.push({
content_id:s[a].dataset.content_id,
is_elected_comment:1*s[a].dataset.elected,
is_friend_comment:1,
scene:2
}));
if(i.length)for(var a=0;a<i.length&&o+i[a].offsetTop<t+e;a++)1!=i[a].getAttribute("data-hasreport")&&(i[a].setAttribute("data-hasreport",1),
f.data.push({
content_id:i[a].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*i[a].dataset.friend,
scene:1
}));
c.set("comment_expose",f,Date.now()+6048e5);
}
}
var o,n,m,i=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/event.js"),a=e("biz_wap/utils/storage.js"),d=e("common/utils.js"),c=new a("comment_expose"),_=e("biz_common/dom/offset.js"),p=document.getElementById("js_cmt_area"),r=document.getElementById("js_friend_cmt_area"),f={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},u=function(e){
e&&e.data&&e.data.length&&(l(e),c.remove("comment_expose"));
},l=function(e){
i({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:e.comment_id,
appmsgid:e.appmsgid,
idx:e.idx,
item_show_type:e.item_show_type,
__biz:e.biz,
data:JSON.stringify(e.data)
},
async:!1,
timeout:2e3
});
};
s.on(window,"scroll",t),s.on(window,"unload",function(){
u(f);
}),s.on(window,"load",function(){
var e=c.getData("comment_expose");
e&&e.comment_expose&&e.comment_expose.val&&e.comment_expose.val.appmsgid&&u(e.comment_expose.val),
t();
});
var g=function(e){
f.comment_id=e.comment_id,f.appmsgid=e.appmsgid,f.idx=e.idx,f.item_show_type=e.item_show_type||0,
f.biz=e.biz,setTimeout(function(){
t();
});
};
return g;
});define("appmsg/retry_ajax.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module,alert){
"use strict";
function Retry_ajax(e){
checkAjaxDo(e),e&&(e.success=function(a){
dealWithSucceed(a,e);
},e.error=function(){
dealWithFailed(e);
}),ajax(e);
}
function checkAjaxDo(e){
var a=isContainExceptLike(e,failedQueue),i=isContainAjax(e,failedQueue);
-1===i&&a>-1&&failedQueue.splice(a,1);
}
function isContainExceptLike(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url||-1!=e.url.indexOf("&like=")||-1!=t.url.indexOf("&like=")){
if(!(e.url.indexOf("&like=")>-1&&t.url.indexOf("&like=")>-1))continue;
if(removeLikeParam(e.url)!==removeLikeParam(t.url))continue;
}else if(!t.url||t.url!==e.url)continue;
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqualExceptLike(u,n))continue;
}
i=r;
break;
}
return i;
}
function isContainAjax(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url&&t.url&&e.url==t.url){
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqual(u,n))continue;
}
i=r;
break;
}
}
return i;
}
function removeLikeParam(e){
var a=e.indexOf("&like="),i=e.substring(0,a)+e.substring(a+7);
return i;
}
function isEqualExceptLike(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if("like"!==u&&e[u]!==a[u])return!1;
}
return!0;
}
function isEqual(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if(e[u]!==a[u])return!1;
}
return!0;
}
function dealWithSucceed(res,obj){
try{
var data=eval("("+res+")");
}catch(e){
var data=!1;
}
if(data&&data.base_resp&&0===data.base_resp.ret){
var findIndex=isContainExceptLike(obj,failedQueue);
findIndex>-1&&failedQueue.splice(findIndex,1);
}else dealWithFailed(obj);
}
function dealWithFailed(e){
var a=isContainExceptLike(e,failedQueue);
if(-1===a){
if(e.failedTimes=1,failedQueue.length>=MAX_QUEUE_LEN)return;
failedQueue.push(e);
}else{
var i=isContainAjax(e,failedQueue);
if(i>-1){
if(failedQueue[a].failedTimes++,e.failedTimes=failedQueue[a].failedTimes,e.failedTimes>MAX_FAILED_TIMES)return void failedQueue.splice(i,1);
}else failedQueue.splice(i,1),e.failedTimes=1,failedQueue.push(e);
}
Retry_ajax(e);
}
var ajax=require("biz_wap/utils/ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),failedQueue=[],MAX_FAILED_TIMES=2,MAX_QUEUE_LEN=20;
return Retry_ajax;
});define("complain/tips.js",["biz_common/utils/string/html.js","biz_common/dom/event.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var i=t("biz_common/dom/event.js"),o={
tipsTimeoutId:null,
tipsDom:document.getElementById("tips")
},s={
showErrTips:function(t,i){
var s=i||o.tipsDom;
return t===!1?void(s.style.display="none"):(this.resetTips(),s.innerHTML=t.htmlEncode(),
s.style.display="block",clearTimeout(o.tipsTimeoutId),void(o.tipsTimeoutId=setTimeout(function(){
s.style.display="none";
},4e3)));
},
resetTips:function(t){
setTimeout(function(){
var i=t||o.tipsDom;
i&&(i.style.top=document.body.scrollTop+"px");
},0);
}
};
return i.on(window,"scroll",function(){
s.resetTips();
}),s;
});define("appmsg/related_article_feedback.js",["biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
for(;!e.parentNode.className.match(t);)e=e.parentNode;
return e.parentNode||"";
}
function a(e){
this.container=e.container,this.biz=e.biz,this.mid=e.mid,this.idx=e.idx,this.dislikeCb=e.dislikeCb,
"top"===e.position&&s.addClass(this.container.querySelector(".js_dialog_wrp"),"feedback_dialog_pos_top"),
this.bindEvent();
}
function i(e){
var i=e.container;
n.on(i,"touchstart",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(i,"touchend",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(i,"click",".js_feedback_btn",function(i){
i.stopPropagation();
var o=i.delegatedTarget,s=t(o,"js_related_item"),n=s.getBoundingClientRect(),r=268;
console.log(d.getInnerHeight()),console.log(n.bottom),l=new a({
container:s,
biz:e.biz,
mid:e.mid,
idx:e.idx,
position:d.getInnerHeight()-n.bottom<r?"top":"bottom",
dislikeCb:e.dislikeCb
}),l.show();
},!0);
}
var o=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/class.js"),n=e("biz_common/dom/event.js"),r=e("biz_common/utils/url/parse.js"),d=e("common/utils.js"),l=null;
return a.prototype.bindEvent=function(){
var e=this,a=this.container,i=this.biz,d=this.mid,l=this.idx,c=a.getAttribute("data-url"),u=new Set,_=new Set,m=a.querySelector(".js_submit");
this.tabClickEventHandler=function(e){
e.stopPropagation(),e.preventDefault();
var t=e.delegatedTarget,a=t.getAttribute("data-value");
s.hasClass(t,"js_reason")&&(a*=1),s.hasClass(t,"feedback_tag_selected")?(s.removeClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.delete(a):_.delete(a)):(s.addClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.add(a):_.add(a)),0===u.size&&0===_.size?s.addClass(m,"weui-btn_disabled"):s.removeClass(m,"weui-btn_disabled");
},this.submitDataHandler=function(a){
a.stopPropagation(),a.preventDefault();
var n=a.target;
if(!s.hasClass(n,"weui-btn_disabled")){
var m={
tacitly:Array.from(u),
keyword:Array.from(_)
};
o({
type:"POST",
url:"/mp/relatedarticle?action=dislike",
dataType:"json",
data:{
biz_from:i,
mid_from:d,
idx_from:l,
biz:r.getQuery("__biz",c),
mid:r.getQuery("mid",c),
idx:r.getQuery("idx",c),
reason:JSON.stringify(m)
},
success:function(a){
if(console.log(a),a&&a.base_resp&&0===a.base_resp.ret){
e.hide(n);
var i=t(n,"js_related_item");
e.dislikeCb(i);
}else window.weui.alert("系统错误，请稍后重试");
}
});
}
},this.maskHandler=function(t){
t.stopPropagation(),t.preventDefault(),e.hide(t.target);
},this.maskTouchMoveHandler=function(e){
e.stopPropagation(),e.preventDefault();
},this.stopPropagationHandler=function(e){
e.stopPropagation();
},n.on(a,"click",".js_tag_item",this.tabClickEventHandler,!0),n.on(m,"click",this.submitDataHandler,!0),
n.on(a,"click",".js_mask",this.maskHandler,!0),n.on(a,"touchmove",".js_mask",this.maskTouchMoveHandler,!0),
n.on(a,"touchmove",".js_dialog_wrp",this.maskTouchMoveHandler,!0),n.on(a,"click",".js_dialog_wrp",this.maskTouchMoveHandler,!1),
n.on(a,"touchstart",".js_feedback_dialog",this.stopPropagationHandler,!0),n.on(a,"touchend",".js_feedback_dialog",this.stopPropagationHandler,!0);
},a.prototype.show=function(){
this.container.querySelector(".js_feedback_dialog").style.display="",s.addClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},a.prototype.hide=function(){
var e=this.container,t=e.querySelector(".js_submit");
n.off(e,"click",this.tabClickEventHandler,!0),n.off(t,"click",this.submitDataHandler,!0),
n.off(e,"click",this.maskHandler,!0),n.off(e,"touchmove",this.maskTouchMoveHandler,!0),
n.off(e,"click",this.maskTouchMoveHandler,!1),s.removeClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},{
init:i
};
});define("appmsg/related_article_tpl.html.js",[],function(){
return'<# list.forEach(function(item, idx) { #>\n<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg js_related_item" data-idx="<#=begin+idx#>" data-url="<#=item.url#>" data-time="<#=item.send_time#>" data-recalltype="<#=item.recall_type#>" data-isreaded="<#=item.is_readed#>">\n    <div class="weui-media-box__bd">\n      <!---\n      原生省略号无法实现多行省略号后接其它信息的效果\n      模拟省略号组件：style/widget/ellipsis.less\n      为了实现标题在省略号后显示标签，要做份假数据用来获取相同位置\n      另增加两种状态：省略号后不带标签、三个字标签\n      -->\n      <div class="ellipsis_relate_title weui_ellipsis_mod_wrp\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n              relate_article_pay\n              <# } else { #>\n              <# } #>\n            <# } else { #>\n              relate_article_default\n            <# } #>\n        ">\n        <div class="weui_ellipsis_mod">\n          <div class="weui_ellipsis_mod_inner">\n            <#=item.title#>\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n              <span class="pay__tag">已付费</span>\n              <# } else { #>\n              <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n        </div>\n        <div class="weui_ellipsis_fake_mod">\n          <div class="weui_ellipsis_fake_inner">\n            <#=item.title#>\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n              <span class="pay__tag">已付费</span>\n              <# } else { #>\n              <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n          <div class="weui_ellipsis_fake_placeholder"></div>\n          <div class="weui_ellipsis_fake_extra">...\n            <# if (item.is_pay_subscribe) { #>\n              <# if (item.is_paid) { #>\n              <span class="pay__tag">已付费</span>\n              <# } else { #>\n              <span class="unpay__tag">付费</span>\n              <# } #>\n            <# } #>\n          </div>\n        </div>\n      </div>\n      <div class="weui-media-box__info">\n        <div class="weui-media-box__info__inner">\n          <# if (item.is_pay_subscribe) { #>\n            <# if (item.pay_friend_cnt > 0) { #>\n            <div style="display:none;" class="weui-media-box__info__meta"><#=item.pay_friend_cnt#>位朋友付费</div>\n            <# } #>\n            <# if (item.pay_cnt > 0) { #>\n            <div class="weui-media-box__info__meta">付费<#=item.pay_cnt_wording#></div>\n            <# } else { #>\n            <div class="weui-media-box__info__meta">可试读前<#=item.preview_percent#>%</div>\n            <# } #>\n          <# } else { #>\n            <# if (item.friends_count > 0) { #>\n            <div style="display:none;" class="weui-media-box__info__meta"><#=item.friends_count#>位朋友读过</div>\n            <# } #>\n            <# if (item.comment_num >= 20) { #>\n            <div class="weui-media-box__info__meta">精选留言<#=item.comment_num#></div>\n            <# } else if (item.read_num > 0) { #>\n            <div class="weui-media-box__info__meta">阅读 <#=item.read_num_wording#></div>\n            <# } #>\n          <# } #>\n          <div class="js_profile relate_profile relate_article_panel_active" data-username="<#=item.username#>">\n            <div class="weui-media-box__info__meta">\n              <span class="relate_profile_nickname">\n                <#=item.nickname#>\n              </span>\n            </div>\n          </div>\n        </div>\n        <div class="relate_article_opr">\n          <button type="button" class="reset_btn dislike_btn js_feedback_btn">不喜欢</button>\n        </div>\n        <!-- 去掉display:none;改用样式默认隐藏，加classnamme:feedback_dialog_show显示 -->\n        <div class="feedback_dialog_wrp js_feedback_dialog">\n          <div class="weui-mask js_mask"></div>\n          <!-- 底部时弹窗向上，加.feedback_dialog_pos_top -->\n          <div class="feedback_dialog js_dialog_wrp">\n            <div class="feedback_dialog_hd weui-flex">\n              <div class="weui-flex__item feedback_dialog_title">不看的原因</div>\n              <button type="button" class="weui-btn weui-btn_primary weui-btn_mini weui-btn_disabled js_submit">确定</button>\n            </div>\n            <div class="feedback_dialog_bd">\n              <ul class="feedback_tag_list">\n                <!-- 选中时tag加.feedback_tag_selected -->\n                <# reason.forEach(function(r) { #>\n                <li class="feedback_tag_item js_reason js_tag_item" data-value="<#=r.value#>"><#=r.name#></li>\n                <# }); #>\n                <# item.keyword.forEach(function(k,i) { #>\n                  <# if (i<2) { #>\n                    <li class="feedback_tag_item js_keyword js_tag_item" data-value="<#=k#>">对<#=k#>不感兴趣</li>\n                  <# } #>\n                <# }); #>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="weui-media-box__ft" style="background-image:url(<#=item.cover#>)"></div>\n</a>\n<# }); #>\n\n';
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);
}
return e;
};
define("appmsg/reward_entry.js",["biz_wap/ui/weui.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js","appmsg/open_url_with_webview.js","common/utils.js","biz_wap/utils/device.js","appmsg/loading.js","common/comm_report.js","appmsg/pay_read_utils.js"],function(e,t,n,r){
"use strict";
function a(e){
e&&(e.style.display="block");
}
function i(e){
e&&(e.style.display="none");
}
function d(){
v.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
pass_ticket:window.pass_ticket,
scene:T.scene,
title:T.title,
ct:ct,
devicetype:T.devicetype,
version:T.version,
is_need_reward:T.is_need_reward,
reward_uin_count:T.is_need_reward?3*p:0,
send_time:T.send_time||"",
item_show_type:window.item_show_type||"",
rtId:T.appmsgextRtId,
rtKey:T.appmsgextRtKey,
is_pay_subscribe:window.isPaySubscribe,
pay_subscribe_uin_count:window.isPaySubscribe?3*k.getCountPerLine():0,
onSuccess:function(e){
e&&(E.rewardLink&&m.off(E.rewardLink,"click",C),E.authorAvatarLink&&m.off(E.authorAvatarLink,"click",D),
console.log("reloadRewardData:",e),H=[],o({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp,
reward_author_head:e.reward_author_head,
rewardsn:e.rewardsn,
can_whisper:e.can_whisper
}),k.init(e.pay_subscribe_info,{
rewardTotal:e.reward_total_count,
rewardTotalCut:e.is_reward_total_count_cut
},!0));
},
onError:function(){}
});
}
function s(e,t){
var n=function(){
P.src=t+"&qrcode_timestamp="+1*new Date+"#wechat_redirect";
},a=null;
return function(t){
if("0"==T.user_can_reward)return void r("你已成为该公众号的黑名单用户，暂时无法赞赏。");
if(t.preventDefault(),T.isWindowsWechat){
var i=function(){
var e="js_author_reward_qrcode",t="reward_pop_show",r=document.getElementById(e);
if(r.classList.contains(t))return{
v:void 0
};
n(),a=setInterval(n,12e4),r.classList[E.rewardLink.getBoundingClientRect().top<222?"add":"remove"]("reward_pop_bottom"),
r.classList.add(t);
var i=function d(n){
if(r.classList.contains(t)){
for(var i=n.target;null!==i&&i.id!==e;)i=i.parentNode;
(null===i||i.id!==e)&&(r.classList.remove(t),clearInterval(a),a=null,m.off(window,"click",d));
}
};
setTimeout(function(){
m.on(window,"click",i);
},1);
}();
if("object"===("undefined"==typeof i?"undefined":_typeof(i)))return i.v;
}else-1==e.indexOf("&__tc=1")&&window.__addIdKeyReport?window.__addIdKeyReport(T.likeHeadId,T.likeHeadKey):window.__addIdKeyReport&&window.__addIdKeyReport(T.likeBtnId,T.likeBtnKey),
f.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
});
};
}
function o(e){
var t=window.innerWidth||document.documentElement.innerWidth,n=(Math.ceil((b.getInnerHeight()-188)/42)+1)*Math.floor((t-15)/42);
_="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+n+"&source=1#wechat_redirect";
var r="#wechat_redirect",o="";
o="https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+T.author_id+"&idx="+idx+"&scene="+T.authorPageScene+"&rscene="+T.authorPageRscene+"&from_scene="+window.source+"&from_subscene="+window.subscene+"&from_enterid="+window.enterid+"&from_sessionid="+window.sessionid+"&is_fans="+e.isFans,
e.rewardsn&&(o+="&rewardsn="+e.rewardsn),o+=r,-1==navigator.userAgent.indexOf("Android")||T.author_id||(o="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1&rewardsn="+e.rewardsn+r);
var u=E.rewardLink,v=E.authorAvatarLink;
if(u){
b.listenStateChange({
cb:function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=B)return;
localStorage.setItem("lastOnresumeTime",t),g.isAndroid&&!T.author_id&&f.invoke("setNavigationBarColor",{
actionCode:"1"
}),d();
}
}
});
var x="/mp/authorreward?action=getqrcode&author_id="+T.author_id+"&rewardsn="+e.rewardsn+"&timestamp="+e.timestamp+"&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&size=160";
if(C=s(o.replace(r,"&__tc=1"+r),x),D=s(o,x),m.on(u,"click",C),T.author_id&&1==e.can_reward&&v&&m.on(v,"click",D),
1==e.can_reward&&T.author_id&&E.reward){
a(document.getElementById("js_reward_author")),a(E.authorAvatarLink),E.rewardAuthorHead&&E.rewardAuthorHead.setAttribute("src",e.reward_author_head),
E.reward.classList.add("reward_area_primary");
var I=E.rewardLinkText;
I&&(I.innerText="喜欢作者",Math.random()<.05?I.innerText="稀罕作者":Math.random()>.05&&Math.random()<.1&&(I.innerText="钟意作者")),
E.rewardTotalText&&(E.rewardTotalText.innerText="人喜欢"),T.isWindowsWechat&&E.reward.classList.add("reward_area_win"),
e.can_whisper?N():q();
}
}
L=e.reward_head_imgs;
var j=c();
E.reward&&(T.author_id||g.isAndroid)&&1==e.can_reward?(a(E.reward),m.on(window,"load",function(){
l&&(m.off(window,"scroll",l),m.on(window,"scroll",l));
})):i(E.reward);
var k=document.getElementById("js_reward_inner");
!window.isPaySubscribe&&k&&j>0&&a(k);
var A=[].concat(L),M=document.getElementById("js_reward_total");
if(z=16*p,H=[].concat(L),M)if(M.innerText=e.reward_total,T.isWindowsWechat){
var R=M.parentNode;
R.dataset.hasEvent||!function(){
var t=document.getElementById("js_reward_pagination"),n=t.getElementsByClassName("js_reward_pagination_curpage")[0],r=Math.ceil(e.reward_total/z),d=1,s=!0,o=document.getElementById("js_reward_list"),c=function(t,n){
for(var a=(t-1)*z,i=s?3*p:0,d=document.createDocumentFragment(),c=a+i,l=t===r?e.reward_total:t*z;l>c;c++)w(d,n?window.defaultAvatarUrl:H[c]);
return!s&&(o.innerHTML=""),o.appendChild(d),s=!1,n?function(){
for(var e=o.getElementsByClassName("reward_user_avatar"),t=i,n=e.length;n>t;t++)e[t].firstElementChild.src=H[a+t];
}:!1;
};
n.innerHTML=d,t.getElementsByClassName("js_reward_pagination_totalpage")[0].innerHTML=r;
var l="/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&count="+z,u=null,_=function(t){
var n=H.length;
e.reward_total>n&&t*z>n?(u=null,u=c(t,!0),h({
url:l+"&offset="+(t-1)*z+"#wechat_redirect",
type:"GET",
success:function(e){
try{
e=JSON.parse(e),e.reward_heads=JSON.parse(e.reward_heads).reward_heads;
}catch(t){
e={};
}
e.base_resp&&0===e.base_resp.ret&&(e.reward_heads.forEach(function(e){
var t=A.indexOf(e);
t>-1?A.splice(t,1):H.push(e);
}),"function"==typeof u&&u());
}
})):c(t);
};
j<e.reward_total&&!function(){
E.reward.classList.add("reward_avatar_overflow");
for(var w=o.children[0];1!==w.nodeType;)w=reward.nextElementSibling;
var c=getComputedStyle(w),l=w.offsetHeight+parseInt(c.marginBottom)+parseInt(c.marginTop);
S=function(t){
o.style.height="fold"===t?3*l+"px":r>d?l*Math.ceil(z/p)+"px":l*Math.ceil(e.reward_total%z/p)+"px";
},S("fold"),m.on(R,"click",function(){
E.reward.classList.contains("reward_avatar_unfold")?(E.reward.classList.remove("reward_avatar_unfold"),
r>1&&i(t),S("fold")):(1===d&&s&&_(d),E.reward.classList.add("reward_avatar_unfold"),
r>1&&a(t),S("unfold"));
}),r>1&&m.on(t,"click",function(e){
var t=e.target;
if(t.classList.contains("js_reward_pagination_prev")){
if(d--,n.innerHTML=d,_(d),1===d&&(t.disabled=!0),d===r-1){
for(;t&&!t.classList.contains("js_reward_pagination_next");)t=t.nextElementSibling;
t&&(t.disabled=!1),S("unfold");
}
}else if(t.classList.contains("js_reward_pagination_next")&&(d++,n.innerHTML=d,_(d),
d===r&&(t.disabled=!0,S("unfold")),2===d)){
for(;t&&!t.classList.contains("js_reward_pagination_prev");)t=t.previousElementSibling;
t&&(t.disabled=!1);
}
});
}(),R.dataset.hasEvent=1;
}();
}else M.setAttribute("data-href",_),M.getAttribute("data-hasevent")||(m.on(M,"click",function(){
var e=M.getAttribute("data-href");
return y(e,{
sample:1,
reject:function(){
location.href=e;
}
}),!1;
}),M.setAttribute("data-hasevent",1));
}
function w(e,t){
var n=document.createElement("span");
n.className="reward_user_avatar";
var r=new Image;
return r.onload=function(){
window.logs&&window.logs.reward_heads_total++,r.onload=r.onerror=null;
},r.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
r.onload=r.onerror=null;
},r.src=t,n.appendChild(r),e.appendChild(n),n;
}
function c(e){
var t=H.length?H:L;
if(t.length){
var n=document.getElementById("js_reward_list"),r=0,a=document.createDocumentFragment();
if(n){
var i=E.reward.classList.contains("reward_avatar_unfold");
if("function"==typeof S&&S(i?"unfold":"fold"),!e){
for(var d=0,s=t.length;s>d&&(r++,w(a,t[d]),i||r!==3*p)&&r!==(z||16*p);++d);
r>p&&(n.className+=" tl"),n.innerHTML="",n.appendChild(a);
}
}
return r;
}
}
function l(){
if(E.reward){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+b.getInnerHeight()>E.reward.offsetTop&&(h({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),m.off(window,"scroll",l),l=null);
}
}
function u(e){
"undefined"!=typeof e.scene&&(T.scene=e.scene),"undefined"!=typeof e.is_need_reward&&(T.is_need_reward=e.is_need_reward),
"undefined"!=typeof e.title&&(T.title=e.title),"undefined"!=typeof e.author_id&&(T.author_id=e.author_id),
"undefined"!=typeof e.user_can_reward&&(T.user_can_reward=e.user_can_reward),"undefined"!=typeof e.appmsgextRtId&&(T.appmsgextRtId=e.appmsgextRtId),
"undefined"!=typeof e.appmsgextRtKey&&(T.appmsgextRtKey=e.appmsgextRtKey),"undefined"!=typeof e.likeHeadId&&(T.likeHeadId=e.likeHeadId),
"undefined"!=typeof e.likeHeadKey&&(T.likeHeadKey=e.likeHeadKey),"undefined"!=typeof e.likeBtnId&&(T.likeBtnId=e.likeBtnId),
"undefined"!=typeof e.likeBtnKey&&(T.likeBtnKey=e.likeBtnKey),"undefined"!=typeof e.authorPageScene&&(T.authorPageScene=e.authorPageScene),
"undefined"!=typeof e.authorPageRscene&&(T.authorPageRscene=e.authorPageRscene),
"undefined"!=typeof e.devicetype&&(T.devicetype=e.devicetype),"undefined"!=typeof e.version&&(T.version=e.version),
"undefined"!=typeof e.send_time&&(T.send_time=e.send_time);
}
e("biz_wap/ui/weui.js");
var p,_,m=e("biz_common/dom/event.js"),h=e("biz_wap/utils/ajax.js"),f=e("biz_wap/jsapi/core.js"),g=(e("rt/appmsg/getappmsgext.rt.js"),
e("biz_wap/utils/mmversion.js")),v=e("appmsg/appmsgext.js"),y=e("appmsg/open_url_with_webview.js"),b=e("common/utils.js"),x=e("biz_wap/utils/device.js"),I=e("appmsg/loading.js"),j=e("common/comm_report.js"),k=e("appmsg/pay_read_utils.js"),T={
scene:window.source||"",
is_need_reward:!1,
title:window.msg_title||"",
author_id:window.author_id||"",
user_can_reward:!0,
appmsgextRtId:"",
appmsgextRtKey:"",
likeHeadId:"110809",
likeHeadKey:"2",
likeBtnId:"110809",
likeBtnKey:"3",
authorPageScene:"142",
authorPageRscene:"128",
devicetype:window.devicetype||"",
version:window.version||"",
send_time:window.send_time||"",
isWindowsWechat:-1!==window.navigator.userAgent.indexOf("WindowsWechat"),
whisperMaxLen:40,
focusTag:!1,
doubleInputChar:["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],
sendLock:!1
},E={
reward:document.getElementById("js_reward_area"),
rewardLink:document.getElementById("js_reward_link"),
authorAvatarLink:document.getElementById("js_reward_avatar"),
rewardAuthorHead:document.getElementById("js_reward_author_head"),
rewardLinkText:document.getElementById("js_reward_link_text"),
rewardTotalText:document.getElementById("js_reward_total_text"),
whisperWrap:document.getElementById("js_reward_whisper"),
whisperDialogShow:document.getElementById("js_show_whisper_dialog"),
whisperDialogHide:document.getElementById("js_hide_whisper_dialog"),
whisperDialogMask:document.getElementById("js_whisper_dialog_mask"),
whisperDialog:document.getElementById("js_reward_whisper_dialog"),
whisperTextarea:document.getElementById("js_whisper_text"),
whisperMsg:document.getElementById("js_whisper_msg"),
whisperCnt:document.getElementById("js_whisper_current_cnt"),
whisperSend:document.getElementById("js_whisper_send")
},L=[],B=500,S=null,z=0,H=[];
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var A,M=function(e){
var t=e.target;
"TEXTAREA"!==t.tagName&&"BUTTON"!==t.tagName&&(e.preventDefault(),e.stopPropagation());
},R=function(e){
var t=e.targetTouches||[];
if(t.length>0){
var n=t[0]||{};
A=n.clientY;
}
},K=function(e){
var t=!1,n=e.changedTouches,r=this.scrollTop,a=this.offsetHeight,i=this.scrollHeight;
if(n.length>0){
var d=n[0]||{},s=d.clientY;
t=s>A&&0>=r?!1:A>s&&r+a>=i?!1:!0,t||e.preventDefault();
}
},O=function(){
document.addEventListener("touchmove",M,{
passive:!1
}),E.whisperTextarea.addEventListener("touchstart",R,{
passive:!1
}),E.whisperTextarea.addEventListener("touchmove",K,!1);
},W=function(){
document.removeEventListener("touchmove",M,{
passive:!1
}),E.whisperTextarea.removeEventListener("touchstart",R,{
passive:!1
}),E.whisperTextarea.removeEventListener("touchmove",K,!1);
},C=function(){},D=function(){},P=document.getElementById("js_author_reward_qrcode_img"),N=function(){
return a(E.whisperWrap);
},q=function(){
return i(E.whisperWrap);
},F=function(e){
var t=0;
try{
t=1*window.atob(window.biz);
}catch(n){}
var r={
BizUin:t,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
IsFans:e
},d=function(){
i(E.whisperDialog),E.whisperTextarea.value="",E.whisperSend.disabled=!0,W();
},s=function(e){
return weui.alert(e&&e>T.whisperMaxLen?"悄悄话不可以超过字":"网络异常，请稍后重试");
};
m.on(E.whisperDialogShow,"click",function(){
j.report(19048,_extends({
EventType:2
},r)),a(E.whisperDialog),E.whisperTextarea.focus(),O();
}),m.on(E.whisperDialogHide,"mousedown",d),m.on(E.whisperDialogMask,"mousedown",d),
m.on(E.whisperTextarea,"input",function(e){
var t=e.target.value.replace(/^\s+|\s+$/g,"").length;
t>T.whisperMaxLen?(E.whisperSend.disabled=!0,E.whisperCnt.innerHTML=t,E.whisperMsg.style.visibility="visible"):(E.whisperSend.disabled=0===t,
E.whisperMsg.style.visibility="hidden"),x.os.ios&&e.data&&T.doubleInputChar.indexOf(e.data)>-1&&(T.focusTag=!0);
}),m.on(E.whisperTextarea,"click",function(e){
if(x.os.ios&&T.focusTag){
var t=e.target;
t.blur(),t.focus(),T.focusTag=!1;
}
}),m.on(E.whisperSend,"mousedown",function(){
if(!E.whisperSend.disabled&&!T.sendLock){
T.sendLock=!0,j.report(19048,_extends({
EventType:3
},r)),I.show("发送中");
var e=E.whisperTextarea.value.replace(/^\s+|\s+$/g,"");
h({
url:"/mp/author?action=whisper",
data:{
__biz:window.biz||window.__biz,
mid:window.mid||window.appmsgid,
idx:window.idx,
content:e,
scene:window.source,
subscene:window.subscene,
enterid:window.enterid,
sessionid:window.sessionid
},
type:"POST",
success:function(t){
try{
t=JSON.parse(t);
}catch(n){
t={};
}
T.sendLock=!1,I.hide(),t&&t.base_resp&&0===t.base_resp.ret?(d(),q(),weui.toast("已发送",1e3)):s(e.length);
},
error:function(){
T.sendLock=!1,I.hide(),s();
}
});
}
});
};
return{
handle:function(e,t){
p=t,u(e),1==e.can_reward&&T.author_id&&E.reward&&F(e.isFans),o(e);
},
render:function(e){
p=e,c(!0);
},
bindWhisperEvent:F,
showWhisperWrap:N
};
});define("appmsg/i18n.js",[],function(e,n){
"use strict";
n.dealLikeReadShow_en=function(e){
if("undefined"==typeof LANG||!LANG)return 0===parseInt(e)?"":e;
if("en"==LANG){
var n="";
if(parseInt(e)>1e5)n="100k+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var r=""+parseInt(e)/1e3,t=r.indexOf(".");
n=-1===t?r+"k":r.substr(0,t)+"."+r.charAt(t+1)+"k";
}else n=0===parseInt(e)?"":e;
return n;
}
return"";
};
});!function(e){
var c="object"==typeof window&&window||"object"==typeof self&&self;
"function"==typeof define?define("biz_common/utils/emoji_data.js",[],function(c,o){
"use strict";
return e(o);
}):c&&"undefined"==typeof c.__emojiData&&(c.__emojiData=e({}));
}(function(){
return[{
id:0,
cn:"[微笑]",
hk:"[微笑]",
us:"[Smile]",
code:"/::)",
web_code:"/微笑",
style:"icon_smiley_0"
},{
id:1,
cn:"[撇嘴]",
hk:"[撇嘴]",
us:"[Grimace]",
code:"/::~",
web_code:"/撇嘴",
style:"icon_smiley_1"
},{
id:2,
cn:"[色]",
hk:"[色]",
us:"[Drool]",
code:"/::B",
web_code:"/色",
style:"icon_smiley_2"
},{
id:3,
cn:"[发呆]",
hk:"[發呆]",
us:"[Scowl]",
code:"/::|",
web_code:"/发呆",
style:"icon_smiley_3"
},{
id:4,
cn:"[得意]",
hk:"[得意]",
us:"[CoolGuy]",
code:"/:8-)",
web_code:"/得意",
style:"icon_smiley_4"
},{
id:5,
cn:"[流泪]",
hk:"[流淚]",
us:"[Sob]",
code:"/::<",
web_code:"/流泪",
style:"icon_smiley_5"
},{
id:6,
cn:"[害羞]",
hk:"[害羞]",
us:"[Shy]",
code:"/::$",
web_code:"/害羞",
style:"icon_smiley_6"
},{
id:7,
cn:"[闭嘴]",
hk:"[閉嘴]",
us:"[Silent]",
code:"/::X",
web_code:"/闭嘴",
style:"icon_smiley_7"
},{
id:8,
cn:"[睡]",
hk:"[睡]",
us:"[Sleep]",
code:"/::Z",
web_code:"/睡",
style:"icon_smiley_8"
},{
id:9,
cn:"[大哭]",
hk:"[大哭]",
us:"[Cry]",
code:"/::'(",
web_code:"/大哭",
style:"icon_smiley_9"
},{
id:10,
cn:"[尴尬]",
hk:"[尷尬]",
us:"[Awkward]",
code:"/::-|",
web_code:"/尴尬",
style:"icon_smiley_10"
},{
id:11,
cn:"[发怒]",
hk:"[發怒]",
us:"[Angry]",
code:"/::@",
web_code:"/发怒",
style:"icon_smiley_11"
},{
id:12,
cn:"[调皮]",
hk:"[調皮]",
us:"[Tongue]",
code:"/::P",
web_code:"/调皮",
style:"icon_smiley_12"
},{
id:13,
cn:"[呲牙]",
hk:"[呲牙]",
us:"[Grin]",
code:"/::D",
web_code:"/呲牙",
style:"icon_smiley_13"
},{
id:14,
cn:"[惊讶]",
hk:"[驚訝]",
us:"[Surprise]",
code:"/::O",
web_code:"/惊讶",
style:"icon_smiley_14"
},{
id:15,
cn:"[难过]",
hk:"[難過]",
us:"[Frown]",
code:"/::(",
web_code:"/难过",
style:"icon_smiley_15"
},{
id:16,
cn:"[酷]",
hk:"[酷]",
us:"[Ruthless]",
code:"/::+",
web_code:"/酷",
style:"icon_smiley_16"
},{
id:17,
cn:"[冷汗]",
hk:"[冷汗]",
us:"[Blush]",
code:"/:--b",
web_code:"/冷汗",
style:"icon_smiley_17"
},{
id:18,
cn:"[抓狂]",
hk:"[抓狂]",
us:"[Scream]",
code:"/::Q",
web_code:"/抓狂",
style:"icon_smiley_18"
},{
id:19,
cn:"[吐]",
hk:"[吐]",
us:"[Puke]",
code:"/::T",
web_code:"/吐",
style:"icon_smiley_19"
},{
id:20,
cn:"[偷笑]",
hk:"[偷笑]",
us:"[Chuckle]",
code:"/:,@P",
web_code:"/偷笑",
style:"icon_smiley_20"
},{
id:21,
cn:"[愉快]",
hk:"[愉快]",
us:"[Joyful]",
code:"/:,@-D",
web_code:"/可爱",
style:"icon_smiley_21"
},{
id:22,
cn:"[白眼]",
hk:"[白眼]",
us:"[Slight]",
code:"/::d",
web_code:"/白眼",
style:"icon_smiley_22"
},{
id:23,
cn:"[傲慢]",
hk:"[傲慢]",
us:"[Smug]",
code:"/:,@o",
web_code:"/傲慢",
style:"icon_smiley_23"
},{
id:24,
cn:"[饥饿]",
hk:"[饑餓]",
us:"[Hungry]",
code:"/::g",
web_code:"/饥饿",
style:"icon_smiley_24"
},{
id:25,
cn:"[困]",
hk:"[累]",
us:"[Drowsy]",
code:"/:|-)",
web_code:"/困",
style:"icon_smiley_25"
},{
id:26,
cn:"[惊恐]",
hk:"[驚恐]",
us:"[Panic]",
code:"/::!",
web_code:"/惊恐",
style:"icon_smiley_26"
},{
id:27,
cn:"[流汗]",
hk:"[流汗]",
us:"[Sweat]",
code:"/::L",
web_code:"/流汗",
style:"icon_smiley_27"
},{
id:28,
cn:"[憨笑]",
hk:"[大笑]",
us:"[Laugh]",
code:"/::>",
web_code:"/憨笑",
style:"icon_smiley_28"
},{
id:29,
cn:"[悠闲]",
hk:"[悠閑]",
us:"[Commando]",
code:"/::,@",
web_code:"/大兵",
style:"icon_smiley_29"
},{
id:30,
cn:"[奋斗]",
hk:"[奮鬥]",
us:"[Determined]",
code:"/:,@f",
web_code:"/奋斗",
style:"icon_smiley_30"
},{
id:31,
cn:"[咒骂]",
hk:"[咒罵]",
us:"[Scold]",
code:"/::-S",
web_code:"/咒骂",
style:"icon_smiley_31"
},{
id:32,
cn:"[疑问]",
hk:"[疑問]",
us:"[Shocked]",
code:"/:?",
web_code:"/疑问",
style:"icon_smiley_32"
},{
id:33,
cn:"[嘘]",
hk:"[噓]",
us:"[Shhh]",
code:"/:,@x",
web_code:"/嘘",
style:"icon_smiley_33"
},{
id:34,
cn:"[晕]",
hk:"[暈]",
us:"[Dizzy]",
code:"/:,@@",
web_code:"/晕",
style:"icon_smiley_34"
},{
id:35,
cn:"[疯了]",
hk:"[瘋了]",
us:"[Tormented]",
code:"/::8",
web_code:"/折磨",
style:"icon_smiley_35"
},{
id:36,
cn:"[衰]",
hk:"[衰]",
us:"[Toasted]",
code:"/:,@!",
web_code:"/衰",
style:"icon_smiley_36"
},{
id:37,
cn:"[骷髅]",
hk:"[骷髏頭]",
us:"[Skull]",
code:"/:!!!",
web_code:"/骷髅",
style:"icon_smiley_37"
},{
id:38,
cn:"[敲打]",
hk:"[敲打]",
us:"[Hammer]",
code:"/:xx",
web_code:"/敲打",
style:"icon_smiley_38"
},{
id:39,
cn:"[再见]",
hk:"[再見]",
us:"[Wave]",
code:"/:bye",
web_code:"/再见",
style:"icon_smiley_39"
},{
id:40,
cn:"[擦汗]",
hk:"[擦汗]",
us:"[Speechless]",
code:"/:wipe",
web_code:"/擦汗",
style:"icon_smiley_40"
},{
id:41,
cn:"[抠鼻]",
hk:"[摳鼻]",
us:"[NosePick]",
code:"/:dig",
web_code:"/抠鼻",
style:"icon_smiley_41"
},{
id:42,
cn:"[鼓掌]",
hk:"[鼓掌]",
us:"[Clap]",
code:"/:handclap",
web_code:"/鼓掌",
style:"icon_smiley_42"
},{
id:43,
cn:"[糗大了]",
hk:"[羞辱]",
us:"[Shame]",
code:"/:&-(",
web_code:"/糗大了",
style:"icon_smiley_43"
},{
id:44,
cn:"[坏笑]",
hk:"[壞笑]",
us:"[Trick]",
code:"/:B-)",
web_code:"/坏笑",
style:"icon_smiley_44"
},{
id:45,
cn:"[左哼哼]",
hk:"[左哼哼]",
us:"[Bah！L]",
code:"/:<@",
web_code:"/左哼哼",
style:"icon_smiley_45"
},{
id:46,
cn:"[右哼哼]",
hk:"[右哼哼]",
us:"[Bah！R]",
code:"/:@>",
web_code:"/右哼哼",
style:"icon_smiley_46"
},{
id:47,
cn:"[哈欠]",
hk:"[哈欠]",
us:"[Yawn]",
code:"/::-O",
web_code:"/哈欠",
style:"icon_smiley_47"
},{
id:48,
cn:"[鄙视]",
hk:"[鄙視]",
us:"[Pooh-pooh]",
code:"/:>-|",
web_code:"/鄙视",
style:"icon_smiley_48"
},{
id:49,
cn:"[委屈]",
hk:"[委屈]",
us:"[Shrunken]",
code:"/:P-(",
web_code:"/委屈",
style:"icon_smiley_49"
},{
id:50,
cn:"[快哭了]",
hk:"[快哭了]",
us:"[TearingUp]",
code:"/::'|",
web_code:"/快哭了",
style:"icon_smiley_50"
},{
id:51,
cn:"[阴险]",
hk:"[陰險]",
us:"[Sly]",
code:"/:X-)",
web_code:"/阴险",
style:"icon_smiley_51"
},{
id:52,
cn:"[亲亲]",
hk:"[親親]",
us:"[Kiss]",
code:"/::*",
web_code:"/亲亲",
style:"icon_smiley_52"
},{
id:53,
cn:"[吓]",
hk:"[嚇]",
us:"[Wrath]",
code:"/:@x",
web_code:"/吓",
style:"icon_smiley_53"
},{
id:54,
cn:"[可怜]",
hk:"[可憐]",
us:"[Whimper]",
code:"/:8*",
web_code:"/可怜",
style:"icon_smiley_54"
},{
id:55,
cn:"[菜刀]",
hk:"[菜刀]",
us:"[Cleaver]",
code:"/:pd",
web_code:"/菜刀",
style:"icon_smiley_55"
},{
id:56,
cn:"[西瓜]",
hk:"[西瓜]",
us:"[Watermelon]",
code:"/:<W>",
web_code:"/西瓜",
style:"icon_smiley_56"
},{
id:57,
cn:"[啤酒]",
hk:"[啤酒]",
us:"[Beer]",
code:"/:beer",
web_code:"/啤酒",
style:"icon_smiley_57"
},{
id:58,
cn:"[篮球]",
hk:"[籃球]",
us:"[Basketball]",
code:"/:basketb",
web_code:"/篮球",
style:"icon_smiley_58"
},{
id:59,
cn:"[乒乓]",
hk:"[乒乓]",
us:"[PingPong]",
code:"/:oo",
web_code:"/乒乓",
style:"icon_smiley_59"
},{
id:60,
cn:"[咖啡]",
hk:"[咖啡]",
us:"[Coffee]",
code:"/:coffee",
web_code:"/咖啡",
style:"icon_smiley_60"
},{
id:61,
cn:"[饭]",
hk:"[飯]",
us:"[Rice]",
code:"/:eat",
web_code:"/饭",
style:"icon_smiley_61"
},{
id:62,
cn:"[猪头]",
hk:"[豬頭]",
us:"[Pig]",
code:"/:pig",
web_code:"/猪头",
style:"icon_smiley_62"
},{
id:63,
cn:"[玫瑰]",
hk:"[玫瑰]",
us:"[Rose]",
code:"/:rose",
web_code:"/玫瑰",
style:"icon_smiley_63"
},{
id:64,
cn:"[凋谢]",
hk:"[枯萎]",
us:"[Wilt]",
code:"/:fade",
web_code:"/凋谢",
style:"icon_smiley_64"
},{
id:65,
cn:"[嘴唇]",
hk:"[嘴唇]",
us:"[Lips]",
code:"/:showlove",
web_code:"/示爱",
style:"icon_smiley_65"
},{
id:66,
cn:"[爱心]",
hk:"[愛心]",
us:"[Heart]",
code:"/:heart",
web_code:"/爱心",
style:"icon_smiley_66"
},{
id:67,
cn:"[心碎]",
hk:"[心碎]",
us:"[BrokenHeart]",
code:"/:break",
web_code:"/心碎",
style:"icon_smiley_67"
},{
id:68,
cn:"[蛋糕]",
hk:"[蛋糕]",
us:"[Cake]",
code:"/:cake",
web_code:"/蛋糕",
style:"icon_smiley_68"
},{
id:69,
cn:"[闪电]",
hk:"[閃電]",
us:"[Lightning]",
code:"/:li",
web_code:"/闪电",
style:"icon_smiley_69"
},{
id:70,
cn:"[炸弹]",
hk:"[炸彈]",
us:"[Bomb]",
code:"/:bome",
web_code:"/炸弹",
style:"icon_smiley_70"
},{
id:71,
cn:"[刀]",
hk:"[刀]",
us:"[Dagger]",
code:"/:kn",
web_code:"/刀",
style:"icon_smiley_71"
},{
id:72,
cn:"[足球]",
hk:"[足球]",
us:"[Soccer]",
code:"/:footb",
web_code:"/足球",
style:"icon_smiley_72"
},{
id:73,
cn:"[瓢虫]",
hk:"[甲蟲]",
us:"[Ladybug]",
code:"/:ladybug",
web_code:"/瓢虫",
style:"icon_smiley_73"
},{
id:74,
cn:"[便便]",
hk:"[便便]",
us:"[Poop]",
code:"/:shit",
web_code:"/便便",
style:"icon_smiley_74"
},{
id:75,
cn:"[月亮]",
hk:"[月亮]",
us:"[Moon]",
code:"/:moon",
web_code:"/月亮",
style:"icon_smiley_75"
},{
id:76,
cn:"[太阳]",
hk:"[太陽]",
us:"[Sun]",
code:"/:sun",
web_code:"/太阳",
style:"icon_smiley_76"
},{
id:77,
cn:"[礼物]",
hk:"[禮物]",
us:"[Gift]",
code:"/:gift",
web_code:"/礼物",
style:"icon_smiley_77"
},{
id:78,
cn:"[拥抱]",
hk:"[擁抱]",
us:"[Hug]",
code:"/:hug",
web_code:"/拥抱",
style:"icon_smiley_78"
},{
id:79,
cn:"[强]",
hk:"[強]",
us:"[ThumbsUp]",
code:"/:strong",
web_code:"/强",
style:"icon_smiley_79"
},{
id:80,
cn:"[弱]",
hk:"[弱]",
us:"[ThumbsDown]",
code:"/:weak",
web_code:"/弱",
style:"icon_smiley_80"
},{
id:81,
cn:"[握手]",
hk:"[握手]",
us:"[Shake]",
code:"/:share",
web_code:"/握手",
style:"icon_smiley_81"
},{
id:82,
cn:"[胜利]",
hk:"[勝利]",
us:"[Peace]",
code:"/:v",
web_code:"/胜利",
style:"icon_smiley_82"
},{
id:83,
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Fight]",
code:"/:@)",
web_code:"/抱拳",
style:"icon_smiley_83"
},{
id:84,
cn:"[勾引]",
hk:"[勾引]",
us:"[Beckon]",
code:"/:jj",
web_code:"/勾引",
style:"icon_smiley_84"
},{
id:85,
cn:"[拳头]",
hk:"[拳頭]",
us:"[Fist]",
code:"/:@@",
web_code:"/拳头",
style:"icon_smiley_85"
},{
id:86,
cn:"[差劲]",
hk:"[差勁]",
us:"[Pinky]",
code:"/:bad",
web_code:"/差劲",
style:"icon_smiley_86"
},{
id:87,
cn:"[爱你]",
hk:"[愛你]",
us:"[RockOn]",
code:"/:lvu",
web_code:"/爱你",
style:"icon_smiley_87"
},{
id:88,
cn:"[NO]",
hk:"[NO]",
us:"[Nuh-uh]",
code:"/:no",
web_code:"/NO",
style:"icon_smiley_88"
},{
id:89,
cn:"[OK]",
hk:"[OK]",
us:"[OK]",
code:"/:ok",
web_code:"/OK",
style:"icon_smiley_89"
},{
id:90,
cn:"[爱情]",
hk:"[愛情]",
us:"[InLove]",
code:"/:love",
web_code:"/爱情",
style:"icon_smiley_90"
},{
id:91,
cn:"[飞吻]",
hk:"[飛吻]",
us:"[Blowkiss]",
code:"/:<L>",
web_code:"/飞吻",
style:"icon_smiley_91"
},{
id:92,
cn:"[跳跳]",
hk:"[跳跳]",
us:"[Waddle]",
code:"/:jump",
web_code:"/跳跳",
style:"icon_smiley_92"
},{
id:93,
cn:"[发抖]",
hk:"[發抖]",
us:"[Tremble]",
code:"/:shake",
web_code:"/发抖",
style:"icon_smiley_93"
},{
id:94,
cn:"[怄火]",
hk:"[噴火]",
us:"[Aaagh!]",
code:"/:<O>",
web_code:"/怄火",
style:"icon_smiley_94"
},{
id:95,
cn:"[转圈]",
hk:"[轉圈]",
us:"[Twirl]",
code:"/:circle",
web_code:"/转圈",
style:"icon_smiley_95"
},{
id:96,
cn:"[磕头]",
hk:"[磕頭]",
us:"[Kotow]",
code:"/:kotow",
web_code:"/磕头",
style:"icon_smiley_96"
},{
id:97,
cn:"[回头]",
hk:"[回頭]",
us:"[Dramatic]",
code:"/:turn",
web_code:"/回头",
style:"icon_smiley_97"
},{
id:98,
cn:"[跳绳]",
hk:"[跳繩]",
us:"[JumpRope]",
code:"/:skip",
web_code:"/跳绳",
style:"icon_smiley_98"
},{
id:99,
cn:"[投降]",
hk:"[投降]",
us:"[Surrender]",
code:"/:oY",
web_code:"/挥手",
style:"icon_smiley_99"
},{
id:100,
cn:"[激动]",
hk:"[激動]",
us:"[Hooray]",
code:"/:#-0",
web_code:"/激动",
style:"icon_smiley_100"
},{
id:101,
cn:"[乱舞]",
hk:"[亂舞]",
us:"[Meditate]",
code:"/:hiphot",
web_code:"/街舞",
style:"icon_smiley_101"
},{
id:102,
cn:"[献吻]",
hk:"[獻吻]",
us:"[Smooch]",
code:"/:kiss",
web_code:"/献吻",
style:"icon_smiley_102"
},{
id:103,
cn:"[左太极]",
hk:"[左太極]",
us:"[TaiChi L]",
code:"/:<&",
web_code:"/左太极",
style:"icon_smiley_103"
},{
id:104,
cn:"[右太极]",
hk:"[右太極]",
us:"[TaiChi R]",
code:"/:&>",
web_code:"/右太极",
style:"icon_smiley_104"
},{
id:204,
cn:"[嘿哈]",
hk:"[吼嘿]",
us:"[Hey]",
code:"",
web_code:"",
style:"icon_emoji_wx_4"
},{
id:205,
cn:"[捂脸]",
hk:"[掩面]",
us:"[Facepalm]",
code:"",
web_code:"",
style:"icon_emoji_wx_5"
},{
id:202,
cn:"[奸笑]",
hk:"[奸笑]",
us:"[Smirk]",
code:"",
web_code:"",
style:"icon_emoji_wx_2"
},{
id:206,
cn:"[机智]",
hk:"[機智]",
us:"[Smart]",
code:"",
web_code:"",
style:"icon_emoji_wx_6"
},{
id:212,
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Moue]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
},{
id:211,
cn:"[耶]",
hk:"[歐耶]",
us:"[Yeah!]",
code:"",
web_code:"",
style:"icon_emoji_wx_11"
},{
id:207,
cn:"[茶]",
hk:"[茶]",
us:"[Tea]",
code:"",
web_code:"",
style:"icon_emoji_wx_7"
},{
id:209,
cn:"[红包]",
hk:"[Packet]",
us:"[Packet]",
code:"",
web_code:"",
style:"icon_emoji_wx_9"
},{
id:210,
cn:"[蜡烛]",
hk:"[蠟燭]",
us:"[Candle]",
code:"",
web_code:"",
style:"icon_emoji_wx_10"
},{
id:215,
cn:"[福]",
hk:"[福]",
us:"[Blessing]",
code:"",
web_code:"",
style:"icon_emoji_wx_15"
},{
id:214,
cn:"[鸡]",
hk:"[小雞]",
us:"[Chick]",
code:"",
web_code:"",
style:"icon_emoji_wx_14"
},{
id:300,
cn:"[笑脸]",
emoji:"😄",
hk:"",
us:"",
code:"\\ue415",
web_code:"",
style:"icon_emoji_ios_0"
},{
id:301,
cn:"[生病]",
emoji:"😷",
hk:"",
us:"",
code:"\\ue40c",
web_code:"",
style:"icon_emoji_ios_1"
},{
id:302,
cn:"[破涕为笑]",
emoji:"😂",
hk:"",
us:"",
code:"\\ue412",
web_code:"",
style:"icon_emoji_ios_2"
},{
id:303,
cn:"[吐舌]",
emoji:"😝",
hk:"",
us:"",
code:"\\ue409",
web_code:"",
style:"icon_emoji_ios_3"
},{
id:304,
cn:"[脸红]",
emoji:"😳",
hk:"",
us:"",
code:"\\ue40d",
web_code:"",
style:"icon_emoji_ios_4"
},{
id:305,
cn:"[恐惧]",
emoji:"😱",
hk:"",
us:"",
code:"\\ue107",
web_code:"",
style:"icon_emoji_ios_5"
},{
id:306,
cn:"[失望]",
emoji:"😔",
hk:"",
us:"",
code:"\\ue403",
web_code:"",
style:"icon_emoji_ios_6"
},{
id:307,
cn:"[无语]",
emoji:"😒",
hk:"",
us:"",
code:"\\ue40e",
web_code:"",
style:"icon_emoji_ios_7"
},{
id:308,
cn:"[鬼魂]",
emoji:"👻",
hk:"",
us:"",
code:"\\ue11b",
web_code:"",
style:"icon_emoji_ios_8"
},{
id:309,
cn:"[合十]",
emoji:"🙏",
hk:"",
us:"",
code:"\\ue41d",
web_code:"",
style:"icon_emoji_ios_9"
},{
id:310,
cn:"[强壮]",
emoji:"💪",
hk:"",
us:"",
code:"\\ue14c",
web_code:"",
style:"icon_emoji_ios_10"
},{
id:311,
cn:"[庆祝]",
emoji:"🎉",
hk:"",
us:"",
code:"\\ue312",
web_code:"",
style:"icon_emoji_ios_11"
},{
id:312,
cn:"[礼物]",
emoji:"🎁",
hk:"",
us:"",
code:"\\ue112",
web_code:"",
style:"icon_emoji_ios_12"
},{
id:313,
cn:"[吃瓜]",
hk:"[吃西瓜]",
us:"[Onlooker]",
code:"",
web_code:"",
style:"icon_emoji_wx_Watermelon"
},{
id:314,
cn:"[加油]",
hk:"[加油]",
us:"[GoForIt]",
code:"",
web_code:"",
style:"icon_emoji_wx_Addoil"
},{
id:315,
cn:"[汗]",
hk:"[汗]",
us:"[Sweats]",
code:"",
web_code:"",
style:"icon_emoji_wx_Sweat"
},{
id:316,
cn:"[天啊]",
hk:"[天啊]",
us:"[OMG]",
code:"",
web_code:"",
style:"icon_emoji_wx_Shocked"
},{
id:317,
cn:"[Emm]",
hk:"[一言難盡]",
us:"[Emm]",
code:"",
web_code:"",
style:"icon_emoji_wx_Cold"
},{
id:318,
cn:"[社会社会]",
hk:"[失敬失敬]",
us:"[Respect]",
code:"",
web_code:"",
style:"icon_emoji_wx_Social"
},{
id:319,
cn:"[旺柴]",
hk:"[旺柴]",
us:"[Doge]",
code:"",
web_code:"",
style:"icon_emoji_wx_Yellowdog"
},{
id:320,
cn:"[好的]",
hk:"[好的]",
us:"[NoProb]",
code:"",
web_code:"",
style:"icon_emoji_wx_NoProb"
},{
id:321,
cn:"[打脸]",
hk:"[打臉]",
us:"[MyBad]",
code:"",
web_code:"",
style:"icon_emoji_wx_Slap"
},{
id:322,
cn:"[加油加油]",
hk:"[加油！]",
us:"[KeepFighting]",
code:"",
web_code:"",
style:"icon_emoji_wx_KeepFighting"
},{
id:323,
cn:"[哇]",
hk:"[哇]",
us:"[Wow]",
code:"",
web_code:"",
style:"icon_emoji_wx_Wow"
},{
id:324,
cn:"[發]",
hk:"[發]",
us:"[Rich]",
code:"",
web_code:"",
style:"icon_emoji_wx_16"
},{
id:"17_1",
cn:"[囧]",
hk:"[囧]",
us:"[Blush]",
code:"",
web_code:"",
style:"icon_smiley_17"
},{
id:"39_1",
cn:"[再见]",
hk:"[再見]",
us:"[Bye]",
code:"",
web_code:"",
style:"icon_smiley_39"
},{
id:"83_1",
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Salute]",
code:"",
web_code:"",
style:"icon_smiley_83"
},{
id:"212_1",
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Concerned]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
}];
});define("biz_common/utils/comm_report.js",[],function(){
"use strict";
var r=function(r,o){
return o=JSON.parse(JSON.stringify(o)),o.log_id=r,console.log("[comm_report] reportjson: ",o),
JSON.stringify(o);
},o={
web:{
report:function(o,t,e,n){
n=n||{},o.post({
url:"/cgi-bin/webreport",
data:{
reportjson:r(t,e)
},
async:n.async
});
}
},
wap:{
report:function(o,t,e,n){
n=n||{},o({
type:"POST",
url:"/mp/wapcommreport",
data:{
reportjson:r(t,e)
},
async:n.async,
success:n.success,
error:n.error
});
}
}
};
return{
report:function(r,t,e,n,s){
o[r].report(t,e,n,s);
}
};
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function i(e,t){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e){
var o=e.btn;
if(!o)return!1;
var n=e.adData,c=!1,d={};
e.report_param=e.report_param||"";
var s="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
r.on(o,"click",function(){
if(t("click @js_app_action"),c)return t("is_app_installed"),i(n.is_appmsg?17:13,e),
void p(n.app_id+"://");
var o=function(){
t("download"),i(n.is_appmsg?15:11,e),t("go : "+s),p(s);
};
return t("download"),n.rl&&n.traceid?d[n.traceid]||(d[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),d[n.traceid]=!1,o();
},
async:!0
})):o(),!1;
});
}
{
var r=e("biz_common/dom/event.js"),n=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
e("biz_wap/jsapi/core.js");
}
return o;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/openUrl.js"],function(n,e,a,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,e){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+e.report_param);
}
function d(n){
function e(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(window.clearInterval(x),k=!0,d.innerHTML=T.installed);
});
}
function a(){
j&&s.invoke("queryDownloadTask",{
download_id:j
},function(e){
if(e&&e.state){
if("download_succ"==e.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,b=!0,d.innerHTML=T.downloaded;
var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(a);
}
if("downloading"==e.state)return;
("download_fail"==e.state||"default"==e.state)&&(o("fail, download_state : "+e.state),
window.clearInterval(y),I=!1,t("下载失败"),d.innerHTML=T.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var l={},c=n.adData,p="",u="",m=c.androiddownurl;
if(m&&m.match){
var _=/&channelid\=([^&]*)/,w=m.match(_);
w&&w[1]&&(p="&channelid="+w[1],c.androiddownurl=m.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,b=!1,j=0,y=null,x=null,T={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
d.innerHTML=T.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var e=n.err_msg;
o("getInstallState @yingyongbao : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=g&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=c.versioncode&&e.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=T.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(b)return s.invoke("installDownloadTask",{
download_id:j,
file_md5:c.md5sum
},function(n){
var a=n.err_msg;
o("installDownloadTask : "+a),a.indexOf("install_download_task:ok")>-1?x=setInterval(e,1e3):t("安装失败！");
}),!1;
var m=function(){
return f?(i(c.is_appmsg?16:12,n),void s.invoke("launchApplication",{
schemeUrl:"tmast://download?oplist=1,2&pname="+c.pkgname+p+u
})):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(e){
var l=e.err_msg;
o("addDownloadTask : "+l),l.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,j=e.download_id,o("download_id : "+j),d.innerHTML=T.downloading,y=setInterval(a,1e3)):t("调用下载器失败！");
});
};
return c.rl&&c.traceid?l[c.traceid]||(l[c.traceid]=!0,r({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[c.traceid]=!1,m();
},
async:!0
})):m(),!1;
}
});
});
}
{
var l=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),r=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
n("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
}
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js","biz_wap/utils/jsmonitor_report.js","a/a_utils.js"],function(e){
"use strict";
function t(e,t){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function n(e,t){
if(t&&t.crt_exp_info)try{
var n=JSON.parse(t.crt_exp_info.html());
n.is_new_profile?j.invoke("profile",{
username:n.username
}):(console.log("exp to profile h5"),b(e));
}catch(i){
console.error("decode crt_exp_info error",t),b(e);
}else b(e);
return!1;
}
function i(e){
var t={
708:27,
135:28,
117:29
};
t[e]&&y.report115849(t[e]);
}
function a(e){
var a=e.adData,_=e.pos_type||0,b={},y=e.a_info;
e.report_param=e.report_param||"",function(){
function u(e){
i(a.crt_size);
{
var t=w.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var n=t.tid,o=t.type,s=t.url,r=t.rl;
if(!b[n]){
b[n]=!0;
var p,c,d,l,u=!!e&&e.target;
u&&(p=f.getX(u,"js_ad_link")+e.offsetX,c=f.getY(u,"js_ad_link")+e.offsetY,d=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
l=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
m({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(s),
tid:n,
rl:encodeURIComponent(r),
__biz:biz,
pos_type:_,
pt:a.pt,
pos_x:p,
pos_y:c,
ad_w:d||0,
ad_h:l||0
},function(){
b[n]=!1,k();
});
}
}else k();
}
var w=e.btnAddContact,v=e.btnViewProfile;
if(w&&w.dataset){
var z=function C(i,o){
var s=i.err_msg,r=a.is_appmsg?6:1;
-1!=s.indexOf("ok")?(v.style.display="inline-block",w.style.display="none",r=a.is_appmsg?9:4):"add_contact:added"==s?r=a.is_appmsg?7:2:"add_contact:cancel"==s?r=a.is_appmsg?8:3:(--o,
o>=0?j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
C(e,o);
}):(s="addContact:fail|msg:"+s+"|uin:"+uin+"|biz:"+biz,l("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+s+"&r="+Math.random()),
n(a.url,y))),t(r,e);
},k=function(){
t(a.is_appmsg?10:5,e),g.setSum(110696,7,1),o?g.setSum(110696,10,1):(o=!0,s=+new Date),
r?+new Date-r<2e3&&(g.setSum(110696,11,1),setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(g.setSum(110696,12,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,c?+new Date-c<4e3&&(g.setSum(110696,13,1),setTimeout(function(){
c=0;
},4e3)):c=+new Date,j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
var t=+new Date-s;
g.setAvg(110696,9,t),o=!1,z(e,1);
});
};
d.on(w,"click",u);
}
}(),function(){
var t=e.btnViewProfile;
t&&d.on(t,"click",function(){
i(a.crt_size);
var t=e.btnAddContact.dataset,o={
source:4,
tid:t.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:a.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:_
},s=u.join(a.url,o);
return n(s,e.a_info),!1;
});
}(),function(){
var o=e.btnProfile;
if(o){
var s=function p(i,o,s){
var r=i.err_msg,c=a.is_appmsg?6:1;
-1!=r.indexOf("ok")?(e.adData.biz_info.is_subscribed=1,console.log(s),s.innerHTML=s.innerHTML.replace("关注","查看"),
c=a.is_appmsg?9:4):"add_contact:added"==r?c=a.is_appmsg?7:2:"add_contact:cancel"==r?c=a.is_appmsg?8:3:(--o,
o>=0?j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
p(e,o,s);
}):(r="addContact:fail|msg:"+r+"|uin:"+uin+"|biz:"+biz,l("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+r+"&r="+Math.random()),
n(a.url,e.a_info))),t(c,e);
},r=function(n){
t(a.is_appmsg?10:5,e),j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
s(e,1,n);
});
};
d.on(o,"click",function(t){
if(i(a.crt_size),console.log("has_click",b,e.adData),e.adData.biz_info.is_subscribed){
var o=e.adData;
o.tid=o.traceid;
var s={
source:4,
tid:o.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:a.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:_
},p=u.join(a.url,s);
n(p,e.a_info);
}else{
{
var o=e.adData;
"https:"==top.location.protocol?1500:1200;
}
if(o.tid=o.traceid,o.rl&&o.url&&o.type&&o.tid){
var c=o.tid,d=o.type,p=o.url,l=o.rl;
if(!b[c]){
console.log("has_click[tid]",b[c]),b[c]=!0;
var j,g,y,w,v=!!t&&t.target;
v&&(j=f.getX(v,"js_ad_link")+t.offsetX,g=f.getY(v,"js_ad_link")+t.offsetY,y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
m({
type:d,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:c,
rl:encodeURIComponent(l),
__biz:biz,
pos_type:_,
pt:a.pt,
pos_x:j,
pos_y:g,
ad_w:y||0,
ad_h:w||0
},function(){
b[c]=!1,r(v);
});
}
}else{
var v=!!t&&t.target;
r(v);
}
}
return!1;
});
}
}();
}
var o,s,r,p,c,d=e("biz_common/dom/event.js"),l=e("biz_common/utils/report.js"),_=e("a/a_report.js"),m=_.AdClickReport,u=(e("biz_wap/utils/ajax.js"),
e("biz_common/utils/url/parse.js")),f=e("biz_wap/utils/position.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,j=e("biz_wap/jsapi/core.js"),g=("https:"==top.location.protocol?5:0,
window.__report,e("biz_wap/utils/jsmonitor_report.js")),y=e("a/a_utils.js");
return a;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_wap/utils/openUrl.js","a/a_utils.js","biz_common/utils/url/parse.js"],function(a,t,e,n){
"use strict";
function o(a){
"undefined"!=typeof c&&c.log&&c.log(a);
}
function s(a){
this.g={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:"",
btn_percent:0,
btn_width:0,
btn_height:0
};
var t=this,e=this.g;
if(e.btn=a.btn,!e.btn)return!1;
e.data=a.adData,e.url_scheme=a.url_scheme,e.appdetail_params=a.appdetail_params||"",
e.percentStatus=a.percentStatus;
var s={};
e.channelid=e.data.channel_id||"",e.report_param=a.report_param;
var i=20;
if(("103"==e.data.pt||"104"==e.data.pt)&&t.setAppRating(a),"104"==e.data.pt||"113"==e.data.pt||"114"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type){
var l=e.data.androiddownurl;
if(l&&l.match){
var _=/&channelid\=([^&]*)/,g=l.match(_);
g&&g[1]&&(e.channelid=g[1],e.data.androiddownurl=l.replace(_,""));
}
e.channelid&&(e.channelid="&channelid="+e.channelid),a.via&&(e.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
c.ready(function(){
console.log("appcard info",e),("113"==e.data.pt||"114"==e.data.pt||"104"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type)&&(c.invoke("getInstallState",{
packageName:b
},function(a){
var t=a.err_msg;
o("getInstallState @yingyongbao : "+t);
var e=t.lastIndexOf("_")+1,n=t.substring(e);
1*n>=v&&t.indexOf("get_install_state:yes")>-1&&(h=!0);
}),c.invoke("getInstallState",{
packageName:e.data.pkgname
},function(a){
var n=a.err_msg;
o("getInstallState @"+e.data.pkgname+" : "+n);
var s=n.lastIndexOf("_")+1,d=n.substring(s);
n.indexOf("get_install_state:yes")>-1&&t.setBtn(1*d>=e.data.versioncode&&e.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",e.btn.id),d.on(e.btn,"click",function(d){
if(console.log("app click",e),console.log(d.target),"installed"==e.app_status)return t.setBtn("installed"),
!1;
if("gotodetail"==e.app_status)return t.report(74),t.gotoDetail(),!1;
if("downloading"==e.app_status)return t.report(71),t.pauseDownload(),!1;
if("paused"==e.app_status)return t.report(72),t.resumeDownload(),!1;
if("downloaded"==e.app_status)return t.report(73),c.invoke("installDownloadTask",{
download_id:e.download_id,
file_md5:e.data.md5sum
},function(a){
var s=a.err_msg;
o("installDownloadTask : "+s),s.indexOf("install_download_task:ok")>-1?e.install_clock=setInterval(t.installStateChange.bind(t),500):n("安装失败！");
}),!1;
var l=function(){
if("103"==e.data.pt||"111"==e.data.pt||"112"==e.data.pt||"121"==e.data.pt||e.data.use_new_protocol>0&&19==e.data.product_type){
t.report(23);
var s=e.data.ticket||window.ticket;
if(e.url_scheme&&u.gtVersion("6.5.6",!0)){
var d=1,l=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
l&&l[1]&&parseInt(l[1].split("_")[0],10)>=12&&(d=0);
var r={
schemeUrl:e.url_scheme,
messageExt:e.url_scheme,
appID:e.data.app_info.open_platform_appid,
installSchemeUrl:e.data.app_info.appinfo_url,
installAction:d
};
c.invoke("launchApplication",r,function(a){
(-1===a.err_msg.indexOf("ok")||"fail"===a.launchInstallResult)&&w.openWebAppStore(e.data.appinfo_url,s);
});
}else w.openWebAppStore(e.data.appinfo_url,s);
}else{
if(h)return t.report(16),void c.invoke("launchApplication",{
schemeUrl:"tmast://download?oplist=1,2&pname="+e.data.pkgname+e.channelid+e.via
});
t.report(15);
var p=[e.data.adid,e.data.traceid,(e.data.pkgname||"").replace(/\./g,"_"),e.data.source,i,a.engine].join("."),_=function(a,t,e){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
c.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(n){
var o=n.err_msg;
o.indexOf("ok")>-1?e&&e(n):c.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},e);
}),a.url_scheme&&u.isAndroid&&u.gtVersion("6.5.6",!0)&&c.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+e.data.appname+","+e.data.androiddownurl+","+p+","+e.data.md5sum),
_(e,p,function(a){
var s=a.err_msg;
o("addDownloadTask : "+s),s.indexOf("ok")>-1?(e.download_id=a.download_id,y[e.download_id]=t,
o("download_id : "+e.download_id),t.setBtn("downloading"),e.clock=setInterval(t.queryDownloadState.bind(t),500),
e.install_clock=setInterval(t.installStateChange.bind(t),500),t.changeDownloadState()):n("调用下载器失败！");
});
}
},_=function(){
return u.isIOS?void l():void m({
app_name:e.data.appname,
app_img_url:e.data.icon_url,
onOk:function(){
l(),t.report(h?106:100);
},
onCancel:function(){
t.report(h?107:101);
}
});
};
if("download"==e.app_status&&e.data.rl&&e.data.traceid){
if(!s[e.data.traceid]){
s[e.data.traceid]=!0;
var g,f,b,v,k=!!d&&d.target;
k&&(g=p.getX(k,"js_ad_link")+d.offsetX,f=p.getY(k,"js_ad_link")+d.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
r({
type:e.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(e.data.androiddownurl),
tid:e.data.traceid,
rl:encodeURIComponent(e.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:e.data.pt,
pos_x:g,
pos_y:f,
ad_w:b||0,
ad_h:v||0
},function(){
s[e.data.traceid]=!1,_();
});
}
}else _();
return!1;
});
});
}
var d=a("biz_common/dom/event.js"),i=a("biz_common/dom/class.js"),l=a("a/a_report.js"),r=l.AdClickReport,p=a("biz_wap/utils/position.js"),_=a("biz_common/utils/report.js"),c=a("biz_wap/jsapi/core.js"),u=a("biz_wap/utils/mmversion.js"),m=a("a/appdialog_confirm.js"),g=a("biz_wap/utils/openUrl.js"),w=a("a/a_utils.js"),f={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},h=!1,b="com.tencent.android.qqdownloader",v=1060125,k=!1,y={},j=g.openUrlWithExtraWebview;
return s.prototype.report=function(a){
var t=this.g;
_("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+t.report_param);
},s.prototype.setBtn=function(a,t){
var e=this.g,n=e.data.pt;
if(e.app_status=a,e.percentStatus)return e.percentStatus(a,t),!1;
if("downloading"===a){
t=t||0;
var o="";
if(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,104===n?o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113===n||114===n?e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,
o=o.replace("继续","暂停")):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122===n?(e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,
o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+'px;">暂停</span></span>暂停',
e.btn_percent=t):1===e.data.use_new_protocol?(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,
e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+"px; line-height: "+e.btn_height+'px">暂停下载</span></span>暂停下载',
e.btn_percent=t):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!o)return;
e.btn.innerHTML=o,122===n||1===e.data.use_new_protocol?i.addClass(e.btn,"btn_progress"):i.addClass(e.btn,"with_processor");
}else if("paused"===a){
var o="";
104===n||113===n||114===n||122===n||e.data.use_new_protocol>0?(o=e.btn.innerHTML,
o=o.replace(/暂停/g,"继续"),e.btn.innerHTML=o):(i.removeClass(e.btn,"with_processor"),
i.removeClass(e.btn,"btn_progress"),e.btn.innerHTML=f[a]);
}else i.removeClass(e.btn,"with_processor"),i.removeClass(e.btn,"btn_progress"),
e.btn.innerHTML=f[a],e.data.use_new_protocol>0&&"gotodetail"===a&&(e.btn.innerHTML="进入应用");
},s.prototype.setAppRating=function(a){
var t=this.g,e=a.js_app_rating,n=1*t.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var o=["","one","two","three","four","five"],s="",d=Math.floor(n);
if(s="star_"+o[d],n>d&&(n=d+.5,s+="_half"),e&&n>0){
var l=e.getElementsByClassName("js_stars"),r=e.getElementsByClassName("js_scores");
l&&r&&l[0]&&r[0]&&(l=l[0],r=r[0],l.style.display="inline-block",i.addClass(l,s));
}
},s.prototype.changeDownloadState=function(){
if(!k){
{
this.g;
}
k=!0,c.on("wxdownload:progress_change",function(a){
y[a.download_id]&&y[a.download_id].setBtn("downloading",a.progress);
});
}
},s.prototype.queryDownloadState=function(){
var a=this.g,t=this;
a.download_id&&c.invoke("queryDownloadTask",{
download_id:a.download_id
},function(e){
if(o("queryDownloadTask : "+e.state+"; dowloadid = "+a.download_id),e&&e.state){
if("download_succ"==e.state&&(t.setBtn("downloaded"),window.clearInterval(a.clock)),
"downloading"==e.state)return;
"download_fail"==e.state&&(window.clearInterval(a.clock),window.clearInterval(a.install_clock),
n("下载失败"),t.setBtn("download"));
}
});
},s.prototype.installStateChange=function(){
var a=this.g,t=this;
c.invoke("getInstallState",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(e){
var n=e.err_msg;
n.indexOf("get_install_state:yes")>-1&&(o("getInstallState @app, version : "+n),
window.clearInterval(a.install_clock),t.setBtn(a.url_scheme?"gotodetail":"installed"));
});
},s.prototype.pauseDownload=function(){
var a=this.g,t=this;
c.invoke("pauseDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&t.setBtn("paused");
});
},s.prototype.resumeDownload=function(){
var a=this.g,t=this;
c.invoke("resumeDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&t.setBtn("downloading");
});
},s.prototype.gotoDetail=function(){
var t=this.g;
if(104==t.data.pt||113==t.data.pt||114==t.data.pt||122==t.data.pt||t.data.use_new_protocol>0&&12==t.data.product_type&&t.url_scheme)u.gtVersion("6.5.6",!0)?c.invoke("launchApplication",{
schemeUrl:t.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t.url_scheme);
}):location.href=t.url_scheme;else{
var e=t.data.url,n=a("biz_common/utils/url/parse.js");
(!e||0!=e.indexOf("http://mp.weixin.qq.com/tp/")&&0!=e.indexOf("https://mp.weixin.qq.com/tp/"))&&(e="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+t.data.app_id+(t.appdetail_params||"")+"&channel_id="+t.channelid+"&md5sum="+t.data.md5sum+"#wechat_redirect"),
t.url_scheme&&(e=n.join(e,{
is_installed:"1"
})),j(e);
}
},s;
});