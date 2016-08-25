var Consts = require("../consts")

function changeMenu(menu, subMenu) {
    var action = {
        type: Consts.ActionTypes.ChangeMenu,
        menu: menu,
        subMenu: subMenu
    };
    return action;
}

function changeTopicSetting(setting){
    var action = {
        type: Consts.ActionTypes.ChangeTopicSetting,
        setting: setting
    };
    return action;
}

function changePageSetting(setting){
    var action = {
        type: Consts.ActionTypes.changePageSetting,
        setting: setting
    }
}

module.exports = {
    changeMenu,
    changeTopicSetting,
    changePageSetting
}