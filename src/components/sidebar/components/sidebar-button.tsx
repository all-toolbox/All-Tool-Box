import * as stylex from "@stylexjs/stylex";
import { FC, SVGProps } from "react";

const styles = stylex.create({
  button: {
    border: "none",
    borderRadius: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: 0,

    position: "relative",

    width: "100%",
    height: "2.25rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",

    cursor: "pointer",

    color: "var(--color-sidebar-text)",
    fill: "var(--color-sidebar-text)",

    ":hover": {
      color: "var(--color-white)",
      fill: "var(--color-white)",
      backgroundColor: "var(--sidebar-bg-hover)",
    },
  },

  image: {
    height: "1.5rem",
    width: "1.5rem",
  },

  svg_pos_fix: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  selected: {
    backgroundColor: "var(--sidebar-selected-bg) !important",

    fill: "var(--text-100)",
    color: "var(--text-100)",
  },

  selected_border: {
    border: "0.0625rem solid var(--sidebar-selected-border)",
    height: "calc(100% - 0.25rem)",
    left: "0px",
    position: "absolute",
  },
});

interface SidebarButton {
  selected: boolean;
  onClick: () => void;
}

interface SidebarButtonProps extends SidebarButton {
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface SidebarButtonPNGProps extends SidebarButton {
  src: string;
}

export function SidebarButtonPNG({
  src,
  selected,
  onClick,
}: SidebarButtonPNGProps) {
  return (
    <button
      {...stylex.props(styles.button, selected && styles.selected)}
      onClick={onClick}>
      <img src={src} alt="bin" {...stylex.props(styles.image)} />
    </button>
  );
}

export function SidebarButton({ Svg, selected, onClick }: SidebarButtonProps) {
  function getSVGSelectedStyle() {
    return selected ? "siderail-svg-selected" : "";
  }
  return (
    <button
      {...stylex.props(styles.button, selected && styles.selected)}
      onClick={onClick}
      type="button">
      <div {...stylex.props(selected && styles.selected_border)} />

      <div {...stylex.props(styles.svg_pos_fix)}>
        <Svg height="20" width="20" className={getSVGSelectedStyle()} />
      </div>
    </button>
  );
}
