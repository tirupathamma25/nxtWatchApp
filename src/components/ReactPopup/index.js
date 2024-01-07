import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import Cookies from 'js-cookie'

const ReactPopUp = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="logout-button">
          Logout
        </button>
      }
      className="popup-content"
    >
      <p className="popup-paragraph">Are you sure, you want to logout</p>
      <div>
        <button type="button" className="cancel-button" data-testid="close">
          Cancel
        </button>
        <button
          type="button"
          onClick={onClickLogout}
          className="confirm-button"
        >
          Confirm
        </button>
      </div>
    </Popup>
  )
}
export default ReactPopUp
