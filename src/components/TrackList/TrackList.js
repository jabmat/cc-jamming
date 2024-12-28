import React from 'react';
import Track from '../Track/Track';

const Tracklist = ({ tracks, onAdd, onRemove, canRemove }) => {
	return (
		<>
			<div className="track-list">
				{tracks.map((track) => {
					// const trackNumber = tracks.indexOf(track);
					return (
						<>
							<Track
								track={track}
								/*trackNumber={trackNumber}*/ key={track.id}
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
};

export default Tracklist;
