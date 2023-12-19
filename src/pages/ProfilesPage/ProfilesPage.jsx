import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Input, Popover, Table, Tooltip } from 'antd';
import display from '../../assets/pictures/icon-display-setting.png';
import search from '../../assets/pictures/icon-search.svg';
import refresh from '../../assets/pictures/icon-refresh.png';
import settings from '../../assets/pictures/icon-settings.png';
import plus from '../../assets/pictures/icon-plus.png';
import usaProxy from '../../assets/pictures/icon-usa.png';
import options from '../../assets/pictures/icon-options.png';
import addProxy from '../../assets/pictures/icon-addProxy.png';
import deleted from '../../assets/pictures/icon-delete.svg';
import yourScript from '../../assets/pictures/icon-yourScripts.svg';
import pin from '../../assets/pictures/icon-pin.svg';
import shareIcon from '../../assets/pictures/icon-share.svg';
import iosIcon from '../../assets/pictures/icon-ios.png';
import linuxIcon from '../../assets/pictures/icon-linux.png';
import windowIcon from '../../assets/pictures/icon-window.svg';
import androidIcon from '../../assets/pictures/icon-android.png';
import profiles from '../../resources/profiles.json';
import scripts from '../../resources/scripts.json';
import { EditableCell, EditableRow } from '../../components/EditableTable/EditableTable';
import PopupProfile from '../../components/PopupHome/PopupProfile/PopupProfile';
import PopupAddProxy from '../../components/PopupHome/PopupAddProxy/PopupAddProxy';
import PopupProxyManage from '../../components/PopupHome/PopupProxyManage/PopupProxyManage';
import PopupDeleteProfile from '../../components/PopupHome/PopupDeleteProfile/PopupDeleteProfile';
import PopupScript from '../../components/PopupHome/PopupScript/PopupScript';

