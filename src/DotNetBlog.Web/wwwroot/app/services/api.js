require("whatwg-fetch")
const _ = require("lodash")

const errorResponse = {
    success: false,
    errorMessage: "请求发生错误，请稍后再试"
}

function prepareUrl(url, param){
    let search = "";
    for(var key in param){        
        if(param[key] !== undefined && param[key] !== null){
            let str = key + "=" + encodeURIComponent(param[key])
            search = search == "" ? str : search + "&" + str
        }
    }

    if(url.indexOf("?") > -1){
        url = url + "&" + search
    }
    else{
        url = url + "?" + search
    }

    return url;
}

function get(url, callback) {
    fetch(url, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        callback(data)
    }).catch(ex => {
        callback(errorResponse)
    });
}

function post(url, data, callback) {
    fetch(url, {
        method: "POST",   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response=>{
        return response.json()
    }).then(data=>{
        callback(data)
    }).catch(ex=>{
        callback(errorResponse)
    })
}

const Api = {
    getBasicConfig(callback) {
        get("/api/config/basic", callback);
    },
    saveBasicConfig(config, callback) {
        post("/api/config/basic", config, callback);
    },
    getEmailConfig(callback){
        get("/api/config/email", callback)
    },
    saveEmailConfig(config, callback) {
        post("/api/config/email", config, callback)
    },
    getCategoryList(callback){
        get("/api/category/all", callback)
    },
    addCategory(model, callback){
        post("/api/category", model, callback)
    },
    editCategory(id, model, callback){
        post("/api/category/" + id, model, callback)
    },
    removeCategory(idList, callback){
        post("/api/category/remove", {idList: idList}, callback)
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
        post("/api/topic", data, callback)
    },
    editTopic(id, data, callback){
        post("/api/topic/" + id, data, callback)
    }
}

module.exports = Api