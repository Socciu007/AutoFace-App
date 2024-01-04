import React from 'react';
import './style.scss';
import closePopup from '../../../assets/pictures/icon-x.svg';
import PopupComponent from '../PopupComponent/PopupComponent';

const PopupDisplaySetting = ({ openDisplaySetting, handleCloseDisplaySetting }) => {
  return (
    <PopupComponent open={openDisplaySetting} onClose={handleCloseDisplaySetting}>
      {
        <div className="layout-display-setting">
          <div className="layout-display-setting__top">
            <div className="layout-display-setting__top__title">
              <div className="layout-display-setting__top__title__close" onClick={handleCloseDisplaySetting}>
                <img src={closePopup} alt="icon-x"></img>
              </div>
              <p>DISPLAY SETTINGS</p>
            </div>
            <ul>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Profile</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>UID</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Name</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Date of birth</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Friends</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Group</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Sex</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Password</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Email</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Email's password</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Status</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Proxy</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Tag</p>
              </li>
              <li>
                <span>
                  <input type="checkbox"></input>
                </span>
                <p>Folder</p>
              </li>
            </ul>
          </div>
          <div className="layout-display-setting__save">
            <button> Save </button>
          </div>
          {/* <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp> */}
        </div>
      }
    </PopupComponent>
  );
};

export default PopupDisplaySetting;
