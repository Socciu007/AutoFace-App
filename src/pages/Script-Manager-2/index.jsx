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
import iconCheck from '../../assets/icon/icon-checkBlue.svg';
import running from '../../assets/icon/icon-running.svg';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import { storageScripts } from '../../common/const.config';
import { v4 as uuidv4 } from 'uuid';

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [indexMenu, setIndexMenu] = useState(-1);
  const [contentArray, setContentArray] = useState([]);
  const [listScript, setListScript] = useState([]);
  const [itemSelect, setItemSelect] = useState(null);
  const [makeCopyDialogOpen, setMakeCopyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [nameCoppy, setNameCoppy] = useState('');
  const [isSystem, setIsSystem] = useState(false);
  // for style menu materials UI
  const menuStyle = {
    boxShadow:
      '0px 5px 5px -3px rgb(233 232 232 / 20%), 0px 8px 10px 1px rgb(255 255 255 / 14%), 0px 3px 14px 2px rgb(241 232 232 / 12%)',
  };
  const liStyle = {
    fontFamily: 'Googlesans',
  };
  const makeCopy = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    width: '636px',
    maxWidth: '636px',
    flexShrink: '0',
    padding: '25px',
    zIndex: '99999',
    margin: '0',
  };
  const dialog_delete = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    width: '636px',
    maxWidth: '636px',
    flexShrink: '0',
    margin: '0',
    padding: '25px 25px 35px 25px',
  };

  const overlay = {
    background: 'rgba(255,255,255,0.9)',
  };
  const reloadListScript = () => {
    let newList = [];
    if (listScript.length) {
      newList = contentArray.filter((e) => {
        const check = listScript.find((o) => o.id == e.id);
        if (check) return true;
        return false;
      });
    } else {
      newList = contentArray;
    }
    newList = newList.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setListScript(newList);
  };
  const handleTogglePin = async (scriptId) => {
    const index = contentArray.findIndex((e) => e.id == scriptId);
    if (index >= 0) {
      const newArr = contentArray;
      newArr[index].isPin = !newArr[index].isPin;
      setContentArray(newArr);
      await dbSetLocally(storageScripts, JSON.stringify(newArr));
      reloadListScript();
    }
    setIndexMenu(-1);
  };
  // Handle the button edit
  const handleEditClick = () => {
    navigate('/create', {
      state: itemSelect,
    });
  };
  const handleCloseDialog = (className) => {
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(false);
    } else if (className === 'delete') {
      setDeleteDialogOpen(false);
    }
  };

  const handleOptionClick = (className) => {
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(true);
    } else if (className === 'delete') {
      setDeleteDialogOpen(true);
    }
    handleClose();
  };

  const coppyScript = async (id, name) => {
    const script = contentArray.find((e) => e.id == id);
    if (script) {
      const newList = [...contentArray];
      const newListScript = [...listScript];
      const newItem = { ...script, name, id: uuidv4(), isPin: false };
      newListScript.push(newItem);
      setListScript(newListScript);
      newList.push(newItem);
      setContentArray(newList);
      await dbSetLocally(storageScripts, JSON.stringify(newList));
    }
  };
  const deleteScript = async (id) => {
    const newList = contentArray.filter((e) => e.id !== id);
    const newListScript = listScript.filter((e) => e.id !== id);
    setListScript(newListScript);
    setContentArray(newList);
    await dbSetLocally(storageScripts, JSON.stringify(newList));
  };
  // Handle category button
  const handleButtonClick = () => {
    let newList = contentArray.filter((e) => {
      if (!e.isSystem && isSystem) return true;
      return false;
    });
    newList = newList.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setIsSystem(!isSystem);
    setListScript(newList);
  };
  // Handle each script div
  const handleScriptClick = (item) => {
    setItemSelect(item);
  };
  // Handle toggle menu
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setIndexMenu(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        width: 150,
        render: (status) => {
          if (status === 'running') {
            return (
              <div className="-status-profiles">
                <img src={running} alt="icon running" />
                <p>
                  <span>23 </span>
                  <span>/34 profiles</span>
                </p>
                {/* {status.charAt(0).toUpperCase() + status.slice(1)} */}
              </div>
            );
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
          // <div
          //   className="-expand-icon"
          //   onClick={() => {
          //     rowID = profile.id;
          //     renderColumns();
          //   }}
          // >
          <div>
            <p className="runScript">Run</p>
            {/* <p className="stopScript">Stop</p> */}
            <img src={options} alt="image-option"></img>
            {listScript.map((item, index) => (
              // <div
              //   className="-expand-icon"
              //   onClick={() => {
              //     rowID = item.id;
              //     renderColumns();
              //   }}
              // >
              <div
                className={itemSelect && itemSelect.id === item.id ? 'script selected' : 'script'}
                onClick={() => handleScriptClick(item)}
                key={item.id}
              >
                <p className={itemSelect && itemSelect.id === item.id ? 'inputSelected' : ''}>{item.name}</p>
                <div>
                  {/* pin */}
                  {item.isPin ? <img src={pin} alt="Pin" className={'show'} /> : null}
                  {/* more */}
                  <div
                    className="more"
                    id={`basic-menu-${item.id}`}
                    aria-controls={open ? `basic-menu-${item.id}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => {
                      handleClick(event, index);
                    }}
                  >
                    <p className="runScript">Run</p>
                    <img src={options} alt="image-option"></img>
                  </div>
                  {indexMenu == index ? (
                    <Menu
                      id={`basic-menu-${item.id}`}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      sx={{
                        '& .MuiPaper-root': menuStyle,
                        '& .MuiButtonBase-root': liStyle,
                      }}
                    >
                      <MenuItem id={item.id} onClick={() => handleTogglePin(item.id)}>
                        {item.isPin ? 'Unpin' : 'Pin'}
                      </MenuItem>
                      <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                      <MenuItem onClick={() => handleOptionClick('makeCopy')}>Make a copy</MenuItem>
                      <MenuItem onClick={handleClose}>Rename</MenuItem>
                      <MenuItem onClick={() => handleOptionClick('delete')}>Delete</MenuItem>
                    </Menu>
                  ) : null}
                </div>
              </div>
              // </div>
            ))}

            <Dialog
              sx={{
                '& .MuiPaper-root': makeCopy,
                '& .MuiBackdrop-root': overlay,
              }}
              open={makeCopyDialogOpen}
              onPlay={() => setNameCoppy('')}
              onClose={() => handleCloseDialog('makeCopy')}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <div className="makeCopy">
                <div className="makeCopy__top">
                  <p>MAKE A COPY</p>
                  <button className="close" onClick={() => handleCloseDialog('makeCopy')}>
                    <img src={close} alt="Close" />
                  </button>
                </div>
                <div className="makeCopy__bottom">
                  <input
                    onChange={(event) => setNameCoppy(event.target.value)}
                    type="text"
                    placeholder="Enter name here..."
                  />
                  <button
                    onClick={async () => {
                      if (nameCoppy == '') {
                        postAlert('Enter name script');
                      } else {
                        coppyScript(itemSelect.id, nameCoppy);
                        handleCloseDialog('makeCopy');
                        postAlert('Coppy script success', 'success');
                      }
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </Dialog>

            <Dialog
              open={deleteDialogOpen}
              onClose={() => handleCloseDialog('delete')}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              sx={{
                '& .MuiPaper-root': dialog_delete,
                '& .MuiBackdrop-root': overlay,
              }}
            >
              <div className="dialog_delete">
                <h1>DELETE</h1>
                <p>Are you sure to delete this script?</p>
                <div>
                  <button onClick={() => handleCloseDialog('delete')}>Cancel</button>
                  <button
                    onClick={() => {
                      deleteScript(itemSelect.id);
                      handleCloseDialog('delete');
                      postAlert('Delete script success', 'success');
                    }}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Dialog>

            {/* <Popover
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
            ></Popover> */}
            {/* </div> */}
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

  // const generateProxyStr = (proxy) => {
  //   let proxyStr = `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
  //     proxy.password ? ':' + proxy.password : ''
  //   }`;

  //   if (proxyStr.length > 30) {
  //     proxyStr = `${proxy.host}:${proxy.port}...`;
  //   }
  //   return proxyStr;
  // };

  // const pinProfile = async (id) => {
  //   const index = dataProfiles.findIndex((e) => e.id == id);
  //   let newDataProfile = [...dataProfiles];
  //   newDataProfile[index].isPin = !newDataProfile[index].isPin;
  //   setDataProfiles(newDataProfile);
  //   await dbSetLocally(storageProfiles, newDataProfile);
  // };
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

  // const handleCloseAction = () => {
  //   rowID = null;
  //   renderColumns();
  // };

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
          <div className="scriptManager">
            <img src={yourScript} alt="Your script icon" />
            <p>SCRIPT MANAGER</p>
          </div>
          <div className="createScript">
            <span>
              <img src={plus} alt="plus icon" />
            </span>
            <p>Create a new script</p>
          </div>
          <div className={!isSystem ? 'yourScript active' : 'yourScript'} onClick={handleButtonClick}>
            <img src={yourScriptBlue} alt="icon your script blue" />
            <p>Your Scripts</p>
            <img src={iconCheck} alt="icon check" />
          </div>
          <div className={!isSystem ? 'systemScript active' : 'systemScript'} onClick={handleButtonClick}>
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
