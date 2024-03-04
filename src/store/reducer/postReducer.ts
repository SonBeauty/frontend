// postReducer.ts
const initialState = {
  postList: [],
  error: null,
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "POST_LIST_SUCCESS":
      return {
        ...state,
        postList: action.payload,
        error: null,
      };
    case "POST_LIST_FAILURE":
      return {
        ...state,
        postList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
