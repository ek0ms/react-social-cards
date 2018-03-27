import React, { Component } from 'react';
import CardList from './CardList';
import SearchBar from './SearchBar';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: {},
      currentUser: { 500: { id: 500 } },
    };
    this.counter = 0;
    this.onLikeClick = this.onLikeClick.bind(this);
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

    const regExPattern = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
    const rootUrl = regExPattern.exec(url)[1];

    return { imageUrl, title, description, url, rootUrl };
  };

  userFetch = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const json = await response.json();

    const user = json.results[0];
    const name = user.name.first;
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
    const randomLikesNumber = Math.random() > 0.4 ? Math.floor(Math.random() * 150 + 50) : 0;
    const likes = this.likesGenerator(randomLikesNumber);

    const cardProperties = await Promise.all([
      this.linkFetch(url),
      this.userFetch(),
      this.ipsumFetch(),
    ]).then((response) => Object.assign(...response, { id }, { likes }));

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

  render() {
    return (
      <div className="App">
        <SearchBar cardAdder={this.cardAdder} />
        <CardList
          cards={this.state.cards}
          onLikeClick={this.onLikeClick}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
