import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import surveyReducer from '../reducers/surveyReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    user: userReducer,
  	survey: surveyReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
