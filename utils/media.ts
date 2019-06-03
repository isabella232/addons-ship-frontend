import { useState, useEffect } from 'react';

type Handler = (e: MediaQueryListEvent) => void;

const getListeners = (queries: string[], handler: Handler) =>
  queries.map(query => {
    const listener = window.matchMedia(query);

    listener.addListener(handler);

    return listener;
  });

export const mediaQuery = (...rules: string[]) => {
  const mediaRules = rules.map(r => `(min-width: ${r})`);

  const stateHandlers = rules.map(() => useState(false));

  const getStateHandler = (media: string) => {
    const idx = mediaRules.indexOf(media);

    return stateHandlers[idx];
  };

  useEffect(() => {
    const handler = ({ matches, media }: MediaQueryListEvent) => {
      const [, set] = getStateHandler(media);

      set(matches);
    };

    const listeners = getListeners(mediaRules, handler);

    listeners.forEach(({ media, matches }) => {
      const [, set] = getStateHandler(media);
      set(matches);
    });

    return () => listeners.forEach(l => l.removeListener(handler));
  });

  return stateHandlers.map(([isMatch]) => isMatch);
};
