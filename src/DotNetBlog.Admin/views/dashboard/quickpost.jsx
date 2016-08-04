var React = require("react")

class QuickPost extends React.Component{
    render(){
        return (
            <div className="panel">
                <div className="panel-heading">
                    <div className="panel-title">快捷提交</div>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <input type="text" placeholder="标题" className="form-control" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="在这里输入" className="form-control ltr-dir" rows="4"></textarea>
                    </div>
                    <button type="button" className="btn btn-block btn-default" title="保存">保存</button>
                </div>
            </div>
        )
    }
}

module.exports = QuickPost;