(function () {
    /* h1-h6 */
    $('.h-list').children().each(function (i) {
        if(i>0){
            var tag = $(this).prop('tagName');
            $(this).click(function (e) {
                e.stopPropagation();
                document.execCommand('formatBlock',false,tag);
            })
        }
    });
    /* 背景颜色 */
    $('.brush-list').children().eq(1).children().each(function () {
        var color = '#'+$(this).children().attr('class').split('-')[1];
        //console.log(color);
        $(this).children().click(function (e) {
            e.stopPropagation();
            document.execCommand('BackColor','fasle',color);
        })
    });
    /* 字体颜色 */
    $('.pencil-list').children().eq(1).children().each(function () {
        var color = '#'+$(this).children().attr('class').split('-')[1];
        //console.log(color);
        $(this).children().click(function (e) {
            e.stopPropagation();
            document.execCommand('ForeColor','fasle',color);
        })
    });
    /* 插入图片 */
    var lastFile = 'last';
    /* 上传在线图片 */
    $('.e-menu-image').find('.icon-upload2').click(function (e) {
        e.stopPropagation();
        /*
         * 本地上传图片的名称未过滤，出现中文或特殊字符会导致编码错误
         *
         * */
        var inputEle = document.getElementById("upload-local");
        var success = false;
      // 每隔三秒进行一次图片发送，直到图片对象上传成功关闭请求
        console.log( inputEle.files[0]
        );
        var  upTiemr = setInterval(function () {
            if(typeof inputEle.files[0] === 'object' && lastFile!==inputEle.files[0].name){
                lastFile = inputEle.files[0].name;
                var imgUrl = null;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if(xhr.readyState===4){
                        if(xhr.status===200){
                            imgUrl = JSON.parse(xhr.responseText).url;
                        }
                    }
                }
                xhr.open('post','postFile.php',true);
                xhr.setRequestHeader('X-Request-with','XMLHttpRequest');
                var oFormData = new FormData();
                oFormData.append('file',inputEle.files[0]);
                xhr.send(oFormData);
                xhr.onload = function(){
                    // 上传成功插入图片
                    clearInterval(upTiemr);
                    return receive(imgUrl);
                };
                function receive(imgUrl) {
                    if(imgUrl){
                        success = document.execCommand("insertimage", false, imgUrl);
                    }
                }
            }
        },3000);
        /* 15s内未上传图片则视为放弃此次上传 */
        var timer = setTimeout(function () {
            if(!success){
                clearInterval(upTiemr);
                clearTimeout(timer);
            }
        },15000);
    });
    /* 上传在线图片 */
    $('#insert').click(function (e) {
        var url = $('#image-url').val();
        e.stopPropagation();
        if(url){
            document.execCommand("insertimage", false, url);
        }else{
            alert('请输入有效的图片链接地址!!!')
        }

    });
    /* 插入链接 */
    $('#insert-link').click(function (e) {
        e.stopPropagation();
        var url = $('#link-url').val(),
            title = $('#link-title').val();
        if(url&&title){
            var a = $('<a href="'+url+'">'+title+'</a>');
            $('.edit-area').append(a);
        }else{
            alert('请输入有效的链接!!!');
        }
    });
    /* 插入表情 qq表情91个  */
    (function () {
        var mlength = 91;
        var $emoji = $('.e-menu-happy').find($('.emoji'));
        for(var i=1;i<=mlength;i++){
            $emoji.append('<a href="##" class="qq-emoji"><img src="img/qq/'+i+'.gif"></a>');
        }
        $emoji.children().each(function (i,ele) {
            ele.onclick = function () {
                var url = $(this).children().attr('src');
                var a = document.execCommand("insertimage",false,url);
            }
        })
    })();
    /* 表格功能 */
    (function () {
        /* 插入表格 */
        var tableNum = 0,
            currentTableId = null;
        $('#insert-table').click(function (e){
            e.stopPropagation();
            var row = Math.floor($('#row').val()),
                col = Math.floor($('#col').val());
            if(row>0&&col>0){
                var table = document.createElement('table'),
                    tbody = document.createElement('tbody');
                table.id = 'table'+tableNum;
                table.border = '1px';
                table.borderColor = '#ccc';
                table.width = '100%';
                table.cellPadding = 0;
                table.cellSpacing = 0;
                table.appendChild(tbody);
                for (i=0;i<row;i++){
                    var tr = document.createElement('tr');
                    for(var j=0;j<col;j++){
                        var td = document.createElement('td');
                        td.id = 't'+tableNum+'-'+i+'-'+j;
                        td.innerHTML= '&nbsp;';
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                table.row = row;
                table.col = col;
                $('.edit-area').append(table);
                $('.edit-area').append('<br>');
                $('#menu-insert').hide();
                currentTableId =  table.id ;
                tableNum++;
                start();
            }
        });
        function start() {
            var td = $('.edit-area').find('table td');
            td.each(function (i) {
                $(this).click(function (e) {
                    e.stopPropagation();
                    if(!$('.e-menu-table2').hasClass('canEdit')){
                        $('.e-menu-table2').addClass('canEdit');
                    }
                    /* 重定向当前表格 */
                    currentTableId = 'table'+this.id.split('-')[0].slice(1);
                    document.getElementById('tableID').innerHTML = this.id.split('-')[0].toUpperCase();
                })
            });
        };
        /* 为当前表格新增一行 */
        $('#add-row').click(function (e) {
            var row = document.getElementById(currentTableId).row;
            var col = document.getElementById(currentTableId).col;
            var tId = currentTableId.match(/\d/)[0];
            var tr = document.createElement('tr');
            for(i=0;i<col;i++){
                var td = document.createElement('td');
                td.id = 't'+tId+'-'+row+'-'+i;
                td.innerHTML = '<br>';
                tr.appendChild(td);
            }
            row++;
            document.getElementById(currentTableId).row = row;
            $('#'+currentTableId).find('tbody').append($(tr));
            start()
        });
        /* 为当前表格新增一列 */
        $('#add-col').click(function (e) {
            var row = document.getElementById(currentTableId).row;
            var col = document.getElementById(currentTableId).col;
            var tId = currentTableId.match(/\d/)[0];
            $('#'+currentTableId).find('tr').each(function (i) {
                var td = document.createElement('td');
                td.id = 't'+tId+'-'+i+'-'+col;
                td.innerHTML = '<br>';
                this.appendChild(td);
            });
            col++;
            document.getElementById(currentTableId).col = col;
            start();
        });
        /* 删除当前表格最后一行 */
        $('#del-row').click(function (e) {
            var row = document.getElementById(currentTableId).row;
            var col = document.getElementById(currentTableId).col;
            $('#' + currentTableId).find('tr').eq(row-1).remove();
            document.getElementById(currentTableId).row = row-1;
        });

        /* 删除当前表格最后一列 */
        $('#del-col').click(function (e) {
            var row = document.getElementById(currentTableId).row;
            var col = document.getElementById(currentTableId).col;
            $('#' + currentTableId).find('tr').each(function () {
                $(this).find('td').eq(col-1).remove();
            });
            document.getElementById(currentTableId).col = col-1;
        });
        /* 删除当前表格 */
        $('#del-table').click(function (e) {
            $('#' + currentTableId).remove();
        })
        /* 切换编辑或插入表格 */
        $('.edit-area').on('click',function (e) {
            if($('.e-menu-table2').hasClass('canEdit')){
                $('.e-menu-table2').removeClass('canEdit');
            }
        });
    })()

    /* 上一步 */
    $('.e-menu-undo').click(function () {
        document.execCommand('undo',false,null);
    });
    /* 下一步 */
    $('.e-menu-redo').click(function () {
        document.execCommand('redo',false,null);
    });
    /* 引用 */
    $('.e-menu-quotes-left').click(function () {
       document.execCommand('formatBlock',false,'BLOCKQUOTE');
    });
    /* 结束引用 */
    $('.e-menu-quotes-right').click(function () {
        document.execCommand('formatBlock',false,'p');
    });
    /* 粗体 */
    $('.e-menu-bold').click(function () {
        var a = document.execCommand('bold',false,null);
        // a?$(this).addClass('active'):$(this).removeClass('active');
    })

    /* 斜体 */
    $('.e-menu-italic').click(function () {
        document.execCommand('italic',false,null);
    });
    /* 下划线 */
    $('.e-menu-underline').click(function () {
        document.execCommand('underline',false,null);
    });
    /* 删除线 */
    $('.e-menu-strikethrough').click(function () {
        document.execCommand('strikethrough',false,null);
    });
    /* 左对齐 */
    $('.e-menu-justifyLeft').click(function () {
        document.execCommand('justifyLeft',false,null);
    });
    /* 居中 */
    $('.e-menu-justifyCenter').click(function () {
        document.execCommand('justifyCenter',false,null);
    });
    /* 右对齐 */
    $('.e-menu-justifyRight').click(function () {
        document.execCommand('justifyRight',false,null);
    });

})();