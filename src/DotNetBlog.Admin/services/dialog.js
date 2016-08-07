toastr.options.timeOut = 5000;
toastr.options.extendedTimeOut = 2000;

function createOption(callback){
    return {
        onHidden: callback
    }
}

const Dialog = {
    success(message, title, callback){
        toastr.success(message, title, createOption(callback));
    },
    error(message, title, callback){
        toastr.error(message, title, createOption(callback));
    },
    info(message, title, callback){
        toastr.info(message, title, createOption(callback))
    }
}

module.exports = Dialog