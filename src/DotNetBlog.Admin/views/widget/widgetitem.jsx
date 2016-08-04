var React = require("react")
var {Sortable} = require("react-sortable")

var WidgetItem = React.createClass({
    displayName: 'WidgetItem',
    render: function() {
        console.log(this.props)
        return (
            <li {...this.props}>
                {this.props.children.widget.config.title}
                <span className="item-buttons">
                    <button title="编辑" onClick={this.props.children.onEdit}><i className="fa fa-pencil"></i></button>
                    <button title="移除" onClick={this.props.children.onRemove}><i className="fa fa-trash"></i></button>
                </span>
            </li>
        )
    }
})

module.exports = Sortable(WidgetItem)