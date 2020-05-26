define("a/a_sign.js",["biz_wap/jsapi/core.js","biz_common/jquery.md5.js"],function(e){
"use strict";
function n(e,n){
var o="";
if(e.beforeSign)o=e.beforeSign;else{
return n(0,0,0,0,{});
var t,r,a;
}
r=window.md5(o),i.invoke("calRqt",{
rqt:r
},function(e){
var i,o,c;
e.data&&e.k1&&e.k2?(i=encodeURIComponent(e.data),o=e.k1,c=e.k2,!t&&n(i,o,c,r,a)):!t&&n(0,0,0,r,a),
t=!0;
}),setTimeout(function(){
!t&&n(0,0,0,r,a),t=!0;
},e.timeout||500);
}
var i=e("biz_wap/jsapi/core.js");
return e("biz_common/jquery.md5.js"),{
createSign:n
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n          <div class="discuss_container_hd">\n            <h2 class="rich_media_title">\n                <#if(window.item_show_type == 10){#>\n                    <#=textPageTitle#>\n                <#}else{#>\n                    <#=window.msg_title.html(1)#>\n                <#}#>\n            </h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                            <img class="pic_default_primary" src="<#=window.icon_emotion_switch_primary#>" alt="">\n                            <img class="pic_active_primary" src="<#=window.icon_emotion_switch_active_primary#>" alt="">\n                        </span>\n                    </div>\n                </span>\n            </div>\n            <div class="emotion_panel" id="js_emotion_panel">\n                <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                    <i class="emotion_panel_arrow arrow_out"></i>\n                    <i class="emotion_panel_arrow arrow_in"></i>\n                </span>\n                <div class="emotion_list_wrp" id="js_slide_wrapper">\n                    <!--<ul class="emotion_list"></ul>-->\n                    <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                </div>\n                <ul class="emotion_navs" id="js_navbar">\n                    <!--<li class="emotion_nav"></li>-->\n                </ul>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n          </div>\n          <div class="discuss_container_bd">\n            <div class="" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n            <div class="weui-dialog__wrp weui-transition_opacity-hide" id="js_delete_panel_mobile">\n                <div class="weui-mask"></div>\n                <div class="weui-dialog">\n                    <div class="weui-dialog__bd">确定删除留言吗？</div>\n                    <div class="weui-dialog__ft">\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" id="js_delete_cancel_mobile">取消</a>\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="js_delete_confirm_mobile">删除</a>\n                    </div>\n                </div>\n            </div>\n          </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title.html(1)#></h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n<div class="weui-webview-nav" style="display:none;" id="js_fake_bar">\n    <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n    <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" \n    id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" \n    data-elected="<#=report_elected#>" \n    data-friend="<#=report_friend#>" \n    data-content_id="<#=content_id#>"\n    >\n    <div class="discuss_item_hd">\n      <div class="user_info">\n          <div class="nickname_wrp">\n            <img class="avatar" src="<#=logo_url#>">\n            <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n            <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n          </div>\n      </div>\n      <div class="discuss_opr">\n          <# if (is_from_me == 1) { #>\n            <a class="discuss_opr_meta discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n          <# } #>\n          <# if(is_elected == 1){ #>\n          <span class="discuss_opr_meta media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>" data-my-id=\'<#=my_id#>\'>\n              <i class="icon_praise_gray"></i>\n              <span class="praise_num" data-num="<#=like_num#>" data-like="<#=like_status#>"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n          </span>\n          <# } else { #>\n            <span class="discuss_opr_meta">未精选</span>\n          <# } #>\n      </div>\n    </div>\n\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content js_comment_content" data-content="<#=content#>" data-my-id="<#=my_id#>"><#=content#></div>\n    </div>\n    <# if(reply_new && reply_new.reply_list && reply_new.reply_list.length > 0){ #>\n        <# for(var i = 0; i < reply_new.reply_list.length; i++){ #>\n            <div class="reply_result js_reply_item <# if (reply_new.reply_list[i].is_same) {#> reply_result_same <# } #>" <#if (i>=3 && type != \'mine\'){ #> style="display:none" <# } #> data-my-id="<#=my_id#>">\n                <div class="discuss_item_hd">\n                    <# if(reply_new.reply_list[i].is_from_author == 1){ #>\n                        <div class="user_info author_info">\n                        <div class="nickname_wrp">\n                            <div class="nickname">作者</div>\n                        </div>\n                        </div>\n                    <# } else { #>\n                        <div class="user_info">\n                            <div class="nickname_wrp">\n                            <img class="avatar" src="<#=logo_url#>">\n                            <strong class="nickname"><#=nick_name#></strong>\n                            </div>\n                        </div>\n                    <# } #>\n                    <div class="discuss_opr">\n                        <# if(reply_new.reply_list[i].reply_del_flag == 0){ #>\n                            <# if (reply_new.reply_list[i].is_from_me == 1) { #>\n                                <a class="discuss_opr_meta discuss_del js_reply_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>" data-reply-id="<#=reply_new.reply_list[i].reply_id#>">删除</a>\n                            <# } #>\n                            <# if (reply_new.reply_list[i].reply_is_elected == 1){ #>\n                                <span class="discuss_opr_meta media_tool_meta meta_praise js_reply_praise <# if(reply_new.reply_list[i].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply_new.reply_list[i].reply_like_status#>" data-content-id="<#=content_id#>" data-my-id="<#=my_id#>" data-reply-id=\'<#=reply_new.reply_list[i].reply_id#>\' data-scene="<#=scene#>">\n                                    <i class="icon_praise_gray"></i>\n                                    <span class="praise_num"  data-num="<#=reply_new.reply_list[i].reply_like_num#>" data-like="<#=reply_new.reply_list[i].reply_like_status#>"><# if(reply_new.reply_list[i].reply_like_num_format !== 0){ #><#=reply_new.reply_list[i].reply_like_num_format#> <# } #></span>\n                                </span>\n                            <# } else { #>\n                                <span class="discuss_opr_meta js_reply_elect_status" data-reply-id=\'<#=reply_new.reply_list[i].reply_id#>\' data-my-id="<#=my_id#>">未精选</span>\n                            <# } #>\n                        <# } #>\n                    </div>\n                </div>\n                <div class="discuss_message">\n                        <# if(reply_new.reply_list[i].reply_del_flag == 1){ #>\n                            <div class="discuss_message_content discuss_message_del">此回复已被删除</div>\n                        <# } else { #>\n                            <div class="discuss_message_content js_reply_content" data-reply-id="<#=reply_new.reply_list[i].reply_id#>" data-my-id="<#=my_id#>" data-content="<#=reply_new.reply_list[i].content#>"><#=reply_new.reply_list[i].content#></div>\n                        <# } #>\n                </div>\n            </div>\n        <# } #>\n    <# } #>\n    <# if(replyListCount > 3 && type != \'mine\'){ #>\n    <div class="discuss_extra_info js_extend_comment discuss_more_access" data-my-id="<#=my_id#>" data-num="<#=replyListCount-3#>">余下<#= replyListCount-3 #>条</div>\n    <# } #>\n    <!-- 上线前暂时隐藏回复入口 -->\n    <# if (supportReply) { #>\n    <p class="discuss_extra_info js_reply_div" data-my-id="<#=my_id#>" <#if (replyListCount > 3 && type != \'mine\'){ #> style="display:none" <# } #>>\n        <a class="js_comment_reply" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">回复</a>\n    </p>\n    <# } #>\n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"  data-num="<#=like_num#>"  data-like="<#=like_status#>"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply_new && reply_new.reply_list && reply_new.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply_new.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply_new.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply_new.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"  data-num="<#=reply_new.reply_list[0].reply_like_num#>" data-like="<#=reply_new.reply_list[0].reply_like_status#>"><# if(reply_new.reply_list[0].reply_like_num_format !== 0){ #><#=reply_new.reply_list[0].reply_like_num_format#> <# } #></span> \n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply_new.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply_new.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js","biz_common/dom/class.js"],function(e,n){
"use strict";
function t(){
h.WIDTH=D=f("#js_article").width()||f("#js_cmt_mine").width(),h.pageCount=M=i(),
o(),a(),s();
}
function i(){
d=D-2*W,S=parseInt(d/A),R=3*S-1;
var e=parseInt(Z/R);
return Z%R!==0&&e++,e;
}
function o(){
var e=f("#js_slide_wrapper"),n=h.wrapperWidth=M*D;
e.css({
width:n+"px"
});
}
function a(){
for(var e=f("#js_slide_wrapper").el[0],n=(D-S*A)/2,t=0,i=M;i>t;t++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),e.appendChild(o),f(o).css({
width:D+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),r(o,t,n);
}
}
function s(){
for(var e=f("#js_navbar"),n=0,t=M;t>n;n++){
var i=f(f.el("li"));
i.attr("class","emotion_nav js_emotion_nav"),P.push(i),e.append(i);
}
h.navs=P;
}
function r(e,n,t){
for(var i=0,o=R;o>i;i++){
var a=document.createElement("li");
if(H++,H>Z)break;
a=c(H),f(e).append(a);
}
var s=m(t);
f(e).append(s);
}
function c(e){
var n=f(f.el("li")),t=f(f.el("i")),i=0;
t.attr("class","icon_emotion icon"+e),t.css({
"background-position":"0px "+((1-e)*B-i)+"px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",e);
var o=A+"px";
return n.css({
width:o,
height:o
}),n.append(t),n;
}
function m(e){
var n=f(f.el("li")),t=f(f.el("i"));
n.attr("class","emotion_item del js_emotion_item"),n.attr("data-index",-1),t.attr("class","icon_emotion del");
var i=A+"px";
return n.css({
width:i,
height:i,
right:e+"px"
}),n.append(t),n;
}
function l(){
function e(){
o.show(),x.show(),i.blur(),f.later(function(){
i.blur();
});
}
function n(){
o.hide(),x.hide(),i.focus(),f.later(function(){
i.focus();
});
}
x=f("#js_emotion_panel");
var t=f("#js_cmt_input"),i=t.el[0],o=f("#js_emotion_panel_arrow_wrp"),a=document.getElementById("js_emotion_switch"),s="emotion_switch_current";
x.hide(),f("#js_emotion_switch").on("tap",function(t){
console.log("emotion click"),t.preventDefault(),t.stopPropagation(),w=!w,w?(e(),
I.addClass(a,s)):(n(),I.removeClass(a,s));
}),t.on("tap",function(){
x.hide(),w=!1;
});
}
function p(){
function e(e){
if(!h.isMoved){
var n=f(e.currentTarget),t=+n.attr("data-index");
g.inputEmotion(t);
}
}
f("li.js_emotion_item").on("click",e),f("li.js_emotion_item").on("touchend",e);
}
function u(e){
var n=b.filter(function(n){
for(var t=0;t<T.length;t++){
var i=T[t];
if(n[i]){
var o=new RegExp(n[i].replace("[","\\[").replace("]","\\]"),"g"),a=e.match(o);
if(a)return!0;
}
}
});
return n&&n.length>0?n[0]:null;
}
function _(e){
for(var n=[],t=0;t<b.length;t++){
for(var i=b[t],o=0;o<T.length;o++){
var a=T[o];
if(i[a]){
var s=new RegExp(i[a].replace("[","\\[").replace("]","\\]"),"g"),r=e.match(s);
if(r){
n=n.concat(r);
continue;
}
}
}
if(i.emoji){
var s=new RegExp(i.emoji,"g"),r=e.match(s);
r&&(n=n.concat(r));
}
}
return f.each(n,function(n){
var t;
if(void 0!==O[n]){
var i=O[n],o=z[i];
t='<i class="icon_emotion_single '+o+'"></i>',e=e.replace(n,t);
}else{
var a=u(n);
a&&a.style&&(t='<i class="icon_emotion_single '+a.style+'"></i>',e=e.replace(n,t));
}
}),e;
}
for(var d,f=e("appmsg/emotion/dom.js"),v=e("appmsg/emotion/slide.js"),h=e("appmsg/emotion/common.js"),j=e("appmsg/emotion/nav.js"),g=e("appmsg/emotion/textarea.js"),n=(f.each,
{}),w=!1,x=null,b=e("biz_common/utils/emoji_data.js"),E=e("biz_common/utils/emoji_panel_data.js"),I=e("biz_common/dom/class.js"),k={},O={},z=[],T=["cn","us","hk"],C=0;C<b.length;C++){
var N=b[C];
k[N.id]=N;
}
for(var C=0;C<E.length;C++){
var y=E[C],N=k[y];
O[N.cn]=C,N.us&&(O[N.us]=C),N.hk&&(O[N.hk]=C),N.emoji&&(O[N.emoji]=C),z.push(N.style);
}
var M,R,S,D,P=[],W=15,Z=h.EMOTIONS_COUNT,A=h.EMOTION_LI_SIZE,B=h.EMOTION_SIZE;
n.init=function(){
l(),t(),v.init(),j.activeNav(0),p(),g.init();
};
var H=0;
return n.encode=function(e){
e=_(e);
var n=/\/([\u4e00-\u9fa5\w]{1,4})/g,t=e.match(n);
return t?(f.each(t,function(n){
var t=n.replace("/",""),i=[t.slice(0,4),t.slice(0,3),t.slice(0,2),t.slice(0,1)];
f.each(i,function(n){
if(void 0!==O["["+n+"]"]){
var t=O["["+n+"]"],i=z[t],o='<i class="icon_emotion_single '+i+'"></i>';
e=e.replace("/"+n,o);
}
});
}),e):e;
},n.hidePannel=function(){
x.hide();
},n;
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>话题</span>\n            <span class="topic_info_primary">相关文章{msg_num}篇</span>\n        </span>\n    </span>\n</span>\n';
});define("pages/weapp_tpl.html.js",[],function(){
return'<span class="weapp_card app_context pages_reset appmsg_card_context appmsg_card_active">\n    <span class="weapp_card_bd">\n        <span class="weapp_card_profile flex_context">\n            <span class="radius_avatar weapp_card_avatar">\n                <img src="<#=avatar#>">\n            </span>\n            <span class="flex_bd">\n              <span class="weapp_card_nickname_wrp">\n                <span class="guarantee_icon">交易担保</span>\n                <span class="weapp_card_nickname"><#=nickname#></span>\n              </span>\n            </span>\n        </span>\n        <span class="weapp_card_info">\n            <span class="weapp_card_title"><#=title#></span>\n            <span class="weapp_card_thumb_wrp" style="background-image:url(<#=imageUrl#>);"></span>\n        </span>\n    </span>\n    <span class="weapp_card_ft">\n        <span class="weapp_card_logo">小程序</span>\n    </span>\n</span>\n';
});define("appmsg/poi/poi_tpl.html.js",[],function(){
return'<div class="ct_geography_loc_card weapp_card app_context appmsg_card_context appmsg_card_active" data-id="<#=data.id#>" data-latitude="<#=data.latitude#>" data-longitude="<#=data.longitude#>">\n  <!-- 插入地理位置 -->\n  <!-- 卡片式插入地理位置 -->\n  <div class="location_title line-clamp1"><#=data.name#></div>\n  <div class="location_detail line-clamp1"><#=data.address#></div>\n  <div class="location_img_wrp" style="background-image:url(<#=data.img#>);">\n    <!-- <img style="pointer-events: none;" class="location_img" src="<#=data.img#>" />  -->\n    <!-- <div class="location_img" ></div>  -->\n  </div>\n  \n</div>\n\n<!-- 纯文本式插入地理位置 -->\n<!-- <a class="ct_geography_loc_tip">\n  <i class="geography_loc_icon"></i>\n  广东省广州市天河区华丽路45-64保利香槟花园广东省广州市天河区华丽路45-64保利香槟花园</a> -->';
});define("appmsg/search/search_tpl.html.js",[],function(){
return'<span class="appmsg_card_context appmsg_card_active appmsg_search_card">\n  <!-- 搜索推荐 -->\n  <span class="appmsg_search_hd weui-flex">\n    <img class="appmsg_search_avatar" src="<#=data.avatar#>">\n    <span class="weui-flex__item">\n      <span class="appmsg_search_nickname_wrp"><span class="appmsg_search_nickname"><#=data.nickname#></span>推荐搜索</span>\n    </span>\n  </span>\n  <span class="appmsg_search_bd">\n    <span class="appmsg_search_keywords_area">\n      <div class="appmsg_search_keywords_hd">\n        <i class="weui-icon-search"></i>\n      </div>\n      <div class="appmsg_search_keywords_list">\n        <# data.keywords.forEach(function (k, index) { #>\n        <div class="appmsg_search_keywords"><#=k.label#></div>\n        <# }); #>\n      </div>\n    </span>\n  </span>\n</span>\n';
});define("pages/player_tips.js",["biz_common/tmpl.js","pages/audition_tpl.html.js","biz_common/dom/event.js"],function(t){
"use strict";
function i(t){
this.parent=document.body,this.opt=t||{},this.init();
}
var n=t("biz_common/tmpl.js"),e=t("pages/audition_tpl.html.js"),o=t("biz_common/dom/event.js");
return i.prototype.init=function(){
var t=document.createElement("div");
t.innerHTML=n.tmpl(e,this.opt),this.parent.appendChild(t),this.dom=document.getElementById("js_music_dialog");
var i=this;
o.on(i.dom.getElementsByClassName("js_submit")[0],"click",function(){
i.parent.removeChild(t),"function"==typeof i.opt.onClick&&i.opt.onClick();
});
},i;
});define("redpackage/tpl/card_tpl.html.js",[],function(){
return'<#if(!isUpdate){#>\n<section class="js_wap_redpacketcover red_package_cover_wrp" data-coveruri="<#=data.cover_uri#>">\n<#}#>\n    <!--不可操作，这里加className point_event_no-->\n    <!--todo 加载中加className red_package_cover__inner__loading-->\n    <section class="red_package_cover__inner">\n        <section class="red_package_cover__inner__main">\n            <section class="red_package_cover__body">\n                <!--图片没加载处理，这里加className red_package_cover_img_loading-->\n                <span class="red_package_cover_img" style="background-image: url(\'<#=data.receive_image#>\');"></span>\n            </section>\n            <section class="red_package_cover__foot">\n                <#if(data.status * 1===0){#>\n                <span class="red_package_cover__access-link">领取<#=data.name#>红包封面</span>\n                <#}else if(data.status * 1===1){#>\n                <span class="red_package_cover__access-link disabled">已领取红包封面</span>\n                <#}else if(data.status * 1===2){#>\n                <span class="red_package_cover__access-link disabled">红包封面已领取完</span>\n                <#}else{#>\n                <span class="red_package_cover__access-link disabled">红包封面不可领取</span>\n                <#}#>\n            </section>\n        </section>\n        <section class="red_package_cover__extend">\n            <span class="red_package_cover__extend_icon"></span>\n            <span class="red_package_cover__extend_info">微信红包封面</span>\n        </section>\n    </section>\n<#if(!isUpdate){#>\n</section>\n<#}#>';
});define("pages/voice_tpl.html.js",[],function(){
return'<span class="js_audio_frame db pages_reset audio_area">\n    <#if(show_not_support===true){#>\n    <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n    <#}#>\n    <span aria-labelledby="语音" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="appmsg_card_context appmsg_card_active db audio_card" <#if(!musicSupport){#>style="display:none;"<#}#>>\n      <strong id="voice_title_<#=voiceid#>_<#=posIndex#>" class="audio_card_title" aria-describedby="语音标题" role="link"><#=title#></strong>\n\n      <#if(!!nickname){#>\n      <span id="voice_author_<#=voiceid#>_<#=posIndex#>" class="audio_card_desc">来自<#=nickname#></span>\n      <#}#>\n      <span class="weui-flex">\n        <span class="weui-flex__item">\n          <span class="audio_card_opr">\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_wrp">\n              <span class="audio_card_progress">\n                <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="audio_card_progress_inner"></span>\n                <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_buffer" style="width:0%;"></span>\n                <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_loading" style="display:none;"></span>\n              </span>\n              <span id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="audio_card_progress_handle" style="display:none;left:0%;"></span>\n            </span>\n            <span class="audio_card_tips" aria-labelledby="时长">\n              <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="audio_card_length_current" aria-hidden="true">00:00</em>\n              <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="audio_card_length_total"><#=duration_str#></em>\n            </span>\n          </span>\n        </span>\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" aria-labelledby="播放开关" class="audio_card_switch"><em class="weui-audio-btn" role="button"></em></span>\n      </span>\n    </span>\n</span>\n\n';
});define("pages/kugoumusic_ctrl.js",["biz_wap/utils/jsmonitor_report.js","biz_wap/utils/ajax.js","pages/musicUrlReport.js"],function(e){
"use strict";
function r(e,r){
for(var t,a=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],o=!1,s=0;t=a[s++];)if(t.test(e.albumurl)){
o=!0;
break;
}
return o||(e.albumurl=""),e.detailUrl="https://m3ws.kugou.com/kgsong/"+e.jumpurlkey+".html?fromweixin=",
e.webUrl=e.detailUrl,e.musicIcon=n.musicIcon,e.media_id=e.musicid,e.type=1*r.scene===0?5:1*r.scene===1?6:9,
e;
}
function t(e,r){
var t=e,a=t.otherid+(t.albumid||""),s=n.cache[a];
return s&&"function"==typeof r.callback?void r.callback(s):void(n.submiting[a]!==!0&&(n.submiting[a]=!0,
o({
jumpurlkey:t.jumpurlkey,
songId:t.songId,
akey:t.otherid,
albumid:t.albumid||"",
onSuc:function(e){
n.submiting[a]=!1,n.cache[a]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
n.submiting[a]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,t="该歌曲版权已过期，无法播放。";
break;

case 1002:
r=!1,t="系统错误，请稍后再试。";
break;

case 1001:
r=!1,t="系统错误，请稍后再试。";
break;

default:
r=!1,t="系统错误，请稍后再试。";
}
return t&&(t+="错误码："+e),{
canplay:r,
msg:t
};
}
function o(e){
u.setSum(n.reportId,87,1);
var r=+new Date,t="/mp/getkugousong?params=#params#",o=[{
akey:e.akey,
albumid:e.albumid||""
}],m=encodeURIComponent(JSON.stringify(o));
t=t.replace("#params#",m),c({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var o=+new Date-r;
if(setTimeout(function(){
i.reportRespData({
type:2,
songid:e.songId,
musicid:e.akey,
jumpurlkey:e.jumpurlkey,
responseData:JSON.stringify(t||{}),
kugouParams:m
});
},0),!t||"undefined"==typeof t.errcode){
var u=1;
return s({
type:"error",
time:o,
code:u
}),void("function"==typeof e.onError&&e.onError({
errcode:u
}));
}
var c=0,n="";
0==t.errcode?t.data&&t.data[0]&&t.data[0].url?(c=0,n=t.data[0].url):c=1001:c=1==t.errcode?1:1002,
s({
type:"success",
time:o,
code:c
});
var p=a(c);
e.onSuc({
canplay:p.canplay,
msg:p.msg,
errcode:c,
play_url:n
});
},
error:function(){
var t=+new Date-r,a=2;
s({
type:"error",
time:t,
code:a
}),"function"==typeof e.onError&&e.onError({
errcode:a
});
}
});
}
function s(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,1e4),r>=0&&500>r?u.setSum(n.reportId,98,1):r>=500&&1e3>r?u.setSum(n.reportId,99,1):r>=1e3&&2e3>r?u.setSum(n.reportId,100,1):r>=2e3&&5e3>r?u.setSum(n.reportId,101,1):r>=5e3&&1e4>=r&&u.setSum(n.reportId,102,1),
"error"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,94,1);
break;

case 2:
u.setSum(n.reportId,91,1);
break;

case 3:
u.setSum(n.reportId,92,1);
break;

case 4:
u.setSum(n.reportId,93,1);
}
u.setSum(n.reportId,88,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,95,1);
break;

case 0:
u.setSum(n.reportId,97,1);
break;

case 1002:
u.setSum(n.reportId,96,1);
break;

case 1001:
u.setSum(n.reportId,103,1);
}
u.setSum(n.reportId,89,1);
}
}
var u=e("biz_wap/utils/jsmonitor_report.js"),c=e("biz_wap/utils/ajax.js"),i=e("pages/musicUrlReport.js"),n={
reportId:"28306",
musicIcon:window.icon_kugou_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});