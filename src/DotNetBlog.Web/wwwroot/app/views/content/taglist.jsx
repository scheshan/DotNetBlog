var React = require("react")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")
var {Pager} = require("../../components")
var {hashHistory} = require("react-router")
var ModifyTag = require("./modifytag")

const pageSize = 20

class TagList extends React.Component{
    constructor(){
        super()

        this.state = {
            selectAll: false,
            tagList: [],
            keywords: ''
        }
    }

    componentDidMount(){
        this.state.keywords = this.props.location.query.keywords;
        this.loadData()
    }

    loadData(){
        let page = this.props.location.query.page || 1;
        let keywords = this.props.location.query.keywords;

        this.setState({
            loading: true
        }, ()=>{
            Api.queryTag(page, pageSize, keywords, response=>{
                if(response.success){
                    _.forEach(response.data, tag=>{
                        tag.checked = false
                    });

                    this.setState({
                        loading: false,
                        selectAll: false,
                        tagList: response.data,
                        total: response.total
                    })
                }
                else{
                    this.setState({
                        loading: false
                    });
                    Dialog.error(response.errorMessage);
                }
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.query.page != this.props.location.query.page
            || prevProps.location.query.keywords != this.props.location.query.keywords
        ){
            this.loadData()
        }
    }

    selectAll(e){
        let selectAll = e.target.checked;

        let tagList = this.state.tagList;
        _.forEach(tagList, tag=>{
            tag.checked = selectAll
        });
        this.setState({
            tagList,
            selectAll
        });
    }

    selectTag(tag){
        tag.checked = !tag.checked;
        this.forceUpdate();
    }

    handlePageChange(page){
        this.changePage(page, this.state.keywords)
    }

    handleKeywordsChange(e){
        this.setState({
            keywords: e.target.value
        });
    }

    search(){
        this.changePage(1, this.state.keywords)
    }

    changePage(page, keywords){
        hashHistory.push({
            pathname: "content/tags",
            query:{
                page: page,
                keywords: keywords
            }
        })
    }

    canBatchOperate(){
        if(this.state.loading){
            return false;
        }
        if(!this.state.tagList){
            return false;
        }
        return _.some(this.state.tagList, {checked: true});
    }

    remove(){
        var idList = _.map(_.filter(this.state.tagList, {checked: true}), tag=>tag.id);
        if(idList.length == 0){
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({loading: true}, ()=>{
            Api.deleteTag(idList, response=>{
                this.setState({
                    loading: false
                });
                
                if(response.success){
                    Dialog.success("操作成功");
                    this.loadData()
                }
                else{
                    Dialog.error(response.errorMessage);
                }
            })
        })
    }

    editTag(tag){
        this.refs.modifyTag.show(tag)
    }

    onModifyTagSuccess(){
        this.loadData()
    }

    render(){
        let page = this.props.location.query.page || 1;
        return (
            <div className="content">
                <ModifyTag ref="modifyTag" onSuccess={this.onModifyTagSuccess.bind(this)}></ModifyTag>
                <div className="mailbox-controls">
                    <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                        <i className="fa fa-trash"></i>
                    </button>   

                    <div className="pull-right form-inline">
                        <input type="text" className="form-control input-sm" value={this.state.keywords} onChange={this.handleKeywordsChange.bind(this)}/>   
                        {' '}
                        <button className="btn btn-default btn-sm" onClick={this.search.bind(this)}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>

                <div className="box box-solid">
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{"width":"40px"}} className="text-center">
                                        <input checked={this.state.selectAll} onChange={this.selectAll.bind(this)} type="checkbox"/>
                                    </th>
                                    <th>名称</th>
                                    <th style={{width: "100px"}} className="text-center">文章</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tagList.map(tag=>{
                                        return (
                                            <tr key={tag.id}>
                                                <td className="text-center">
                                                    <input type="checkbox" checked={tag.checked} onChange={this.selectTag.bind(this, tag)}/>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)" onClick={this.editTag.bind(this, tag)}>{tag.keyword}</a>

                                                    <a target="_blank" href={'/tag/' + tag.keyword} className="pull-right text-muted"><i className="fa fa-external-link"></i></a>
                                                </td>
                                                <td className="text-center">{tag.topics.all}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>               

                <Pager page={page} pageSize={pageSize} total={this.state.total} onPageChange={this.handlePageChange.bind(this)}/>
            </div>
        )
    }
}

module.exports = TagList