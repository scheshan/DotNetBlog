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
            this.props.options, 
            {
                selector,
                setup: (editor)=>{
                    this.editor = editor
                    if(this.props.content){
                        this.editor.setContent(this.props.content)
                    }
                }
            });
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