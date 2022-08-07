import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Grid } from '@mui/material';
import Controls from '../../components/controls/Controls';

import { useForm } from '../../components/useForm';
import { publicKeyFormat } from '../../global/constants';
import { useState } from 'react';
import deviceService from '../../services/device.service';

interface Props {
    region: string,
    registryId: string,
    deviceId: string,
    open: boolean,
    handleClose: () => void,
    onAddComplete: () => void,
}

export default function AddPublicKeyModal(props: Props) {

    const { open, handleClose, onAddComplete, deviceId, registryId, region } = props;
    const [loading, setLoading] = useState(false);

    const { values, resetForm, handleInputChange } = useForm({inputMethod: 'MANUAL', publicKeyFormat: 'RSA_PEM' })

    console.log('add public key', values)

    const closeHandler = () => {
        resetForm();
        handleClose();
    }

    const addCertHandler = () => {
        if(!values?.certValue || !values?.publicKeyFormat) return;
        addAuthCertificate(values?.certValue);
    }

    const addAuthCertificate = async (certValue: string) => {
        try {
            const certObject = {
                credentials: 
                {
                    expirationTime: '',
                    publicKey: {
                        format: values?.publicKeyFormat,
                        key: values?.certValue
                    }
                }
            }
            setLoading(true);
            const resp = await deviceService.addPublicKey(deviceId, registryId, region, certObject);
            console.log('certificate registry', resp.data);
            
            onAddComplete();
            setLoading(false);
            resetForm();
        
        } catch (error) {
            console.log('error=====>', error);
            setLoading(false);
        }
}

  return (
    <div>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>Add authentication key</DialogTitle>
        <DialogContent>
          <Grid container>
          <>         
                            
            <Grid item sm={12}>
                <Controls.RadioGroup
                        name="inputMethod"
                        value={values?.inputMethod}
                        onChange={handleInputChange}
                        items={[
                            { id: 'MANUAL', title: 'Enter manually' },
                            { id: 'UPLOAD', title: 'Upload', disabled: true },
                        ]}
                />
                <Controls.Select
                        name="publicKeyFormat"
                        options={publicKeyFormat}
                        value={values?.publicKeyFormat}
                        label="Public key format"
                        size="small"
                        onChange={handleInputChange}
                />
                {
                    values?.inputMethod === 'MANUAL' &&
                    <Controls.Input
                        fullWidth
                        size="small"
                        label="Certificate value"
                        name="certValue"
                        onChange={handleInputChange}
                        multiline
                        value={values?.certValue || ''}
                        rows={6}
                        className="mt-4"
                        placeholder={`-----BEGIN CERTIFICATE-----\n(Certificate value must be in PEM format)\n-----END CERTIFICATE-----`}
                    />
                }
                </Grid>
            </>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} sx={{ marginRight: '1rem' }}>Cancel</Button>
                {
                    !loading &&
                    <Button onClick={addCertHandler} 
                        variant="contained"
                        disabled={loading}
                    >
                        Add
                    </Button>
                }
                {
                    loading  && <CircularProgress thickness={6} sx={{ marginRight: '.5rem' }} size={18} />
                }
        </DialogActions>
      </Dialog>
    </div>
  );
}
