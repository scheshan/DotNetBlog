var React = require("react")


var WidgetList = require("./widgetlist")

class Widgets extends React.Component{
    render(){
        return (
            <div className="content">
                <div className="col-md-4">
                    <WidgetList></WidgetList>
                </div>
            </div>
        )
    }
}

module.exports = Widgets;