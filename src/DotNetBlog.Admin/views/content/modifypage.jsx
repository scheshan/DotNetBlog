var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor, Spinner} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Async = require("async");
var Api = require("../../services/api");
var TagsInput = require("react-tagsinput")
var _ = require("lodash")
var {hashHistory} = require("react-router")
var Dialog = require("../../services/dialog")

class ModifyPage extends React.Component{
    render(){
        return (
            <div>1</div>
        )
    }
}

module.exports = ModifyPage;