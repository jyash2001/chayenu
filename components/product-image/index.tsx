import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Theme } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_COLLEGES, GET_PRODUCTS } from '../queries';
import constants from '../../constants/index';

const useStyles = makeStyles((theme: Theme) => ({
    DigitalPrintProductCard: {
        padding: "18px 25px 35px",
        backgroundColor: "#F2FBFC",
        boxShadow: "0px 6px 12px #00000029",
        borderRadius: "10px",
        minHeight: "370px",
        marginLeft: '40px',
        cursor: "pointer",
        '&:first-child': {
            marginLeft: '0'
        },
        [theme.breakpoints.down(425)]: {
            marginTop: '40px',
            marginLeft: "0px"
        },
    },
    mainCard: {
        display: "flex",
        [theme.breakpoints.down(425)]: {
            display: "block",
        },
    },
    digitalProductCard: {
        padding: "18px 25px 35px",
        backgroundColor: "#F2FBFC",
        boxShadow: "0px 6px 12px #00000029",
        borderRadius: "10px",
        height: "auto",
        marginLeft: '40px',
        cursor: "pointer",
        '&:first-child': {
            marginLeft: '0'
        },
        [theme.breakpoints.down(425)]: {
            marginTop: '40px',
            marginLeft: "0px"
        },
    },
    productName: {
        textAlign: "center",
        color: "#000000",
        marginBottom: "20px",
        fontSize: "22px",
        lineHeight: "19px",
        fontWeight: "500",
        fontFamily: "revert",
    },
    productImg: {
        width: "100%",
        position: "relative",
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "auto",
        padding: "0 20px",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
    },
    digitalPrint: {
        textAlign: "center",
        fontWeight: "600",
        textDecoration: "line-through",
        fontSize: "12px"
    },
    digital: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: "14px"
    },
    subContent: {
        textAlign: "center",
        fontSize: "13px",
    }
}));

interface ProductImageInterface {
    handleDigitalPrintClick: any;
    selectedCard: string
    product: any
}

const ProductImage = ({ handleDigitalPrintClick, selectedCard, product }: ProductImageInterface) => {
    const classes = useStyles();

    return (
        <Box >
            <Box className={classes.mainCard}>
                {product?.products.map((item: any, index: number) => {
                    return (
                        <Box key={index} onClick={() => handleDigitalPrintClick(item)}
                            style={(selectedCard === item.name) ? { border: "2px solid #00AEC4" } : { border: "none" }}
                            className={classes.DigitalPrintProductCard}>
                            <Box className={classes.productName}>{item.name}</Box>
                            <Box className={classes.productImg}>
                                <img style={{ width: "280px", height: "auto", minHeight: "188px" }} src={`https://sub.chayenu.dev${item.image.url}`} />
                                <Box sx={{ marginTop: "25px" }}>
                                    <Box className={classes.digitalPrint}>{`${item.name === constants.DIGITAL_PRINT ? "$180.00/yr" : "$59.00/yr"}`}</Box>
                                    <Box className={classes.digital}>{`${item.name === constants.DIGITAL_PRINT ? "$49.00/year for Current Students Only" : "FREE for Current Students Only"}`}</Box>
                                    <Box sx={{ fontSize: "12px", marginTop: "15px" }}>
                                        <div className={classes.subContent} >
                                            {item.name === constants.DIGITAL_PRINT ? "USA only" : "USA & International"}
                                        </div>
                                        {/* <li>
                                            Lorem ipsum dolor sit
                                        </li>
                                        <li>
                                            amet, consetetur
                                        </li> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                })
                }
            </Box>
        </Box>
    )
}
export default ProductImage
