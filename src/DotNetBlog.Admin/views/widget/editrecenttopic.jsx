var React = require("react")
var {Modal, ModalHeader, ModalFooter, ModalBody} = require("react-bootstrap")
var {Bootstrap: {FormGroup}} = require("../../components")
var {reduxForm} = require('redux-form')
var Api = require("../../services/api")

const validate = values=>{
    const errors = {};
    if(!values.title){
        errors.title = "请输入标题";
    }
    if(!values.number){
        errors.number = "请输入文章数目";
    }
    
    let number = parseInt(values.number);
    if(isNaN(Number(values.number)) || number < 1){
        errors.number = "请输入正确的文章数量";
    }

    return errors;
}

class EditRecentTopicForm extends React.Component{
    constructor(){
        super()
        this.state = {
            categoryList: []
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        Api.getCategoryList(response=>{
            if(response.success){
                this.setState({
                    categoryList: response.data
                })
            }
        })
    }
    render(){
        const {fields: {title, number, category}, handleSubmit} = this.props;
        return (
            <form noValidate onSubmit={handleSubmit}>    
                <FormGroup label="标题" validation={title}>
                    <input className="form-control" {...title}></input>
                </FormGroup>    
                <FormGroup label="显示文章数目" validation={number}>
                    <input className="form-control" {...number}></input>
                </FormGroup>    
                <FormGroup label="选择分类">
                    <select className="form-control" {...category}>
                        <option value="">无</option>
                        {this.state.categoryList.map(category=>{
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </FormGroup>
            </form>
        )
    }
}

EditRecentTopicForm = reduxForm({
    form: "editRecentTopicForm",
    fields: ["title", "number", "category"],
    validate
})(EditRecentTopicForm)

class EditRecentTopic extends React.Component{
    constructor(){
        super()
        
        this.state = {
            show: false,
            config: {
                title: "",
                number: 0,
                category: null
            }
        }
    }

    show(widget, index){
        this.widget = widget;
        this.index = index;
        this.setState({
            show: true,
            config: widget.config
        });
    }

    hide(){
        this.setState({
            show: false
        })
    }

    onSubmit(model){
        this.widget.config.title = model.title;
        this.widget.config.number = model.number;
        this.widget.config.category = model.category;
        this.props.onSave && this.props.onSave(this.widget, this.index);
        this.hide()
    }

    submit(){        
        this.refs.form.submit()
    }
    
    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>    
                <ModalHeader closeButton>修改配置</ModalHeader>
                <ModalBody>
                    <EditRecentTopicForm 
                        ref="form"
                        initialValues={this.state.config}
                        onSubmit={this.onSubmit.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={this.submit.bind(this)}>保存</button>
                </ModalFooter>
            </Modal>
        )
    }
}

module.exports = EditRecentTopic