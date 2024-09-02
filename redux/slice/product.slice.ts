import { createSlice } from "@reduxjs/toolkit";
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
} from "../thunk/product.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false,
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProductBasicInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductBasicInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductBasicInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitProductBasicInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        submitProductBasicInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(submitProductBasicInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductVariantsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductVariantsThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductVariantsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitProductVaraintsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        submitProductVaraintsThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(submitProductVaraintsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductLocationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductLocationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductLocationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitProductLocationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        submitProductLocationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(submitProductLocationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductShippingInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductShippingInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductShippingInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitProductShippingInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        submitProductShippingInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(submitProductShippingInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductSeoInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductSeoInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductSeoInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(submitProductSeoInformationThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        submitProductSeoInformationThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(submitProductSeoInformationThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export default product.reducer;
