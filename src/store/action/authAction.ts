import {
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
} from "@/constant";

export const signUpRequest = (userData: any) => ({
  type: SIGN_UP_REQUEST,
  payload: userData,
});

export const signUpSuccess = (response: any) => ({
  type: SIGN_UP_SUCCESS,
  payload: response,
});

export const signUpFailure = (error: any) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signInRequest = (userData: any) => ({
  type: SIGN_IN_REQUEST,
  payload: userData,
});

export const signInSuccess = (response: any) => {
  localStorage.setItem("token", response.token);
  console.log("action", response);
  return {
    type: SIGN_IN_SUCCESS,
    payload: response?.user,
  };
};

export const signInFailure = (error: any) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const logoutRequest = () => {
  localStorage.setItem("token", "");
  return {
    type: "LOGOUT_REQUEST",
  };
};

export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
