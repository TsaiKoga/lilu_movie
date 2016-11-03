import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppLayout from './AppLayout'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

module.exports = (
  <Route path="/" component={AppLayout}>
    <Route path="/users/login" component={LoginForm} />
    <Route path="/users/register" component={RegisterForm}/>
  </Route>
)
