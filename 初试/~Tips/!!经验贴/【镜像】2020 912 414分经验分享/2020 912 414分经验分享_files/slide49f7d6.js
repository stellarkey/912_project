define("a/tpl/sponsor_tpl.html.js",[],function(){
return'<!--互选广告-->\n<div class="mpad_sponsor" id="js_ad_area">\n    <div class="mpad_sponsor_placeholder">\n        <p class="mpad_sponsor_tips">广告，也可以是生活的一部分</p>\n    </div>\n    <div id="js_ad_inner" class="mpad_sponsor_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!!has_banner){ #> <!--图片-->\n            <div id="js_main_img" class="mpad_sponsor_bd" style="background-image:url(<#=banner#>)"></div>\n        \n        <# }else{ #> <!--视频-->\n            <div id="js_video_container"></div>\n\n        <# } #>\n        \n        <div class="mpad_sponsor_ft" id="js_ad_message">\n            <div class="mpad_sponsor_ft_hd">\n                <span class="<# if(!!isApp){ #>mpad_sponsor_avatar<# }else{ #>mpad_sponsor_avatar_round<# } #>" style="background-image:url(<#=avatar#>)"></span>\n                <# if(!!has_desc){ #>\n                <div class="mpad_sponsor_info">\n                    <p class="mpad_sponsor_title"><#=title#></p>\n                    <div class="mpad_more_innerdetail_container mpad_sponsor_desc" id="js_ad_detail">提供的广告                        <ul id="js_sponsor_opt_list" class="mpad_more_list" style="display: none">\n                            <li class="mpad_more_list_ele" id="js_btn_about">\n                                <a class="mpad_more_list_ele_container js_opt_item">关于广告</a>\n                            </li>\n                            <# if(parseInt(can_see_complaint)){ #> <!--带投诉-->\n                            <li class="mpad_more_list_ele" id="js_btn_complain" style="display: none">\n                                <a class="mpad_more_list_ele_container js_opt_item">投诉</a>\n                            </li>\n                            <# } #>\n                        </ul>\n                    </div>\n                </div>\n                <# } #>\n            </div>\n            <div class="mpad_sponsor_ft_ft">\n                <a class="mpad_sponsor_btn js_ad_action_<#=pos_type#>" id="js_ad_more"><# if(!!is_wx_app){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#></a>\n            </div>\n        </div>\n    </div>\n</div>';
});define("a/tpl/new_cpc_tpl.html.js",[],function(){
return'<!--cpc 文中广告-->\n<!--article_bottom 用于标示底部新样式，目前广告怕大量影响其它广告，所以只实验关注类-->\n<div id="js_cpc_area" class="mpad_cpc <# if(pos_type === 0 && parseInt(crt_size) === 708){ #>article_bottom<# } #>">\n    <!--有文字 "广告"-->\n    <!--<# if(tag_pos == \'left\'){ #>\n    "广告" 居左\n    <div class="mpad_cpc_adTag_left mpad_more_cps_left_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n    </div>\n    <# } else if(tag_pos == \'right\'){ #>\n    "广告" 居右\n    <div class="mpad_cpc_adTag_right mpad_more_cps_right_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                <li class="mpad_more_list_ele">\n                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <# } #>-->\n    <div class="mpad_cpc_inner">\n        <# if(isVideo){ #> <!--视频-->\n        <div id="js_video_container" class="mpad_cpc_bd js_ad_main_area mpad_cpc_video js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n            <div class="mpad_cpc_video_content js_video_container_new_protocol"></div> <!--这里放视频-->\n        </div>\n        \n        <# }else{ #> <!--纯图片-->\n        <div class="mpad_cpc_bd js_ad_main_area js_material_<#=pos_type#>" style="background-image:url(<#=banner#>)" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>"></div>\n        <# } #>\n        \n        <div class="mpad_cpc_ft <# if(!price){ #> single<# } #>">\n            <div class="mpad_cpc_ft_hd">\n                <# if(avatar){ #><!--头像-->\n                <!--app 为方头像，图文消息 为圆头像-->\n                <span class="<# if(isDownload){ #> mpad_cpc_avatar<# }else{ #> mpad_cpc_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: contain;"></span>\n                <# } #>\n                \n                <div class="mpad_cpc_ft_msg ">\n                    <!--有title和金额-->\n                    <# if(!!title){ #>\n                        <p class="mpad_cpc_ft_msg_title"><#=title#></p>\n                        <# if(!!price){ #> <!--金额-->\n                        <p class="mpad_cpc_ft_msg_price">¥<#=price#></p>\n                        <# } #>\n\n                        <!--底部广告 描述，xx篇原创文章 xx位朋友关注-->\n                        <!-- 公众号描述 -->\n                        <!-- 原创文章 -->\n                        <!-- 好友关注 -->\n                        <# if(pos_type === 0 && parseInt(crt_size) === 708){ #>\n                        <p class="mpad_cpc_ft_msg_desc js_mpad_cpc_ft_msg_contact">\n                            <span class="mpad_cpc_ft_msg_desc_item"></span>\n                            <span class="mpad_cpc_ft_msg_desc_item"></span>\n                        </p>\n                        <# } #>\n                    <# } #>\n                    <# if(!(tag_pos == \'left\' || tag_pos == \'right\') && superscript){ #><!--广告标在里面-->\n                    <!--当没有title和价格的时候，出广告标，底部广告不会出现没有title的情况，所以底部不会出现广告标-->\n                    <!--更新：现在底部广告也有广告标了，并且也有title，所以加了superscript来控制角标 @scotthuang 2018-10-17-->\n                    <div class="mpad_cpc_adTag_inner mpad_more_innertips_container <# if(!title && !price){ #> single<# } #> js_ad_opt_list_btn_<#=pos_type#>">广告<div href="javascript:;" class="mpad_more js_mpad_more" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                                <li class="mpad_more_list_ele">\n                                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <# } #>\n                </div>\n            </div>\n\n            \n            <# if(isDownload) {#>\n            <!--下载按钮 目前不会有小程序-->\n            <a href="javascript:void(0);" class="mpad_cpc_btn mpad_cpc_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_download_outside js_download_outside"><#=btn_text#></div>\n                <div class="btn_progress js_download_percent" style="width: 0%"> \n                    <div class="btn_download_inner js_download_inner"><#=btn_text#></div>\n                </div>\n            </a>\n            <!--delay 用新的下载-->\n            <!--未下载-->\n            <!--下载中-->\n            <!--进度条更新这里-->\n            <!--暂停下载-->\n            <!--<a href="javascript:void(0);" class="mpad_cpc_btn js_ad_action_<#=pos_type#>"><#=btn_text#></a>\n            \n            <a href="javascript:void(0);" class="mpad_cpc_btn mpad_cpc_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_progress js_download_percent" style="width: 0%"></div> \n                <span class="btn_download_cancel"></span>\n            </a>-->\n\n            <# }else{ #>\n            <!--非下载按钮-->\n            <a href="javascript:void(0);" class="mpad_cpc_btn js_ad_action_<#=pos_type#>">\n                <!--小程序标，文章底部用绿色。文中用白色-->\n                <# if(!!is_wx_app){ #>\n                <# if(pos_type === 0 && parseInt(crt_size) === 708){ #><img class="icon_wxapp icon_wxapp_article_bottom" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5ncmVlbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSI9PXNsaWNlPT0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhIiBmaWxsPSIjMDZBRTU2Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjYyNDQxOSw4Ljc5MzE5MDMgTDExLjQyOTk3NTgsOC43OTY0NjI5NSBDMTAuODQyMDQ2NCw4Ljc5NjQ2Mjk1IDEwLjQ5OTkzOTgsOC4zNDc4NTg3MiAxMC43MjA5NTU3LDcuODMwNjU5MzggQzEwLjg3MjMwNyw3LjQ2MzMyNzYxIDExLjIxMzc3MDIsNy4xNzk2NDAyOCAxMS42MTcwMzc1LDcuMDg2NDY2MiBDMTIuNjk1OTg0OSw2LjgxNTU3NDMzIDEzLjQyOTA2MjksNS45Mzg0NjU0MiAxMy40MjkwNjI5LDQuOTE4NzcyOTkgQzEzLjQyOTA2MjksMy42ODI1MzI1NSAxMi4yOTQzMjg2LDIuNjc1MDkxOTUgMTAuODc3MDE0NCwyLjY3NTA5MTk1IEM5LjQ1OTcwMDA5LDIuNjc1MDkxOTUgOC4zMjQ5NjU3NywzLjY4MjUzMjU1IDguMzI0OTY1NzcsNC45MTg3NzI5OSBMOC4zMjQ5NjU3NywxMS4wODEyMjcgQzguMzI0OTY1NzcsMTMuMjUxNzU0MyA2LjQ1OTgwNTgsMTUgNC4xNjI0ODI4OCwxNSBDMS44NjUxNTk5NywxNSAwLDEzLjI1MTc1NDMgMCwxMS4wODEyMjcgQzAsOS4xNzgwMjgxNyAxLjQ0NDIzODYxLDcuNTUzNTA4MDcgMy40MTIwMzUyNSw3LjI0NDYyMDA4IEwzLjU3MDAyNDIyLDcuMjQ0NjIwMDggQzQuMDE1MTMxNzQsNy4yNDQ2MjAwOCA0LjMzNTc0NDEzLDcuNTIxNzc0NjQgNC4zMzU3NDM3OCw3LjkxNzU4NDM1IEM0LjMzNTkzMzYyLDcuOTg1NDA1OTQgNC4zMzQzNDk4NSw4LjAxNjc0NjIgNC4zMjc5MTIxNiw4LjA1NjkyMzEgQzQuMzE5MjMzODgsOC4xMTEwODMzOCA0LjMwMjMzNTkxLDguMTYyOTIyMTUgNC4yNzkwNDQzLDguMjEwNDIzNjUgQzQuMTM3MTg0ODEsOC41NTQ3MTg3NCAzLjc3NDUzNjY4LDguODUyODAwODQgMy4zODI5NjI1Myw4Ljk1NDYxNjgzIEMyLjMxMTgxMDQzLDkuMjIzNTUxNTIgMS41NzA5MzcwNSwxMC4wOTUzMDUxIDEuNTcwOTM3MDUsMTEuMDgxMjI3IEMxLjU3MDkzNzA1LDEyLjMxNzQ2NzUgMi43MDU2NzEzNywxMy4zMjQ5MDgxIDQuMTIyOTg1NjQsMTMuMzI0OTA4MSBDNS41NDAyOTk5MSwxMy4zMjQ5MDgxIDYuNjc1MDM0MjMsMTIuMzE3NDY3NSA2LjY3NTAzNDIzLDExLjA4MTIyNyBMNi42NzUwMzQyMyw0LjkxODc3Mjk5IEM2LjY3NTAzNDIzLDIuNzQ4MjQ1NjYgOC41NDAxOTQyLDEgMTAuODM3NTE3MSwxIEMxMy4xMzQ4NCwxIDE1LDIuNzQ4MjQ1NjYgMTUsNC45MTg3NzI5OSBDMTUsNi44MzIwNzU5NyAxMy41ODk3MzMsOC40Mzc2NzM4MyAxMS42MjQ0MTksOC43OTMxOTAzIFoiIGlkPSLlm77moIfpopzoibIiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="">\n                <# } else { #><img class="icon_wxapp icon_wxapp_article_bottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="" /><# } #>\n                <!--底部广告专用-->\n                <img class="icon_wxapp icon_wxapp_video_share_bottom" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT53aGl0ZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSI9PXNsaWNlPT0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhJ2EiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuNjI0NDE5LDguNzkzMTkwMyBMMTEuNDI5OTc1OCw4Ljc5NjQ2Mjk1IEMxMC44NDIwNDY0LDguNzk2NDYyOTUgMTAuNDk5OTM5OCw4LjM0Nzg1ODcyIDEwLjcyMDk1NTcsNy44MzA2NTkzOCBDMTAuODcyMzA3LDcuNDYzMzI3NjEgMTEuMjEzNzcwMiw3LjE3OTY0MDI4IDExLjYxNzAzNzUsNy4wODY0NjYyIEMxMi42OTU5ODQ5LDYuODE1NTc0MzMgMTMuNDI5MDYyOSw1LjkzODQ2NTQyIDEzLjQyOTA2MjksNC45MTg3NzI5OSBDMTMuNDI5MDYyOSwzLjY4MjUzMjU1IDEyLjI5NDMyODYsMi42NzUwOTE5NSAxMC44NzcwMTQ0LDIuNjc1MDkxOTUgQzkuNDU5NzAwMDksMi42NzUwOTE5NSA4LjMyNDk2NTc3LDMuNjgyNTMyNTUgOC4zMjQ5NjU3Nyw0LjkxODc3Mjk5IEw4LjMyNDk2NTc3LDExLjA4MTIyNyBDOC4zMjQ5NjU3NywxMy4yNTE3NTQzIDYuNDU5ODA1OCwxNSA0LjE2MjQ4Mjg4LDE1IEMxLjg2NTE1OTk3LDE1IDAsMTMuMjUxNzU0MyAwLDExLjA4MTIyNyBDMCw5LjE3ODAyODE3IDEuNDQ0MjM4NjEsNy41NTM1MDgwNyAzLjQxMjAzNTI1LDcuMjQ0NjIwMDggTDMuNTcwMDI0MjIsNy4yNDQ2MjAwOCBDNC4wMTUxMzE3NCw3LjI0NDYyMDA4IDQuMzM1NzQ0MTMsNy41MjE3NzQ2NCA0LjMzNTc0Mzc4LDcuOTE3NTg0MzUgQzQuMzM1OTMzNjIsNy45ODU0MDU5NCA0LjMzNDM0OTg1LDguMDE2NzQ2MiA0LjMyNzkxMjE2LDguMDU2OTIzMSBDNC4zMTkyMzM4OCw4LjExMTA4MzM4IDQuMzAyMzM1OTEsOC4xNjI5MjIxNSA0LjI3OTA0NDMsOC4yMTA0MjM2NSBDNC4xMzcxODQ4MSw4LjU1NDcxODc0IDMuNzc0NTM2NjgsOC44NTI4MDA4NCAzLjM4Mjk2MjUzLDguOTU0NjE2ODMgQzIuMzExODEwNDMsOS4yMjM1NTE1MiAxLjU3MDkzNzA1LDEwLjA5NTMwNTEgMS41NzA5MzcwNSwxMS4wODEyMjcgQzEuNTcwOTM3MDUsMTIuMzE3NDY3NSAyLjcwNTY3MTM3LDEzLjMyNDkwODEgNC4xMjI5ODU2NCwxMy4zMjQ5MDgxIEM1LjU0MDI5OTkxLDEzLjMyNDkwODEgNi42NzUwMzQyMywxMi4zMTc0Njc1IDYuNjc1MDM0MjMsMTEuMDgxMjI3IEw2LjY3NTAzNDIzLDQuOTE4NzcyOTkgQzYuNjc1MDM0MjMsMi43NDgyNDU2NiA4LjU0MDE5NDIsMSAxMC44Mzc1MTcxLDEgQzEzLjEzNDg0LDEgMTUsMi43NDgyNDU2NiAxNSw0LjkxODc3Mjk5IEMxNSw2LjgzMjA3NTk3IDEzLjU4OTczMyw4LjQzNzY3MzgzIDExLjYyNDQxOSw4Ljc5MzE5MDMgWiIgaWQ9IuWbvuagh+minOiJsiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" /><# } #>\n                <#=btn_text#>\n            </a>\n            <# } #>\n            </div>\n        </div>\n    </div>\n</div>';
});define("appmsg/emotion/caret.js",[],function(e,t){
"use strict";
var t={};
return t.get=function(e){
var t=0;
if(document.selection){
e.focus();
var a=document.selection.createRange();
a.moveStart("character",-e.value.length),t=Sel.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
},t.set=function(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var a=e.createTextRange();
a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select();
}
},t;
});define("biz_wap/utils/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,n=0,t=t||function(){};o>n&&(e=localStorage.key(n),
t.call(this,e,this.get(e))!==!1);n++)localStorage.length<o&&(o--,n--);
}
}:{
set:function(){},
get:function(){},
remove:function(){},
clear:function(){},
each:function(){}
};
});define("a/appdialog_confirm.html.js",[],function(){
return'<div class="wx_profile_dialog_primary">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog weui-skin_android">\n        <div class="weui-dialog__hd"><strong class="weui-dialog__title">是否立即下载该应用</strong></div>\n        <div class="weui-dialog__bd">\n            <div class="weui-flex">\n                <div class="wx_profile_info_avatar_wrp">\n                    <span class="wx_profile_info_avatar">\n                        <img src="<#=app_img_url#>" alt="">\n                    </span>\n                </div>\n                <div class="weui-flex__item">\n                    <strong class="wx_profile_info_title"><#=app_name#></strong>\n                </div>\n            </div>\n        </div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:;" class="js_cancel weui-dialog__btn weui-dialog__btn_default">取消</a>\n            <a href="javascript:;" class="js_ok weui-dialog__btn weui-dialog__btn_primary">下载</a>\n        </div>\n    </div>\n</div>\n';
});;define('widget/wx_profile_dialog_primary.css', [], function(require, exports, module) {
	return ".radius_avatar{display:inline-block;background-color:#fff;padding:3px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;vertical-align:middle}.radius_avatar img{display:block;width:100%;height:100%;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#eee}.wx_profile_dialog_primary .weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.wx_profile_dialog_primary .weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-65%);transform:translate(-50%,-65%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.wx_profile_dialog_primary .weui-dialog__hd{position:relative;padding:20px 20px 10px;text-align:left}.wx_profile_dialog_primary .weui-dialog__hd:after{content:\" \";position:absolute;left:20px;right:20px;bottom:0;height:1px;border-bottom:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__title{font-weight:400;font-size:17px}.wx_profile_dialog_primary .weui-dialog__bd{padding:16px 20px;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;color:#999}.wx_profile_dialog_primary .weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.wx_profile_dialog_primary .weui-dialog__ft{position:relative;line-height:44px;font-size:17px;display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.wx_profile_dialog_primary .weui-dialog__btn:active{background-color:#eee}.wx_profile_dialog_primary .weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.wx_profile_dialog_primary .weui-dialog__btn:first-child:after{display:none}.wx_profile_dialog_primary .weui-dialog__btn_default{color:#353535}.wx_profile_dialog_primary .weui-dialog__btn_primary{color:#1aad19}.wx_profile_dialog_primary .weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,0.1)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__title{font-size:21px}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd{text-align:left;padding:1.3em 1.6em 1.2em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd{color:#999;padding:0 1.6em 1.4em;font-size:17px;text-align:left}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:active{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:last-child{margin-right:-0.8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn_default{color:#808080}@media screen and (min-width:1024px){.wx_profile_dialog_primary .weui-dialog{width:35%}}.wx_profile_dialog_primary .weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.wx_profile_dialog_primary .weui-flex{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_profile_dialog_primary .weui-flex__item{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.wx_profile_info_avatar_wrp{padding-right:10px}.wx_profile_info_avatar{width:50px;height:50px;padding:0;display:inline-block;background-color:#fff;vertical-align:middle}.wx_profile_info_avatar img{display:block;width:100%;border-radius:10px}.wx_profile_info_title{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:16px;font-weight:400;text-align:left}";
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("new_video/player.js",["page/pages/video.css","biz_common/utils/string/html.js","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_wap/jsapi/log.js","biz_common/dom/event.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js","pages/iframe_communicate.js","a/a_utils.js","biz_common/utils/url/parse.js","pages/version4video.js","biz_wap/utils/wapsdk.js","biz_common/base64.js","biz_wap/jsapi/core.js","new_video/plugin/util.js","biz_wap/utils/jsmonitor_report.js","common/utils.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(){
o(),i();
}
function i(){
y.on("onNetWorkChange",function(e){
if(console.log("networkchanged",e),e.networkType||(e.networkType=e.netType),e.networkType&&e.simType)try{
if(!parent.window.lastNetworkType&&window.networkType&&window.simType)parent.window.lastNetworkType={
networkType:window.networkType,
simType:window.simType
};else if(T.isObjectValueEqual(parent.window.lastNetworkType,e))return;
if(window.simType=e.simType,window.networkType=e.networkType,T.isMobileNetwork(e.networkType)&&1!==e.simType&&parent.window.lastNetworkType&&("wifi"===parent.window.lastNetworkType.networkType||T.isNoneNetwork(parent.window.lastNetworkType.networkType)))for(var t in parent.window.__MpPlayers){
var i=parent.window.__MpPlayers[t];
i._g.isUserPause=!1,i._g.pauseNetType=null,!i.isPlay()&&!i.isEnd()&&i.isPause()&&i.hasBeginPlay()?(i._g.isUserPause=!0,
i._g.pauseNetType=parent.window.lastNetworkType.networkType):i.isPlay()&&("wifi"===parent.window.lastNetworkType.networkType&&T.isVideoNeedFlowNotice(i.opt.flow,2)||T.isNoneNetwork(parent.window.lastNetworkType.networkType)&&T.isVideoNeedFlowNotice(i.opt.flow,4))&&i.__showFlowNotice_1();
}
parent.window.lastNetworkType=e;
}catch(o){}
});
}
function o(){
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",s,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",s,!1):document.visibilityState&&document.addEventListener("visibilitychange",s,!1);
try{
parent.window.__MpBindExitFullPage||(parent.window.__MpBindExitFullPage=!0,b.listenMpPageAction(function(e){
if(e&&"onExitMpVideoFullPage"===e.action)for(var t in parent.window.__MpPlayers)if(Object.prototype.hasOwnProperty.call(parent.window.__MpPlayers,t)){
var i=parent.window.__MpPlayers[t];
if(i&&i.__isInFullScreen){
var o=i.opt&&i.opt.extinfo&&i.opt.extinfo.vid?i.opt.extinfo.vid:"";
if(o&&o===e.videoVid){
if(i.__isInFullScreen=!1,!_.os.android){
var n=1*e.videoCurrTime;
n=-1===n?0/0:n;
var a=i.__getDuration();
parseInt(a,10)===parseInt(n,10)||n>a?i.videoEnd():i.play4outer(n,{
triggerEvent:!1
}),i.onFullScreenChange({
state:!1,
type:"jsapi"
});
}
break;
}
}
}
}));
}catch(e){
l.info("videoplayer jsapi ExitFullPage error:"+e);
}
}
function n(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function a(){
var e=n();
return e?document[e]:!1;
}
function r(e,t){
t?(e.setAttribute("muted",!0),e.muted=!0):(e.removeAttribute("muted"),e.muted=!1);
}
function s(){
if(a())try{
for(var e in parent.window.__MpPlayers){
var t=parent.window.__MpPlayers[e];
if(t.hasBeginPlay()&&t.isPlay()){
t.pause4outer(),C.visibilityPausePlayer=t;
break;
}
}
}catch(i){}else{
var o=C.visibilityPausePlayer;
o&&o.hasBeginPlay()&&!o.isEnd()&&(o.play4outer(),C.visibilityPausePlayer=null);
}
}
e("page/pages/video.css"),e("biz_common/utils/string/html.js"),e("biz_wap/zepto/zepto.js"),
e("biz_wap/zepto/event.js"),e("biz_wap/zepto/touch.js");
var l=e("biz_wap/jsapi/log.js"),d=e("biz_common/dom/event.js"),u=e("new_video/player.html.js"),_=e("biz_wap/utils/device.js"),h=e("new_video/ctl.js"),c=e("biz_common/tmpl.js"),p=e("pages/iframe_communicate.js"),g=e("a/a_utils.js"),f=e("biz_common/utils/url/parse.js"),m=e("pages/version4video.js"),v=e("biz_wap/utils/wapsdk.js"),w=e("biz_common/base64.js"),y=e("biz_wap/jsapi/core.js"),T=e("new_video/plugin/util.js"),S=e("biz_wap/utils/jsmonitor_report.js"),b=e("common/utils.js"),P=(e("biz_common/utils/url/parse.js"),
e("biz_wap/utils/ajax.js")),j=18e4,C={
visibilityPausePlayer:null
};
try{
C._debug=window.parent.window.location.href.indexOf("&_debug=1")>0;
}catch(B){
C._debug=!1;
}
var F=3e3;
t();
var k=function(e){
C._debug&&console.log(e);
},M=navigator.userAgent,x=function(){
return!0;
}(),D=(-1!==M.indexOf("Safari")&&-1!==M.indexOf("Version")&&-1==M.indexOf("Android"),
function(){
return!!_.browser.M1;
}()),E=function(e,t){
var i=document.createElement("div");
return e in i.style?(i.style[e]=t,i.style[e]===t):!1;
},I=function(e){
var t=0,i=0,o=0;
.5>e&&(e=0),e=Math.ceil(e);
var t=Math.floor(e/3600),i=Math.floor((e-3600*t)/60),o=e-3600*t-60*i;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>i&&(i="0"+i),10>o&&(o="0"+o),t+i+":"+o;
},N=!_.canSupportVideo,V=function(e){
var t=this,i=$(e.container);
"undefined"==typeof e.videoReportType&&(e.videoReportType=-1),e.width=e.width||300,
e.height=e.height||300,e.videoWidth=e.videoWidth||0,e.videoHeight=e.videoHeight||0,
e.duration=e.duration||0,e.videoFit=!1,e.isVideoSharePage=e.isVideoSharePage||!1;
var o={
needToFit:!1,
supportObjectFit:!1,
os:_.os
};
if(e.width&&e.height&&e.videoWidth&&e.videoHeight){
var n=Math.abs(e.width/e.height-e.videoWidth/e.videoHeight);
.1>=n&&(o.needToFit=!0,E("objectFit","fill")&&(o.supportObjectFit=!0,e.videoFit=!0));
}
e.ratio=e.ratio||e.width/e.height,e.autoplay=!!e.autoplay||!1,e.flow=e.flow&&parseFloat(e.flow)||0,
this.opt=e,this.id=e.id=+new Date+"_"+Math.floor(Math.random()*Math.floor(+new Date)),
this.opt.jsapiFullScreen!==!0&&(this.opt.jsapiFullScreen=!1),this.opt.canShareVideo!==!0&&(this.opt.canShareVideo=!1),
this.opt.pauseShowControll!==!0&&(this.opt.pauseShowControll=!1),this.__iosPreloadPause=!1,
this.__iosPreloadPlayFlag=!1,this.__iosIsRealPreload=!1,this.__forcePause=!1,this.__hasFuncControllBar=!0,
this.__dragTimes=[],this.__play_total_time=0,this.__last_playtime=0,this.__always_hide_loading=e.always_hide_loading||!1,
this.__last_loadingtime=0,this.__loadingCountFlag=null,this.__userplaytime=!1,this._playingBufferingStartTime=null,
this._g={
oriSrc:this.opt.src,
timeupdateCacheCount:3,
serialTimeupdateCache:[],
resetShowingLoadingTimeoutId:null,
showingLoadingTimeoutId:null,
statusDefine:{
init:1,
play:1,
pause:1,
loading:1,
end:1,
error:1
},
subStatusDefine:{
init:1,
play:1,
playing:1,
waiting:1,
stalled:1,
seeking:1,
seeked:1,
preload:1
},
status:"init",
subStatus:"init",
triggerTimeupdateLog:!0,
isUserPause:!1,
pauseNetType:null,
hasReportBeginPlay:!1,
coverBase64:"",
loadingCoverBase64:!1,
touchForwarding:!1,
jsapiFullScreenId:null,
jsapiFullScreenErrCnt:0,
jsapiFullScreenErrLimit:2,
iosPreloadTmpPlay:!1
},e._mustHideFullScreen=D,e.display=e.autoHide?"none":"block",e.ad_muted_btn=e.ad_muted_btn||!1,
e.videoCrossOrigin=e.jsapiFullScreen&&_.os.ios?!0:!1;
var a=c.tmpl(u,e);
i.append(a);
var r=this.container=$("#js_mpvedio_"+this.id);
this.$video=r.find("video");
var s=this.video=this.$video[0];
this.__initData(),this.__initVideo();
var l=e.src;
if(!l)return this.changeStatus({
status:"error",
subStatus:"5"
}),void this.__triggerOutside("error",{
errorcode:5
});
if(s.setAttribute("origin_src",l),N)return r.find(".js_btn_play").attr("href",l).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
parent.window&&!parent.window.lastNetworkType&&window.networkType&&window.simType&&(parent.window.lastNetworkType={
networkType:window.networkType,
simType:window.simType
});
var d=e.plugins||[];
this._blockPlugin={};
for(var h=0,p=d.length;p>h;++h){
var g=d[h];
g.setPlayer(this),!!g.init&&g.init();
}
this.plugins=d,this._trigger("afterCheckVideoFit",o),this._trigger("loading",e),
this._defineEvent(),this.__bindBtnEvent(),this.__bindVideoEvent(),this._addPostmessageListener();
try{
parent.window.__MpPlayers||(parent.window.__MpPlayers={}),parent.window.__MpPlayers[this.id]=this;
}catch(f){}
this.opt.canShareVideo&&setTimeout(function(){
t.getCoverBase64({
callback:function(){}
});
},1e3);
};
return $.extend(V.prototype,{
_jsapiLog:function(e){
var t=["vid:","videosrc:"];
this.opt&&this.opt.extinfo&&this.opt.extinfo.vid&&(t[0]+=this.opt.extinfo.vid),this.$video&&this.$video[0]&&this.$video[0].src&&(t[1]+=this.$video[0].src),
l.info("videoplayer "+e+";"+t.join(";"));
},
__triggerOutside:function(){
var e=this.opt,t=arguments,i=t[0],o=this,n=this.video;
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var a=e["on"+i];
"function"==typeof a&&a.apply(this,t),"BeginPlay"!=i||null!=o.__replaySec&&0!=o.__replaySec||!_.os.ios||(n.currentTime=.1);
}
},
__errorHandler:function(){
this.video.removeAttribute("src");
},
__loadingHandler:function(e){
this.showLoading(),this._trigger("ready",e);
},
__readyHandler:function(e){
var t=this.opt.src;
m.proxyPreloadExper()&&m.proxyPreloadExper().isUsePreload&&this.setSrc(t),this._trigger("loaded",e);
},
__loadedHandler:function(e){
return(e&&e.autoplay||this.opt.autoplay||window.__auto_play__)&&m.device.inWechat?(window.__auto_play__=!1,
this.videoCtlReport({
step:15
}),this._g.hasReportBeginPlay=!0,void this._trigger("readyBeginPlay",e)):void this._setBeginPlayStatus();
},
__readyBeginPlayHandler:function(e){
m.proxyPreloadExper()&&m.proxyPreloadExper().isUsePreload||this.dontReset||this.setSrc(this.opt.src),
this.dontReset&&(this.dontReset=!1),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
function e(e,t){
e.__firstPlayStart=+new Date,e.__userplaytime=!0,t.find(".js_video_poster").show(),
e.showCover(),t.find(".js_video_play_controll").hide(),e.__hasBeginPlay=!0,e.showLoading("firstTime"),
e.showControllBar(),e.opt.flowNotice&&e.__firstLoadedFlowNoticeJudge();
}
N&&(location.href=this.opt.src);
var t=this.container,i=this,o=this.video,n=void 0;
setTimeout(function(){
try{
i.__continueSec&&(i.__replaySec=i.__continueSec,i.__continueSec=null),i._jsapiLog("set continue:"+i.__replaySec),
n=o.play(),"object"===("undefined"==typeof n?"undefined":_typeof(n))?n.then(function(){
e(i,t);
}).catch(function(e){
("AbortError"===e.name||"NotAllowedError"===e.name)&&(i._setBeginPlayStatus(),i.dontReset=!0,
S.setSum(114217,16,1));
}):e(i,t);
}catch(a){
i._jsapiLog("play error");
}
},1);
},
__replayHandler:function(){
this.videoCtlReport({
step:9
});
var e=this.video.muted;
this.setSrc(this.src,this.video.preload,!0),this.triggerMuted(e),this._afterReplay();
},
__endHandler:function(){
this.container.find(".js_btn_play_aria").data("status","3").removeClass("video_playing"),
this.hideControllBar(),this.hideTouchForward(),this._hidePlayControllBar(),this.__hasBeginPlay=!1,
this.__canplay=!1;
},
__hideControllTimeoutCallback:function(){
return this.__onTouch?void this.__hideControllTimeout():void(this.isPlay()&&this.hideControllBar());
},
__touchVideoHandler:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this,e=this.opt;
if(e.blockTouchVideo||this.__onTouch||this.opt.pauseShowControll&&this.isPause()||this.__userplaytime)return!1;
if(!t.__canplay||t.isEnd()&&e.hideControllBarAtEnd)return void t.hideControllBar();
var i=t.container.find(".js_controll");
e.isShow===!0||"none"==i.css("display")?t.showControllBar():t.hideControllBar();
var o=t.container.find(".js_video_flow");
"none"!==o.css("display")&&t._g.isUserPause===!1&&t.__hideFlowNotice(),t.__hideControllTimeout();
},
__hideControllTimeout:function(){
var e=this;
this.__touchVideoTimeoutHandler&&clearTimeout(this.__touchVideoTimeoutHandler),this.__touchVideoTimeoutHandler=setTimeout(function(){
e.__hideControllTimeoutCallback();
},F);
},
__initData:function(){
this.log={
hasended:0,
lastsec:0,
duration:0,
video_error:0
},this.__hasBeginPlay=!1,this.__canplay=!1,this._playingBufferingStartTime=null,
this.__userplaytime=!1,this.__hasscroll=!1,this.__replaySec=null,this.__playQueue=[];
},
__initVideo:function(){
var e=this.opt,t=this.video;
t.addEventListener("contextmenu",function(e){
e.preventDefault();
},!1),t.hasAttribute("controls")&&t.removeAttribute("controls"),t.setAttribute("webkit-playsinline","isiPhoneShowPlaysinline"),
t.setAttribute("playsinline","isiPhoneShowPlaysinline"),e.loop&&t.setAttribute("loop",e.loop),
e.muted&&r(t,!0),this.$video.off("loadedmetadata durationchange"),this.__hasVideoDurationchange=!1;
},
__getDuration:function(){
var e=this.opt,t=this.video,i=t?t.duration:null;
return i&&1!=i?i:e.duration;
},
__videoDurationchange:function(){
var e=this;
if(!e.__hasVideoDurationchange){
var t=this.video,i=this.opt,o=this.container;
if(1/0!=t.duration&&t.duration>0&&1!=t.duration)e.duration=t.duration,e.__hasVideoDurationchange=!0;else{
if(!i.duration)return!1;
e.duration=i.duration,e.__hasVideoDurationchange=!0;
}
e.log.duration=e.duration,e.duration>>=0,o.find(".js_total_time").text(I(e.duration)),
this.__hasFuncControllBar&&o.find(".js_progress_bar,.js_total_time").show();
var n=+new Date,a=n-e.log.loadwait_start;
e.log.loadwait=a,e._trigger("durationchange",{
loadwait:a
});
}
},
__startCountTime:function(){
var e=this,t=this.video;
t&&null===e.__last_playtime&&(e.__last_playtime=t.currentTime);
},
__endCountTime:function(){
var e=this,t=this.video;
t&&t.currentTime>e.__last_playtime&&null!==e.__last_playtime&&(e.__play_total_time+=t.currentTime-e.__last_playtime,
e.__last_playtime=null);
},
__bindVideoEvent:function(){
var e=this.$video,t=this,i=this.container,o=i.find(".js_switch"),n=this.video;
e.off("timeupdate").on("timeupdate",function(){
if(t.__forcePause===!0)return void k(t.id+":timeupdate __forcePause return");
if(t.__hasBeginPlay&&!t.__canplay)return t.showLoading(),!1;
n=t.video,null!=t.__replaySec&&(k(t.id+":timeupdate __replaySec"),n.pause(),n.currentTime=t.__replaySec,
t.__last_playtime=t.__replaySec,n.play(),t.__replaySec=null),t.__videoDurationchange();
var e=n.currentTime;
if(e>0){
t.__startCountTime(),t._addSerialTimeupdate(),"loading"===t._g.status&&"seeking"===t._g.subStatus||!t._checkPlayBySerialTimeupdate()||(t.hideLoading(),
t._g.touchForwarding||t.hideTouchForward());
var i=t.__getDuration();
t.__onTouch||(t.__setControllBar(e/i),t.__setPlayTime(e)),t.hideCover(),t._trigger("timeupdate",{
currentTime:e
}),t.afterFirstLoaded();
}
}),e.off("canplay").on("canplay",function(){
null!=t.__replaySec&&(n.currentTime=1*(1*t.__replaySec).toFixed(4),t.__last_playtime=t.__replaySec,
t.__replaySec=null),t.__canplay=!0,t._trigger("canplay");
}),e.off("ended").on("ended",function(){
k("player inner isend:"+t.isEnd()),t.isEnd()&&t.videoEnd();
}),e.off("emptied").on("emptied",function(){}),t.waitingHandlerTimer=null;
var a=0;
e.off("stalled").on("stalled",function(){
if(this.__hasBeginPlay&&!t.waitingHandlerTimer){
t.changeStatus({
status:"loading",
subStatus:"stalled"
}),t.showLoading();
var e=n.src,i=n.readyState,o=n.error;
0!=i||o&&0!=o.code||(clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null,
t.showLoading(),t.showCover(),n.pause(),n.src=e,n.load(),n.play(),k(t.id+":stalled"));
}
}),e.on("seeked",function(){
t.__onTouch||t.opt.jsapiFullScreen&&t.__isInFullScreen||(t.changeStatus({
status:"loading",
subStatus:"seeked"
}),n.play()),k("video seeked event");
}),e.off("seeking").on("seeking",function(){
k("seeking,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay&&(t.changeStatus({
status:"loading",
subStatus:"seeking"
}),t.showLoading());
}),e.off("waiting").on("waiting",function(){
if(k("waiting,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay){
t.changeStatus({
status:"loading",
subStatus:"waiting"
}),t.showLoading(),t._jsapiLog("waiting counting begin"),t.loadingCountFlag||clearTimeout(t.loadingCountFlag),
t.__last_loadingtime=n.currentTime,t.loadingCountFlag=setTimeout(function(){
n.currentTime===t.__last_loadingtime&&(t.changeStatus({
status:"error",
subStatus:"6"
}),t.__triggerOutside("error",{
errorcode:6
}));
},j),clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var e=0;
try{
for(var i in parent.window.__MpPlayers)if(parent.window.__MpPlayers.hasOwnProperty(i)&&e++,
e>1)break;
}catch(o){}
e>1&&t.__forcePause===!1&&(t.waitingHandlerTimer=setTimeout(function(){
if(t.__forcePause!==!0){
var e=n.error;
if(0==n.readyState&&(!e||0==e.code)){
clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var i=n.src;
t.showLoading(),t.showCover(),n.pause(),n.src=i,a++,n.load(),n.play(),k(t.id+":waitingHandlerTimer");
}
}
},1e4)),t._trigger("waiting");
}
}),e.off("play playing").on("play playing",function(e){
return t.__forcePause===!0||t._g.iosPreloadTmpPlay?void k(t.id+":play playing __forcePause return"):(t.changeStatus({
status:"play",
subStatus:e.type
}),setTimeout(function(){
t.adVideoStatus="play";
},10),k(t.id+":play playing"),o.removeClass("switch_on"),o.addClass("switch_off"),
t._hidePlayControllBar(),t.__startCountTime(),void t._trigger("play"));
}),e.off("pause").on("pause",function(){
t._g.iosPreloadTmpPlay||(k(t.id+":video pause event"),t.changeStatus({
status:"pause",
subStatus:""
}),setTimeout(function(){
t.adVideoStatus="pause";
},10),o.addClass("switch_on"),o.removeClass("switch_off"),!t.__canplay||t.isEnd()||t.__onTouch?t._hidePlayControllBar():(t.hideControllBar(),
t._showPlayControllBar()),t.__endCountTime(),t._trigger("pause"));
}),e.off("error").on("error",function(){
var e=void 0;
t.video.error&&(e=t.video.error.code),t.changeStatus({
status:"error",
subStatus:e||""
});
var i="/mp/ad_video_report?action=report_video_play_error",o=encodeURIComponent(t.video.baseURI);
P({
type:"GET",
dataType:"json",
timeout:3e4,
url:i+"&errorCode="+e+"&videoUrl="+o,
success:function(){},
error:function(){}
}),t._trigger("error",{
errorcode:e
});
}),e.off("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange").on("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange",function(e){
var i=void 0;
i="webkitbeginfullscreen"==e.type?!0:"webkitendfullscreen"==e.type?!1:document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,
t.onFullScreenChange({
state:i,
type:"h5"
});
});
},
_defineEvent:function(){
var e=this;
this._event={
progressBarMousemove:function(t){
e.__hasFuncControllBar&&e.__onTouch&&e._pointerMoveHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
});
},
progressBarMouseup:function(t){
return e.__hasFuncControllBar&&e.__onTouch?(e._pointerUpHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
}),!1):void 0;
},
progressBarTouchmove:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
e._pointerMoveHandler({
x:i.pageX,
y:i.pageY,
e:t
});
}
},
progressBarTouchend:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
return e._pointerUpHandler({
x:i.pageX,
y:i.pageY,
e:t
}),!1;
}
},
broadcastPlay:function(t){
t.id!==e.id&&e.__hasBeginPlay&&!e.isEnd()&&e.pause4outer();
}
};
},
_addPostmessageListener:function(){
p.addListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
},
__bindBtnEvent:function(){
function e(){
if(N)return location.href=i.opt.src,!1;
i.changeStatus({
status:"loading",
subStatus:"preload"
});
var e=2;
i._g.hasReportBeginPlay?e=9:window.cgiData&&"0"==window.cgiData.media_source&&(e=11),
i.videoCtlReport({
step:e
}),i._g.hasReportBeginPlay=!0,i._trigger("readyBeginPlay");
}
function t(){
i.isPlay()?(i.videoCtlReport({
step:12
}),i.pause4outer()):i.play4outer();
}
var i=this,o=this.opt,n=(o.extinfo,this.container),a=(this.video,n.find(".js_video_play_controll"),
n.find(".js_btn_play")),r=n.find(".js_btn_play_aria"),s=n.find(".js_video_poster"),l=n.find(".js_switch"),u=n.find(".js_progress_bar"),_=n.find(".js_controll"),h=(n.find(".js_played_bar"),
n.find(".js_page_video")),c=n.find(".js_full_mask"),p=n.find(".js_video_pause_controll"),g=n.find(".js_full_screen_control"),f=n.find(".js_loading"),m=n.find(".js_share_btn");
this.opt.canShareVideo&&(m[0]&&d.tap(m[0],function(){
i.callJsapiShareVideo({
action:"shareEmbedMpVideo"
});
}),d.longtap(this.container[0],function(e){
_[0].contains(e.target)||e.target===_[0]||i.callJsapiShareVideo({
action:"longPressEmbedMpVideo"
});
})),d.on(p[0],"tap",".js_btn_pause",function(){
i.play4outer();
});
var v=void 0,w=void 0,y=0,T=0,b=0,P=i.__getDuration(),j=0,C=0,B=1,F=window.user_uin||0,k=0!==F&&Math.floor(F/100)%1e3<B,M=!1,D=void 0,E=void 0,I=0,V=!0,L=!1,H=null;
h.on("touchstart",function(e){
1==e.targetTouches.length&&i.isPlay()&&(o.blockTouchVideo||(H&&(clearTimeout(H),
H=null),D=v=new Date,E=w={
x:e.targetTouches[0].clientX,
y:e.targetTouches[0].clientY
},i._g.touchForwarding=!1,L=!0,V=!0,C=j=i.getCurTime()));
}),h.on("touchmove",function(e){
if(V&&1==e.targetTouches.length&&i.isPlay()&&!o.blockTouchVideo){
var t=new Date,n=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY,r=Math.abs(n-E.x),s=Math.abs(a-E.y);
if(L&&(s>=10||s>r))return V=!1,void(L=!1);
H&&(clearTimeout(H),H=null),L=!1,i._g.touchForwarding=!0;
var l=t-v,d=n-w.x,u=a-w.y,_=Math.sqrt(Math.pow(d,2)+Math.pow(u,2))+b,h=Math.min(Math.ceil(_/l),6);
T=Math.floor(.1*_+.2*h*h*h)*Math.ceil(P/500),b=0==T?_:0,0>d&&(T=-T);
var c=180*Math.atan2(u,d)/Math.PI;
i._g.touchForwarding||(c>=-30&&30>=c&&++y,(c>=150&&180>=c||c>=-180&&-150>=c)&&--y,
(y>=4||-4>=y)&&(5>=_?y=0:(I=Math.max(I,h),i._g.touchForwarding=!0))),i._g.touchForwarding&&(j+=T,
0>j&&(j=0),j>P&&(j=1*P),i.__setForwardBar(j),e.preventDefault()),w={
x:n,
y:a
},v=t;
}
}),h.on("touchend",function(e){
if(i._g.touchForwarding){
if(H=setTimeout(function(){
i.play(j);
},0),k&&(S.setSum(28307,29,1),!M)){
var t=(new Date,{
x:e.changedTouches[0].clientX,
y:e.changedTouches[0].clientY
}),o=t.x-E.x,n=t.y-E.y,a=parseInt(Math.sqrt(Math.pow(o,2)+Math.pow(n,2))),r=parseInt(180*Math.atan2(n,o)/Math.PI);
r>=-30&&30>=r||r>=150&&180>=r||r>=-180&&-150>=r||S.setSum(28307,35,1),S.setSum(28307,31,1),
S.setSum(28307,33,a),S.setSum(28307,34,I),M=!0;
}
i._seekReport(),i._trigger("handDragComplete",{
playTime:j,
startDragVideoTime:C
}),e.preventDefault();
}
i.hideTouchForward(),T=0,L=!1,i._g.touchForwarding=!1,V=!0,y=0;
}),h.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!x&&e.preventDefault();
}),d.tap(h[0],function(e){
e.target===_[0]||_[0].contains(e.target)||e.target===m[0]||i.isEnd()||i.isPause()||i._g.touchForwarding||i._trigger("touchVideo");
}),d.tap(c[0],function(){
i.isEnd()||i._trigger("touchVideo");
}),c.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!x&&e.preventDefault();
}),d.tap(r[0],function(){
var o=$(this),n=1*o.data("status");
0==n?(o.addClass("video_playing").data("status","1"),e()):1==n?(o.removeClass("video_playing").data("status","2"),
t()):2==n?(o.addClass("video_playing").data("status","1"),t()):3==n&&(o.addClass("video_playing").data("status","1"),
i._trigger("ariaReplay"));
}),d.tap(a[0],function(){
e();
}),d.tap(f[0],function(){
i._trigger("touchVideo");
}),d.tap(l[0],function(){
t();
}),i.__onTouch=!1,u.on("mousedown",function(e){
i.__hasFuncControllBar&&(_.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
s.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
$(document.body).off("mouseup").on("mouseup",i._event.progressBarMouseup),i._pointerDownHandler({
x:e.pageX||e.clientX,
y:e.pageY||e.clientY,
e:e
}));
}),u.on("touchstart",function(e){
if(i.__hasFuncControllBar){
u.off("touchmove",i._event.progressBarTouchmove).on("touchmove",i._event.progressBarTouchmove),
u.off("touchend",i._event.progressBarTouchend).on("touchend",i._event.progressBarTouchend);
var t=e.changedTouches[0];
i._pointerDownHandler({
e:e,
x:t.pageX,
y:t.pageY
});
}
}),d.tap(g[0],function(e){
return i.isInFullScreen()?x&&i.exitFullScreen():x&&(S.setSum(28307,56,1),i.enterFullScreen()),
e.preventDefault(),!1;
});
},
hideTouchForward:function(){
this.container.find(".js_forward").addClass("none");
},
__firstLoadedFlowNoticeJudge:function(){
if(m.device.inWechat&&parent.window.lastNetworkType&&parent.window.lastNetworkType.networkType&&parent.window.lastNetworkType.simType&&T.isMobileNetwork(parent.window.lastNetworkType.networkType)&&1!==parent.window.lastNetworkType.simType){
var e=void 0;
e=this.opt.flow<100&&this.opt.flow>0?T.isVideoNeedFlowNotice(this.opt.flow,1):T.isVideoNeedFlowNotice(this.opt.flow,5),
e&&(this.opt.flow<100&&this.opt.flow>0?this.__showFlowNotice_1():this.__showFlowNotice_2(this.opt.flow));
}
},
__showFlowNotice_1:function(){
this.videoCtlReport({
step:16,
noticeType:1
}),this._trigger("flowNotice",{
flow:parseInt(1024*this.opt.flow),
noticeType:1
}),this.__flowNoticeTimer&&(clearTimeout(this.__flowNoticeTimer),this.__flowNoticeTimer=null);
var e=this.container.find(".js_video_flow").removeClass("flow_fade_out");
this.container.find(".js_flow_notice_1").show(),this.container.find(".js_flow_notice_2").hide(),
e.show(),e.addClass("flow_fade_out");
},
__showFlowNotice_2:function(e){
this.videoCtlReport({
step:16,
noticeType:2
}),this._trigger("flowNotice",{
flow:parseInt(1024*this.opt.flow),
noticeType:2
}),this.__flowNoticeTimer&&(clearTimeout(this.__flowNoticeTimer),this.__flowNoticeTimer=null),
this.container.find(".js_flow_notice_2").show(),this.container.find(".js_flow_notice_1").hide(),
this.container.find(".js_video_flow_num").html(e+"M"),this.container.find(".js_video_flow").removeClass("flow_fade_out").show(),
this.container.find(".js_video_flow").addClass("flow_fade_out");
},
__hideFlowNotice:function(){
this.__flowNoticeTimer&&(clearTimeout(this.__flowNoticeTimer),this.__flowNoticeTimer=null),
this.container.find(".js_video_flow").hide();
},
_pointerDownHandler:function(e){
this.__onTouch=!0,this.showControllBar(),this.progressBarSeekData={
x1:e.x,
y1:e.y,
startTime:this.video.currentTime
},this.pause(),e.e.preventDefault();
},
_pointerMoveHandler:function(e){
var t=this.container.find(".js_played_bar"),i=this.container.find(".js_progress_bar");
this.__onTouch=!0,this.__has_drag=!0,this.progressBarSeekData.x2=e.x,this.progressBarSeekData.y2=e.y;
var o=t.offset(),n=i.width(),a=(e.x-o.left)/n,r=this.__getDuration(),s=1*(r*a).toFixed(4);
s>r&&(s=r-1);
var l=!1;
"undefined"==typeof this.progressBarSeekData.dragTime&&(l=!0);
var d=Math.abs(1*s-1*this.progressBarSeekData.dragTime);
(l||d>=.5)&&(this.progressBarSeekData.dragTime=s,k("_pointerMoveHandler set currentTime, dragTime:"+this.progressBarSeekData.dragTime+" currentTime:"+this.video.currentTime),
this.video.currentTime=this.progressBarSeekData.dragTime,this.__setPlayTime(this.progressBarSeekData.dragTime)),
this.__setControllBar(a),e.e&&e.e.preventDefault();
},
_pointerUpHandler:function(e){
var t=this;
e.e.preventDefault(),this.container.find(".js_controll").off("mousemove",t._event.progressBarMousemove),
this.container.find(".js_video_poster").off("mousemove",t._event.progressBarMousemove),
$(document.body).off("mouseup",t._event.progressBarMouseup),this.container.find(".js_progress_bar").off("touchmove",t._event.progressBarTouchmove).off("touchend",t._event.progressBarTouchend),
"undefined"==typeof this.progressBarSeekData.dragTime&&this._pointerMoveHandler({
x:e.x,
y:e.y
});
var i=this.progressBarSeekData.dragTime,o=this.progressBarSeekData.startTime;
i==this.video.currentTime&&(i-=.1),this.progressBarSeekData.startTime&&t.__dragTimes.push(Math.round(1e3*this.progressBarSeekData.startTime)+":#:"+Math.round(1e3*i)),
this.progressBarSeekData=null,k("_pointerUpHandler dragTime:"+i+" currentTime:"+this.video.currentTime),
setTimeout(function(){
t.__onTouch=!1,t.__forcePause=!1,t.isEnd()||(t.showLoading(),t.play(i),t._seekReport(),
t._trigger("barDragComplete",{
playTime:i,
startDragVideoTime:o
}));
},0),this.__hideControllTimeout();
},
_seekReport:function(){
this.videoCtlReport({
step:13
});
},
_hidePlayControllBar:function(){
this.container.find(".js_video_pause_controll").hide(),this._g.isUserPause&&m.device.inWechat&&("wifi"===this._g.pauseNetType&&T.isVideoNeedFlowNotice(this.opt.flow,3)||T.isNoneNetwork(this._g.pauseNetType)&&T.isVideoNeedFlowNotice(this.opt.flow,4)?this.__showFlowNotice_1():(this._g.isUserPause=!1,
this._g.pauseNetType=null)),this.__hideControllTimeout();
},
_showPlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
this.isEnd()||(this.opt.pauseShowControll?(e.hide(),this.showControllBar()):(this.hideControllBar({
showShareBtn:!!this.opt.canShareVideo
}),e.show(),this.container.find(".js_video_play_controll").hide()));
},
_addSerialTimeupdate:function(){
var e=this.video.currentTime,t=this._g.serialTimeupdateCache.length;
e>0&&(0==t||this._g.serialTimeupdateCache[t-1].currentTime!=e)&&(this._g.serialTimeupdateCache.length>=this._g.timeupdateCacheCount&&this._g.serialTimeupdateCache.shift(),
this._g.serialTimeupdateCache.push({
currentTime:e,
timeStamp:+new Date
}));
},
_checkPlayBySerialTimeupdate:function(){
if(this._g.serialTimeupdateCache.length<this._g.timeupdateCacheCount)return!1;
var e=this._g.serialTimeupdateCache.length,t=this._g.serialTimeupdateCache[e-1],i=this._g.serialTimeupdateCache[e-this._g.timeupdateCacheCount];
return t.timeStamp-i.timeStamp<2500?!0:!1;
},
_showPlayer:function(){
var e=this.container.find(".js_page_video");
e.show();
},
_hidePlayer:function(){
var e=this.container.find(".js_page_video");
e.hide();
},
__setPlayTime:function(e){
this.container.find(".js_now_play_time").text(I(e));
},
__setControllBar:function(e){
e=Math.ceil(100*e),0>e&&(e=0),e>100&&(e=100);
this.video,this.duration;
this.__setBufferBar(e),e+="%";
var t=this.container;
t.find(".js_played_bar").css({
width:e
}),t.find(".js_played_speed_cnt").css({
left:e
});
},
__setForwardBar:function(e){
var t=this.container,i=(this.video,this.__getDuration()),o=e/i;
t.find(".js_forward").removeClass("none"),t.find(".total_time").text(I(i)),t.find(".js_forward_bar").css("width",100*o+"%"),
t.find(".js_forward_play_time").text(I(e));
},
__setBufferBar:function(e){
var t=this.container,i=this.video,o=this.__getDuration(),n=i.currentTime;
e=e||n/o;
var a=e;
i.buffered&&i.buffered.length>0&&i.buffered.end&&o&&(a=i.buffered.end(0)/o,a=Math.max(e,Math.ceil(parseInt(100*a))),
a>98&&(a=100)),t.find(".js_buffer_bar").css({
width:a+"%"
});
},
__resetVideo:function(){
this.$video.remove();
var e=this.container,t=e.find(".js_video_poster");
t.append("<video></video>");
{
var i=this.$video=t.find("video");
this.video=i[0];
}
this.__canplay=!1,this.__forcePause=!1,this.__initVideo(),this.__iosPreloadPause=!1,
this.__iosPreloadPlayFlag=!1,this.__bindVideoEvent();
},
_trigger:function(e,t){
var i=this,o=this;
if("timeupdate"!==e||"timeupdate"===e&&this._g.triggerTimeupdateLog){
"timeupdate"===e&&(this._g.triggerTimeupdateLog=!1,setTimeout(function(){
i._g.triggerTimeupdateLog=!0;
},5e3));
try{
var n="",a=Object.prototype.toString.call(t);
n="[object String]"===a?t:"[object Object]"===a||"[object Array]"===a?JSON.stringify(t):"no params",
this._jsapiLog("trigger:"+e+";arg:"+n+";");
}catch(s){}
}
if("readyBeginPlay"==e&&(o.__iosPreloadPlayFlag=!1),"play"==e&&0==o.__iosPreloadPlayFlag){
if(o.__iosIsRealPreload&&r(o.video,!1),o.__forcePause=!1,o.opt.notPauseOtherVideoWhenPlay||p.broadcastMessage({
type:"broadcastPlay",
data:{
id:this.id
}
}),window.parent.originalVideoAdFrames&&0!=window.parent.originalVideoAdFrames.length)for(var l=0;l<window.parent.originalVideoAdFrames.length;l++)window.parent.originalVideoAdFrames[l].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");
g.postMessage(window.parent,"onVideoPlayV2",{
vid:f.getQuery("vid")
});
}
var d=this.plugins,u=this._blockPlugin[e]||this._blockPlugin.all,_=0;
if(u&&"function"==typeof u.recv&&(_|=u.recv(e,t),1&_))return!1;
for(var l=0,h=d.length;h>l&&(_|=d[l].recv(e,t),!(2&_));++l);
if(!(this._blockInnerHandler||4&_)){
var c=this["__"+e+"Handler"];
c&&c.call(this,t);
}
8&_||this.__triggerOutside(e,t);
},
_setBlockInnerHandler:function(e){
this._blockInnerHandler=e;
},
_setBlockPlugin:function(e,t){
this._blockPlugin[e]=t;
},
_getContainer:function(){
return this.container;
},
_setCover:function(e,t){
this.container.find(".js_poster_cover").css(t),this.opt.cover=e,this._g.coverBase64="";
},
_removeCover:function(e){
var e=e||{
"background-image":"none"
};
this.container.find(".js_poster_cover").css(e);
},
_afterReplay:function(){
this.__hasBeginPlay=!0,this.__userplaytime=!0,this.__firstPlayStart=+new Date,this.showLoading(),
this.play(),this._trigger("afterReplay");
},
setSrc:function(e,t,i){
var o=this,n=this.$video,a=(this.opt,this.video);
this.src=e,(!o.__iosPreloadPause||i)&&o.__initData(),o.__initVideo(),this.showCover(),
o.log.loadwait_start=+new Date,(!n.attr("src")||i)&&(n.attr("src",e),m.proxyPreloadExper()&&m.proxyPreloadExper().isUsePreload&&_.os.ios&&!o.opt.ad_muted_btn&&!function(){
var e=function t(){
o.__iosPreloadPause=!0;
var e=function i(){
o._g.iosPreloadTmpPlay=!1,a.removeEventListener("pause",i,!1);
};
a.addEventListener("pause",e,!1),a.pause(),o._trigger("ready",o.opt),a.removeEventListener("canplay",t,!1);
};
a.addEventListener("canplay",e,!1),4!==a.readyState&&(o._g.iosPreloadTmpPlay=!0,
o.__iosPreloadPlayFlag=!0,o.__iosIsRealPreload=!0,r(a,!0),a.play());
}()),a.preload=t||"metadata",n.on("loadedmetadata",function(){
if(o.__videoDurationchange(),o.__playQueue&&o.__playQueue.length>0){
var e=o.__playQueue[0].sec;
o.__playQueue=[],o.play(e);
}
}),a.duration>0&&1!=a.duration&&o.__videoDurationchange();
},
videoCtlReport:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this.opt.extinfo;
if(t){
var i={
step:e.step,
vid:t.vid,
hit_bizuin:t.hit_bizuin,
hit_vid:t.hit_vid,
traceid:t.pageplayer._getTraceId(),
orderid:t.pageplayer._getOrderid(),
ori_status:t.pageplayer._getOriStatus(),
type:this.opt.videoReportType,
fromid:t.pageplayer._getFromid()
};
e.step>=16?(i.remind_traffic_size=parseInt(1024*this.opt.flow),i.traffic_reminder_type=e.noticeType,
h.commReport(i)):h.report(i);
}
},
videoEnd:function(){
this.changeStatus({
status:"end",
subStatus:""
}),this.__endCountTime(),this._trigger("end");
},
replay:function(){
this.container.find(".js_video_play_controll").hide(),this._trigger("readyBeginPlay"),
this._trigger("replay");
},
resetVideo:function(){
this.opt.autoReplay||(this.opt.autoplay=!1),this.container.find(".js_video_poster").hide(),
this.showCover(),this.__resetVideo(),this._trigger("loading");
},
setSrcWithTime:function(e){
var t=this.video.currentTime;
this.resetVideo(),this.setSrc(e,!1,!0),this._jsapiLog("lastPlayTime:"+t),this.__continueSec=t;
},
changeStatus:function(e){
var t=this._g;
if(t.statusDefine[e.status]&&(!e.subStatus||t.subStatusDefine[e.subStatus]||"error"===e.status)&&(t.status!==e.status||t.subStatus!==e.subStatus)){
var i=0;
"end"===e.status||"error"===e.status?(this._playingBufferingStartTime=null,this.__userplaytime=!1):"pause"===e.status?this._playingBufferingStartTime=null:"play"===e.status&&"playing"===e.subStatus&&null!==this._playingBufferingStartTime?(i=+new Date-this._playingBufferingStartTime,
this._playingBufferingStartTime=null):!this.__hasBeginPlay||!this.__canplay||this.__userplaytime||"loading"!==e.status||"waiting"!==e.subStatus&&"seeking"!==e.subStatus||null!==this._playingBufferingStartTime||(this._playingBufferingStartTime=+new Date);
var o=t.status,n=t.subStatus;
t.status=e.status,t.subStatus=e.subStatus;
var a=["player statusChange, preStatus:",o,"; status:",t.status,"; preSubStatus:",n,"; subStatus:",t.subStatus,"; video_duration:",this.video?this.video.duration:"0","; getvinfo_duration:",this.opt.duration,"; current_time:",this.video?this.video.currentTime:"0","; play_total_time:",this.getPlayTotalTime()].join("");
this._jsapiLog(a),k(a),p.broadcastMessage({
type:"statusChange",
data:{
id:this.id,
preStatus:o,
preSubStatus:n,
status:t.status,
subStatus:t.subStatus
}
}),this._trigger("statusChange",{
currentTime:this.video.currentTime,
preStatus:o,
preSubStatus:n,
status:t.status,
subStatus:t.subStatus
}),i&&this._trigger("playingBufferingTime",{
bufferingTime:i
});
}
},
play:function(e){
var t=this.video,i=this;
if(!i.isEnd()){
if(!t||0==t.readyState)return void(this.__playQueue[0]={
sec:e
});
e*=1;
try{
if(isNaN(e)||"number"!=typeof e)i.__canplay&&i.isPause()||0==t.currentTime?t.play():t.currentTime=0;else{
var o=this.__getDuration();
e>=o&&(e=o-1),0>e&&(e=0),e=1*(1*e).toFixed(4),i.__last_playtime=e,i.__setPlayTime(e),
t.currentTime==e?t.play():t.currentTime=e;
}
}catch(n){
0==t.currentTime?t.play():t.currentTime=0;
}
}
},
pause:function(){
var e=this.video;
e&&0==e.readyState||(this.__replaySec=null,this.waitingHandlerTimer&&(clearTimeout(this.waitingHandlerTimer),
this.waitingHandlerTimer=null),e.pause(),k(this.id+":pause function"));
},
getCoverBase64:function(){
var e=this,t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.coverBase64?"function"==typeof t.callback&&t.callback({
cover64:this._g.coverBase64||""
}):!function(){
var i=e,o=new Image;
o.crossOrigin="anonymous",o.onload=function(){
this.onload=null,this.onerror=null;
try{
var e=this.naturalWidth||this.width,o=this.naturalHeight||this.height,n=document.createElement("canvas"),a=n.getContext("2d");
n.style.width=e+"px",n.width=e,n.style.height=o+"px",n.height=o,a.drawImage(this,0,0,e,o),
i._g.coverBase64=n.toDataURL("image/jpeg",1);
}catch(r){
this._jsapiLog("jsapi shareEmbedMpVideo error:"+r),i._g.coverBase64="";
}
"function"==typeof t.callback&&t.callback({
cover64:i._g.coverBase64
});
},o.onerror=function(){
this.onload=null,this.onerror=null,"function"==typeof t.callback&&t.callback({
cover64:""
});
},o.src=e.opt.cover;
}();
},
callJsapiShareVideo:function(){
var e=this,t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(this.opt.extinfo&&this.opt.extinfo.preview)return void p.postMessage({
type:"showTips",
data:{
msg:"预览图文中的视频不可分享"
}
});
if(!this._g.loadingCoverBase64){
var i=function(){
var i="",o="",n="";
try{
i=parent.window.msg_link.html(!1),o=parent.window.user_name||(window.cgiData?window.cgiData.username||window.cgiData.user_name:"")||"",
n=parent.window.nickname||(window.cgiData?window.cgiData.nick_name:"")||"";
}catch(a){
e._jsapiLog(t.action+" jsapi error:"+a);
}
var r=e.opt.extinfo,s="";
r&&(s=r.vid);
var l={
action:t.action,
mpUrl:i,
bizUsrName:o,
bizNickName:n,
videoVid:s,
videoUrl:f.addParam(e._g.oriSrc||e.src||e.opt.src,"video_md5",e.opt.videoMd5||""),
videoThumbUrl:e.opt.cover,
videoThumbData:e._g.coverBase64,
videoTitle:e.opt.videoTitle,
videoDuration:1*e.opt.duration
};
y.invoke("handleMPPageAction",l,function(){});
};
this._g.loadingCoverBase64=!0,this.getCoverBase64({
callback:function(){
e._g.loadingCoverBase64=!1,i();
}
});
}
},
onFullScreenChange:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.type,i=e.state,o=this.$video;
i?(o.parents(".js_inner").removeClass("not_fullscreen"),this.__isInFullScreen=!0):(o.parents(".js_inner").addClass("not_fullscreen"),
this.hideLoading(),this.__isInFullScreen=!1),this._trigger("fullscreenchange",{
state:i,
type:t
}),p.broadcastMessage({
type:"fullscreenchange",
data:{
fullScreen:this.__isInFullScreen,
type:t,
id:this.id
}
});
},
enterFullScreen:function(){
var e=this,t=function(){
e._g.jsapiFullScreenId&&(clearTimeout(e._g.jsapiFullScreenId),e._g.jsapiFullScreenId=null);
var t=e.video;
t.requestFullscreen?(t.requestFullscreen(),e.__isInFullScreen=!0):t.mozRequestFullScreen?(t.mozRequestFullScreen(),
e.__isInFullScreen=!0):t.webkitRequestFullscreen?(t.webkitRequestFullscreen(),e.__isInFullScreen=!0):t.webkitEnterFullscreen&&(t.webkitEnterFullscreen(),
e.__isInFullScreen=!0);
};
if(this._g.jsapiFullScreenId&&(clearTimeout(this._g.jsapiFullScreenId),this._g.jsapiFullScreenId=null),
!this.opt.jsapiFullScreen||this._g.jsapiFullScreenErrCnt>=this._g.jsapiFullScreenErrLimit)return void t();
_.os.android||this.pause4outer({
triggerEvent:!1
});
var i="",o="",n="",a="",r="",s=this;
try{
if(r=parent.window.source||"",i=parent.window.msg_link.html(!1),o=parent.window.user_name||(window.cgiData?window.cgiData.username||window.cgiData.user_name:"")||"",
n=parent.window.nickname||(window.cgiData?window.cgiData.nick_name:"")||"",this.opt.videoCrossOrigin){
var l=document.createElement("canvas"),d=l.getContext("2d");
l.style.width=this.opt.videoWidth+"px",l.width=this.opt.videoWidth,l.style.height=this.opt.videoHeight+"px",
l.height=this.opt.videoHeight,d.drawImage(this.$video[0],0,0,this.opt.videoWidth,this.opt.videoHeight),
a=l.toDataURL("image/jpeg",1);
}
}catch(u){
this._jsapiLog("jsapi enterfullsrceen error:"+u);
}
var h=this.$video[0],c=null,p=null;
try{
for(p=h.getBoundingClientRect(),c={
left:p.left,
top:p.top,
height:p.bottom-p.top,
width:p.right-p.left
};h.ownerDocument.defaultView.parent!==window&&(h=h.ownerDocument.defaultView.frameElement);)p=h.getBoundingClientRect(),
c.left+=p.left,c.top+=p.top;
c.left=Math.round(c.left),c.top=Math.round(c.top),c.height=Math.round(c.height),
c.width=Math.round(c.width);
}catch(u){
this._jsapiLog("jsapi enterfullsrceen error:"+u),c={
left:0,
top:0,
height:0,
width:0
};
}
var g=this.opt.extinfo,m="";
g&&(m=g.vid);
var v={
action:"enterEmbedMpVideo",
mpBizUin:this.opt.__biz||"",
mpAppMsgId:this.opt.mid||"",
mpIndex:this.opt.idx||"",
mpUrl:i,
bizUsrName:o,
bizNickName:n,
videoUrl:f.addParam(this._g.oriSrc||this.src||this.opt.src,"video_md5",this.opt.videoMd5||""),
videoTitle:this.opt.videoTitle,
videoCurrTime:this.getCurTime(),
videoWidth:this.opt.videoWidth,
videoHeight:this.opt.videoHeight,
videoThumbUrl:this.opt.cover,
videoDuration:1*this.opt.duration,
videoVid:m,
playerX:c.left,
playerY:c.top,
playerWidth:c.width,
playerHeight:c.height,
subscene:1*r,
headImgUrl:this.opt.headImgUrl,
currFrameData:a,
forbidForward:this.opt.canShareVideo?0:1
};
this.__isInFullScreen=!0,a&&(this._g.jsapiFullScreenId=setTimeout(function(){
e.__isInFullScreen=!1;
},2e3)),y.invoke("handleMPPageAction",v,function(e){
s._g.jsapiFullScreenId&&(clearTimeout(s._g.jsapiFullScreenId),s._g.jsapiFullScreenId=null),
/:ok$/.test(e.err_msg)?(s.__isInFullScreen=!0,s.onFullScreenChange({
state:!0,
type:"jsapi"
})):(s.__isInFullScreen=!1,_.os.android||s.play4outer(0/0,{
triggerEvent:!1
}),s._g.jsapiFullScreenErrCnt++);
}),_.os.android&&(parent.window.CustomFullscreenApi&&"function"==typeof parent.window.CustomFullscreenApi._customEnterFullscreen&&parent.window.CustomFullscreenApi._customEnterFullscreen(!0),
t());
},
exitFullScreen:function(){
this.video;
this.hideLoading(),document.webkitExitFullscreen&&document.webkitExitFullscreen(),
this.__isInFullScreen=!1;
},
isInFullScreen:function(){
return!!this.__isInFullScreen;
},
play4outer:function(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
this.__forcePause=!1,this.play(e),t.triggerEvent!==!1&&this._trigger("userplay"),
this._hidePlayControllBar();
},
pause4outer:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this.hideLoading(),this.pause(),e.triggerEvent!==!1&&this._trigger("userpause"),
this.hideControllBar(),this._showPlayControllBar();
},
setWidth:function(e){
this.container.find(".js_page_video").css({
width:e
});
},
setHeight:function(e){
this.container.find(".js_page_video").css({
height:e
});
},
showCover:function(){
this.container.find(".js_poster_cover").show();
},
hideCover:function(){
this.container.find(".js_poster_cover").hide();
},
showFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.show(),this.__hasFuncControllBar=!0;
},
hideFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.hide(),this.__hasFuncControllBar=!1;
},
showControllBar:function(){
this.__touchVideoTimeoutHandler&&clearTimeout(this.__touchVideoTimeoutHandler),this.__timerHideControll&&(clearTimeout(this.__timerHideControll),
this.__timerHideControll=null),this.__userplaytime||this.container.find(".js_controll").removeClass("opr_fade_out").show(),
this.opt.canShareVideo&&(this.__userplaytime?this.container.find(".js_page_video").addClass("wx_video_status_initial"):this.container.find(".js_page_video").removeClass("wx_video_status_initial"),
this.container.find(".js_share_btn_contain").removeClass("opr_fade_out").show());
},
hideControllBar:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this.container.find(".js_controll"),i=this.container.find(".js_share_btn_contain");
t.removeClass("opr_fade_in");
var o=this;
o.__timerHideControll&&clearTimeout(o.__timerHideControll),t.addClass("opr_fade_out"),
e.showShareBtn!==!0?i.removeClass("opr_fade_in").addClass("opr_fade_out"):i.removeClass("opr_fade_out").show(),
o.__timerHideControll=setTimeout(function(){
t.hide(),e.showShareBtn!==!0&&i.hide();
},500);
},
showLoading:function(e){
var t=this;
this.__always_hide_loading||this.__isshowLoading&&this.video&&this.video.currentTime>1||(this.__isshowLoading=!0,
this._g.resetShowingLoadingTimeoutId&&(clearTimeout(this._g.resetShowingLoadingTimeoutId),
this._g.resetShowingLoadingTimeoutId=null),this._g.resetShowingLoadingTimeoutId=window.setTimeout(function(){
t.__isshowLoading=!1;
},1e3),this._g.showingLoadingTimeoutId&&(clearTimeout(this._g.showingLoadingTimeoutId),
this._g.showingLoadingTimeoutId=null),"firstTime"==e?this.container.find(".js_loading").addClass("start_loading").show():this._g.showingLoadingTimeoutId=setTimeout(function(){
t.container.find(".js_loading").show();
},800));
},
hideLoading:function(){
this.container.find(".js_loading").removeClass("start_loading").hide(),this._g.showingLoadingTimeoutId&&(clearTimeout(this._g.showingLoadingTimeoutId),
this._g.showingLoadingTimeoutId=null);
},
triggerMuted:function(e){
e?(r(this.video,!0),this.container.find(".js_muted_btn").addClass("muting")):(r(this.video,!1),
this.container.find(".js_muted_btn").removeClass("muting"));
},
setVideoCSS:function(e){
var t=this,i=t.container,o=i.find(".js_page_video");
o.css(e);
},
afterFirstLoaded:function(){
this.__userplaytime&&(this.__userplaytime=!1,this.reportRealLoadingTime(),this._trigger("touchVideo",{
isShow:!0
}));
},
reportRealLoadingTime:function(){
var e=this;
e.__firstPlayEnd=+new Date;
var t=parseInt(e.__firstPlayEnd-e.__firstPlayStart);
if(console.info("[视频点击播放耗时]",t),e._trigger("firstBufferingTime",{
bufferingTime:t
}),m.proxyPreloadExper()){
var i=w.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
1==m.proxyPreloadExper().experSet?v.saveSpeeds({
sample:1,
uin:window.encodeURIComponent(w.toBase64(window.user_uin))||uin,
pid:1045,
speeds:{
sid:21,
time:t
},
user_define:i
}):2==m.proxyPreloadExper().experSet?v.saveSpeeds({
sample:1,
uin:window.encodeURIComponent(w.toBase64(window.user_uin))||uin,
pid:1045,
speeds:{
sid:22,
time:t
},
user_define:i
}):3==m.proxyPreloadExper().experSet?v.saveSpeeds({
sample:1,
uin:window.encodeURIComponent(w.toBase64(window.user_uin))||uin,
pid:1045,
speeds:{
sid:23,
time:t
},
user_define:i
}):4==m.proxyPreloadExper().experSet&&v.saveSpeeds({
sample:1,
uin:window.encodeURIComponent(w.toBase64(window.user_uin))||uin,
pid:1045,
speeds:{
sid:24,
time:t
},
user_define:i
}),v.send();
}
},
hasFullScreen:function(){
return this.isInFullScreen();
},
hasDrag:function(){
return!!this.__has_drag;
},
getCurTime:function(){
return this.video.currentTime;
},
getEndDom:function(){
return this.container.find(".js_end_dom");
},
getDrag:function(){
return this.__dragTimes;
},
getPlayTotalTime:function(){
return this.__endCountTime(),this.__play_total_time;
},
getLog:function(){
var e=this.log||{};
return{
hasended:e.hasended,
last_ms:Math.floor(1e3*(e.lastsec||0)),
duration_ms:Math.floor(1e3*(e.duration||0)),
video_error:e.video_error||0,
video_error_code:e.video_error_code||0,
loadwait:e.loadwait||0
};
},
isPlay:function(){
return!this.video.paused&&!this.isEnd();
},
isPause:function(){
return!!this.video.paused;
},
isEnd:function(){
return!!this.video.ended;
},
hasBeginPlay:function(){
return this.__hasBeginPlay;
},
destroy:function(){
p.removeListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
try{
delete parent.window.__MpPlayers[this.id];
}catch(e){}
C.visibilityPausePlayer===this&&(C.visibilityPausePlayer=null);
},
_setBeginPlayStatus:function(){
var e=this;
this.hideLoading(),this.container.find(".js_video_play_controll").css({
display:"block"
});
var t=this.opt.duration;
t&&t>0&&this.container.find(".js_video_length").html(I(t)).show(),1==this.__iosPreloadPause&&!function(){
var t=e;
setTimeout(function(){
var e=t.container.find(".js_video_pause_controll");
e.hide();
var i=t.container.find(".js_video_play_controll");
i.show();
});
}();
},
hidePlayBtn:function(){
this.container.find(".js_video_play_controll").hide();
}
}),V._getFormatTime=I,V;
});define("a/tpl/mpda_bottom_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n        <span class="weui-loadmore__tips js_ad_opt_list_btn_0">广告<!--投诉入口 begin-->\n            <div class="mpad_more js_mpad_more">\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_0" style="display:none">\n                    <li class="mpad_more_list_ele">\n                        <a class="mpad_more_list_ele_container js_complain_btn_0" href="javascript:;">投诉</a>\n                    </li>\n                </ul>\n            </div>\n            <!--投诉入口 end--> \n        </span>\n    </div>\n    <!--广告插入位置-->\n    <#=adTpl#>\n</div>';
});define("a/tpl/crt_size_map.js",["a/a_config.js","biz_wap/utils/ajax.js","a/a_sign.js","biz_common/utils/url/parse.js","a/tpl/new_cpc_tpl.html.js","a/tpl/sponsor_tpl.html.js","a/tpl/banner_tpl.html.js","a/tpl/cardticket_tpl.html.js","a/tpl/info_tpl.html.js","a/tpl/smallcard_tpl.html.js","a/tpl/promote_tpl.html.js","a/tpl/banner_info_tpl.html.js","a/tpl/smallbanner_info_tpl.html.js","a/tpl/smallbanner_msg_tpl.html.js"],function(t){
"use strict";
function a(t){
t.biz_info.is_subscribed?(t.btn_text="查看",window.__addIdKeyReport&&window.__addIdKeyReport(24729,65,1)):window.__addIdKeyReport&&window.__addIdKeyReport(24729,64,1);
}
var _=t("a/a_config.js"),e=t("biz_wap/utils/ajax.js"),n=t("a/a_sign.js"),p=t("biz_common/utils/url/parse.js");
return{
484:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
renderData:{
isVideo:!1,
superscript:!0
}
},
996:{
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!1,
has_desc:!0
}
},
997:{
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!1,
has_desc:!0
}
},
998:{
multiLogic:[{
selection:{
pos_type:_.AD_POS.POS_SPONSOR
},
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!0,
has_desc:!0
}
},{
selection:{
pos_type:_.AD_POS.POS_BOTTOM
},
tpl:t("a/tpl/banner_tpl.html.js")
}]
},
135:{
multiLogic:[{
selection:{
pos_type:_.AD_POS.POS_BOTTOM,
product_type:_.AD_TYPE.CARD_PRODUCT_TYPE
},
tpl:t("a/tpl/cardticket_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.card_info.card_title,t.avatar=t.card_info.card_logo_url,t.desc=t.card_info.card_brand_name,
t;
}
},{
selection:{
pos_type:_.AD_POS.POS_BOTTOM,
product_type:_.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE
},
tpl:t("a/tpl/info_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.avatarTitle,t.desc=t.hint_txt,a(t),t;
},
renderData:{
isWxapp:!1
}
}]
},
267:{
tpl:t("a/tpl/smallcard_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.mp_shop_info.name,t.avatar=t.mp_shop_info.img,t.priceBefore=parseInt(t.mp_shop_info.ori_price/100),
t.price=parseInt(t.mp_shop_info.cur_price/100),t;
}
},
133:{
tpl:t("a/tpl/banner_tpl.html.js")
},
420:{
tpl:t("a/tpl/banner_tpl.html.js")
},
134:{
tpl:t("a/tpl/promote_tpl.html.js"),
paramsAlias:{
title:"hint_txt",
desc:"ad_desc",
avatar:"image_url"
}
},
538:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
renderData:{
isVideo:!0,
tag_pos:-1,
price:!1,
superscript:!1
},
paramsAlias:{
title:"avatarTitle"
}
},
567:{
tpl:t("a/tpl/banner_tpl.html.js")
},
354:{
tpl:t("a/tpl/banner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.hint_txt&&(t.desc=t.hint_txt.split("|")[0],t.suply_desc=t.hint_txt.split("|")[1]||""),
t.product_type==_.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?(t.title=t.avatarTitle,t.size=t.app_info.app_size):(t.product_type==_.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==_.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
t.size=t.app_info.app_size,"进入应用"==t.btn_text&&(t.btn_text="进入")),t;
}
},
117:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==_.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==_.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==_.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"进入应用"==t.btn_text&&(t.btn_text="进入")),a(t),t;
}
},
355:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==_.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==_.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==_.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"进入应用"==t.btn_text&&(t.btn_text="进入")),a(t),t;
}
},
568:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==_.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==_.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==_.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"进入应用"==t.btn_text&&(t.btn_text="进入")),a(t),t;
}
},
677:{
tpl:t("a/tpl/smallbanner_msg_tpl.html.js"),
paramsPreHandler:function(t){
var a=t.shop_image;
return t.shop_image.length>0&&(a=a[0]),t.banner=a.image_url,t.title=t.hint_txt,t.tags=a.mp_tags,
t;
}
},
708:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
paramsPreHandler:function(t){
return t.isVideo=!1,t.price="",t.tag_pos="",t.superscript="",a(t),t;
},
afterRender:function(t,a){
function _(){
i.style.display="none";
}
if(a){
var i=a.getElementsByClassName("js_mpad_cpc_ft_msg_contact")[0];
i&&setTimeout(function(){
var a=["aid="+t.aid,"appid="+t.biz_appid,"pass_ticket="+window.pass_ticket,"pos_type="+t.pos_type,"sn="+window.sn,"user_uin="+window.user_uin,"uxinfo="+(t.uxinfo||"")].join("&");
n.createSign({
beforeSign:a,
timeout:2e3
},function(n,l,r,s){
e({
url:p.join("/mp/getappmsgad",{
action:"getbizext",
ad_sign_data:n,
ad_sign_k1:l,
ad_sign_k2:r,
ad_sign_md5:s,
pos_type:t.pos_type,
aid:t.aid,
pass_ticket:encodeURIComponent(window.pass_ticket)
},!0),
type:"POST",
notEncode:!0,
data:{
sn:window.sn,
appmsgid:window.appmsgid,
idx:window.idx,
appid:t.biz_appid,
__biz:window.biz,
mid:window.mid,
send_time:window.send_time||"",
uxinfo:t.uxinfo||"",
before_sign:a
},
success:function(t){
try{
t=JSON.parse(t);
}catch(a){
return void _();
}
if(!t.biz_info)return void _();
var e=i.getElementsByTagName("span")[0],n=i.getElementsByTagName("span")[1],p=t.biz_info.original_cnt>=10?t.biz_info.original_cnt+"篇原创文章":"",l=t.biz_info.comm_sub_cnt>0?t.biz_info.comm_sub_cnt+"位朋友关注":"";
p?(e.innerHTML=p,n.innerHTML=l):l?e.innerHTML=l:t.biz_info.signature?e.innerHTML=t.biz_info.signature:_();
},
error:function(){
_();
}
});
});
},1e3);
}
}
}
};
});define("biz_wap/jsapi/cardticket.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var c=e("biz_wap/jsapi/core.js"),r={
openCardDetail:function(e){
function r(){
c.invoke("openCardDetail",{
card_id:e.card_id,
card_ext:e.card_ext
},function(c){
"open_card_detail:fail"==c.err_msg||"open_card_detail:ok"==c.err_msg||"open_card_detail:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("openCardDetail"):e.error&&e.error(c);
});
}
function n(){
c.invoke("batchAddCard",{
card_list:[{
card_id:e.card_id,
card_ext:e.card_ext
}]
},function(c){
"batch_add_card:ok"==c.err_msg||"batch_add_card:fail"==c.err_msg||"batch_add_card:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?r():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("batchAddCard"):e.error&&e.error(c);
});
}
n();
},
supportCardDetail:function(e){
c.invoke("openCardDetail",{
card_id:"err_id"
},function(c){
e.callback(c.err_msg.indexOf("function_not_exist")>=0?!1:!0);
});
},
openCard:function(e){
c.invoke("batchViewCard",{
cardList:[{
cardId:e.cardId,
code:e.code
}]
},function(c){
c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():e.success&&e.success(c);
});
}
};
return r;
});define("biz_common/utils/emoji_panel_data.js",[],function(){
"use strict";
return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,54,55,56,57,60,62,63,64,65,66,67,68,70,74,75,76,78,79,80,81,82,83,84,85,89,92,93,94,95,300,301,302,303,304,305,306,307,204,205,202,206,212,211,313,314,315,316,317,318,319,320,321,322,323,308,309,310,311,312,209,324,215,214];
});define("appmsg/emotion/textarea.js",["appmsg/emotion/dom.js","appmsg/emotion/caret.js","biz_common/dom/class.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(e,t){
"use strict";
function n(){
var e="translate3d(0, 0, 0)";
u.css({
webkitTransform:e,
transform:e
});
}
function a(){
var e=8;
u.on("keydown",function(t){
t.keyCode===e&&i(!0)&&t.preventDefault();
});
}
function i(e){
function t(){
var e=a-1;
0>e&&(e=0);
var t=i.slice(0,e),o=i.slice(a),s=+new Date;
n.value=t+o,f.set(n,e),r(+new Date-s);
}
var n=u.el[0],a=f.get(n),i=n.value,s=4,c=a-s;
0>c&&(c=0,s=a-c);
var v=i.slice(c,a),d=v.match(/\[([\u4e00-\u9fa5\w]+)\]$/g);
if(d){
var p=d[0],_=s-p.length,j=p.replace("[","").replace("]","");
if(o(j)){
var b=v.replace(p,""),g=i.slice(0,c)+b+i.slice(a),h=+new Date;
n.value=g,f.set(n,c+_),r(+new Date-h);
}else{
if(e)return!1;
t();
}
}else{
if(e)return!1;
t();
}
return e?(n.focus(),m.later(function(){
n.focus();
})):(n.blur(),m.later(function(){
n.blur();
})),l(n.value),!0;
}
function o(e){
for(var t=0,n=j.length;n>t;t++)if(j[t]==e)return!0;
return!1;
}
function s(e){
var t=u.el[0],n=f.get(t),a=t.value,a=a.slice(0,n)+e+a.slice(n);
t.value=a,f.set(t,n+e.length+1),t.blur(),m.later(function(){
t.blur();
}),l(a);
}
function r(){}
function l(e){
var t=c.el[0];
e.length<1?v.addClass(t,"btn_disabled"):v.removeClass(t,"btn_disabled");
}
for(var u,c,t={},m=e("appmsg/emotion/dom.js"),f=e("appmsg/emotion/caret.js"),v=e("biz_common/dom/class.js"),d=e("biz_common/utils/emoji_data.js"),p=e("biz_common/utils/emoji_panel_data.js"),_={},j=[],b=0;b<d.length;b++){
var g=d[b];
_[g.id]=g;
}
for(var b=0;b<p.length;b++){
var h=p[b],g=_[h];
j.push(g.cn);
}
return t.init=function(){
u=m("#js_cmt_input"),c=m("#js_cmt_submit"),n(),a();
},t.inputEmotion=function(e,t){
-1===e?i(t):s(j[e-1]);
},t;
});define("appmsg/emotion/nav.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js"],function(n,o){
"use strict";
var t=n("appmsg/emotion/common.js"),a=n("appmsg/emotion/dom.js"),m=a.each,o={};
return o.activeNav=function(n){
t.currentPage=n;
var o=t.navs;
m(o,function(t,a){
a===n?o[a].attr("class","emotion_nav current"):o[a].attr("class","emotion_nav");
});
},o;
});define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:112,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:22
};
});define("appmsg/emotion/slide.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js","appmsg/emotion/nav.js"],function(n,t){
"use strict";
function o(){
function n(n){
n.preventDefault(),n.stopPropagation(),l||(g=!0,i=a(n),u.isMoved=!1,p=+new Date);
}
function t(n){
n.preventDefault(),n.stopPropagation(),!l&&g&&(r=a(n),h=r-i,e(),Math.abs(h)>6&&(u.isMoved=!0));
}
function o(){
l||(g=!1,s());
}
function a(n){
return n.touches&&n.touches.length>0?n.touches[0].clientX:n.clientX;
}
var i,r,p;
c.on("touchstart",n),c.on("mousedown",n),c.on("touchmove",t),c.on("mousemove",t),
c.on("touchend",o),c.on("mouseup",o);
}
function e(){
var n=u.WIDTH,t=-d*n+h,o=n/4;
t>o?t=o:p-o>t&&(t=p-o);
var e="translate3d("+t+"px, 0, 0)";
c.css({
webkitTransform:e,
transform:e
});
}
function s(){
var n=u.WIDTH,t=55,o=parseInt(h/n),e=h%n;
d-=o,Math.abs(e)>t&&(d-=Math.abs(e)/e*1),d>u.pageCount-1?d=u.pageCount-1:0>d&&(d=0),
h=0,a(d);
}
function a(n){
l=!0,f=-n*u.WIDTH,i(),e(),setTimeout(function(){
l=!1,r();
},j),v.activeNav(n);
}
function i(){
var n="all 0.3s ease";
c.css({
transition:n,
webkitTransition:n
});
}
function r(){
var n=c.el[0].style;
n.transition="",n.webkitTransition="";
}
var p,u=n("appmsg/emotion/common.js"),m=n("appmsg/emotion/dom.js"),t={},c=m("#js_slide_wrapper"),f=0,v=n("appmsg/emotion/nav.js"),l=!1,d=0,g=!1,h=0;
t.init=function(){
c=m("#js_slide_wrapper"),p=-u.wrapperWidth+u.WIDTH,o();
var n="translate3d(0, 0, 0)";
c.css({
webkitTransform:n,
transform:n
});
};
var j=300;
return t;
});