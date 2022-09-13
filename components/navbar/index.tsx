import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

const useStyles = makeStyles(() => ({
    navbar: {
        width:"100%",
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00AEC4",
        color:"#fff",
        // zIndex:"999"
    },
}));

const NavBar = () => {
    const classes = useStyles();
    return (
      <Box className={classes.navbar}>My Subscriptions - New Subscription</Box>
    );
}

export default NavBar;