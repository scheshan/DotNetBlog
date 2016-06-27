require("bootstrap/dist/css/bootstrap.min")
require("font-awesome/css/font-awesome.min.css")
require("./styles/styles.scss")

var React = require("react")
var ReactDom = require("react-dom")
var Formsy, {Form, Mixin} = require('formsy-react')
var {Router, Route, browserHistory, useRouterHistory} = require("react-router")
var Input = require('./components/input')

var {Provider} = require("react-redux")
var Store = require("./store").Store
var {createHistory} = require("history")
var {changeMenu} = require("./actions")
var Consts = require("./consts")
    
var Views_App = require("./views/app").App
var Views_Dashboard = require("./views/dashboard").Dashboard
var Views_BasicConfig = require("./views/basicconfig").BasicConfig

console.log(Views_Dashboard)

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