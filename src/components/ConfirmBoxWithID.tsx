import { ReportProblemSharp } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Input from './controls/Input';
import { useForm } from './useForm';

interface ConfirmBoxWithIDProps {
    open: boolean;
    handleClose: () => void;
    handleOk: () => void;
    okText?: string;
    cancelText?: string;
    title?: string;
    contentText?: string;
    confirmText?: string
}

const ConfirmBoxWithID = (props: ConfirmBoxWithIDProps) => {
    const { open, title, handleClose, handleOk, okText, cancelText, contentText, confirmText } = props;

    const { values, handleInputChange } = useForm({});

    const validate = () => {
       return values?.value === confirmText
    }



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
        <Box paddingX={3} paddingY={2} sx={{ backgroundColor: '#f2f2f2' }}>
          <Stack spacing={4} direction="row" alignItems="center">
            <ReportProblemSharp color="warning" fontSize="small" />
            <Typography variant="body2">This operation cannot be undone.</Typography>
          </Stack>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="inherit" marginBottom={3}>
            {contentText}
          </DialogContentText>
          <Box>
            <Typography variant="body2" paddingY={1}>Confirm you want to delete this registry by entering the ID:
              <Typography variant="body2" fontWeight={500} component="span">{confirmText}</Typography>
            </Typography>
            <Input
              name="value"
              onChange={handleInputChange}
              value={values?.value}
              label={"Registry ID"}
              fullWidth
            />
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText || 'Disagree'}</Button>
          <Button onClick={handleOk} disabled={!validate()} autoFocus variant="contained">
            {okText || 'Agree'}
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmBoxWithID;
