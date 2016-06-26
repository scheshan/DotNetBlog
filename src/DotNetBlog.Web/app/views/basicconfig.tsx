import React = require("react")
import {Form} from "formsy-react"
import MainHeader from "../components/mainheader"
import Input from "../components/input"
import Checkbox from "../components/checkbox"

interface BasicConfigState {
    canSubmit?: boolean
}

class BasicConfig extends React.Component<any, BasicConfigState>{
    constructor() {
        super()

        this.state = {

        }
    }

    enableButton() {
        this.setState({
            canSubmit: true
        })
    }

    disableButton() {
        this.setState({
            canSubmit: false
        })
    }

    submit(model: any) {
        console.log(model)
    }

    render(): JSX.Element {
        return (
            <div className="settings-view">
                <Form onValidSubmit={this.submit} onValid={this.enableButton.bind(this) } onInvalid={this.disableButton.bind(this) }>
                    <MainHeader title="基础">
                        <button className="btn btn-success btn-sm btn-hasicon pull-left" type="button" disabled={!this.state.canSubmit}>
                            <i className="fa fa-check"></i>
                            保存
                        </button>
                    </MainHeader>

                    <div className="content-inner">
                        <div className="form-content">
                            <Input name="title" type="text" title="博客名称" required/>

                            <Input name="description" type="text" title="博客描述"/>

                            <Input name="topicsPerPage" type="text" title="每页文章数" validations="isInt" validationError="请输入正确的数字"/>

                            <Checkbox name="onlyShowSummary" title="仅仅显示文章摘要"/>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export default BasicConfig