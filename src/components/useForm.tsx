import { useState } from 'react'
// import { makeStyles } from '@mui/material'
// import { makeStyles } from "@mui/styles";

export function useForm(initialFValues: any, validateOnChange = false, validate: any) {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e:any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuiFormControl-root': {
//             width: '80%',
//             margin: theme.spacing(1)
//         }
//     }
// }))


export function Form(props: any) {
    // const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

