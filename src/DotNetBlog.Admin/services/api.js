require("whatwg-fetch");
const _ = require("lodash");

const errorResponse = {
    success: false,
    errorMessage: "请求发生错误，请稍后再试"
};

function prepareUrl(url, param){
    let search = "";
    for(var key in param){        
        if(param[key] !== undefined && param[key] !== null){
            let str = key + "=" + encodeURIComponent(param[key]);
            search = search == "" ? str : search + "&" + str;
        }
    }

    if(url.indexOf("?") > -1){
        url = url + "&" + search;
    }
    else{
        url = url + "?" + search;
    }

    return url;
}

function get(url, callback) {
    fetch(url, {
        method: "GET",
        credentials: 'same-origin'
    }).then(response => {
        return response.json();
    }).then(data => {
        callback(data);
    }).catch(ex => {
        callback(errorResponse);
    });
}

function post(url, data, callback) {
    fetch(url, {
        method: "POST",   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'same-origin'
    }).then(response=>{
        return response.json();
    }).then(data=>{
        callback(data);
    }).catch(ex=>{
        callback(errorResponse);
    });
}

const Api = {
    getBasicConfig(callback) {
        get("/api/config/basic", callback);
    },
    saveBasicConfig(config, callback) {
        post("/api/config/basic", config, callback);
    },
    getEmailConfig(callback){
        get("/api/config/email", callback);
    },
    saveEmailConfig(config, callback) {
        post("/api/config/email", config, callback);
    },
    getCommentConfig(callback){
        get("/api/config/comment", callback);
    },
    saveCommentConfig(config, callback){
        post("/api/config/comment", config, callback);
    },
    getCategoryList(callback){
        get("/api/category/all", callback);
    },
    addCategory(model, callback){
        post("/api/category", model, callback);
    },
    editCategory(id, model, callback){
        post("/api/category/" + id, model, callback);
    },
    removeCategory(idList, callback){
        post("/api/category/remove", {idList: idList}, callback);
    },
    queryNormalTopic(page, pageSize, status, keywords, callback){
        var param = {
            pageIndex: page,
            pageSize,
            status,
            keywords
        };
        get(prepareUrl("/api/topic/query", param), callback);
    },
    getTopic(id, callback){
        get("/api/topic/" + id, callback);
    },
    addTopic(data, callback){
        post("/api/topic", data, callback);
    },
    editTopic(id, data, callback){
        post("/api/topic/" + id, data, callback);
    },
    batchPublishTopic(idList, callback){
        post("/api/topic/batch/publish", {topicList: idList}, callback);
    },
    batchDraftTopic(idList, callback){
        post("/api/topic/batch/draft", {topicList: idList}, callback);
    },
    batchDeleteTopic(idList, callback){
        post("/api/topic/batch/delete", {topicList: idList}, callback);
    },
    queryTag(page, pageSize, keywords, callback){
        var param = {
            pageIndex: page,
            pageSize,
            keywords
        };
        get(prepareUrl("/api/tag/query", param), callback);
    },
    deleteTag(idList, callback){
        post("/api/tag/delete", {tagList: idList}, callback);
    },
    editTag(id, keyword, callback){
        post("/api/tag/" + id, {keyword: keyword}, callback);
    },
    queryComment(page, pageSize, keywords, status, callback){
        var param = {
            pageIndex: page,
            pageSize,
            keywords,
            status
        };
        get(prepareUrl("/api/comment/query", param), callback);
    },
    batchApproveComment(idList, callback){
        post("/api/comment/batch/approve", {commentList: idList}, callback);
    },
    batchRejectComment(idList, callback){
        post("/api/comment/batch/reject", {commentList: idList}, callback);
    },
    deleteComment(idList, callback){
        post("/api/comment/delete", {commentList: idList}, callback);
    }
};

module.exports = Api;