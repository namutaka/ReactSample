import React, {useState, useRef} from 'react';
import {Item, State, initialState} from './interface';

function Sample1() {

  const [state, setState] = useState<State>(initialState);

  const addNewItem = (item: Item) => {
    item.id = state.items.length + 1;

    // NG: インスタンスが同一の場合は更新された判定にならない
    // state.items.push(item);
    // setState(state);

    // NG: 下位コンポーネントでインスタンスをメモ化のために持っている場合に、
    //     その値そのものを変更してしまうことになってメモ化判定が正しくおこなえない
    // state.items.push(item);
    // setState({items: state.items });

    setState({...state, items: [...state.items, item] });
  };

  const updateItem = () => {
    // NG
    // state.items[0].name = state.items[0].name + "X";
    // setState(state);
    // state.items[0].name = state.items[0].name + "X";
    setState({
      ...state,
      items: state.items.map((item, i) =>
        i == 0
          ? {...item, name: item.name + "X"}
          : item
      )
    });
  };

  const updateSpecialItem = () => {
    setState({
      ...state,
      specialItem: {
        item: {
          ...state.specialItem.item,
          name:  state.specialItem.item.name + "X"
        }
      }
    });
  };


  return (
    <div>
      <Main state={state} onAddItem={addNewItem} />
      <button onClick={updateItem}>
        Update
      </button>
      <button onClick={updateSpecialItem}>Update Special</button>
    </div>
  );
}

function Main(props: {state: State, onAddItem: (item: Item) => void}) {

  return (
    <div>
      <h2>Sample1</h2>
      <div>
        <LeftPanel items={props.state.items} />

        <RightPanel item={ {id: 0, name: ""} } onAddItem={props.onAddItem} />

        <Special special={ props.state.specialItem } />

      </div>
    </div>
  );
}


const LeftPanel = React.memo(function LeftPanel(props: {items: Item[]}) {
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
          {props.items.map( item => {
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
// ,
// (lhs, rhs) => {
//   return lhs.items.length == rhs.items.length;
// }
);

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

const Special = React.memo(function Special(props: {special: {item: Item}}) {

  const count = useRef(0);
  count.current += 1;

  return (
    <div>
      <h3>Special</h3>
      <div>count: {count.current}</div>
      <div>Name: {props.special.item.name}</div>
    </div>
  );
}
);

export default Sample1;

