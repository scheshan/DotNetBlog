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
    }
})

Form.propTypes = Formsy.Form.propTypes

module.exports = Form;