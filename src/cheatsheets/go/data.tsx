import type { Data } from "../commons";

export const basicSyntaxData: Data = {
	title: "Basic Syntax",
	items: [
		{ title: "Print Statement", cmd: 'fmt.Println("Hello, World!")' },
		{
			title: "Variables",
			cmd: 'var x int\nx = 5\nname := "Alice"\nconst pi = 3.14',
		},
		{
			title: "Data Types",
			cmd: 'var b bool = true\nvar s string = "Hello"\nvar i int = 42\nvar f float64 = 3.14',
		},
		{ title: "Constants", cmd: "const Pi = 3.14" },
		{
			title: "Functions",
			cmd: "func add(x int, y int) int {\n    return x + y\n}",
		},
		{ title: "Packages", cmd: 'import "fmt"\nimport "math"' },
	],
};

export const controlStructuresData: Data = {
	title: "Control Structures",
	items: [
		{
			title: "If Statement",
			cmd: "if condition {\n    // code\n} else if another_condition {\n    // code\n} else {\n    // code\n}",
		},
		{
			title: "Switch Statement",
			cmd: "switch variable {\n    case value1:\n        // code\n    case value2:\n        // code\n    default:\n        // code\n}",
		},
		{ title: "For Loop", cmd: "for i := 0; i < 10; i++ {\n    // code\n}" },
		{
			title: "Range Loop",
			cmd: "for index, value := range collection {\n    // code\n}",
		},
	],
};

export const dataStructuresData: Data = {
	title: "Data Structures",
	items: [
		{ title: "Arrays", cmd: "var a [5]int\na[2] = 7\nfmt.Println(a)" },
		{
			title: "Slices",
			cmd: "s := []int{1, 2, 3, 4, 5}\ns = append(s, 6)\nfmt.Println(s)",
		},
		{
			title: "Maps",
			cmd: 'm := make(map[string]int)\nm["key"] = 10\nfmt.Println(m)',
		},
		{
			title: "Structs",
			cmd: 'type Person struct {\n    name string\n    age int\n}\np := Person{name: "Alice", age: 30}\nfmt.Println(p)',
		},
	],
};

export const functionsData: Data = {
	title: "Functions",
	items: [
		{
			title: "Function Declaration",
			cmd: 'func greet(name string) string {\n    return "Hello, " + name\n}',
		},
		{
			title: "Multiple Return Values",
			cmd: "func divide(x, y int) (int, int) {\n    return x / y, x % y\n}",
		},
		{
			title: "Variadic Functions",
			cmd: "func sum(nums ...int) int {\n    total := 0\n    for _, num := range nums {\n        total += num\n    }\n    return total\n}",
		},
		{
			title: "Anonymous Functions (Closures)",
			cmd: "func main() {\n    add := func(x, y int) int {\n        return x + y\n    }\n    fmt.Println(add(1, 2))\n}",
		},
	],
};

export const errorHandlingData: Data = {
	title: "Error Handling",
	items: [
		{
			title: "Error Interface",
			cmd: 'func divide(x, y int) (int, error) {\n    if y == 0 {\n        return 0, errors.New("division by zero")\n    }\n    return x / y, nil\n}',
		},
		{
			title: "Panic and Recover",
			cmd: 'func recoverName() {\n    if r := recover(); r != nil {\n        fmt.Println("Recovered from panic: ", r)\n    }\n}\n\nfunc main() {\n    defer recoverName()\n    panic("Panic!")\n}',
		},
	],
};
