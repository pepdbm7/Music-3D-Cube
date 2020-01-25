import React, { Component } from "react";
import Header from "../../header/header";
import SideTitle from "../../sidetitle/sidetitle";
import List from "../../list/list";
import spotifyLogic from "../../../services/spotifylogic";

export default class RightSide extends Component {
  state = { artists: [] };

  componentWillReceiveProps(props) {
    let artists = props.artists.map(el => {
      el.image = !el.image
        ? require("../../../assets/img/playlist.png")
        : el.image;
      return el;
    });
    this.setState({ artists: artists });
  }

  handleAlbums = id => {
    spotifyLogic
      .getAlbumsByArtistId(id)
      .then(res => {
        let albums = [];
        res.map(
          item =>
            item.collectionType === "Album" &&
            albums.push({
              id: item.collectionId || "",
              name: item.collectionName || "",
              image: item.artworkUrl100 || ""
            })
        );

        this.props.onAlbums(albums);
      })
      .catch(err => alert(`Rightside: ${err.message}`)); // mostrar modal
  };

  render() {
    return (
      <section className="right">
        <Header></Header>
        <SideTitle title="Artists List"></SideTitle>
        <List
          onAlbums={this.handleAlbums}
          type="albums"
          list={this.state.artists}
        ></List>
      </section>
    );
  }
}
