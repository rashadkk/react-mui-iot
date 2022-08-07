import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Link, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import RoutePaths from '../../routes/route';
// import Button from "../../components/controls/Button"
import Sidebar from '../../components/sidebar/sidebar'
import { AddBox } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import deviceService from '../../services/device.service';

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
                setDevices(resp.data?.details?.devices)
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
            <Toolbar sx={{ borderBottom: '1px solid #cdcdcd'}}>
                <Typography variant="h5" component="h1">Devices</Typography>
                <Button sx={{ marginLeft: '3rem' }} onClick={() => navigate(`new?region=${region}`)}>
                    <AddBox />
                     Create Device
                </Button>
            </Toolbar>

            <Box>
                <Box sx={{padding: '1.5rem'}}>
                    <Typography className="mb-3" variant="h6" fontWeight={500} component="h1">Registry ID: {registryId}</Typography>
                    <Typography variant="body2">{region}</Typography>
                </Box>
                <Divider sx={{ opacity: 1 }} />
            </Box>

            <TableContainer >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
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
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Link underline="hover" color="inherit" component={RouterLink} to={`${row?.id}/overview?region=${region}`}>
                                {row?.id}
                            </Link>
                        </TableCell>
                        <TableCell>{row?.blocked ? 'Blocked': 'Allowed'}</TableCell>
                        <TableCell>{'_'}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }} >{row?.loglevel?.toLowerCase()}</TableCell>
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