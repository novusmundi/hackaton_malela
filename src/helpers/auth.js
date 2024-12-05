
const CLIENT_ID = '2e54253dfccb4890aee014b0ffac6e88'; 
const CLIENT_SECRET = 'd1b52aa654d54895984156c1d3a988c4';  


export const getAccessToken = async () => {
    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedAuth = btoa(authString);  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
  };