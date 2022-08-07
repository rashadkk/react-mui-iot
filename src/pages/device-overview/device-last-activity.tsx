import { Divider, Grid, Typography } from '@mui/material';

const DeviceLastActivity = () => {
    return (
        <>
        <Typography className="mb-3" variant="h6" fontWeight={500} component="h2">Latest activity</Typography>
        <Grid container>
            <Grid item sm={7    }>
                <Divider sx={{ opacity: 1 }}/>
                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Heartbeat (MQTT only)</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />
                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Telemetry event received</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />
                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Device state event received</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />

                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Config sent</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />

                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Zone Config ACK (MQTT only)</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />

                <Grid container>
                    <Grid item sm={8}>
                        <Typography fontWeight="500" variant="subtitle1">Error</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">_</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ opacity: 1 }} />
            </Grid>
        </Grid>
        </>
    )
}

export default DeviceLastActivity;
