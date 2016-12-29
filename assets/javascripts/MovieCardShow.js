import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/actions'
import { getMovie } from '../../redux/reducers/reducer'

class MovieCardShow extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.toggleExpanded = (event) => (
      this.props.dispatch(Actions.toggleExpanded(this.props.expanded))
    )
  }

  // 由于文字中的\r\n在dom中会换行，而在浏览器压缩成空格，所以这里将它每一行变成<p>标签
  renderTextWithBreakLine(text) {
    if (text) {
      let lines = text.split(/\r\n/)
      let formatted = lines.map((line) => {
        return (<p key={line}>{line}</p>)
      })
      return (<div>{formatted}</div>)
    }
  }

  render() {
    return (
      <div className="movieCard">
        <Card>
          <CardHeader
            title={this.props.movie.author}
            avatar=""
          />
          <CardMedia
            overlay={<CardTitle title={this.props.movie.title} />}
          >
            <img src={this.props.movie.img} />
          </CardMedia>
          <CardTitle title={this.props.movie.title} />
          <CardText>
            {this.renderTextWithBreakLine(this.props.movie.description)}
          </CardText>
          <CardActions>
            <Toggle
              toggled={this.props.expanded}
              onToggle={this.toggleExpanded}
              labelPosition="right"
              label="查看下载链接"
            />
          </CardActions>
          <CardText expandable={this.props.expanded}>
            <a href={this.props.movie.download_link}>{this.props.movie.download_link}</a>
          </CardText>
        </Card>
      </div>
    )
  }
}

MovieCardShow.need = [function (params) {
  return Actions.fetchMovie.bind(null, params.id)();
}]

function mapStateToProps(state, props) {
  let movie
  if (state.movie === undefined) {
    // 这里如果不是通过server端而是直接通过react-router的link过来的，通过reducer从movies中直接获取数据
    movie = getMovie(state, props.params.id)
  } else {
    movie = state.movie
  }
  return {
    expanded: state.expanded,
    movie: movie
  }
}

export default connect(mapStateToProps)(MovieCardShow)
