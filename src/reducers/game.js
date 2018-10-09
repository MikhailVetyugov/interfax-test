import * as actions from 'actions/game-actions';

const initialState = {
  loading: true
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case actions.SELECT_CELL:
      return {
        ...state,
        rows: rows(state.rows, action)
      };
    case actions.CHANGE_CELL:
    case actions.OPEN_CELL:
      return {
        ...state,
        rows: rows(state.rows, action),
        isGameFinished: isEveryCellFilledCorrectly(state.rows)
      };
    case actions.CHECK_CELL:
      return {
        ...state,
        hasErrors: hasErrors(state.rows)
      };
    case actions.SET_VARIANT:
      return {
        ...state,
        isGameFinished: false,
        hasErrors: false,
        loading: false,
        rows: rows(state.rows, action)
      };
    case actions.LOAD_VARIANT:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export function rows(state = [], action) {
  switch (action.type) {
    case actions.SELECT_CELL:
      const rows = [...state];

      rows.forEach((rowCells, i) => {
        rowCells.forEach((cell, j) => {
          cell.selected = !cell.initialValue && action.rowIndex === i && action.cellIndex === j;
        });
      });

      return rows;
    case actions.CHANGE_CELL:
    case actions.OPEN_CELL:
      if (!action.key || /^[1-9]$/.test(action.key)) {
        const rows = [...state];
        setValueInSelectedCell(rows, action.key);
        return rows;
      }

      return state;
    case actions.SET_VARIANT:
      return action.variant.solution
        .map((row, i) => row.map((cell, j) => ({
          initialValue: action.variant.openedCells[i][j],
          solutionValue: cell,
          userValue: null,
          selected: false
        })));
    default:
      return state;
  }
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
