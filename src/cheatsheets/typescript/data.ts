// Define interfaces

export interface Item {
  title: string;
  cmd: string;
}

export interface Data {
  title: string;
  items: Item[];
}

// Define data objects

export const basicTypesData: Data = {
  title: "Basic Types",
  items: [
    { title: "Boolean", cmd: "let isDone: boolean = false;" },
    { title: "Number", cmd: "let decimal: number = 6;" },
    { title: "String", cmd: "let color: string = 'blue';" },
    { title: "Array", cmd: "let list1: number[] = [1, 2, 3];" },
    { title: "Tuple", cmd: "let x: [string, number];\nx = ['hello', 10];" },
    {
      title: "Enum",
      cmd: "enum Color {Red, Green, Blue}\nlet c: Color = Color.Green;",
    },
    {
      title: "Any",
      cmd: "let notSure: any = 4;\nnotSure = 'maybe a string instead';",
    },
    {
      title: "Void",
      cmd: "function warnUser(): void {\n    console.log('This is my warning message');\n}",
    },
    {
      title: "Null and Undefined",
      cmd: "let u: undefined = undefined;\nlet n: null = null;",
    },
  ],
};

export const functionsData: Data = {
  title: "Functions",
  items: [
    {
      title: "Function Declaration",
      cmd: "function add(x: number, y: number): number {\n    return x + y;\n}",
    },
    {
      title: "Function Expression",
      cmd: "let myAdd = function(x: number, y: number): number {\n    return x + y;\n};",
    },
    {
      title: "Optional and Default Parameters",
      cmd: "function buildName(firstName: string, lastName?: string) {\n    return firstName + ' ' + (lastName || '');\n}\nfunction greet(name: string = 'Anonymous') {\n    return `Hello, ${name}!`;\n}",
    },
    {
      title: "Rest Parameters",
      cmd: "function buildNames(firstName: string, ...restOfNames: string[]) {\n    return firstName + ' ' + restOfNames.join(' ');\n}",
    },
  ],
};

export const interfacesData: Data = {
  title: "Interfaces",
  items: [
    {
      title: "Interface",
      cmd: "interface Person {\n    firstName: string;\n    lastName: string;\n}\nfunction greet(person: Person) {\n    return `Hello, ${person.firstName} ${person.lastName}!`;\n}",
    },
    {
      title: "Optional Properties and Readonly",
      cmd: "interface SquareConfig {\n    color?: string;\n    width?: number;\n    readonly height: number;\n}",
    },
    {
      title: "Function Types in Interface",
      cmd: "interface SearchFunc {\n    (source: string, subString: string): boolean;\n}",
    },
  ],
};

export const classesData: Data = {
  title: "Classes",
  items: [
    {
      title: "Class",
      cmd: "class Greeter {\n    greeting: string;\n    constructor(message: string) {\n        this.greeting = message;\n    }\n    greet() {\n        return `Hello, ${this.greeting}`;\n    }\n}",
    },
    {
      title: "Inheritance",
      cmd: "class Animal {\n    move(distanceInMeters: number = 0) {\n        console.log(`Animal moved ${distanceInMeters}m.`);\n    }\n}\nclass Dog extends Animal {\n    bark() {\n        console.log('Woof! Woof!');\n    }\n}",
    },
    {
      title: "Access Modifiers",
      cmd: "class Animal {\n    private name: string;\n    constructor(theName: string) { this.name = theName; }\n}",
    },
    {
      title: "Getter and Setter",
      cmd: "class Employee {\n    private _fullName: string;\n    get fullName(): string {\n        return this._fullName;\n    }\n    set fullName(newName: string) {\n        if (newName && newName.length > 0) {\n            this._fullName = newName;\n        } else {\n            throw new Error('Invalid name');\n        }\n    }\n}",
    },
  ],
};

export const genericsData: Data = {
  title: "Generics",
  items: [
    {
      title: "Generic Function",
      cmd: "function identity<T>(arg: T): T {\n    return arg;\n}",
    },
    {
      title: "Generic Interface",
      cmd: "interface GenericIdentityFn<T> {\n    (arg: T): T;\n}",
    },
    {
      title: "Generic Class",
      cmd: "class GenericNumber<T> {\n    zeroValue: T;\n    add: (x: T, y: T) => T;\n}",
    },
  ],
};

export const advancedTypesData: Data = {
  title: "Advanced Types",
  items: [
    {
      title: "Union Types",
      cmd: "let myVar: string | number;\nmyVar = 'Hello';\nmyVar = 10;",
    },
    {
      title: "Type Aliases",
      cmd: "type Name = string;\ntype NumOrString = number | string;",
    },
    {
      title: "Intersection Types",
      cmd: "interface Printable {\n    print(): void;\n}\n\ninterface Loggable {\n    log(): void;\n}\n\ntype LoggableAndPrintable = Printable & Loggable;",
    },
    {
      title: "Type Assertions",
      cmd: "let someValue: any = 'this is a string';\nlet strLength: number = (someValue as string).length;",
    },
    {
      title: "Type Guards",
      cmd: "function isNumber(value: any): value is number {\n    return typeof value === 'number';\n}",
    },
  ],
};

export const modulesData: Data = {
  title: "Modules",
  items: [
    {
      title: "Exporting Module",
      cmd: "export interface StringValidator {\n    isAcceptable(s: string): boolean;\n}",
    },
    {
      title: "Importing Module",
      cmd: "import { StringValidator } from './StringValidator';",
    },
  ],
};
