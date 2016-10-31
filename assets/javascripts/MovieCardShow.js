import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'

import MoviesStore from './../../stores/MoviesStore'

class MovieCardShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      expanded: false,
    }

    this.getMovie()

    this.handleToggle = (event, toggle) => (
      this.setState({expanded: toggle})
    )
  }

  getMovie() {
    let movieId = this.props.movieId
    if (movieId) {
      MoviesStore.findMovie(movieId, (movie) => (this.setState({movie: movie})))
    }
  }

  // 由于文字中的\r\n在dom中会换行，而在浏览器压缩成空格，所以这里将它每一行变成<p>标签
  renderTextWithBreakLine(text) {
    if (text) {
      console.log(text)
      let lines = text.split(/\r\n/)
      let formatted = lines.map((line) => {
        return (<p>{line}</p>)
      })
      return (<div>{formatted}</div>)
    }
  }

  render() {
    return (
      <div className="movieCard">
        <Card>
          <CardHeader
            title={this.state.movie.author}
            avatar=""
          />
          <CardMedia
            overlay={<CardTitle title={this.state.movie.title} />}
          >
            <img src={this.state.movie.img} />
          </CardMedia>
          <CardTitle title={this.state.movie.title} />
          <CardText>
            {this.renderTextWithBreakLine(this.state.movie.description)}
          </CardText>
          <CardActions>
            <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle}
              labelPosition="right"
              label="查看下载链接"
            />
          </CardActions>
          <CardText expandable={this.state.expanded}>
            <a href={this.state.movie.download_link}>{this.state.movie.download_link}</a>
          </CardText>
        </Card>
      </div>
    )
  }
}
export default MovieCardShow
