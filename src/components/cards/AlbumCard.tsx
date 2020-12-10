import React, { useReducer, useRef } from 'react';
import { Album, Track } from '../../interfaces';
import cx from 'classnames';
import s from './cards.module.scss';
import { api, apiBaseUrl } from '../../utils/api';
import { AlbumTrackList } from '../AlbumTrackList';
import _ from 'lodash';

interface AlbumCardProps {
  album: Album;
}

interface TrackList {
  data: Track[];
  total: number | null;
  next: string | null;
  prev: string | null;
}

interface ReducerState {
  tracklist: TrackList;
  isLoading: boolean;
}

interface ReducerRequestAction {
  type: 'ALBUM_TRACKS_LOAD / REQUEST';
}

interface ReducerSuccessFetchAction {
  type: 'ALBUM_TRACKS_LOAD / SUCCESS';
  payload: TrackList;
}

interface ReducerFailFetchAction {
  type: 'ALBUM_TRACKS_LOAD / FAIL';
  payload: Error;
}

type Action =
  | ReducerRequestAction
  | ReducerSuccessFetchAction
  | ReducerFailFetchAction;

const initialState = {
  tracklist: {
    data: [],
    total: null,
    next: null,
    prev: null,
  },
  isLoading: true,
  error: null,
};

const reducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case 'ALBUM_TRACKS_LOAD / REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'ALBUM_TRACKS_LOAD / SUCCESS':
      return {
        ...state,
        tracklist: {
          ...action.payload,
          data: [...state.tracklist.data, ...(action.payload?.data as Track[])],
        },
        isLoading: false,
        error: null,
      };
    case 'ALBUM_TRACKS_LOAD / FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const cardRevealRef: React.Ref<HTMLDivElement> = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tracklist, isLoading } = state;

  const loadTrackList = async (url: string) => {
    const fixedUrl = url.replace(apiBaseUrl, '');

    dispatch({
      type: 'ALBUM_TRACKS_LOAD / REQUEST',
    });

    try {
      const { data } = await api.get(fixedUrl);

      dispatch({ type: 'ALBUM_TRACKS_LOAD / SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'ALBUM_TRACKS_LOAD / FAIL', payload: err });
    }
  };

  const handleTrackListLoad = (tracklistUrl: string) => {
    if (!tracklist.data.length) {
      loadTrackList(tracklistUrl);
    }
  };

  const handleInfiniteScroll = _.debounce(() => {
    let scrollTop = cardRevealRef.current!.scrollTop;
    let scrollHeight =
      cardRevealRef.current!.scrollHeight - cardRevealRef.current!.clientHeight;

    if (scrollTop === scrollHeight && tracklist.next && !isLoading) {
      loadTrackList(tracklist.next);
    }
  }, 200);

  return (
    <div className={cx(s.card, 'card sticky-action')}>
      <div className="card-image">
        <img src={album.cover} alt={album.title} />
        <button
          onClick={() => handleTrackListLoad(album.tracklist)}
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
        <AlbumTrackList isLoading={isLoading} tracklist={tracklist.data} />
      </div>
      <div className="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
  );
};
