import axios from 'axios';
import {tokenConfig} from "./auth";

import {GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS} from "./types";
import {createMessage, returnErrors} from "./messages";

// Get leads
export const getLeads = () => (dispatch, getState) => {
  const config = tokenConfig(getState);

  axios.get('/api/leads/', config)
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

// Delete a lead
export const deleteLead = (id) => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.delete(`/api/leads/${id}/`, config)
    .then(res => {
      dispatch(createMessage({
        msg: 'Lead deleted !'
      }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

// Add a lead
export const addLead = (lead) => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.post('/api/leads/', lead, config)
    .then(res => {
      dispatch(createMessage({
        msg: 'Lead created !'
      }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};