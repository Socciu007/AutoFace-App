import React, { useState } from "react";
import "./style.scss";
import { Table, Tag } from "antd";
import display from "../../assets/pictures/icon-display-setting.png";
import search from "../../assets/pictures/icon-search.svg";
import refresh from "../../assets/pictures/icon-refresh.png";
import settings from "../../assets/pictures/icon-settings.png";
import plus from "../../assets/pictures/icon-plus.png";
import plus1 from "../../assets/pictures/icon-plus.svg";
import closePopup from "../../assets/pictures/icon-x.svg";
import usaProxy from "../../assets/pictures/icon-usa-proxy.png";
import circle from "../../assets/pictures/icon-circle.svg";
import script from "../../assets/pictures/icon-script.svg";
import options from "../../assets/pictures/icon-options.png";
import addProxy from "../../assets/pictures/icon-addproxy.svg";
import deleted from "../../assets/pictures/icon-delete.svg";
import { useNavigate } from "react-router-dom";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import downup from "../../assets/pictures/icon-down.svg";
import proxy from "../../assets/pictures/icon-proxy.svg"

const ProfilesPage = () => {
  const [openScripts, setOpenScripts] = useState(false)
  const [openProfiles, setOpenProfiles] = useState(false)
  const [openAddProfile, setOpenAddProfile] =useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] =useState(false)
  const columns = [
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
      title: "UID",
      dataIndex: "uid",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return (
          <>
            <Tag className="-tag-status">{status}</Tag>
          </>
        );
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
      title: "Tag",
      dataIndex: "tag",
      sorter: (a, b) => a.tag.length - b.tag.length,
      sortDirections: ["descend"],
    },
    {
      title: "Folder",
      dataIndex: "folder",
      sorter: (a, b) => a.folfer.length - b.name.length,
      sortDirections: ["descend"],
    },
    Table.EXPAND_COLUMN,
  ];
  const columnsScripts = [
    {
      title: "Scripts",
      dataIndex: "scripts",
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
  ];
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
    },
    {
      title: "Browser",
      dataIndex: "browser",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return (
          <>
            <Tag className="-tag-status">{status}</Tag>
          </>
        );
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
  const data = [
    {
      key: "1",
      profile: "tienvm",
      uid: "1001228343452345",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "2",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "3",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
  ];
  const dataScripts = [
    {
      scripts: "automation-x",
      notes: "add cookie",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "Meta marks",
    },
    {
      scripts: "automation-x",
      notes: "X",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
    {
      scripts: "automation-x",
      notes: "",
    },
  ]
  const dataProfiles = [
    {
      key: "1",
      profile: "tienvm",
      uid: "1001228343452345",
      browser: "Chorm",
      notes: "Cookie Added",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "2",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      browser: "Chorm",
      notes: "Cookie Added",
      status: ["Running"],
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "3",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      browser: "Chorm",
      notes: "Cookie Added",
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      browser: "Chorm",
      notes: "Cookie Added",
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "5",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      browser: "Chorm",
      notes: "Cookie Added",
      tag: "#Group",
      folder: "Group",
    },
    {
      key: "6",
      name: "John Brown",
      age: 32,
      proxy: "127.0.0.1:40001",
      status: ["Running"],
      browser: "Chorm",
      notes: "Cookie Added",
      tag: "#Group",
      folder: "Group",
    },
  
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
      );
    },
  };
  const rowSelectionScript = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
      );
    },
  };
  const navigate = useNavigate();
  const handleSettings = () => {
    navigate("/settings");
  };
  const handleSettingsProxy = () => {
    navigate("/settings-proxy");
  };
  const handleOpenScripts = () => {
    setOpenScripts(true)
  }
  const handleCloseScripts = () => {
    setOpenScripts(false)
  }
  const handleOpenProfiles = () => {
    setOpenProfiles(true)
  }
  const handleCloseProfiles = () => {
    setOpenProfiles(false)
  }
  const handleCloseAdd = () => {
    setOpenAddProfile(false)
  }
  const handleCloseDelete = () => {
    setOpenDeleteProfile(false)
  }
  return (
    <div className="layout-profiles" style={{ opacity: openAddProfile || openDeleteProfile || openScripts || openProfiles ? 0.2 : 1 }}>
      <div className="-container-profiles">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-nav-profiles">
          <div className="-subnav-profiles">
            <div className="-search-profiles">
              <span>
                <img
                  src={search}
                  alt="search"
                  style={{ marginLeft: "11px" }}
                ></img>
              </span>
              <input placeholder="Search..."></input>
            </div>
            <div className="-wrapper-option-profiles">
              <span className="-option-profiles">
                <img src={refresh} alt="image-refresh"></img>
              </span>
              <span className="-option-profiles" onClick={handleSettingsProxy}>
                <img src={display} alt="display-setting"></img>
              </span>
              <span className="-option-profiles" onClick={handleSettings}>
                <img src={settings} alt="image-settings"></img>
              </span>
              <span className="-option-profiles" onClick={handleOpenScripts}>
                <img
                  src={circle}
                  alt="circle"
                  style={{ position: "absolute" }}
                ></img>
                <img src={script} alt="script"></img>
              </span>
              <PopupComponent
              open={openScripts} 
              onClose={handleCloseScripts}
              style={{margin: 'auto'}}
            >
              {
                <div className='-layout-choose-scripts'>
                  <div className="-layout-choose-scripts__container">
                    <div className="-nav-scripts">
                      <div className="-nav-scripts__header">
                        <div className="-nav-scripts__header__close" onClick={handleCloseScripts}>
                          <img src={closePopup} alt="icon-x"></img>
                        </div>           
                        <h1>CHOOSE SCRIPT</h1>
                      </div>
                      <div className="-wrapper-option-profiles -nav-scripts__btn">
                        <span className="-option-profiles" onClick={handleSettings}>
                          <img src={settings} alt="image-settings"></img>
                        </span>
                        <span className="-option-profiles" onClick={handleOpenScripts}>
                          <img
                            src={circle}
                            alt="circle"
                            style={{ position: "absolute" }}
                          ></img>
                          <img src={script} alt="script"></img>
                        </span>
                        <div>
                          <button>Run</button>
                        </div>
                      </div>
                    </div>
                    <div className="-container-scripts">
                      <div className="-container-scripts__left">
                        <div className="-container-scripts__left__options">
                          <div className="-container-scripts__left__options__type"><p>All</p></div>
                          <div className="-container-scripts__left__options__list">
                            <ul>
                              <li>System’s script</li>
                              <li>Your script</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="-container-scripts__right">
                        <div className="-container-scripts__right__main">
                          <div className="-container-scripts__right__main__search">
                            <h1>SCRIPTS</h1>
                            <div className="-search-profiles">
                              <span>
                                <img
                                  src={search}
                                  alt="search"
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
                                  ...rowSelectionScript,
                                }}
                                columns={columnsScripts}
                                dataSource={dataScripts}
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
              <span className="-option-profiles" onClick={handleOpenProfiles}>
                <img src={plus} alt="image-plus"></img>
              </span>
              <PopupComponent
              open={openProfiles} 
              onClose={handleCloseProfiles}
              style={{margin: 'auto'}}
            >
              {
                <div className='-layout-choose-scripts'>
                  <div className="-layout-choose-scripts__container">
                    <div className="-nav-scripts">
                      <div className="-nav-scripts__header">
                        <div className="-nav-scripts__header__close" onClick={handleCloseProfiles}>
                          <img src={closePopup} alt="icon-x"></img>
                        </div>           
                        <h1>PROFILES</h1>
                      </div>
                      <div className="-wrapper-option-profiles -nav-scripts__btn">
                        <span className="-option-profiles" onClick={handleSettings}>
                          <img src={settings} alt="image-settings"></img>
                        </span>
                        <span className="-option-profiles" onClick={handleOpenScripts}>
                          <img
                            src={circle}
                            alt="circle"
                            style={{ position: "absolute" }}
                          ></img>
                          <img src={script} alt="script"></img>
                        </span>
                        <div>
                          <button>Run</button>
                        </div>
                      </div>
                    </div>
                    <div className="-container-scripts">
                      <div className="-container-scripts__left">
                        <div className="-container-scripts__left__options">
                          <div className="-container-scripts__left__options__type"><p>All</p></div>
                          <div className="-container-scripts__left__options__list">
                            <ul>
                              <li>System’s script</li>
                              <li>Your script</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="-container-scripts__right">
                        <div className="-container-scripts__right__main">
                          <div className="-container-scripts__right__main__search">
                            <h1>SCRIPTS</h1>
                            <div className="-search-profiles">
                              <span>
                                <img
                                  src={search}
                                  alt="search"
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
            </div>
          </div>
          <div className="-btn-profiles">
            <div className="-select-profile" onClick={() => setOpenAddProfile(o => !o)}>
              <div style={{position: 'relative'}}>
                <img src={addProxy} alt="icon-add-proxy"></img>
                <img src={plus1} alt="icon-plus" style={{position: 'absolute', top: '12%', left:'52%'}}></img>
              </div>
              <p>Add Proxy</p>
            </div>
            <PopupComponent
              open={openAddProfile} 
              onClose={handleCloseAdd}
              style={{margin: 'auto'}}
            >
              {
                <div className='modal'>
                  <div className='-add-proxys'>
                    <div className="-close-popup" onClick={handleCloseAdd}>
                      <img src={closePopup} alt="icon-x"></img>
                    </div>           
                    <h1>ADD PROXY</h1>
                    <p>Add new proxies to <b>2 profiles</b></p>
                    <div className='-add-proxys__type'>
                      <p>Connection type</p>
                      <div className='-add-proxys-nav'>
                        <div className='-add-proxys__type__text'>
                          <input
                            name="numbersProfiles"
                            value="Without proxy"
                            onChange={() => {}}
                          ></input>
                          <div className="-add-proxys__type__text__icon">
                            <img src={downup} alt="down-up"></img>
                          </div>
                        </div>
                        <div className='-add-proxys__type__icon'>
                          <img src={proxy} alt='icon-proxy'></img>
                        </div>
                      </div>
                    </div>
                    <div className='-add-proxys__type'>
                      <p>Proxy list</p>
                      <div className='-add-proxys-nav -list-proxys'>
                        <textarea></textarea>
                        <div className='-form-instruct'>
                          <p style={{marginRight: '19px'}}><span>1</span>Enter the content here</p>
                          <p style={{marginRight: '19px'}}><span>2</span><b>Proxy format: </b>IP:Port:Username:Password</p>
                          <p><span>3</span>1 proxy/line</p>
                          <p ><span>4</span>The number of proxies should not be less or more than the number of profiles</p>
                        </div>
                        <div className='-list-proxys__save'>
                          Save
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </PopupComponent>
            <div className="-select-profile" onClick={() => setOpenDeleteProfile(o => !o)}>
              <div><img src={deleted} alt="icon-delete"></img></div>
                <p>Remove</p>
            </div>
            <PopupComponent open={openDeleteProfile} onClose={handleCloseDelete}>
              {
                <div className="-delete-profiles">
                  <div className="-delete-profiles__content">
                    <h1>REMOVE</h1>
                    <p>Are you sure to remove the profiles?</p>
                    <div className="-delete-profiles__content__confirm">
                      <button type="button" style={{background: '#F5F5F5', color: '#01162B'}} onClick={handleCloseDelete}>Cancel</button>
                      <button type="button" style={{background: '#2A86FF', color: '#fff'}}>Remove</button>
                    </div>
                  </div>
                </div>
              }
            </PopupComponent>
            <div>
              <button>Run</button>
            </div>
          </div>
        </div>
        <div className="-content-profiles">
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            expandable={{
              expandIcon: () => {
                return (
                  <div className="-expand-icon">
                    <img src={options} alt="image-option"></img>
                  </div>
                );
              },
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
