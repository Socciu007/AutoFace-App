import React from "react";
import "./style.scss";
import { Table, Tag } from "antd";
import display from "../../assets/pictures/icon-display-setting.png";
import search from "../../assets/pictures/icon-search.svg";
import refresh from "../../assets/pictures/icon-refresh.png";
import settings from "../../assets/pictures/icon-settings.png";
import plus from "../../assets/pictures/icon-x.png";
import usaProxy from "../../assets/pictures/icon-usa-proxy.png";
import circle from "../../assets/pictures/icon-circle.svg";
import script from "../../assets/pictures/icon-script.svg";
import options from "../../assets/pictures/icon-options.png";
import { useNavigate } from "react-router-dom";

const ProfilesPage = () => {
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
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
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
  return (
    <div className="layout-profiles">
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
                <img
                  src={circle}
                  alt="circle"
                  style={{ position: "absolute" }}
                ></img>
                <img src={script} alt="script"></img>
              </span>
              <span className="-option-profiles">
                <img src={plus} alt="image-plus"></img>
              </span>
            </div>
          </div>
          <div className="-btn-profiles">
            <button>Run</button>
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
