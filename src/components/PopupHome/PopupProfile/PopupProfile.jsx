import React, { useEffect, useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import search from '../../../assets/pictures/icon-search.svg';
import iosIcon from '../../../assets/pictures/icon-ios.png';
import macosIcon from '../../../assets/pictures/icon-macos.png';
import linuxIcon from '../../../assets/pictures/icon-linux.png';
import windowIcon from '../../../assets/pictures/icon-window.svg';
import androidIcon from '../../../assets/pictures/icon-android.png';
import { Table, Tooltip } from 'antd';
import './style.scss';
import { apiGetProfiles } from '../../../services/api_helper';
import storageService from '../../../services/storage.service';
import { storageProfiles } from '../../../common/const.config';
import SnackbarApp from '../../Alert';

const PopupProfile = ({ openProfiles, handleCloseProfiles, onAddProfile, listFolderProfiles }) => {
  let profilesSelected = [];

  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [dataProfiles, setDataProfiles] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [listFolder, setListFolder] = useState([]);
  useEffect(() => {
    setListFolder([{ name: 'All', isSelected: true, id: '' }, ...listFolderProfiles]);
    getProfiles();
  }, [listFolderProfiles]);

  const getProfiles = async () => {
    const newProfiles = await apiGetProfiles();
    if (newProfiles && newProfiles.success) {
      let addProfile = [];
      const profiles = storageService.get(storageProfiles);
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

  const addProfiles = () => {
    if (profilesSelected.length > 0) {
      const profiles = storageService.get(storageProfiles);
      if (profiles) {
        const objProfiles = JSON.parse(profiles);
        profilesSelected.forEach((e) => {
          objProfiles.push(e);
        });
        storageService.set(storageProfiles, JSON.stringify(objProfiles));
      } else {
        storageService.set(storageProfiles, JSON.stringify(profilesSelected));
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
      if (selectedRows && selectedRows.length) profilesSelected = selectedRows;
      else profilesSelected = [];
    },
  };
  const columnsProfiles = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      sorter: (a, b) => a.profile - b.profile,
    },
    {
      title: 'Source',
      render: (profile) => {
        return (
          <>
            <div className="-style-source-profile">
              {profile.isPin && <img src={pin} alt="icon-pin"></img>}
              {profile.os === 'win' && <img style={{ width: 13 }} src={windowIcon} alt="icon-window"></img>}
              {profile.os === 'mac' && <img style={{ width: 13 }} src={macosIcon} alt="icon-mac"></img>}
              {profile.os === 'ios' && <img src={iosIcon} alt="icon-ios" style={{ width: 13 }}></img>}
              {profile.os === 'android' && <img src={androidIcon} style={{ width: 13 }} alt="icon-android"></img>}
              {profile.os === 'lin' && <img src={linuxIcon} style={{ width: 13 }} alt="icon-linux"></img>}
            </div>
          </>
        );
      },
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        if (status[0] === 'Running') {
          return (
            <>
              <div className="-status-profiles">{status}</div>
            </>
          );
        } else {
          return (
            <>
              <div className="-status-profiles -status-profiles-ready">{status}</div>
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
                <h1>CHOOSE PROFILES</h1>
              </div>
              <div className="-wrapper-option-profiles -nav-scripts__btn">
                <button onClick={addProfiles}>ADD</button>
              </div>
            </div>
            <div className="-container-scripts">
              <div className="-container-scripts__left">
                <div className="-container-scripts__left__options">
                  <h1>FOLDER</h1>
                  {listFolder.map((folder) => {
                    return (
                      <div key={folder.name} className="-container-scripts__left__options__list -option-list">
                        {folder.isSelected ? (
                          <div
                            className={`-option-item ${folder.isSelected && '-container-scripts__left__options__type'}`}
                          >
                            <p>{folder.name}</p>
                          </div>
                        ) : (
                          <div
                            className={`-option-item ${folder.isSelected && '-container-scripts__left__options__type'}`}
                            onClick={() => {
                              handleTypeFolder(folder.name);
                            }}
                          >
                            <div className={'-option-item__icon'} style={{ background: '#E84314' }}></div>
                            <p style={{ marginLeft: '0px' }}>{folder.name}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="-container-scripts__right">
                <div className="-container-scripts__right__main">
                  <div className="-container-scripts__right__main__search">
                    <h1>PROFILES</h1>
                    <div className="-search-profiles">
                      <span>
                        <img src={search} alt="icon-search" style={{ marginLeft: '11px' }}></img>
                      </span>
                      <input
                        onChange={(event) => {
                          searchProfiles(event.target.value);
                        }}
                        placeholder="Search..."
                      ></input>
                    </div>
                  </div>
                  <div className="-container-scripts__right__main__content">
                    <div className="-container-scripts__right__main__content__table">
                      <Table
                        rowSelection={{
                          ...rowSelection,
                        }}
                        columns={columnsProfiles}
                        dataSource={dataSearch}
                        pagination={false}
                      ></Table>
                    </div>
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
