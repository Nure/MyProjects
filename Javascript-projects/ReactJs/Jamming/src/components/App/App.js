import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
           searchResults : [],
           playlistName : "Enter Playlist Name",
           playlistTracks : []
       };
       this.addTrack = this.addTrack.bind(this);
       this.removeTrack = this.removeTrack.bind(this);
       this.updatePlaylistName = this.updatePlaylistName.bind(this);
       this.savePlaylist = this.savePlaylist.bind(this);
       this.search = this.search.bind(this);
    }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
       return;
     } else {
       let tracks = this.state.playlistTracks;
       tracks.push(track);
       this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track){
    let trackVar = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks : trackVar})
  }

  updatePlaylistName(name)  {
    this.setState({playlistName : name})
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=> {
      this.setState({playlistTracks:[]});
    }).then (()=> {this.updatePlaylistName('New Favorite Metal');
  })
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
