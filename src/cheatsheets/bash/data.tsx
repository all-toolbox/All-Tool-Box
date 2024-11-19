import type { Data } from "../commons";

export const basicCommandsData: Data = {
	title: "Basic Commands",
	items: [
		{ title: "Print Working Directory", cmd: "pwd" },
		{ title: "List Files and Directories", cmd: "ls" },
		{ title: "Change Directory", cmd: "cd directory_path" },
		{ title: "Make Directory", cmd: "mkdir directory_name" },
		{ title: "Remove Directory", cmd: "rmdir directory_name" },
		{ title: "Copy Files", cmd: "cp source_file destination_file" },
		{ title: "Move or Rename Files", cmd: "mv source_file destination_file" },
		{ title: "Remove Files", cmd: "rm file_name" },
	],
};

export const fileOperationsData: Data = {
	title: "File Operations",
	items: [
		{ title: "Create Empty File", cmd: "touch file_name" },
		{ title: "View File Contents", cmd: "cat file_name" },
		{ title: "Concatenate Files", cmd: "cat file1 file2 > merged_file" },
		{ title: "Count Lines/Bytes/Words in File", cmd: "wc file_name" },
		{ title: "Search Text in Files", cmd: "grep 'pattern' file_name" },
		{
			title: "Find Files by Name",
			cmd: "find directory_path -name 'file_pattern'",
		},
	],
};

export const permissionsData: Data = {
	title: "Permissions",
	items: [
		{ title: "Change File Permissions", cmd: "chmod permissions file_name" },
		{
			title: "Change Directory Permissions",
			cmd: "chmod permissions directory_name",
		},
		{ title: "View File Permissions", cmd: "ls -l file_name" },
		{ title: "View Directory Permissions", cmd: "ls -ld directory_name" },
		{
			title: "Change Ownership of File",
			cmd: "chown new_owner:group file_name",
		},
	],
};

export const variablesData: Data = {
	title: "Variables",
	items: [
		{ title: "Declare Variable", cmd: "variable_name=value" },
		{ title: "Access Variable Value", cmd: "echo $variable_name" },
		{ title: "Use Variable in Command", cmd: 'echo "Value is $variable_name"' },
		{
			title: "Environment Variables",
			cmd: "export VAR_NAME=value\necho $VAR_NAME",
		},
	],
};

export const controlStructuresData: Data = {
	title: "Control Structures",
	items: [
		{
			title: "If Statement",
			cmd: "if [ condition ]; then\n    # commands\nfi",
		},
		{
			title: "If-Else Statement",
			cmd: "if [ condition ]; then\n    # commands\nelse\n    # commands\nfi",
		},
		{ title: "For Loop", cmd: "for item in list; do\n    # commands\ndone" },
		{
			title: "While Loop",
			cmd: "while [ condition ]; do\n    # commands\ndone",
		},
		{
			title: "Case Statement",
			cmd: "case $variable in\n    pattern1)\n        # commands\n        ;;\n    pattern2)\n        # commands\n        ;;\nesac",
		},
	],
};

export const functionsData: Data = {
	title: "Functions",
	items: [
		{
			title: "Function Definition",
			cmd: "function func_name() {\n    # commands\n}",
		},
		{
			title: "Function with Parameters",
			cmd: 'function greet() {\n    echo "Hello, $1!"\n}\n# Call: greet Alice',
		},
		{
			title: "Return Value from Function",
			cmd: "function add() {\n    echo $(( $1 + $2 ))\n}\n# Call: result=$(add 10 5); echo $result",
		},
	],
};

export const inputOutputData: Data = {
	title: "Input/Output",
	items: [
		{
			title: "Read User Input",
			cmd: 'read variable_name\n# Usage: echo "Enter your name: "; read name; echo "Hello, $name!"',
		},
		{ title: "Redirect Output to File", cmd: "command > output_file" },
		{ title: "Append Output to File", cmd: "command >> output_file" },
		{ title: "Redirect Input from File", cmd: "command < input_file" },
		{ title: "Pipes (Chain Commands)", cmd: "command1 | command2 | command3" },
	],
};
