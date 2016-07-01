const ActionTypes = {
    ChangeMenu: "ActionType_ChangeMenu"
}

const MenuKeys = {
    Dashboard: "Menu_Dashboard",
    Content: "Menu_Content",
    Content_Topics: "Menu_Content_Topics",
    Content_Categories: "Menu_Content_Categories",
    Config: "Menu_Config",
    Config_Basic: "Menu_Config_Basic",
    Config_Email: "Menu_Config_Email",
    Config_Feed: "Menu_Config_Feed",
    Config_Comments: "Menu_Config_Comments",
    Config_Advance: "Menu_Config_Advance"
}

const Menus = [
    {
        key: MenuKeys.Dashboard,
        text: "控制台",
        url: "dashboard",
        icon: "fa fa-th-large"
    },
    {
        key: MenuKeys.Content,
        text: "内容",
        url: "content/categories",
        icon: "fa fa-align-justify",
        children: [
            {
                key: MenuKeys.Content_Topics,
                text: "文章",
                url: "content/topic"     
            },
            {
                key: MenuKeys.Content_Categories,
                text: "管理分类",
                url: "content/categories"     
            }
        ]
    },
    {
        key: MenuKeys.Config,
        text: "设置",
        url: "config/basic",
        icon: "fa fa-cog",
        children: [
            {
                key: MenuKeys.Config_Basic,
                text: "基础",
                url: "config/basic"                        
            },
            {
                key: MenuKeys.Config_Email,
                text: "Email",
                url: "config/email"
            },
            {
                key: MenuKeys.Config_Feed,
                text: "推送",
                url: "config/feed"
            },
            {
                key: MenuKeys.Config_Comments,
                text: "评论",
                url: "config/comments"
            },
            {
                key: MenuKeys.Config_Advance,
                text: "高级",
                url: "config/advance"
            }
        ]
    }
]

module.exports = {
    ActionTypes,
    MenuKeys,
    Menus
}