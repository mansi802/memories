import { combineReducers } from "redux";

const posts = (posts = [], action) => {
  switch (action.type) {
    case "GET_POSTS":
      return action.payload;

    case "CREATE_POST":
      return [...posts, action.payload];

    case "UPDATE_POST":
    case "LIKE_POST":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case "DELETE_POST":
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

const id = (_id = null, action) => {
  switch (action.type) {
    case "SET_ID":
      return action.payload;
    default:
      return _id;
  }
};

export default combineReducers({
  posts,
  id,
});
