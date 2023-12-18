import React, { useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import settings from '../../../assets/pictures/icon-settings.png';
import yourScript from '../../../assets/pictures/icon-yourScripts.svg';
import search from '../../../assets/pictures/icon-search.svg';
import foxy from '../../../assets/pictures/icon-foxy.png';
import ghosty from '../../../assets/pictures/icon-ghosty.png';
import ghosty01 from '../../../assets/pictures/icon-ghosty01.png';
import usaProxy from '../../../assets/pictures/icon-usa.png';
import { Table } from 'antd';
import './style.scss';

const PopupProfile = ({ dataProfiles, openProfiles, handleCloseProfiles, handleFilterFolder }) => {
  const [typeFolder0, setTypeFolder0] = useState(false);
  const [typeFolder1, setTypeFolder1] = useState(false);
  const [typeFolder2, setTypeFolder2] = useState(false);
  const [typeFolder3, setTypeFolder3] = useState(false);
  const [typeFolder4, setTypeFolder4] = useState(false);
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
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
      dataIndex: 'source',
      render: (source) => {
        return (
          <>
            <div className="-style-source-profile">
              {source === 'Foxy' && <img src={foxy} alt="icon-foxy"></img>}
              {source === 'Ghosty' && <img src={ghosty} alt="icon-ghosty"></img>}
              {source === 'Ghosty-Fake' && <img src={ghosty01} alt="icon-ghosty"></img>}
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
      render: (profile) => {
        return (
          <>
            <div className="-proxy-profiles">
              <img src={usaProxy}></img>
              <span>{profile}</span>
            </div>
          </>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    },
  ];

  const handleTypeFolder0 = () => {
    setTypeFolder0(true);
    setTypeFolder1(false);
    setTypeFolder2(false);
    setTypeFolder3(false);
    setTypeFolder4(false);
    handleFilterFolder('Facebook Ads 1');
  };
  const handleTypeFolder1 = () => {
    setTypeFolder1(true);
    setTypeFolder0(false);
    setTypeFolder2(false);
    setTypeFolder3(false);
    setTypeFolder4(false);
    handleFilterFolder('Seeding 1');
  };
  const handleTypeFolder2 = () => {
    setTypeFolder2(true);
    setTypeFolder1(false);
    setTypeFolder0(false);
    setTypeFolder3(false);
    setTypeFolder4(false);
    handleFilterFolder('Mail 1 - Alcie');
  };
  const handleTypeFolder3 = () => {
    setTypeFolder3(true);
    setTypeFolder1(false);
    setTypeFolder2(false);
    setTypeFolder0(false);
    setTypeFolder4(false);
    handleFilterFolder('Mail 2 - Brono');
  };
  const handleTypeFolder4 = () => {
    setTypeFolder4(true);
    setTypeFolder1(false);
    setTypeFolder2(false);
    setTypeFolder3(false);
    setTypeFolder0(false);
    handleFilterFolder('Mail 3 - Kazza');
  };
  return (
    <PopupComponent open={openProfiles} onClose={handleCloseProfiles}>
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
                <button>ADD</button>
              </div>
            </div>
            <div className="-container-scripts">
              <div className="-container-scripts__left">
                <div className="-container-scripts__left__options">
                  <h1>FOLDER</h1>
                  <div className="-container-scripts__left__options__type">
                    {!typeFolder0 && !typeFolder1 && !typeFolder2 && !typeFolder3 && !typeFolder4 && <p>All</p>}

                    {typeFolder0 && <p>Facebook Ads 1</p>}
                    {typeFolder1 && <p>Seeding 1</p>}
                    {typeFolder2 && <p>Mail 1 - Alcie</p>}
                    {typeFolder3 && <p>Mail 2 - Brono</p>}
                    {typeFolder4 && <p>Mail 3 - Kazza</p>}
                  </div>
                  <div className="-container-scripts__left__options__list -option-list">
                    <ul>
                      <li className="-option-item" onClick={handleTypeFolder0}>
                        <div className="-option-item__icon" style={{ background: '#E84314' }}></div>
                        <p>Facebook Ads 1</p>
                      </li>
                      <li className="-option-item" onClick={handleTypeFolder1}>
                        <div className="-option-item__icon" style={{ background: '#F6A01D' }}></div>
                        <p>Seeding 1</p>
                      </li>
                      <li className="-option-item" onClick={handleTypeFolder2}>
                        <div className="-option-item__icon" style={{ background: '#FFDE50' }}></div>
                        <p>Mail 1 - Alcie</p>
                      </li>
                      <li className="-option-item" onClick={handleTypeFolder3}>
                        <div className="-option-item__icon" style={{ background: '#81BC06' }}></div>
                        <p>Mail 2 - Brono</p>
                      </li>
                      <li className="-option-item" onClick={handleTypeFolder4}>
                        <div className="-option-item__icon" style={{ background: '#00ADEF' }}></div>
                        <p>Mail 3 - Kazza</p>
                      </li>
                    </ul>
                  </div>
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
                      <input placeholder="Search..."></input>
                    </div>
                  </div>
                  <div className="-container-scripts__right__main__content">
                    <div className="-container-scripts__right__main__content__table">
                      <Table
                        rowSelection={{
                          ...rowSelection,
                        }}
                        columns={columnsProfiles}
                        dataSource={dataProfiles}
                        pagination={false}
                      ></Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </PopupComponent>
  );
};

export default PopupProfile;
