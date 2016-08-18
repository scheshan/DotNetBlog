var {createStore, applyMiddleware, combineReducers} = require("redux")
var Reducer = require("../reducers")
var Thunk = require("redux-thunk").default
var ReduxForm = require("redux-form")

const reducers = combineReducers({
    blog: Reducer,
    form: ReduxForm.reducer 
})

const initialState = {
    blog: {
        topicSetting: {

        }
    }
}

const store = createStore(reducers, initialState, applyMiddleware(Thunk))

module.exports = store