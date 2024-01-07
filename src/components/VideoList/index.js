import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoList extends Component {
  state = {
    videoData: [],
    apiStatus: apiConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideoList()
  }

  getVideoList = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiConstants.inProgress})
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      const formattedData = data.videos.map(eachVideo => ({
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({videoData: formattedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetryButton = () => {
    const {getVideoList} = this.state
    this.setState({getVideoList}, this.getVideoList)
  }

  renderNoSearchResult = () => (
    <div className="no-videos-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-videos"
      />
      <h1 className="failure-heading">No Search Results found</h1>
      <p className="failure-paragraph">
        Try different key words or remove search filter
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

  renderVideoList = () => {
    const {videoData, searchInput} = this.state
    const searchResult = videoData.filter(eachTitle =>
      eachTitle.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const randomSearchResult = searchResult.length > 0

    return (
      <div>
        {randomSearchResult ? (
          <ul className="un-ordered-list">
            {searchResult.map(eachItem => (
              <VideoItem videoDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          this.renderNoSearchResult()
        )}
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

  renderApiStatusVideoList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVideoList()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <div className="search-input-container">
          <input
            type="search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
            placeholder="Search"
            className="search-element"
          />
          <button
            type="button"
            className="search-button"
            data-testid="searchButton "
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
              alt="search"
              className="search"
            />
          </button>
        </div>
        {this.renderApiStatusVideoList()}
      </div>
    )
  }
}

export default VideoList
