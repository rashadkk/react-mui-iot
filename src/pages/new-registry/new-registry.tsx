import { Typography, Toolbar, IconButton } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';

// import Button from "../../components/controls/Button";
import NewRegistryForm from "./new-registry-form";
import Sidebar from "../../components/sidebar/sidebar";
import { Box } from "@mui/system";
import RenderElement from "../../components/RenderElement";

interface Props {
  editMode?: boolean
}

const NewRegistry = (props: Props) => {

  const { editMode } = props;
  const navigate = useNavigate();

  const routerParams = useParams();
  const [queryParams] = useSearchParams();

	const { registryId } = routerParams;
  const region = queryParams.get('region');

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <RenderElement show={(editMode && !!registryId && !!region)}>
          <Sidebar registry={registryId} region={region} />
        </RenderElement>
        <Box className="flex-grow-1">
          <Toolbar sx={{ borderBottom: '1px solid #cdcdcd' }}>
            <IconButton sx={{ marginRight: '1.5rem' }} color="inherit" onClick={() => navigate(-1)}>
              <ArrowBack color="primary" />
            </IconButton>
            <Typography variant="h5" fontWeight={500} component="h1">{ editMode? 'Edit Registry' : 'Create Registry'}</Typography>
          </Toolbar>
          <NewRegistryForm editMode={editMode} />
        </Box>
      </Box>
    </>
  )
}

export default NewRegistry;
