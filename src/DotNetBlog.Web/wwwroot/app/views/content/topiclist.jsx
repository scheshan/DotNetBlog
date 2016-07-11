var React = require("react")
var {Pager, Spinner} = require("../../components")
var {hashHistory, Link} = require("react-router")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")

const pageSize = 20;

class TopicList extends React.Component{
    constructor(){
        super()

        this.state = {
            total: 0,
            topicList: [],
            selectAll: false,
            keywords: ''
        }
    }

    remove(){
        var idList = _.map(_.filter(this.state.topicList, {checked: true}), topic=>topic.id);
        if(idList.length == 0){
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({loading: true}, ()=>{
            Api.batchDeleteTopic(idList, this.apiCallback.bind(this))
        })
    }

    publish(){
        var idList = _.map(_.filter(this.state.topicList, {checked: true}), topic=>topic.id);
        if(idList.length == 0){
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({loading: true}, ()=>{
            Api.batchPublishTopic(idList, this.apiCallback.bind(this))
        })
    }

    draft(){
        var idList = _.map(_.filter(this.state.topicList, {checked: true}), topic=>topic.id);
        if(idList.length == 0){
            return;
        }

        if(this.state.loading){
            return;
        }

        this.setState({loading: true}, ()=>{
            Api.batchDraftTopic(idList, this.apiCallback.bind(this))
        })
    }

    apiCallback(response){
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
    }

    componentDidMount(){
        this.state.status = this.props.location.query.status;
        this.state.keywords = this.props.location.query.keywords;
        this.loadData()
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.query.page != this.props.location.query.page
            || prevProps.location.query.keywords != this.props.location.query.keywords
            || prevProps.location.query.status != this.props.location.query.status
        ){
            this.loadData()
        }
    }

    loadData(){
        let page = this.props.location.query.page || 1;
        let keywords = this.props.location.query.keywords;
        let status = this.props.location.query.status;

        this.setState({
            loading: true
        }, ()=>{
            Api.queryNormalTopic(page, pageSize, status, keywords, response=>{
                if(response.success){
                    _.forEach(response.data, topic=>{
                        topic.checked = false
                    });

                    this.setState({
                        selectAll: false,
                        loading: false,
                        topicList: response.data,
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

    canBatchOperate(){
        if(this.state.loading){
            return false;
        }
        if(!this.state.topicList){
            return false;
        }
        return _.some(this.state.topicList, {checked: true});
    }

    selectAll(e){
        let selectAll = e.target.checked;

        let topicList = this.state.topicList;
        _.forEach(topicList, topic=>{
            topic.checked = selectAll
        });
        this.setState({
            topicList,
            selectAll
        });
    }

    selectTopic(topic){
        topic.checked = !topic.checked;
        this.forceUpdate()
    }

    search(){
        this.changePage(1, this.state.status, this.state.keywords)
    }

    handleKeywordsChange(e){
        this.setState({
            keywords: e.target.value
        })
    }

    handleStatusChange(e){
        this.setState({
            status: e.target.value
        })
    }

    handlePageChange(page){
        this.changePage(page, this.props.location.query.status, this.props.location.query.keywords)
    }

    changePage(page, status, keywords){
        hashHistory.push({
            pathname: "content/topics",
            query:{
                page: page,
                status: status,
                keywords: keywords
            }
        })
    }

    render(){
        let page = this.props.location.query.page || 1;
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>

                <div className="mailbox-controls">
                    <Link to="/content/topic" className="btn btn-success btn-sm" title="新增">
                        <i className="fa fa-plus"></i>
                    </Link>
                    {' '}

                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" title="发布" disabled={!this.canBatchOperate()} onClick={this.publish.bind(this)}>
                            <i className="fa fa-check"></i>
                        </button>   
                        <button className="btn btn-warning btn-sm" title="取消发布" disabled={!this.canBatchOperate()} onClick={this.draft.bind(this)}>
                            <i className="fa fa-archive"></i>
                        </button>   
                        <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </button>   
                    </div>

                    <div className="pull-right form-inline">
                        <select className="form-control input-sm" onChange={this.handleStatusChange.bind(this)} value={this.state.status}>
                            <option value="">请选择</option>
                            <option value="0">草稿</option>
                            <option value="1">已发布</option>
                        </select>
                        {' '}
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
                                    <th>文章</th>
                                    <th style={{width: "100px"}} className="text-center">评论</th>
                                    <th style={{width: "100px"}} className="text-center">日期</th>
                                    <th style={{width: "100px"}} className="text-center">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.topicList.map(topic=>{
                                        return (
                                            <tr key={topic.id}>
                                                <td className="text-center">
                                                    <input type="checkbox" checked={topic.checked} onChange={this.selectTopic.bind(this, topic)}/>
                                                </td>
                                                <td>
                                                    <Link to={'/content/topic/' + topic.id}>{topic.title}</Link>

                                                    <a target="_blank" href={'/topic/' + topic.id} className="pull-right text-muted"><i className="fa fa-external-link"></i></a>
                                                </td>
                                                <td className="text-center">10</td>
                                                <td className="text-muted text-center">{topic.date.split(' ')[0]}</td>
                                                <td className="text-center">{this.renderStatus(topic)}</td>
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

    renderStatus(topic){
        if(topic.status == 0){
            return <span className="label label-warning">草稿</span>
        }
        else if(topic.status == 1){
            return <span className="label label-success">发布</span>
        }
    }
}

module.exports = TopicList