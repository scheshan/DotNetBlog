require("font-awesome/css/font-awesome.min.css")
require("bootstrap/dist/css/bootstrap.min.css")
require('./styles/AdminLTE.css')
require('./styles/_all-skins.css')
require("toastr/build/toastr.min.css")
require("./styles/app.css")
require('bootstrap-tagsinput/src/bootstrap-tagsinput.css')

import React from "react"
import ReactDom from "react-dom"
var Formsy, {Form, Mixin} = require('formsy-react')
var {Router, Route, browserHistory, hashHistory, useRouterHistory} = require("react-router")

var {Provider} = require("react-redux")
import Store from "./store"
var {createHistory} = require("history")
var {changeMenu} = require("./actions")
var Consts = require("./consts")
    
import Views_App from "./views/app"
import Views_Dashboard from "./views/dashboard/dashboard"
import Views_BasicConfig from "./views/config/basicconfig"
var Views_EmailConfig = require("./views/config/emailconfig")
var Views_CategoryList = require("./views/content/categorylist")
var Views_ModifyTopic = require("./views/content/modifytopic")
var Views_TopicList = require("./views/content/topiclist")
global.jQuery = $ = require("jquery")

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
                        <Route path="content/categories" component={Views_CategoryList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Categories)} />
                        <Route path="content/topics" component={Views_TopicList} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Topics)}/>
                        <Route path="content/topic(/:id)" component={Views_ModifyTopic} onEnter={enterRoute.bind(this, Consts.MenuKeys.Content, Consts.MenuKeys.Content_Topics)}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

$(()=>{
    ReactDom.render(<Index/>, document.getElementById("main"));
});