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
        this.loadData()
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

                <div className="mailbox-controls">
                    <button className="btn btn-success btn-sm" title="新增" onClick={this.addNew.bind(this)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    {' '}
                    <button className="btn btn-danger btn-sm" title="删除" disabled={!this.canDelete()}>
                        <i className="fa fa-trash"></i>
                    </button>   
                </div>

                <div className="box box-default">
                    <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{"width":"10px"}}>
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
                                                <td><input type="checkbox" checked={cat.checked} onChange={this.checkOne.bind(this, cat)}/></td>
                                                <td>
                                                    <a href="javascript:void(0)">{cat.name}</a>
                                                </td>
                                                <td>{cat.description}</td>
                                                <td>{cat.topics}</td>
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