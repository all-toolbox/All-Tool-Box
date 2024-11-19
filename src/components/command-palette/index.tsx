import { useEffect } from 'react';
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	wrapper: {
		position: "absolute",
		zIndex: 2,
		display: "flex",
		width: "100%",
		justifyContent: "center",
	},

	search_wrapper: {
		marginTop: "2rem",
		backgroundColor: "#09090b",
		padding: "1rem",
		borderRadius: "0.25rem",
	},

	backdrop: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 1,
		filter: "blur(4px)",
		backgroundColor: "#06090cb8",
		backdropFilter: "blur(2px)",
	},
});

interface I_GlobalSearch {
	setShowCmdPalette: (arg: boolean) => void;
}

function GlobalSearch(props: I_GlobalSearch) {
	useEffect(() => {
		document.addEventListener('keydown', onKeyPress, false);

		return () => {
			document.removeEventListener('keydown', onKeyPress, false);
		};
	}, []);

	function onKeyPress(event: any) {
		if (event.keyCode === 27) {
			// Esc
			props.setShowCmdPalette(false);
		}
	}

	return (
		<>
			<div
				{...stylex.props(styles.wrapper)}
			>
				<div
					{...stylex.props(styles.search_wrapper)}
				>
					<input type="text" />
				</div>
			</div>

			<div
				{...stylex.props(styles.backdrop)}
			/>
		</>
	);
}

export default GlobalSearch;
