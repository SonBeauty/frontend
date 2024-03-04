import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import { SIGN_UP_REQUEST, SIGN_IN_REQUEST, LOGOUT } from "@/constant";
import {
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  logoutSuccess,
} from "../action/authAction";

function* signUp(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_BE}/users`,
      action.payload
    );
    yield put(signUpSuccess(response.data));
  } catch (error: any) {
    yield put(signUpFailure(error.message));
  }
}

function* signIn(action: any): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_BE}/users/login`,
      action.payload
    );
    yield put(signInSuccess(response.data));
  } catch (error: any) {
    yield put(signInFailure(error.message));
  }
}

function* logoutRequest() {
  try {
    console.log(123);
    yield put(logoutSuccess());
  } catch (error) {}
}

export function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export function* watchSignIn() {
  yield takeEvery(SIGN_IN_REQUEST, signIn);
}

export function* watchLogout() {
  yield takeEvery("LOGOUT_REQUEST", logoutRequest);
}
