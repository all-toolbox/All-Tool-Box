import { SearchStringData } from '@src/store/search_string_atom';
import { SetupStore, TauriStoreAtom } from '@src/store/tauri_store_atom';
import { TauriStoreFavoritesAtom } from '@src/store/tauri_store_favorites_atom';
import { tags_list, tools, tools_mapped } from '@src/tool_list';
import * as stylex from '@stylexjs/stylex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
// @ts-ignore
import CloseSVG from "@assets/close-x.svg?react"
import { NavLink } from "react-router-dom";

const styles = stylex.create({
    wrapper: {
        height: "100%",
        overflow: "auto"
    },

    base: {
        padding: "1rem",
    },

    title: {
        margin: 0,
        padding: "1rem",
    },

    btn_wrap: {
        backgroundColor: "var(--sidebar-bg)",
        outline: "none",
        border: "none",
        paddingLeft: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        color: "var(--color-text)",
        cursor: "pointer",

        ":hover": {
            backgroundColor: "var(--sidebar-bg-hover) !important",
        },

        width: "100%",
        display: "flex",
        position: "relative",
        boxSizing: "border-box",
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
        }
    },

    btn_remove: {
        opacity: "0",

        right: "0.5rem",
        position: "absolute",
        outline: "none",
        border: "none",
        borderRadius: "0.25rem",

        cursor: "pointer",
        height: "1.5rem",
        width: "1.5rem",

        display: "flex",
        alignItems: "center",

        backgroundColor: "transparent",
        // transition: "background-color var(--transition-speed) ease",

        ":hover": {
            backgroundColor: "var(--sidebar-bg)",
            opacity: "1",
        }
    }
});

interface SidebarContentProps {
    // selectedTab: SidebarTab | null;
}

export function FavoriteTools({ }: SidebarContentProps) {
    const [getTauriStore, setTauriStore] = useRecoilState(TauriStoreAtom);
    const [getStoreFavorites, setStoreFavorites] = useRecoilState(TauriStoreFavoritesAtom);

    const navigate = useNavigate();

    const [getSearchString, setSearchString] = useRecoilState(SearchStringData);

    useEffect(() => {
        SetupTauriStoreAndGetFavorites();
    }, []);

    async function SetupTauriStoreAndGetFavorites() {
        const store = await SetupStore();
        setTauriStore(store);

        if (getStoreFavorites.length === 0) {
            store.get('tool_favorites')
                .then((res) => {
                    if (res === null) {
                        setStoreFavorites([]);
                    } else {
                        // @ts-ignore
                        setStoreFavorites(res);
                    }
                })
                .catch((err) => {
                    console.log("Failed to retrive favorites, please report bug.");
                });
        }
    }

    return (
        <div
            {...stylex.props(styles.wrapper)}
        >
            <h2
                {...stylex.props(styles.title)}
            >
                Favorites
            </h2>


            {getStoreFavorites.map((tool, index) => {
                let tool_name = tool;
                let tool_link = "#";
                for (let i = 0; i < tools_mapped.length; ++i) {
                    if (tool === tools_mapped[i].tool[1].id) {
                        tool_name = tools_mapped[i].tool[1].title;
                        tool_link = tools_mapped[i].tool[1].link;
                        break;
                    }
                }

                return (
                    <NavLink
                        key={tool}
                        {...stylex.props(styles.btn_wrap)}
                        style={({ isActive }) => {
                            if (isActive) {
                                return {
                                    backgroundColor: "var(--color-bg-compliment)",
                                }
                            }
                        }}
                        to={tool_link}
                    >
                        <p>
                            {tool_name}
                        </p>

                        <button
                            {...stylex.props(styles.btn_remove)}
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                const ns = [...getStoreFavorites];
                                for (let i = 0; i < ns.length; ++i) {
                                    if (ns[i] === tool) {
                                        ns.splice(i, 1);
                                        break;
                                    }
                                }
                                setStoreFavorites(ns);

                                if (getTauriStore !== null) {
                                    getTauriStore.set('tool_favorites', ns)
                                        .then((res) => {
                                            // setStoreFavorites(ns);
                                        })
                                        .catch((err) => {
                                        });
                                }
                            }}
                        >
                            <CloseSVG />
                        </button>
                    </NavLink>
                );
            })}

        </div >
    )
}
