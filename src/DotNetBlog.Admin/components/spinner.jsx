var React = require("react")

class Spinner extends React.Component{
    render(){
        if(this.props.loading){
            return (
                <div className="main-loading">
                    <div className="loader"></div>
                </div>
            )
        }
        else{
            return null;
        }
    }
}

Spinner.propTypes = {
    loading: React.PropTypes.bool.isRequired
}

module.exports = Spinner