import React, { useState } from "react";
import "./style.scss";
import up from "../../assets/pictures/icon-updown.svg";
import down from "../../assets/pictures/icon-downup.svg";
import downup from "../../assets/pictures/icon-down.svg";
import onOption from "../../assets/pictures/icon-on-option.svg";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [counter_0, setCounter_0] = useState(0);

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const incrementCounter_0 = () => {
    setCounter_0((prevCounter) => prevCounter + 1);
  };

  const decrementCounter = () => {
    setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  };
  const decrementCounter_0 = () => {
    setCounter_0((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  };
  return (
    <div className="layout-settings">
      <div className="-layout-page">
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
          <p className="-btn-profiles">Automation settings</p>
        </div>
        <div className="-settings-profiles">
          <div className="-normal-settings">
            <div className="-content-settings">
              <h2>RUNNING SETTINGS</h2>
              <div className="-sub-settings">
                <p>Numbers of profiles running simultaneously</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7}/>
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7}/>
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value={counter}
                      onChange={() => {}}
                    ></input>
                    <span>profile(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Numbers of loops</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value={counter_0}
                      onChange={() => {}}
                    ></input>
                    <span>loops(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Profile running type</p>
                <div className="-options-sub-settings">
                  <div className="-input-sub-settings -input-text-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="Random"
                      onChange={() => {}}
                    ></input>
                    <div className="-icon-down">
                      <img src={downup} alt="down-up"></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>URL</p>
                <div className="-options-sub-settings">
                  <div className="-input-sub-settings -input-text-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="www.fb.com"
                      onChange={() => {}}
                    ></input>
                    <div className="-icon-down">
                      <img src={downup} alt="down-up"></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-sub-settings -sub1-settings">
                <img src={onOption} alt="on-option"></img>
                <p>Mute Audio</p>
              </div>
              <div
                className="-sub-settings -sub1-settings"
                style={{ marginTop: "10px" }}
              >
                <img src={onOption} alt="on-option"></img>
                <p>Don’t show images</p>
              </div>
            </div>
          </div>
          <div className="-normal-settings -advanced-settings">
            <div className="-content-settings">
              <h2>ADVANCED SETTINGS</h2>
              <div className="-sub-settings">
                <p>Maximum time per thread</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="500"
                      onChange={() => {}}
                    ></input>
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Delay in each new thread open</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="05"
                      onChange={() => {}}
                    ></input>
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if RAM reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="90"
                      onChange={() => {}}
                    ></input>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="90"
                      onChange={() => {}}
                    ></input>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <div className="-count-settings">
                    <div style={{marginBottom: '2px'}} onClick={incrementCounter}>
                      <img src={up} alt="up" width={10} height={7} />
                    </div>
                    <div style={{marginTop: '2px'}} onClick={decrementCounter}>
                      <img src={down} alt="down" width={10} height={7} />
                    </div>
                  </div>
                  <div className="-input-sub-settings">
                    <input
                      name="numbersProfiles"
                      value="90"
                      onChange={() => {}}
                    ></input>
                    <span>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
