import React from 'react'
import Image from 'next/image';
import ProductImage from "../../assets/images/product_image.png"
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    productCard: {
        padding: "18px 25px 35px",
        backgroundColor: "#F2FBFC",
        boxShadow: "0px 6px 12px #00000029",
        borderRadius: "10px",
        height: "100%",
    },
    productCardWrapper:{
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        margin:"0 -20px",
    },
    productContent: {
        padding:"0 20px",
        width:"50%",
        [theme.breakpoints.down('md')]: {
            maxWidth:"250px",
            width:"100%",
            marginTop:"20px"
        },
    },
    productName: {
        textAlign: "center",
        color: "#000000",
        marginBottom: "20px",
        fontSize: "22px",
        lineHeight: "19px",
        fontWeight: "600",
        fontFamily: "'PT Sans', sans-serif",
    },
    productImg: {
        width:"50%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        padding:"0 20px",
        [theme.breakpoints.down('md')]: {
            width:"100%",
        },
    },
    productPrice: {
        color: "#000000",
        marginBottom: "15px",
        fontSize: "18px",
        lineHeight: "23px",
        fontWeight: 600,
        fontFamily: "'PT Sans', sans-serif",
    },
    productDescriptionList: {
        marginBottom:"15px",
        fontSize: "18px",
        fontFamily: "'PT Sans', sans-serif",
        fontWeight: 600,
        lineHeight: "23px",
        color: "#9995d0"
    },
    currantyAvailable:{
        listStylePosition: "inside",
        fontSize: "18px",
        lineHeight: "22px",
        fontFamily: "'PT Sans', sans-serif",
        color: "#000000",
    }
}));

const ProductCard = () => {
    const classes = useStyles();
    return (
        <Box className={classes.productCard}>
                <Box component="h2" className={classes.productName}>Chayenu-3 Print + Digital</Box>
            <Box className={classes.productCardWrapper}>
                <Box className={classes.productImg}>
                    <Image src={ProductImage.src} alt='product' width='209px' height='190px' />
                </Box>
                <Box className={classes.productContent}>
                    <Box component="h6" className={classes.productPrice}>
                        Starting at $15/mo
                    </Box>
                    <Box className={classes.productDescriptionList}>
                        <Box>
                            USA Introductory Price
                        </Box>
                    </Box>
                    <Box className={classes.currantyAvailable}>Currently available for <b>USA</b> individual subscriptions and <b>international</b> group subscriptions</Box>
                </Box>
            </Box>
        </Box>
    )
}
export default ProductCard
