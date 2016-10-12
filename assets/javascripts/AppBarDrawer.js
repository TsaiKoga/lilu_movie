import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const Tags = [
  "悬疑",
  "惊悚",
  "爱情",
  "科幻",
  "动作",
  "喜剧"
];

class AppBarDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = () => (
      this.setState({open: !this.state.open})
    );
    this.handleClose = () => (
      this.setState({open: false})
    );
  }

  render() {
    return (
      <div>
        <AppBar title="哩噜电影" onLeftIconButtonTouchTap={this.handleToggle} />
        <div>
          <Drawer open={this.state.open} docked={false}>
            <MenuItem key={"关闭边栏"} onTouchTap={this.handleClose}>{"关闭边栏"}</MenuItem>
            { Tags.map((tagName) => (
              <MenuItem key={tagName} linkButton={true} href={"/movies?tags=" + tagName} >{tagName}</MenuItem>
            ))}
          </Drawer>
        </div>
      </div>
    );
  }
};

export default AppBarDrawer;
