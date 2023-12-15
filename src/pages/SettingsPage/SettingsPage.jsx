import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import SettingNormal from '../../components/SettingsComponent/SettingNormal/SettingNormal';
import SettingAdvenced from '../../components/SettingsComponent/SettingAdvanced/SettingAdvenced';
import SettingProxy from '../../components/SettingsComponent/SettingProxy/SettingProxy';

const SettingsPage = () => {
  const data = [
    {
      key: 1,
      proxy: '123.120.9.22:1232:username:123jbsdf',
    },
    {
      key: 2,
      proxy: '123.120.9.22:1232:username:123jbsdf',
    },
    {
      key: 3,
      proxy: '123.120.9.22:1232:username:123jbsdf',
    },
    {
      key: 4,
      proxy: '123.120.9.22:1232:username:123jbsdf',
    },
  ];
  const navigate = useNavigate();
  const [editProxy, setEditProxy] = useState(false);
  const [keyList, setKeyList] = useState('');
  const [openProxyManage, setOpenProxyManage] = useState(false);
  const [openWriteText, setOpenWriteText] = useState(false);
  const [settings, setSettings] = useState({
    numberProfile: 5,
    numberLoop: 1,
    typeProfile: 'Random',
    url: 'www.fb.com',
    maxTimePerThread: 500,
    delayInEachNewThread: 5,
    stopIfRamReaches: 90,
    stopIfCPUReaches: 90,
    stopIfDiskReaches: 90,
  });
  //
  const handleNumberProfile = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        numberProfile: settings.numberProfile + 1,
      });
    } else {
      setSettings({
        ...settings,
        numberProfile: settings.numberProfile > 0 ? settings.numberProfile - 1 : 0,
      });
    }
  };
  const onChangeNumberProfile = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    // if (decimalRegex.test(e.target.value)) {
    //   console.log('so thap phan');
    // }
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleNumberLoop = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        numberLoop: settings.numberLoop + 1,
      });
    } else {
      setSettings({
        ...settings,
        numberLoop: settings.numberLoop > 0 ? settings.numberLoop - 1 : 0,
      });
    }
  };
  const onChangeNumberLoop = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };

  const handleMaxTimePerThread = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        maxTimePerThread: settings.maxTimePerThread + 1,
      });
    } else {
      setSettings({
        ...settings,
        maxTimePerThread: settings.maxTimePerThread > 0 ? settings.maxTimePerThread - 1 : 0,
      });
    }
  };
  const onChangeMaxTimePerThread = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleDelayInEachNewThread = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        delayInEachNewThread: settings.delayInEachNewThread + 1,
      });
    } else {
      setSettings({
        ...settings,
        delayInEachNewThread: settings.delayInEachNewThread > 0 ? settings.delayInEachNewThread - 1 : 0,
      });
    }
  };
  const onChangeDelayInEachNewThread = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handlestopIfRamReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfRamReaches: settings.stopIfRamReaches < 100 ? settings.stopIfRamReaches + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        stopIfRamReaches: settings.stopIfRamReaches > 0 ? settings.stopIfRamReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfRamReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleStopIfCPUReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfCPUReaches: settings.stopIfCPUReaches < 100 ? settings.stopIfCPUReaches + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        stopIfCPUReaches: settings.stopIfCPUReaches > 0 ? settings.stopIfCPUReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfCPUReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleStopIfDiskReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfDiskReaches: settings.stopIfDiskReaches < 100 ? settings.stopIfDiskReaches + 1 : 100,
      });
    } else {
      setSettings({
        ...settings,
        stopIfDiskReaches: settings.stopIfDiskReaches > 0 ? settings.stopIfDiskReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfDiskReaches = (e) => {
    const decimalRegex = /^[+-]?\d*\.?\d+$/;
    if (!isNaN(e.target.value) && decimalRegex.test(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };

  const handleOnChangeTypeProfile = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };
  //
  const handleOnchangeUrl = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
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
  const handleOpenWriteText = () => {
    setOpenWriteText(true);
  };
  const handleAddProxy = () => {
    // setOpenWriteText(false)
  };
  //
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="layout-settings">
      <div className="-layout-page">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-return-profiles">
          <span onClick={() => navigate('/')}>
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
              data={data}
              keyList={keyList}
              editProxy={editProxy}
              openProxyManage={openProxyManage}
              openWriteText={openWriteText}
              handleOpenEdit={handleOpenEdit}
              handleCloseEdit={handleCloseEdit}
              handleOpenProxyManage={handleOpenProxyManage}
              handleCloseProxyManage={handleCloseProxyManage}
              handleOpenWriteText={handleOpenWriteText}
              handleAddProxy={handleAddProxy}
              onChange={onChange}
            ></SettingProxy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
