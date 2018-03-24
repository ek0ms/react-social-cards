import React, { Component } from 'react';
import CardList from './CardList';
import SearchBar from './SearchBar';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { cards: {} };
    // this.cardConstructor = this.cardConstructor.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  linkFetch = async (url) => {
    const parser = new DOMParser();
    const newUrl = `https://allorigins.me/get?url=${encodeURIComponent(url)}&callback=?`;
    const response = await fetch(newUrl);
    const text = await response.text();
    const html = await parser.parseFromString(text, 'text/html');

    const imageUrl = html.querySelectorAll('meta[property]')[2].content.slice(2, -2);
    const title = html.getElementsByTagName('title')[0].innerText;
    const descriptionWordsArray = html
      .querySelectorAll('meta[property]')[4]
      .outerHTML.slice(62, -6)
      .split(' ');
    const description = descriptionWordsArray
      .map((word) => {
        return word.replace(/["=]/g, '');
      })
      .join(' ');

    return { imageUrl, title, description };
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

  cardConstructor = async (url) => {
    const id = Math.floor(Math.random() * 100000);
    return Promise.all([this.linkFetch(url), this.userFetch(), this.ipsumFetch()])
      .then((response) => Object.assign(...response, { id }))
      .then((card) => {
        return { [card.id]: { ...card } };
      });
  };

  onButtonSubmit(url) {
    this.cardConstructor(url).then((card) => {
      this.setState({ cards: card });
    });
  }

  onInteractionClick = (event) => {
    debugger;
  };

  render() {
    return (
      <div className="App">
        <SearchBar onButtonSubmit={this.onButtonSubmit} />
        <CardList cards={this.state.cards} onInteractionClick={this.onInteractionClick} />
      </div>
    );
  }
}

export default App;
