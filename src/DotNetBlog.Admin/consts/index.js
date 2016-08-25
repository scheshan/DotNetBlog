const ActionTypes = {
    ChangeMenu: "ActionType_ChangeMenu",
    ChangeTopicSetting: "ActionType_ChangeTopicSetting",
    ChangePageSetting: "ActionType_ChangePageSetting"
}

const LocalStorage = {
    TopicSetting: "TopicSetting",
    PageSetting: "PageSetting"
}

const MenuKeys = {
    Dashboard: "Menu_Dashboard",
    Content: "Menu_Content",
    Content_Topics: "Menu_Content_Topics",
    Content_Comments: "Menu_Content_Comments",
    Content_Categories: "Menu_Content_Categories",
    Content_Tags: "Menu_Content_Tags",
    Content_Pages: "Menu_Content_Pages",
    Custom: "Menu_Custom",
    Custom_Widgets: "Menu_Custom_Widgets",
    Config: "Menu_Config",
    Config_Basic: "Menu_Config_Basic",
    Config_Email: "Menu_Config_Email",
    Config_Feed: "Menu_Config_Feed",
    Config_Comments: "Menu_Config_Comments",
    Config_Advance: "Menu_Config_Advance",
    User: "Menu_User",
    User_Profile: "Menu_User_Profile"    
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
        url: "content/topics",
        icon: "fa fa-align-justify",
        children: [
            {
                key: MenuKeys.Content_Topics,
                text: "文章",
                url: "content/topics"     
            },
            {
                key: MenuKeys.Content_Comments,
                text: "评论",
                url: "content/comments"     
            },
            {
                key: MenuKeys.Content_Pages,
                text: "页面",
                url: "content/pages"     
            },
            {
                key: MenuKeys.Content_Categories,
                text: "管理分类",
                url: "content/categories"     
            },
            {
                key: MenuKeys.Content_Tags,
                text: "标签",
                url: "content/tags"
            }
        ]
    },
    {
        key: MenuKeys.Custom,
        text: "自定义",
        url: "custom/widgets",
        icon: "fa fa-cog",
        children: [
            {
                key: MenuKeys.Custom_Widgets,
                text: "组件",
                url: "custom/widgets"                        
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
    },
    {
        key: MenuKeys.User,
        text: "用户",
        url: "user/profile",
        icon: "fa fa-user",
        hide: true,
        children: [
            {
                key: MenuKeys.User_Profile,
                text: "个人资料",
                url: "user/profile"                        
            }
        ]
    }
]

module.exports = {
    ActionTypes,
    MenuKeys,
    Menus,
    LocalStorage
}