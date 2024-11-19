import stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  wrapper: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    gap: "2rem",
    overflow: "auto",
    boxSizing: "border-box",
  },

  displayBlock: {
    backgroundColor: "var(--background-100)",
    borderRadius: "0.25rem",
    display: "flex",
    padding: "1rem",
    gap: "1rem",
    border: "1px solid var(--border-100)",
    flexDirection: "column",
    minHeight: "16rem",
  },
});
