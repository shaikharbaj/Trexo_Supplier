import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import profileSlice from "./profile.slice";
import modalSlice from "./modal.slice";
import industrySlice from "./industry.slice";
import categorySlice from "./category.slice";
import attributeSlice from "./attribute.slice";
import onboardingSlice from "./onboarding.slice";
import brandSlice from "./brand.slice";
import uomSlice from "./uom.slice";
import productSlice from "./product.slice";
import orderSlice from "./order.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    modal: modalSlice,
    profile: profileSlice,
    industry: industrySlice,
    category: categorySlice,
    attribute: attributeSlice,
    onboarding: onboardingSlice,
    brand: brandSlice,
    uom: uomSlice,
    product: productSlice,
    order: orderSlice
});

export default rootReducer;
