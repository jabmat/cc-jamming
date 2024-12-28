const SearchBar = ({ updateSearchResults }) => {
	return (
		<>
			<div className="searchbar">
				<p>SearchBar:</p>
				<form>
					<label for="search-song">Search song: </label>
					<input type="search" id="search-song"></input>
					<button onClick={updateSearchResults}>Search</button>
				</form>
			</div>
		</>
	);
};

export default SearchBar;
