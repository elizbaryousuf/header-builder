import { combineReducers } from 'redux';

import elements from './elements';
import panelElements from './panelElements';
import panels from './panels';

export default combineReducers({
  elements,
  panelElements,
  panels,
});
