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