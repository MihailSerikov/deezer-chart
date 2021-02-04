import { Album, Artist, Playlist, Track } from '../../interfaces';
import { Podcast } from '../../interfaces/Podcast';
import { FetchedInstance } from '../../utils/api';
import {
  ErrorChartAction,
  RequestChartAction,
  SuccessChartAction,
} from './actions';

export interface Chart {
  tracks?: FetchedInstance<Track>;
  albums?: FetchedInstance<Album>;
  artists?: FetchedInstance<Artist>;
  playlists?: FetchedInstance<Playlist>;
  podcasts?: FetchedInstance<Podcast>;
}

export type FetchChartAction =
  | RequestChartAction
  | SuccessChartAction
  | ErrorChartAction;

export type ChartAction = FetchChartAction;
