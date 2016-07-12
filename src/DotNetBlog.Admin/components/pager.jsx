const React = require('react')
const _ = require('lodash')

class Pager extends React.Component {
    handlePageItemClick(page, e) {
        if (this.props.onPageChange) {
            this.props.onPageChange(page);
        }
    }

    render() {
        if (!this.props.pageSize || !this.props.total) {
            return null
        }

        let totalPage = Math.ceil(this.props.total / this.props.pageSize);

        let current = parseInt(this.props.page) || 1

        if (current > totalPage) {
            return null
        }

        let start = current - 4;
        if (start > totalPage) {
            start = totalPage - 8;
        }
        if (start < 1) {
            start = 1
        }
        let end = start + 8;
        if (end > totalPage) {
            end = totalPage
        }

        var first, prev, next, last;

        var arr = [];

        if (current > 1) {
            first = <li><a href="javascript:void(0)" onClick={this.handlePageItemClick.bind(this, 1) }>首页</a></li>
            prev = <li><a href="javascript:void(0)" onClick={this.handlePageItemClick.bind(this, current - 1) }>上一页</a></li>
        }
        if (current < totalPage) {
            next = <li><a href="javascript:void(0)" onClick={this.handlePageItemClick.bind(this, current + 1) }>下一页</a></li>
            last = <li><a href="javascript:void(0)" onClick={this.handlePageItemClick.bind(this, totalPage) }>末页</a></li>
        }

        return (
            <div className="text-center">
                <ul className="pagination pagination-sm">
                    {first}
                    {prev}
                    {    _.range(start, end + 1).map(i => {
                            return this.getPageItem(i, current)
                        })
                    }
                    {next}
                    {last}
                </ul>
            </div>
        )
    }

    getPageItem(page, currentPage) {
        if (page == currentPage) {
            return <li key={page} className="active"><a href="javascript:void(0)">{page}</a></li>
        }
        else {
            return <li key={page}><a href="javascript:void(0)" onClick={this.handlePageItemClick.bind(this, page) }>{page}</a></li>
        }
    }
}

Pager.propType = {
    page: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired,
    onPageChange: React.PropTypes.func
}

module.exports = Pager