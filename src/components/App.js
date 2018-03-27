import React, { Component } from 'react';
import _ from 'lodash';
import CardList from './CardList';
import SearchBar from './SearchBar';
import Modal from './Modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: {},
      currentUser: { 500: { id: 500 } },
      modal: { display: false, card: {} },
    };
    this.counter = 0;
  }

  linkFetch = async (url) => {
    const parser = new DOMParser();
    const proxiedUrl = `https://allorigins.me/get?url=${encodeURIComponent(url)}&callback=?`;
    const response = await fetch(proxiedUrl);
    const text = await response.text();
    const html = await parser.parseFromString(text, 'text/html');
    const metaTags = html.querySelectorAll('meta[property]');

    const imageUrl = metaTags[2].content.slice(2, -2);
    const title = html.getElementsByTagName('title')[0].innerText;

    const descriptionIndex = title === 'Not Found – Medium' ? 3 : 4;
    const description = metaTags[descriptionIndex].outerHTML
      .slice(62, -6)
      .split(' ')
      .map((word) => {
        return word.replace(/["=]/g, '');
      })
      .join(' ');

    const regExPattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\n]+)/;
    const rootUrl = regExPattern.exec(url)[1];

    return { imageUrl, title, description, url, rootUrl };
  };

  userFetch = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const json = await response.json();

    const user = json.results[0];
    const name = _.capitalize(user.name.first);
    const avatar = user.picture.medium;

    return { name, avatar };
  };

  ipsumFetch = async () => {
    const response = await fetch(
      'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
    );
    const json = await response.json();
    const userText = json[0];

    return { userText };
  };

  likesGenerator = (num) => {
    let wrapping = {};

    for (let id = 0; id < num; id++) {
      wrapping[id] = { id };
    }
    return wrapping;
  };

  cardConstructor = async (url) => {
    let id = this.counter;
    const timestamp = new Date().toDateString().slice(4, -5);
    const randomLikesNumber = Math.random() > 0.4 ? Math.floor(Math.random() * 150 + 50) : 0;
    const likes = this.likesGenerator(randomLikesNumber);

    const cardProperties = await Promise.all([
      this.linkFetch(url),
      this.userFetch(),
      this.ipsumFetch(),
    ]).then((response) => Object.assign(...response, { id }, { likes }, { timestamp }));

    this.counter += 1;
    return { [cardProperties.id]: { ...cardProperties } };
  };

  cardAdder = async (url) => {
    const card = await this.cardConstructor(url);
    this.setState((prevState) => {
      return { cards: { ...prevState.cards, ...card } };
    });

    // const currentState = this.state.cards;
    // const cards = { ...card, ...currentState };
    // this.setState({ cards });
  };

  onLikeClick = (id) => {
    const card = _.find(this.state.cards, { id });
    const currentLikes = card.likes;
    const user = _.find(currentLikes, { id: Number(_.findKey(this.state.currentUser)) });

    if (user) {
      const likes = _.omit(currentLikes, user.id);
      const newCard = { ...card, likes };
      this.setState((prevState) => {
        return {
          cards: {
            ...prevState.cards,
            [newCard.id]: newCard,
          },
        };
      });
    } else {
      const currentUser = this.state.currentUser;
      const likes = { ...currentLikes, ...currentUser };
      const newCard = { ...card, likes };
      this.setState((prevState) => {
        return {
          cards: { ...prevState.cards, [newCard.id]: newCard },
        };
      });
    }
  };

  onShareClick = (card) => {
    this.setState({ modal: { display: true, card } });
  };

  onModalClick = (event) => {
    if (event.target.className === 'modal') {
      this.setState({ modal: { display: false } });
    }
  };

  render() {
    const displayModal = this.state.modal.display;

    return (
      <div className="App">
        <SearchBar cardAdder={this.cardAdder} />
        <CardList
          cards={this.state.cards}
          onLikeClick={this.onLikeClick}
          onShareClick={this.onShareClick}
          currentUser={this.state.currentUser}
        />
        {displayModal ? (
          <Modal card={this.state.modal.card} onModalClick={this.onModalClick} />
        ) : (
          <noscript />
        )}
      </div>
    );
  }
}

export default App;
