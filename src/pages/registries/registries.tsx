import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';

import RoutePaths from '../../routes/route';
import registryService from '../../services/registry.service';

import { AddBox } from '@mui/icons-material';

// const registries = [
//     { id: 'test1', region: 'asia-east-1', protocols: ['MQTT', 'HTTP'], topics: ['project/my-iot/Temperature1'] },
//     { id: 'test-registry1', region: 'asia-east-1', protocols: ['MQTT', 'HTTP'], topics: ['project/my-iot/Temperature'] },
//     { id: 'test123', region: 'asia-east-1', protocols: ['MQTT', 'HTTP'], topics: ['project/my-iot/Temp'] },
// ]

const Registries = () => {

    const [registries, setRegistries] = useState([])

    const navigate = useNavigate();

    const getRegistries = async () => {
        try {
            const resp = await registryService.getRegistries();
            console.log('resp', resp.data);
            setRegistries(resp.data?.deviceRegistries)
        } catch (error) {
            console.log('eee=> ', error);
        }
    }

    useEffect(() => {
        getRegistries();
    }, [])
    
  return (
    <Box>
        <Toolbar sx={{ backgroundColor: '#fff', borderBottom: '1px solid #cdcdcd' }}>
            <Typography variant="h5" fontWeight={500} component="h1">Registries</Typography>
            <Button sx={{ marginLeft: '3rem' }} onClick={() => navigate(RoutePaths.new_registry)}>
                <AddBox sx={{ marginRight: '.35rem' }} />
                Create Registry
            </Button>
        </Toolbar>
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
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
                        <Link to={`${row?.id}/overview?region=${row?.region}`}>{row?.id}</Link>
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
    </Box>
  )
}

export default Registries;
