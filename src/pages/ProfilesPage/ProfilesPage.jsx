import React from "react";
import "./style.scss";
import { Table, Tag } from "antd";
import display from "../../assets/pictures/icon-display-setting.png";
import usaProxy from "../../assets/pictures/icon-usa-proxy.png";
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
            <Tag
              style={{
                width: "64px",
                height: "20px",
                padding: "3px 8px",
                border: "none",
                borderRadius: "14px",
                background: "rgba(241, 180, 76, 0.2)",
                color: "rgb(241, 180, 76)",
                fontSize: "12px",
                fontWeight: "700",
                margin: "0",
                lineHeight: "12px",
              }}
            >
              {status}
            </Tag>
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
                <svg
                  style={{ marginLeft: "11px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="25"
                  viewBox="0 0 28 25"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.6882 13.5584C20.046 9.98396 18.6389 5.89034 15.1813 3.94267C11.3153 1.76501 6.34993 3.09465 4.0907 6.91248C1.83147 10.7303 3.13395 15.5906 6.99987 17.7683C10.5331 19.7585 14.9848 18.8192 17.4495 15.7281L22.2807 18.4529C22.8818 18.7919 23.6536 18.5851 24.0047 17.991C24.3558 17.397 24.1532 16.6406 23.5522 16.3016L18.6882 13.5584ZM13.9117 6.08802C16.5779 7.58985 17.4761 10.9418 15.9181 13.5748C14.36 16.2078 10.9355 17.1248 8.26939 15.6229C5.60324 14.1211 4.70497 10.7692 6.26306 8.13616C7.82115 5.50317 11.2456 4.58619 13.9117 6.08802Z"
                      fill="#01162B"
                    />
                  </g>
                </svg>
              </span>
              <input placeholder="Search..."></input>
            </div>
            <div className="-wrapper-option-profiles">
              <span className="-option-profiles">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M15.9918 3.98358C15.9554 4.34641 15.9171 4.70924 15.8835 5.07207C15.8307 5.64369 15.7912 6.21687 15.7271 6.78731C15.6681 7.30692 15.1656 7.5333 14.7453 7.23616C13.9133 6.64812 13.0842 6.05591 12.2579 5.45954C11.9232 5.2183 11.8966 4.77923 12.1895 4.51219C12.2886 4.41943 12.4168 4.36394 12.5523 4.35517C12.6878 4.3464 12.8221 4.3849 12.9324 4.4641C13.1693 4.62401 13.4015 4.7933 13.6553 4.93992C13.6033 4.86642 13.5536 4.79135 13.4989 4.7198C12.4929 3.38929 11.1733 2.54477 9.52534 2.28007C7.56809 1.96533 5.82939 2.48221 4.33897 3.8006C3.77009 4.30419 3.32672 4.90512 2.97054 5.5737C2.80789 5.87906 2.50136 6.00378 2.21125 5.8947C1.86249 5.76216 1.71822 5.38447 1.89221 5.03884C2.18393 4.45859 2.55401 3.92118 2.99204 3.44168C4.13488 2.19054 5.53811 1.40349 7.20604 1.09579C7.43046 1.05435 7.65801 1.03167 7.884 1H9.14257C9.32008 1.02541 9.49836 1.0477 9.67548 1.0782C11.4478 1.36948 12.9148 2.20696 14.0979 3.55155C14.3173 3.80654 14.5208 4.07474 14.7074 4.35462C14.7387 4.31236 14.7543 4.26052 14.7516 4.208C14.7711 3.99492 14.7872 3.78144 14.8118 3.56875C14.8427 3.30523 15.0261 3.11834 15.3029 3.05774C15.5285 3.00808 15.7893 3.12538 15.9171 3.33377C15.9425 3.37521 15.9664 3.41783 15.991 3.45967L15.9918 3.98358Z"
                    fill="#01162B"
                    stroke="#01162B"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M2.26921 12.6042C2.23988 12.8947 2.2176 13.1461 2.18788 13.3963C2.14879 13.7201 1.8751 13.957 1.56974 13.9406C1.23663 13.9222 0.983269 13.6634 1.00086 13.3213C1.02002 12.908 1.06186 12.4959 1.09783 12.0838C1.14044 11.599 1.18736 11.1142 1.23311 10.6297C1.24914 10.46 1.25539 10.2888 1.28706 10.1215C1.37464 9.65971 1.8532 9.46656 2.24379 9.73986C2.86311 10.1731 3.47578 10.616 4.09079 11.0551C4.30935 11.2115 4.52908 11.3648 4.74451 11.5243C5.02641 11.7335 5.09288 12.0951 4.90442 12.3649C4.70893 12.6449 4.34767 12.7062 4.05091 12.5076C3.93362 12.4294 3.81984 12.345 3.7045 12.2629L3.35966 12.0169C3.35105 12.0717 3.38272 12.0951 3.40227 12.1233C4.40788 13.5308 5.75833 14.4219 7.46574 14.7018C9.41205 15.0205 11.1445 14.5087 12.6337 13.2059C13.2167 12.6953 13.6702 12.083 14.0327 11.4004C14.1984 11.0876 14.528 10.9703 14.824 11.1048C15.1485 11.2526 15.2736 11.6111 15.1071 11.9423C14.8178 12.5185 14.4511 13.0525 14.017 13.5293C12.9129 14.7433 11.5648 15.5479 9.95082 15.8525C7.64403 16.2876 5.57183 15.759 3.75103 14.269C3.20835 13.8209 2.73531 13.2946 2.3474 12.7074C2.33137 12.6843 2.31182 12.6632 2.26921 12.6042Z"
                    fill="#01162B"
                    stroke="#01162B"
                    strokeWidth="0.3"
                  />
                </svg>
              </span>
              <span className="-option-profiles" onClick={handleSettingsProxy}>
                <img src={display} alt="display setting"></img>
              </span>
              <span className="-option-profiles" onClick={handleSettings}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    d="M14.3353 3.17064C14.3436 3.30615 14.3023 3.43155 14.26 3.5565C13.835 4.81968 14.5707 6.05339 15.8866 6.2835C16.3156 6.35873 16.6218 6.64692 16.7085 7.0759C16.8973 8.01262 16.8867 8.95065 16.6975 9.88605C16.6166 10.2869 16.2901 10.5751 15.8638 10.6472C14.9539 10.8012 14.323 11.3727 14.1232 12.2223C14.0286 12.6245 14.0642 13.0169 14.2068 13.4024C14.4013 13.9277 14.2908 14.3171 13.8509 14.6699C13.2476 15.1539 12.5903 15.5459 11.8745 15.839C11.4142 16.0273 10.9747 15.9182 10.6672 15.5253C10.2628 15.0083 9.73133 14.7258 9.08368 14.7078C8.39423 14.6884 7.82797 14.9722 7.40251 15.5213C7.03029 16.0009 6.65631 16.1109 6.08873 15.8927C5.31965 15.597 4.61568 15.1878 3.97551 14.6682C3.54609 14.3197 3.44798 13.9264 3.65213 13.4094C3.95043 12.6531 3.8664 11.9438 3.35602 11.3045C3.02384 10.8883 2.58078 10.6472 2.0506 10.5808C1.51603 10.5139 1.18428 10.2235 1.09761 9.69202C0.950212 8.7905 0.970011 7.88854 1.15524 6.99406C1.24412 6.56552 1.5917 6.26634 2.02904 6.2153C3.07575 6.09299 3.83868 5.27506 3.86992 4.22791C3.87784 3.96964 3.82416 3.71621 3.73748 3.47027C3.55093 2.94141 3.67149 2.54895 4.11367 2.20884C4.7226 1.74071 5.38609 1.37068 6.10281 1.09482C6.60747 0.900344 7.01049 1.00374 7.3528 1.41688C8.16016 2.391 9.67369 2.39716 10.4868 1.4292C10.8498 0.99714 11.2387 0.898585 11.7623 1.10142C12.5727 1.41512 13.3128 1.8485 13.978 2.40727C14.2143 2.60615 14.3296 2.86309 14.3353 3.17064ZM8.9024 11.1171C10.3539 11.0964 11.5388 10.0092 11.5374 8.47943C11.5361 7.05258 10.4366 5.89895 8.95344 5.88179C7.48919 5.86508 6.30828 6.98834 6.31004 8.50275C6.31136 9.95645 7.43287 11.0696 8.9024 11.1171Z"
                    stroke="#01162B"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <span className="-option-profiles">
                <svg
                  style={{ position: "absolute" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.25"
                    stroke="#01162B"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <path
                    d="M2.78599 2.07227L0.857422 4.00084L2.78599 5.92941"
                    stroke="#01162B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.21401 2.07227L11.1426 4.00084L9.21401 5.92941"
                    stroke="#01162B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.28627 0.786133L4.71484 7.85756"
                    stroke="#01162B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="-option-profiles">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0532 7.77817C15.0532 7.10845 14.5103 6.56553 13.8406 6.56553L8.98999 6.56553L8.98999 1.71494C8.98999 1.04522 8.44707 0.502296 7.77734 0.502296C7.10762 0.502296 6.5647 1.04522 6.5647 1.71494L6.5647 6.56553L1.71411 6.56553C1.04439 6.56553 0.501467 7.10845 0.501467 7.77817C0.501468 8.4479 1.04439 8.99082 1.71411 8.99082L6.5647 8.99082V13.8414C6.5647 14.5111 7.10762 15.0541 7.77734 15.0541C8.44707 15.0541 8.98999 14.5111 8.98999 13.8414V8.99082L13.8406 8.99082C14.5103 8.99082 15.0532 8.4479 15.0532 7.77817Z"
                    fill="#01162B"
                  />
                </svg>
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
          />
          {/* <Table dataSource={data}>
            <Column title="#" dataIndex="key" key="key" />
            <Column title="Profile" dataIndex="profile" key="Profile" />
            <Column title="UID" dataIndex="uid" key="uid" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(tags) => (
                <>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column title="Proxy" dataIndex="proxy" key="proxy" />
            <Column title="Tags" dataIndex="tags" key="tags" />
            <Column title="Folder" dataIndex="folder" key="folder" />
          </Table> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
