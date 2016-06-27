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

function getBasicConfig(callback) {
    get("/api/config/basic", callback);
}

module.export = {
    getBasicConfig
}