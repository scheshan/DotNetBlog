var React = require("react")

class FormGroup extends React.Component{
    render(){
        let className = "form-group";
        if(this.props.validation && this.props.validation.touched && this.props.validation.error){
            className += " has-error"
        }

        return (
            <div className={className}>
                {this.renderLabel()}
                {this.props.children}
                {this.renderError()}
            </div>
        )
    }

    renderLabel(){
        if(this.props.label){
            return (
                <label className="control-label" for={this.props.labelFor}>{this.props.label}</label>
            )
        }
        else{
            return null;
        }
    }

    renderError(){
        if(this.props.validation && this.props.validation.touched && this.props.validation.error){
            return <span className="help-block">{this.props.validation.error}</span>
        }
        return null;
    }
}

module.exports = FormGroup;