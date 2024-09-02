import { createSlice } from "@reduxjs/toolkit";
import {
  getBankDetailsThunk,
  getBasicDetailsThunk,
  getDocumentDetailsThunk,
  getVerificationDetailsThunk,
  submitBankDetailsThunk,
  submitBasicDetailsThunk,
  submitDocumentsThunk,
  submitVerificationThunk
} from "../thunk/onboarding.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false
};

export const onboarding = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getBasicDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getBasicDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(getBasicDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitBasicDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(submitBasicDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(submitBasicDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(getBankDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getBankDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(getBankDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitBankDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(submitBankDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(submitBankDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(getVerificationDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getVerificationDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(getVerificationDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitVerificationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(submitVerificationThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(submitVerificationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(getDocumentDetailsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getDocumentDetailsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(getDocumentDetailsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitDocumentsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(submitDocumentsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(submitDocumentsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

// export const { } = onboarding.actions;

export default onboarding.reducer;
