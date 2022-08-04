import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar';
import { Edit, Delete } from "@mui/icons-material";
import registryService from "../../services/registry.service";
import { useEffect, useState } from "react";

const topics = [
    { topicName: 'Temperature2', type: 'Default type', subfolder: '-' }
]

const RegistryOverview = () => {


    const [registryDetails, setRegistryDetails] = useState<any>({});

    const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    
    console.log(routerParams)
    console.log('serach params', queryParams);
    

    const { registryId } = routerParams;
    const region = queryParams.get('region');

    const getRegistry = async () => {
        try {
            if(registryId && region) {
                const resp = await registryService.getRegistry(registryId, region);
                console.log(resp.data)
                setRegistryDetails(resp.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRegistry();
    
   
    }, [registryId])
    


  return (
    <Box sx={{ padding: 0, display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            <Toolbar sx={{ backgroundColor: '#fff', borderBottom: '1px solid #cdcdcd' }}>
                <Typography variant="h5" fontWeight={500} component="h1">Registries</Typography>
                <Button sx={{ marginLeft: '3rem' }} onClick={() => navigate('')}>
                    <Edit sx={{ marginRight: '.35rem' }} />
                    Edit Registry
                </Button>
                <Button sx={{ marginLeft: '1rem' }} onClick={() => navigate('')}>
                    <Delete sx={{ marginRight: '.35rem' }} />
                    Delete Registry
                </Button>
            </Toolbar>
            <Paper square sx={{ padding: '1.5rem'}} >
                <Typography className="mb-4" variant="h5" component="h1">Registry ID: {registryId}</Typography>
                <Divider />
                <Grid container>
                    <Grid item sm={4}>
                        <Typography fontWeight="500" variant="subtitle1">Region</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1">{region}</Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item sm={4}>
                        <Typography fontWeight="500" variant="subtitle1">Protocols</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        {(registryDetails?.mqttConfig?.mqttEnabledState === 'MQTT_ENABLED') &&
                        <Typography color="GrayText" variant="body1">MQTT</Typography>
                        }
                        {(registryDetails?.httpConfig?.httpEnabledState === 'HTTP_ENABLED') &&
                        <Typography color="GrayText" variant="body1">HTTP</Typography>
                        }
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item sm={4}>
                        <Typography fontWeight="500" variant="subtitle1">Cloud Logging</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography color="GrayText" variant="body1" textTransform="capitalize">
                            {registryDetails?.logLevel?.toLowerCase()}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className="mb-5" />

                <Typography className="mb-2" variant="h5" component="h1">Cloud Pub/Sub topics</Typography>
                <Typography variant="body2">A registry can have 1 or more topics for publishing device telemetry and state events.</Typography>
                
                <TableContainer sx={{ marginTop: '1.5rem' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Topic name</TableCell>
                                <TableCell>Topic type</TableCell>
                                <TableCell>Subfolder</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                    
                        <TableRow
                            // key={registryDetails?.topicName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{registryDetails?.stateNotificationConfig?.pubsubTopicName}</TableCell>
                            <TableCell>{'Default telemetry'}</TableCell>
                            <TableCell>{'_'}</TableCell>
                        </TableRow>
                    
                    </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Box>
    </Box>
  )
}

export default RegistryOverview;
