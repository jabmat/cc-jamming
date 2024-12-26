import { useCallback, useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
	const initialState = [
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

	const [searchResults, setSearchResults] = useState(initialState);

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

	// const updateSearchResults = useCallback((resultsArray) => {
	// 	setSearchResults(resultsArray);
	// }, []);
	// updateSearchResults(newSearchResults);

	return (
		<div className="App">
			{/* <header className="App-header">
      </header> */}
			<SearchBar />
			<SearchResults searchResults={searchResults} />
			<Playlist />
		</div>
	);
}

export default App;
