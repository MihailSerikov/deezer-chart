import React, { useReducer } from 'react';
import { Track } from '../../interfaces';
import { api, apiBaseUrl } from '../../utils/api';
import { Subtract } from 'utility-types';

export interface TrackList {
  data: Track[];
  total: number | null;
  next: string | null;
  prev: string | null;
}

interface ReducerState {
  tracklist: TrackList;
  isTracklistLoading: boolean;
}

interface ReducerRequestAction {
  type: 'TRACKS_LOAD / REQUEST';
}

interface ReducerSuccessFetchAction {
  type: 'TRACKS_LOAD / SUCCESS';
  payload: TrackList;
}

interface ReducerFailFetchAction {
  type: 'TRACKS_LOAD / FAIL';
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
  isTracklistLoading: true,
  error: null,
};

const reducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case 'TRACKS_LOAD / REQUEST':
      return {
        ...state,
        isTracklistLoading: true,
      };
    case 'TRACKS_LOAD / SUCCESS':
      return {
        ...state,
        tracklist: {
          ...action.payload,
          data: [...state.tracklist.data, ...(action.payload?.data as Track[])],
        },
        isTracklistLoading: false,
        error: null,
      };
    case 'TRACKS_LOAD / FAIL':
      return {
        ...state,
        isTracklistLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export interface withTrackListProps {
  tracklist: TrackList;
  isTracklistLoading: boolean;
  loadTrackList: (url: string) => void;
}

export const withTrackList = <P extends withTrackListProps>(
  WrappedComponent: React.FC<P>,
) => ({ ...props }: Subtract<P, withTrackListProps>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tracklist, isTracklistLoading } = state;

  const loadTrackList = async (url: string) => {
    const fixedUrl = url.replace(apiBaseUrl, '');

    dispatch({
      type: 'TRACKS_LOAD / REQUEST',
    });

    try {
      const { data } = await api.get(fixedUrl);

      dispatch({ type: 'TRACKS_LOAD / SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'TRACKS_LOAD / FAIL', payload: err });
    }
  };

  return (
    <WrappedComponent
      {...(props as P)}
      tracklist={tracklist}
      isTracklistLoading={isTracklistLoading}
      loadTrackList={loadTrackList}
    />
  );
};
