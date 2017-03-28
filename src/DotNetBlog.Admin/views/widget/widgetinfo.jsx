var React = require("react")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")

class WidgetInfo extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            widget: {
                
            }
        }
    }

    show(widget){
        this.setState({
            show: true,
            widget: widget
        })
    }

    close(){
        this.setState({
            show: false
        })
    }

    render(){
        let icon = "/images/widget/" + this.state.widget.icon + ".png";
        return (
            <Modal show={this.state.show}>
                <ModalHeader>{this.state.widget.name}</ModalHeader>
                <ModalBody>
                    <p className="text-center">
                        <img src={icon} />
                    </p>                    
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.close.bind(this)} className="btn btn-primary">{"close".L()}</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = WidgetInfo