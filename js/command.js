(function () {

    function VEditor(obj) {
        this.ele = obj.ele; // 绑定dom实体
        this.initContent = obj.initContent || ''; // 初始化内容
        this.tooBar = obj.tooBar || ['source', 'paragraph', 'undo', 'redo', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'fontfamily', 'fontsize', 'color', 'backgroundcolor', 'indent', 'justifyleft', 'justifyright', 'justifycenter', 'quotesleft', 'quotesright', 'link', 'emoji', 'image'];
        this.init();
    }


    VEditor.prototype.init = function () {
        var _self = this;
        $(this.ele).append('<div id="edit-control"></div>');
        $(this.ele).append('<div class="edit-area" contenteditable="true"></div>');
        if (this.initContent && this.initContent != '') {
            $('.edit-area').html(this.initContent);
        }
        $.each(this.tooBar, function (index, ele) {
            $('#edit-control').append('<div class="ve-' + ele + '"></div>');
        });
        //  弹窗
        $(this.ele).append('<div id="openWin"><div class="alert"><span id="close">X</span><div class="content"></div><span id="sure">确认</span></div></div>');
        // 图标生成
        if ($('#edit-control' + ' .ve-paragraph')) {
            $('#edit-control' + ' .ve-paragraph').append('<div href="javascript:;" class="e-menu-paragraph father"><i class="icon-paragraph"></i><div class="h-list list" ><p class="title">设置标题</p><h1><a href="##">H1</a></h1><h2><a href="##">H2</a></h2><h3><a href="##">H3</a></h3><h4><a href="##">H4</a></h4><h5><a href="##">H5</a></h5><h6><a href="##">H6</a></h6></div></div>');
        };
        if ($('#edit-control' + ' .ve-bold')) {
            $('#edit-control' + ' .ve-bold').append('<a href="javascript:;" class="e-menu-bold" title="粗体"><i class="icon-bold"></i></a>');
        };
        if ($('#edit-control' + ' .ve-underline')) {
            $('#edit-control' + ' .ve-underline').append('<a href="javascript:;" class="e-menu-underline" title="下划线"><i class="icon-underline"></i></a>');
        };
        if ($('#edit-control' + ' .ve-italic')) {
            $('#edit-control' + ' .ve-italic').append('<a href="javascript:;" class="e-menu-italic" title="斜体"><i class="icon-italic"></i></a>');
        };
        if ($('#edit-control' + ' .ve-strikethrough')) {
            $('#edit-control' + ' .ve-strikethrough').append('<a href="javascript:;" class="e-menu-strikethrough" title="删除线"><i class="icon-strikethrough"></i></a>');
        };
        if ($('#edit-control' + ' .ve-undo')) {
            $('#edit-control' + ' .ve-undo').append('<a href="javascript:;" class="e-menu-undo" title="上一步"><i class="icon-undo"></i></a>');
        };
        if ($('#edit-control' + ' .ve-redo')) {
            $('#edit-control' + ' .ve-redo').append('<a href="javascript:;" class="e-menu-redo" title="下一步"><i class="icon-redo"></i></a>');
        };
        if ($('#edit-control' + ' .ve-quotesleft')) {
            $('#edit-control' + ' .ve-quotesleft').append('<a href="javascript:;" class="e-menu-quotes-left" title="引用"><i class="icon-quotes-left"></i></a>');
        };
        if ($('#edit-control' + ' .ve-quotesright')) {
            $('#edit-control' + ' .ve-quotesright').append('<a href="javascript:;" class="e-menu-quotes-right" title="结束引用" style="transform: rotateY(180deg)"><i class="icon-quotes-left" ></i></a>');
        };
        if ($('#edit-control' + ' .ve-justifyleft')) {
            $('#edit-control' + ' .ve-justifyleft').append('<a href="javascript:;" class="e-menu-justifyLeft" title="左对齐"><i class="icon-justifyLeft"></i></a>');
        };
        if ($('#edit-control' + ' .ve-justifycenter')) {
            $('#edit-control' + ' .ve-justifycenter').append('<a href="javascript:;" class="e-menu-justifyCenter" title="居中"><i class="icon-justifyCenter"></i></a>');
        };
        if ($('#edit-control' + ' .ve-justifyright')) {
            $('#edit-control' + ' .ve-justifyright').append('<a href="javascript:;" class="e-menu-justifyRight" title="右对齐"><i class="icon-justifyRight"></i></a>');
        };
        if ($('#edit-control' + ' .ve-link')) {
            $('#edit-control' + ' .ve-link').append('<div  class="e-menu-link father openAlert" ><i class="icon-link"></i></div>');
        };
        if ($('#edit-control' + ' .ve-emoji')) {
            $('#edit-control' + ' .ve-emoji').append('<div  class="e-menu-happy father openAlert"><i class="icon-happy"></i></div>');
        };
        if ($('#edit-control' + ' .ve-image')) {
            $('#edit-control' + ' .ve-image').append('<div class="e-menu-image father openAlert"><i class="icon-image"></i></div>');
        };
        if ($('#edit-control' + ' .ve-table')) {
            $('#edit-control' + ' .ve-table').append('<div  class="e-menu-table2 father openAlert" ><i class="icon-table2"></i></div></div>');
        };
        if ($('#edit-control' + ' .ve-color')) {
            $('#edit-control' + ' .ve-color').append(' <a href="javascript:;" title="字体颜色" class="e-menu-color"><input type="color" value="#000000"  style="width:20px;cursor:pointer;"/></a>');
        };
        if ($('#edit-control' + ' .ve-backgroundcolor')) {
            $('#edit-control' + ' .ve-backgroundcolor').append('<a href="javascript:;" title="背景颜色" class="e-menu-backgroundColor"><input type="color" value="#ffffff"  style="width:20px;cursor:pointer;"/></a>');
        };
        var table = '<div class="table-list list" id="menu-insert"><p class="title">插入表格</p><div class="table"><p style="font-size: 14px">创建一个<input type="number" id="row" placeholder="0">行<input type="number" id="col" placeholder="0">列的表格</p><input type="button" id="insert-table" value="创建"></div></div><div class="table-list list" id="menu-edit"><p class="title" style="position: relative">编辑表格: <span id="tableID" style="position: absolute;left: 60px;top: 0;color: red"></span></p><div class="table"><p  class="edit-item"><input type="button" value="增加行" id="add-row"><input type="button" value="删除行" id="del-row"><input type="button" value="增加列" id="add-col"><input type="button" value="删除列" id="del-col"></p><p><input type="button" value="删除表格" id="del-table"></p></div>'
        var link = '<div class="link-list list"><p class="title" style="font-weight:bold ;border-bottom: 1px solid #000">链接</p><div class="link"><p><input id="link-title" type="text" placeholder="链接文字" autocomplete="off"></p><p><input id="link-url" autocomplete="off" type="url" placeholder="http://..."></p></div></div>'
        var image = '<div class="upload-img-list list"><p class="title"><span class="local active">本地图片</span><span class="network">网络图片</span></p><a href="javascript:;" class="up-local" ><i class="icon-upload2" onclick="getElementById(\'upload-local\').click()"></i><input type="file" id="upload-local" style="height:0;width:0;z-index: -1;background-color: transparent;" autocomplete="off"></a><div class="up-network"><input type="url" placeholder="图片链接例:http://img4.duitang.com/uploads/item/201602/14/20160214202926_Kfixa.thumb.224_0.jpeg" id="image-url"></div></div>';


        //  设置统一的确认按钮
        $('#openWin #sure').click(function () {
            $('#openWin').hide(200);
            if (_self.type == 'link') {
                _self.insertLink();
                return;
            };
            if (_self.type == 'image') {
                _self.insertImage();
            }
        });
        $('.openAlert').click(function (e) {
            var content = '';
            $('#openWin .alert .content').html(content);
            if ($(this).hasClass('e-menu-table2')) {
                content = table;
            } else if ($(this).hasClass('e-menu-link')) {
                content = link;
                _self.type = 'link';
            } else if ($(this).hasClass('e-menu-image')) {
                content = image;
                _self.type = 'image';
            } else if ($(this).hasClass('e-menu-happy')) {
                content = _self.initEmoji();
            }
            $('#openWin').find('.alert .content').append(content);

            $('#openWin').show(500);
            if (_self.type == 'image') {
                _self.initImage();
                return;
            }
        })

        $('#close').click(function () {
            $('#openWin').hide(200);
        });
        this.exceCommand();
    };
    VEditor.prototype.exceCommand = function () {
        var self = this;
        var $editArea = $(self.ele + ' .edit-area');
        /* 背景颜色 */
        $('.e-menu-backgroundColor input').change(function () {
            var color = $(this).val();
            document.execCommand('BackColor', false, color);
            $editArea.focus();
        });
        /* 字体颜色 */
        $('.e-menu-color input').change(function () {
            var color = $(this).val();
            document.execCommand('ForeColor', false, color);
            $editArea.focus();
        });
        /* 段落标题 */
        $('.h-list').children().each(function (i) {
            if (i > 0) {
                var tag = $(this).prop('tagName');
                $(this).click(function (e) {
                    e.stopPropagation();
                    document.execCommand('formatBlock', false, tag);
                    $editArea.focus();
                })
            }
        });

        /* 上一步 */
        $('.e-menu-undo').click(function () {
            document.execCommand('undo', false, null);
            $editArea.focus();
        });
        /* 下一步 */
        $('.e-menu-redo').click(function () {
            document.execCommand('redo', false, null);
            $editArea.focus();
        });
        /* 引用 */
        $('.e-menu-quotes-left').click(function () {
            document.execCommand('formatBlock', false, 'BLOCKQUOTE');
            $editArea.focus();
        });
        /* 结束引用 */
        $('.e-menu-quotes-right').click(function () {
            document.execCommand('formatBlock', false, 'p');
            $editArea.focus();
        });
        /* 粗体 */
        $('.e-menu-bold').click(function () {
            var a = document.execCommand('bold', false, null);
            $editArea.focus();
        });
        /* 斜体 */
        $('.e-menu-italic').click(function () {
            document.execCommand('italic', false, null);
            $editArea.focus();
        });
        /* 下划线 */
        $('.e-menu-underline').click(function () {
            document.execCommand('underline', false, null);
            $editArea.focus();
        });
        /* 删除线 */
        $('.e-menu-strikethrough').click(function () {
            document.execCommand('strikethrough', false, null);
            $editArea.focus();
        });
        /* 左对齐 */
        $('.e-menu-justifyLeft').click(function () {
            document.execCommand('justifyLeft', false, null);
            $editArea.focus();
        });
        /* 居中 */
        $('.e-menu-justifyCenter').click(function () {
            document.execCommand('justifyCenter', false, null);
            $editArea.focus();
        });
        /* 右对齐 */
        $('.e-menu-justifyRight').click(function () {
            document.execCommand('justifyRight', false, null);
            $editArea.focus();
        });
        /* 插入表情 qq表情91个  */
        window.insertEmoji = function (url) {
            this.console.log($editArea[0])
            // document.execCommand("insertimage", false, url);
            $('.edit-area').append('<img src="' + url + '" alt=""  />');
            $('#openWin').hide(200);
        }

    }
    VEditor.prototype.initEmoji = function () {
        var mlength = 91;
        var emojiList = '<div class="emoji-list list"><p class="title">表情</p><div class="emoji">';
        for (var i = 1; i <= mlength; i++) {
            var url = 'img/qq/' + i + '.gif';
            emojiList += '<a href="##" class="qq-emoji" onclick="insertEmoji(\'' + url + '\')"><img src="' + url + '"></a>';
        }
        emojiList += '</div></div>';
        return emojiList;
    };
    VEditor.prototype.insertLink = function () {
        var url = $('#link-url').val(),
            title = $('#link-title').val();
        if (url && title) {
            return $('.edit-area').append('<a href="' + url + '">' + title + '</a>');
        } else {
            alert('请输入有效的链接!!!');
        }
    };
    VEditor.prototype.insertImage = function () {
        var url = $('#image-url').val();
        if (url) {
            return $('.edit-area').append('<img src="' + url + '" alt=""  />');
        } else {
            alert('请输入有效的图片链接地址!!!');
        }
    };
    VEditor.prototype.initImage = function () {
        $('.network').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.up-network').show().prev().hide()
        });
        $('.local').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.up-local').show().next().hide();
        });
        /* 上传本地图片 */
        $('#upload-local').on('change', function () {
            // 如果没有选择图片 直接退出
            if (this.files.length <= 0) {
                return false;
            }
            // 图片上传到服务器
            var pic = this.files[0];
            console.log(pic1);
            var formData = new FormData();
            // 服务端要求参数是 pic1 
            formData.append('pic1', pic);
            $.ajax({
                url: 'postFile.php',
                type: 'post',
                data: formData,
                cache: false, //上传文件不需要缓存
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                success: function (data) {
                    console.log(data);
                    // $('.edit-area').append('<img src="' + url + '" alt=""  />');
                }
            })
        });
    };
    return window.VEditor = VEditor; //提供对外接口;
})(window);

