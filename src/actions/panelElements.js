import axios from 'axios';

const API_BASE = 'http://localhost/wordpress/nucleus-themes/hyulin/wp-json/header-builder';

// fetch panel elements
export const FETCH_PANEL_ELEMENTS_PENDING = 'FETCH_PANEL_ELEMENTS_PENDING';
export const FETCH_PANEL_ELEMENTS_FULFILLED = 'FETCH_PANEL_ELEMENTS_FULFILLED';
export const FETCH_PANEL_ELEMENTS_REJECTED = 'FETCH_PANEL_ELEMENTS_REJECTED';

export function fetchPanelElements() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_PANEL_ELEMENTS',
      payload: axios.get(`${API_BASE}/panel-elements`).then(result => result.data),
    });
  };
}
