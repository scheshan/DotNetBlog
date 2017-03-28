var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} = require("react-bootstrap")
var {Bootstrap: {FormGroup}} = require("../../components")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const error = {};
    if(!values.title){
        error.title = "pleaseEnterTitle".L();
    }
    return error;
}

class EditCategoryForm extends React.Component{
    render(){
        const {fields: {title, showRSS, showNumbersOfTopics}, handleSubmit} = this.props;

        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup label={"title".L()} validation={title}>
                    <input type="text" className="form-control" {...title}/>
                </FormGroup>
                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...showNumbersOfTopics}/>
                            {"showRssButton".L()}
                        </label>
                    </div>                    
                </FormGroup>
                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...showRSS}/>
                            {"showNumberOfArticle".L()}
                        </label>
                    </div>                    
                </FormGroup>
            </form>
        )
    }
}

EditCategoryForm = reduxForm({
    form: "editCategoryForm",
    fields: ["title", "showRSS", "showNumbersOfTopics"],
    validate
})(EditCategoryForm)

class EditCategory extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            config: {
                title: "",
                showRSS: false,
                showNumbersOfTopics: false
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
        this.widget.config.showRSS = model.showRSS;
        this.widget.config.showNumbersOfTopics = model.showNumbersOfTopics;
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
                    <EditCategoryForm ref="form" onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.submit.bind(this)}>{"save".L()}</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = EditCategory