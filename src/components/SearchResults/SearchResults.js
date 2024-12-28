import { useState } from 'react';
import Tracklist from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';

const SearchResults = ({ searchResults, onAdd }) => {
	return (
		<>
			<div>
				<h2>Search Results</h2>
				<h3>Tracklist</h3>
				<Tracklist tracks={searchResults} onAdd={onAdd} />
			</div>
		</>
	);
};

export default SearchResults;
