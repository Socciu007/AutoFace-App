import React, { useEffect, useState } from "react";
import "./style.scss";
import Loading from "../../components/loading/Loading";

const ScriptManager = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [isCopyDialogVisible, setCopyDialogVisibility] = useState(false);
  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };
  const openCopyDialog = () => {
    setCopyDialogVisibility(true);
  };

  const closeCopyDialog = () => {
    setCopyDialogVisibility(false);
  };

  return (
    <>
      <div className="script-manager">
        <h1>FACEBOOK AUTOMATION</h1>
        <div className="script-manager__title">
          <button>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
              <path
                d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
                stroke="#01162B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <p>Script Manager</p>
        </div>
        <div className="script-manager__content">
          <div className="scrollable-container">
            <div className="left-content">
              <div className="left-content__top">
                <div className="search">
                  <svg
                    width="28"
                    height="25"
                    viewBox="0 0 28 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.6882 13.5584C20.046 9.98396 18.6389 5.89034 15.1813 3.94267C11.3153 1.76501 6.34993 3.09465 4.0907 6.91248C1.83147 10.7303 3.13395 15.5906 6.99987 17.7683C10.5331 19.7585 14.9848 18.8192 17.4495 15.7281L22.2807 18.4529C22.8818 18.7919 23.6536 18.5851 24.0047 17.991C24.3558 17.397 24.1532 16.6406 23.5522 16.3016L18.6882 13.5584ZM13.9117 6.08802C16.5779 7.58985 17.4761 10.9418 15.9181 13.5748C14.36 16.2078 10.9355 17.1248 8.26939 15.6229C5.60324 14.1211 4.70497 10.7692 6.26306 8.13616C7.82115 5.50317 11.2456 4.58619 13.9117 6.08802Z"
                        fill="#01162B"
                      />
                    </g>
                  </svg>
                  <input
                    className="inputSearch"
                    placeholder="Search..."
                  ></input>
                </div>
                <button className="reload">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="20" fill="#F5F5F5" />
                    <path
                      d="M27.9918 14.9836C27.9554 15.3464 27.9171 15.7092 27.8835 16.0721C27.8307 16.6437 27.7912 17.2169 27.7271 17.7873C27.6681 18.3069 27.1656 18.5333 26.7453 18.2362C25.9133 17.6481 25.0842 17.0559 24.2579 16.4595C23.9232 16.2183 23.8966 15.7792 24.1895 15.5122C24.2886 15.4194 24.4168 15.3639 24.5523 15.3552C24.6878 15.3464 24.8221 15.3849 24.9324 15.4641C25.1693 15.624 25.4015 15.7933 25.6553 15.9399C25.6033 15.8664 25.5536 15.7913 25.4989 15.7198C24.4929 14.3893 23.1733 13.5448 21.5253 13.2801C19.5681 12.9653 17.8294 13.4822 16.339 14.8006C15.7701 15.3042 15.3267 15.9051 14.9705 16.5737C14.8079 16.8791 14.5014 17.0038 14.2112 16.8947C13.8625 16.7622 13.7182 16.3845 13.8922 16.0388C14.1839 15.4586 14.554 14.9212 14.992 14.4417C16.1349 13.1905 17.5381 12.4035 19.206 12.0958C19.4305 12.0543 19.658 12.0317 19.884 12H21.1426C21.3201 12.0254 21.4984 12.0477 21.6755 12.0782C23.4478 12.3695 24.9148 13.207 26.0979 14.5515C26.3173 14.8065 26.5208 15.0747 26.7074 15.3546C26.7387 15.3124 26.7543 15.2605 26.7516 15.208C26.7711 14.9949 26.7872 14.7814 26.8118 14.5687C26.8427 14.3052 27.0261 14.1183 27.3029 14.0577C27.5285 14.0081 27.7893 14.1254 27.9171 14.3338C27.9425 14.3752 27.9664 14.4178 27.991 14.4597L27.9918 14.9836Z"
                      fill="#01162B"
                      stroke="#01162B"
                      stroke-width="0.3"
                    />
                    <path
                      d="M14.2692 23.6042C14.2399 23.8947 14.2176 24.1461 14.1879 24.3963C14.1488 24.7201 13.8751 24.957 13.5697 24.9406C13.2366 24.9222 12.9833 24.6634 13.0009 24.3213C13.02 23.908 13.0619 23.4959 13.0978 23.0838C13.1404 22.599 13.1874 22.1142 13.2331 21.6297C13.2491 21.46 13.2554 21.2888 13.2871 21.1215C13.3746 20.6597 13.8532 20.4666 14.2438 20.7399C14.8631 21.1731 15.4758 21.616 16.0908 22.0551C16.3093 22.2115 16.5291 22.3648 16.7445 22.5243C17.0264 22.7335 17.0929 23.0951 16.9044 23.3649C16.7089 23.6449 16.3477 23.7062 16.0509 23.5076C15.9336 23.4294 15.8198 23.345 15.7045 23.2629L15.3597 23.0169C15.3511 23.0717 15.3827 23.0951 15.4023 23.1233C16.4079 24.5308 17.7583 25.4219 19.4657 25.7018C21.4121 26.0205 23.1445 25.5087 24.6337 24.2059C25.2167 23.6953 25.6702 23.083 26.0327 22.4004C26.1984 22.0876 26.528 21.9703 26.824 22.1048C27.1485 22.2526 27.2736 22.6111 27.1071 22.9423C26.8178 23.5185 26.4511 24.0525 26.017 24.5293C24.9129 25.7433 23.5648 26.5479 21.9508 26.8525C19.644 27.2876 17.5718 26.759 15.751 25.269C15.2084 24.8209 14.7353 24.2946 14.3474 23.7074C14.3314 23.6843 14.3118 23.6632 14.2692 23.6042Z"
                      fill="#01162B"
                      stroke="#01162B"
                      stroke-width="0.3"
                    />
                  </svg>
                </button>
                <button className="add">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.0532 7.77817C15.0532 7.10845 14.5103 6.56553 13.8406 6.56553L8.98999 6.56553L8.98999 1.71494C8.98999 1.04522 8.44707 0.502296 7.77734 0.502296C7.10762 0.502296 6.5647 1.04522 6.5647 1.71494L6.5647 6.56553L1.71411 6.56553C1.04439 6.56553 0.501467 7.10845 0.501467 7.77817C0.501468 8.4479 1.04439 8.99082 1.71411 8.99082L6.5647 8.99082V13.8414C6.5647 14.5111 7.10762 15.0541 7.77734 15.0541C8.44707 15.0541 8.98999 14.5111 8.98999 13.8414V8.99082L13.8406 8.99082C14.5103 8.99082 15.0532 8.4479 15.0532 7.77817Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="left-content__category">
                <button className="category-left">System's Scripts</button>
                <button className="category-right">Your Scripts</button>
              </div>
              <div className="left-content__content">
                <div className="script">
                  <p>Auto watch Live videos</p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3"
                      height="15"
                      viewBox="0 0 3 15"
                      fill="none"
                    >
                      <circle
                        opacity="0.5"
                        cx="1.5"
                        cy="1.5"
                        r="1.5"
                        fill="#2A3042"
                      />
                      <circle
                        opacity="0.5"
                        cx="1.5"
                        cy="7.5"
                        r="1.5"
                        fill="#2A3042"
                      />
                      <circle
                        opacity="0.5"
                        cx="1.5"
                        cy="13.5"
                        r="1.5"
                        fill="#2A3042"
                      />
                    </svg>
                  </div>
                </div>
                <div className="script selected">
                  <p className="inputSelected"> Make 50 random friends</p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.57467 0.482869C6.18414 0.0923447 5.55098 0.092345 5.16045 0.482869L4.91089 0.732436C4.52036 1.12296 4.52036 1.75613 4.91089 2.14665L5.03567 2.27143L3.95433 3.35277C2.92322 3.01925 1.75778 3.2165 0.88554 3.94454L2.95594 6.01494L0.668244 8.30264C0.553385 8.4175 0.553385 8.60372 0.668245 8.71858C0.783105 8.83344 0.96933 8.83344 1.08419 8.71858L3.37189 6.43089L5.44228 8.50128C6.17032 7.62904 6.36758 6.46361 6.03406 5.4325L7.11539 4.35116L7.24018 4.47594C7.6307 4.86647 8.26387 4.86647 8.65439 4.47594L8.90396 4.22638C9.29448 3.83585 9.29448 3.20269 8.90396 2.81216L6.57467 0.482869Z"
                        fill="#F7931A"
                      />
                    </svg>
                    <div className="more" onClick={toggleMenu}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="15"
                        viewBox="0 0 3 15"
                        fill="none"
                      >
                        <circle
                          opacity="0.5"
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill="#2A3042"
                        />
                        <circle
                          opacity="0.5"
                          cx="1.5"
                          cy="7.5"
                          r="1.5"
                          fill="#2A3042"
                        />
                        <circle
                          opacity="0.5"
                          cx="1.5"
                          cy="13.5"
                          r="1.5"
                          fill="#2A3042"
                        />
                      </svg>
                    </div>
                    {isMenuVisible && (
                      <div className="menu-options">
                        <div>Unpin</div>
                        <div className="divider"></div>
                        <div>Edit</div>
                        <div className="divider"></div>
                        <div onClick={openCopyDialog}>Make a Copy</div>
                        <div className="divider"></div>
                        <div>Rename</div>
                        <div className="divider"></div>
                        <div>Delete</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="script">
                  <p>Auto post on the fanpage</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
                <div className="script">
                  <p>Log in</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
                <div className="script">
                  <p>Auto post on the fanpage</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
                <div className="script">
                  <p>Auto post on the fanpage</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
                <div className="script">
                  <p>Auto post on the fanpage</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
                <div className="script">
                  <p>Auto post on the fanpage</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3"
                    height="15"
                    viewBox="0 0 3 15"
                    fill="none"
                  >
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="7.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                    <circle
                      opacity="0.5"
                      cx="1.5"
                      cy="13.5"
                      r="1.5"
                      fill="#2A3042"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="right-content__edit">
              <h3>SCRIPT OVERVIEW</h3>
              <div className="edit-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      d="M9.241 0C9.6732 0.0848654 10.065 0.250832 10.3946 0.55231C10.8706 0.988272 11.12 1.53203 11.1272 2.1716C11.1399 3.28238 11.133 4.39316 11.1299 5.50393C11.1289 5.85948 10.8873 6.10484 10.5571 6.10176C10.2334 6.09868 10.0024 5.85469 10.0017 5.5012C9.99897 4.39931 10.0031 3.29778 9.99897 2.19589C9.99692 1.68088 9.67457 1.26922 9.18625 1.14637C9.05861 1.1142 8.92652 1.10257 8.79409 1.10257C6.64062 1.10257 4.48716 1.10257 2.3337 1.10257C1.85086 1.10257 1.46349 1.27435 1.23832 1.72605C1.15106 1.90126 1.1319 2.09015 1.1319 2.28384C1.13327 4.36441 1.13258 6.44498 1.13258 8.52555C1.13258 9.60896 1.13053 10.6927 1.13361 11.7761C1.13498 12.3038 1.45151 12.7168 1.94394 12.8421C2.07603 12.8756 2.21257 12.8869 2.34945 12.8869C2.91852 12.8869 3.4876 12.8838 4.05668 12.8889C4.34413 12.8913 4.56929 13.1141 4.59667 13.4063C4.62096 13.6633 4.41872 13.9323 4.1566 13.9877C4.10835 13.998 4.05702 13.9983 4.0074 13.9983C3.38357 13.9987 2.76008 14.0025 2.13625 13.9973C1.07441 13.9881 0.130624 13.1186 0.0231736 12.0598C0.00777458 11.9099 0.00127279 11.7604 0.00127279 11.6101C0.00161499 8.49168 -0.003518 5.37287 0.00469479 2.25441C0.00709018 1.3031 0.447159 0.604324 1.30608 0.179655C1.49121 0.0882874 1.69242 0.0472235 1.89124 0C4.34105 0 6.79119 0 9.241 0Z"
                      fill="#01162B"
                    />
                    <path
                      d="M11.0248 7.41992C11.624 7.45277 12.1496 7.76794 12.4302 8.41333C12.7153 9.06898 12.6099 9.69521 12.1113 10.2068C11.1264 11.2177 10.1183 12.2059 9.12048 13.2041C9.02774 13.2969 8.91584 13.3554 8.79128 13.3899C8.08977 13.5843 7.38895 13.7814 6.68607 13.97C6.30897 14.0713 6.00304 13.8789 5.93973 13.5176C5.92023 13.4057 5.95068 13.3003 5.98217 13.1962C6.1827 12.5296 6.38562 11.8637 6.58718 11.1975C6.62892 11.0596 6.70079 10.9412 6.80345 10.8392C7.7883 9.86014 8.77178 8.87974 9.75663 7.90071C10.0793 7.57939 10.4708 7.42403 11.0248 7.41992ZM10.3948 10.3389C10.3695 10.3084 10.3486 10.2793 10.3237 10.254C10.1344 10.0638 9.94039 9.87794 9.75594 9.68289C9.67689 9.59905 9.6283 9.60452 9.54891 9.68425C8.94322 10.2947 8.33376 10.9015 7.72465 11.5082C7.67537 11.5575 7.63567 11.6098 7.61548 11.6776C7.5337 11.952 7.45157 12.2265 7.36636 12.4999C7.33728 12.5929 7.34857 12.6258 7.45636 12.594C7.74415 12.5095 8.03434 12.4321 8.32384 12.3538C8.38783 12.3366 8.43882 12.3034 8.48501 12.2573C9.0996 11.6427 9.71454 11.0288 10.3291 10.4145C10.351 10.3929 10.3702 10.368 10.3948 10.3389ZM11.4464 9.08985C11.4498 8.85682 11.3222 8.66313 11.1162 8.581C10.9102 8.49888 10.6552 8.56458 10.5057 8.72883C10.4503 8.79009 10.4824 8.82191 10.5238 8.86298C10.6912 9.02928 10.8575 9.19662 11.0245 9.36327C11.2141 9.55319 11.3017 9.53471 11.4064 9.28046C11.4324 9.21784 11.4502 9.15179 11.4464 9.08985Z"
                      fill="#01162B"
                    />
                    <path
                      d="M5.5677 4.38105C4.63041 4.38105 3.69313 4.38378 2.75584 4.37968C2.30551 4.37762 2.04852 3.92181 2.2754 3.53581C2.3695 3.37566 2.51425 3.2908 2.69801 3.27164C2.72505 3.2689 2.75242 3.26958 2.7798 3.26958C4.63623 3.26958 6.49232 3.27027 8.34875 3.26856C8.56091 3.26821 8.73099 3.34179 8.84665 3.52213C8.96129 3.70075 8.97669 3.88794 8.87574 4.07854C8.77342 4.27188 8.61293 4.37865 8.39289 4.38002C7.91518 4.3831 7.43747 4.38139 6.95976 4.38139C6.49574 4.38105 6.03172 4.38105 5.5677 4.38105Z"
                      fill="#01162B"
                    />
                    <path
                      d="M5.56525 6.56633C4.63242 6.56633 3.69993 6.56702 2.76709 6.56565C2.48033 6.56531 2.27775 6.40687 2.20794 6.13824C2.12581 5.82239 2.35987 5.48772 2.68462 5.45692C2.7161 5.45384 2.74827 5.45419 2.78009 5.45419C4.63653 5.45419 6.49262 5.45385 8.34905 5.45453C8.61733 5.45453 8.80246 5.57498 8.89691 5.8046C9.04542 6.16596 8.7874 6.56052 8.3908 6.56428C7.80837 6.5701 7.22595 6.56599 6.64353 6.56633C6.28422 6.56668 5.92456 6.56668 5.56525 6.56633Z"
                      fill="#01162B"
                    />
                    <path
                      d="M4.4509 8.75205C3.87738 8.75205 3.30419 8.75547 2.73067 8.75068C2.44253 8.74829 2.21771 8.52723 2.18965 8.23567C2.16467 7.97458 2.36041 7.71108 2.62664 7.65325C2.67934 7.64161 2.73511 7.64127 2.78952 7.64127C3.90441 7.64059 5.01929 7.64025 6.13418 7.64127C6.4822 7.64162 6.73269 7.87808 6.73098 8.19906C6.72927 8.52038 6.4798 8.75171 6.13007 8.75274C5.57024 8.75411 5.01074 8.75308 4.4509 8.75308C4.4509 8.75239 4.4509 8.75239 4.4509 8.75205Z"
                      fill="#01162B"
                    />
                  </g>
                </svg>
                <input type="text" placeholder="New note" />
              </div>
              <button className="editBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10.4435 2.0351C11.1769 1.30167 12.366 1.30167 13.0995 2.0351C13.8329 2.76853 13.8329 3.95766 13.0995 4.69109L5.47766 12.3129L2.29047 12.8441L2.82167 9.65692L10.4435 2.0351Z"
                    stroke="white"
                  />
                  <line
                    x1="9.20121"
                    y1="2.86324"
                    x2="12.2719"
                    y2="5.9339"
                    stroke="white"
                  />
                </svg>
                EDIT
              </button>
            </div>
            <div className="right-content__content"></div>
          </div>
        </div>
        <div className="makeCopy">
          <div className="makeCopy__top">
            <h1>MAKE A COPY</h1>
            <button className="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.6368 1.11325C11.1524 0.628917 10.3672 0.628918 9.88283 1.11325L6.375 4.62108L2.86716 1.11325C2.38283 0.628919 1.59758 0.628919 1.11325 1.11325C0.628917 1.59758 0.628918 2.38284 1.11325 2.86717L4.62108 6.375L1.11325 9.88283C0.628919 10.3672 0.628919 11.1524 1.11325 11.6367C1.59758 12.1211 2.38284 12.1211 2.86717 11.6367L6.375 8.12892L9.88283 11.6368C10.3672 12.1211 11.1524 12.1211 11.6367 11.6368C12.1211 11.1524 12.1211 10.3672 11.6367 9.88283L8.12892 6.375L11.6368 2.86716C12.1211 2.38283 12.1211 1.59758 11.6368 1.11325Z"
                  fill="#01162B"
                />
              </svg>
            </button>
          </div>

          <div>
            <input type="text" placeholder="Enter name here..." />
            <button>Create</button>
          </div>
        </div>
        <div className="delete">
          <h1>DELETE</h1>
          <p>Are you sure to delete this script?</p>
          <div>
            <button>Cancel</button>
            <button className="deleteBtn">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScriptManager;
