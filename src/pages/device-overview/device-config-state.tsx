import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import Checkbox from '../../components/controls/Checkbox';
import { useForm } from '../../components/useForm'

export const DeviceConfigState = () => {
    const { values, handleInputChange } = useForm({
        configHistory: true,
        stateHistory: true
    });

    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Checkbox
                    label='Configuration history'
                    name='configHistory'
                    checked={values?.configHistory}
                    onChange={handleInputChange}
                />
                <Checkbox
                    label='State history'
                    name='stateHistory'
                    checked={values?.stateHistory}
                    onChange={handleInputChange}
                />
                <Button variant="contained">Compare</Button>
            </Stack>
            <Typography marginY={2} variant="h6" component="h2">Cloud update: July 25, 2022</Typography>
        </Box>
    )
}
