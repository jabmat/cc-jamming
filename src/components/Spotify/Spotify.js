const clientId = '9a827a8c9e9c473fa9e190683328b77a';
const redirectUri = 'http://localhost:3000/';
let accessToken;

// const { Buffer } = require('node:buffer');
// import { stringToBase64 } from 'uint8array-extras';

const Spotify = {
	// logic after pressing 'log in' button (redirecting user to spotify login page & then to redirect_uri)
	getAuth() {
		const tokenURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		window.location = tokenURL;
	},

	// checking URL on page load
	checkAuth() {
		const authenticated = window.location.href.match(/access_token=([^&]*)/);
		if (authenticated) {
			accessToken = authenticated[1];
			return true;
		} else {
			return false;
		}
	},
	async getUserName() {
		try {
			const response = await fetch('https://api.spotify.com/v1/me', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (response.ok) {
				const jsonResponse = await response.json();
				const userName = jsonResponse.display_name;
				return userName;
			} else {
				throw new Error(`Couldn't fetch user name!`);
			}
		} catch (error) {
			console.log(error);
		}
	},
	// to do - GET for access token
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},
	// async getAccessToken() {
	// 	try {
	// 		const response = await fetch('https://accounts.spotify.com/api/token', {
	// 			method: 'POST',
	// 			body: new URLSearchParams({
	// 				grant_type: 'client_credentials',
	// 			}),
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 				Authorization: `Basic ${Uint8Array.from(
	// 					clientId + ':' + clientSecret
	// 				).toString('base64')}`,
	// 			},
	// 		});
	// 		if (response.ok) {
	// 			const jsonResponse = await response.json();
	// 			// code to execute using jsonResponse
	// 			return jsonResponse;
	// 		}
	// 		throw new Error('Request failed!');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },

	async search(query) {
		const accessToken = this.getAccessToken();
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/search?type=track&q=${query}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (response.ok) {
				// console.log(response);
				const jsonResponse = await response.json();
				if (!jsonResponse.tracks) {
					return [];
				}
				// console.log(jsonResponse);
				// return jsonResponse;
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			}
			throw new Error('Request failed!');
		} catch (error) {
			console.log(error);
		}
	},

	// search(term) {
	// 	const accessToken = Spotify.getAccessToken();
	// 	return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 	})
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((jsonResponse) => {
	// 			if (!jsonResponse.tracks) {
	// 				return [];
	// 			}
	// 			return jsonResponse.tracks.items.map((track) => ({
	// 				id: track.id,
	// 				name: track.name,
	// 				artist: track.artists[0].name,
	// 				album: track.album.name,
	// 				uri: track.uri,
	// 			}));
	// 		});
	// },

	async savePlaylist(name, trackUris) {
		const accessToken = this.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;
		try {
			const isId = await fetch('https://api.spotify.com/v1/me', {
				headers: headers,
			});
			if (isId.ok) {
				const jsonIsId = await isId.json();
				userId = jsonIsId.id;
				console.log(userId);
				const isPlaylist = await fetch(
					`https://api.spotify.com/v1/users/${userId}/playlists`,
					{
						headers: headers,
						method: 'POST',
						body: JSON.stringify({ name: name }),
					}
				);
				const jsonIsPlaylist = await isPlaylist.json();
				const playlistId = jsonIsPlaylist.id;
				await fetch(
					`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
					{
						headers: headers,
						method: 'POST',
						body: JSON.stringify({ uris: trackUris }),
					}
				);
			} else {
				throw new Error('Request user ID failed!');
			}
		} catch (error) {
			console.log(error);
		}
	},
	// async savePlaylist() {
	// 	try {
	// 		const response = await fetch('', {});
	// 		if (response.ok) {
	// 			const jsonResponse = response.json();
	// 			//
	// 		}
	// 		throw Error('Request failed!');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },
};

export default Spotify;
