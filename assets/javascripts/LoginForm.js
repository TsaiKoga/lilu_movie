import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/actions'

const style = {
  margin: 12,
};

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("login");
  }

  render() {
    return (
      <div className='userForm'>
        <form action="/users/sign_in" method="POST" >
          <TextField hintText="昵 称" floatingLabelText="昵 称" />
          <br />

          <TextField
            hintText="密 码"
            floatingLabelText="密 码"
            type="password" />
          <br />

          <RaisedButton label="登 录" style={style} primary={true} onSubmit={this.handleLogin} />
          <RaisedButton label="注 册" style={style} secondary={true} href='/users/register'  />
        </form>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {}
}

export default connect(mapStateToProps)(LoginForm)
