import React, { useCallback, useState } from 'react';
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

	// const newSearchResults = [
	// 	{
	// 		name: 'odezwa2',
	// 		artist: 'into dark',
	// 		album: 'i, glance',
	// 		id: '16',
	// 	},
	// 	{
	// 		name: 'serce krwawe2',
	// 		artist: 'runopatia',
	// 		album: 'archaistia',
	// 		id: '17',
	// 	},
	// ];
	// test
	// Spotify.getAccessTokenIG();

	// TO DO - naprawić to gówno
	const updateSearchResults = useCallback((query) => {
		// const searchResults = Spotify.search(query);
		// console.log(searchResults);
		// setSearchResults(searchResults);

		// .then
		Spotify.search(query).then(setSearchResults);

		// weird
		// console.log(searchResults);
		// Spotify.search(query).then((results) => {
		// 	searchResults(results);
		// });
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
	// const savePlaylist = useCallback(() => {
	// 	const playlistTracksUris = tracksPlaylist.map((track) => track.uri);
	// }, []);

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
				/*onSave={savePlaylist}*/
			/>
		</div>
	);
};

export default App;
