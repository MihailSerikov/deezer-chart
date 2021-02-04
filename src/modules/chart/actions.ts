import { Dispatch } from 'redux';
import { api } from '../../utils/api';

import { Chart } from './types';

export enum CHART_API_ACTIONS {
  REQUEST = 'CHART_LOAD / REQUEST',
  SUCCESS = 'CHART_LOAD / SUCCESS',
  FAIL = 'CHART_LOAD / FAIL',
}
export interface RequestChartAction {
  type: CHART_API_ACTIONS.REQUEST;
}

export interface SuccessChartAction {
  type: CHART_API_ACTIONS.SUCCESS;
  payload: Chart;
}

export interface ErrorChartAction {
  type: CHART_API_ACTIONS.FAIL;
  payload: Error;
}

export const startFetchChart = (): RequestChartAction => ({
  type: CHART_API_ACTIONS.REQUEST,
});

export const successFetchChart = (data: Chart): SuccessChartAction => ({
  type: CHART_API_ACTIONS.SUCCESS,
  payload: data,
});

export const failFetchChart = (error: Error): ErrorChartAction => ({
  type: CHART_API_ACTIONS.FAIL,
  payload: error,
});

export const fetchChart = () => async (dispatch: Dispatch) => {
  dispatch(startFetchChart());

  try {
    const { data }: { data: Chart } = await api.get<Chart>('/chart');

    dispatch(successFetchChart(data));
  } catch (err) {
    dispatch(failFetchChart(err));
  }
};
