import React, { useCallback } from 'react';

const Track = ({ track, trackNumber, key, onAdd, onRemove, canRemove }) => {
	const addTrackIn = useCallback(
		(event) => {
			onAdd(track);
		},
		[onAdd, track]
	);

	const removeTrackIn = useCallback(
		(event) => {
			onRemove(track);
		},
		[onRemove, track]
	);

	const renderActionButton = () => {
		if (canRemove) {
			return (
				<button className="remove-button" onClick={removeTrackIn}>
					remove track from playlist
				</button>
			);
		}
		return (
			<button className="add-button" onClick={addTrackIn}>
				add track to playlist
			</button>
		);
	};

	return (
		<>
			<div className="track">
				<div className="track-info">
					<h4>
						{/*`0${trackNumber}`*/} {track.name} ({track.id})
					</h4>
					<ul>
						<li>name: {track.name} </li>
						<li>artist: {track.artist} </li>
						<li>album: {track.album} </li>
						<li>uri: {track.uri}</li>
					</ul>
				</div>
				{renderActionButton()}
			</div>
		</>
	);
};

export default Track;
