import { Typography, Toolbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';

// import Button from "../../components/controls/Button";
import NewRegistryForm from "./new-registry-form";

interface Props {
  editMode?: boolean
}

const NewRegistry = (props: Props) => {

  const { editMode } = props;
  const navigate = useNavigate();

  return (
    <>
      <Toolbar sx={{ borderBottom: '1px solid #cdcdcd' }}>
        <IconButton sx={{ marginRight: '1.5rem' }} color="inherit" onClick={() => navigate(-1)}>
          <ArrowBack color="primary" />
        </IconButton>
        <Typography variant="h5" fontWeight={500} component="h1">{ editMode? 'Edit Registry' : 'Create Registry'}</Typography>
      </Toolbar>
      <NewRegistryForm editMode={editMode} />
    </>
  )
}

export default NewRegistry;
