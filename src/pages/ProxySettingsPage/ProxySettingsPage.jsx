import React from 'react';
import { useNavigate } from 'react-router-dom';
import edit from '../../assets/pictures/icon-edit.png';
import deleted from '../../assets/pictures/icon-delete.png';
import "./style.scss";

const ProxySettingsPage = () => {
    const data = [
        {
            key: 1,
            proxy: '123.120.9.22:1232:username:123jbsdf',
        },
        {
            key: 2,
            proxy: '123.120.9.22:1232:username:123jbsdf',
        },
        {
            key: 3,
            proxy: '123.120.9.22:1232:username:123jbsdf',
        },
        {
            key: 4,
            proxy: '123.120.9.22:1232:username:123jbsdf',
        }
    ];
    const navigate = useNavigate()
    return (
        <div className="layout-proxy">
            <div className='-container-proxy'>
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
                    <p className="-btn-profiles">Proxy Settings</p>
                </div>
                <div className='-settings-proxys'>
                    <div className='-details-proxys'>
                        <div className='-list-proxys'>
                            <p>Proxy {} (0)</p>
                            <div className='-info-list'>
                                <div className='-scroll-list'>
                                    <ul>
                                        {data.length !== 0 && data.map((proxy, key) => (
                                            <li key={key}>
                                                <div className='-key-proxys'>
                                                    <p>{proxy.key}</p>                                           
                                                </div>               
                                                <div className='-action-proxys'>
                                                    <span>{proxy.proxy}</span>
                                                    <div className='-action-icon-proxys'>
                                                        <div className='-action-icon'>
                                                            <img src={edit} alt='edit-proxy'></img>
                                                        </div>
                                                        <div className='-action-icon'>
                                                            <img src={deleted} alt='delete-proxy'></img>
                                                        </div>                                                
                                                    </div>                                        
                                                </div>
                                            </li>                                    
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='-list-proxys' style={{marginLeft: '1.5rem', flex: 1, maxWidth: '514px'}}>
                            <p>Add proxy</p>
                            <div className='-add-proxys'>
                                <div className='-type-proxys'>
                                    <div className="-input-type-proxys">
                                        <input name="typeProxy" value="Choose the proxy type" onChange={() => {}}></input>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                            <path d="M1 1L6 6L11 1" stroke="#01162B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className='-icon-proxys'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0 2C0 0.895431 0.895431 0 2 0H13C14.1046 0 15 0.895431 15 2V4.75C15 5.85457 14.1046 6.75 13 6.75H2C0.89543 6.75 0 5.85457 0 4.75V2ZM4.5 3.375C4.5 3.99632 3.99632 4.5 3.375 4.5C2.75368 4.5 2.25 3.99632 2.25 3.375C2.25 2.75368 2.75368 2.25 3.375 2.25C3.99632 2.25 4.5 2.75368 4.5 3.375ZM6.375 4.5C6.99632 4.5 7.5 3.99632 7.5 3.375C7.5 2.75368 6.99632 2.25 6.375 2.25C5.75368 2.25 5.25 2.75368 5.25 3.375C5.25 3.99632 5.75368 4.5 6.375 4.5Z" fill="#01162B"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0 10.25C0 9.14543 0.895431 8.25 2 8.25H13C14.1046 8.25 15 9.14543 15 10.25V13C15 14.1046 14.1046 15 13 15H2C0.89543 15 0 14.1046 0 13V10.25ZM4.5 11.625C4.5 12.2463 3.99632 12.75 3.375 12.75C2.75368 12.75 2.25 12.2463 2.25 11.625C2.25 11.0037 2.75368 10.5 3.375 10.5C3.99632 10.5 4.5 11.0037 4.5 11.625ZM6.375 12.75C6.99632 12.75 7.5 12.2463 7.5 11.625C7.5 11.0037 6.99632 10.5 6.375 10.5C5.75368 10.5 5.25 11.0037 5.25 11.625C5.25 12.2463 5.75368 12.75 6.375 12.75Z" fill="#01162B"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className='-info-add-proxys'>
                                    <div className='-info-proxys'>
                                        <div className='-list-info'>
                                            <div className='-stt-info'>
                                                <span>1</span>
                                            </div>
                                            <input placeholder='Enter the proxy here'></input>
                                        </div>
                                        <div className='-list-info' style={{marginTop: '10px'}}>
                                            <div className='-stt-info'>
                                                <span>2</span>
                                            </div>
                                            <input placeholder='Proxy format: Host:Port:Username:Password'></input>
                                        </div>
                                    </div>
                                    <button>ADD</button>
                                </div>
                                <div className='-setting-proxys'>
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
                                    <p>
                                        Assign proxy here to all selected profiles
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <circle cx="7.5" cy="7.5" r="7.5" fill="#01162B"/>
                                            <path d="M10.0119 5.97563C10.0119 6.29563 9.94792 6.58363 9.81992 6.83963C9.69192 7.08763 9.54392 7.27562 9.37592 7.40363C9.21592 7.52362 9.03192 7.66762 8.82392 7.83563C8.61592 7.99563 8.46392 8.13962 8.36792 8.26762C8.24792 8.45162 8.18792 8.65163 8.18792 8.86763C8.18792 9.09963 8.11592 9.29163 7.97192 9.44363C7.82792 9.60363 7.62792 9.68363 7.37192 9.68363C7.12392 9.68363 6.92392 9.60762 6.77192 9.45562C6.62792 9.29562 6.55592 9.09963 6.55592 8.86763C6.55592 8.57163 6.61992 8.29962 6.74792 8.05162C6.87592 7.80363 7.03192 7.59962 7.21592 7.43962C7.40792 7.27962 7.59592 7.12762 7.77992 6.98362C7.96392 6.83162 8.11992 6.66762 8.24792 6.49162C8.37592 6.31562 8.43992 6.12762 8.43992 5.92762C8.43992 5.63962 8.33192 5.39162 8.11592 5.18363C7.90792 4.96763 7.61992 4.85962 7.25192 4.85962C6.85192 4.85962 6.53992 4.99162 6.31592 5.25562C6.09992 5.51162 5.99592 5.82362 6.00392 6.19162C6.00392 6.43962 5.93592 6.64363 5.79992 6.80363C5.67192 6.96363 5.47992 7.04362 5.22392 7.04362C4.96792 7.04362 4.76792 6.96363 4.62392 6.80363C4.48792 6.64363 4.41992 6.43962 4.41992 6.19162C4.41992 5.37562 4.70392 4.72762 5.27192 4.24762C5.83992 3.75962 6.49992 3.51562 7.25192 3.51562C7.99592 3.51562 8.63992 3.73962 9.18392 4.18762C9.73592 4.63562 10.0119 5.23163 10.0119 5.97563ZM7.35992 12.0476C7.10392 12.0476 6.88792 11.9596 6.71192 11.7836C6.53592 11.6076 6.44792 11.3916 6.44792 11.1356C6.43192 10.8876 6.51992 10.6756 6.71192 10.4996C6.91192 10.3236 7.12792 10.2356 7.35992 10.2356C7.59192 10.2356 7.80392 10.3236 7.99592 10.4996C8.17192 10.6916 8.25992 10.9036 8.25992 11.1356C8.25992 11.3676 8.17192 11.5836 7.99592 11.7836C7.81992 11.9756 7.60792 12.0636 7.35992 12.0476Z" fill="white"/>
                                        </svg>
                                    </p>
                                </div>
                                <div className='-setting-proxys'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="20" viewBox="0 0 32 20" fill="none">
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
                                    <p>
                                        API change: Do not assign a proxy to the next profile if the IP address does not change
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <circle cx="7.5" cy="7.5" r="7.5" fill="#01162B"/>
                                            <path d="M10.0119 5.97563C10.0119 6.29563 9.94792 6.58363 9.81992 6.83963C9.69192 7.08763 9.54392 7.27562 9.37592 7.40363C9.21592 7.52362 9.03192 7.66762 8.82392 7.83563C8.61592 7.99563 8.46392 8.13962 8.36792 8.26762C8.24792 8.45162 8.18792 8.65163 8.18792 8.86763C8.18792 9.09963 8.11592 9.29163 7.97192 9.44363C7.82792 9.60363 7.62792 9.68363 7.37192 9.68363C7.12392 9.68363 6.92392 9.60762 6.77192 9.45562C6.62792 9.29562 6.55592 9.09963 6.55592 8.86763C6.55592 8.57163 6.61992 8.29962 6.74792 8.05162C6.87592 7.80363 7.03192 7.59962 7.21592 7.43962C7.40792 7.27962 7.59592 7.12762 7.77992 6.98362C7.96392 6.83162 8.11992 6.66762 8.24792 6.49162C8.37592 6.31562 8.43992 6.12762 8.43992 5.92762C8.43992 5.63962 8.33192 5.39162 8.11592 5.18363C7.90792 4.96763 7.61992 4.85962 7.25192 4.85962C6.85192 4.85962 6.53992 4.99162 6.31592 5.25562C6.09992 5.51162 5.99592 5.82362 6.00392 6.19162C6.00392 6.43962 5.93592 6.64363 5.79992 6.80363C5.67192 6.96363 5.47992 7.04362 5.22392 7.04362C4.96792 7.04362 4.76792 6.96363 4.62392 6.80363C4.48792 6.64363 4.41992 6.43962 4.41992 6.19162C4.41992 5.37562 4.70392 4.72762 5.27192 4.24762C5.83992 3.75962 6.49992 3.51562 7.25192 3.51562C7.99592 3.51562 8.63992 3.73962 9.18392 4.18762C9.73592 4.63562 10.0119 5.23163 10.0119 5.97563ZM7.35992 12.0476C7.10392 12.0476 6.88792 11.9596 6.71192 11.7836C6.53592 11.6076 6.44792 11.3916 6.44792 11.1356C6.43192 10.8876 6.51992 10.6756 6.71192 10.4996C6.91192 10.3236 7.12792 10.2356 7.35992 10.2356C7.59192 10.2356 7.80392 10.3236 7.99592 10.4996C8.17192 10.6916 8.25992 10.9036 8.25992 11.1356C8.25992 11.3676 8.17192 11.5836 7.99592 11.7836C7.81992 11.9756 7.60792 12.0636 7.35992 12.0476Z" fill="white"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>
        </div>
    )
}

export default ProxySettingsPage