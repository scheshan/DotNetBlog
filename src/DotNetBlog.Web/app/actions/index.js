var Consts = require("../consts")

function ChangeMenu(menu, subMenu) {
    var action = {
        type: Consts.ActionTypes.ChangeMenu,
        menu: menu,
        subMenu: subMenu
    };
    return action;
}

module.export = ChangeMenu