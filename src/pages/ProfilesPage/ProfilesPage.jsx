import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Input, Popover, Table } from "antd";
import display from "../../assets/pictures/icon-display-setting.png";
import search from "../../assets/pictures/icon-search.svg";
import refresh from "../../assets/pictures/icon-refresh.png";
import settings from "../../assets/pictures/icon-settings.png";
import plus from "../../assets/pictures/icon-plus.png";
import usaProxy from "../../assets/pictures/icon-usa.png";
import options from "../../assets/pictures/icon-options.png";
import addProxy from "../../assets/pictures/icon-addProxy.png";
import deleted from "../../assets/pictures/icon-delete.svg";
<<<<<<< HEAD
import foxy from "../../assets/pictures/icon-foxy.png";
import ghosty from "../../assets/pictures/icon-ghosty.png";
import yourScript from "../../assets/pictures/icon-yourScripts.svg";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import proxy from "../../assets/pictures/icon-proxy.svg";
import { useNavigate } from "react-router-dom";
import profiles from "../../resources/profiles";
import scripts from "../../resources/scripts.json";
import {
  EditableCell,
  EditableRow,
} from "../../components/EditableTable/EditableTable";

const ProfilesPage = () => {
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const [rowKeys, setRowKeys] = useState("");
  const [openScripts, setOpenScripts] = useState(false);
  const [openProfiles, setOpenProfiles] = useState(false);
  const [openAddProxy, setOpenAddProxy] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [typeProxy, setTypeProxy] = useState("");
  const [dataProfiles, setDataProfiles] = useState(profiles);
  const [dataScripts, setDataScripts] = useState(scripts);
  const navigate = useNavigate();
=======
import yourScript from "../../assets/pictures/icon-yourScripts.svg";
import pin from "../../assets/pictures/icon-pin.svg";
import profiles from "../../resources/profiles.json";
import scripts from "../../resources/scripts.json"
import { EditableCell, EditableRow } from "../../components/EditableTable/EditableTable";
import PopupProfile from "../../components/PopupProfile/PopupProfile";
import PopupAddProxy from "../../components/PopupAddProxy/PopupAddProxy";
import PopupProxyManage from "../../components/PopupProxyManage/PopupProxyManage";
import PopupDeleteProfile from "../../components/PopupDeleteProfile/PopupDeleteProfile";
import PopupScript from "../../components/PopupScript/PopupScript";

const ProfilesPage = () => {
  const [dataProfiles, setDataProfiles] = useState(profiles)
  const [dataScripts, setDataScripts] = useState(scripts)
  const [rowKeys, setRowKeys] = useState([])
  const [openScripts, setOpenScripts] = useState(false)
  const [openProfiles, setOpenProfiles] = useState(false)
  const [openAddProxy, setOpenAddProxy] =useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] =useState(false)
  const [openProxyManage, setOpenProxyManage] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [typeProxy, setTypeProxy] = useState('')
  const navigate = useNavigate();
  //Pin and remove
  const handleActionProfiles = () => {
    setOpenOptions(true)
  }
  const handleCloseAction = () => {
    setOpenOptions(false)
  }
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
  const defaultColumns = [
    {
      title: "#",
      dataIndex: "key",
      fixed: "left",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      sorter: (a, b) => a.profile.length - b.profile.length,
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
        if (status[0] === "Running") {
          return (
            <>
              <div className="-status-profiles">{status}</div>
            </>
          );
        } else {
          return (
            <>
              <div className="-status-profiles -status-profiles-ready">
                {status}
              </div>
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
              <img src={usaProxy} alt="icon-usa"></img>
              <span>{profile}</span>
            </div>
          </>
        );
      },
    },
    {
      title: "Tag",
      dataIndex: "tag",
      width: 150,
      editable: true,
      render: (tag) => {
        return (
          <>
            <Input
              name="tag"
              value={tag}
              className="-tag-profiles"
              // onChange={(e) => setDataProfiles({})}
            ></Input>
          </>
        );
      },
      sorter: (a, b) => a.tag.length - b.tag.length,
      sortDirections: ["descend"],
    },
    {
      title: "Folder",
      dataIndex: "folder",
      sorter: (a, b) => a.folder.length - b.folder.length,
      sortDirections: ["descend"],
    },
<<<<<<< HEAD
    Table.EXPAND_COLUMN,
  ];
  const handleSave = (row) => {
    const newData = [...dataProfiles];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataProfiles(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
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
        handleSave,
      }),
    };
  });
  const columnsScripts = [
=======
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
    {
      title: '',
      dataIndex: 'key',
      render: (key) => {
        return (
<<<<<<< HEAD
          <>
            <div style={{ display: "flex", gap: "5px" }}>
              <img src={foxy} alt="icon-foxy"></img>
              <img src={ghosty} alt="icon-ghosty"></img>
            </div>
          </>
=======
          <div 
            className="-expand-icon" 
            onClick={handleActionProfiles}
          >
            <img src={options} alt="image-option"></img>
            {rowKeys === key  && 
                <Popover 
                  open={openOptions} 
                  onClose={handleCloseAction} 
                  placement="leftTop"
                  content={
                    <div className="-popover-options" onMouseLeave={handleCloseAction}>
                      <div className="-popover-options__attribute border-bottom">
                        <img src={pin} alt="icon-pin"></img>
                        <p>Pin</p>
                      </div>
                      <div className="-popover-options__attribute">
                        <img src={deleted} alt="icon-deleted"></img>
                        <p>Remove</p>
                      </div>
                    </div>
                  }
                  >
                </Popover>             
            }
          </div>
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
        );
      }     
    },
<<<<<<< HEAD
    {
      title: "Browser",
      dataIndex: "browser",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        if (status[0] === "Running") {
          return (
            <>
              <div className="-status-profiles">{status}</div>
            </>
          );
        } else {
          return (
            <>
              <div className="-status-profiles -status-profiles-ready">
                {status}
              </div>
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
    },
  ];

=======
  ];
  const handleSave = (row) => {
    const newData = [...dataProfiles];
    const index = newData.findIndex((profile) => row.key === profile.key);
    const profile = newData[index];
    newData.splice(index, 1, {
      ...profile,
      ...row,
    });
    setDataProfiles(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
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
        handleSave,
      }),
    };
  });
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  //handle filter folder
  const handleFilterFolder = (type) => {
      const facebookFolder = profiles.filter((profile) => profile.folder === type);
      setDataProfiles(facebookFolder);
  };
  
  const handleSettings = () => {
    navigate("/settings");
  };
  const handleSettingsProxy = () => {
    navigate("/settings-proxy");
  };
  //scripts
  const handleOpenScripts = () => {
    setOpenScripts(true);
  };
  const handleCloseScripts = () => {
<<<<<<< HEAD
    setOpenScripts(false);
  };
  //
