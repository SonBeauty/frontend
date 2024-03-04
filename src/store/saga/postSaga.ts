import { call, put, takeEvery } from "redux-saga/effects";
import { postListSuccess, postListFailure } from "../action/postAction"; // Adjust the path and action creators
import axios from "axios";

function* fetchPostList(): Generator<any, void, any> {
  try {
    console.log("BB", process.env.BE);
    const response = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_BE}/post`
    );
    console.log("alo", response.data);
    yield put(postListSuccess(response.data));
  } catch (error: any) {
    yield put(postListFailure(error?.message));
  }
}

export function* watchFetchPostList() {
  yield takeEvery("POST_LIST_REQUEST", fetchPostList);
}
