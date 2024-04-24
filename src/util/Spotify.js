const clientId = "5465746b7d954abdb11f8427be63a0f3"; // Replace with your actual Spotify client ID
const redirectUri = "http://localhost:3000/"; // Ensure this matches with your Spotify App settings
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token&show_dialog=true`;
      window.location = accessUrl;
    }
  },

  async getUserID(accessToken) {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.id) {
      throw new Error("User ID not found");
    }
    return jsonResponse.id;
  },

  async createPlaylist(userID, name, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const data = JSON.stringify({
      name: name,
      description: "Created by Jammming",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    const jsonResponse = await response.json();
    return jsonResponse.id;
  },

  async addTracksToPlaylist(playlistID, trackUris, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const data = JSON.stringify({ uris: trackUris });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    const jsonResponse = await response.json();
    return jsonResponse.snapshot_id;
  },

  search(term) {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      console.log("Access token is not available.");
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    return fetch(url, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length)
      return Promise.reject("Playlist name or tracks missing");
    let currentAccessToken = this.getAccessToken();
    let userID = "";

    const retrievedUserID = await this.getUserID(currentAccessToken);
    userID = retrievedUserID;
    const newPlaylistID = await this.createPlaylist(
      userID,
      name,
      currentAccessToken
    );
    return await this.addTracksToPlaylist(
      newPlaylistID,
      trackUris,
      currentAccessToken
    );
  },
};

export default Spotify;
