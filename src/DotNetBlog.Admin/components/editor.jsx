var React = require("react")
var _ = require("lodash")

class Editor extends React.Component{
    constructor(){
        super()

        this.id = _.uniqueId("editor_");
    }

    componentDidMount(){
        let selector = '#' + this.id;
        let options = _.assign(
            {},             
            {
                width   : "100%",
                height  : 480,
                markdown: this.props.content,
                syncScrolling : "single",
                path    : "/lib/editor.md/lib/",
                watch: false,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/api/upload/image",
                toolbarIcons : ()=>{
                    return [
                        "undo", "redo", "|", 
                        "bold", "del", "italic", "quote", "uppercase", "lowercase", "|", 
                        "h1", "h2", "h3", "h4", "h5", "h6", "|", 
                        "list-ul", "list-ol", "hr", "|",
                        "link", "image", "code", "code-block", "|",
                        "watch", "preview", "|",
                        "help", "info"
                    ];
                }
            }, 
            this.props.options);
        this.editor = editormd(this.id, options);
    }

    getContent(){
        return this.editor.markdownTextarea.val();
    }

    setContent(content){
        this.editor.markdownTextarea.val(content)
    }

    componentDidUpdate(prevProps){
        if(prevProps.content != this.props.content){
            if(this.editor){
                this.editor.markdownTextarea.val(this.props.content)
            }
        }
    }

    render(){
        return (
            <div id={this.id}>
                <textarea style={{display:'none'}}></textarea>
            </div>
        )
    }

    getEditor(){
        return this.editor;
    }
}

Editor.propType = {
    content: React.PropTypes.string,
    options: React.PropTypes.object
}

module.exports = Editor