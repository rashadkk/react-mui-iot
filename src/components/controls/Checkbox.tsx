
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { ChangeEvent } from 'react';

interface CheckBoxProps {
    name: string
    label: string
    value?: boolean
    onChange: (target: any) => void
    // color: string
    checked?: boolean
}

export default function Checkbox(props: CheckBoxProps) {

    const { name, label, value, onChange, checked = false } = props;

    const convertToDefEventPara = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        console.log(name, value, checked)
        const event = {
            target: {
                name, value: checked
            }
        }
        onChange(event);
    }

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={checked}
                    value={value}
                    onChange={convertToDefEventPara}
                />}
                label={label}
            />
        </FormControl>
    )
}
