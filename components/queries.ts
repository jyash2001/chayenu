import { gql } from "@apollo/client";

export const ADD_SUBSCRIPTION_MUTATION = gql`
  mutation addSubscription($input: AddSubscriptionInput) {
    addSubscription(input: $input) {
      id
      plan {
        name
      }
      next_bill_amount
      recurring
      next_bill_date
      end_date
      auto_renew
      braintree_card_token
      quantity
    }
  }
`;

export const ALL_PLANS_QUERY = gql`
  query getPlans($where: JSON) {
    plans(where: $where) {
      id
      created_at
      updated_at
      name
      price
      country {
        id
        name
        distributors {
          id
          primary_email
          first_name
          last_name
          is_customer
          is_donor
          is_subscriber
          contact_since
          phone_number
          notes
          feedback
          is_distributer
        }
      }
      recurring
    }
  }
`;

export const VALID_COUPON_QUERY = gql`
  query validateCoupon($where: JSON, $sort: String) {
    coupons(where: $where, sort: $sort) {
      id
      name
      code
      amount
      is_used
      amount_type
      expiry_date
      require_cc
      plans {
        id
        name
        recurring
      }
    }
  }
`;

export const ALL_COUNTRIES_QUERY = gql`
  query getCountries($where: JSON, $sort: String) {
    countries(where: $where, sort: $sort) {
      id
      name
      states(sort: "name:asc") {
        id
        name
      }
      has_distributors
      has_shipping
      distributors {
        id
        first_name
        last_name
        mailing_address {
          id
          address1
          address2
          city
          state
          country
          zip_code
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query products {
    products(limit: 100) {
      id
      description
      name
      image {
        width
        height
        name
        url
        previewUrl
      }
      plans {
        default_coupon {
          id
          require_cc
          frequency
          amount
          name
        }
      }
      orders {
        amount
      }
    }
  }
`;

export const GET_COLLEGES = gql`
  query colleges {
    colleges(limit: 1000000) {
      id
      college_name
      first_name
      last_name
      country {
        id
        name
        states {
          name
        }
      }
    }
  }
`;
