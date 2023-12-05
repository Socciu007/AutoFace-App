import React, { useState } from "react";
import './style.scss';
import up from '../../assets/pictures/icon-up.svg';
import down from '../../assets/pictures/icon-down.svg';
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate()
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
    <div className="layout-profiles">
      <div className="-layout-page">
        <h1 className="-title-profiles">FACEBOOK AUTOMATION</h1>
        <div className="-return-profiles">
          <span onClick={() => navigate('/')}>
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
                    <div className="" onClick={incrementCounter}>
                      <img src={down} alt="down" />
                    </div>
                    <div onClick={decrementCounter}>
                      <img src={up} alt="up" />
                    </div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path onClick={incrementCounter} d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path onClick={decrementCounter} d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg> */}
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value={counter} onChange={() => {}}>
                    </input>
                    <span>profile(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Numbers of loops</p>
                <div className="-options-sub-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path onClick={incrementCounter_0} d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path onClick={decrementCounter_0} d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value={counter_0} onChange={() => {}}>
                    </input>
                    <span>loops(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Profile running type</p>
                <div className="-options-sub-settings">
                  <div className="-input-sub-settings -input-text-sub-settings">
                    <input name="numbersProfiles" value="Random" onChange={() => {}}>
                    </input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#01162B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>URL</p>
                <div className="-options-sub-settings">
                  <div className="-input-sub-settings -input-text-sub-settings">
                    <input name="numbersProfiles" value="www.fb.com" onChange={() => {}}>
                    </input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#01162B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="-sub-settings -sub1-settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect opacity="0.2" y="2" width="30.9333" height="16" rx="8" fill="#2A86FF"/>
                  <g filter="url(#filter0_d_174_1435)">
                    <rect x="14.9336" y="2" width="16" height="16" rx="8" fill="#2A86FF"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_174_1435" x="11.9336" y="0" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="-1"/>
                      <feGaussianBlur stdDeviation="1"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.137255 0 0 0 0 0.415686 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_1435"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_1435" result="shape"/>
                    </filter>
                  </defs>
                </svg>
                <p>Mute Audio</p>
              </div>
              <div className="-sub-settings -sub1-settings" style={{marginTop: '10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect opacity="0.2" y="2" width="30.9333" height="16" rx="8" fill="#2A86FF"/>
                  <g filter="url(#filter0_d_174_1435)">
                    <rect x="14.9336" y="2" width="16" height="16" rx="8" fill="#2A86FF"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_174_1435" x="11.9336" y="0" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="-1"/>
                      <feGaussianBlur stdDeviation="1"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0313726 0 0 0 0 0.137255 0 0 0 0 0.415686 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_1435"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_1435" result="shape"/>
                    </filter>
                  </defs>
                </svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value="500" onChange={() => {}}>
                    </input>
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Delay in each new thread open</p>
                <div className="-options-sub-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value="05" onChange={() => {}}>
                    </input>
                    <span>seconds(s)</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if RAM reaches</p>
                <div className="-options-sub-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value="90" onChange={() => {}}>
                    </input>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value="90" onChange={() => {}}>
                    </input>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="-sub-settings">
                <p>Stop if CPU reaches</p>
                <div className="-options-sub-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M5.38573 14.5323C5.18574 14.7748 4.81426 14.7748 4.61427 14.5323L1.34466 10.5681C1.07569 10.242 1.30766 9.75 1.73039 9.75L8.26961 9.75C8.69234 9.75 8.92431 10.242 8.65534 10.5681L5.38573 14.5323Z" fill="#01162B"/>
                    <path d="M4.61427 0.467669C4.81426 0.225192 5.18574 0.225192 5.38573 0.467669L8.65534 4.43186C8.92431 4.75798 8.69234 5.25 8.26961 5.25L1.73039 5.25C1.30766 5.25 1.07569 4.75798 1.34467 4.43186L4.61427 0.467669Z" fill="#01162B"/>
                  </svg>
                  <div className="-input-sub-settings">
                    <input name="numbersProfiles" value="90" onChange={() => {}}>
                    </input>
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
