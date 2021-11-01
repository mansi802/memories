import axios from "axios";
const url = `https://memories802.herokuapp.com/posts`;

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(url);
    dispatch({ type: "GET_POSTS", payload: data }); //to reducers
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post(url, postData);
    dispatch({ type: "CREATE_POST", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  console.log(id);
  console.log(postData);
  try {
    const { data } = await axios.patch(`${url}/${id}`, postData);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const post = await axios.patch(`${url}/${id}/likePost`, id);
    dispatch({ type: "LIKE_POST", payload: post });
  } catch (err) {
    console.log(err.message);
  }
};

export const setId = (_id) => async (dispatch) => {
  dispatch({ type: "SET_ID", payload: _id });
};
