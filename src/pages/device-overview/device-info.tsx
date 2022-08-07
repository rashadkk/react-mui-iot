import { Grid, Typography } from '@mui/material';

interface Props {
    deviceDetails: any
}

const DeviceInfo = (props: Props) => {
    const { deviceDetails } = props
  return (
    <>
    <Typography className="mb-4" variant="h5" component="h1">Device ID: {deviceDetails?.id}</Typography>
    <Grid container columnSpacing={8}>
        <Grid item>
            <Typography fontWeight="500" variant="subtitle1">Numeric ID</Typography>
            <Typography color="GrayText" variant="body1">{deviceDetails?.numId}</Typography>
        </Grid>
        <Grid item>
            <Typography fontWeight="500" variant="subtitle1">Registry</Typography>
            <Typography color="GrayText" variant="body1">{''}</Typography>
        </Grid>
        <Grid item>
            <Typography fontWeight="500" variant="subtitle1">Cloud Logging</Typography>
            <Typography color="GrayText" variant="body1" textTransform="capitalize">
                {deviceDetails?.logLevel?.toLowerCase()}
            </Typography>
        </Grid>
        <Grid item>
            <Typography fontWeight="500" variant="subtitle1">Communication</Typography>
            <Typography color="GrayText" variant="body1">{deviceDetails?.blocked ? 'Blocked': 'Allowed'}</Typography>
        </Grid>
    </Grid>
    </>
  )
}

export default DeviceInfo