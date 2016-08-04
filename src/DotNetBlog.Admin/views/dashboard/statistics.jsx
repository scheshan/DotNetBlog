var React = require("react")

class Statistics extends React.Component{
    render(){
        return (
            <div className="panel">
                <div className="panel-heading">统计</div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <a href="/admin/#/content/posts?fltr=pub">
                            已发表文章数 
                            <span className="badge pull-right">20</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/pages?fltr=pub">
                            已发表页面数 
                            <span className="badge pull-right">3</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/posts?fltr=dft">
                            文章稿件 
                            <span className="badge pull-right">4</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/pages?fltr=dft">
                            页面稿件 
                            <span className="badge pull-right">0</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/comments?fltr=apr">
                            已通过的评论 
                            <span className="badge pull-right">3</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/comments?fltr=pnd">
                            未经审核的评论 
                            <span className="badge pull-right">2</span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/admin/#/content/comments?fltr=spm">
                            垃圾评论
                            <span className="badge pull-right">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = Statistics