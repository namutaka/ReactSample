import * as Rx from 'typeless/rx';
import { createModule } from 'typeless';


export interface CounterState {
  isLoading: boolean;
  count: number;
}

const initialState: CounterState = {
  isLoading: false,
  count: 0,
};


export const [useModule, CounterActions, getCounterState] = createModule(
  Symbol('counter')
)
  // Create Actions Creators
  .withActions({
    startCount: null, // null means no args
    countDone: (count: number) => ({ payload: { count } }),
  })
  .withState<CounterState>();

/* == Module Implementation == */


useModule
  .epic()
  // Listen for `count` and dispatch `countDone` with 500ms delay
  .on(CounterActions.startCount, () =>
    Rx.of(CounterActions.countDone(1)).pipe(Rx.delay(500))
  );

useModule
  .reducer(initialState)
  .on(CounterActions.startCount, state => {
    state.isLoading = true;
  })
  .on(CounterActions.countDone, (state, { count }) => {
    state.isLoading = false;
    state.count += count;
  });

