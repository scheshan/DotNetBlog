var Toastr = require("toastr")

Toastr.options.timeOut = 5000;
Toastr.options.extendedTimeOut = 2000;

function createOption(callback){
    return {
        onHidden: callback
    }
}

const Dialog = {
    success(message, title, callback){
        Toastr.success(message, title, createOption(callback));
    },
    error(message, title, callback){
        Toastr.error(message, title, createOption(callback));
    },
    info(message, title, callback){
        Toastr.info(message, title, createOption(callback))
    }
}

module.exports = Dialog