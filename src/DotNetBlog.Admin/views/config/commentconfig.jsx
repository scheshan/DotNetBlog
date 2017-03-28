var React = require("react")
var {Spinner, Bootstrap: {FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

class CommentConfigForm extends React.Component{
    constructor(){
        super()

        this.closeCommentDayOptions = [
            {value: 0, label: 'never'.L()},
            { value: 1, label: 'numericDay'.L(1)},
            { value: 2, label: 'numericDay'.L(2)},
            { value: 3, label: 'numericDay'.L(3)},
            { value: 7, label: 'numericDay'.L(7)},
            { value: 10, label: 'numericDay'.L(10)},
            { value: 14, label: 'numericDay'.L(14)},
            { value: 21, label: 'numericDay'.L(21)},
            { value: 30, label: 'numericDay'.L(30)},
            { value: 60, label: 'numericDay'.L(60)},
            { value: 90, label: 'numericDay'.L(90)},
            { value: 180, label: 'numericDay'.L(180)},
            { value: 365, label: 'numericDay'.L(365)}
        ]
    }

    render(){
        const {
            fields: {
                allowComment, 
                verifyComment, 
                trustAuthenticatedCommentUser, 
                enableCommentWebSite, 
                closeCommentDays
            }, 
            handleSubmit
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...allowComment}/>
                            {"allowComment".L()}
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...verifyComment}/>
                            {"verifyComment".L()}
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...trustAuthenticatedCommentUser}/>
                            {"trustAuthenticatedCommentsUsers".L()}
                        </label>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" {...enableCommentWebSite}/>
                            {"enableWebsiteComment".L()}
                        </label>
                    </div>
                </FormGroup>

                <FormGroup label={"closeCommentAfter".L()}>
                    <select className="form-control" {...closeCommentDays}>
                        {this.closeCommentDayOptions.map(item=>{
                            return (
                                <option value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
                </FormGroup>

                <FormGroup>
                    <button type="submit" className="btn btn-primary">
                        {"save".L()}
                    </button>
                </FormGroup>
            </form>
        )
    }
}

CommentConfigForm = reduxForm({
    form: "commentConfigForm",
    fields: ["allowComment", "verifyComment", "trustAuthenticatedCommentUser", "enableCommentWebSite", "closeCommentDays"]
})(CommentConfigForm)

class CommentConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            config: {
                allowComment: false,
                verifyComment: false,
                trustAuthenticatedCommentUser: false,
                enableCommentWebSite: false,
                closeCommentDays: 0
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getCommentConfig(response => {
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
        })
    }

    onSubmit(model){
        if(this.state.loading){
            return false;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveCommentConfig(model, response=>{
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
                    <CommentConfigForm onSubmit={this.onSubmit.bind(this)} initialValues={this.state.config}></CommentConfigForm>
                </div>
            </div>
        )
    }
}

module.exports = CommentConfig;