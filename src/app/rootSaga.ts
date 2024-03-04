import counterSaga from "@/store/saga/counterSaga";
import { watchFetchPostList } from "@/store/saga/postSaga";
import { watchSignIn, watchSignUp, watchLogout } from "@/store/saga/authSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    counterSaga(),
    watchFetchPostList(),
    watchSignUp(),
    watchSignIn(),
    watchLogout(),
  ]);
}
