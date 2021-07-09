import logo from "./logo.svg";
import "./App.css";
import GetData from "./GetData";
import GetData2 from "./GetData2";

import { useState } from "react";

function App() {
  const [limit, setLimit] = useState(8);
  return (
    <div className="App-header">
      {/* <GetData limit={limit} setLimit={setLimit} /> */}
      <GetData2 limit={limit} setLimit={setLimit} />
    </div>
  );
}

export default App;
