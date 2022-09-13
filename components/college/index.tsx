import { Autocomplete, Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { InputLabel } from "@mui/material";
import React from 'react';
import { GET_COLLEGES } from '../queries';
import { useQuery } from '@apollo/client';
export interface TouchedProps {
    fieldValue: any,
    setFieldValue?: any,
    handleCollegeChange: any
}

const College: React.FC<TouchedProps> = ({ fieldValue, handleCollegeChange }) => {
    const useStyles = makeStyles(() => ({
        title: {
            color: "#000000",
            font: "inherit",
            textAlign: "center",
            marginBottom: "18px",
            marginTop: "50px",
            fontWeight: "500",
            fontSize: "20px"
        },
        CustomTextField: {
            "& input::placeholder": {
                font: "normal normal normal 20px/30px Poppins",
            },
        },
        college: {
            "& .MuiFormControl-root": {
                "&:before": {
                    top: "40%",
                    right: "10px",
                    width: "10px",
                    height: "10px",
                    content: "''",
                    position: "absolute",
                    transform: "translateY(-50%) rotate(-45deg)",
                    borderLeft: "1px solid #a1a1a1",
                    borderBottom: "1px solid #a1a1a1",
                },
                "& .MuiInputBase-root": {
                    padding: "0px 25px 5px 15px !important",
                    "& .MuiAutocomplete-endAdornment": {
                        display: "none",
                    },
                },
            },
            "& .MuiAutocomplete-input": {
                padding: "10.5px 4px 7.5px 6px !important",
            },
        },
    }));
    const classes = useStyles();
    const { data: colleges } = useQuery(GET_COLLEGES);
    const allColleges = colleges?.colleges || []

    return (
        <Box >
            <Box
                sx={{
                    minWidth: 120,
                    width: "100%",
                    borderRadius: "4px",
                    padding: "8px 10px",
                    font: "normal normal normal 20px / 30px Poppins"
                }}
            >
                <Box
                    component={InputLabel}
                    htmlFor=""
                    className={classes.title}
                >College</Box>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, newVal) => handleCollegeChange(e, newVal)}
                    value={fieldValue}
                    options={allColleges}
                    getOptionLabel={(item: any) =>
                        item.college_name ? `${item.college_name} (Rabbi ${item.first_name} ${item.last_name})` : ''
                    }
                    className={classes.college}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            className={classes.CustomTextField}
                            placeholder="College"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "off"
                            }}
                        />
                    )}
                />
            </Box>
        </Box >
    )
}

export default College