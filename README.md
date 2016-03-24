English:
introduce
============
    more info refer ：http://www.cnblogs.com/yasmi/p/5292402.html
    This is a input addon,when you need to click an input and pop a dropdown menu which have several tab,and you have to perform selection
     in different tab ,this will be useful；

how to use
---------
please download the endpoint.js to your software directory;
 in your html code refer it by the sentence，it depend on bootstrap,so make sure your having refer the bootstrap.min.js or bootstrap.js before
 <script type="text/javascript" src="path/endpoint.js"></script>
 when your input html
 <input class="form-control dropdown-toggle" data-toggle="dropdown" id="dropdownMenu1" type="text" value="" size="3"/>

 and in the script,you need this to start a dropdown tabs menu
 <script>
    $('#dropdownMenu1').endpoint();
 </script>

 you can input parameter :
    data_url:json data of tabs,the format of data like this
    {
        'tabs':[{'code':'region','name':'地区'},{'code':'node','name':'节点'},{'code':'endpoint','name':'连接点'}],
        'content':[
            {'region':{'code':'bj','name':'北京'},
             'node':{'code':'bjdf','name':'北京东方广场'},
             'endpoint':{'code':'bjdf1','name':'北京东方广场1号'}
             },
            {'region':{'code':'bj','name':'北京'},
             'node':{'code':'bjdf','name':'北京东方广场'},
             'endpoint':{'code':'bjdf2','name':'北京东方广场2号'}
             },]
    }

    level_length:how many tabs your need,if you leave it blank,the number of tabs depend on your tabs json data

 <script>
    $('#dropdownMenu1').endpoint({data_url:xxx,level_length:3});
 </script>




中文:
介绍
============
    更多介绍请参考：http://www.cnblogs.com/yasmi/p/5292402.html
    这个是一个输入框的下拉菜单的选择控件；当你的输入下拉菜单需要一个包含多个tab的，且必须依照顺序从不同的tab中选择相应的选项，直到最后一个tab；这个控件可能就是你所需要的。
     它支持多个tab页，数量由你定义；且当前的tab内容依赖于前面你的选择。
如何使用
============
    请下载endpoint.js 文件到你的文件夹下面
    在你的html文件中使用如下语句引用该文件,它依赖于bootstrap，请确认在前面引用了bootstrap.min.js,或者bootstrap.js
    <script type="text/javascript" src="path/endpoint.js"></script>
    当你的input控件如下：
    <input class="form-control dropdown-toggle" data-toggle="dropdown" id="dropdownMenu1" type="text" value="" size="3"/>

    在script中启用控件，使得支持下拉多tab菜单
     <script>
        $('#dropdownMenu1').endpoint();
     </script>

     你可以输入以下参数 :
        data_url:tabs的数据，其格式为
        {
            'tabs':[{'code':'region','name':'地区'},{'code':'node','name':'节点'},{'code':'endpoint','name':'连接点'}],
            'content':[
                {'region':{'code':'bj','name':'北京'},
                 'node':{'code':'bjdf','name':'北京东方广场'},
                 'endpoint':{'code':'bjdf1','name':'北京东方广场1号'}
                 },
                {'region':{'code':'bj','name':'北京'},
                 'node':{'code':'bjdf','name':'北京东方广场'},
                 'endpoint':{'code':'bjdf2','name':'北京东方广场2号'}
                 },]
        }
        level_length:设置显示几层tab，如果为空，则根据tabs的数据中的tabs长度来决定

     <script>
        $('#dropdownMenu1').endpoint({data_url:xxx,level_length:3});
     </script>