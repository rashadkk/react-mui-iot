import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, Grid, Stack } from '@mui/material';
import Controls from '../../components/controls/Controls';

// import LoadingButton from '@mui/material/Button'

import { useForm } from '../../components/useForm';
import registryService from '../../services/registry.service';
import { useState } from 'react';
import RenderElement from '../../components/RenderElement';

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
    const [errorText, setErrorText] = useState('');

    const { values, handleInputChange, resetForm } = useForm({inputMethod: 'MANUAL' })

    const closeHandler = () => {
        resetForm();
        handleClose();
        setErrorText('')
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
            setErrorText('');

           await registryService.addCACertificate(region, registryId, certObject);

           onAddComplete();
           setLoading(false);
           resetForm();
           
        } catch (error: any) {
            setLoading(false);
            if(error?.response?.data?.message){
                setErrorText(error?.response?.data?.message)
            }
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
                        <RenderElement show={!!errorText}>
                            <Stack sx={{ width: '100%', marginTop: '1rem' }} spacing={2}>
                                <Alert severity="error">{errorText}</Alert>
                            </Stack>
                        </RenderElement>
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