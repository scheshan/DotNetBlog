var Consts = require("../consts")

function changeMenu(menu, subMenu) {
    var action = {
        type: Consts.ActionTypes.ChangeMenu,
        menu: menu,
        subMenu: subMenu
    };
    return action;
}

exports.changeMenu = changeMenu