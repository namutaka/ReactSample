import React, {useState, useRef} from 'react';
import {Item, State} from './interface';
import * as Module  from './SampleModule';
import { useActions, useMappedState } from 'typeless';

function Sample4() {

  Module.useSampleModule()
  const {addNewItem, updateItem} = useActions(Module.SampleActions);
  const {updateSpecialItem} = useActions(Module.SampleActions);

  return (
    <div>
      <Main onAddItem={addNewItem} />

      <button onClick={updateItem}>Update</button>
      <button onClick={updateSpecialItem}>Update Special</button>
    </div>
  );
}

function Main(props: { onAddItem: (item: Item) => void}) {

  return (
    <div>
      <h2>Sample4</h2>
      <div>
        <LeftPanel />

        <RightPanel item={ {id: 0, name: ""} } onAddItem={props.onAddItem} />

        <Special />

      </div>
    </div>
  );
}


const LeftPanel = function LeftPanel() {
  const state = Module.getSampleState.useState();
  const items = state.items;

  const count = useRef(0);
  count.current += 1;

  return (
    <div>
      <h3>Left</h3>
      <div>count: {count.current}</div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map( item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}
;

function RightPanel(props: {item: Item, onAddItem: (item: Item) => void}) {
  const [name, setName] = useState(props.item.name);

  const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    props.onAddItem({id: 0, name: name});
  };

  return (
    <div>
      <h3>Right</h3>

      <div>
        <label>ID</label>: {props.item.id}
      </div>
      <div>
        <label>Name</label>: <input type="text" value={name} onChange={changeName} />
      </div>

      <button onClick={onClick}>Add</button>

    </div>
  );
}

const Special = function Special() {
  // const state = Module.getSampleState.useState();
  // const special = state.specialItem;

  // NG
  // const [special, z] = useMappedState([Module.getSampleState], state => [state.specialItem, 1]);
  const special = useMappedState([Module.getSampleState], state => state.specialItem);

  const count = useRef(0);
  count.current += 1;

  return (
    <div>
      <h3>Special</h3>
      <div>count: {count.current}</div>
      <div>Name: {special.item.name}</div>
    </div>
  );
}
;

export default Sample4;

