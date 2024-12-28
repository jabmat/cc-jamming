import { useCallback, useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
	const initialStateSearchResults = [
		{
			name: 'odezwa',
			artist: 'into dark',
			album: 'i, glance',
			id: '16',
		},
		{
			name: 'serce krwawe',
			artist: 'runopatia',
			album: 'archaistia',
			id: '17',
		},
	];

	const initialStateTracksPlaylist = [
		{
			name: 'odezwa',
			artist: 'into dark',
			album: 'i, glance',
			id: '16',
		},
	];

	const [searchResults, setSearchResults] = useState(initialStateSearchResults);
	const [namePlaylist, setNamePlaylist] = useState('Playlist #1: Black Metal');
	const [tracksPlaylist, setTracksPlaylist] = useState(
		initialStateTracksPlaylist
	);

	// const searchResults = [
	// 	{
	// 		name: 'odezwa',
	// 		artist: 'into dark',
	// 		album: 'i, glance',
	// 		id: '16',
	// 	},
	// 	{
	// 		name: 'serce krwawe',
	// 		artist: 'runopatia',
	// 		album: 'archaistia',
	// 		id: '17',
	// 	},
	// ];

	const newSearchResults = [
		{
			name: 'odezwa2',
			artist: 'into dark',
			album: 'i, glance',
			id: '16',
		},
		{
			name: 'serce krwawe2',
			artist: 'runopatia',
			album: 'archaistia',
			id: '17',
		},
	];

	const updateSearchResults = () =>
		setSearchResults((currentSearchResults) => newSearchResults);
	// to do - handle change results
	const handleUpdateSearchResults = () => {};

	// to do - toggle songs (add/remove from playlists)
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

	// const updateSearchResults = useCallback((resultsArray) => {
	// 	setSearchResults(resultsArray);
	// }, []);
	// updateSearchResults(newSearchResults);

	return (
		<div className="App">
			{/* <header className="App-header">
      </header> */}
			<SearchBar updateSearchResults={updateSearchResults} />
			<SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
			<Playlist
				tracksPlaylist={tracksPlaylist}
				namePlaylist={namePlaylist}
				onRemove={removeTrackFromPlaylist}
			/>
		</div>
	);
}

export default App;
