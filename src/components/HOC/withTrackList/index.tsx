import React, { useReducer } from 'react';
import { api, apiBaseUrl } from '../../../utils/api';
import { TrackList } from './types';
import {
  startFetchTracklist,
  successFetchTracklist,
  failFetchTracklist,
} from './actions';
import { Subtract } from 'utility-types';
import { reducer, initialState } from './reducers';

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

    dispatch(startFetchTracklist());

    try {
      const { data } = await api.get(fixedUrl);

      dispatch(successFetchTracklist(data));
    } catch (err) {
      dispatch(failFetchTracklist(err));
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
