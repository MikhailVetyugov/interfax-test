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
        const rowIndex = findCurrentRowIndex(state);

        if (rowIndex === -1) {
          return state;
        }

        return [
          ...state.slice(0, rowIndex),
          row(state[rowIndex], action),
          ...state.slice(rowIndex + 1)
        ];
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

export function row(state, action) {
  switch (action.type) {
    case actions.OPEN_CELL:
    case actions.CHANGE_CELL:
      const currentCellIndex = state.findIndex(cell => cell.selected && !cell.initialValue);

      if (currentCellIndex === -1) {
        return state;
      }

      return [
        ...state.slice(0, currentCellIndex),
        cell(state[currentCellIndex], action),
        ...state.slice(currentCellIndex + 1)
      ];
    default:
      return state;
  }
}

export function cell(state, action) {
  switch (action.type) {
    case actions.OPEN_CELL:
      return {
        ...state,
        userValue: null,
        initialValue: state.solutionValue
      };
    case actions.CHANGE_CELL:
      if (action.key) {
        return {...state, userValue: +action.key };
      }

      if (action.key === '') {
        return {...state, userValue: action.key };
      }
    default:
      return state;
  }
}

function findCurrentRowIndex(rows) {
  return rows.findIndex(cells => {
    const cellIndex = cells.findIndex(cell => cell.selected && !cell.initialValue);
    return cellIndex > -1;
  })
}

function isEveryCellFilledCorrectly(rows) {
  return rows.every(row => {
    return row.every(cell => cell.initialValue || cell.userValue === cell.solutionValue);
  });
}

function hasErrors(rows) {
  return rows.some(row => {
    return row.some(cell => cell.userValue && cell.userValue !== cell.solutionValue);
  });
}
