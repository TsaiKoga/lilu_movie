import fetch from "isomorphic-fetch"
import * as ActionTypes from './../constants/constants'
import { browserHistory } from 'react-router'
import jwt from 'jsonwebtoken'
import config from './../../config'

var moviesUrl, userSignInUrl, userSignUpUrl
if (process.env.NODE_ENV === "heroku") {
  moviesUrl = `http://${config.heroku.host}/api/movies`
  userSignInUrl = `http://${config.heroku.host}/api/users/sign_in`
  userSignUpUrl = `http://${config.heroku.host}/api/users/sign_up`
} else {
  moviesUrl = `http://${config.dev.host}:${config.dev.defaultPort}/api/movies`
  userSignInUrl = `http://${config.dev.host}:${config.dev.defaultPort}/api/users/sign_in`
  userSignUpUrl = `http://${config.dev.host}:${config.dev.defaultPort}/api/users/sign_up`
}

export function toggleDrawer(open) {
  return {
    type: ActionTypes.TOGGLE_DRAWER,
    open: open
  }
}

export function handleClose() {
  return {
    type: ActionTypes.HANDLE_CLOSE,
    open: false
  }
}

export function toggleExpanded(expanded) {
  return {
    type: ActionTypes.TOGGLE_EXPANDED,
    expanded: expanded
  }
}

export function fetchMovies(params={}) {
  console.log("ckj fetch movies:==========")
  return (dispatch) => {
    return fetchMoviesPromise(params).then(
      movies => dispatch(Object.assign({type: ActionTypes.FETCH_MOVIES, movies: movies}, params))
    );
  }
}

export function fetchMovie(movieId) {
  return (dispatch) => {
    if (!movieId) return Promise.resolve();
    return fetch(`${moviesUrl}/${movieId}`)
    .then(res => res.json())
    .then(movie => dispatch({type: ActionTypes.FETCH_MOVIE, movie: movie}));
  }
}

export function login(data) {
  console.log("login action: ", data)
  return (dispatch) => {
    return fetch(userSignInUrl, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json()).then(tokenObj => {
      const token = tokenObj.token
      localStorage.setItem('jwtToken', token)
      fetchMoviesPromise().then(movies => {
        dispatch(setCurrentUser(jwt.decode(token)))
        dispatch({type: ActionTypes.FETCH_MOVIES, movies: movies})
        browserHistory.push('/')
      })
    })
  }
}

export function register(data) {
  return (dispatch) => {
    return fetch(userSignUpUrl, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json()).then(tokenObj => {
      const token = tokenObj.token
      localStorage.setItem('jwtToken', token)
      fetchMoviesPromise().then(movies => {
        dispatch(setCurrentUser(jwt.decode(token)))
        dispatch({type: ActionTypes.FETCH_MOVIES, movies: movies})
        browserHistory.push('/')
      })
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(setCurrentUser({}))
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user: user
  }
}

/*
 * fetch movies promise
 */
function fetchMoviesPromise(params={}) {
  let url = (params.tags === undefined ? moviesUrl :
    `${moviesUrl}?tags=${encodeURIComponent(params.tags)}`)
  return fetch(url).then(res => res.json())
}
