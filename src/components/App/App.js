import React, { useCallback, useEffect, useState } from 'react';

import styles from './App.module.css';

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
	const [namePlaylist, setNamePlaylist] = useState('');
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

	const savePlaylist = useCallback(() => {
		const playlistTracksUris = tracksPlaylist.map((track) => track.uri);
		Spotify.savePlaylist(namePlaylist, playlistTracksUris).then(() => {
			setNamePlaylist('');
			setTracksPlaylist([]);
		});
	}, [namePlaylist, tracksPlaylist]);

	// log in logic - condtional rendering INSIGE return - fix?
	// return (
	// 	<main className={styles.app}>
	// 		<h1>Jamming</h1>
	// 		<>{if () {} else {}}</>
	// 		<footer>by INKN Software</footer>
	// 	</main>
	// )

	// log in logic?
	if (!logged) {
		return (
			<div className={styles.app}>
				<header>
					<a href="" className={styles.home}>
						<h1>Songstellar</h1>
					</a>
				</header>
				<main className={styles.logWrapper}>
					<button className={styles.logInButton} onClick={logInHandler}>
						Log in to Spotify
					</button>
				</main>
				<footer>
					<div className={styles.creditsWrapper}>
						<a href="https://github.com/jabmat" target="_blank">
							github.com/jabmat
						</a>
						<span className={styles.rights}>
							<a href="https://inkn.pl/" target="_blank">
								INKN Software{' '}
							</a>
							&copy;{new Date().getFullYear()}
						</span>
					</div>
				</footer>
			</div>
		);
	} else {
		return (
			<div className={styles.app}>
				<header>
					<a href="" className={styles.home}>
						<h1>Songstellar</h1>
					</a>
				</header>
				<main>
					<h2>Spotify's Tracks Searcher</h2>
					<span className={styles.greetings}>Howdy, {userName}!</span>
					<SearchBar updateSearchResults={updateSearchResults} />
					<div className={styles.resultsWrapper}>
						<section className={styles.results}>
							<h3>Search Results</h3>
							<SearchResults
								searchResults={searchResults}
								onAdd={addTrackToPlaylist}
							/>
						</section>
						<section className={styles.playlist}>
							<h3>Create Playlist</h3>
							<Playlist
								tracksPlaylist={tracksPlaylist}
								namePlaylist={namePlaylist}
								onChangePlaylistName={changePlaylistName}
								onRemove={removeTrackFromPlaylist}
								onSave={savePlaylist}
								userName={userName}
							/>
						</section>
					</div>
				</main>
				<footer>
					<div className={styles.creditsWrapper}>
						<a href="https://github.com/jabmat" target="_blank">
							github.com/jabmat
						</a>
						<span className={styles.rights}>
							<a href="https://inkn.pl/" target="_blank">
								INKN Software{' '}
							</a>
							&copy;{new Date().getFullYear()}
						</span>
					</div>
				</footer>
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
