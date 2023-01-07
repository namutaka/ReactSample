import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './counter/App';
import Sample1 from './sample/Sample1';
import Sample2 from './sample/Sample2';
import Sample3 from './sample/Sample3';
import Sample4 from './sample/Sample4';
import reportWebVitals from './reportWebVitals';
import { DefaultTypelessProvider } from 'typeless';


function Root() {
  const [mode, setMode] = React.useState(4);


  const render = (mode: number) => {
    switch (mode) {
      case 0:
        return <App />;

      case 1:
        return <Sample1 />;

      case 2:
        return <Sample2 />;

      case 3:
        return <Sample3 />;

      case 4:
        return <Sample4 />;

      default:
        return <App />;
    }
  };

  return (
    <>
      <header>Mode: {mode}</header>
      <div>
        <button onClick={() => setMode(mode - 1)}>PREV</button>
        <button onClick={() => setMode(mode + 1)}>NEXT</button>
      </div>
      <main>
        {render(mode)}
      </main>
    </>
  );
}

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <React.StrictMode>
    <DefaultTypelessProvider>
      <Root />
    </DefaultTypelessProvider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
