import React, { useRef } from 'react';
import { Album } from '../../interfaces';
import cx from 'classnames';
import s from './cards.module.scss';
import { AlbumTrackList } from '../AlbumTrackList';
import _ from 'lodash';
import { withTrackList, withTrackListProps } from '../HOC/withTrackList';

interface AlbumCardProps extends withTrackListProps {
  album: Album;
}

const AlbumCard = ({
  album,
  tracklist,
  isTracklistLoading,
  loadTrackList,
}: AlbumCardProps) => {
  const cardRevealRef: React.Ref<HTMLDivElement> = useRef(null);

  const handleInfiniteScroll = _.debounce(() => {
    let scrollTop = cardRevealRef.current!.scrollTop;
    let scrollHeight =
      cardRevealRef.current!.scrollHeight - cardRevealRef.current!.clientHeight;

    if (scrollTop === scrollHeight && tracklist.next && !isTracklistLoading) {
      loadTrackList(tracklist.next);
    }
  }, 200);

  return (
    <div className={cx(s.card, 'card sticky-action')}>
      <div className="card-image">
        <img src={album.cover} alt={album.title} />
        <button
          onClick={() => loadTrackList(album.tracklist)}
          className="activator btn-floating halfway-fab waves-effect waves-light red"
        >
          <i className="material-icons">more_horiz</i>
        </button>
      </div>
      <div className="card-content">
        <h5 className="card-title grey-text text-darken-4">{album.title}</h5>
      </div>
      <div
        className="card-reveal"
        ref={cardRevealRef}
        onScroll={handleInfiniteScroll}
      >
        <span className="card-title grey-text text-darken-4">
          <i className="material-icons right">close</i>
        </span>
        <AlbumTrackList
          isLoading={isTracklistLoading}
          tracklist={tracklist.data}
        />
      </div>
      <div className="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
  );
};

export default withTrackList(AlbumCard);
