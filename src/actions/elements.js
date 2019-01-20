import axios from 'axios';
import {
  FETCH_ELEMENTS_PENDING,
  FETCH_ELEMENTS_FULFILLED,
  FETCH_ELEMENTS_REJECTED,

  UPDATE_ELEMENT,
  UPDATE_COLUMN,
  UPDATE_ROW,

  DELETE_ROW,

  INSERT_ELEMENTS,

  INSERT_ELEMENT,

  SAVE_ELEMENTS_PENDING,
  SAVE_ELEMENTS_FULFILLED,
  SAVE_ELEMENTS_REJECTED,

  UPDATE_ELEMENT_ATTRS,
} from './ActionTypes';

const API_BASE = 'http://localhost/wordpress/nucleus-themes/hyulin/wp-json/header-builder';

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
