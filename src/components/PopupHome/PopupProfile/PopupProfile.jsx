import React, { useEffect, useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import search from '../../../assets/pictures/icon-search.svg';
import iosIcon from '../../../assets/pictures/icon-ios.png';
import macosIcon from '../../../assets/pictures/icon-macos.png';
import linuxIcon from '../../../assets/pictures/icon-linux.png';
import windowIcon from '../../../assets/pictures/icon-window.svg';
import marcoIcon from '../../../assets/pictures/icon-ghosty.png';
import ghostyIcon from '../../../assets/pictures/icon-ghosty01.png';
import androidIcon from '../../../assets/pictures/icon-android.png';
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

  const searchProfiles = (text) => {
    if (text == '') {
      setDataSearch(
        dataProfiles.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    } else {
      const newProfiles = dataProfiles.filter((e) => e.profile.toLowerCase().includes(text.toLowerCase()));
      setDataSearch(
        newProfiles.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
  };

  const generateProxyStr = (proxy) => {
    let proxyStr = `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
      proxy.password ? ':' + proxy.password : ''
    }`;

    if (proxyStr.length > 30) {
      proxyStr = `${proxy.host}:${proxy.port}...`;
    }
    return proxyStr;
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows && selectedRows.length) setProfilesSelected(selectedRows);
      else setProfilesSelected([]);
    },
  };
  console.log('se', dataSearch);
  const columnsProfiles = [
    {
      title: '#',
      dataIndex: 'key',
      width: 50,
    },
    {
      title: 'Profile',
      // dataIndex: 'profile',
      render: (profile) => {
        return (
          <div className="-text-profile">
            <span>{profile.profile}</span>
            {profile.os === 'mac' && <img style={{ width: 13 }} src={macosIcon} alt="icon-mac"></img>}
            {profile.os === 'win' && <img src={windowIcon} style={{ width: 13 }} alt="icon-window"></img>}
            {profile.os === 'ios' && <img src={iosIcon} style={{ width: 13 }} alt="icon-ios"></img>}
            {profile.os === 'android' && <img src={androidIcon} style={{ width: 13 }} alt="icon-android"></img>}
            {profile.os === 'lin' && <img src={linuxIcon} style={{ width: 13 }} alt="icon-linux"></img>}
          </div>
        );
      },
      sorter: (a, b) => a.profile - b.profile,
    },
    {
      title: 'Source',
      width: 100,
      render: (profile) => {
        return (
          <>
            <div className="-style-source-profile">
              {profile.browserSource === 'marco' && (
                <img style={{ width: 20, height: 20 }} src={marcoIcon} alt="icon-marco"></img>
              )}
              {profile.browserSource === 'ghosty' && (
                <img style={{ width: 20, height: 20 }} src={ghostyIcon} alt="icon-ghosty"></img>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      render: (browser) => <div>{browser.charAt(0).toUpperCase() + browser.slice(1)}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        if (status[0] === 'Running') {
          return (
            <>
              <div className="-status-profiles">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
            </>
          );
        } else {
          return (
            <>
              <div className="-status-profiles -status-profiles-ready">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </>
          );
        }
      },
      sorter: (a, b) => a.status - b.status,
      sortDirections: ['descend'],
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
      width: 150,
      // ellipsis: true,
      render: (proxy) => {
        return (
          // <Tooltip placement="topLeft" className="-proxy-profiles" title={proxy}>
          <div className="-proxy-profiles">
            {/* <img src={usaProxy}></img> */}
            {proxy.host && proxy.host ? <span>{generateProxyStr(proxy)}</span> : <span>none</span>}
          </div>
          // </Tooltip>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      width: 150,
      render: (notes) => <p>{notes.slice(0, 20)}</p>,
      // ellipsis: true,
    },
  ];

  const handleTypeFolder = (name) => {
    const newFolder = listFolder.map((e) => {
      if (e.name == name) {
        return { ...e, isSelected: true };
      }
      return {
        ...e,
        isSelected: false,
      };
    });

    const folder = listFolder.find((e) => e.name == name);
    if (folder.id == '') {
      setDataSearch(
        dataProfiles.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    } else {
      const newData = dataProfiles.filter((e) => e.folder == folder.id);
      setDataSearch(
        newData.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
    setListFolder(newFolder);
  };

  const initialValues = {
    text: [],
  };
  const [values, setValues] = useState(initialValues);

  const [textContent, setTextContent] = useState('');
  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const handleDivClick = () => {
    document.getElementById('codeArea').focus();
  };
  useEffect(() => {
    if (textContent.length) {
      setValues({ ...values, text: textContent.split('\n') });
    }
  }, [textContent]);
  return (
    <PopupComponent
      open={openProfiles}
      onOpen={() => {
        getProfiles();
      }}
      onClose={handleCloseProfiles}
    >
      {
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
                    <input type="checkbox" name="tag" />
                    <p>Add tags</p>
                  </div>
                  <textarea
                    name="OptionTag"
                    id="OptionTag"
                    className="OptionTag"
                    cols="30"
                    placeholder="Enter tags here, each tag is separated by a comma. Ex: tag 1, tag 2"
                  ></textarea>
                  <div className="chooseOption__item proxy">
                    <input type="checkbox" name="proxy" />
                    <p>Add proxy</p>
                  </div>
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

export default PopupProfile;
