import React from 'react';
import _ from 'lodash';
import Card from './Card';

const CardList = (props) => {
  const cardItems = _.map(props.cards, (card) => {
    return (
      <Card
        avatar={card.avatar}
        name={card.name}
        timestamp={card.timestamp}
        userText={card.userText}
        linkImg={card.imageUrl}
        title={card.title}
        description={card.description}
        rootUrl={card.rootUrl}
        onLikeClick={props.onLikeClick}
        onShareClick={props.onShareClick}
        key={card.id}
        id={card.id}
        url={card.url}
        likes={card.likes}
        comments={card.comments}
        currentUser={props.currentUser}
      />
    );
  });

  return <ul className="cardList">{cardItems}</ul>;
};

export default CardList;
