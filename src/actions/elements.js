import axios from 'axios';

const API_BASE = 'http://localhost/wordpress/nucleus-themes/hyulin/wp-json/header-builder';

// fetch elements
export const FETCH_ELEMENTS_PENDING = 'FETCH_ELEMENTS_PENDING';
export const FETCH_ELEMENTS_FULFILLED = 'FETCH_ELEMENTS_FULFILLED';
export const FETCH_ELEMENTS_REJECTED = 'FETCH_ELEMENTS_REJECTED';

// save elements
export const SAVE_ELEMENTS_PENDING = 'SAVE_ELEMENTS_PENDING';
export const SAVE_ELEMENTS_FULFILLED = 'SAVE_ELEMENTS_FULFILLED';
export const SAVE_ELEMENTS_REJECTED = 'SAVE_ELEMENTS_REJECTED';

// update element
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';

// update column
export const UPDATE_COLUMN = 'UPDATE_COLUMN';

// update row
export const UPDATE_ROW = 'UPDATE_ROW';

// delete row
export const DELETE_ROW = 'DELETE_ROW';

// insert elements
export const INSERT_ELEMENTS = 'INSERT_ELEMENTS';

// insert element
export const INSERT_ELEMENT = 'INSERT_ELEMENT';

// update element attrs
export const UPDATE_ELEMENT_ATTRS = 'UPDATE_ELEMENT_ATTRS';

export function fetchElements() {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_ELEMENTS',
      payload: axios.get(`${API_BASE}/elements`).then(result => result.data),
    });
  };
}

export function saveElements(elements) {
  return (dispatch) => {
    dispatch({
      type: 'SAVE_ELEMENTS',
      payload: axios.post(`${API_BASE}/save-elements`, {
        elements,
      }),
    });
  };
}

export function updateElement(newElement) {
  return {
    type: UPDATE_ELEMENT,
    payload: newElement,
  };
}

export function updateColumn(id, column) {
  return {
    type: UPDATE_COLUMN,
    id,
    payload: column,
  };
}

export function updateRow(id, row) {
  return {
    type: UPDATE_ROW,
    id,
    payload: row,
  };
}

export function deleteRow(id, row) {
  return {
    type: DELETE_ROW,
    id,
    payload: row,
  };
}

export function insertElements(newElement) {
  return {
    type: INSERT_ELEMENTS,
    payload: newElement,
  };
}

export function insertElement(id, newElement) {
  return {
    type: INSERT_ELEMENT,
    id,
    payload: newElement,
  };
}

export function updateElementAttrs(id,attrs) {
  return {
    type: UPDATE_ELEMENT_ATTRS,
    id,
    payload: attrs,
  };
}
