var {createStore, applyMiddleware, combineReducers} = require("redux")
var Reducer = require("../reducers")
var Thunk = require("redux-thunk").default
var ReduxForm = require("redux-form")

const reducers = combineReducers({
    Reducer,
    form: ReduxForm.reducer 
})

const initialState = {

}

const store = createStore(reducers, initialState, applyMiddleware(Thunk))

module.exports = store