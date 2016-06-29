var React = require("react")

class MainHeader extends React.Component{
    render() {
        return (
            <div className="main-header clearfix">
                <h2 className="page-title pull-left">{this.props.title}</h2>

                {this.props.children}
            </div>
            )
    }
}

module.export = MainHeader