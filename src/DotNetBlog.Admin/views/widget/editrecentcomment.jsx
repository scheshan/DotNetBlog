var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} = require("react-bootstrap")
var {Input, Checkbox} = require("formsy-react-components")
var {Form} = require("../../components")
var {reduxForm} = require('redux-form')

class EditRecentCommentForm extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            title: "",
            number: 0
        }
    }

    render(){
        return (
            <form noValidate onSubmit={this.props.onSubmit}>           
                <input required {...this.props.fields.title}></input>
                <ModalFooter>
                    <button className="btn btn-default" onClick={this.props.hide}>取消</button>
                    <button type="submit" className="btn btn-primary">保存</button>
                </ModalFooter>
            </form>
        )
    }
}

EditRecentCommentForm = reduxForm({
    form: "editRecentComment",
    fields: ["title", "count"]
})(EditRecentCommentForm)

class EditRecentComment extends React.Component{
    constructor(){
        super()
        
        this.state = {
            show: false,
            title: "",
            number: 0
        }
    }

    show(widget, index){
        this.widget = widget;
        this.index = index;
        this.setState({
            show: true,
            title: widget.config.title,
            number: widget.config.number
        });
    }

    hide(){
        this.setState({
            show: false
        })
    }

    submit(model, model2){
        debugger;
        console.log(model)
        console.log(model2)
        return;

        this.widget.config.title = model.title;
        this.widget.config.number = model.number;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }
    
    render(){
        return (
            <Modal show={this.state.show}>    
                <EditRecentCommentForm 
                    hide={this.hide.bind(this)}
                    onSubmit={this.submit.bind(this)}/>
            </Modal>
        )
    }
}

module.exports = EditRecentComment