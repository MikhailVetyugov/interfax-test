import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import * as actions from 'actions/game-actions';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cells = this.props.cells
      .map((cell, i) => <Cell key={i} cellIndex={i} rowIndex={this.props.rowIndex} />);
    return <tr className='row'>{cells}</tr>;
  }
}

function mapStateToProps(state, ownProps) {
  const cells = state.gameReducer.rows.find((row, i) => i === ownProps.rowIndex);
  return { cells };
}

export default connect(mapStateToProps, actions)(Row);