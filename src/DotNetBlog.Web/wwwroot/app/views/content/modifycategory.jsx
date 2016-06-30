var React = require("react")
var {Modal} = require("react-bootstrap")
var Form = require("../../components/form")

class ModifyCategory extends React.Component{
    constructor(){
        super();

        this.state = {
            show: false,
            name: "1"
        }
    }

    show(){
        this.setState({
            show: true
        })
    }
    hide(){
        this.setState({
            show: false
        })
    }
    submit(){
        this.setState({
            name: "2"
        })
        alert(2)
    }

    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input type="text" className="form-control" defaultValue={this.state.name}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                    <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>Save changes</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

module.exports = ModifyCategory