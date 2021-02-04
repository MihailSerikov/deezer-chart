import { TRACKLIST_API_ACTIONS } from './actions';
import { TrackList, TracklistAction } from './types';

interface ReducerState {
  tracklist: TrackList;
  isTracklistLoading: boolean;
}

export const initialState = {
  tracklist: {
    data: [],
    total: null,
    next: null,
    prev: null,
  },
  isTracklistLoading: true,
  error: null,
};

export const reducer = (state: ReducerState, action: TracklistAction) => {
  switch (action.type) {
    case TRACKLIST_API_ACTIONS.REQUEST:
      return {
        ...state,
        isTracklistLoading: true,
      };
    case TRACKLIST_API_ACTIONS.SUCCESS:
      return {
        ...state,
        tracklist: {
          ...action.payload,
          data: [...state.tracklist.data, ...action.payload.data],
        },
        isTracklistLoading: false,
        error: null,
      };
    case TRACKLIST_API_ACTIONS.FAIL:
      return {
        ...state,
        isTracklistLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
