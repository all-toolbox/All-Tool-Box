import type { Data } from "../commons";

export const basic_syntax_data = {
  title: "Basic Syntax",
  items: [
    { title: "Print Statement", cmd: "print('Hello, World!')" },
    {
      title: "Comments",
      cmd: "# This is a single-line comment\n''' This is a\nmulti-line comment '''",
    },
    { title: "Variables", cmd: "x = 5\nname = 'Alice'\npi = 3.14" },
    {
      title: "Indentation",
      cmd: "if x > 5:\n    print('x is greater than 5')\nelse:\n    print('x is less than or equal to 5')",
    },
    {
      title: "Input",
      cmd: "name = input('Enter your name: ')\nprint('Hello, ' + name)",
    },
    {
      title: "String Operations",
      cmd: "message = 'Hello, World!'\nprint(message[0])\nprint(message.split(', '))",
    },
  ],
};

export const data_structures_data = {
  title: "Data Structures",
  items: [
    {
      title: "Lists",
      cmd: "mylist = [1, 2, 3, 4, 5]\nprint(mylist[0])\nmylist.append(6)\nprint(len(mylist))",
    },
    { title: "Tuples", cmd: "mytuple = (1, 'apple', True)\nprint(mytuple[1])" },
    {
      title: "Dictionaries",
      cmd: "mydict = {'name': 'Alice', 'age': 30}\nprint(mydict['name'])\nmydict['city'] = 'Wonderland'",
    },
    {
      title: "Sets",
      cmd: "myset = {1, 2, 3, 4, 5}\nprint(1 in myset)\nmyset.add(6)",
    },
  ],
};

export const functions_data = {
  title: "Functions",
  items: [
    {
      title: "Function Definition",
      cmd: "def greet(name):\n    return f'Hello, {name}!'",
    },
    { title: "Function Call", cmd: "print(greet('Alice'))" },
    {
      title: "Default Arguments",
      cmd: "def greet(name='Anonymous'):\n    return f'Hello, {name}!'",
    },
    {
      title: "Lambda Functions",
      cmd: "double = lambda x: x * 2\nprint(double(5))",
    },
  ],
};

export const control_flow_data = {
  title: "Control Flow",
  items: [
    {
      title: "If Statement",
      cmd: "if x > 5:\n    print('x is greater than 5')\nelif x == 5:\n    print('x is equal to 5')\nelse:\n    print('x is less than 5')",
    },
    { title: "For Loop", cmd: "for item in mylist:\n    print(item)" },
    { title: "While Loop", cmd: "while x < 10:\n    print(x)\n    x += 1" },
    {
      title: "Break and Continue",
      cmd: "for num in range(10):\n    if num == 3:\n        continue\n    print(num)\n    if num == 7:\n        break",
    },
  ],
};

export const classes_data = {
  title: "Classes",
  items: [
    {
      title: "Class Definition",
      cmd: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age",
    },
    { title: "Instance Creation", cmd: "alice = Person('Alice', 30)" },
    {
      title: "Method Definition",
      cmd: "def greet(self):\n    return f'Hello, {self.name}!'",
    },
    {
      title: "Inheritance",
      cmd: "class Student(Person):\n    def __init__(self, name, age, student_id):\n        super().__init__(name, age)\n        self.student_id = student_id",
    },
  ],
};

export const exceptions_data = {
  title: "Exceptions",
  items: [
    {
      title: "Try-Except Block",
      cmd: "try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print('Error:', e)",
    },
    {
      title: "Finally Block",
      cmd: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Division by zero')\nfinally:\n    print('Execution completed')",
    },
  ],
};
