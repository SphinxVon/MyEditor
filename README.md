### VEditor的使用
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>VEditor</title>
    <link rel="stylesheet" href="./icomoon/style.css">
    <link rel="stylesheet" href="./css/index.css">
    <style type="text/css"></style>
</head>
<body>
<div id="editor"></div>
<div id="text" style="margin: auto;width: 90%"></div>
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="./js/command.js"></script>
<script>
    new VEditor({
        ele: '#editor',
        initContent: '请输入...'
    })
</script>
</body>
</html>

### 可配置toolBar
 ['source', 'paragraph', 'undo', 'redo', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'fontfamily', 'fontsize', 'color', 'backgroundcolor', 'indent', 'justifyleft', 'justifyright', 'justifycenter', 'quotesleft', 'quotesright', 'link', 'emoji', 'image']

