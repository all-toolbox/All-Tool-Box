import * as stylex from "@stylexjs/stylex";

export const common_styles = stylex.create({
  base: {
    height: "100%",
    padding: "1rem",
    boxSizing: "border-box",
  },

  innerFlex: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },

  threeColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
    gap: "1rem",
  },
});

export default common_styles;
