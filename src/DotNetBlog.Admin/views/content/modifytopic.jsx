var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor, Spinner} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Parallel = require("async/parallel");
var TagsInput = require("react-tagsinput")
var {hashHistory} = require("react-router")
var {Api,Dialog} = require("../../services")

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
        let id = this.props.params.id;
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
            Dialog.success("保存成功");

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
            Dialog.error("请输入文章标题");
            return;
        }
        let content = this.refs.editor.getContent();
        if(content == ""){
            Dialog.error("请输入文章内容");
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

            if(this.props.params.id){
                Api.editTopic(this.props.params.id, model, this.apiCallback.bind(this))
            }
            else{
                Api.addTopic(model, this.apiCallback.bind(this))
            }
        });
    }

    render(){
        return (
            <div className="content">
                <Spinner loading={this.state.loading} />
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
                                <label className="control-label">标签</label>

                                <TagsInput className="bootstrap-tagsinput" value={this.state.tags} onChange={this.onTagsChanged.bind(this)}></TagsInput>
                            </FormGroup>    

                            <Input type="text" label="日期" name="date" value={this.state.topic.date || ''}/>

                            <FormGroup>
                                <div className="checkbox">
                                    <Checkbox layout="elementOnly" name="allowComment" label="允许评论" value={this.state.topic.allowComment}></Checkbox>
                                </div>
                            </FormGroup>         

                            <FormGroup>
                                <button className="btn btn-default btn-block">自定义</button>
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
                <Input type="text" layout="elementOnly" name="title" value={this.state.topic.title} placeholder="文章的标题" required/>
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
                <input name="alias" type="text" className="form-control" value={this.state.topic.alias} onChange={handleAliasChange.bind(this)}/>
            </FormGroup>
        )
    }

    renderSummary(){
        function handleSummaryChange(e){
            var topic = this.state.topic;
            topic.summary = e.target.value;
            this.setState({
                topic: topic
            });
        }

        return (
            <FormGroup>
                <label className="control-label">摘要</label>
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
                <label className="control-label">分类</label>

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
            <a target="_blank" href={"/topic/" + this.state.topic.id} type="button" className="btn btn-success btn-block">转到文章</a>
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

module.exports = ModifyTopic;