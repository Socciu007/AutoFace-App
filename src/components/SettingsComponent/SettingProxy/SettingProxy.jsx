import { Select, Switch } from 'antd';
import './style.scss';
import React, { useState } from 'react';
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
  onChange,
}) => {
  const [typeProxy, setTypeProxy] = useState('');
  const handleOnchangeTypeProxy = (value) => {
    setTypeProxy(value);
  };
  return (
    <div className="-settings-proxys">
      <div className="-container-proxys">
        <h2>PROXY SETTINGS</h2>
        <div className="-details-proxys">
          <div className="-list-proxys">
            <p>
              Proxy list {} ({data?.length})
            </p>
            <div className="-info-list">
              <div className="-scroll-list">
                <ul>
                  {data.length !== 0 &&
                    data.map((proxy, key) => (
                      <li key={key}>
                        <div className="-key-proxys">
                          <p>{proxy.key}</p>
                        </div>
                        {proxy?.key === keyList && editProxy ? (
                          <div className="-action-proxys -action-proxys-active">
                            <span>{proxy.proxy}</span>
                            <div className="-action-icon-proxys">
                              <div className="-action-icon" onClick={() => handleCloseEdit(proxy?.key)}>
                                <img src={x} alt="icon-x"></img>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="-action-proxys">
                            <span>{proxy.proxy}</span>
                            <div className="-action-icon-proxys">
                              <div className="-action-icon" onClick={() => handleOpenEdit(proxy?.key)}>
                                <img src={edit} alt="icon-edit"></img>
                              </div>
                              <div className="-action-icon">
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

          {!editProxy ? (
            <div className="-add-Listproxys" style={{ marginLeft: '1.5rem' }}>
              <p>Add proxy</p>
              <div className="-add-proxys">
                <div className="-type-proxys">
                  <div className="-type-proxys__nav">
                    <div className="-type-proxys__nav__select">
                      <Select
                        id="typeProfile"
                        className="-type-proxys__nav__select__details"
                        value={typeProxy}
                        onChange={handleOnchangeTypeProxy}
                        bordered={false}
                        options={[
                          {
                            value: 'HTTP',
                            label: 'HTTP',
                          },
                          {
                            value: 'socks_4',
                            label: 'Socks 4',
                          },
                          {
                            value: 'socks_5',
                            label: 'Socks 5',
                          },
                          {
                            value: 'ssh',
                            label: 'SSH',
                          },
                          // {
                          //   value: 'TM',
                          //   label: 'TM',
                          // },
                          // {
                          //   value: 'Tinsoft',
                          //   label: 'Tinsoft',
                          // },
                        ]}
                      />
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
                    openProxyManage={openProxyManage}
                    handleCloseProxyManage={handleCloseProxyManage}
                  ></PopupProxyManage>
                </div>
                <div className="-info-add-proxys">
                  <textarea
                    id="textAddProxy"
                    className="-info-proxys"
                    name="textAddProxy"
                    onChange={(e) => {
                      // const textarea = document.getElementById('textAddProxy');
                      // const lines = textarea.value.split('\n');

                      // const numberedLines = lines.map((line, index) => {
                      //   if (!/^\d+\./.test(line)) {
                      //     return `${index + 1}. ${line}`;
                      //   }
                      //   return line;
                      // });

                      // textarea.value = numberedLines.join('\n');
                      console.log(e.target.value);
                    }}
                    onClick={handleOpenWriteText}
                  ></textarea>
                  <div className="-list-info" onClick={handleOpenWriteText}>
                    <p>
                      <span>1</span>
                      <div style={{ display: openWriteText ? 'none' : 'inline' }}>Enter the proxy here</div>
                    </p>

                    <p>
                      <span>2</span>
                      <div style={{ display: openWriteText ? 'none' : 'inline' }}>
                        <b>Proxy format:</b> Host:Port:Username:Password
                      </div>
                    </p>
                  </div>
                  <button className="-add" onClick={handleAddProxy}>
                    ADD
                  </button>
                  <div className="-setting-proxys">
                    <Switch defaultChecked onChange={onChange} />
                    <p>Assign proxy here to all selected profiles </p>
                    <div className="-hover-question">
                      <img src={question} alt="question"></img>
                      <div className="-hover-question__hide">
                        <p>Assign proxy here to all selected profiles</p>
                      </div>
                    </div>
                  </div>
                  <div className="-setting-proxys">
                    <Switch defaultChecked onChange={onChange} />
                    <p>
                      API change: Do not assign a proxy to the next profile if the IP address does not change
                      <div className="-hover-question">
                        <img src={question} alt="question"></img>
                        <div className="-hover-question__hide">
                          <p>Assign proxy here to all selected profiles</p>
                        </div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="-add-Listproxys" style={{ marginLeft: '1.5rem' }}>
              <p>Edit proxy</p>
              <div className="-add-proxys">
                <div className="-type-proxys -edit-proxys">
                  <div className="-type-proxys__nav">
                    <div className="-type-proxys__nav__select">
                      <Select
                        id="typeProfile"
                        className="-type-proxys__nav__select__details"
                        value={typeProxy}
                        onChange={handleOnchangeTypeProxy}
                        bordered={false}
                        options={[
                          {
                            value: 'HTTP',
                            label: 'HTTP',
                          },
                          {
                            value: 'socks_4',
                            label: 'Socks 4',
                          },
                          {
                            value: 'socks_5',
                            label: 'Socks 5',
                          },
                          {
                            value: 'ssh',
                            label: 'SSH',
                          },
                          // {
                          //   value: 'TM',
                          //   label: 'TM',
                          // },
                          // {
                          //   value: 'Tinsoft',
                          //   label: 'Tinsoft',
                          // },
                        ]}
                      />
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
                    openProxyManage={openProxyManage}
                    handleCloseProxyManage={handleCloseProxyManage}
                  ></PopupProxyManage>
                </div>
                <div className="-type-proxys -edit-proxy">
                  <p>API key</p>
                  <div className="-type-proxys__nav -type-proxys__apikey">
                    <div className="-type-proxys__nav__select select">
                      <input value={'q345346545656y56y56u567u647'}></input>
                    </div>
                  </div>
                </div>
                <div className="-type-proxys -edit-proxy">
                  <p>Location</p>
                  <div className="-type-proxys__apikey -type-proxys__nav location">
                    <div className="-type-proxys__nav__select">
                      <Select
                        className="-type-proxys__nav__select__details"
                        value={'Location'}
                        // onChange={handleOnchangeTypeProxy}
                        bordered={false}
                        options={[
                          {
                            value: 'location',
                            label: 'location',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="-setting-proxys">
                  <Switch defaultChecked onChange={onChange} />
                  <p>Change IP address in each running</p>
                </div>
                <button className="-add -save" onClick={handleAddProxy}>
                  SAVE
                </button>
                <div className="-setting-proxys">
                  <Switch defaultChecked onChange={onChange} />
                  <p>Assign proxy here to all selected profiles </p>
                  <div className="-hover-question">
                    <img src={question} alt="question"></img>
                    <div className="-hover-question__hide">
                      <p>Assign proxy here to all selected profiles</p>
                    </div>
                  </div>
                </div>
                <div className="-setting-proxys">
                  <Switch defaultChecked onChange={onChange} />
                  <p>
                    API change: Do not assign a proxy to the next profile if the IP address does not change
                    <div className="-hover-question">
                      <img src={question} alt="question"></img>
                      <div className="-hover-question__hide">
                        <p>Assign proxy here to all selected profiles</p>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingProxy;
