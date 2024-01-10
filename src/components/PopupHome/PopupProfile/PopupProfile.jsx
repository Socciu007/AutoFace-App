import React, { useEffect, useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import { Table } from 'antd';
import './style.scss';
import { apiGetProfiles } from '../../../services/api_helper';
import { storageProfiles } from '../../../common/const.config';
import SnackbarApp from '../../Alert';
import { getDB, setDB } from '../../../services/socket';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';

const PopupProfile = ({ openProfiles, handleCloseProfiles, onAddProfile, listFolderProfiles }) => {
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [dataProfiles, setDataProfiles] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [listFolder, setListFolder] = useState([]);
  const [profilesSelected, setProfilesSelected] = useState([]);
  useEffect(() => {
    setListFolder([{ name: 'All', isSelected: true, id: '' }, ...listFolderProfiles]);
    getProfiles();
  }, [listFolderProfiles]);

  const getProfiles = async () => {
    const newProfiles = await apiGetProfiles();
    if (newProfiles && newProfiles.success) {
      let addProfile = [];
      const profiles = await getDB(storageProfiles);
      if (profiles) {
        const objProfiles = JSON.parse(profiles);
        addProfile = newProfiles.data.data.filter((e) => {
          const check = objProfiles.find((o) => o.id == e.id);
          return !check;
        });
      } else {
        addProfile = newProfiles.data.data;
      }
      addProfile = addProfile.map((e, index) => {
        return {
          name: '',
          id: e.id,
          isPin: false,
          profile: e.name,
          uid: '',
          proxy: e.proxy,
          status: e.status,
          tag: '',
          os: e.os,
          folder: e.folder ? e.folder : '',
          browserSource: e.browserSource,
          browser: e.browserType,
          notes: e.notes,
          script: [],
          updatedAt: e.updatedAt,
        };
      });
      setDataProfiles(addProfile);
      setDataSearch(
        addProfile.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
  };

  const addProfiles = async () => {
    console.log(profilesSelected);

    if (profilesSelected.length > 0) {
      const profiles = await getDB(storageProfiles);
      if (profiles) {
        const objProfiles = JSON.parse(profiles);
        profilesSelected.forEach((e) => {
          objProfiles.push(e);
        });
        await setDB(storageProfiles, JSON.stringify(objProfiles));
      } else {
        await setDB(storageProfiles, JSON.stringify(profilesSelected));
      }
      getProfiles();
      onAddProfile();
      handleCloseProfiles();
    } else {
      setMessage('Please select profile!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  console.log('se', dataSearch);

  const initialValues = {
    text: [],
    option: 'http',
    proxy: [],
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
  };

  const overlay = {
    background: 'rgba(255,255,255,0.5)',
  };
  const MuiDialogPaper = {
    width: '1163px',
    // width: '2000px !important',
    maxHeight: '679px !important',
    minWidth: '1163px !important',
    color: '#01162b !important',
  };
  return (
    <Dialog
      open={openProfiles}
      onOpen={() => {
        getProfiles();
      }}
      onClose={handleCloseProfiles}
      sx={{
        '& .MuiPaper-root': makeCopy,
        '& .MuiBackdrop-root': overlay,
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPaper,
      }}
    >
      <div className="-layout-choose-scripts">
        <div className="-layout-choose-scripts__container">
          <div className="-nav-scripts">
            <div className="-nav-scripts__header">
              <div className="-nav-scripts__header__close" onClick={handleCloseProfiles}>
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
                <div style={{ width: '100%', height: 419, overflow: 'auto' }} className="text">
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
                  <div className={`OptionProxy  ${values.isProxy ? 'show' : 'hide'}`}>
                    <div className="selectProxy">
                      <Select
                        name="postOption"
                        className="PostType"
                        onChange={(event) => changeOption(event.target.value)}
                        value={values.option}
                      >
                        <MenuItem value="http">HTTP</MenuItem>
                        <MenuItem value="socks4">Socks 4</MenuItem>
                        <MenuItem value="socks5">Socks 5</MenuItem>
                        <MenuItem value="ssh">SSH</MenuItem>
                      </Select>
                    </div>
                    <div className="textProxy">
                      <div style={{ width: '100%', height: 166, overflow: 'auto' }} className="text">
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
        <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
      </div>
    </Dialog>

    // <PopupComponent
    //   open={openProfiles}
    //   onOpen={() => {
    //     getProfiles();
    //   }}
    //   onClose={handleCloseProfiles}
    // >
    //   {
    //     <div className="-layout-choose-scripts">
    //       <div className="-layout-choose-scripts__container">
    //         <div className="-nav-scripts">
    //           <div className="-nav-scripts__header">
    //             <div className="-nav-scripts__header__close" onClick={handleCloseProfiles}>
    //               <img src={closePopup} alt="icon-x"></img>
    //             </div>
    //             <h1>NEW PROFILES</h1>
    //           </div>
    //           <div className="-wrapper-option-profiles -nav-scripts__btn">
    //             <button onClick={addProfiles}>ADD</button>
    //           </div>
    //         </div>
    //         <div className="scrollable-container">
    //           <div className="newProfile-content">
    //             <div className="Textarea" style={{ position: 'relative' }}>
    //               <div style={{ width: '100%', height: 419, overflow: 'auto' }} className="text">
    //                 <Editor
    //                   value={textContent}
    //                   onValueChange={(text) => {
    //                     setTextContent(text);
    //                   }}
    //                   highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
    //                   padding={15}
    //                   className="editor"
    //                   textareaId="codeArea"
    //                   style={{
    //                     background: '#fff',
    //                     fontSize: 15,
    //                   }}
    //                 />
    //               </div>
    //               <div onClick={handleDivClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
    //                 <p>
    //                   <span>1</span>Enter the account information here, each account/line
    //                 </p>
    //                 <p>
    //                   <span>2</span>
    //                   <strong>Account format:</strong> UID|Password|2FA|Recovery email|Recovery email’s password|Date of
    //                   birth
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="chooseOption">
    //               <div className="chooseOption__item facebookAcc">
    //                 <input type="checkbox" name="facebookAcc" />
    //                 <p>Run and log in Facebook accounts right after add new profiles</p>
    //               </div>
    //               <div className="chooseOption__item tag">
    //                 <div className="checkbox">
    //                   <input
    //                     type="checkbox"
    //                     name="tag"
    //                     checked={values.isTag}
    //                     onChange={(event) => handleChangeTag(event.target.checked)}
    //                   />
    //                   <p>Add tags</p>
    //                 </div>
    //                 <div className={`OptionTag  ${values.isTag ? 'show' : 'hide'}`}>
    //                   <input
    //                     type="text"
    //                     name="OptionTag"
    //                     placeholder="Enter tags here, each tag is separated by a comma. Ex: tag 1, tag 2"
    //                   ></input>
    //                 </div>
    //               </div>
    //               <div className="chooseOption__item proxy">
    //                 <div className="checkbox">
    //                   <input
    //                     type="checkbox"
    //                     name="proxy"
    //                     checked={values.isProxy}
    //                     onChange={(event) => handleChangeProxy(event.target.checked)}
    //                   />
    //                   <p>Add proxy</p>
    //                 </div>
    //                 <div className={`OptionProxy  ${values.isProxy ? 'show' : 'hide'}`}>
    //                   <div className="selectProxy">
    //                     <Select
    //                       name="postOption"
    //                       className="PostType"
    //                       onChange={(event) => changeOption(event.target.value)}
    //                       value={values.option}
    //                     >
    //                       <MenuItem value="http">HTTP</MenuItem>
    //                       <MenuItem value="socks4">Socks 4</MenuItem>
    //                       <MenuItem value="socks5">Socks 5</MenuItem>
    //                       <MenuItem value="ssh">SSH</MenuItem>
    //                     </Select>
    //                   </div>
    //                   <div className="textProxy">
    //                     <div style={{ width: '100%', height: 166, overflow: 'auto' }} className="text">
    //                       <Editor
    //                         value={proxyContent}
    //                         onValueChange={(text) => {
    //                           setProxyContent(text);
    //                         }}
    //                         highlight={(text) => hightlightWithLineNumbers(text, languages.js, proxyContent)}
    //                         padding={15}
    //                         className="editor"
    //                         textareaId="textareaProxy"
    //                         style={{
    //                           background: '#fff',
    //                           fontSize: 15,
    //                         }}
    //                       />
    //                     </div>
    //                     <div
    //                       onClick={handleDivClickProxy}
    //                       className={`placeholder placehoderProxy ${proxyContent ? 'hide' : ''}`}
    //                     >
    //                       <p>
    //                         <span>1</span>Enter the proxy here
    //                       </p>
    //                       <p>
    //                         <span>2</span>
    //                         <strong>Proxy format:</strong> Host:Port:Username:Password
    //                       </p>
    //                       <p>
    //                         <span>3</span>
    //                         Proxy will be assigned to the new profiles in turn from top to bottom
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    //     </div>
    //   }
    // </PopupComponent>
  );
};

export default PopupProfile;
