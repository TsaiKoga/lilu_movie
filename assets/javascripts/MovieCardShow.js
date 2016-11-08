import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/actions'

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

function mapStateToProps(store) {
  return {
    expanded: store.expanded,
    movie: store.movie
  }
}

export default connect(mapStateToProps)(MovieCardShow)
