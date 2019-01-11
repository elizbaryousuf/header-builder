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
} from '../actions/elements';

const initialState = {
  fetching: false,
  rows: [],
  columns: [],
  elements: [],
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Fetch elements
    case FETCH_ELEMENTS_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_ELEMENTS_FULFILLED:
      return {
        ...state,
        rows: action.payload.rows,
        columns: action.payload.columns,
        elements: action.payload.elements,
        fetching: false,
      };
    case FETCH_ELEMENTS_REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };

      // Save elements
    case SAVE_ELEMENTS_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case SAVE_ELEMENTS_FULFILLED:
      return {
        ...state,
        fetching: false,
      };
    case SAVE_ELEMENTS_REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };

      // Update element
    case UPDATE_ELEMENT:
      return {
        ...state,
        elementList: action.payload,
      };

      // Update column
    case UPDATE_COLUMN:
      const updatedColumns = state.columns.map((column) => {
	        	if (column.id == action.id) {
	        		return {
            ...column,
            ...action.payload,
          };
	        	}
	       		return column;
	      	});

	    	return {
	      		...state,
	      		columns: updatedColumns,
	      	};

	    // Update row
    case UPDATE_ROW:
      const updatedRows = state.rows.map((row) => {
	        	if (row.id == action.id) {
	        		return {
            ...row,
            ...action.payload,
          };
	        	}
	       		return row;
	      	});

	    	return {
	      		...state,
	      		rows: updatedRows,
			  };

      // Delete row
    case DELETE_ROW:
      const deletedRow = state.rows.filter(row => row.id != action.id);
      const deletedColumns = state.columns.filter(column => !action.payload.columns.find(id => id == column.id));

      /*
			const columnElements = action.payload.columns.map( column => els )
			const deletedElements = state.elements.filter( element => {
	        	if ( element.id == action.id ){
	        		return {
						...row,
						...action.payload
					};
	        	}
	       		return element;
			  });

			  */

	    	return {
	      		...state,
        rows: deletedRow,
        columns: deletedColumns,
			  };

    // Insert elements
    case INSERT_ELEMENTS:
      return {
        ...state,
        rows: [
          ...state.rows,
          action.payload.rows,
        ],
        columns: [
          ...state.columns,
          action.payload.columns,
        ],
        elements: [
          ...state.elements,
          action.payload.elements,
        ],
      };

    
  // Insert element
  case INSERT_ELEMENT:
    const columns = state.columns.map( column => {
      if (column.id == action.id) {
        return {
          ...column,
          elements: [
            ...column.elements,
            action.payload.id,
          ]
        };
      }
      return column;
    });
    
    return {
      ...state,
      columns: columns,
      elements: [
        ...state.elements,
        action.payload,
      ],
    };

    // Update element attrs
    case UPDATE_ELEMENT_ATTRS:
      const updatedElements = state.elements.map((element) => {
        if (element.id == action.id) {
          return {
            ...element,
            attrs: {
              ...element.attrs,
              ...action.payload,
            }
          };
        }
        return element;
      });

      return {
          ...state,
          elements: updatedElements,
      };

    default:
      return state;
  }
};
