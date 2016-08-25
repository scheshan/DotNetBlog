var React = require("react")
var {Pager, Spinner} = require("../../components")
var {BootstrapTable, TableHeaderColumn} = require("react-bootstrap-table")
var {hashHistory} = require("react-router")
var {Api, Dialog} = require("../../services")
var ReplyComment = require("./replycomment")

const pageSize = 20;

class CommentList extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            total: 0,
            commentList: [],
            keywords: '',
            selectedList: []
        }
    }

    loadData(){
        let page = this.props.location.query.page || 1;
        let keywords = this.props.location.query.keywords;
        let status = this.props.location.query.status;

        this.setState({
            loading: true
        }, ()=>{
            Api.queryComment(page, pageSize, keywords, status, response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        commentList: response.data,
                        total: response.total,
                        selectedList: []
                    });
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

    componentDidMount(){
        this.state.keywords = this.props.location.query.keywords;
        this.state.status = this.props.location.query.status;
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

    canBatchOperate(){
        if(!this.state.commentList){
            return false;
        }
        return this.state.selectedList.length > 0;
    }

    search(){
        this.changePage(1, this.state.keywords, this.state.status);
    }

    handleKeywordsChange(e){
        this.setState({
            keywords: e.target.value
        })
    }

    handleStatusChange(e){
        this.setState({
            status: e.target.value
        });
    }

    handlePageChange(page){
        this.changePage(page, this.state.keywords, this.state.status)
    }

    changePage(page, keywords, status){
        hashHistory.push({
            pathname: "content/comments",
            query:{
                page: page,
                keywords: keywords,
                status: status
            }
        })
    }

    handleSelect(row, selected){
        var arr = this.state.selectedList;

        if(selected){
            arr.push(row.id);
        }
        else{
            _.remove(arr, item=>item == row.id);
        }

        this.setState({
            selectedList: arr
        });
    }

    handleSelectAll(selected){
        var arr = this.state.selectedList;
        arr = [];
        if(selected){
            arr = _.map(this.state.commentList, comment=>comment.id);
        }

        this.setState({
            selectedList: arr
        });
    }

    apiCallback(response){
        if(response.success){     
            Dialog.success("操作成功")       
            this.loadData();
        }
        else{
            this.setState({
                loading: false
            })
            Dialog.error(response.errorMessage)
        }
    }

    approve(){
        var idList = this.state.selectedList;
        if(idList.length == 0){
            return;
        }
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.batchApproveComment(idList, this.apiCallback.bind(this))
        });
    }

    reject(){
        var idList = this.state.selectedList;
        if(idList.length == 0){
            return;
        }
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.batchRejectComment(idList, this.apiCallback.bind(this))
        });
    }

    remove(){
        var idList = this.state.selectedList;
        if(idList.length == 0){
            return;
        }
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.deleteComment(idList, this.apiCallback.bind(this))
        });
    }

    replyComment(comment){
        this.refs.replyComment.show(comment);
    }

    onReplyCommentSuccess(){
        this.loadData();
    }

    formatStatus(cell, row){
        let className = "";
        let text = "";

        switch(cell){
            case 0:
                className = "warning";
                text = "待审核";
            break;
            case 1:
                className = "success";
                text = "已通过";
            break;
            case 2:
                className = "danger";
                text = "已拒绝";
            break;
        }

        className = 'text-' + className;

        return (
            <span className={className}>
                <strong>{text}</strong>
            </span>
        )
    }

    formatContent(cell, row){
        return (
            <div>
                <a href="javascript:void(0)" onClick={this.replyComment.bind(this, row)}>{cell}</a>
                <a title="查看" className="pull-right text-muted" target="_blank" href={'/topic/' + row.topicID + '#comment_' + row.id}><i className="fa fa-external-link"></i></a>
            </div>
        )
    }

    render(){
        let page = this.props.location.query.page || 1;

        const selectRowProp = {
            mode: 'checkbox',
            onSelect: this.handleSelect.bind(this),
            onSelectAll: this.handleSelectAll.bind(this),
            selected: this.state.selectedList
        };

        return (
            <div className="content">
                <ReplyComment ref="replyComment" successCallback={this.onReplyCommentSuccess.bind(this)}></ReplyComment>
                <Spinner loading={this.state.loading}/>
                <div className="mailbox-controls">
                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" title="通过" disabled={!this.canBatchOperate()} onClick={this.approve.bind(this)}>
                            <i className="fa fa-check"></i>
                        </button>   
                        <button className="btn btn-warning btn-sm" title="拒绝" disabled={!this.canBatchOperate()} onClick={this.reject.bind(this)}>
                            <i className="fa fa-archive"></i>
                        </button>   
                        <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canBatchOperate()} onClick={this.remove.bind(this)}>
                            <i className="fa fa-trash"></i>
                        </button>   
                    </div>

                    <div className="pull-right form-inline">
                        <select className="form-control input-sm" onChange={this.handleStatusChange.bind(this)} value={this.state.status}>
                            <option value="">全部</option>
                            <option value="0">待审核</option>
                            <option value="1">已通过</option>
                            <option value="2">已拒绝</option>
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
                        <BootstrapTable keyField="id" data={this.state.commentList} selectRow={selectRowProp} options={{noDataText:"无"}}>
                           <TableHeaderColumn dataField="content" dataFormat={this.formatContent.bind(this)}>内容</TableHeaderColumn>
                           <TableHeaderColumn width="180" dataAlign="center" dataField="createDate">日期</TableHeaderColumn>
                           <TableHeaderColumn width="180" dataAlign="center" dataField="name">作者</TableHeaderColumn>
                           <TableHeaderColumn width="100" dataAlign="center" dataField="status" dataFormat={this.formatStatus.bind(this)}>状态</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>               

                <Pager page={page} pageSize={pageSize} total={this.state.total} onPageChange={this.handlePageChange.bind(this)}/>
            </div>
        )
    }
}

module.exports = CommentList