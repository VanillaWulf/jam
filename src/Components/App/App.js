import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';
import SuccessWindow from '../SuccessWindow/SuccessWindow.js'

class App extends Component {
  constructor(props){
    super(props);
    Spotify.getAccessToken();
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      class:'noWindow',
      SaveWindow: '1'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);

    this.closeWindow = this.closeWindow.bind(this);

    this.openWindow = this.openWindow.bind(this);

  }

  addTrack(track){
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
        this.setState(stateBefore => ({
          playlistTracks: [...stateBefore.playlistTracks, track]
        })
      );
    }
  }

  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      }
    );
  }

  updatePlaylistName(nameOfplaylist){
    this.setState({playlistName: nameOfplaylist});
  }

  savePlaylist(){
    this.setState({ SaveWindow: '1'});
    this.openWindow();
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        console.log(`new playlist with '${this.state.playlistName}' and ${trackURIs.length} songs successful saved.`);
        this.setState({playlistName: 'New Playlist', playlistTracks: []});
      }
    )
  }

  openWindow(){
    this.setState({ class: 'SuccessWindow'})
  }

  closeWindow(){
    this.setState({ class:'noWindow'});

  }

  search(searchTerm) {
   Spotify.search(searchTerm)
   .then(tracks =>
     this.setState({searchResults: tracks})
   );
  }

  resetPlaylist(){
    this.setState({ SaveWindow: '0'});
    this.setState({playlistName: 'New Playlist', playlistTracks: []});
    this.openWindow();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SuccessWindow WindowClass={this.state.class} onClose={this.closeWindow} SaveTrigger={this.state.SaveWindow}/>
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist tracks={this.state.playlistTracks} playlistName={this.state.playlistName}
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onReset={this.resetPlaylist} />
              </div>
        </div>
      </div>
    )
  }

}

export default App;
