var React = require("react")
var {Spinner, Bootstrap:{FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};

    if(!values.email){
        errors.email = "pleaseTypeYourEmail".L()
    }
    else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,})+$/.test(values.email))){
        errors.email = "pleaseTypeCorrectEmailAddress".L()
    }
    if(!values.nickname){
        errors.nickname = "pleaseEnterNickname".L();
    }

    return errors;
}

class ProfileForm extends React.Component{
    render(){
        const {fields: {userName, email, nickname}, handleSubmit} = this.props;
        
        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup label={"username".L()}>
                    <input type="text" className="form-control" disabled {...userName}/>
                </FormGroup>
                <FormGroup label={"email".L()} validation={email}>
                    <input type="text" className="form-control" {...email}/>
                </FormGroup>
                <FormGroup label={"nickname".L()} validation={nickname}>
                    <input type="text" className="form-control" {...nickname}/>
                </FormGroup>
                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        {"save".L()}
                    </button>
                </FormGroup>
            </form>
        )
    }
}

ProfileForm = reduxForm({
    form: "profileForm",
    fields: ["userName", "email", "nickname"],
    validate
})(ProfileForm)

class Profile extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            user: {
                userName: "",
                email: "",
                nickname: ""
            }
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getMyInfo(response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        user: response.data
                    });
                }
                else{
                    this.setState({
                        loading: false
                    });
                    Dialog.error(response.errorMessage);
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
            Api.editMyInfo(model, response=>{
                this.setState({
                    loading: false
                });
                if(response.success){                    
                    Dialog.success("operationSuccessful"());
                }
                else{
                    Dialog.error(response.errorMessage);
                }
            })
        })
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>

                <ProfileForm onSubmit={this.submit.bind(this)} initialValues={this.state.user}></ProfileForm>
            </div>
        )
    }
}

module.exports = Profile;