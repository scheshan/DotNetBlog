var React = require("react")

class FormGroup extends React.Component{
    render(){
        let className = "form-group";
        if(this.props.hasError){
            className += " has-error"
        }

        return (
            <div className={className}>
                {this.renderLabel()}
                {this.props.children}
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
}

module.exports = FormGroup;