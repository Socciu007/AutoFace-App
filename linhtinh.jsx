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