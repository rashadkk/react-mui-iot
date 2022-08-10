import { Box, Button, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar';
import { Edit, Delete } from "@mui/icons-material";
import registryService from "../../services/registry.service";
import { useEffect, useState } from "react";
import AddCaCertificateModal from "./add-ca-certificate-modal";
import ConfirmBoxWithID from "../../components/ConfirmBoxWithID";
import ConfirmBox from "../../components/confirm/confirm";

const RegistryOverview = () => {

    const [registryDetails, setRegistryDetails] = useState<any>({});
    const [deletePopupOpen, setDeletePopupOpen] = useState(false)
    const [addCertPopup, setAddCertPopup] = useState(false);

    const [selectedCert, setSelectedCert] = useState(null);

    const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    
    const { registryId } = routerParams;
    const region = queryParams.get('region');

    const getRegistry = async () => {
        try {
            if(registryId && region) {
                const resp = await registryService.getRegistry(registryId, region);
                const registryDetails = resp.data?.details;
                const certs = registryDetails?.credentials?.filter((cert: any) => !!cert?.publicKeyCertificate?.certificate)
                registryDetails.certs = certs;
                setRegistryDetails(registryDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRegistry();
    }, [registryId])

    const deleteRegistry = async () => {
        try {
            if(registryId && region) {
                await registryService.deleteRegistry(registryId, region);
                navigate('/registries');
            }
        } catch (error) {
            
        }
    }

    const deleteCACert = async (certObject: any) => {
        try {
            if(region && registryId) {
                const data = {
                    credentials: certObject
                }
                await registryService.deleteCACertificate(region, registryId, data);
                setSelectedCert(null);
                getRegistry();
                
            }
        } catch (error) {
            console.log('Error', error);
        }
    }


    
  return (
    <Box sx={{ padding: 0, display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            <Toolbar sx={{  borderBottom: '1px solid #cdcdcd' }}>
                <Typography variant="h5" fontWeight={500} component="h1">Registry details</Typography>
                <Button sx={{ marginLeft: '3rem' }} onClick={() => { navigate(`/registries/${registryId}/edit?region=${region}`) }}>
                    <Edit sx={{ marginRight: '.35rem' }} />
                    Edit Registry
                </Button>
                <Button sx={{ marginLeft: '1rem' }} onClick={() => { setDeletePopupOpen(true) }}>
                    <Delete sx={{ marginRight: '.35rem' }} />
                    Delete Registry
                </Button>
            </Toolbar>
            
            <Box sx={{ padding: '1.5rem'}} >
                <Typography className="mb-4" variant="h6" fontWeight={500} component="h1">Registry ID: {registryId}</Typography>
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

                <Typography className="mb-2" variant="h6" fontWeight={500} component="h1">Cloud Pub/Sub topics</Typography>
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

                <Box marginY={6}>
                    <Typography className="mb-2" variant="h5" component="h1">CA certificates</Typography>
                    <Typography variant="body2">A registry can have up to 10 CA certificates for device authentication</Typography>
                    
                    <Box paddingY={3}>
                        <Button 
                            variant="contained"
                            onClick={()=> setAddCertPopup(true)}
                        >Add Certificate</Button>
                    </Box>
                    

                    <TableContainer >
                        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                <TableRow>
                                    <TableCell width="20%">Certificate value</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                ( !registryDetails?.certs || registryDetails?.certs?.length === 0) &&
                                <TableRow>
                                        <TableCell colSpan={2}>
                                            No certificates added to the registry.
                                        </TableCell>
                                </TableRow>
                                }
                                {registryDetails?.certs?.map((row: any, index: number) => (
                                    <TableRow
                                        key={`certs-${index}`}
                                    >
                                        <TableCell className="text-truncate">
                                            {row?.publicKeyCertificate?.certificate?.replace('-----BEGIN CERTIFICATE-----', '')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => setSelectedCert(row)}>
                                                <Delete color="disabled" fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>



                </Box>

            </Box>
        </Box>
        <AddCaCertificateModal
            open={addCertPopup}
            handleClose={()=>setAddCertPopup(false)}
            region={region || ''}
            registryId={registryId || ''}
            onAddComplete={() => {
                getRegistry();
                setAddCertPopup(false);
            }}
        />
        <ConfirmBoxWithID
            title="Delete Registry"
            contentText="Deleting a registry will permanently remove the registry from your project."
            open={deletePopupOpen}
            handleClose={()=> setDeletePopupOpen(false)}
            handleOk={deleteRegistry}
            confirmText={registryId}
            okText="Delete"
            cancelText="Cancel"
        />
          <ConfirmBox
            title="Delete certificate ?"
            contentText="Certificates you delete will no longer be used to authenticate devices in this registry. You won't be able to undo this action."
            cancelText="Cancel"
            okText="Delete"
            open={!!selectedCert}
            handleClose={()=> setSelectedCert(null)}
            handleOk={()=> deleteCACert(selectedCert)}
        />
    </Box>
  )
}

export default RegistryOverview;
