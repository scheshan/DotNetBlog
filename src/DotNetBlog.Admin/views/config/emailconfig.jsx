var React = require("react")
var {Api, Dialog} = require("../../services")
var {Form, Spinner} = require("../../components")
var {Input, Checkbox} = require("formsy-react-components")
var {FormGroup} = require("react-bootstrap")

class EmailConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
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
                    Dialog.success("savedSuccessfully".L())
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
                    Dialog.success("testSuccessfully".L());
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
                    <Input name="smtpEmailAddress" label={"emailAddress".L()} value={this.state.config.smtpEmailAddress} />

                    <Input name="smtpUser" label={"username".L()} value={this.state.config.smtpUser} />

                    <Input name="smtpPassword" type="password" label={"password".L()} value={this.state.config.smtpPassword} />

                    <Input name="smtpServer" label={"smtpAddress".L()} value={this.state.config.smtpServer} />

                    <Input name="smtpPort" validations="isInt" validationError={"enterCorrectPortNumber".L()} label={"portNumber".L()} value={this.state.config.smtpPort} />

                    <Checkbox layout="elementOnly" name="smtpEnableSSL" label={"enableSSL".L()} value={this.state.config.smtpEnableSSL} />

                    <Checkbox layout="elementOnly" name="sendEmailWhenComment" label={"sendEmailWhenComment".L()} value={this.state.config.sendEmailWhenComment} />

                    <FormGroup>
                        <button type="submit" formNoValidate className="btn btn-primary">{"save".L()}</button>
                        {' '}
                        <button type="button" className="btn btn-success" onClick={this.test.bind(this)}>{"testEmailSettings".L()}</button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

module.exports = EmailConfig