var React = require("react")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")
var {LoadingButton, Form, Bootstrap: {FormGroup}} = require("../../components")
var {Dialog, Api} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};
    if(!values.content){
        errors.content = "请填写回复内容";
    }
    return errors;
}

class ReplyCommentForm extends React.Component{
    render(){
        const {fields: {content}, handleSubmit} = this.props;

        return (
            <FormGroup>
                <form noValidate onSubmit={handleSubmit}>
                    <label className="col-md-2 control-label">回复</label>
                    <div className="col-md-10">
                        <textarea className="form-control" rows="4" {...content}></textarea>
                    </div>
                </form>
            </FormGroup>
        )
    }
}

ReplyCommentForm = reduxForm({
    form: "replyCommentForm",
    fields: ["content"],
    validate
})(ReplyCommentForm)

class ReplyComment extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            comment: {

            }
        }
    }

    show(comment){
        this.setState({
            comment: comment,
            show: true
        })
    }

    hide(){
        this.setState({
            show: false
        })
    }

    onSubmit(model){
        if(this.state.loading){
            return;
        }

        model.replyTo = this.state.comment.id;

        this.setState({
            loading: true
        }, ()=>{
            Api.replyComment(model, response=>{
                this.setState({
                    loading: false
                })
                if(response.success){
                    Dialog.success("操作成功")
                    this.hide();
                    this.props.successCallback && this.props.successCallback();
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    submit(){
        this.refs.form.submit()
    }

    render(){
        return (
            <Modal show={this.state.show}>                    
                <ModalHeader>回复评论</ModalHeader>
                <ModalBody className="form-horizontal">
                    <FormGroup>
                        <label className="col-md-2 control-label">作者</label>
                        <div className="col-md-10">
                            <span className="help-block">{this.state.comment.name}</span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label className="col-md-2 control-label">邮箱</label>
                        <div className="col-md-10">
                            <span className="help-block">{this.state.comment.email}</span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label className="col-md-2 control-label">时间</label>
                        <div className="col-md-10">
                            <span className="help-block">{this.state.comment.createDate}</span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label className="col-md-2 control-label">内容</label>
                        <div className="col-md-10">
                            <textarea className="form-control" readOnly value={this.state.comment.content} rows="4"></textarea>
                        </div>
                    </FormGroup>
                    <ReplyCommentForm ref="form" onSubmit={this.onSubmit.bind(this)}></ReplyCommentForm>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                    <LoadingButton loading={this.state.loading} className="btn btn-primary" onClick={this.submit.bind(this)}>保存</LoadingButton>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = ReplyComment;