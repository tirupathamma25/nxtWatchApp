import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire, FaAlignLeft} from 'react-icons/fa'
import {GiRoyalLove} from 'react-icons/gi'

import './index.css'

const LeftHeader = () => (
  <div className="left-header-container">
    <div className="home-trend-gam-card">
      <div className="home-list-card">
        <IoMdHome />
        <Link to="/">
          <li className="home-list">Home</li>
        </Link>
      </div>
      <div className="home-list-card">
        <FaFire />
        <Link to="/trending">
          <li className="home-list">Trending</li>
        </Link>
      </div>
      <div className="home-list-card">
        <GiRoyalLove />
        <Link to="/gaming">
          <li className="home-list">Gaming</li>
        </Link>
      </div>
      <div className="home-list-card">
        <FaAlignLeft />
        <Link to="/saved-videos">
          <li className="home-list">Saved videos</li>
        </Link>
      </div>
    </div>

    <div className="contact-logo-card">
      <p className="contact-heading">CONTACT US</p>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="facebook-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="facebook-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="facebook-logo"
        />
      </div>
      <p className="contact-heading">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)
export default LeftHeader
