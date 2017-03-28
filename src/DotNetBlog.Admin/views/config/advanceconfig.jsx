var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};

    if(!values.errorPageTitle){
        errors.errorPageTitle = "invalidPageTitle".L();
    }
    if(!values.errorPageContent){
        errors.errorPageContent = "invalidPageContent".L();
    }

    return errors;
}

class AdvanceConfigForm extends React.Component{
    render(){
        const {fields: {errorPageTitle, errorPageContent, headerScript, footerScript}, handleSubmit} = this.props;

        return (
            <form noValidate onSubmit={handleSubmit}>
                <fieldset>
                    <legend>{"errorPage".L()}</legend>

                    <FormGroup label={"errorPageTitle".L()} validation={errorPageTitle}>
                        <input type="text" className="form-control" {...errorPageTitle}/>
                    </FormGroup>
                    <FormGroup label={"errorPageContent".L()} validation={errorPageContent}>
                        <textarea className="form-control" rows="4" {...errorPageContent}></textarea>
                    </FormGroup>
                </fieldset>

                <fieldset>
                    <legend>{"customCode".L()}</legend>

                    <FormGroup label={"headerScript".L()}>
                        <textarea className="form-control" rows="4" {...headerScript}></textarea>
                    </FormGroup>

                    <FormGroup label={"footerScript".L()}>
                        <textarea className="form-control" rows="4" {...footerScript}></textarea>
                    </FormGroup>
                </fieldset>

                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        {"save".L()}
                    </button>
                </FormGroup>
            </form>
        )
    }
}

AdvanceConfigForm = reduxForm({
    form: "advanceConfigForm",
    fields: ["errorPageTitle", "errorPageContent", "headerScript", "footerScript"],
    validate
})(AdvanceConfigForm)

class AdvanceConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            config: {
                errorPageTitle: "",
                errorPageContent: "",
                headerScript: "",
                footerScript: ""
            },
            loading: true
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        Api.getAdvanceConfig(response=>{
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

    onSubmit(model){
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveAdvanceConfig(model, response=>{
                this.setState({
                    loading: false
                });

                if(response.success){
                    Dialog.success("operationSuccessful".L())
                }
                else{
                    Dialog.error(response.errorMessage);
                }
            })
        });
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>
                <div className="form-content">
                    <AdvanceConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></AdvanceConfigForm>
                </div>
            </div>            
        )
    }
}

module.exports = AdvanceConfig