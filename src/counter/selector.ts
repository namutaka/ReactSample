import { createSelector } from 'typeless';
import { getCounterState } from './module';

export const getCounterLabel = createSelector(
  [getCounterState, (state) => state],
    (counter) => {
    console.count("createSelector getCounterLabel");
    return `Count: ${counter.count}, isLoading: ${counter.isLoading}`
  }
);

export const getCount = createSelector(
  [getCounterState, (state) => state.count],
    (count) => {
    console.count("createSelector getCount");
    return `<< Count: ${count} >>`
  }
);

