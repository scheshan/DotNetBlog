var React = require("react")
var {Sortable} = require("react-sortable")

var WidgetItem = React.createClass({
    displayName: 'WidgetItem',
    render: function() {
        return (
            <li {...this.props}>{this.props.children.config.title}</li>
        )
    }
})

module.exports = Sortable(WidgetItem)