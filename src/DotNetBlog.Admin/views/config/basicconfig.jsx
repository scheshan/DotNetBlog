var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {}

    if(!values.host){
        errors.host = "请输入博客地址";
    }

    if(!values.title){
        errors.title = "请输入标题";
    }

    let topicsPerPage = parseInt(values.topicsPerPage);
    if(isNaN(Number(values.topicsPerPage)) || topicsPerPage < 1){
        errors.topicsPerPage = "请输入正确的文章数量";
    }

    return errors
}

class BasicConfigForm extends React.Component{
    render(){
        const {fields: {host, title, description, topicsPerPage, onlyShowSummary}, handleSubmit} = this.props
        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup label="博客地址" validation={host}>
                    <input type="text" className="form-control" {...host}/>
                </FormGroup>
                <FormGroup label="标题" validation={title}>
                    <input type="text" className="form-control" {...title}/>
                </FormGroup>
                <FormGroup label="摘要">
                    <input type="text" className="form-control" {...description}/>
                </FormGroup>
                <FormGroup label="每页文章数" validation={topicsPerPage}>
                    <input type="text" className="form-control" {...topicsPerPage}/>
                </FormGroup>
                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...onlyShowSummary}/>
                            仅显示文章摘要
                        </label>
                    </div>
                </FormGroup>
                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        保存
                    </button>
                </FormGroup>
            </form>
        )
    }
}

BasicConfigForm = reduxForm({
    form: "basicConfigForm",
    fields: ["host", "title", "description", "topicsPerPage", "onlyShowSummary"],
    validate
})(BasicConfigForm)

class BasicConfig extends React.Component{
    constructor() {
        super()

        this.state = {
            config: {
                title: "",
                description: "",
                topicsPerPage: 10
            },
            loading: true
        }
    }

    onSubmit(model) {
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveBasicConfig(model, response=>{
                this.setState({
                    loading: false
                });

                if(response.success){
                    Dialog.success("保存成功")
                }
                else{
                    Dialog.error(response.errorMessage);
                }
            })
        });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        Api.getBasicConfig(response => {
            if (response.success) {
                this.setState({
                    config: response.data,
                    loading: false
                })
            }
            else{
                Dialog.error(response.errorMessage);
                this.setState({
                    loading: false
                })
            }
        })
    }

    render() {
        return (                
            <div className="content">
                <Spinner loading={this.state.loading}/>
                <div className="form-content">
                    <BasicConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></BasicConfigForm>
                </div>
            </div>
        )
    }
}

module.exports = BasicConfig