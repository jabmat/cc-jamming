import React, { useCallback, useState } from 'react';

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
			<div className="searchbar">
				<p>SearchBar:</p>
				<input
					id="search-placeholder"
					placeholder="Song, Buddy?"
					onChange={handleQueryTyping}
				/>
				<button className="search-button" onClick={handleSearch}>
					Search
				</button>
			</div>
		</>
	);
};

export default SearchBar;
