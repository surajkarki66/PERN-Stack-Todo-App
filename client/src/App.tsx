import React, { Fragment } from "react";

import "./App.css";
import InputTodo from "./components/InputTodo";

const App: React.FC = () => {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
      </div>
    </Fragment>
  );
};

export default App;
