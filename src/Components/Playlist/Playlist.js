import React, {Component} from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} isRemoval={false} />
          <div className="buttons">
            <a className="Playlist-b" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            <a className="Playlist-b reset" onClick={this.props.onReset}>RESET</a>
          </div>
      </div>
    );
  }
}

export default Playlist;
