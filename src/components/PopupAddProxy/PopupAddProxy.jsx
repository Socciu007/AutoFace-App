import React from 'react'
import closePopup from "../../assets/pictures/icon-x.svg";
import PopupComponent from '../PopupComponent/PopupComponent';
import proxy from "../../assets/pictures/icon-proxy.svg";
import './style.scss'

const PopupAddProxy = ({typeProxy ,openAddProxy, handleCloseAdd, handleOpenProxyManage, onChangeTypeProxy}) => {
  return (
    <PopupComponent
              open={openAddProxy} 
              onClose={handleCloseAdd}
            >
              {
                <div className='modal'>
                  <div className='-add-proxys'>
                    <div className="-close-popup" onClick={handleCloseAdd}>
                      <img src={closePopup} alt="icon-x"></img>
                    </div>           
                    <h1>ADD PROXY</h1>
                    <p>Add new proxies to <b>2 profiles</b></p>
                    <div className='-add-proxys__type'>
                      <p>Connection type</p>
                      <div className='-add-proxys-nav'>
                        <div className='-add-proxys__type__text'>
                          <div className="-add-proxys__type__text__option">
                            <select
                              name="typeProxy"
                              onChange={onChangeTypeProxy}
                              value={typeProxy}
                            >
                              <option value="Without proxy">Without proxy</option>
                              <option value="Your Proxy">Your Proxy</option>
                              <option value="Free Proxy">Free Proxy</option>
                            </select>
                          </div>
                        </div>
                        <div className='-add-proxys__type__icon' onClick={handleOpenProxyManage}>
                          <img src={proxy} alt='icon-proxy'></img>
                        </div>
                      </div>
                    </div>
                    <div className='-add-proxys__type'>
                      <p>Proxy list</p>
                      <div className='-add-proxys-nav -list-proxys'>
                        <textarea name="" type="text"></textarea>
                        <div className='-form-instruct'>
                          <p style={{marginRight: '19px'}}><span>1</span>Enter the content here</p>
                          <p style={{marginRight: '19px'}}><span>2</span><b>Proxy format: </b>IP:Port:Username:Password</p>
                          <p><span>3</span>1 proxy/line</p>
                          <p ><span>4</span>The number of proxies should not be less or more than the number of profiles</p>
                        </div>
                        <div className='-list-proxys__save'>
                          Save
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </PopupComponent>
  )
}

export default PopupAddProxy