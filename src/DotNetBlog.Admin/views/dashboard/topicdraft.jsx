var React = require("react")
var {Api, Dialog} = require("../../services")
var {Link} = require("react-router")

class TopicDraft extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
            topicList: []
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        Api.queryDraftTopic(10, response=>{
            if(response.success){
                this.setState({
                    loading: false,
                    topicList: response.data
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
                    <div className="panel-title">文章稿件</div>
                </div>
                {this.renderTopicList()}
            </div>
        )
    }

    renderTopicList(){
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
            if(this.state.topicList.length == 0){
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
                            this.state.topicList.map(topic=>{
                                return (
                                    <li className="list-group-item clearfix">
                                        <Link to={"/content/topic/" + topic.id}>{topic.title}</Link>
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

module.exports = TopicDraft