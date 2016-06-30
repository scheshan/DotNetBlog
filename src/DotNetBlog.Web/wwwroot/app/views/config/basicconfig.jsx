var React = require("react")
var Form = require("../../components/form")
var ContentHeader = require("../../components/contentheader")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox} = FRC
var Dialog = require("../../services/dialog")
var Spinner = require("../../components/spinner")

class BasicConfig extends React.Component{
    constructor() {
        super()

        this.state = {
            config: {
                title: "",
                description: "",
                topicsPerPage: 10
            },
            loading: false
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
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveBasicConfig(model, response=>{
                this.setState({
                    loading: false
                });

                if(response.success){
                    Dialog.success("保存成功")
                }
                else{
                    Dialog.error(response.errorMessage);
                }
            })
        });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getBasicConfig(response => {
                if (response.success) {
                    this.setState({
                        config: response.data,
                        loading: false
                    })
                }
                else{
                    Dialog.error("错误");
                    this.setState({
                        loading: false
                    })
                }
            })
        })
    }

    render() {
        return (                
            <div className="content">
                <Form onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this) } onInvalid={this.disableButton.bind(this) }>
                    <div className="box box-primary">
                        <div className="box-header with-border">
    	                    <h3 className="box-title">
                                基础设置
                                <Spinner loading={this.state.loading}/>
                            </h3>
                        </div>
                        <div className="box-body">
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
        )
    }
}

module.exports = BasicConfig