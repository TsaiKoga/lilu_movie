require("./../stylesheets/style.css");

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


const App = () => (
  <MuiThemeProvider>
    <AppBar title="哩噜电影" />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
