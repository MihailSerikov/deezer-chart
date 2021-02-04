import { TrackList } from './types';

export enum TRACKLIST_API_ACTIONS {
  REQUEST = 'TRACKLIST_LOAD / REQUEST',
  SUCCESS = 'TRACKLIST_LOAD / SUCCESS',
  FAIL = 'TRACKLIST_LOAD / FAIL',
}
export interface RequestTracklistAction {
  type: TRACKLIST_API_ACTIONS.REQUEST;
}

export interface SuccessTracklistAction {
  type: TRACKLIST_API_ACTIONS.SUCCESS;
  payload: TrackList;
}

export interface FailTracklistAction {
  type: TRACKLIST_API_ACTIONS.FAIL;
  payload: Error;
}

export const startFetchTracklist = (): RequestTracklistAction => ({
  type: TRACKLIST_API_ACTIONS.REQUEST,
});

export const successFetchTracklist = (
  data: TrackList,
): SuccessTracklistAction => ({
  type: TRACKLIST_API_ACTIONS.SUCCESS,
  payload: data,
});

export const failFetchTracklist = (error: Error): FailTracklistAction => ({
  type: TRACKLIST_API_ACTIONS.FAIL,
  payload: error,
});
