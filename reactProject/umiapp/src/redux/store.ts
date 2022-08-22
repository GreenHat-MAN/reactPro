import {createStore,applyMiddleware} from 'redux'
import { reducers } from './reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

export const mstore = createStore(reducers,applyMiddleware(thunk,promise))
