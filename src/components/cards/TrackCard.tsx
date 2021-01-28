import React from 'react';
import { Track } from '../../interfaces';
import { useAudioPlayer } from '../useAudioPlayer';

import s from './cards.module.scss';
import cx from 'classnames';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const [playing, toggleAudioPlayer] = useAudioPlayer(track.preview);

  return (
    <div className={cx(s.card, 'card sticky-action')}>
      <div className="card-image">
        <img src={track.album.cover} alt={track.title} />
        <button
          onClick={toggleAudioPlayer}
          className="btn-floating halfway-fab waves-effect waves-light"
        >
          <i className="material-icons right">
            {playing ? 'pause' : 'play_arrow'}
          </i>
        </button>
      </div>
      <div className="card-content">
        <h5 className="card-title grey-text text-darken-4">{track.title}</h5>
        <h6 className="card-subtitle">{track.artist.name}</h6>
        <p>{track.album.title}</p>
      </div>
      <div className="card-action">
        <a href={track.link} target="_blank" rel="noreferrer">
          Listen on Deezer
        </a>
      </div>
    </div>
  );
};
