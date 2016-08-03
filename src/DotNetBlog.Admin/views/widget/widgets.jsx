var React = require("react")
var WidgetItem = require("./widgetitem")

class Widgets extends React.Component{
    constructor(){
        super()

        this.state = {
            draggingIndex: null,
            data: {
                items: [
                    1,2,3,4,5,6,7,8,9,10
                ]
            }
        }
    }

    updateState(obj) {
        this.setState(obj);
    }

    render() {
        var listItems = this.state.data.items.map(function (item, i) {
            return (
                <WidgetItem
                key={i}
                updateState={this.updateState.bind(this)}
                items={this.state.data.items}
                draggingIndex={this.state.draggingIndex}
                sortId={i}
                outline="column">{item}</WidgetItem>
            );
        }, this);

        return (
            <div className="content">{listItems}</div>
        )
    }
}

var Widgets2 = React.createClass({

  getInitialState: function () {
    return {
      draggingIndex: null,
      data: {
          items: [
            "Gold",
            "Crimson",
            "Hotpink",
            "Blueviolet",
            "Cornflowerblue"
            ]
        }
    };
  },

  updateState: function (obj) {
    this.setState(obj);
  },

  render: function () {
    var listItems = this.state.data.items.map(function (item, i) {
      return (
        <WidgetItem
          key={i}
          updateState={this.updateState}
          items={this.state.data.items}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="column">{item}</WidgetItem>
      );
    }, this);

    return (
      <div className="list">{listItems}</div>
    )
  }
});

module.exports = Widgets;