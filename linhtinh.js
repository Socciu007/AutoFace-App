<textarea
                              id="textContentComment"
                              name="textContentComment"
                              rows="10"
                              value={textContentComment}
                              onChange={handleTextareaChangeComment}
                              ref={textareaCommentRef}
                            ></textarea>
                            <div
                              onClick={handleCommentDivClick}
                              className={`placeholder ${textContentComment ? 'hide' : ''}`}
                            >
                              <p>
                                <span>1</span>Enter the content here
                              </p>
                              <p>
                                <span>2</span>Each content/line
                              </p>
                            </div>

export function TextComment() {
    //cai dat cho phan text comment khi go text vao
    const [textContentComment, setTextContentComment] = useState('');
    const textareaCommentRef = useRef(null);
  
    const handleTextareaChangeComment = (event) => {
      setTextContentComment(event.target.value);
    };
    const handleCommentDivClick = () => {
      textareaCommentRef.current.focus();
    };
    return {
      textContentComment,
      handleTextareaChangeComment,
      textareaCommentRef,
      handleCommentDivClick,
    };
  }
- Nhập input các khoảng

//Hiển thị 5 số cuối tuy nhiên cắt luôn các số đầu 
// export function handleInputChange(event, setValues, prefix, values) {
//   const inputValue = event.target.value;
//   const isNumber = /^\d*$/.test(inputValue);

//   if (isNumber) {
//     const lastDigits = inputValue.slice(-5); // Extract the last five digits

//     const updatedValues = {
//       ...values,
//       [`${prefix}${event.target.name}`]: lastDigits,
//     };

//     setValues(updatedValues);
//   }
// }


overflow-x: hidden;
padding: 20px 10px 20px 20px;

- textarea 

export function TextComment() {
  const [textContentComment, setTextContentComment] = useState('');
  const textareaCommentRef = useRef(null);

  const handleTextareaChangeComment = (event) => {
    const inputValue = event.target.value;

    // Kiểm tra xem nội dung có rỗng không
    if (inputValue.trim() === '') {
      // Nếu rỗng, hiển thị lại placeholder và cập nhật state
      setTextContentComment(''); // Hoặc bạn có thể gán giá trị placeholder khác nếu cần
    } else {
      // Nếu không rỗng, thực hiện thêm số đầu dòng như cũ
      const lines = inputValue.split('\n');
      const numberedLines = lines.map((line, index) => {
        if (!/^\d+\./.test(line)) {
          return `${index + 1}. ${line}`;
        }
        return line;
      });
      const newTextContent = numberedLines.join('\n');
      setTextContentComment(newTextContent);
    }
  };

  const handleCommentDivClick = () => {
    textareaCommentRef.current.focus();
  };

  return {
    textContentComment,
    handleTextareaChangeComment,
    textareaCommentRef,
    handleCommentDivClick,
  };
}