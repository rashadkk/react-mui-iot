import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar'
import NewDeviceForm from "./new-device-form";

interface Props {
  editMode?: boolean
}

const NewDevice = (props: Props) => {

  const { editMode } = props;

  const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    
    console.log(routerParams)
    console.log('serach params', queryParams);
    

    const { registryId, deviceId } = routerParams;
    const region = queryParams.get('region');

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1">
            <Toolbar sx={{ borderBottom: '1px solid #cdcdcd' }}>
            <IconButton sx={{ marginRight: '1.5rem' }} color="inherit" onClick={() => navigate(-1)}>
              <ArrowBack color="primary" />
            </IconButton>
            <Typography variant="h5" fontWeight={500} component="h1">{ editMode ? 'Edit device' : 'Create a device'}</Typography>
          </Toolbar>
          <NewDeviceForm region={region} registry={registryId} deviceId={deviceId} editMode={editMode} />
        </Box>
    </Box>
  )
}

export default NewDevice;
