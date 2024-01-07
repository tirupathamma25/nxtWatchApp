import {Link} from 'react-router-dom'
import './index.css'

const TrendingItem = props => {
  const {trendingDetails} = props
  const {
    name,
    profileImageUrl,
    title,
    viewCount,
    publishedAt,
    thumbnailUrl,
    id,
  } = trendingDetails

  return (
    <Link to={`videos/${id}`}>
      <li className="trend-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="trending-profile-image-text-card">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profileUrl"
          />
          <div className="title-name-view-count-card">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="view-count-published-card">
              <p className="view-count">{viewCount}</p>
              <p className="view-count">{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingItem
