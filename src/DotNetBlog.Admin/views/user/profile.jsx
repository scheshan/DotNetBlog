var React = require("react")
var {Spinner, Bootstrap:{FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};

    if(!values.email){
        errors.email = "请输入邮箱"
    }
    else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,})+$/.test(values.email))){
        errors.email = "请输入正确的邮箱地址"
    }
    if(!values.nickname){
        errors.nickname = "请输入昵称";
    }

    return errors;
}

class ProfileForm extends React.Component{
    render(){
        const {fields: {userName, email, nickname}, handleSubmit} = this.props;
        
        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup label="用户名">
                    <input type="text" className="form-control" disabled {...userName}/>
                </FormGroup>
                <FormGroup label="邮箱" validation={email}>
                    <input type="text" className="form-control" {...email}/>
                </FormGroup>
                <FormGroup label="昵称" validation={nickname}>
                    <input type="text" className="form-control" {...nickname}/>
                </FormGroup>
                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        保存
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
                    Dialog.success("操作成功");
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