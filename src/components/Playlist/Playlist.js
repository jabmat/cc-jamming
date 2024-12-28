import Tracklist from '../TrackList/TrackList';

const Playlist = ({ tracksPlaylist, namePlaylist, onRemove }) => {
	return (
		<>
			<div className="playlist">
				<h3>User playlists</h3>
				<h4>{namePlaylist}</h4>
				<Tracklist
					tracks={tracksPlaylist}
					onRemove={onRemove}
					canRemove={true}
				/>
			</div>
		</>
	);
};

export default Playlist;
