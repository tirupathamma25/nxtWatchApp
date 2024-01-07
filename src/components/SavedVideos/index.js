import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import LeftHeader from '../LeftHeader'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideos extends Component {
  state = {
    videoItemData: [],

    isSave: false,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  getVideoItemData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const fetchedData = {
        name: data.video_details.channel.name,

        id: data.video_details.id,
        publishedAt: data.video_details.published_at,

        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoItemData: fetchedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickChangeDisLike = () => {
    this.setState(prevState => ({
      isDisLike: !prevState.isDisLike,
    }))
  }

  onClickChangeLike = () => {
    this.setState(prevState => ({
      isLike: !prevState.isLike,
    }))
  }

  onClickChangeSave = () => {
    this.setState(prevState => ({isSave: !prevState.isSave}))
  }

  onClickRetryButton = () => {
    const {getVideoItemData} = this.state
    this.setState({getVideoItemData}, this.getVideoItemData)
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

  renderNoSavedVideos = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="failure-view"
      />
      <h1 className="failure-heading">No saved videos found</h1>
      <p className="failure-paragraph">
        You can save your videos while watching them
      </p>
    </div>
  )

  renderSavedItem = () => {
    const {videoItemData} = this.state
    const {
      name,

      publishedAt,
      thumbnailUrl,
      title,
      viewCount,
    } = videoItemData
    return (
      <div>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-video-item"
        />
        <div>
          <p className="video-item-title">{title}</p>
          <p className="name">{name}</p>
          <div>
            <p className="view-count">{viewCount} views</p>
            <p className="view-count">{publishedAt}</p>
          </div>
        </div>
      </div>
    )
  }

  renderSavedVideoItemDetails = () => {
    const {isSave} = this.state

    return <div>{isSave ? this.renderSavedItem() : ''}</div>
  }

  renderApiStatusSavedVideoItemDetailsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSavedVideoItemDetails()
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
        <div className="left-header-banner-video-list-card">
          <LeftHeader />
          {this.renderApiStatusSavedVideoItemDetailsList()}
        </div>
      </div>
    )
  }
}

export default SavedVideos
