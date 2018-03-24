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
        rootLink="website.com"
        onInteractionClick={props.onInteractionClick}
        key={card.id}
      />
    );
  });

  return <ul>{cardItems}</ul>;
};

export default CardList;
