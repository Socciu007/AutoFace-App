import React, { useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import search from '../../../assets/pictures/icon-search.svg';
import foxy from '../../../assets/pictures/icon-foxy.png';
import ghosty from '../../../assets/pictures/icon-ghosty.png';
import ghosty01 from '../../../assets/pictures/icon-ghosty01.png';
import usaProxy from '../../../assets/pictures/icon-usa.png';
import { Table } from 'antd';
import './style.scss';

const PopupProfile = ({ dataProfiles, openProfiles, handleCloseProfiles, handleFilterFolder }) => {
  const [typeFolder_0, setTypeFolder_0] = useState(false);
  const [typeFolder_1, setTypeFolder_1] = useState(false);
  const [typeFolder_2, setTypeFolder_2] = useState(false);
  const [typeFolder_3, setTypeFolder_3] = useState(false);
  const [typeFolder_4, setTypeFolder_4] = useState(false);
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
  const handleFolderFacebook = () => {
    setTypeFolder_1(false);
    setTypeFolder_2(false);
    setTypeFolder_3(false);
    setTypeFolder_4(false);
    setTypeFolder_0(true);
    handleFilterFolder('Facebook Ads 1');
  };
  const handleFolderSeeding = () => {
    setTypeFolder_0(false);
    setTypeFolder_2(false);
    setTypeFolder_3(false);
    setTypeFolder_4(false);
    setTypeFolder_1(true);
    handleFilterFolder('Seeding 1');
  };
  const handleFolderMail_1 = () => {
    setTypeFolder_1(false);
    setTypeFolder_0(false);
    setTypeFolder_3(false);
    setTypeFolder_4(false);
    setTypeFolder_2(true);
    handleFilterFolder('Mail 1 - Alcie');
  };
  const handleFolderMail_2 = () => {
    setTypeFolder_1(false);
    setTypeFolder_2(false);
    setTypeFolder_0(false);
    setTypeFolder_4(false);
    setTypeFolder_3(true);
    handleFilterFolder('Mail 2 - Brono');
  };
  const handleFolderMail_3 = () => {
    setTypeFolder_1(false);
    setTypeFolder_2(false);
    setTypeFolder_3(false);
    setTypeFolder_0(false);
    setTypeFolder_4(true);
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
                    {!typeFolder_0 && !typeFolder_1 && !typeFolder_2 && !typeFolder_3 && !typeFolder_4 && <p>All</p>}
                    {typeFolder_0 && <p>Facebook Ads 1</p>}
                    {typeFolder_1 && <p>Seeding 1</p>}
                    {typeFolder_2 && <p>Mail 1 - Alcie</p>}
                    {typeFolder_3 && <p>Mail 2 - Brono</p>}
                    {typeFolder_4 && <p>Mail 3 - Kazza</p>}
                  </div>
                  <div className="-container-scripts__left__options__list -option-list">
                    <ul>
                      <li className="-option-item" onClick={handleFolderFacebook}>
                        <div className="-option-item__icon" style={{ background: '#E84314' }}></div>
                        <p>Facebook Ads 1</p>
                      </li>
                      <li className="-option-item" onClick={handleFolderSeeding}>
                        <div className="-option-item__icon" style={{ background: '#F6A01D' }}></div>
                        <p>Seeding 1</p>
                      </li>
                      <li className="-option-item" onClick={handleFolderMail_1}>
                        <div className="-option-item__icon" style={{ background: '#FFDE50' }}></div>
                        <p>Mail 1 - Alcie</p>
                      </li>
                      <li className="-option-item" onClick={handleFolderMail_2}>
                        <div className="-option-item__icon" style={{ background: '#81BC06' }}></div>
                        <p>Mail 2 - Brono</p>
                      </li>
                      <li className="-option-item" onClick={handleFolderMail_3}>
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
