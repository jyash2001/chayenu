import React, { useEffect, useState } from "react";
import Image from 'next/image'
import CustomTextfield from "../common/CustomTextfield";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Theme, SelectChangeEvent, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FormFieldsTypes, PlanTypes, Coupons, StudentFormFieldTypes } from '../interface'
import { VALID_COUPON_QUERY } from "../queries";
import { useLazyQuery } from "@apollo/client";
import { showSuccess } from "../toast";
import correctIcon from "../../assets/images/correct.png"
import deleteIcon from "../../assets/images/delete.png"

const useStyles = makeStyles((theme: Theme) => ({
    shippingInfo: {
        width: "100%",
        marginBottom: "40px",
    },
    title: {
        font: "normal normal normal 22px/29px PT Sans",
        color: "#000000",
        textAlign: "center",
        marginBottom: "17px",
    },
    paymentMethodRowWrapper: {
        marginBottom: "20px",
        display: "none"
    },
    paymentMethodRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -20px",
    },
    paymentMethodCol: {
        padding: "0 20px",
        maxWidth: "50%",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            maxWidth: "100%",
        },
    },
    containerWrap: {
        backgroundColor: "#f6f6f6",
        boxShadow: "0px 6px 12px #00000029",
        padding: "20px",
        fontSize: "22px",
        lineHeight: "33px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "#000000",
        textAlign: "center",
    },
    paymentMethodColWrapper: {
        cursor: "pointer",
        backgroundColor: "#fff",
        padding: "8px 20px",
        font: "normal normal 600 20px/30px Poppins",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0px 6px 12px #00000029",
        border: "2px solid transparent",
    },
    active: {
        borderColor: "#00AEC4",
    },
    couponField: {
        position: "relative",
    },
    applyButton: {
        position: "absolute",
        right: 0,
        top: 29,
        padding: "10px",
        color: "#00AEC4",
        cursor: "pointer",
    },
    renewal: {
        marginBottom: "20px",
        "& .MuiFormControlLabel-root": {
            margin: 0,
        },
        "& .MuiCheckbox-root": {
            padding: 0,
            marginRight: "5px",
        },
        "& .MuiFormControlLabel-label": {
            font: "normal normal normal 18px/27px Poppins",
        },
    },
    appliedCoupon: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 15px",
        minHeight: "50px",
        border: "3px solid #00aec4",
        borderRadius: "8px",
    },
    appliedCouponText: {
        textTransform: "uppercase"
    },
    iconImage: {
        width: "30px",
        height: "30px",
        cursor: "pointer",
    },
    correctIconImage: {
        width: "30px",
        height: "30px",
    },
    paymentType: {
        "&.MuiButton-root": {
            borderRadius: "10px",
            font: "normal normal 500 18px/33px Poppins",
            letterSpacing: "0.56px",
            textTransform: "capitalize",
            boxShadow: "none",
            padding: "8px 15px",
            color: "black",
            width: "230px",
            "&:hover": {
                backgroundColor: "#fff",
            },
        },
        width: "220px",
        backgroundColor: "#fff",
        border: "1px solid #ced4da"
    }
}));

interface PaymentDetailProps {
    verifiedCouponData?: Coupons[];
    setVerifiedCouponData: (...args: any[]) => void;
    selectedPlan?: PlanTypes,
    values: StudentFormFieldTypes,
    touched: Record<string, boolean | undefined>,
    errors: Record<string, string | undefined | Record<string, string | undefined>>,
    handleBlur: (...args: any[]) => void
    handleInputChange: (...args: any[]) => void;
    initializeBraintree: (...args: any[]) => void;
    setFieldError: (...args: any[]) => void;
    productType?: any
    cardData?: any
    // automaticRenewal: boolean
}

//TODO: add auto renewal checkbox

