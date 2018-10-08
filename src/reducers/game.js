import * as actions from 'actions/game-actions';

const initialState = initializeState();

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SELECT_CELL:
      const newState = Object.assign({}, state);

      newState.rows.forEach((rowCells, i) => {
        rowCells.forEach((cell, j) => {
          cell.selected = !cell.initialValue && action.rowIndex === i && action.cellIndex === j;
        })
      });

      return newState;
    case actions.CHANGE_CELL:
    case actions.OPEN_CELL:
      if (!action.key || /^[1-9]$/.test(action.key)) {
        const newState = Object.assign({}, state);
        setValueInSelectedCell(newState.rows, action.key);
        newState.isGameFinished = isEveryCellFilledCorrectly(newState.rows);
        return newState;
      }

      return state;
    case actions.CHECK_CELL:
      return Object.assign({}, state, { hasErrors: hasErrors(state.rows) });
    case actions.SET_VARIANT:
      return Object.assign({}, state, initializeVariant(action.variant));
    case actions.LOAD_VARIANT:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
}

function initializeState() {
  return {
    loading: true
  };
}

function initializeVariant(variant) {
  return {
    isGameFinished: false,
    hasErrors: false,
    loading: false,
    rows: variant.solution
      .map((row, i) => row.map((cell, j) => ({
        initialValue: variant.openedCells[i][j],
        solutionValue: cell,
        userValue: null,
        selected: false
      })))
  };
}

function setValueInSelectedCell(rows, value = null) {
  for (const rowCells of rows) {
    const cell = rowCells.find(cell => cell.selected && !cell.initialValue);
    if (!cell) continue;

    if (value) {
      cell.userValue = +value;
    } else if (value === '') {
      cell.userValue = value;
    } else {
      cell.initialValue = cell.solutionValue;
      cell.userValue = null;
    }

    return;
  }
}

function isEveryCellFilledCorrectly(rows) {
  return rows.every(rowCells => {
    return rowCells.every(cell => cell.initialValue || cell.userValue === cell.solutionValue);
  });
}

function hasErrors(rows) {
  return rows.some(rowCells => {
    return rowCells.some(cell => cell.userValue && cell.userValue !== cell.solutionValue);
  });
}