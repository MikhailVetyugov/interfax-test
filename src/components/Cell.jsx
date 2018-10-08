import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import { BLOCK_INDEXES_TABLE, HIGHLIGHTED_BLOCK_INDEXES } from 'app/consts';
import * as actions from 'actions/game-actions';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldBlockBeHighlighted() {
    const blockIndex = BLOCK_INDEXES_TABLE[this.props.rowIndex][this.props.cellIndex];
    return HIGHLIGHTED_BLOCK_INDEXES.indexOf(blockIndex) > -1;
  }

  onFocus() {
    this.props.selectCell(this.props.rowIndex, this.props.cellIndex);
  }

  onChange(evt) {
    this.props.changeCell(evt.target.value);
  }

  render() {
    let className = 'cell';
    if (this.props.selected) {
      className += ' selected';
    }
    if (this.shouldBlockBeHighlighted()) {
      className += ' block';
    }

    const { value } = this.props;

    return (
      <td className={className}>
        <input
          type='text'
          maxLength='1'
          onChange={this.onChange}
          onFocus={this.onFocus}
          value={value}
          readOnly={this.props.readonly} />
      </td>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const cell = state.gameReducer.rows
    .find((row, i) => i === ownProps.rowIndex)
    .find((cell, j) => j === ownProps.cellIndex);
  return {
    value: cell.userValue || cell.initialValue || '',
    readonly: !!cell.initialValue,
    selected: cell.selected
  };
}

export default connect(mapStateToProps, actions)(Cell);