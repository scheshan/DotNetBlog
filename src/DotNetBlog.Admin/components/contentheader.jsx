var React = require("react")
var {Link} = require("react-router")
var {connect} = require("react-redux")
var {Menus} = require("../consts/")
var _ = require("lodash")

class ContentHeader extends React.Component{
    render(){
        if(this.props.menu){
            this.currentMenu = _.find(Menus, {key: this.props.menu});
        }
        else{
            this.currentMenu = null;
        }
        if(this.props.subMenu && this.currentMenu){
            this.currentSubMenu = _.find(this.currentMenu.children, {key: this.props.subMenu})
        }
        else{
            this.currentSubMenu = null;
        }

        return (
            <section className="content-header">
                <h1>
                    {this.renderMenuTitle()}
                    {this.renderSubMenuTitle()}
                </h1>
                
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">
                            <i className="fa fa-home"></i>
                            首页
                        </Link>
                    </li>
                    {this.renderMenuNav()}
                    {this.renderSubmenuNav()}
                </ol>
            </section>
        )
    }

    renderMenuTitle(){
        if(this.currentMenu){
            return this.currentMenu.text;
        }
    }

    renderSubMenuTitle(){
        if(this.currentSubMenu){
            return <small>{this.currentSubMenu.text}</small>
        }
        else{
            return ""
        }
    }

    renderMenuNav(){
        let className = null;
        if(!this.currentSubMenu){
            className = "active"
        }

        if(this.currentMenu){
            return (
                <li className={className}>
                    <Link to={this.currentMenu.url}>
                        <i className={this.currentMenu.icon}></i>
                        {this.currentMenu.text}
                    </Link>
                </li>
            )
        }
        else{
            return "";
        }
    }

    renderSubmenuNav(){
        if(this.currentSubMenu){
            return (
                <li className="active">
                    {this.currentSubMenu.text}
                </li>
            )
        }
        else{
            return "";
        }
    }
}

function mapStateToProps(state) {
    return {
        menu: state.menu,
        subMenu: state.subMenu
    }
}

module.exports = connect(mapStateToProps)(ContentHeader)