var Consts = require("../consts")

const {ActionTypes} = Consts

function Reducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.ChangeMenu:
            return _.assign({}, state, { menu: action.menu, subMenu: action.subMenu });
        case ActionTypes.ChangeTopicSetting:
            localStorage.setItem(Consts.LocalStorage.TopicSetting, JSON.stringify(action.setting));
            return _.assign({}, state, {topicSetting: action.setting});
        default:
            return state;
    }
}

module.exports = Reducer;