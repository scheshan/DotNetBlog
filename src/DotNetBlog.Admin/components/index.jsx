const Form = require("./form")
const LoadingButton = require("./loadingbutton")
const ContentHeader = require("./contentheader")
const Editor = require("./editor")
const Pager = require("./pager")
const Spinner = require("./spinner")
const FormGroup = require("./bootstrap/formgroup")

module.exports = {
    Form,
    LoadingButton,
    ContentHeader,
    Editor,
    Pager,
    Spinner,
    Bootstrap: {
        FormGroup
    }
}