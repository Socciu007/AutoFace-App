import React from 'react'
import up from "../../assets/pictures/icon-updown.svg";
import down from "../../assets/pictures/icon-downup.svg";
import './style.scss'

const SeedingLikeComment = () => {
  return (
    <div className='-seeding-like'>
        <div className="scrollable-container">
          <div className="-seeding-wrapper-like">
            <div className="-back-home">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
                <path
                  d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
                  stroke="#01162B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Boost like, comment</p>
            </div>
            <div className="-option-boost-like">
              <p>Post view time <span>(s)</span>:</p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
            </div>
            <div className="-option-boost-like">
              <p>Delay time <span>(s)</span>:</p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
              <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
            </div>
            <div className="-option-boost-like">
              <p>Post quantity<span>/account</span>:</p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
              <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value onChange />
              </div>
            </div>
            <div className="-option-boost-like -option-boost-comment">
              <p style={{width: '100%'}}>Post ID: <span style={{float: 'inline-end'}}>(0)</span></p>
              <div className="-option-boost-comment__wrapper">
                <textarea 
                  id='textContent'
                  name="textContent"
                  value=""
                  rows="10"
                >              
                </textarea>
                <div className='-option-boost-comment__wrapper__content'>
                  <p>
                    <span style={{paddingRight: '7%'}}>1</span>Enter the ID here
                  </p>
                  <p>
                    <span style={{paddingRight: '6%'}}>2</span>Each ID/line
                  </p>
                </div>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="like" onChange />
                <p>Like</p>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="share" onChange />
                <p>Share to Feed</p>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="comment" onChange />
                <p>Comment</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SeedingLikeComment