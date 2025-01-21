import React from 'react';
import Track from '../Track/Track';

import styles from './TrackList.module.css'

const Tracklist = ({ tracks, onAdd, onRemove, canRemove }) => {
	if (!tracks || !Array.isArray(tracks)) {
		return <div className={styles.trackList}>Results not available.</div>;
	} else {
		return (
			<>
				<div className={styles.trackList}>
					{tracks.map((track) => {
						// const trackNumber = tracks.indexOf(track);
						// console.log(track);
						return (
							<>
								<Track
									track={track}
									key={track.id}
									onAdd={onAdd}
									onRemove={onRemove}
									canRemove={canRemove}
								/>
							</>
						);
					})}

					{/* <ul>
						<li>track-1:</li>
						<li>track-2:</li>
					</ul> */}
				</div>
			</>
		);
	}

	// return (
	// 	<>
	// 		<div className="track-list">
	// 			{tracks.map((track) => {
	// 				// const trackNumber = tracks.indexOf(track);
	// 				return (
	// 					<>
	// 						<Track
	// 							track={track}
	// 							key={track.id}
	// 							onAdd={onAdd}
	// 							onRemove={onRemove}
	// 							canRemove={canRemove}
	// 						/>
	// 					</>
	// 				);
	// 			})}

	// 			{/* <ul>
	// 					<li>track-1:</li>
	// 					<li>track-2:</li>
	// 				</ul> */}
	// 		</div>
	// 	</>
	// );
};

export default Tracklist;
