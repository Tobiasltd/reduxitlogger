import axios from "axios";

import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";

// Get techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get("/api/techs");

    dispatch({
      type: GET_TECHS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add technician to server
export const addTech = (tech) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    setLoading();

    const res = await axios.post("/api/techs", tech, config);

    dispatch({
      type: ADD_TECH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete tech
export const deleteTech = (_id) => async (dispatch) => {
  try {
    setLoading();
    await axios.delete(`/api/techs/${_id}`);
    dispatch({
      type: DELETE_TECH,
      payload: _id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//  Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
