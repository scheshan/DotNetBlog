var React = require("react")
var {Mixin} = require("formsy-react")
var {FormGroup} = require("react-bootstrap")

const Checkbox = React.createClass({
    mixins: [Mixin],
    render() {
        return (
            <FormGroup>
                <div className="checkbox">
                    <label>
                        <input
                            {...this.props}
                            type="checkbox"
                            name={this.props.name}
                            onChange={this.changeValue}
                            value={this.getValue() }
                            checked={this.getValue() ? "checked" : null}
                            />
                        {this.props.title}
                    </label>
                </div>
            </FormGroup>
        )
    }
})

module.export = Checkbox