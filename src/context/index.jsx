import React from "react";

export const SWContext = React.createContext();

const InitialState = {
  favorites: [],
  characters: [],
  loading: true,
  loadingMessage: "",
};

const RootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "SET_CHARS": {
      return { ...state, characters: action.payload };
    }
    case "ADD_FAV": {
      if (!state.favorites.includes(action.payload)) {
        return { ...state, favorites: [...state.favorites, action.payload] };
      } else {
        return state;
      }
    }
    case "RM_FAV": {
      return {
        ...state,
        favorites: state.favorites.filter((f) => f !== action.payload),
      };
    }
    case "RESET_FAV": {
      return { ...state, favorites: [] };
    }
    case "STOP_LOADING": {
      return { ...state, loading: false };
    }
    case "SET_MESSAGE": {
      return { ...state, loadingMessage: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const SWProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(RootReducer, InitialState, () => {
    return JSON.parse(localStorage.getItem("state")) || InitialState;
  });

  React.useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <SWContext.Provider value={{ state, dispatch }}>
      {children}
    </SWContext.Provider>
  );
};
