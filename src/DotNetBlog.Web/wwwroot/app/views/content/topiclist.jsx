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
            topicList: []
        }
    }

    remove(){

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

    render(){
        let page = this.props.location.query.page || 1;
        return (
            <div className="content">
                <div className="mailbox-controls">
                    <Link to="/content/topic" className="btn btn-success btn-sm" title="新增">
                        <i className="fa fa-plus"></i>
                    </Link>
                    {' '}
                    <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canDelete()} onClick={this.remove.bind(this)}>
                        <i className="fa fa-trash"></i>
                    </button>   

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
                                        <input type="checkbox"/>
                                    </th>
                                    <th>文章</th>
                                    <th style={{width: "100px"}} className="text-center">评论</th>
                                    <th style={{width: "100px"}} className="text-center">日期</th>
                                    <th style={{width: "100px"}} className="text-center">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.topicList.map(article=>{
                                        return (
                                            <tr key={article.id}>
                                                <td className="text-center">
                                                    <input type="checkbox"/>
                                                </td>
                                                <td>
                                                    <Link to={'/content/topic/' + article.id}>{article.title}</Link>

                                                    <a href="" className="pull-right text-muted"><i className="fa fa-external-link"></i></a>
                                                </td>
                                                <td className="text-center">10</td>
                                                <td className="text-muted text-center">{article.date.split(' ')[0]}</td>
                                                <td className="text-center">{article.status}</td>
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
}

module.exports = TopicList