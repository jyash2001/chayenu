import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PlanTypes } from '../interface'

const useStyles = makeStyles(() => ({
  plan:{
    marginBottom:"40px",
  },
  title: {
    font: "normal normal normal 20px/26px PT Sans",
    color: "#000000",
    textAlign: "center",
    marginBottom: "15px",
  },
  planRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "0 -15px",
  },
  planCol: {
    padding: "0 15px",
    maxWidth: "50%",
    marginTop:'20px',
    width: "100%",
  },
  planColWrapper: {
    display: "block",
    height: "100%",
    cursor: "pointer",
    backgroundColor: "#fff",
    padding: "16px 20px",
    fontSize: "18px",
    lineHeight: "27px",
    fontFamily: "Poppins",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 6px 12px #00000029",
    border: "2px solid transparent",
    transition:"all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ededed",
    }
  },
  planType: {
    font: "normal normal normal 18px/23px PT Sans",
    marginBottom: "17px",
  },
  planPrice: {
    font: "normal normal bold 18px/23px PT Sans",
    marginBottom: "16px",
  },
  monthlyPrice: {
    fontSize: "14px",
    lineHeight: "19px",
  },
  active: {
    borderColor: "#00AEC4",
  },
}));
interface LocationProps {
  selectedPlan: PlanTypes | undefined;
  planList: PlanTypes[];
  setSelectedPlan: (...args: any[]) => void;
  handlePlanChange?: (...args: any[]) => void;
}
const Plan: React.FC<LocationProps> = ({
  selectedPlan,
  setSelectedPlan,
  handlePlanChange,
  planList = [],
}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.plan}>
        <Box component="h2" className={classes.title}>
          Select Plan
        </Box>
        <Box className={classes.planRow}>
          {planList.map((item, i:number) => (
            <Box key={i} className={classes.planCol}>
              <label
                className={`${classes.planColWrapper} ${
                  selectedPlan?.id === item.id ? classes.active : ""
                }`}
                onClick={() => setSelectedPlan(item)}
              >
                <input
                  type="radio"
                  id={item.recurring}
                  name="plan"
                  // value={item}
                  onChange={handlePlanChange}
                  style={{ display: "none" }}
                />
                <p className={classes.planType}>{item.recurring}</p>
                <p className={classes.planPrice}>
                  ${item.price}
                  {item.recurring === "Yearly" ? "/yr" : "/mo"}
                </p>
                {item.recurring === "Yearly" && (
                  <p className={classes.monthlyPrice}>
                    (${(item.price / 12).toFixed(2)}/mo)
                  </p>
                )}
              </label>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Plan;
