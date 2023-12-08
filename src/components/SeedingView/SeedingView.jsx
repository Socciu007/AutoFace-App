import React, { useEffect, useState } from 'react'
import up from "../../assets/pictures/icon-updown.svg";
import down from "../../assets/pictures/icon-downup.svg";
const SeedingView = () => {
    const [likeComment, setLikeComment] = useState({
        viewTimeStart: 3,
        viewTimeEnd: 3,
        delayTimeStart: 5,
        delayTimeEnd: 5,
        postQuantityStart: 0,
        postQuantityEnd: 0,
        postID: '',
        photoVideoQuantityStart: 0,
        photoVideoQuantityEnd: 0,
        file: "",
        tagFriendStart: 0,
        tagFriendEnd: 0
      })
      const [selectedFile, setSelectedFile] = useState(null);
      const [isFileSelected, setIsFileSelected] = useState(false);
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
        }
      };
    
      useEffect(() => {
        // Kiểm tra xem có file được chọn không và chưa thực hiện hiển thị
        if (selectedFile && !isFileSelected) {
          setIsFileSelected(true);
        }
      }, [selectedFile, isFileSelected]);
      const handleFile = () => {
        if (!isFileSelected) {
          document.getElementById('dragVideoOrPhotoInput').click();
        }
      }
      //Post view time
      const handleUpViewTimeStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            viewTimeStart: prevValue.viewTimeStart + 1,
          };
        });
      }
      const handleDownViewTimeStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            viewTimeStart: (prevValue.viewTimeStart > 0) ? (prevValue.viewTimeStart - 1) : 0,
          };
        });
      }
      const handleUpViewTimeEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            viewTimeEnd: prevValue.viewTimeEnd + 1,
          };
        });
      }
      const handleDownViewTimeEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            viewTimeEnd: (prevValue.viewTimeEnd > 0) ? (prevValue.viewTimeEnd - 1) : 0,
          };
        });
      }
      //delay time
      const handleUpDelayTimeStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            delayTimeStart: prevValue.delayTimeStart + 1,
          };
        });
      }
      const handleDownDelayTimeStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            delayTimeStart: (prevValue.delayTimeStart > 0) ? (prevValue.delayTimeStart - 1) : 0,
          };
        });
      }
      const handleUpDelayTimeEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            delayTimeEnd: prevValue.delayTimeEnd + 1,
          };
        });
      }
      const handleDownDelayTimeEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            delayTimeEnd: (prevValue.delayTimeEnd > 0) ? (prevValue.delayTimeEnd - 1) : 0,
          };
        });
      }
      //post quantity
      const handleUpPostQuantityStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            postQuantityStart: prevValue.postQuantityStart + 1,
          };
        });
      }
      const handleDownPostQuantityStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            postQuantityStart: (prevValue.postQuantityStart > 0) ? (prevValue.postQuantityStart - 1) : 0,
          };
        });
      }
      const handleUpPostQuantityEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            postQuantityEnd: prevValue.postQuantityEnd + 1,
          };
        });
      }
      const handleDownPostQuantityEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            postQuantityEnd: (prevValue.postQuantityEnd > 0) ? (prevValue.postQuantityEnd - 1) : 0,
          };
        });
      }
      //post quantity
      const handleUpPhotoVideoStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            photoVideoQuantityStart: prevValue.photoVideoQuantityStart + 1,
          };
        });
      }
      const handleDownPhotoVideoStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            photoVideoQuantityStart: (prevValue.photoVideoQuantityStart > 0) ? (prevValue.photoVideoQuantityStart - 1) : 0,
          };
        });
      }
      const handleUpPhotoVideoEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            photoVideoQuantityEnd: prevValue.photoVideoQuantityEnd + 1,
          };
        });
      }
      const handleDownPhotoVideoEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            photoVideoQuantityEnd: (prevValue.photoVideoQuantityEnd > 0) ? (prevValue.photoVideoQuantityEnd - 1) : 0,
          };
        });
      }
      //tag friend
      const handleUpTagFriendStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            tagFriendStart: prevValue.tagFriendStart + 1,
          };
        });
      }
      const handleDownTagFriendStart = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            tagFriendStart: (prevValue.tagFriendStart > 0) ? (prevValue.tagFriendStart - 1) : 0,
          };
        });
      }
      const handleUpTagFriendEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            tagFriendEnd: prevValue.tagFriendEnd + 1,
          };
        });
      }
      const handleDownTagFriendEnd = () => {
        setLikeComment((prevValue) => {
          return {
            ...prevValue,
            tagFriendEnd: (prevValue.tagFriendEnd > 0) ? (prevValue.tagFriendEnd - 1) : 0,
          };
        });
      }
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
              <p>Boost followers</p>
            </div>
            <div className="-option-boost-like">
              <p>Delay time <span>(s)</span>:</p>
              <div className="-option-boost-like__number">
                <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick={handleUpDelayTimeStart}>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick={handleDownDelayTimeStart}>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value={likeComment.delayTimeStart} onChange />
              </div>
              <span>to</span>
              <div className="-option-boost-like__number">
              <div className="-option-boost-like__number__icon">
                  <div style={{marginBottom: '2px'}} onClick={handleUpDelayTimeEnd}>
                    <img src={up} alt="up" width={10} height={7}/>
                  </div>
                  <div style={{marginTop: '2px'}} onClick={handleDownDelayTimeEnd}>
                    <img src={down} alt="down" width={10} height={7}/>
                  </div>
                </div>
                <input type="text" value={likeComment.delayTimeEnd} onChange />
              </div>
            </div>
            <div className="-option-boost-like -option-boost-comment">
              <p>UID list</p>
              <div className="-option-boost-comment__wrapper">
                <textarea 
                  name="textContent"
                  style={{width: '501px'}}
                  value={likeComment.postID}
                >              
                </textarea>
                <div className='-option-boost-comment__wrapper__content'>
                  <p>
                    <span style={{paddingRight: '7%'}}>1</span>Enter the UID here
                  </p>
                  <p>
                    <span style={{paddingRight: '6%'}}>2</span>Each UID/line
                  </p>
                </div>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="like" onChange />
                <p>Like page</p>
              </div>
            </div>
            <div className="-option-boost-like">
              <div className="-option-boost-like__header">
                <input type="checkbox" name="share" onChange />
                <p>Follow page</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SeedingView