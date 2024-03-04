import { take, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

export function* log(action: PayloadAction) {
  console.log("Log:", action);
}

export default function* counterSaga() {
  yield takeEvery("*", log);
}
