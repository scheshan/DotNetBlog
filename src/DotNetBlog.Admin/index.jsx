require("./styles/app.css")

import Localization from "./resources"

import React from "react"
import ReactDom from "react-dom"

var Formsy, {Form, Mixin} = require('formsy-react')
var {Router, Route, browserHistory, hashHistory, useRouterHistory} = require("react-router")

var {Provider} = require("react-redux")
import Store from "./store"
var createHistory = require("history/lib/createHistory").default
var {changeMenu} = require("./actions")
var Consts = require("./consts")
    
import Views_App from "./views/app"
import Views_Dashboard from "./views/dashboard/dashboard"
import Views_BasicConfig from "./views/config/basicconfig"
var Views_AdvanceConfig = require("./views/config/advanceconfig")
var Views_EmailConfig = require("./views/config/emailconfig")
var Views_CategoryList = require("./views/content/categorylist")
var Views_ModifyTopic = require("./views/content/modifytopic")
var Views_TopicList = require("./views/content/topiclist")
var Views_TagList = require("./views/content/taglist")
var Views_PageList = require("./views/content/pagelist")
var Views_ModifyPage = require("./views/content/modifypage")
var Views_CommentList = require("./views/content/commentlist")
var Views_CommentConfig = require("./views/config/commentconfig")
var Views_Profile = require("./views/user/profile")
var Views_Widgets = require("./views/widget/widgets")

const history = useRouterHistory(createHistory)({
    basename: "/admin"
})

function enterRoute(menu, subMenu) {
    Store.dispatch(changeMenu(menu, subMenu));
}

class Index extends React.Component{
    render() {
        
        return (
            <Provider store={Store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Views_App}>
                        <Route path="dashboard" component={Views_Dashboard} onEnter={enterRoute.bind(this, Consts.MenuKeys.Dashboard, "") }/>
                        <Route path="config/basic" component={Views_BasicConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Basic) } />
                        <Route path="config/email" component={Views_EmailConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Email) } />
                        <Route path="config/comments" component={Views_CommentConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Comments) } />
                        <Route path="config/advance" component={Views_AdvanceConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Advance) } />
                        <Route path="content/categories" component={Views_CategoryList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Categories)} />
                        <Route path="content/topics" component={Views_TopicList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Topics)}/>
                        <Route path="content/topic(/:id)" component={Views_ModifyTopic} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Topics)}/>
                        <Route path="content/comments" component={Views_CommentList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Comments)} />
                        <Route path="content/tags" component={Views_TagList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Tags)}/>
                        <Route path="content/pages" component={Views_PageList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Pages)}/>
                        <Route path="content/page(/:id)" component={Views_ModifyPage} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Pages)}/>
                        <Route path="custom/widgets" component={Views_Widgets} onEnter={enterRoute.bind(this, Consts.MenuKeys.Custom, Consts.MenuKeys.Custom_Widgets)}/>
                        <Route path="profile" component={Views_Profile} onEnter={enterRoute.bind(this, Consts.MenuKeys.User, Consts.MenuKeys.User_Profile)}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

$(()=>{
    ReactDom.render(<Index/>, document.getElementById("main"));
});