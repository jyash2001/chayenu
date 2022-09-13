import type { NextPage } from "next";
import { makeStyles } from "@mui/styles";
import { Box, Button } from "@mui/material";
import SelectProduct from "../components/new-subscription/SelectProduct";
import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_SUBSCRIPTION_MUTATION,
  ALL_COUNTRIES_QUERY,
  ALL_PLANS_QUERY,
} from "../components/queries";
import Location from "../components/new-subscription/Location";
import Plan from "../components/new-subscription/Plan";
import Distributor from "../components/new-subscription/Distributor";
import Country from "../components/new-subscription/Country";
import ShippingInformation from "../components/new-subscription/ShippingInformation";
import PaymentDetail from "../components/new-subscription/PaymentDetail";
import Summary from "../components/new-subscription/Summary";
import * as yup from "yup";
import { useFormik } from "formik";
import { showSuccess, showError } from "../components/toast";
import dropin, { Dropin, PaymentMethodPayload } from "braintree-web-drop-in";
import {
  PlanTypes,
  FormFieldsTypes,
  CountryTypes,
  AddSubscriptionInputType,
} from "../components/interface";
import { useRouter } from "next/router";
import { isValidPhoneNumber } from "react-phone-number-input";
import DeliveryType from "../components/new-subscription/DeliveryType";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "540px",
    width: "100%",
    margin: "0 auto",
    padding: "30px 20px",
  },
  subscribeButtonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      width: "300px",
      "&:hover": {
        backgroundColor: "#00AEC4",
      },
    },
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  // TODO: states to be removed and set all in one data
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PlanTypes>();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryData, setCountryData] = useState<CountryTypes>();
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >();
  const [verifiedCouponData, setVerifiedCouponData] = useState();
  const { data: plansData } = useQuery(ALL_PLANS_QUERY, {
    variables: { where: {} },
  });

  const { data: countriesData } = useQuery(ALL_COUNTRIES_QUERY, {
    variables: { sort: "name:asc" },
  });

  const [addMutation] = useMutation(ADD_SUBSCRIPTION_MUTATION);
  const initialValues = {
    distributor: "",
    country: "",
    firstName: "",
    lastName: "",
    organization: "",
    state: "",
    address1: "",
    address2: "",
    city: "",
    postal_code: "",
    email: "",
    phone: "",
    coupon: "",
    quantity: selectedQuantity,
    autoRenew: true,
  };
  const validationSchema = yup.object().shape({
    country: yup.string().when({
      is: () => selectedLocation === "International",
      then: yup.string().required("Country is required."),
    }),
    distributor: yup.string().when({
      is: () => {
        selectedCountry &&
          countryData?.has_distributors &&
          selectedDelivery !== "Pick-up";
      },
      then: yup.string().required("Distributor is required."),
    }),
    firstName: yup
      .string()
      .trim()
      .required("First name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for first name."),
    lastName: yup
      .string()
      .trim()
      .required("Last name is required.")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for last name."),
    // organization: yup.string().trim().required("organization is required."),
    address1: yup.string().when({
      is: () =>
        (countryData?.has_shipping && selectedDelivery !== "Pick-up") ||
        selectedLocation === "USA",
      then: yup.string().trim().required("Street address is required."),
    }),
    address2: yup.string().trim(),
    city: yup.string().when({
      is: () =>
        (countryData?.has_shipping && selectedDelivery !== "Pick-up") ||
        selectedLocation === "USA",
      then: yup.string().trim().required("City is required."),
    }),
    state: yup.string().when({
      is: () =>
        (countryData?.has_shipping && selectedDelivery !== "Pick-up" && selectedCountry !== "Israel") ||
        selectedLocation === "USA",
      then: yup.string().required("State is required."),
    }),
    postal_code: yup.string().when({
      is: () =>
        (countryData?.has_shipping && selectedDelivery !== "Pick-up") ||
        selectedLocation === "USA",
      then: yup.string().required("Postal Code is required."),
    }),
    email: yup
      .string()
      .trim()
      .required("Email is required.")
      .email("Enter valid email."),
    phone: yup
      .string()
      .trim()
      .required("phone is required.")
      .test("phone is invalid", (value: string | undefined) => {
        if (value) {
          return isValidPhoneNumber(value);
        } else {
          return false;
        }
      }),
    coupon: yup.string().trim(),
    quantity: yup.number().required("Quantity is required."),
  });

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (braintreeInstance) {
        await braintreeInstance.requestPaymentMethod(
          async (error: object | null, payload: PaymentMethodPayload) => {
            setLoading(true);
            if (error) {
              setLoading(false);
              return null;
            }
            await addSubscription(values, payload);
            setLoading(false);
          }
        );
      }
    },
  });
  const changeFormateText = (item: string) => {
    const changeText = item
      ?.trim()
      ?.toLowerCase()
      ?.split(" ")
      ?.map((fieldName) => {
        return fieldName[0]?.toUpperCase() + fieldName.substring(1);
      })
      .join(" ");
    return changeText;
  };
  const addSubscription = async (
    shippingInfo: FormFieldsTypes,
    cardResponse: PaymentMethodPayload
  ) => {
    let idForUSA;
    const plan = selectedPlan as PlanTypes;

    const input: AddSubscriptionInputType = {
      plan: plan.id,
      autoRenew: shippingInfo.autoRenew,
      coupon: verifiedCouponData ? shippingInfo.coupon : "",
      quantity: selectedQuantity,
      paymentMethod: {
        cardNonce: cardResponse.nonce,
      },
      contact: {
        primary_email: changeFormateText(shippingInfo.email),
        first_name: changeFormateText(shippingInfo.firstName),
        last_name: changeFormateText(shippingInfo.lastName),
        phone_number: shippingInfo.phone.replace(/[^0-9]/g, ""),
        organization: changeFormateText(shippingInfo.organization),
      },
    };
    if (
      selectedLocation === "USA" ||
      (countryData?.has_shipping && selectedDelivery !== "Pick-up")
    ) {
      input["address"] = {
        first_name: changeFormateText(shippingInfo.firstName),
        last_name: changeFormateText(shippingInfo.lastName),
        address1: changeFormateText(shippingInfo.address1),
        address2: changeFormateText(shippingInfo.address2),
        city: changeFormateText(shippingInfo.city),
        state: shippingInfo.state,
        country:
          selectedLocation === "USA"
            ? selectedLocation
            : (countryData as CountryTypes).name,
        zip_code: shippingInfo.postal_code.toUpperCase(),
      };
    }
    if (selectedLocation === "USA") {
      const usaCountryData = countriesData?.countries?.find(
        (el: CountryTypes) => el.name === "USA"
      );
      idForUSA = usaCountryData.id;
      input["country"] = idForUSA;
    } else {
      input["country"] = (countryData as CountryTypes).id;
      if (
        (selectedDelivery && selectedDelivery == "Pick-up") ||
        (!selectedDelivery && countryData?.has_distributors)
      ) {
        input["distributor"] = shippingInfo?.distributor;
      }
    }

    await addMutation({
      variables: {
        input: input,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        showSuccess("Subscription created successfully.");
        router.push("/thank-you");
        handleLocationInputChange();
        handleDeliveryInputChange();
        setSelectedLocation("");
      },
      onError(err) {
        showError(err.message);
        setLoading(false);
      },
    });
  };
  const filterPlanDetailsByLocation = () => {
    let filteredData;
    const countryForFilter =
      selectedLocation === "USA" ? selectedLocation : selectedCountry;

    filteredData = plansData?.plans
      ?.filter((plan: PlanTypes) => countryForFilter === plan?.country?.name)
      .sort((a: PlanTypes, b: PlanTypes) =>
        b.recurring?.localeCompare(a.recurring)
      );

    return filteredData;
  };

  const selectedCountryPlanList = useMemo(
    () => filterPlanDetailsByLocation(),
    [plansData, selectedCountry, selectedLocation]
  );

  const handleLocationInputChange = () => {
    setSelectedPlan(undefined);
    setSelectedQuantity(1);
    setSelectedCountry("");
    setSelectedDistributor("");
    setVerifiedCouponData(undefined);
    setCountryData(undefined);
    setSelectedDelivery("");
    formik.resetForm({ values: initialValues });
  };

  const handleDeliveryInputChange = () => {
    setSelectedPlan(undefined);
    setSelectedQuantity(1);
    setSelectedDistributor("");
    setVerifiedCouponData(undefined);
    formik.resetForm({ values: initialValues });
  };

  const handleCountryInputChange = (e: React.SyntheticEvent<EventTarget>) => {
    setSelectedPlan(undefined);
    setSelectedDelivery("");
    setSelectedQuantity(1);
    setSelectedDistributor("");
    setVerifiedCouponData(undefined);
    formik.handleChange(e);
  };

  const handleDistributorInputChange = (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    setSelectedPlan(undefined);
    setVerifiedCouponData(undefined);
    setSelectedQuantity(1);
    formik.handleChange(e);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };
  const filterDeliveryData =
    countryData?.has_distributors && countryData?.has_shipping;

  return (
    <Box className={classes.container}>
      <form onSubmit={handleSubmit}>
        <SelectProduct />
        <Location
          handleLocationChange={handleLocationInputChange}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {selectedLocation && selectedLocation === "International" && (
          <Country
            label="Country"
            name="country"
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            handleInputChange={handleCountryInputChange}
            setCountryData={setCountryData}
            countriesData={countriesData?.countries?.filter(
              (el: CountryTypes) => el.name !== "USA"
            )}
          />
        )}
        {selectedLocation &&
          filterDeliveryData &&
          selectedLocation === "International" &&
          selectedCountry && (
            <DeliveryType
              handleDeliveryInputChange={handleDeliveryInputChange}
              selectedDelivery={selectedDelivery}
              setSelectedDelivery={setSelectedDelivery}
            />
          )}
        {selectedLocation &&
          selectedLocation === "International" &&
          selectedCountry &&
          (selectedDelivery === "Pick-up" ||
            (countryData?.has_shipping === false &&
              countryData?.has_distributors === true)) && (
            <Distributor
              label="Distributor"
              name="distributor"
              selectedDistributor={selectedDistributor}
              setSelectedDistributor={setSelectedDistributor}
              handleInputChange={handleDistributorInputChange}
              countryData={countryData}
            />
          )}
        {selectedLocation &&
          (selectedLocation === "USA" ||
            (selectedLocation === "International" &&
              selectedCountry &&
              ((selectedDelivery && selectedDelivery !== "Pick-up") ||
                selectedDistributor ||
                (countryData?.has_distributors === false &&
                  (countryData?.has_shipping === false ||
                    countryData?.has_shipping === true))))) && (
            <Plan
              handlePlanChange={() => {
                formik.resetForm({
                  values: {
                    ...initialValues,
                    country: selectedCountry,
                    distributor: selectedDistributor,
                  },
                });
              }}
              planList={selectedCountryPlanList}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )}
        {selectedPlan && (
          <>
            <ShippingInformation
              countryData={countryData}
              selectedLocation={selectedLocation}
              values={formik.values}
              touched={formik.touched}
              errors={formik.errors}
              selectedDelivery={selectedDelivery}
              handleInputChange={formik.handleChange}
              allCountriesData={countriesData?.countries}
              setFieldValue={formik.setFieldValue}
            />
            <PaymentDetail
              verifiedCouponData={verifiedCouponData}
              setVerifiedCouponData={setVerifiedCouponData}
              handleBlur={formik.handleBlur}
              selectedPlan={selectedPlan}
              values={formik.values}
              touched={formik.touched}
              errors={formik.errors}
              handleInputChange={formik.handleChange}
              initializeBraintree={initializeBraintree}
              setFieldError={formik.setFieldError}
            />
            <Summary
              selectedPlan={selectedPlan}
              selectedQuantity={selectedQuantity}
              setSelectedQuantity={setSelectedQuantity}
              automaticRenewal={formik.values.autoRenew}
              verifiedCouponData={verifiedCouponData}
            />
            <Box className={classes.subscribeButtonWrapper}>
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
          </>
        )}
      </form>
    </Box>
  );
};

export default Home;
