import React = require("react")
import {Link} from "react-router"
import {connect} from "react-redux"
import Consts from "../consts"

interface AppProps {
    menu: string
    subMenu: string
}

interface MenuProps {
    menu: Blog.Views.MenuItem
}

class Menu extends React.Component<MenuProps, any>{
    render(): JSX.Element {
        let className = this.props.menu.selected ? "active" : ""
        let icon: JSX.Element;
        if (this.props.menu.icon) {
            icon = <i className={this.props.menu.icon}></i>
        }
        let children: JSX.Element;
        if (this.props.menu.children && this.props.menu.children.length > 0) {
            children = (
                <ul className="sub-nav-sidebar">
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
                    {this.props.menu.text}
                </Link>

                {children}
            </li>
            )
    }
}

class App extends React.Component<AppProps, any>{
    menus: Blog.Views.MenuItem[]

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

    render(): JSX.Element {
        this.menus.forEach(m => {
            m.selected = this.props.menu == m.key;
            if (m.children) {
                m.children.forEach(sm => {
                    sm.selected = this.props.subMenu == sm.key
                });
            }
        });

        return (
            <div className="main-wrapper">
                <div className="main-sidebar">
                    <div className="nav-user-info">
                        <div className="nav-user">
                            <div className="nav-user-info">
                                <div className="nav-user-img"><img src="/Content/images/blog/noavatar.jpg"/></div>
                                <div className="nav-user-name text-ellipsis">Administrator</div>
                            </div>
                            <ul className="nav-user-actions clearfix">
                                <li title="博客首页"><a href="/" target="_blank"><i className="fa fa-home"></i></a></li>
                                <li title="更改密码"><a href="/account/changepassword" target="_blank"><i className="fa fa-key"></i></a></li>
                                <li title="档案">
                                    <Link to="/security/profile"><i className="fa fa-user"></i></Link>
                                </li>
                                <li title="注销">
                                    <a href="/account/logoff"><i className="fa fa-power-off"></i></a>
                                </li>                                
                            </ul>
                        </div>
                        <div className="nav-sidebar">
                            <ul>
                                {
                                    this.menus.map(menu => {
                                        return <Menu menu={menu} key={menu.key}/>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: Blog.Store.BlogState) {
    return {
        menu: state.menu,
        subMenu: state.subMenu
    }
}

export default connect(mapStateToProps)(App)