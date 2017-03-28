var React = require("react")
var {LoadingButton, Bootstrap: {FormGroup}} = require("../../components")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")
var {Dialog, Api} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};
    if(!values.name){
        errors.name = "pleaseEnterCategoryName".L()
    }

    return errors;
}

class ModifyCategoryForm extends React.Component{
    render(){
        const {fields: {id, name, description}, handleSubmit} = this.props
        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup label={"name".L()} validation={name}>
                    <input type="text" className="form-control" {...name} maxLength="50"/>
                </FormGroup>

                <FormGroup label={"description".L()} validation={description}>
                    <input type="text" className="form-control" {...description} maxLength="200"/>
                </FormGroup>

                <input type="hidden" {...id}/>
            </form>
        )
    }
}

ModifyCategoryForm = reduxForm({
    form: "modifyCategoryForm",
    fields: ["id", "name", "description"],
    validate
})(ModifyCategoryForm)

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
            Dialog.success("operationSuccessful".L())
            if(this.props.onSuccess){
                this.props.onSuccess()
            }
            this.hide()
        }
        else{
            Dialog.error(response.errorMessage)
        }
    }

    submit(){
        this.refs.form.submit()
    }

    onSubmit(model){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            if(model.id){
                Api.editCategory(model.id, model, this.apiCallback.bind(this))
            }
            else{
                Api.addCategory(model, this.apiCallback.bind(this))
            }
        })
    }

    render(){
        return (            
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.category.id ? "editCategory".L() : "addCategory".L()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>                        
                    <ModifyCategoryForm ref="form" onSubmit={this.onSubmit.bind(this)} initialValues={this.state.category}></ModifyCategoryForm>                      
                </Modal.Body>
                <Modal.Footer>
                    <LoadingButton onClick={this.submit.bind(this)} loading={this.state.loading} className="btn btn-primary">{"save".L()}</LoadingButton>
                </Modal.Footer>
            </Modal>            
        )
    }
}

ModifyCategory.propTypes = {
    onSuccess: React.PropTypes.func
}

module.exports = ModifyCategory