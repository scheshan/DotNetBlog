var React = require("react")
var Api = require("../../services/api")
var ContentHeader = require("../../components/contentheader")
var Form = require("../../components/form")

class EmailConfig extends React.Component{
    constructor(){
        super()

        this.state = {
            config:{

            }
        }
    }

    componentDidMount(){
        Api.getEmailConfig(response=>{
            if(response.success){
                this.setState({
                    config:response.data
                })
            }
        })
    }

    render(){
        return (
            <div className="content">
                <div className="panel panel-default">
                    <Form>

                    </Form>
                </div>
            </div>
        )
    }
}

module.exports = EmailConfig