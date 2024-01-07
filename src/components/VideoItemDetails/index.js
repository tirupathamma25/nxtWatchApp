import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {FaTasks} from 'react-icons/fa'

import Header from '../Header'
import LeftHeader from '../LeftHeader'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItemData: [],
    isLike: false,
    isDisLike: false,
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
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,

        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        description: data.video_details.description,
        videoUrl: data.video_details.video_url,
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
        We are having some trouble to complete your request. Please try again.
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

  renderVideoItemDetails = () => {
    const {videoItemData, isLike, isDisLike, isSave} = this.state
    const likeButtonClassName = isLike ? 'on-click-change-like' : 'like-button'
    const disLikeButtonClassName = isDisLike
      ? 'on-click-change-like'
      : 'like-button'
    const saveButtonClassName = isSave ? 'on-click-change-like' : 'like-button'
    const saveText = isSave ? 'Saved' : 'Save'
    const {
      name,
      profileImageUrl,
      publishedAt,

      title,
      viewCount,
      subscriberCount,
      description,
      videoUrl,
    } = videoItemData
    return (
      <div>
        <div className="video-item-container">
          <ReactPlayer url={videoUrl} className="thumbnail-video-item" />

          <p className="video-item-title">{title}</p>
          <div className="view-count-like-buttons-card">
            <div className="view-count-published-card">
              <p className="view-count">{viewCount} views</p>
              <p className="view-count">{publishedAt}</p>
            </div>

            <div>
              <button
                type="button"
                data-testid="videoItemDetails"
                className={likeButtonClassName}
                onClick={this.onClickChangeLike}
              >
                <BiLike /> Like
              </button>
              <button
                type="button"
                data-testid="videoItemDetails"
                className={disLikeButtonClassName}
                onClick={this.onClickChangeDisLike}
              >
                <BiDislike /> Dislike
              </button>
              <button
                type="button"
                data-testid="videoItemDetails"
                className={saveButtonClassName}
                onClick={this.onClickChangeSave}
              >
                <FaTasks /> {saveText}
              </button>
            </div>
          </div>

          <hr />
          <div>
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="profileUrl"
            />
            <div>
              <p className="name">{name}</p>
              <p className="name">{subscriberCount} subscribers</p>
            </div>
          </div>
          <p className="view-count">{description}</p>
        </div>
      </div>
    )
  }

  renderApiStatusVideoItemDetailsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVideoItemDetails()
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
          {this.renderApiStatusVideoItemDetailsList()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
