import { useState, useEffect } from "react";

function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const strogeValue = localStorage.getItem(key);

    if (strogeValue) {
      return JSON.parse(strogeValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
