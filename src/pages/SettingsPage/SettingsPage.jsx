import React, { useState } from 'react';
import './style.scss';
import up from '../../assets/pictures/icon-Increase.svg';
import down from '../../assets/pictures/icon-Descrease.svg';
// import downup from "../../assets/pictures/icon-down.svg";
import onOption from '../../assets/pictures/icon-on-option.svg';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
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
    if (!isNaN(e.target.value)) {
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
    if (!isNaN(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
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
    if (!isNaN(e.target.value)) {
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
    if (!isNaN(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handlestopIfRamReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfRamReaches: settings.stopIfRamReaches + 1,
      });
    } else {
      setSettings({
        ...settings,
        stopIfRamReaches: settings.stopIfRamReaches > 0 ? settings.stopIfRamReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfRamReaches = (e) => {
    if (!isNaN(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleStopIfCPUReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfCPUReaches: settings.stopIfCPUReaches + 1,
      });
    } else {
      setSettings({
        ...settings,
        stopIfCPUReaches: settings.stopIfCPUReaches > 0 ? settings.stopIfCPUReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfCPUReaches = (e) => {
    if (!isNaN(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
  const handleStopIfDiskReaches = (type) => {
    if (type === 'increase') {
      setSettings({
        ...settings,
        stopIfDiskReaches: settings.stopIfDiskReaches + 1,
      });
    } else {
      setSettings({
        ...settings,
        stopIfDiskReaches: settings.stopIfDiskReaches > 0 ? settings.stopIfDiskReaches - 1 : 0,
      });
    }
  };
  const onChangeStopIfDiskReaches = (e) => {
    if (!isNaN(e.target.value)) {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    }
  };
  //
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
        <div className="-settings-profiles">
          <div className="-normal-settings">
            <div className="-content-settings">
              <h2>RUNNING SETTINGS</h2>
              <div className="-sub-settings">
                <p>Numbers of profiles running simultaneously</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleNumberProfile('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleNumberProfile('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input name="numberProfile" value={settings.numberProfile} onChange={onChangeNumberProfile}></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>profile(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Numbers of loops</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleNumberLoop('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleNumberLoop('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input name="numberLoop" value={settings.numberLoop} onChange={onChangeNumberLoop}></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>loops(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Profile running type</p>
                <div className="-options-sub-settings">
                  <div className="-options-sub-settings__select">
                    <select
                      name="typeProfile"
                      className="-options-sub-settings__select__details"
                      onChange={handleOnChangeTypeProfile}
                      value={settings.typeProfile}
                    >
                      <option value="random">Random</option>
                      <option value="friend">Friend</option>
                      <option value="group">Group</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>URL</p>
                <div className="-options-sub-settings">
                  <div className="-options-sub-settings__select">
                    <select
                      name="url"
                      className="-options-sub-settings__select__details"
                      onChange={handleOnchangeUrl}
                      value={settings.url}
                    >
                      <option value="random">www.fb.com</option>
                      <option value="friend">Friend</option>
                      <option value="group">Group</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="-sub-settings -sub1-settings">
                <img src={onOption} alt="on-option"></img>
                <p>Mute Audio</p>
              </div>
              <div className="-sub-settings -sub1-settings" style={{ marginTop: '10px' }}>
                <img src={onOption} alt="on-option"></img>
                <p>Don’t show images</p>
              </div>
            </div>
          </div>
          <div className="-normal-settings -advanced-settings">
            <div className="-content-settings">
              <h2>ADVANCED SETTINGS</h2>
              <div className="-sub-settings">
                <p>Maximum time per thread</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleMaxTimePerThread('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleMaxTimePerThread('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input
                      name="maxTimePerThread"
                      value={settings.maxTimePerThread}
                      onChange={onChangeMaxTimePerThread}
                    ></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Delay in each new thread open</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleDelayInEachNewThread('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleDelayInEachNewThread('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input
                      name="delayInEachNewThread"
                      value={settings.delayInEachNewThread}
                      onChange={onChangeDelayInEachNewThread}
                    ></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if RAM reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handlestopIfRamReaches('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handlestopIfRamReaches('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input
                      name="stopIfRamReaches"
                      value={settings.stopIfRamReaches}
                      onChange={onChangeStopIfRamReaches}
                    ></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleStopIfCPUReaches('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleStopIfCPUReaches('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input
                      name="stopIfCPUReaches"
                      value={settings.stopIfCPUReaches}
                      onChange={onChangeStopIfCPUReaches}
                    ></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div className="Icon-Upn_Down">
                      <div style={{ marginBottom: '2px' }} onClick={() => handleStopIfDiskReaches('increase')}>
                        <img src={up} alt="up" width={10} height={7} />
                      </div>
                      <div style={{ marginTop: '2px' }} onClick={() => handleStopIfDiskReaches('descrease')}>
                        <img src={down} alt="down" width={10} height={7} />
                      </div>
                    </div>
                    <input
                      name="stopIfDiskReaches"
                      value={settings.stopIfDiskReaches}
                      onChange={onChangeStopIfDiskReaches}
                    ></input>
                  </div>
                  <div className="-input-sub-settings">
                    <span>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
