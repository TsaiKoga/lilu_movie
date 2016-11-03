/*
 * AppLayout+MoviesGridList => /
 * AppLayout+MovieCardShow => /movies/1
 */

import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from './AppLayout'
import { Router,browserHistory } from 'react-router'
import routes from './routes'

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
)
