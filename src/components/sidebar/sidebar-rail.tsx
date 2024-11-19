import * as stylex from "@stylexjs/stylex";

// @ts-ignore
import StarSVG from "@assets/star.svg?react";
// @ts-ignore
import ToolsSVG from "@assets/tools.svg?react";

import {
  SidebarButton,
  SidebarButtonPNG,
} from "./components/sidebar-button.tsx";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRight: "0.0625rem solid var(--sidebar-border)",
    boxSizing: "border-box",
    height: "100%",
    gridColumn: 1,
  },
});

export type SidebarTab = "favorites" | "alltool_tags";

interface SidebarRailProps {
  selectedTab: SidebarTab | null;
  onSelectTab: (tab: SidebarTab) => void;
}

export function SidebarRail({ selectedTab, onSelectTab }: SidebarRailProps) {
  return (
    <div {...stylex.props(styles.container)}>
      {/* <SidebarButtonPNG src={HomePNG} selected={selectedTab === 'home'} onClick={() => onSelectTab('home')} /> */}

      <div>
        <SidebarButton
          Svg={StarSVG}
          selected={selectedTab === "favorites"}
          onClick={() => onSelectTab("favorites")}
        />
        <SidebarButton
          Svg={ToolsSVG}
          selected={selectedTab === "alltool_tags"}
          onClick={() => onSelectTab("alltool_tags")}
        />
      </div>
    </div>
  );
}
