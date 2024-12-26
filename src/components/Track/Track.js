import React from 'react';

const Track = ({ track, trackNumber, key }) => {
	return (
		<>
			<div class="track">
				<div class="track-info">
					<h4>
						{`0${trackNumber}`} {track.name} ({track.id})
					</h4>
					<ul>
						<li>name: {track.name} </li>
						<li>artist: {track.artist} </li>
						<li>album: {track.album} </li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Track;
