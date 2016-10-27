import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

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

// 这是一个fetch请求返回数据的store
let moviesStore = require("./../../stores/MoviesStore")

class MoviesGridList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
    this.getMovies(this.props.tags)
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(this.props.tags), JSON.stringify(nextProps.tags))
    if(JSON.stringify(this.props.tags) !== JSON.stringify(nextProps.tags)) {
      this.getMovies(nextProps.tags)
    }
  }

  getMovies(tags) {
    let self = this
    // 这里赋值给movies，由于没办法用return（那边是fetch，然后给res的），
    // 由于作用域的原因，也没有办法使用将外部变量作参数带入内部，然后内部赋值改变
    // 所以只能将外部变量做匿名函数内部的变量来回调处理，匿名函数的参数为另一个函数内部的值，扁平化，得画图才能明白，看起来绕，但是确实连贯的。
    // 这里当做【最外层】 ---调用---> getAllMovies ---调用---> callback匿名函数，（因为匿名函数做参数放在【最外层】）
    moviesStore.getAllMovies(tags, (data) => (self.setState({movies: data})))
  }

  render() {
    let title = (this.props.tags.length === 0 ? "电影" : `${this.props.tags}电影`)

    return (<div style={GridStyles.root}>
      <GridList cellHeight={400} padding={4} cols={4} style={GridStyles.gridList}>
        <Subheader>{title}</Subheader>
        { this.state.movies.map((movie) => (
          <GridTile
            key={movie.img}
            title={movie.title}
            subtitle={<span>by <b>{movie.author}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={movie.img} />
          </GridTile>
        )) }
      </GridList>
    </div>)
  }
}

export default MoviesGridList
