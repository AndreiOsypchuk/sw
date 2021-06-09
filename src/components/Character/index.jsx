import React from "react";
import "./index.css";
export const Character = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleDragStart = (e, name) => {
    e.dataTransfer.setData("name", name);
  };
  return (
    <div
      className={expanded ? "expanded char-item" : "char-item"}
      onDragStart={(e) => handleDragStart(e, data.name)}
      draggable
    >
      <h1 className="char-title" onClick={() => setExpanded((e) => !e)}>
        {data.name}
      </h1>
      {expanded ? (
        <div className="details">
          <p>
            <b>Species:</b> {data.species}
          </p>
          <p>
            <b>Starships:</b> {data.starships.join(", ") || "none"}
          </p>
          <p>
            <b>Films:</b> {data.films.join(", ") || "none"}
          </p>
        </div>
      ) : null}
    </div>
  );
};
