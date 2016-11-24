import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { register } from '../../redux/actions/actions'

const style = {
  margin: 12,
};

class RegisterForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
      registerLabel: "注册",
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleRegister(e) {
    e.preventDefault()
    this.setState({errors: {}, isLoading: true, registerLabel: "注册中..."})
    this.props.register(this.state)
  }

  render() {
    const { name, email, password, errors, isLoading, registerLabel } = this.state
    return (
      <div className='userForm'>
        <form>
          <TextField name="name" ref="name" hintText="昵 称" floatingLabelText="昵 称" onChange={this.handleChange} />
          <br />

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

          <RaisedButton label={registerLabel} style={style} primary={true} disabled={isLoading} onTouchTap={this.handleRegister}/>
          <RaisedButton label="登 录" style={style} secondary={true} href="/users/login" />
        </form>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  register: React.PropTypes.func.isRequired
}

RegisterForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { register })(RegisterForm)
