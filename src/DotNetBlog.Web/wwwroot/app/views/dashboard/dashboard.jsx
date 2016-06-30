var React = require("react")
var Toastr = require("toastr");

class Dashboard extends React.Component{
    render() {
        return (
            <div className="content">
                dashboard
            </div>
        )
    }
}

Toastr.success("13");

module.exports = Dashboard