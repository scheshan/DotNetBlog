var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor, Spinner} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Parallel = require("async/parallel");
var TagsInput = require("react-tagsinput")
var {hashHistory} = require("react-router")
var {Api,Dialog} = require("../../services")
var {connect} = require("react-redux")
var ModifyTopicSetting = require("./modifytopicsetting")

const emptyTopic = {
    title: "",
    content: "",
    alias: "",
    summary: "",
    allowComment: true,
    tags: [],
    categoryList: []
}

class ModifyTopic extends React.Component{
    constructor(){
        super();

        this.state = {
            categoryList: [],
            loading: false,
            topic: _.assign({},emptyTopic),
            tags: [],
            selectedCategory: []
        };
    }

    componentDidMount(){
        this.id = this.props.params.id;
        this.loadData();
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Parallel([this.loadCategory.bind(this), this.loadTopic.bind(this)], (err, args)=>{
                let categoryList = args[0];
                let topic = args[1];

                _.forEach(topic.categories, cat=>{
                    let category = _.find(categoryList, {id: cat.id});
                    if(category){
                        category.checked = true;
                    }
                })

                this.setState({
                    loading: false,
                    categoryList: args[0],
                    topic: topic,
                    tags: topic.tags
                });
            });
        });
    }

    loadCategory(callback){
        Api.getCategoryList(response=>{
            if(response.success){
                callback(null, response.data);
            }
            else{
                callback(response.errorMessage);
            }
        });
    }

    loadTopic(callback){
        let id = this.id;
        if(id){
            Api.getTopic(id, response=>{
                if(response.success){
                    callback(null, response.data)
                }
                else{
                    callback(response.errorMessage)
                }
            })
        }
        else{
            callback(null, _.assign({},emptyTopic))
        }
    }

    onTagsChanged(tags){
        this.setState({
            tags
        })
    }

    handleContentChange(e){
        let content = e.target.getContent()
        this.state.topic.content = content;
    }

    publish(){
        this.state.topic.status = 1;
        this.refs.form.submit();
    }

    save(){
        this.refs.form.submit();
    }

    draft(){
        this.state.topic.status = 0;
        this.refs.form.submit();
    }

    cancel(){
        hashHistory.goBack()
    }

    apiCallback(response){        
        if(response.success){
            Dialog.success("operationSuccessful".L());

            this.id = response.data.id;

            this.setState({
                topic: response.data,
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

    onSubmit(model){
        if(model.title == ""){
            Dialog.error("enterTheTitleOfArticle".L());
            return;
        }
        let content = this.refs.editor.getContent();
        if(content == ""){
            Dialog.error("enterTheContentOfArticle".L());
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            model.status = this.state.topic.status;
            model.content = content;
            model.tagList = this.state.tags;
            model.categoryList = _.map(_.filter(this.state.categoryList, {checked: true}), cat=>cat.id)        
            model.alias = this.state.topic.alias;
            model.summary = this.state.topic.summary;

            if(this.id){
                Api.editTopic(this.id, model, this.apiCallback.bind(this))
            }
            else{
                Api.addTopic(model, this.apiCallback.bind(this))
            }
        });
    }

    showSetting(){
        this.refs.modifyTopicSetting.getWrappedInstance().show();
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading} />
                <ModifyTopicSetting ref="modifyTopicSetting"></ModifyTopicSetting>
                <div className="row">
                    <Form onSubmit={this.onSubmit.bind(this)} ref="form" layout="vertical">
                        <div className="col-md-10">
                            {this.renderTitle()}

                            {this.renderContent()}

                            {this.renderAlias()}

                            {this.renderSummary()}
                        </div>
                        <div className="col-md-2">
                            {this.renderButton()}

                            {this.renderCategory()}

                            <FormGroup>
                                <label className="control-label">{"tag".L()}</label>

                                <TagsInput className="bootstrap-tagsinput" value={this.state.tags} onChange={this.onTagsChanged.bind(this)}></TagsInput>
                            </FormGroup>    

                            {this.renderDate()}

                            <FormGroup>
                                <div className="checkbox">
                                    <Checkbox layout="elementOnly" name="allowComment" label={"allowComment".L()} value={this.state.topic.allowComment}></Checkbox>
                                </div>
                            </FormGroup>         

                            <FormGroup>
                                <button type="button" className="btn btn-default btn-block" onClick={this.showSetting.bind(this)}>{"customize".L()}</button>
                            </FormGroup>   
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    renderTitle(){
        return (
            <FormGroup>
                <Input type="text" layout="elementOnly" name="title" value={this.state.topic.title} placeholder={"theTitleOfArticle".L()} required/>
            </FormGroup>
        )
    }

    renderContent(){
        return (
            <FormGroup>
                <Editor 
                    ref="editor" 
                    content={this.state.topic.content || ''} 
                    onChange={this.handleContentChange.bind(this)}
                />
            </FormGroup>

        )
    }

    renderAlias(){
        if(!this.props.topicSetting.showAlias){
            return null;
        }

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
                <input name="alias" type="text" className="form-control" value={this.state.topic.alias} onChange={handleAliasChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderSummary(){
        if(!this.props.topicSetting.showSummary){
            return null;
        }

        function handleSummaryChange(e){
            var topic = this.state.topic;
            topic.summary = e.target.value;
            this.setState({
                topic: topic
            });
        }

        return (
            <FormGroup>
                <label className="control-label">{"summary".L()}</label>
                <textarea rows="4" name="summary" className="form-control" value={this.state.topic.summary} onChange={handleSummaryChange.bind(this)}></textarea>
            </FormGroup>
        )
    }

    checkCategory(cat){
        cat.checked = !cat.checked;
        this.forceUpdate()
    }

    renderCategory(){
        return (
            <FormGroup>
                <label className="control-label">{"category".L()}</label>

                <ul className="list-group category-list">
                    {
                        this.state.categoryList.map(cat=>{
                            return (
                                <a href="javascript:void(0)" className="list-group-item checkbox" key={cat.id} onClick={this.checkCategory.bind(this, cat)}>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name="category" 
                                            value={cat.id} 
                                            checked={cat.checked}/>
                                        {cat.name}
                                    </label>
                                </a>
                            )
                        })
                    }
                </ul>
            </FormGroup>
        )
    }

    renderDate(){
        if(!this.props.topicSetting.showDate){
            return null;
        }

        return (
            <Input type="text" label={"date".L()} name="date" value={this.state.topic.date || ''}/>
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
            <a target="_blank" href={"/topic/" + this.state.topic.id} type="button" className="btn btn-success btn-block">{"goToArticle".L()}</a>
        )

        if(!this.state.topic.id){
            return (
                <FormGroup>
                    {publishBtn}
                    {saveBtn}
                    {cancelBtn}
                </FormGroup>
            )
        }
        else if(this.state.topic.status == 1){
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
}

function mapStateToProps(state){
    const {blog:{topicSetting}} = state;
    return {
        topicSetting: topicSetting
    };
}

module.exports = connect(mapStateToProps)(ModifyTopic);