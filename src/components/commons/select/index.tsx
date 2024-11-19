import React, { ChangeEventHandler } from "react";
import Select, { PropsValue } from "react-select";
import "./styles";
export interface I_SelectProps {
	options: Option[];
	onChange: any;
	value?: PropsValue<Option>;
	defaultValue?: PropsValue<Option>;
	placeholder?: any;
}

export interface Option {
	value: string;
	label: string;
}

export default function CustomSelect({
	options,
	onChange,
	value,
	defaultValue,
	placeholder,
}: I_SelectProps) {
	console.log(options[0]);
	return (
		<Select
			options={options}
			value={value}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
			styles={{
				menu: (base) => ({
					...base,
					padding: "0.25rem",
					border: "1px solid var(--border-100)",
					borderRadius: 4,
				}),
				menuList: (base) => ({
					...base,
					display: "flex",
					flexDirection: "column",
					gap: "0.25rem",
				}),
				option: (base) => ({
					...base,
					borderRadius: 4,
				}),
			}}
			theme={(theme) => ({
				...theme,
				borderRadius: 4,
				padding: "0.5rem 0.75rem",
				border: "1px solid var(--border-100)",
				colors: {
					...theme.colors,
					// Dropdown Option - OnPress
					primary50: "var(--text-200)",
					//Border and Background dropdown color
					primary: "#fcfcfc",
					//Background hover dropdown color
					primary25: "var(--background-300)",
					//Background color
					neutral0: "var(--background-100)",
					//Border before select
					neutral20: "var(--border-100)",
					//Hover border
					neutral30: "var(--text-100)",
					//No options color
					neutral40: "var(--text-300)",
					//Select color ?
					neutral50: "#00ffd0",
					//arrow icon when click select
					neutral60: "var(--text-100)",
					//Text color - Dropdown input
					neutral80: "var(--text-100)",
				},
			})}
		/>
	);
}
