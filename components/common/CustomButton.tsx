import React from 'react'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    customButton: {
        backgroundColor: "#00AEC4",
        borderRadius: "10px",
        font: "normal normal 500 22px/33px Poppins",
        letterSpacing: "0.56px",
        textTransform: "capitalize",
        boxShadow: "none",
        padding:"7px 15px",
        color:"#fff",
        "&:hover": {
            backgroundColor: "#00AEC4",
        }
    },
});

interface CustomButtonProps {
    variant?:"text" | "outlined" | "contained" | undefined,
    buttonText?:string,
    buttonMinWidth?:number,
    type?: 'submit' | 'reset' | 'button' | undefined,
    id?:string
    disabled?:boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
        variant,
        buttonText,
        buttonMinWidth,
        type,
        id,
        disabled = false
    }) => {
    const classes = useStyles();
    return (
        <Button id={id} type={type} variant={variant} className={classes.customButton} style={{minWidth:buttonMinWidth}} disabled={disabled}>
            {buttonText}
        </Button>
    )
}

export default CustomButton