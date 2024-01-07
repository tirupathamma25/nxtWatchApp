import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import TrendingItem from '../TrendingItem'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/trending'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      const formatterTrendingData = data.videos.map(eachTrending => ({
        name: eachTrending.channel.name,
        profileImageUrl: eachTrending.channel.profile_image_url,
        id: eachTrending.id,
        publishedAt: eachTrending.published_at,
        thumbnailUrl: eachTrending.thumbnail_url,
        title: eachTrending.title,
        viewCount: eachTrending.view_count,
      }))
      this.setState({
        trendingData: formatterTrendingData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetryButton = () => {
    const {getTrendingList} = this.state
    this.setState({getTrendingList}, this.getTrendingList)
  }

  renderTrendList = () => {
    const {trendingData} = this.state
    return (
      <div>
        <h1>Trending</h1>
        <ul>
          {trendingData.map(eachTrend => (
            <TrendingItem trendingDetails={eachTrend} key={eachTrend.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We are having some trouble to complete your request.Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiStatusTrendingList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderTrendList()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="trend-list-card">
          <LeftHeader />
          <div>{this.renderApiStatusTrendingList()}</div>
        </div>
      </div>
    )
  }
}

export default Trending
