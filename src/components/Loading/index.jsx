import React from "react";
import { SWContext } from "../../context";
import "./index.css";
export const Loading = () => {
  const {
    state: { loadingMessage },
  } = React.useContext(SWContext);

  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>{loadingMessage}</p>
    </div>
  );
};
