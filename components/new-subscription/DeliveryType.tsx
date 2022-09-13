import React from "react";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  locationBlock: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "22px",
    lineHeight: "29px",
    fontWeight: "normal",
    fontFamily: "'PT Sans', sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "19px",
  },
  locationRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "0 -20px",
  },
  locationCol: {
    padding: "0 20px",
    maxWidth: "50%",
    width: "100%",
    [theme.breakpoints.down(600)]: {
      maxWidth: "100%",
    },
    "&:not(:last-child)": {
      [theme.breakpoints.down(600)]: {
        marginBottom: "15px",
      },
    },
  },
  containerWrap: {
    backgroundColor: "#f6f6f6",
    boxShadow: "0px 6px 12px #00000029",
    padding: "20px",
    fontSize: "22px",
    lineHeight: "33px",
    fontWeight: "500",
    fontFamily: "'PT Sans', sans-serif",
    color: "#000000",
    textAlign: "center",
  },
  locationColWrapper: {
    display: "block",
    cursor: "pointer",
    backgroundColor: "#fff",
    padding: "8px 20px",
    fontSize: "20px",
    lineHeight: "30px",
    fontFamily: "Poppins",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 6px 12px #00000029",
    border: "2px solid transparent",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  active: {
    borderColor: "#00AEC4",
  },
}));
interface LocationProps {
  selectedDelivery: string;
  handleDeliveryInputChange: (...args: any[]) => void;
  setSelectedDelivery: (...args: any[]) => void;
}
const DeliveryType: React.FC<LocationProps> = ({
  selectedDelivery,
  handleDeliveryInputChange,
  setSelectedDelivery,
}) => {
  const classes = useStyles();
  const locationData = ["Delivery", "Pick-up"];
  return (
    <>
      <Box className={classes.locationBlock}>
        <Box className={classes.locationRow}>
          {locationData.map((item, i) => (
            <Box key={i} className={classes.locationCol}>
              <label
                className={`${classes.locationColWrapper} ${
                  selectedDelivery === item ? classes.active : ""
                }`}
                onClick={() => {
                  handleDeliveryInputChange();
                  setSelectedDelivery(item);
                }}
              >
                <input
                  type="radio"
                  id={item}
                  name="country"
                  value={item}
                  style={{ display: "none" }}
                />
                {item}
              </label>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default DeliveryType;
