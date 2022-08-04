import { FormEvent } from "react";
import {
	Autocomplete, createFilterOptions, FormControl, Button,
	FormGroup, Grid, TextField, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Form, useForm } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import registryService from "../../services/registry.service";

// import Button from "../../components/controls/Button";

// const project = 'famous-palisade-356103';

const initialFormValues = {
	mqttEnabledState: true,
	httpEnabledState: true,
	logLevel: 'DISABLED',
	certInputMethod: 'MANUAL'
}

const regions = [
	{ id: 'us-central1', title: 'us-central1' },
	{ id: 'europe-west1', title: 'europe-west1' },
	{ id: 'asia-east1', title: 'asia-east1' },
]

const cloudLoggingOptions = [
	{ id: "DISABLED", title: 'Disabled' },
	{ id: "ERROR", title: 'Error' },
	{ id: "INFO", title: 'Info' },
	{ id: "DEBUG", title: 'Debug' },
]

const filter = createFilterOptions<any>();

const NewRegistryForm = () => {

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

	const navigate = useNavigate();

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm
	} = useForm(initialFormValues, true, validate);

	console.log('values', values);

	const createRegistry = async (params: any) => {
		try {
			await registryService.createRegistry(params);
			navigate(`/registries/${params?.id}/overview?region=${params?.region}`);
		} catch (error) {
			console.log('Error', error);
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()){
			const projectId = 'famous-palisade-356103';
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
				Credentials:[{
					publicKeyCertificate: {
						format: 'X509_CERTIFICATE_PEM',
						certificate: values?.certValue
					}
				}]
			}
            // resetForm()
			console.log('params', params);
			createRegistry(params)
        }
    }

	return (
		<Form className="p-4" onSubmit={handleSubmit}>
			<Grid container>
				<Grid container item sm={12} md={8} xl={6} gap={5}>
					<Typography variant="h5" component="h2">Registry properties</Typography>
					<Grid item sm={12}>
						<Controls.Input
							name="id"
							label="Registry ID"
							placeholder="Registry ID"
							value={values?.id || ''}
							onChange={handleInputChange}
							// size="small"
							required
							fullWidth
						/>
					</Grid>
					<Grid item sm={12}>
						<Controls.Select
							name="region"
							label="Region"
							placeholder="Region"
							options={regions}
							value={values?.region || ''}
							onChange={handleInputChange}
							// size="small"
							required
						/>
					</Grid>
					<Typography variant="h5" component="h2">Cloud Pub/Sub topics (Optional)</Typography>
					<Grid item sm={12}>
						<Controls.Input
							name="pubsubTopicName"
							label="Cloud Pub/Sub topic"
							placeholder="Registry ID"
							value={values?.pubsubTopicName || ''}
							onChange={handleInputChange}
							fullWidth
						/>
						{/* <FormControl fullWidth>
							<Autocomplete
								value={values?.pubsubTopicName}
								onChange={(event, newValue) => {
									// console.log(event, newValue)
									// if (typeof newValue === 'string') {
									//   setValue({
									//     title: newValue,
									//   });
									//   handleInputChange()
									// } else if (newValue && newValue.inputValue) {
									//   // Create a new value from the user input
									//   setValue({
									//     title: newValue.inputValue,
									//   });
									// } else {
									//   setValue(newValue);
									// }
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);
									const { inputValue } = params;
									// Suggest the creation of a new value
									const isExisting = options.some((option) => inputValue === option.title);
									if (inputValue !== '' && !isExisting) {
										filtered.push({
											inputValue,
											title: `Add "${inputValue}"`,
										});
									}
									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								options={regions}
								getOptionLabel={(option: any) => {
									// Value selected with enter, right from the input
									if (typeof option === 'string') {
										return option;
									}
									// Add "xxx" option created dynamically
									if (option.inputValue) {
										return option.inputValue;
									}
									// Regular option
									return option.title;
								}}
								renderOption={(props, option) => <li {...props}>{option.title}</li>}
								freeSolo
								renderInput={(params) => (
									<TextField {...params} label="Cloud Pub/Sub topics" />
								)}
							/>
						</FormControl> */}
					</Grid>
					<Typography variant="h5" component="h2">Protocol</Typography>
					<Grid item sm={12}>
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
					<Typography variant="h5" component="h2">Cloud Logging</Typography>
					<Grid item sm={12}>
						<Controls.RadioGroup
							name="logLevel"
							value={values?.logLevel || ''}
							onChange={handleInputChange}
							items={cloudLoggingOptions}
						/>
					</Grid>
					<Typography variant="h5" component="h2">CA certificate (optional)</Typography>
					<Grid item sm={12}>
						<Controls.RadioGroup
							name="certInputMethod"
							value={values?.certInputMethod}
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
							value={values?.certValue}
							placeholder={`-----BEGIN CERTIFICATE-----\n(Certificate value must be in PEM format)\n-----END CERTIFICATE-----`}
						/>
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

export default NewRegistryForm;
