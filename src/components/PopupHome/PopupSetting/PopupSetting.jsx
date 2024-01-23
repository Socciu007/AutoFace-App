import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';
import { storageProfiles, storageSettings } from '../../../common/const.config';
import SnackbarApp from '../../Alert';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import { createProfile, dbGetLocally, dbSetLocally } from '../../../sender';
import { useNavigate } from 'react-router';
import SettingNormal from '../../SettingsComponent/SettingNormal/SettingNormal';
import SettingAdvenced from '../../SettingsComponent/SettingAdvanced/SettingAdvenced';
import SettingProxy from '../../SettingsComponent/SettingProxy/SettingProxy';

const PopupSetting = ({ openSettings, handleCloseSettings }) => {
  const [editProxy, setEditProxy] = useState(false);
  const [keyList, setKeyList] = useState('');
  const [openProxyManage, setOpenProxyManage] = useState(false);

  const [settings, setSettings] = useState({});
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');

  useEffect(() => {
    configSettings();
  }, []);

  const configSettings = async () => {
    const setting = await dbGetLocally(storageSettings);

    if (setting) {
      setSettings(setting);
    }
  };

  useEffect(() => {
    if (settings.countProfile && settings.countProfile >= 0) {
      dbSetLocally(storageSettings, settings);
    }
  }, [settings]);

  const onChangeAssignProxy = (checked) => {
    setSettings({
      ...settings,
      assignProxy: checked,
    });
  };

  const onChangeAPIProxy = (checked) => {
    setSettings({
      ...settings,
      apiChange: checked,
    });
  };

  const handleNumberProfile = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        countProfile: settings.countProfile + 1,
      });
    } else {
      setSettings({
        ...settings,
        countProfile: settings.countProfile > 0 ? settings.countProfile - 1 : 0,
      });
    }
  };
  const onChangeNumberProfile = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setSettings({ ...settings, countProfile: parseInt(value) });
    }
  };
  //
  const handleNumberLoop = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        countLoop: settings.countLoop + 1,
      });
    } else {
      setSettings({
        ...settings,
        countLoop: settings.countLoop > 0 ? settings.countLoop - 1 : 0,
      });
    }
  };
  const onChangeNumberLoop = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setSettings({ ...settings, countLoop: parseInt(value) });
    }
  };

  const handleMaxTimePerThread = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        maxTime: settings.maxTime + 1,
      });
    } else {
      setSettings({
        ...settings,
        maxTime: settings.maxTime > 0 ? settings.maxTime - 1 : 0,
      });
    }
  };
  const onChangeMaxTimePerThread = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setSettings({ ...settings, maxTime: parseInt(value) });
    }
  };
  //
  const handleDelayInEachNewThread = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        delayThread: settings.delayThread + 1,
      });
    } else {
      setSettings({
        ...settings,
        delayThread: settings.delayThread > 0 ? settings.delayThread - 1 : 0,
      });
    }
  };
  const onChangeDelayInEachNewThread = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    const value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      setSettings({ ...settings, delayThread: parseInt(value) });
    }
  };
  //
  const handlestopIfRamReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        maxRam: settings.maxRam < 100 ? settings.maxRam + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        maxRam: settings.maxRam > 0 ? settings.maxRam - 1 : 0,
      });
    }
  };
  const onChangeStopIfRamReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    let value = e.target.value && e.target.value !== '' ? e.target.value : 0;

    if (!isNaN(value) && decimalRegex.test(value)) {
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      setSettings({ ...settings, maxRam: parseInt(value) });
    }
  };
  //
  const handleStopIfCPUReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        maxCpu: settings.maxCpu < 100 ? settings.maxCpu + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        maxCpu: settings.maxCpu > 0 ? settings.maxCpu - 1 : 0,
      });
    }
  };
  const onChangeStopIfCPUReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    let value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      setSettings({ ...settings, maxCpu: parseInt(value) });
    }
  };
  //
  const handleStopIfDiskReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        maxDisk: settings.maxDisk < 100 ? settings.maxDisk + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        maxDisk: settings.maxDisk > 0 ? settings.maxDisk - 1 : 0,
      });
    }
  };
  const onChangeStopIfDiskReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    let value = e.target.value && e.target.value !== '' ? e.target.value : 0;
    if (!isNaN(value) && decimalRegex.test(value)) {
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      setSettings({ ...settings, maxDisk: parseInt(value) });
    }
  };

  const handleOnChangeTypeProfile = (value) => {
    setSettings({
      ...settings,
      runningType: value,
    });
  };
  const handleOnChangeMuteaudio = (value) => {
    setSettings({
      ...settings,
      muteAudio: value,
    });
  };
  const handleOnChangeShowImage = (value) => {
    setSettings({
      ...settings,
      showImage: value,
    });
  };
  //
  const handleOnchangeUrl = (value) => {
    setSettings({
      ...settings,
      URL: value,
    });
  };
  //proxy
  const handleOpenProxyManage = () => {
    setOpenProxyManage(true);
  };
  const handleCloseProxyManage = () => {
    setOpenProxyManage(false);
  };
  const handleOpenEdit = (key) => {
    setKeyList(key);
    setEditProxy(true);
  };
  const handleCloseEdit = (key) => {
    setKeyList(key);
    setEditProxy(false);
  };
  const handleOpenWriteText = (o) => {
    setOpenWriteText(!o);
  };

  const handleAddProxyFromManager = (listProxy) => {
    if (listProxy.length) {
      const proxies = settings.proxies;
      listProxy.forEach((proxy) => {
        proxies.push(proxy);
      });
      setSettings({ ...settings, proxies });
      setStatusMessage('success');
      setMessage('Import proxies success!');
      setTimeout(() => {
        setMessage('');
        setStatusMessage('warning');
      }, 2000);
    }
  };

  const handleAddProxy = (proxyString, type) => {
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
            mode: type,
            id: uuidv4(),
          });
        }
      });
      if (listProxy.length == 0) {
        setMessage('Malformed proxies!');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        const proxies = settings.proxies;
        listProxy.forEach((proxy) => {
          proxies.push(proxy);
        });
        setSettings({ ...settings, proxies });
        setStatusMessage('success');
        setMessage('Import proxies success!');
        setTimeout(() => {
          setMessage('');
          setStatusMessage('warning');
        }, 2000);
      }
    } else {
      setMessage('Please type proxies!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const handleDeleteProxy = (id) => {
    const newProxies = settings.proxies.filter((e) => e.id !== id);
    setSettings({ ...settings, proxies: newProxies });
    setStatusMessage('success');
    setMessage('Delete proxies success!');
    setTimeout(() => {
      setMessage('');
      setStatusMessage('warning');
    }, 2000);
  };

  const onChangeProxy = (proxy, id) => {
    const index = settings.proxies.findIndex((e) => e.id == id);
    if (index >= 0) {
      if (proxy.includes(':')) {
        const host = proxy.split(':')[0];
        const port = proxy.split(':')[1];
        const username = proxy.split(':')[2] ? proxy.split(':')[2] : '';
        const password = proxy.split(':')[3] ? proxy.split(':')[3] : '';
        const newProxy = {
          host,
          port,
          username,
          password,
          mode: settings.proxies[index].mode ? settings.proxies[index].mode : 'http',
          id,
        };

        const newListProxy = [...settings.proxies];
        newListProxy[index] = newProxy;
        setSettings({ ...settings, proxies: newListProxy });
      }
    }
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
    background: 'rgba(255,255,255,0.9)',
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
      open={openSettings}
      onClose={handleCloseSettings}
      sx={{
        '& .MuiPaper-root': makeCopy,
        '& .MuiBackdrop-root': overlay,
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPaper,
      }}
    >
      <div className="PopupSetting">
        <div className="-return-profiles">
          <span onClick={() => handleCloseSettings()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
              <path
                d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
                stroke="#01162B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="-btn-profiles">Automation settings</p>
        </div>
        <div className="scroll-settings">
          <div className="-container-content">
            <div className="-settings-profiles">
              <SettingNormal
                settings={settings}
                handleNumberProfile={handleNumberProfile}
                onChangeNumberProfile={onChangeNumberProfile}
                onChangeNumberLoop={onChangeNumberLoop}
                handleOnChangeMuteaudio={handleOnChangeMuteaudio}
                handleOnChangeShowImage={handleOnChangeShowImage}
                handleNumberLoop={handleNumberLoop}
                handleOnChangeTypeProfile={handleOnChangeTypeProfile}
                handleOnchangeUrl={handleOnchangeUrl}
              ></SettingNormal>
              <SettingAdvenced
                settings={settings}
                handleDelayInEachNewThread={handleDelayInEachNewThread}
                handleMaxTimePerThread={handleMaxTimePerThread}
                handleStopIfCPUReaches={handleStopIfCPUReaches}
                handleStopIfDiskReaches={handleStopIfDiskReaches}
                handlestopIfRamReaches={handlestopIfRamReaches}
                onChangeDelayInEachNewThread={onChangeDelayInEachNewThread}
                onChangeMaxTimePerThread={onChangeMaxTimePerThread}
                onChangeStopIfCPUReaches={onChangeStopIfCPUReaches}
                onChangeStopIfDiskReaches={onChangeStopIfDiskReaches}
                onChangeStopIfRamReaches={onChangeStopIfRamReaches}
              ></SettingAdvenced>
            </div>
            <SettingProxy
              data={settings.proxies ? settings.proxies : []}
              settings={settings}
              keyList={keyList}
              editProxy={editProxy}
              openProxyManage={openProxyManage}
              handleOpenEdit={handleOpenEdit}
              handleCloseEdit={handleCloseEdit}
              handleOpenProxyManage={handleOpenProxyManage}
              handleCloseProxyManage={handleCloseProxyManage}
              handleAddProxy={handleAddProxy}
              onChangeAssignProxy={onChangeAssignProxy}
              onChangeAPIProxy={onChangeAPIProxy}
              handleDeleteProxy={handleDeleteProxy}
              onChangeProxy={onChangeProxy}
              handleAddProxyFromManager={handleAddProxyFromManager}
            ></SettingProxy>
          </div>
        </div>
      </div>
      <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    </Dialog>
  );
};

export default PopupSetting;
