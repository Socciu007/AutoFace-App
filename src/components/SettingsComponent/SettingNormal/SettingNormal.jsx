import { Select, Switch, TreeSelect } from 'antd';
import './style.scss';
import up from '../../../assets/pictures/icon-Increase.svg';
import down from '../../../assets/pictures/icon-Descrease.svg';
import React from 'react';

const SettingNormal = ({
  settings,
  handleNumberProfile,
  onChangeNumberProfile,
  handleNumberLoop,
  onChangeNumberLoop,
  handleOnChangeTypeProfile,
  handleOnchangeUrl,
  ...rest
}) => {
  return (
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
              <Select
                id="typeProfile"
                className="-options-sub-settings__select__details"
                value={settings.typeProfile}
                onChange={handleOnChangeTypeProfile}
                bordered={false}
                options={[
                  {
                    value: 'random',
                    label: 'Random',
                  },
                  {
                    value: 'topdown',
                    label: 'Topdown',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="-sub-settings">
          <p>URL</p>
          <div className="-options-sub-settings">
            <div className="-options-sub-settings__select">
              <Select
                id="typeProfile"
                className="-options-sub-settings__select__details"
                value={settings.Url}
                onChange={handleOnchangeUrl}
                bordered={false}
                options={[
                  {
                    value: 'www.facebook.com',
                    label: 'www.facebook.com',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="-sub-settings -sub1-settings">
          <Switch defaultChecked onChange={() => {}} />
          <p>Mute Audio</p>
        </div>
        <div className="-sub-settings -sub1-settings" style={{ marginTop: '10px' }}>
          <Switch defaultChecked onChange={() => {}} />
          <p>Don’t show images</p>
        </div>
      </div>
    </div>
  );
};

export default SettingNormal;
