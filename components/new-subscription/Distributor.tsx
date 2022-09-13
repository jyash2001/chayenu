import React from 'react'
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { ALL_COUNTRIES_QUERY } from "../queries";
import { DistributorsTypes,CountryTypes } from '../interface'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  title: {
    font: "normal normal normal 20px/26px PT Sans",
    color: "#000000",
    textAlign: "center",
    marginBottom: "17px",
  },
  distributorSelect: {
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

interface DistributorProps {
    selectedDistributor: string;
    setSelectedDistributor: (...args: any[]) => void;
    label: string;
    name: string;
    countryData:CountryTypes | undefined;
    handleInputChange: (...args: any[]) => void;
}

const Distributor: React.FC<DistributorProps> = ({
    selectedDistributor,
    setSelectedDistributor,
    label,
    name,
    handleInputChange,
    countryData
}) => {
    const classes = useStyles();
    const handleChange = (e: SelectChangeEvent) => {
        setSelectedDistributor(e.target.value);
        handleInputChange(e);
    };
  return (
    <Box className={classes.distributorSelect}>
      <Box component="h2" className={classes.title}>
        Select your distributor for pickup  
      </Box>
      <Box className={classes.select}>
        <FormControl fullWidth>
          <InputLabel id="distributor-select-label">Choose Distributor</InputLabel>
          <Select
            labelId="distributor-select-label"
            id="distributor-select"
            name={name}
            value={selectedDistributor}
            label={label}
            onChange={handleChange}
          >
            {countryData?.distributors?.map((item: DistributorsTypes, i: number) => (
              <MenuItem key={i} value={item.id}>
                {`${item.first_name} ${item.last_name} - ${item?.mailing_address?.address1}, ${item?.mailing_address?.address2 ? `${item?.mailing_address?.address2},` : ""} ${item?.mailing_address?.city}, ${item?.mailing_address?.state}, ${item?.mailing_address?.country}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Distributor
