import React from "react";
import { SWContext } from "../../context";
import "./index.css";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";
export const Favorites = () => {
  const {
    state: { favorites },
    dispatch,
  } = React.useContext(SWContext);

  const handleDrop = (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData("name");
    dispatch({ type: "ADD_FAV", payload: name });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    dispatch({ type: "RESET_FAV" });
  };

  const handleRemove = (name) => {
    dispatch({ type: "RM_FAV", payload: name });
  };
  return (
    <div
      className="fav-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="title-container">
        <h1 className="fav-title">Favorites</h1>
        <button className="delete" onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
      <hr className="divider" />
      <ul>
        {favorites.map((f, i) => (
          <div className="fav-item-cont" key={i}>
            <li className="fav-item">{f}</li>
            <button className="delete" onClick={() => handleRemove(f)}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
