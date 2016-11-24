import fetch from "isomorphic-fetch"
import * as ActionTypes from './../constants/constants'
import { browserHistory } from 'react-router'

const moviesUrl = "http://localhost:3003/api/movies"
const userSignInUrl = "http://localhost:3003/api/users/sign_in"
const userSignUpUrl = "http://localhost:3003/api/users/sign_up"

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
  return (dispatch) => {
    return fetchMoviesPromise().then(
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
    }).then(res => {
      fetchMoviesPromise().then(movies => {
        dispatch({type: ActionTypes.FETCH_MOVIES, movies: movies})
        browserHistory.push('/')
      })
    })
  }
}

export function register(data) {
  console.log("register action: ", JSON.stringify(data))
  return (dispatch) => {
    return fetch(userSignUpUrl, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      fetchMoviesPromise().then(movies => {
        dispatch({type: ActionTypes.FETCH_MOVIES, movies: movies})
        browserHistory.push('/')
      })
    })
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
