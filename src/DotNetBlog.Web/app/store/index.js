var {createStore, applyMiddleware} = require("redux")
var {Reducer} = require("../reducers")
var Thunk = require("redux-thunk").default

const initialState = {

}

const store = createStore(Reducer, initialState, applyMiddleware(Thunk))

exports.Store = store