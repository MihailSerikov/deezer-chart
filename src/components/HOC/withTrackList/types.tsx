import { Track } from '../../../interfaces';

import {
  FailTracklistAction,
  RequestTracklistAction,
  SuccessTracklistAction,
} from './actions';

export interface TrackList {
  data: Track[];
  total: number | null;
  next: string | null;
  prev: string | null;
}

export type FetchTracklistAction =
  | RequestTracklistAction
  | SuccessTracklistAction
  | FailTracklistAction;

export type TracklistAction = FetchTracklistAction;
