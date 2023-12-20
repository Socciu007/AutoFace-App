import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Input, Popover, Table, message } from 'antd';
import SnackbarApp from '../../components/Alert';
import display from '../../assets/pictures/icon-display-setting.png';
import search from '../../assets/pictures/icon-search.svg';
import refresh from '../../assets/pictures/icon-refresh.png';
import settings from '../../assets/pictures/icon-settings.png';
import plus from '../../assets/pictures/icon-plus.png';
import options from '../../assets/pictures/icon-options.png';
import addProxy from '../../assets/pictures/icon-addProxy.png';
import deleted from '../../assets/pictures/icon-delete.svg';
import yourScript from '../../assets/pictures/icon-yourScripts.svg';
import pin from '../../assets/pictures/icon-pin.svg';
import iosIcon from '../../assets/pictures/icon-ios.png';
import defaultSettings from '../../resources/defaultSettings.json';
import macosIcon from '../../assets/pictures/icon-macos.png';
import linuxIcon from '../../assets/pictures/icon-linux.png';
import windowIcon from '../../assets/pictures/icon-window.svg';
import androidIcon from '../../assets/pictures/icon-android.png';
import scripts from '../../resources/scripts.json';
import { EditableCell, EditableRow } from '../../components/EditableTable/EditableTable';
import PopupProfile from '../../components/PopupHome/PopupProfile/PopupProfile';
import PopupAddProxy from '../../components/PopupHome/PopupAddProxy/PopupAddProxy';
import PopupProxyManage from '../../components/PopupHome/PopupProxyManage/PopupProxyManage';
import PopupDeleteProfile from '../../components/PopupHome/PopupDeleteProfile/PopupDeleteProfile';
import PopupScript from '../../components/PopupHome/PopupScript/PopupScript';
import storageService from '../../services/storage.service';
import { storageProfiles, storageSettings } from '../../common/const.config';
import { apiGetFolder } from '../../services/api_helper';

