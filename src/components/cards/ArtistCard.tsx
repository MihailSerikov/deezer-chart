import React, { useRef } from 'react';
import { Artist } from '../../interfaces';
import { withTrackList, withTrackListProps } from '../HOC/withTrackList';
import _ from 'lodash';

import cx from 'classnames';
import s from './cards.module.scss';
import { TrackList } from '../TrackList';

interface ArtistCardProps extends withTrackListProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  tracklist,
  isTracklistLoading,
  loadTrackList,
}) => {
  const cardRevealRef: React.Ref<HTMLDivElement> = useRef(null);

  const handleTrackListLoad = () => {
    if (!tracklist.data.length) {
      loadTrackList(artist.tracklist);
    }
  };

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
        <img src={artist.picture} alt={artist.picture} />
        <button
          onClick={handleTrackListLoad}
          className="activator btn-floating halfway-fab waves-effect waves-light red"
        >
          <i className="material-icons">more_horiz</i>
        </button>
      </div>
      <div className="card-content">
        <h5 className="card-title grey-text text-darken-4">{artist.name}</h5>
      </div>
      <div
        className="card-reveal"
        ref={cardRevealRef}
        onScroll={handleInfiniteScroll}
      >
        <span className="card-title grey-text text-darken-4">
          <i className="material-icons right">close</i>
        </span>
        <TrackList isLoading={isTracklistLoading} tracklist={tracklist.data} />
      </div>
      <div className="card-action">
        <a href={artist.link} target="_blank" rel="noreferrer">
          Listen on Deezer
        </a>
      </div>
    </div>
  );
};

export default withTrackList(ArtistCard);
