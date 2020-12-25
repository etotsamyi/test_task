import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AdaptiveText } from './components/adaptiveText/AdaptiveText';
import { Table } from './components/table/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DropZone } from './components/dropzone/DropZone';

function App() {

  const [multiSelectStatus, changeMultiselectStatus] = useState(false);
  const [startPoint, changeStartPoint] = useState<Number[]>([0, 0]);
  const [endPoint, changeEndPoint] = useState<Number[]>([0, 0]);

  return (
    <>
      {/* Multiselect, not finished */}
      {/* <div
        onMouseDown={(e) => {
          e.preventDefault();
          changeMultiselectStatus(true);
          console.log(e.clientX, e.clientY);
          changeStartPoint([e.clientX, e.clientY]);
          changeEndPoint([e.clientX, e.clientY]);
        }}

        onMouseMove={(e) => {
          e.preventDefault();
          if (multiSelectStatus) {
            changeEndPoint([e.clientX, e.clientY]);
            console.log(e.clientX, e.clientY);
          }
        }}

        onMouseUp={(e) => {
          e.preventDefault();
          changeMultiselectStatus(false);
          changeStartPoint([0, 0]);
          changeEndPoint([0, 0]);
        }}
      >
        {!!multiSelectStatus && <div
          className="select-board"
          style={{ top: `${startPoint[1] < endPoint[1] ? startPoint[1] : endPoint[1]}px`, left: `${startPoint[0] < endPoint[0] ? startPoint[0] : endPoint[0]}px`, bottom: `calc(100vh - ${startPoint[1] > endPoint[1] ? startPoint[1] : endPoint[1]}px)`, right: `calc(100vw - ${startPoint[0] > endPoint[0] ? startPoint[0] : endPoint[0]}px)` }}
        />} */}
      <Router>
        <nav className="navbar">
          <Link to="/css">CSS Task</Link>
          <Link to="/js">JS Task</Link>
          <Link to="/drop-zone">Drop Zone</Link>
        </nav>
        <Switch>
          <Route path="/css">
            <AdaptiveText />
          </Route>
          <Route path="/js">
            <Table />
          </Route>
          <Route path="/drop-zone">
            <DropZone />
          </Route>
          <Route path="/">
            <div />
          </Route>
        </Switch>
      </Router >
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* </div> */}
    </>
  );
}

export default App;
