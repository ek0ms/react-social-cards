import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <form
        className="searchContainer"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onButtonSubmit(this.state.term);
        }}
      >
        <input
          value={this.state.term}
          onChange={(event) => this.setState({ term: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SearchBar;
