export const SELECT_CELL = 'SELECT_CELL';
export const selectCell = (rowIndex, cellIndex) => ({
  type: SELECT_CELL,
  rowIndex,
  cellIndex
});

export const CHANGE_CELL = 'CHANGE_CELL';
export const changeCell = (key) => ({
  type: CHANGE_CELL,
  key
});

export const OPEN_CELL = 'OPEN_CELL';
export const openCell = () => ({
  type: OPEN_CELL
});

export const CHECK_CELL = 'CHECK_CELL';
export const checkCell = () => ({
  type: CHECK_CELL
});

export const LOAD_VARIANT = 'LOAD_VARIANT';
export const loadVariant = () => ({
  type: LOAD_VARIANT
});

export const SET_VARIANT = 'SET_VARIANT';
export const setVariant = (variant) => ({
  type: SET_VARIANT,
  variant
});

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const initializeApp = () => ({
  type: INITIALIZE_APP,
});