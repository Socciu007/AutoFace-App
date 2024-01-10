import React, { useEffect, useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import PopupComponent from '../PopupComponent/PopupComponent';
import proxy from '../../../assets/pictures/icon-proxy.svg';
import './style.scss';
import SnackbarApp from '../../Alert';
import { storageProfiles } from '../../../common/const.config';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// import { Select } from 'antd';
import { MenuItem, Select } from '@mui/material';
import { dbSetLocally } from '../../../sender';

const PopupAddProxy = ({
  profilesSelected,
  openAddProxy,
  handleCloseAdd,
  handleOpenProxyManage,
  dataProfiles,
  getProfiles,
  postAlert,
}) => {
  const [proxyType, setProxyType] = useState('http');
  const [proxyString, setProxyString] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const handleWriteText = () => {
    document.getElementById('proxyString').focus();
  };

  const onChangeProxyType = (e) => {
    setProxyType(e.target.value);
  };

  const onchangeProxyString = (value) => {
    setProxyString(value);
  };

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${proxyString ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const changeProxy = async () => {
    if (proxyString !== '') {
      const listProxy = [];
      const listProxyString = proxyString.split('\n');
      listProxyString.forEach((proxy) => {
        if (proxy.includes(':')) {
          const host = proxy.split(':')[0];
          const port = proxy.split(':')[1];
          const username = proxy.split(':')[2] ? proxy.split(':')[2] : '';
          const password = proxy.split(':')[3] ? proxy.split(':')[3] : '';
          listProxy.push({
            host,
            port,
            username,
            password,
            mode: proxyType,
          });
        }
      });
      if (listProxy.length < profilesSelected.length) {
        setMessage(`Enter all ${profilesSelected.length} proxies!`);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        for (let i = 0; i < profilesSelected.length; i++) {
          const res = await apiUpdateProfiles(profilesSelected[i].id, listProxy[i], profilesSelected[i].browserSource);
          if (res && res.success && res.data.code == 1) {
            const index = dataProfiles.findIndex((e) => e.id === profilesSelected[i].id);
            const newData = [...dataProfiles];
            newData[index].proxy = res.data.data.proxy;
            await dbSetLocally(storageProfiles, newData);
          }
        }
        getProfiles();
        handleCloseAdd();
        setTimeout(() => {
          postAlert(`Add proxy to profiles success!`, 'success', 4000);
        }, 500);
      }
    } else {
      setMessage('Please type proxies!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
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
              Add new proxies to{' '}
              <b>
                {profilesSelected.length} {profilesSelected.length === 1 ? 'profile' : 'profiles'}
              </b>
            </p>
            <div className="-add-proxys__type">
              <p>Connection type</p>
              <div className="-add-proxys-nav">
                <Select
                  name="proxyType"
                  className="-add-proxys-nav__select -add-proxys-nav__details"
                  onChange={onChangeProxyType}
                  value={proxyType}
                >
                  <MenuItem value="http">HTTP</MenuItem>
                  <MenuItem value="socks4">Socks 4</MenuItem>
                  <MenuItem value="socks5">Socks 5</MenuItem>
                  <MenuItem value="ssh">SSH</MenuItem>
                  <MenuItem value="without">Without</MenuItem>
                </Select>
                {/* <Select
                  name="proxyType"
                  className="-add-proxys-nav__select -add-proxys-nav__details"
                  onChange={onChangeProxyType}
                  value={proxyType}
                  bordered={false}
                  options={[
                    {
                      value: 'https://mbasic.facebook.com',
                      label: 'https://mbasic.facebook.com',
                    },
                  ]}
                /> */}

                <div className="-add-proxys__type__icon" onClick={handleOpenProxyManage}>
                  <img src={proxy} alt="icon-proxy"></img>
                </div>
              </div>
            </div>
            <div className="-add-proxys__type">
              <p>Proxy list</p>
              <div className="-add-proxys-nav -list-proxys">
                <div className="keywordText">
                  <Editor
                    value={proxyString}
                    onValueChange={onchangeProxyString}
                    highlight={(proxyString) => hightlightWithLineNumbers(proxyString, languages.js)}
                    padding={15}
                    onClick={handleWriteText}
                    className="editor"
                    textareaId="proxyString"
                  />
                </div>

                <div
                  className="placeholder"
                  onClick={handleWriteText}
                  style={{ display: proxyString ? 'none' : 'inline' }}
                >
                  <p>
                    <span>1</span>
                    <div>Enter the content here</div>
                  </p>
                  <p>
                    <span>2</span>
                    <div>
                      <span style={{ opacity: 1, fontWeight: 700 }}>Proxy format: </span>IP:Port:Username:Password
                    </div>
                  </p>
                  <p>
                    <span>3</span>
                    <div>1 proxy/line</div>
                  </p>
                  <p>
                    <span>4</span>
                    <div>The number of proxies should not be less or more than the number of profiles</div>
                  </p>
                </div>
                <div onClick={changeProxy} className="-list-proxys__save">
                  Save
                </div>
              </div>
            </div>
          </div>
          <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
        </div>
      }
    </PopupComponent>
  );
};

export default PopupAddProxy;
