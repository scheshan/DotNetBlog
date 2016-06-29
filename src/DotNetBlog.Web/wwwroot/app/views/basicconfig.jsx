var React = require("react")
var Form = require("../components/form")
var ContentHeader = require("../components/contentheader")
var Api = require("../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox} = FRC

class BasicConfig extends React.Component{
    constructor() {
        super()

        this.state = {
            config: {
                title: "",
                description: "",
                topicsPerPage: 10
            }
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
        Api.saveBasicConfig(model, response=>{

        })
    }

    componentDidMount() {
        Api.getBasicConfig(response => {
            if (response.success) {
                this.setState({
                    config: response.data
                })
            }
        })
    }

    render() {
        return (
            <div>
                <ContentHeader title="基础">

                </ContentHeader>
                
                <div className="content">
                    <Form onValidSubmit={this.submit} onValid={this.enableButton.bind(this) } onInvalid={this.disableButton.bind(this) }>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <Input labelClassName="col-md-2" elementWrapperClassName="col-md-5" label="标题" name="title" required value={this.state.config.title}/>

                                <Input labelClassName="col-md-2" elementWrapperClassName="col-md-5" label="摘要" name="description" value={this.state.config.description}/>

                                <Input 
                                    labelClassName="col-md-2" 
                                    elementWrapperClassName="col-md-5" 
                                    label="每页文章数" 
                                    validations="isInt"
                                    validationError="请输入每页文章数"
                                    name="topicsPerPage" 
                                    value={this.state.config.topicsPerPage}/>

                                <Checkbox 
                                    labelClassName="col-md-2" 
                                    name="onlyShowSummary" 
                                    label="仅显示文章摘要" 
                                    checked={this.state.config.onlyShowSummary}
                                    value={this.state.config.onlyShowSummary}/>

                                <div className="form-group row">
                                    <div className="col-md-offset-2 col-md-5">
                                        <button disabled={!this.state.canSubmit} formNoValidate={true} type="submit" className="btn btn-primary">保存</button>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

module.exports = BasicConfig