var React = require("react")
var {Form, Spinner} = require("../../components")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox} = FRC
var Dialog = require("../../services/dialog")

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

                <Form layout="vertical" onValidSubmit={this.submit.bind(this)} className="form-content">

                    <Input label="用户名" name="userName" disabled="disabled" value={this.state.user.userName}/>

                    <Input label="邮箱" name="email" required validation="isEmail" value={this.state.user.email}/>

                    <Input label="昵称" name="nickname" required value={this.state.user.nickname}/>

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

module.exports = Profile;