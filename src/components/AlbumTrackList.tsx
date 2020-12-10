import React from 'react';
import { Track } from '../interfaces';

import s from '../styles/modules/track.module.scss';
import { Preloader } from './Preloader';
import { TrackPreview } from './TrackPreview';

interface AlbumTrackListProps {
  isLoading: boolean;
  tracklist: Track[];
}

export const AlbumTrackList: React.FC<AlbumTrackListProps> = ({
  isLoading,
  tracklist,
}) => {
  return (
    <>
      <span className="card-title grey-text text-darken-4">Tracklist:</span>
      <ol className={s.trackList}>
        {tracklist.map(track => (
          <li className={s.trackList__item} key={track.id}>
            <TrackPreview track={track} />
          </li>
        ))}
      </ol>
      {isLoading && <Preloader type="big" isActive={isLoading} />}
    </>
  );
};
