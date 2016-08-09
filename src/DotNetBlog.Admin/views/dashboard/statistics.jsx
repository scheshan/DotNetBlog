var React = require("react")
var {Api, Dialog} = require("../../services")
var {Link} = require("react-router")

class Statistics extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            statistics: {
                topics:{

                },
                comments:{
                    
                },
                pages:{

                }
            }
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getBlogStatistics(response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        statistics: response.data
                    });
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    render(){
        const {topics, pages, comments} = this.state.statistics;
        let junkComments = null;
        if(comments.total != undefined){
            junkComments = comments.total - comments.approved - comments.pending - comments.reject;
        }

        return (
            <div className="panel">
                <div className="panel-heading">统计</div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/content/topics?status=1">
                            已发表文章数 
                            <span className="badge pull-right">{topics.published}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/pages">
                            已发表页面数 
                            <span className="badge pull-right">{pages.published}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/topics?status=0">
                            文章稿件 
                            <span className="badge pull-right">{topics.draft}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/pages">
                            页面稿件 
                            <span className="badge pull-right">{pages.draft}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments?status=1">
                            已通过的评论 
                            <span className="badge pull-right">{comments.approved}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments?status=0">
                            未经审核的评论 
                            <span className="badge pull-right">{comments.pending}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments">
                            垃圾评论
                            <span className="badge pull-right">{junkComments}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = Statistics