var React = require("react");
var {Input, Textarea, Checkbox} = require("formsy-react-components");
var {Form, Editor} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var Async = require("async");
var Api = require("../../services/api");
var TagsInput = require("react-tagsinput")
var _ = require("lodash")
var {hashHistory} = require("react-router")
var Dialog = require("../../services/dialog")

const emptyTopic = {
    title: "",
    content: "",
    alias: "",
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
            Async.parallel([this.loadCategory.bind(this), this.loadTopic.bind(this)], (err, args)=>{
                let categoryList = args[0];
                let topic = args[1];

                this.setState({
                    loading: false,
                    categoryList: args[0],
                    topic: topic,
                    tags: topic.tags,
                    selectedCategory: _.map(topic.categories, c=> c.id)
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
        this.refs.form.submit();
    }

    save(){

    }

    cancel(){
        hashHistory.goBack()
    }

    apiCallback(response){
        if(response.success){
            Dialog.success("保存成功");
        }
        else{
            Dialog.error(response.errorMessage)
        }
    }

    onSubmit(model){
        if(model.title == ""){
            Dialog.error("请输入文章标题");
            return;
        }

        model.content = this.refs.editor.getContent();
        model.tagList = this.state.tags;
        model.categoryList = _.map(_.filter(this.state.categoryList, {checked: true}), cat=>cat.id)        

        if(this.id){
            Api.editTopic(model, this.apiCallback.bind(this))
        }
        else{
            Api.addTopic(model, this.apiCallback.bind(this))
        }
    }

    render(){
        return (
            <div className="content">
                <div className="row">
                    <Form onSubmit={this.onSubmit.bind(this)} ref="form" layout="vertical">
                        <div className="col-md-10">
                            {this.renderTitle()}

                            {this.renderContent()}

                            <Input type="text" label="别名(可选)" name="alias" value={this.state.topic.alias || ''}/>

                            <Textarea label="摘要" name="summary" value={this.state.topic.summary || ''}/>
                        </div>
                        <div className="col-md-2">
                            <FormGroup>
                                <button type="button" formNoValidate className="btn btn-success btn-block" onClick={this.publish.bind(this)}>发布</button>

                                <button type="button" className="btn btn-primary btn-block">保存</button>

                                <button type="button" className="btn btn-default btn-block" onClick={this.cancel.bind(this)}>取消</button>
                            </FormGroup>

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
                    options={{
                        height: 420,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen textcolor imagetools",
                            "insertdatetime media table contextmenu paste"
                        ]
                    }} 
                    content={this.state.topic.content || ''} 
                    onChange={this.handleContentChange.bind(this)}
                />
            </FormGroup>

        )
    }

    checkCategory(cat){
        let selectedCategory = this.state.selectedCategory;
        if(selectedCategory.indexOf(cat.id) > -1){
            _.remove(selectedCategory, cat.id);
        }
        else{
            selectedCategory.push(cat.id);
        }
        
        this.setState({
            selectedCategory: selectedCategory
        })
    }

    renderCategory(){
        _.forEach(this.state.categoryList, cat=>{
            cat.checked = this.state.selectedCategory.indexOf(cat.id) > -1
        }, this);

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
                                            checked={cat.checked} 
                                            onChange={this.checkCategory.bind(this, cat)}/>
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
}

module.exports = ModifyTopic;