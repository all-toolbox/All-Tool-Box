import type { Data } from "@src/cheatsheets/commons";

const customHooks: Data[] = [
  {
    title: "useLocalStorage",
    items: [
      {
        title: "useLocalStorage",
        cmd: `
  import { useState } from 'react';

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = value => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue];
  }

  export default useLocalStorage;
          `,
      },
    ],
  },
  {
    title: "useFetch",
    items: [
      {
        title: "useFetch",
        cmd: `
  import { useState, useEffect } from 'react';

  function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, loading, error };
  }

  export default useFetch;
          `,
      },
    ],
  },
  {
    title: "useDebounce",
    items: [
      {
        title: "useDebounce",
        cmd: `
  import { useState, useEffect } from 'react';

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  export default useDebounce;
          `,
      },
    ],
  },
  {
    title: "useEventListener",
    items: [
      {
        title: "useEventListener",
        cmd: `
  import { useEffect } from 'react';

  function useEventListener(eventName, handler, element = window) {
    useEffect(() => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Add event listener
      element.addEventListener(eventName, handler);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, handler);
      };
    }, [eventName, handler, element]);
  }

  export default useEventListener;
          `,
      },
    ],
  },
  {
    title: "useKeyPress",
    items: [
      {
        title: "useKeyPress",
        cmd: `
  import { useState, useEffect } from 'react';

  function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  }

  export default useKeyPress;
          `,
      },
    ],
  },

  {
    title: "useHover",
    items: [
      {
        title: "useHover",
        cmd: `
import { useState, useEffect, useRef } from 'react';

function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, []);

  return [ref, isHovered];
}

export default useHover;
`,
      },
    ],
  },
];

export default customHooks;
