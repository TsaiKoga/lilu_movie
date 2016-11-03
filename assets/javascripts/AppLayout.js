require("./../stylesheets/style.css")
import React from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {indigo200, indigo500, indigo900} from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin'

import MoviesGridList from './MoviesGridList'
import MovieCardShow from './MovieCardShow'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo900,
    primary3Color: indigo200,
  },
}, {
  avatar: {
    borderColor: null,
  }
})

const LayoutStyles = {
  container: {
    paddingTop: 0,
    margin: 0,
  },
}

const Tags = [
  "悬疑",
  "惊悚",
  "爱情",
  "科幻",
  "动作",
  "喜剧"
]

class AppLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: [],
      movieId: null
    }
    this.handleToggle = () => (
      this.setState({open: !this.state.open})
    )
    this.handleClose = () => (
      this.setState({open: false})
    )
    this.setMovieTags = (tagName) => (
      this.setState({tags: tagName, movieId: null})
    )
  }

  setMovieId(movieId) {
    // ES6: 类中的 this 默认指向class的实例,当在函数外部调用它时，this会指向该方法运行时所在的环境；
    // 这里的因为render之后被点击调用，在外部渲染后点击this为外部,所以在外部必须绑定这个类的实例this；
    this.setState({movieId: movieId})
  }

  renderMenuItems() {
    let self = this
    return(
      Tags.map((tagName) => (
        // 这里this.setMovieTags无法使用event.target，因为用的是原始的dom节点,所以这里使用bind带参数
        <MenuItem key={tagName} onTouchTap={this.setMovieTags.bind(self, tagName)} >{tagName}</MenuItem>
      ))
    )
  }

  renderAppBar() {
    return (
      <div>
        <AppBar title="哩噜电影" onLeftIconButtonTouchTap={this.handleToggle} />
        <div>
          <Drawer open={this.state.open} docked={false}>
            <MenuItem key={"关闭边栏"} onTouchTap={this.handleClose}>{"关闭边栏"}</MenuItem>
            {this.renderMenuItems()}
            <MenuItem key={"Login"} href='/users/login'>{"登录"}</MenuItem>
            <MenuItem key={"Register"} href='/users/register'>{"注册"}</MenuItem>
          </Drawer>
        </div>
      </div>
    )
  }

  render() {
    let self = this
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={LayoutStyles.container}>
          {this.renderAppBar()}
          {this.state.movieId ? <MovieCardShow movieId={this.state.movieId} /> : <MoviesGridList tags={this.state.tags} callbackParent={this.setMovieId.bind(this)}/>}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AppLayout
