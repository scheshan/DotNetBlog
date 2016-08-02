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
                selector,
                relative_urls :false,
                menubar: false,
                height: 420,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen textcolor imagetools",
                    "insertdatetime media table contextmenu paste imageUpload"
                ],
                setup: (editor)=>{
                    this.editor = editor
                    if(this.props.content){
                        this.editor.setContent(this.props.content)
                    }
                },
                toolbar: 'code | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image imageUpload'
            }, 
            this.props.options);
        tinymce.init(options)
    }

    getContent(){
        return this.editor.getContent()
    }

    setContent(content){
        this.editor.setContent(content)
    }

    componentDidUpdate(prevProps){
        if(prevProps.content != this.props.content){
            if(this.editor){
                this.editor.setContent(this.props.content)
            }
        }
    }

    render(){
        return (
            <textarea id={this.id}></textarea>
        )
    }

    getEditor(){
        let selector = '#' + this.id;
        return tinymce.get(selector);
    }
}

Editor.propType = {
    content: React.PropTypes.string,
    options: React.PropTypes.object
}

module.exports = Editor