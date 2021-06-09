import React from "react";
import { List, Favorites, Loading } from "./components";
import { useSWData } from "./hooks";
import { SWContext } from "./context";
function App() {
  const {
    state: { loading },
  } = React.useContext(SWContext);
  useSWData();
  return (
    <div className="App">
      <Favorites />
      {loading ? <Loading /> : <List />}
    </div>
  );
}

export default App;
