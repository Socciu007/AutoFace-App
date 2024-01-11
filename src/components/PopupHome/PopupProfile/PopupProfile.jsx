import React, { useEffect, useState } from 'react';

import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';
import { storageProfiles } from '../../../common/const.config';
import SnackbarApp from '../../Alert';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import { createProfile, dbGetLocally, dbSetLocally } from '../../../sender';

const PopupProfile = ({ openProfiles, handleCloseProfiles, onAddProfile }) => {
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [loading, setLoading] = useState(false);

  const addProfiles = async () => {
    if (loading) return;
    if (textContent == '') {
      return postAlert('The Account field is required');
    }

    let newProfiles = [];
    const accounts = [];
    const proxies = [];
    values.text.forEach((e, index) => {
      const uid = e.split('|')[0];
      const password = e.split('|')[1];
      const recoveryEmail = e.split('|')[2] ? e.split('|')[2] : '';
      const recoveryPassword = e.split('|')[3] ? e.split('|')[3] : '';
      const cookies = e.split('|')[4] ? e.split('|')[4] : '';
      const token = e.split('|')[5] ? e.split('|')[5] : '';
      if (uid && uid !== '' && password && password !== '') {
        accounts.push({
          uid,
          password,
          recoveryEmail,
          recoveryPassword,
          cookies,
          token,
          status: 'ready',
          tag: values.isTag && values.tag.split(',')[index] ? values.tag.split(',')[index] : '',
        });
      }
    });
    values.proxy.forEach((e) => {
      const host = e.split(':')[0];
      const port = e.split(':')[1];
      const username = e.split(':')[2] ? e.split(':')[2] : '';
      const password = e.split(':')[3] ? e.split(':')[3] : '';
      if (host && host !== '' && port && port !== '') {
        proxies.push({
          host,
          port,
          username,
          password,
          mode: values.option,
        });
      }
    });
    if (accounts.length) {
      setLoading(true);
      const users = await dbGetLocally(storageProfiles);
      if (users && users.length) newProfiles = [...users];

      for (let i = 0; i < accounts.length; i++) {
        let proxy = {
          host: '',
          port: 80,
          username: '',
          password: '',
        };
        if (values.isProxy) {
          proxy = proxies[i % proxies.length]
            ? proxies[i % proxies.length]
            : {
                host: '',
                port: 80,
                username: '',
                password: '',
              };
        }
        const res = await createProfile(accounts[i].uid, proxy);
        if (res && res.code == 1) {
          newProfiles.push({ ...res.result, ...accounts[i] });
        }
      }

      await dbSetLocally(storageProfiles, newProfiles);
      onAddProfile();
      setLoading(false);
    } else {
      return postAlert('The Account field is required');
    }
  };

  const postAlert = (message, status = 'warning', duration = 3000) => {
    setStatusMessage(status);
    setMessage(message);
    setTimeout(() => {
      setMessage('');
      setStatusMessage('warning');
    }, duration);
  };

  const initialValues = {
    text: [],
    option: 'http',
    proxy: [],
    tag: [],
    isTag: false,
    isProxy: false,
  };
  const [values, setValues] = useState(initialValues);
  const [textContent, setTextContent] = useState('');
  const [proxyContent, setProxyContent] = useState('');
  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const handleDivClick = () => {
    document.getElementById('codeArea').focus();
  };
  const handleDivClickProxy = () => {
    document.getElementById('textareaProxy').focus();
  };
  useEffect(() => {
    if (textContent.length) {
      setValues({ ...values, text: textContent.split('\n') });
    }
  }, [textContent]);
  useEffect(() => {
    if (proxyContent.length) {
      setValues({ ...values, proxy: proxyContent.split('\n') });
    }
  }, [proxyContent]);
  const changeOption = (value) => {
    setValues({ ...values, option: value });
  };
  const handleChangeTag = (value) => {
    setValues({ ...values, isTag: value });
  };
  const handleChangeTextTag = (value) => {
    setValues({ ...values, tag: value });
  };
  const handleChangeProxy = (value) => {
    setValues({ ...values, isProxy: value });
  };
  const makeCopy = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    flexShrink: '0',
    zIndex: '99999',
    margin: '0',
    overflow: 'inherit !important',
  };

  const overlay = {
    background: 'rgba(255,255,255,0.5)',
  };
  const MuiDialogPaper = {
    width: '1163px',
    height: '679px',
    maxHeight: '679px !important',
    minWidth: '1163px !important',
    color: '#01162b !important',
  };
  return (
    <Dialog
      open={openProfiles}
      onClose={handleCloseProfiles}
      sx={{
        '& .MuiPaper-root': makeCopy,
        '& .MuiBackdrop-root': overlay,
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPaper,
      }}
    >
      <div className="-layout-choose-profile">
        <div className="-layout-choose-profile__container">
          <div className="-nav-scripts">
            <div className="-nav-scripts__header">
              <div
                className="-nav-scripts__header__close"
                onClick={() => {
                  if (!loading) {
                    handleCloseProfiles();
                  }
                }}
              >
                <img src={closePopup} alt="icon-x"></img>
              </div>
              <h1>NEW PROFILES</h1>
            </div>
            <div className="-wrapper-option-profiles -nav-scripts__btn">
              <button onClick={addProfiles}>ADD</button>
            </div>
          </div>
          <div className="scrollable-container">
            <div className="newProfile-content">
              <div className="Textarea" style={{ position: 'relative' }}>
                <div style={{ width: '99%', height: 419, overflow: 'auto' }} className="text">
                  <Editor
                    value={textContent}
                    onValueChange={(text) => {
                      setTextContent(text);
                    }}
                    highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
                    padding={15}
                    className="editor"
                    textareaId="codeArea"
                    style={{
                      background: '#fff',
                      fontSize: 15,
                    }}
                  />
                </div>
                <div onClick={handleDivClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
                  <p>
                    <span>1</span>Enter the account information here, each account/line
                  </p>
                  <p>
                    <span>2</span>
                    <strong>Account format:</strong> UID|Password|2FA|Recovery email|Recovery email’s password|Date of
                    birth
                  </p>
                </div>
              </div>
              <div className="chooseOption">
                <div className="chooseOption__item facebookAcc">
                  <input type="checkbox" name="facebookAcc" />
                  <p>Run and log in Facebook accounts right after add new profiles</p>
                </div>
                <div className="chooseOption__item tag">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="tag"
                      checked={values.isTag}
                      onChange={(event) => handleChangeTag(event.target.checked)}
                    />
                    <p>Add tags</p>
                  </div>
                  <div className={`OptionTag  ${values.isTag ? 'show' : 'hide'}`}>
                    <input
                      onChange={(event) => handleChangeTextTag(event.target.value)}
                      type="text"
                      name="OptionTag"
                      placeholder="Enter tags here, each tag is separated by a comma. Ex: tag 1, tag 2"
                    ></input>
                  </div>
                </div>
                <div className="chooseOption__item proxy">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="proxy"
                      checked={values.isProxy}
                      onChange={(event) => handleChangeProxy(event.target.checked)}
                    />
                    <p>Add proxy</p>
                  </div>
                  <div className={`OptionProxy  ${values.isProxy ? '' : 'hide'}`}>
                    <div className="selectProxy">
                      <Select
                        name="proxyOption"
                        className="ProxyType"
                        onChange={(event) => changeOption(event.target.value)}
                        value={values.option}
                      >
                        <MenuItem value="http">HTTP</MenuItem>
                        <MenuItem value="socks4">Socks 4</MenuItem>
                        <MenuItem value="socks5">Socks 5</MenuItem>
                      </Select>
                    </div>
                    <div className="textProxy">
                      <div style={{ width: '99%', height: 166, overflow: 'auto' }} className="text">
                        <Editor
                          value={proxyContent}
                          onValueChange={(text) => {
                            setProxyContent(text);
                          }}
                          highlight={(text) => hightlightWithLineNumbers(text, languages.js, proxyContent)}
                          padding={15}
                          className="editor"
                          textareaId="textareaProxy"
                          style={{
                            background: '#fff',
                            fontSize: 15,
                          }}
                        />
                      </div>
                      <div
                        onClick={handleDivClickProxy}
                        className={`placeholder placehoderProxy ${proxyContent ? 'hide' : ''}`}
                      >
                        <p>
                          <span>1</span>Enter the proxy here
                        </p>
                        <p>
                          <span>2</span>
                          <strong>Proxy format:</strong> Host:Port:Username:Password
                        </p>
                        <p>
                          <span>3</span>
                          Proxy will be assigned to the new profiles in turn from top to bottom
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    </Dialog>
  );
};

export default PopupProfile;
