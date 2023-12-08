import React from 'react'
import { useNavigate } from 'react-router-dom'
import SeedingView from '../../components/SeedingView/SeedingView'

const BoostView = () => {
    const navigate = useNavigate()
  return (
    <div className="layout-boost">
      <div className="-container-boost">
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
          <p className="-btn-profiles">Create a new script</p>
        </div>
        <SeedingView></SeedingView>
      </div>
    </div>
  )
}

export default BoostView