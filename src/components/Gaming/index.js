import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import GameItem from '../GameItem'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    GamingData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/gaming'
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
        id: eachTrending.id,

        thumbnailUrl: eachTrending.thumbnail_url,
        title: eachTrending.title,
        viewCount: eachTrending.view_count,
      }))
      this.setState({
        GamingData: formatterTrendingData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetryButton = () => {
    const {getGamingList} = this.state
    this.setState({getGamingList}, this.getGamingList)
  }

  renderGamItem = () => {
    const {GamingData} = this.state
    return (
      <div>
        <h1>Gaming</h1>
        <ul className="un-ordered-gaming">
          {GamingData.map(eachTrend => (
            <GameItem gameDetails={eachTrend} key={eachTrend.id} />
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
        We are having some trouble to comp your request.Please try again.
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

  renderApiStatusGameItemData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderGamItem()
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
          <div>{this.renderApiStatusGameItemData()}</div>
        </div>
      </div>
    )
  }
}

export default Gaming
