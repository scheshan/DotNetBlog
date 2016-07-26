var React = require("react")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")
var {LoadingButton, Form} = require("../../components")
var {Input, Textarea} = require("formsy-react-components")
var Dialog = require("../../services/dialog")
var Api = require("../../services/api")

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

    submit(model){
        if(this.state.loading){
            return;
        }

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

    render(){
        return (
            <Modal show={this.state.show}>
                <Form onValidSubmit={this.submit.bind(this)}>
                    <Input type="hidden" name="replyTo" value={this.state.comment.id}/>
                    <ModalHeader>回复评论</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="col-md-2 control-label">作者</label>
                            <div className="col-md-10">
                                <span className="help-block">{this.state.comment.name}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">邮箱</label>
                            <div className="col-md-10">
                                <span className="help-block">{this.state.comment.email}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">时间</label>
                            <div className="col-md-10">
                                <span className="help-block">{this.state.comment.createDate}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-10 col-md-offset-2">
                                <Textarea layout="elementOnly" name="comment_content" disabled="disabled" value={this.state.comment.content}></Textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-10 col-md-offset-2">
                                <Textarea layout="elementOnly" name="content" required></Textarea>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                        <LoadingButton formNoValidate loading={this.state.loading} className="btn btn-primary">保存</LoadingButton>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

module.exports = ReplyComment;