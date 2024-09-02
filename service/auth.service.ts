import { store } from "@/redux/store";
import { fetchUserByResetTokenThunk, forgotPasswordThunk, loginThunk, registerThunk, resetPasswordThunk, sendOtpThunk, verifyOtpThunk } from "@/redux/thunk/auth.thunk";
import { setAuth } from "@/redux/slice/auth.slice";
import { setCookie, removeCookie } from "@/utils/cookie";

//Function to register seller
export const registerSupplier = async (registerPayload: any) => {
  try {
    const { payload } = await store.dispatch(registerThunk(registerPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    const authObj = {
      isLoggedIn: true,
      token: payload?.data?.accessToken,
    };
    store.dispatch(setAuth(authObj));
    setCookie("token", authObj.token);
    setCookie("onboarding_completed", payload?.data?.user?.onboarding_completed);
    setCookie("step_completed", payload?.data?.user?.step_completed);
    setCookie("id", payload?.data?.user?.id);
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data?.user };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

// Function to send otp
export const sendOtp = async (otpPayload: any) => {
  try {
    const { payload } = await store.dispatch(sendOtpThunk(otpPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

// Function to verify otp
export const verifyOtp = async (otpPayload: any) => {
  try {
    const { payload } = await store.dispatch(verifyOtpThunk(otpPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to login seller user
export const loginSupplier = async (loginPayload: any) => {
  try {
    const { payload } = await store.dispatch(loginThunk(loginPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    const authObj = {
      isLoggedIn: true,
      token: payload?.data?.accessToken,
    };
    store.dispatch(setAuth(authObj));
    setCookie("token", authObj.token);
    setCookie("onboarding_completed", payload?.data?.user?.onboarding_completed);
    setCookie("step_completed", payload?.data?.user?.step_completed);
    setCookie("id", payload?.data?.user?.id);
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data?.user };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to logout seller user
export const logout = () => {
  try {
    removeCookie("token");
    return { status: true, statusCode: 200, message: 'Logout Successfully.' };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to forgot password
export const forgotPassword = async (forgotPasswordPayload: any) => {
  try {
    const { payload } = await store.dispatch(forgotPasswordThunk(forgotPasswordPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to reset password
export const resetPassword = async (resetPasswordPayload: any) => {
  try {
    const { payload } = await store.dispatch(resetPasswordThunk(resetPasswordPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to fetch user by reset token
export const fetchUserByResetToken = async (token: any) => {
  try {
    const { payload } = await store.dispatch(fetchUserByResetTokenThunk(token));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}