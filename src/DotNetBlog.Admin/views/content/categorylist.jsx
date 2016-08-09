var React = require("react")
var ModifyCategory = require("./modifycategory")
var {Api, Dialog} = require("../../services")
var {Spinner} = require("../../components")
var {BootstrapTable, TableHeaderColumn} = require("react-bootstrap-table")

class CategoryList extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            categoryList: [],
            selectedList: []
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Api.getCategoryList(response=>{
                if(response.success){
                    this.setState({
                        loading: false,
                        categoryList: response.data,
                        selectedList: []
                    })
                }
                else{
                    this.setState({
                        loading: false
                    })
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    canDelete(){
        if(!this.state.categoryList){
            return false;
        }
        return this.state.selectedList.length > 0;
    }

    remove(){
        if(this.state.loading || !this.canDelete()){
            return false;
        }

        var idList = this.state.selectedList;

        this.setState({
            loading: true
        }, ()=>{
            Api.removeCategory(idList, response=>{
                if(response.success){       
                    Dialog.success("操作成功");     
                    this.loadData();
                }
                else{
                    this.setState({
                        loading: false
                    })
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    addNew(){
        this.refs.modifyCategoryView.show()
    }

    editCategory(category){
        this.refs.modifyCategoryView.show(category);
    }

    onModifyCategorySuccess(){
        this.loadData()
    }

    handleSelect(category, selected){
        var arr = this.state.selectedList;
        if(selected){
            arr.push(category.id);
        }
        else{
            _.remove(arr, id=>id == category.id);
        }

        this.setState({
            selectedList: arr
        });
    }

    handleSelectAll(selected){
        var arr = this.state.selectedList;
        arr = [];
        if(selected){
            arr = _.map(this.state.categoryList, cat=>cat.id);
        }

        this.setState({
            selectedList: arr
        });
    }

    formatName(cell, row){
        return (
            <div>
                <a href="javascript:void(0)" onClick={this.editCategory.bind(this, row)}>{row.name}</a>
                <a title="查看" className="pull-right text-muted" target="_blank" href={'/category/' + row.id}><i className="fa fa-external-link"></i></a>
            </div>
        )
    }

    render(){
        const selectRowProp = {
            mode: 'checkbox',
            onSelect: this.handleSelect.bind(this),
            onSelectAll: this.handleSelectAll.bind(this),
            selected: this.state.selectedList
        };

        function formatTopics(cell, row) {
            return cell.all
        }

        return (
            <div className="content">
                <ModifyCategory onSuccess={this.onModifyCategorySuccess.bind(this)} ref="modifyCategoryView"></ModifyCategory>
                <Spinner loading={this.state.loading}/>
                <div className="mailbox-controls">
                    <button className="btn btn-success btn-sm" title="新增" onClick={this.addNew.bind(this)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    {' '}
                    <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canDelete()} onClick={this.remove.bind(this)}>
                        <i className="fa fa-trash"></i>
                    </button>   
                </div>

                <div className="box box-solid">
                    <div className="box-body table-responsive no-padding">
                        <BootstrapTable keyField="id" hover={true} striped={true} data={this.state.categoryList} selectRow={selectRowProp}>
                            <TableHeaderColumn dataField='name' dataFormat={this.formatName.bind(this)}>名称</TableHeaderColumn>
                            <TableHeaderColumn width="100" dataAlign="center" dataField='topics' dataFormat={formatTopics.bind(this)}>文章</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>                
            </div>
        )
    }
}

module.exports = CategoryList