const ProfilesPage = () => {
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [listFolder, setListFolder] = useState([]);
  const [profilesSelected, setProfilesSelected] = useState([]);
  const [dataProfiles, setDataProfiles] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataScripts, setDataScripts] = useState(scripts);
  const [rowKeys, setRowKeys] = useState([]);
  const [openScripts, setOpenScripts] = useState(false);
  const [openProfiles, setOpenProfiles] = useState(false);
  const [openAddProxy, setOpenAddProxy] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openProxyManage, setOpenProxyManage] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfiles();
    checkSettings();
  }, []);

  const checkSettings = () => {
    const settings = storageService.get(storageSettings);
    if (!settings) {
      storageService.set(storageSettings, JSON.stringify(defaultSettings));
    }
  };

  useEffect(() => {
    if (dataProfiles && dataSearch) {
      let newData = [];
      dataSearch.forEach((e) => {
        const profile = dataProfiles.find((o) => o.id == e.id);
        if (profile) {
          const check = newData.find((o) => o.id == profile.id);
          if (!check) {
            newData.push(profile);
          }
        }
      });
      newData = newData.sort((x, y) => Number(y.isPin) - Number(x.isPin));
      setDataSearch(
        newData.map((e, index) => {
          return { ...e, index: index + 1 };
        }),
      );
    }
  }, [dataProfiles]);

  const getProfiles = async () => {
    const profiles = storageService.get(storageProfiles);
    console.log('profiles', profiles);
    const folders = await apiGetFolder();

    if (folders && folders.success) {
      const arrFolder = [];
      folders.data.data.forEach((e) => {
        const check = listFolder.find((o) => o.id === e.id);
        if (!check) arrFolder.push({ ...e, isSelected: false });
      });
      setListFolder([...listFolder, ...arrFolder]);
    }
    if (profiles) {
      let objProfile = JSON.parse(profiles);
      if (folders.data && folders.data.data) {
        objProfile = objProfile.map((e) => {
          const folderName = folders.data.data.find((o) => o.id == e.folder);
          return { ...e, folderName: folderName ? folderName.name : '' };
        });
      }
      objProfile = objProfile.sort((x, y) => Number(y.isPin) - Number(x.isPin));
      setDataProfiles(objProfile);
      setDataSearch(
        objProfile.map((e, index) => {
          return { ...e, index: index + 1 };
        }),
      );
    }
  };
  console.log('dataSearch', dataSearch);

  const generateProxyStr = (proxy) => {
    let proxyStr = `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
      proxy.password ? ':' + proxy.password : ''
    }`;

    if (proxyStr.length > 30) {
      proxyStr = `${proxy.host}:${proxy.port}...`;
    }
    return proxyStr;
  };

  const pinProfile = (id) => {
    const index = dataProfiles.findIndex((e) => e.id == id);
    let newDataProfile = [...dataProfiles];
    newDataProfile[index].isPin = !newDataProfile[index].isPin;
    setDataProfiles(newDataProfile);
    storageService.set(storageProfiles, JSON.stringify(newDataProfile));
  };
  const removeProfile = (id) => {
    const newData = dataProfiles.filter((e) => e.id !== id);
    setDataProfiles(newData);
    storageService.set(storageProfiles, JSON.stringify(newData));
  };

  //Pin and remove
  const handleActionProfiles = () => {
    setOpenOptions(true);
  };
  const handleCloseAction = () => {
    setOpenOptions(false);
  };

  const postAlert = (message, status = 'warning', duration = 3000) => {
    setStatusMessage(status);
    setMessage(message);
    setTimeout(() => {
      setMessage('');
      setStatusMessage('warning');
    }, duration);
  };

  const defaultColumns = [
    {
      title: '#',
      dataIndex: 'index',
    },
    {
      title: 'Profile',
      render: (profile) => {
        return (
          <div className="-text-profile">
            <span>{profile.profile}</span>
            {profile.isPin && <img src={pin} alt="icon-pin"></img>}
            {profile.os === 'mac' && <img style={{ width: 13 }} src={macosIcon} alt="icon-mac"></img>}
            {profile.os === 'win' && <img src={windowIcon} style={{ width: 13 }} alt="icon-window"></img>}
            {profile.os === 'ios' && <img src={iosIcon} style={{ width: 13 }} alt="icon-ios"></img>}
            {profile.os === 'android' && <img src={androidIcon} style={{ width: 13 }} alt="icon-android"></img>}
            {profile.os === 'lin' && <img src={linuxIcon} style={{ width: 13 }} alt="icon-linux"></img>}
          </div>
        );
      },
    },
    {
      title: 'UID',
      dataIndex: 'uid',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        if (status === 'running') {
          return <div className="-status-profiles">{status}</div>;
        } else if (status === 'ready') {
          return <div className="-status-profiles -status-profiles-ready">{status}</div>;
        } else {
          return <div className="-status-profiles -status-profiles-used">{status}</div>;
        }
      },
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
      render: (proxy) => {
        return (
          <>
            <div className="-proxy-profiles">
              {/* <img src={usaProxy}></img> */}
              {proxy.host && proxy.host !== '' ? <span>{generateProxyStr(proxy)}</span> : <span>none</span>}
            </div>
          </>
        );
      },
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      width: 150,
      editable: true,
      render: (tag) => {
        return <Input name="tag" value={tag} className="-tag-profiles" onChange={(e) => e.target.value}></Input>;
      },

      // sortDirections: ['descend'],
    },
    {
      title: 'Folder',
      dataIndex: 'folderName',
      // sortDirections: ['descend'],
    },
    {
      title: '',
      render: (profile) => {
        return (
          <div className="-expand-icon" onClick={handleActionProfiles}>
            <img src={options} alt="image-option"></img>
            {rowKeys === profile.id && (
              <Popover
                open={openOptions}
                onClose={handleCloseAction}
                placement="leftTop"
                content={
                  <div className="-popover-options" onMouseLeave={handleCloseAction}>
                    <div onClick={() => pinProfile(profile.id)} className="-popover-options__attribute border-bottom">
                      <img src={pin} alt="icon-pin"></img>
                      {!profile.isPin ? <p>Pin</p> : <p>UnpSin</p>}
                    </div>
                    <div onClick={() => removeProfile(profile.id)} className="-popover-options__attribute">
                      <img src={deleted} alt="icon-deleted"></img>
                      <p>Remove</p>
                    </div>
                  </div>
                }
              ></Popover>
            )}
          </div>
        );
      },
    },
  ];
  const handleSaveTag = (row) => {
    const newData = [...dataProfiles];
    const index = newData.findIndex((profile) => row.id === profile.id);
    const profile = newData[index];
    newData.splice(index, 1, {
      ...profile,
      ...row,
    });
    setDataProfiles(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSaveTag,
      }),
    };
  });
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows && selectedRows.length) setProfilesSelected(selectedRows);
      else setProfilesSelected([]);
    },
  };

  //handle type scrip
  const handleTypeScript = (type) => {
    const scrip = scripts.filter((scrip) => scrip.isSystem === type);
    setDataScripts(scrip);
  };

  const handleSettings = () => {
    navigate('/settings');
  };
  const handleScript = () => {
    navigate('/scripManager');
  };
  const handleReloadPage = () => {
    getProfiles();
  };
  //scripts
  const handleOpenScripts = () => {
    setOpenScripts(true);
  };
  const handleCloseScripts = () => {
    setOpenScripts(false);
  };
  //profiles
  const handleOpenProfiles = () => {
    setOpenProfiles(true);
  };
  const handleCloseProfiles = () => {
    setOpenProfiles(false);
  };
  //proxy
  const handleOpenProxyManage = () => {
    setOpenProxyManage(true);
  };
  const handleCloseProxyManage = () => {
    setOpenProxyManage(false);
  };
  //
  const handleCloseAdd = () => {
    setOpenAddProxy(false);
  };
  const handleCloseDelete = () => {
    setOpenDeleteProfile(false);
  };

  const searchProfiles = (text) => {
    if (text == '') {
      setDataSearch(
        dataProfiles.map((e, index) => {
          return { ...e, index: index + 1 };
        }),
      );
    } else {
      const newProfiles = dataProfiles.filter((e) => {
        const profile = e.profile.toLowerCase();
        const name = e.name.toLowerCase();
        return profile.includes(text.toLowerCase()) || name.includes(text.toLowerCase());
      });
      setDataSearch(
        newProfiles.map((e, index) => {
          return { ...e, index: index + 1 };
        }),
      );
    }
  };

  const handleRemoveProfiles = () => {
    const newData = dataProfiles.filter((e) => {
      const check = profilesSelected.find((o) => o.id === e.id);
      return !check;
    });
    setDataProfiles(newData);
    const newDataSearch = dataSearch.filter((e) => {
      const check = profilesSelected.find((o) => o.id == e.id);
      return !check;
    });
    setDataSearch(
      newDataSearch.map((e, index) => {
        return { ...e, index: index + 1 };
      }),
    );
    storageService.set(storageProfiles, JSON.stringify(newData));
    handleCloseDelete();
    getProfiles();
  };

  return (
    <div
      className="layout-profiles"
      style={{ opacity: openAddProxy || openDeleteProfile || openScripts || openProfiles || openProxyManage ? 0.3 : 1 }}
    >
      <div className="-container-profiles">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-nav-profiles">
          <div className="-subnav-profiles">
            <div className="-search-profiles">
              <span>
                <img src={search} alt="search" style={{ marginLeft: '11px' }}></img>
              </span>
              <input
                onChange={(event) => {
                  searchProfiles(event.target.value);
                }}
                placeholder="Search..."
              ></input>
            </div>
            <div className="-wrapper-option-profiles">
              <span className="-option-profiles" onClick={handleReloadPage}>
                <img src={refresh} alt="image-refresh"></img>
              </span>
              <span className="-option-profiles">
                <img src={display} alt="display-setting"></img>
              </span>
              <span className="-option-profiles" onClick={handleSettings}>
                <img src={settings} alt="image-settings"></img>
              </span>
              <span className="-option-profiles" onClick={handleScript}>
                <img src={yourScript} alt="icon-yourscripts"></img>
              </span>
              <span className="-option-profiles" onClick={handleOpenProfiles}>
                <img src={plus} alt="image-plus"></img>
              </span>
              <PopupProfile
                listFolderProfiles={listFolder}
                openProfiles={openProfiles}
                handleCloseProfiles={handleCloseProfiles}
                onAddProfile={() => {
                  getProfiles();
                }}
              ></PopupProfile>
            </div>
          </div>
          <div className="-btn-profiles">
            <div
              className="-select-profile"
              onClick={() => {
                if (profilesSelected.length > 0) {
                  setOpenAddProxy((o) => !o);
                } else {
                  postAlert('Please select profile!');
                }
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={addProxy} alt="icon-add-proxy" width={15} height={15}></img>
              </div>
              <p>Add Proxy</p>
            </div>
            <PopupAddProxy
              profilesSelected={profilesSelected}
              getProfiles={getProfiles}
              postAlert={postAlert}
              dataProfiles={dataProfiles}
              openAddProxy={openAddProxy}
              handleCloseAdd={handleCloseAdd}
              handleOpenProxyManage={handleOpenProxyManage}
            ></PopupAddProxy>
            <PopupProxyManage
              startScreen={'Home'}
              profilesSelected={profilesSelected}
              getProfiles={getProfiles}
              postAlert={postAlert}
              dataProfiles={dataProfiles}
              openProxyManage={openProxyManage}
              handleCloseProxyManage={handleCloseProxyManage}
            ></PopupProxyManage>
            <div
              className="-select-profile"
              onClick={() => {
                if (profilesSelected.length > 0) {
                  setOpenDeleteProfile((o) => !o);
                } else {
                  postAlert('Please select profile!');
                }
              }}
            >
              <div>
                <img src={deleted} alt="icon-delete"></img>
              </div>
              <p>Remove</p>
            </div>
            <PopupDeleteProfile
              openDeleteProfile={openDeleteProfile}
              handleCloseDelete={handleCloseDelete}
              handleRemove={handleRemoveProfiles}
            ></PopupDeleteProfile>
            <div
              onClick={() => {
                if (profilesSelected.length > 0) {
                  handleOpenScripts();
                } else {
                  postAlert('Please select profile!');
                }
              }}
            >
              <button>Run</button>
            </div>
            <PopupScript
              dataScripts={dataScripts}
              openScripts={openScripts}
              handleCloseScripts={handleCloseScripts}
              handleSettings={handleSettings}
              handleOpenScripts={handleScript}
              handleTypeScript={handleTypeScript}
            ></PopupScript>
          </div>
        </div>
        <div className="-content-profiles">
          <div className="scrollable-container">
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setRowKeys(record.id);
                  },
                };
              }}
              components={components}
              rowClassName={'editable-row'}
              columns={columns}
              dataSource={dataSearch.sort((x, y) => {
                return x.isPin === y.isPin ? 0 : x ? -1 : 1;
              })}
              scroll={{ x: 1000 }}
              pagination={false}
            />
          </div>
        </div>
      </div>
      <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    </div>
  );
};

export default ProfilesPage;
