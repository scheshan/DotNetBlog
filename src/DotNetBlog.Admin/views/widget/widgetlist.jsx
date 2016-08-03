var React = require("react")
var {DragSource, DropTarget} = require('react-dnd');
var WidgetItem = require("./widgetitem")

const widgetTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class WidgetList extends React.Component{
    render(){
        return (
            <ul>
                <WidgetItem text="1"></WidgetItem>
                <WidgetItem text="2"></WidgetItem>
                <WidgetItem text="3"></WidgetItem>
                <WidgetItem text="4"></WidgetItem>
                <WidgetItem text="5"></WidgetItem>
                <WidgetItem text="6"></WidgetItem>
                <WidgetItem text="7"></WidgetItem>
                <WidgetItem text="8"></WidgetItem>
                <WidgetItem text="9"></WidgetItem>
                <WidgetItem text="10"></WidgetItem>
            </ul>
        )
    }
}

module.exports = DropTarget("widget", widgetTarget, ()=>{return {}})(WidgetList);