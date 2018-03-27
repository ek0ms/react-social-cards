import React, { Component } from 'react';
import _ from 'lodash';

class Card extends Component {
  showLikes = () => {
    const numOfLikes = _.size(this.props.likes) > 0 ? _.size(this.props.likes) : '';
    const user = _.find(this.props.likes, { id: Number(_.findKey(this.props.currentUser)) });

    return user ? (
      <span className="likes" onClick={() => this.props.onLikeClick(this.props.id)}>
        <i className="fas fa-heart" />
        <span className="likes-counter">{numOfLikes}</span>
      </span>
    ) : (
      <span className="likes" onClick={() => this.props.onLikeClick(this.props.id)}>
        <i className="far fa-heart" />
        <span className="likes-counter">{numOfLikes}</span>
      </span>
    );
  };

  render() {
    return (
      <li className="card">
        <div className="userInfo">
          <img src={this.props.avatar} className="avatar" alt="avatar" />
          <div className="userDetails">
            <a className="username">{this.props.name}</a>
            <p className="timestamp">{this.props.timestamp}</p>
          </div>
        </div>
        <p className="userContent">{this.props.userText}</p>
        <a target="_blank" href={this.props.url}>
          <div className="linkContainer">
            <img src={this.props.linkImg} className="cardImg" alt="card" />
            <div className="linkInfo">
              <h3 className="linkTitle">{this.props.title}</h3>
              <p className="linkContent">{this.props.description}</p>
              <p className="rootUrl">{this.props.rootUrl}</p>
            </div>
          </div>
        </a>
        <div className="interactionsContainer">
          <span className="comments" onClick={(event) => event}>
            <i className="far fa-comment" />
          </span>
          {this.showLikes()}
          <span className="shares" onClick={() => this.props.onShareClick(this.props)}>
            <i className="far fa-share-square" />
          </span>
        </div>
      </li>
    );
  }
}

export default Card;
