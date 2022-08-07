import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState } from 'react';
import Checkbox from './controls/Checkbox';

interface CheckBoxPopupProps {
    open: boolean;
    handleClose: () => void;
    handleOk: () => void;
    labelText?: string;
    okText?:string;
    cancelText?: string;
    contentText?: string;
}

const CheckBoxPopup = (props: CheckBoxPopupProps) => {

    const { open, handleClose, handleOk, okText, labelText } = props;
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogContent sx={{ paddingBottom: 0 }}>
            <Checkbox
                label={labelText|| ''}
                checked={isChecked}
                onChange={()=>{setIsChecked((prev) => !prev)}}
            />
            </DialogContent>
            <DialogActions>
            {/* <Button onClick={handleClose}>{cancelText || 'Continue'}</Button> */}
            <Button onClick={handleOk} autoFocus>
                {okText || 'Continue'}
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CheckBoxPopup;
