import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiX} from 'react-icons/bi'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import VideoList from '../VideoList'
import './index.css'

class Home extends Component {
  state = {
    isBanner: true,
  }

  onClickBanner = () => {
    this.setState({isBanner: false})
  }

  renderBannerVideoList = () => (
    <div className="banner-card" data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-logo"
          data-testid="banner"
        />
        <p className="banner-paragraph">
          Buy Nxt Watch Premium prepaid plan with UPI
        </p>
        <button type="button" className="get-it-now-btn">
          GET IT NOW
        </button>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={this.onClickBanner}
        data-testid="close"
      >
        <BiX className="delete-sign" />
        Delete
      </button>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We are having some trouble to comp your request.Please try again.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isBanner} = this.state
    return (
      <div>
        <Header />
        <div className="left-header-banner-video-list-card">
          <LeftHeader />
          <div
            className="light-banner-video-list-main-container"
            data-testid="home"
          >
            {isBanner ? this.renderBannerVideoList() : ''}

            <VideoList />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
