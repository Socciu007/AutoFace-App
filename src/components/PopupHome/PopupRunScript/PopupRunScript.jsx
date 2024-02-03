import React, { useEffect, useState } from 'react';
import './style.scss';
import { Input, Popover, Table, Tooltip } from 'antd';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import search from '../../../assets/pictures/icon-search.svg';
import refresh from '../../../assets/pictures/icon-refresh.png';
import { formatTimeDay } from '../../../services/utils';
import { aesDecrypt } from '../../../services/crypto-js';
import { storageProfiles } from '../../../common/const.config';
import { Store } from 'react-notifications-component';
import storageService from '../../../services/storage.service';
import { dbGetLocally, dbSetLocally, deleteProfile, getMe, getProfilesMarco, runProfile } from '../../../sender';
import notification from '../../../resources/notification.json';
import { useSelector } from 'react-redux';
const PopupRunScript = ({
  openRunScript,
  handleCloseRunScript,
  defaultProxies,
  profilesSelected,
  // getProfiles,
  // dataProfiles,
}) => {
  let loading = false;
  const profiles = useSelector((state) => state.profile);
  const scriptName = useSelector((state) => state.scriptAuto);
  const [proxies, setProxies] = useState([]);
  const [dataProfiles, setDataProfiles] = useState(profiles);
  const [dataSearch, setDataSearch] = useState(profiles);
  const [textSearch, setTextSearch] = useState('');
  const [selectedProxy, setSelectedProxy] = useState([]);

  useEffect(() => {
    setDataSearch(profiles);
    setDataProfiles(profiles);
  }, [profiles]);

  const generateProxyStr = (proxy) => {
    let proxyStr = `${proxy.host}:${proxy.port}${proxy.username && proxy.username != '' ? ':' + proxy.username : ''}${
      proxy.password ? ':' + proxy.password : ''
    }`;

    if (proxyStr.length > 30) {
      proxyStr = `${proxy.host}:${proxy.port}`;
    }
    return proxyStr;
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
      setDataSearch(
        newData.map((e, index) => {
          return { ...e, key: index + 1 };
        }),
      );
    }
  }, [dataProfiles]);

  const getProfiles = async (local = false) => {
    if (!loading) {
      loading = true;
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
      storageService.setSessionObject('user', null);
      loading = false;
    }
  };

  const getProxies = async () => {
    const res = null;
    if (res && res.success) {
      let listProxy = res.data.data.filter((e) => {
        if (defaultProxies) {
          const check = defaultProxies.find((o) => o.id == e.id);
          return !check;
        }
        return true;
      });
      listProxy = listProxy.map((e, index) => {
        let username = e.username;
        let password = e.password;
        if (e.encrypted) {
          username = aesDecrypt(e.username);
          password = aesDecrypt(e.password);
        }
        return { ...e, username, password, key: index + 1 };
      });
      setProxies(listProxy);
      setDataSearch(listProxy);
    }
  };

  const searchProfiles = (text) => {
    setTextSearch(text);
    if (text == '') {
      setDataSearch(proxies);
    } else {
      const newData = proxies.filter((e) => {
        const textLowerCase = text.toLowerCase();
        const mode = e.mode ? e.mode.toLowerCase() : '';
        const host = e.host ? e.host.toLowerCase() : '';
        const port = e.port ? e.port.toString().toLowerCase() : '';
        const username = e.username ? e.username.toLowerCase() : '';
        const password = e.password ? e.password.toLowerCase() : '';
        return (
          mode.includes(textLowerCase) ||
          host.includes(textLowerCase) ||
          port.includes(textLowerCase) ||
          username.includes(textLowerCase) ||
          password.includes(textLowerCase)
        );
      });
      setDataSearch(newData);
    }
  };

  const changeProxy = async () => {
    const listProxy = selectedProxy;
    if (listProxy.length < profilesSelected.length) {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: `Please select ${profilesSelected.length} proxy!`,
      });
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
      handleCloseRunScript();
      setTimeout(() => {
        Store.addNotification({
          ...notification,
          type: 'warning',
          message: 'The Account field is required',
        });
      }, 500);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length) {
        console.log(selectedRows);
        setSelectedProxy(selectedRows);
      } else setSelectedProxy([]);
    },
  };
  const columnsProxys = [
    {
      title: 'UID',
      width: 200,
      render: (profile) => {
        return (
          <div className="-text-profile">
            <span>{profile.uid}</span>
            {profile.isPin && <img src={pin} alt="icon-pin"></img>}
          </div>
        );
      },
    },
    {
      title: 'Name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: 'descend',
      // defaultSortOrder: 'descend',
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
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
      width: 200,
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
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      sorter: (a, b) => a.tag.length - b.tag.length,
      sortDirections: 'descend',
      render: (tag) => {},
    },
  ];
  return (
    <PopupComponent
      open={openRunScript}
      // onOpen={() => {
      //   getProxies();
      // }}
      onClose={handleCloseRunScript}
    >
      {
        <div className="layout-run-script">
          <div className="layout-run-script__container -proxy-manage">
            <div className="-nav-scripts">
              <div className="-nav-scripts__header">
                <div className="-nav-scripts__header__close" onClick={handleCloseRunScript}>
                  <img src={closePopup} alt="icon-x"></img>
                </div>
                <h1>RUNNING PROFILES</h1>
              </div>
              <div className="-search-profiles">
                <span>
                  <img src={search} alt="icon-search" style={{ marginLeft: '11px' }}></img>
                </span>
                <input
                  value={textSearch}
                  onChange={(event) => {
                    searchProfiles(event.target.value);
                  }}
                  placeholder="Search..."
                ></input>
              </div>
            </div>
            <div className="layout-run-script__container__name">
              <div>
                <div></div>
                <div>Script:</div>
              </div>
              <div>{scriptName}</div>
            </div>
            <div className="-container-scripts -proxy-manage__content">
              <Table columns={columnsProxys} dataSource={dataSearch} pagination={false}></Table>
            </div>
          </div>
        </div>
      }
    </PopupComponent>
  );
};

export default PopupRunScript;
