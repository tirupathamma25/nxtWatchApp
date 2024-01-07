import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="input-label-card">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          onChange={this.onChangeUsername}
          value={username}
          className="input-element"
          id="username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    return (
      <div className="input-label-card">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        {showPassword ? (
          <input
            type="text"
            onChange={this.onChangePassword}
            value={password}
            className="input-element"
            id="password"
          />
        ) : (
          <input
            type="password"
            onChange={this.onChangePassword}
            value={password}
            className="input-element"
            id="password"
          />
        )}
      </div>
    )
  }

  renderShowPassword = () => {
    const {showPassword} = this.state
    return (
      <div className="checkbox-card">
        <input
          type="checkbox"
          onChange={this.onChangeShowPassword}
          value={showPassword}
          className="checkbox-element"
          id="showPassword"
        />
        <label htmlFor="showPassword" className="show-password">
          Show Password
        </label>
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-card" onSubmit={this.onSubmitForm}>
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            <div>{this.renderShowPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
