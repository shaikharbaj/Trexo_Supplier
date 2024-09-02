import { store } from "@/redux/store";
import { getBankDetailsThunk, getBasicDetailsThunk, getDocumentDetailsThunk, getVerificationDetailsThunk, submitBankDetailsThunk, submitBasicDetailsThunk, submitDocumentsThunk, submitVerificationThunk } from "@/redux/thunk/onboarding.thunk";

//Function to fetch onboarding basic details
export const getBasicDetails = async () => {
  try {
    const { payload } = await store.dispatch(getBasicDetailsThunk());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data:payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit onboarding basic details
export const submitBasicDetails = async (basicPayload: any) => {
  try {
    const { payload } = await store.dispatch(submitBasicDetailsThunk(basicPayload));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch onboarding bank details
export const getBankDetails = async () => {
  try {
    const { payload } = await store.dispatch(getBankDetailsThunk());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data:payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit onboarding bank details
export const submitBankDetails = async (bankPayload: any) => {
  try {
    const { payload } = await store.dispatch(submitBankDetailsThunk(bankPayload));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};


//Function to fetch onboarding verification details
export const getVerificationDetails = async () => {
  try {
    const { payload } = await store.dispatch(getVerificationDetailsThunk());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data:payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit onboarding verification
export const submitVerification = async (verificationPayload: any) => {
  try {
    const { payload } = await store.dispatch(submitVerificationThunk(verificationPayload));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};


//Function to fetch onboarding document details
export const getDocumentDetails = async () => {
  try {
    const { payload } = await store.dispatch(getDocumentDetailsThunk());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data:payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit onboarding documents
export const submitDocuments = async (documentsPayload: any) => {
  try {
    const { payload } = await store.dispatch(submitDocumentsThunk(documentsPayload));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};