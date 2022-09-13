import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

const useStyles = makeStyles({
  inputWrapper: {
    "& .MuiFormControl-root": {
      width: "100%"
    },
    "& .MuiInputLabel-root": {
      color: "#000",
      marginBottom: "5px",
      transform: "unset",
      position: "unset",
      font: "normal normal normal 18px/23px PT Sans",
    }
  },
  error: {
    color: "#CA2A2A",
    display: "block",
    fontSize: "12px",
    marginTop: "2px"
  }
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    width: "100%",
    borderRadius: 4,
    border: '1px solid #ced4da',
    padding: '8px 10px',
    font: "normal normal normal 20px/30px Poppins",
    "&[aria-invalid='true']": {
      border: '1px solid #CA2A2A',
    }
  },
}));

interface CustomTextfieldProps {
  label?: string | number,
  defaultValue?: string | number,
  name: string,
  values?: string | number,
  handleInputChange?: (...args: any[]) => void,
  handleBlur?: (...args: any[]) => void,
  error?: string | Record<string, string | undefined> | undefined,
  touched?: boolean | undefined,
}

const CustomTextfield: React.FC<CustomTextfieldProps> = ({ label, defaultValue, values, name, handleInputChange, handleBlur, error, touched }) => {
  const classes = useStyles();
  return (
    <Box className={classes.inputWrapper}>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          {label}
        </InputLabel>
        <BootstrapInput defaultValue={defaultValue} id="bootstrap-input" name={name} value={values} onChange={handleInputChange} onBlur={handleBlur} error={touched && Boolean(error)} />
        {touched && Boolean(error) && <span className={classes.error}>{error}</span>}

      </FormControl>
    </Box>
  );
}
export default CustomTextfield
