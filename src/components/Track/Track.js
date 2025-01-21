import React, { useCallback } from 'react';

import styles from './Track.module.css';

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
				<button className={styles.actionButton} onClick={removeTrackIn}>
					-
				</button>
			);
		}
		return (
			<button className={styles.actionButton} onClick={addTrackIn}>
				+
			</button>
		);
	};

	return (
		<>
			<div className={styles.track}>
				<div className={styles.trackInfo}>
					<span className={styles.trackName}>{track.name} </span>
					<div className={styles.trackDetails}>
						<span className={styles.trackArtist}>{track.artist} </span>
						<span className={styles.trackAlbum}>{track.album} </span>
					</div>
					<span className={styles.trackYear}>{track.year}</span>
				</div>
				{renderActionButton()}
			</div>
		</>
	);
};

export default Track;
