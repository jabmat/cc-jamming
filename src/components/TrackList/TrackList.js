import React from 'react';
import Track from '../Track/Track';

const Tracklist = ({ tracks }) => {
	return (
		<>
			<div className="track-list">
				<h3>Tracklist</h3>
				<div className="track-list">
					{tracks.map((track) => {
						const trackNumber = tracks.indexOf(track);
						return <Track track={track} trackNumber={trackNumber} key={track.id} />;
					})}

					{/* <ul>
						<li>track-1:</li>
						<li>track-2:</li>
					</ul> */}
				</div>
			</div>
		</>
	);
};

export default Tracklist;
