var React = require("react")
var {Form, Spinner} = require("../../components")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox, Textarea} = FRC
var Dialog = require("../../services/dialog")
var LoadingButton = require("../../components/loadingbutton")

class AdvanceConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            config: {
                errorPageTitle: "",
                errorPageContent: "",
                headerScript: "",
                footerScript: ""
            },
            loading: true
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        Api.getAdvanceConfig(response=>{
            if (response.success) {
                this.setState({
                    config: response.data,
                    loading: false
                })
            }
            else{
                Dialog.error(response.errorMessage);
                this.setState({
                    loading: false
                })
            }
        })
    }

    submit(model){
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveAdvanceConfig(model, response=>{
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

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>
                <Form layout="vertical" onValidSubmit={this.submit.bind(this)} className="form-content">
                    <fieldset>
                        <legend>错误页面</legend>

                        <Input name="errorPageTitle" label="错误页面的标题" required value={this.state.config.errorPageTitle}></Input>

                        <Textarea name="errorPageContent" label="错误页面的内容" rows={5} required value={this.state.config.errorPageContent}></Textarea>
                    </fieldset>

                    <fieldset>
                        <legend>自定义代码</legend>

                        <Textarea name="headerScript" label="头部区域" rows={5} value={this.state.config.headerScript}></Textarea>

                        <Textarea name="footerScript" label="底部区域" rows={5} value={this.state.config.footerScript}></Textarea>
                    </fieldset>

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

module.exports = AdvanceConfig