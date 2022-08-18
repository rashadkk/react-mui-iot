import { Alert, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import Controls from '../../components/controls/Controls';
import GoogleButton from '../../components/google-button/GoogleButton';
import { Form, useForm } from '../../components/useForm';

import styles from './Login.module.scss';
import KoreLogo from '../../assets/kore_logo.png'

import { signInWithEmailAndPassword, auth, provider, signInWithPopup, } from '../../config/firebase';
import RenderElement from '../../components/RenderElement';

import { delay } from '../../utils/utility';

const Login = () => {

	const [errorText, setErrorText] = useState('');
	const [tenantLoading, setTenantLoading] = useState(false);
	const [tenants, setTenants] = useState<any>(null);
	
	const validation = (fieldValues = values) => {
		let temp = { ...errors }
		if (!fieldValues?.email) {
			temp.email = "This field is required."
		}else if(!(/$^|.+@.+..+/).test(fieldValues.email)) {
			temp.email = "Invalid email."
		}
		if (!fieldValues?.password) {
			temp.password = "This field is required"
		}
		
		setErrors({
			...temp
		})
		
		if (fieldValues === values)
		return Object.values(temp).every(x => x === "")
	}
	
	const { handleInputChange, values, errors, setErrors } = useForm({}, false, validation);
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = values;

		console.log('values', values);
		setErrorText('');
		signInWithEmailAndPassword(auth, email, password).then((user: any) => {
			console.log('user', user);
			
		}).catch(error => {
			console.log('Error', error?.code);
			setErrorText(error?.message);
		})
	}

	const signInWithGoogle = () => {
		setErrorText('');
		signInWithPopup(auth, provider).then(userCred => {
			console.log(userCred);
		}).catch(err => {
			setErrorText(err?.message);
		})
	}

	const getTenant = async () => {
		if(!values?.email) return
		setTenantLoading(true);
		await delay(5000);
		setTenantLoading(false);
		setTenants('Tenants')
	}
	
	return (
		<Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
			<Box  marginY={8}>
				<Grid container alignItems="center" justifyContent="center">
					<Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
							<Form className={styles.LoginForm} onSubmit={handleSubmit}>
								<RenderElement show={!!errorText}>
									<Stack sx={{ width: '100%', marginY: '1rem' }} spacing={2}>
										<Alert severity="error">{errorText}</Alert>
									</Stack>
								</RenderElement>
								<img src={KoreLogo} alt="Logo" height={36} style={{ marginBottom: '1rem' }}/>
							
								<Grid container direction="column" rowSpacing={4}>
									<RenderElement show={tenantLoading}>
										<Box paddingY={4}>
											<Stack direction="column" >
												<Typography variant='h5' fontWeight={500} marginY={3}>
													Taking you to your organisation...
												</Typography>
												<CircularProgress size={32} />
											</Stack>
										</Box>
									</RenderElement>

									<RenderElement show={!tenantLoading}>

										<RenderElement show={!tenants}>
											<Grid item>
												<Controls.Input
													label="Email"
													name="email"
													type="email"
													required
													onChange={handleInputChange}
													value={values?.email || ''}
													fullWidth
												/>
											</Grid>
											<Grid item>
												<Button variant="contained" onClick={getTenant} fullWidth>Next</Button>
											</Grid>
										</RenderElement>

										<RenderElement show={!!tenants}>
											<Grid item>
												<Controls.Input
													label="Password"
													name="password"
													type="password"
													value={values?.password || ''}
													onChange={handleInputChange}
													fullWidth
												/>
											</Grid>
											<Grid item>
												<Button type="submit" variant="contained" fullWidth>Login</Button>
											</Grid>
										</RenderElement>
										<Grid item>
											<GoogleButton fullWidth onClick={signInWithGoogle} />
										</Grid>
									</RenderElement>
								</Grid>
							</Form>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default Login;
