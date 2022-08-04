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
            const params = {
                id: values?.id,
                name:`project/${projectId}/locations/${region}/registries/${registry}/devices/${values?.id}`,
                credentials:[
                    {
                    expirationTime: "2023-10-02T15:01:23.045123456Z", // TODO
                    publicKey: {
                        "format": "RSA_X509_PEM",
                        "key": "-----BEGIN CERTIFICATE-----\nMIIDTjCCAjagAwIBAgIUT1pnW729WKi7u7WsOZi9uBbPfWIwDQYJKoZIhvcNAQEL\nBQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM\nGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yMjA3MjAwNjM2NDBaFw0zMjA3\nMTcwNjM2NDBaMF8xCzAJBgNVBAYTAkNOMREwDwYDVQQIDAhaaGVqaWFuZzERMA8G\nA1UEBwwISGFuZ3pob3UxDTALBgNVBAoMBEVNUVgxGzAZBgNVBAMMElNlcnZlciBj\nZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMCW4X3v\nCvwIxGFHXaUTMyHGl9vKR4p2jv+UyWm6MOVzBB8JH8OO5nWVQr8GRGMtQQHmxcLm\nfPS4YQ1KBBnyVAxrI9nqf9HWstKXTtZHCKUjFWUd5ewpM8RnByezU/P628l9FxtW\nZEk3G5tDjxXdPtSRxbd38sX4WBkNftJKXGseGXIG4MszuqQdmfCLqehLRSXZy3SF\nBS+qU1g/8n913cU8KD65Uq2dq1/cafxZ1y3WK30Gq15hyaKbaiZefuMhepF5sTWa\nPs74++SfhjKNN/d7EVEhV3UpOCTUxrwu0+AmUA0EL+RjXVNX4bTiSh9bKZxz+HaG\nC6IQNWlkZTLHawMCAwEAAaMcMBowGAYDVR0RBBEwD4cEAAAAAIIHMC4wLjAuMDAN\nBgkqhkiG9w0BAQsFAAOCAQEAJfI/NR/tQHN0hXdFSsBQ66L9/WhX/AsVrZ4//Yrl\njeJQ8BXuJP/z+0GmDTgGdFlVrgkB5SEx1nLrJXqF0032KpawxpNG8e9QD9rUP4ll\nPg43YJi6XSsNJ9Oo/UU2/FpYMBLzxlKgXPvuu83PYFykpqxqxSCw5sy4XDwTq9qx\nlUIXgasIwZgonyKQuK+QEejqM5aunGEOKye1rImouRmnOoH6taCyyjnF5faLY5Ux\nMBluKqF5oi2rawSuzNi9ywFgB6EXKZE25zx3gjyFBY+dHgAxDrKrSgT6ZSt1aveN\nc8PNT5d23RTkXNGFzIljLCs45Ts4vxuNYSIdJORCkcce1w==\n-----END CERTIFICATE-----"
                    }
                    }
            
                ],
                "blocked":false,
                "metadata":{},
                "loglevel":"INFO"
                
                
            }
        }
    }

  return (
    <Form className="p-4">
       <Grid container>
            <Grid container item sm={12} md={8} xl={6} gap={5}>
                <Typography variant="h5" component="h2">Registry properties</Typography>
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