=======
    setOpenScripts(false)
  }
  //profiles
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
  const handleOpenProfiles = () => {
    setOpenProfiles(true);
  };
  const handleCloseProfiles = () => {
<<<<<<< HEAD
    setOpenProfiles(false);
  };
=======
    setOpenProfiles(false)
  }
  //proxy
  const handleOpenProxyManage = () => {
    setOpenProxyManage(true)
  }
  const handleCloseProxyManage = () => {
    setOpenProxyManage(false)
  }
  //
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
  const handleCloseAdd = () => {
    setOpenAddProxy(false);
  };
  const handleCloseDelete = () => {
    setOpenDeleteProfile(false);
  };
  const onChangeTypeProxy = (e) => {
<<<<<<< HEAD
    setTypeProxy(e.target.value);
  };
=======
    setTypeProxy(e.target.value)
  }
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b

  return (
    <div
      className="layout-profiles"
      style={{
        opacity:
          openAddProxy || openDeleteProfile || openScripts || openProfiles
            ? 0.2
            : 1,
      }}
    >
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
              <span className="-option-profiles">
                <img src={yourScript} alt="icon-yourscripts"></img>
              </span>
              <span className="-option-profiles" onClick={handleOpenProfiles}>
                <img src={plus} alt="image-plus"></img>
              </span>
<<<<<<< HEAD
              <PopupComponent
                open={openProfiles}
                onClose={handleCloseProfiles}
                style={{ margin: "auto" }}
              >
                {
                  <div className="-layout-choose-scripts">
                    <div className="-layout-choose-scripts__container">
                      <div className="-nav-scripts">
                        <div className="-nav-scripts__header">
                          <div
                            className="-nav-scripts__header__close"
                            onClick={handleCloseProfiles}
                          >
                            <img src={closePopup} alt="icon-x"></img>
                          </div>
                          <h1>CHOOSE PROFILES</h1>
                        </div>
                        <div className="-wrapper-option-profiles -nav-scripts__btn">
                          <span
                            className="-option-profiles"
                            onClick={handleSettings}
                          >
                            <img src={settings} alt="image-settings"></img>
                          </span>
                          <span
                            className="-option-profiles"
                            onClick={handleOpenScripts}
                          >
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
                            <div className="-container-scripts__left__options__type">
                              <p>All</p>
                            </div>
                            <div className="-container-scripts__left__options__list -option-list">
                              <ul>
                                <li className="-option-item">
                                  <div
                                    className="-option-item__icon"
                                    style={{ background: "#E84314" }}
                                  ></div>
                                  <p>Facebook Ads 1</p>
                                </li>
                                <li className="-option-item">
                                  <div
                                    className="-option-item__icon"
                                    style={{ background: "#F6A01D" }}
                                  ></div>
                                  <p>Seeding 1</p>
                                </li>
                                <li className="-option-item">
                                  <div
                                    className="-option-item__icon"
                                    style={{ background: "#FFDE50" }}
                                  ></div>
                                  <p>Mail 1 - Alcie</p>
                                </li>
                                <li className="-option-item">
                                  <div
                                    className="-option-item__icon"
                                    style={{ background: "#81BC06" }}
                                  ></div>
                                  <p>Mail 1 - Brono</p>
                                </li>
                                <li className="-option-item">
                                  <div
                                    className="-option-item__icon"
                                    style={{ background: "#00ADEF" }}
                                  ></div>
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
=======
              <PopupProfile
                dataProfiles={dataProfiles}
                openProfiles={openProfiles}
                handleCloseProfiles={handleCloseProfiles}
                handleSettings={handleSettings}
                handleOpenScripts={handleOpenScripts}
                handleFilterFolder={handleFilterFolder}
              >
              </PopupProfile>
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
            </div>
          </div>
          <div className="-btn-profiles">
            <div
              className="-select-profile"
              onClick={() => setOpenAddProxy((o) => !o)}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={addProxy}
                  alt="icon-add-proxy"
                  width={15}
                  height={15}
                ></img>
              </div>
              <p>Add Proxy</p>
            </div>
<<<<<<< HEAD
            <PopupComponent
              open={openAddProxy}
              onClose={handleCloseAdd}
              style={{ margin: "auto" }}
            >
              {
                <div className="modal">
                  <div className="-add-proxys">
                    <div className="-close-popup" onClick={handleCloseAdd}>
                      <img src={closePopup} alt="icon-x"></img>
                    </div>
                    <h1>ADD PROXY</h1>
                    <p>
                      Add new proxies to <b>2 profiles</b>
                    </p>
                    <div className="-add-proxys__type">
                      <p>Connection type</p>
                      <div className="-add-proxys-nav">
                        <div className="-add-proxys__type__text">
                          <div className="-add-proxys__type__text__option">
                            <select
                              name="typeProxy"
                              onChange={onChangeTypeProxy}
                              value={typeProxy}
                            >
                              <option value="Without proxy">
                                Without proxy
                              </option>
                              <option value="Your Proxy">Your Proxy</option>
                              <option value="Free Proxy">Free Proxy</option>
                            </select>
                          </div>
                        </div>
                        <div className="-add-proxys__type__icon">
                          <img src={proxy} alt="icon-proxy"></img>
                        </div>
                      </div>
                    </div>
                    <div className="-add-proxys__type">
                      <p>Proxy list</p>
                      <div className="-add-proxys-nav -list-proxys">
                        <textarea name="" type="text"></textarea>
                        <div className="-form-instruct">
                          <p style={{ marginRight: "19px" }}>
                            <span>1</span>Enter the content here
                          </p>
                          <p style={{ marginRight: "19px" }}>
                            <span>2</span>
                            <b>Proxy format: </b>IP:Port:Username:Password
                          </p>
                          <p>
                            <span>3</span>1 proxy/line
                          </p>
                          <p>
                            <span>4</span>The number of proxies should not be
                            less or more than the number of profiles
                          </p>
                        </div>
                        <div className="-list-proxys__save">Save</div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </PopupComponent>
            <div
              className="-select-profile"
              onClick={() => setOpenDeleteProfile((o) => !o)}
            >
              <div>
                <img src={deleted} alt="icon-delete"></img>
              </div>
              <p>Remove</p>
            </div>
            <PopupComponent
              open={openDeleteProfile}
              onClose={handleCloseDelete}
            >
              {
                <div className="-delete-profiles">
                  <div className="-delete-profiles__content">
                    <h1>REMOVE</h1>
                    <p>Are you sure to remove the profiles?</p>
                    <div className="-delete-profiles__content__confirm">
                      <button
                        type="button"
                        style={{ background: "#F5F5F5", color: "#01162B" }}
                        onClick={handleCloseDelete}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        style={{ background: "#2A86FF", color: "#fff" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              }
            </PopupComponent>
            <div onClick={handleOpenScripts}>
              <button>Run</button>
            </div>
            <PopupComponent
              open={openScripts}
              onClose={handleCloseScripts}
              style={{ margin: "auto" }}
            >
              {
                <div className="-layout-choose-scripts">
                  <div className="-layout-choose-scripts__container">
                    <div className="-nav-scripts">
                      <div className="-nav-scripts__header">
                        <div
                          className="-nav-scripts__header__close"
                          onClick={handleCloseScripts}
                        >
                          <img src={closePopup} alt="icon-x"></img>
                        </div>
                        <h1>CHOOSE SCRIPT</h1>
                      </div>
                      <div className="-wrapper-option-profiles -nav-scripts__btn">
                        <span
                          className="-option-profiles"
                          onClick={handleSettings}
                        >
                          <img src={settings} alt="image-settings"></img>
                        </span>
                        <span
                          className="-option-profiles"
                          onClick={handleOpenScripts}
                        >
                          <img src={yourScript} alt="icon-yourscripts"></img>
                        </span>
                        <div>
                          <button>Run</button>
                        </div>
                      </div>
                    </div>
                    <div className="-container-scripts">
                      <div className="-container-scripts__left">
                        <div className="-container-scripts__left__options">
                          <div className="-container-scripts__left__options__type">
                            <p>All</p>
                          </div>
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
=======
              <PopupAddProxy
                typeProxy={typeProxy}
                openAddProxy={openAddProxy}
                handleCloseAdd={handleCloseAdd}
                handleOpenProxyManage={handleOpenProxyManage}
                onChangeTypeProxy={onChangeTypeProxy}
              ></PopupAddProxy>
              <PopupProxyManage
                openProxyManage={openProxyManage}
                handleCloseProxyManage={handleCloseProxyManage}
              ></PopupProxyManage>
            <div className="-select-profile" onClick={() => setOpenDeleteProfile(o => !o)}>
              <div><img src={deleted} alt="icon-delete"></img></div>
                <p>Remove</p>
            </div>
            <PopupDeleteProfile openDeleteProfile={openDeleteProfile} handleCloseDelete={handleCloseDelete}></PopupDeleteProfile>
            <div onClick={handleOpenScripts}>
              <button>Run</button>
            </div>
            <PopupScript
              dataScripts={dataScripts}
              openScripts={openScripts}
              handleCloseScripts={handleCloseScripts}
              handleSettings={handleSettings}
              handleOpenScripts={handleOpenScripts}
            ></PopupScript>
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
          </div>
        </div>
        <div className="-content-profiles">
          <div className="scrollable-container">
            <Table
              rowSelection={{
                ...rowSelection,
              }}
<<<<<<< HEAD
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    setRowKeys(record.key);
                  },
                };
              }}
              components={components}
              rowClassName={() => "editable-row"}
              expandable={{
                expandedRowRender: () => (
                  // <div className="-options">
                  //   <div className="">
                  //     <img src={proxy} alt=""></img>
                  //     <p>Pin</p>
                  //   </div>
                  // </div>
                  <></>
                ),
                expandIcon: () => {
                  return (
                    <div
                      className="-expand-icon"
                      // onClick={(e) => onExpand(record, e)}
                      onClick={() => setOpenOptions(true)}
                    >
                      <img src={options} alt="image-option"></img>
                      <PopupComponent
                        open={openOptions}
                        position={"left center"}
                        onClose={() => setOpenOptions(false)}
                      >
                        {
                          <div className="-options">
                            <div className="">
                              <img src={proxy} alt=""></img>
                              <p>Pin</p>
                            </div>
                          </div>
                        }
                      </PopupComponent>
                    </div>
                  );
                },
=======
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setRowKeys(record.key)
                  },
                };
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
              }}
              components={components}
              rowClassName={() => 'editable-row'}
              columns={columns}
              dataSource={dataProfiles}
              // scroll={{ y: 720 }}
              pagination={false}
            /> 
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ProfilesPage;
