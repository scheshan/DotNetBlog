import "bootstrap/dist/css/bootstrap.min"
import "font-awesome/css/font-awesome.min.css"
import "./styles/styles.scss"

import React = require("react")
import ReactDom = require("react-dom")
import Formsy, {Form, Mixin} from 'formsy-react'
import {Router, Route, browserHistory, useRouterHistory} from "react-router"
import Input from './components/input'
import App from "./views/app"
import {Provider} from "react-redux"
import Store from "./store"
import {createHistory} from "history"
import Actions from "./actions"
import Consts from "./consts"


import Views_Dashboard from "./views/dashboard"
import Views_BasicConfig from "./views/basicconfig"

const history = useRouterHistory(createHistory)({
    basename: "/admin"
})

function enterRoute(menu, subMenu) {
    Store.dispatch(Actions.ChangeMenu(menu, subMenu));
}

class Index extends React.Component<any, any>{
    mixins: any

    constructor() {
        super()        

        this.mixins = Mixin
    }

    render(): JSX.Element {

        return (
            <Provider store={Store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <Route path="dashboard" component={Views_Dashboard} onEnter={enterRoute.bind(this, Consts.MenuKeys.Dashboard, "") }/>
                        <Route path="config/basic" component={Views_BasicConfig} onEnter={enterRoute.bind(this, Consts.MenuKeys.Config, Consts.MenuKeys.Config_Basic) } />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById("main"));