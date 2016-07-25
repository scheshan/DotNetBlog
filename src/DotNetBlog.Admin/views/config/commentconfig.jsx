var React = require("react")
var {Form, Spinner} = require("../../components")
var Api = require("../../services/api")
var FRC = require("formsy-react-components")
const {Input, Checkbox, Select} = FRC
var Dialog = require("../../services/dialog")

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
                    Dialog.error("错误");
                    this.setState({
                        loading: false
                    })
                }
            })
        })
    }

    submit(model){
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
        const closeCommentOptions = [
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

        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>

                <Form layout="vertical" onValidSubmit={this.submit.bind(this)} className="form-content">
                    <Checkbox 
                        layout="elementOnly"
                        name="allowComment" 
                        label="允许评论" 
                        checked={this.state.config.allowComment}
                        value={this.state.config.allowComment}/>

                    <Checkbox 
                        layout="elementOnly"
                        name="verifyComment" 
                        label="审核评论" 
                        checked={this.state.config.verifyComment}
                        value={this.state.config.verifyComment}/>

                    <Checkbox 
                        layout="elementOnly"
                        name="trustAuthenticatedCommentUser" 
                        label="信任已通过验证的评论作者" 
                        checked={this.state.config.trustAuthenticatedCommentUser}
                        value={this.state.config.trustAuthenticatedCommentUser}/>

                    <Checkbox 
                        layout="elementOnly"
                        name="enableCommentWebSite" 
                        label="在评论中启用网站" 
                        checked={this.state.config.enableCommentWebSite}
                        value={this.state.config.enableCommentWebSite}/>

                    <Select label="之后关闭评论" name="closeCommentDays" options={closeCommentOptions} value={this.state.config.closeCommentDays}>

                    </Select>

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

module.exports = CommentConfig;