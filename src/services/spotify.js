// @flow

import { helpers } from "../helpers";
import axios from "axios";

import type { httpRequestHeaders } from "./services.types";

// Build Spotify fetch URL
export function createURLArtist(
  track: string,
  artist: string,
  accessToken: string
): httpRequestHeaders {
  const artistName = helpers.replaceSpaces(artist);
  const trackName = helpers.replaceSpaces(track);
  const BASE_URL = "https://api.spotify.com/v1/search?";

  const FETCH_URL = `${BASE_URL}q=track%3A${trackName}%20artist%3A${artistName}&type=track&limit=1`;
  const headers = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    },
    mode: "cors",
    cache: "default"
  };

  return { FETCH_URL, headers };
}

// Send GET request to http://localhost:8888/token to generate spotify's API token
export function getSpotifyToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .get("/token")
      .then(token => {
        resolve(token.data.token);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getArtistInfoFromSpotify(
  track_name: string,
  artist_name: string,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = createURLArtist(track_name, artist_name, token);

    axios
      .get(params.FETCH_URL, params.headers)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
