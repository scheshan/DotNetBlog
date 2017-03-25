var React = require("react")
var WidgetItem = require("./widgetitem")
var WidgetInfo = require("./widgetinfo")
var Api = require("../../services/api")
var Dialog = require("../../services/dialog")
var Parallel = require("async/parallel")
var {Spinner, LoadingButton} = require("../../components")
var EditBasic = require("./editbasic")
var EditCategory = require("./editcategory")
var EditRecentComment = require("./editrecentcomment")
var EditRecentTopic = require("./editrecenttopic")
var EditTag = require("./edittag")

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
            Parallel([this.queryAllWidgets, this.queryAvailableWidgets], (err, args)=>{
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

    addWidget(widget){
        let items = this.state.data.items;
        items.push({type: widget.type, config: widget.defaultConfig});
        this.setState({
            data:{
                items: items
            }
        });
    }

    onSaveConfig(widget, index){
        this.forceUpdate()
    }

    showWidgetInfo(widget){
        this.refs.widgetInfo.show(widget);
    }

    removeWidget(index){
        let items = this.state.data.items;
        items = _.remove(items, (item, i)=>i != index);
        this.setState({
            data:{
                items: items
            }
        });
    }

    editWidget(widget, index){
        let viewMapping = {
            1: this.refs.editBasic,
            2: this.refs.editCategory,
            3: this.refs.editTag,
            4: this.refs.editRecentTopic,
            5: this.refs.editRecentComment,
            6: this.refs.editBasic,
            7: this.refs.editBasic,
            8: this.refs.editBasic
        }

        let view = viewMapping[widget.type];
        if(view){
            view.show(widget, index)
        }
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
                    Dialog.success("operationSuccessful".L())
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    render() {
        let listItems = this.state.data.items.map(function (item, i) {
            let data = {
                widget: item,
                onEdit: this.editWidget.bind(this, item, i),
                onRemove: this.removeWidget.bind(this, i)
            }
            return (
                <WidgetItem
                    key={i}
                    updateState={this.updateState.bind(this)}
                    items={this.state.data.items}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    outline="list">
                    {data}
                </WidgetItem>
            );
        }, this);

        return (
            <div className="content">
                <Spinner loading={this.state.loading}></Spinner>
                <WidgetInfo ref="widgetInfo"></WidgetInfo>
                <EditBasic ref="editBasic" onSave={this.onSaveConfig.bind(this)}></EditBasic>
                <EditCategory ref="editCategory" onSave={this.onSaveConfig.bind(this)}></EditCategory>
                <EditRecentComment ref="editRecentComment" onSave={this.onSaveConfig.bind(this)}></EditRecentComment>
                <EditRecentTopic ref="editRecentTopic" onSave={this.onSaveConfig.bind(this)}></EditRecentTopic>
                <EditTag ref="editTag" onSave={this.onSaveConfig.bind(this)}></EditTag>

                <div className="mailbox-controls">
                    <button className="btn btn-primary" title={"save".L()} onClick={this.save.bind(this)}>
                        {"save".L()}
                    </button>
                    <span className="text-danger">
                        {' '}
                        <i className="fa fa-info-circle"></i>
                        {' '}
                        {"afterAllOperationCompleted".L()}
                    </span>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="box">
                            <div className="box-header">{"availableWidgets".L()}</div>
                            <div className="box-body">
                                <ul className="widgets-list">
                                    {this.state.availableWidgetList.map((widget, i)=>{
                                        return (
                                            <li key={i}>
                                                {widget.name}
                                                <span className="item-buttons">
                                                    <button title={"addTo".L()} onClick={this.addWidget.bind(this, widget)}><i className="fa fa-plus"></i></button>
                                                    <button title={"info".L()} onClick={this.showWidgetInfo.bind(this, widget)}><i className="fa fa-info"></i></button>
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
                            <div className="box-header">{"inUse".L()}</div>
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