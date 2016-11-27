import React from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {indigo200, indigo500, indigo900} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'

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
        <AppBar title="哩噜电影" onLeftIconButtonTouchTap={this.handleToggle} iconElementRight={this.renderUserLogin()}/>
        <div>
          <Drawer open={this.props.open} docked={false}>
            <MenuItem key={"关闭边栏"} onTouchTap={this.handleClose}>{"关闭边栏"}</MenuItem>
            {this.renderMenuItems()}
          </Drawer>
        </div>
      </div>
    )
  }

  renderUserLogin() {
    const { isAuthenticated, currentUser } = this.props.auth
    let loginBtn

    if (isAuthenticated) {
      loginBtn = (
        <IconMenu
          iconButtonElement={
            <IconButton><Avatar src="" /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem key={"Logout"} href='/users/logout'>{"登  出"}</MenuItem>
        </IconMenu>
      )
    } else {
      loginBtn = (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem key={"Login"} href='/users/login'>{"登  录"}</MenuItem>
          <MenuItem key={"Register"} href='/users/register'>{"注  册"}</MenuItem>
        </IconMenu>
      )
    }
    return <div>{ loginBtn }</div>
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

AppLayout.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(store) {
  console.log("mapStateToProps: ", store.auth)
  return {
    open: store.open,
    auth: store.auth
  }
}


/* 生成一个AppLayout容器组件
 * 这里可以使用redux的API
 * mapStateToProps作为参数，会自动根据state重新渲染组件
 */
export default connect(mapStateToProps)(AppLayout)
