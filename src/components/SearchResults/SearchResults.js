import React from 'react';
import Tracklist from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';

import styles from './SearchResults.module.css'

const SearchResults = ({ searchResults, onAdd }) => {
	return (
		<>
			<div className={styles.searchResults}>
				<Tracklist tracks={searchResults} onAdd={onAdd} />
			</div>
		</>
	);
};

export default SearchResults;
