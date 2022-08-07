import { Delete, Edit, Send, Settings, Square } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, Stack, Tab, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Tabs,
    Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ConfirmBox from '../../components/confirm/confirm';
import Sidebar from '../../components/sidebar/sidebar'
import TabPanel from '../../components/TabPanel';
import deviceService from '../../services/device.service';
import AddPublicKeyModal from './add-public-key-modal';
import { DeviceConfigState } from './device-config-state';
import DeviceLastActivity from './device-last-activity';

const DeviceOverview = () => {

    const [deviceDetails, setDeviceDetails] = useState<any>({});
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [addPublicKeyPopupOpen, setAddPublicKeyPopupOpen] = useState(false);

    const [tabValue, setTabValue] = useState(0);

    const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    

    const { registryId, deviceId } = routerParams;
    const region = queryParams.get('region');

    const getDevice = async () => {
        try {
            if(deviceId && registryId && region) {
                const resp = await deviceService.getDevice(deviceId, registryId, region);
                setDeviceDetails(resp.data?.details)
                console.log('device details==>', resp.data?.details);
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteDevice = async() => {
        try {
            if(deviceId && registryId && region) {
                await deviceService.deleteDevice(deviceId, registryId, region);
                navigate(`/registries/${registryId}/devices?region=${region}`);
            }
        } catch (error) {
            console.log('error', error);
            
        }
    }

    const deletePublicKey = async (certObject: any) => {
        try {
            if(deviceId && region && registryId) {
                const data = {
                    credentials: certObject
                }
                await deviceService.deletePublicKey(deviceId, registryId, region, data);
                getDevice();
            }
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        getDevice();
    }, [registryId])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

  return (
    <Box sx={{ padding: 0, display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            <Toolbar sx={{ borderBottom: '1px solid #cdcdcd' }}>
                <Typography variant="h5" fontWeight={500} component="h1">Device details</Typography>
                <Stack direction="row" spacing={2} paddingX={2}>
                    <Button onClick={() => { navigate(`/registries/${registryId}/devices/${deviceId}/edit?region=${region}`) }}>
                        <Edit sx={{ marginRight: '.35rem' }} />
                        Edit Device
                    </Button>
                    <Button  onClick={() => { }}>
                        <Settings sx={{ marginRight: '.35rem' }} />
                        Update Config
                    </Button>
                    <Button  onClick={() => { }}>
                        <Send sx={{ marginRight: '.35rem' }} />
                        Send Command
                    </Button>
                    <Button  onClick={() => { }}>
                        <Square sx={{ marginRight: '.35rem' }} />
                        Block Communication
                    </Button>
                    <Button onClick={() => { setDeletePopupOpen(true) }}>
                        <Delete sx={{ marginRight: '.35rem' }} />
                        Delete
                    </Button>
                </Stack>
            </Toolbar>
        
            <Box sx={{ padding: '1.5rem'}} >
                <Typography className="mb-3" variant="h6" fontWeight={500} component="h2">Device ID: {deviceId}</Typography>
                <Grid container columnSpacing={8}>
                    <Grid item>
                        <Typography fontWeight="500" variant="subtitle1">Numeric ID</Typography>
                        <Typography color="GrayText" variant="body1">{deviceDetails?.numId}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight="500" variant="subtitle1">Registry</Typography>
                        <Typography color="GrayText" variant="body1">{region}</Typography>
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
            </Box>

            <Divider sx={{ opacity: 1 }} />


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab sx={{ paddingX: '1.5rem' }} label="DETAILS"  />
                    <Tab sx={{ paddingX: '1.5rem' }} label="CONFIGURATION & STATE"  />
                    <Tab sx={{ paddingX: '1.5rem' }} label="AUTHENTICATION"  />
                </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ padding: '1.5rem' }}>
                        <DeviceLastActivity />
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ padding: '1.5rem' }}>
                        <DeviceConfigState />
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ padding: '1.5rem' }}>
                        {/* <Typography className="mb-3" variant="h6" component="h2">Authentication</Typography> */}
                        <Button variant="contained" onClick={()=>{setAddPublicKeyPopupOpen(true)}}>ADD PUBLIC KEY</Button>
                    </Box>
                    <TableContainer >
                        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: '#fafafa' }}>
                            <TableRow>
                                <TableCell width="20%">Key format</TableCell>
                                <TableCell width="20%">Key value</TableCell>
                                <TableCell>Expiry time</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                ( !deviceDetails?.credentials || deviceDetails?.credentials?.length === 0) &&
                                <TableRow>
                                        <TableCell colSpan={4}>
                                            No authentication keys have been added for this device.
                                        </TableCell>
                                </TableRow>
                                }
                            {deviceDetails?.credentials?.map((row: any, index: number) => (
                                <TableRow
                                    key={`public-key-${index}`}
                                >
                                    <TableCell>{row?.publicKey?.format}</TableCell>
                                    <TableCell width="30%" className="text-truncate">
                                        {row?.publicKey?.key?.replace('-----BEGIN CERTIFICATE-----', '')}
                                    </TableCell>
                                    <TableCell>{row?.expirationTime}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => deletePublicKey(row)}>
                                            <Delete color="disabled" fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
        </Box>
        <ConfirmBox
            title="Delete Device ?"
            open={deletePopupOpen}
            handleClose={()=> setDeletePopupOpen(false)}
            handleOk={deleteDevice}
        />
        <AddPublicKeyModal
            open={addPublicKeyPopupOpen}
            handleClose={()=>{setAddPublicKeyPopupOpen(false)}}
            onAddComplete={()=>{
                getDevice();
                setAddPublicKeyPopupOpen(false);
            }}
            deviceId={deviceId || ''}
            registryId={registryId || ''}
            region={region || ''}
        />
</Box>
  )
}

export default DeviceOverview