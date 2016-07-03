var React = require("react")
var Api = require("../../services/api")
var _ = require("lodash")
var ModifyCategory = require("./modifycategory")
var Dialog = require("../../services/dialog")

class CategoryList extends React.Component{
    constructor(){
        super()

        this.state = {
            categoryList: []
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        Api.getCategoryList(response=>{
            if(response.success){
                _.forEach(response.data, category=>{
                    category.checked = false
                });

                this.setState({
                    categoryList: response.data
                })
            }
        })
    }

    checkAll(e){
        let categoryList = this.state.categoryList;
        _.forEach(categoryList, cat=>{
            cat.checked = e.target.checked;
        });
        this.setState({
            categoryList: categoryList
        });
    }

    checkOne(category){
        category.checked = !category.checked;
        this.forceUpdate()
    }

    canDelete(){
        if(!this.state.categoryList){
            return false;
        }
        return _.some(this.state.categoryList, {checked: true})
    }

    remove(){
        if(this.state.loading || !this.canDelete()){
            return false;
        }

        var idList = _.map(_.filter(this.state.categoryList, {checked: true}), item=>{
            return item.id
        });

        this.setState({
            loading: true
        })

        Api.removeCategory(idList, response=>{
            if(response.success){
                var categoryList = _.filter(this.state.categoryList, (category)=>{
                    return !category.checked
                });
                this.setState({
                    loading: false,
                    categoryList: categoryList
                })
            }
            else{
                Dialog.error(response.errorMessage)
            }
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

    render(){
        return (
            <div className="content">
                <ModifyCategory onSuccess={this.onModifyCategorySuccess.bind(this)} ref="modifyCategoryView"></ModifyCategory>

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
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{"width":"40px"}} className="text-center">
                                        <input type="checkbox" onChange={this.checkAll.bind(this)}/>
                                    </th>
                                    <th style={{"width":"30%"}}>名称</th>
                                    <th>描述</th>
                                    <th style={{width: "100px"}}>文章</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categoryList.map(cat=>{
                                        return (
                                            <tr key={cat.id}>
                                                <td className="text-center"><input type="checkbox" checked={cat.checked} onChange={this.checkOne.bind(this, cat)}/></td>
                                                <td>
                                                    <a href="javascript:void(0)" onClick={this.editCategory.bind(this, cat)}>{cat.name}</a>
                                                </td>
                                                <td>{cat.description}</td>
                                                <td>{cat.topics.all}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>
        )
    }
}

module.exports = CategoryList