interface Item {
	title: string;
	cmd: string;
}

interface Data {
	title: string;
	items: Item[];
}
export const components: Data = {
	title: "Components",
	items: [
		{
			title: "Functional component",
			cmd: `export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}`,
		},

		{
			title: "Nesting components",
			cmd: `function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}`,
		},

		{
			title: "Importing components",
			cmd: `import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
`,
		},
	],
};

export const jsx: Data = {
	title: "JSX",
	items: [
		{
			title: "JSX element",
			cmd: "let element = <h1>Hello, world!</h1>;",
		},

		{
			title: "JSX expression",
			cmd: `export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}`,
		},
	],
};

export const useState: Data = {
	title: "useState",
	items: [
		{
			title: "Initialize and use state variable",
			cmd: `import React, { useState } from "react";

const FunctionComponent = () => {
  const [superhero] = useState("Spider-Man");

  return (
    <div>
      <h2>{superhero}</h2>
    </div>
  );
};`,
		},

		{
			title: "Update state variable",
			cmd: `import React, { useState } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState(
    "Spider-Man"
  );

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        "Iron Man"
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},

		{
			title: "Update state variable with previous data",
			cmd: `import React, { useState } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState(
    "Spider-Man"
  );

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        (superhero) => superhero + ' and Iron Man'
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},
	],
};

export const useEffect: Data = {
	title: "useEffect",
	items: [
		{
			title: "Run effect on every render",
			cmd: `import React, { useState, useEffect } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState("Spider-Man");

  useEffect(() => {
    console.log("run for every component render");
  });

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        superhero === "Spider-Man" ? "Iron Man" : "Spider-Man"
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},

		{
			title: "Run effect only on first render",
			cmd: `import React, { useState, useEffect } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState("Spider-Man");

  useEffect(() => {
    console.log("run only for first render");
  }, []);

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        superhero === "Spider-Man" ? "Iron Man" : "Spider-Man"
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},

		{
			title: "Run effect with clean-up",
			cmd: `import React, { useState, useEffect } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState("Spider-Man");

  useEffect(() => {
    console.log("run for every component render");
    return () => {
      console.log("run before next effect and component un-mount")
    }
  });

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        superhero === "Spider-Man" ? "Iron Man" : "Spider-Man"
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},

		{
			title: "Run effect on first render and re-run when dependency changes",
			cmd: `import React, { useState, useEffect } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState("Spider-Man");

  useEffect(() => {
    console.log("run for first render and when 'superhero' changes");
  }, [superhero]);

  return (
    <div>
      <h2>{superhero}</h2>
      <button onClick={() => updateSuperhero(
        superhero === "Spider-Man" ? "Iron Man" : "Spider-Man"
      )}>
        Update Superhero!
      </button>
    </div>
  );
};`,
		},
	],
};

export const useContext: Data = {
	title: "useContext",
	items: [
		{
			title: "Passing data between components with Context",
			cmd: `import React, { useState, useContext, createContext } from "react";

const SuperheroContext = createContext();

const ChildComponent = () => {
  const value = useContext(SuperheroContext);
  return <div>{value} is the best Marvel Superhero.</div>;
};

const ParentComponent = () => {
  const [superhero] = useState("Spider-Man");

  return (
    <SuperheroContext.Provider value={superhero}>
      <ChildComponent />
    </SuperheroContext.Provider>
  );
};`,
		},
	],
};

export const useReducer: Data = {
	title: "useReducer",
	items: [
		{
			title: "Dispatch an action to update state",
			cmd: `import React, { useReducer } from "react";

const reducer = (_state, action) => {
  switch (action.type) {
    case "UPDATE_SUPERHERO":
      return { superhero: action.payload };
  }
}

const FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, { superhero: "Spider-Man" });
  const updateSuperhero = () => dispatch(
    { type: "UPDATE_SUPERHERO", payload: "Iron Man"}
  );
  return (
    <div>
      {state.superhero}
      <button onClick={updateSuperhero}>Update Superhero</button>
    </div>
  );
};`,
		},
		{
			title: "Lazy initialization of state",
			cmd: `import React, { useReducer } from "react";

