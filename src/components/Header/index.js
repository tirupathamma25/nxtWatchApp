import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BsSun} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import ReactPopup from '../ReactPopup'

import './index.css'

class Header extends Component {
  state = {
    changeTheme: true,
  }

  onClickChangeBtn = () => {
    this.setState(prevState => ({changeTheme: !prevState.changeTheme}))
  }

  render() {
    const {changeTheme} = this.state
    return (
      <nav className="header-nav-card">
        <ul className="header-nav-card">
          <Link to="/">
            <li className="list-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
                className="header-website-logo"
              />
            </li>
          </Link>

          <div className="profile-logout-card">
            <button
              type="button"
              onClick={this.onClickChangeBtn}
              className="theme-btn"
              data-testid="theme"
            >
              {changeTheme ? <FaMoon className="moon" /> : <BsSun />}
            </button>
            <li className="list-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
            </li>

            <ReactPopup />
          </div>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
