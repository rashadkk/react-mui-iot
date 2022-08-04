import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import RoutePaths from '../../routes/route';
// import Button from "../../components/controls/Button"
import Sidebar from '../../components/sidebar/sidebar'
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import deviceService from '../../services/device.service';

const devices = [
    {id: 'test1', deviceId: 'Thermometer', communication: '', lastSeen: '', cloudLoging: 'Registry Default'}
]

const Devices = () => {

    const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    
    const { registryId } = routerParams;
    const region = queryParams.get('region');

    const [devices, setDevices] = useState([])

    const getDevices = async () => {
        try {
            if(registryId && region) {
                const resp = await deviceService.getDevices(registryId, region);
                console.log('resp', resp.data);
                setDevices(resp.data?.deviceRegistries)
            }
        } catch (error) {
            console.log('eee=> ', error);
        }
    }

    useEffect(() => {
        getDevices();
    }, [])

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            
            <Toolbar sx={{ backgroundColor: '#f7f5f5', borderBottom: '1px solid #cdcdcd', marginBottom: '1.5rem' }}>
                <Typography variant="h5" component="h1">Devices</Typography>
                <Button sx={{ marginLeft: '3rem' }} onClick={() => navigate('new')}>
                    <Add />
                     Create Device
                </Button>
            </Toolbar>

            <Box>
                <Box sx={{padding: '1rem'}}>
                    <Typography className="mb-4" variant="h5" component="h1">Registry ID: {registryId}</Typography>
                    <Typography variant="body2">{region}</Typography>
                </Box>
                <Divider />
            </Box>

            <TableContainer sx={{margin: '1rem'}} component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Device ID</TableCell>
                    <TableCell>Communication</TableCell>
                    <TableCell>Last seen</TableCell>
                    <TableCell>Cloud Logging</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {devices.map((row: any) => (
                    <TableRow
                    key={row?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Link to={`${row?.id}/devices/${row.deviceId}`}>{row?.deviceId}</Link>
                        </TableCell>
                        <TableCell>{'-'}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{row.cloudLoging}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    </Box>
  )
}

export default Devices