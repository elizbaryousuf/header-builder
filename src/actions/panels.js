import {
  EDIT_ELEMENT,
  ELEMENT_ID,
  SET_OPEN,
} from './ActionTypes';

export function editElement(element) {
  return {
    type: EDIT_ELEMENT,
    payload: element,
  };
}

export function elementID(id) {
  return {
    type: ELEMENT_ID,
    payload: id,
  };
}

export function setOpen(set) {
  return {
    type: SET_OPEN,
    payload: set,
  };
}