const reducer = (_state, action) => {
  switch (action.type) {
    case "UPDATE_SUPERHERO":
      return { superhero: action.payload };
  }
}

const init = superhero => ({ superhero });

const FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, "Spider-Man", init);
  const updateSuperhero = () => dispatch(
    { type: "UPDATE_SUPERHERO", payload: "Iron Man"}
  );
  return (
    <div>
      {state.superhero}
      <button onClick={updateSuperhero}>Update Superhero</button>
    </div>
  );
};`,
		},
	],
};

export const useCallback: Data = {
	title: "useCallback",
	items: [
		{
			title: "Create a memoized callback function",
			cmd: `import React, { useState, useCallback } from "react";

const FunctionComponent = () => {
  const [superhero, updateSuperhero] = useState("Spider-Man");

  const setSuperhero = useCallback(newSuperhero => {
    updateSuperhero(newSuperhero);
  }, []);

  return (
    <div>
      <h2>{superhero}</h2>
      <button
        onClick={() => setSuperhero("Iron Man")}
      >
        Update Superhero!
      </button>
    </div>
  );
};`,
		},
	],
};

export const useMemo: Data = {
	title: "useMemo",
	items: [
		{
			title: "Return a memoized value",
			cmd: `import React, { useMemo } from "react";

const FunctionComponent = () => {
  const superheroes = ["Spider-Man", "Iron Man"];
  const getRandomSuperhero = () =>
    superheroes[
      Math.floor(Math.random() * superheroes.length)
    ];

  const memoizedRandomSuperhero = useMemo(
    getRandomSuperhero,
    [superheroes]
  );

  return (
    <h2>{memoizedRandomSuperhero}</h2>
  );
};`,
		},
	],
};

export const useRef: Data = {
	title: "useRef",
	items: [
		{
			title: "Create a mutable reference object",
			cmd: `import React, { useRef } from "react";

const FunctionComponent = () => {
  const ref = useRef("Spider-Man");

  return <h2>{ref.current}</h2>;
};`,
		},
	],
};

export const renderingLists: Data = {
	title: "Rendering lists",
	items: [
		{
			title: "Rendering an array of items",
			cmd: `const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li key={person}>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
`,
		},

		{
			title: "Rendering an array of objects",
			cmd: `const elements = [
  {
    name: "one",
    value: 1,
  },
  {
    name: "two",
    value: 2,
  },
  {
    name: "three",
    value: 3,
  },
];
return (
  <ul>
    {elements.map(function (element, index) {
      return (
        <li key={index}>
          The value for {element.name} is {element.value}
        </li>
      );
    })}
  </ul>
);`,
		},

		{
			title: "Rendering an filtered array",
			cmd: `const elements = [
  {
    name: "one",
    value: 1,
  },
  {
    name: "two",
    value: 2,
  },
  {
    name: "three",
    value: 3,
  },
];
return (
    const filteredElements = elements.filter(elements =>
    elements.name === 'one'
  );
  <ul>
    {filteredElements.map(function (element, index) {
      return (
        <li key={index}>
          The value for {element.name} is {element.value}
        </li>
      );
    })}
  </ul>
);`,
		},
	],
};

export const conditionalRendering: Data = {
	title: "Conditional rendering",
	items: [
		{
			title: "Condtionally return JSX",
			cmd: `function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}`,
		},

		{
			title: "Condtionally render nothing",
			cmd: `function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}`,
		},

		{
			title: "Conditional (ternary) operator (? :)",
			cmd: `function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
`,
		},

		{
			title: "Logical AND operator (&&)",
			cmd: `function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}`,
		},

		{
			title: "Conditionally assigning JSX to a variable",
			cmd: `function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}`,
		},
	],
};
