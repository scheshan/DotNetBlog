var React = require("react")
var Statistics = require("./statistics")
var RecentComment = require("./recentcomment")
var QuickPost = require("./quickpost")
var TopicDraft = require("./topicdraft")

class Dashboard extends React.Component{
    onSaveDraft(){
        this.refs.topicDraft.loadData()
    }

    render() {
        return (
            <div className="content">
                <div className="col-md-5">
                    <Statistics></Statistics>

                    <RecentComment></RecentComment>
                </div>
                <div className="col-md-7">
                    <QuickPost onSave={this.onSaveDraft.bind(this)}></QuickPost>

                    <TopicDraft ref="topicDraft"></TopicDraft>
                </div>

                <div className="clearfix"></div>
            </div>
        )
    }
}

module.exports = Dashboard