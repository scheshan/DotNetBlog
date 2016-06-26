import React = require("react")
import ReactDom = require("react-dom")
import Formsy, {Form, Mixin} from 'formsy-react'
import Input from './components/input'
import {Alert} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min"

class Index extends React.Component<any, any>{
    mixins: any

    constructor() {
        super()        

        this.mixins = Mixin
    }

    render(): JSX.Element {
        return (
            <Form>
                <Input type="text" name="test" validations="isEmail" value="2" required validationError="hello world" requireMessage="hello world2"></Input>

                <button type="submit">submit</button>
            </Form>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById("main"));

