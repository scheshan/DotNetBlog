var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody} = require("react-bootstrap")
var {Bootstrap: {FormGroup}} = require("../../components")
var {reduxForm} = require('redux-form')

const validate = values=>{
    const errors = {};
    if(!values.title){
        errors.title = "pleaseEnterTitle".L();
    }

    return errors;
}

class EditTagForm extends React.Component{
    constructor(){
        super()
        this.state = {
            minTopicNumberList: _.range(1, 11),
            numberList: _.range(10, 51, 10)
        }
    }
    render(){
        const {fields: {title, number, minTopicNumber}, handleSubmit} = this.props;
        return (
            <form noValidate onSubmit={handleSubmit}>    
                <FormGroup label={"title".L()} validation={title}>
                    <input className="form-control" {...title}></input>
                </FormGroup>    
                <FormGroup label={"minimumNumberOfArticlesPerTag".L()}>
                    <select className="form-control" {...minTopicNumber}>
                        {
                            this.state.minTopicNumberList.map(item=>{
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </FormGroup>    
                <FormGroup label={"maximumNumberOfTagClouds".L()}>
                    <select className="form-control" {...number}>
                        <option value={null}>{"noLimitation".L()}</option>
                        {
                            this.state.numberList.map(item=>{
                                return (
                                    <option key={item} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </FormGroup>
            </form>
        )
    }
}

EditTagForm = reduxForm({
    form: "editTagForm",
    fields: ["title", "number", "minTopicNumber"],
    validate
})(EditTagForm)

class EditTag extends React.Component{
    constructor(){
        super()
        
        this.state = {
            show: false,
            config: {
                title: "",
                number: null,
                minTopicNumber: 1
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
        this.widget.config.minTopicNumber = model.minTopicNumber;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }

    submit(){        
        this.refs.form.submit()
    }
    
    render(){
        return (
            <Modal show={this.state.show}>    
                <ModalHeader>{"modifyConfiguration".L()}</ModalHeader>
                <ModalBody>
                    <EditTagForm 
                        ref="form"
                        initialValues={this.state.config}
                        onSubmit={this.onSubmit.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-default" onClick={this.hide.bind(this)}>{"cancel".L()}</button>
                    <button type="submit" className="btn btn-primary" onClick={this.submit.bind(this)}>{"save".L()}</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = EditTag