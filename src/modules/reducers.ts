import { combineReducers } from 'redux';
import { chartReducer, ChartState } from './chart/reducers';

export interface StoreState {
  chart: ChartState;
}

export const reducers = combineReducers({
  chart: chartReducer,
});
