import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {
    name,
    profileImageUrl,
    title,
    viewCount,
    publishedAt,
    thumbnailUrl,
    id,
  } = videoDetails

  return (
    <Link to={`/videos/${id}`}>
      <li className="video-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="profile-image-text-card">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profileUrl"
          />
          <div className="title-name-view-count-card">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="view-count-published-card">
              <p className="view-count">{viewCount} views</p>
              <p className="view-count">{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
