tinymce.PluginManager.add('imageUpload', function (editor, url) {
    editor.addCommand('imageUploadDialog', function () {
        editor.windowManager.open({
            title: 'Upload an image',
            file: '/scripts/tinymce.plugins/imageupload/dialog.html',
            width: 350,
            height: 135,
            buttons: [{
                text: 'Upload',
                classes: 'widget btn primary first abs-layout-item',
                disabled: true,
                onclick: 'close'
            },
			{
			    text: 'Close',
			    onclick: 'close'
			}]
        });
    });

    // Add a button that opens a window
    editor.addButton('imageUpload', {
        tooltip: 'Upload an image',
        icon: 'image',
        text: 'Upload',
        cmd: 'imageUploadDialog'
    });
});