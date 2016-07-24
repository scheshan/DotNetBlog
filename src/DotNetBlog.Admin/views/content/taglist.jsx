var React = require("react")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")
var {Pager, Spinner} = require("../../components")
var {hashHistory} = require("react-router")
var ModifyTag = require("./modifytag")
var {BootstrapTable, TableHeaderColumn} = require("react-bootstrap-table")

const pageSize = 20

class TagList extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            selectAll: false,
            tagList: [],
            keywords: '',
            selectedList: []
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
                    this.setState({
                        loading: false,
                        tagList: response.data,
                        total: response.total,
                        selectedList: []
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
        if(!this.state.tagList){
            return false;
        }
        return this.state.selectedList.length > 0;
    }

    remove(){
        var idList = this.state.selectedList;
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
        })
    }
    
    handleSelectAll(selected){
        var arr = [];
        if(selected){
            arr = _.map(this.state.tagList, item=>item.id);
        }
        this.setState({
            selectedList: arr
        })
    }

    formatName(cell, row){
        return (
            <div>
                <a href="javascript:void(0)" onClick={this.editTag.bind(this, row)}>{cell}</a>
                <a target="_blank" href={'/tag/' + cell} className="pull-right text-muted"><i className="fa fa-external-link"></i></a>
            </div>
        )
    }

    render(){
        const tableOptions = {
            sizePerPageList: [2],
            sizePerPage: 2
        }

        const selectRowProp = {
            mode: 'checkbox',
            onSelect: this.handleSelect.bind(this),
            onSelectAll: this.handleSelectAll.bind(this),
            selected: this.state.selectedList
        };

        let page = this.props.location.query.page || 1;
        return (
            <div className="content">
                <ModifyTag ref="modifyTag" onSuccess={this.onModifyTagSuccess.bind(this)}></ModifyTag>
                <Spinner loading={this.state.loading}/>
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
                        <BootstrapTable keyField="id" data={this.state.tagList} selectRow={selectRowProp}>
                           <TableHeaderColumn dataField="keyword" dataFormat={this.formatName.bind(this)}>名称</TableHeaderColumn>
                           <TableHeaderColumn width="100" dataAlign="center" dataField="topics" dataFormat={function(cell){return cell.all}}>文章</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>               

                <Pager page={page} pageSize={pageSize} total={this.state.total} onPageChange={this.handlePageChange.bind(this)}/>
            </div>
        )
    }
}

module.exports = TagList