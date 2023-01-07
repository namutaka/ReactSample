import {useState} from 'react';
import './App.css';
import {useModule, CounterActions, getCounterState} from './module';
import { useActions, useSelector } from 'typeless';
import {getCounterLabel, getCount} from './selector';

function Counter() {
  console.log("Counter");
  const [count, setCount] = useState(0);


  const onClick = () => {
    setCount(count + 1)
  };

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={onClick} >Button</button>
    </div>
  );
}

function TLCounter() {
  console.log("TLCounter");

  const state = getCounterState.useState();
  // const state = getCounterState();

  const action = useActions(CounterActions);

  const onClick = () => {
    action.startCount();
  };


  return (
    <div>
      <h3>Typeless Counter</h3>
      <div>{state.count}</div>
      <div>{state.isLoading ? "true":"false"}</div>
      <button onClick={onClick}>Button</button>
    </div>
  );
}


function TLSelectorCounter(props: {tag: string}) {
  console.log(`TLSelectorCounter: ${props.tag}`);

  const countStr = useSelector(getCounterLabel);
  const count = useSelector(getCount);

  // const countStr = getCounterLabel();
  // const count = getCount();

  const action = useActions(CounterActions);

  const onClick = () => {
    action.startCount();
  };

  return (
    <div>
      <h3>Typeless Selector Counter: {props.tag}</h3>
      <div>{countStr}</div>
      <div>{count}</div>
      <button onClick={onClick}>Button</button>
    </div>
  );
}


function TLSelectorCounterV2(props: {tag: string}) {
  console.log(`TLSelectorCounterV2: ${props.tag}`);

  const countStr = useSelector(getCounterLabel);
  const count = useSelector(getCount);

  // const countStr = getCounterLabel();
  // const count = getCount();

  const action = useActions(CounterActions);

  const onClick = () => {
    action.startCount();
  };

  return (
    <div>
      <h3>Typeless Selector Counter: {props.tag}</h3>
      <div>{countStr}</div>
      <div>{count}</div>
      <button onClick={onClick}>Button</button>
    </div>
  );
}


function Hoge() {

  console.log("Hoge");
  return (
    <div>
      <h2>Hoge</h2>
    </div>
  );
}

function App() {
  console.log("App");
  useModule();
  const [count, setCount] = useState(0);


  const onClick = () => {
    setCount(count + 1)
  };


  return (
    <div className="App">
      <header className="App-header">
        <Counter />

        <TLCounter />
        <TLSelectorCounter tag="No.1" />
        <TLSelectorCounter tag="No.2" />
        <TLSelectorCounterV2 tag="xx" />
        <Hoge></Hoge>
        <div>Hoge: {count}</div>
        <button onClick={onClick} >Button</button>
      </header>
    </div>
  );
}

export default App;