const ProfilesPage = () => {
  const [dataProfiles, setDataProfiles] = useState(profiles);
  const [dataScripts, setDataScripts] = useState(scripts);
  const [rowKeys, setRowKeys] = useState([]);
  const [openScripts, setOpenScripts] = useState(false);
  const [openProfiles, setOpenProfiles] = useState(false);
  const [openAddProxy, setOpenAddProxy] = useState(false);
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openProxyManage, setOpenProxyManage] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [typeProxy, setTypeProxy] = useState('');
  const navigate = useNavigate();
  //Pin and remove
  const handleActionProfiles = () => {
    setOpenOptions(true);
  };
  const handleCloseAction = () => {
    setOpenOptions(false);
  };
  const defaultColumns = [
    {
      title: '#',
      dataIndex: 'key',
      width: 50,
      fixed: 'left',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      width: 200,
      render: (profile) => {
        return (
          <div className="-text-profile">
            <span>{profile}</span>
            {profile === 'tienvm1' && <img src={pin} alt="icon-pin"></img>}
            {profile && <img src={shareIcon} alt="icon-share"></img>}
            {profile === 'test' && <img src={windowIcon} alt="icon-window"></img>}
            {profile === 'test1' && <img src={iosIcon} alt="icon-ios" width={15} height={14}></img>}
            {profile === 'test2' && <img src={linuxIcon} alt="icon-linux" width={11.04} height={13}></img>}
            {profile === 'tienvm2' && <img src={androidIcon} alt="icon-android" width={13} height={13}></img>}
          </div>
        );
      },
      sorter: (a, b) => a.profile.length - b.profile.length,
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Date of birth',
      dataIndex: 'birth',
      width: 200,
    },
    {
      title: 'Friends',
      dataIndex: 'friends',
      width: 150,
    },
    {
      title: 'Group',
      dataIndex: 'group',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      width: 150,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
    },
    {
      title: `Email's password`,
      dataIndex: 'emailpass',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
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
      ellipsis: true,
      width: 150,
      render: (proxy) => {
        return (
          // <div style={{ display: 'inline' }}>
          //   {/* <div className="-proxy-profiles"> */}
          //   <span>
          //     <img src={usaProxy} alt="icon-usa" width={22.89} height={15}></img>
          //     {proxy}
          //   </span>
          //   {/* </div> */}
          // </div>
          <Tooltip placement="topLeft" title={proxy}>
            {/* <img src={usaProxy} alt="icon-usa" width={22.89} height={15}></img> */}
            {proxy}
          </Tooltip>
        );
      },
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      width: 150,
      editable: true,
      render: (tag) => {
        return <Input name="tag" value={tag} className="-tag-profiles" onChange={(e) => e.target.value}></Input>;
      },
      sorter: (a, b) => a.tag.length - b.tag.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Folder',
      dataIndex: 'folder',
      width: 150,
      sorter: (a, b) => a.folder.length - b.folder.length,
      sortDirections: ['descend'],
    },
    {
      title: '',
      dataIndex: 'key',
      width: 50,
      fixed: 'right',
      render: (key) => {
        return (
          <div className="-expand-icon" onClick={handleActionProfiles}>
            <img src={options} alt="image-option"></img>
            {rowKeys === key && (
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
              ></Popover>
            )}
          </div>
        );
      },
    },
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
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
  };

  const handleAllFolder = () => {
    setDataProfiles(profiles);
  };
  //handle filter folder profile
  const handleFilterFolder = (type) => {
    const facebookFolder = profiles.filter((profile) => profile.folder === type);
    setDataProfiles(facebookFolder);
  };
  //handle type scrip
  const handleTypeScript = (type) => {
    const scrip = scripts.filter((scrip) => scrip.isSystem === type);
    setDataScripts(scrip);
  };

  const handleSettings = () => {
    navigate('/settings');
  };
  const handleScript = () => {
    navigate('/scripManager');
  };
  const handleReloadPage = () => {
    window.location.reload();
  };
  //scripts
  const handleOpenScripts = () => {
    setOpenScripts(true);
  };
  const handleCloseScripts = () => {
    setOpenScripts(false);
  };
  //profiles
  const handleOpenProfiles = () => {
    setOpenProfiles(true);
  };
  const handleCloseProfiles = () => {
    setOpenProfiles(false);
  };
  //proxy
  const handleOpenProxyManage = () => {
    setOpenProxyManage(true);
  };
  const handleCloseProxyManage = () => {
    setOpenProxyManage(false);
  };
  //
  const handleCloseAdd = () => {
    setOpenAddProxy(false);
  };
  const handleCloseDelete = () => {
    setOpenDeleteProfile(false);
  };
  const onChangeTypeProxy = (e) => {
    setTypeProxy(e.target.value);
  };

  return (
    <div
      className="layout-profiles"
      style={{ opacity: openAddProxy || openDeleteProfile || openScripts || openProfiles || openProxyManage ? 0.3 : 1 }}
    >
      <div className="-container-profiles">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-nav-profiles">
          <div className="-subnav-profiles">
            <div className="-search-profiles">
              <span>
                <img src={search} alt="search" style={{ marginLeft: '11px' }}></img>
              </span>
              <input placeholder="Search..."></input>
            </div>
            <div className="-wrapper-option-profiles">
              <span className="-option-profiles" onClick={handleReloadPage}>
                <img src={refresh} alt="image-refresh"></img>
              </span>
              <span className="-option-profiles">
                <img src={display} alt="display-setting"></img>
              </span>
              <span className="-option-profiles" onClick={handleSettings}>
                <img src={settings} alt="image-settings"></img>
              </span>
              <span className="-option-profiles" onClick={handleScript}>
                <img src={yourScript} alt="icon-yourscripts"></img>
              </span>
              <span className="-option-profiles" onClick={handleOpenProfiles}>
                <img src={plus} alt="image-plus"></img>
              </span>
              <PopupProfile
                dataProfiles={dataProfiles}
                openProfiles={openProfiles}
                handleCloseProfiles={handleCloseProfiles}
                handleFilterFolder={handleFilterFolder}
                handleAllFolder={handleAllFolder}
              ></PopupProfile>
            </div>
          </div>
          <div className="-btn-profiles">
            <div className="-select-profile" onClick={() => setOpenAddProxy((o) => !o)}>
              <div style={{ position: 'relative' }}>
                <img src={addProxy} alt="icon-add-proxy" width={15} height={15}></img>
              </div>
              <p>Add Proxy</p>
            </div>
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
            <div className="-select-profile" onClick={() => setOpenDeleteProfile((o) => !o)}>
              <div>
                <img src={deleted} alt="icon-delete"></img>
              </div>
              <p>Remove</p>
            </div>
            <PopupDeleteProfile
              openDeleteProfile={openDeleteProfile}
              handleCloseDelete={handleCloseDelete}
              handleRemove={handleCloseDelete}
            ></PopupDeleteProfile>
            <div onClick={handleOpenScripts}>
              <button>Run</button>
            </div>
            <PopupScript
              dataScripts={dataScripts}
              openScripts={openScripts}
              handleCloseScripts={handleCloseScripts}
              handleSettings={handleSettings}
              handleOpenScripts={handleScript}
              handleTypeScript={handleTypeScript}
            ></PopupScript>
          </div>
        </div>
        <div className="-content-profiles">
          {/* <div className="scrollable-container"> */}
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setRowKeys(record.key);
                },
              };
            }}
            components={components}
            rowClassName={() => 'editable-row'}
            columns={columns}
            dataSource={dataProfiles}
            scroll={{ x: 1280, y: 480 }}
            pagination={false}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
