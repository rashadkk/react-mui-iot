import { TextField, TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {

    const { name, label, value,error=null, size, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            size={size || 'small'}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
