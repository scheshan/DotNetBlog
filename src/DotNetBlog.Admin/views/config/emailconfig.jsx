var React = require("react")
var Api = require("../../services/api")
var {Form, Spinner} = require("../../components")
var {Input, Checkbox} = require("formsy-react-components")
var {FormGroup} = require("react-bootstrap")
var Dialog = require("../../services/dialog")

class EmailConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            config:{
                smtpEmailAddress: "",
                smtpUser: "",
                smtpPassword: "",
                smtpPort: 0,
                smtpServer: "",
                smtpEnableSSL: false,
                sendEmailWhenComment: false
            }
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getEmailConfig(response=>{
                if(response.success){
                    this.setState({
                        config:response.data,
                        loading: false
                    })
                }
                else{
                    this.setState({
                        loading: false
                    })
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    submit(model){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveEmailConfig(model, response=>{
                this.setState({
                    loading: false
                });

                if(response.success){
                    Dialog.success("保存成功")
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    test(){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            var model = this.refs.form.getModel();
            Api.testEmailConfig(model, response=>{
                this.setState({
                    loading: false
                });
                if(response.success){
                    Dialog.success("测试成功");
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>

                <Form ref="form" onValidSubmit={this.submit.bind(this)} layout="vertical" className="form-content">
                    <Input name="smtpEmailAddress" label="Email地址" value={this.state.config.smtpEmailAddress} />

                    <Input name="smtpUser" label="用户名" value={this.state.config.smtpUser} />

                    <Input name="smtpPassword" type="password" label="密码" value={this.state.config.smtpPassword} />

                    <Input name="smtpServer" label="SMTP服务器" value={this.state.config.smtpServer} />

                    <Input name="smtpPort" validations="isInt" validationError="请输入正确的端口号" label="端口号" value={this.state.config.smtpPort} />

                    <Checkbox layout="elementOnly" name="smtpEnableSSL" label="发送评论邮件" value={this.state.config.smtpEnableSSL} />

                    <Checkbox layout="elementOnly" name="sendEmailWhenComment" label="发送评论邮件" value={this.state.config.sendEmailWhenComment} />

                    <FormGroup>
                        <button type="submit" formNoValidate className="btn btn-primary">保存</button>
                        {' '}
                        <button type="button" className="btn btn-success" onClick={this.test.bind(this)}>测试邮件配置</button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

module.exports = EmailConfig