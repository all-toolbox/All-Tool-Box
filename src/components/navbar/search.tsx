import * as stylex from "@stylexjs/stylex";

import searchIcon from "@assets/svgs/search.svg";
import { useRecoilState } from "recoil";
import { SearchStringData } from "@src/store/search_string_atom";

const styles = stylex.create({
  search_wrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--navbar-color-bg)",
    borderRadius: "0.25rem",
    border: "1px solid var(--navbar-border)",
    padding: "0.5rem 0.75rem",
    gap: "0.25rem",
    transition: "border var(--transition-speed) ease",
    ":focus-within": {
      border: "1px solid var(--navbar-focus)",
    },
  },

  search_input: {
    border: "unset",
    outline: "unset",
    boxShadow: "none",
    backgroundColor: "transparent",
    color: "var(--text-300)",
    fontSize: "0.75rem",
    borderRadius: "unset",
  },

  search_icon: {
    fill: "var(--text-300)",
  },
});

function NavSearch() {
  const [getSearchString, setSearchString] = useRecoilState(SearchStringData);

  return (
    <div {...stylex.props(styles.search_wrapper)}>
      <img
        src={searchIcon}
        alt="search for something"
        {...stylex.props(styles.search_icon)}
      />
      <input
        type="text"
        placeholder="Search for something..."
        {...stylex.props(styles.search_input)}
        value={getSearchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
    </div>
  );
}

export default NavSearch;
