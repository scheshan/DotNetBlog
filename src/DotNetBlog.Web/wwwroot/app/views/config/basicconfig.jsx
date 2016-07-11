var React = require("react")
var {Form, Spinner} = require("../../components")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox} = FRC
var Dialog = require("../../services/dialog")
var LoadingButton = require("../../components/loadingbutton")

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
                <Spinner loading={this.state.loading}/>

                <Form layout="vertical" onValidSubmit={this.submit.bind(this)} className="form-content">

                    <Input label="标题" name="title" required value={this.state.config.title}/>

                    <Input label="摘要" name="description" value={this.state.config.description}/>

                    <Input 
                        label="每页文章数" 
                        validations="isInt"
                        validationError="请输入每页文章数"
                        name="topicsPerPage" 
                        value={this.state.config.topicsPerPage}/>

                    <Checkbox 
                        layout="elementOnly"
                        name="onlyShowSummary" 
                        label="仅显示文章摘要" 
                        checked={this.state.config.onlyShowSummary}
                        value={this.state.config.onlyShowSummary}/>

                    <div className="form-group">
                        <button formNoValidate type="submit" className="btn btn-primary">
                            保存
                        </button>
                    </div>
                </Form>
            </div>
        )
    }
}

module.exports = BasicConfig