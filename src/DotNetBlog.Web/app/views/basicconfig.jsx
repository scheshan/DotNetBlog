var React = require("react")
var Form = require("../components/form")
var ContentHeader = require("../components/contentheader")
var Checkbox = require("../components/checkbox")
var Api = require("../services/api")
var FRC = require("formsy-react-components")
const {Input} = FRC

class BasicConfig extends React.Component{
    constructor() {
        super()

        this.config = {
            title: "",
            description: ""
        }

        this.state = {

        }
    }

    enableButton() {
        this.setState({
            canSubmit: true
        })
    }

    disableButton() {
        this.setState({
            canSubmit: false
        })
    }

    submit(model) {
        console.log(model)
    }

    componentDidMount() {
        Api.getBasicConfig(response => {
            if (response.success) {
                this.config = response.data;
                this.forceUpdate();
            }
        })
    }

    render() {
        return (
            <div>
                <ContentHeader title="设置" subtitle="基础">

                </ContentHeader>
                
                <div className="content">
                    <Form validatePristine={false} onValidSubmit={this.submit} onValid={this.enableButton.bind(this) } onInvalid={this.disableButton.bind(this) }>
                        <div className="box box-default">
                            <div className="box-header with-border">
                                <h3 className="box-title">Select2</h3>

                                <div className="box-tools pull-right">
                                    <button disabled={!this.state.canSubmit} formNoValidate={true} type="submit" className="btn btn-primary">保存</button>
                                </div>
                            </div>
                            <div className="box-body">
                                <Input labelClassName="col-md-2" elementWrapperClassName="col-md-5" label="标题" name="title" required value={this.config.title}/>

                                <Input labelClassName="col-md-2" elementWrapperClassName="col-md-5" label="摘要" name="description" value={this.config.description}/>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

module.exports = BasicConfig