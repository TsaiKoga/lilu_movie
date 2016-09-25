/*
 * 这个文件用来渲染home页面内容
 */
require("./../stylesheets/style.css");

import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigo200, indigo500, indigo900} from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MovieGridList from './MovieGridList';
import AppBarDrawer from './AppBarDrawer';


injectTapEventPlugin();

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
});

const HomeStyles = {
  container: {
    paddingTop: 0,
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={HomeStyles.container}>
          <AppBarDrawer/>
          <MovieGridList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomePage;
