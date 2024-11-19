import stylex from "@stylexjs/stylex";
import React from "react";

interface I_TagProps {
  tag: string;
}

// TODO Onclick and set the tag in search bar
const styles = stylex.create({
  wrapper: {
    display: "flex",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    border: "1px solid var(--border-100)",
    width: "fit-content",
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--hover-200)",
    },
  },
  tag: {
    color: "white",
    fontSize: "0.75rem",
  },
});
export default function Tag({ tag }: I_TagProps) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <p {...stylex.props(styles.tag)}>{tag}</p>
    </div>
  );
}
