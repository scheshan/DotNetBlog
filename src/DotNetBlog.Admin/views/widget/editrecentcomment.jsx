var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody} = require("react-bootstrap")
var {Bootstrap: {FormGroup}} = require("../../components")
var {reduxForm} = require('redux-form')

const validate = values=>{
    const errors = {};
    if(!values.title){
        errors.title = "pleaseEnterTitle".L();
    }
    if(!values.number){
        errors.number = "pleaseEnterNumberOfComment".L();
    }
    
    let number = parseInt(values.number);
    if(isNaN(Number(values.number)) || number < 1){
        errors.number = "pleaseEnterCorrectNumberOfComments".L();
    }

    return errors;
}

class EditRecentCommentForm extends React.Component{
    render(){
        const {fields: {title, number}, handleSubmit} = this.props;
        return (
            <form noValidate onSubmit={handleSubmit}>    
                <FormGroup label={"title".L()} validation={title}>
                    <input className="form-control" {...title}></input>
                </FormGroup>    
                <FormGroup label={"showNumberOfComments".L()} validation={number}>
                    <input className="form-control" {...number}></input>
                </FormGroup>    
            </form>
        )
    }
}

EditRecentCommentForm = reduxForm({
    form: "editRecentComment",
    fields: ["title", "number"],
    validate
})(EditRecentCommentForm)

class EditRecentComment extends React.Component{
    constructor(){
        super()
        
        this.state = {
            show: false,
            config: {
                title: "",
                number: 0
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
        this.widget.config.number = model.number;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }

    submit(){
        
        this.refs.form.submit()
    }
    
    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>    
                <ModalHeader closeButton>{"modifyConfiguration".L()}</ModalHeader>
                <ModalBody>
                    <EditRecentCommentForm 
                        ref="form"
                        initialValues={this.state.config}
                        onSubmit={this.onSubmit.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={this.submit.bind(this)}>{"save".L()}</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = EditRecentComment