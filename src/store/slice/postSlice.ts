// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// export interface IAuthState {
//   authState: boolean;
// }

// const initialState: IAuthState = {
//   authState: false,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuthState: (state, action: PayloadAction<boolean>) => {
//       state.authState = action.payload;
//     },
//   },
// });

// export const { setAuthState } = authSlice.actions;
// export const authReducer = authSlice.reducer;

import { POST_LIST, SET_POST_LIST } from "@/constant";

export const postData = (data = [], action: any) => {
  switch (action.type) {
    case SET_POST_LIST:
      console.log("postlist", action);
      return [...action.data];

    default:
      return data;
  }
};
