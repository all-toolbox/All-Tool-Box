import * as stylex from '@stylexjs/stylex';
import { SidebarTab } from "./sidebar-rail.tsx";
import { SidebarSearchRow } from "./components/sidebar-search-row.tsx";
import { AllToolTags } from './alltooltags.tsx';
import { FavoriteTools } from './favorite-tools.tsx';
// import {EnvironmentList} from "./components/environment-list";
const styles = stylex.create({
  container: {
    gridColumn: 2,
    overflow: 'hidden',
  }
})


interface SidebarContentProps {
  selectedTab: SidebarTab | null;
}

export function SidebarContent({
  selectedTab,
}: SidebarContentProps) {
  return (
    <div {...stylex.props(styles.container)}>
      {/* <SidebarSearchRow /> */}

      {
        selectedTab === 'favorites' && <FavoriteTools />
      }

      {
        selectedTab === 'alltool_tags' && <AllToolTags />
      }
    </div>
  )
}
