import { Button as MuiButton, ButtonTypeMap, makeStyles, ExtendButtonBaseTypeMap, Theme } from "@mui/material";
// import { makeStyles } from '@mui/styles' 
import { DefaultComponentProps } from "@mui/material/OverridableComponent";




interface ButtonProps extends DefaultComponentProps<ExtendButtonBaseTypeMap<ButtonTypeMap<{}, "button">>> {
    text: string,
    other?: any,
}

export default function Button(props: ButtonProps) {

    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            margin: theme.spacing(0.5)
        },
        // label: {
        //     textTransform: 'none'
        // }
    })) as any;

    const { text, size, color, variant, onClick, ...other } = props;
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root }}>
            {text}
        </MuiButton>
    )
}
