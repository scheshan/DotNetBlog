var React = require("react")
var Statistics = require("./statistics")
var RecentComment = require("./recentcomment")
var QuickPost = require("./quickpost")
var TopicDraft = require("./topicdraft")

class Dashboard extends React.Component{
    render() {
        return (
            <div className="content">
                <div className="col-md-5">
                    <Statistics></Statistics>

                    <RecentComment></RecentComment>
                </div>
                <div className="col-md-7">
                    <QuickPost></QuickPost>

                    <TopicDraft></TopicDraft>
                </div>
            </div>
        )
    }
}

module.exports = Dashboard