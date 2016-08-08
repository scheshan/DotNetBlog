var Consts = require("../consts")
var _ = require("lodash")

const {ActionTypes} = Consts

function Reducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.ChangeMenu:
            return _.assign({}, state, { menu: action.menu, subMenu: action.subMenu });
        default:
            return state;
    }
}

module.exports = Reducer;