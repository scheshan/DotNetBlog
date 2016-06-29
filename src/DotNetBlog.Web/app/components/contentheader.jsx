var React = require("react")
var {Link} = require("react-router")

class ContentHeader extends React.Component{
    render(){
        let subtitle = null;
        if(this.props.subtitle){
            subtitle = <small>{this.props.subtitle}</small>
        }

        return (
            <section className="content-header">
                <h1>
                    {this.props.title}
                    {subtitle}
                </h1>
                
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">
                            <i className="fa fa-home"></i>
                            首页
                        </Link>
                    </li>
                    <li className="active">
                        {this.props.title}
                    </li>
                </ol>
            </section>
        )
    }
}

ContentHeader.prototypes = {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string
}

module.exports = ContentHeader