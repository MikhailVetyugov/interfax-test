import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import Row from './Row';
import Popup from './Popup';
import * as gameActions from 'actions/game-actions';
import * as popupActions from 'actions/popup-actions';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onCheckCell() {
    this.props.checkCell();
    this.props.togglePopup(true);
  }

  render() {
    const rows = this.props.rows.map((row, i) => <Row key={i} rowIndex={i} />);
    return (
      <React.Fragment>
        {this.props.isGameFinished && <h3>Поздравляю вас! Вы правильно решили Судоку</h3>}
        <Popup>
          {this.props.hasErrors ? 'В решении есть ошибки' : 'В решении нет ошибок'}
        </Popup>
        <table>
          <tbody>{rows}</tbody>
        </table>
        <button onClick={this.props.loadVariant}>Новая игра</button>
        <button onClick={this.onCheckCell}>Проверить</button>
        <button onClick={this.props.openCell}>Открыть ячейку</button>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { rows, isGameFinished, hasErrors } = state.game;
  return { rows, isGameFinished, hasErrors };
}

function mapDispatchToProps(dispatch) {
  return {
    openCell: () => dispatch(gameActions.openCell()),
    checkCell: () => dispatch(gameActions.checkCell()),
    togglePopup: opened => dispatch(popupActions.togglePopup(opened)),
    loadVariant: () => dispatch(gameActions.loadVariant()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField);