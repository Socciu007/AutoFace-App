import React from 'react'
import Popup from 'reactjs-popup'
import './style.scss'

const PopupComponent = (props) => {
  const {open, onClose, children, position} = props
  return (
    <Popup open={open} onClose={onClose} position={position} closeOnDocumentClick>
      {children}
    </Popup>
  )
}

export default PopupComponent