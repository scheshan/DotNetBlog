var React = require("react");

class LoadingButton extends React.Component{
    render(){
        let disabled = this.props.loading

        return (
            <button {...this.props} disabled={disabled}>
                {this.renderSpinner()}
                {' '}
                {this.props.children}
            </button>
        );
    }
    renderSpinner(){
        if(this.props.loading){
            return <i className="fa fa-spinner fa-spin"></i>;
        }
        else{
            return null;
        }
    }
}

LoadingButton.propTypes = {
    children: React.PropTypes.node,
    loading: React.PropTypes.bool.isRequired    
};

module.exports = LoadingButton