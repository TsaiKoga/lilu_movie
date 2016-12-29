/*
 * 每个reducer管理一个小的state树
 * 用来根据生成新的state
 */
import * as ActionTypes from './../constants/constants'
import { isEmpty } from './../../utils/isEmpty'

const initialState = {
  open: false,
  auth: {
    isAuthenticated: false,
    currentUser: {}
  }
}
const RootReducer = function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_DRAWER:
      return Object.assign({}, state, { open: !action.open })
    case ActionTypes.HANDLE_CLOSE:
      return Object.assign({}, state, { open: action.open })
    case ActionTypes.TOGGLE_EXPANDED:
      return Object.assign({}, state, { expanded: !action.expanded })
    case ActionTypes.FETCH_MOVIES:
      return Object.assign({}, state, {
        tags: action.tags,
        movies: [...action.movies]
      })
    case ActionTypes.FETCH_MOVIE:
      return Object.assign({}, state, { movie: action.movie })
    case ActionTypes.AUTH_USER:
      console.log("auth user: ", !isEmpty(action.user))
      return Object.assign({}, state, {
        auth: {
          isAuthenticated: !isEmpty(action.user),
          currentUser: action.user
        }
      })
    default:
      return state
  }
}

export default RootReducer
export const getMovie = (state, id) => state.movies.filter(movie => movie._id === id)[0];
export const getMoviesByTag = (state, tags) => state.movies.filter(movie => movie.tags.indexOf(tags) != -1)
