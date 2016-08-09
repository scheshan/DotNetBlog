var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {}

    if(!values.title){
        errors.title = "请输入标题";
    }

    let topicsPerPage = parseInt(values.topicsPerPage);
    if(isNaN(Number(values.topicsPerPage)) || topicsPerPage < 1){
        errors.number = "请输入正确的文章数量";
    }

    return errors
}

class BasicConfigForm extends React.Component{
    render(){
        const {fields: {title, description, topicsPerPage, onlyShowSummary}, handleSubmit} = this.props

        return (
            <form noValidate onSubmit={handleSubmit} className="form-content">
                <FormGroup label="标题" hasError={title.touched && title.error}>
                    <input type="text" className="form-control" {...title}/>
                    {title.touched && title.error && <span className="help-block">{title.error}</span>}
                </FormGroup>
                <FormGroup label="摘要">
                    <input type="text" className="form-control" {...description}/>
                </FormGroup>
                <FormGroup label="每页文章数" hasError={topicsPerPage.touched && topicsPerPage.error}>
                    <input type="text" className="form-control" {...topicsPerPage}/>
                    {topicsPerPage.touched && topicsPerPage.error && <span className="help-block">{topicsPerPage.error}</span>}
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
    fields: ["title", "description", "topicsPerPage", "onlyShowSummary"],
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

                <BasicConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></BasicConfigForm>
            </div>
        )
    }
}

module.exports = BasicConfig