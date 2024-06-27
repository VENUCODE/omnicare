import { useCallback, useEffect, useState } from "react";

export function useModalState(defaultValue = false) {
  const [isOpen, setisOpen] = useState(false);
  const open = useCallback(() => setisOpen(true), []);
  const close = useCallback(() => setisOpen(false), []);
  return { isOpen, open, close };
}

// const is992px = useMediaQuery('(max-width: 992px)')
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const queryList = window.matchMedia(query);
    const updateMatches = (event) => setMatches(event.matches);
    updateMatches(queryList);
    queryList.addEventListener("change", updateMatches);
    return () => {
      queryList.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
};
