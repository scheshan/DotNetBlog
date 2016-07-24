var React = require("react")
var {Pager, Spinner} = require("../../components")
var {BootstrapTable, TableHeaderColumn} = require("react-bootstrap-table")

class CommentList extends React.Component{
    constructor(){
        super()

        this.state = {
            total: 0,
            topicList: [],
            selectAll: false,
            keywords: ''
        }
    }

    render(){
        let page = this.props.location.query.page || 1;
        const comments = [
            1,2,3,4,5
        ]
        return (
            <div className="content">
                <Spinner loading={this.state.loading}/>

                <div className="box box-solid">
                    <div className="box-body table-responsive no-padding">
                        <BootstrapTable data={comments}>
                            <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = CommentList