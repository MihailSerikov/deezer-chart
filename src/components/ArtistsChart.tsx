import React, { useEffect, useRef } from 'react';
import { FetchedInstance } from '../utils/api';
import { Artist } from '../interfaces';
import ArtistCard from './cards/ArtistCard';
import m from '../styles/modules/carousel.module.scss';
import l from '../styles/layout/grid.module.scss';
import cx from 'classnames';

interface ArtistsChartProps {
  title: string;
  artists: FetchedInstance<Artist>;
  isCarousel: boolean;
}

export const ArtistsChart: React.FC<ArtistsChartProps> = ({
  title,
  artists,
  isCarousel,
}) => {
  const carouselEl: React.Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isCarousel && carouselEl) {
      M.Carousel.init(carouselEl.current!, {
        dist: -30,
        padding: 60,
      });
    }
  }, [artists, isCarousel]);

  return (
    <div>
      <h3 className="center-align">{title}</h3>
      <div
        ref={carouselEl}
        className={isCarousel ? cx(m.carousel, 'carousel') : l.cardsGrid}
      >
        {artists.data.map(artist =>
          isCarousel ? (
            <div key={artist.id} className="carousel-item">
              <ArtistCard artist={artist}></ArtistCard>
            </div>
          ) : (
            <ArtistCard artist={artist}></ArtistCard>
          ),
        )}
      </div>
    </div>
  );
};
