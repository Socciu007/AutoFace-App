import { Switch } from 'antd';
import './style.scss';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/pictures/icon-edit.png';
import deleted from '../../../assets/pictures/icon-delete.svg';
import question from '../../../assets/pictures/icon-question.svg';
import x from '../../../assets/pictures/icon-x.svg';
import PopupProxyManage from '../../PopupHome/PopupProxyManage/PopupProxyManage';

const SettingProxy = ({
  data,
  keyList,
  editProxy,
  openProxyManage,
  openWriteText,
  handleOpenEdit,
  handleCloseEdit,
  handleOpenProxyManage,
  handleCloseProxyManage,
  handleOpenWriteText,
  handleAddProxy,
  onChangeAssignProxy,
  onChangeAPIProxy,
  settings,
  onChangeProxy,
  handleDeleteProxy,
  handleAddProxyFromManager,
}) => {
  const [proxyType, setProxyTpye] = useState('http');
  const [proxyString, setProxyString] = useState('');
  const [listProxy, setListProxy] = useState([]);

  useEffect(() => {
    setListProxy(data);
  }, [data]);
  const onChangeProxyType = (type) => {
    setProxyTpye(type);
  };

  const onchangeProxyString = (value) => {
    setProxyString(value);
  };

  const generateProxyStr = (proxy) => {
    let proxyStr = `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
      proxy.password ? ':' + proxy.password : ''
    }`;

    return proxyStr;
  };

  return (
    <div className="-settings-proxys">
      <div className="-container-proxys">
        <h2>PROXY SETTINGS</h2>
        <div className="-details-proxys">
          <div className="-list-proxys">
            <p>
              Proxy list {} ({listProxy?.length})
            </p>
            <div className="-info-list">
              <div className="-scroll-list">
                <ul>
                  {listProxy.length !== 0 &&
                    listProxy.map((proxy, index) => (
                      <li key={proxy.id}>
                        <div className="-key-proxys">
                          <p>{index + 1}</p>
                        </div>
                        {proxy.id === keyList && editProxy ? (
                          <div className="-action-proxys -action-proxys-active">
                            <input
                              onChange={(event) => {
                                onChangeProxy(event.target.value, proxy.id);
                              }}
                              defaultValue={generateProxyStr(proxy)}
                              type="text"
                            />
                            <div className="-action-icon-proxys">
                              <div className="-action-icon" onClick={() => handleCloseEdit(proxy.id)}>
                                <img src={x} alt="icon-x"></img>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="-action-proxys">
                            <span>{generateProxyStr(proxy)}</span>
                            <div className="-action-icon-proxys">
                              <div className="-action-icon" onClick={() => handleOpenEdit(proxy.id)}>
                                <img src={edit} alt="icon-edit"></img>
                              </div>
                              <div onClick={() => handleDeleteProxy(proxy.id)} className="-action-icon">
                                <img src={deleted} alt="icon-remove"></img>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="-add-Listproxys" style={{ marginLeft: '1.5rem' }}>
            <p>Add proxy</p>
            <div className="-add-proxys">
              <div className="-type-proxys">
                <div className="-type-proxys__nav">
                  <div className="-type-proxys__nav__select">
                    <select
                      defaultValue={proxyType}
                      onChange={(event) => {
                        onChangeProxyType(event.target.value);
                      }}
                      name="url"
                      className="-type-proxys__nav__select__details"
                    >
                      <option value="http">HTTP</option>
                      <option value="socks4">Socks 4</option>
                      <option value="socks5">Socks 5</option>
                      <option value="ssh">SSH</option>
                    </select>
                  </div>
                </div>
                <div className="-icon-proxys" onClick={handleOpenProxyManage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 2C0 0.895431 0.895431 0 2 0H13C14.1046 0 15 0.895431 15 2V4.75C15 5.85457 14.1046 6.75 13 6.75H2C0.89543 6.75 0 5.85457 0 4.75V2ZM4.5 3.375C4.5 3.99632 3.99632 4.5 3.375 4.5C2.75368 4.5 2.25 3.99632 2.25 3.375C2.25 2.75368 2.75368 2.25 3.375 2.25C3.99632 2.25 4.5 2.75368 4.5 3.375ZM6.375 4.5C6.99632 4.5 7.5 3.99632 7.5 3.375C7.5 2.75368 6.99632 2.25 6.375 2.25C5.75368 2.25 5.25 2.75368 5.25 3.375C5.25 3.99632 5.75368 4.5 6.375 4.5Z"
                      fill="#01162B"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 10.25C0 9.14543 0.895431 8.25 2 8.25H13C14.1046 8.25 15 9.14543 15 10.25V13C15 14.1046 14.1046 15 13 15H2C0.89543 15 0 14.1046 0 13V10.25ZM4.5 11.625C4.5 12.2463 3.99632 12.75 3.375 12.75C2.75368 12.75 2.25 12.2463 2.25 11.625C2.25 11.0037 2.75368 10.5 3.375 10.5C3.99632 10.5 4.5 11.0037 4.5 11.625ZM6.375 12.75C6.99632 12.75 7.5 12.2463 7.5 11.625C7.5 11.0037 6.99632 10.5 6.375 10.5C5.75368 10.5 5.25 11.0037 5.25 11.625C5.25 12.2463 5.75368 12.75 6.375 12.75Z"
                      fill="#01162B"
                    />
                  </svg>
                </div>
                <PopupProxyManage
                  defaultProxies={settings.proxies}
                  handleAddProxyFromManager={handleAddProxyFromManager}
                  openProxyManage={openProxyManage}
                  handleCloseProxyManage={handleCloseProxyManage}
                ></PopupProxyManage>
              </div>
              <div className="-info-add-proxys">
                <textarea
                  onChange={(event) => {
                    onchangeProxyString(event.target.value);
                  }}
                  value={proxyString}
                  className="-info-proxys"
                  onClick={handleOpenWriteText}
                ></textarea>
                <div className="-list-info">
                  <div className="-list-info__item">
                    <div className="-stt-info">
                      <p>
                        <span>1</span>
                        <div style={{ display: openWriteText ? 'none' : 'inline' }}>Enter the proxy here</div>
                      </p>
                    </div>
                  </div>
                  <div className="-list-info__item" style={{ marginTop: '10px' }}>
                    <div className="-stt-info">
                      <p>
                        <span>2</span>
                        <div style={{ display: openWriteText ? 'none' : 'inline' }}>
                          <b>Proxy format:</b> Host:Port:Username:Password
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
                <button className="-add" onClick={() => handleAddProxy(proxyString, proxyType)}>
                  ADD
                </button>
                <div className="-setting-proxys">
                  <Switch checked={settings.assignProxy} onChange={onChangeAssignProxy} width={32} height={20} />

                  <p>Assign proxy here to all selected profiles </p>
                  <img src={question} alt="question"></img>
                </div>
                <div className="-setting-proxys">
                  <Switch checked={settings.apiChange} onChange={onChangeAPIProxy} width={32} height={20} />

                  <p>
                    API change: Do not assign a proxy to the next profile if the IP address does not change
                    <img src={question} alt="question"></img>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingProxy;
