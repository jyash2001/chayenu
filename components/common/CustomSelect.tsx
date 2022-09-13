import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles({
    select:{
        "& .MuiFormControl-root":{
            "& .MuiInputBase-root":{
                position:"relative",
                "& svg":{
                    display:"none"
                },
                "& .MuiSelect-select":{
                    minHeight:"45px",
                    boxSizing: "border-box",
                    padding:"8px 25px 5px 15px",
                    font: "normal normal normal 20px/30px Poppins",
                    position:"relative",
                    "&:before":{
                        content:"''",
                        width:"10px",
                        height:"10px",
                        borderLeft:"1px solid #a1a1a1",
                        borderBottom:"1px solid #a1a1a1",
                        position: "absolute",
                        right:" 10px",
                        top:" 40%",
                        transform: "translateY(-50%) rotate(-45deg)",
                    },
                },
                "& fieldset":{
                    top:0,
                    borderColor:"#e1e1e1 !important",
                    "& legend":{
                        display:"none"
                    }
                },
                "&.Mui-focused":{
                    "& fieldset":{
                        borderWidth: "1px",
                    },
                    
                }
            },
            "& .MuiInputLabel-root":{
                top:"-8px",
                font: "normal normal normal 20px/30px Poppins",
                "&.MuiInputLabel-shrink":{
                    display:"none"
                }
            }
        }
    },
    selectError:{
        display:"block",
        "& .MuiFormControl-root":{
            "& .MuiInputBase-root":{
                "& fieldset":{
                    borderColor:"#CA2A2A !important",
                },
            }
        }
    },
    error:{
        color:"#CA2A2A",
        display:"block",
        fontSize:"12px",
        marginTop:"2px"
    },
    outerLabel:{
        color:"#000",
        marginBottom:"5px",
        transform:"unset",
        position:"unset",
        font: "normal normal normal 18px/23px PT Sans",
    }
});

interface CustomSelectProps {
    val?:string,
    setVal?: (...args: Array<string>) => void,
    data?:string[] | undefined,
    name:string,
    label?:string,
    placeHolder?:string,
    values?:string | number,
    handleInputChange?:(...args: any[]) => void,
    handleblur?:(...args: any[]) => void,
    error?:string,
    touched?:string,
}

const CustomSelect: React.FC<CustomSelectProps> = ({val,setVal,data,name,error,touched,label,placeHolder,handleInputChange,handleblur}) => {
    const classes = useStyles();
    const [select, setSelect] = React.useState(val);
    const handleChange = (event: SelectChangeEvent) => {
        handleInputChange && handleInputChange(event)
        setSelect(event.target.value as string);
        setVal&&setVal(event.target.value as string) 
        
    };
    return (
        <Box className={`${classes.select} ${touched && Boolean(error) ? classes.selectError : ""}`}>
            <InputLabel shrink htmlFor="bootstrap-input" className={classes.outerLabel}>{label}</InputLabel>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{placeHolder}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                value={val}
                label={label}
                onChange={handleChange}
                onBlur={handleblur}
                >
                    {data?.map((item:string,i:number)=>
                        <MenuItem key={i} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {touched && Boolean(error) && <span className={classes.error}>{error}</span>}
        </Box>
    )
}

export default CustomSelect
