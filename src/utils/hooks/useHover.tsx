import { useState, useEffect } from "react";

export function useHover<T extends HTMLElement>() {
	const [value, setValue] = useState(false);

	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	return [
		{
			onMouseOver: handleMouseOver,
			onMouseOut: handleMouseOut,
			isHovered: value,
		},
	] as const;
}
