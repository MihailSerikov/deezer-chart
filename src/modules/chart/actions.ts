import { Dispatch } from 'redux';
import { Podcast } from '../../interfaces/Podcast';
import { api, createApiAction, FetchedInstance } from '../../utils/api';

import { Album, Artist, Playlist, Track } from '../../interfaces';

export interface Chart {
  tracks?: FetchedInstance<Track>;
  albums?: FetchedInstance<Album>;
  artists?: FetchedInstance<Artist>;
  playlists?: FetchedInstance<Playlist>;
  podcasts?: FetchedInstance<Podcast>;
}

export interface FetchChartAction {
  type: string;
  payload: Chart;
}

export const FETCH_CHART = createApiAction('CHART_LOAD');

export const startFetchChart = () => ({
  type: FETCH_CHART.REQUEST,
});

export const finishFetchChart = (data: Chart) => ({
  type: FETCH_CHART.SUCCESS,
  payload: data,
});

export const failFetchChart = (error: Error) => ({
  type: FETCH_CHART.FAIL,
  payload: error,
});

export const fetchChart = () => async (dispatch: Dispatch) => {
  dispatch(startFetchChart());

  try {
    const { data }: { data: Chart } = await api.get<Chart>('/chart');

    dispatch<FetchChartAction>(finishFetchChart(data));
  } catch (err) {
    dispatch(failFetchChart(err));
  }
};
