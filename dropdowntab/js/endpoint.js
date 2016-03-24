/* =========================================================
 * endpoint.js
 * =========================================================
 * Copyright 2016 xuyamin yamin_xu@163.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function ($) {
    //这里放入插件代码
    var endpoint_index=1;//实例索引，以便于生成的html块中的id不同
    $.fn.endpoint = function(options) { //定义插件的名称，这里为endpoint
        var dft = {
            //以下为该插件的属性及其默认值
            version: "0.1", //版本
            data_url: "/account/endpoint", //json链接
            level_length:3 //菜单层次,如果是三层，显示三层菜单，如果二层，显示二层菜单
        };
        var ops = $.extend(dft,options);//加入外部属性
        json_data=$.ajax({url:dft['data_url'],dataType: "json", async:false});
        var tab_data=$.parseJSON(json_data.responseText);//data的格式 {'tabs':[],'content':{ {},{}}}
        var levels=tab_data['tabs'];
        if (dft.level_length){levels=levels.slice(0,dft.level_length)}
        var style = ''; //调用默认的样式
        var _this=this;
        var _index=endpoint_index;
        var path1=[];//记录已经选择的路径，应该是level1的code，level2的code，level3的code
        endpoint_index=endpoint_index+1;
        var dropdown_tabs='<div class="dropdown-menu" aria-labelledby="'+$(this).attr('id')+'">'+
            '<ul class="nav nav-tabs" role="tablist">';
        for (var i = 0; i < levels.length; i++){
            item =levels[i];
            dropdown_tabs+='<li role="presentation"><a href="#'+item['code']+_index+'" aria-controls="home"'+' value="'+item['code']+'" role="tab" data-toggle="tab">'+item['name']+'</a></li>'
        }
        dropdown_tabs+='</ul>'+
        '<div class="tab-content">';

        for (var i = 0; i < levels.length; i++){
            //建立空的标签页内容
            item =levels[i];
            dropdown_tabs+='<div role="tabpanel" class="tab-pane" id="'+item['code']+_index+'" >';
            dropdown_tabs+='</div>'
        }
        dropdown_tabs+='</div>'+'</div>';

        function get_active_tab(){
            //获取当前active的tab的名字
            active_tab=$(_this).next().find('ul>li[class="active"]>a')
            return active_tab.attr('value')
        }

        function filter_array(choosed_code){
            //该函数根据目前的choosed_code,筛选出content
            filter_str="";
            current_tab=get_active_tab();
            content=tab_data['content'];
            var list=content.filter(function (item){
                return item[current_tab]['code']==choosed_code
            });
            return list
        }

        function get_level_content(tab_code,content){
            //content为经过过滤的列表,返回某个tab页面下面所有项目，不可重复
            var list=[];
            var dict={};
            for (var i = 0; i < content.length; i++){
                item=content[i];
                if (!dict[item[tab_code]['code']]){
                    list.push({'code':item[tab_code]['code'],'name':item[tab_code]['name']});
                    dict[item[tab_code]['code']]=true
                }

            }
            return list
        }
        function tab_content(tab_code,content){
            //该函数根据content,创建一个tab页;content是经过筛选过的
            content_page='<div role="tabpanel" class="tab-pane active" id="'+tab_code+_index+'" >';
            content_list=get_level_content(tab_code,content);
            for (var i = 0; i < content_list.length; i++){
                item=content_list[i];
                content_page+='<p style="padding-left:20px"><a value="'+item['code']+'">'+item['name']+'</a></p>'
            }
            content_page+='</div>';
            //找到相应的标签页，将其内容替换
            $(_this).next().find('#'+tab_code+_index).prop('outerHTML', content_page);
        }
        function get_next_tab(tab_code){
            //根据目前code获取下个code,到最后一页则返回空
            find_next=false;
            next_tab_code=false;
            for (var i = 0; i < levels.length; i++){
                item=levels[i];
                if (item['code']==tab_code) {find_next=true;continue;}
                if (find_next) {next_tab_code=item['code'];break;}
            }
            return next_tab_code
        }

        function choose(choosed_code){
            //在当前tab下选择了某个标签，获取下个tab，以及下个tab的内容，并将其组合
            current_tab=get_active_tab();//当前的tab页
            next_tab=get_next_tab(current_tab);
            content_list=filter_array(choose_code);
            if (next_tab)
            {//有下个tab
                tab_content(next_tab,content_list);//刷新下个页面的内容
                return next_tab;//返回选中tab

            }
            else{//没有下个tab
                return false
            }

        }
        $(this).after(dropdown_tabs); //下拉菜单载入
        $(this).click(function(){
            //点击input时候,初始化第一个标签
            tab_code=levels[0]['code'];
            content_list=tab_data['content'];
            tab_content(tab_code,content_list);
            reg_click(tab_code);
            $(this).next().toggle();
            $(this).next().find('a[href="#'+tab_id+'"]').tab('show');
        });

        function reg_click(tab_code){
            //注册某个tab的click响应事件
            tab_id=tab_code+_index;
            $(_this).next().find('#'+tab_id).find('a').click(function(e){
                choose_code=$(this).attr('value');
                next_tab=choose(choose_code);//
                next_tab_id=next_tab+_index;
                if (next_tab) {
                    reg_click(next_tab);//重新注册一下click事件，因为该tab该被生成}
                    $(this).parents('.dropdown-menu').children('.nav-tabs').find('a[href="#'+next_tab_id+'"]').tab('show');
                }

                else{
                    //最后一个标签页
                    $(this).parents('.dropdown-menu').prev().val($(this).text());
                    $(this).parents('.dropdown-menu').toggle();
                }
            })
        }
    }
})(jQuery);
