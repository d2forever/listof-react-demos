import React from 'react';

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class SearchBar extends React.Component {
  state = { searchTerm: '' };
  timer = null;

  onSearchHandler = event => {
    if(this.timer) clearTimeout(this.timer);
    this.setState({ searchTerm: event.target.value }, () => {
      this.timer = setTimeout(this.onChangeTrigger, WAIT_INTERVAL);
    });
  };

  onKeyDownHandler = event => {
    if(event.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.onChangeTrigger();
    }
  }

  onChangeTrigger = () => {
    this.props.onSearchSubmitHandler(this.state.searchTerm);
  }

  render() {
    return (
      <div className="ui segment form">
        <div className="field">
          <label>Image search</label>
          <div className="ui search">
            <div className={`ui icon input ${this.props.isLoading ? 'loading': ''}`}>
              <input
                className="prompt"
                type="text"
                placeholder="Search your favorite image..."
                onChange={this.onSearchHandler}
                onKeyDown={this.onKeyDownHandler}
                value={this.state.searchTerm}
              />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
