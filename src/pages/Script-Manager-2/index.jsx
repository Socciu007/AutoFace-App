import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Input, Popover, Table, Tooltip } from 'antd';
import SnackbarApp from '../../components/Alert';
import display from '../../assets/pictures/icon-display-setting.png';
import search from '../../assets/pictures/icon-search.svg';
import refresh from '../../assets/pictures/icon-refresh.png';
import settings from '../../assets/pictures/icon-settings.png';
import options from '../../assets/pictures/icon-options.png';
import addProxy from '../../assets/pictures/icon-addProxy.png';
import deleted from '../../assets/pictures/icon-delete.svg';
import yourScript from '../../assets/pictures/icon-yourScripts.svg';
import yourScriptBlack from '../../assets/icon/icon-yourScriptsBlack.svg';
import pin from '../../assets/pictures/icon-pin.svg';
import plus from '../../assets/pictures/icon-plus.png';
import yourScriptBlue from '../../assets/icon/icon-yourScriptsBlue.svg';
import systemScript from '../../assets/icon/icon-systemScript.svg';
import defaultSettings from '../../resources/defaultSettings.json';
import defaultDisplayManager from '../../resources/defaultDisplayScriptManager.json';
import { EditableCell, EditableRow } from '../../components/EditableTable/EditableTable';
import PopupProfile from '../../components/PopupHome/PopupProfile/PopupProfile';
import PopupAddProxy from '../../components/PopupHome/PopupAddProxy/PopupAddProxy';
import PopupProxyManage from '../../components/PopupHome/PopupProxyManage/PopupProxyManage';
import PopupDeleteProfile from '../../components/PopupHome/PopupDeleteProfile/PopupDeleteProfile';
import PopupScript from '../../components/PopupHome/PopupScript/PopupScript';
import { accessToken, storageDisplaySettings, storageProfiles, storageSettings } from '../../common/const.config';
import { dbGetLocally, dbSetLocally, deleteProfile, getProfilesMarco, runProfile } from '../../sender';
import PopupDisplaySettingScript from '../../components/ScriptManager/PopupDisplaySettingScript/PopupDisplaySettingScript';

