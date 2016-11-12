import fetch from "isomorphic-fetch"
import * as ActionTypes from './../constants/constants'

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

export function fetchMovies(params) {
  return (dispatch) => {
    var url = (params.tags === undefined ? "http://localhost:3003/api/movies" : `http://localhost:3003/api/movies?tags=${encodeURIComponent(params.tags)}`)
    return fetch(url)
    .then(res => res.json())
    .then(movies => dispatch(Object.assign({type: ActionTypes.FETCH_MOVIES, movies: movies}, params) ));
  }
}

export function fetchMovie(movieId) {
  return (dispatch) => {
    if (!movieId) return Promise.resolve();
    return fetch(`http://localhost:3003/api/movies/${movieId}`)
    .then(res => res.json())
    .then(movie => dispatch({type: ActionTypes.FETCH_MOVIE, movie: movie}));
  }
}