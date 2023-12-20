import { Alert, Snackbar } from '@mui/material';
import faceErr from '../../assets/images/icon-face-error.png';
import faceSuccess from '../../assets/images/icon-face-success.png';
import faceWarning from '../../assets/images/icon-face-warning.png';
export default function SnackbarApp(props) {
  const { text, status, autoHideDuration, onClose } = props;
  return (
    <Snackbar
      open={text.length != 0 ? true : false}
      autoHideDuration={autoHideDuration ? autoHideDuration : 2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {text ? (
        <Alert
          icon={
            <img
              src={status == 'success' ? faceSuccess : status == 'warning' ? faceWarning : faceErr}
              style={{ width: '17px' }}
            />
          }
          className="rounded py-1"
          style={
            status == 'success'
              ? { background: '#D6F3E9', color: '#01162B', maxWidth: '60vw' }
              : status == 'warning'
              ? { background: '#FBE9CB', color: '#01162B', maxWidth: '60vw' }
              : { background: '#FFD6D6', color: '#01162B', maxWidth: '60vw' }
          }
          severity={status ? status : 'error'}
          onClose={onClose}
        >
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </Alert>
      ) : null}
    </Snackbar>
  );
}