/* 表格功能 未完善 暂不使用*/
(function () {
    /* 插入表格 */
    var tableNum = 0,
        currentTableId = null;
    $('#insert-table').click(function (e) {
        e.stopPropagation();
        var row = Math.floor($('#row').val()),
            col = Math.floor($('#col').val());
        if (row > 0 && col > 0) {
            var table = document.createElement('table'),
                tbody = document.createElement('tbody');
            table.id = 'table' + tableNum;
            table.border = '1px';
            table.borderColor = '#ccc';
            table.width = '100%';
            table.cellPadding = 0;
            table.cellSpacing = 0;
            table.appendChild(tbody);
            for (i = 0; i < row; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < col; j++) {
                    var td = document.createElement('td');
                    td.id = 't' + tableNum + '-' + i + '-' + j;
                    td.innerHTML = '&nbsp;';
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.row = row;
            table.col = col;
            $('.edit-area').append(table);
            $('.edit-area').append('<br>');
            $('#menu-insert').hide();
            currentTableId = table.id;
            tableNum++;
            start();
        }
    });
    function start() {
        var td = $('.edit-area').find('table td');
        td.each(function (i) {
            $(this).click(function (e) {
                e.stopPropagation();
                if (!$('.e-menu-table2').hasClass('canEdit')) {
                    $('.e-menu-table2').addClass('canEdit');
                }
                /* 重定向当前表格 */
                currentTableId = 'table' + this.id.split('-')[0].slice(1);
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
        for (i = 0; i < col; i++) {
            var td = document.createElement('td');
            td.id = 't' + tId + '-' + row + '-' + i;
            td.innerHTML = '<br>';
            tr.appendChild(td);
        }
        row++;
        document.getElementById(currentTableId).row = row;
        $('#' + currentTableId).find('tbody').append($(tr));
        start()
    });
    /* 为当前表格新增一列 */
    $('#add-col').click(function (e) {
        var row = document.getElementById(currentTableId).row;
        var col = document.getElementById(currentTableId).col;
        var tId = currentTableId.match(/\d/)[0];
        $('#' + currentTableId).find('tr').each(function (i) {
            var td = document.createElement('td');
            td.id = 't' + tId + '-' + i + '-' + col;
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
        $('#' + currentTableId).find('tr').eq(row - 1).remove();
        document.getElementById(currentTableId).row = row - 1;
    });

    /* 删除当前表格最后一列 */
    $('#del-col').click(function (e) {
        var row = document.getElementById(currentTableId).row;
        var col = document.getElementById(currentTableId).col;
        $('#' + currentTableId).find('tr').each(function () {
            $(this).find('td').eq(col - 1).remove();
        });
        document.getElementById(currentTableId).col = col - 1;
    });
    /* 删除当前表格 */
    $('#del-table').click(function (e) {
        $('#' + currentTableId).remove();
    })
    /* 切换编辑或插入表格 */
    $('.edit-area').on('click', function (e) {
        if ($('.e-menu-table2').hasClass('canEdit')) {
            $('.e-menu-table2').removeClass('canEdit');
        }
    });
})();

/* 表格 */
$('.e-menu-table2').click(function (e) {
    e.stopPropagation();
    if ($(this).hasClass('canEdit')) {
        $('#menu-edit').show();
    } else {
        $('#menu-insert').show();
    }
});
$('#menu-insert').find('.close').click(function (e) {
    e.stopPropagation();
    $('#menu-insert').hide();
});
$('#menu-edit').find('.close').click(function (e) {
    e.stopPropagation();
    $('#menu-edit').hide();
});