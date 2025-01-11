import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../Spotify/Spotify';

const App = () => {
	// const initialStateSearchResults = [
	// 	{
	// 		name: 'odezwa',
	// 		artist: 'into dark',
	// 		album: 'i, glance',
	// 		id: '16',
	// 		uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6',
	// 	},
	// 	{
	// 		name: 'serce krwawe',
	// 		artist: 'runopatia',
	// 		album: 'archaistia',
	// 		id: '17',
	// 		uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6',
	// 	},
	// ];

	const [searchResults, setSearchResults] = useState([]);
	const [namePlaylist, setNamePlaylist] = useState('(name your playlist)');
	const [tracksPlaylist, setTracksPlaylist] = useState([]);
	const [logged, setLogged] = useState(false);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const authenticated = Spotify.checkAuth();
		if (authenticated) {
			setLogged(authenticated);
			Spotify.getUserName().then(setUserName);
		} else {
			console.log(`Sorry, couldn't log you in!!`);
		}
	}, []);

	const logInHandler = useCallback(() => {
		Spotify.getAuth();
		// setLogged(true);
	}, [logged]);

	const updateSearchResults = useCallback((query) => {
		Spotify.search(query).then(setSearchResults);
	}, []);
	// // to do - handle change results
	// const handleUpdateSearchResults = () => {};

	// CHECK THIS
	// const checkSearchResults = useCallback(() => console.log(searchResults), []);
	// checkSearchResults();

	const addTrackToPlaylist = useCallback(
		(track) => {
			if (tracksPlaylist.some((trackObject) => trackObject.id === track.id))
				return;
			setTracksPlaylist((prevTracksPlaylist) => [...prevTracksPlaylist, track]);
		},
		[tracksPlaylist]
	);

	const removeTrackFromPlaylist = useCallback((track) => {
		setTracksPlaylist((prevTracksPlaylist) =>
			prevTracksPlaylist.filter((trackObject) => trackObject.id !== track.id)
		);
	}, []);

	const changePlaylistName = useCallback((newPlaylistName) => {
		setNamePlaylist(newPlaylistName);
	}, []);

	// TO DO - save playlist to spotify feature
	const savePlaylist = useCallback(() => {
		const playlistTracksUris = tracksPlaylist.map((track) => track.uri);
		Spotify.savePlaylist(namePlaylist, playlistTracksUris).then(() => {
			setNamePlaylist('Name your new playlist');
			setTracksPlaylist([]);
		});
	}, [namePlaylist, tracksPlaylist]);

	// log in logic?
	if (!logged) {
		return (
			<div className="log-wrapper">
				<button onClick={logInHandler}>Log in to Spotify</button>
			</div>
		);
	} else {
		return (
			<div className="App">
				{/* <header className="App-header">
      </header> */}
				<h1>Howdy {userName}!</h1>
				<SearchBar updateSearchResults={updateSearchResults} />
				<SearchResults
					searchResults={searchResults}
					onAdd={addTrackToPlaylist}
				/>
				<Playlist
					tracksPlaylist={tracksPlaylist}
					namePlaylist={namePlaylist}
					onChangePlaylistName={changePlaylistName}
					onRemove={removeTrackFromPlaylist}
					onSave={savePlaylist}
				/>
			</div>
		);
	}

	return (
		<div className="App">
			{/* <header className="App-header">
      </header> */}
			<SearchBar updateSearchResults={updateSearchResults} />
			<SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
			<Playlist
				tracksPlaylist={tracksPlaylist}
				namePlaylist={namePlaylist}
				onChangePlaylistName={changePlaylistName}
				onRemove={removeTrackFromPlaylist}
				onSave={savePlaylist}
			/>
		</div>
	);
};

export default App;
