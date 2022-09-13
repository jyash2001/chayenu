import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { PlanTypes } from '../interface'
import constants from '../../constants/index';

const useStyles = makeStyles(() => ({
    summary: {
        width: "100%",
        margin: "0 auto 60px"
    },
    title: {
        color: "#000000",
        font: "normal normal normal 22px/29px PT Sans",
        textAlign: "center",
        marginBottom: "18px",
    },
    summaryRow: {
        display: "flex"
    },
    summaryLeftCol: {
        width: "calc(100% - 150px)",
        paddingRight: "15px"
    },
    selectedPlanText: {
        marginBottom: "5px",
        font: " normal normal normal 18px/27px Poppins",
    },
    quantity: {
        display: "flex",
        alignItems: "center"
    },
    quantityText: {
        marginRight: "5px"
    },
    quantitySelect: {
        outline: "none"
    },
    quantityChangeText: {
        cursor: "pointer",
        marginLeft: "5px",
        color: "#00AEC4",
        textTransform: "capitalize",
        font: " normal normal 500 13px/1 Poppins",
    },
    summaryRightCol: {
        width: "150px"
    },
    totalPrice: {
        font: "normal normal 600 18px/27px Poppins",
        display: "block",
        textAlign: "right",
        marginBottom: "5px",
    },
    summaryRenewal: {
        display: "block",
        textAlign: "right",
        font: "normal normal normal 16px/25px Poppins",
    }
}));

interface SummaryProps {
    selectedPlan?: PlanTypes | undefined
    selectedQuantity: number
    automaticRenewal?: boolean
    setSelectedQuantity?: any
    verifiedCouponData: any
    cardData?: any
}

//TODO: make auto renewal label dynamic

const Summary: React.FC<SummaryProps> = ({
    selectedPlan,
    selectedQuantity,
    automaticRenewal,
    setSelectedQuantity,
    verifiedCouponData,
    cardData
}) => {
    const classes = useStyles();
    const [enabledChangeQuantity, setEnabledChangeQuantity] = useState<boolean>(false);
    const [discountedPrice, setDiscountedPrice] = useState<number | string>(0)

    const require_cc = cardData?.plans?.length ? cardData?.plans[0]?.default_coupon?.require_cc : ""

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        !cardData ? setSelectedQuantity(parseInt(e?.target?.value)) : ""
    }
    const calculateCouponDiscount = () => {
        let discount = 0;
        let planCost: any = !cardData ? (selectedPlan?.price || 0) * selectedQuantity : `${require_cc == false ? '0.00' : "49.0"}`
        if (!verifiedCouponData || !verifiedCouponData[0]) {
            setDiscountedPrice(planCost)
            return planCost
        }

        if (verifiedCouponData[0].amount_type == 'Percentage') {
            discount = planCost * (verifiedCouponData[0].amount / 100);
        } else {
            discount = verifiedCouponData[0].amount;
        }
        let discountedPlanCost = parseFloat((planCost - discount) as unknown as string).toFixed(2);
        setDiscountedPrice(discountedPlanCost)

        return discountedPlanCost;
    };

    useEffect(() => {
        calculateCouponDiscount()
    }, [verifiedCouponData, selectedPlan, selectedQuantity])

    return (
        <Box className={classes.summary}>
            <Box component="h2" className={classes.title}>
                Summary
            </Box>
            <Box>
                <Box className={classes.summaryRow}>
                    <Box className={classes.summaryLeftCol}>
                        <Box className={classes.selectedPlanText}>{!cardData ? selectedPlan?.name : ''}</Box>
                        {!cardData ? <Box className={classes.quantity}>
                            <Box className={classes.quantityText}>Quantity:</Box>
                            <select id='quantity' name='quantity' className={classes.quantitySelect} onChange={handleChangeQuantity} disabled={enabledChangeQuantity ? false : true}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                            <label htmlFor='quantity' className={classes.quantityChangeText} onClick={() => setEnabledChangeQuantity(prevState => !prevState)}>
                                {enabledChangeQuantity ? "update" : "change"}
                            </label>
                        </Box> :
                            require_cc == false ? constants.CHAYENU_DIGITAL : constants.STUDENT_PRINT_DIGITAL
                        }
                    </Box>
                    <Box className={classes.summaryRightCol}>
                        <span className={classes.totalPrice}>
                            {/* ${selectedPlan.price * selectedQuantity} */}
                            ${discountedPrice}
                        </span>
                        <span className={classes.summaryRenewal}>{automaticRenewal ? "Auto renewal on" : require_cc == false ? "" : "Auto renewal on"}</span>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Summary
