import { Link } from "react-router-dom";

import * as stylex from "@stylexjs/stylex";
import Tag from "../tag";
import FavouriteHeart from "../favourite-heart";
// @ts-ignore
import FavouriteHeartFilled from "@assets/svgs/heart-fill.svg?react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHover } from "@src/utils/hooks/useHover";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TauriStoreAtom } from "@src/store/tauri_store_atom";
import { TauriStoreFavoritesAtom } from "@src/store/tauri_store_favorites_atom";

const styles = stylex.create({
	link: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "var(--tool-card-bg-100)",
		padding: "1.25rem 1.5rem",
		borderRadius: "0.5rem",
		border: "1px solid transparent",
		transition: "border var(--transition-speed) ease-in-out",

		":hover": {
			border: "1px solid var(--tool-card-border-hover)",
		},
		minHeight: "6rem",
		minWidth: "20rem",
		width: "auto",
		position: "relative",
	},

	title: {
		margin: 0,
		marginBottom: "0.5rem",
		fontSize: "1.25rem",
		marginTop: "0.25rem",
		color: "var(--color-text)",
		flexGrow: 1,
	},

	description: {
		color: "var(--color-text-sub)",
		textWrap: "wrap",
		textOverflow: "ellipsis",
		overflow: "hidden",
	},

	tagsArea: {
		marginTop: "1.5rem",
		display: "flex",
		gap: "0.5rem",
	},

	topRow: {
		display: "flex",
	},
});

interface I_CardLinkProps {
	id: string;
	title: string;
	link: string;
	description?: string;
	Icon?: any;
	tags?: string[];
	liked?: boolean;
}

function CardLink(props: I_CardLinkProps) {
	const TauriStore = useRecoilValue(TauriStoreAtom);
	const [getStoreFavorites, setStoreFavorites] = useRecoilState(TauriStoreFavoritesAtom);

	const [{ isHovered, onMouseOver, onMouseOut }] = useHover<HTMLDivElement>();

	const [isFav, setIsFav] = useState<boolean>(false);

	useEffect(() => {
		for (let i = 0; i < getStoreFavorites.length; ++i) {
			if (props.id === getStoreFavorites[i]) {
				setIsFav(true);
			}
		}
	}, []);

	function handleFavouriteClick(
		event: any,
		tool_id: string,
		// isFavArg: boolean
	): void {
		event.preventDefault();

		let found = false;
		const ns = [...getStoreFavorites];
		for (let i = 0; i < ns.length; ++i) {
			if (ns[i] === tool_id) {
				found = true;
				break;
			}
		}

		if (!found) {
			ns.push(tool_id);

			if (TauriStore) {
				TauriStore.set('tool_favorites', ns)
					.then((res) => {
						toast.success("Added to favourites");
						setStoreFavorites(ns);
						setIsFav(true);
					})
					.catch((err) => {
						toast.error("Failed to add to favourites");
					});
			}
		} else {
			for (let i = 0; i < ns.length; ++i) {
				if (ns[i] === tool_id) {
					ns.splice(i, 1);
					break;
				}
			}

			if (TauriStore) {
				TauriStore.set('tool_favorites', ns)
					.then((res) => {
						toast.success("Removed from favourites");
						setStoreFavorites(ns);
						setIsFav(false);
					})
					.catch((err) => {
						toast.error("Failed to remove from favourites");
					});
			}
		}
	}

	return (
		<Link
			to={props.link}
			{...stylex.props(styles.link)}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			<div>
				<div {...stylex.props(styles.topRow)}>
					<h2 {...stylex.props(styles.title)}>{props.title}</h2>
					{(isHovered || isFav) && (
						<FavouriteHeart
							liked={isFav}
							// @ts-ignore
							onClick={(event: any) => {
								handleFavouriteClick(event, props.id);
							}}
						/>
					)}
				</div>

				<p {...stylex.props(styles.description)}>{props.description}</p>
			</div>

			<div {...stylex.props(styles.tagsArea)}>
				{props.tags?.map((tag, index) => {
					return <Tag tag={tag} key={index} />;
				})}
			</div>
		</Link>
	);
}

export default CardLink;
