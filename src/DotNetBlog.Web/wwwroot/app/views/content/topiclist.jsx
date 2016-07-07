var React = require("react")
var {Pager} = require("../../components")
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
            selectAll: false
        }
    }

    remove(){

    }

    publish(){

    }

    draft(){
        
    }

    canDelete(){

    }

    componentDidMount(){
        this.loadData()
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.query.page != this.props.location.query.page){
            this.loadData()
        }
    }

    changePage(page){
        hashHistory.push({
            pathname: "content/topics",
            query:{
                page: page
            }
        })
    }

    loadData(){
        let page = this.props.location.query.page || 1;

        this.setState({
            loading: true
        }, ()=>{
            Api.queryNormalTopic(page, pageSize, null, null, response=>{
                if(response.success){
                    _.forEach(response.data, topic=>{
                        topic.checked = false
                    });

                    this.setState({
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

    render(){
        let page = this.props.location.query.page || 1;
        return (
            <div className="content">
                <div className="mailbox-controls">
                    <Link to="/content/topic" className="btn btn-success btn-sm" title="新增">
                        <i className="fa fa-plus"></i>
                    </Link>
                    {' '}

                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" title="发布" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                            <i className="fa fa-check"></i>
                        </button>   
                        <button className="btn btn-warning btn-sm" title="取消发布" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                            <i className="fa fa-archive"></i>
                        </button>   
                        <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </button>   
                    </div>

                    <span className="pull-right">
                        <div className="has-feedback">
                            <input type="text" className="form-control input-sm" /> 
                            <span className="fa fa-search form-control-feedback"></span>
                        </div>                        
                    </span>
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

                                                    <a href="" className="pull-right text-muted"><i className="fa fa-external-link"></i></a>
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

                <Pager page={page} pageSize={pageSize} total={this.state.total} onPageChange={this.changePage.bind(this)}/>
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