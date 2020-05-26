define("pages/qqmusic_ctrl.js",["biz_wap/utils/jsmonitor_report.js","pages/player_adaptor.js","biz_wap/jsapi/log.js","biz_wap/utils/ajax.js","pages/musicUrlReport.js"],function(e){
"use strict";
function r(e,r){
if(/^http(s)?:\/\//i.test(e.albumurl)){
for(var t,a=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],s=!1,i=0;t=a[i++];)if(t.test(e.albumurl)){
s=!0;
break;
}
s||(e.albumurl="");
}else{
var o=e.albumurl.split("/");
try{
o=o[o.length-1],o=o.split(".")[0];
}catch(n){
o="";
}
e.albumurl=o?m.imgroot2.replace("#mid#",o):m.imgroot+e.albumurl;
}
return e.albumurl=e.albumurl.replace("mid_album_68","mid_album_90").replace("68x68","90x90"),
e.musicIcon=m.musicIcon,e.type=1*r.scene===0?0:1*r.scene===1?1:8,c.inQMClient?(e.allowPause=!0,
e.detailUrl="",e.pauseCss="qqmusic_playing_pause",e.webUrl=e.detailUrl):(e.allowPause=!1,
e.pauseCss="",e.detailUrl=["http://i.y.qq.com/v8/playsong.html?referFrom=music.qq.com&songid=",e.musicid,"&songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),
e.webUrl=e.detailUrl),e;
}
function t(e,r){
var t=e,a=m.cache[t.songId];
return c.inQMClient?void r.callback({
canplay:!0,
play_url:"https://www.qq.com"
}):a&&"function"==typeof r.callback&&(a.canplay||!a.canplay&&!a.retry)?(a.in_cache=!0,
void r.callback(a)):void(m.submiting[t.songId]!==!0&&(m.submiting[t.songId]=!0,a&&o.setSum(m.reportId,122,1),
s({
id:t.songId,
mid:t.mid,
onSuc:function(e){
m.submiting[t.songId]=!1,m.cache[t.songId]&&!m.cache[t.songId].canplay&&e.canplay&&o.setSum(m.reportId,123,1),
m.cache[t.songId]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
m.submiting[t.songId]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t=!1,a="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 2:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 3:
r=!1,a="因版权限制，音乐无法播放。";
break;

case 4:
r=!1,a="当前区域因版权限制，音乐无法播放。";
break;

case 5:
r=!1,t=!0,a="播放失败，请稍后再试。";
break;

case 6:
r=!1,t=!0,a="系统错误，请稍后再试。";
break;

case 7:
r=!1,t=!0,a="系统错误，请稍后再试。";
break;

case 8:
r=!0,a="该音乐为付费音乐，当前为你播放试听片段。";
break;

default:
r=!1,a="系统错误，请稍后再试。";
}
return{
canplay:r,
msg:a,
retry:t
};
}
function s(e){
o.setSum(m.reportId,18,1);
var r=+new Date,t="//mp.weixin.qq.com/mp/qqmusic?action=get_song_info&song_mid=#mid#";
t=t.replace("#mid#",e.mid),p({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var s=+new Date-r;
if(200==t.http_code){
setTimeout(function(){
u.reportRespData({
type:1,
songid:e.id,
musicid:e.mid,
responseData:t.resp_data||""
});
},0);
var o={};
try{
o=JSON.parse(t.resp_data);
}catch(c){
var p=1;
return i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
}),void n.info("qqmusic_checkCopyright_parsefail mid:"+e.mid+", repsponeData:"+t.resp_data);
}
if("undefined"==typeof o.ret||0!=o.ret||0!=o.sub_ret||0==o.songlist.length){
var p=1;
return i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
}),void n.info("qqmusic_checkCopyright_dataerror mid:"+e.mid+", repsponeData:"+t.resp_data);
}
var m,l=o.songlist[0],d=l.song_play_url,b=l.song_play_time||0;
if(l.playable)m=d?0:6;else if(l.try_playable)l.try_file_size>0&&l.try_30s_url?(m=8,
d=l.try_30s_url,b=30):m=7;else switch(1*l.unplayable_code){
case 1:
m=1;
break;

case 2:
m=2;
break;

case 3:
m=3;
break;

case 4:
m=4;
break;

case 5:
m=5;
break;

default:
m=5;
}
i({
type:"success",
time:s,
code:m
});
var y=a(1*m);
e.onSuc({
canplay:y.canplay,
retry:y.retry,
msg:y.msg,
status:m,
play_url:d||"",
duration:b
}),y.canplay||n.info("qqmusic_checkCopyright_cannotplay mid:"+e.mid+", repsponeData:"+t.resp_data);
}else{
var p=4;
switch(t.http_code){
case 200:
break;

case 400:
p=2;
break;

case 500:
p=3;
break;

default:
p=4;
}
i({
type:"error",
time:s,
code:p
}),"function"==typeof e.onError&&e.onError({
errcode:p
});
}
},
error:function(){
"function"==typeof e.onError&&e.onError({
errcode:4
});
}
});
}
function i(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,6e4),e.time>=0&&e.time<200?o.setSum(m.reportId,24,1):e.time>=200&&e.time<500?o.setSum(m.reportId,25,1):e.time>=500&&e.time<1e3?o.setSum(m.reportId,26,1):e.time>=1e3&&e.time<2e3?o.setSum(m.reportId,27,1):e.time>=2e3&&e.time<1e4?o.setSum(m.reportId,28,1):e.time>=1e4&&o.setSum(m.reportId,29,1),
o.setAvg(m.reportId,23,r),"error"==e.type){
switch(1*e.code){
case 1:
o.setSum(m.reportId,9,1);
break;

case 2:
o.setSum(m.reportId,10,1);
break;

case 3:
o.setSum(m.reportId,11,1);
break;

case 4:
o.setSum(m.reportId,12,1);
}
o.setSum(m.reportId,19,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
o.setSum(m.reportId,8,1);
break;

case 0:
o.setSum(m.reportId,17,1);
break;

case 2:
o.setSum(m.reportId,13,1);
break;

case 3:
o.setSum(m.reportId,14,1);
break;

case 4:
o.setSum(m.reportId,15,1);
break;

case 5:
o.setSum(m.reportId,16,1);
break;

case 6:
o.setSum(m.reportId,47,1);
break;

case 7:
o.setSum(m.reportId,120,1);
break;

case 8:
o.setSum(m.reportId,121,1);
}
o.setSum(m.reportId,20,1);
}
}
var o=e("biz_wap/utils/jsmonitor_report.js"),c=e("pages/player_adaptor.js"),n=e("biz_wap/jsapi/log.js"),p=e("biz_wap/utils/ajax.js"),u=e("pages/musicUrlReport.js"),m={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_90",
imgroot2:"https://y.gtimg.cn/music/photo_new/T002R90x90M000#mid#.jpg",
reportId:"28306",
musicIcon:window.icon_qqmusic_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","pages/music_report_conf.js","pages/player_tips.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/utils/openUrl.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
C.hasInit||(n(),r(),s(),C.hasInit=!0);
}
function a(e){
t(),this._o={
protocal:"",
wxIndex:0,
type:0,
comment_id:"",
src:"",
jsapi2Src:"",
mid:"",
songId:"",
otherid:"",
albumid:"",
jumpurlkey:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
appPlay:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
musicbar_url:"",
playingCss:"",
pauseCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0,
playtimeDom:"",
loadingDom:"",
bufferDom:"",
playdotDom:"",
seekRange:"",
seekContainer:""
},this._init(e),C.allComponent.push(this);
}
function o(e,t,a,o){
C.num++,t.musicSupport=C.musicSupport,t.show_not_support=!1,C.musicSupport||1!=C.num||(t.show_not_support=!0);
var r=document.createElement("div"),n="";
if(n=y.tmpl(e,t),r.innerHTML=n,o===!0)a.appendChild(r.children[0]);else{
var i=a.parentNode;
if(!i)return;
i.lastChild===a?i.appendChild(r.children[0]):i.insertBefore(r.children[0],a.nextSibling);
}
}
function r(){
C.hasInit||h.inQMClient&&i("QMClient_pv",1);
}
function n(){
window.reportMid=[],window.reportVoiceid=[];
for(var e in v)if(v.hasOwnProperty(e)){
var t=v[e],a=t.split("_");
C.reportData2[e]={
id:a[0],
key:a[1],
count:0
};
}
}
function i(e,t){
C.reportData2[e]&&(t=t||1,C.reportData2[e].count+=t,C.debug&&console.log("addpv:"+e+" count:"+C.reportData2[e].count));
}
function s(){
x.gtVersion("7.0.6")||g.on(window,"unload",function(){
for(var e=p(),t=JSON.parse(e.report_list),a=0;a<t.length;a++)I({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!0,
data:t[a]
});
}),C.repotIntervalId&&clearInterval(C.repotIntervalId),C.repotIntervalId=setInterval(function(){
l();
},3e4);
}
function p(){
m.triggerUnloadPlaying(),l();
for(var e,t={},a=0,o=C.allComponent.length;o>a;a++){
var r=C.allComponent[a];
r.player&&"function"==typeof r.player.getPlayTotalTime&&(C.reportData[r._o.type].play_last_time[r._g.posIndex]=parseInt(1e3*r.player.getPlayTotalTime())),
"number"!=typeof r._status||1!==r._status&&4!==r._status||(e=r._o.songId);
}
e&&(t.current_musicid=e);
var i=[];
for(var a in C.reportData)i=i.concat(D.musicreport({
data:C.reportData[a]
}));
t.report_list=JSON.stringify(i),n();
for(var a=0,o=C.allComponent.length;o>a;a++){
var r=C.allComponent[a];
r&&"function"==typeof r._initReportData&&r._initReportData(),r.player&&"function"==typeof r.player.resetPlayTotalTime&&r.player.resetPlayTotalTime();
}
return t;
}
function l(){
var e=[];
for(var t in C.reportData2)if(C.reportData2.hasOwnProperty(t)){
var a=C.reportData2[t];
a.count>0&&(e.push(a.id+"_"+a.key+"_"+a.count),a.count=0);
}
e.length>0&&I({
type:"POST",
url:"/mp/jsmonitor?#wechat_redirect",
timeout:2e4,
async:!1,
data:{
idkey:e.join(";"),
t:Math.random()
}
});
}
function c(e){
return new a(e);
}
function d(e){
if(isNaN(e))return"00:00";
e=Math.floor(e);
var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),o=e-3600*t-60*a;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>a&&(a="0"+a),10>o&&(o="0"+o),t+a+":"+o;
}
function u(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function _(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
var g=e("biz_common/dom/event.js"),y=e("biz_common/tmpl.js"),m=e("pages/music_player.js"),h=e("pages/player_adaptor.js"),f=e("biz_common/dom/class.js"),D=e("pages/report.js"),v=e("pages/music_report_conf.js"),w=e("pages/player_tips.js"),k=e("biz_wap/jsapi/leaveReport.js"),x=e("biz_wap/utils/mmversion.js"),I=e("biz_wap/utils/ajax.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,C={
allComponent:[],
hasInit:!1,
reportId:"28306",
musicSupport:m.getSurportType(),
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
reportData:{},
posIndex:{},
num:0,
reportData2:{},
adapter:{
m:e("pages/qqmusic_ctrl.js"),
k:e("pages/kugoumusic_ctrl.js")
},
needReport11982:!1,
repotIntervalId:null
};
return a.prototype._init=function(e){
this._extend(e),this._g={
posIndex:void 0,
tag:"",
canDragBar:!1,
barDraging:!1,
canGoDetail:!0
},5==this._o.type||6==this._o.type||9==this._o.type?this._g.tag="k":this._o.type>=2&&this._o.type<=4?this._g.tag="v":7==this._o.type?this._g.tag="a":(0==this._o.type||1==this._o.type||8==this._o.type)&&(this._g.tag="m"),
this._initData(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer();
},a.prototype._initData=function(){},a.prototype._initQQmusicLyric=function(){
var e=this._o,t=this._g;
e.webUrl="m"==t.tag?e.webUrl.replace("#songId#",e.songId||"").replace("#referFrom#","music.qq.com"):e.webUrl.replace("#songId#","").replace("#referFrom#","");
},a.prototype._initReportData=function(){
var e=this._o,t=this._g;
"v"==t.tag?window.reportVoiceid.push(e.songId):"m"==t.tag&&window.reportMid.push(e.songId),
"undefined"==typeof C.reportData[e.type]&&(C.reportData[e.type]=D.getMusicReportData(e),
C.posIndex[e.type]=0),"undefined"==typeof t.posIndex&&(t.posIndex=C.posIndex[e.type]++);
var a=C.reportData[e.type];
a.musicid[t.posIndex]=e.songId,a.commentid[t.posIndex]=e.comment_id,a.hasended[t.posIndex]=0,
a.mtitle[t.posIndex]=e.title,a.detail_click[t.posIndex]=0,a.duration2[t.posIndex]=parseInt(1e3*e.duration),
a.errorcode[t.posIndex]=0,a.play_duration2[t.posIndex]=0,a.seek[t.posIndex]=0,a.seek_position[t.posIndex]=[],
a.play_last_time[t.posIndex]=0,a.local_time[t.posIndex]=0,a.seek_loaded[t.posIndex]=[];
},a.prototype._initPlayer=function(){
if(C.musicSupport){
var e=this,t=this._o,a=this._g.tag;
t.onStatusChange=this._statusChangeCallBack(),t.onTimeupdate=this._timeupdateCallBack(),
t.onError=this._errorCallBack(),t.onUpdateSeekRange=this._onUpdateSeekRange(),t.onAndroidForceH5=function(){
i("force_h5",1);
},t.onH5Begin2Play=function(){
i(a+"_pv",1),i(a+"_h5_pv",1);
},t.onH5Error=function(t,o){
i(a+"_h5_err_total",1),i(a+"_h5_err_"+o.code,1),e._reportH5Error({
type:1,
code:o.code
});
},t.onJsapi1Begin2Play=function(){
i(a+"_pv",1),i(a+"_wx_pv",1),i(a+"_wx_pv_1",1);
},t.onJsapi2Begin2Play=function(e,o){
i(a+"_pv",1),i(a+"_wx_pv",1),i(a+"_wx_pv_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src&&i("aac_pv",1),
t.musicPlayerOnJsapi2Begin2Play&&t.musicPlayerOnJsapi2Begin2Play(o);
},t.onJsapi2PlaySuccess=function(e,a){
t.musicPlayerOnJsapi2PlaySuccess&&t.musicPlayerOnJsapi2PlaySuccess(a);
},t.onJsapi2Begin2PlayErr=function(){
if(i(a+"_wx_err_1",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_start_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
m.isAndroid?(D.logReport("",e.replace("#type#","android"),"ajax"),i("android_aac_err_1",1)):(D.logReport("",e.replace("#type#","ios"),"ajax"),
i("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(i(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
m.isAndroid?(D.logReport("",e.replace("#type#","android"),"ajax"),i("android_aac_err_2",1)):(D.logReport("",e.replace("#type#","ios"),"ajax"),
i("ios_aac_err_2",1));
}
},t.onJsapi2PlayingStop=function(){
var e=a+"_stoped_";
e+=m.isAndroid?"android":"ios",i(e,1);
},t.onJsapi2PlayingPause=function(){
var e=a+"_paused_";
e+=m.isAndroid?"android":"ios",i(e,1);
},t.onSeekErr=function(){
if(i(a+"_seek_err",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_seek_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
m.isAndroid?(D.logReport("",e.replace("#type#","android"),"ajax"),i("android_aac_err_3",1)):(D.logReport("",e.replace("#type#","ios"),"ajax"),
i("ios_aac_err_3",1));
}
},t.onUnloadPlaying=function(){
i(a+"_unload_wx_pv",1);
},t.onQMClientPlay=function(){
i("QMClient_play",1);
},t.onSeekNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=1);
}
},t.onSeekNotNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=C.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=0);
}
},h.create(this._o,{
callback:function(t){
e.player=t,e.afterCreatePlayer();
}
});
}
},a.prototype.afterCreatePlayer=function(){
this._playEvent();
},a.prototype.isInSeekrang=function(e){
var t=this._o.seekRange;
if(!t)return!1;
if(t===e)return!0;
for(var a=t.getElementsByTagName("*"),o=0,r=a.length;r>o;o++)if(a[o]===e)return!0;
return!1;
},a.prototype._playEvent=function(){
var e=this,t=this._o,a=this._g;
if(t.detailUrl&&t.detailArea&&g.on(t.detailArea,"click",function(o){
if(!a.barDraging&&a.canGoDetail){
var r=o.target||o.srcElement;
r&&e.isInSeekrang(r)||("v"==a.tag?(C.reportData[t.type].detail_click[a.posIndex]=1,
window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):("m"==a.tag||"k"==a.tag)&&C.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(C.reportData[t.type].detail_click[a.posIndex]=1,window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):e.msg&&new w({
msg:e.msg
});
}
}));
}
}),C.musicSupport){
var o=0,r=4,n=5;
switch(1*t.type){
case 0:
o=1;
break;

case 1:
o=13;
break;

case 8:
o=14;
break;

case 2:
o=3;
break;

case 3:
o=6;
break;

case 4:
o=7;
break;

case 5:
o=10;
break;

case 6:
o=15;
break;

case 7:
o=11;
break;

case 9:
o=12;
}
var i="";
i=t.allowPause?t.pauseCss||t.playingCss:t.playingCss,g.tap(t.playArea,function(){
return console.log("click playArea",f.hasClass(t.playCssDom,i)),f.hasClass(t.playCssDom,i)?(t.allowPause?e.player.pause():e.player.stop(),
D.report({
type:o,
comment_id:t.comment_id,
voiceid:t.songId,
action:n
})):"v"==a.tag||"a"==a.tag?e._playMusic(o,r):C.adapter[a.tag].getPlayUrl(t,{
callback:function(n){
n.canplay&&n.play_url?(n.duration&&(t.duration=n.duration,e.player.setDuration(t.duration),
C.reportData[t.type].duration2[a.posIndex]=parseInt(1e3*t.duration)),e.player.setSrc(n.play_url),
8!=n.status||n.in_cache?e._playMusic(o,r):new w({
msg:"该音乐为付费音乐，当前为你播放试听片段",
onClick:function(){
e._playMusic(o,r);
}
})):n.msg&&new w({
msg:n.msg
});
}
}),!1;
}),e._dragEvent();
}
},a.prototype.getSeekRangeOffsetLeft=function(){
var e=0,t=this._o.seekRange,a=!1,o=window.__zoom||1;
for(1!=o&&(a=!0);t&&t!=document.body;)e+=a?t.offsetLeft*o:t.offsetLeft,"page-content"==t.id&&(a=!1),
t=t.offsetParent;
return e;
},a.prototype._dragEvent=function(){
var e=this,t=this._o,a=this._g,o=t.seekRange;
if(o){
var r=e.player.getDuration();
a.seekData={
zoom:window.__zoom||1,
duration:r,
startTime:0,
dragTime:0,
downX:0,
moveX:0
},g.on(o,"mousedown",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.pageX||t.clientX
}),t.preventDefault());
}),g.on(t.seekContainer,"mousemove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),g.on(document.body,"mouseup",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
}),g.on(o,"touchstart",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault());
}),g.on(o,"touchmove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation());
}),g.on(o,"touchend",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
});
}
},a.prototype._pointerDownHandler=function(e){
var t=this._g;
t.barDraging=!0,t.canGoDetail=!1,t.seekData.downX=e.x,t.seekData.startTime=this.player.getCurTime();
},a.prototype._pointerMoveHandler=function(e){
var t=this._g,a=t.seekData;
a.moveX=e.x;
var o=this.getSeekRangeOffsetLeft(),r=(a.moveX-o)/a.zoom/this._o.seekRange.offsetWidth;
r=Math.min(r,1),r=Math.max(r,0),a.dragTime=r*a.duration,a.dragTime!=a.startTime&&this._updateProgressBar(a.dragTime);
},a.prototype._pointerUpHandler=function(e){
var t=this._g,a=t.seekData;
a.dragTime||this._pointerMoveHandler({
x:e.x
}),t.barDraging=!1,this.player.seek(a.dragTime),C.reportData[this._o.type].seek[t.posIndex]=1,
C.reportData[this._o.type].seek_position[t.posIndex].push(parseInt(1e3*a.startTime)+","+parseInt(1e3*a.dragTime));
var o=C.reportData[this._o.type].seek_position[t.posIndex].length;
C.reportData[this._o.type].seek_loaded[t.posIndex][o-1]=0,t.seekData.startTime=0,
t.seekData.dragTime=0,t.seekData.downX=0,t.seekData.moveX=0,setTimeout(function(){
t.canGoDetail=!0;
},1e3);
},a.prototype._playMusic=function(e,t){
var a=this._o,o=this._g;
this.player.play(),C.reportData[a.type].hasended[o.posIndex]=1,0==C.reportData[a.type].local_time[o.posIndex]&&(C.reportData[a.type].local_time[o.posIndex]=parseInt(+new Date/1e3)),
D.report({
type:e,
comment_id:a.comment_id,
voiceid:a.songId,
action:t
}),x.gtVersion("7.0.6")&&!C.needReport11982&&(C.needReport11982=!0,k.addSpecificReport("music_data",p),
console.log("music play leave report added"));
},a.prototype._extend=function(e){
for(var t in e)this._o[t]=e[t];
},a.prototype._onUpdateSeekRange=function(){
var e=this,t=e._o,a=e._g;
return function(e){
this.surportSeekRange()&&t.bufferDom&&t.playdotDom?(a.canDragBar=!0,t.playdotDom.style.display="block",
t.bufferDom.style.width=1*e+"%"):(a.canDragBar=!1,t.playdotDom&&(t.playdotDom.style.display="none"));
};
},a.prototype._statusChangeCallBack=function(){
var e=this;
return function(t,a){
e._status=a,e._updatePlayerCss(this,a),e._o.musicPlayerStatusChange&&e._o.musicPlayerStatusChange(a);
};
},a.prototype._timeupdateCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
e._updateProgress(r),0!=r&&(C.reportData[t.type].play_duration2[a.posIndex]=parseInt(1e3*r));
};
},a.prototype._errorCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
C.reportData[t.type].errorcode[a.posIndex]=r.code,e._updatePlayerCss(this,3);
};
},a.prototype._reportH5Error=function(e){
if("mp.weixin.qq.com"==location.host&&1==e.type||C.debug){
var t=["code:",e.code,";type:",this._o.type,";url:",window.location.href];
this.player&&t.push(";src:"+this.player.getSrc());
var a=new Image;
a.src=["https://badjs.weixinbridge.com/badjs?level=4&id=112&msg=",encodeURIComponent(t.join("")),"&uin=",window.uin||"","&from=",this._o.type].join("");
}
},a.prototype._updatePlayerCss=function(e,t){
!!C.debug&&console.log("status:"+t);
{
var a=this._o,o=a.playCssDom;
a.progress;
}
2==t?(f.removeClass(o,a.playingCss),a.pauseCss&&f.removeClass(o,a.pauseCss),a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",
this._g.canDragBar=!0):(a.playdotDom.style.display="none",this._g.canDragBar=!1))):3==t?(f.removeClass(o,a.playingCss),
a.pauseCss&&f.removeClass(o,a.pauseCss),a.playdotDom&&(a.playdotDom.style.display="none",
this._g.canDragBar=!1),this._updateProgress(0)):(1==t||4==t)&&(a.allowPause?f.addClass(o,a.pauseCss||a.playingCss):f.addClass(o,a.playingCss),
a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",this._g.canDragBar=!0):(a.playdotDom.style.display="none",
this._g.canDragBar=!1))),a.loadingDom&&(a.loadingDom.style.display=4==t?"block":"none");
},a.prototype._updateProgress=function(e){
this._g.barDraging||this._updateProgressBar(e);
},a.prototype._updateProgressBar=function(e){
var t=this._o,a=this.player,o=a.getDuration();
if(o){
var r=this._countProgress(o,e);
t.progress&&(t.progress.style.width=r),t.playtimeDom&&e>=0&&(t.playtimeDom.innerHTML=d(e)),
t.playdotDom&&(t.playdotDom.style.left=r);
}
},a.prototype._countProgress=function(e,t){
return Math.min(t/e*100,100)+"%";
},a.prototype.destory=function(){
this.player&&this.player.destory();
},a.prototype.setOption=function(e){
e.duration&&(this._g.seekData.duration=e.duration),this._extend(e);
},a.prototype.setMusicPlayerOption=function(e){
e.duration&&this._g&&this._g.seekData&&(this._g.seekData.duration=e.duration),this.player&&this.player.setOption(e);
},a.prototype.getBackgroundAudioState=function(e){
return this.player.getBackgroundAudioState(e);
},{
init:c,
renderPlayer:o,
formatTime:d,
decodeStr:u,
encodeStr:_
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=musicid#>_<#=posIndex#>" class="js_wap_qqmusic db pages_reset music_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db music_card appmsg_card_context appmsg_card_active">\n            <a id="qqmusic_home_<#=musicid#>_<#=posIndex#>" class="music_card_bd">\n                <span class="music_card_title"><#=music_name#></span>\n                <span class="music_card_desc"><#=singer#></span>\n                <span class="music_card_source <#if(musictype==2){#>music_card_source_kugou<#}#>">\n                  <img src="<#=musicIcon#>" alt=""></span>\n            </a>\n            <span id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="music_card_ft">\n                <i class="weui-play-btn"></i>\n                <!--\n                <img src="<#=window.icon_qqmusic_default#>" alt="" class="pic_qqmusic_default">\n                -->\n                <img src="<#=albumurl#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="music_card_thumb" alt="">\n            </span>\n    </span>\n</span>\n';
});define("new_video/ctl.js",["common/comm_report.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
var i,n=e("common/comm_report.js");
if(parent==window)i=window;else try{
{
parent.window.location.href;
}
i=parent.window;
}catch(r){
i=window;
}
var t=i.user_uin,a=Math.floor(i.user_uin/100)%20;
t||(a=-1);
var o=function(){
return a>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var e=i.mid,n=i.idx,r="";
r=e&&n?e+"_"+n:"";
var a=i.__webviewid,o=[t,r,a].join("_");
return o;
},s=function(i){
if(20>a)try{
var n=i.vid||"",r={};
r.__biz=parent.window.biz||"",r.vid=n,r.clienttime=+new Date;
var t=parent.window.mid,s=parent.window.idx,p="";
p=t&&s?t+"_"+s:n,r.type="undefined"!=typeof i.type?i.type:t&&s?1:2,r.id=p,r.hit_bizuin=i.hit_bizuin||"",
r.hit_vid=i.hit_vid||"",r.webviewid=d(),r.step=i.step||0,r.orderid=i.orderid||0,
r.ad_source=i.ad_source||0,r.traceid=i.traceid||0,r.ext1=i.ext1||"",r.ext2=i.ext2||"",
r.r=Math.random(),r.devicetype=parent.window.devicetype,r.version=parent.window.clientversion,
r.is_gray=o()?1:0,r.mid=t||"",r.idx=s||"",r.url=parent.window.location.href,r.screen_num=i.screen_num||0,
r.screen_height=i.screen_height||0,r.ori_status=i.ori_status||3,r.fromid=i.fromid||0,
r.sessionid=window.sessionid||"",r.appmsg_scene=window.source||(window.cgiData?window.cgiData.scene:0)||0,
!r.appmsg_scene&&r.fromid?r.appmsg_scene=r.fromid:!r.fromid&&r.appmsg_scene&&(r.fromid=r.appmsg_scene),
r.total_range=i.total_range||0,r.current_range=i.current_range||0,r.duration=i.duration||0;
var c=e("biz_wap/utils/ajax.js");
c({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:r
});
}catch(w){}
},p=function(e){
try{
var i=e.vid||"",r={};
r.BizUin=parent.window.biz||"",r.Vid=i,r.ClientTime=+new Date;
var t=parent.window.mid,a=parent.window.idx,s="";
s=t&&a?t+"_"+a:i,r.Type="undefined"!=typeof e.type?e.type:t&&a?1:2,r.Id=s,r.HitBizUin=parseInt(e.hit_bizuin)||0,
r.HitVid=e.hit_vid||"",r.WebViewId=d(),r.Step=parseInt(e.step,10)||0,r.OrderId=(e.orderid||"").toString(),
r.AdSource=parseInt(e.ad_source,10)||0,r.TraceId=(e.traceid||"").toString(),r.Ext1=(e.ext1||"").toString(),
r.Ext2=(e.ext2||"").toString(),r.r=Math.random(),r.DeviceType=parent.window.devicetype,
r.ClientVersion=parseInt(parent.window.clientversion),r.IsGray=o()?1:0,r.msgid=parseInt(t,10)||0,
r.itemidx=parseInt(a,10)||0,r.Url=parent.window.location.href,r.ScreenNum=parseInt(e.screen_num,10)||0,
r.ScreenHeight=parseInt(e.screen_height,10)||0,r.OrStatus=parseInt(e.ori_status,10)||3,
r.Fromid=parseInt(e.fromid,10)||0,r.SessionId=(window.sessionid||"").toString(),
r.AppmsgScene=parseInt(window.source||(window.cgiData?window.cgiData.scene:0),10)||0,
!r.AppmsgScene&&r.Fromid?r.AppmsgScene=r.Fromid:!r.Fromid&&r.AppmsgScene&&(r.Fromid=r.AppmsgScene),
r.AppmsgScene=parseInt(r.AppmsgScene,10)||0,r.Fromid=parseInt(r.Fromid,10)||0,r.TotalRange=parseInt(e.total_range,10)||0,
r.CurrentRange=parseInt(e.current_range,10)||0,r.Duration=parseInt(e.duration,10)||0,
r.RemindTrafficSize=parseInt(e.remind_traffic_size,10)||0,r.TrafficReminderType=parseInt(e.traffic_reminder_type,10)||0,
n.report(12710,r);
}catch(p){}
};
return{
report:s,
getWebviewid:d,
showAd:o,
commReport:p
};
});define("biz_wap/jsapi/leaveReport.js",["biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/log.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=s?"1":"0",t.f="json",a.join(e,t);
}
function n(e,t){
if(e instanceof Object&&t instanceof Object)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
function o(e){
"function"==typeof e?l.push(e):data instanceof Object&&u.push(e);
}
function i(e,t){
v[e]||(v[e]=[]),v[e].push(t);
}
var r=e("biz_wap/jsapi/core.js"),a=e("biz_common/utils/url/parse.js"),p=e("biz_wap/utils/log.js"),s=-1!=navigator.userAgent.indexOf("TBS/"),c={},f=!1;
try{
c=top.window.document;
}catch(d){
f=!0;
}
if(!f&&top.window.__leaveReport)return top.window.__leaveReport;
if(window.__leaveReport)return window.__leaveReport;
var l=[],u=[],v=[];
r.on("reportOnLeaveForMP",function(){
p("[leaveReport 1]"),console.log("[leaveReport 1]");
var e={};
for(var o in v){
e[o]||(e[o]={});
for(var i=0;i<v[o].length;i++){
var r=v[o][i];
"function"==typeof r?n(e[o],r()):a instanceof Object&&n(e[o],r);
}
}
p("[leaveReport getDataFunc.length "+l.length+"]"),console.log("[leaveReport getDataFunc.length "+l.length+"]");
for(var i=0;i<l.length;i++){
var a=l[i]();
a instanceof Object&&u.push(a);
}
for(var i=0;i<u.length;i++)u[i].reportUrl&&(u[i].reportUrl=t(u[i].reportUrl));
return e.data={
requestList:u
},e;
});
var w={
addReport:o,
addSpecificReport:i
};
return window.__leaveReport=w,w;
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("album/utils/report.js",["common/comm_report.js"],function(e){
"use strict";
var r=e("common/comm_report.js"),o=window.WX_BJ_REPORT||{},n=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
ItemShowType:1*window.item_show_type||0,
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid
};
r.report(19647,n,{
success:function(e){
var r=JSON.parse(e);
1*r.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19647",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:r.err_code,
errMsg:r.err_msg
}
});
}
});
},i=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Scene:1*window.source,
Subscene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType
};
r.report(19648,n,{
async:e.async||!0,
success:function(e){
var r=JSON.parse(e);
1*r.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19648",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:r.err_code,
errMsg:r.err_msg
}
});
}
});
},d=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
Pos:1*e.pos,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid
};
r.report(19649,n,{
success:function(e){
var r=JSON.parse(e);
1*r.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 19649",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:r.err_code,
errMsg:r.err_msg
}
});
}
});
},t=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
bizuin:window.biz,
url:e.url+"",
ActionType:1*e.actionType,
Scene:1*window.source,
Network:window.__networkType+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType
};
r.report(10380,n,{
success:function(e){
var r=JSON.parse(e);
1*r.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 10380",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:r.err_code,
errMsg:r.err_msg
}
});
}
});
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Action:1*e.action,
AppMsgLikeType:window.appmsg_like_type,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType
};
r.report(14299,n,{
success:function(e){
var r=JSON.parse(e);
1*r.err_code!==0&&"undefined"!=typeof o&&o.BadJs&&o.BadJs.report("mmdata report failed","log_id: 14299",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:r.err_code,
errMsg:r.err_msg
}
});
}
});
};
return{
cardReport:n,
albumActionReport:i,
articleActionReport:d,
shareReport:t,
likeReport:s
};
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},a=r.search.replace(/^\?/,"").split("&"),o=a.length,n=0;o>n;n++)a[n]&&(e=a[n].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),a.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
});
}
var a=e("biz_wap/jsapi/core.js");
return{
openUrlWithExtraWebview:t
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
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_wap/utils/jsmonitor_report.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=r.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],a=0;a<l.length;a++){
var w=[l[a].bizuin||window.biz||"",l[a].mid||"",l[a].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var p=c[n.index].getBoundingClientRect(),h="fans_read_cnt="+l[n.index].fans_read_cnt,g={
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
action_screen_num:Math.ceil((p.top+p.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:h,
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
d.setSum(110809,b,1);
}
function e(){
if(l){
for(var n=0,t=r.getInnerHeight(),o=0;o<c.length;o++)if(c[o].dataset.show)n++;else{
var s=c[o].getBoundingClientRect();
s.top+s.height<t&&(c[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=c.length&&a.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),a=n("biz_common/dom/event.js"),d=n("biz_wap/utils/jsmonitor_report.js"),r=n("common/utils.js"),l=null,c=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return a.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
}),c=n.getElementsByClassName("more_read_link");
for(var o=0;o<c.length;o++)a.on(c[o],"click",function(n){
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
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);
}
return e;
};
define("appmsg/comment.js",["biz_common/utils/string/html.js","biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","appmsg/retry_ajax.js","biz_common/dom/offset.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","common/utils.js","appmsg/emotion/selection.js","appmsg/i18n.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/dom.js","pages/utils.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/position.js","appmsg/set_font_size.js","common/color/background_color.js","biz_wap/utils/jsmonitor_report.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js","appmsg/comment_tpl.html.js","appmsg/comment_pc_tpl.html.js","appmsg/friend_comment_tpl.html.js"],function(e,t,n,o){
"use strict";
function i(e){
var t=document.getElementById(e);
t.parentNode.removeChild(t);
}
function d(e,t){
e&&(e.style.display=t||"block");
}
function l(e){
e&&(e.style.display="none");
}
function a(e,t){
for(;e&&e.tagName&&"BODY"!==e.tagName.toUpperCase();){
if(e===t)return!0;
e=e.parentNode;
}
return!1;
}
function s(e){
var t=Ct.getScrollTop(),n=e.offsetTop;
return t+Ct.getInnerHeight()>n&&n>=t?!0:!1;
}
function m(){
ln.mylist.children.length?(d(ln.mylist.parentNode),In||"none"===ln.mine.style.display||ct.removeClass(document.body,En)):(l(ln.mylist.parentNode),
In||"none"===ln.mine.style.display||ct.addClass(document.body,En));
}
function r(){
var e=0,t=ln.mylist.getElementsByClassName("js_comment_item");
if(t&&t.length)for(var n=0;n<t.length;n++){
var o=t[n];
e++,e>2?l(o):d(o);
for(var i=o.getElementsByClassName("js_reply_item"),a=0;a<i.length;a++){
var s=i[a];
e++,e>2?l(s):d(s);
}
var m=o.getElementsByClassName("js_reply_div").length>0?o.getElementsByClassName("js_reply_div")[0]:null;
m&&(e>2?l(m):d(m));
}
fn=!1;
}
function c(){
var e=ln.mylist.getElementsByClassName("js_comment_item");
if(e&&e.length)for(var t=0;t<e.length;t++){
var n=e[t];
d(n);
for(var o=n.getElementsByClassName("js_reply_item"),i=0;i<o.length;i++)d(o[i]);
var l=n.getElementsByClassName("js_reply_div").length>0?n.getElementsByClassName("js_reply_div")[0]:null;
l&&d(l);
}
fn=!0;
}
function p(e){
ln.el_alertContent.innerHTML=e,ln.el_alertPanel.style.display="";
}
function _(){
In?(ct.removeClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide"),
setTimeout(function(){
ct.addClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide");
},750)):(setTimeout(function(){
d(ln.toast);
},750),setTimeout(function(){
l(ln.toast);
},1500));
}
function u(e){
var t=a(e,ln.mylist),n=t?750:2e3;
document.getElementById("js_reply_success_pc_content").innerHTML=t?"已回复":"已回复，被精选后可见",
ct.removeClass(document.getElementById("js_reply_success_pc"),"weui-transition_opacity-hide"),
setTimeout(function(){
ct.addClass(document.getElementById("js_reply_success_pc"),"weui-transition_opacity-hide");
},n);
}
function g(e){
return e.toString().replace(/^\s+|\s+$/g,"");
}
function y(e,t){
if(!(Math.random()<.999)){
var n=9;
"https:"===window.location.protocol&&(n=18),_t.saveSpeeds({
uin:window.uin,
pid:n,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),_t.send();
}
}
function f(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];
if("undefined"!=typeof e)if(Wt.idkey)Nt.setSum(Wt.idkey,e,1);else{
var n=new Image,o=Math.random();
n.src="/mp/jsreport?key="+e+"&content="+t+"&r="+o;
}
}
function w(e){
var t=e.actiontype,n=void 0===t?0:t,o=e.personalCommentId,i=void 0===o?0:o,d=e.num,l=void 0===d?0:d;
St.report(19462,_extends({
PersonalCommentId:parseInt(i,10)||0,
CommentId:parseInt(Zt,10)||0,
actiontype:n,
wording:"余下N条",
number:parseInt(l,10)||0,
devicetype:In?1:2
},Ut));
}
function h(){
for(var e=document.getElementsByClassName("js_extend_comment"),t=0;t<e.length;t++){
var n=e[t],o=n.getAttribute("data-my-id");
s(n)&&Cn.indexOf(o)<=-1&&(w({
actiontype:1,
personalCommentId:o,
num:n.getAttribute("data-num")
}),Cn.push(o));
}
}
function C(){
Qt||(Qt=!0,new ut({
comment_id:Zt,
appmsgid:window.appmsgid,
idx:window.idx,
item_show_type:window.item_show_type||0,
biz:window.biz
}),h());
}
function v(){
try{
var e=ln.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<Ct.getInnerHeight()&&en&&t&&(Nt.setLogs({
id:28307,
key:45,
value:1,
lc:1,
log0:""
}),bt.off(window,"scroll",v));
}catch(n){
console.error(n);
}
}
function j(){
var e=ln.showAll,t=Ct.getScrollTop(),n=Ht.getY(e,"js_article");
return 0===e.clientHeight?!1:(e.clientHeight+n>=t+e.clientHeight/2&&e.clientHeight+n<=t+e.clientHeight/2+Ct.getInnerHeight()&&(St.report(18832,_extends({
Actiontype:1,
Type:3,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Pos:0
},Dt)),Nt.setSum(110809,26,1),bt.off(window,"scroll",j)),!0);
}
function b(e){
St.report(19462,_extends({
CommentId:parseInt(Zt,10)||0,
actiontype:e,
wording:fn?"收起我的留言":"展开我的留言",
number:yn,
devicetype:1
},Ut));
}
function I(){
s(ln.expandAndFoldPC)&&(b(1),bt.off(window,"scroll",I));
}
function B(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,i=n/1e3-e,d=new Date(n).getFullYear(),l=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>i?Math.floor(o/60/60)+"小时前":172800>i?"昨天":604800>i?Math.floor(i/24/60/60)+"天前":l.getFullYear()===d?l.getMonth()+1+"月"+l.getDate()+"日":l.getFullYear()+"年"+(l.getMonth()+1)+"月"+l.getDate()+"日";
}
function E(e){
xt.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=Sn.encode(e.innerHTML);
});
}
function k(e,t,n){
var o=void 0,i=void 0,d="",l="",a=!Jt&&!un||Jt&&Gt||un&&gn,s=document.createElement("div");
"elected"===n?l=0:"friend"===n&&(l=1),cn={};
for(var m=0,r=0;r<e.length;r++){
if(m=0,i=e[r],i.type=n,i.time=B(i.create_time),i.status="",i.logo_url=i.logo_url||Hn,
i.logo_url=-1!==i.logo_url.indexOf("wx.qlogo.cn")?i.logo_url.replace(/\/132$/,"/96"):i.logo_url,
i.content=i.content.htmlDecodeLite().htmlEncodeLite(),i.nick_name=i.nick_name.htmlDecodeLite().htmlEncodeLite(),
i.like_num_format=parseInt(i.like_num,10)>=1e4?(i.like_num/1e4).toFixed(1)+"万":i.like_num,
"en"===window.LANG&&(i.like_num_format=jt.dealLikeReadShow_en(i.like_num)),i.is_from_friend="friend"===n?0:i.is_from_friend||0,
i.is_from_me="mine"===n?1:i.is_from_me||0,i.reply_new=i.reply_new||{
reply_list:[]
},i.is_mine=!n,i.is_elected="elected"===n||"friend"===n?1:i.is_elected,i.is_top="friend"===n?0:i.is_top,
i.report_elected=i.is_elected||0,i.report_friend=i.is_from_friend||0,i.scene=l,i.supportReply=kn&&i.is_from_me&&a,
i.reply_new.reply_list.length>0)for(var c=0;c<i.reply_new.reply_list.length;c++){
var p=i.reply_new.reply_list[c];
"elected"!==n&&"friend"!==n||p.reply_is_elected?(p.time=B(p.create_time),p.content=(p.content||"").htmlEncodeLite(),
p.reply_like_status=p.reply_like_status||0,p.reply_like_num=p.reply_like_num||0,
p.reply_like_num_format=parseInt(p.reply_like_num,10)>=1e4?(p.reply_like_num/1e4).toFixed(1)+"万":p.reply_like_num,
"en"===window.LANG&&(p.reply_like_num_format=jt.dealLikeReadShow_en(p.reply_like_num)),
p.reply_is_elected=p.reply_is_elected,p.is_from_me=""!==p.openid&&i.is_from_me?1:0,
p.is_from_author=""===p.openid?1:0,c>0&&p.openid===i.reply_new.reply_list[c-1].openid&&(p.is_same=1),
m++):(i.reply_new.reply_list.splice(c,1),c--);
}
i.replyListCount=m,i.new_appmsg=window.new_appmsg,d+=Bt.tmpl(pt,i);
try{
var _=i.nick_name+i.content,u=!1,g=Wt.repeatContentID;
cn[_]&&(u=!0,g=Wt.repeatContent),an.indexOf(i.content_id)>-1&&(u=!0,g=Wt.repeatContentID),
an.push(i.content_id),cn[_]=!0,u&&f(g,encodeURIComponent(JSON.stringify({
comment_id:Zt,
content_id:i.content_id,
offset:$t,
length:e.length,
url:bn
})));
}catch(y){
console.error(y);
}
}
for(s.innerHTML=d,E(s);s.children.item(0);)o=s.children.item(0),t.appendChild(o);
}
function T(e){
var t=void 0,n=void 0,o=Date.now(),i=e.resp,a=e.loadTime,s=e.forceRefresh,m=document.createDocumentFragment(),r=document.createDocumentFragment();
if(Jt=i.only_fans_can_comment,f(Wt.handleList,encodeURIComponent(JSON.stringify({
comment_id:Zt,
offset:$t,
url:bn
}))),1!==i.enabled?(Tn&&(Tn.style.display="none"),xn&&l(xn),i.elected_comment=[],
i.friend_comment=[],i.elected_comment_total_cnt=0,i.friend_comment_total_cnt=0):(Tn&&(Tn.style.display="block"),
xn&&d(xn)),0===$t){
if(tn=i.logo_url,mn=i.nick_name,s&&(an=[]),t=i.elected_comment,t&&t.length){
if(k(t,m,"elected"),s&&(ln.list.innerHTML=""),ln.list.appendChild(m),d(ln.main),
un&&0===gn?(document.getElementById("js_cmt_nofans1").innerHTML="作者已设置关注3天后才可留言",
d(document.getElementById("js_cmt_nofans1"),"block")):Jt&&0===i.is_fans?(document.getElementById("js_cmt_nofans1").innerHTML="作者已设置关注后才可以留言",
d(document.getElementById("js_cmt_nofans1"),"block")):Rt&&(In?(d(ln.commentPC),d(ln.inputPC)):d(ln.addCmtBtn1)),
i.elected_comment_total_cnt<=10&&(d(document.getElementById("js_cmt_statement")),
d(document.getElementById("js_cmt_qa"))),!Xt&&"5"===window.item_show_type){
var c=Date.now()-window.logs.pagetime.page_begin;
Xt=!0,Math.random()<.1&&(_t.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:27,
time:c
}]
}),_t.send());
}
}else l(ln.main),un&&0===gn?(document.getElementById("js_cmt_nofans2_inner").innerHTML="作者已设置关注3天后才可留言",
d(document.getElementById("js_cmt_nofans2"),"block")):Jt&&0===i.is_fans?(document.getElementById("js_cmt_nofans2_inner").innerHTML="作者已设置关注后才可以留言",
d(document.getElementById("js_cmt_nofans2"),"block")):Rt&&(In?(d(ln.commentPC),d(ln.inputPC)):d(ln.addCmtBtn2));
n=i.friend_comment,k(n,r,"friend"),n&&0===n.length&&l(xn),s&&(ln.fdlist.innerHTML=""),
ln.fdlist&&ln.fdlist.appendChild(r),n&&n.length?(d(ln.fdmain),(!Jt||Jt&&1===i.is_fans)&&(In||(l(ln.addCmtBtn1),
l(ln.addCmtBtn2),Rt&&d(ln.addCmtBtn3)))):l(ln.fdmain);
var p=document.getElementById("js_cmt_area");
location.href.indexOf("scrolltodown")>-1&&p&&p.offsetTop&&window.scrollTo(0,p.offsetTop-25);
}else t=i.elected_comment,t&&t.length&&(k(t,m,"elected"),ln.list.appendChild(m));
0===i.elected_comment_total_cnt?($t=-1,l(document.getElementById("js_cmt_loading")),
l(document.getElementById("js_cmt_statement")),l(document.getElementById("js_cmt_qa"))):$t+jn>=i.elected_comment_total_cnt?($t=-1,
l(document.getElementById("js_cmt_loading")),d(document.getElementById("js_cmt_statement")),
d(document.getElementById("js_cmt_qa"))):$t+=i.elected_comment.length,window.ipados13_font_scale&&Lt.setFontSize(ln.main,window.ipados13_font_scale/100);
var _=5;
if(window.user_uin%2===0&&(_=8),t.length>_&&window.has_related_article){
var u=0;
d(ln.showAll),l(document.getElementById("js_cmt_statement"));
for(var g=ln.list.querySelectorAll("li.js_comment_item"),w=0;_>w;w++){
var h=window.getComputedStyle(g[w]);
u+=g[w].getBoundingClientRect().height+parseFloat(h.paddingTop)+parseFloat(h.paddingBottom)+parseFloat(h.borderTopWidth)+parseFloat(h.borderBottomWidth)+parseFloat(h.marginTop)+parseFloat(h.marginBottom);
}
ln.listContainer.style.height=u+"px",ln.showAllWording.innerText="查看更多%s条留言".replace("%s",t.length-_);
var v=function(){
if("none"!==ln.showAll.style.display){
for(var e=0,t=ln.list.querySelectorAll("li.js_comment_item"),n=0;_>n;n++){
var o=window.getComputedStyle(t[n]);
e+=t[n].getBoundingClientRect().height+parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth)+parseFloat(o.marginTop)+parseFloat(o.marginBottom);
}
ln.listContainer.style.height=e+"px";
}
};
window.addEventListener("resize",v),window.ipados13_font_scale&&(Lt.setFontSize(ln.showAllWording,window.ipados13_font_scale/100),
Lt.onFontScaleChange(v)),Nt.setSum(110809,25,1);
}
C(),Pt.setTwoTabHeight("js_comment_content"),a&&y(a,Date.now()-o);
}
function x(e){
if(Zt=window.comment_id,0!==Number(Zt)){
var t=e.forceRefresh,n=e.cb;
t=t===!0,t&&($t=0);
var o=Ct.getScrollTop(),i=document.documentElement.scrollHeight;
if(!(en||-1===$t||$t>0&&i-o-Ct.getInnerHeight()>500)){
if("number"==typeof Vt&&0===Vt&&!t)return void T({
resp:{
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:Jt,
is_fans:Gt,
logo_url:tn,
nick_name:mn
}
});
var a=wt.join("/mp/appmsg_comment",{
action:"getcomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
offset:$t,
limit:jn,
send_time:window.send_time
},!0),s=+new Date;
en=!0,l(ln.tips),d(ln.loading);
try{
on++,t&&(dn=[]),on>1&&!t&&f(Wt.moreList,encodeURIComponent(a)),dn.indexOf(a)>-1&&f(Wt.repeatList,encodeURIComponent(a)),
dn.push(a);
}catch(m){
console.error(m);
}
An&&console.info("[图文评论] 开始请求评论数据:",a),kt("[Appmsg comment] start get comment data, url:"+a),
It({
url:a,
dataType:"json",
success:function(e){
var o=e.base_resp&&e.base_resp.ret;
0===o?n&&n({
resp:e,
forceRefresh:t,
loadTime:Date.now()-s
}):f(Wt.errList,"type:resperr;url:"+encodeURIComponent(a)+";ret="+o),kt("[Appmsg comment] get comment success");
},
error:function(){
f(Wt.errList,"type:ajaxerr;url:"+encodeURIComponent(a)),kt("[Appmsg comment] get comment ajax error");
},
complete:function(){
en=!1,l(ln.loading),bt.off(window,"scroll",v);
}
});
}
}
}
function P(){
2>=yn?l(ln.expandAndFoldPC):(d(ln.expandAndFoldPC),fn?(ct.addClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="收起我的留言"):(ct.removeClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="展开我的留言"));
}
function A(){
ln.list.children.length?ln.fdlist.children.length?(Rt&&d(ln.addCmtBtn3),l(ln.addCmtBtn1),
l(ln.addCmtBtn2),l(ln.addCmtBtn4)):(Rt&&d(ln.addCmtBtn1),l(ln.addCmtBtn2),l(ln.addCmtBtn3),
l(ln.addCmtBtn4)):ln.fdlist.children.length?(Rt&&d(ln.addCmtBtn3),l(ln.addCmtBtn4),
l(ln.addCmtBtn1),l(ln.addCmtBtn2)):(Rt&&d(ln.addCmtBtn2),l(ln.addCmtBtn3),l(ln.addCmtBtn1),
l(ln.addCmtBtn4)),In&&(l(ln.addCmtBtn1),l(ln.addCmtBtn2),l(ln.addCmtBtn3));
}
function S(e,t){
var n=document.createDocumentFragment(),o={
content:t,
nick_name:mn,
create_time:Date.now()/1e3|0,
is_elected:0,
logo_url:tn,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:e.my_id,
content_id:e.content_id,
reply_new:{
reply_list:[]
}
};
_(),k([o],n,"mine"),ln.mylist.insertBefore(n,ln.mylist.firstChild),m(),In?(ln.input.innerHTML="",
ln.inputHolder.style.display="",ln.containerPC.style.display="none",ln.inputPC.style.display="",
yn++,fn=!0,hn.unshift(o),c(),P()):ln.input.value="",A();
}
function H(e,t){
var n=t.filter(function(t){
return parseInt(t.my_id,10)===parseInt(e,10);
});
return n&&n.length>0?n[0]:null;
}
function L(e,t,n,o){
u(o),ln.input.innerHTML="",ln.inputHolder.style.display="",yn++;
var i=document.createDocumentFragment(),d=document.getElementById("cid"+t),s=d.nextSibling;
ln.mylist.removeChild(d);
var m=H(t,hn);
m&&(m.reply_new&&m.reply_new.reply_list&&0!==m.reply_new.reply_list.length||(m.reply_new={
reply_list:[]
}),m.reply_new.reply_list.push({
content:n,
nick_name:mn,
create_time:Date.now()/1e3|0,
reply_is_elected:0,
reply_del_flag:0,
reply_like_status:0,
reply_like_num:0,
uin:Ft,
reply_id:e.reply_id
}),a(o,ln.list)?(l(ln.containerPC),k([m],i,"mine"),ln.mylist.insertBefore(i,s),fn?c():r()):(k([m],i,"mine"),
ln.mylist.insertBefore(i,s),fn=!0,c())),P();
}
function M(e){
var t=ln.containerPC.getAttribute("data-my-id"),n=g(sn).replace(/<br\/>/g,"").replace(/\n/g,"")||"",o=document.getElementById("activity-name");
if(ln.submit.disabled!==!0){
if(n.length<1)return void p("留言不能为空");
if(n.length>600)return void p("字数不能多于600个");
ln.submit.disabled=!0;
var i=wt.join("/mp/appmsg_comment",{
action:"addcommentreply",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
sn:window.sn
},!0);
It({
url:i,
data:{
content:n,
title:o&&g(o.innerText),
head_img:tn,
nickname:mn,
client_id:pn,
my_id:t
},
type:"POST",
dataType:"json",
success:function(o){
switch(+o.ret){
case 0:
L(o,t,n,e);
break;

case-6:
p("你留言的太频繁了，休息一下吧");
break;

case-7:
p("你还未关注该公众号，不能参与留言");
break;

case-10:
p("字数不能多于600个");
break;

case-15:
p("留言已关闭");
break;

default:
p("系统错误，请重试");
}
},
error:function(){}
});
}
}
function N(e){
var t=e.delegatedTarget||e.srcElement;
if(In&&wn)return void M(t);
xt.log("tag1");
var n=void 0,o=wt.join("/mp/appmsg_comment",{
action:"addcomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt,
sn:window.sn
},!0);
if(n=In?g(sn).replace(/<br\/>/g,"").replace(/\n/g,"")||"":g(ln.input.value),xt.log("tag2"),
!ct.hasClass(ln.submit,"btn_disabled")&&ln.submit.disabled!==!0){
if(xt.log("tag3"),n.length<1)return void p("留言不能为空");
if(xt.log("tag4"),n.length>600)return void p("字数不能多于600个");
In&&(n=sn),xt.log("tag5"),In?ln.submit.disabled=!0:ct.addClass(ln.submit,"btn_disabled"),
xt.log("tag6");
var i=document.getElementById("activity-name");
xt.log("tag7"),Yt!==n&&(pn=Date.now()),It({
url:o,
data:{
content:n,
title:i&&g(i.innerText),
head_img:tn,
nickname:mn,
client_id:pn
},
type:"POST",
dataType:"json",
success:function(e){
switch(xt.log("tag8"),In||Sn.hidePannel(),+e.ret){
case 0:
S(e,n);
break;

case-6:
p("你留言的太频繁了，休息一下吧");
break;

case-7:
p("你还未关注该公众号，不能参与留言");
break;

case-10:
p("字数不能多于600个");
break;

case-15:
p("留言已关闭");
break;

default:
Yt=n,p("系统错误，请重试");
}
0!==Number(e.ret)&&f(Wt.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+e.ret);
},
error:function(e){
xt.log("shit;"+e.status+";"+e.statusText),f(Wt.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!==ln.input.value&&ct.removeClass(ln.submit,"btn_disabled");
}
});
}
}
function R(e){
if(e&&e.length>0)for(var t=0;t<e.length;t++){
var n=e[t];
yn++,n.reply_new&&n.reply_new.reply_list&&(yn+=n.reply_new.reply_list.length);
}
}
function D(e){
R(e),r(),yn>2&&(ln.expandAndFoldPC.innerHTML="展开我的留言",d(ln.expandAndFoldPC),fn=!1,
b(1));
}
function z(){
var e=document.getElementById("js_mycmt_loading"),t=wt.join("/mp/appmsg_comment",{
action:"getmycomment",
scene:Wt.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:Zt
},!0);
m(),0===rn&&(rn=1,d(e),It({
url:t,
dataType:"json",
success:function(e){
var n=e.base_resp&&e.base_resp.ret;
if(0===n){
var o=e.my_comment;
hn=o;
var i=document.createDocumentFragment();
o&&o.length&&(In&&(d(ln.myareaPC),d(ln.mylist)),k(o,i,"mine"),ln.mylist.appendChild(i),
In&&D(o)),rn=2;
}else rn=0,f(Wt.errComment,"type:resperr;url:"+encodeURIComponent(t)+";ret="+n);
},
error:function(){
rn=0,f(Wt.errComment,"type:ajaxerr;url:"+encodeURIComponent(t));
},
complete:function(){
l(e),m();
}
}));
}
function F(){
return At.isWechat?gt.os.ipad?!1:At.isInMiniProgram?!1:At.isIOS&&At.gtVersion("7.0.8")?!0:At.isAndroid&&At.gtVersion("7.0.8")?!0:Ct.isNativePage()&&(At.isIOS||At.isAndroid)?!0:!1:!1;
}
function O(){
var e=document.getElementById("activity-name");
return F()?(ht.invoke("handleMPPageAction",{
action:"writeComment",
title:e&&g(e.innerText),
comment_id:Zt,
style:Dn?"black":"white"
}),!0):!1;
}
function q(){
return At.isWechat?gt.os.ipad?!1:At.isInMiniProgram?!1:At.isIOS&&At.gtVersion("7.0.12",!0)?!0:At.isAndroid&&At.gtVersion("7.0.13",!0)?!0:Ct.isNativePage()&&(At.isIOS||At.isAndroid)?!0:!1:!1;
}
function U(e){
return Kt=Ct.getScrollTop(),F()&&e?void O():(In||l(ln.article),d(ln.mine),ln.deletePanel=document.getElementById("js_delete_panel_mobile"),
ln.deleteConfirm=document.getElementById("js_delete_confirm_mobile"),ln.deleteCancel=document.getElementById("js_delete_cancel_mobile"),
window.__second_open__&&gt.os.ios&&d(ln.fakebar),window.scrollTo(0,0),z(),void(e||xt.later(function(){
ln.input.focus();
})));
}
function W(){
"1"===wt.getQuery("js_my_comment")&&U(!0);
}
function G(){
l(ln.mine),d(ln.article),ln.deletePanel=document.getElementById("js_delete_panel"),
ln.deleteConfirm=document.getElementById("js_delete_confirm"),ln.deleteCancel=document.getElementById("js_delete_cancel"),
window.scrollTo(0,Kt),ln.input.blur(),ct.removeClass(document.body,Bn),ct.removeClass(document.body,En),
Ct.isNativePage()||Rn(Dn||_n?"#232323":"#ffffff");
}
function V(e){
var t=ct.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=parseInt(n.getAttribute("data-num")||0,10),i=n.getAttribute("data-like");
t===("1"===i)&&(t?o--:o++),0===o&&(o=""),"en"===window.LANG?n.innerHTML=jt.dealLikeReadShow_en(o):-1===n.innerHTML.indexOf("万")&&(n.innerHTML=o),
t?(ct.removeClass(e,"praised"),e.dataset.status=0):(ct.addClass(e,"praised"),e.dataset.status=1);
}
function Y(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(ct.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status,10),i=0===o?1:0,d=n.dataset.contentId,l=n.dataset.scene,a=document.querySelectorAll('.js_comment_praise[data-content-id="'+d+'"]'),s=0;s<a.length;s++)V(a[s]);
if(yt({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:i,
appmsgid:window.appmsgid,
comment_id:Zt,
content_id:d,
item_show_type:window.item_show_type||0,
scene:l
}
}),In){
var m=n.dataset.myId,r=H(m,hn);
r&&(r.like_status=i,r.like_num=i?r.like_num++:r.like_num--);
}
}
}
function Q(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status,10),o=n?0:1,i=t.dataset.contentId,d=t.dataset.replyId,l=t.dataset.scene,a=document.querySelectorAll('.js_reply_praise[data-content-id="'+i+'"][data-reply-id="'+d+'"]'),s=0;s<a.length;s++)V(a[s]);
if(It({
url:"/mp/appmsg_comment?action=like_reply",
type:"post",
data:{
comment_id:Zt,
content_id:i,
reply_id:d,
like:o,
scene:l,
item_show_type:window.item_show_type||0
}
}),In){
var m=t.dataset.myId,r=H(m,hn);
r&&r.reply_new.reply_list.forEach(function(e){
e.reply_id===parseInt(d,10)&&(e.reply_like_status=o,e.reply_like_num=o?e.reply_like_num++:e.reply_like_num--);
});
}
}
function J(e,t){
e.parentNode.removeChild(e),ct.addClass(ln.deletePanel,"weui-transition_opacity-hide");
for(var n=document.querySelectorAll(".cid"+t),o=0;o<n.length;o++)n[o].parentNode.removeChild(n[o]);
if(ln.list.children.length?ln.fdlist.children.length||l(ln.fdmain):(l(ln.main),l(document.getElementById("js_cmt_statement")),
l(document.getElementById("js_cmt_qa")),ln.fdlist.children.length||l(ln.fdmain)),
m(),A(),In){
var i=H(t,hn);
i&&(yn=yn-i.reply_new.reply_list.length-1),hn=hn.filter(function(e){
return e.my_id!==parseInt(t,10);
}),fn?c():r(),P();
}
}
function X(e){
var t=void 0,n=e.delegatedTarget,i=n.getAttribute("data-my-id"),d=wt.join("/mp/appmsg_comment",{
action:"delete",
scene:Wt.scene,
appmsgid:window.appmsgid,
my_id:i,
comment_id:Zt
},!0);
ct.removeClass(ln.deletePanel,"weui-transition_opacity-hide"),bt.on(ln.deleteConfirm,"click",function(){
t!==i&&(t=i,It({
url:d,
dataType:"json",
success:function(e){
var t=n;
if(0===e.ret){
for(;t&&(t.nodeType!==t.ELEMENT_NODE||"li"!==t.tagName.toLowerCase());)t=t.parentNode;
t&&J(t,i);
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
}));
}),bt.on(ln.deleteCancel,"click",function(){
t!==i&&(t=i,ct.addClass(ln.deletePanel,"weui-transition_opacity-hide"));
});
}
function Z(e,t,n){
l(ln.deleteReplyPanel);
var o=document.querySelectorAll('.discuss_message_content[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),i=document.querySelectorAll('.js_reply_del[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),d=document.querySelectorAll('.js_reply_praise[data-my-id="'+t+'"][data-reply-id="'+n+'"]'),a=document.querySelectorAll('.js_reply_elect_status[data-my-id="'+t+'"][data-reply-id="'+n+'"]');
if(o.length===i.length){
for(var s=0;s<o.length;s++)o[s].innerHTML="此回复已被删除",ct.addClass(o[s],"discuss_message_del"),
i[s].style.display="none";
if(d.forEach(function(e){
e.style.display="none";
}),a.forEach(function(e){
e.style.display="none";
}),In){
var m=H(t,hn);
m&&m.reply_new.reply_list.forEach(function(e){
e.reply_id===parseInt(n,10)&&(e.reply_del_flag=1,e.reply_is_elected=0);
});
}
}
}
function $(e){
var t=void 0,n=e.delegatedTarget,i=n.getAttribute("data-my-id"),a=n.getAttribute("data-reply-id"),s=wt.join("/mp/appmsg_comment",{
action:"deletecommentreply",
scene:Wt.scene,
appmsgid:window.appmsgid,
my_id:i,
reply_id:a,
comment_id:Zt
},!0);
d(ln.deleteReplyPanel),bt.on(ln.deleteReplyConfirm,"click",function(){
t!==a&&(t=a,It({
url:s,
dataType:"json",
success:function(e){
var t=n;
if(0===e.ret){
for(;t&&(t.nodeType!==t.ELEMENT_NODE||"li"!==t.tagName.toLowerCase());)t=t.parentNode;
t&&Z(t,i,a);
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
}));
}),bt.on(ln.deleteReplyCancel,"click",function(){
t!==a&&(t=a,l(ln.deleteReplyPanel));
});
}
function K(){
ln.input.innerHTML="",ln.input.focus(),vn=null,ln.submit.disabled=!0;
}
function et(e){
var t=e.delegatedTarget||e.srcElement,n=t.getAttribute("data-my-id"),o=document.getElementById("activity-name"),i=t.parentNode.parentNode,a=void 0,s="";
if(i){
var m=i.getElementsByClassName("js_reply_content"),r=m.length;
if(r>0)for(var c=m.length-1;c>=0;c--){
var p=m[c];
if(!ct.hasClass(p,"discuss_message_del")){
a=p;
break;
}
}
a||(a=i.getElementsByClassName("js_comment_content").length>=1?i.getElementsByClassName("js_comment_content")[0]:null);
}
return s=a?a.getAttribute("data-content"):"",q()?(ht.invoke("handleMPPageAction",{
action:"writeCommentReply",
title:o&&g(o.innerText),
comment_id:Zt,
style:Dn?"black":"white",
personal_comment_id:n,
reply_content:s
}),!0):(In?(ln.containerPC.parentNode.removeChild(ln.containerPC),i.appendChild(ln.containerPC),
ln.containerPC.setAttribute("data-my-id",n),ln.inputHolder.innerHTML="留言的回复被公众号精选后，将对所有人可见",
ln.inputHolder.style.display="",ln.submit.innerText="回复",l(ln.emotionPanel),"none"===ln.inputPC.style.display&&d(ln.inputPC),
d(ln.containerPC),K(),wn=!0):(d(ln.updateDialog),Nt.setSum(110809,51,1),bt.on(ln.updateCancel,"click",function(){
l(ln.updateDialog);
}),bt.on(ln.updateConfirm,"click",function(){
Nt.setSum(110809,52,1),At.isIOS?Pt.jumpUrl(Mn,!0):At.isAndroid&&Pt.jumpUrl(Nn,!0);
})),!1);
}
function tt(e){
for(var t=e.delegatedTarget||e.srcElement,n=t.getAttribute("data-my-id"),o=ln.list.querySelectorAll('.reply_result[data-my-id="'+n+'"]'),i=ln.list.querySelectorAll('.js_reply_div[data-my-id="'+n+'"]'),a=t.getAttribute("data-num"),s=0;s<o.length;s++)d(o[s]);
1===i.length&&d(i[0]),l(t),w({
actiontype:2,
personalCommentId:n,
num:a
});
}
function nt(e){
e&&e.preventDefault(),G(),l(ln.fakebar);
}
function ot(e,t){
return O()?void St.report(19048,_extends({
EventType:1,
IsFans:Gt,
CommentPageType:2
},qt)):(Ct.isNativePage()||(ct.addClass(document.body,Bn),Rn("5"===window.item_show_type||_n?"#191919":"#ffffff")),
t?(An&&console.log("FakeHash on comment"),void U()):(e.preventDefault(),window.__second_open__&&gt.os.ios?U():(An&&console.log("push comment"),
Et.push("comment")),void St.report(19048,_extends({
EventType:1,
IsFans:Gt,
CommentPageType:1
},qt))));
}
function it(e){
window.scrollTo(0,window.scrollY+e.getBoundingClientRect().height);
}
function dt(e){
return e.getBoundingClientRect().top+e.getBoundingClientRect().height>=Ct.getInnerHeight()?!0:!1;
}
function lt(){
Et.on("comment",function(){
ot(null,!0);
}),Et.on("article",function(){
An&&console.log("FakeHash on article"),G();
}),Et.on(function(e){
"comment"===e&&G();
});
}
function at(){
bt.on(ln.input,"input",function(e){
if(In){
var t=ln.input.innerHTML;
""===t||"<br>"===t?(ln.inputHolder.style.display="",ln.input.innerHTML=""):ln.inputHolder.style.display="none";
}
var n=g(ln.input.value||ln.input.innerHTML);
n.length<1?ct.addClass(ln.submit,"btn_disabled"):ct.removeClass(ln.submit,"btn_disabled"),
gt.os.ios&&e.data&&Ln.indexOf(e.data)>-1&&(nn=!0);
}),bt.on(ln.input,"click",function(){
gt.os.ios&&nn&&(ln.input.blur(),ln.input.focus(),nn=!1);
}),bt.on(ln.el_alertConfirm,"click",function(){
ln.el_alertPanel.style.display="none";
}),In&&bt.on(ln.input,"click",function(){
l(document.getElementById("js_emotion_panel_pc"));
}),bt.on(ln.list,"click",".js_comment_praise",Y),bt.on(ln.mylist,"click",".js_comment_praise",Y),
bt.on(ln.fdlist,"click",".js_comment_praise",Y),bt.on(ln.list,"click",".js_reply_praise",Q),
bt.on(ln.fdlist,"click",".js_reply_praise",Q),bt.on(ln.mylist,"click",".js_reply_praise",Q),
bt.on(ln.list,"click",".js_del",X),bt.on(ln.mylist,"click",".js_del",X),bt.on(ln.fdlist,"click",".js_del",X),
bt.on(ln.mylist,"click",".js_reply_del",$),bt.on(ln.list,"click",".js_reply_del",$),
bt.on(ln.list,"click",".js_comment_reply",et),bt.on(ln.mylist,"click",".js_comment_reply",et),
bt.on(ln.list,"click",".js_extend_comment",tt),Ct.listenMpPageAction(function(e){
if("deleteComment"===e.action&&J(document.getElementById("cid"+e.personal_comment_id),e.personal_comment_id),
"deleteCommentReply"===e.action&&(console.log("deleteCommentReply",e.personal_comment_id,e.replyId),
Z(document.getElementById("cid"+e.personal_comment_id),e.personal_comment_id,e.replyId)),
"praiseComment"===e.action){
console.log("praiseComment",e.personal_comment_id,e.reply_id,e.is_like);
var t=[];
t=document.querySelectorAll(e.reply_id&&0!==e.reply_id?'.js_reply_praise[data-my-id="'+e.personal_comment_id+'"][data-reply-id="'+e.reply_id+'"]':'.js_comment_praise[data-my-id="'+e.personal_comment_id+'"]');
var n=!0,o=!1,i=void 0;
try{
for(var d,l=t[Symbol.iterator]();!(n=(d=l.next()).done);n=!0){
var a=d.value;
ct.hasClass(a,"praised")===!e.is_like&&V(a);
}
}catch(s){
o=!0,i=s;
}finally{
try{
!n&&l.return&&l.return();
}finally{
if(o)throw i;
}
}
}
}),bt.on(ln.list,"click",".js_del",function(e){
e.preventDefault();
}),bt.on(ln.mylist,"click",".js_del",function(e){
e.preventDefault();
}),bt.on(ln.fdlist,"click",".js_del",function(e){
e.preventDefault();
}),bt.on(ln.submit,"click",N),bt.on(ln.submit,"click",function(e){
e.preventDefault();
}),ln.goback&&(bt.on(ln.goback,"click",nt),bt.on(ln.goback,"click",nt)),window.__second_open__&&gt.os.ios&&!function(){
bt.on(ln.input,"click",function(){
l(ln.fakebar);
}),bt.on(ln.input,"blur",function(){
"none"!==ln.mine.style.display&&d(ln.fakebar);
});
var e=null,t=null;
bt.on(window,"orientationchange",function(){
"none"!==ln.fakebar.style.display&&(clearTimeout(e),e=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(ln.fakebar).width)&&(clearTimeout(t),
ln.mine.style.height=Ct.getInnerHeight()+"px",window.scrollBy&&window.scrollBy(0,1),
t=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),ln.mine.style.height="";
},100));
},50));
});
}(),bt.on(window,"scroll",v),window.hasRelatedArticleInfo&&bt.on(window,"scroll",j),
In&&bt.on(window,"scroll",I),bt.on(window,"scroll",h),bt.on(document.getElementById("js_cmt_write1"),"click",function(e){
ot(e);
}),bt.on(document.getElementById("js_cmt_write2"),"click",function(e){
ot(e);
}),bt.on(document.getElementById("js_cmt_write3"),"click",function(e){
ot(e);
}),bt.on(document.getElementById("js_cmt_write4"),"click",function(e){
ot(e);
}),bt.on(ln.inputPC,"click",function(){
l(ln.inputPC),ln.containerPC.parentNode.removeChild(ln.containerPC),ln.inputHolder.style.display="",
ln.inputHolder.innerHTML="留言被公众号精选后，将对所有人可见",ln.submit.innerText="留言",document.getElementById("js_cmt_panel_pc").appendChild(ln.containerPC),
wn=!1,d(ln.containerPC),dt(ln.containerPC)&&it(ln.containerPC),K();
}),bt.bindVisibilityChangeEvt(function(e){
e&&Ct.getScrollTop()<ft.getOffset(ln.cmtContainer).offsetTop-Ct.getInnerHeight()&&x({
forceRefresh:!0,
cb:T
});
}),bt.on(ln.showAllWording,"tap",function(e){
e.preventDefault(),l(ln.showAll),d(document.getElementById("js_cmt_statement")),
ln.listContainer.style.height="auto",St.report(18832,_extends({
Actiontype:2,
Type:3,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Pos:0
},Dt)),Nt.setSum(110809,27,1);
});
}
function st(){
function e(){
var e=document.createElement("div"),t="";
e.innerHTML=ln.input.innerHTML;
for(var n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,d=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
d=!0),i){
var l=d?document.createTextNode(i):i;
e.replaceChild(l,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
return t=e.innerHTML;
}
function t(){
vn=vt.getRange();
}
function n(){
if(vn){
var e=vt.getSelection();
if(e.addRange)e.removeAllRanges(),e.addRange(vn);else{
var t=vt.getRange();
t.setEndPoint&&(t.setEndPoint("EndToEnd",vn),t.setEndPoint("StartToStart",vn)),t.select();
}
}
}
function o(){
ln.input.focus(),ln.input.scrollTop=ln.input.scrollHeight,n();
}
function i(){
var e=g(sn).replace(/<br\/>/g,"").replace(/\n/g,"").length;
h.innerText=e,e>600?(w.style.display="",ct.addClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!0):1>e?(w.style.display="none",ct.removeClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!0):(w.style.display="none",ct.removeClass(w,"comment_primary_counter_warn"),
ln.submit.disabled=!1);
}
function s(e,t){
var n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],o=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"],i=void 0;
i=t?o:n;
for(var d=0;d<i.length;d+=2)e=e.replace(new RegExp(i[d],"g"),i[d+1]);
return e;
}
function m(){
document.execCommand("AutoUrlDetect",!1,!1);
var t=e();
t=s(t),sn=Sn.textFilter(t),i();
}
function p(e){
o();
var n=vt.getRange();
if(n){
if(n.createContextualFragment){
e+='<img style="width:1px;height:1px;"></img>';
var i=n.createContextualFragment(e),d=i.lastChild,l=vt.getSelection();
n.deleteContents(),n.insertNode(i),n.setStartBefore(d),n.setEndAfter(d),l.removeAllRanges(),
l.addRange(n),document.execCommand("Delete",!1,null);
}else n.pasteHTML&&e&&(n.pasteHTML(e),n.select(),n.collapse&&n.collapse(!1));
t(),m();
}
}
function _(e){
var t=e.currentTarget,n=t.getAttribute("data-index"),o=f[n].name,i='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"\n      class="icon_emotion_single '+o+'" alt="mo-'+f[n].title+'"></img>';
p(i),Sn.emotionPanelMove();
}
function u(){
for(var e=ln.input,t=void 0,n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,d=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
d=!0),i){
var l=d?document.createTextNode(i):i;
t||(t=l),e.replaceChild(l,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
vt.setCursorToEnd(t);
}
var y=void 0;
vn=vt.getRange();
var f=Sn.edata,w=document.getElementById("js_length_notice_pc"),h=document.getElementById("js_word_length_pc");
gt.os.Mac&&(window.onblur=function(){
ln.input&&"none"!==ln.input.display&&""!==ln.input.innerHTML&&ln.input.blur();
}),bt.on(ln.input,"keyup",function(){
t(),m();
}),bt.on(ln.input,"keydown",function(e){
return 13===e.keyCode?(t(),p("<br/>"),t(),!1):void 0;
}),bt.on(ln.input,"mouseup",function(){
t(),m();
}),bt.on(ln.input,"paste",function(){
y&&clearTimeout(y),y=setTimeout(function(){
return u(),t(),m(),!1;
},10);
}),bt.on(document,"click",function(e){
var t=e.srcElement||e.delegatedTarget,n=document.getElementById("js_emotion_panel_pc");
if((!wn&&!a(t,ln.addbtnPC)||wn&&!a(t,ln.containerPC))&&"none"!==ln.containerPC.style.display){
var o=ln.input.innerHTML;
""===g(o)&&(l(ln.containerPC),d(ln.inputPC),l(n));
}
a(t,n)||a(t,ln.emotionSwitchPC)||"none"===n.style.display||l(n);
},!1),bt.on(ln.expandAndFoldPC,"click",function(){
fn?(b(2),ct.removeClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="展开我的留言",r(),fn=!1,b(1)):(b(2),ct.addClass(ln.expandAndFoldPC,"comment_primary_more_access_unfold"),
ln.expandAndFoldPC.innerHTML="收起我的留言",c(),fn=!0,b(1));
}),xt("li.js_emotion_item").on("click",_);
}
function mt(t){
if(Jt=t.only_fans_can_comment,mn=t.nick_name,Gt=t.is_fans,tn=t.logo_url,Vt=t.comment_count,
un=t.only_fans_days_can_comment,gn=t.is_fans_days,window._has_comment=!0,!kn||0===Number(Zt))return void(window._has_comment=!1);
if(Tn){
var n=e("appmsg/comment_tpl.html.js"),o=e("appmsg/comment_pc_tpl.html.js");
Tn.innerHTML=Bt.tmpl(n,{
new_appmsg:window.new_appmsg
}),Pn.insertAdjacentHTML("afterbegin",Bt.tmpl(o,{
new_appmsg:window.new_appmsg
}));
}
if(xn){
var d=e("appmsg/friend_comment_tpl.html.js");
xn.innerHTML=Bt.tmpl(d,{
new_appmsg:window.new_appmsg
});
}
var l="";
1*window.item_show_type===10&&(l=document.getElementById("js_text_content").innerHTML.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,""));
var a=document.createElement("div");
a.innerHTML=Bt.tmpl(Tt,{
new_appmsg:window.new_appmsg,
isIos:gt.os.ios,
textPageTitle:l
}),document.body.appendChild(a),In?(i("js_cmt_mine"),document.getElementById("js_avatar_pc").src=tn,
ct.addClass(document.body,"pages_skin_pc")):i("js_cmt_addbtn_pc"),ln={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
goback:document.getElementById("js_cmt_goback"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById(In?"js_cmt_mylist_pc":"js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt"),
fakebar:document.getElementById("js_fake_bar"),
showAll:document.getElementById("js_cmt_show_all"),
showAllWording:document.getElementById("js_cmt_show_all_wording"),
listContainer:document.getElementById("js_cmt_list_container"),
cmtContainer:document.getElementById("js_cmt_container"),
inputPC:document.getElementById("js_cmt_input_pc"),
containerPC:document.getElementById("js_cmt_container_pc"),
commentPC:document.getElementById("js_comment_pc"),
addbtnPC:document.getElementById("js_cmt_addbtn_pc"),
myareaPC:document.getElementById("js_cmt_myarea_pc"),
emotionSwitchPC:document.getElementById("js_emotion_wrp_pc"),
expandAndFoldPC:document.getElementById("js_expand_and_fold_pc"),
deletePanel:document.getElementById("js_delete_panel"),
deleteConfirm:document.getElementById("js_delete_confirm"),
deleteCancel:document.getElementById("js_delete_cancel"),
inputHolder:document.getElementById("js_cmt_input_holder"),
emotionPanel:document.getElementById("js_emotion_panel_pc"),
el_alertPanel:document.getElementById("js_alert_panel"),
el_alertContent:document.getElementById("js_alert_content"),
el_alertConfirm:document.getElementById("js_alert_confirm"),
addCmtBtn1:document.getElementById("js_cmt_addbtn1"),
addCmtBtn2:document.getElementById("js_cmt_addbtn2"),
addCmtBtn3:document.getElementById("js_cmt_addbtn3"),
addCmtBtn4:document.getElementById("js_cmt_addbtn4"),
updateDialog:document.getElementById("js_update_dialog"),
updateCancel:document.getElementById("js_update_cancel"),
updateConfirm:document.getElementById("js_update_confirm"),
deleteReplyPanel:document.getElementById("js_delete_reply_panel"),
deleteReplyConfirm:document.getElementById("js_delete_reply_confirm"),
deleteReplyCancel:document.getElementById("js_delete_reply_cancel")
},window.__second_open__&&gt.os.ios&&(ln.mine.style.marginBottom=getComputedStyle(ln.fakebar).height),
!t.notAutoGetComment&&x({
forceRefresh:!0,
cb:T
}),W(),In&&z(),Sn.init(),at(),In&&st();
}
function rt(){
lt();
}
e("biz_common/utils/string/html.js");
var ct=e("biz_common/dom/class.js"),pt=e("appmsg/cmt_tpl.html.js"),_t=e("biz_common/utils/wxgspeedsdk.js"),ut=e("appmsg/comment_report.js"),gt=e("biz_wap/utils/device.js"),yt=e("appmsg/retry_ajax.js"),ft=e("biz_common/dom/offset.js"),wt=e("biz_common/utils/url/parse.js"),ht=e("biz_wap/jsapi/core.js"),Ct=e("common/utils.js"),vt=e("appmsg/emotion/selection.js"),jt=e("appmsg/i18n.js"),bt=e("biz_common/dom/event.js"),It=e("biz_wap/utils/ajax.js"),Bt=e("biz_common/tmpl.js"),Et=e("biz_wap/utils/fakehash.js"),kt=e("appmsg/log.js"),Tt=e("appmsg/my_comment_tpl.html.js"),xt=e("appmsg/emotion/dom.js"),Pt=e("pages/utils.js"),At=e("biz_wap/utils/mmversion.js"),St=e("common/comm_report.js"),Ht=e("biz_wap/utils/position.js"),Lt=e("appmsg/set_font_size.js"),Mt=e("common/color/background_color.js"),Nt=e("biz_wap/utils/jsmonitor_report.js"),Rt=!window.isPaySubscribe||window.isPaySubscribe&&window.isPaid,Dt={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0,
Useruin:1*window.user_uin
},zt=0,Ft=1*window.user_uin;
try{
zt=1*window.atob(window.biz);
}catch(Ot){}
var qt={
BizUin:zt,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0
},Ut={
bizuin:zt,
msgid:window.parseInt(window.mid,10)||0,
itemidx:window.parseInt(window.idx,10)||0,
scene:window.parseInt(window.source,10)||0
},Wt={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},Gt=void 0,Vt=void 0,Yt=void 0,Qt=void 0,Jt=void 0,Xt=void 0,Zt=window.comment_id,$t=0,Kt=void 0,en=!1,tn="",nn=!1,on=0,dn=[],ln={},an=[],sn="",mn="我",rn=0,cn={},pn=Date.now(),_n=!1,un=void 0,gn=void 0,yn=0,fn=!1,wn=!1,hn=[],Cn=[],vn=void 0,jn=100,bn=location.href,In=gt.os.pc,Bn="comment_editing",En="my_comment_empty_data",kn=navigator.userAgent.indexOf("MicroMessenger")>-1,Tn=document.getElementById("js_cmt_area"),xn=document.getElementById("js_friend_cmt_area"),Pn=document.getElementById("js_cmt_container"),An=bn.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1,Sn=e(In?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js"),Hn="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",Ln=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],Mn=window.location.protocol+"//itunes.apple.com/cn/app/id414478124?mt=8&ls=1",Nn=window.location.protocol+"//weixin.qq.com/d",Rn=function(e){
ht.invoke("setNavigationBarColor",{
color:e
}),ht.invoke("setBounceBackground",{
backgroundColor:e
});
},Dn=window.isOldVideoPage;
if(!Ct.isNativePage()){
var zn=["#ffffff"];
zn.push(ct.hasClass(document.body,Bn)?"#191919":"#232323"),Mt.set({
nav:zn,
top:zn,
bottom:["#f2f2f2","#191919"]
});
}
return window.pageCommentReportData&&window.pageCommentReportData.idkey&&(An&&console.log("init reportData"),
Wt=window.pageCommentReportData),"undefined"!=typeof window.comment_id?Zt=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(Zt=window.cgiData.comment_id),
kn||(Tn&&(Tn.style.display="none"),xn&&(xn.style.display="none"),Zt=0),An&&console.info("[图文评论] 评论ID:",Zt),
rt(),{
initComment:mt,
getCommentData:x,
renderComment:T
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js","appmsg/loading.js","biz_wap/utils/device.js","appmsg/pay_report_utils.js","pages/utils.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,i){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:i||"success"
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
commonUtils.isNativePage()?showAppToast("发送中","loading"):Loading.show("发送中");
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):Loading.hide();
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function newAlert(e){
el_alertContent.innerHTML=e,el_alertPanel.style.display="";
}
function alert2(e){
"0"===window.item_show_type?newAlert(e):alert(e);
}
function failAlert(e){
return e&&e.length>maxLikeCommentWord?void alert2("想法不可以超过%s字".replace("%s",maxLikeCommentWord)):void alert2("网络异常，请稍后重试");
}
function isAppCommentAvailable(){
return mmversion.isWechat?Device.os.ipad?!1:mmversion.isInMiniProgram?!1:mmversion.isIOS&&mmversion.gtVersion("7.0.8")?!0:mmversion.isAndroid&&mmversion.gtVersion("7.0.8")?!0:commonUtils.isNativePage()&&(mmversion.isIOS||mmversion.isAndroid)?!0:!1:!1;
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,haokanLock=!1,startY,jumpWowLock=!1,el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_toastMsg=qs("js_toast_msg"),el_likeEducate=qs("js_like_educate"),el_friend_like=qs("js_friend_like_area"),el_go_wow=qs("js_go_wow"),el_likeComment=qs("js_like_comment"),el_bcommentPanel2=qs("js_comment_panel"),el_likeCommentShare=qs("js_like_comment_share"),el_likeCommentText=qs("js_comment_text"),el_commentCancel=qs("js_comment_cancel"),el_commentConfirm=qs("js_comment_confirm"),el_commentErrorMsg=qs("js_like_comment_msg"),el_commentCurrentCount=qs("js_like_current_cnt"),el_commentArea=qs("js_comment_area"),el_panelLikeTitle=qs("js_panel_like_title"),el_wowClosePanel=qs("wow_close_inform"),el_wowCloseAck=qs("wow_close_ack"),el_alertPanel=qs("js_alert_panel"),el_alertContent=qs("js_alert_content"),el_alertConfirm=qs("js_alert_confirm");
if(el_like&&el_likeNum){
window.appmsg_like_type&&2===window.appmsg_like_type?jsmonitorReport.setSum(114217,0,1):window.appmsg_like_type&&1===window.appmsg_like_type&&jsmonitorReport.setSum(114217,1,1);
var like_report=function(){
var e=el_like.getAttribute("like"),i=el_likeNum.innerHTML,t=parseInt(e)?parseInt(e):0,o=t?0:1,n=parseInt(i)?parseInt(i):0,s=opt.appmsgid||opt.mid,l=opt.itemidx||opt.idx;
if(t){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),n>0&&"100000+"!==i&&(el_likeNum.innerHTML=n-1==0?"赞":n-1);
}else if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==i&&(el_likeNum.innerHTML=n+1);else if(2===appmsg_like_type)return void initRecommendPanel();
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+o+"&f=json&appmsgid="+s+"&itemidx="+l,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
action_type:o?1:2,
device_type:window.devicetype
},
type:"POST"
});
},initRecommendPanel=function(){
sendRecommendAjax(1,"",1);
},isBeenUnvisible=function(e){
function i(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
}
return e.offsetTop+el_likeComment.offsetHeight-i()>=commonUtils.getInnerHeight()?!0:!1;
},disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var i=e.target;
"TEXTAREA"!==i.tagName&&"BUTTON"!==i.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var i=e.targetTouches||[];
if(i.length>0){
var t=i[0]||{};
startY=t.clientY;
}
},preventText=function(e){
var i=!1,t=e.changedTouches,o=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(t.length>0){
var l=t[0]||{},a=l.clientY;
i=a>startY&&0>=o?!1:startY>a&&o+n>=s?!1:!0,i||e.preventDefault();
}
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},validataComment=function(e,i){
var t=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,t,i);
},showEducatePanel=function(e,i,t){
show(el_likeComment);
var o=window.source||window.cgiData&&window.cgiData.source||0;
return o&&(o=parseInt(o,10),94===o)?void(e&&5===e&&hide(el_likeComment)):void(i||(show(el_likeEducate),
t&&t>0&&(el_friend_like.innerHTML="%s位朋友也在看,".replace("%s",t),document.getElementById("js_friend_like_word").innerText="前往“发现”-“看一看”浏览",
show(el_friend_like)),1===showType&&(hide(el_go_wow),hide(el_likeCommentShare)),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment),educateExpose()));
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"10万+"!==e&&(el_likeNum.innerHTML=formatReadNum(realLikeNum));
},setLike2Status=function(e,i,t){
var o="在看";
switch(showType){
case 1:
switch(prompted){
case 0:
showEducatePanel(e,i,t),show(el_likeComment),prompted=1;
break;

case 1:
hide(el_likeEducate),showToast(o);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),clear(el_likeCommentText),prompted){
case 0:
showEducatePanel(e,i,t),5===e&&hide(el_likeCommentShare);
break;

case 1:
(4===e||5===e)&&showToast(4===e?"已发送":o);
}
5!==e&&(4===e&&"none"!==el_likeEducate.style.display?hide(el_likeCommentShare):4===e?hide(el_likeComment):(show(el_commentArea),
show(el_likeCommentShare),1===prompted&&hide(el_likeEducate),show(el_likeComment),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment))),4!==e&&setBtnLike(),
prompted=1;
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
}),log("[Appmsg] zaikan set like success");
},unsetLike2Status=function(e){
1===e?setTimeout(function(){
alert2(" 已取消，想法已同步删除");
},20):showToast("已取消"),2===showType&&isShow(el_likeComment)&&hide(el_likeComment);
var i=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_likeComment&&hide(el_likeComment),
realLikeNum-=1,realLikeNum>=0&&"10万+"!==i&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),
log("[Appmsg] zaikan set unlike success");
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType){
if(!haokanLock){
log("[Appmsg] prepare to send appmsg like request"),showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
like?(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(12),action_type=type):(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(13),
action_type=2),ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
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
hideLoading(),log("[Appmsg] success send appmsglike like "+like+" return value is "+JSON.stringify(res)),
0==data.base_resp.ret?(like?setLike2Status(type,data.is_eu_user,data.friend_like_num):unsetLike2Status(data.has_comment),
connectWithApp(like,comment,clientType)):failAlert(comment);
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
};
JSAPI.on("menu:haokan",function(e){
var i=0===parseInt(e.recommend)?0:1;
if(0===i)sendRecommendAjax(i,"",2,clientShowType);else{
var t="";
t=e.comment;
var o=1===e.scene?4:5;
sendRecommendAjax(i,t,o,clientShowType);
}
});
var connectWithApp=function(e,i){
var t={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:i?i:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(t)
},function(e){
console.log("handleHaokanAction",e);
}),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
});
},goWoW=function(){
jumpWowLock||(jumpToWowClickReport(),jumpWowLock=!0,JSAPI.invoke("handleHaokanAction",{
action:"jumpToWow",
extParams:JSON.stringify({
autoDropLoad:!0
})
},function(e){
jumpWowLock=!1,console.log("jumpToWow",e),e.err_msg&&"handleHaokanAction:fail_entrance_not_open"===e.err_msg?show(el_wowClosePanel):"handleHaokanAction:fail  action not support"===e.err_msg||"handleHaokanAction:fail, action not support"===e.err_msg?alert2("微信版本过低，暂不支持该操作"):"handleHaokanAction:ok"===e.err_msg&&hide(el_likeComment),
JSAPI.invoke("handleHaokanAction",{
action:actionString,
server_data:JSON.stringify({
origin:"mp",
autoDropLoad:!0
})
},function(e){
console.log("sendAutoDropLoad",e);
});
}));
},likeClickReport=function(){
ajax({
url:"/mp/appmsgreport?action=appmsglikeclickcomment&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
});
},likeExpose=function e(){
var i=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,t=qs("like3").offsetTop,o=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
i+commonUtils.getInnerHeight()>t&&t>=i&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+o+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
},educateExpose=function i(){
var e=(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,
opt.appmsgid||opt.mid),t=opt.itemidx||opt.idx,o=window.item_show_type,n=window.enterid||window.cgiData&&window.cgiData.enterid||"";
el_likeEducate&&"none"!=el_likeEducate.style.display&&commonUtils.getInnerHeight()>el_likeEducate.getBoundingClientRect().top&&el_likeEducate.getBoundingClientRect().top+el_likeEducate.getBoundingClientRect().height>0&&(ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,t,window.source,window.subscene,1,o,sessionid,n]
},
async:!1,
timeout:2e3
}),DomEvent.off(window,"scroll",i));
},jumpToWowClickReport=function(){
var e=opt.appmsgid||opt.mid,i=opt.itemidx||opt.idx,t=window.enterid||window.cgiData&&window.cgiData.enterid||"";
ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,i,window.source,window.subscene,2,window.item_show_type,sessionid,t]
},
async:!1,
timeout:2e3
});
};
DomEvent.on(el_alertConfirm,"click",function(){
el_alertPanel.style.display="none";
}),DomEvent.on(el_like,"click",function(e){
var i=el_like.getBoundingClientRect();
return log("[Appmsg zaikan location] top: "+i.top+" left: "+i.left+" bottom: "+i.bottom+" right: "+i.right),
log("[Appmsg zaikan click] clientX: "+e.clientX+" clientY: "+e.clientY),e.currentTarget.classList.contains("js_disabled")?!1:(like_report(e),
!1);
}),DomEvent.on(el_wowCloseAck,"click",function(){
hide(el_wowClosePanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_commentConfirm,"mousedown",function(){
validataComment(el_likeCommentText,4);
}),DomEvent.on(el_commentCancel,"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_likeCommentShare,"click",function(){
return commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:window.isOldVideoPage?"black":"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,1*window.item_show_type===10&&(el_panelLikeTitle.innerHTML=window.msg_title.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,"")),
show(el_bcommentPanel2),el_likeCommentText.focus(),el_commentConfirm.setAttribute("disabled","disabled"),
disableMove(),void likeClickReport());
}),DomEvent.on(el_likeCommentText,"focus",function(){}),DomEvent.on(el_likeCommentText,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose),DomEvent.on(window,"scroll",educateExpose),
DomEvent.on(el_go_wow,"click",goWoW);
var scrollToShow=function(e){
e.scrollIntoView(!1);
};
DomEvent.on(el_likeCommentText,"input",function(e){
var i=el_likeCommentText.value.replace(/^\s+|\s+$/g,"");
i.length>maxLikeCommentWord?(el_commentCurrentCount.innerHTML=i.length,vShow(el_commentErrorMsg)):vHide(el_commentErrorMsg),
i.length>0&&i.length<=maxLikeCommentWord?el_commentConfirm.removeAttribute("disabled"):el_commentConfirm.setAttribute("disabled","disabled"),
Device.os.ios&&e.data&&doubleInputChar.indexOf(e.data)>-1&&(focusTag=!0);
}),DomEvent.on(el_likeCommentText,"click",function(){
Device.os.ios&&focusTag&&(el_likeCommentText.blur(),el_likeCommentText.focus(),focusTag=!1);
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,o=i.likeNumDom,n=document.getElementById("js_like_btn");
t&&(t.style.display=i.likeAreaDisplayValue,t.style.visibility="",i.liked&&(1===appmsg_like_type?Class.addClass(t,i.className):Class.addClass(n,i.className)),
t.setAttribute("like",i.liked?"1":"0"));
var s=1===appmsg_like_type?"赞":"";
realLikeNum=i.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
o&&(o.innerHTML=realLikeNum)):2===appmsg_like_type&&(o.innerHTML=formatReadNum(realLikeNum));
}
}
function showReadNum(e){
var i=e||{},t=1586325600,o="undefined"!=typeof window.ct?parseInt(window.ct):0;
if(i.show){
var n=i.readAreaDom,s=i.readNumDom;
n&&(n.style.display=i.readAreaDisplayValue);
var l=i.readNum||1,a=window.ori_send_time||window.cgiData&&window.cgiData.ori_send_time||0,m=/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),r=1566025200,p=1565971200,c=Device.os.ios||m?r:p;
parseInt(a,10)>c&&window.item_show_type&&"5"===window.item_show_type&&(t>o?("en"!=LANG&&(document.getElementById("readTxt").innerText="播放"),
l=i.videouv||0):("en"!=LANG&&(document.getElementById("readTxt").innerText="观看"),
l=i.readNum||0)),1===appmsg_like_type?(parseInt(l)>1e5?l="100000+":"",s&&(s.innerHTML=l)):2===appmsg_like_type&&(s.innerHTML=formatReadNum(l),
""===s.innerHTML&&(s.innerHTML="0"));
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),Base64=require("biz_common/base64.js"),jsmonitorReport=require("biz_wap/utils/jsmonitor_report.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),Loading=require("appmsg/loading.js"),realLikeNum,clientShowType=5,Device=require("biz_wap/utils/device.js"),payReportUtils=require("appmsg/pay_report_utils.js"),_require=require("pages/utils.js"),formatReadNum=_require.formatReadNum,maxLikeCommentWord=200,focusTag=!1,doubleInputChar=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"];
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("appmsg/related_article.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","appmsg/related_article_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","common/utils.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","appmsg/i18n.js","common/comm_report.js","appmsg/related_article_feedback.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/set_font_size.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function t(){
return document.documentElement.scrollTop||document.body.scrollTop;
}
function i(e){
var t=document.createElement("div");
return t.innerHTML=e,t.childNodes;
}
function n(){
x.setSum(110809,24,1),h.report(18832,_extends({
Actiontype:2,
Type:2,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Mmversion:O,
Pos:0
},N));
}
function o(){
n();
var e="https://mp.weixin.qq.com/mp/relatedarticle?action=page&begin=0&article_url="+window.encodeURIComponent(location.href)+"&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sessionid="+(window.enterid||"")+"&enterid="+parseInt(Date.now()/1e3,0)+"&scene_from="+window.source+"&subscene_from="+window.subscene+"#wechat_redirect";
return z.isWechat?(z.isAndroid&&u.invoke("checkJsApi",{
jsApiList:["currentMpInfoHide"]
},function(e){
try{
e.err_msg.indexOf("ok")>-1&&u.invoke("currentMpInfoHide");
}catch(t){
console.log(t);
}
}),w.openUrlWithExtraWebview(e)):window.open(e),!1;
}
function s(e){
e?(R.style.display="none",S.style.display=""):(R.style.display="",S.style.display="none");
}
function r(e){
Q=!0,e&&(H.style.display=""),S.style.display="none",R.style.display="none";
}
function a(e){
var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=arguments.length<=2||void 0===arguments[2]?L:arguments[2];
p({
url:"/mp/relatedarticle?action=getlist&count="+n+"&begin="+t+"&article_url="+window.encodeURIComponent(location.href)+"&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx,
type:"GET",
dataType:"json",
success:function(s){
s&&s.list&&s.list.length>0&&(window.has_related_article=!0);
var a=function(){
if(s&&s.base_resp&&1*s.base_resp.ret===0)if(W=s.article_size||0,0===s.list.length)P?r(0!==t):f.addClass(T,"hide");else{
B.style.display="block";
var e=s.list.map(function(e){
if("en"===window.LANG)e.read_num_wording=j.dealLikeReadShow_en(e.read_num);else if(window.parseInt(e.read_num)>1e5)e.read_num_wording="10万+";else if(window.parseInt(e.read_num)>1e4&&window.parseInt(e.read_num)<=1e5){
var t=""+window.parseInt(e.read_num)/1e4,i=t.indexOf(".");
e.read_num_wording=-1===i?t+"万":t.substr(0,i)+"."+t.charAt(i+1)+"万";
}else e.read_num_wording=0===window.parseInt(e.read_num)?"":e.read_num;
var n=parseInt(e.pay_cnt,10);
return e.pay_cnt_wording=n>=1e4||1*e.is_pay_cnt_cut===1?"en"===window.LANG?"10k+":"1万+":n+"",
e;
});
M&&window.WX_BJ_REPORT.BadJs.report("list.length","list.length:"+e.length,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
isPc:P
},
uin:window.user_uin
}),e.length!==n&&window.WX_BJ_REPORT.BadJs.report("list is no match","list.length:"+e.length+"|count:"+n,{
mid:"mmbizwap:related_monitor",
_info:{
relatedArticleFlag:window.relatedArticleFlag,
list:e,
isPc:P
},
uin:window.user_uin
});
for(var a=m.tmpl(_,{
list:e,
reason:F,
begin:t
}),d=i(a),l=0;l<d.length;l++)E.appendChild(d[l].cloneNode(!0));
P?(s.list.length<n||s.article_size<=t+n)&&r(0!==t):s.article_size===n?(J=!1,f.addClass(T,"hide")):s.article_size>n&&(J=!0,
f.removeClass(T,"hide"),g.on(T,"click",o)),window.ipados13_font_scale&&A(E,window.ipados13_font_scale/100);
}
};
"function"==typeof e?e("sucess",a):a();
},
error:function(){
"function"==typeof e&&e("error");
}
});
}
function d(){
for(var e=document.getElementsByClassName("js_related_item"),i=t(),n=0;n<e.length;n++){
var o=e[n];
1*o.getAttribute("data-hasreport")!==1&&o.clientHeight+o.offsetTop>=i+o.clientHeight/2&&o.clientHeight+o.offsetTop<=i+o.clientHeight/2+y.getInnerHeight()&&!function(e,t){
var i=e.getAttribute("data-url"),n=e.getAttribute("data-time"),o=e.getAttribute("data-recalltype"),s=e.getAttribute("data-isreaded");
e.setAttribute("data-hasreport",1),x.setSum(110809,21,1),h.report(18832,_extends({
Actiontype:1,
Type:1,
Bizuin:b.getQuery("__biz",i),
Msgid:window.parseInt(b.getQuery("mid",i),10)||0,
Itemidx:window.parseInt(b.getQuery("idx",i),10)||0,
Sendtimestamp:window.parseInt(n)||0,
Pos:t+1,
Recalltype:1*o,
Mmversion:O,
Isreaded:1*s
},N));
}(o,n);
}
W>1&&1*T.getAttribute("data-hasreport")!==1&&T.clientHeight+T.offsetTop>=i+T.clientHeight/2&&T.clientHeight+T.offsetTop<=i+T.clientHeight/2+y.getInnerHeight()&&!function(e){
e.setAttribute("data-hasreport",1),x.setSum(110809,22,1),h.report(18832,_extends({
Actiontype:1,
Type:2,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Mmversion:O,
Pos:0
},N));
}(T);
}
function l(){
n(),s(!0),X+=L,a(function(e,t){
s(!1),"sucess"===e&&t();
},X);
}
function c(){
g.on(E,"click",".js_related_item",function(e){
var t=e.delegatedTarget,i=t.getAttribute("data-url"),n=t.getAttribute("data-time"),o=t.getAttribute("data-recalltype"),s=t.getAttribute("data-isreaded"),r=(1*t.getAttribute("data-idx")||0)+1;
x.setSum(110809,23,1),h.report(18832,_extends({
Actiontype:2,
Type:1,
Bizuin:b.getQuery("__biz",i),
Msgid:window.parseInt(b.getQuery("mid",i),10)||0,
Itemidx:window.parseInt(b.getQuery("idx",i),10)||0,
Sendtimestamp:window.parseInt(n)||0,
Pos:r,
Recalltype:1*o,
Isreaded:1*s,
Mmversion:O
},N)),z.isWechat?w.openUrlWithExtraWebview(i):window.open(i);
}),g.on(E,"touchstart",".js_related_item",function(e){
e.stopPropagation();
var t=e.delegatedTarget;
f.addClass(t,"card_custom_active");
},!1),g.on(E,"touchend",".js_related_item",function(e){
e.stopPropagation();
var t=e.delegatedTarget;
f.removeClass(t,"card_custom_active");
},!1),g.on(window,"scroll",d),P&&(g.on(R,"click",l),g.on(C,"click",function(){
C.style.display="none",l();
})),v.init({
container:E,
biz:window.biz,
mid:window.mid,
idx:window.idx,
dislikeCb:function(e){
1===E.children.length&&(P&&!Q?(R.style.display="none",C.style.display=""):!P&&J?(E.style.display="none",
T.style.display="none",k.style.display="",g.off(T,"click",o),g.on(k,"click",o)):B.style.display="none"),
e.parentNode.removeChild(e);
}
});
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/tmpl.js"),p=e("biz_wap/utils/ajax.js"),u=e("biz_wap/jsapi/core.js"),_=e("appmsg/related_article_tpl.html.js"),w=e("biz_wap/utils/openUrl.js"),g=e("biz_common/dom/event.js"),y=e("common/utils.js"),f=e("biz_common/dom/class.js"),b=e("biz_common/utils/url/parse.js"),j=e("appmsg/i18n.js"),h=e("common/comm_report.js"),v=e("appmsg/related_article_feedback.js"),z=e("biz_wap/utils/mmversion.js"),I=e("biz_wap/utils/device.js"),A=e("appmsg/set_font_size.js").setFontSize,x=e("biz_wap/utils/jsmonitor_report.js"),B=document.getElementById("js_related_area"),E=document.getElementById("js_related"),T=document.getElementById("js_related_load_more"),k=document.getElementById("js_more_article"),R=document.getElementById("js_related_load_more_pc"),S=document.getElementById("js_related_loading_pc"),C=document.getElementById("js_more_article_pc"),H=document.getElementById("js_related_all_pc"),M=100*Math.random()<1;
M&&window.WX_BJ_REPORT.BadJs.report("relatedArticleFlag","value:"+window.relatedArticleFlag,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var P=I.os.ipad||!z.isIOS&&!z.isAndroid,O=0;
z.isIOS?O=1:z.isAndroid&&(O=2);
var W=0,J=!1,N={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0
},F=[{
name:"内容质量低",
value:1
},{
name:"不看此公众号",
value:2
}],L=1;
if(P)L=3;else if(window.user_uin){
var U=Number((window.user_uin+"").slice(-5,-2));
L=U>=50&&150>U?3:1;
}else L=1;
M&&window.WX_BJ_REPORT.BadJs.report("RELATED_ARTICLE_COUNT","count:"+L,{
mid:"mmbizwap:related_monitor",
uin:window.user_uin
});
var Q=!1,X=0;
return P&&(document.getElementById("js_related_opr").style.display="none",document.getElementById("js_related_opr_pc").style.display=""),
c(),a;
});