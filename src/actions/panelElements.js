import axios from 'axios';
import {
  FETCH_PANEL_ELEMENTS_PENDING,
  FETCH_PANEL_ELEMENTS_FULFILLED,
  FETCH_PANEL_ELEMENTS_REJECTED,
} from './ActionTypes';

const API_BASE = 'http://localhost/wordpress/nucleus-themes/hyulin/wp-json/header-builder';

export function fetchPanelElements() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PANEL_ELEMENTS',
      payload: axios.get(`${API_BASE}/panel-elements`).then(result => result.data),
    });
  };
}