const ScriptManager2 = () => {
  let rowID;
  let loading = false;
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [columns, setColumns] = useState([]);
  const [idSelect, setIdSelect] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(null);
  const [profilesSelected, setProfilesSelected] = useState([]);
  const [dataProfiles, setDataProfiles] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [openScripts, setOpenScripts] = useState(false);
  const [openDisplaySetting, setOpenDisplaySetting] = useState(false);
  const [openProfiles, setOpenProfiles] = useState(false);
  const [openAddProxy, setOpenAddProxy] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openProxyManage, setOpenProxyManage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    config();
  }, []);

  const config = async () => {
    await checkSettings();
    await getProfiles();
  };

  const checkSettings = async () => {
    const token = await dbGetLocally(accessToken);
    if (!token || token == '') {
      return navigate('/login');
    }
    const settings = await dbGetLocally(storageSettings);
    if (!settings) {
      await dbSetLocally(storageSettings, defaultSettings);
    }

    let display = await dbGetLocally(storageDisplaySettings);
    if (!display) {
      await dbSetLocally(storageDisplaySettings, defaultDisplayManager);
      display = defaultDisplayManager;
    }
    setDisplaySettings(display);
    renderColumns(display);
  };

  const renderColumns = async (settings) => {
    if (!settings) settings = await dbGetLocally(storageDisplaySettings);

    const settingsColumns = [
      {
        title: '#',
        dataIndex: 'key',
        width: 50,
      },
    ];
    if (settings.name) {
      settingsColumns.push({
        title: 'Name',
        dataIndex: 'nameScript',
        width: 150,
        sorter: (a, b) => a.nameScript - b.nameScript,
        render: (nameScript) => (
          <Tooltip placement="topLeft" title={nameScript}>
            {nameScript}
          </Tooltip>
        ),
      });
    }
    if (settings.note) {
      settingsColumns.push({
        title: 'Note',
        dataIndex: 'note',
        width: 280,
      });
    }
    if (settings.created) {
      settingsColumns.push({
        title: 'Create',
        dataIndex: 'created',
        width: 200,
        ellipsis: {
          showTitle: false,
        },
        sorter: (a, b) => a.created - b.created,
        render: (created) => (
          <Tooltip placement="topLeft" title={created}>
            {created}
          </Tooltip>
        ),
      });
    }
    if (settings.status) {
      settingsColumns.push({
        title: 'Status',
        dataIndex: 'status',
        width: 100,
        render: (status) => {
          if (status === 'running') {
            return <div className="-status-profiles">{status.charAt(0).toUpperCase() + status.slice(1)}</div>;
          } else if (status === 'ready') {
            return (
              <div className="-status-profiles -status-profiles-ready">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            );
          } else {
            return (
              <>
                {status ? (
                  <div className="-status-profiles -status-profiles-used">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                ) : null}
              </>
            );
          }
        },
      });
    }
    // if (settings.proxy) {
    //   settingsColumns.push({
    //     title: 'Proxy',
    //     dataIndex: 'proxy',
    //     width: 200,
    //     ellipsis: {
    //       showTitle: false,
    //     },
    //     render: (proxy) => {
    //       <Tooltip placement="topLeft" title={proxy}>
    //         {proxy}
    //       </Tooltip>;
    //       return (
    //         <>
    //           <div className="-proxy-profiles">
    //             {/* <img src={usaProxy}></img> */}
    //             {proxy.host && proxy.host !== '' ? <span>{generateProxyStr(proxy)}</span> : <span>none</span>}
    //           </div>
    //         </>
    //       );
    //     },
    //     sorter: (a, b) => a.proxy.length - b.proxy.length,
    //   });
    // }
    if (settings.tag) {
      settingsColumns.push({
        title: 'Tag',
        dataIndex: 'tag',
        width: 150,
        editable: true,
        render: (tag) => {
          return <Input name="tag" value={tag} className="-tag-profiles" onChange={(e) => e.target.value}></Input>;
        },
        sorter: (a, b) => a.tag.length - b.tag.length,
      });
    }
    settingsColumns.push({
      width: 80,
      fixed: 'right',
      render: (profile) => {
        const handleClickRemove = () => {
          if (profile.id !== '') {
            setIdSelect(profile.id);
            setOpenDeleteProfile(true);
          } else {
            postAlert('Please select profile!');
          }
        };
        return (
          <div
            className="-expand-icon"
            onClick={() => {
              rowID = profile.id;
              renderColumns();
            }}
          >
            <p className="runScript">Run</p>
            {/* <p className="stopScript">Stop</p> */}
            <img src={options} alt="image-option"></img>
            <Popover
              open={rowID == profile.id}
              trigger="click"
              onClose={handleCloseAction}
              placement="leftTop"
              content={
                <div className="-popover-options" onMouseLeave={handleCloseAction}>
                  <div
                    onClick={() => {
                      pinProfile(profile.id);
                      handleCloseAction();
                    }}
                    className="-popover-options__attribute border-bottom"
                  >
                    <img src={pin} alt="icon-pin"></img>
                    {!profile.isPin ? <p>Pin</p> : <p>Unpin</p>}
                  </div>
                  <div
                    onClick={() => {
                      handleClickRemove();
                    }}
                    className="-popover-options__attribute"
                  >
                    <img src={deleted} alt="icon-deleted"></img>
                    <p>Remove</p>
                  </div>
                </div>
              }
            ></Popover>
          </div>
        );
      },
    });
    const newColumns = settingsColumns.map((col) => {
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
          // handleSaveTag,
        }),
      };
    });
    setColumns(newColumns);
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
          return { ...e, key: index + 1 };
        }),
      );
    }
  }, [dataProfiles]);

  const getProfiles = async () => {
    if (!loading) {
      loading = true;
      const profilesFromServer = await getProfilesMarco();
      console.log(profilesFromServer);
      if (profilesFromServer && profilesFromServer.code) {
        let profiles = await dbGetLocally(storageProfiles);
        profiles = profiles.filter((e) => {
          const check = profilesFromServer.result.find((o) => o.id == e.id);
          if (check) return true;
          return false;
        });

        if (profiles && profiles.length) {
          profiles = profiles.sort((x, y) => Number(y.isPin) - Number(x.isPin));
          setDataProfiles(profiles);
          setDataSearch(
            profiles.map((e, index) => {
              return { ...e, key: index + 1 };
            }),
          );
        }
      }

      loading = false;
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

  const pinProfile = async (id) => {
    const index = dataProfiles.findIndex((e) => e.id == id);
    let newDataProfile = [...dataProfiles];
    newDataProfile[index].isPin = !newDataProfile[index].isPin;
    setDataProfiles(newDataProfile);
    await dbSetLocally(storageProfiles, newDataProfile);
  };
  const removeProfile = async (id) => {
    await deleteProfile(id);

    const newData = dataProfiles.filter((e) => e.id !== id);
    setDataProfiles(newData);
    await dbSetLocally(storageProfiles, newData);
    postAlert('Removed account', 'success');
    setOpenDeleteProfile(false);
    setIdSelect(null);
  };

  //Pin and remove

  const handleCloseAction = () => {
    rowID = null;
    renderColumns();
  };

  const postAlert = (message, status = 'warning', duration = 3000) => {
    setStatusMessage(status);
    setMessage(message);
    setTimeout(() => {
      setMessage('');
      setStatusMessage('warning');
    }, duration);
  };

  // const handleSaveTag = (row) => {
  //   const newData = [...dataProfiles];
  //   const index = newData.findIndex((profile) => row.id === profile.id);
  //   const profile = newData[index];
  //   newData.splice(index, 1, {
  //     ...profile,
  //     ...row,
  //   });
  //   setDataProfiles(newData);
  // };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows && selectedRows.length) setProfilesSelected(selectedRows);
      else setProfilesSelected([]);
    },
  };

  const handleSettings = () => {
    navigate('/settings');
  };
  const handleScript = () => {
    navigate('/scripManager');
  };
  const handleReloadPage = async () => {
    await getProfiles();
    postAlert('Reloaded Profiles', 'success');
  };
  //scripts
  const handleOpenScripts = () => {
    if (profilesSelected.length > 0) {
      const check = profilesSelected.find((e) => e.status !== 'ready');
      if (!check) {
        setOpenScripts(true);
      } else {
        postAlert(`Profile ${check.profile} is ${check.status}!`);
      }
    } else {
      postAlert('Please select profile!');
    }
  };
  const handleCloseScripts = () => {
    setOpenScripts(false);
  };

  const handleCloseProfiles = () => {
    setOpenProfiles(false);
  };
  //display setting
  const handleOpenDisplaySetting = () => {
    setOpenDisplaySetting(true);
  };
  const handleCloseDisplaySetting = () => {
    setOpenDisplaySetting(false);
  };
  const onSaveDisplaySettings = async (settings) => {
    await dbSetLocally(storageDisplaySettings, settings);
    setDisplaySettings(settings);
    renderColumns(settings);
  };
  //proxy
  const handleOpenProxyManage = () => {
    setOpenProxyManage(true);
  };
  const handleCloseProxyManage = () => {
    setOpenAddProxy(true);
    setOpenProxyManage(false);
  };
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
          return { ...e, key: index + 1 };
        }),
      );
    } else {
      const newProfiles = dataProfiles.filter((e) => {
        const profile = e.uid.toLowerCase();
        const mail = e.recoveryEmail ? e.recoveryEmail.toLowerCase() : '';
        const name = e.nameAccount ? e.nameAccount.toLowerCase() : '';
        return (
          profile.includes(text.toLowerCase()) || name.includes(text.toLowerCase()) || mail.includes(text.toLowerCase())
        );
      });
      setDataSearch(
        newProfiles.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
  };

  const handleRemoveProfiles = async () => {
    for (let i = 0; i < profilesSelected.length; i++) {
      await deleteProfile(profilesSelected[i].id);
    }

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
        return { ...e, key: index + 1 };
      }),
    );
    await dbSetLocally(storageProfiles, newData);
    postAlert('Removed account', 'success');
    handleCloseDelete();
    getProfiles();
  };

  return (
    <div
      className="script-manager2"
      style={{
        opacity:
          openAddProxy || openDeleteProfile || openScripts || openProfiles || openProxyManage || openDisplaySetting
            ? 0.3
            : 1,
      }}
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
              <span className="-option-profiles" onClick={handleOpenDisplaySetting}>
                <img src={display} alt="display-setting"></img>
              </span>
              <PopupDisplaySettingScript
                onSaveDisplaySettings={onSaveDisplaySettings}
                openDisplaySetting={openDisplaySetting}
                displaySettings={displaySettings}
                handleCloseDisplaySetting={handleCloseDisplaySetting}
              ></PopupDisplaySettingScript>
              <span className="-option-profiles" onClick={handleSettings}>
                <img src={settings} alt="image-settings"></img>
              </span>
              <span className="-option-profiles" onClick={handleScript}>
                <img src={yourScriptBlack} alt="icon-yourscripts"></img>
              </span>

              <PopupProfile
                openProfiles={openProfiles}
                handleCloseProfiles={handleCloseProfiles}
                onAddProfile={() => {
                  getProfiles();
                }}
              ></PopupProfile>

              <span
                className="-option-profiles"
                onClick={async () => {
                  await dbSetLocally(accessToken, null);
                  return navigate('/login');
                }}
              >
                <img src={refresh} alt="image-refresh"></img>
              </span>
            </div>
          </div>
          <div className="-btn-profiles">
            {profilesSelected.length ? (
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
            ) : null}
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
            {profilesSelected.length ? (
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
            ) : null}
            <PopupDeleteProfile
              openDeleteProfile={openDeleteProfile}
              handleCloseDelete={handleCloseDelete}
              handleRemove={() => {
                if (!idSelect) {
                  handleRemoveProfiles();
                } else {
                  removeProfile(idSelect);
                }
              }}
            ></PopupDeleteProfile>
            <div onClick={handleOpenScripts}>
              <button>Run</button>
            </div>
            <PopupScript
              profilesSelected={profilesSelected}
              openScripts={openScripts}
              handleCloseScripts={handleCloseScripts}
              handleSettings={handleSettings}
              handleOpenScripts={handleScript}
            ></PopupScript>
          </div>
        </div>
        <div className="-nav-bar">
          <div className="-nav-bar__scriptManager">
            <img src={yourScript} alt="Your script icon" />
            <p>SCRIPT MANAGER</p>
          </div>
          <div className="-nav-bar__createScript">
            <img src={plus} alt="plus icon" />
            <p>Create a new script</p>
          </div>
          <div className="-nav-bar__yourScript">
            <img src={yourScriptBlue} alt="icon your script blue" />
            <p>Your Scripts</p>
          </div>
          <div className="-nav-bar__systemScript">
            <img src={systemScript} alt="icon system scripts" />
            <p>System’s Scripts</p>
          </div>
        </div>
        {/* <div className="-content-profiles">
          <div className="scrollable-container"> */}
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          components={components}
          showSorterTooltip={false}
          rowClassName={'editable-row'}
          columns={columns}
          dataSource={dataSearch.sort((x, y) => {
            return x.isPin === y.isPin ? 0 : x ? -1 : 1;
          })}
          scroll={{ x: 1000 }}
          pagination={false}
        />
      </div>
      <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    </div>
  );
};

export default ScriptManager2;
