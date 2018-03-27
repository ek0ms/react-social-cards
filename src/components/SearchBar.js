import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      isDisabled: false,
      error: '',
    };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ isDisabled: true });
    const error = this.validate(this.state.term);

    if (error) {
      this.setState({ error, isDisabled: false });
    } else {
      this.props
        .cardAdder(this.state.term)
        .then(() => this.setState({ term: '', isDisabled: false, error: '' }));
    }
    this.textInput.focus();
  };

  validate = (url) => {
    const regExPattern = /^(https?:\/\/)?(www\.)?(medium\.)/;
    const matches = url.match(regExPattern);

    if (matches) {
      return '';
    }

    return 'URL is not a valid medium article';
  };

  render() {
    const className = `searchField ${this.state.error ? 'danger' : ''}`;
    return (
      <form className="searchForm" onSubmit={this.submitHandler}>
        <div className="searchContainer">
          <input
            ref={(input) => (this.textInput = input)}
            type="text"
            className={className}
            placeholder="Enter medium article here"
            value={this.state.term}
            onChange={(event) => this.setState({ term: event.target.value })}
          />
          <button type="submit" className="submitButton" disabled={this.state.isDisabled}>
            Submit
          </button>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default SearchBar;
