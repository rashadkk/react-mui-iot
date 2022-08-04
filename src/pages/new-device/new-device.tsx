import { Box } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar'
import NewDeviceForm from "./new-device-form";

const NewDevice = () => {

  const routerParams = useParams();
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    
    console.log(routerParams)
    console.log('serach params', queryParams);
    

    const { registryId } = routerParams;
    const region = queryParams.get('region');

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar registry={registryId} region={region} />
        <Box className="flex-grow-1 p-3">
          <NewDeviceForm region={region} registry={registryId} />
        </Box>
    </Box>
  )
}

export default NewDevice;
