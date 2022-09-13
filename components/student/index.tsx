import { Box, Button } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import ProductImage from '../product-image'
import College from '../college/index'
import { makeStyles } from "@mui/styles";
import ShippingInformation from '../new-subscription/ShippingInformation';
import dropin, { Dropin, PaymentMethodPayload } from "braintree-web-drop-in";
import { useFormik } from 'formik';
import * as yup from "yup";
import Image from 'next/image';
import PaymentDetail from '../new-subscription/PaymentDetail';
import Logo from '../../assets/images/logo.svg';
import ChabadLogo from '../../assets/images/chabad_on_campus.svg'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SUBSCRIPTION_MUTATION, GET_COLLEGES, GET_PRODUCTS } from '../queries';
import CustomLoader from '../common/CustomLoader';
import constants from '../../constants/index';
import { showError, showSuccess } from '../toast';
import { AddSubscriptionInputType } from '../interface';
import Summary from '../new-subscription/Summary';
import { useRouter } from 'next/router';

export interface TouchedProps {
  address1?: boolean | undefined;
  address2?: boolean | undefined;
  autoRenew?: boolean | undefined;
  city?: boolean | undefined;
  country?: boolean | undefined;
  coupon?: boolean | undefined;
  distributor?: boolean | undefined;
  email?: boolean | undefined;
  yourContactInfo: {
    firstName: boolean | undefined;
    lastName: boolean | undefined;
    email: boolean | undefined;
    phone?: boolean | undefined;
  };
  firstName?: boolean | undefined;
  lastName?: boolean | undefined;
  organization?: boolean | undefined;
  phone?: boolean | undefined;
  postal_code?: boolean | undefined;
  state?: boolean | undefined;
  college?: boolean | undefined;
}

