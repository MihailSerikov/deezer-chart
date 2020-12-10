import React, { useRef, useState } from 'react';
import { Track } from '../interfaces';
import cx from 'classnames';

import s from '../styles/modules/track.module.scss';

interface TrackPreviewProps {
  track: Track;
}

export const TrackPreview: React.FC<TrackPreviewProps> = ({ track }) => {
  const trackPlayer: React.Ref<HTMLAudioElement> = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrackPreview = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? trackPlayer.current!.pause() : trackPlayer.current!.play();
  };

  return (
    <div className={s.trackPreview} onClick={handlePlayTrackPreview}>
      <span className={s.trackPreview__title}>{track.title}</span>
      <button className={cx(s.trackPreview__btn, 'btn-floating btn-small')}>
        <i className="material-icons right">
          {isPlaying ? 'pause' : 'play_arrow'}
        </i>
      </button>
      <audio hidden ref={trackPlayer} controls src={track.preview}></audio>
    </div>
  );
};
