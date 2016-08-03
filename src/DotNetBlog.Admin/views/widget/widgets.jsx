var React = require("react")
var WidgetItem = require("./widgetitem")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")
var Async = require("async")
var {Spinner, LoadingButton} = require("../../components")

class Widgets extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            draggingIndex: null,
            data: {
                items: [
                    
                ]
            },
            availableWidgetList: []
        }
    }

    updateState(obj) {
        this.setState(obj);
    }

    componentDidMount(){
        this.loadData()
    }

    queryAvailableWidgets(callback){
        Api.queryAvaiableWidgets(response=>{
            if(response.success){
                callback(null, response.data);
            }
            else{
                callback(response.errorMessage);
            }
        })
    }

    queryAllWidgets(callback){
        Api.queryAllWidgets(response=>{
            if(response.success){
                callback(null, response.data);
            }
            else{
                callback(response.errorMessage);
            }
        })
    }

    loadData(){
        this.setState({
            loading: true
        }, ()=>{
            Async.parallel([this.queryAllWidgets, this.queryAvailableWidgets], (err, args)=>{
                if(err){
                    this.setState({
                        loading: false
                    })
                    Dialog.error(err);
                }
                else{
                    let allWidgetList = args[0];
                    let availableWidgetList = args[1];

                    this.setState({
                        loading: false,
                        availableWidgetList,
                        data: {
                            items: allWidgetList
                        }
                    })
                }
            })
        })
    }

    save(){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.saveWidget(this.state.data.items, response=>{
                this.setState({
                    loading: false
                })
                if(response.success){
                    Dialog.success("操作成功")
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    render() {
        var listItems = this.state.data.items.map(function (item, i) {
            return (
                <WidgetItem
                    key={i}
                    updateState={this.updateState.bind(this)}
                    items={this.state.data.items}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    outline="list">
                    {item}
                </WidgetItem>
            );
        }, this);

        return (
            <div className="content">
                <Spinner loading={this.state.loading}></Spinner>

                <div className="mailbox-controls">
                    <LoadingButton className="btn btn-primary" loading={this.state.loading} title="保存" onClick={this.save.bind(this)}>
                        保存
                    </LoadingButton>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="box">
                            <div className="box-header">可用组件</div>
                            <div className="box-body">
                                <ul className="widgets-list">
                                    {this.state.availableWidgetList.map((widget, i)=>{
                                        return (
                                            <li key={i}>
                                                {widget.name}
                                                <span className="item-buttons">
                                                    <button title="增加"><i className="fa fa-plus"></i></button>
                                                    <button title="信息"><i className="fa fa-info"></i></button>
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>                    
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="box">
                            <div className="box-header">正在使用</div>
                            <div className="box-body">
                                <ul className="widgets-list">
                                    {listItems}
                                </ul>
                            </div>                    
                        </div>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

module.exports = Widgets;