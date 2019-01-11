import {
  EDIT_ELEMENT,
  ELEMENT_ID,
  SET_OPEN,
} from '../actions/panels';

const initialState = {
  editElement: {},
  elementID: '',
  panels: {
    isOpenPanel: false,
    isOpenList: true,
    isOpenEdit: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ELEMENT:
      return {
        ...state,
        editElement: action.payload
      };
    case ELEMENT_ID:
      return {
        ...state,
        elementID: action.payload
      };
    case SET_OPEN:
      return {
        ...state,
        panels: {
          ...state.panels,
          ...action.payload,
        }
      }
    default:
      return state;
  }
};
