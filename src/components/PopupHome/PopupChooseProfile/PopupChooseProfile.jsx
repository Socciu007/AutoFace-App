import React, { useEffect, useState } from 'react';

import './style.scss';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Dialog from '@mui/material/Dialog';
import Loading from '../../loading/Loading';
import { Store } from 'react-notifications-component';
import notification from '../../../resources/notification.json';
import search from '../../../assets/pictures/icon-search.svg';

import { Input, Popover, Table, Tooltip } from 'antd';
import options from '../../../assets/icon/icon-options.svg';
import closePopup from '../../../assets/pictures/icon-x.svg';
import deleted from '../../../assets/pictures/icon-delete.svg';
import pin from '../../../assets/pictures/icon-pin.svg';
import defaultSettings from '../../../resources/defaultSettings.json';
import defaultDisplaySettings from '../../../resources/defaultDisplaySettings.json';
import { EditableCell, EditableRow } from '../../EditableTable/EditableTable';
import { accessToken, storageDisplaySettings, storageProfiles, storageSettings } from '../../../common/const.config';
import { dbGetLocally, dbSetLocally, getProfilesMarco } from '../../../sender';
import storageService from '../../../services/storage.service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const PopupChooseProfile = ({ openProfiles, handleCloseProfiles }) => {
  const initialValues = {
    text: [],
    option: 'http',
    proxy: [],
    tag: [],
    isTag: false,
    isProxy: false,
  };

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);

  const setInitialValues = () => {
    setValues(initialValues);
  };

  const addProfiles = async () => {
    if (loading) return;
    // if (textContent == '') {
    //   Store.addNotification({
    //     ...notification,
    //     type: 'warning',
    //     message: 'The Account field is required',
    //   });
    // }
    if (values.isTag && (!values.tag || values.tag.length == 0)) {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: 'The Tag field is required',
      });
    }

    let newProfiles = [];
    const accounts = [];
    const proxies = [];
    values.text.forEach((e, index) => {
      const uid = e.split('|')[0];
      const password = e.split('|')[1];
      const twoFA = e.split('|')[2] ? e.split('|')[2] : '';
      const recoveryEmail = e.split('|')[3] ? e.split('|')[3] : '';
      const recoveryPassword = e.split('|')[4] ? e.split('|')[4] : '';
      const cookies = e.split('|')[5] ? e.split('|')[5] : '';
      if (uid && uid !== '' && password && password !== '') {
        accounts.push({
          uid,
          password,
          isPin: false,
          recoveryEmail,
          recoveryPassword,
          cookies,
          twoFA,
          status: 'ready',
          tag,
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

    if (accounts.length > proxies.length && values.isProxy) {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: 'The Proxy field is required',
      });
    }

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
        } else {
          Store.addNotification({
            ...notification,
            type: 'danger',
            message: 'Add account fail!',
          });
          break;
        }
      }

      await dbSetLocally(storageProfiles, newProfiles);

      setLoading(false);
      setInitialValues();
      handleCloseProfiles();
    } else {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: 'The Account field is required',
      });
    }
  };

  const makeCopyProfile = {
    position: 'fixed',
    maxWidth: '100%',
    width: '1163px',
    height: '679px',
    top: '50%',
    left: '50%',
    transform: ' translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    flexShrink: '0',
    zIndex: '99999',
    margin: '0',
    overflow: 'inherit !important',
  };

  const overlay = {
    background: 'rgba(255,255,255,0.9)',
  };
  const MuiDialogPaperProfile = {
    width: '1163px',
    height: '679px',
    maxHeight: '679px !important',
    minWidth: '1163px !important',
    color: '#01162b !important',
  };
  const MuiDialogContainerProfile = {
    display: 'block',
  };

  const profiles = useSelector((state) => state.profile);

  let rowID;
  // let loading = false;
  const [columns, setColumns] = useState([]);
  const [displaySettings, setDisplaySettings] = useState(null);
  const [profilesSelected, setProfilesSelected] = useState([]);
  const [dataProfiles, setDataProfiles] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    config();
  }, []);

  useEffect(() => {
    const newData = [...dataSearch];
    profiles.forEach((e) => {
      const index = newData.findIndex((o) => o.id == e.id);
      if (index >= 0) newData[index] = { ...newData[index], status: e.status };
    });

    const newDataSelected = [...profilesSelected];
    profiles.forEach((e) => {
      const index = newDataSelected.findIndex((o) => o.id == e.id);
      if (index >= 0) newDataSelected[index] = { ...newDataSelected[index], status: e.status };
    });
    setDataSearch(newData);
    setProfilesSelected(newDataSelected);
  }, [profiles]);

  const config = async () => {
    await checkSettings();
    await getProfiles(true);
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
      await dbSetLocally(storageDisplaySettings, defaultDisplaySettings);
      display = defaultDisplaySettings;
    }
    setDisplaySettings(display);
  };

  const renderColumns = async () => {
    // if (!settings) settings = await dbGetLocally(storageDisplaySettings);

    const settingsColumns = [
      {
        title: '#',
        // dataIndex: 'key',
        width: 20,
        render: (text, record, index) => <div>{index + 1}</div>,
      },
    ];

    {
      settingsColumns.push({
        title: 'UID',
        render: (profile) => {
          return (
            <div className="-text-profile">
              <span>{profile.uid}</span>
              {profile.isPin && <img src={pin} alt="icon-pin"></img>}
            </div>
          );
        },
        width: 100,
        sorter: (a, b) => !a.isPin && !b.isPin && a.uid - b.uid,
      });
    }
    {
      settingsColumns.push({
        title: 'Name',
        dataIndex: 'nameAccount',
        width: 100,
        render: (nameAccount) => (
          <Tooltip placement="topLeft" title={nameAccount}>
            {nameAccount}
          </Tooltip>
        ),
      });
    }
    {
      settingsColumns.push({
        title: 'Status',
        dataIndex: 'status',
        width: 50,
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

    {
      settingsColumns.push({
        title: 'Proxy',
        dataIndex: 'proxy',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: (proxy) => {
          return (
            <div className="-proxy-profiles">
              <Tooltip placement="topLeft" title={generateProxyStr(proxy, false)}>
                {generateProxyStr(proxy)}
              </Tooltip>
            </div>
          );
        },
        sorter: (a, b) => !a.isPin && !b.isPin && a.proxy.length - b.proxy.length,
      });
    }
    {
      settingsColumns.push({
        title: 'Tag',
        dataIndex: 'tag',
        width: 50,
        editable: true,
        render: (tag) => {
          return <p className="-tag-profiles">{tag}</p>;
        },
        sorter: (a, b) => !a.isPin && !b.isPin && a.tag.length - b.tag.length,
      });
    }

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
          handleSave: handleSaveTag,
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
      profiles.forEach((e) => {
        const index = newData.findIndex((o) => o.id == e.id);
        if (index >= 0) newData[index] = { ...newData[index], status: e.status };
      });
      newData = newData.map((e) => {
        return { ...e, isPin: e.isPin ? true : false };
      });
      newData = newData.sort((x, y) => Number(y.isPin) - Number(x.isPin));
      setDataSearch(
        newData.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
    if (dataProfiles && displaySettings) {
      renderColumns(displaySettings, dataProfiles);
    }
  }, [dataProfiles]);

  const getProfiles = async (local = false) => {
    if (!loading) {
      setLoading(true);
      let profilesFromServer;
      if (local) {
        profilesFromServer = storageService.getSessionObject('profiles');
      }

      if (!profilesFromServer) profilesFromServer = await getProfilesMarco();
      if (profilesFromServer && profilesFromServer.code) {
        storageService.setSessionObject('profiles', profilesFromServer);
        let profiles = await dbGetLocally(storageProfiles);
        profiles = profiles.filter((e) => {
          const check = profilesFromServer.result.find((o) => o.id == e.id);
          if (check) return true;
          return false;
        });

        if (profiles && profiles.length) {
          setDataProfiles(profiles);
          setDataSearch(
            profiles.map((e, index) => {
              return { ...e, key: index + 1 };
            }),
          );
        }
      }
    }
  };

  const generateProxyStr = (proxy, shot = true) => {
    let proxyStr =
      proxy.host && proxy.host.length
        ? `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
            proxy.password ? ':' + proxy.password : ''
          }`
        : 'none';

    if (proxyStr.length > 30 && shot) {
      proxyStr = `${proxy.host}:${proxy.port}...`;
    }
    return proxyStr;
  };

  const handleSaveTag = async (row) => {
    const newData = [...dataProfiles];
    const index = newData.findIndex((profile) => row.id === profile.id);
    const profile = newData[index];
    profile.tag = row.tag.split(',').map((e) => {
      if (e && e.length && !e.startsWith('#')) {
        return '#' + e;
      }
      return e;
    });
    newData.splice(index, 1, {
      ...profile,
    });
    setDataProfiles(newData);
    await dbSetLocally(storageProfiles, newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      if (selectedRows && selectedRows.length) setProfilesSelected(selectedRows);
      else setProfilesSelected([]);
    },
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

  return (
    <>
      <Dialog
        open={openProfiles}
        onClose={handleCloseProfiles}
        sx={{
          '& .MuiPaper-root[role="dialog"]': makeCopyProfile,
          '& .MuiBackdrop-root': overlay,
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPaperProfile,
          '& .MuiDialog-container': MuiDialogContainerProfile,
        }}
      >
        <div className="choose-profile">
          <div className="choose-profile__container">
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
                <h1>CHOOSE PROFILES</h1>
              </div>
              <div className="-wrapper-option-profiles -nav-scripts__btn">
                <div className="-search-profiles">
                  <span>
                    <img
                      src={search}
                      alt="search"
                      onChange={(event) => {
                        searchProfiles(event.target.value);
                      }}
                      style={{ marginLeft: '11px' }}
                    ></img>
                  </span>
                  <input placeholder="Search..."></input>
                </div>
                <button onClick={addProfiles}>RUN</button>
              </div>
            </div>
            <div className="scrollable-container">
              <Table
                rowSelection={{
                  ...rowSelection,
                  type: 'radio',
                }}
                components={components}
                showSorterTooltip={false}
                rowClassName={(profile) => (profile.isPin ? 'editable-row pinned-row' : 'editable-row')}
                columns={columns}
                dataSource={dataSearch}
                scroll={{ x: 558 }}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PopupChooseProfile;
