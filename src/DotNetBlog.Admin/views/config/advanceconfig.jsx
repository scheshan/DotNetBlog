var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};

    if(!values.errorPageTitle){
        errors.errorPageTitle = "请输入错误页面标题";
    }
    if(!values.errorPageContent){
        errors.errorPageContent = "请输入错误页面内容";
    }

    return errors;
}

class AdvanceConfigForm extends React.Component{
    render(){
        const {fields: {errorPageTitle, errorPageContent, headerScript, footerScript}, handleSubmit} = this.props;

        return (
            <form noValidate onSubmit={handleSubmit}>
                <fieldset>
                    <legend>错误页面</legend>

                    <FormGroup label="错误页面的标题" validation={errorPageTitle}>
                        <input type="text" className="form-control" {...errorPageTitle}/>
                    </FormGroup>
                    <FormGroup label="错误页面的内容" validation={errorPageContent}>
                        <textarea className="form-control" rows="4" {...errorPageContent}></textarea>
                    </FormGroup>
                </fieldset>

                <fieldset>
                    <legend>自定义代码</legend>

                    <FormGroup label="头部区域">
                        <textarea className="form-control" rows="4" {...headerScript}></textarea>
                    </FormGroup>

                    <FormGroup label="底部区域">
                        <textarea className="form-control" rows="4" {...footerScript}></textarea>
                    </FormGroup>
                </fieldset>

                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        保存
                    </button>
                </FormGroup>
            </form>
        )
    }
}

AdvanceConfigForm = reduxForm({
    form: "advanceConfigForm",
    fields: ["errorPageTitle", "errorPageContent", "headerScript", "footerScript"],
    validate
})(AdvanceConfigForm)

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

    onSubmit(model){
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
                <div className="form-content">
                    <AdvanceConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></AdvanceConfigForm>
                </div>
            </div>            
        )
    }
}

module.exports = AdvanceConfig