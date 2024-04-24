const clientId = "5465746b7d954abdb11f8427be63a0f3";
const redirectUri = "http://localhost:3000/";
const authEndpoint = `https://accounts.spotify.com/authorize`;

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
      const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token&show_dialog=true`;
      window.location = accessUrl;
    }
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
      })
      .catch((error) => {
        console.error(
          "Error occurred while fetching data from Spotify:",
          error
        );
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    console.log(`Saving playlist ${name} with tracks ${trackUris.join(", ")}`);
    // Mock async behavior
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Playlist saved successfully!");
        resolve();
      }, 1000);
    });
  },
};

export default Spotify;
