import "whatwg-fetch"
import _ = require("lodash")

function get(url: string, callback: any) {
    fetch(url, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        callback(data)
    }).catch(ex => {

    });
}

export function getBasicConfig(callback: Blog.Api.GetBasicConfigCallback) {
    get("/api/config/basic", callback);
}