import {Link} from 'react-router-dom'
import './index.css'

const GameItem = props => {
  const {gameDetails} = props
  const {
    title,
    viewCount,

    thumbnailUrl,
    id,
  } = gameDetails

  return (
    <Link to={`/videos/${id}`}>
      <li className="video-list-item">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="game-thumbnail"
        />
        <div className="profile-image-text-card">
          <p className="title">{title}</p>

          <p className="view-count">{viewCount}</p>
        </div>
      </li>
    </Link>
  )
}

export default GameItem
