require("font-awesome/css/font-awesome.min.css")
require("bootstrap/dist/css/bootstrap.min.css")
require('./styles/AdminLTE.css')
require('./styles/_all-skins.css')

import React from "react"
import ReactDom from "react-dom"
var Formsy, {Form, Mixin} = require('formsy-react')
var {Router, Route, browserHistory, useRouterHistory} = require("react-router")
var Input = require('./components/input')

var {Provider} = require("react-redux")
import Store from "./store"
var {createHistory} = require("history")
var {changeMenu} = require("./actions")
var Consts = require("./consts")
    
import Views_App from "./views/app"
import Views_Dashboard from "./views/dashboard"
import Views_BasicConfig from "./views/basicconfig"

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
                <Router history={history}>
                    <Route path="/" component={Views_App}>
                        <Route path="dashboard" component={Views_Dashboard} onEnter={enterRoute.bind(this, Consts.MenuKeys.Dashboard, "") }/>
                        <Route path="config/basic" component={Views_BasicConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Basic) } />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById("main"));

module.export = Index;