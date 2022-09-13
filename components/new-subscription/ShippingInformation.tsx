import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import CustomTextfield from "../common/CustomTextfield";
import { CountryTypes, FormFieldsTypes, StudentFormFieldTypes } from "../interface";
import PhoneInput, { Country as CountryCodes } from "react-phone-number-input";
import constants from "../../constants/index";
const useStyles = makeStyles(() => ({
  shopInfoRow: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 -15px",
    width: "initial",
    "& > .MuiGrid-root": {
      padding: "0 15px",
      marginBottom: "20px",
      "& .MuiBox-root": {
        display: "block",
        "& .MuiAutocomplete-popper": {
          maxHeight: "calc(100vh - 756px)",
          overflow: "auto",
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px",
          minWidth: "250px",
          "& .MuiPaper-root": {
            "& .MuiAutocomplete-listbox": {
              maxHeight: "none",
            },
          },
        },
      },
    },
  },
  shippingInfo: {
    width: "100%",
    marginBottom: "20px",
  },
  title: {
    font: "normal normal normal 22px/29px PT Sans",
    color: "#000000",
    textAlign: "center",
    marginBottom: "17px",
  },
  select: {
    "& .MuiFormControl-root": {
      "& .MuiInputBase-root": {
        position: "relative",
        "& svg": {
          display: "none",
        },
        "& .MuiSelect-select": {
          minHeight: "45px",
          boxSizing: "border-box",
          padding: "8px 25px 5px 15px",
          font: "normal normal normal 20px/30px Poppins",
          position: "relative",
          "&:before": {
            content: "''",
            width: "10px",
            height: "10px",
            borderLeft: "1px solid #a1a1a1",
            borderBottom: "1px solid #a1a1a1",
            position: "absolute",
            right: " 10px",
            top: " 40%",
            transform: "translateY(-50%) rotate(-45deg)",
          },
        },
        "& fieldset": {
          top: 0,
          borderColor: "#e1e1e1 !important",
          "& legend": {
            display: "none",
          },
        },
        "&.Mui-focused": {
          "& fieldset": {
            borderWidth: "1px",
          },
        },
      },
      "& .MuiInputLabel-root": {
        top: "-8px",
        font: "normal normal normal 20px/30px Poppins",
        "&.MuiInputLabel-shrink": {
          display: "none",
        },
      },
    },
  },
  selectError: {
    display: "block",
    "& .MuiFormControl-root": {
      "& .MuiInputBase-root": {
        "& fieldset": {
          borderColor: "#CA2A2A !important",
        },
      },
    },
  },
  outerLabel: {
    color: "#000 !important",
    marginBottom: "5px",
    transform: "unset",
    position: "unset",
    font: "normal normal normal 18px/23px PT Sans !important",
  },
  state: {
    "& .MuiFormControl-root": {
      "&:before": {
        top: "40%",
        right: "10px",
        width: "10px",
        height: "10px",
        content: "''",
        position: "absolute",
        transform: "translateY(-50%) rotate(-45deg)",
        borderLeft: "1px solid #a1a1a1",
        borderBottom: "1px solid #a1a1a1",
      },
      "& .MuiInputBase-root": {
        padding: "0px 25px 5px 15px !important",
        "& .MuiAutocomplete-endAdornment": {
          display: "none",
        },
      },
    },
    "& .MuiAutocomplete-input": {
      padding: "10.5px 4px 7.5px 6px !important",
    },
  },
  error: {
    color: "#CA2A2A",
    display: "block",
    fontSize: "12px",
    marginTop: "2px",
  },
  phoneField: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    outline: "none",
    padding: 0,
    font: "normal normal normal 20px/30px Poppins",
    "& input": {
      width: " 100%",
      borderRadius: "4px",
      border: "1px solid #ced4da",
      padding: "8px 10px",
      font: "normal normal normal 20px/30px Poppins",
      marginLeft: " 16px",
    },
    "& > div": {
      display: "block",
      position: "relative",
      height: "100%",
      "& > select": {
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "56px",
        zIndex: "1",
        border: "0",
        opacity: "0",
        cursor: "pointer",
      },
      "& > div:nth-child(2)": {
        width: "40px",
        height: "40px",
        "& > img": {
          height: "100%",
        },
      },
      "& > div:last-child": {
        display: "block",
        content: "''",
        borderStyle: "solid",
        borderTopWidth: "0",
        borderLeftWidth: "0",
        transform: "rotate(45deg)",
        width: "0.5rem",
        height: "0.5rem",
        marginLeft: "0.35rem",
        borderColor: "inherit",
        borderBottomWidth: "1px",
        borderRightWidth: "1px",
        opacity: "0.45",
        position: "absolute",
        top: "15px",
        right: "-12px",
      },
    },
  },
  CustomTextField: {
    "& input::placeholder": {
      font: "normal normal normal 20px/30px Poppins",
    },
  },
  numberInputWrapper: {
    "& .MuiInputLabel-root": {
      color: "#000",
      marginBottom: "5px",
      transform: "unset",
      position: "unset",
      font: "normal normal normal 18px/23px PT Sans",
    },
  },
  textFieldError: {
    "& input": {
      border: "1px solid #CA2A2A",
    },
  },
  phoneError: {
    paddingLeft: "67px",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export interface collegeDataProps {
  college_name: string;
  __typename: string;
  id: string;
  country: {
    id: string
    states: string[];
    __typename: string
  }
}
export interface TouchedProps {
  address1?: boolean | undefined;
  address2?: boolean | undefined;
  autoRenew?: boolean | undefined;
  city?: boolean | undefined;
  country?: boolean | undefined;
  coupon?: boolean | undefined;
  distributor?: boolean | undefined;
  email?: boolean | undefined;
  yourContactInfo?: {
    firstName?: boolean | undefined;
    lastName?: boolean | undefined;
    email?: boolean | undefined;
    phone?: boolean | undefined;
  };
  firstName?: boolean | undefined;
  lastName?: boolean | undefined;
  organization?: boolean | undefined;
  phone?: boolean | undefined;
  postal_code?: boolean | undefined;
  state?: boolean | undefined;
  stateName?: boolean | undefined;
}
interface ShippingInformationProps {
  countryData?: CountryTypes | undefined;
  setCardType?: Dispatch<SetStateAction<string>>
  productType?: string
  collegeData?: collegeDataProps[] | readonly any[]
  selectedCountry?: string
  allCountriesData: CountryTypes[] | undefined;
  selectedLocation?: string;
  values: StudentFormFieldTypes;
  touched: TouchedProps;
  errors: Record<
    string,
    string | Record<string, string | undefined> | undefined
  >;
  // handleblur?: (...args: any[]) => void,
  handleInputChange: (...args: any[]) => void;
  selectedDelivery?: string;
  selectedSubscription?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  cardData?: any
}

const ShippingInformation: React.FC<ShippingInformationProps> = ({
  countryData,
  allCountriesData,
  selectedLocation,
  values,
  touched,
  errors,
  handleInputChange,
  setFieldValue,
  selectedDelivery,
  selectedSubscription,
  productType,
  collegeData,
  selectedCountry,
  cardData
}) => {
  const classes = useStyles();
  const [defaultCountry, setDefaultCountry] = useState<CountryCodes>();
  const selectedCountryName = () => {
    const countryName =
      selectedLocation !== constants.INTERNATIONAL
        ? selectedLocation
        : countryData?.name;

    switch (countryName) {
      case constants.COUNTRY_USA:
        return setDefaultCountry("US");
      case constants.AUSTRALIA:
        return setDefaultCountry("AU");
      case constants.CANADA:
        return setDefaultCountry("CA");
      case constants.ISRAEL:
        return setDefaultCountry("IL");
      case constants.SOUTH_AFRICA:
        return setDefaultCountry("ZA");
      case constants.UNITED_KINGDOM:
        return setDefaultCountry("GB");
      default:
        setDefaultCountry(undefined);
    }
  };
  const statesData = useMemo(() => {
    selectedCountryName();
    if (selectedLocation === constants.COUNTRY_USA) {
      const usaStates = allCountriesData?.find(
        (elem) => elem.name === constants.COUNTRY_USA
      );
      return usaStates?.states || [];
    } else {
      return countryData?.states || [];
    }
  }, [countryData, selectedLocation, allCountriesData]);
  const require_cc = cardData?.plans[0]?.default_coupon?.require_cc
  const studentCollegeData: boolean = (!cardData ? false : (cardData && require_cc == true) || (require_cc !== null)) ? true : false
  const countryAllStateName = collegeData?.find((item: collegeDataProps) => {
    return (item.college_name === selectedCountry)
  })
  const addSubscription =
    selectedLocation === constants.COUNTRY_USA ||
      ((countryData?.has_shipping == true ||
        countryData?.has_distributors == false) &&
        selectedDelivery !== constants.PICK_UP)
      ? constants.SHIPPING_INFO
      : constants.CONTACT_INFO;
  const giftingNewSubscription =
    selectedSubscription === constants.SOMEONE_ELSE &&
      (selectedLocation === constants.COUNTRY_USA ||
        selectedDelivery == constants.DELIVERY ||
        countryData?.has_distributors == false)
      ? constants.RECIPIENTS_SHIPPING_INFO
      : selectedSubscription === constants.SOMEONE_ELSE &&
      countryData?.has_distributors == true &&
      constants.RECIPIENT_CONTACT_INFO;
  const onlyNewSubscription =
    selectedLocation === constants.COUNTRY_USA ||
    ((countryData?.has_shipping == true ||
      countryData?.has_distributors == false) &&
      selectedDelivery !== constants.PICK_UP);
  const email = (productType == "" || productType == "Digital+ Print" || productType == "Digital") ? "Email Address" : "Email"

  return (
    <Box className={classes.shippingInfo}>
      <Box component="h2" className={classes.title}>
        {selectedSubscription === constants.MYSELF
          ? addSubscription
          : giftingNewSubscription}
      </Box>
      <Box className={classes.shopInfoRow}>
        <Grid item md={6} xs={12}>
          <CustomTextfield
            label="First Name"
            name="firstName"
            values={values.firstName}
            touched={touched.firstName}
            error={errors.firstName}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CustomTextfield
            label="Last Name"
            name="lastName"
            values={values.lastName}
            touched={touched.lastName}
            error={errors.lastName}
            handleInputChange={handleInputChange}
          />
        </Grid>
        {(!productType) &&
          <Grid item xs={12}>
            <CustomTextfield
              label="Organization"
              name="organization"
              values={values.organization}
              touched={touched.organization}
              error={errors.organization}
              handleInputChange={handleInputChange}
            />
          </Grid>}
        {(onlyNewSubscription || (cardData && require_cc !== false)) && (
          <Grid item xs={12}>
            <CustomTextfield
              label="Street Address"
              name="address1"
              values={values.address1}
              touched={touched.address1}
              error={errors.address1}
              handleInputChange={handleInputChange}
            />
          </Grid>
        )}
        {(onlyNewSubscription || (cardData && require_cc !== false)) && (
          <Grid item xs={12}>
            <CustomTextfield
              label="Apt, Floor, Unit, etc. (optional)"
              name="address2"
              values={values.address2}
              touched={touched.address2}
              error={errors.address2}
              handleInputChange={handleInputChange}
            />
          </Grid>
        )}
        {(onlyNewSubscription || (cardData && require_cc !== false)) && (
          <Grid item md={countryData?.name == "Israel" ? 6 : 4} xs={12}>
            <CustomTextfield
              label="City"
              name="city"
              values={values.city}
              touched={touched.city}
              error={errors.city}
              handleInputChange={handleInputChange}
            />
          </Grid>
        )}
        {((onlyNewSubscription && countryData?.name !== constants.ISRAEL) || (cardData && require_cc !== false)) && (
          <Grid item md={4} xs={12}>
            <Box
              className={`${classes.select} ${touched.state && Boolean(errors.state)
                ? classes.selectError
                : ""
                }`}
            >
              <Box
                component={InputLabel}
                htmlFor="state"
                className={classes.outerLabel}
              >
                State
              </Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(_event, newValue) => {
                  setFieldValue("state", newValue || "");
                }}
                value={values.state || null}
                options={
                  studentCollegeData ? countryAllStateName?.country?.states?.map((item: any) =>
                    item.name
                  ) : statesData ? statesData?.map((item) =>
                    item.name
                      .split(" ")
                      .map((word) => {
                        return word[0].toUpperCase() + word.substring(1);
                      })
                      .join(" ")
                  ) : ""}
                className={classes.state}
                sx={{ width: 150 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.CustomTextField}
                    placeholder="State"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "do-not-autofill"
                    }}
                  />
                )}
              />
              {touched.state && Boolean(errors.state) && (
                <span className={classes.error}>{errors.state}</span>
              )}
            </Box>
          </Grid>
        )}
        {(onlyNewSubscription || (cardData && require_cc !== false)) && (
          <Grid item md={countryData?.name == "Israel" ? 6 : 4} xs={12}>
            <CustomTextfield
              label="Postal Code"
              name="postal_code"
              values={values.postal_code}
              touched={touched.postal_code}
              error={errors.postal_code}
              handleInputChange={handleInputChange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <CustomTextfield
            label={email}
            name="email"
            values={values.email}
            touched={touched.email}
            error={errors.email}
            handleInputChange={handleInputChange}
          />
        </Grid>
        {(!productType) &&
          <Grid item xs={12}>
            <Box className={classes.numberInputWrapper}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Phone Number
              </InputLabel>
              <PhoneInput
                type="text"
                name="phone"
                mask="#"
                defaultCountry={defaultCountry}
                useNationalFormatForDefaultCountryValue={true}
                countrySelectProps={{ unicodeFlags: false }}
                withCountryCallingCode={false}
                className={`${classes.phoneField} ${touched.phone && Boolean(errors.phone)
                  ? classes.textFieldError
                  : ""
                  }`}
                onChange={(e) => {
                  setFieldValue("phone", e, true);
                }}
              />
              {touched.phone && Boolean(errors.phone) && (
                <span className={`${classes.error} ${classes.phoneError}`}>
                  {errors.phone}
                </span>
              )}
            </Box>
          </Grid>}
      </Box>
    </Box>
  );
};

export default ShippingInformation;