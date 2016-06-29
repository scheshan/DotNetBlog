var React = require("react")
var Api = require("../../services/api")
var _ = require("lodash")
var ModifyCategory = require("./modifycategory")

class CategoryList extends React.Component{
    constructor(){
        super()

        this.state = {
            categoryList: [
                {id: 1, name: "aaa", description: "aaa", checked: false},
                {id: 2, name: "aaa", description: "aaa", checked: false},
                {id: 3, name: "aaa", description: "aaa", checked: false}
            ]
        }
    }

    componentDidMount(){
        //this.loadData()
    }

    loadData(){
        Api.getCategoryList(response=>{
            if(response.success){
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

    addNew(){
        this.refs.modifyCategoryView.show()
    }

    render(){
        return (
            <div className="content">
                <ModifyCategory ref="modifyCategoryView"></ModifyCategory>

                <div className="box box-primary">
                    <div className="box-header">分类列表</div>
                    <div className="box-body nopadding">
                        <div className="mailbox-controls">
                            <button className="btn btn-success btn-sm" title="新增" onClick={this.addNew.bind(this)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            {' '}
                            <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canDelete()}>
                                <i className="fa fa-trash"></i>
                            </button>   
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{"width":"10px"}}>
                                        <input type="checkbox" onChange={this.checkAll.bind(this)}/>
                                    </th>
                                    <th style={{"width":"30%"}}>名称</th>
                                    <th>描述</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categoryList.map(cat=>{
                                        return (
                                            <tr key={cat.id}>
                                                <td><input type="checkbox" checked={cat.checked} onChange={this.checkOne.bind(this, cat)}/></td>
                                                <td>{cat.name}</td>
                                                <td>{cat.description}</td>
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