const PaymentDetail: React.FC<PaymentDetailProps> = ({
    verifiedCouponData,
    setVerifiedCouponData,
    selectedPlan,
    values,
    touched,
    errors,
    handleBlur,
    handleInputChange,
    initializeBraintree,
    setFieldError,
    productType,
    cardData,
    // automaticRenewal
}) => {
    const [couponDelete, setCouponDelete] = useState(false)
    const [require_cc, setRequire_cc] = useState(true)
    const classes = useStyles();
    useEffect(() => {
        initializeBraintree();
    }, [require_cc]);

    const handleChange = (e: SelectChangeEvent) => {
        setVerifiedCouponData(undefined)
        handleInputChange(e);
    };

    const [validateCoupon] = useLazyQuery(VALID_COUPON_QUERY);

    const couponRequire_cc = (require_cc == undefined || require_cc == true)

    const handleValidCoupon = async () => {
        const response = await validateCoupon({
            variables: {
                sort: "id:desc",
                where: {
                    code: values?.coupon,
                    plans: {
                        id: selectedPlan?.id,
                    }
                }
            },
        })
        const couponData = response.data
        const todayDate = Date.now();
        const couponExpiryDate = new Date(couponData?.coupons[0]?.expiry_date).getTime()
        setRequire_cc(true);
        if (!couponData?.coupons?.length) {
            setFieldError("coupon", "Please enter valid coupon.")
        } else {
            if (couponData.coupons[0].is_used) {
                setFieldError("coupon", "Coupon is already used")
            }
            else if (couponExpiryDate < todayDate) {
                setFieldError("coupon", "Coupon is expired")
            } else {
                showSuccess("Coupon verified successfully.")
                setVerifiedCouponData(couponData.coupons)
                setCouponDelete(false)
                setRequire_cc(couponData?.coupons[0]?.require_cc);
            }
        }
    };
    const handleAppliedCouponField = () => {
        setRequire_cc(true)
        setCouponDelete(true)
        setVerifiedCouponData(undefined)
        values.coupon = ""
    }
    return (
        <Box className={classes.shippingInfo}>
            {couponRequire_cc ? <Box component="h2" className={classes.title}>
                {cardData?.plans[0]?.default_coupon?.require_cc !== false && `${cardData ? "Payment Info" : "Payment details"}`}
            </Box> : ""}
            <Box className={classes.paymentMethodRowWrapper}>
                <Box className={classes.paymentMethodRow}>
                    <Box className={classes.paymentMethodCol}>
                        <Box
                            className={`${classes.paymentMethodColWrapper} ${classes.active}`}
                        >
                            Credit Card
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={`${"payment-detail"}`}>
                {(couponRequire_cc && cardData?.plans[0]?.default_coupon?.require_cc !== false) ? <Box id="dropin-container" /> : ""}
                {(!productType || cardData?.plans[0]?.default_coupon?.require_cc !== false) &&
                    (verifiedCouponData && !couponDelete ?
                        <Box className={classes.appliedCoupon}>
                            <Box className={classes.appliedCouponText}>
                                {
                                    verifiedCouponData[0]?.amount_type === "Fixed" ?
                                        <><strong>${verifiedCouponData[0]?.amount} off</strong> coupon applied!</> :
                                        <><strong>{verifiedCouponData[0]?.amount}% off</strong> coupon applied!</>
                                }
                            </Box>
                            <Box className={`iconImage ${classes.iconImage}`}>
                                <Box className={`correctImg`}>
                                    <Image src={correctIcon} alt="right" />
                                </Box>
                                <Box className={`deleteImg`} onClick={handleAppliedCouponField}>
                                    <Image src={deleteIcon} alt="right" />
                                </Box>
                            </Box>
                        </Box> :
                        <Box className={classes.couponField}>
                            <CustomTextfield
                                label="Coupon"
                                name="coupon"
                                values={values?.coupon}
                                touched={touched.coupon}
                                error={errors.coupon}
                                handleInputChange={handleChange}
                                handleBlur={handleBlur}
                            />
                            <Box className={classes.applyButton} onClick={handleValidCoupon}>Apply</Box>
                        </Box>
                    )
                }
                {cardData?.plans?.length ? (cardData?.plans[0]?.default_coupon?.require_cc == false) &&
                    <Box className={classes.appliedCoupon}>
                        <Box className={classes.appliedCouponText}>
                            {
                                <><strong>{cardData?.plans[0]?.default_coupon?.amount}% off</strong> coupon applied!</>
                            }
                        </Box>
                        <Box className={`iconImage ${classes.correctIconImage}`}>
                            <Box>
                                <Image src={correctIcon} alt="right" />
                            </Box>
                        </Box>
                    </Box> : ""
                }
            </Box>
        </Box>
    );
};

export default PaymentDetail;