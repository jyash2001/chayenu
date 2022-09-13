import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Button, Theme } from '@mui/material';
import HeaderImg from '../../assets/images/thank-you-header.png'
import ThankYouImg from '../../assets/images/thank-you.png'

const useStyles = makeStyles((theme: Theme) => ({
    thankYouHeader:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        minHeight:"140px",
        width:"100%",
        padding:"30px",
        background: "transparent linear-gradient(180deg, #9B8ACB 0%, #8B7CB4 100%) 0% 0% no-repeat padding-box",
    },
    imgWrapper:{
        width:"200px",
        height:"80px"
    },
    thankYouContent:{
        display:"block",
        padding:"80px 30px"
    },
    thankYouContentWrapper:{
        maxWidth:"650px",
        margin:"0 auto"
    },
    thankYouHead:{
        textAlign: "center",
        fontSize:"32px",
        lineHeight:"38px",
        fontWeight:"bold",
        fontFamily: "'Josefin Sans', sans-serif",
        color: "#6838A0",
        marginBottom:"14px"
    },
    thankYouImgWrapper:{
        width:"305px",
        margin:"0 auto 13px"
    },
    thankyouDescription:{
        textAlign: "center",
        fontSize:"24px",
        lineHeight:"30px",
        letterSpacing: "0px",
        fontFamily: "'Josefin Sans', sans-serif",
        color: "#000000",
        marginBottom:"60px"
    },
    buttonWrapper:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    subscriptionButton:{
        background: "transparent linear-gradient(180deg, #9B8ACB 0%, #8B7CB4 100%) 0% 0% no-repeat padding-box",
        borderRadius: "10px",
        color:"#fff",
        textAlign: "center",
        fontSize:"24px",
        lineHeight:"30px",
        fontFamily: "'Josefin Sans', sans-serif",
        textDecoration:"none",
        padding:"10px 20px"
    }
}));

const ThankYou = () => {
const classes = useStyles();
  return (
      <>
        <div className={classes.thankYouHeader}>
            <div className={classes.imgWrapper}>
                <Image src={HeaderImg} alt='thank you' />
            </div>
        </div>
        <div className={classes.thankYouContent}>
            <div className={classes.thankYouContentWrapper}>
                <h4 className={classes.thankYouHead}>Thank you for subscribing to Chayenu-3</h4>
                <div className={classes.thankYouImgWrapper}>
                    <Image src={ThankYouImg} alt='thank you' />
                </div>
                <div className={classes.thankyouDescription}>
                    Details about your subscription have been emailed to you, along with your login info for the Chayenu App.
                </div>
                <div className={classes.buttonWrapper}>
                    <NextLink href="/" passHref>
                        <a className={classes.subscriptionButton}>Create new subscription</a>
                    </NextLink>
                </div>
            </div>
        </div>
      </>
  )
}

export default ThankYou
