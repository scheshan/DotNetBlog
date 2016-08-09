var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox, Select} = FRC
var Dialog = require("../../services/dialog")
var {reduxForm} = require("redux-form")

class CommentConfigForm extends React.Component{
    constructor(){
        super()

        this.closeCommentDayOptions = [
            {value: 0, label: '从不'},
            {value: 1, label: '1天'},
            {value: 2, label: '2天'},
            {value: 3, label: '3天'},
            {value: 7, label: '7天'},
            {value: 10, label: '10天'},
            {value: 14, label: '14天'},
            {value: 21, label: '21天'},
            {value: 30, label: '30天'},
            {value: 60, label: '60天'},
            {value: 90, label: '90天'},
            {value: 180, label: '180天'},
            {value: 365, label: '365天'}
        ]
    }

    render(){
        const {
            fields: {
                allowComment, 
                verifyComment, 
                trustAuthenticatedCommentUser, 
                enableCommentWebSite, 
                closeCommentDays
            }, 
            handleSubmit
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...allowComment}/>
                            允许评论
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...verifyComment}/>
                            审核评论
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...trustAuthenticatedCommentUser}/>
                            信任已通过验证的评论作者
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...enableCommentWebSite}/>
                            在评论中启用网站
                        </label>
                    </div>
                </FormGroup>

                <FormGroup label="之后关闭评论">
                    <select className="form-control" {...closeCommentDays}>
                        {this.closeCommentDayOptions.map(item=>{
                            return (
                                <option value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
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

CommentConfigForm = reduxForm({
    form: "commentConfigForm",
    fields: ["allowComment", "verifyComment", "trustAuthenticatedCommentUser", "enableCommentWebSite", "closeCommentDays"]
})(CommentConfigForm)

class CommentConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            config: {
                allowComment: false,
                verifyComment: false,
                trustAuthenticatedCommentUser: false,
                enableCommentWebSite: false,
                closeCommentDays: 0
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getCommentConfig(response => {
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
        })
    }

    onSubmit(model){
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveCommentConfig(model, response=>{
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

                <CommentConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></CommentConfigForm>
            </div>
        )
    }
}

module.exports = CommentConfig;