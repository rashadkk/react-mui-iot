
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, RadioGroupProps, FormHelperText } from '@mui/material';

type ItemType = {
    id: string | number,
    title: string
    disabled?: boolean
}
interface RadioProps extends RadioGroupProps{
    label?: string
    items: Array<ItemType>
    helperText?: string
    size?: string
}

export default function RadioGroup(props: RadioProps) {

    const { name, label, value, onChange, size = 'small', items, helperText, row = false } = props;

    return (
        <FormControl size={'small'}>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row={row}
                name={name}
                value={value}               
                onChange={onChange}>
                {
                    items.map(
                        (item) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio size='small' disabled={item?.disabled} />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}
