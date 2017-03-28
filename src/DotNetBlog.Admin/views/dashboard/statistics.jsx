var React = require("react")
var {Api, Dialog} = require("../../services")
var {Link} = require("react-router")

class Statistics extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
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
        this.loadData()
    }

    loadData(){
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
    }

    render(){
        const {topics, pages, comments} = this.state.statistics;
        let junkComments = null;
        if(comments.total != undefined){
            junkComments = comments.total - comments.approved - comments.pending - comments.reject;
        }

        return (
            <div className="panel">
                <div className="panel-heading">{"statistics".L()}</div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/content/topics?status=1">
                            {"numberOfArticlesPublished".L()} 
                            <span className="badge pull-right">{topics.published}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/pages">
                            {"numberOfPagesPublished".L()} 
                            <span className="badge pull-right">{pages.published}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/topics?status=0">
                            {"savedDrafts".L()} 
                            <span className="badge pull-right">{topics.draft}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/pages">
                            {"numberOfPages".L()} 
                            <span className="badge pull-right">{pages.draft}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments?status=1">
                            {"approvedComments".L()}
                            <span className="badge pull-right">{comments.approved}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments?status=0">
                            {"pendingComments".L()} 
                            <span className="badge pull-right">{comments.pending}</span>
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/content/comments">
                            {"junkComments".L()}
                            <span className="badge pull-right">{junkComments}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = Statistics