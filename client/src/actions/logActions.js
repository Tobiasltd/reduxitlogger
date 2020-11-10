import axios from "axios";

import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./types";

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get("/api/logs", {});

    dispatch({
      type: GET_LOGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add new log
export const addLog = (log) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    setLoading();

    const res = await axios.post("/api/logs", log, config);
    dispatch({
      type: ADD_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete logs from server
export const deleteLog = (_id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/logs/${_id}`);

    dispatch({
      type: DELETE_LOG,
      payload: _id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update log on server
export const updateLog = (log) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    setLoading();
    const res = await axios.put(`/api/logs/${log.id}`, log, config);
    dispatch({
      type: UPDATE_LOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Search server logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/logs/search/${text}`);
    dispatch({
      type: SEARCH_LOGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//  Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
