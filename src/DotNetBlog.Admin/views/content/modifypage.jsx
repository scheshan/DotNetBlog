var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor, Spinner} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Parallel = require("async/parallel");
var TagsInput = require("react-tagsinput")
var {hashHistory} = require("react-router")
var {Api, Dialog} = require("../../services")

const emptyPage = {
    title: "",
    content: "",
    alias: "",
    keywords: "",
    description: "",
    date: "",
    parent: null,
    isHomePage: false,
    showInList: false
}

class ModifyPage extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            page: _.assign({}, emptyPage),
            pageList: []
        }
    }

    componentDidMount(){
        this.id = this.props.params.id;
        this.loadData()
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Parallel([this.loadParent.bind(this), this.loadPage.bind(this)], (err, args)=>{
                let pageList = args[0];
                let page = args[1];

                this.setState({
                    loading: false,
                    pageList: pageList,
                    page: page
                })
            })
        })
    }

    loadParent(callback){
        let id = this.id;
        Api.queryPage(response=>{
            if(response.success){
                var pageList = _.filter(response.data, page=>{
                    if(page.parent){
                        return false;
                    }
                    if(id && id == page.id){
                        return false;
                    }
                    return true;
                })
                callback(null, pageList);
            }
            else{
                callback(response.errorMessage)
            }
        })
    }

    loadPage(callback){
        let id = this.id;
        if(id){
            Api.getPage(id, response=>{
                if(response.success){
                    let page = response.data;
                    if(page.parent){
                        page.parent = page.parent.id;
                    }
                    callback(null, page)
                }
                else{
                    callback(response.errorMessage)
                }
            })
        }
        else{
            callback(null, _.assign({},emptyPage))
        }
    }

    publish(){
        let page = this.state.page;
        page.status = 1;
        this.submit(page)
    }

    save(){
        let page = this.state.page;
        this.submit(page)
    }

    cancel(){
        hashHistory.goBack()
    }

    draft(){
        let page = this.state.page;
        page.status = 0;
        this.submit(page)
    }

    apiCallback(response){
        if(response.success){
            Dialog.success("operationSuccessful".L());

            let page = response.data;
            if(page.parent){
                page.parent = page.parent.id;
            }

            this.id = response.data.id;

            this.setState({
                page,
                loading: false
            });
        }
        else{
            this.setState({
                loading: false
            })
            Dialog.error(response.errorMessage)
        }
    }

    submit(model){
        if(model.title == ""){
            Dialog.error("pleaseEnterPageTitle".L());
            return;
        }
        model.content = this.refs.editor.getContent();
        if(model.content == ""){
            Dialog.error("pleaseEnterPageContent".L());
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            if(this.id){
                Api.editPage(this.id, model, this.apiCallback.bind(this))
            }
            else{
                Api.addPage(model, this.apiCallback.bind(this))
            }
        });
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading} />
                <div className="row">
                    <Form layout="vertical">
                        <div className="col-md-10">
                            {this.renderTitle()}

                            {this.renderContent()}

                            {this.renderAlias()}

                            {this.renderKeywords()}

                            {this.renderDescription()}
                        </div>
                        <div className="col-md-2">
                            {this.renderButton()}  

                            {this.renderDate()}

                            {this.renderParent()}

                            <FormGroup>
                                {this.renderIsHomePage()}

                                {this.renderShowInList()}
                            </FormGroup>         

                            <FormGroup>
                                <button className="btn btn-default btn-block">{"customize".L()}</button>
                            </FormGroup>   
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    renderTitle(){
        function handleTitleChange(e) {
            let page = this.state.page;
            page.title = e.target.value;
            this.setState({
                page: page
            })
        }

        return (
            <FormGroup>
                <input className="form-control" type="text" name="title" value={this.state.page.title} placeholder={"theTitleOfArticle".L()} onChange={handleTitleChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderContent(){
        return (
            <FormGroup>
                <Editor 
                    ref="editor"
                    content={this.state.page.content}
                />
            </FormGroup>

        )
    }

    renderAlias(){
        function handleAliasChange(e){
            var topic = this.state.topic;
            topic.alias = e.target.value;
            this.setState({
                topic: topic
            });
        }

        return (
            <FormGroup>
                <label className="control-label">{"alias_optional".L()}</label>
                <input name="alias" type="text" className="form-control" value={this.state.page.alias} onChange={handleAliasChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderKeywords(){
        function handleKeywordsChange(e){
            var topic = this.state.topic;
            topic.keywords = e.target.value;
            this.setState({
                topic: topic
            });
        }

        return (
            <FormGroup>
                <label className="control-label">{"keywords".L()}</label>
                <textarea rows="4" name="keywords" type="text" className="form-control" value={this.state.page.keywords} onChange={handleKeywordsChange.bind(this)}></textarea>
            </FormGroup>
        )
    }

    renderDescription(){
        function handleDescriptionChange(e){
            var topic = this.state.topic;
            topic.description = e.target.value;
            this.setState({
                topic: topic
            });
        }

        return (
            <FormGroup>
                <label className="control-label">{"pageDescription".L()}</label>
                <textarea rows="4" name="description" type="text" className="form-control" value={this.state.page.description} onChange={handleDescriptionChange.bind(this)}></textarea>
            </FormGroup>
        )
    }

    renderButton(){
        let publishBtn = (
            <button type="button" className="btn btn-success btn-block" onClick={this.publish.bind(this)}>{"publish".L()}</button>
        )
        let saveBtn = (
            <button type="button" className="btn btn-primary btn-block" onClick={this.save.bind(this)}>{"save".L()}</button>
        )
        let cancelBtn = (
            <button type="button" className="btn btn-default btn-block" onClick={this.cancel.bind(this)}>{"cancel".L()}</button>
        )
        let draftBtn = (
            <button type="button" className="btn btn-warning btn-block" onClick={this.draft.bind(this)}>{"cancelThePublish".L()}</button>
        )
        let viewBtn = (
            <a target="_blank" href={"/page/" + this.state.page.id} type="button" className="btn btn-success btn-block">{"goToThePage".L()}</a>
        )

        if(!this.state.page.id){
            return (
                <FormGroup>
                    {publishBtn}
                    {saveBtn}
                    {cancelBtn}
                </FormGroup>
            )
        }
        else if(this.state.page.status == 1){
            return (
                <FormGroup>
                    {viewBtn}
                    {draftBtn}
                    {saveBtn}
                    {cancelBtn}
                </FormGroup>
            )
        }
        else{
            return (
                <FormGroup>
                    {viewBtn}
                    {publishBtn}
                    {saveBtn}
                    {cancelBtn}
                </FormGroup>
            )
        }
    }

    renderParent(){
        function handleParentChange(e) {
            let page = this.state.page;
            page.parent = e.target.value;
            this.setState({
                page
            })
        }

        return (
            <FormGroup>
                <label className="control-label">{"parent".L()}</label>
                <select name="parent" className="form-control" value={this.state.page.parent} onChange={handleParentChange.bind(this)}>
                    <option>--{"empty".L()}--</option>
                    {
                        this.state.pageList.map(page=>{
                            return (
                                <option key={page.id} value={page.id}>{page.title}</option>
                            )
                        })
                    }
                </select>                
            </FormGroup>
        )
    }

    renderDate(){
        function handleDateChange(e) {
            let page = this.state.page;
            page.date = e.target.value;
            this.setState({
                page
            })
        }

        return (
            <FormGroup>
                <label className="control-label">{"date".L()}</label>
                <input type="text" className="form-control" name="date" value={this.state.page.date} onChange={handleDateChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderIsHomePage(){
        function handleIsHomePageChanged(e) {
            let page = this.state.page;
            page.isHomePage = e.target.checked;
            this.setState({
                page
            })
        }

        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" name="isHomePage" checked={this.state.page.isHomePage} onChange={handleIsHomePageChanged.bind(this)}/>
                    {"setAsHomePage".L()}
                </label>
            </div>
        )
    }

    renderShowInList(){
        function handleShowInListChanged(e) {
            let page = this.state.page;
            page.showInList = e.target.checked;
            this.setState({
                page
            })
        }

        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" name="showInList" checked={this.state.page.showInList} onChange={handleShowInListChanged.bind(this)}/>
                    {"isDisplayedInTheList".L()}
                </label>
            </div>
        )
    }
}


module.exports = ModifyPage;