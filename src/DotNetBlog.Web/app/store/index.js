var {createStore, applyMiddleware} = require("redux")
var Reducer = require("../reducers")
var Thunk = require("redux-thunk")

const initialState = {

}

console.log(Reducer);

const store = createStore(Reducer, initialState, applyMiddleware(Thunk))

export default store