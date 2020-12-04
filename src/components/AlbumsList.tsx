import React, { useEffect, useRef } from 'react';
import { FetchedInstance } from '../utils/api';
import { Album } from '../interfaces';
import { AlbumCard } from './cards';
import m from '../styles/modules/carousel.module.scss';
import l from '../styles/layout/grid.module.scss';
import cx from 'classnames';

interface AlbumsListProps {
  title: string;
  albums: FetchedInstance<Album>;
  isCarousel: boolean;
}

const AlbumsList: React.FC<AlbumsListProps> = ({
  title,
  albums,
  isCarousel,
}) => {
  const carouselEl: any = useRef();

  useEffect(() => {
    if (isCarousel) {
      M.Carousel.init(carouselEl.current, {
        dist: -30,
        padding: 60,
      });
    }
  }, [albums, isCarousel]);

  return (
    <div>
      <h3 className="center-align">{title}</h3>
      <div
        ref={carouselEl}
        className={isCarousel ? cx(m.carousel, 'carousel') : l.cardsGrid}
      >
        {albums.data.map(album =>
          isCarousel ? (
            <div key={album.id} className="carousel-item">
              <AlbumCard album={album}></AlbumCard>
            </div>
          ) : (
            <AlbumCard album={album}></AlbumCard>
          ),
        )}
      </div>
    </div>
  );
};

export default AlbumsList;
