import stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: {
      default: "column",
      "@media (min-width: 1200px)": "row",
    },

    gap: "1rem",
  },
  controls: {
    gap: "1rem",
    height: "100%",
  },
  inputSelectWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },

  select: {
    width: "100%",
  },

  values: {
    minWidth: "16rem",

    gap: "1rem",
  },

  shrink: {
    flexShrink: 3,
    minWidth: "16rem",
  },
});
