import './App.css';
import './components/SearchBar'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Track from './components/Track';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <SearchBar />
      <SearchResults />

    </div>
  );
}

export default App;
