var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor, Spinner} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Async = require("async");
var Api = require("../../services/api");
var TagsInput = require("react-tagsinput")
var _ = require("lodash")
var {hashHistory} = require("react-router")
var Dialog = require("../../services/dialog")

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
        this.loadData()
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Async.parallel([this.loadParent.bind(this), this.loadPage.bind(this)], (err, args)=>{
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
        let id = this.props.params.id;
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
        let id = this.props.params.id;
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
            Dialog.success("保存成功");

            let page = response.data;
            if(page.parent){
                page.parent = page.parent.id;
            }

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
            Dialog.error("请输入页面标题");
            return;
        }
        model.content = this.refs.editor.getContent();
        if(model.content == ""){
            Dialog.error("请输入页面内容");
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            if(this.props.params.id){
                Api.editPage(this.props.params.id, model, this.apiCallback.bind(this))
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
                                <button className="btn btn-default btn-block">自定义</button>
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
                <input className="form-control" type="text" name="title" value={this.state.page.title} placeholder="文章的标题" onChange={handleTitleChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderContent(){
        function handleContentChange(e) {
            let content = e.target.getContent()
            this.state.page.content = content;
        }

        return (
            <FormGroup>
                <Editor 
                    ref="editor"
                    content={this.state.page.content} 
                    onChange={handleContentChange.bind(this)}
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
                <label className="control-label">别名(可选)</label>
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
                <label className="control-label">关键词</label>
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
                <label className="control-label">页面描述</label>
                <textarea rows="4" name="description" type="text" className="form-control" value={this.state.page.description} onChange={handleDescriptionChange.bind(this)}></textarea>
            </FormGroup>
        )
    }

    renderButton(){
        let publishBtn = (
            <button type="button" className="btn btn-success btn-block" onClick={this.publish.bind(this)}>发布</button>
        )
        let saveBtn = (
            <button type="button" className="btn btn-primary btn-block" onClick={this.save.bind(this)}>保存</button>
        )
        let cancelBtn = (
            <button type="button" className="btn btn-default btn-block" onClick={this.cancel.bind(this)}>取消</button>
        )
        let draftBtn = (
            <button type="button" className="btn btn-warning btn-block" onClick={this.draft.bind(this)}>取消发布</button>
        )
        let viewBtn = (
            <a target="_blank" href={"/page/" + this.state.page.id} type="button" className="btn btn-success btn-block">转到页面</a>
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
                <label className="control-label">上级</label>
                <select name="parent" className="form-control" value={this.state.page.parent} onChange={handleParentChange.bind(this)}>
                    <option>--无--</option>
                    {
                        this.state.pageList.map(page=>{
                            return (
                                <option value={page.id}>{page.title}</option>
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
                <label className="control-label">日期</label>
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
                    是否为首页
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
                    在列表中显示
                </label>
            </div>
        )
    }
}

module.exports = ModifyPage;