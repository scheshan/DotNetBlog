var React = require("react");
var {Input, Textarea} = require("formsy-react-components");
var {Form, Editor} = require("../../components");
var {FormGroup} = require("react-bootstrap");
var TinyMCE = require("react-tinymce");
var Async = require("async");
var Api = require("../../services/api");
var TagsInput = require("react-tagsinput")

class ModifyTopic extends React.Component{
    constructor(){
        super();

        this.state = {
            categoryList: [],
            loading: false,
            topic: {
                title: "",
                content: "",
                alias: ""
            },
            tags: []
        };
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Async.parallel([this.loadCategory], (err, args)=>{
                this.setState({
                    loading: false,
                    categoryList: args[0]
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

    onTagsChanged(tags){
        this.setState({
            tags
        })
    }

    render(){
        return (
            <div className="content">
                <div className="row">
                    <Form layout="vertical">
                        <div className="col-md-10">
                            <FormGroup>
                                <Input type="text" layout="elementOnly" name="title" value={this.state.topic.title} placeholder="文章的标题"/>
                            </FormGroup>

                            <FormGroup>
                                <TinyMCE config={{
                                    height: 420,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen textcolor imagetools",
                                        "insertdatetime media table contextmenu paste"
                                    ]
                                }}></TinyMCE>
                            </FormGroup>

                            <Input type="text" label="别名(可选)" name="alias"/>

                            <Textarea label="摘要" name="summary"/>
                        </div>
                        <div className="col-md-2">
                            <FormGroup>
                                <button type="button" className="btn btn-success btn-block">发布</button>

                                <button type="button" className="btn btn-primary btn-block">保存</button>

                                <button type="button" className="btn btn-default btn-block">取消</button>
                            </FormGroup>

                            <FormGroup>
                                <label className="control-label">分类</label>
                                <ul className="list-group category-list">
                                    {
                                        this.state.categoryList.map(cat=>{
                                            return (
                                                <a href="#" className="list-group-item checkbox" key={cat.id}>
                                                    <label>
                                                        <input type="checkbox" />
                                                        {cat.name}
                                                    </label>
                                                </a>
                                            )
                                        })
                                    }
                                </ul>
                            </FormGroup>

                            <FormGroup>
                                <label className="control-label">标签</label>

                                <TagsInput className="bootstrap-tagsinput" value={this.state.tags} onChange={this.onTagsChanged.bind(this)}></TagsInput>
                            </FormGroup>    

                            <FormGroup>
                                <label className="control-label">日期</label>

                                <input type="text" className="form-control"/>
                            </FormGroup>            

                            <FormGroup>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox"/>
                                        允许评论
                                    </label>
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
}

module.exports = ModifyTopic;