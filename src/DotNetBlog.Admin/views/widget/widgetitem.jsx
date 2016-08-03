var React = require("react")
var {Sortable} = require("react-sortable")

var WidgetItem = React.createClass({
    displayName: 'WidgetItem',
    render: function() {
        return (
            <div {...this.props} className="col-md-4">
                <div className="box">
                    <div className="box-header">
                        插件
                    </div>
                    <div className="box-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Sortable(WidgetItem)