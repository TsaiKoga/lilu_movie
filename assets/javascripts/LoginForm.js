import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { login } from '../../redux/actions/actions'

const style = {
  margin: 12,
}

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: "",
      password: "",
      errors: {},
      loginLabel: "登 录",
      isLoading: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault()
    // const email = this.refs.email.getValue()
    // const password = this.refs.password.getValue()
    this.setState({errors: {}, isLoading: true, loginLabel: "登录中..."})
    this.props.login(this.state)
   }

  render() {
    const {email, password, errors, isLoading, loginLabel} = this.state
    return (
      <div className='userForm'>
        <form>
          <TextField name="email" ref="email" hintText="邮 箱" floatingLabelText="邮 箱" onChange={this.handleChange} />
          <br />

          <TextField
            name="password"
            ref="password"
            hintText="密 码"
            floatingLabelText="密 码"
            type="password"
            onChange={this.handleChange} />
          <br />

          <RaisedButton label={loginLabel} style={style} primary={true} disabled={isLoading} onTouchTap={this.handleLogin} />
          <RaisedButton label="注 册" style={style} secondary={true} href={"/users/register"} />
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm)
