import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient, publicClient } from "@/http/http-client";

//Thunk to handle register
interface IRegisterPayload {
  fist_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
}

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterPayload) => {
    try {
      const res = await publicClient.post("/auth/seller/register", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to handle login
interface ILoginPayload {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload) => {
    try {
      const res = await publicClient.post("/auth/seller/login", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to handle send Otp
interface ISendOtpPayload {
  mobile_number: string;
}

export const sendOtpThunk = createAsyncThunk(
  "notification/send-otp",
  async (payload: ISendOtpPayload) => {
    try {
      const res = await publicClient.post("/notification/send-otp", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to handle verify Otp
interface IVerifyOtpPayload {
  mobile_number: string;
  otp: string;
}

export const verifyOtpThunk = createAsyncThunk(
  "notification/verify-otp",
  async (payload: IVerifyOtpPayload) => {
    try {
      const res = await publicClient.post("/notification/verify-otp", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to handle forgot password
interface IForgotPasswordPayload {
  email: string;
}

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async (payload: IForgotPasswordPayload) => {
    try {
      const res = await publicClient.post("/auth/forgot-password", payload);
      return res?.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
)

//Thunk to handle reset password
interface IResetPasswordPayload {
  email: string;
  mobile_number: string;
  password: string;
  confirmPassword: string;
}

export const resetPasswordThunk = createAsyncThunk(
  "auth/reset-password",
  async (payload: IResetPasswordPayload) => {
    try {
      const res = await publicClient.patch("/auth/reset-password", payload);
      return res?.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
)


//Thunk to fetch user data based upon reset token

export const fetchUserByResetTokenThunk = createAsyncThunk(
  "auth/fetch-user-by-reset-token",
  async (token: string) => { // Expecting the token as a string
    try {
      // Make a GET request with the token as a query parameter
      const res = await publicClient.get(`/user/password`, {
        params: { token: token }
      });
      return res?.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
