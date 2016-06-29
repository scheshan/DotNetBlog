var React = require("react")
var ContentHeader = require('../components/contentheader')


class Dashboard extends React.Component{
    render() {
        return (
            <div>
                <ContentHeader title="控制台"/>

                <section className="content">

                </section>
            </div>
        )
    }
}

module.exports = Dashboard