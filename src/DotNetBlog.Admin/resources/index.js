import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({
    "en-GB": {
        /* Menu */
        dashboard: "Dashboard",
        content: "Content",
        article: "Article",
        comment: "Comment",
        page: "Page",
        managmentCategories: "Managment categories",
        tag: "Tag",
        customize: "Customize",
        component: "Component",
        setup: "Setup",
        basic: "Basic",
        email: "Email",
        push: "Push",
        advanced: "Advanced",
        user: "User",
        personalInformation: "Personal Information",
        /* services/api */
        errorInRequeset: "Request an error. Please try again later",
        /* components/bootstrap/* */
        home: "Home",
        enterContentHere: "Enter the content here",
        /* views/dashboard */
        pleaseEnterTitle: "Please enter the title",
        pleaseEnterContent: "Please enter the content",
        draftWasSavedSuccessfully: "Draft was saved successfully",
        saveDraftQuickly: "Save the draft quickly",
        title: "Title",
        save: "Save",
        latestComments: "Latest comments",
        empty: "Empty",
        recentDrafts: "Recent drafts",
        statistics: "Statistics",
        numberOfArticlesPublished: "Number of articles published",
        numberOfPagesPublished: "Number of pages published",
        savedDrafts: "Saved drafts",
        numberOfPages: "Number of pages",
        approvedComments: "Approved comments",
        pendingComments: "Pending comments",
        junkComments: "Junk comments",
        
        /* views/config/advanceconfig */
    },
    "zh-GB": {
        /* Menu */
        dashboard: "控制台",
        content: "内容",
        article: "文章",
        comment: "评论",
        page: "页面",
        managmentCategories: "管理分类",
        tag: "标签",
        customize: "自定义",
        component: "组件",
        setup: "设置",
        basic: "基础",
        email: "Email",
        push: "推送",
        advanced: "高级",
        user: "用户",
        personalInformation: "个人资料",
        /* services/api */
        errorInRequeset: "请求发生错误，请稍后再试",
        /*components/*/
        home: "首页",
        enterContentHere: "在此输入内容",
        /* views/dashboard */
        pleaseEnterTitle: "请输入标题",
        pleaseEnterContent: "请输入内容",
        draftWasSavedSuccessfully: "保存草稿成功",
        saveDraftQuickly: "快捷保存草稿",
        title: "标题",
        save: "保存",
        latestComments: "最新评论",
        empty: "无",
        recentDrafts: "文章稿件",
        statistics: "统计",
        numberOfArticlesPublished: "已发表文章数",
        numberOfPagesPublished: "已发表页面数",
        savedDrafts: "文章稿件",
        numberOfPages: "页面稿件",
        approvedComments: "已通过的评论",
        pendingComments: "未经审核的评论",
        junkComments: "垃圾评论",
        /* views/config/advanceconfig */
    }
});
Localization.setLanguage(user.lang);

String.prototype.L = function () {
    return Localization.formatString(Localization[this] || this, arguments);
}

module.exports = Localization;