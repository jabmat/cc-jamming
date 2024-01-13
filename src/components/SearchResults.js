import Track from './Track';
import Tracklist from './Tracklist';
import Playlist from './Playlist';

const SearchResults = () => {
    return (
        <>
            <div>
                <p>SearchResults:</p>
                <Track />
                <Tracklist />
                <Playlist />
                <button>Save to Spotify</button>
            </div>
        </>
    )
}

export default SearchResults