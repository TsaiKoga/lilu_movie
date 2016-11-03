import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "无名氏",
      email: "",
      password: ""
    }
  }

  render() {
    return (
      <div className='userForm'>
        <form method="POST" action="/users/sign_up">
          <TextField hintText="昵 称" floatingLabelText="昵 称" />
          <br />

          <TextField hintText="邮 箱" floatingLabelText="邮 箱" />
          <br />

          <TextField
            hintText="密 码"
            floatingLabelText="密 码"
            type="password" />
          <br />

          <RaisedButton label="提 交" primary={true} type="submit" />
        </form>
      </div>
    )
  }
}

export default RegisterForm
