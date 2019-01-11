import {
  FETCH_PANEL_ELEMENTS_PENDING,
  FETCH_PANEL_ELEMENTS_FULFILLED,
  FETCH_PANEL_ELEMENTS_REJECTED,
} from '../actions/panelElements';

const initialState = {
  fetching: false,
  elementList: [],
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Fetch panel elements
    case FETCH_PANEL_ELEMENTS_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_PANEL_ELEMENTS_FULFILLED:
      return {
        ...state,
        elementList: action.payload,
        fetching: false,
      };
    case FETCH_PANEL_ELEMENTS_REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
