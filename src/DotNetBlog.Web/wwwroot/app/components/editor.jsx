var React = require("react")

class Editor extends React.Component{
    componentDidMount(){

    }
    render(){
        var id = "editor_" + this.props.name;
        this.id = id;

        return (
            <div id={id}>
                <textarea>{this.props.value}</textarea>
            </div>
        )
    }
}

Editor.propType = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
}

module.exports = Editor