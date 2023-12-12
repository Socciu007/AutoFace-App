import React from 'react'
import PopupComponent from '../PopupComponent/PopupComponent'
import closePopup from "../../assets/pictures/icon-x.svg";
import settings from "../../assets/pictures/icon-settings.png";
import yourScript from "../../assets/pictures/icon-yourScripts.svg";
import search from "../../assets/pictures/icon-search.svg";
import foxy from "../../assets/pictures/icon-foxy.png";
import ghosty from "../../assets/pictures/icon-ghosty.png";
import usaProxy from "../../assets/pictures/icon-usa.png";
import { Table } from 'antd';

const PopupProfile = ({dataProfiles, openProfiles, handleCloseProfiles, handleSettings, handleOpenScripts, handleFilterFolder}) => {
    // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
      );
    },
  };
  const columnsProfiles = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      sorter: (a, b) => a.profile - b.profile,
    },
    {
      title: "Source",
      dataIndex: "source",
      render: () => {
        return (
          <>
          <div style={{display: 'flex', gap: '5px'}}>
            <img src={foxy} alt="icon-foxy"></img>
            <img src={ghosty} alt="icon-ghosty"></img>
          </div>
          </>
        );
      },
    },
    {
      title: "Browser",
      dataIndex: "browser",
    },
    {
      title: "Status",
      dataIndex: "status",
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
      sortDirections: ["descend"],
    },
    {
      title: "Proxy",
      dataIndex: "proxy",
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
      title: "Notes",
      dataIndex: "notes",
    }
  ];
    return (
    <PopupComponent
              open={openProfiles} 
              onClose={handleCloseProfiles}
            >
              {
                <div className='-layout-choose-scripts'>
                  <div className="-layout-choose-scripts__container">
                    <div className="-nav-scripts">
                      <div className="-nav-scripts__header">
                        <div className="-nav-scripts__header__close" onClick={handleCloseProfiles}>
                          <img src={closePopup} alt="icon-x"></img>
                        </div>           
                        <h1>CHOOSE PROFILES</h1>
                      </div>
                      <div className="-wrapper-option-profiles -nav-scripts__btn">
                        <span className="-option-profiles" onClick={handleSettings}>
                          <img src={settings} alt="image-settings"></img>
                        </span>
                        <span className="-option-profiles" onClick={handleOpenScripts}>
                          <img src={yourScript} alt="icon-yourscripts"></img>
                        </span>
                        <div>
                          <button>ADD</button>
                        </div>
                      </div>
                    </div>
                    <div className="-container-scripts">
                      <div className="-container-scripts__left">
                        <div className="-container-scripts__left__options">
                          <h1>FOLDER</h1>
                          <div className="-container-scripts__left__options__type"><p>All</p></div>
                          <div className="-container-scripts__left__options__list -option-list">
                            <ul>
                              <li className="-option-item" 
                              onClick={()=>{handleFilterFolder('Facebook Ads 1')}}
                              >                               
                                <div className="-option-item__icon" style={{background: '#E84314'}}></div>
                                <p>Facebook Ads 1</p>
                              </li>
                              <li className="-option-item" 
                              onClick={()=>{handleFilterFolder('Seeding 1')}}
                              >
                                <div className="-option-item__icon" style={{background: '#F6A01D'}}></div>
                                <p>Seeding 1</p>
                              </li>
                              <li className="-option-item" 
                              // onClick={handleFilterFolder('Mail 1 - Alcie')}
                              >
                                <div className="-option-item__icon" style={{background: '#FFDE50'}}></div>
                                <p>Mail 1 - Alcie</p>
                              </li>
                              <li className="-option-item" 
                              // onClick={handleFilterFolder('Mail 1 - Brono')}
                              >
                                <div className="-option-item__icon" style={{background: '#81BC06'}}></div>
                                <p>Mail 1 - Brono</p>
                              </li >
                              <li className="-option-item" 
                              // onClick={handleFilterFolder('Mail 3 - Kazza')}
                              >
                                <div className="-option-item__icon" style={{background: '#00ADEF'}}></div>
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
                                <img
                                  src={search}
                                  alt="icon-search"
                                  style={{ marginLeft: "11px" }}
                                ></img>
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
  )
}

export default PopupProfile