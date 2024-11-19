import { SearchStringData } from "@src/store/search_string_atom";
import { tags_list } from "@src/tool_list";
import * as stylex from "@stylexjs/stylex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		overflow: "auto",
	},

	base: {
		padding: "1rem",
	},

	title: {
		margin: 0,
		padding: "1rem",
	},

	button: {
		backgroundColor: "var(--sidebar-bg)",
		outline: "none",
		border: "none",
		width: "100%",
		display: "flex",
		paddingLeft: "1rem",
		paddingTop: "0.5rem",
		paddingBottom: "0.5rem",
		color: "var(--color-text)",
		cursor: "pointer",

		":hover": {
			backgroundColor: "var(--sidebar-bg-hover)",
		},
	},
});

interface SidebarContentProps {
	// selectedTab: SidebarTab | null;
}

export function AllToolTags({}: SidebarContentProps) {
	const [getSearchString, setSearchString] = useRecoilState(SearchStringData);

	const navigate = useNavigate();

	return (
		<div {...stylex.props(styles.wrapper)}>
			<h2 {...stylex.props(styles.title)}>Tags</h2>

			{Object.entries(tags_list).map((tag, index) => {
				return (
					<button
						key={`${tag[0]}-${index}`}
						{...stylex.props(styles.button)}
						type="button"
						onClick={() => {
							navigate("/");
							setSearchString(`#${tag[1]}`);
						}}
					>
						{tag[1]}
					</button>
				);
			})}
		</div>
	);
}
