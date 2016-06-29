var React = require("react")
var {Link} = require("react-router")
var {connect} = require("react-redux")
var Consts = require("../consts")

class Menu extends React.Component{
    render() {
        let className = this.props.menu.selected ? "active" : ""
        let icon = null;
        if (this.props.menu.icon) {
            icon = <i className={this.props.menu.icon}></i>
        }
        else{
            icon = <i className="fa fa-circle-o"></i>
        }
        let children = null;
        if (this.props.menu.children && this.props.menu.children.length > 0) {
            className = className + " treeview";
            children = (
                <ul className="treeview-menu">
                    {
                        this.props.menu.children.map(menu => {
                            return <Menu menu={menu} key={menu.key}/>
                        })
                    }
                </ul>
                )
        }

        return (
            <li className={className}>
                <Link to={this.props.menu.url}>
                    {icon}
                    <span>{this.props.menu.text}</span>
                </Link>

                {children}
            </li>
            )
    }
}

class App extends React.Component{
    constructor() {
        super();

        this.menus = [
            {
                key: Consts.MenuKeys.Dashboard,
                text: "控制台",
                url: "dashboard",
                icon: "fa fa-th-large"
            },
            {
                key: Consts.MenuKeys.Config,
                text: "设置",
                url: "config/basic",
                icon: "fa fa-cog",
                children: [
                    {
                        key: Consts.MenuKeys.Config_Basic,
                        text: "基础",
                        url: "config/basic"                        
                    },
                    {
                        key: Consts.MenuKeys.Config_Email,
                        text: "Email",
                        url: "config/email"
                    },
                    {
                        key: Consts.MenuKeys.Config_Feed,
                        text: "推送",
                        url: "config/feed"
                    },
                    {
                        key: Consts.MenuKeys.Config_Comments,
                        text: "评论",
                        url: "config/comments"
                    },
                    {
                        key: Consts.MenuKeys.Config_Advance,
                        text: "高级",
                        url: "config/advance"
                    }
                ]
            }
        ]
    }

    render() {
        this.menus.forEach(m => {
            m.selected = this.props.menu == m.key;
            if (m.children) {
                m.children.forEach(sm => {
                    sm.selected = this.props.subMenu == sm.key
                });
            }
        });

        return (
            <div className="wrapper">
                <header className="main-header">
                    <a href="/" className="logo">
                        DotNetBlog
                    </a>

                    <nav className="navbar navbar-static-top" role="navigation">

                        <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li><a href="http://almsaeedstudio.com">修改密码</a></li>
                                <li>
                                    <a href="http://almsaeedstudio.com/premium">
                                        <i className="fa fa-exit"></i>
                                        注销
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </header>

                <aside className="main-sidebar">
                    <div className="sidebar">
                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                            </div>
                            <div className="pull-left info">
                                <p>User Name</p>

                                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar-menu">
                        <li className="header">站点导航</li>
                        {
                            this.menus.map(menu=>{
                                return <Menu menu={menu} key={menu.key}/>
                            })
                        }
                    </ul>
                </aside>

                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        menu: state.menu,
        subMenu: state.subMenu
    }
}

module.exports = connect(mapStateToProps)(App)