import React, { useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import PopupComponent from '../PopupComponent/PopupComponent';
import proxy from '../../../assets/pictures/icon-proxy.svg';
import './style.scss';
import { Select } from 'antd';
// import { display } from '@mui/system';

const PopupAddProxy = ({ openAddProxy, handleCloseAdd, handleOpenProxyManage }) => {
  const [openWriteText, setOpenWriteText] = useState(false);
  const [typeProxy, setTypeProxy] = useState('');
  const handleWriteText = () => {
    setOpenWriteText(true);
  };
  const onChangeTypeProxy = (value) => {
    setTypeProxy(value);
  };
  return (
    <PopupComponent open={openAddProxy} onClose={handleCloseAdd}>
      {
        <div className="modal">
          <div className="-add-proxys">
            <div className="-close-popup" onClick={handleCloseAdd}>
              <img src={closePopup} alt="icon-x"></img>
            </div>
            <h1>ADD PROXY</h1>
            <p>
              Add new proxies to <b>2 profiles</b>
            </p>
            <div className="-add-proxys__type">
              <p>Connection type</p>
              <div className="-add-proxys-nav">
                <div className="-add-proxys__type__text">
                  <Select
                    id="typeProxy"
                    className="-add-proxys__type__text__option"
                    name="typeProxy"
                    value={typeProxy}
                    onChange={onChangeTypeProxy}
                    bordered={false}
                    zIndexPopup={100000}
                    options={[
                      {
                        value: 'withoutProxy',
                        label: 'Without proxy',
                      },
                      {
                        value: 'httpProxy',
                        label: 'HTTP Proxy',
                      },
                      {
                        value: 'socks4Proxy',
                        label: 'Socks4 Proxy',
                      },
                      {
                        value: 'socks5Proxy',
                        label: 'Socks5 Proxy',
                      },
                      {
                        value: 'sshProxy',
                        label: 'SSH Proxy',
                      },
                    ]}
                  />
                </div>
                <div className="-add-proxys__type__icon" onClick={handleOpenProxyManage}>
                  <img src={proxy} alt="icon-proxy"></img>
                </div>
              </div>
            </div>
            <div className="-add-proxys__type">
              <p>Proxy list</p>
              <div className="-add-proxys-nav -list-proxys">
                <textarea name="" type="text" onClick={handleWriteText}></textarea>
                <div className="-form-instruct" onClick={handleWriteText}>
                  <p>
                    <span>1</span>
                    <div style={{ display: openWriteText ? 'none' : 'inline' }}>Enter the content here</div>
                  </p>
                  <p>
                    <span>2</span>
                    <div style={{ display: openWriteText ? 'none' : 'inline' }}>
                      <b>Proxy format: </b>IP:Port:Username:Password
                    </div>
                  </p>
                  <p>
                    <span>3</span>
                    <div style={{ display: openWriteText ? 'none' : 'inline' }}>1 proxy/line</div>
                  </p>
                  <p>
                    <span>4</span>
                    <div style={{ display: openWriteText ? 'none' : 'inline' }}>
                      The number of proxies should not be less or more than the number of profiles
                    </div>
                  </p>
                </div>
                <div className="-list-proxys__save">Save</div>
              </div>
            </div>
          </div>
        </div>
      }
    </PopupComponent>
  );
};

export default PopupAddProxy;
