import Header from '../Header'
import LeftHeader from '../LeftHeader'

const NotFound = () => (
  <div>
    <Header />
    <div className="left-header-banner-video-list-card">
      <LeftHeader />
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="failure-view"
        />
        <h1 className="failure-heading">Page Not Found</h1>
        <p className="failure-paragraph">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
