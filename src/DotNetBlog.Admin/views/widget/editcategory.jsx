var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} = require("react-bootstrap")
var {Input, Checkbox} = require("formsy-react-components")
var {Form} = require("../../components")

class EditCategory extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            title: "",
            showRss: false,
            showNumbersOfTopics: false
        }
    }

    show(widget, index){
        this.widget = widget;
        this.index = index;
        this.setState({
            show: true,
            title: widget.config.title,
            showRSS: widget.config.showRSS,
            showNumbersOfTopics: widget.config.showNumbersOfTopics
        });
    }

    hide(){
        this.setState({
            show: false
        })
    }

    submit(model){
        this.widget.config.title = model.title;
        this.widget.config.showRSS = model.showRSS;
        this.widget.config.showNumbersOfTopics = model.showNumbersOfTopics;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }
    
    render(){
        return (
            <Modal show={this.state.show}>
                <Form layout="vertical" onValidSubmit={this.submit.bind(this)}>
                    <ModalHeader>修改配置</ModalHeader>
                    <ModalBody>
                        <Input name="title" label="标题" required value={this.state.title}></Input>

                        <Checkbox layout="elementOnly" name="showRSS" label="显示RSS按钮" value={this.state.showRSS}></Checkbox>
                        
                        <Checkbox layout="elementOnly" name="showNumbersOfTopics" label="显示文章数" value={this.state.showNumbersOfTopics}></Checkbox>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-default" onClick={this.hide.bind(this)}>取消</button>
                        <button formNoValidate type="submit" className="btn btn-primary">保存</button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

module.exports = EditCategory