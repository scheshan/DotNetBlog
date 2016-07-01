require("whatwg-fetch")
var _ = require("lodash")

const errorResponse = {
    success: false,
    errorMessage: "请求发生错误，请稍后再试"
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
        post("/api/category/add", model, callback)
    },
    editCategory(model, callback){
        post("/api/category/edit", model, callback)
    },
    removeCategory(idList, callback){
        post("/api/category/remove", {idList: idList}, callback)
    }
}

module.exports = Api