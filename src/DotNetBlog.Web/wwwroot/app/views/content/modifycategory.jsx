var React = require("react")
var {Modal} = require("react-bootstrap")
var {Input} = require("formsy-react-components")
var {LoadingButton, Form} = require("../../components")
var _ = require("lodash")
var Dialog = require("../../services/dialog")
var Api = require("../../services/api")

const emptyCategory = {
    name: "",
    description: ""
}

class ModifyCategory extends React.Component{
    constructor(){
        super();

        this.state = {
            show: false,
            loading: false,
            category: _.assign({}, emptyCategory)
        }
    }

    show(category){
        if(!category){
            category = _.assign({}, emptyCategory)
        }

        this.setState({
            show: true,
            category: category
        })
    }
    hide(){
        this.setState({
            show: false
        })
    }
    apiCallback(response){
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
    }
    submit(model){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            if(model.id){
                Api.editCategory(model, this.apiCallback.bind(this))
            }
            else{
                Api.addCategory(model, this.apiCallback.bind(this))
            }
        })
    }

    render(){
        return (            
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <Form layout="vertical" onValidSubmit={this.submit.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.category.id ? "编辑分类" : "添加分类"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                        
                        <Input name="name" label="名称" value={this.state.category.name} required maxLength="50"/>

                        <Input name="description" label="描述" value={this.state.category.description} maxLength="200"/>

                        <Input name="id" type="hidden" value={this.state.category.id}/>                        
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                        <LoadingButton formNoValidate loading={this.state.loading} className="btn btn-primary">保存</LoadingButton>
                    </Modal.Footer>
                </Form>
            </Modal>            
        )
    }
}

ModifyCategory.propTypes = {
    onSuccess: React.PropTypes.func
}

module.exports = ModifyCategory