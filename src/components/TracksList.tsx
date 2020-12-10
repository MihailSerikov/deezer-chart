import React, { useEffect, useRef } from 'react';
import { FetchedInstance } from '../utils/api';
import { Track } from '../interfaces';
import { TrackCard } from './cards';
import m from '../styles/modules/carousel.module.scss';
import l from '../styles/layout/grid.module.scss';
import cx from 'classnames';

interface TracksListProps {
  title: string;
  tracks: FetchedInstance<Track>;
  isCarousel: boolean;
}

const TracksList: React.FC<TracksListProps> = ({
  title,
  tracks,
  isCarousel,
}) => {
  const carouselEl: React.Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isCarousel) {
      M.Carousel.init(carouselEl.current!, {
        dist: -30,
        padding: 60,
      });
    }
  }, [tracks, isCarousel]);

  return (
    <div>
      <h3 className="center-align">{title}</h3>
      <div
        ref={carouselEl}
        className={isCarousel ? cx(m.carousel, 'carousel') : l.cardsGrid}
      >
        {tracks.data.map(track =>
          isCarousel ? (
            <div key={track.id} className="carousel-item">
              <TrackCard track={track}></TrackCard>
            </div>
          ) : (
            <TrackCard track={track}></TrackCard>
          ),
        )}
      </div>
    </div>
  );
};

export default TracksList;
