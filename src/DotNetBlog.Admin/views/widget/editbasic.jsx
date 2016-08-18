var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} = require("react-bootstrap")
var {Bootstrap: {FormGroup}} = require("../../components")
var {reduxForm} = require('redux-form')

const validate = values=>{
    const errors = {};
    if(!values.title){
        errors.title = "请输入标题";
    }

    return errors;
}

class EditBasicForm extends React.Component{
    render(){
        const {fields: {title}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup label="标题" validation={title}>
                    <input className="form-control" type="text" {...title}/>
                </FormGroup>
            </form>
        )
    }
}

EditBasicForm = reduxForm({
    form: "editBasic",
    fields: ["title"],
    validate
})(EditBasicForm)

class EditBasic extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            config: {
                title: ""
            }
        }
    }

    show(widget, index){
        this.widget = widget;
        this.index = index;
        this.setState({
            show: true,
            config: widget.config
        });
    }

    hide(){
        this.setState({
            show: false
        })
    }

    onSubmit(model){
        this.widget.config.title = model.title;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }

    submit(){
        this.refs.form.submit()
    }
    
    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <ModalHeader closeButton>修改配置</ModalHeader>
                <ModalBody>
                    <EditBasicForm 
                        ref="form"
                        onSubmit={this.onSubmit.bind(this)}
                        initialValues={this.state.config}/>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>保存</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = EditBasic