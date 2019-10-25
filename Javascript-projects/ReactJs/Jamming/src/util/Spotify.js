let accessToken;
const clientID = ''; clientId
const redirectURI = 'http://nure.surge.sh';


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      if (window.location.hash) {
        accessToken = window.location.hash.match(/access_token=([^&]+)/)[1];
        let expiresIn = window.location.hash.match(/expires_in=([^&]+)/)[1];
        window.setTimeout(() => accessToken='',expiresIn*1000);
        window.history.pushState('Access Token',null,'/');
        return accessToken;
      } else {
        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
      }
    }
  },

  savePlaylist(playlistName,trackURIs) {
    accessToken = this.getAccessToken();
    let headers = {"Authorization":`Bearer ${accessToken}`};
    let userID;
    let playlistID;
    if (playlistName && trackURIs) {
      return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        return response.json()
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
          method:'POST',
          headers:{
            "Authorization":'Bearer '+accessToken,
            "Content-Type": 'application/json'
          },
          body:JSON.stringify({name:playlistName})
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
          method:'POST',
          headers:{
            "Authorization":`Bearer ${accessToken}`,
            "Content-Type": 'application/json'
          },
          body:JSON.stringify({'uris':trackURIs})
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistID = jsonResponse.id;
    })} else {return;}
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    return fetch(searchUrl, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
            id:track.id,
            name:track.name,
            artist:track.artists[0].name,
            album:track.album.name,
            uri:track.uri,
            previewUrl:track.preview_url,
        }));

      } else {
        return [];
      }
    })
  }
};

export default Spotify;
