var React = require("react")
var {Form} = require("formsy-react")
var MainHeader = require("../components/mainheader")
var Input = require("../components/input")
var Checkbox = require("../components/checkbox")
var Api = require("../services/api")

class BasicConfig extends React.Component{
    constructor() {
        super()

        this.config = {

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
            <div className="settings-view">
                <Form onValidSubmit={this.submit} onValid={this.enableButton.bind(this) } onInvalid={this.disableButton.bind(this) }>
                    <MainHeader title="基础">
                        <button className="btn btn-success btn-sm btn-hasicon pull-left" type="button" disabled={!this.state.canSubmit}>
                            <i className="fa fa-check"></i>
                            保存
                        </button>
                    </MainHeader>

                    <div className="content-inner">
                        <div className="form-content">
                            <Input ref="title" name="title" type="text" title="博客名称" required value={this.config.title}/>

                            <Input ref="description" name="description" type="text" title="博客描述" value={this.config.description}/>

                            <Input ref="topicsPerPage" name="topicsPerPage" type="text" title="每页文章数" validations="isInt" validationError="请输入正确的数字" value={this.config.topicsPerPage} required/>

                            <Checkbox ref="onlyShowSummary" name="onlyShowSummary" title="仅仅显示文章摘要" checked={this.config.onlyShowSummary}/>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

exports.BasicConfig = BasicConfig