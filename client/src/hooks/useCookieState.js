import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function useCookieState(defaultValue, key) {
  const [state, setState] = useState(() => {
    const cookieValue = Cookies.get(key);
    if (cookieValue) return JSON.parse(cookieValue);
    return defaultValue;
  });

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export { useCookieState };
