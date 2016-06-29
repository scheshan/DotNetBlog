require("whatwg-fetch")
var _ = require("lodash")

function get(url, callback) {
    fetch(url, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        callback(data)
    }).catch(ex => {

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
    }
}

module.exports = Api