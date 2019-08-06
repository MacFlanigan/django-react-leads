import axios from 'axios';

import {GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS} from "./types";
import {createMessage, returnErrors} from "./messages";

// Get leads
export const getLeads = () => dispatch => {
  axios.get('/api/leads/')
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

// Delete a lead
export const deleteLead = (id) => dispatch => {
  axios.delete(`/api/leads/${id}/`)
    .then(res => {
      dispatch(createMessage({
        msg: 'Lead deleted !'
      }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err))
};

// Add a lead
export const addLead = (lead) => dispatch => {
  axios.post('/api/leads/', lead)
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