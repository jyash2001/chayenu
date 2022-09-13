
export interface MailingAddressTypes{
    __typename: "ComponentSubscriptionInfoShippingDetails"
    id:string
    address1:string
    address2:string | null
    city:string
    state:string
    country:string
    zip_code:string
}

export interface DistributorsTypes{
    __typename: 'Contacts'
    id: string
    first_name:string
    last_name:string
    mailing_address:MailingAddressTypes
}

export interface StatesTypes{
    __typename: 'Contacts'
    id: string
    name: string
}

export interface CountryTypes{
    __typename: 'Country'
    id:string
    name: string
    has_distributors: boolean
    has_shipping:boolean
    distributors: DistributorsTypes[]
    plans: PlanTypes[]
    states: StatesTypes[]
}

export interface ProductTypes{
    __typename: "Product"
    id:string
    name:string
    num:number
    product_type:string
    description: string
}

export interface PlanTypes{
    __typename: "Plan"
    id:string
    created_at:string
    updated_at:string
    recurring:string
    price:number
    name:string
    country:CountryTypes
    product:ProductTypes
}
export interface StudentFormFieldTypes{
    address1: string
    address2: string
    autoRenew?: boolean
    city: string
    country?: string
    coupon?: string
    distributor?: string
    email: string
    firstName: string
    yourContactInfo?: {firstName:string,lastName:string,email:string,phone:string,organization:string}
    lastName: string
    organization:string
    phone?: string
    postal_code: string
    state: string
}

export interface FormFieldsTypes{
    address1: string
    address2: string
    autoRenew: boolean
    city: string
    country: string
    coupon: string
    distributor: string
    email: string
    firstName: string
    lastName: string
    organization:string
    phone: string
    postal_code: string
    state: string
}

export interface AddSubscriptionInputType {
    plan: string
    autoRenew: boolean
    recurring?: string
    quantity: number
    coupon?:string
    country?: string
    college?:string
    paymentMethod?: {
        cardNonce: string
    }
    contact: {
        primary_email: string
        first_name: string
        last_name: string
        organization?:string
        phone_number?: string
    }
    address?: {
        first_name: string
        last_name: string
        address1: string
        address2: string | null
        city: string
        state: string
        country: string
        zip_code: string
    }
    distributor?: string
}
export enum CouponFrequency {
    RECURRING ="Recurring",
    ONCE = "Once"
}
export enum CouponAmountType {
    PERCENTAGE = "Percentage",
    FIXED = "Fixed"
}

export interface Coupons {
    id: string
    created_at: string
    updated_at: string
    name: string
    code: string
    description: string
    is_used: boolean
    frequency: CouponFrequency
    amount_type: CouponAmountType
    expiry_date: Date
    amount: String
    limit_per_user: string
    coupon_limit: string
    published_at: string
}
