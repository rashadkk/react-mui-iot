import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';

import RoutePaths from '../../routes/route';
import registryService from '../../services/registry.service';

import { AddBox } from '@mui/icons-material';
import CheckBoxPopup from '../../components/CheckBoxPopup';


const Registries = () => {

    const [registries, setRegistries] = useState([]);
    const [zeroTouchPopup, setZeroTouchPopup] = useState(false);

    const navigate = useNavigate();

    const getRegistries = async () => {
        try {
            const resp = await registryService.getRegistries();
            console.log('resp', resp.data);
            setRegistries(resp.data?.details?.deviceRegistries)
        } catch (error) {
            console.log('eee=> ', error);
        }
    }

    useEffect(() => {
        getRegistries();
    }, [])
    
  return (
    <Box>
        <Toolbar sx={{  borderBottom: '1px solid #cdcdcd' }}>
            <Typography variant="h5" fontWeight={500} component="h1">Registries</Typography>
            <Button sx={{ marginLeft: '3rem' }} onClick={() => setZeroTouchPopup(true) }>
                <AddBox sx={{ marginRight: '.35rem' }} />
                Create Registry
            </Button>
        </Toolbar>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: '#fafafa' }}>
            <TableRow>
                <TableCell>Registry ID</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Protocols</TableCell>
                <TableCell>Telemetry Pub/Sub topic</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {registries.map((row: any) => (
                <TableRow
                    key={row?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        <Link underline="hover" color="inherit" component={RouterLink} to={`${row?.id}/overview?region=${row?.region}`}>
                            {row?.id}
                        </Link>
                        {/* <Link to={`${row?.id}/overview?region=${row?.region}`}>{row?.id}</Link> */}
                    </TableCell>
                    <TableCell>{row?.region}</TableCell>
                    <TableCell>
                        {row?.mqttConfig?.mqttEnabledState === 'MQTT_ENABLED' ? 'MQTT, ': ''}
                        {row?.httpConfig?.httpEnabledState === 'HTTP_ENABLED' ? 'HTTP': ''}
                    </TableCell>
                    <TableCell>{row?.stateNotificationConfig?.pubsubTopicName || '_'}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <CheckBoxPopup
            open={zeroTouchPopup}
            handleClose={()=>{ setZeroTouchPopup(false) }}
            handleOk={()=> { navigate(RoutePaths.new_registry) }}
            labelText="Enable Zero Touch Provisioning ?"
        />
    </Box>
  )
}

export default Registries;
