
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, SelectProps } from '@mui/material';

type OptionType = {
    id: string | number,
    title: string
}

interface Props extends SelectProps {
    options: Array<OptionType>
}



export default function Select(props: Props) {

    const { name, label, value,error=null, onChange, options, size, placeholder, required } = props;

    return (
        <FormControl variant="outlined" fullWidth
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                size={size}
                placeholder={placeholder}
                required={required}
                onChange={onChange}>
                
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
