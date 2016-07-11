var React = require("react")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")
var {LoadingButton, Form} = require("../../components")
var {Input} = require("formsy-react-components")
var Dialog = require("../../services/dialog")
var Api = require("../../services/api")

class ModifyTag extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            loading: false,
            tag: {
                keyword: ""
            }
        }
    }

    show(tag){
        this.setState({
            show: true,
            tag: tag
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
            Api.editTag(model.id, model.keyword, response=>{
                this.setState({
                    loading: false
                })
                if(response.success){
                    Dialog.success("操作成功")
                    if(this.props.onSuccess){
                        this.props.onSuccess()
                    }
                    this.hide()
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
                <Form layout="vertical" onValidSubmit={this.submit.bind(this)}>
                    <ModalHeader>
                        <ModalTitle>编辑标签</ModalTitle>
                    </ModalHeader>
                    <ModalBody>                        
                        <Input name="keyword" label="名称" value={this.state.tag.keyword} required maxLength="50"/>

                        <Input name="id" type="hidden" value={this.state.tag.id}/>
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

ModifyTag.propTypes = {
    onSuccess: React.PropTypes.func
}

module.exports = ModifyTag