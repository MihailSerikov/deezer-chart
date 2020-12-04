import { Chart, FETCH_CHART } from './actions';
import { ChartAction } from './types';

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

export const chartReducer = (state = initialState, action: ChartAction) => {
  switch (action.type) {
    case FETCH_CHART.REQUEST:
      return { ...state, isLoading: true };
    case FETCH_CHART.SUCCESS:
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_CHART.FAIL:
      return { ...state, isLoading: false, error: action.payload };
    // case ActionTypes.fetchAlbumTracks:
    //   return action.payload;
    default:
      return state;
  }
};
