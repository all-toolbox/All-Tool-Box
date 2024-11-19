import React from "react";

// @ts-ignore
import HeartIcon from "@assets/svgs/heart.svg?react";
// @ts-ignore
import HeartFilled from "@assets/svgs/heart-fill.svg?react";

import stylex from "@stylexjs/stylex";

interface I_FavouriteHeartProps {
	liked?: boolean;
	onClick?: () => void;
}

const styles = stylex.create({
	button: {
		cursor: "pointer",
		width: "fit-content !important",
		padding: "0 !important",
	},
});

export default function FavouriteHeart({
	liked,
	onClick,
}: I_FavouriteHeartProps) {
	return (
		<button
			className="favourite-svg"
			onClick={onClick}
			type="button"
		>
			{liked ? <HeartFilled /> : <HeartIcon />}
		</button>
	);
}
