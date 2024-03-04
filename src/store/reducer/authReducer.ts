import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
} from "@/constant";

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  console.log("type", action?.type);

  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
