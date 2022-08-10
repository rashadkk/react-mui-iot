import { FormEvent, useEffect, useState } from "react";
import { Alert, Button,
	FormGroup, Grid,  Stack,  Typography
} from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Form, useForm } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import registryService from "../../services/registry.service";

import { regions, cloudLoggingOptions } from '../../global/constants';
import RenderElement from "../../components/RenderElement";


// const filter = createFilterOptions<any>();

interface Props {
	editMode?: boolean
}

const NewRegistryForm = (props: Props) => {
	const { editMode } = props;

	// const [registryDetails, setRegistryDetails] = useState<any>({});
	const [errorText, setErrorText] = useState('');

    const routerParams = useParams();
    const [queryParams] = useSearchParams();

    const navigate = useNavigate();


	const { registryId } = routerParams;
    const region = queryParams.get('region');

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
		setValues,
		// setErrors,
		handleInputChange,
		// resetForm
	} = useForm({}, true, validate);

	const getRegistry = async () => {
        try {
            if(registryId && region) {
                const resp = await registryService.getRegistry(registryId, region);
				const registryDetails = resp.data?.details;
                // setRegistryDetails(registryDetails);
				let pubsubTopicName = '';
				const topicName = registryDetails?.stateNotificationConfig?.pubsubTopicName?.split('/');
				if(topicName?.length) {
					pubsubTopicName = topicName[topicName.length -1]
				}
				setValues({
					id: registryId,
					region: region,
					mqttEnabledState: registryDetails?.mqttConfig?.mqttEnabledState === 'MQTT_ENABLED',
					httpEnabledState: registryDetails?.httpConfig?.httpEnabledState === 'HTTP_ENABLED',
					logLevel: registryDetails?.logLevel,
					pubsubTopicName: pubsubTopicName
				})
            }
        } catch (error) {
            console.log(error)
        }
    }

	useEffect(() => {
	  if(editMode) {
		getRegistry();
	  }else {
		const initialFormValues = {
			mqttEnabledState: true,
			httpEnabledState: true,
			logLevel: 'DISABLED',
			certInputMethod: 'MANUAL'
		}
		setValues(initialFormValues)
	  }
	}, [])
	
	

	const createRegistry = async (params: any) => {
		try {
			setErrorText('');
			await registryService.createRegistry(params);
			navigate(`/registries/${params?.id}/overview?region=${params?.region}`);
		} catch (error: any) {
			if(error?.response?.data?.message){
                setErrorText(error?.response?.data?.message)
            }
		}
	}

	const updateRegistry = async (params: any) => {
		try {
			setErrorText('');
			await registryService.editRegistry(params?.id, params);
			navigate(`/registries/${params?.id}/overview?region=${params?.region}`);
		} catch (error: any) {
			if(error?.response?.data?.message){
                setErrorText(error?.response?.data?.message)
            }
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()){
			const projectId = 'famous-palisade-356103';

			const cred: Array<any> = [];

			const params = {
				id: values?.id,
				region: values?.region,
				name: `projects/${projectId}/locations/${values?.region}/registries/${values?.id}`,
				mqttConfig: {
					mqttEnabledState: values?.mqttEnabledState ? 'MQTT_ENABLED': 'MQTT_DISABLED'
				},
				httpConfig: {
					httpEnabledState: values?.httpEnabledState ? 'HTTP_ENABLED': 'HTTP_DISABLED'
				},
				logLevel: values?.logLevel,
				stateNotificationConfig:{
					pubsubTopicName: values?.pubsubTopicName ? `projects/${projectId}/topics/${values?.pubsubTopicName}` : ''
				},
				eventNotificationConfigs:[],
				Credentials: cred
			}

			if(values?.certValue) {
                params.Credentials.push({
					publicKeyCertificate: {
						format: 'X509_CERTIFICATE_PEM',
						certificate: values?.certValue
					}
				})
            }
			if(!editMode) {
				createRegistry(params)
				return
			}
			updateRegistry(params)

        }
    }

	return (
		<Form className="p-4" onSubmit={handleSubmit}>
			<Grid container>
				<Grid container item sm={12} md={6} xl={4} gap={5}>
					<Grid item sm={12}>
						<Typography variant="h6" marginBottom={2} fontWeight={500} component="h2">Registry properties</Typography>
						<Controls.Input
							name="id"
							label="Registry ID"
							placeholder="Registry ID"
							value={values?.id || ''}
							onChange={handleInputChange}
							required
							fullWidth
							disabled={editMode}
							className="mb-4"
						/>
						<Controls.Select
							name="region"
							label="Region"
							placeholder="Region"
							options={regions}
							value={values?.region || ''}
							onChange={handleInputChange}
							disabled={editMode}
							required
						/>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="h6"  marginBottom={2} fontWeight={500} component="h2">Cloud Pub/Sub topics (Optional)</Typography>
						<Controls.Input
							name="pubsubTopicName"
							label="Cloud Pub/Sub topic"
							placeholder="Registry ID"
							value={values?.pubsubTopicName || ''}
							onChange={handleInputChange}
							fullWidth
						/>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="h6" marginBottom={2} fontWeight={500} component="h2">Protocol</Typography>
						<FormGroup>
							<Controls.Checkbox
								label="MQTT"
								name="mqttEnabledState"
								checked={values?.mqttEnabledState}
								onChange={handleInputChange}
							/>
							<Controls.Checkbox
								label="HTTP"
								name="httpEnabledState"
								checked={values?.httpEnabledState}
								onChange={handleInputChange}
							/>
						</FormGroup>
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
									<Typography variant="h6" component="h2">CA certificate (optional)</Typography>
									<Controls.RadioGroup
										name="certInputMethod"
										value={values?.certInputMethod || ''}
										onChange={handleInputChange}
										items={[
											{ id: 'MANUAL', title: 'Enter manually' },
											{ id: 'UPLOAD', title: 'Upload', disabled: true },
										]}
									/>
									<Controls.Input
										fullWidth
										label="Certificate value"
										name="certValue"
										onChange={handleInputChange}
										multiline
										rows={6}
										value={values?.certValue || ''}
										placeholder={`-----BEGIN CERTIFICATE-----\n(Certificate value must be in PEM format)\n-----END CERTIFICATE-----`}
									/>
									<RenderElement show={!!errorText}>
										<Stack sx={{ width: '100%', marginTop: '1rem' }} spacing={2}>
											<Alert severity="error">{errorText}</Alert>
										</Stack>
									</RenderElement>
								</Grid>
							</>
						)
					}
					<div className="d-flex" >
						<Button variant="contained" type="submit">{ editMode ? 'Update': 'Create'}</Button>
						<Button onClick={() => navigate(-1)}>Cancel</Button>
					</div>
				</Grid>
			</Grid>
		</Form>
	)
}

export default NewRegistryForm;
