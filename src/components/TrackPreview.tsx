import React from 'react';
import { Track } from '../interfaces';
import cx from 'classnames';
import { useAudioPlayer } from './useAudioPlayer';

import s from '../styles/modules/track.module.scss';

interface TrackPreviewProps {
  track: Track;
}

export const TrackPreview: React.FC<TrackPreviewProps> = ({ track }) => {
  const [playing, toggleAudioPlayer] = useAudioPlayer(track.preview);

  return (
    <div className={s.trackPreview} onClick={toggleAudioPlayer}>
      <span className={s.trackPreview__title}>{track.title}</span>
      <button className={cx(s.trackPreview__btn, 'btn-floating btn-small')}>
        <i className="material-icons right">
          {playing ? 'pause' : 'play_arrow'}
        </i>
      </button>
    </div>
  );
};
