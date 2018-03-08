import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    Spotify.getAccessToken();
    this.state = {
      searchResults: [],
           playlistName: "Playlist",
           playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.every(playlistTrack => playlistTrack.id !== track.id)) {
       let tracks = this.state.playlistTracks;
       tracks.push(track);
       this.setState({playlistTracks: tracks});
     }

}

  removeTrack(track){
      let tracks = this.state.playlistTracks;
      const removeTrack = tracks.filter(playlistTrack => track.id !== playlistTrack.id);
      this.setState({ playlistTracks: removeTrack });
  }

updatePlaylistName(nameOfplaylist){
  this.setState({playlistName: nameOfplaylist});
}

savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);

     Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
       console.log(`new playlist with '${this.state.playlistName}' and ${trackURIs.length} songs successful saved.`);
       this.setState({playlistName: 'New Playlist', playlistTracks: []});
     })
}

search(searchTerm) {
       Spotify.search(searchTerm).then(tracks =>
           this.setState({searchResults: tracks}));
 }

  render() {
    return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
    <Playlist tracks={this.state.playlistTracks} playlistName={this.state.playlistName}
    onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
)
}

}

export default App;
