// fetchArtists.js
import { getAccessToken } from "../helpers/auth";

export const fetchArtists = async (query) => {
    const accessToken = await getAccessToken();
  
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  
    const data = await response.json();
    return data.artists.items;
  };
  
export const fetchArtistDetail = async (artistId) => {
    const accessToken = await getAccessToken();
  
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  
    const data = await response.json();
    return {
      name: data.name,
      images: data.images,
      genres: data.genres,
      popularity: data.popularity,
      external_urls: data.external_urls,
      biography: data.biography, 
      followers: data.followers.total, 
    };
  };