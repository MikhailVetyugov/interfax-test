import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import * as actions from 'actions/popup-actions';

export class Popup extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.opened ? this.renderPopup() : this.hidePopup();
  }

  componentDidUpdate() {
    this.props.opened ? this.renderPopup() : this.hidePopup();
  }

  componentWillUnmount() {
    this.hidePopup();
  }

  renderPopup() {
    if (!this.popup) {
      this.popup = document.createElement("div");
      document.body.appendChild(this.popup);
    }

    ReactDOM.render(
      <div className='popup-overlay'>
        <div className='popup-content'>
          {this.props.children}
          <div className='popup-close-button' onClick={this.closePopup}>Закрыть</div>
        </div>
      </div>,
      this.popup);
  }

  hidePopup() {
    if (this.popup) {
      ReactDOM.unmountComponentAtNode(this.popup);
      document.body.removeChild(this.popup);
      this.popup = null;
    }
  }

  closePopup() {
    this.props.togglePopup(false);
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  const opened = state.popupReducer.opened;
  return { opened };
}

export default connect(mapStateToProps, actions)(Popup);