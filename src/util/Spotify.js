import client from '../secret/secret.js';
let accessToken;
/*const clientId='e41a35827d8241739a49b91a98c61d1f';*/
const clientId = client.getClient();
/*const clientId = process.env.SPOTIFY_SECRET;*/
const redirectUri = 'http://localhost:3000/';


let expiresIn;

const Spotify ={

getAccessToken(){
  console.log(client.getClient());
    if (accessToken) {
     return accessToken;
   }
   const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
   const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
   if (urlAccessToken && urlExpiresIn) {
     accessToken = urlAccessToken[1];
     expiresIn = urlExpiresIn[1];
     window.setTimeout(() => accessToken = '', expiresIn * 1000);
     window.history.pushState('Access Token', null, '/');
     console.log('get token success');
   } else {
     window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectUri}`;
   }

 },

  search(term){ console.log(accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
           {headers: {Authorization: `Bearer ${accessToken}`}})
           .then(response => response.json())
           .then(jsonResponse => {
               if (jsonResponse.tracks) {
                   return jsonResponse.tracks.items.map(function(track) {
                       return {
                           id: track.id,
                           name: track.name,
                           uri: track.uri,
                           album: track.album.name,
                           artist: track.artists[0].name
                       }}
                   )}
               else {
                   return [];
               }
           });
  },

handleResponse(response) {
           if (response.ok) {
               return response.json();
           }
           throw new Error('Request failed!');
       },

savePlaylist(name, trackUri) {
  {
  return fetch('https://api.spotify.com/v1/me',
       {headers: {Authorization: `Bearer ${accessToken}`} })
       .then(response => response.json())
       .then(jsonResponse => {
           let userId = jsonResponse.id;
           console.log(userId);
           console.log(trackUri);
           return this.createPlaylist(userId, name, trackUri);
       });
  }

},

createPlaylist(userId, playlistName, playlistTracks) {
      return fetch( `https://api.spotify.com/v1/users/${userId}/playlists/`, { headers: {Authorization: `Bearer ${accessToken}`},
            method:'POST', body:  JSON.stringify({name: playlistName, public: false})})
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
              let playlistId = jsonResponse.id;
             /*next step - to expand playlist with uris*/
                console.log("get playlistID success");
                console.log(jsonResponse.id);
                return this.saveTrack(userId, playlistId, playlistTracks);
            });
    },

saveTrack(userId, playlistId, playlistTracks){
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { headers: {Authorization: `Bearer ${accessToken}`},
            method:'POST', body: JSON.stringify(playlistTracks)})
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
                console.log("save tracks success");
                return jsonResponse.snapshot_id;
            });
    }
}

export default Spotify;
