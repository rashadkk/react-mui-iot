import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Grid } from '@mui/material';
import Controls from '../../components/controls/Controls';

// import LoadingButton from '@mui/material/Button'

import { useForm } from '../../components/useForm';
import registryService from '../../services/registry.service';
import { useState } from 'react';

interface Props {
    region: string,
    registryId: string,
    open: boolean,
    handleClose: () => void,
    onAddComplete: () => void,
}

const AddCaCertificateModal = (props: Props) => {

    const { open, handleClose, region, registryId, onAddComplete } = props;
    const [loading, setLoading] = useState(false);

    const { values, handleInputChange, resetForm } = useForm({inputMethod: 'MANUAL' })

    console.log('add public key', values);

    const closeHandler = () => {
        resetForm();
        handleClose();
    }

    const addCertHandler = () => {
        if(!values?.certValue) return;
        addCACertificate(values?.certValue);
    }

    const addCACertificate = async (certValue: string) => {
        try {
            const certObject = {
                credentials: 
                {
                    publicKeyCertificate: {
                        format: 'X509_CERTIFICATE_PEM',
                        certificate: certValue
                    }
                }
            }
            setLoading(true);
           const resp = await registryService.addCACertificate(region, registryId, certObject);
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
          <Dialog open={open} onClose={closeHandler} fullWidth>
            <DialogTitle>Add CA certificate</DialogTitle>
            <DialogContent>
              <Grid container>
              <>             
                <Grid item sm={12}>
                    <Controls.RadioGroup
                            name="inputMethod"
                            value={values?.inputMethod}
                            className=""
                            onChange={handleInputChange}
                            items={[
                                { id: 'MANUAL', title: 'Enter manually' },
                                { id: 'UPLOAD', title: 'Upload', disabled: true },
                            ]}
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
  )
}

export default AddCaCertificateModal