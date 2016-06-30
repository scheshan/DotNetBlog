var React = require("react")

class Spinner extends React.Component{
    render(){
        if(this.props.loading){
            return (
                <i {...this.props} className="fa fa-spinner fa-spin"></i>
            )
        }
        else{
            return null
        }
    }
}

Spinner.propTypes = {
    loading: React.PropTypes.bool.isRequired
}

module.exports = Spinner