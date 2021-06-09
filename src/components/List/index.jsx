import React from "react";
import { SWContext } from "../../context";
import { Character } from "../";
import "./index.css";

const onSearch = (input, chars) => {
  return chars.filter((c) =>
    c.name.toLowerCase().includes(input.toLowerCase())
  );
};

const onFilter = (filters, chars) => {
  return chars.filter((c) => {
    if (filters.film !== "")
      return (
        c.species.includes(filters.species) && c.films.includes(filters.film)
      );
    else return c.species.includes(filters.species);
  });
};

export const List = () => {
  const { state } = React.useContext(SWContext);
  const [filters, setFilters] = React.useState({ film: "", species: "" });
  const [input, setInput] = React.useState("");
  const filteredChars = React.useMemo(
    () => onFilter(filters, state.characters),
    [state, filters]
  );

  const searchedChars = React.useMemo(
    () => onSearch(input, filteredChars),
    [filteredChars, input]
  );

  const handleFilter = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setFilters((f) => ({ ...f, [field]: value }));
  };
  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  return (
    <div className="ls-container">
      <div className="inputs">
        <input
          onChange={handleInput}
          className="search"
          type="text"
          placeholder="Search for a character"
        />
        <div className="filters">
          <div>
            Species:{" "}
            <select className="select" name="species" onChange={handleFilter}>
              <option value="">All</option>
              <option value="Human">Human</option>
              <option value="Droid">Droid</option>
              <option value="Wookie">Wookie</option>
              <option value="Rodian">Rodian</option>
              <option value="Hutt">Hutt</option>
              <option value="Yoda's species">Yoda's species</option>
              <option value="Trandoshan">Trandoshan</option>
              <option value="Mon Calamari">Mon Calamari</option>
              <option value="Ewok">Ewok</option>
              <option value="Sullustan">Sullustan</option>
              <option value="Neimodian">Neimodian</option>
              <option value="Gungan">Gungan</option>
              <option value="Toydarian">Toydarian</option>
              <option value="Dug">Dug</option>
              <option value="Zabrak">Zabrak</option>
              <option value="Twi'lek">Twi'lek</option>
              <option value="Aleena">Aleena</option>
              <option value="Vulptereen">Vulptereen</option>
              <option value="Xexto">Xexto</option>
              <option value="Toong">Toong</option>
              <option value="Cerean">Cerean</option>
              <option value="Nautolan">Nautolan</option>
              <option value="Tholothian">Tholothian</option>
              <option value="Iktotchi">Iktotchi</option>
              <option value="Quermian">Quermian</option>
              <option value="Kel Dor">Kel Dor</option>
              <option value="Chagrian">Chagrian</option>
              <option value="Geonosian">Geonosian</option>
              <option value="Mirialan">Mirialan</option>
              <option value="Clawdite">Clawdite</option>
              <option value="Besalisk">Besalisk</option>
              <option value="Kaminoan">Kaminoan</option>
              <option value="Skakoan">Skakoan</option>
              <option value="Muun">Muun</option>
              <option value="Togruta">Togruta</option>
              <option value="Kaleesh">Kaleesh</option>
              <option value="Pau'an">Pau'an</option>
            </select>
          </div>
          <div>
            Movie:{" "}
            <select className="select" name="film" onChange={handleFilter}>
              <option value="">All</option>
              <option value="A New Hope">A New Hope</option>
              <option value="The Empire Strikes Back">
                The Empire Strikes Back
              </option>
              <option value="Return of the Jedi">Return of the Jedi</option>
              <option value="The Phantom Menace">The Phantom Menace</option>
              <option value="Attack of the Clones">Attack of the Clones</option>
              <option value="Revenge of the Sith">Revenge of the Sith</option>
            </select>
          </div>
        </div>
      </div>
      <ul className="ls">
        {searchedChars.map((c, i) => (
          <Character key={i} data={c} />
        ))}
      </ul>
    </div>
  );
};
