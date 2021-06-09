import React from "react";

import axios from "axios";

import { SWContext } from "../context";
export const useSWData = () => {
  const {
    state: { characters },
    dispatch,
  } = React.useContext(SWContext);

  React.useEffect(() => {
    if (!characters.length) {
      const lines = [
        "Initializing api request...",
        "One moment...",
        "Almost there...",
        "Gathering characters info...",
        "Retrieving list of films...",
        "Updating local storage...",
        "Updating local storage...",
        "Gathering characters info...",
        "Initializing api request...",
        "Almost there...",
      ];

      // final character data
      let resData = [];
      const GetData = async () => {
        // use recursion because api is in a form of linked list
        const Fetch = async (url) => {
          dispatch({
            type: "SET_MESSAGE",
            payload: lines[Math.floor(Math.random() * 10)],
          });
          const res = await axios(url);
          // get character details

          for (let i = 0; i < res.data.results.length; i++) {
            // species
            const char = res.data.results[i];
            const species = char.species.length
              ? await axios(char.species[0])
              : { data: { name: "Human" } };

            // starships
            const starships = [];
            for (let j = 0; j < char.starships.length; j++) {
              const s = char.starships[j];
              const ship = await axios(s);
              starships.push(ship.data.name);
            }

            // films

            const films = [];

            for (let j = 0; j < char.films.length; j++) {
              const f = char.films[j];
              const film = await axios(f);
              films.push(film.data.title);
            }

            resData = [
              ...resData,
              {
                name: char.name,
                dob: char.birth_year,
                species: species.data.name,
                starships,
                films,
              },
            ];
          }

          if (res.data.next) {
            await Fetch(res.data.next);
          }
        };
        await Fetch("http://swapi.dev/api/people/");
        dispatch({ type: "SET_CHARS", payload: resData });
        dispatch({ type: "STOP_LOADING" });
      };
      GetData();
    }
  }, [dispatch, characters.length]);
};
