const clientId = "5465746b7d954abdb11f8427be63a0f3";
const redirectUri = "http://jammming-rho-five.vercel.app/";
const authEndpoint = "https://accounts.spotify.com/authorize";
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
      const scope = "playlist-modify-public playlist-modify-private";
      const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(
        scope
      )}&response_type=token&show_dialog=true`;
      window.location.href = accessUrl;
    }
  },

  async getUserID(accessToken) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.id) {
      throw new Error("User ID not found");
    }
    return jsonResponse.id;
  },

  async createPlaylist(userID, name, accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: "Created with Jammming",
        }),
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.id) {
      throw new Error("Playlist ID not found");
    }
    return jsonResponse.id;
  },

  async addTracksToPlaylist(playlistID, trackUris, accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.snapshot_id) {
      throw new Error("Snapshot ID not found");
    }
    return jsonResponse.snapshot_id;
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        term
      )}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();
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
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;
    const accessToken = this.getAccessToken();
    return this.getUserID(accessToken)
      .then((userID) => this.createPlaylist(userID, name, accessToken))
      .then((playlistID) =>
        this.addTracksToPlaylist(playlistID, trackUris, accessToken)
      );
  },
};

export default Spotify;
