import {createStore, applyMiddleware} from "redux"
import Reducer from "../reducers"
import Thunk from "redux-thunk"

const initialState: Blog.Store.BlogState = {

}

const store = createStore(Reducer, initialState, applyMiddleware(Thunk))

export default store