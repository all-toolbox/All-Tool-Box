import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	base: {
		display: "flex",
		width: "100%",
		touchAction: "none",
		userSelect: "none",
		padding: "0 0.5rem",
		boxSizing: "border-box",
		position: "relative",
	},

	track: {
		overflow: "hidden",
		position: "relative",
		borderRadius: "9999px",
		width: "100%",
		height: "0.375rem",
		marginTop: "0.375rem",

		backgroundColor: "var(--color-gray)",
	},

	range: {
		position: "absolute",
		height: "100%",
		top: "0.25rem",
		marginTop: "-0.125rem",
		backgroundColor: "white",
	},

	thumb: {
		cursor: "pointer",
		border: "0.125rem solid var(--color-text)",
		backgroundColor: "var(--color-bg-compliment)",
		borderRadius: "50%",
		outline: "none",
		display: "block",
		width: "1rem",
		height: "1rem",

		transitionProperty:
			"color, background-color, border-color, text-decoration-color, fill, stroke",
		transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
		transitionDuration: "300ms",

		":hover": {
			border: "0.125rem solid var(--color-global-blue)",
		},
	},
});

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		{...stylex.props(styles.base)}
		{...props}
	>
		<SliderPrimitive.Track {...stylex.props(styles.track)}>
			<SliderPrimitive.Range {...stylex.props(styles.range)} />
		</SliderPrimitive.Track>

		<SliderPrimitive.Thumb {...stylex.props(styles.thumb)} />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
