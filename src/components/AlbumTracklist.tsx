import React from 'react';
import { Track } from '../interfaces';

import s from './cards/cards.module.scss';
import { Preloader } from './Preloader';

interface AlbumTracklistProps {
  isLoading: boolean;
  tracklist: Track[];
}

export const AlbumTracklist: React.FC<AlbumTracklistProps> = ({
  isLoading,
  tracklist,
}) => {
  return (
    <>
      <span className="card-title grey-text text-darken-4">Tracklist:</span>
      <ol className={s.tracklist}>
        {tracklist.map(track => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ol>
      {isLoading && <Preloader type="big" isActive={isLoading} />}
    </>
  );
};
