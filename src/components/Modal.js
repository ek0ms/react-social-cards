import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    this.modalTarget.addEventListener('click', (event) => this.props.onModalClick(event));
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    const textValue = `${this.props.card.title} ${this.props.card.url}`;
    ReactDOM.render(
      <div className="modal-container">
        <div className="modal-header">
          <span className="modal-social">
            <i className="fas fa-share-alt" />
          </span>
          <span className="modal-avatar">
            <i className="fas fa-user" />
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-social-title">Share a link with your friends</div>
          <textarea className="modal-textarea" type="text" rows="4" defaultValue={textValue} />
          <button className="btn-share">Share</button>
        </div>
      </div>,
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

export default Modal;
