var {createStore, applyMiddleware, combineReducers} = require("redux")
var Reducer = require("../reducers")
var Thunk = require("redux-thunk").default
var ReduxForm = require("redux-form")
var Consts = require("../consts")

const reducers = combineReducers({
    blog: Reducer,
    form: ReduxForm.reducer 
})

function getInitialState(){
    var state = {
        blog: {

        }
    };

    var topicSetting = localStorage.getItem(Consts.LocalStorage.TopicSetting);
    try{
        topicSetting = JSON.parse(topicSetting);
    }
    catch(e){
        topicSetting = {};
    }
    state.blog.topicSetting = topicSetting || {};

    var pageSetting = localStorage.getItem(Consts.LocalStorage.PageSetting);
    try{
        pageSetting = JSON.parse(pageSetting);
    }
    catch(e){
        pageSetting = {};
    }
    state.blog.pageSetting = pageSetting || {};

    console.log(state);

    return state;
}

const initialState = getInitialState();

const store = createStore(reducers, initialState, applyMiddleware(Thunk))

module.exports = store