import React = require("react")
import {Mixin} from "formsy-react"
import {FormGroup} from "react-bootstrap"

interface ChheckboxProps {
    title?: string
    name?: string
    [key: string]: any
    checked?: boolean
}

const Checkbox = React.createClass<ChheckboxProps, any>({
    mixins: [Mixin],
    render(): JSX.Element {
        return (
            <FormGroup>
                <label>
                    <input
                        {...this.props}
                        type="checkbox"
                        name={this.props.name}
                        onChange={this.changeValue}
                        value={this.getValue() }
                        />
                    {this.props.title}
                </label>
            </FormGroup>
        )
    }
})

export default Checkbox