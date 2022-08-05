import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar';
import { Edit, Delete } from "@mui/icons-material";
import registryService from "../../services/registry.service";
import { useEffect, useState } from "react";
import ConfirmBox from "../../components/confirm/confirm";


const RegistryOverview = () => {


    const [registryDetails, setRegistryDetails] = useState<any>({});
    const [deletePopupOpen, setDeletePopupOpen] = useState(false)

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
                setRegistryDetails(resp.data?.details)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRegistry();
    }, [registryId])

    const deleRegistry = async () => {
        try {
            if(registryId && region) {
                await registryService.deleteRegistry(registryId, region);
                navigate('/registries');
            }
        } catch (error) {
            
        }
    }
    


  return (
    <Box sx={{ padding: 0, display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            <Toolbar sx={{ backgroundColor: '#fff', borderBottom: '1px solid #cdcdcd' }}>
                <Typography variant="h5" fontWeight={500} component="h1">Registry details</Typography>
                <Button sx={{ marginLeft: '3rem' }} onClick={() => { navigate(`/registries/${registryId}/edit`) }}>
                    <Edit sx={{ marginRight: '.35rem' }} />
                    Edit Registry
                </Button>
                <Button sx={{ marginLeft: '1rem' }} onClick={() => { setDeletePopupOpen(true) }}>
                    <Delete sx={{ marginRight: '.35rem' }} />
                    Delete Registry
                </Button>
            </Toolbar>

            <Box sx={{ padding: '1.5rem'}} >
                <Typography className="mb-4" variant="h5" component="h1">Registry ID: {registryId}</Typography>
                <Grid container>
                    <Grid item sm={6}>

                        <Divider sx={{ opacity: 1 }}/>
                        <Grid container>
                            <Grid item sm={8}>
                                <Typography fontWeight="500" variant="subtitle1">Region</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography color="GrayText" variant="body1">{region}</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ opacity: 1 }} />
                        <Grid container>
                            <Grid item sm={8}>
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
                        <Divider sx={{ opacity: 1 }} />
                        <Grid container>
                            <Grid item sm={8}>
                                <Typography fontWeight="500" variant="subtitle1">Cloud Logging</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography color="GrayText" variant="body1" textTransform="capitalize">
                                    {registryDetails?.logLevel?.toLowerCase()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className="mb-5" sx={{ opacity: 1 }} />

                    </Grid>
                </Grid>

                <Typography className="mb-2" variant="h5" component="h1">Cloud Pub/Sub topics</Typography>
                <Typography variant="body2">A registry can have 1 or more topics for publishing device telemetry and state events.</Typography>
                
                <TableContainer sx={{ marginTop: '1.5rem' }} >
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                            <TableRow>
                                <TableCell>Topic name</TableCell>
                                <TableCell>Topic type</TableCell>
                                <TableCell>Subfolder</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                    
                        <TableRow
                            // key={registryDetails?.topicName}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{registryDetails?.stateNotificationConfig?.pubsubTopicName}</TableCell>
                            <TableCell>{'Default telemetry'}</TableCell>
                            <TableCell>{'_'}</TableCell>
                        </TableRow>
                    
                    </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
        <ConfirmBox
            title="Delete Registry"
            open={deletePopupOpen}
            handleClose={()=> setDeletePopupOpen(false)}
            handleOk={deleRegistry}
        />
    </Box>
  )
}

export default RegistryOverview;
