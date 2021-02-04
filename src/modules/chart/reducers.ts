import { CHART_API_ACTIONS } from './actions';
import { Chart, ChartAction } from './types';

export interface ChartState {
  data: Chart;
  isLoading: boolean;
  error: null;
}

const initialState: ChartState = {
  data: {},
  isLoading: true,
  error: null,
};

export const chartReducer = (
  state: ChartState = initialState,
  action: ChartAction,
) => {
  switch (action.type) {
    case CHART_API_ACTIONS.REQUEST:
      return { ...state, isLoading: true };
    case CHART_API_ACTIONS.SUCCESS:
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case CHART_API_ACTIONS.FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
