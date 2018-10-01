import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import GameField from './GameField';
import * as actions from 'actions/game-actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    return this.props.loading ? <h3>Loading...</h3> : <GameField />;
  }
}

function mapStateToProps(state, ownProps) {
  const loading = state.gameReducer.loading;
  return {
    loading
  };
}

export default connect(mapStateToProps, actions)(App);