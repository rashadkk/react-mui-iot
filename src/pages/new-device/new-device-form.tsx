import { Form, useForm } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import { Button, Grid, TextField, Typography } from '@mui/material';
import deviceService from '../../services/device.service';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const cloudLoggingOptions = [
    { id: "DISABLED", title: 'Disabled' },
    { id: "ERROR", title: 'Error' },
    { id: "INFO", title: 'Info' },
    { id: "DEBUG", title: 'Debug' },
]

const publicKeyFormat = [
    { id: 'RSA_PEM', title: 'RS256' },
    { id: 'ES256_PEM', title: 'ES256' },
    { id: 'RSA_X509_PEM', title: 'RS256_X509' },
    { id: 'ES256_X509_PEM', title: 'ES256_X509' },
]

const initialFormValues = {
    deviceCommunication: 'ALLOW',
    logLevel: 'DISABLED',
    inputMethod: 'MANUAL',
    publicKeyFormat: 'RSA_X509_PEM'
}

interface Props {
	region: string | undefined | null,
	registry: string | undefined 
}

function NewDeviceForm(props: Props) {

    const { region, registry } = props;

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

		if (fieldValues == values)
			return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, true, validate);

    console.log('values', values)

    const createDevice = async (params: any) => {
        try {
            if(registry && region) {
                await deviceService.createDevice(registry, region, params)
                navigate(`/registries/${registry}/devices?region=${region}`)
            }
        } catch (error) {
            console.log('Device create error', error);
            
        }
    }

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
                loglevel:values?.logLevel
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
            createDevice(params);
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
                    />
                </Grid>
                <Typography variant="h5" component="h2">Device communication</Typography>
                <Grid item sm={12}>
                    <Controls.RadioGroup
                        name="deviceCommunication"
                        items={[
                            {id: 'ALLOW', title: 'Allow' },
                            {id: 'BLOCK', title: 'Block' },
                        ]}
                        value={values?.deviceCommunication}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Typography variant="h5" component="h2">Cloud Logging</Typography>
                <Grid item sm={12}>
                   <Controls.RadioGroup
                        name="logLevel"
                        value={values?.logLevel}
                        onChange={handleInputChange}
                        items={cloudLoggingOptions}
                   />
                </Grid>
                <Typography variant="h5" component="h2">Authentication (optional)</Typography>
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
                   <Controls.Select
                        name="publicKeyFormat"
                        options={publicKeyFormat}
                        value={values?.publicKeyFormat}
                        label="Public key format"
                        onChange={handleInputChange}
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
                </Grid>
                <div className="d-flex" >
                    <Button variant="contained" type="submit">Create</Button>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
				</div>
            </Grid>
        </Grid>        
    </Form>
  )
}

export default NewDeviceForm