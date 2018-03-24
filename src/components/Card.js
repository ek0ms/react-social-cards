import React from 'react';

const Card = (props) => {
  return (
    <li className="card">
      <div className="userInfo">
        <img src={props.avatar} className="avatar" alt="avatar" />
        <div className="userDetails">
          <a href="#" className="username">
            {props.name}
          </a>
          <p className="timestamp">{props.timestamp}</p>
        </div>
      </div>
      <p className="userContent">{props.userText}</p>
      <a href="#">
        <div className="linkContainer">
          <img src={props.linkImg} className="cardImg" alt="card" />
          <div className="linkInfo">
            <h3 className="linkTitle">{props.title}</h3>
            <p className="linkContent">{props.description}</p>
            <p className="rootLink">{props.rootLink}</p>
          </div>
        </div>
      </a>
      <div className="interactionsContainer">
        <span className="comments" onClick={props.onInteractionClick}>
          <i className="far fa-comment" />
        </span>
        <span className="likes" onClick={props.onInteractionClick}>
          <i className="far fa-heart" />
        </span>
        <span className="shares" onClick={props.onInteractionClick}>
          <i className="far fa-share-square" />
        </span>
      </div>
    </li>
  );
};

export default Card;
