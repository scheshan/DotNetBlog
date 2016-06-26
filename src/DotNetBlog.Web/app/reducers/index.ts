import Consts from "../consts"
import _ = require("lodash")

const {ActionTypes} = Consts

function Reducer(state: Blog.Store.BlogState, action: Blog.Action.ActionBase) {
    switch (action.type) {
        case ActionTypes.ChangeMenu:
            let _a = action as Blog.Action.ChangeMenuAction
            return _.assign({}, state, { menu: _a.menu, subMenu: _a.subMenu });
        default:
            return state;
    }
}


export default Reducer