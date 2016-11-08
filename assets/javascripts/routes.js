import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppLayout from './AppLayout'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import MoviesGridList from './MoviesGridList'
import MovieCardShow from './MovieCardShow'

module.exports = (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={MoviesGridList} />
    <Route path="/movies" component={MoviesGridList} />
    <Route path="/movies/:id" component={MovieCardShow} />
    <Route path="/users/login" component={LoginForm} />
    <Route path="/users/register" component={RegisterForm}/>
  </Route>
)
