import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from './AppLayout'
import { Router,browserHistory } from 'react-router'
import routes from './routes'

import { Provider } from 'react-redux'
import configureStore from './../../redux/configureStore'
import "./../stylesheets/style.css"

// window.__INITIAL_STATE__ 有states数据，可以根据后台server改变数据内容。
const store = configureStore(window.__INITIAL_STATE__)

/* 这里store存储某一时刻的state树，所以这里面通过action得到的states是不一样的
 * 例如：如果一开始给tags，后面action没有给tags，则不会有原来的初始值tags,所以不用担心数据冗余。
 */

ReactDOM.render(
  <Provider store={store} >
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
)
