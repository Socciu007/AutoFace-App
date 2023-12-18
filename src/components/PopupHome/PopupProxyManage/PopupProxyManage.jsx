import React from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import search from '../../../assets/pictures/icon-search.svg';
import refresh from '../../../assets/pictures/icon-refresh.png';
import { Table } from 'antd';

const PopupProxyManage = ({ openProxyManage, handleCloseProxyManage }) => {
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
  };
  const columnsProxys = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
    },
    {
      title: 'Expires',
      dataIndex: 'expires',
      sorter: (a, b) => a.expires - b.expires,
    },
  ];
  return (
    <PopupComponent open={openProxyManage} onClose={handleCloseProxyManage}>
      {
        <div className="-layout-choose-scripts">
          <div className="-layout-choose-scripts__container -proxy-manage">
            <div className="-nav-scripts__header">
              <div className="-nav-scripts__header__close" onClick={handleCloseProxyManage}>
                <img src={closePopup} alt="icon-x"></img>
              </div>
              <h1>PROXY MANAGEMENT</h1>
            </div>
            <div className="-container-scripts -proxy-manage__content">
              <div className="-container-scripts__right__main -proxy-manage__content__main">
                <div className="-container-scripts__right__main__search -proxy-manage__content__main__search">
                  <div className="-search-profiles">
                    <span>
                      <img src={search} alt="icon-search" style={{ marginLeft: '11px' }}></img>
                    </span>
                    <input placeholder="Search..."></input>
                  </div>
                  <span className="-option-profiles">
                    <img src={refresh} alt="image-refresh"></img>
                  </span>
                </div>
                <div className="-container-scripts__right__main__content -proxy-manage__content__main__table">
                  <div className="-container-scripts__right__main__content__table">
                    <Table
                      rowSelection={{
                        ...rowSelection,
                      }}
                      columns={columnsProxys}
                      dataSource={[]}
                      pagination={false}
                    ></Table>
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

export default PopupProxyManage;
