import { Form, useForm } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import { Alert, Button, Grid, Stack, Typography } from '@mui/material';
import deviceService from '../../services/device.service';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cloudLoggingOptions, publicKeyFormat } from '../../global/constants';
import registryService from '../../services/registry.service';

interface Props {
	region: string | undefined | null,
	registry: string | undefined,
    deviceId?: string,
    editMode?: boolean
}

function NewDeviceForm(props: Props) {

    const { region, registry, editMode, deviceId } = props;

    // const [registryDetails, setRegistryDetails] = useState<any>({});
    // const [deviceDetails, setDeviceDetails] = useState<any>({});
    const [keyFormats, setKeyFormats] = useState(publicKeyFormat)
    const [hasCACerificate, setHasCACerificate] = useState(false);
    const [errorText, setErrorText] = useState('');


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
		// if ('fullName' in fieldValues)
		//     temp.fullName = fieldValues.fullName ? "" : "This field is required."
		// if ('email' in fieldValues)
		//     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
		// if ('mobile' in fieldValues)
		//     temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
		// if ('departmentId' in fieldValues)
		//     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
		// setErrors({
		//     ...temp
		// })

		if (fieldValues === values)
			return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        // setErrors,
        setValues,
        handleInputChange,
        // resetForm
    } = useForm({}, true, validate);

    console.log('values', values)

    const createDevice = async (params: any) => {
        try {
            setErrorText('');
            if(registry && region) {
                await deviceService.createDevice(registry, region, params)
                navigate(`/registries/${registry}/devices/${params?.id}/overview?region=${region}`)
            }
        } catch (error: any) {
            console.log('Device create error', error);
            if(error?.response?.data?.message){
                setErrorText(error?.response?.data?.message);
            }
        }
    }

    const updateDevice = async (params: any) => {
        try {
            if(deviceId && registry && region) {
                await deviceService.editDevice(deviceId, registry, region, params);
                navigate(`/registries/${registry}/devices/${deviceId}/overview?region=${region}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getRegistry = async () => {
        try {
            if(registry && region) {
                const resp = await registryService.getRegistry(registry, region);
                const registryDetails = resp.data?.details;
                const certs = registryDetails?.credentials?.filter((cert: any) => !!cert?.publicKeyCertificate?.certificate)
                registryDetails.certs = certs;
                // setRegistryDetails(registryDetails);
                setHasCACerificate(certs.length > 0);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDevice = async () => {
        try {
            if(deviceId && registry && region) {
                const resp = await deviceService.getDevice(deviceId, registry, region);
                const deviceDetails = resp.data?.details;
                // setDeviceDetails(deviceDetails)
                setValues({
                    id: deviceId,
                    logLevel: deviceDetails?.logLevel,
                    deviceCommunication: deviceDetails?.blocked ? 'BLOCK' : 'ALLOW'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(editMode) {
            getDevice()
        }else{
            const initialFormValues = {
                deviceCommunication: 'ALLOW',
                logLevel: 'DISABLED',
                inputMethod: 'MANUAL',
                publicKeyFormat: 'RSA_PEM'
            }
            setValues(initialFormValues)
        }
        getRegistry();
    }, [])

    useEffect(() => {
        const keyFormatsUpdated = keyFormats?.map(item => 
            (hasCACerificate && ['RSA_PEM', 'ES256_PEM'].includes(item?.id)) ? {...item, disabled: true} : item  
        )
        setKeyFormats(keyFormatsUpdated)
        if(hasCACerificate) setValues((prev: any) => ({...prev, publicKeyFormat: 'RSA_X509_PEM' }))
    }, [hasCACerificate])

    const navigate = useNavigate();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()){

            const projectId = 'famous-palisade-356103';
            const cred: Array<any> = [];

            const params = {
                id: values?.id,
                name:`project/${projectId}/locations/${region}/registries/${registry}/devices/${values?.id}`,
                credentials: cred,
                blocked: values?.deviceCommunication !== 'ALLOW',
                metadata:{},
                logLevel:values?.logLevel
            }
            if(values?.certValue) {
                params.credentials.push({
                    expirationTime: "", // TODO
                    publicKey: {
                        format: values?.publicKeyFormat,
                        key: values?.certValue || ''
                    }
                })
            }
            if(!editMode) {
                createDevice(params);
                return;
            }
            updateDevice(params);
        }
    }

  return (
    <Form className="p-4" onSubmit={submitHandler}>
       <Grid container>
            <Grid container item sm={12} md={8} xl={6} gap={5}>
                <Grid item sm={12}>
                    <Controls.Input
                        name="id"
                        label="Device ID"
                        value={values?.id || ''}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        disabled={editMode}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="h6" marginBottom={2} fontWeight={500} component="h2">Device communication</Typography>
                    <Controls.RadioGroup
                        name="deviceCommunication"
                        items={[
                            {id: 'ALLOW', title: 'Allow' },
                            {id: 'BLOCK', title: 'Block' },
                        ]}
                        value={values?.deviceCommunication || ''}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="h6" marginBottom={2} fontWeight={500} component="h2">Cloud Logging</Typography>
                   <Controls.RadioGroup
                        name="logLevel"
                        value={values?.logLevel || ''}
                        onChange={handleInputChange}
                        items={cloudLoggingOptions}
                   />
                </Grid>
                {
                    !editMode && (
                        <>         
                            <Grid item sm={12}>
                            <Typography variant="h6" marginBottom={2} fontWeight={500} component="h2">Authentication (optional)</Typography>
                            <Controls.RadioGroup
                                    name="inputMethod"
                                    value={values?.inputMethod || ''}
                                    className=""
                                    onChange={handleInputChange}
                                    items={[
                                        { id: 'MANUAL', title: 'Enter manually' },
                                        { id: 'UPLOAD', title: 'Upload', disabled: true },
                                    ]}
                            />
                            <Controls.Select
                                    name="publicKeyFormat"
                                    options={keyFormats}
                                    value={values?.publicKeyFormat || ''}
                                    label="Public key format"
                                    onChange={handleInputChange}
                                    required
                            />
                                {
                                    values?.inputMethod === 'MANUAL' &&
                                    <Controls.Input
                                        fullWidth
                                        label="Certificate value"
                                        name="certValue"
                                        onChange={handleInputChange}
                                        multiline
                                        value={values?.certValue}
                                        rows={6}
                                        className="mt-4"
                                        placeholder={`-----BEGIN CERTIFICATE-----\n(Certificate value must be in PEM format)\n-----END CERTIFICATE-----`}
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
                    )
                }
                <div className="d-flex" >
                    <Button variant="contained" type="submit">{editMode ? 'Update' : 'Create'}</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
				</div>
            </Grid>
        </Grid>        
    </Form>
  )
}

export default NewDeviceForm