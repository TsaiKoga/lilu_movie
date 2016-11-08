import { createStore, applyMiddleware } from 'redux'
import { devTools, compose } from 'redux-devtools'
import RootReducer from './reducers/reducer'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()
const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(RootReducer, initialState)
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const nextRootReducer = require('./reducers')
  //     store.replaceReducer(nextRootReducer)
  //   }
  // }
  return store
}
