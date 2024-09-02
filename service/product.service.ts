import { store } from "@/redux/store";
import {
  fetchProductBasicInformationThunk,
  submitProductBasicInformationThunk,
  fetchProductVariantsThunk,
  submitProductVaraintsThunk,
  fetchProductLocationThunk,
  submitProductLocationThunk,
  fetchProductShippingInformationThunk,
  submitProductShippingInformationThunk,
  fetchProductSeoInformationThunk,
  submitProductSeoInformationThunk,
} from "@/redux/thunk/product.thunk";

//Function to fetch product basic information
export const fetchProductBasicInformation = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(
      fetchProductBasicInformationThunk(uuid)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit product basic information
export const submitProductBasicInformation = async (
  basicInformationPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      submitProductBasicInformationThunk(basicInformationPayload)
    );
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch product variants information
export const fetchProductVariants = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(fetchProductVariantsThunk(uuid));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit product basic information
export const submitProductVariants = async (
  productUuid: string,
  variantsPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      submitProductVaraintsThunk({
        productUuid: productUuid,
        variantsPayload: variantsPayload,
      })
    );
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch product locations information
export const fetchProductLocations = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(fetchProductLocationThunk(uuid));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit product locations information
export const submitProductLocations = async (
  productUuid: string,
  locationsPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      submitProductLocationThunk({
        productUuid: productUuid,
        locationsPayload: locationsPayload,
      })
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch product shipping information
export const fetchProductShippingInformation = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(
      fetchProductShippingInformationThunk(uuid)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit product shipping information
export const submitProductShippingInformation = async (
  productUuid: string | null,
  shippingPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      submitProductShippingInformationThunk({
        productUuid: productUuid,
        shippingPayload: shippingPayload,
      })
    );
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch product seo information
export const fetchProductSeoInformation = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(
      fetchProductSeoInformationThunk(uuid)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to submit product seo information
export const submitProductSeoInformation = async (
  productUuid: string | null,
  seoPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      submitProductSeoInformationThunk({
        productUuid: productUuid,
        seoPayload: seoPayload,
      })
    );
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
