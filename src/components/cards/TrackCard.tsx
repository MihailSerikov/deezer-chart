import React from 'react';
import { Track } from '../../interfaces';
import cx from 'classnames';
import s from './cards.module.scss';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <div className={cx(s.card, 'card sticky-action')}>
      <div className="card-image">
        <img src={track.album.cover} alt={track.title} />
        <button className="activator btn-floating halfway-fab waves-effect waves-light red">
          <i className="material-icons">more_horiz</i>
        </button>
      </div>
      <div className="card-content">
        <h5 className="card-title grey-text text-darken-4">{track.title}</h5>
        <h6 className="card-subtitle">{track.artist.name}</h6>
        <p>{track.album.title}</p>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          Card Title<i className="material-icons right">close</i>
        </span>
        <p>
          Here is some more information about this product that is only revealed
          once clicked on.
        </p>
      </div>
      <div className="card-action">
        <a href={track.link} target="_blank" rel="noreferrer">
          Listen on Deezer
        </a>
      </div>
    </div>
  );
};
