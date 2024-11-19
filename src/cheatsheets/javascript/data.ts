import type { Data } from "../commons";

export const basicSyntaxData: Data = {
  title: "Basic Syntax",
  items: [
    { title: "Console Log", cmd: "console.log('Hello, World!');" },
    {
      title: "Comments",
      cmd: "// Single line comment\n/* Multi-line comment */",
    },
    {
      title: "Variables",
      cmd: "let x = 5;\nconst name = 'Alice';\nconst pi = 3.14;",
    },
    {
      title: "Operators",
      cmd: "let result = 10 + 5;\nlet isTrue = true;\nlet message = isTrue ? 'Yes' : 'No';",
    },
    {
      title: "Strings",
      cmd: "let greeting = 'Hello';\nlet name = 'Alice';\nconsole.log(`${greeting}, ${name}!`);",
    },
    {
      title: "Arrays",
      cmd: "let numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.length);",
    },
  ],
};

export const functionsData: Data = {
  title: "Functions",
  items: [
    {
      title: "Function Declaration",
      cmd: "function greet(name) {\n    return `Hello, ${name}!`;\n}",
    },
    {
      title: "Function Expression",
      cmd: "const greet = function(name) {\n    return `Hello, ${name}!`;\n};",
    },
    {
      title: "Arrow Function",
      cmd: "const greet = (name) => `Hello, ${name}!`;",
    },
    { title: "Function Call", cmd: "console.log(greet('Alice'));" },
    {
      title: "Default Parameters",
      cmd: "function greet(name = 'Anonymous') {\n    return `Hello, ${name}!`;\n}",
    },
  ],
};

export const controlFlowData: Data = {
  title: "Control Flow",
  items: [
    {
      title: "If Statement",
      cmd: "if (condition) {\n    // Code if condition is true\n} else if (anotherCondition) {\n    // Code if anotherCondition is true\n} else {\n    // Code if none of the conditions are true\n}",
    },
    {
      title: "Switch Statement",
      cmd: "switch (value) {\n    case 1:\n        // Code for case 1\n        break;\n    case 2:\n        // Code for case 2\n        break;\n    default:\n        // Code if value doesn't match any case\n}",
    },
    {
      title: "For Loop",
      cmd: "for (let i = 0; i < array.length; i++) {\n    // Code block to be executed\n}",
    },
    {
      title: "While Loop",
      cmd: "while (condition) {\n    // Code block to be executed\n}",
    },
    {
      title: "Break Statement",
      cmd: "for (let i = 0; i < 10; i++) {\n    if (i === 5) {\n        break;\n    }\n    console.log(i);\n}",
    },
    {
      title: "Continue Statement",
      cmd: "for (let i = 0; i < 10; i++) {\n    if (i === 5) {\n        continue;\n    }\n    console.log(i);\n}",
    },
  ],
};

export const arraysData: Data = {
  title: "Arrays",
  items: [
    {
      title: "Create an Array",
      cmd: "let fruits = ['apple', 'banana', 'cherry'];",
    },
    {
      title: "Access Array Elements",
      cmd: "let first = fruits[0];\nlet last = fruits[fruits.length - 1];",
    },
    { title: "Add to the End of an Array", cmd: "fruits.push('orange');" },
    { title: "Remove from the End of an Array", cmd: "fruits.pop();" },
    {
      title: "Loop through an Array",
      cmd: "fruits.forEach(function(item, index, array) {\n    console.log(item, index);\n});",
    },
  ],
};

export const objectsData: Data = {
  title: "Objects",
  items: [
    {
      title: "Create an Object",
      cmd: "let person = { firstName: 'John', lastName: 'Doe', age: 30 };",
    },
    {
      title: "Access Object Properties",
      cmd: "let firstName = person.firstName;\nlet age = person['age'];",
    },
    {
      title: "Modify Object Properties",
      cmd: "person.firstName = 'Jane';\nperson['age'] = 40;",
    },
    {
      title: "Loop through Object Properties",
      cmd: "for (let key in person) {\n    console.log(key + ': ' + person[key]);\n}",
    },
    {
      title: "Check if Property Exists",
      cmd: "if ('lastName' in person) {\n    console.log('Last Name is present');\n}",
    },
  ],
};
