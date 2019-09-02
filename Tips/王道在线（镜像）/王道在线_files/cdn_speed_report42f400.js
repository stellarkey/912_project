define("a/a_config.js",[],function(){
"use strict";
var _={
ANDROID_APP_PRODUCT_TYPE:12,
IOS_APP_PRODUCT_TYPE:19,
ADD_CONTACT_PRODUCT_TYPE:23,
MINI_GAME_PRODUCT_TYPE:46,
CARD_PRODUCT_TYPE:36,
SHOP_PRODUCT_TYPE:30,
WECHATCARD_PRODUCT_TYPE:47,
BRAND_WECHAT_PRODUCT_TYPE:29,
BRAND_GDT_PRODUCT_TYPE:31
},a={
POS_BOTTOM:0,
POS_MID:4,
POS_SPONSOR:3,
POS_AD_BEFORE_VIDEO:7,
POS_AD_AFTER_VIDEO:9
},e={
AD_DEST_TYPE:0,
OUTER_DEST_TYPE:1,
APPDETAIL_DEST_TYPE:2,
BIZ_DEST_TYPE:3,
APPINFO_PAGE_DEST_TYPE:4,
WECHAT_SHOP_DEST_TYPE:5,
WECHAT_APPLET_DEST_TYPE:6,
LEAF_DEST_TYPE:7,
CANVAS_AD_DEST_TYPE:9
},A=18e4,T=["openUrlWithExtraWebview","openADCanvas","addContact","profile","getInstallState","installDownloadTask","addDownloadTask","pauseDownloadTask","resumeDownloadTask","queryDownloadTask","launchApplication","writeCommData","adDataReport","downloadAppInternal","wxdownload:progress_change","menu:share:appmessage","menu:share:timeline","menu:share:weibo","menu:share:facebook","menu:general:share","launch3rdApp","addDownloadTaskStraight","sendAppMessage","shareTimeline","getNetworkType","jumpToBizProfile","shareWeibo","shareFB","imagePreview","getBackgroundAudioState","openWeApp","preloadMiniProgramContacts","preloadMiniProgramEnv","calRqt","openCardDetail","batchAddCard","handleMPPageAction"],D=["/mp/advertisement_report","/mp/ad_report","/mp/ad_video_report","/mp/jsmonitor","/mp/ad_complaint","/mp/jsreport","/tp/datacenter/report","/mp/getappmsgad"];
return{
AD_TYPE:_,
AD_POS:a,
AD_CACHE_TIME:A,
AD_DEST_TYPE:e,
AD_FRAME_DOMAIN:"https://wxa.wxs.qq.com",
INVALID_METHOD_NAME_MSG_PREFIX:"Invalid methodName",
INVALID_METHOD_TYPE_MSG_PREFIX:"Invalid methodType",
INVALID_ARGS_MSG_PREFIX:"Invalid args",
INVALID_REQ_PATH_MSG_PREFIX:"Invalid request path",
AD_IFRAME_HIDE_CLASS:"iframe_ad_dn",
AD_JSAPI_WHITE_LIST:T,
AD_REQ_PATH_WHITE_LIST:D,
ORIGIN_VIDEO_VID_PREFIX:"wxv",
AD_VIDEO_END_ACTION:"adVideoEnd",
AD_VIDEO_PLAY_ACTION:"onVideoPlayV2",
AD_PLAY_VIDEO_ACTION:"playVideoV2",
GET_APPMSGAD_READY_STATUS_ACTION:"getAppmsgadReadyStatus",
APPMSGAD_READY_ACTION:"appmsgadReady",
HAS_AD_DATA_QUERY_KEY:"has_ad_data",
GET_AD_DATA_AFTER_VIDEO_ACTION_NAME:"getAdDataAfterVideo"
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("a/a_utils.js",["biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js","biz_wap/utils/wapsdk.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
l("/mp/ad_report?action=follow&type="+e+t);
}
function n(e,t){
w.jsmonitor({
id:115849,
key:e,
value:t
});
}
function i(e){
w.jsmonitor({
id:28307,
key:e
});
}
function r(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function o(e){
for(var t=[],n=0;n<e.length;++n){
var i=e[n],r="undefined"==typeof i?"undefined":_typeof(i);
i="string"===r?i.htmlDecode():i,"object"===r&&(i="[object Array]"===Object.prototype.toString.call(i)?o(i):a(i)),
t.push(i);
}
return t;
}
function a(e){
var t={};
for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){
var i=e[n],r="undefined"==typeof i?"undefined":_typeof(i);
i="string"===r?i.htmlDecode():i,"object"===r&&(i="[object Array]"===Object.prototype.toString.call(i)?o(i):a(i)),
t[n]=i;
}
return t;
}
function s(e,t){
var n=0;
m.isIOS?n=1:m.isAndroid&&(n=2);
var i={
creative_load_fail:[{
ts:parseInt(+new Date/1e3,10),
aid:parseInt(e.info.aid,10),
img_url:encodeURIComponent(t),
network_type:window.networkType,
errmsg:"",
os_type:n,
client_version:parseInt(window.clientversion,10),
traceid:e.info.traceid
}]
};
i=JSON.stringify(i),u({
url:"/mp/advertisement_report?action=extra_report&extra_data="+i+"&__biz="+window.biz,
timeout:2e3
});
}
function d(e,t){
var n={
ad_sign_data:t.adSignData,
ad_sign_k1:t.adSignK1,
ad_sign_k2:t.adSignK2,
ad_sign_md5:t.signMd5
};
return f.join(e,n,!0);
}
function c(e,t,n,i){
try{
e.postMessage(JSON.stringify({
action:t,
value:n
}),i||"*");
}catch(r){
console.log("postMessage error",r);
}
}
var p=e("biz_wap/jsapi/core.js"),u=e("biz_wap/utils/ajax.js"),m=e("biz_wap/utils/mmversion.js"),l=e("biz_common/utils/report.js"),_=e("biz_common/dom/class.js"),f=e("biz_common/utils/url/parse.js"),g=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,w=e("biz_wap/utils/wapsdk.js"),y=e("common/utils.js"),v="pos_",b=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],h=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],j={
report:t,
report115849:n,
saveCopy:a,
joinSignParam:d,
postMessage:c,
checkShowCpc:function(e,t,n,i){
if(t)return!0;
if(!e)return!1;
var r=y.getInnerHeight(),o=r/2,a=e.offsetTop,s=n.offsetHeight,d=void 0;
if(o>a?d=1:r>a&&(d=2),d&&i){
var c=JSON.stringify({
biz_middle_not_exp:[{
scene:d,
traceid:i.traceid,
aid:+i.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
u({
url:"/mp/advertisement_report?action=extra_report&extra_data="+c+"&__biz="+window.biz,
timeout:2e3
});
}
return o>a||o>s-a?!1:!0;
},
openWebAppStore:function(e,t){
var n=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return n&&n[1]&&parseInt(n[1].split("_")[0],10)>=12?void p.invoke("launchApplication",{
schemeUrl:e
},function(){}):void p.invoke("downloadAppInternal",{
appUrl:e
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")||g("/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+t);
});
},
adOptReport:function(e,t,n,i){
var r=f.join("/mp/ad_complaint",{
action:"report",
type:e,
pos_type:t,
trace_id:n,
aid:i,
__biz:window.biz,
r:Math.random()
},!0);
l(r);
},
checkAdImg:function(e){
if(e){
var t=e.image_url||"",n=r(t);
n&&-1===h.indexOf(n)&&i(58);
}
},
formName:function(e){
for(var t=-1,n=0,i=b.length;i>n;++n){
var r=b[n],o=e.indexOf(r);
-1!==o&&(-1===t||t>o)&&(t=o);
}
return-1!==t&&(e=e.substring(0,t)),e;
},
formSize:function(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
},
debounce:function(e,t,n){
var i=void 0;
return function(){
var r=this,o=arguments,a=function(){
i=null,n||e.apply(r,o);
},s=n&&!i;
i||(i=setTimeout(a,t),s&&e.apply(r,o));
};
},
isItunesLink:function(e){
return/^https?:\/\/itunes\.apple\.com\//.test(e);
},
extend:function(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
return e;
},
getPosKeyDesc:function(e,t){
var n=t?e+"_"+t:e;
return v+n;
},
openCanvasAd:function(e){
p.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(n){
0!==Number(n.ret)?(g(e.url),t(135,e.report_param)):t(134,e.report_param);
});
},
setBackgroundClass:function(){
window._has_comment||0!==window.adDatas.realNum||window._share_redirect_url||window.is_temp_url?_.removeClass(document.body,"rich_media_empty_extra"):_.addClass(document.body,"rich_media_empty_extra");
},
lazyLoadAdImg:function(e){
for(var t=document.getElementsByClassName("js_alazy_img"),n=function(n){
var r=t[n];
r.onload=function(){
i(54),r.src.indexOf("retry")>-1&&i(69);
},r.onerror=function(){
-1===r.src.indexOf("retry")?r.src=f.addParam(r.src,"retry",1):!function(){
i(98);
var t="other";
m.isIOS?t="iphone":m.isAndroid&&(t="android"),setTimeout(function(){
var n=window.networkType||"unknow",i=f.join("/tp/datacenter/report",{
cmd:"report",
id:900023,
uin:777,
os:t,
aid:e.aid,
image_url:encodeURIComponent(r.src),
type:e.type,
network:n
},!0);
u({
url:i,
async:!0
});
},500),s(e,r.src);
}(),i(57);
},r.src=r.dataset.src;
},r=0;r<t.length;r++)n(r);
},
reportUrlLength:function(e,t,i,r,o,a,s){
var c=d(s,{
adSignData:e,
adSignK1:t,
adSignK2:i,
signMd5:r,
viewidKeyObj:o
});
if(c.length>=4e3){
n(13);
var p=JSON.stringify({
biz_log_report:[{
pos_type:+a.pos_type,
traceid:a.tid,
aid:+a.aid,
log_type:1,
ext_info:"[url length:"+c.length+"]"+s.substring(0,2e3)
}]
});
u({
url:"/mp/advertisement_report?action=extra_report",
timeout:2e3,
data:{
extra_data:p,
__biz:window.biz
},
type:"post"
});
}
},
isVideoSharePageOnlyAd:function(){
return"5"===window.item_show_type&&"ad"===f.getQuery("render_type");
},
listenMessage:function(e,t,n){
arguments.length<3&&(n=t,t=null),e.addEventListener("message",function(e){
var i=void 0;
if(!t||e.origin===t){
try{
i=JSON.parse(e.data);
}catch(r){
return;
}
"function"==typeof n&&n(e,i);
}
});
},
isUseAppMsgAd:function(){
var e=[350064395,3194181833,3191183081,3191008240,459315e3,2547206501,17516575,3194183798,3193008987,3191008237,3190008366,1314021127,3190008373,3192140177,3193183025,3191138746,3192008231,3191138747,3191138743,3193183023,3193183029],t=67;
return e.indexOf(window.user_uin)>-1?!0:window.user_uin&&window.user_uin%1e3<10*t?!0:!1;
},
broadcastFrame:function(e,t,n,i){
e=e||[];
for(var r=0;r<e.length;r++)(!i||i&&e[r].src.indexOf(i)>-1)&&c(e[r].contentWindow,t,n);
}
};
return j;
});function _defineProperty(e,a,t){
return a in e?Object.defineProperty(e,a,{
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}):e[a]=t,e;
}
define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/utils/get_para_list.js","biz_wap/utils/show_time.js","biz_common/utils/url/parse.js","biz_common/dom/event.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","a/a_config.js","a/video.js","a/a_utils.js","common/utils.js","biz_common/dom/offset.js","a/appdialog_confirm.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js"],function(require,exports,module,alert){
"use strict";
function processAdEleByPos(e){
var a;
e===AD_POS.POS_MID&&(a=document.getElementsByTagName("mpcpc")),adElCountMapByPos[e]=a.length;
for(var t=0;t<a.length;t++)el_gdt_areas[utils.getPosKeyDesc(e,t)]=a[t],ping_cpm_apurl[utils.getPosKeyDesc(e,t)]={};
}
function initAdData(){
processAdEleByPos(AD_POS.POS_MID);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram){
if(is_need_ad=0,js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",
adElCountMapByPos[AD_POS.POS_MID])for(var i=0;i<adElCountMapByPos[AD_POS.POS_MID];i++)el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,i)].style.display="none";
}else if(window.localStorage&&-1===location.href.indexOf("mock"))try{
var _ad=adLS.get(lsKey);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&_now-1*_adInfoSaveTime<AD_CONFIG.AD_CACHE_TIME&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(lsKey),
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function insertAutoAdElement(e,a){
if(e.pos_type===AD_POS.POS_MID&&!adElCountMapByPos[AD_POS.POS_MID]){
var t=getParaList(contentWrp),i=void 0!==e.position_index&&e.position_index>=0&&e.position_index<t.length,n=i?e.position_index:Math.ceil(t.length/2)-1,o=document.createElement("mpcpc");
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID)]=o,commonUtils.insertAfter(o,t[n]),
a&&utils.report115849(2);
}
}
function getExpParaVal(e,a){
if(e&&e.flow_exp_info){
var t=e.flow_exp_info||"";
try{
t=JSON.parse(t.replace(/&quot;/g,'"'));
}catch(i){
return;
}
if(t.length)for(var n=0;n<t.length;n++)if(t[n].exp_para&&t[n].exp_para.length)for(var o=0;o<t[n].exp_para.length;o++)if(t[n].exp_para[o].name===a)return t[n].exp_para[o].value;
}
}
function isUseFrame(){
var e=getExpParaVal.apply(null,arguments);
return"1"===e?!0:void 0;
}
function separateAdData(e){
e=e||[];
var a=[],t=[];
for(var i in e){
var n=e[i],o=isUseFrame(n,"widget_gray_biz_bottom_iframe");
o=o&&n.pos_type===AD_POS.POS_BOTTOM,o=o&&!isVideoSharePageOnlyAd&&!commonUtils.isNativePage(),
o=o&&CrtManager.CRT_CONF[n.crt_size],isUseFrame(n,"widget_gray_biz_intext_iframe")&&n.pos_type===AD_POS.POS_MID||utils.isUseAppMsgAd()&&n.pos_type===AD_POS.POS_AD_BEFORE_VIDEO||o||n.pos_type===AD_POS.POS_AD_AFTER_VIDEO?t.push(n):a.push(n);
}
return{
oldAdInfos:a,
newAdInfos:t
};
}
function createAdFrame(e,a){
console.log("广告 "+a.aid+"使用了新的iframe组件渲染模式");
var t=document.createElement("iframe"),i=getExpParaVal(a,"widget_gray_iframe_path"),n=i?i+"/":"";
return t.src=AD_CONFIG.AD_FRAME_DOMAIN+"/tmpl/"+n+"base_tmpl.html#aid="+a.aid,t.className="iframe_ad_container",
t.createIframeTime=Date.now(),e.appendChild(t),t;
}
function postMessageToAdFrame(e,a,t){
utils.postMessage(e,a,t,AD_CONFIG.AD_FRAME_DOMAIN);
}
function invalidMsg(e,a){
return e+" | "+a;
}
function isVideoFrameHasVid(e,a){
var t=e.getAttribute("data-src"),i=e.src||t;
return/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(t)||/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(t)?i&&i.indexOf("vid="+a)>-1:!1;
}
function proxyCallback(e,a,t){
postMessageToAdFrame(e,"proxyCallbackV2",{
proxyId:a.proxyId,
aid:a.aid,
proxyData:t
});
}
function androidAppDialogConfirm(e,a){
var t=a.proxyData||{};
appDialogConfirm({
app_name:t.args.app_name,
app_img_url:t.args.icon_url,
onOk:function(){
proxyCallback(e,a,{
err_msg:"appDialogConfirm:yes"
});
},
onCancel:function(){
proxyCallback(e,a,{
err_msg:"appDialogConfirm:cancel"
});
}
});
}
function AdFrame(){
this.aInfoMap={},this.iframes=document.getElementsByTagName("iframe");
}
function getClickEventPageOffset(e){
var a=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
return{
x:e.pageX?e.pageX:e.clientX,
y:e.pageY?e.pageY:e.clientY+a
};
}
function processAdAvatar(e){
var a=e.product_type;
return(a===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||a===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&e.app_info&&e.app_info.icon_url?(e.avatar=e.app_info.icon_url,
void(e.avatarTitle=e.app_info.appname)):a===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&e.game_info&&e.game_info.head_img?(e.avatar=e.game_info.head_img,
void(e.avatarTitle=e.game_info.nick_name)):void((e.pos_type===AD_POS.POS_MID&&(a===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||a===AD_TYPE.BRAND_GDT_PRODUCT_TYPE||a===AD_TYPE.BRAND_WECHAT_PRODUCT_TYPE)||e.pos_type!==AD_POS.POS_MID)&&e.biz_info&&e.biz_info.head_img&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name));
}
function handleVideoSharePage(){
var e=document.body.offsetHeight;
JSAPI.invoke("configMpAdAttrs",{
viewHeight:e
},function(a){
console.log("debug for configMpAdAttrs height: ",e,", response:",a);
});
}
function setBottomSize(e){
if(e.material_height&&e.material_width){
var a=js_bottom_ad_area.getElementsByClassName("js_mpad_smallbanner_info_banner"),t=js_bottom_ad_area.getElementsByClassName("js_mpad_banner_img"),i=e.material_height/e.material_width;
a.length&&(a[0].style.minHeight=a[0].offsetWidth*i+"px"),t.length&&(t[0].style.minHeight=t[0].offsetWidth*i+"px");
}
}
function afterGetAdData(e,a){
function t(e){
var a=e;
if(a.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&(a.is_wx_app=!0),
e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",o=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",_=a.app_info.apk_name||a.app_info.pkg_name||"";
t=utils.formSize(t),i=utils.formName(i),a.app_info.app_size=t,a.app_info.app_name=i,
a.app_info.apk_name=_,a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=_,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=o;
var p=utils.extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:_,
url_scheme:a.app_info.url_scheme,
androiddownurl:n,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:o
},a);
return p;
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,l=0;l<r.length;++l){
var c=r[l]||{};
if(1==c.exp_type&&(s=c.comm_attention_num,d=s>0),2==c.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var p=utils.extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return p;
}
return e;
}
function i(e){
var a,t=e;
if(e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var i=t.app_info.app_size||0,n=t.app_info.app_name||t.app_info.appname||"",o=t.app_info.apk_url||t.app_info.pkgurl||"",_=t.app_info.file_md5||t.app_info.pkgmd5||t.app_info.app_md5||"",p=t.app_info.apk_name||t.app_info.pkg_name||"",r=t.app_info.category,d=["万","百万","亿"],s=t.app_info.down_count||0;
if(s>=1e4){
s/=1e4;
for(var l=0;s>=10&&2>l;)s/=100,l++;
s=s.toFixed(1)+d[l]+"次";
}else s=s.toFixed(1)+"次";
return r=r?r[0]||"其他":"其他",i=utils.formSize(i),n=utils.formName(n),t.app_info._down_count=s,
t.app_info._category=r,t.app_info.app_size=i,t.app_info.app_name=n,t.app_info.apk_name=p,
t.app_info.appname=t.app_info.app_name,t.app_info.app_rating=t.app_info.app_rating||0,
t.app_info.app_id=t.app_info.app_id,t.app_info.icon_url=t.app_info.icon_url,t.app_info.channel_id=t.app_info.channel_id,
t.app_info.md5sum=t.app_info.app_md5,t.app_info.rl=t.rl,t.app_info.pkgname=p,t.app_info.url_scheme=t.app_info.url_scheme,
t.app_info.androiddownurl=o,t.app_info.versioncode=t.app_info.version_code,t.app_info.appinfo_url=t.app_info.appinfo_url,
t.app_info.traceid=t.traceid,t.app_info.pt=t.pt,t.app_info.url=t.url,t.app_info.ticket=t.ticket,
t.app_info.type=t.type,t.app_info.adid=t.aid,t.app_info.file_md5=_,a=utils.extend({
appname:t.app_info.app_name,
app_rating:t.app_info.app_rating||0,
app_id:t.app_info.app_id,
icon_url:t.app_info.icon_url,
channel_id:t.app_info.channel_id,
md5sum:t.app_info.app_md5,
rl:t.rl,
pkgname:p,
url_scheme:t.app_info.url_scheme,
androiddownurl:o,
versioncode:t.app_info.version_code,
appinfo_url:t.app_info.appinfo_url,
traceid:t.traceid,
pt:t.pt,
url:t.url,
ticket:t.ticket,
type:t.type,
adid:t.aid,
source:source||"",
is_appmsg:!0,
file_md5:_
},t);
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var c=t.exp_info.exp_value||[],m=!1,u=0,f=0;f<c.length;++f){
var g=c[f]||{};
if(1==g.exp_type&&(u=g.comm_attention_num,m=u>0),2==g.exp_type){
m=!1,u=0;
break;
}
}
return t.biz_info.show_comm_attention_num=m,t.biz_info.comm_attention_num=u,a=utils.extend({
usename:t.biz_info.user_name,
pt:t.pt,
url:t.url,
traceid:t.traceid,
adid:t.aid,
ticket:t.ticket,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.CARD_PRODUCT_TYPE||e.product_type==AD_TYPE.COUPON_PRODUCT_TYPE){
var y=t.card_info.card_id||"",A=t.card_info.card_ext||"";
A=A.htmlDecode();
try{
A=JSON.parse(A),A.outer_str=t.card_info.card_outer_id||"",A=JSON.stringify(A);
}catch(D){
A="{}";
}
return a=utils.extend({
card_id:y,
card_ext:A,
pt:T,
ticket:t.ticket||"",
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.SHOP_PRODUCT_TYPE){
if(t.mp_shop_info){
var v=t.mp_shop_info.pid||"",P=t.mp_shop_info.outer_id||"";
a=utils.extend({
pid:v,
outer_id:P,
pt:T,
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}else a=t;
return a;
}
return e;
}
isVideoSharePageOnlyAd&&urlParser.getQuery("adWidth")&&(document.documentElement.style.width=urlParser.getQuery("adWidth")+"px");
var n={},o={},_=e.is_need_ad,p=e._adInfo;
if(0==_)o=p,o||(o={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
o.advertisement_info=utils.saveCopy(r);
}
if(o.advertisement_num=a.advertisement_num,window._adRenderData=o,o){
var d=utils.saveCopy(o),s=d.advertisement_info;
if(s)for(var l in s)(s[l].pos_type===AD_POS.POS_AD_BEFORE_VIDEO||s[l].pos_type===AD_POS.POS_AD_AFTER_VIDEO)&&(delete s[l],
d.advertisement_num--);
adLS.set(lsKey,{
info:JSON.stringify(d),
time:Date.now()
},+new Date+24e4);
}
}
o=o||{
advertisement_num:0
};
var c=!1,m=separateAdData(o.advertisement_info),u=m.oldAdInfos,f=u.length;
if((new AdFrame).handleAdWithFrame(m.newAdInfos),!o.flag&&o.advertisement_num>0){
var g=o.advertisement_num,y=o.advertisement_info;
window.adDatas.realNum=g,y=u,g=f,window.adDatas.num=g;
for(var A=0;g>A;++A){
var D,v=null,P=y[A];
P.exp_info=P.exp_info||{},P.is_cpm=P.is_cpm||0,P.biz_info=P.biz_info||{},P.app_info=P.app_info||{},
P.pos_type=P.pos_type||0,P.logo=P.logo||"",P.use_new_protocol=P.use_new_protocol||0;
var T=P.pt,h=P.pos_type,w=P.product_type;
if(2==P.use_new_protocol&&P.pos_type==AD_POS.POS_BOTTOM){
var E=JSON.stringify({
biz_log_report:[{
pos_type:+P.pos_type,
traceid:P.traceid,
aid:+P.aid,
log_type:1,
ext_info:P.crt_size
}]
});
CrtManager.CRT_CONF[P.crt_size]||(P.use_new_protocol=P.product_type!=AD_TYPE.IOS_APP_PRODUCT_TYPE&&P.product_type!=AD_TYPE.ANDROID_APP_PRODUCT_TYPE||2!=P.material_type&&9!=P.material_type||P.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPDETAIL_DEST_TYPE&&P.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPINFO_PAGE_DEST_TYPE&&!AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE?0:1,
console.info("[底部广告旧协议兼容] crt_size:",P.crt_size," 最终协议类型：",P.use_new_protocol),ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+E+"&__biz="+biz,
timeout:2e3
}));
}
if(urlParser.getQuery("oldAd")&&(P.use_new_protocol=0),D=P.use_new_protocol,n[h]||(n[h]=0),
n[h]++,D)1==D?h===AD_POS.POS_MID?(c=!0,P=t(P),v=P):0===h?(P=i(P),(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(v=P)):3===h&&(v=P):2==D&&(h===AD_POS.POS_MID?(c=!0,
P=t(P)):0==h&&(P=i(P)),v=P);else if(100===T||115===T){
for(var O=P.exp_info.exp_value||[],b=!1,I=0,x=0;x<O.length;++x){
var S=O[x]||{};
if(1==S.exp_type&&(I=S.comm_attention_num,b=I>0),2==S.exp_type){
b=!1,I=0;
break;
}
}
P.biz_info.show_comm_attention_num=b,P.biz_info.comm_attention_num=I,v={
usename:P.biz_info.user_name,
pt:T,
url:P.url,
traceid:P.traceid,
adid:P.aid,
ticket:P.ticket,
is_appmsg:!0
};
}else if(102===T)v={
appname:P.app_info.app_name,
versioncode:P.app_info.version_code,
pkgname:P.app_info.apk_name,
androiddownurl:P.app_info.apk_url,
md5sum:P.app_info.app_md5,
signature:P.app_info.version_code,
rl:P.rl,
traceid:P.traceid,
pt:T,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(101===T)v={
appname:P.app_info.app_name,
app_id:P.app_info.app_id,
icon_url:P.app_info.icon_url,
appinfo_url:P.app_info.appinfo_url,
rl:P.rl,
traceid:P.traceid,
pt:T,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0
};else if(103===T||104===T||2===T&&P.app_info){
var C=P.app_info.down_count||0,j=P.app_info.app_size||0,k=P.app_info.app_name||"",N=P.app_info.category,Y=["万","百万","亿"];
if(C>=1e4){
C/=1e4;
for(var M=0;C>=10&&2>M;)C/=100,M++;
C=C.toFixed(1)+Y[M]+"次";
}else C=C.toFixed(1)+"次";
j=utils.formSize(j),N=N?N[0]||"其他":"其他",k=utils.formName(k),P.app_info._down_count=C,
P.app_info._app_size=j,P.app_info._category=N,P.app_info.app_name=k,v={
appname:P.app_info.app_name,
app_rating:P.app_info.app_rating||0,
icon_url:P.app_info.icon_url,
app_id:P.app_info.app_id,
channel_id:P.app_info.channel_id,
md5sum:P.app_info.app_md5,
rl:P.rl,
pkgname:P.app_info.apk_name,
url_scheme:P.app_info.url_scheme,
androiddownurl:P.app_info.apk_url,
versioncode:P.app_info.version_code,
appinfo_url:P.app_info.appinfo_url,
traceid:P.traceid,
pt:T,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
is_appmsg:!0,
app_info:P.app_info
};
}else if(105===T){
var R=P.card_info.card_id||"",U=P.card_info.card_ext||"";
U=U.htmlDecode();
try{
U=JSON.parse(U),U.outer_str=P.card_info.card_outer_id||"",U=JSON.stringify(U);
}catch(z){
U="{}";
}
v={
card_id:R,
card_ext:U,
pt:T,
ticket:P.ticket||"",
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(106===T){
var F=P.mp_shop_info.pid||"",W=P.mp_shop_info.outer_id||"";
v={
pid:F,
outer_id:W,
pt:T,
url:P.url,
rl:P.rl,
tid:P.traceid,
traceid:P.traceid,
type:P.type,
adid:P.aid,
is_appmsg:!0
};
}else if(108===T||109===T||110===T||116===T||117===T)v={
pt:T,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
},P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(111===T||113===T||114===T||112===T||121===T||122===T){
var j=P.app_info.app_size||0,k=P.app_info.app_name||"";
j=utils.formSize(j),k=utils.formName(k),P.app_info.app_size=j,P.app_info.app_name=k,
v={
appname:P.app_info.app_name,
app_rating:P.app_info.app_rating||0,
app_id:P.app_info.app_id,
icon_url:P.app_info.icon_url,
channel_id:P.app_info.channel_id,
md5sum:P.app_info.app_md5,
rl:P.rl,
pkgname:P.app_info.apk_name,
url_scheme:P.app_info.url_scheme,
androiddownurl:P.app_info.apk_url,
versioncode:P.app_info.version_code,
appinfo_url:P.app_info.appinfo_url,
traceid:P.traceid,
pt:T,
url:P.url,
ticket:P.ticket,
type:P.type,
adid:P.aid,
source:source||"",
is_appmsg:!0,
app_info:P.app_info
};
}else if(118===T)v=P,c=!0,Wxopen_card.startConnect(P);else if(119===T||120===T)v=P,
Wxopen_card.startConnect(P);else if(125===T)v=P,P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P);else if(140===T){
v=P;
try{
v.shopImage=v.shop_image[0],v.shopImage.mp_tags=v.shopImage.mp_tags||[];
}catch(q){
v.shopImage={};
}
}
var B=P.image_url;
require("appmsg/cdn_img_lib.js"),B&&B.isCDN()&&(B=B.replace(/\/0$/,"/640"),B=B.replace(/\/0\?/,"/640?"),
P.image_url=urlParser.addParam(B,"wxfrom","50",!0)),adDatas.ads[utils.getPosKeyDesc(h,n[h]-1)]={
a_info:P,
adData:v
},localStorage&&localStorage.setItem&&P.app_info&&P.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+P.traceid,P.app_info.url_scheme),
P.has_installed=!1,P.app_info&&!function(e){
JSAPI.invoke("getInstallState",{
packageName:e.app_info.apk_name
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(e.has_installed=!0);
});
}(P),0===h&&9===P.material_type&&(w===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&P.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&P.game_info&&(P.biz_info.head_img=P.game_info.head_img,
P.biz_info.nick_name=P.game_info.nick_name),w!==AD_TYPE.IOS_APP_PRODUCT_TYPE&&w!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE||!P.app_info||(P.biz_info.head_img=P.app_info.icon_url,
P.biz_info.nick_name=P.app_info.app_name));
}
var V=function ra(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(js_sponsor_ad_area.offsetTop<e+commonUtils.getInnerHeight()){
var a=document.getElementById("js_ad_area");
a&&Class.addClass(a,"show"),DomEvent.off(window,"scroll",ra);
}
},H=adDatas.ads;
for(var L in H)if(0===L.indexOf("pos_")){
var v=H[L],P=!!v&&v.a_info,w=P.product_type;
if(v&&P){
if(insertAutoAdElement(P),2!==P.use_new_protocol){
if(0==P.pos_type){
if(P.new_appmsg=window.new_appmsg,P.longAppBtnText=w===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
P.shortAppBtnText=w===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,P),
111==P.pt||112==P.pt||113==P.pt||114==P.pt){
var G=document.getElementsByClassName("js_download_app_card")[0],K=G.offsetWidth,J=Math.floor(K/2.875);
J>0&&(G.style.height=J+"px");
}
}else if(3==P.pos_type){
var G=document.createElement("div");
G.appendChild(document.createTextNode(P.image_url)),P.image_url=G.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,P),
js_sponsor_ad_area.style.display="block";
var X=js_sponsor_ad_area.clientWidth;
108!=P.pt&&109!=P.pt&&110!=P.pt||2==P.use_new_protocol?116==P.pt||117==P.pt:document.getElementById("js_main_img").style.height=X/1.77+"px",
DomEvent.on(window,"scroll",V),V(0);
}else if(P.pos_type===AD_POS.POS_MID&&utils.checkShowCpc(el_gdt_areas[L],globalAdDebug,contentWrp,P)){
P=_parseExpCpc(P);
var Q=!1;
if(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,P),
Q=!0;else{
var Z=require("a/tpl/cpc_tpl.html.js"),$=P.exp_obj.sale_text;
(w===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE||w===AD_TYPE.MINI_GAME_PRODUCT_TYPE)&&($=P.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(Z,{
tag_pos:P.exp_obj.tag_pos,
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
price:P.exp_obj.price,
title:$,
is_wx_app:P.is_wx_app,
btn_text:P.exp_obj.btn_text,
avatar:P.avatar,
isDownload:Q
});
}
}
mmversion.isIOS&&P.app_info&&P.app_info.url_scheme&&w===AD_TYPE.IOS_APP_PRODUCT_TYPE&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+P.pos_type)&&(document.getElementById("js_ad_btn_"+P.pos_type).innerHTML="查看应用"));
}else{
var ea,aa={},Q=!1,ta={};
if(P.button_action)try{
"string"==typeof P.button_action&&(P.button_action=JSON.parse(P.button_action.html())),
P.button_action.button_text&&""!=P.button_action.button_text||(P.button_action.button_text="去逛逛");
}catch(z){
P.button_action={
button_text:"decode error"
};
}else P.button_action={
button_text:"something wrong"
};
ea=P.crt_size,(w===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||w===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(Q=!0);
var $="",ia="";
if(processAdAvatar(P),P.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(P),
P.pos_type===AD_POS.POS_MID)utils.checkShowCpc(el_gdt_areas[L],globalAdDebug,contentWrp,P)&&(P=_parseExpCpc(P),
(P.avatarTitle||P.exp_obj.sale_text)&&P.avatar&&($=P.avatarTitle||P.exp_obj.sale_text,
ia=P.avatar),aa={
tag_pos:P.exp_obj.tag_pos,
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
price:P.exp_obj.price,
title:$,
is_wx_app:P.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:Q,
btn_text:P.exp_obj.btn_text,
avatar:ia
},Q&&(ta.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
}),ad_render_object[L]=new CrtManager.createCrtObject(ea,aa,el_gdt_areas[L],ta),
gdt_as[L]=el_gdt_areas[L].getElementsByClassName("js_ad_main_area"));else if(P.pos_type==AD_POS.POS_SPONSOR){
var G=document.createElement("div");
G.appendChild(document.createTextNode(P.image_url)),P.image_url=G.innerHTML.replace(/&amp;/g,"&"),
P.new_appmsg=window.new_appmsg;
var v={
pt:P.pt,
ticket:P.ticket||"",
url:P.url,
traceid:P.traceid,
adid:P.aid,
is_appmsg:!0
};
if(P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),aa={
type:P.tag_pos,
ticket:P.ticket,
url:P.url,
rl:P.rl,
aid:P.aid,
pt:P.pt,
traceid:P.traceid,
group_id:P.group_id,
apurl:P.apurl,
is_cpm:P.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:P.pos_type,
banner:P.image_url,
title:P.biz_info.nick_name,
is_wx_app:P.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
is_ios:mmversion.isIOS,
isDownload:Q,
btn_text:P.button_action.button_text,
avatar:P.biz_info.head_img,
isApp:!1
},ad_render_object[L]=new CrtManager.createCrtObject(ea,aa,js_sponsor_ad_area,ta),
js_sponsor_ad_area.style.display="block",gdt_as["pos_"+P.pos_type]=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object[L].getCrtData().has_banner){
var na="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+P.pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=na;
}
var oa=require("a/sponsor.js");
new oa({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:v,
a_info:P,
pos_type:P.pos_type,
report_param:na
}),DomEvent.on(window,"scroll",V),V(0);
}else if(P.pos_type==AD_POS.POS_BOTTOM){
var ta={};
if(P.video_info&&(v.displayWidth=P.video_info.displayWidth,v.displayHeight=P.video_info.displayHeight,
v.thumbUrl=P.video_info.thumbUrl,v.videoUrl=P.video_info.videoUrl,v.rl=P.rl),Q&&(ta.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
},ta.afterRenderFunc=function(e,a){
JSAPI.invoke("getInstallState",{
packageName:P.app_info.apk_name
},function(t){
var i=t.err_msg,n=e.querySelector(".js_watermark_text");
i.indexOf("get_install_state:yes")>-1&&P.app_info.url_scheme&&(n.textContent=354==parseInt(a.crt_size)||117==parseInt(a.crt_size)||355==parseInt(a.crt_size)||568==parseInt(a.crt_size)?"进入":"进入应用");
});
}),P.avatarTitle&&P.avatar&&($=P.avatarTitle||P.exp_obj.sale_text,ia=P.avatar),aa=utils.extend({
banner:P.image_url,
is_wx_app:P.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
btn_text:P.button_action.button_text,
avatar:P.avatar,
isApp:!1,
isDownload:Q,
title:$
},P),ad_render_object["pos_"+P.pos_type]=new CrtManager.createCrtObject(ea,aa,js_bottom_ad_area,ta),
!ad_render_object["pos_"+P.pos_type].getCrtData().has_banner){
var na="&tid="+P.traceid+"&uin="+uin+"&key="+l+"&ticket="+(P.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+P.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+P.exp_info.exp_id+"&exp_value="+P.exp_info.exp_value+"&r="+Math.random();
P.report_param=na;
var _a=ad_render_object["pos_"+P.pos_type].getWrapperElm().getElementsByClassName("js_video_container_new_protocol");
_a[0]&&(_a=_a[0],P.videoContainer=_a,videoAdMap[P.aid]=new VideoAd(P));
}
gdt_as["pos_"+P.pos_type]=js_bottom_ad_area.getElementsByClassName("js_ad_main_area"),
setBottomSize(P);
}
}
utils.lazyLoadAdImg({
aid:P.aid,
type:P.pt,
info:P
}),utils.checkAdImg(P);
}
}
isVideoSharePageOnlyAd&&js_bottom_ad_area.offsetHeight&&handleVideoSharePage(),bindAdOperation();
}
if(is_temp_url&&adElCountMapByPos[AD_POS.POS_MID]&&!c)for(var pa=0;pa<adElCountMapByPos[AD_POS.POS_MID];pa++){
if(!utils.checkShowCpc(el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,pa)]),contentWrp)return;
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,pa)].innerHTML=TMPL.tmpl(cpc_a_tpl,{
type:"",
ticket:"",
url:"",
rl:"",
aid:"",
pt:"",
traceid:"",
group_id:"",
apurl:"",
is_cpm:"",
pos_type:"",
dest_type:"",
exp_obj:{
btn_text:"按钮"
},
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
});
}
}
function _parseExpCpc(e){
var a=e.product_type,t={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(t.btn_text="查看详情"),29===a||31===a?t.btn_text="查看详情":a===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||a===AD_TYPE.IOS_APP_PRODUCT_TYPE?t.btn_text=a===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用":30===a?t.btn_text="去逛逛":a===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":a===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&(t.btn_text="进入小游戏"),
e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE&&(t.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var i=e.cpc_exp_info.exp_content;
try{
for(var n=JSON.parse(i.replace(/&quot;/g,'"')),o=-1,_=0;_<n.aid_list.length;_++)n.aid_list[_].aid==e.aid&&(o=_);
o>-1&&(t.icon_pos=n.icon_pos||"",t.btn_text=n.btn_text||t.btn_text,t.price=n.aid_list[o].price,
t.sale_text=n.aid_list[o].sale_text,window.__addIdKeyReport("68064",15));
}catch(p){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=t,e;
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var scrollFn=function scrollFn(event,adOffsetWebviewTopFromApp,scrollViewHeight){
var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
scrollViewHeight=scrollViewHeight||commonUtils.getInnerHeight();
for(var i in adDatas.ads)!function(pos_key){
var gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var aInfo=adDatas.ads[pos_key].a_info,gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=aInfo.pos_type,offsetTop=offset.getOffset(el_gdt_areas[pos_key]).offsetTop,adHeight=el_gdt_areas[pos_key].offsetHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=aInfo.pt,adOffsetWebviewTop=adOffsetWebviewTopFromApp?adOffsetWebviewTopFromApp+gdt_a.offsetTop:offsetTop-scrollTop,intoView=scrollViewHeight>adOffsetWebviewTop&&adOffsetWebviewTop>-adHeight,signData={
click_pos:"",
rl:encodeURIComponent(a_info.rl),
__biz:biz,
pos_x:"",
pos_y:"",
press_interval:""
};
adDatas.ads[pos_key]&&aInfo&&aInfo.weapp_info&&aInfo.weapp_info.original_id&&(gh_id=aInfo.weapp_info.original_id),
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),intoView?showTime.startShow(aInfo):showTime.stopShow(aid),
!ping_apurl[pos_key]&&intoView){
ping_apurl[pos_key]=!0;
var report_arg="trace_id="+tid+"&product_type="+pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){}),log("[Ad] seeAd, tid="+tid+", aid="+aid+", pos_type="+pos_type),
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
exp_id:exp_id,
exp_value:exp_value,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
success:function success(res){
log("[Ad] seeAd report success, tid="+tid+", aid="+aid+", pos_type="+pos_type);
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
log("[Ad] seeAd report error, tid="+tid+", aid="+aid+", pos_type="+pos_type),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollViewHeight-adHeight*rh>adOffsetWebviewTop&&adOffsetWebviewTop>-adHeight*(1-rh)?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl+"&viewable=true"),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
mayAbort:!0,
success:function success(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
var reportOriginUrl=urlParser.join("/mp/advertisement_report",{
report_type:1,
tid:tid,
aid:aid,
gh_id:gh_id,
adver_group_id:gid,
apurl:encodeURIComponent(apurl+"&viewable=true"),
__biz:biz,
ascene:encodeURIComponent(window.ascene||-1),
pos_type:pos_type,
exp_id:exp_id,
exp_value:exp_value,
r:Math.random()
},!0);
ajax({
url:utils.joinSignParam(reportOriginUrl,{
adSignData:adSignData,
adSignK1:adSignK1,
adSignK2:adSignK2,
signMd5:signMd5,
viewidKeyObj:viewidKeyObj
}),
mayAbort:!0,
success:function success(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
}),utils.reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},reportOriginUrl);
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
var allReport=!0;
if(107==pt||108==pt||110==pt)for(var i=0;i<see_ad_detail_report.length;i++)if(see_ad_detail_report[i])allReport=!1;else{
var report_url=location.protocol+"//mp.weixin.qq.com/mp/ad_report?action=see_report&aid="+aid+"&tid="+tid;
if((0==i&&scrollTop+scrollViewHeight>adOffsetTop+1||1==i&&scrollTop+scrollViewHeight>adOffsetTop+.5*adHeight||2==i&&scrollTop+scrollViewHeight>adOffsetTop+adHeight)&&((new Image).src=report_url+"&seepos="+(i+1)+"&report_type=0",
see_ad_detail_report[i]=!0),i>=3)if(scrollTop+scrollViewHeight>adOffsetTop&&adOffsetTop+adHeight>scrollTop){
if(see_ad_detail_first_see_time>0){
var t=0;
3==i&&(t=500),4==i&&(t=1e3),5==i&&(t=2e3),+new Date-see_ad_detail_first_see_time>t?((new Image).src=report_url+"&seetime="+t+"&report_type=1",
see_ad_detail_report[i]=!0):window.setTimeout(function(){
seeAds();
},t);
}
0==see_ad_detail_first_see_time&&(see_ad_detail_first_see_time=+new Date);
}else see_ad_detail_first_see_time=0;
}
}
}(i);
},onScroll=utils.debounce(scrollFn,50);
DomEvent.on(window,"scroll",onScroll),!isVideoSharePageOnlyAd&&onScroll(),isVideoSharePageOnlyAd&&JSAPI.on("onScrollViewDidScroll",function(e){
onScroll(null,e.subViewOffsetTop,e.scrollViewHeight);
});
}
}
function ad_click(e,a,t,i,n,o,_,p,r,d,s,l,c,m,u,f,g,y,A){
if(!has_click[n]){
has_click[n]=!0;
{
var D=document.getElementById("loading_"+n);
g.product_type;
}
D&&(D.style.display="inline");
var v=g.exp_info||{},P=v.exp_id||"",T=v.exp_value||[];
try{
T=JSON.stringify(T);
}catch(h){
T="[]";
}
var w="";
l&&l.weapp_info&&l.weapp_info.original_id&&(w=l.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:P,
exp_value:T,
url:encodeURIComponent(a),
tid:n,
aid:p,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:w,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[n]=!1,D&&(D.style.display="none"),g.app_info){
var t=handleApp(a,n,idx,mid,biz,r,p,s,d,l,g,o,y);
if(t)return;
}
if(isCanvasAd(g))return void utils.openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:y,
url:a
});
if(A)if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE)handleH5(a,n,idx,mid,biz,r,p,s,d,l,g);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)Wxopen_card.openWxopen(l);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.AD_DEST_TYPE)openUrlWithExtraWebview(a);else{
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE)return void openUrlWithExtraWebview(urlParser.join(a,{
outer_id:l.outer_id
}));
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.BIZ_DEST_TYPE&&g.product_type==AD_CONFIG.AD_TYPE.CARD_PRODUCT_TYPE)return void Card.openCardDetail(l.card_id,l.card_ext,l);
console.info("[广告新协议兜底跳转]",g),openUrlWithExtraWebview(a);
}else if("5"==e)openUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+a+"&ticket="+o+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+n);else{
if("105"==r&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==r&&l)return void openUrlWithExtraWebview(urlParser.join(a,{
outer_id:l.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(l);
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)return void Wxopen_card.openWxopen(l);
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:n,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:p,
ad_engine:s,
pos_type:d
},_=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&l||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var c="",m="";
l&&(c=l.pkgname&&l.pkgname.replace(/\./g,"_"),m=l.channel_id||""),i={
source:4,
tid:n,
traceid:n,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:m,
aid:p,
engine:s,
pos_type:d,
pkgname:c
};
}
a=urlParser.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=urlParser.join(a,{
traceid:n,
aid:p,
engine:s
})),!p&&_&&_(80,a);
}
openUrlWithExtraWebview(a);
}
});
}
}
function hideComplainBtns(){
for(var e=document.getElementsByClassName("js_ad_opt_list"),a=0;a<e.length;a++)e[a].style.display="none";
}
function bindAdOperation(){
seeAds();
for(var e in adDatas.ads)!function(e){
var a=el_gdt_areas[e];
if(!a)return!1;
if(!a.getElementsByClassName&&a.style)return a.style.display="none",!1;
var t=a.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[e];
if(i){
var n,o,_=i.adData,p=i.a_info,r=p.pos_type,d=p.pos_type,s=i.ad_engine,l=a.getElementsByClassName("js_ad_opt_list_btn_"+r),c=a.getElementsByClassName("js_complain_btn_"+r);
if(2==p.use_new_protocol){
var m=a.getElementsByClassName("js_material_"+r),u=a.getElementsByClassName("js_ad_action_"+r);
if(_){
_.adid=window.adid||_.adid||_.aid;
var f="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
if(m.length>0&&(o=_.tid||p.traceid,n=p.aid,DomEvent.on(m[0],"click",function(e){
var a=p,t=!!e&&e.target;
if(p&&p.has_installed&&("104"==_.pt||"113"==_.pt||"114"==_.pt||"2"==_.pt)?utils.report(114,f):"103"==_.pt||"111"==_.pt||"112"==_.pt?utils.report(23,f):("104"==_.pt||"113"==_.pt||"114"==_.pt)&&utils.report(25,f),
!(!a||3===d||-1!==t.className.indexOf("js_muted_btn")||videoAdMap[a.aid]&&videoAdMap[a.aid].adPlayer&&"play"!==videoAdMap[a.aid].adPlayer.adVideoStatus)){
var i,r,l=a.type,c=a.url,u=a.rl,g=a.apurl,y=a.ticket,A=a.group_id,D=a.pt,v=p.use_new_protocol;
i=m[0].clientWidth,r=m[0].clientHeight;
var P=getClickEventPageOffset(e),T=offset.getOffset(m[0]),h=P.x-T.offsetLeft,w=P.y-T.offsetTop;
ad_click(l,c,u,g,o,y,A,n,D,d,s,_,h,w,i,r,p,f,v),log("[Ad] ad_click: type="+l+", url="+c+", rl="+u+", apurl="+g+", traceid="+o+", ticket="+y+", group_id="+A+", aid="+n+", pt="+D+", pos_type="+d+", ad_engine="+s);
}
})),u.length>0&&p.button_action&&3!=p.pos_type)if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),y=15,A=_.pkgname&&_.pkgname.replace(/\./g,"_");
new g({
btn:u[0],
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,A,source,y,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+A,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s,
percentStatus:function(a,t){
var i=ad_render_object[e].getData();
i.percent=t,"downloading"==a?i.btn_text="暂停":"paused"==a?i.btn_text="继续":"installed"==a?(i.percent=0,
i.btn_text="已安装"):"downloaded"==a?(i.percent=0,i.btn_text="安装"):"gotodetail"==a?(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"):(i.percent=0,
i.btn_text=117==parseInt(p.crt_size)||354==parseInt(p.crt_size)||355==parseInt(p.crt_size)||568==parseInt(p.crt_size)?"进入":"进入应用"),
ad_render_object[e].updateData(i);
}
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var D=require("a/profile.js");
_.adid=window.adid||_.adid||_.aid,new D({
btnProfile:u[0],
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s
});
}else p.product_type==AD_TYPE.CARD_PRODUCT_TYPE?new Card({
btn:u[0],
adData:_,
report_param:f,
pos_type:d
}):p.product_type==AD_TYPE.WECHATCARD_PRODUCT_TYPE?new MpShop({
btn:u[0],
adData:_,
report_param:f,
pos_type:d
}):DomEvent.on(u[0],"click",function(e){
var a=_,t=!!e&&e.target,i=a.type,n=p.button_action.jump_url,o=a.rl,l=a.apurl,c=a.tid||p.traceid,m=a.ticket,f=a.group_id,g=a.aid,y=a.pt,A=p.use_new_protocol;
if(console.info("[广告新协议点击素材]",p.dest_type,p.product_type),_){
_.adid=window.adid||_.adid||_.aid;
var D="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
var v,P,T,h;
v=position.getX(t,"js_ad_action_"+r)+e.offsetX,P=position.getY(t,"js_ad_action_"+r)+e.offsetY,
T=u[0].clientWidth,h=u[0].clientHeight;
var w=getClickEventPageOffset(e),E=offset.getOffset(u[0]),O=w.x-E.offsetLeft,b=w.y-E.offsetTop;
return ad_click(i,n,o,l,c,m,f,g,y,d,s,_,O,b,T,h,p,D,A),log("[Ad] ad_click: type="+i+", url="+n+", rl="+o+", apurl="+l+", traceid="+c+", ticket="+m+", group_id="+f+", aid="+g+", pt="+y+", pos_type="+d+", ad_engine="+s),
hideComplainBtns(),!1;
});
}else for(var v=0,P=t.length;P>v;++v)!function(e,a){
var i=t[e],_=i.dataset;
if(_&&3!=p.pos_type){
var r=_.type,l=_.url,c=_.rl,m=_.apurl,u=_.ticket,f=_.group_id,g=_.pt,y=p.use_new_protocol,A=!0;
o=_.tid,n=_.aid,(y&&(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE)||115===g)&&(A=!1),
p.pos_type===AD_POS.POS_MID&&(A=!1),DomEvent.on(i,"click",function(e){
var t=!!e&&e.target,i=[AD_TYPE.ANDROID_APP_PRODUCT_TYPE,AD_TYPE.IOS_APP_PRODUCT_TYPE,AD_TYPE.ADD_CONTACT_PRODUCT_TYPE];
if(!t||!t.className||d==AD_POS.POS_MID&&a&&-1==i.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var _="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
p&&p.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?utils.report(114,_):"103"==a.pt||"111"==a.pt||"112"==a.pt?utils.report(23,_):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&utils.report(25,_);
}
var A,D,v,P;
return A=position.getX(t,"js_ad_link")+e.offsetX,D=position.getY(t,"js_ad_link")+e.offsetY,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
P=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(r,l,c,m,o,u,f,n,g,d,s,a,A,D,v,P,p,_,y),log("[Ad] ad_click: type="+r+", url="+l+", rl="+c+", apurl="+m+", traceid="+o+", ticket="+u+", group_id="+f+", aid="+n+", pt="+g+", pos_type="+d+", ad_engine="+s),
!1;
}
},A),DomEvent.on(i,"touchstart",function(){
window.__a_press_interval=+new Date;
}),DomEvent.on(i,"touchend",function(){
window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(v,_);
if(l[0]&&DomEvent.on(l[0],"click",function(){
if(parseInt(window.can_see_complaint)){
var e=l[0].getElementsByClassName("js_ad_opt_list_"+p.pos_type);
utils.adOptReport(0,p.pos_type,o,n),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
}),c[0]&&DomEvent.on(c[0],"click",function(){
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+n+"&traceid="+o+"&source="+p.pos_type+"&biz="+window.biz+"&material_id="+JSON.stringify(p.material_id_list);
utils.adOptReport(1,p.pos_type,o,n),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):openUrlWithExtraWebview(e);
}),_&&2!=p.use_new_protocol){
_.adid=window.adid||_.adid||_.aid;
var T=p.exp_info||{},h=T.exp_id||"",w=T.exp_value||[];
try{
w=JSON.stringify(w);
}catch(E){
w="[]";
}
var f="&tid="+_.traceid+"&uin="+uin+"&key="+key+"&ticket="+(_.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+_.adid+"&ad_engine="+s+"&pos_type="+d+"&exp_id="+h+"&exp_value="+w+"&r="+Math.random();
if(_.report_param=f,_.use_new_protocol){
if(p.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||p.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var g=require("a/app_card.js"),y=15,A=_.pkgname&&_.pkgname.replace(/\./g,"_"),O=document.getElementById("js_ad_btn_"+d);
new g({
btn:O,
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,A,source,y,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+A,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}else if(p.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var D=require("a/profile.js");
new D({
btnProfile:document.getElementById("js_ad_btn_"+d),
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s,
a_info:p
});
}
9==p.material_type&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}else{
if("100"==_.pt||"115"==_.pt){
var D=require("a/profile.js");
return void new D({
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:_,
pos_type:d,
report_param:f,
aid:_.adid,
ad_engine:s,
a_info:p
});
}
if("102"==_.pt){
var b=require("a/android.js"),y=15,A=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new b({
btn:document.getElementById("js_app_action_"+d),
adData:_,
report_param:f,
task_ext_info:[_.adid,_.traceid,A,source,y,s].join("."),
via:[_.traceid,_.adid,A,source,y,s].join(".")
});
}
if("101"==_.pt){
var I=require("a/ios.js");
return void new I({
btn:document.getElementById("js_app_action_"+d),
adData:_,
ticket:_.ticket,
report_param:f
});
}
if("105"==_.pt)return void new Card({
btn:document.getElementById("js_card_action_"+d),
adData:_,
report_param:f,
pos_type:d
});
if("106"==_.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+d),
adData:_,
report_param:f,
pos_type:d
});
if("103"==_.pt||"104"==_.pt||"111"==_.pt||"112"==_.pt||"113"==_.pt||"114"==_.pt||"121"==_.pt||"122"==_.pt){
var g=require("a/app_card.js"),y=15,A=_.pkgname&&_.pkgname.replace(/\./g,"_");
return void new g({
btn:document.getElementById("js_appdetail_action_"+d),
js_app_rating:document.getElementById("js_app_rating_"+d),
adData:_,
report_param:f,
pos_type:d,
url_scheme:_.url_scheme,
via:[_.traceid,_.adid,A,source,y,s].join("."),
ticket:_.ticket,
appdetail_params:["&aid="+_.adid,"traceid="+_.traceid,"pkgname="+A,"source="+source,"type="+y,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+_.ticket,"scene="+scene].join("&"),
engine:s
});
}
if("108"==_.pt||"109"==_.pt||"110"==_.pt||"116"==_.pt||"117"==_.pt){
var x=require("a/sponsor.js");
new x({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:_,
a_info:p,
pos_type:d,
report_param:f
});
}
"118"==p.pt&&(_.report_param=f),"125"==p.pt&&(p.report_param=f,videoAdMap[p.aid]=new VideoAd(p));
}
}
}
}(e);
var a=document.getElementById("js_article");
a&&a.addEventListener("click",function(e){
if(e.target){
var a=e.target.className;
-1===a.indexOf("js_ad_opt_list_btn")&&-1===a.indexOf("js_mpad_more")&&hideComplainBtns();
}
});
}
function isCanvasAd(e){
return!!e.canvas_info&&e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE;
}
function launchIosAppBackup(e,a,t,i,n,o,_,p,r,d,s,l,c){
return isCanvasAd(s)?void utils.openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:c,
url:e
}):s.dest_type!==AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE||utils.isItunesLink(e)?s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE?void Wxopen_card.openWxopen(d):s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE?void openUrlWithExtraWebview(urlParser.join(e,{
outer_id:d.outer_id
})):void utils.openWebAppStore(s.app_info.appinfo_url,l):void handleH5(e,a,t,i,n,o,_,p,r,d,s);
}
function handleApp(e,a,t,i,n,o,_,p,r,d,s,l,c){
console.info("[广告处理下载事件]",s);
var m=arguments;
if(s.has_installed&&!utils.isItunesLink(s.app_info.appinfo_url)&&s.app_info.url_scheme)return JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=s.app_info.url_scheme);
}),!0;
if(utils.isItunesLink(s.app_info.appinfo_url)){
if(s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)){
var u=1,f=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
f&&f[1]&&parseInt(f[1].split("_")[0],10)>=12&&(u=0);
var g={
schemeUrl:s.app_info.url_scheme,
messageExt:s.app_info.url_scheme,
appID:s.app_info.open_platform_appid
};
s.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE&&utils.extend(g,{
installSchemeUrl:s.app_info.appinfo_url,
installAction:u
}),JSAPI.invoke("launchApplication",g,function(e){
(-1===e.err_msg.indexOf("ok")||"fail"===e.launchInstallResult)&&launchIosAppBackup.apply(null,m);
});
}else launchIosAppBackup.apply(null,m);
return!0;
}
if(s.product_type!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE&&s.product_type!==AD_TYPE.IOS_APP_PRODUCT_TYPE)return!1;
if(isCanvasAd(s))return utils.openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:c,
url:e
}),!0;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var y={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:o,
aid:_,
ad_engine:p,
pos_type:r
},A=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var D="",v="";
d&&(D=d.pkgname&&d.pkgname.replace(/\./g,"_"),v=d.channel_id||""),y={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:o,
channel_id:v,
aid:_,
engine:p,
pos_type:r,
pkgname:D
};
}
e=urlParser.join(e,y),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:_,
engine:p
})),!_&&A&&A(80,e);
}
return openUrlWithExtraWebview(e),!0;
}
function handleH5(e,a,t,i,n,o,_,p,r,d,s){
if(console.info("[广告处理H5事件]",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var l={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:o,
aid:_,
ad_engine:p,
pos_type:r
},c=window.__report;
if(("104"==o||"113"==o||"114"==o||"122"==o)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),l={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:o,
channel_id:u,
aid:_,
engine:p,
pos_type:r,
pkgname:m
};
}
e=urlParser.join(e,l),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:_,
engine:p
})),!_&&c&&c(80,e);
}
console.info("[广告H5落地页最终URL]",e),openUrlWithExtraWebview(e);
}
var mmversion=require("biz_wap/utils/mmversion.js"),Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),openUrl=require("biz_wap/utils/openUrl.js"),getParaList=require("biz_common/utils/get_para_list.js"),showTime=require("biz_wap/utils/show_time.js"),urlParser=require("biz_common/utils/url/parse.js"),DomEvent=require("biz_common/dom/event.js"),AdClickReport=require("a/a_report.js").AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),classList=require("biz_common/dom/class.js"),AD_CONFIG=require("a/a_config.js"),VideoAd=require("a/video.js"),utils=require("a/a_utils.js"),commonUtils=require("common/utils.js"),offset=require("biz_common/dom/offset.js"),appDialogConfirm=require("a/appdialog_confirm.js"),adLS=new LS("ad"),lsKey=[biz,sn,mid,idx].join("_"),globalAdDebug=!!urlParser.getQuery("mock")||!!urlParser.getQuery("rtx"),AD_TYPE=AD_CONFIG.AD_TYPE,AD_POS=AD_CONFIG.AD_POS,pos_type=window.pos_type||0,__report=window.__report,js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},adElCountMapByPos={},contentWrp=document.getElementById("js_content"),ad_render_object={
pos_3:null,
pos_0:null
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},isScroll=!1,isSee=!1,openUrlWithExtraWebview=openUrl.openUrlWithExtraWebview,see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ad_engine=0;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},videoAdMap={},isVideoSharePageOnlyAd=utils.isVideoSharePageOnlyAd();
return AdFrame.prototype.initMidAd=function(e,a){
insertAutoAdElement(e,!0);
var t=document.getElementsByTagName("mpcpc")[a];
t&&(this.aInfoMap[e.aid].iframeEle=createAdFrame(t,e),__report&&__report(125),utils.report115849("0"));
},AdFrame.prototype.initAdBeforeVideo=function(e){
for(var a=[],t=[],i=0;i<this.iframes.length;i++){
var n=this.iframes[i];
if(a.push(n.getAttribute("data-src")),t.push(n.src),isVideoFrameHasVid(n,e.vid)){
utils.report115849(19);
var o=this.aInfoMap[e.aid],_=document.createElement("div");
_.className="mpad_relative";
var p=n.nextSibling;
commonUtils.insertAfter(_,n),_.appendChild(n);
var r=createAdFrame(_,e);
return classList.addClass(r,"mpad_absolute"),o.iframeEle=r,o.heightWidthRate=parseInt(n.style.height,10)/parseInt(n.style.width,10),
setTimeout(function(){
n.contentWindow?n.contentWindow.adVidFromAppmsg=e.vid:utils.report115849(51);
},0),p&&_.appendChild(p),void utils.report115849(1);
}
}
var d=new Image;
d.src=urlParser.join("https://badjs.weixinbridge.com/badjs",{
from:window.encodeURIComponent(window.location),
id:220,
level:4,
msg:JSON.stringify({
frameDataSrcList:JSON.stringify(a),
vid:e.vid,
frameSrcList:JSON.stringify(t)
})
});
},AdFrame.prototype.initAdAfterVideo=function(e){
var a=createAdFrame(document.body,e);
this.aInfoMap[e.aid].heightWidthRate=document.body.offsetHeight/document.body.offsetWidth,
this.aInfoMap[e.aid].iframeEle=a;
},AdFrame.prototype.initBottomAd=function(e){
this.aInfoMap[e.aid].iframeEle=createAdFrame(js_bottom_ad_area,e),utils.report115849(9);
},AdFrame.prototype.onFrameReady=function(e,a){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i="",n=this.aInfoMap[a];
if(n){
var o=n.iframeEle.parentNode;
n.aInfo.pos_type===AD_POS.POS_MID&&(i=o&&o.dataset&&o.dataset.category_id_list),
postMessageToAdFrame(e,"setPageDataV2",{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:globalAdDebug,
bodyScrollTop:t,
contentOffsetHeight:contentWrp.offsetHeight,
adOffsetTop:offset.getOffset(n.iframeEle).offsetTop,
screenHeight:commonUtils.getInnerHeight(),
midCategoryIdList:i,
heightWidthRate:n.heightWidthRate,
createIframeTime:n.iframeEle.createIframeTime
}),postMessageToAdFrame(e,"setAdDataV2",n.aInfo);
}
},AdFrame.prototype.mapInfoMap=function(e,a){
for(var t in this.aInfoMap){
{
var i=this.aInfoMap[t].iframeEle;
this.aInfoMap[t].aInfo.pos_type===AD_POS.POS_AD_AFTER_VIDEO;
}
this.aInfoMap.hasOwnProperty(t)&&i&&(!a||a&&a===t)&&e&&e(this.aInfoMap[t].aInfo,i);
}
},AdFrame.prototype.broadcastAdFrame=function(e,a){
this.mapInfoMap(function(t,i){
postMessageToAdFrame(i.contentWindow,e,a);
});
},AdFrame.prototype.bindScrollEvent=function(){
var e=this,a=utils.debounce(function(){
var a=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e.mapInfoMap(function(e,t){
postMessageToAdFrame(t.contentWindow,"pageScrollV2",{
bodyScrollTop:a,
adOffsetTop:offset.getOffset(t).offsetTop
});
});
},50);
DomEvent.on(window,"scroll",a);
},AdFrame.prototype.checkApiInvokeValid=function(e){
if(!this.aInfoMap[e.aid])return"Invalid aid";
var a=e.proxyData||{},t=this.aInfoMap[e.aid].aInfo,i=a.methodName;
return-1===AD_CONFIG.AD_JSAPI_WHITE_LIST.indexOf(i)?invalidMsg(AD_CONFIG.INVALID_METHOD_NAME_MSG_PREFIX,i):"addContact"!==i&&"profile"!==i||t&&t.biz_info&&a.args.username===t.biz_info.user_name?!0:invalidMsg(AD_CONFIG.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},AdFrame.prototype.changeFrameStyle=function(e){
if(this.aInfoMap[e.aid]){
var a=this.aInfoMap[e.aid].iframeEle;
e.display===!1?classList.addClass(a,AD_CONFIG.AD_IFRAME_HIDE_CLASS):e.display===!0&&classList.removeClass(a,AD_CONFIG.AD_IFRAME_HIDE_CLASS),
e.height&&(a.style.height=e.height);
}
},AdFrame.prototype.commonRequest=function(e,a){
var t=a.proxyData||{},i=t.args||{};
return-1===AD_CONFIG.AD_REQ_PATH_WHITE_LIST.indexOf(i.path)?void proxyCallback(e,a,{
err_msg:invalidMsg(AD_CONFIG.INVALID_REQ_PATH_MSG_PREFIX,i.path)
}):(ajax({
type:i.requestType,
url:i.path+"?"+(i.requestQuery||""),
data:i.requestBody||{},
mayAbort:!0,
success:function(t){
proxyCallback(e,a,{
err_msg:"request:success",
response:t
});
},
error:function(t,i){
proxyCallback(e,a,{
err_msg:"request:error",
xhr:t,
err_info:i
});
}
}),void("/mp/advertisement_report"===i.path&&i.requestQuery.includes("report_type=2")&&utils.report115849(38)));
},AdFrame.prototype.onJsapiProxy=function(e,a){
var t=a.proxyData||{},i=this.checkApiInvokeValid(a);
if("string"==typeof i)return void proxyCallback(e,a,{
err_msg:i
});
try{
JSAPI[t.methodType](t.methodName,t.args,function(i){
proxyCallback(e,a,i),"openUrlWithExtraWebview"===t.methodName&&-1===i.err_msg.indexOf("ok")&&(location.href=t.args.url);
});
}catch(n){
console.error(n),proxyCallback(e,a,{
err_msg:invalidMsg(AD_CONFIG.INVALID_METHOD_TYPE_MSG_PREFIX,t.methodType)
});
}
"adDataReport"===t.methodName&&1===t.args.need_record_page_operation&&utils.report115849(41);
},AdFrame.prototype.onProxy=function(e,a){
if("jsapi"===a.proxyType)return void this.onJsapiProxy.apply(this,arguments);
var t=a.proxyData||{};
if("bizapi"===a.proxyType){
if("appDialogConfirm"===t.methodName)return void androidAppDialogConfirm.apply(this,arguments);
if("request"===t.methodName)return void this.commonRequest.apply(this,arguments);
if("addIdKeyReport"===t.methodName)return void(window.__addIdKeyReport&&window.__addIdKeyReport(t.args.id,t.args.key,t.args.val));
}
},AdFrame.prototype.createAdWebview=function(e){
this.hasCreateAdWebview||(JSAPI.invoke("handleMPPageAction",{
action:"createAdWebview",
adUrl:urlParser.join(location.origin+"/mp/authreadtemplate?t=ad/only_ad_tmpl",_defineProperty({
vid:window.cgiData.vid,
item_show_type:window.item_show_type,
idx:window.idx,
mid:window.mid,
sn:window.sn,
scene:window.scene,
appmsg_type:window.appmsg_type,
msg_title:window.msg_title,
ct:window.ct,
send_time:window.send_time,
abtest_cookie:window.abtest_cookie,
msg_daily_idx:window.msg_daily_idx,
user_uin:window.user_uin,
__biz:window.biz,
pos_type_list:9,
get_ad_after_video:1
},AD_CONFIG.HAS_AD_DATA_QUERY_KEY,e?1:0))
},function(e){
e.err_msg.includes("fail")&&utils.report115849(40);
}),this.hasCreateAdWebview=!0);
},AdFrame.prototype.listenAndCreateAdWebview=function(){
var e=this;
JSAPI.invoke("handleMPPageAction",{
action:"getMPVideoState"
},function(a){
"pause"!==a.state&&a.vid===window.cgiData.vid&&a.duration-a.currentTime<=e.remainTimeToCreateAdWebview&&e.createAdWebview(),
setTimeout(function(){
e.listenAndCreateAdWebview();
},2e3);
});
},AdFrame.prototype.bindAppVideoEvent=function(){
var e=this;
JSAPI.on("onMPAdWebviewStateChange",function(a){
return"appear"===a.state?void e.mapInfoMap(function(e,a){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&postMessageToAdFrame(a.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,"");
}):void("destroy"===a.state&&(e.hasCreateAdWebview=!1));
}),"5"===window.item_show_type&&commonUtils.isNativePage()&&(this.remainTimeToCreateAdWebview=10,
this.listenAndCreateAdWebview(),JSAPI.on("onReceiveMPPageData",function(a){
a.data===AD_CONFIG.GET_AD_DATA_AFTER_VIDEO_ACTION_NAME&&e.newAdInfos.map(function(e){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&JSAPI.invoke("handleMPPageAction",{
action:"sendMPPageData",
data:JSON.stringify(e),
sendTo:"adWeb"
});
});
}));
},AdFrame.prototype.bindAdEvent=function(){
var e=this,a=document.getElementById("js_article");
utils.listenMessage(window,function(a,t){
var i=t.action,n=t.value||{};
if(i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&n.playAd&&utils.report115849(35),i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&n.playAd&&!n.vid){
var o=new Image;
o.src=urlParser.join("https://badjs.weixinbridge.com/badjs",{
from:window.encodeURIComponent(window.location),
id:220,
level:4,
msg:JSON.stringify({
from:"page",
url:window.encodeURIComponent(window.location)
})
});
}
if(i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&(n.vid||n.aid))return n.playAd&&utils.report115849(25),
e.mapInfoMap(function(e,a){
e.vid===n.vid||e.aid===n.aid?e.vid===n.vid&&(postMessageToAdFrame(a.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,""),
n.playAd&&utils.report115849(21)):postMessageToAdFrame(a.contentWindow,"pauseVideoV2","");
}),void(n.aid&&utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_PLAY_ACTION,"","vid="));
if(a.origin!==AD_CONFIG.AD_FRAME_DOMAIN);else switch(i){
case"onFrameReadyV2":
e.onFrameReady(a.source,n.aid);
break;

case"onProxyV2":
e.onProxy(a.source,n);
break;

case"changeFrameStyle":
e.changeFrameStyle(n);
break;

case"onVideoEndV2":
e.mapInfoMap(function(a){
utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_END_ACTION,"","vid="+a.vid);
},n.aid);
}
}),a&&a.addEventListener("click",function(){
e.broadcastAdFrame("clickOutsideV2","");
}),this.bindScrollEvent();
},AdFrame.prototype.handleAdWithFrame=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],a=0,t=this;
this.newAdInfos=e,e.forEach(function(e){
return t.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===AD_POS.POS_MID?(t.initMidAd(e,a),void a++):e.pos_type===AD_POS.POS_AD_BEFORE_VIDEO&&0===e.is_mp_video?(utils.report115849(18),
void t.initAdBeforeVideo(e)):e.pos_type===AD_POS.POS_BOTTOM?void t.initBottomAd(e):e.pos_type===AD_POS.POS_AD_AFTER_VIDEO?void(commonUtils.isNativePage()?t.createAdWebview(!0):(utils.report115849(33),
t.initAdAfterVideo(e))):void 0;
}),this.bindAppVideoEvent(),e.length&&this.bindAdEvent();
},initAdData(),{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("pages/video_communicate_adaptor.js",[],function(){
"use strict";
function t(){
window.addEventListener("message",e,!1),v();
}
function e(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?f.postMessageEvt.broadcast({
data:i.data,
type:o
}):f.postMessageEvt[o]&&f.postMessageEvt[o](i.data);
}
}
}
function i(t){
var e=t.type.replace(/^broadcast_/,""),i=a();
if(i.length>0)for(var n=0,d=i.length;d>n;n++){
var r=i[n];
o({
win:r.contentWindow,
type:e,
data:t.data
});
}
o({
win:window,
type:e,
data:t.data
});
}
function o(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function n(t){
for(var e=a({
vid:t.vid
}),i=0,n=e.length;n>i;i++){
var d=e[i];
d.style.display="";
var r=d.parentNode,v=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(v&&v.length>0)for(var i=0,n=v.length;n>i;i++)r.removeChild(v[i]);
o({
type:"afterRemoveLoading",
win:d.contentWindow
});
}
}
function a(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],d=a.getAttribute("src");
if(d&&-1!=d.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var r=d.match(/[\?&]vid\=([^&]*)/);
if(!r||!r[1]||r[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function d(t){
if(t.height){
var e=a({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function r(t){
f.videoInfo[t.vid]||(f.videoInfo[t.vid]={}),f.videoInfo[t.vid].ori_status=t.ori_status,
f.videoInfo[t.vid].hit_bizuin=t.hit_bizuin,f.videoInfo[t.vid].hit_vid=t.hit_vid;
}
function v(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=a(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function s(){
return f.videoInfo;
}
var f={
videoInfo:{},
postMessageEvt:{
broadcast:i,
removeVideoLoading:n,
addVideoIframeHeight:d,
videoInited:r
}
};
return t(),{
getVideoInfo:s
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json");
var t=null;
if("object"==typeof e.data){
var o=e.data;
t=[];
for(var a in o)o.hasOwnProperty(a)&&t.push(a+"="+encodeURIComponent(o[a]));
t=t.join("&");
}else t="string"==typeof e.data?e.data:null;
console.log("before request");
var n=1,i=function(e,t){
return r.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(o){
if(console.log("jsapiRequest",o.err_msg),o.err_msg.indexOf(":ok")>-1){
var a={};
if(o.data){
console.log(e.dataType),console.log(e);
try{
a="json"==e.dataType?JSON.parse(o.data):o.data;
}catch(l){
return console.error(l),void(e.error&&e.error({}));
}
}
var c={};
try{
c=JSON.parse(o.data);
}catch(l){}
c.base_resp&&"-3"==c.base_resp.ret&&n>0?(n--,r.invoke("updatePageAuth",{},function(r){
console.log("updatePageAuth",r),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
r&&r.err_msg&&r.err_msg.indexOf(":ok")>-1?(window.top.pass_ticket=encodeURIComponent(s.getQuery("pass_ticket",r.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),i(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(a);
})):e.success&&e.success(a);
}else o.err_msg.indexOf("no permission")>-1?Ajax(e):e.error&&e.error({});
e.complete&&e.complete();
});
};
return i(e,t);
}
e("biz_common/utils/string/html.js");
var s=e("biz_common/utils/url/parse.js"),r=e("biz_wap/jsapi/core.js");
return t;
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});define("biz_wap/utils/log.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
var s=i("biz_wap/utils/mmversion.js"),e=i("biz_wap/jsapi/core.js");
return function(i,n,o){
"string"!=typeof i&&(i=JSON.stringify(i)),n=n||"info",o=o||function(){};
var t;
s.isIOS?t="writeLog":s.isAndroid&&(t="log"),t&&e.invoke(t,{
level:n,
msg:"[WechatFe]"+i
},o);
};
});define("sougou/index.js",["appmsg/emotion/emotion.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/utils/string/html.js","sougou/a_tpl.html.js","appmsg/cmt_tpl.html.js","appmsg/my_comment_tpl.html.js"],function(t){
"use strict";
function e(t){
var e=document.getElementById("js_cover"),n=[];
e&&n.push(e);
var o=document.getElementById("js_content");
if(o)for(var i=o.getElementsByTagName("img")||[],s=0,r=i.length;r>s;s++)n.push(i.item(s));
for(var a=[],s=0,r=n.length;r>s;s++){
var l=n[s],c=l.getAttribute("data-src")||l.getAttribute("src");
c&&(a.push(c),function(e){
m.on(l,"click",function(){
return"ios"==t?window.JSInvoker&&window.JSInvoker.openImageList&&window.JSInvoker.openImageList(JSON.stringify({
index:e,
array:a
})):window.JSInvoker&&JSInvoker.weixin_openImageList&&window.JSInvoker.weixin_openImageList(JSON.stringify({
index:e,
array:a
})),!1;
});
}(s));
}
}
var n=t("appmsg/emotion/emotion.js"),o=t("biz_common/tmpl.js"),m=(t("biz_wap/utils/ajax.js"),
t("biz_common/tmpl.js"),t("biz_common/dom/event.js"));
t("biz_common/utils/string/html.js");
t("sougou/a_tpl.html.js"),t("appmsg/cmt_tpl.html.js");
if(document.getElementById("js_report_article3")&&(document.getElementById("js_report_article3").style.display="none"),
document.getElementById("js_toobar3")&&(document.getElementById("js_toobar3").style.display="none"),
function(){
var e=t("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n&&(n.innerHTML=o.tmpl(e,{}),document.body.appendChild(n));
}(),n.init(),navigator.userAgent.toLowerCase().match(/ios/)){
var i=navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
if(i&&i[1]){
var s=i[1].replace(/\./g,"");
parseInt(s)>422&&e("ios");
}
}else e("android");
window.onerror=function(t){
var e=new Image;
e.src="/mp/jsreport?key=86&content="+t+"&r="+Math.random();
};
});define("biz_wap/safe/mutation_observer_report.js",[],function(){
"use strict";
window.addEventListener&&window.addEventListener("load",function(){
window.__moonsafe_mutation_report_keys||(window.__moonsafe_mutation_report_keys={});
var e=window.moon&&moon.moonsafe_id||29715,o=window.moon&&moon.moonsafe_key||0,t=[],n={},r=function(e){
return"[object Array]"==Object.prototype.toString.call(e);
},s=function(e,o,s){
s=s||1,n[e]||(n[e]=0),n[e]+=s,o&&(r(o)?t=t.concat(o):t.push(o)),setTimeout(function(){
a();
},1500);
},a=function(){
var r=[],s=t.length,i=["r="+Math.random()];
for(var c in n)n.hasOwnProperty(c)&&r.push(e+"_"+(1*c+1*o)+"_"+n[c]);
for(var c=0;s>c&&!(c>=10);++c)i.push("log"+c+"="+encodeURIComponent(t[c]));
if(!(0==r.length&&i.length<=1)){
var _,d="idkey="+r.join(";")+"&lc="+(i.length-1)+"&"+i.join("&");
if(window.ActiveXObject)try{
_=new ActiveXObject("Msxml2.XMLHTTP");
}catch(w){
try{
_=new ActiveXObject("Microsoft.XMLHTTP");
}catch(f){
_=!1;
}
}else window.XMLHttpRequest&&(_=new XMLHttpRequest);
_&&(_.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),_.setRequestHeader("cache-control","no-cache"),
_.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
_.setRequestHeader("X-Requested-With","XMLHttpRequest"),_.onreadystatechange=function(){
4===_.readyState&&(t.length>10?(t=t.slice(10),a()):(t=[],n={}));
},t=[],n={},_.send(d));
}
};
try{
if(!window.__observer)return;
var i=window.__observer_data;
if(window.__observer.takeRecords){
var c=window.__observer.takeRecords();
if(c&&c.length){
i.count++;
var _=new Date;
c.forEach(function(e){
for(var o=e.addedNodes,t=0;t<o.length;t++){
var n=o[t];
if("SCRIPT"===n.tagName){
var r=n.src;
!r||/qq\.com/.test(r)||/weishi\.com/.test(r)||i.list.push(r);
}
}
}),i.exec_time+=new Date-_;
}
}
window.__observer.disconnect();
for(var d=window.__moonsafe_mutation_report_keys.observer||2,w=window.__moonsafe_mutation_report_keys.script_src||8,f=window.__moonsafe_mutation_report_keys.setattribute||9,u=window.__moonsafe_mutation_report_keys.ajax||10,m=25,v=0;v<i.list.length;v++){
var l=i.list[v],h=["[moonsafe][observer][url]:"+location.href,"[moonsafe][observer][src]:"+l,"[moonsafe][observer][ua]:"+navigator.userAgent];
i.list.length==v+1&&(h.push("[moonsafe][observer][count]:"+i.count),h.push("[moonsafe][observer][exec_time]:"+i.exec_time+"ms")),
s(d,h),"inlinescript_without_nonce"==l&&s(m,h);
}
var p=window.__danger_src;
if(p)for(var y=[{
key:"xmlhttprequest",
idkey:u
},{
key:"script_src",
idkey:w
},{
key:"script_setAttribute",
idkey:f
}],v=0;v<y.length;v++){
var b=y[v].key,g=p[b];
if(g&&g.length)for(var k=0;k<g.length;k++){
var h=["[moonsafe]["+b+"][url]:"+location.href,"[moonsafe]["+b+"][src]:"+g[k],"[moonsafe]["+b+"][ua]:"+navigator.userAgent];
s(y[v].idkey,h);
}
}
}catch(q){
var R=3,h=["[moonsafe][observer][exception]:"+q];
s(R,h);
}
},!1);
});define("appmsg/fereport.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js"],function(e){
"use strict";
function n(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var n,i=e.timing,o=0,m=0,r=window.location.protocol,u=Math.random(),p=1>2*u,c=1>25*u,_=1>100*u,l=1>250*u,g=1>1e3*u,f=1>1e4*u,S=!0;
"https:"==r?(o=18,m=27,S=!1):"http:"==r&&(o=9,m=19);
var v=window.__wxgspeeds||{};
if(v&&v.moonloadtime&&v.moonloadedtime){
var B=v.moonloadedtime-v.moonloadtime;
n=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
s.saveSpeeds({
sample:21==n||22==n&&g?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:n,
time:B
},
user_define:w
});
}
v&&v.mod_downloadtime&&s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:24,
time:v.mod_downloadtime
},
user_define:w
});
var h=i.domContentLoadedEventStart-i.navigationStart;
if(h>3e3&&(s.setBasicTime({
sample:_&&S||c&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:m
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+window.encodeURIComponent(location.href)),
0==window.optimizing_flag?s.setBasicTime({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:467
}):1==window.optimizing_flag?s.setBasicTime({
sample:_,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:468
}):2==window.optimizing_flag&&s.setBasicTime({
sample:_,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:469
}),s.setBasicTime({
sample:l&&S||_&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o
}),d.htmlSize){
var I=d.htmlSize/(i.responseEnd-i.connectStart);
s.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:25,
time:Math.round(I)
},
user_define:w
});
}
if(v&&v.combo_times)for(var b=1;b<v.combo_times.length;b++)s.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:26,
time:v.combo_times[b]-v.combo_times[b-1]
},
user_define:w
});
if(v&&v.mod_num){
var R=v.hit_num/v.mod_num;
s.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:[{
sid:27,
time:Math.round(100*R)
},{
sid:28,
time:Math.round(1e3*R)
}],
user_define:w
});
}
var C=window.logs.pagetime.jsapi_ready_time-i.navigationStart;
s.saveSpeeds(156==o||155==o?{
sample:p,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:C
},
user_define:w
}:{
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:C
},
user_define:w
}),s.send(),window.setTimeout(function(){
window.__moonclientlog&&t("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(n=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
s.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:n,
time:window.onBridgeReadyTime-i.navigationStart
},
user_define:w
}),s.send());
},5e3);
}
}
function i(e){
for(var n=[],i=new DataView(e),o=0;o<i.byteLength;o+=4){
var s=i.getUint32(o),d=s.toString(16),t="00000000",a=(t+d).slice(-t.length);
n.push(a);
}
return n.join("");
}
function o(e,n){
var o=new TextEncoder("utf-8").encode(e),s=crypto.subtle||crypto.webkitSubtle;
return s.digest(n,o).then(function(e){
return i(e);
});
}
var s=e("biz_wap/utils/wapsdk.js"),d=e("biz_common/utils/http.js"),t=e("appmsg/log.js"),a=e("biz_common/base64.js"),w=a.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
n(),function(){
try{
var e=Math.random(),n=window.localStorage,i=[],d=[];
for(var t in n)-1!=t.indexOf("__MOON__")&&window.moon_map[t.substr(8)]&&i.push(n[t]);
if(window.crypto){
var m="";
m=.5>e?"SHA-256":"SHA-1";
for(var r=(new Date).getTime(),u=0;u<i.length;u++)d.push(o(i[u],m));
Promise.all(d).then(function(){
var n=(new Date).getTime(),i=n-r;
s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:.5>e?21:23,
time:i
},
user_define:w
}),s.send();
});
}else s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:24,
time:1
},
user_define:w
}),s.send();
}catch(p){}
}();
});define("appmsg/fereport_without_localstorage.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,a=e.timing,m=0,w=0,p=window.location.protocol,u=Math.random(),r=1>2*u,_=1>25*u,c=1>100*u,l=1>250*u,g=1>1e3*u,f=1>1e4*u,S=!0;
"https:"==p?(m=462,w=464,S=!1):"http:"==p&&(m=417,w=463);
var B=window.__wxgspeeds||{};
if(B&&B.moonloadtime&&B.moonloadedtime){
var v=B.moonloadedtime-B.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
o.saveSpeeds({
sample:21==i||22==i&&g?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:v
},
user_define:t
});
}
B&&B.mod_downloadtime&&o.saveSpeeds({
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:24,
time:B.mod_downloadtime
},
user_define:t
});
var I=a.domContentLoadedEventStart-a.navigationStart;
if(I>3e3&&(o.setBasicTime({
sample:c&&S||_&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
0==window.optimizing_flag?o.setBasicTime({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:473
}):1==window.optimizing_flag?o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:474
}):2==window.optimizing_flag&&o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:475
}),o.setBasicTime({
sample:l&&S||c&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m
}),n.htmlSize){
var R=n.htmlSize/(a.responseEnd-a.connectStart);
o.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:25,
time:Math.round(R)
},
user_define:t
});
}
if(B&&B.combo_times)for(var h=1;h<B.combo_times.length;h++)o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:26,
time:B.combo_times[h]-B.combo_times[h-1]
},
user_define:t
});
if(B&&B.mod_num){
var C=B.hit_num/B.mod_num;
o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:[{
sid:27,
time:Math.round(100*C)
},{
sid:28,
time:Math.round(1e3*C)
}],
user_define:t
});
}
var U=window.logs.pagetime.jsapi_ready_time-a.navigationStart;
o.saveSpeeds(156==m||155==m?{
sample:r,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}:{
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}),o.send(),window.setTimeout(function(){
window.__moonclientlog&&s("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
o.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:window.onBridgeReadyTime-a.navigationStart
},
user_define:t
}),o.send());
},5e3);
}
}
var o=e("biz_wap/utils/wapsdk.js"),n=e("biz_common/utils/http.js"),s=e("appmsg/log.js"),d=e("biz_common/base64.js"),t=d.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
i();
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","common/utils.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),r=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(r=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==n.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,i=e.length;i>t;++t)if(-1!=n.indexOf(e[t]))return!0;
return!1;
}
var i=window.performance&&window.performance.timing,a=write_sceen_time-r,s=first_sceen__time-r,d=page_endtime-r,m=(window.onload_endtime||+new Date)-r;
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(a=real_show_page_time-r,s=real_show_page_time-r);
var g=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-r:void 0,w=window.logs.a8key_ready_time?window.logs.a8key_ready_time-r:void 0,p=i&&i.connectEnd-i.connectStart,c=i&&i.secureConnectionStart&&i.connectEnd-i.secureConnectionStart,u=i&&i.domainLookupEnd&&i.domainLookupStart&&i.domainLookupEnd-i.domainLookupStart;
if(window.logs.pagetime.wtime=a,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
window.logs.pagetime.onload_time=m,window.logs.pagetime.jsapi_ready_time=g,window.logs.pagetime.a8key_ready_time=w,
need_report_cost?o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}):Math.random()<.01&&o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["#1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}),need_report_cost&&s>3e3){
var l=new Image,_=(new Date).getTime();
l.onload=function(){
var e=(new Date).getTime()-_,t=(new Date).getTime(),i=new Image;
i.onload=function(){
var i=(new Date).getTime()-t;
o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["^2|1|"+e,"2|2|"+i].join(";")
}
});
},i.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
},l.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
}
if(!(Math.random()>.2||0>m||0>a||0>s||0>d)){
if(g&&t.setAvg(27822,15,g),w&&t.setAvg(27822,17,w),d>=15e3)return t.setAvg(27822,29,d),
void t.send();
t.setAvg(27822,1,d).setAvg(27822,3,m).setAvg(27822,5,s),window.isWeixinCached&&t.setAvg(27822,19,d),
e()?(t.setAvg(27822,9,d),window.isWeixinCached&&t.setAvg(27822,23,d)):"wifi"==networkType?(t.setAvg(27822,7,d),
window.isWeixinCached&&t.setAvg(27822,21,d)):"2g/3g"==networkType?(t.setAvg(27822,11,d),
window.isWeixinCached&&t.setAvg(27822,25,d)):"4g"==networkType?(t.setAvg(27822,14,d),
window.isWeixinCached&&t.setAvg(27822,26,d)):(t.setAvg(27822,13,d),window.isWeixinCached&&t.setAvg(27822,28,d)),
window.moon&&moon.clearSample&&(t.setAvg(27822,71,d),e()?t.setAvg(27822,73,d):"wifi"==networkType?t.setAvg(27822,75,d):"2g/3g"==networkType?t.setAvg(27822,77,d):"4g"==networkType?t.setAvg(27822,78,d):t.setAvg(27822,79,d)),
p&&t.setAvg(27822,65,p),c&&t.setAvg(27822,67,c),u&&t.setAvg(27822,69,u),t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content");
if(t&&!(Math.random()>.1)){
var n=function o(){
var n=window.pageYOffset||document.documentElement.scrollTop,r=e.offsetTop;
if(n+a.getInnerHeight()>=r){
for(var d,m,g=t.getElementsByTagName("img"),w={},p=[],c=0,u=0,l=0,_=0,f=g.length;f>_;++_){
var v=g[_];
d=v.getAttribute("data-src")||v.getAttribute("src"),m=v.getAttribute("src"),d&&(d.isCDN()?u++:l++,
c++,w[m]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*l),s.getEntries){
var y=s.getEntries(),h=window.logs.img.download,A=[0,0,0],k=[0,0,0];
c=u=0;
for(var _=0,T=y.length;T>_;++_){
var j=y[_],b=j.name;
b&&"img"==j.initiatorType&&w[b]&&(b.isCDN()&&(k[0]+=j.duration,u++),A[0]+=j.duration,
c++,w[b]={
startTime:j.startTime,
responseEnd:j.responseEnd
});
}
A[0]>0&&c>0&&(A[2]=A[0]/c),k[0]>0&&u>0&&(k[2]=k[0]/u);
for(var _ in h)if(h.hasOwnProperty(_)){
for(var M=h[_],x=0,E=0,C=0,z=0,S=0,f=M.length;f>S;++S){
var d=M[S];
if(w[d]&&w[d].startTime&&w[d].responseEnd){
var D=w[d].startTime,I=w[d].responseEnd;
x=Math.max(x,I),E=E?Math.min(E,D):D,d.isCDN()&&(C=Math.max(x,I),z=E?Math.min(E,D):D);
}
}
A[1]+=Math.round(x-E),k[1]+=Math.round(C-z);
}
for(var W=4,N=7,_=0;3>_;_++)A[_]=Math.round(A[_]),k[_]=Math.round(k[_]),A[_]>0&&(p.push(W+_+"="+A[_]),
"wifi"==networkType?p.push(W+_+6+"="+A[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(W+_+12+"="+A[_])),
k[_]>0&&(p.push(N+_+"="+k[_]),"wifi"==networkType?p.push(N+_+6+"="+k[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(N+_+12+"="+k[_]));
}
i.off(window,"scroll",o,!1);
}
};
i.on(window,"scroll",n,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],i=Math.ceil(10*Math.random())-1,n=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",i),e.src="/mp/iframetest?action=page&traceid="+n+"&devicetype="+devicetype+"&timeout="+t[i];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var i=e("biz_common/dom/event.js"),n=navigator.userAgent,o=e("biz_wap/utils/ajax.js"),a=e("common/utils.js");
e("appmsg/cdn_img_lib.js"),i.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(i){
networkType=e[i.err_msg],"network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(networkType="4g"),
t();
});
}else t();
},!1);
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,i,o,n){
"use strict";
function t(){
var e=window.location.protocol+"//",i=l.indexOf("://")<0?e+l:l;
if(-1!=i.indexOf("mp.weixin.qq.com/s")||-1!=i.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=i.indexOf("mp.weixin.qq.com/mp/homepage")){
var o=i.split("#");
i=s.addParam(o[0],"scene",25,!0)+(o[1]?"#"+o[1]:""),i=i.replace(/#rd$/g,"#wechat_redirect");
}else i=e+"mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(l);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(i,"_blank"),
!1;
}catch(n){}
var t=location.search.replace("wx_header","del_wx_header"),r={
url:"/mp/advertisement_report"+t+"&report_type=3&action_type=0&url="+encodeURIComponent(l)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},m=p.isInMiniProgram?0:1;
return r.timeout=2e3,r.complete=function(){
_(i,{
sample:m,
scene:60,
user_name:user_name,
reject:function(){
location.href=i;
}
});
},a(r),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),s=e("biz_common/utils/url/parse.js"),m=e("appmsg/articleReport.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),c=msg_title.htmlDecode(),l=msg_source_url.htmlDecode(),_=e("appmsg/open_url_with_webview.js"),d=e("biz_wap/jsapi/core.js");
m.init({
dom:document.getElementById("js_report_article3"),
title:c,
link:window.msg_link
});
var u=document.getElementById("js_view_source");
r.on(u,"click",function(){
return t(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","common/utils.js"],function(e){
"use strict";
function t(e){
window.logs||(window.logs={}),j.js_content=e.js_content||document.getElementById("js_content");
var t=e.js_toobar3||document.getElementById("js_toobar3");
if(j.pageEndTop=t?t.offsetTop:0,j.imgs=j.js_content?j.js_content.getElementsByTagName("img")||[]:[],
j.media=e.media||document.getElementById("media"),j.title=e.title||(window.msg_title||"").htmlDecode(),
j.video_cnt=e.video_cnt||window.logs.video_cnt||0,j.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
j.item_show_type=e.item_show_type||window.item_show_type||0,p=document.getElementsByTagName("html"),
p&&1==!!p.length&&l&&(p=p[0].innerHTML,O.content_length=l.htmlSize),window.logs.pageinfo=O,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(w.on(window,"load",function(){
if(M=1*z.get(H),!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1,o=j.js_cmt_area;
if(t&&o&&o.offsetTop){
var n=o.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,M),b.saveSpeeds({
uin:uin,
pid:"https:"==x?462:417,
speeds:{
sid:36,
time:Math.ceil(M/y.getInnerHeight())
}
}),b.send();
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
if(q)return;
var i=T.getData(),m=localStorage.getItem("hand_up_id");
for(var w in i)w!=m&&i[w]&&(s(i[w].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
T.remove(w));
window.setInterval(function(){
var e=a();
T.set(P,e,+new Date+864e7);
},1e3);
}
var l=I.getData("spad");
l&&l.spad&&r(l.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
I.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
c({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:a(),
async:!0,
timeout:2e3
});
},5e3);
}),w.on(window,"unload",function(){
if(!window.__second_open__){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
s(e),window.__unload_has_done__=!0;
}
}),window.logs.read_height=0,w.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(B),B=setTimeout(function(){
M=window.pageYOffset,z.set(H,M,+new Date+72e5);
},500);
}),w.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(B),B=setTimeout(function(){
M=window.pageYOffset,z.set(H,M,+new Date+72e5);
},500);
})),window.__second_open__)v.addReport(function(){
D=!0,T.remove(P);
var e=a(),t=[];
for(var o in e)e.hasOwnProperty(o)&&t.push(o+"="+encodeURIComponent(e[o]));
return{
reportUrl:"https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz,
reportData:t.join("&"),
method:"POST"
};
});else{
var o=function n(){
return window.__unload_has_done__?{
data:{}
}:void setTimeout(n,50);
};
f.on("reportOnLeaveForMP",o);
}
w.on(document,"visibilitychange",function(){
u.isHidden()?localStorage.setItem("hand_up_id",P):localStorage.setItem("hand_up_id","");
}),m();
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,n,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,d=e.length;d>s;++s)o=e[s],
o&&(n=o.getAttribute(t),n&&(i=n.match(a),i&&i[2]&&(S[i[2]]=!0)));
}
function n(e){
for(var t=0,o=E.length;o>t;++t)if(E[t]==e)return!0;
return!1;
}
function i(){
S={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in S)S.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!k&&n(t)&&(k=!0),
e.push(t));
return S={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=j.js_content,n=y.getInnerHeight(),a=j.screen_width,s=j.scroll_height,d=Math.ceil(s/n),_=Math.ceil((o.scrollHeight||o.offsetHeight)/n),r=(window.logs.read_height||t)+n,m=j.pageEndTop,w=j.imgs,c=Math.ceil(r/n)||1,l=j.media,g=50,h=0,f=0,v=0,b=0,z=r+g>m?1:0;
c>d&&(c=d);
var T=function(t){
if(t)for(var o=0,n=t.length;n>o;++o){
var i=t[o];
if(i){
h++;
var a=i.getAttribute("src"),s=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(f++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&b++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=b||0,e.download_img_cnt=f||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=h||0;
},I=window.appmsgstat||{},S=window.logs.img||{},x=window.logs.pagetime||{},E=S.load||{},D=S.read||{},B=[],M=[],H=0,N=0,P=0;
for(var q in D)q&&0==q.indexOf("http")&&D.hasOwnProperty(q)&&M.push(q);
for(var q in E)q&&0==q.indexOf("http")&&E.hasOwnProperty(q)&&B.push(q);
for(var A=0,R=B.length;R>A;++A){
var Y=B[A];
Y&&Y.isCDN()&&(-1!=Y.indexOf("/0")&&H++,-1!=Y.indexOf("/640")&&N++,-1!=Y.indexOf("/300")&&P++);
}
var e={
report_bizuin:biz,
title:j.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
read_cnt:I.read_num||0,
like_cnt:I.like_num||0,
screen_width:a,
screen_height:y.getInnerHeight(),
screen_num:_,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:j.video_cnt,
read_screen_num:c||0,
is_finished_read:z,
scene:source,
content_len:O.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:u.getHandUpTime(),
img_640_cnt:N,
img_0_cnt:H,
img_300_cnt:P,
wtime:x.onload_time||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
onload_time:x.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:j.item_show_type
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=B.length,
e.wifi_read_imgs_cnt=M.length),window.logs.webplog&&4==window.logs.webplog.total){
var C=window.logs.webplog;
e.webp_total=1,e.webp_lossy=C.lossy,e.webp_lossless=C.lossless,e.webp_alpha=C.alpha,
e.webp_animation=C.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var K=window.logs.idkeys,L=[];
for(var U in K)if(K.hasOwnProperty(U)){
var V=K[U];
V.val>0&&L.push(U+"_"+V.val);
}
e.idkey=L.join(";");
}
T(!!l&&l.getElementsByTagName("img")),T(w);
var W=(new Date).getDay(),F=i();
return(k||0!==user_uin&&Math.floor(user_uin/100)%7==W)&&(e.domain_list=F),k&&(e.html_content=p),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e;
}
function s(e){
D||(D=!0,T.remove(P),e.report_time=parseInt(+new Date/1e3),c({
url:"/mp/appmsgreport?action=page_time&__biz="+biz,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
z.set(H,M,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function r(e){
e&&e.play_type&&(I.remove("spad"),e.report_type=1,c({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function m(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?__biz="+biz+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var w=e("biz_common/dom/event.js"),c=e("biz_wap/utils/ajax.js"),l=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var p,g=e("biz_wap/utils/storage.js"),u=e("biz_wap/utils/hand_up_state.js"),h=e("biz_wap/utils/mmversion.js"),f=e("biz_wap/jsapi/core.js"),v=e("biz_wap/jsapi/leaveReport.js"),b=e("biz_wap/utils/wapsdk.js"),y=e("common/utils.js"),j={
js_cmt_area:null,
js_content:null,
screen_height:y.getInnerHeight(),
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
},z=new g("page_pos"),T=new g("time_on_page"),I=new g("spad"),O={},S={},x=window.location.protocol,k=!1,E=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],D=!1,B=null,M=0,H=[biz,sn,mid,idx].join("_"),N=Math.random(),P=[biz,sn,mid,idx,N].join("_"),q=h.isAndroid&&h.gtVersion("7.0.4",!0)||h.isIOS&&h.gtVersion("7.0.4",!0);
return{
init:t
};
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(){
function e(e){
var t=[];
for(var i in e)t.push(i+"="+encodeURIComponent(e[i]||""));
return t.join("&");
}
if(networkType){
var t=window.performance||window.msPerformance||window.webkitPerformance;
if(t&&"undefined"!=typeof t.getEntries){
var i,n,a=100,o=document.getElementsByTagName("img"),p=o.length,s=navigator.userAgent,g=!1;
/micromessenger\/(\d+\.\d+)/i.test(s),n=RegExp.$1;
for(var m=0,d=o.length;d>m;m++)if(i=parseInt(100*Math.random()),!(i>a)){
var w=o[m].getAttribute("src");
if(w&&!(w.indexOf("mp.weixin.qq.com")>=0)){
for(var f,_=t.getEntries(),u=0;u<_.length;u++)if(f=_[u],f.name==w){
var c=o[m].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:n,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:w,
img_size:o[m].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:p>100?100:p,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":"",
fail:c
})
}),g=!0;
break;
}
if(g)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),n=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
n.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],"network_type:edge"==e.err_msg&&e.detailtype&&"4g"==e.detailtype&&(networkType="4g"),
t();
}),i.on(window,"load",t,!1);
});