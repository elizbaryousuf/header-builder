export const EDIT_ELEMENT= 'EDIT_ELEMENT';
export const ELEMENT_ID = 'ELEMENT_ID';
export const SET_OPEN = 'SET_OPEN';

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
