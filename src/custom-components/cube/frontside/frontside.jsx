import React, { Component } from "react";
import Header from "../../header/header";
import Search from "../../search/search";
import spotifyLogic from "../../../services/spotifylogic";

export default class FrontSide extends Component {
  state = { message: "" };

  handleSearch = value => {
    this.setState({ message: "" });

    let artists = [];
    try {
      spotifyLogic
        .getArtists(value)
        .then(res => {
          res.artists.items.map(item =>
            artists.push({
              id: item.id,
              name: item.name,
              image: !!item.images.length ? item.images[0].url : ""
            })
          );
          return artists;
        })
        .then(data => {
          this.props.onArtistFound(data);
        })
        .catch(err => {
          this.setState({ message: err.message });
        });
    } catch (err) {
      this.setState({ message: err.message });
    }
  };

  handleClearSearch = () => {
    this.setState({ message: "" });
    this.props.onClearSearch();
  };

  render() {
    return (
      <section className="front">
        <Header></Header>
        <Search
          message={this.state.message}
          onClearSearch={this.handleClearSearch}
          onSearch={this.handleSearch}
        ></Search>
      </section>
    );
  }
}
