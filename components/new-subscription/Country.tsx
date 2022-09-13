import React, { useCallback } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { ALL_COUNTRIES_QUERY } from "../queries";
import { CountryTypes } from '../interface'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  countrySelect: {
    width: "100%",
    margin: "0 auto 40px",
  },
  select: {
    "& .MuiFormControl-root": {
      "& .MuiInputBase-root": {
        position: "relative",
        "& svg": {
          display: "none",
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
        "& fieldset": {
          top: 0,
          borderColor: "#e1e1e1 !important",
          "& legend": {
            display: "none",
          },
        },
        "&.Mui-focused": {
          "& fieldset": {
            borderWidth: "1px",
          },
        },
      },
      "& .MuiInputLabel-root": {
        top: "-8px",
        font: "normal normal normal 20px/30px Poppins",
        "&.MuiInputLabel-shrink": {
          display: "none",
        },
      },
    },
  },
}));

interface CountryProps {
  selectedCountry: string;
  setSelectedCountry: (...args: any[]) => void;
  label: string;
  name: string;
  handleInputChange: (...args: any[]) => void;
  setCountryData: (...args: any[]) => void;
  countriesData: CountryTypes[]
}

const Country: React.FC<CountryProps> = ({
  label,
  name,
  selectedCountry,
  setSelectedCountry,
  handleInputChange,
  setCountryData,
  countriesData
}) => {
  const classes = useStyles();
  const handleChange = useCallback((e: SelectChangeEvent) => {
    setSelectedCountry(e.target.value);
    handleInputChange(e);
    setCountryData(countriesData?.find((el: CountryTypes) => el.name === e.target.value))
  }, [countriesData,handleInputChange,setSelectedCountry,setCountryData]);
  //TODO: add error

  return (
    <Box className={classes.countrySelect}>
      <Box className={classes.select}>
        <FormControl fullWidth>
          <InputLabel id="country-select-label">Choose Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            name={name}
            value={selectedCountry}
            label={label}
            onChange={handleChange}
          >
            {countriesData?.map((item:CountryTypes, i: number) => (
              <MenuItem key={i} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Country;
