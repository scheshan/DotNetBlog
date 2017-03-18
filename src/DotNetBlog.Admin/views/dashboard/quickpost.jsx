var React = require("react")
var {Api, Dialog} = require("../../services")
var {LoadingButton, Editor} = require("../../components")

class QuickPost extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            title: ""
        }
    }

    handleTitleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    handleContentChange(e){
        this.setState({
            content: e.target.value
        })
    }

    submit(){
        if(this.state.title == ""){
            Dialog.error("pleaseEnterTitle".L());
            return;
        }
        let content = this.refs.editor.getContent();
        if(content == ""){
            Dialog.error("pleaseEnterContent".L());
            return;
        }
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.addTopic({
                title: this.state.title,
                content: content,
                allowComment: true
            }, response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        title: "",
                        content: ""
                    })
                    Dialog.success("draftWasSavedSuccessfully".L())
                    this.props.onSave && this.props.onSave()
                }
                else{
                    this.setState({loading: false})
                    Dialog.error(response.errorMessage);
                }
            })
        })
    }

    render(){
        return (
            <div className="panel">
                <div className="panel-heading">
                    <div className="panel-title">{"saveDraftQuickly".L}</div>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <input type="text" placeholder={"title".L()} className="form-control" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <Editor ref="editor" options={{
                            width   : "100%",
                            height  : 200,
                            toolbarIcons : ()=>{
                                return [
                                    "bold", "italic", "quote", "|", 
                                    "h1", "h2", "h3", "h4", "h5", "h6", "|", 
                                    "list-ul", "list-ol", "|",
                                    "link", "image", "code", "code-block", "|"
                                ];
                            }
                        }}/>
                    </div>
                    <LoadingButton loading={this.state.loading} type="button" className="btn btn-block btn-default" title={"save".L()} onClick={this.submit.bind(this)}>{"save".L()}</LoadingButton>
                </div>
            </div>
        )
    }
}

module.exports = QuickPost;