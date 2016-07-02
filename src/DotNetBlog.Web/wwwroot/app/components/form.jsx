var React = require("react")
var Formsy = require("formsy-react")
var FRC = require("formsy-react-components")

const Form = React.createClass({
    mixins: [FRC.ParentContextMixin],
    render() {
        return (
            <Formsy.Form                
                className={this.getLayoutClassName()}
                {...this.props}
                validatePristine={false} 
                ref="formsy">
                {this.props.children}
            </Formsy.Form>
        );
    },
    reset(model){
        this.refs.formsy.reset(model)
    },
    submit(){
        this.refs.formsy.submit()
    },
    getModel(){
        return this.refs.formsy.getModel()
    }
})

Form.propTypes = Formsy.Form.propTypes

module.exports = Form;