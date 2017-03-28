var React = require("react")
var {Modal, ModalHeader, ModalBody, FormGroup, Checkbox} = require("react-bootstrap")
var {connect} = require("react-redux")
var {changeTopicSetting} = require("../../actions")

class ModifyTopicSetting extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false
        }
    }

    hide(){
        this.setState({
            show: false
        })
    }

    show(){
        this.setState({
            show: true
        })
    }

    handleShowAliasChange(e){
        var setting = {
            showAlias: e.target.checked,
            showSummary: this.props.showSummary,
            showDate: this.props.showDate
        };
        this.props.saveSetting(setting);
    }
    
    handleShowSummaryChange(e){
        var setting = {
            showAlias: this.props.showAlias,
            showSummary: e.target.checked,
            showDate: this.props.showDate
        };
        this.props.saveSetting(setting);
    }

    handleShowDateChange(e){
        var setting = {
            showAlias: this.props.showAlias,
            showSummary: this.props.showSummary,
            showDate: e.target.checked
        };
        this.props.saveSetting(setting);
    }

    render(){
        return (
            <Modal show={this.state.show} onHide={this.hide.bind(this)}>
                <ModalHeader closeButton>{"customize".L()}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Checkbox checked={this.props.showAlias} onChange={this.handleShowAliasChange.bind(this)}>{"showAlias".L()}</Checkbox>
                    </FormGroup>

                    <FormGroup>
                        <Checkbox checked={this.props.showSummary} onChange={this.handleShowSummaryChange.bind(this)}>{"showSummary".L()}</Checkbox>
                    </FormGroup>

                    <FormGroup>
                        <Checkbox checked={this.props.showDate} onChange={this.handleShowDateChange.bind(this)}>{"showDate".L()}</Checkbox>
                    </FormGroup>
                </ModalBody>
            </Modal>
        )
    }
}

function mapStateToProps(state){
    const {blog:{topicSetting}} = state;

    return {
        showAlias: topicSetting.showAlias,
        showSummary: topicSetting.showSummary,
        showDate: topicSetting.showDate
    }
}

function mapDispatchToProps(dispatch){
    return {
        saveSetting: (setting)=>{
            var action = changeTopicSetting(setting);
            dispatch(action)
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ModifyTopicSetting)