import { getAccessToken } from "../helpers/auth";

export const fetchRandomTracks = async () => {
  const accessToken = await getAccessToken();
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  const tracks = data.items.map((artist) => {
    return {
      id: artist.id,
      name: artist.name,
      artists: artist.artists,
      preview_url: artist.images[0]?.url || '',
    };
  });
  
  return tracks;
};
