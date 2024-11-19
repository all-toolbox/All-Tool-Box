import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  selector_wrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(35rem, 1fr))",
    width: "100%",
    boxSizing: "border-box",
    gridGap: "1rem",
    padding: "1rem",
  },

  micro_tool_wrap: {
    position: "absolute",
    marginTop: "4rem",
    top: 0,
    left: 0,
    padding: "2rem",
    width: "calc(100% - 4rem)",
    minHeight: "calc(100% - 8rem)",

    backgroundColor: "var(--color-bg-compliment)",
  },
});
