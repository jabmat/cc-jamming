import React, { useCallback, useState } from 'react';

import styles from './SearchBar.module.css';

const SearchBar = ({ updateSearchResults }) => {
	const [query, setQuery] = useState('initial empty');

	const handleQueryTyping = useCallback((event) => {
		let value = event.target.value;
		// console.log(value);
		setQuery(value);
		// console.log(query);
	}, []);

	const handleSearch = useCallback(() => {
		updateSearchResults(query);
	}, [updateSearchResults, query]);

	// console.log(query);

	return (
		<>
			<div className={styles.searchbar}>
				<input
					id="search-placeholder"
					placeholder="Song, Buddy?"
					onChange={handleQueryTyping}
				/>
				<button className={styles.searchButton} onClick={handleSearch}>
					Search
				</button>
			</div>
		</>
	);
};

export default SearchBar;
