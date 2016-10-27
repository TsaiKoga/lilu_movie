import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import MoviesStore from './../../stores/MoviesStore'

class MovieCardShow extends React.Component {
  constructor(props) {
    super(props)
    this.getMovie()
  }

  getMovie() {
    let movieId = this.props.movieId
    if (movieId) {
      MoviesStore.findMovie(movieId, (movie) => (this.setState({movie: movie})))
    }
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.movie.author}
        />
        <CardMedia
          overlay={<CardTitle title={this.movie.title} />}
        >
          <img src={this.movie.description} />
        </CardMedia>
        <CardTitle title={this.movie.title} />
        <CardText>
          {this.movie.description}
        </CardText>
        <CardActions>
          <FlatButton label="Download" />
        </CardActions>
      </Card>
    )
  }
}
export default MovieCardShow
