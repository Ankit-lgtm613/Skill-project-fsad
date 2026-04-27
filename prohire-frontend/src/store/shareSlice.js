import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to handle the share operation via a web service
export const shareViaWebService = createAsyncThunk(
  "share/shareViaWebService",
  async (shareData, { rejectWithValue }) => {
    try {
      // Replace this URL with your actual web service endpoint
      const response = await fetch("http://localhost:8080/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shareData),
      });

      if (!response.ok) {
        throw new Error("Failed to share");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shareSlice = createSlice({
  name: "share",
  initialState: {
    loading: false,
    success: false,
    error: null,
    responseData: null,
  },
  reducers: {
    resetShareState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.responseData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shareViaWebService.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(shareViaWebService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.responseData = action.payload;
      })
      .addCase(shareViaWebService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetShareState } = shareSlice.actions;

export default shareSlice.reducer;
