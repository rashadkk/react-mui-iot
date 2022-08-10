import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Controls from '../../components/controls/Controls';

import { useForm } from '../../components/useForm';
import { publicKeyFormat } from '../../global/constants';
import { useEffect, useState } from 'react';
import deviceService from '../../services/device.service';
import { Box } from '@mui/system';
import { InfoRounded } from '@mui/icons-material';

interface Props {
    region: string,
    registryId: string,
    deviceId: string,
    open: boolean,
    handleClose: () => void,
    onAddComplete: () => void,
    hasCACerificate: boolean,
}

export default function AddPublicKeyModal(props: Props) {

    const { open, handleClose, onAddComplete, deviceId, registryId, region, hasCACerificate } = props;
    const [loading, setLoading] = useState(false);
    const [keyFormats, setKeyFormats] = useState(publicKeyFormat)

    const [errorText, setErrorText] = useState('');


    // const validate = (fieldValues = values) => {
    //     const temp: any =  { ...errors }
    //     if(!fieldValues?.certValue) {
    //         temp.certValue = 'This field is required'
    //     }
    //     if(!fieldValues?.keyFormat) {
    //         temp.keyFormat = 'This field is required'
    //     }
    //     setErrors(temp);
    //     return Object.values(temp).every(x => x == "")
    // }

    const { values, resetForm, handleInputChange, errors, setValues, setErrors } = useForm({inputMethod: 'MANUAL', keyFormat: 'RSA_PEM' })

    console.log('error', errors);

    const closeHandler = () => {
        resetForm();
        handleClose();
        setErrorText('');
    }

    const addCertHandler = () => {
        if(!values?.certValue || !values?.keyFormat) return;
        addAuthCertificate(values?.certValue);
    }

    const addAuthCertificate = async (certValue: string) => {
        try {
            const certObject = {
                credentials: 
                {
                    expirationTime: '',
                    publicKey: {
                        format: values?.keyFormat,
                        key: values?.certValue
                    }
                }
            }
            setLoading(true);
            setErrorText('');
            await deviceService.addPublicKey(deviceId, registryId, region, certObject);
            
            onAddComplete();
            setLoading(false);
            resetForm();
        
        } catch (error: any) {
            console.log('error=====>', error?.response?.data?.message);
            setLoading(false);
            if(error?.response?.data?.message){
                setErrorText(error?.response?.data?.message)
            }
        }
    }

    useEffect(() => {
        const keyFormatsUpdated = keyFormats?.map(item => 
            (hasCACerificate && ['RSA_PEM', 'ES256_PEM'].includes(item?.id)) ? {...item, disabled: true} : item  
        )
        setKeyFormats(keyFormatsUpdated)
        if(hasCACerificate) setValues((prev: any) => ({...prev, keyFormat: 'RSA_X509_PEM' }))
    }, [hasCACerificate])
    

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
                {
                    hasCACerificate && (
                        <Box paddingX={2} paddingY={1} marginY={2} sx={{ backgroundColor: '#f2f2f2' }} borderRadius={0.75}>
                            <Stack spacing={4} direction="row" alignItems="center">
                                <InfoRounded color="inherit" />
                                <Typography variant="body2">The registry for this device has a CA certificate, which requires the device's public key to be wrapped in an X.509 certificate.</Typography>
                            </Stack>
                        </Box>
                    )
                }
                <Controls.Select
                        name="keyFormat"
                        options={keyFormats}
                        value={values?.keyFormat}
                        label="Public key format"
                        size="small"
                        onChange={handleInputChange}
                        required
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
                        // error={!!(errors['certValue'])}
                        // helperText={errors['certValue']}
                    />
                }
                {
                    errorText && (
                        <Stack sx={{ width: '100%', marginTop: '1rem' }} spacing={2}>
                            <Alert severity="error">{errorText}</Alert>
                        </Stack>
                    )
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
