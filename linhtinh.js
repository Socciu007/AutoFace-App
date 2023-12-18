export function useTextarea(initialValue) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDivClick = () => {
    textareaRef.current.focus();
  };

  return {
    value,
    handleChange,
    textareaRef,
    handleDivClick,
  };
} 
ref={UIDTextareaRef}  onClick={handleUIDDivClick}
const {
  value: textContent,
  handleChange: handleTextareaChange,
  textareaRef: UIDTextareaRef,
  handleDivClick: handleUIDDivClick,
} = useTextarea('');

export function CommentTextarea() {
  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');
  const textareaRef = useRef(null);
  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  const handleDivClick = () => {
    textareaRef.current.focus();
  };
  return {
    textContent,
    handleTextareaChange,
    handleDivClick,
    textareaRef,
  };
}
const { textContent, handleTextareaChange, handleDivClick, textareaRef } = CommentTextarea();
Addfriend
CreatePost
Join Group