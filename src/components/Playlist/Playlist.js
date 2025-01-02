import React, { useCallback } from 'react';
import Tracklist from '../TrackList/TrackList';

const Playlist = ({
	tracksPlaylist,
	namePlaylist,
	onRemove,
	onChangePlaylistName,
}) => {
	const handleChangePlaylistName = useCallback(
		(event) => {
			onChangePlaylistName(event.target.value);
		},
		[onChangePlaylistName]
	);
	return (
		<>
			<div className="playlist">
				<h3>User playlists</h3>
				{/* <label for="playlistTitle">Test </label> */}
				<input
					type="text"
					id="playlistName"
					name="playlistName"
					onChange={handleChangePlaylistName}
					defaultValue={'Name your playlist'}
				/>
				<h4>Playlist - {namePlaylist}</h4>
				<h4>Tracklist:</h4>
				<Tracklist
					tracks={tracksPlaylist}
					canRemove={true}
					onRemove={onRemove}
				/>
				<button className="playlist-save-button">
					save '{namePlaylist}' playlist to your spotify account
				</button>
			</div>
		</>
	);
};

export default Playlist;
