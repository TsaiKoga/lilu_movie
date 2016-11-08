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

import { connect } from 'react-redux'
import * as Actions from './../../redux/actions/actions'

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

/* 这是一个AppLayout的UI组件
 * 这里面只能使用props，不能用redux的API
 */
class AppLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
    // 触发后dispatch立即执行内部action
    this.handleToggle = () => (
      this.props.dispatch(Actions.toggleDrawer(this.props.open))
    )
    this.handleClose = () => (
      this.props.dispatch(Actions.handleClose())
    )
  }

  renderMenuItems() {
    let self = this
    return(
      Tags.map((tagName) => (
        <MenuItem key={tagName} href={`/movies?tags=${tagName}`} >{tagName}</MenuItem>
      ))
    )
  }

  renderAppBar() {
    return (
      <div>
        <AppBar title="哩噜电影" onLeftIconButtonTouchTap={this.handleToggle} />
        <div>
          <Drawer open={this.props.open} docked={false}>
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
    const { dispatch, open } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={LayoutStyles.container}>
          {this.renderAppBar()}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

AppLayout.need = [function (params) {
  return Actions.handleClose.bind(null)();
}]

function mapStateToProps(store) {
  return {
    open: store.open
  }
}


/* 生成一个AppLayout容器组件
 * 这里可以使用redux的API
 * mapStateToProps作为参数，会自动根据state重新渲染组件
 */
export default connect(mapStateToProps)(AppLayout)
