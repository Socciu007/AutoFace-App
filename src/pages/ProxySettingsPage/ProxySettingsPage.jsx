import React from "react";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/pictures/icon-edit.png";
import deleted from "../../assets/pictures/icon-delete.png";
import onOption from "../../assets/pictures/icon-on-option.svg";
import downup from "../../assets/pictures/icon-down.svg";
import question from "../../assets/pictures/icon-question.svg";
import "./style.scss";

const ProxySettingsPage = () => {
  const data = [
    {
      key: 1,
      proxy: "123.120.9.22:1232:username:123jbsdf",
    },
    {
      key: 2,
      proxy: "123.120.9.22:1232:username:123jbsdf",
    },
    {
      key: 3,
      proxy: "123.120.9.22:1232:username:123jbsdf",
    },
    {
      key: 4,
      proxy: "123.120.9.22:1232:username:123jbsdf",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="layout-proxy">
      <div className="-container-proxy">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-return-profiles">
          <span onClick={() => navigate("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
              <path
                d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
                stroke="#01162B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="-btn-profiles">Proxy Settings</p>
        </div>
        <div className="-settings-proxys">
          <div className="-details-proxys">
            <div className="-list-proxys">
              <p>Proxy {} (0)</p>
              <div className="-info-list">
                <div className="-scroll-list">
                  <ul>
                    {data.length !== 0 &&
                      data.map((proxy, key) => (
                        <li key={key}>
                          <div className="-key-proxys">
                            <p>{proxy.key}</p>
                          </div>
                          <div className="-action-proxys">
                            <span>{proxy.proxy}</span>
                            <div className="-action-icon-proxys">
                              <div className="-action-icon">
                                <img src={edit} alt="edit-proxy"></img>
                              </div>
                              <div className="-action-icon">
                                <img src={deleted} alt="delete-proxy"></img>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="-list-proxys"
              style={{ marginLeft: "1.5rem", flex: 1, maxWidth: "514px" }}
            >
              <p>Add proxy</p>
              <div className="-add-proxys">
                <div className="-type-proxys">
                  <div className="-input-type-proxys">
                    <input
                      name="typeProxy"
                      value="Choose the proxy type"
                      onChange={() => {}}
                    ></input>
                    <img src={downup} alt="downup"></img>
                  </div>
                  <div className="-icon-proxys">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 2C0 0.895431 0.895431 0 2 0H13C14.1046 0 15 0.895431 15 2V4.75C15 5.85457 14.1046 6.75 13 6.75H2C0.89543 6.75 0 5.85457 0 4.75V2ZM4.5 3.375C4.5 3.99632 3.99632 4.5 3.375 4.5C2.75368 4.5 2.25 3.99632 2.25 3.375C2.25 2.75368 2.75368 2.25 3.375 2.25C3.99632 2.25 4.5 2.75368 4.5 3.375ZM6.375 4.5C6.99632 4.5 7.5 3.99632 7.5 3.375C7.5 2.75368 6.99632 2.25 6.375 2.25C5.75368 2.25 5.25 2.75368 5.25 3.375C5.25 3.99632 5.75368 4.5 6.375 4.5Z"
                        fill="#01162B"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10.25C0 9.14543 0.895431 8.25 2 8.25H13C14.1046 8.25 15 9.14543 15 10.25V13C15 14.1046 14.1046 15 13 15H2C0.89543 15 0 14.1046 0 13V10.25ZM4.5 11.625C4.5 12.2463 3.99632 12.75 3.375 12.75C2.75368 12.75 2.25 12.2463 2.25 11.625C2.25 11.0037 2.75368 10.5 3.375 10.5C3.99632 10.5 4.5 11.0037 4.5 11.625ZM6.375 12.75C6.99632 12.75 7.5 12.2463 7.5 11.625C7.5 11.0037 6.99632 10.5 6.375 10.5C5.75368 10.5 5.25 11.0037 5.25 11.625C5.25 12.2463 5.75368 12.75 6.375 12.75Z"
                        fill="#01162B"
                      />
                    </svg>
                  </div>
                </div>
                <div className="-info-add-proxys">
                  <div className="-info-proxys">
                    <div className="-list-info">
                      <div className="-stt-info">
                        <span>1</span>
                      </div>
                      <input placeholder="Enter the proxy here"></input>
                    </div>
                    <div className="-list-info" style={{ marginTop: "10px" }}>
                      <div className="-stt-info">
                        <span>2</span>
                      </div>
                      <input placeholder="Proxy format: Host:Port:Username:Password"></input>
                    </div>
                  </div>
                  <button>ADD</button>
                </div>
                <div className="-setting-proxys">
                  <img src={onOption} alt="image-on-option"></img>
                  <p>
                    Assign proxy here to all selected profiles
                    <img src={question} alt="question"></img>
                  </p>
                </div>
                <div className="-setting-proxys">
                  <img
                    src={onOption}
                    alt="image-on-option"
                    width={42}
                    height={20}
                  ></img>

                  <p>
                    API change: Do not assign a proxy to the next profile if the
                    IP address does not change
                    <img src={question} alt="question"></img>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxySettingsPage;
