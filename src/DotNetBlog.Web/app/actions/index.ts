import Consts from "../consts"

function ChangeMenu(menu: string, subMenu: string) {
    var action: Blog.Action.ChangeMenuAction = {
        type: Consts.ActionTypes.ChangeMenu,
        menu: menu,
        subMenu: subMenu
    };
    return action;
}

export default {
    ChangeMenu
}