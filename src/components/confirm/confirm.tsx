import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


interface ConfirmBoxProps {
    open: boolean;
    handleClose: () => void;
    handleOk: () => void;
    okText?: string;
    cancelText?: string;
    title?: string;
    contentText?: string;
}

const ConfirmBox = (props: ConfirmBoxProps) => {
    const { open, title, handleClose, handleOk, okText, cancelText, contentText } = props;
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText || 'Disagree'}</Button>
          <Button onClick={handleOk} autoFocus>
            {okText || 'Agree'}
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmBox;
