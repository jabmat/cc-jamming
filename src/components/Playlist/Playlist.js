import React, { useCallback } from 'react';
import Tracklist from '../TrackList/TrackList';

import styles from './Playlist.module.css';

const Playlist = ({
	tracksPlaylist,
	namePlaylist,
	onRemove,
	onChangePlaylistName,
	onSave,
	userName,
}) => {
	const handleChangePlaylistName = useCallback(
		(event) => {
			onChangePlaylistName(event.target.value);
		},
		[onChangePlaylistName]
	);

	return (
		<>
			<div className={styles.playlist}>
				{/* <label for="playlistTitle">Test </label> */}
				{/* <span>Playlist name:</span> */}
				{/* <h4>{namePlaylist}</h4> */}
				<Tracklist
					tracks={tracksPlaylist}
					canRemove={true}
					onRemove={onRemove}
				/>
				<div className={styles.saveWrapper}>
					<input
						type="text"
						id="playlistName"
						name="playlistName"
						onChange={handleChangePlaylistName}
						// defaultValue={'Name your playlist'}
						placeholder="Name playlist, Buddy?"
					/>
					<button className="playlist-save-button" onClick={onSave}>
						save '{namePlaylist}' as playlist
					</button>
				</div>
				<span className={styles.playlistInfo}>
					How to: search for tracks, add to playlist, then name it and save
					directly to you spotify account, {userName}! &#128521;
				</span>
			</div>
		</>
	);
};

export default Playlist;
