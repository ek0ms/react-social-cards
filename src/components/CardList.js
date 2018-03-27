import React from 'react';
import _ from 'lodash';
import Card from './Card';

const CardList = (props) => {
  const cardItems = _.map(props.cards, (card) => {
    return (
      <Card
        avatar={card.avatar}
        name={_.capitalize(card.name)}
        timestamp={new Date().toDateString().slice(4, -5)}
        userText={card.userText}
        linkImg={card.imageUrl}
        title={card.title}
        description={card.description}
        rootUrl={card.rootUrl}
        onLikeClick={props.onLikeClick}
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
