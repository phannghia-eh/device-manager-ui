import {combineReducers} from "redux";
import {routerReducer} from 'react-router-redux'
import modules from './modules'

export default combineReducers({
  ...modules,
  routing: routerReducer
})