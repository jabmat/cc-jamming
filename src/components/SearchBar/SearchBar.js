const SearchBar = () => {
	return (
		<>
			<div>
				<p>SearchBar:</p>
				<form>
					<label for="search-song">Search song: </label>
					<input type="search" id="search-song"></input>
					<button>Search</button>
				</form>
			</div>
		</>
	);
};

export default SearchBar;
