
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { ChangeEvent } from 'react';

interface CheckBoxProps {
    name?: string
    label: string
    value?: boolean
    onChange: (target: any) => void
    // color: string
    checked?: boolean
    size?: 'small' | 'medium' | undefined
}

export default function Checkbox(props: CheckBoxProps) {

    const { name, label, value, onChange, size, checked = false } = props;

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
                    size={size || 'small'}
                    onChange={convertToDefEventPara}
                />}
                label={label}
            />
        </FormControl>
    )
}
