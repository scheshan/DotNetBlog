var React = require("react")
var {Api, Dialog} = require("../../services")
var {Link} = require("react-router")

class RecentComment extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
            commentList: []
        }
    }
    componentDidMount(){
        this.loadData()
    }

    loadData(){
        Api.queryPendingComment(10, response=>{
            if(response.success){
                this.setState({
                    loading: false,
                    commentList: response.data
                });
            }
            else{
                this.setState({
                    loading: false
                });
                Dialog.error(response.errorMessage);
            }
        })
    }

    render(){
        return (
            <div className="panel">
                <div className="panel-heading">
                    <div className="panel-title">最新评论</div>
                </div>
                {this.renderCommentList()}
            </div>
        )
    }
    renderCommentList(){
        if(this.state.loading){
            return (
                <div className="panel-body">
                    <div className="text-center">
                        <i className="fa fa-spin fa-spinner"></i>
                    </div>
                </div>
            )
        }
        else{
            if(this.state.commentList.length == 0){
                return (
                    <div className="panel-body">
                        无
                    </div>
                )
            }
            else{
                return (
                    <ul className="list-group">
                        {
                            this.state.commentList.map(comment=>{
                                return (
                                    <li className="list-group-item clearfix">
                                        <a href={"/topic/" + comment.topicID + "#comment_" + comment.id}>{comment.content}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        }
    }
}

module.exports = RecentComment