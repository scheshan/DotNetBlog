var React = require("react")
var {Modal} = require("react-bootstrap")
var {Input} = require("formsy-react-components")
var {LoadingButton, Form} = require("../../components")

class ModifyCategory extends React.Component{
    constructor(){
        super();

        this.state = {
            show: false,
            category: {
                name: "",
                description: ""
            }
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

    }

    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title || "添加分类"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form layout="vertical">
                        <Input name="name" label="名称" value={this.state.category.name} required maxLength="50"/>

                        <Input name="description" label="描述" value={this.state.category.description} maxLength="200"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                    <LoadingButton loading={this.state.loading} className="btn btn-primary" onClick={this.submit.bind(this)}>保存</LoadingButton>
                </Modal.Footer>
            </Modal>
        )
    }
}

module.exports = ModifyCategory