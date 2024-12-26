import { useState } from 'react';
import Tracklist from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';

const SearchResults = ({ searchResults }) => {
	return (
		<>
			<div>
				<h2>Search Results</h2>
				<Tracklist tracks={searchResults} />
			</div>
		</>
	);
};

export default SearchResults;
