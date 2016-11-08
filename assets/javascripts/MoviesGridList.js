import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import {connect} from 'react-redux'
import * as Actions from '../../redux/actions/actions'

const GridStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '85%',
    height: '100%',
    marginBottom: 24,
  },
}

class MoviesGridList extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  renderMovieGrid(movie) {
    return (
      <a key={`link${movie._id}`} href={`/movies/${movie._id}`}>
        <GridTile
          key={movie._id}
          title={movie.title}
          subtitle={<span>by <b>{movie.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={movie.img}/>
        </GridTile>
      </a>
    )
  }

  renderMovieGrids() {
    let self = this
    return this.props.movies.map((movie) => (self.renderMovieGrid(movie)))
  }

  render() {
    let title = ((this.props.tags === undefined || this.props.tags.length === 0) ? "电影" : `${this.props.tags}电影`)

    return (<div style={GridStyles.root}>
      <GridList cellHeight={400} padding={4} cols={4} style={GridStyles.gridList}>
        <Subheader>{title}</Subheader>
        {this.renderMovieGrids()}
      </GridList>
    </div>)
  }
}

MoviesGridList.need = [function (params) {
  return Actions.fetchMovies.bind(null, params)();
}]

// 将store最新的state.movies给props，
function mapStateToProps(store) {
  return {
    tags: store.tags,
    movies: store.movies
  }
}

export default connect(mapStateToProps)(MoviesGridList)