function Student() {
  const useStyles = makeStyles(() => ({
    navbar: {
      width: "100%",
      backgroundColor: "#00AEC4",
      height: "50px",
      color: "#fff",
      display: "grid",
      gridTemplateColumns: "45% 55%",
      alignItems: "center"
    },
    chabadOnCampusLogo: {
      paddingTop: "40px", display: "flex", justifyContent: "center"
    },
    container: {
      maxWidth: "640px",
      width: "100%",
      margin: "0 auto",
      padding: "30px 20px",
    },
    submitButton: {
      "&.MuiButton-root": {
        borderRadius: "10px",
        font: "normal normal 500 22px/33px Poppins",
        letterSpacing: "0.56px",
        textTransform: "capitalize",
        boxShadow: "none",
        padding: "8px 15px",
        color: "#fff",
        width: "230px",
        "&:hover": {
          backgroundColor: "#00AEC4",
        },
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

  }));
  const classes = useStyles();
  const initialValues = {
    firstName: "",
    lastName: "",
    organization: "",
    state: "",
    address1: "",
    address2: "",
    city: "",
    postal_code: "",
    email: "",
    coupon: ""
  };
  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >();

  const [cardData, setCardData] = useState<any>("");
  const [productType, setCardType] = useState(constants.DIGITAL_PRINT);
  const [verifiedCouponData, setVerifiedCouponData] = useState();
  const [fieldValue, setFieldValue] = useState<Record<string, any>>({});
  const router = useRouter();

  const initializeBraintree = () => {
    dropin.create(
      {
        authorization: process.env.NEXT_PUBLIC_BRAINTREE_AUTH_TOKEN || "",
        container: "#dropin-container",
      },

      function (_createErr: object | null, instance: Dropin | undefined) {
        setBraintreeInstance(instance);
      }
    );
  };
  const require_cc = cardData?.plans?.length ? cardData?.plans[0]?.default_coupon?.require_cc : ""
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required("First name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for first name."),
    lastName: yup
      .string()
      .trim()
      .required("First name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for last name."),
    email: yup
      .string()
      .trim()
      .required("email is required.")
      .email("Enter valid email."),
    address1: yup.string().when({
      is: () =>
        (require_cc !== false),
      then: yup.string().trim().required("Street address is required."),
    }),
    address2: yup.string().trim(),
    city: yup.string().when({
      is: () =>
        (require_cc !== false),
      then: yup.string().trim().required("City is required."),
    }),
    postal_code: yup.string().when({
      is: () =>
        (require_cc !== false),
      then: yup.string().required("Postal Code is required."),
    }),
    state: yup.string().when({
      is: () =>
        (require_cc !== false),
      then: yup.string().required("State is required."),
    }),
    coupon: yup.string().trim(),
  });


  const { data: colleges } = useQuery(GET_COLLEGES);
  const AllColleges = colleges?.colleges || []

  const { data: product, loading: is_loading } = useQuery(GET_PRODUCTS);

  const [addMutation, { loading }] = useMutation(
    ADD_SUBSCRIPTION_MUTATION
  );

  const selectedCollege = AllColleges.find((i: any) => i.college_name === fieldValue?.college_name)
  const collegeId = selectedCollege?.id
  const countryId = selectedCollege?.country?.name
  const changeFormateText = (item: string) => {
    if (!item) {
      return "";
    } else {
      const changeText = item
        ?.trim()
        ?.toLowerCase()
        ?.split(" ")
        ?.map((fieldName) => {
          return fieldName[0]?.toUpperCase() + fieldName.substring(1);
        })
        .join(" ");
      return changeText;
    }
  };

  const addSubscriptionMutation = (input: any) => {
    addMutation({
      variables: {
        input: input,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        formik.resetForm()
        router.push("/thank-you");
        showSuccess("Subscription created successfully.");
      },
      onError(err) {
        showError(err.message);
      },
    });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const input: AddSubscriptionInputType = {
        college: collegeId,
        quantity: 1,
        plan: "2",
        country: countryId,
        autoRenew: true,
        contact: {
          first_name: changeFormateText(values.firstName),
          last_name: changeFormateText(values.lastName),
          primary_email: changeFormateText(values.email),
        },
      }
      if (verifiedCouponData) {
        input["coupon"] = values.coupon;
      }
      if (cardData?.plans[0]?.default_coupon?.require_cc !== false) {
        await braintreeInstance?.requestPaymentMethod(
          async (error: object | null, payload: PaymentMethodPayload) => {
            input["paymentMethod"] = {
              cardNonce: payload?.nonce,
            }
            input["address"] = {
              first_name: changeFormateText(values.firstName),
              last_name: changeFormateText(values.lastName),
              address1: changeFormateText(values.address1),
              address2: changeFormateText(values.address2),
              city: changeFormateText(values.city),
              state: values.state,
              country: "USA",
              zip_code: changeFormateText(values.postal_code),
            }
            addSubscriptionMutation(input)
          }
        )
      } else {
        addSubscriptionMutation(input)
      }
    },
  });
  useEffect(() => {
    const productAllData = product?.products.find((i: any) => i.id === "6")
    setCardData(productAllData)
  }, [product])

  const handleCollegeChange = (e: any, newValue: any) => {
    formik.resetForm()
    setVerifiedCouponData(undefined);
    setFieldValue(newValue)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleDigitalPrintClick = (item: any) => {
    setCardData(item)
    setCardType(item.name)
    formik.resetForm()
    setFieldValue({})
  }

  return (
    <Box>
      {is_loading ? <CustomLoader /> : <Box>
        <Box className={classes.navbar}>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ paddingTop: "5px" }}><Image src={Logo.src} alt='logo' width='150px' height='20px' /></Box>
          </Box>
          <Box>Chabad On Campus</Box>
        </Box>
        <Box className={classes.chabadOnCampusLogo}><Image src={ChabadLogo.src} alt='logo' width='600px' height='80px' /></Box>
        <Box className={classes.container}>
          <form onSubmit={handleSubmit}>
            {<ProductImage
              handleDigitalPrintClick={handleDigitalPrintClick}
              selectedCard={productType}
              product={product}
            />}
            <Box sx={{ maxWidth: '530px', margin: '0 auto' }}>
              <College fieldValue={fieldValue} handleCollegeChange={handleCollegeChange} />
            </Box>
            {fieldValue?.college_name &&
              <Box sx={{ maxWidth: '530px', margin: '0 auto' }}>
                <Box sx={{
                  color: "#000000",
                  font: "inherit",
                  textAlign: "center",
                  marginBottom: "18px",
                  marginTop: "50px",
                  fontWeight: "500",
                  fontSize: "20px"
                }}>
                  {
                    `${productType === constants.DIGITAL_PRINT ? constants.SHIPPING_INFO : constants.SUBSCRIBER_INFO}`
                  }
                </Box>
                <ShippingInformation
                  countryData={undefined}
                  values={formik.values}
                  touched={formik.touched as TouchedProps}
                  errors={formik.errors}
                  handleInputChange={formik.handleChange}
                  allCountriesData={undefined}
                  setFieldValue={formik.setFieldValue}
                  setCardType={setCardType}
                  productType={productType}
                  collegeData={AllColleges}
                  selectedCountry={fieldValue?.college_name}
                  cardData={cardData}
                />
                <PaymentDetail
                  verifiedCouponData={verifiedCouponData}
                  setVerifiedCouponData={setVerifiedCouponData}
                  values={formik.values}
                  handleBlur={formik.handleBlur}
                  touched={formik.touched as Record<string, boolean | undefined>}
                  errors={formik.errors}
                  handleInputChange={formik.handleChange}
                  initializeBraintree={initializeBraintree}
                  setFieldError={formik.setFieldError}
                  productType={productType}
                  cardData={cardData}
                />
                <Summary
                  selectedQuantity={1}
                  verifiedCouponData={verifiedCouponData}
                  cardData={cardData}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    id="submit-button"
                    type="submit"
                    disabled={loading}
                    variant="contained"
                    className={classes.submitButton}
                  >
                    {loading ? "Processing..." : "Subscribe"}
                  </Button>
                </Box>
              </Box>
            }
          </form>
        </Box>
      </Box>}
    </Box>
  )
}

export default Student