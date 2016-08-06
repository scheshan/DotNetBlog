var React = require("react")
var Dialog = require("../../services/dialog")
var Api = require("../../services/api")
var {LoadingButton} = require("../../components")

class QuickPost extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            title: "",
            content: ""
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
            Dialog.error("请输入标题");
            return;
        }
        if(this.state.content == ""){
            Dialog.error("请输入内容");
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
                content: this.state.content
            }, response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        title: "",
                        content: ""
                    })
                    Dialog.success("保存草稿成功")
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
                    <div className="panel-title">快捷提交</div>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <input type="text" placeholder="标题" className="form-control" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <textarea placeholder="在这里输入" className="form-control ltr-dir" value={this.state.content} onChange={this.handleContentChange.bind(this)} rows="4"></textarea>
                    </div>
                    <LoadingButton loading={this.state.loading} type="button" className="btn btn-block btn-default" title="保存" onClick={this.submit.bind(this)}>保存</LoadingButton>
                </div>
            </div>
        )
    }
}

module.exports = QuickPost;