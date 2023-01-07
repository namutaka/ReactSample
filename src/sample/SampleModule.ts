import * as Rx from 'typeless/rx';
import { createModule } from 'typeless';
import {Item, State, initialState} from './interface';


export const [useSampleModule, SampleActions, getSampleState] = createModule(
  Symbol('sample')
)
  // Create Actions Creators
  .withActions({
    addNewItem: (item: Item) => ({ payload: { item } }),
    updateItem: () => ({ payload: {}}),
    updateSpecialItem: () => ({ payload: {}}),
  })
  .withState<State>();

/* == Module Implementation == */


//useSampleModule
//  .epic()
//  .on(SampleActions.startCount, () =>
//    Rx.of(SampleActions.countDone(1)).pipe(Rx.delay(500))
//  );

useSampleModule
  .reducer(initialState)
  .on(SampleActions.addNewItem, (state, { item }) => {
    item.id = state.items.length + 1;
    state.items.push(item);
  })
  .on(SampleActions.updateItem, (state, {}) => {
    state.items[0].name = state.items[0].name + "X";
  })
  .on(SampleActions.updateSpecialItem, (state, {}) => {
    state.specialItem.item.name = state.specialItem.item.name + "X";
  })
;

